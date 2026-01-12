# Taro4

**Taro** 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 [微信](https://mp.weixin.qq.com/) / [京东](https://mp.jd.com/?entrance=taro) / [百度](https://smartprogram.baidu.com/) / [支付宝](https://mini.open.alipay.com/) / [字节跳动](https://developer.open-douyin.com/) / [QQ](https://q.qq.com/) / [飞书](https://open.feishu.cn/document/uYjL24iN/ucDOzYjL3gzM24yN4MjN) / [快手](https://mp.kuaishou.com/) 小程序 / H5 / RN / [ASCF元服务](https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-overview) 等应用。

## 项目搭建

首先，你需要使用 npm 或者 yarn 全局安装 `@tarojs/cli`，或者直接使用 [npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b):

```bash
# 使用 pnpm 安装 CLI
pnpm install -g @tarojs/cli
```

可以使用 `npm info` 查看 Taro 版本信息，在这里你可以看到当前最新版本

```bash
npm info @tarojs/cli
```

使用命令创建模板项目：

```bash
taro init myApp
```

安装依赖：

```bash
# 进入项目根目录
$ cd myApp

# 使用 pnpm 安装依赖
$ pnpm install
```

配置多端生成文件地址路径：

```ts
outputRoot: `dist/${process.env.TARO_ENV}`,
```

执行多端编译：

```bash
# pnpm
$ pnpm dev:weapp
$ pnpm build:weapp

# yarn
$ yarn dev:weapp
$ yarn build:weapp

# npm script
$ npm run dev:weapp
$ npm run build:weapp

```

## 项目结构

```bash
├── dist                        编译结果目录
|
├── config                      项目编译配置目录
|   ├── index.js                默认配置
|   ├── dev.js                  开发环境配置
|   └── prod.js                 生产环境配置
|
├── src                         源码目录
|   ├── pages                   页面文件目录
|   |   └── index               index 页面目录
|   |       ├── index.js        index 页面逻辑
|   |       ├── index.css       index 页面样式
|   |       └── index.config.js index 页面配置
|   |
|   ├── app.js                  项目入口文件
|   ├── app.css                 项目总通用样式
|   └── app.config.js           项目入口配置
|
├── project.config.json         微信小程序项目配置 project.config.json
├── project.tt.json             抖音小程序项目配置 project.tt.json
├── project.swan.json           百度小程序项目配置 project.swan.json
├── project.qq.json             QQ 小程序项目配置 project.qq.json
├── ascf.config.json            ASCF元服务项目配置 ascf.config.json
|
├── babel.config.js             Babel 配置
├── tsconfig.json               TypeScript 配置
├── .eslintrc                   ESLint 配置
|
└── package.json
```

## Taro 常用组件与API

### View

类似 HTML的 `div`

```react
export default class PageView extends Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <View className='components-page'>
        <Text>flex-direction: row 横向布局</Text>
        <View className='flex-wrp' style='flex-direction:row;'>
          <View className='flex-item demo-text-1'/>
          <View className='flex-item demo-text-2'/>
          <View className='flex-item demo-text-3'/>
        </View>
        <Text>flex-direction: column 纵向布局</Text>
        <View className='flex-wrp' style='flex-direction:column;'>
          <View className='flex-item flex-item-V demo-text-1'/>
          <View className='flex-item flex-item-V demo-text-2'/>
          <View className='flex-item flex-item-V demo-text-3'/>
        </View>
      </View>
    )
  }
}
```

### Text

用于显示文本，支持样式设置

```react
export default class PageView extends Component {
  state = {
    contents: [],
    contentsLen: 0
  }

  add = () => {
    this.setState(prev => {
      const cot = prev.contents.slice()
      cot.push({ text: 'hello world' })
      return {
        contents: cot,
        contentsLen: cot.length
      }
    })
  }

  remove = () => {
    this.setState(prev => {
      const cot = prev.contents.slice()
      cot.pop()
      return {
        contents: cot,
        contentsLen: cot.length
      }
    })
  }

  render () {
    return (
      <View className='container'>
        {this.state.contents.map((item, index) => (
          <Text key={index}>{item.text}</Text>
        ))}
        <Button className='btn-max-w button_style' plain type='default' onClick={this.add}>add line</Button>
        <Button className='btn-max-w button_style' plain type='default' disabled={this.state.contentsLen ? false : true} onClick={this.remove}>remove line</Button>
      </View>
    )
  }
}
```

### Image

图片。支持 JPG、PNG、SVG、WEBP、GIF 等格式以及云文件ID。

```react
export default class PageView extends Component {
  constructor() {
    super(...arguments)
  }

  render() {
    return (
      <View className='components-page'>
        <Image
          style='width: 300px;height: 100px;background: #fff;'
          src='nerv_logo.png'
        />
        <Image
          style='width: 300px;height: 100px;background: #fff;'
          src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
        />
      </View>
    )
  }
}
```

### Button

```react
export default class PageButton extends Component {
  state = {
    btn: [
      {
        text: '页面主操作 Normal',
        size: 'default',
        type: 'primary'
      },
      {
        text: '页面主操作 Loading',
        size: 'default',
        type: 'primary',
        loading: true,
      },
      {
        text: '页面主操作 Disabled',
        size: 'default',
        type: 'primary',
        disabled: true,
      },
      {
        text: '页面次要操作 Normal',
        size: 'default',
        type: 'default'
      },
      {
        text: '页面次要操作 Disabled',
        size: 'default',
        type: 'default',
        disabled: true,
      },
      {
        text: '警告类操作 Normal',
        size: 'default',
        type: 'warn'
      },
      {
        text: '警告类操作 Disabled',
        size: 'default',
        type: 'warn',
        disabled: true,
      }
    ]
  }
  render () {
    return (
      <View className='container'>
        {this.state.btn.map(item => {
          return (
            <Button
              size={item.size ? item.size : ''}
              type={item.type ? item.type : ''}
              loading={item.loading ? item.loading : false}
              disabled={item.disabled ? item.disabled : false}
            >
              {item.text}
            </Button>
          )
        })}
        <Button className='btn-max-w' plain type='primary'>按钮</Button>
        <Button className='btn-max-w' plain type='primary' disabled>不可点击的按钮</Button>
        <Button className='btn-max-w' plain >按钮</Button>
        <Button className='btn-max-w' plain disabled >按钮</Button>
        <Button size='mini' type='primary'>按钮</Button>
        <Button size='mini' >按钮</Button>
        <Button size='mini' type='warn'>按钮</Button>
        <Button openType='getPhoneNumber' onGetPhoneNumber="callback">按钮</Button>
      </View>
    )
  }
}
```



### Input

输入框。用于获取用户输入。该组件是原生组件，使用时请注意相关限制

```react
class App extends Component {
  render () {
    return (
      <View className='example-body'>
        <Text>可以自动聚焦的 input</Text>
          <Input type='text' placeholder='将会获取焦点' focus/>
          <Text>控制最大输入长度的 input</Text>
          <Input type='text' placeholder='最大输入长度为 10' maxLength='10'/>
          <Text>数字输入的 input</Text>
          <Input type='number' placeholder='这是一个数字输入框'/>
          <Text>密码输入的 input</Text>
          <Input type='password' password placeholder='这是一个密码输入框'/>
          <Text>带小数点的 input</Text>
          <Input type='digit' placeholder='带小数点的数字键盘'/>
          <Text>身份证输入的 input</Text>
          <Input type='idcard' placeholder='身份证输入键盘'/>
          <Text>控制占位符颜色的 input</Text>
          <Input type='text' placeholder='占位符字体是红色的' placeholderStyle='color:red'/>
      </View>
    )
  }
}
```

### Form

表单。将组件内的用户输入的 switch input checkbox slider radio picker 提交。

```react
class App extends Component {

  formSubmit = e => {
    console.log(e)
  }

  formReset = e => {
    console.log(e)
  }

  render () {
    return (
      <Form onSubmit={this.formSubmit} onReset={this.formReset} >
        <View className='example-body'>
          <Switch name='switch' className='form-switch'></Switch>
        </View>
      </Form>
    )
  }
}
```



## Taro API

### 网络请求

使用 `Taro.request` 发起网络请求

```ts
Taro.request({
  url: 'test.php', //仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success: function (res) {
    console.log(res.data)
  }
})
```

### Toast 提示

使用 `Taro.showToast(option)` 进行消息提示

```tsx
Taro.showToast({
  title: '成功',
  icon: 'success',
  duration: 2000
})
```

### 获取系统信息

[Taro.getSystemInfo](https://docs.taro.zone/docs/apis/base/system/getSystemInfo) 的同步版本，获取系统信息

```tsx
try {
  const res = Taro.getSystemInfoSync()
  console.log(res.model)
  console.log(res.pixelRatio)
  console.log(res.windowWidth)
  console.log(res.windowHeight)
  console.log(res.language)
  console.log(res.version)
  console.log(res.platform)
} catch (e) {
  // Do something when catch error
}
```

### 路由跳转

`Taro.navigateTo` 、`Taro.redirectTo` 、 `Taro.reLaunch(option)` 等接口进行路由跳转。

```tsx
Taro.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function (res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
```



## 多端环境

### process.env.TARO_ENV

```tsx
ENV_TYPE.WEAPP 微信小程序环境

ENV_TYPE.SWAN 百度小程序环境

ENV_TYPE.ALIPAY 支付宝小程序环境

ENV_TYPE.TT 抖音小程序环境

ENV_TYPE.WEB WEB(H5)环境

ENV_TYPE.RN ReactNative 环境

ENV_TYPE.QUICKAPP 快应用环境

ENV_TYPE.QQ QQ小程序 环境

ENV_TYPE.JD 京东小程序 环境
```

### 多端组件

```bash
├── test.js                Test 组件默认的形式，编译到微信小程序、百度小程序和 H5 之外的端使用的版本
├── test.weapp.js          Test 组件的微信小程序版本
├── test.swan.js           Test 组件的百度小程序版本
└── test.h5.js             Test 组件的 H5 版本
```

而使用 `Test` 组件的时候，引用的方式依然和之前保持一致。`import` 的是**不带端类型的文件名**，在编译的时候会自动识别并添加端类型后缀：

```jsx
import Test from '../../components/test'
;<Test argA={1} argA={2} />
```

### 多端脚本逻辑

编写 `set_title.weapp.js`：

set_title.weapp.js

```js
import Taro from '@tarojs/taro'
export default function setTitle(title) {
  Taro.setNavigationBarTitle({
    title,
  })
}
```

编写 `set_title.h5.js`：

set_title.h5.js

```js
export default function setTitle(title) {
  document.title = title
}
```

调用：

```js
import setTitle from '../utils/set_title'

setTitle('页面标题')
```

### 多端页面路由

可以根据不同平台，设置不同的路由规则。例如：

app.config.js

```js
let pages = []

if (process.env.TARO_ENV === 'weapp') {
  pages = ['/pages/index/index']
}

if (process.env.TARO_ENV === 'swan') {
  pages = ['/pages/indexswan/indexswan']
}

export default {
  pages,
}
```

# 插件

Taro 引入了插件化机制，目的是为了让开发者能够通过编写插件的方式来为 Taro 拓展更多功能或为自身业务定制个性化功能。

插件化设计的理念
￼

**解耦合**

插件化设计使得平台特定的编译逻辑与 Taro 的核心功能解耦。开发者可以根据自己的需求，选择性地加载所需的插件，而不影响 Taro 的其他部分。这种解耦合有助于提高代码的可维护性和可扩展性。



**开放性**

Taro 的插件系统允许社区和开发者根据不同的平台需求，自由开发和使用插件。这样的开放性不仅促进了插件的快速迭代和更新，也鼓励社区参与到框架的改进中来。



**可复用性**

通过插件化，开发者可以复用已有的插件，避免重复造轮子。比如，针对不同的小程序平台，开发者可以基于已有的插件进行扩展，只需实现特定的功能，而无需重新实现所有逻辑。

### 使用插件

插件在 Taro 中，一般通过[编译配置](https://docs.taro.zone/docs/config-detail)中的 `plugins` 字段进行引入。

`plugins` 字段取值为一个数组，配置方式如下：

```js
// /config/index.js
const config = {
  plugins: [
    // 引入 npm 安装的插件
    '@tarojs/plugin-mock',
    // 引入 npm 安装的插件，并传入插件参数
    [
      '@tarojs/plugin-mock',
      {
        mocks: {
          '/api/user/1': {
            name: 'judy',
            desc: 'Mental guy',
          },
        },
      },
    ],
    // 从本地绝对路径引入插件，同样如果需要传入参数也是如上
    '/absulute/path/plugin/filename',
  ],
}
```

### 编写插件

插件目录：

```bash
├── plugins                      插件目录
|   ├── test.js.js               test插件
```

插件编写：

```js
// test.js.js
export default (ctx, options) => {
  // plugin 主体
  ctx.onBuildStart(() => {
    console.log('编译开始！')
  })
  ctx.onBuildFinish(() => {
    console.log('Webpack 编译结束！')
  })
  ctx.onBuildComplete(() => {
    console.log('Taro 构建完成！')
  })
}

```

使用自定义插件：

```js
plugins: [
  path.resolve(__dirname, '../plugins/test.js')
],
```

## 应用构建与发布

### 微信小程序

```bash
pnpm build:weapp
```

构建生成文件之后再微信开发工具进行操作发布。



## 附录

[Taro](https://docs.taro.zone/docs/)

[React](https://react.docschina.org/)