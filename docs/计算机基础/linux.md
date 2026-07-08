# Linux

> Linux 不只是一个系统，它更像一座 24 小时运转的城市。
>
> 目录是街区，文件是物资，进程是人，端口是窗口，权限是钥匙，日志是监控录像。
>
> 你学 Linux，不是为了背命令，而是为了在这座城市里不迷路，出了事能追踪，服务挂了能救火。

## 为什么要学 Linux

很多人学 Linux，一开始会陷入一个误区：

- 以为是在学命令
- 以为是运维才需要
- 以为前端只要会写页面就够了

其实不是。

对开发者来说，Linux 的价值很现实：

- 你的服务大概率跑在 Linux 上
- 你的线上日志、配置、进程、端口，几乎都要在 Linux 里查
- 你的项目部署、重启、排障、恢复，最后都离不开 Linux

所以学习 Linux 的真正目的，不是为了“像管理员一样懂系统底层的一切”，而是为了让你具备把项目跑起来、把故障查出来、把服务稳住的能力。

## 学这篇教程的目标是什么

如果你是前端工程师，这篇 Linux 教程的目标不是把你培养成传统意义上的运维，而是把你训练成：

> 一个具备基础部署能力、排障能力、安全意识的全栈工程师。

更具体一点，你学 Linux，至少要能做到下面这些事：

- 能把前端项目、Node.js 服务部署到 Linux 服务器
- 能配置最基本的 Nginx 反向代理和端口转发
- 能看懂日志，知道服务为什么没起来
- 能查端口占用、查异常进程、查权限问题
- 能在服务异常时快速判断是代码问题、配置问题、网络问题，还是机器资源问题
- 能在疑似中毒或被入侵时先保现场，再排查，再止血

## 学到什么程度算够用

很多教程的问题是：告诉你“Linux 很重要”，但不告诉你“学到哪算及格”。

这里给一个很实际的标准。

如果你是以前端为主、希望往全栈发展，那么 Linux 至少要掌握到下面这个程度：

### 第一层：会用

- 能在服务器里找到项目目录、配置文件、日志文件
- 能完成文件创建、复制、移动、删除
- 能用 `cat`、`less`、`tail -f`、`grep` 看日志
- 能用 `ps`、`top`、`ss`、`lsof` 看进程和端口

这一层的关键词是：

> 不迷路，不手忙脚乱。

### 第二层：能部署

- 能把一个前端静态站点部署到 Linux
- 能把一个 Node.js / Next.js 服务跑起来
- 能用 `systemd` 或 PM2 管理服务
- 能配 Nginx，让域名访问到你的服务
- 能处理最常见的启动失败、端口冲突、权限不足问题

这一层的关键词是：

> 能把项目真正放到线上。

### 第三层：能排障

- 服务挂了，能先看日志而不是乱改
- 页面 502，能排查是 Nginx 问题还是上游服务没起来
- 接口超时，能判断是网络问题、进程问题、配置问题还是资源瓶颈
- 机器异常时，能查 CPU、内存、磁盘、负载、异常进程、异常连接

这一层的关键词是：

> 出故障时，你不是旁观者，而是能推进解决的人。

### 第四层：有基本安全排查意识

- 知道哪些目录最容易藏恶意脚本
- 知道如何查可疑进程、可疑外连、可疑定时任务
- 知道远程执行类漏洞之后，不能只补丁，还要考虑凭据泄露和环境重建

这一层的关键词是：

> 不只是让服务“恢复”，而是让环境重新“可信”。

## 以前端为例，为什么必须掌握到这个程度

前端工程师往全栈走，最容易卡住的不是业务代码，而是下面这些真实问题：

- 项目在本地能跑，到了服务器跑不起来
- 构建完了不知道怎么部署
- 域名配好了却访问不到
- 日志报错看不懂
- 服务被打挂了，只会重启，不会判断根因

所以对前端来说，Linux 学习的核心不是“会多少命令”，而是两种能力：

### 1. 部署能力

你要能把代码从“本地开发”送到“线上可访问”。

这包括：

- 传代码
- 装环境
- 起服务
- 配反向代理
- 看启动日志
- 处理常见上线问题

### 2. 排查能力

你要能在用户说“打不开了”“变慢了”“接口挂了”的时候，有办法把问题一点点缩小。

也就是说，你至少要能回答这些问题：

- 服务还活着吗
- 端口还在监听吗
- 日志里最后一条错误是什么
- 是权限问题还是配置问题
- 是应用异常还是机器异常
- 有没有异常进程、异常连接、异常文件

如果你具备了这两种能力，你就已经不是只会写页面的前端，而是一个真正能对线上结果负责的全栈工程师。

## 先建立一张脑图

如果把 Linux 当成一座城市：

- `/` 是城市原点，所有路径都从这里出发
- `/home` 是普通居民区，每个用户有自己的房间
- `/root` 是管理员的独立住处
- `/etc` 是全城配置中心
- `/var` 是不断变化的数据区，比如日志、缓存、运行数据
- `/usr` 是公共功能区，装着大部分程序和共享资源
- `/tmp` 是临时堆放区，随时可能被清理
- `/proc` 是城市实时监控屏，可以看到进程、内核、内存等状态
- `/dev` 是设备接口区，磁盘、终端、随机数设备都在这里

你真正要学会的，不是“记住目录名”，而是形成条件反射：

- 配置大概率去 `/etc`
- 日志大概率去 `/var/log`
- 用户文件大概率在 `/home/用户名`
- 临时落地文件和可疑脚本，常去 `/tmp`、`/var/tmp`、`/dev/shm`
- 看系统实时状态，常去 `/proc`

---

## 一、目录结构：先别急着敲命令，先学会认路

### 1. `/`

根目录，所有绝对路径的起点。

比如：

- `/home/wl/project`
- `/etc/nginx/nginx.conf`
- `/var/log/syslog`

就像地图上的“你现在所在的整个城市”。

### 2. `/home`

普通用户家目录。

例如：

- `/home/wl`
- `/home/alice`

通常你写代码、存文档、放项目，都在自己的 home 目录里。

可以把它理解为“每个人自己的办公桌和储物柜”。

### 3. `/root`

`root` 用户的家目录。

注意：

- `/` 是根目录
- `/root` 是 root 用户的家目录

这两个名字很像，但完全不是一回事。

### 4. `/etc`

系统和服务配置文件集中地。

常见内容：

- `/etc/passwd`：用户信息
- `/etc/group`：用户组信息
- `/etc/hosts`：本机域名映射
- `/etc/ssh/sshd_config`：SSH 配置
- `/etc/nginx/nginx.conf`：Nginx 配置

你可以把 `/etc` 理解成“总控制室的参数面板”。

### 5. `/var`

