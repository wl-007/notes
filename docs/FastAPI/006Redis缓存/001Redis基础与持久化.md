# Redis 基础、过期淘汰与持久化

关联提交：`c8e7394`（2026-11-09，使用 Redis）。本篇先讲 Redis 通用机制，[下一篇](./002热门用户缓存实现.md)再分析项目缓存。

**FastAPI 服务退出，不等于 Redis 数据丢失；Redis 进程退出后能否恢复，要看持久化配置和持久化文件是否仍在。** TTL 则决定键何时失效，与是否落盘是不同问题。

## Redis 把数据存在哪里

Redis 是独立的数据服务。常规读写访问内存中的数据结构，应用通过网络命令操作它：

```text
FastAPI 进程             Redis 进程                  文件系统
Redis 客户端 → 网络 → 内存中的键和值 → 持久化机制 → RDB / AOF
                                                   ↓ 重启时加载
                                              Redis 内存数据集
```

开启持久化后，并不是每次 GET 都去磁盘读文件。Redis 启动时先恢复内存数据集，再对外提供相应服务；运行期间继续以内存为主要访问层。

Python 进程中的 dict、Redis 服务内存、MySQL 表是三处不同存储。多个后端 worker 可以访问同一 Redis，而普通 Python 全局变量通常各进程独立。

Redis 的效率来自内存访问、数据结构和命令处理方式等。不要简单记成“所有工作都只有一个线程”：I/O、后台释放、持久化等行为还受版本和配置影响；阻塞命令、大键和昂贵计算仍会影响延迟。

## 常见数据类型与用途

| 类型 | 适合存什么 | 常见命令 |
| --- | --- | --- |
| String | 文本、JSON 字符串、计数 | `GET`、`SET`、`INCR` |
| Hash | 一个对象的多个字段 | `HSET`、`HGET`、`HGETALL` |
| List | 有顺序的元素、简单队列 | `LPUSH`、`RPOP`、`LRANGE` |
| Set | 去重集合、交并集 | `SADD`、`SISMEMBER`、`SINTER` |
| Sorted Set | 带分数排序的成员、排行榜 | `ZADD`、`ZRANGE` |
| Stream | 事件记录、消费者组 | `XADD`、`XREADGROUP`、`XACK` |

Bitmap、HyperLogLog、地理位置索引等可用于特定统计和查询场景。选类型时看操作需求，而不是把所有对象都序列化成一个巨大 JSON。

```text
SET learn:user:1 '{"id":1,"nickname":"Alice"}' EX 60
GET learn:user:1
HSET learn:user:2 nickname Bob active 1
ZADD learn:rank 10 alice 20 bob
ZRANGE learn:rank 0 9 REV WITHSCORES
```

当前项目把整份榜单序列化成 JSON，使用 String。它没有用 Sorted Set 计算真实热度排名，“热门”是接口名称，实际取最新创建用户。

## TTL：键什么时候过期

```text
SET learn:short lived EX 60
TTL learn:short
EXPIRE learn:short 120
PERSIST learn:short
```

| `TTL` 结果 | 含义 |
| --- | --- |
| 正数或 0 | 剩余秒数，0 表示不足一秒 |
| `-1` | 键存在但没有过期时间 |
| `-2` | 键不存在 |

`EX` 使用秒，`PX` 使用毫秒。缓存写入常用 `SET ... EX ...` 一次完成，避免先 SET 后 EXPIRE 中途失败留下永久键。

普通 `SET` 覆盖键通常会移除原 TTL，如需保留可使用相应的 `KEEPTTL` 选项。`PERSIST` 的含义是去除键的过期时间，**不是把键立即写入磁盘**。

Redis 通过访问时检查和周期性主动检查清理过期数据，不保证到某个时刻就对每个键执行一次精确删除任务。

### 重启后 TTL 会重新计时吗

不会因为正常恢复而自动重新给满一个 TTL。过期信息随持久化保存，恢复时按绝对过期时间判断；停机期间已经过期的键，不应恢复为新的有效缓存。

因此，服务停机很久后缓存为空，可能是正常过期，并不一定是持久化失败。系统时钟变化也会影响这种判断，应保持主机时间可靠。

## 淘汰：内存满了怎么办

