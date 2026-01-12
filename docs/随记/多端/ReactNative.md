# React Native

## 介绍

使用 React 来创建 Android 和 iOS 的原生应用，React Native 将原生开发的最佳部分与 React 相结合， 致力于成为构建用户界面的顶尖 JavaScript 框架。

## 项目搭建



## 创建项目

如果你之前全局安装过旧的`react-native-cli`命令行工具，请使用`npm uninstall -g react-native-cli`卸载掉它以避免一些冲突：

```shell
npm uninstall -g react-native-cli @react-native-community/cli
```

使用 React Native 内建的命令行工具来创建一个名为"AwesomeProject"的新项目。这个命令行工具不需要安装，可以直接用 node 自带的`npx`命令来使用：

```shell
npx @react-native-community/cli init AwesomeProject
```

你可以使用`--version`参数（注意是`两`个杠）创建指定版本的项目。注意版本号必须精确到两个小数点。

```shell
npx @react-native-community/cli init AwesomeProject --version X.XX.X
npx @react-native-community/cli@next init AwesomeProject --version 0.82.0
```

Android配置 gradle 加速（可选，一般国内需要配置）

将目标文件`android\gradle\wrapper\gradle-wrapper.properties ` 的 `distributionUrl`  的源地址配置为 `https\://mirrors.cloud.tencent.com/gradle`

比如：

```bash
 // android\gradle\wrapper\gradle-wrapper.properties
 distributionUrl=https\://services.gradle.org/distributions/gradle-9.0.0-bin.zip
```

改为：

```bash
// android\gradle\wrapper\gradle-wrapper.properties
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-9.0.0-bin.zip
```

修改后为：

```bash
# distributionUrl=https\://services.gradle.org/distributions/gradle-9.0.0-bin.zip
distributionUrl=https\://mirrors.cloud.tencent.com/gradle/gradle-9.0.0-bin.zip
```

使用启动命令验证项目：

```bash
pnpm android
```

## 启动应用程序

### 启动Metro

Metro app开发协助工具

```bash
pnpm start
```

### 启动应用程序

```basg
pnpm android
pnpm ios
```

### 开发调试

启动Metr之后可以选择J，这样就可以打开类似谷歌的控制台

```bash
   r  - reload app(s)
   d  - open Dev Menu
   j  - open DevTools
```