经常变化的数据。

重点子目录：

- `/var/log`：日志
- `/var/lib`：程序运行时持久数据
- `/var/cache`：缓存
- `/var/tmp`：临时文件，但通常比 `/tmp` 保留更久
- `/var/run` 或 `/run`：运行中的 pid、socket 等

如果 `/etc` 是“规则手册”，那 `/var` 更像“现场记录”和“实时仓库”。

### 6. `/usr`

系统大部分程序和共享资源都在这里。

常见子目录：

- `/usr/bin`：普通命令
- `/usr/sbin`：偏管理类命令
- `/usr/lib`：库文件
- `/usr/share`：共享资源、文档、图标等
- `/usr/local`：本机手动安装的软件

可以把它理解成“公共基础设施区”。

### 7. `/bin` 和 `/sbin`

历史上：

- `/bin` 放基础命令
- `/sbin` 放系统管理命令

很多现代发行版已经把它们和 `/usr/bin`、`/usr/sbin` 做了合并或链接，但你仍然会经常看到这些路径。

### 8. `/tmp`

临时目录。

特点：

- 谁都可能往这里放东西
- 系统重启后可能被清空
- 很多程序会把解压文件、临时脚本、缓存放这里

安全排查时，这里也是高危地区，因为木马很爱在这儿落脚。

### 9. `/proc`

不是普通磁盘目录，而是内核实时映射出来的虚拟文件系统。

例如：

- `/proc/cpuinfo`：CPU 信息
- `/proc/meminfo`：内存信息
- `/proc/1234`：PID 为 1234 的进程信息
- `/proc/1234/cmdline`：进程启动命令
- `/proc/1234/exe`：进程真实可执行文件

它像一块“实时电子大屏”，读到的是当前状态，不是静态文件。

### 10. `/dev`

设备文件目录。

例如：

- `/dev/null`：黑洞，写进去就没了
- `/dev/zero`：不断输出 0
- `/dev/random`、`/dev/urandom`：随机数设备
- `/dev/sda`：磁盘设备

Linux 的一个重要思想是：很多东西都被抽象成文件。

### 11. `/opt`

一些额外安装的软件会放这里，比如第三方商业软件、独立应用包。

### 12. `/boot`

启动相关文件，比如内核、引导器配置。

平时开发不太常动，但系统层面很重要。

---

## 二、路径：你要知道自己站在哪、准备去哪

### 1. 绝对路径

从 `/` 开始写的完整路径。

例如：

```bash
/home/wl/project
/etc/nginx/nginx.conf
```

它的优点是明确，缺点是长。

### 2. 相对路径

相对“当前目录”来说的路径。

例如当前在 `/home/wl`：

```bash
cd project
cd ../logs
```

### 3. 特殊路径符号

- `.`：当前目录
- `..`：上一级目录
- `~`：当前用户的 home 目录
- `-`：上一次所在目录

例子：

```bash
cd ~
cd ..
cd -
```

### 4. 先确认位置再操作

新手最常见的问题不是“不会命令”，而是“在错误目录做了正确操作”。

养成习惯：

```bash
pwd
ls
```

先看自己在哪，再删、再改、再移动。

---

## 三、常规命令：不要死记，理解动作逻辑

> 提示：很多 Linux 命令名都是英文单词或缩写。
>
> 为了更好记忆，下面在常见命令第一次出现时，我会顺手补一个提示：
> `全称：...`
>
> 这样你记住的就不只是字母，而是它原本表达的动作。

## 1. 看目录和切换目录

### `pwd`（全称：print working directory）

查看当前所在目录。

- 使用频率：极高
- 常见程度：非常常见，几乎每天都会用

```bash
pwd
```

像是你在地图上按了一下“定位我”。

### `ls`（全称：list）

列出目录内容。

- 使用频率：极高
- 常见程度：非常常见，几乎是进入目录后的第一反应

常用写法：

```bash
ls
ls -l
ls -la
ls -lh
```

含义：

- `-l`：长格式，能看到权限、所有者、时间、大小
- `-a`：包含隐藏文件
- `-h`：大小更易读

建议最常用：

```bash
ls -lah
```

### `cd`（全称：change directory）

切换目录。

- 使用频率：极高
- 常见程度：非常常见

```bash
cd /etc
cd ~
cd ..
cd -
```

记忆方式：

- `cd` 像“走路”
- `pwd` 像“看路牌”
- `ls` 像“环顾四周”

---

## 2. 创建、复制、移动、删除

### `mkdir`（全称：make directory）

创建目录。

- 使用频率：高
- 常见程度：常见

```bash
mkdir demo
mkdir -p a/b/c
```

`-p` 的逻辑是：如果上级目录不存在，就顺手一起建。

### `touch`（全称：touch）

创建空文件，或者更新文件时间戳。

- 使用频率：中高
- 常见程度：常见

```bash
touch app.log
```

### `cp`（全称：copy）

复制文件或目录。

- 使用频率：高
- 常见程度：非常常见，做备份时尤其常用

```bash
cp a.txt b.txt
cp -r src backup-src
cp -a project project.bak
```

经验：

- `-r`：递归复制目录
- `-a`：尽量保留权限、时间等元信息，做备份时很好用

### `mv`（全称：move）

移动，或者重命名。

- 使用频率：高
- 常见程度：非常常见

```bash
mv old.txt new.txt
mv app.log /tmp/
```

Linux 里“改名”和“搬家”本质上都是 `mv`。

### `rm`（全称：remove）

删除文件或目录。

- 使用频率：高
- 常见程度：非常常见，但也是最容易误操作的命令之一

```bash
rm a.txt
rm -r demo
rm -rf demo
```

重点理解：

- `rm` 是直接删，不进回收站
- `-r` 是递归删除目录
- `-f` 是强制，不再反复确认

所以 `rm -rf` 像“开铲车平推一整片区域”，很高效，也很危险。

建议：

- 删除前先 `pwd`
- 再 `ls`
- 对关键路径先做备份

### `ln -s`（`ln` 全称：link）

创建软链接。

- 使用频率：中
- 常见程度：开发阶段一般，部署阶段很常见

```bash
ln -s /data/project current
```

可以理解成“快捷方式”。

部署时很常见，比如把当前版本目录链接成 `current`。

---

## 3. 压缩与解压：文件打包、传输、备份时特别常见

这一块很实用，而且开发里经常会碰到。

典型场景：

- 把项目目录打成一个包传到服务器
- 下载一个 `.tar.gz` 或 `.zip` 安装包后解压
- 备份日志、配置、上传目录
- 线上排查时，把某个目录压缩后带走分析

这里先建立一个关键区别：

- 打包：把多个文件装进一个包
- 压缩：把文件体积尽量变小

