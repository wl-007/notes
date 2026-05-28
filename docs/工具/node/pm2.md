# pm2 使用指南

## 1. `pm2` 是什么

`pm2` 是 Node.js 生态里很常见的进程管理工具，主要解决这些问题：

- 让服务常驻运行
- 进程崩溃后自动拉起
- 管理多个服务进程
- 查看日志和状态
- 支持开机自启
- 支持集群模式和无停机重载

如果你把 Node 服务直接 `node app.js` 跑在服务器上，进程挂了就没了。`pm2` 就是来解决这个问题的。

## 2. 安装

全局安装：

```bash
npm install -g pm2
```

确认版本：

```bash
pm2 --version
```

## 3. 启动服务

最基本的启动方式：

```bash
pm2 start app.js
```

给进程起名字：

```bash
pm2 start app.js --name my-app
```

启动 npm script：

```bash
pm2 start npm --name web -- run start
```

传额外参数：

```bash
pm2 start app.js --name api -- --port 3001
```

## 4. 常用管理命令

查看进程列表：

```bash
pm2 list
```

查看某个进程详情：

```bash
pm2 show my-app
```

重启：

```bash
pm2 restart my-app
```

停止：

```bash
pm2 stop my-app
```

删除：

```bash
pm2 delete my-app
```

全部重启：

```bash
pm2 restart all
```

## 5. 日志和监控

查看日志：

```bash
pm2 logs
```

只看某个应用日志：

```bash
pm2 logs my-app
```

日志带时间：

```bash
pm2 logs --time
```

终端监控面板：

```bash
pm2 monit
```

这个界面适合快速看 CPU、内存、重启次数和日志流。

## 6. 开机自启和进程恢复

生成开机启动配置：

```bash
pm2 startup
```

保存当前进程列表：

```bash
pm2 save
```

机器重启后恢复上次保存的进程：

```bash
pm2 resurrect
```

常见理解方式：

- `startup`：把 pm2 自己接到系统启动流程里
- `save`：把当前跑着的进程状态保存下来
- `resurrect`：按保存记录恢复

## 7. `ecosystem.config.js`

如果服务越来越多，命令行一个个启动会很乱。更常见的方式是写配置文件。

示例：

```js
module.exports = {
  apps: [
    {
      name: "api",
      script: "./server.js",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "worker",
      script: "./worker.js",
    },
  ],
};
```

启动配置中的所有应用：

```bash
pm2 start ecosystem.config.js
```

用生产环境变量启动：

```bash
pm2 start ecosystem.config.js --env production
```

基于配置文件重启、停止、删除：

```bash
pm2 restart ecosystem.config.js
pm2 stop ecosystem.config.js
pm2 delete ecosystem.config.js
```

## 8. 集群模式和无停机重载

如果是 HTTP 服务，`pm2` 可以直接开多实例。

按 CPU 核心数启动：

```bash
pm2 start app.js -i max
```

指定实例数：

```bash
pm2 start app.js -i 4
```

无停机重载：

```bash
pm2 reload my-app
```

对线上 Web 服务来说，`reload` 通常比 `restart` 更合适，因为它尽量避免请求中断。

## 9. 常见工作流

### 9.1 直接托管一个 Node 服务

```bash
pm2 start server.js --name api
pm2 save
pm2 startup
```

### 9.2 托管前端 SSR 或 Next 服务

```bash
pm2 start npm --name next-app -- run start
```

### 9.3 多服务统一管理

```bash
pm2 start ecosystem.config.js --env production
pm2 save
```

## 10. 部署相关

`pm2` 也提供 deploy 能力，但现在很多团队已经改用 CI/CD、Docker 或平台化部署。

如果只是单机管理进程，先掌握这些就够用：

- `pm2 start`
- `pm2 restart`
- `pm2 reload`
- `pm2 logs`
- `pm2 save`
- `pm2 startup`

## 11. 注意点

- `pm2` 解决的是进程管理，不替代反向代理、日志采集、容器编排和发布系统。
- 如果你已经在用 Docker/Kubernetes，是否还需要 `pm2` 要看部署方式，不要机械叠加。
- 开发环境里热更新通常用 `nodemon`、`tsx watch`，生产环境再交给 `pm2`。
