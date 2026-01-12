## webpack

### 1、webpack打包配置有哪些模块

1. `entry`: 这个属性指定了 Webpack 打包的入口文件。定义应用程序的起点，Webpack 会从这个文件开始递归地解析和构建整个依赖图。
2. `output`: output 属性用于定义打包后生成的文件的输出路径。
3. `module`: module 属性用于配置不同类型的模块要使用的加载器（Loaders），以及要应用的转换规则。
4. `plugins`: plugins 属性用于配置用于扩展 Webpack 功能的插件。插件可以执行各种任务，如打包优化、资源管理、环境变量注入等。
5. `mode`: mode 属性指定 Webpack 的构建模式，它可以是 "development"、"production" 或 "none"。不同的构建模式会启用不同的内置优化策略，例如压缩、代码分割等。
6. `devServer`：devServer 属性用于配置开发服务器（Dev Server）。它提供了一个简单的开发环境，可以在开发过程中实时编译和更新代码。

常用插件

```js
HtmlWebpackPlugin  MiniCssExtractPlugin CopyWebpackPlugin  DLLPlugin
```

DLLPlugin:这是在一个额外的独立的 webpack 设置中创建一个只有 dll 的 `bundle(dll-only-bundle)`。这个插件会生成一个名为 `manifest.json` 的文件，这个文件是用来让 `DLLReferencePlugin` 映射到相关的依赖上去的。将特定的类库打包，下次就不会重复打包。

常见的loader:

- babel-loader：用于将 ES6、ES7 或更高版本的 JavaScript 代码转换为向下兼容的 ES5 代码。
- css-loader：用于处理 CSS 文件，并解析 `@import` 和 `url()` 引入的资源。
- style-loader：将 CSS 代码注入到 HTML 页面中的 `` 标签中，以使 CSS 生效。
- sass-loader：用于处理 Sass/SCSS 文件，并将其转换为 CSS。
- less-loader：用于处理 Less 文件，并将其转换为 CSS。
- file-loader：用于处理文件，将文件复制到输出目录，并返回文件的 URL。
- url-loader：类似于 file-loader，但可以根据文件大小将文件转换为 Data URL，用于将较小的文件嵌入到代码中。

### 2、webpack配置代理服务器

```json
//webpack中配置代理服务器
devServer:{
    hot:true,    //热更新
    port:8080,    //启动的服务器端口号
    // open:true  //开启服务器成功后自动打开浏览器,指定浏览的文件
    open: '/html/homepage.html',
    //配置代理服务器,此处配置的跨域只能在开发阶段使用。临时解决，打包之后代理服务器就不存在了
    proxy: {
         // 匹配所有包含 /api 开头的请求
         '/api': {
            target: 'http://127.0.0.1:3001',   // 真正处理请求的目标后端服务器地址
            changeOrigin: true,
            // 前端所有以 /api 开头的请求，转发到后端服务器后，会自动去掉 /api
            pathRewrite: {
                '^/api': ''
            }
         }    
    }
},
```

请求栗子

```js
//发请求时：
export function http({url,method='GET',data={}}){
    // const BASE_URL = 'http://127.0.0.1:3001';
    const BASE_URL = '/api';
    const token = localStorage.getItem('token')
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:BASE_URL+url,
            method,
            data,
            dataType:"json",
            headers:{
                Authorization:'Bearer ' + token  //将token每次请求的时候放在请求头中，然后需要在token之前拼接'Bearer '
            },
            success(msg){
                resolve(msg)
            },
            error(err){
               console.log(err)
               if(err.status == 401){
                    alert('用户登录失效，请重新登录');
                    localStorage.removeItem('token');
                    location.assign('../../html/index.html')
               }
            }
        })
    })
}
```



### 3、webpack打包优化的方案有哪些。

1. **优化 loaders 配置**：loaders越多，打包越慢。通过 include 属性来指定要编译的文件，或通过 exclude 来排除不需要编译的文件；

2. **使用 HappyPack**：webpack 是单线程模型的，也就是说 webpack 需要一个一个地处理任务，不能同时处理多个任务。HappyPack 将任务分解给多个子进程去并发执行，子进程处理完后再将结果发送给主进程；
3. **分割代码以按需加载**：按照路由的方式实现页面级的懒加载。

4. **使用 Tree Shaking**：配置 Tree Shaking 来删除项目中无用的代码