所以像 `tar` 这个命令，很多时候更偏“打包工具”；

而 `gzip`、`zip` 更偏“压缩工具”。

### `tar`（全称：tape archive）

- 使用频率：极高
- 常见程度：非常常见，是 Linux 最核心的打包/解包命令之一

最常见的几个写法：

```bash
tar -cvf archive.tar demo/
tar -xvf archive.tar
tar -czvf archive.tar.gz demo/
tar -xzvf archive.tar.gz
tar -xJvf archive.tar.xz
```

可以先这样理解：

- `-c`：create，创建包
- `-x`：extract，解包
- `-v`：verbose，显示过程
- `-f`：file，后面跟文件名
- `-z`：通过 gzip 压缩/解压
- `-J`：通过 xz 压缩/解压

最实用的记忆方式：

- `tar -cvf`：打包
- `tar -xvf`：解包
- `tar -czvf`：打包并 gzip 压缩
- `tar -xzvf`：解开 `.tar.gz`

举例：

```bash
tar -czvf logs-backup.tar.gz /var/log/myapp
```

意思是：

> 把 `/var/log/myapp` 打成一个 gzip 压缩包，文件名叫 `logs-backup.tar.gz`。

查看压缩包内容但不解压：

```bash
tar -tvf archive.tar
tar -tzvf archive.tar.gz
```

只解压到指定目录：

```bash
tar -xzvf archive.tar.gz -C /tmp
```

这里的 `-C` 表示切换到某个目录后再解压。

### `gzip`（全称：GNU zip）

- 使用频率：中高
- 常见程度：常见

`gzip` 更偏向“压缩单个文件”，而不是整目录。

```bash
gzip app.log
gunzip app.log.gz
```

压缩后通常会变成：

```bash
app.log.gz
```

常见于：

- 老日志归档
- 单文件传输
- 配合 `tar` 一起使用

注意：

- `gzip` 默认会把原文件替换成压缩后的文件
- 它不是拿来直接压整个目录的

### `gunzip`

- 使用频率：中
- 常见程度：常见

它可以理解成 `gzip` 的解压动作。

```bash
gunzip app.log.gz
```

### `zip`（全称：zip）

- 使用频率：高
- 常见程度：非常常见，尤其是跨平台传文件时

如果你需要和 Windows、macOS 用户互传压缩包，`zip` 往往更通用。

```bash
zip notes.zip a.txt
zip -r project.zip project/
```

其中：

- `-r`：递归压缩目录

### `unzip`（全称：unzip）

- 使用频率：高
- 常见程度：非常常见

```bash
unzip notes.zip
unzip notes.zip -d /tmp/notes
```

其中：

- `-d`：解压到指定目录

### `xz`

- 使用频率：中
- 常见程度：常见，但不如 `.tar.gz` 和 `.zip` 高频

有些软件包会提供 `.tar.xz`。

例如：

```bash
xz file.log
unxz file.log.xz
```

不过对开发者来说，更常见的还是直接通过 `tar -xJvf archive.tar.xz` 来处理。

### 开发者最常见的几种压缩包后缀

- `.tar`：只打包，不一定压缩
- `.tar.gz` 或 `.tgz`：打包后再用 gzip 压缩，非常常见
- `.tar.xz`：压缩率更高，也很常见
- `.zip`：跨平台最常见
- `.gz`：通常是单文件 gzip 压缩结果

### 一些最实用的场景命令

#### 1. 压缩整个项目目录

```bash
tar -czvf myapp.tar.gz myapp/
```

#### 2. 解压 `.tar.gz`

```bash
tar -xzvf myapp.tar.gz
```

#### 3. 解压到指定目录

```bash
tar -xzvf myapp.tar.gz -C /opt
```

#### 4. 把目录打成 zip 包

```bash
zip -r myapp.zip myapp/
```

#### 5. 解压 zip 包

```bash
unzip myapp.zip -d /opt/myapp
```

### 一个初学者最容易混淆的点

很多人会问：

“为什么 `.tar.gz` 要用 `tar` 解，不直接 `gzip` 解？”

原因是：

- `.tar.gz` 本质上通常是“先 tar 打包，再 gzip 压缩”
- 所以最顺手的处理方式就是直接用 `tar -xzvf`

你可以把它想成：

- `tar` 负责把一堆文件装箱
- `gzip` 负责把箱子抽真空压缩

### 使用建议

- 传整个目录：优先 `tar -czvf`
- 和其他系统互传：优先 `zip`
- 看到 `.tar.gz`：优先想到 `tar -xzvf`
- 看到 `.zip`：优先想到 `unzip`
- 解压前先 `ls` 看清当前目录，避免解得到处都是

---

## 4. 查看文件内容

### `cat`（全称：concatenate）

一次性输出文件内容。

- 使用频率：高
- 常见程度：非常常见

```bash
cat /etc/hosts
```

适合小文件，不适合大日志。

### `less`（全称：less）

分页查看。

- 使用频率：高
- 常见程度：非常常见，线上看大日志时尤其推荐

```bash
less /var/log/syslog
```

优点：

- 可以上下翻
- 可以搜索 `/关键词`
- 比 `cat` 更适合看大文件

### `head` 和 `tail`（全称：head / tail）

看开头和结尾。

- 使用频率：高
- 常见程度：非常常见

```bash
head -n 20 app.log
tail -n 50 app.log
tail -f app.log
```

`tail -f` 很重要，表示“持续盯着文件末尾变化”。

它就像把监控摄像头画面实时挂在你面前。

### `wc`（全称：word count）

统计行数、单词数、字节数。

- 使用频率：中
- 常见程度：常见，但没有 `cat`、`less`、`tail` 那么高频

```bash
wc -l app.log
```

---

## 5. 搜索文件和搜索内容

### `find`（全称：find）

按路径、名字、时间、类型搜索文件。

- 使用频率：高
- 常见程度：非常常见

```bash
find /var/log -name "*.log"
find . -type f
find /tmp -mtime -1
```

理解几个条件：

- `-name`：按名字找
- `-type f`：只找文件
- `-type d`：只找目录
- `-mtime -1`：最近 1 天内修改过

### `grep`（全称：global regular expression print）

从文本里搜内容。

- 使用频率：极高
- 常见程度：非常常见

```bash
grep "error" app.log
grep -n "error" app.log
grep -R "listen 80" /etc/nginx
```

### `rg`（全称：ripgrep）

`ripgrep`，比 `grep -R` 更快，代码仓库里尤其好用。

- 使用频率：高
- 常见程度：在开发者环境里很常见，但不是所有 Linux 机器默认自带

```bash
rg "TODO"
rg "next.config" .
```

经验：

- 找文件名偏向 `find`
- 找文件内容偏向 `grep` / `rg`