过期由 TTL 决定；淘汰由内存压力和 `maxmemory-policy` 决定。

| 策略 | 大意 |
| --- | --- |
| `noeviction` | 不主动淘汰，为需要额外内存的写操作返回错误 |
| `allkeys-lru` | 从全部键中近似选择最近最少使用的键 |
| `allkeys-lfu` | 从全部键中近似选择使用频率较低的键 |
| `volatile-lru` / `volatile-lfu` | 只在设置过期时间的键中选择 |
| `volatile-ttl` | 倾向淘汰剩余 TTL 较短的键 |

还有随机淘汰等选项。即使 TTL 尚未到期，键也可能被淘汰；没有 TTL 的键也可能被 allkeys 策略淘汰。不能把缓存当成永远存在的主记录。

`maxmemory` 也不等于进程 RSS 的硬上限，内存碎片、持久化时的写时复制以及部分缓冲区都需要容量余量。

## RDB：保存某个时刻的数据快照

RDB 把数据集保存为紧凑的二进制快照，常见文件名为 `dump.rdb`，实际目录和文件名由配置决定。

- `SAVE` 同步生成快照，会阻塞服务，不适合随意在大实例执行。
- `BGSAVE` 通常通过 fork 出的子进程生成快照；父进程继续服务，但 fork 和写时复制仍可能带来延迟与额外内存开销。
- `save` 规则可以触发周期性快照，表示“时间窗口内累计发生一定数量变更”，并非严格固定每隔多久无条件备份。

示例规则：

```text
save 900 1
save 300 10
save 60 10000
```

这些是讲解用配置，不代表所有 Redis 版本或部署的默认值。满足任一规则后可触发相应快照。

如果最近一次成功快照是 10:00，10:04 异常退出，快照后尚未进入其他持久化记录的修改就可能丢失。快照适合保留时间点副本，但恢复点可能落后于故障时刻。

## AOF：记录用于重建数据的写操作

AOF 记录影响数据的写操作，重启时重建数据集：

```text
appendonly yes
appendfsync everysec
```

命令执行、写入操作系统缓冲区、刷到稳定存储是不同阶段。

| 刷盘策略 | 权衡 |
| --- | --- |
| `always` | 更频繁同步，降低丢失窗口，写入延迟通常更高 |
| `everysec` | 通常约每秒同步，常规故障模型下可能丢失约一秒近期写入 |
| `no` | 由操作系统决定刷盘，丢失窗口更依赖系统行为 |

“每秒”不是任何硬件故障下都严格最多丢一秒的承诺；磁盘错误、I/O 堵塞、文件损坏和基础设施行为都可能影响结果。

### AOF 为什么需要重写

一个计数器增加一万次，不必永远保存一万条历史命令才能恢复最终值。AOF 重写生成更紧凑的恢复表示，控制文件增长；它不是简单把日志清空。

现代 Redis（7.0 起）采用多段 AOF，通常包含 base、incremental 文件和 manifest；基础部分还可能采用 RDB 编码。备份时要理解实际文件集合，不能始终按“复制一个 appendonly.aof”操作。

同时启用 RDB 和 AOF 时，重启通常优先用 AOF 恢复，因为它预期包含更完整的变更。

## “服务挂了”分别会怎样

| 故障 | 内存和连接的变化 | 数据恢复取决于什么 |
| --- | --- | --- |
| FastAPI 进程退出 | Python 对象与连接消失，Redis 仍独立运行 | 重启后端重新连接即可，键仍受 TTL / 淘汰影响 |
| 后端到 Redis 网络中断 | 后端暂时无法访问，Redis 内存可能仍在 | 网络恢复与客户端重连；不等同于数据丢失 |
| Redis 进程异常退出 | Redis 进程内存消失，宿主机可能仍在 | 已可用的 RDB / AOF 以及尚未落盘内容的状态 |
| 宿主机断电或内核崩溃 | Redis 内存、未稳定落盘的系统缓冲区可能丢失 | 刷盘策略、稳定存储和文件完整性 |
| 容器停止后重新启动 | 同一个容器的可写层通常仍在 | 持久化是否启用、文件位置、TTL |
| 容器删除再重建 | 原容器可写层可能丢失 | 持久化目录是否挂到保留的 volume / 外部存储 |
| 磁盘损坏或卷被删除 | 本机持久化文件可能也丢失 | 独立备份、复制和灾难恢复设计 |

