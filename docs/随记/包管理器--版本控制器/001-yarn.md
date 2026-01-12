## 一、安装配置 yarn

### 1、全局安装

```
npm i -g yarn
```

### 2、查看 yarn 版本号

```
yarn --version
```

### 3、配置淘宝镜像地址

配置淘宝镜像地址的目的，就是将 yarn 的下载地址，更换为国内的淘宝的镜像地址。

```
yarn config set registry http://registry.npm.taobao.org/
```

### 4、配置 node-sass 的镜像地址

node-sass 插件的作用就是用来将 sass 代码转换为 css 代码。

以下命令是用来单独设置 node-sass 依赖包的淘宝镜像的下载地址：

```bash
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass
```

## 二、常用命令

### 1、下载局部依赖包

```
yarn add 包名称
```

### 2、下载指定版本的局部依赖包

```
yarn add 包名称@版本号# yarn add vue@2.6
```

### 3、下载“开发环境”所需局部依赖包

在下载时，通过 `-D` 来标记当前依赖包是开发环境所需要的插件，后续项目部署上线时，会自动排除这些开发时的依赖包。

```
yarn add 包名称 --dev
yarn add 包名称 -D
```

### 4、根据 package.json 下载局部依赖包

```
yarn
```

### 5、下载全局依赖包

```
yarn global add 包名称
```

### 6、卸载局部依赖包

```
yarn remove 包名称
```

### 7、卸载全局依赖包

```
yarn global remove 包名称


```







```js
#查看代理
yarn config list
#删除代理
yarn config delete proxy
npm config rm proxy
npm config rm https-proxy
#安装好后更换淘宝镜像
yarn config set registry https://registry.npm.taobao.org

```