## 6. 修改文件：线上机器最常见的编辑方式

只会“看文件”还不够，实际工作里你经常还要临时改配置、改脚本、改 service 文件。

这里要分两类：

- 查看文件：`cat`、`less`、`head`、`tail`
- 编辑文件：`vi` / `vim`、`nano`

### `vi` / `vim`

- 使用频率：高
- 常见程度：非常常见，尤其是在服务器环境

这两个是 Linux 世界里最常见的终端编辑器之一。

很多服务器最基础就带 `vi`，而 `vim` 往往是功能更强、体验更好的版本。

如果你做部署、改 Nginx 配置、改 `systemd` 服务文件、临时修脚本，十有八九会碰到它。

常见操作先记最小集合就够了：

```bash
vim /etc/nginx/nginx.conf
```

- 按 `i`：进入插入模式，开始编辑
- 按 `Esc`：退出编辑状态
- 输入 `:wq`：保存并退出
- 输入 `:q!`：不保存强制退出

你不需要一开始就精通 `vim`，但至少要做到：

- 能打开文件
- 能改几行
- 能保存退出

这已经足够覆盖大多数线上场景。

### `nano`

- 使用频率：中
- 常见程度：常见，但不如 `vi` / `vim` 普遍

`nano` 更适合新手，因为界面提示更直白。

例如：

```bash
nano .env
```

但要注意，很多极简服务器环境里未必预装 `nano`，而 `vi` 更常见。

所以从实战角度看：

- 入门编辑体验：`nano` 更友好
- 服务器通用性：`vi` / `vim` 更重要

---

## 四、命令为什么能串起来：Linux 的“流水线思维”

Linux 命令强，不只是因为命令多，而是因为它们能拼起来。

像搭乐高一样，小块组合成大能力。

## 1. 管道 `|`

左边命令输出，变成右边命令输入。

```bash
ps aux | grep nginx
```

逻辑不是“魔法”，而是：

1. `ps aux` 先列出所有进程
2. 结果交给 `grep nginx`
3. `grep` 从中筛出包含 `nginx` 的行

可以把它想成流水线：

- 第一个工人负责搬出全部货物
- 第二个工人负责把你要的那几箱挑出来

### 常见组合

```bash
cat app.log | grep error
tail -f app.log | grep timeout
ss -lntp | grep 3000
```

虽然 `cat app.log | grep error` 能用，但更简洁的写法是：

```bash
grep error app.log
```

## 2. 重定向 `>` 和 `>>`

### `>`

覆盖写入文件。

```bash
echo hello > a.txt
```

原文件内容会被替换。

### `>>`

追加写入。

```bash
echo hello >> a.txt
```

像往日志末尾继续记一笔。

### 标准输出和标准错误

```bash
command > out.log 2> err.log
command > all.log 2>&1
```

理解：

- `1` 是标准输出
- `2` 是标准错误
- `2>&1` 表示“把错误也并到标准输出去”

## 3. 条件执行 `&&` 和 `||`

```bash
mkdir demo && cd demo
```

含义：

- 前面成功，才执行后面

```bash
test -f app.log || touch app.log
```

含义：

- 前面失败，才执行后面

这是写部署脚本时很实用的思维。

---

## 五、权限：Linux 最容易让人迷糊，但其实很讲道理

权限不是玄学，它只是回答三个问题：

1. 你是谁
2. 你对这个东西拥有什么权限
3. 你能不能做这件事

### 1. 先看一眼权限长什么样

```bash
ls -l
```

你会看到类似：

```bash
-rwxr-x---
```

分三段理解：

- 第一位：文件类型
- 接下来三位：所有者权限
- 再三位：所属组权限
- 最后三位：其他人权限

### 2. `rwx` 到底是什么意思

对文件来说：

- `r`：可读
- `w`：可写
- `x`：可执行

对目录来说，意义稍微不同：

- `r`：能看目录里的名单
- `w`：能在目录里增删改文件名
- `x`：能进入目录

这个区别很重要。

很多人第一次困惑就在这：

“我明明能看到目录，为什么进不去？”

因为目录的 `x` 才是“进门权限”。

可以把目录想成房间：

- `r`：能看门口贴的住户名单
- `w`：能调整房间里的物品摆放
- `x`：你手上有钥匙，能进门

### 3. 三类身份

- `u`：user，所有者
- `g`：group，所属组
- `o`：others，其他人

Linux 判断权限时，像门卫一样：

1. 先看你是不是文件所有者
2. 不是，再看你是不是这个组的人
3. 还不是，就按 others 处理

### 4. `chmod`（全称：change mode）

修改权限。

#### 字母方式

```bash
chmod u+x deploy.sh
chmod g-w file.txt
chmod o-r secret.txt
chmod u+rwx,g+rx,o-rwx script.sh
```

很适合初学者，因为读起来直观。

#### 数字方式

```bash
chmod 755 script.sh
chmod 644 app.conf
chmod 700 ~/.ssh
```

数字怎么来的：

- `r = 4`
- `w = 2`
- `x = 1`

所以：

- `7 = 4 + 2 + 1 = rwx`
- `5 = 4 + 1 = r-x`
- `4 = r--`

常见组合：

- `755`：所有者可读写执行，别人可读执行
- `644`：所有者可读写，别人只读
- `700`：只有自己能操作

### 5. `chown`（全称：change owner）

修改所有者和所属组。

```bash
chown wl app.log
chown wl:wl app.log
chown -R www-data:www-data /var/www/app
```

很多“权限问题”不是 `chmod` 能解决，而是“文件主人根本不对”。

例如：

- 程序以 `www-data` 身份运行
- 但日志目录归 `root`
- 程序就可能有写日志失败的问题

### 6. `sudo`（全称：superuser do）

`sudo` 不是“万能前缀”，它表示“临时借用管理员身份执行这条命令”。

```bash
sudo systemctl restart nginx
sudo chown -R wl:wl /data/project
```

用法建议：

- 能不用 `sudo` 就别乱用
- 尤其不要在自己的工作目录里频繁 `sudo npm install`

因为这样很容易把项目文件写成 `root` 所有，后面普通用户反而改不动。

### 7. 一个典型权限问题怎么想

场景：

你执行：

```bash
./deploy.sh
```

结果提示：

```bash
Permission denied
```

排查逻辑：

1. `ls -l deploy.sh` 看脚本有没有 `x`
2. 如果没有：`chmod +x deploy.sh`
3. 如果有 `x` 还不行，检查当前目录和上级目录有没有执行权限
4. 再检查脚本首行解释器是否存在，比如 `#!/bin/bash`

也就是说，不要一看到 denied 就只会 `sudo`。

先分清：

- 是文件不可执行
- 还是目录进不去
- 还是所有者不对
- 还是解释器路径错了