无持久化时不能保证异常重启后恢复。正常关闭可能执行保存或同步，但不能把优雅关闭当作崩溃保护，`kill -9` 与断电也不会执行完整退出流程。

## 持久化、复制、高可用和备份

| 能力 | 解决的问题 | 不能单独保证什么 |
| --- | --- | --- |
| RDB / AOF | 本实例重启恢复 | 磁盘损坏后的恢复、持续可用 |
| 主从复制 | 多份在线数据副本 | 默认异步复制下所有已确认写都不丢失 |
| Sentinel | 监控与主从故障切换 | 业务数据备份、严格零丢失 |
| Cluster | 分片与相关故障转移 | 自动消除所有数据丢失和热点 |
| 独立备份 | 从历史副本恢复 | 实时接管请求 |

误删操作可能传播到副本和持久化记录，所以“有复制”“有 AOF”不等于“有历史备份”。复制、备份和恢复演练需要分别设计。

当前项目没有提供 Redis 服务端配置、复制、Sentinel、Cluster 或备份脚本；安装 `redis` Python 包也不会替你启动 Redis 服务。

## 检查实际运行配置

在有权限的 Redis 实例上可只读检查：

```bash
redis-cli INFO persistence
redis-cli CONFIG GET dir
redis-cli CONFIG GET dbfilename
redis-cli CONFIG GET save
redis-cli CONFIG GET appendonly
redis-cli CONFIG GET appendfsync
redis-cli CONFIG GET appenddirname
redis-cli CONFIG GET maxmemory
redis-cli CONFIG GET maxmemory-policy
```

托管服务可能限制 CONFIG 命令，应查看对应控制面。项目的连接参数无法告诉你服务端到底开启了哪种持久化。

## 独立的本地持久化练习

下面仅是手动练习示例，不是项目自带部署命令；需要已安装并运行 Docker。端口用 6380，避免与默认 6379 混淆：

```bash
docker run -d --name fastapi-redis-demo \
  -p 127.0.0.1:6380:6379 \
  -v fastapi-redis-data:/data \
  redis:8 redis-server \
  --dir /data --appendonly yes --appendfsync everysec

redis-cli -p 6380 SET learn:persist "hello"
redis-cli -p 6380 SET learn:ttl "short-lived" EX 60
redis-cli -p 6380 TTL learn:ttl
```

`redis:8` 是练习镜像标签，真实部署应固定经验证的版本或镜像摘要。volume 保留 `/data`，AOF 负责把内容写到该目录；只挂 volume 而没有有效持久化，并不能保存 Redis 内存。

确认有成功持久化后，可以在练习实例执行：

```bash
docker restart fastapi-redis-demo
redis-cli -p 6380 GET learn:persist
redis-cli -p 6380 TTL learn:ttl
```

第一个键用于观察恢复，第二个可能剩余更少时间或已过期。优雅重启只能验证基本恢复路径，不能证明断电时零丢失；不要在业务实例上用破坏性命令做这个练习。

## 缓存场景怎样选择

如果 Redis 只保存可从 MySQL 重建的缓存，可以接受重启后重新预热，重点是控制回源压力。如果保存不可轻易重建的会话、任务或业务状态，则需要按可接受丢失量、恢复时间和故障模型配置持久化与备份。

当前项目属于前一种：MySQL 是用户记录的主存储，Redis 是榜单副本。恢复了 Redis 缓存，也不等于它始终与数据库最新状态一致。

参考：[Redis 数据类型](https://redis.io/docs/latest/develop/data-types/)、[TTL](https://redis.io/docs/latest/commands/ttl/)、[EXPIRE](https://redis.io/docs/latest/commands/expire/)、[SET](https://redis.io/docs/latest/commands/set/)、[内存淘汰](https://redis.io/docs/latest/develop/reference/eviction/)、[持久化](https://redis.io/docs/latest/operate/oss_and_stack/management/persistence/)、[BGSAVE](https://redis.io/docs/latest/commands/bgsave/)、[AOF 重写](https://redis.io/docs/latest/commands/bgrewriteaof/)、[复制](https://redis.io/docs/latest/operate/oss_and_stack/management/replication/)。