---

## 六、用户、组与身份切换

这一块非常重要。

因为 Linux 不是默认所有事情都让 `root` 来做，而是强调：

- 不同的人用不同的账号
- 不同的服务用不同的身份
- 不同的身份只能碰自己该碰的东西

所以你不能只会 `whoami` 和 `sudo`，还要知道怎么创建用户、分配用户组、设置密码、授予权限。

### 1. 看我是谁

```bash
whoami
id
```

`id` 会看到用户 id、组 id、附加组。

这里也顺手记一下：

- `whoami`：who am I
- `id`：identity

### 2. 看当前在线用户

```bash
w
who
```

排查入侵时很有用，能看谁正在登录。

### 3. 切换身份

```bash
su - root
sudo -i
sudo -u www-data bash
```

`sudo -u` 很适合模拟“这个服务账号实际看到的世界”。

其中：

- `su`：常理解为 substitute user

比如：

```bash
sudo -u www-data cat /var/www/app/.env
```

如果这里读不到，服务很可能也读不到。

### 4. 为什么要创建新用户

很多新手喜欢一直用 `root` 干活，短期看省事，长期看风险很大。

更推荐的思路是：

- 日常登录，用普通用户
- 需要管理员权限时，再临时 `sudo`
- 跑服务时，尽量让服务使用单独账号

这样做的好处是：

- 误操作范围更小
- 文件归属更清晰
- 服务权限更可控
- 安全性更高

比如：

- 你部署一个 Node.js 应用，可以让它用 `nodeapp` 用户运行
- 你部署 Nginx，它通常会使用自己的服务用户
- 你自己登录服务器，则使用个人账号

这就像公司里不会让所有人都拿“老板总钥匙”到处开门。

### 5. 创建用户

最常见的命令有两个：

- `useradd`
- `adduser`

先说区别：

- `useradd`：更底层，常见于很多发行版
- `adduser`：更友好，很多 Debian / Ubuntu 系会提供交互式向导

#### `useradd`

- 使用频率：中高
- 常见程度：非常常见

常见写法：

```bash
sudo useradd -m -s /bin/bash wltest
```

参数含义：

- `-m`：自动创建 home 目录
- `-s /bin/bash`：指定登录 shell

这条命令的意思就是：

> 创建一个叫 `wltest` 的新用户，给他建家目录，并让他默认用 Bash 登录。

创建后可以检查：

```bash
id wltest
ls -ld /home/wltest
```

#### `adduser`

- 使用频率：中
- 常见程度：在 Ubuntu / Debian 很常见

```bash
sudo adduser wltest
```

它通常会一步步提示你输入：

- 密码
- 备注信息
- 是否确认

对初学者来说，`adduser` 更像“带引导的创建流程”。

### 6. 给用户设置或修改密码

创建完用户后，一般还要设置密码。

```bash
sudo passwd wltest
```

- 使用频率：高
- 常见程度：非常常见

如果是给当前用户改密码：

```bash
passwd
```

### 7. 创建组、加入组

Linux 里很多权限不是直接给某个人，而是给一个组。

常见命令：

#### `groupadd`

```bash
sudo groupadd deploy
```

- 使用频率：中
- 常见程度：常见

#### `usermod`

把用户加入某个组：

```bash
sudo usermod -aG deploy wltest
```

- 使用频率：高
- 常见程度：非常常见

参数要特别记住：

- `-a`：append，追加
- `-G`：supplementary groups，附加组

为什么一定要写 `-aG`？

因为如果你只写 `-G`，在很多场景下会把用户原有附加组覆盖掉。

这就像你本来有好几张门禁卡，结果新办一张时把旧的全注销了。

查看一个用户属于哪些组：

```bash
groups wltest
id wltest
```

### 8. 给用户 sudo 权限

不是所有用户都应该有管理员权限。

但实际工作里，你通常会创建一个普通登录用户，再把它加入 sudo 组。

在 Ubuntu / Debian 常见做法：

```bash
sudo usermod -aG sudo wltest
```

在 CentOS / Rocky / RHEL 常见做法：

```bash
sudo usermod -aG wheel wltest
```

意思是：

- `sudo` 组或 `wheel` 组里的成员，可以按系统配置使用 `sudo`

可以验证：

```bash
su - wltest
sudo -l
```

### 9. 删除用户

有时测试账号建完后要删掉。

```bash
sudo userdel wltest
sudo userdel -r wltest
```

- 使用频率：中
- 常见程度：常见

区别：

- `userdel wltest`：只删用户
- `userdel -r wltest`：连 home 目录一起删

所以 `-r` 要慎用。

### 10. 与用户相关的关键文件

用户管理不只是命令，还要知道数据记在哪里。

常见文件：

- `/etc/passwd`：用户基本信息
- `/etc/shadow`：密码相关信息
- `/etc/group`：组信息
- `/etc/sudoers`：sudo 规则

你不一定要直接修改这些文件，但要知道它们存在。

例如：

```bash
cat /etc/passwd
cat /etc/group
```

注意：

- `/etc/shadow` 只有高权限才能看
- `/etc/sudoers` 不建议直接乱改

如果要修改 sudo 配置，更推荐：

```bash
sudo visudo
```

### 11. 一个开发者最常见的用户管理场景

假设你刚买了一台服务器，准备部署项目。

推荐流程不是直接拿 `root` 干到底，而是：

1. 创建一个普通用户

```bash
sudo adduser deployer
```

2. 给它 sudo 权限

```bash
sudo usermod -aG sudo deployer
```

3. 切到这个用户工作

```bash
su - deployer
```

4. 在它自己的 home 目录里拉代码、部署项目

这样做的好处是：

- 文件归属正常
- 不容易把项目全搞成 `root` 所有
- 日常开发和部署习惯更安全

### 12. 跑服务时为什么常常还要专门建服务用户

如果是生产环境，更好的做法往往是：

- 你的登录用户叫 `deployer`
- 你的应用进程用户叫 `nodeapp`

也就是说：

- 人和服务分开
- 服务只拿最小权限

例如：

```bash
sudo useradd -m -s /usr/sbin/nologin nodeapp
sudo chown -R nodeapp:nodeapp /var/www/myapp
```

其中：

- `/usr/sbin/nologin` 表示这个账号主要用于跑服务，而不是给人正常登录操作

这个思路在安全上很重要。

因为一旦服务本身出问题，攻击者能接触到的权限范围也会更小。

---

## 七、进程：服务为什么会活着，为什么会死掉

进程就是“正在运行的程序实例”。

同一个程序可以同时有多个进程，就像同一家店能有多个店员同时工作。

### 1. 查看进程

```bash
ps aux
ps aux | grep nginx
ps -ef
```

其中：

- `ps` 全称：process status

常见字段：

- `USER`：谁启动的
- `PID`：进程编号
- `%CPU`：CPU 占用
- `%MEM`：内存占用
- `STAT`：状态
- `COMMAND`：启动命令

### 2. 动态查看

```bash
top
htop
```

`top` 是系统自带常青树。

如果装了 `htop`，交互体验更好。

补充记忆：

- `top`：不是严格意义上的缩写，可以理解成“置顶观察最忙的进程”
- `htop`：增强版 `top`

### 3. 看进程树

```bash
pstree -ap
```

其中：

- `pstree`：process tree

这个命令非常适合排查异常父子进程关系。

比如：

- `node` 本来应该被 `systemd` 或 `pm2` 拉起
- 结果它的父进程却是一个奇怪的 `sh` 或 `bash`

这就值得警觉。

### 4. 杀进程

```bash
kill 1234
kill -15 1234
kill -9 1234
pkill node
```

其中：

- `pkill`：process kill

逻辑上要分清：

- `kill` 默认发的是 `SIGTERM`，是“请你正常收尾后退出”
- `kill -9` 是 `SIGKILL`，是“立即强制终止，不给你善后机会”

比喻：

- `kill -15` 像通知店员“打烊，收银、关灯、锁门再走”
- `kill -9` 像直接拉电闸

因此建议：

- 优先 `kill`
- 不行再 `kill -9`

---

## 八、后台运行、守护、开机自启

### 1. `&`

```bash
node app.js &
```

把命令丢到后台执行。

但注意，它不等于“稳定守护”。

### 2. `nohup`（全称：no hang up）

```bash
nohup node app.js > app.log 2>&1 &
```

表示退出终端后仍继续运行。

### 3. `jobs`、`bg`、`fg`

```bash
jobs
bg
fg
```

是 shell 作业控制命令，主要用于当前终端会话内。

### 4. `systemd`

生产环境更推荐用 `systemd` 管理服务。

常用命令：

```bash
systemctl status nginx
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl enable nginx
systemctl disable nginx
```

理解：

- `start/stop/restart`：管理当前运行状态
- `enable/disable`：管理是否开机自启

### 5. `journalctl`（`ctl` 可理解为 control）

查看 `systemd` 管理的服务日志。

```bash
journalctl -u nginx
journalctl -u myapp -n 100
journalctl -u myapp -f
```

如果 `tail -f` 是盯一个文件，

那 `journalctl -f` 就像盯一个服务的专属监控流。

---

## 九、端口与网络：服务启动了，不代表别人能访问到

很多线上问题本质不是“代码错了”，而是“网络路径断了”。

### 1. 看端口监听

```bash
ss -lntp
ss -lntp | grep 3000
```

其中：

- `ss`：socket statistics

重点看：

- 哪个端口在监听
- 监听地址是 `127.0.0.1` 还是 `0.0.0.0`
- 对应进程是谁

### 2. `lsof`（全称：list open files）

```bash
lsof -i :3000
```

可以快速知道“谁占了这个端口”。

### 3. `curl`（全称：client URL）

```bash
curl http://127.0.0.1:3000
curl -I https://example.com
curl -v http://127.0.0.1:3000/api/health
```

这是服务排查里的核心命令。

因为它能帮你验证：

- 服务是否真的返回内容
- HTTP 状态码是什么
- 请求卡在哪一步

### 4. `ping`（常用记法：ping）

```bash
ping 8.8.8.8
ping example.com
```

适合测试网络是否基本通、DNS 是否能解析。

但注意：

- `ping` 通，不等于 HTTP 正常
- `ping` 不通，也不一定代表服务挂了，可能只是目标禁 ICMP

### 5. `ip`（全称：internet protocol）

```bash
ip a
ip route
```

看本机网卡和路由信息。

### 6. 域名、本机、公网访问三层排查法

假设用户说“网站打不开”，别急着改代码。

按三层走：

1. 本机进程是否活着：`ps`、`systemctl status`
2. 本机端口是否监听：`ss -lntp`
3. 本机能否 curl 通：`curl 127.0.0.1:端口`
4. 同局域网或公网能否访问：检查防火墙、安全组、Nginx
5. 域名是否解析正确：`dig`、`nslookup`

如果：

- 本机 curl 通
- 公网不通

多半是网络层、反向代理层、防火墙层的问题。

---

## 十、日志：不要靠猜，日志就是现场录像

排障第一习惯：

> 先看日志，再下判断。

### 常用姿势

```bash
tail -n 100 app.log
tail -f app.log
grep -n "ERROR" app.log
rg "ECONNREFUSED|permission denied|timeout" logs/
```

### 日志要重点看什么

- 报错出现的准确时间
- 报错前一个动作是什么
- 报错是偶发还是持续
- 是应用层报错、数据库报错、权限报错、网络报错，还是磁盘报错

### 一个很实用的习惯

把“症状”和“证据”分开。

例如：

- 症状：页面 502
- 证据：Nginx error log 提示上游连接失败
- 证据：Node 服务端口没监听
- 证据：Node 进程启动后读 `.env` 失败

这样你的排查不会飘。

---

## 十一、磁盘与资源：很多故障不是 bug，是机器撑不住了

### 1. 看磁盘空间

```bash
df -h
du -sh .
du -sh /var/log/*
```

其中：

- `df`：disk free
- `du`：disk usage

`df -h` 看整体盘剩余，

`du -sh` 看某个目录吃了多少空间。

### 2. 看内存

```bash
free -h
```

### 3. 看负载

```bash
uptime
```

会看到 load average。

可以粗略理解为“系统有多少活在排队等 CPU”。

### 4. OOM 现象

如果程序总是莫名其妙退出，要怀疑是不是被系统 OOM kill 了。

可以查：

```bash
dmesg | grep -i -E "killed process|out of memory"
journalctl -k | grep -i oom
```

---

## 十二、实战型命令清单：开发者最该先练熟的

下面这些命令，建议反复练到不需要想。

### 文件与目录

```bash
pwd
ls -lah
cd
mkdir -p
cp -a
mv
rm -rf
find
```

### 文件内容

```bash
cat
less
head
tail -f
grep
rg
```

说明：

- `cat`：高频，适合看小文件
- `less`：高频，适合看大文件
- `tail -f`：高频，适合盯日志
- `grep` / `rg`：极高频，适合搜错误和关键字

### 文件编辑

```bash
vi
vim
nano
```

说明：

- `vi` / `vim`：服务器环境非常常见，建议至少会基本编辑和保存退出
- `nano`：对新手更友好，但不是所有机器都有

### 进程与端口

```bash
ps aux
top
pstree -ap
kill
ss -lntp
lsof -i
```

### 服务与日志

```bash
systemctl status
systemctl restart
journalctl -u 服务名 -f
```

### 网络

```bash
curl
ping
ip a
ip route
```

### 权限

```bash
ls -l
chmod
chown
id
sudo
```

---

## 十三、给前端和全栈开发者的一套排障顺序

假设你刚部署了一个 Next.js / Node.js 服务，用户说挂了。

你可以按这个顺序查：

1. 进程还活着吗

```bash
ps aux | grep node
systemctl status myapp
```

2. 端口开了吗

```bash
ss -lntp | grep 3000
```

3. 本机 curl 通吗

```bash
curl -v http://127.0.0.1:3000
```

4. 日志报了什么

```bash
tail -n 100 /var/log/myapp/app.log
journalctl -u myapp -n 100
```

5. 配置文件对吗

```bash
cat /etc/nginx/nginx.conf
cat .env
```

6. 权限够吗

```bash
ls -lah
ls -ld /var/www/app
```

7. 机器资源够吗

```bash
free -h
df -h
top
```

8. 网络通吗

```bash
curl -I 域名
ss -lntp
```

如果你每次都按这个链路走，绝大多数问题都能快速缩小范围。

---

## 十四、进阶：机器疑似中毒后，别慌，按“保现场”思路排查

下面是防守视角的应急流程，不包含漏洞利用细节，重点是排查和止血。

核心原则只有四个：

1. 先记录，后清理
2. 先隔离，后修复
3. 先确认影响面，后重装
4. 先轮换凭据，后恢复业务

### 1. 发现哪些迹象要警觉

常见异常：

- CPU、内存、网络出口突然异常升高
- 明明没人操作，机器上却多了奇怪进程
- `/tmp`、`/var/tmp`、`/dev/shm` 多了随机文件
- `crontab`、`systemd` 服务、`~/.bashrc` 被悄悄改过
- `ss -tunp` 发现可疑外连
- 应用日志里出现异常请求头、异常 POST、异常回显

### 2. 第一时间动作

如果是生产机器，优先考虑：

1. 从负载均衡或安全组中摘除对外流量
2. 保留当前实例，不要急着重启
3. 记录时间、IP、相关日志
4. 导出关键证据后再做清理

为什么别急着重启？

因为很多恶意进程、内存态痕迹、临时文件、网络连接，一重启就丢了。

### 3. 快速体检命令

先跑一轮基础信息：

```bash
date
uptime
w
who
last -n 10
```

看最近谁登录过、什么时候开始异常。

### 4. 查异常进程

```bash
ps aux --sort=-%cpu | head
ps aux --sort=-%mem | head
pstree -ap
top
```

你要关注：

- 高 CPU、高内存进程
- 命令行参数可疑
- 父进程关系异常
- 进程名伪装成系统组件，比如 `kworkerx`、`syslogd1`、`dbusd` 这类像又不完全像的名字

进一步看单个 PID：

```bash
ls -l /proc/1234/exe
cat /proc/1234/cmdline | tr '\0' ' '
ls -al /proc/1234/cwd
```

重点理解：

- `/proc/PID/exe` 看这个进程实际跑的是哪个二进制
- `/proc/PID/cmdline` 看启动命令
- `/proc/PID/cwd` 看它当时的工作目录

如果你看到：

- 可执行文件来自 `/tmp`
- 工作目录在隐藏目录
- 启动参数像下载器、反弹 shell、隧道器

那就很危险。

### 5. 查网络连接

```bash
ss -tunp
ss -lntp
lsof -i -n -P
```

关注：

- 哪些进程在对外连陌生 IP
- 哪些端口在监听但你并不知道
- 是内网连接，还是公网长连接

木马常见目的之一不是“立刻破坏”，而是先打通一条能随时再进来的隧道。

### 6. 查持久化位置

恶意程序要想“你杀了它，它还能回来”，就必须做持久化。

重点查这些地方：

#### `crontab`

```bash
crontab -l
sudo crontab -l
ls -lah /etc/cron*
```

#### `systemd`

```bash
systemctl list-units --type=service --all
systemctl list-unit-files --type=service
ls -lah /etc/systemd/system
ls -lah ~/.config/systemd/user
```

#### Shell 启动文件

```bash
cat ~/.bashrc
cat ~/.profile
cat ~/.zshrc
```

#### SSH 持久化

```bash
ls -lah ~/.ssh
cat ~/.ssh/authorized_keys
```

如果攻击者加了自己的公钥，你以后即使改了密码，他也可能还能进。

### 7. 查近期落地文件

```bash
find /tmp /var/tmp /dev/shm -type f -mtime -3 -ls
find /home -type f -mtime -3 -ls
```

这个命令特别适合找“最近突然冒出来的脚本和二进制”。

### 8. 查日志中的可疑行为

```bash
rg -n "curl|wget|bash -c|sh -c|python -c|chmod \\+x" /var/log /home/* 2>/dev/null
rg -n "POST|next-action|rsc-action-id" /var/log /home/* 2>/dev/null
```

你不是为了“看到一个关键字就下结论”，而是为了建立时间线。

例如：

- 12:03 收到异常 POST
- 12:03 应用进程拉起一个 `bash`
- 12:04 `/tmp/.x` 文件生成
- 12:05 新增 cron

当这些证据能串起来，判断就会非常稳。

### 9. 止血动作

确认异常后，可以考虑：

1. 断开对外服务或限制出口访问
2. 杀掉恶意进程
3. 删除恶意持久化项
4. 轮换所有敏感密钥、Token、数据库密码、云密钥
5. 修补漏洞并重新部署
6. 必要时用干净镜像重建机器

如果已经确认是远程执行类入侵，不要只做“杀进程”。

因为攻击者最可能已经：

- 留了后门
- 打包了环境变量
- 读取了 `.env`
- 导出了数据库连接串
- 拿走了云厂商访问密钥

---

## 十五、案例演示：Next.js 漏洞后如何排查木马痕迹

> 这一节是防守排查演示，不复现攻击 payload。

### 1. 背景时间线

这里用一个真实世界里非常典型的案例背景来演练：

- 2025 年 12 月 3 日，React Server Components 漏洞 CVE-2025-55182 被公开披露，属于未授权远程代码执行风险
- 同期 Next.js 发布了下游安全公告 CVE-2025-66478，指出受影响的是使用 App Router 的 Next.js 15.x、16.x，以及部分 14.x canary 版本
- 2025 年 12 月 4 日，AWS 报告称在漏洞公开后数小时内，就观察到了针对该漏洞的活跃利用
- 2025 年 12 月 12 日，Google Threat Intelligence Group 披露，攻击者在部分入侵里投递了 Linux 恶意组件，并通过 `cron`、`systemd`、shell 启动文件建立持久化

对开发者来说，最重要的结论不是“这个漏洞细节是什么”，而是：

> 一旦你的公网服务出现未修补 RCE，排查思路就必须从“服务挂了没”升级到“机器有没有被接管”。

### 2. 假设场景

假设你有一台自托管 Linux 服务器：

- 跑着 Next.js App Router 应用
- 当时版本未修补
- 服务曾暴露在公网
- 这两天发现 CPU 偶发拉高、外联异常、日志里有陌生 POST

我们的目标不是证明“百分之百已经中招”，而是判断：

1. 有没有被利用的痕迹
2. 有没有恶意进程
3. 有没有持久化
4. 有没有敏感信息泄露风险

### 3. 先确认版本和暴露面

先确认是不是可能受影响：

```bash
cat package.json
cat node_modules/next/package.json
ss -lntp
```

你要看：

- Next.js 是否在受影响版本范围内
- 服务是否确实对公网提供访问

### 4. 查 Web 日志中的异常请求

如果你用 Nginx：

```bash
tail -n 200 /var/log/nginx/access.log
tail -n 200 /var/log/nginx/error.log
rg -n "next-action|rsc-action-id|POST" /var/log/nginx
```

如果你直接看应用日志：

```bash
journalctl -u my-next-app -n 200
rg -n "next-action|rsc-action-id|POST" /var/log /home/* 2>/dev/null
```

重点不是盯住某一个固定字段，而是看：

- 异常 POST 是否集中出现在某个时间点
- 报文后紧接着是否出现进程异常、文件落地、报错堆栈

### 5. 查可疑进程和父子关系

```bash
ps aux --sort=-%cpu | head -n 20
pstree -ap
```

如果你的 Next.js 服务平时是：

- `systemd -> node`

却突然出现：

- `node -> sh -> curl`
- `node -> bash -> wget`

那已经非常可疑。

继续下钻：

```bash
ls -l /proc/可疑PID/exe
cat /proc/可疑PID/cmdline | tr '\0' ' '
ls -al /proc/可疑PID/cwd
```

### 6. 查临时目录和隐藏目录

根据 Google 在 2025 年 12 月披露的案例，攻击者曾创建隐藏目录并通过多处方式维持驻留。

所以这里重点查：

```bash
find /tmp /var/tmp /dev/shm -type f -mtime -7 -ls
find $HOME -maxdepth 3 -type d -name ".*" -ls
find $HOME -maxdepth 3 -type f -mtime -7 -ls
ls -lah $HOME
```

如果看到类似：

- 新出现的隐藏目录
- 无明显业务用途的 ELF 二进制
- 最近几天才出现的脚本

都要进一步核对。

### 7. 查持久化：cron、systemd、shell rc

```bash
crontab -l
sudo crontab -l
ls -lah /etc/cron*
systemctl list-unit-files --type=service | grep enabled
ls -lah /etc/systemd/system
ls -lah ~/.config/systemd/user
cat ~/.bashrc
cat ~/.profile
cat ~/.zshrc
```

如果你看到：

- 新增了你不认识的 service
- `bashrc` 末尾多了一段自动执行脚本
- cron 定时从外网拉脚本

这几乎就是标准后门落点。

### 8. 查外连和隧道

```bash
ss -tunp
lsof -i -n -P
```

要重点注意：

- Node 之外的陌生进程长时间连接外部 IP
- 连接目标不是你业务正常依赖的数据库、缓存、消息队列、三方 API

### 9. 查敏感文件是否可能被读走

如果是 RCE 类风险，默认要假设这些信息可能泄露：

- `.env`
- 云密钥
- 数据库密码
- OAuth 密钥
- SSH 私钥

重点检查：

```bash
ls -lah .env*
ls -lah ~/.ssh
```

然后执行管理动作，而不只是技术动作：

- 轮换数据库密码
- 轮换云 AK/SK
- 轮换 JWT 密钥
- 轮换第三方服务 Token

### 10. 一套更稳的处理建议

如果已经基本确认机器被利用：

1. 先把服务从公网摘掉
2. 备份日志、可疑文件、进程信息
3. 轮换全部密钥
4. 修补 Next.js / React 到安全版本
5. 用干净镜像重建实例，而不是在原地“修一修继续跑”
6. 从干净代码重新部署
7. 复查 Nginx、systemd、cron、SSH、公网暴露面

为什么重建优先级很高？

因为一旦攻击者拿到执行权限，你很难百分之百确认他有没有留下第二条入口。

原地清理可以止血，但“干净重建”才更接近真正恢复可信状态。

---

## 十六、学习建议：Linux 最好的学习方式不是看，是练

建议你按这个顺序练：

1. 在虚拟机或云服务器上熟悉目录结构
2. 每个命令自己敲 10 次，不要只看
3. 自己搭一个 Node 服务，练 `systemd` 管理
4. 自己配一个 Nginx 反向代理
5. 故意制造故障，比如端口冲突、权限不足、磁盘打满，然后练排查
6. 最后再做安全排查演练

如果你只背命令，你会很快忘。

如果你把 Linux 理解成：

- 一张目录地图
- 一套权限规则
- 一套进程和网络的运行秩序
- 一条从“现象”到“证据”的排查链路

你会越学越稳。

---

## 十七、最后记住这几个铁律

### 1. 出问题先看日志

不要靠猜。

### 2. 先确认现象，再确认范围

不要一上来就改配置。

### 3. `sudo` 不是解决一切的按钮

很多权限问题，本质是所有者和运行身份不匹配。

### 4. `kill -9` 不是默认操作

先给程序正常退出机会。

### 5. 生产环境疑似中毒时，先保现场

别一着急重启，把证据全清了。

### 6. 远程执行类漏洞之后，要默认考虑凭据泄露

补丁只是第一步，密钥轮换和环境重建同样重要。

---

## 参考资料

- Next.js 安全公告：<https://nextjs.org/blog/CVE-2025-66478>
- Next.js 官方安全博客索引：<https://nextjs.org/blog>
- AWS 安全博客，关于 React2Shell 被快速利用的观察：<https://aws.amazon.com/blogs/security/china-nexus-cyber-threat-groups-rapidly-exploit-react2shell-vulnerability-cve-2025-55182/>
- Google Cloud 威胁情报，关于利用后投递 Linux 恶意组件与持久化方式的说明：<https://cloud.google.com/blog/topics/threat-intelligence/threat-actors-exploit-react2shell-cve-2025-55182/>
- Google Cloud 缓解建议：<https://cloud.google.com/blog/products/identity-security/responding-to-cve-2025-55182/>
- NVD 对 Next.js Server Actions SSRF 的记录：<https://nvd.nist.gov/vuln/detail/CVE-2024-34351>
