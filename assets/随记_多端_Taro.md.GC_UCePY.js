import{_ as a,c as i,o as n,ag as p}from"./chunks/framework.B1jFR3yW.js";const E=JSON.parse('{"title":"Taro4","description":"","frontmatter":{},"headers":[],"relativePath":"随记/多端/Taro.md","filePath":"随记/多端/Taro.md"}'),l={name:"随记/多端/Taro.md"};function t(e,s,h,k,r,d){return n(),i("div",null,[...s[0]||(s[0]=[p(`<h1 id="taro4" tabindex="-1">Taro4 <a class="header-anchor" href="#taro4" aria-label="Permalink to &quot;Taro4&quot;">​</a></h1><p><strong>Taro</strong> 是一个开放式跨端跨框架解决方案，支持使用 React/Vue/Nerv 等框架来开发 <a href="https://mp.weixin.qq.com/" target="_blank" rel="noreferrer">微信</a> / <a href="https://mp.jd.com/?entrance=taro" target="_blank" rel="noreferrer">京东</a> / <a href="https://smartprogram.baidu.com/" target="_blank" rel="noreferrer">百度</a> / <a href="https://mini.open.alipay.com/" target="_blank" rel="noreferrer">支付宝</a> / <a href="https://developer.open-douyin.com/" target="_blank" rel="noreferrer">字节跳动</a> / <a href="https://q.qq.com/" target="_blank" rel="noreferrer">QQ</a> / <a href="https://open.feishu.cn/document/uYjL24iN/ucDOzYjL3gzM24yN4MjN" target="_blank" rel="noreferrer">飞书</a> / <a href="https://mp.kuaishou.com/" target="_blank" rel="noreferrer">快手</a> 小程序 / H5 / RN / <a href="https://developer.huawei.com/consumer/cn/doc/atomic-ascf/ascf-overview" target="_blank" rel="noreferrer">ASCF元服务</a> 等应用。</p><h2 id="项目搭建" tabindex="-1">项目搭建 <a class="header-anchor" href="#项目搭建" aria-label="Permalink to &quot;项目搭建&quot;">​</a></h2><p>首先，你需要使用 npm 或者 yarn 全局安装 <code>@tarojs/cli</code>，或者直接使用 <a href="https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b" target="_blank" rel="noreferrer">npx</a>:</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用 pnpm 安装 CLI</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -g</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tarojs/cli</span></span></code></pre></div><p>可以使用 <code>npm info</code> 查看 Taro 版本信息，在这里你可以看到当前最新版本</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> info</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> @tarojs/cli</span></span></code></pre></div><p>使用命令创建模板项目：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">taro</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myApp</span></span></code></pre></div><p>安装依赖：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 进入项目根目录</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> myApp</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用 pnpm 安装依赖</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span></span></code></pre></div><p>配置多端生成文件地址路径：</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">outputRoot</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">\`dist/\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">process</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">env</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TARO_ENV</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span></code></pre></div><p>执行多端编译：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># pnpm</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev:weapp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build:weapp</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># yarn</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev:weapp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> yarn</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build:weapp</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># npm script</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev:weapp</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build:weapp</span></span></code></pre></div><h2 id="项目结构" tabindex="-1">项目结构 <a class="header-anchor" href="#项目结构" aria-label="Permalink to &quot;项目结构&quot;">​</a></h2><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dist</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                        编译结果目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                      项目编译配置目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                默认配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> dev.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                  开发环境配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> prod.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                 生产环境配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> src</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                         源码目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pages</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                   页面文件目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 页面目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 页面逻辑</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.css</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 页面样式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">       └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index.config.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 页面配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">   |</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                  项目入口文件</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app.css</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                 项目总通用样式</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   └──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> app.config.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           项目入口配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.config.json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">         微信小程序项目配置</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.config.json</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.tt.json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             抖音小程序项目配置</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.tt.json</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.swan.json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           百度小程序项目配置</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.swan.json</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.qq.json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             QQ</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 小程序项目配置</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> project.qq.json</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ascf.config.json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">            ASCF元服务项目配置</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ascf.config.json</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> babel.config.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             Babel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tsconfig.json</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               TypeScript</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .eslintrc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                   ESLint</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 配置</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">└──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> package.json</span></span></code></pre></div><h2 id="taro-常用组件与api" tabindex="-1">Taro 常用组件与API <a class="header-anchor" href="#taro-常用组件与api" aria-label="Permalink to &quot;Taro 常用组件与API&quot;">​</a></h2><h3 id="view" tabindex="-1">View <a class="header-anchor" href="#view" aria-label="Permalink to &quot;View&quot;">​</a></h3><p>类似 HTML的 <code>div</code></p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default class PageView extends Component {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super(...arguments)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;View className=&#39;components-page&#39;&gt;</span></span>
<span class="line"><span>        &lt;Text&gt;flex-direction: row 横向布局&lt;/Text&gt;</span></span>
<span class="line"><span>        &lt;View className=&#39;flex-wrp&#39; style=&#39;flex-direction:row;&#39;&gt;</span></span>
<span class="line"><span>          &lt;View className=&#39;flex-item demo-text-1&#39;/&gt;</span></span>
<span class="line"><span>          &lt;View className=&#39;flex-item demo-text-2&#39;/&gt;</span></span>
<span class="line"><span>          &lt;View className=&#39;flex-item demo-text-3&#39;/&gt;</span></span>
<span class="line"><span>        &lt;/View&gt;</span></span>
<span class="line"><span>        &lt;Text&gt;flex-direction: column 纵向布局&lt;/Text&gt;</span></span>
<span class="line"><span>        &lt;View className=&#39;flex-wrp&#39; style=&#39;flex-direction:column;&#39;&gt;</span></span>
<span class="line"><span>          &lt;View className=&#39;flex-item flex-item-V demo-text-1&#39;/&gt;</span></span>
<span class="line"><span>          &lt;View className=&#39;flex-item flex-item-V demo-text-2&#39;/&gt;</span></span>
<span class="line"><span>          &lt;View className=&#39;flex-item flex-item-V demo-text-3&#39;/&gt;</span></span>
<span class="line"><span>        &lt;/View&gt;</span></span>
<span class="line"><span>      &lt;/View&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="text" tabindex="-1">Text <a class="header-anchor" href="#text" aria-label="Permalink to &quot;Text&quot;">​</a></h3><p>用于显示文本，支持样式设置</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default class PageView extends Component {</span></span>
<span class="line"><span>  state = {</span></span>
<span class="line"><span>    contents: [],</span></span>
<span class="line"><span>    contentsLen: 0</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  add = () =&gt; {</span></span>
<span class="line"><span>    this.setState(prev =&gt; {</span></span>
<span class="line"><span>      const cot = prev.contents.slice()</span></span>
<span class="line"><span>      cot.push({ text: &#39;hello world&#39; })</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        contents: cot,</span></span>
<span class="line"><span>        contentsLen: cot.length</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  remove = () =&gt; {</span></span>
<span class="line"><span>    this.setState(prev =&gt; {</span></span>
<span class="line"><span>      const cot = prev.contents.slice()</span></span>
<span class="line"><span>      cot.pop()</span></span>
<span class="line"><span>      return {</span></span>
<span class="line"><span>        contents: cot,</span></span>
<span class="line"><span>        contentsLen: cot.length</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    })</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  render () {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;View className=&#39;container&#39;&gt;</span></span>
<span class="line"><span>        {this.state.contents.map((item, index) =&gt; (</span></span>
<span class="line"><span>          &lt;Text key={index}&gt;{item.text}&lt;/Text&gt;</span></span>
<span class="line"><span>        ))}</span></span>
<span class="line"><span>        &lt;Button className=&#39;btn-max-w button_style&#39; plain type=&#39;default&#39; onClick={this.add}&gt;add line&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button className=&#39;btn-max-w button_style&#39; plain type=&#39;default&#39; disabled={this.state.contentsLen ? false : true} onClick={this.remove}&gt;remove line&lt;/Button&gt;</span></span>
<span class="line"><span>      &lt;/View&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="image" tabindex="-1">Image <a class="header-anchor" href="#image" aria-label="Permalink to &quot;Image&quot;">​</a></h3><p>图片。支持 JPG、PNG、SVG、WEBP、GIF 等格式以及云文件ID。</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default class PageView extends Component {</span></span>
<span class="line"><span>  constructor() {</span></span>
<span class="line"><span>    super(...arguments)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  render() {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;View className=&#39;components-page&#39;&gt;</span></span>
<span class="line"><span>        &lt;Image</span></span>
<span class="line"><span>          style=&#39;width: 300px;height: 100px;background: #fff;&#39;</span></span>
<span class="line"><span>          src=&#39;nerv_logo.png&#39;</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>        &lt;Image</span></span>
<span class="line"><span>          style=&#39;width: 300px;height: 100px;background: #fff;&#39;</span></span>
<span class="line"><span>          src=&#39;https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67&#39;</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span>      &lt;/View&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="button" tabindex="-1">Button <a class="header-anchor" href="#button" aria-label="Permalink to &quot;Button&quot;">​</a></h3><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>export default class PageButton extends Component {</span></span>
<span class="line"><span>  state = {</span></span>
<span class="line"><span>    btn: [</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;页面主操作 Normal&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;primary&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;页面主操作 Loading&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;primary&#39;,</span></span>
<span class="line"><span>        loading: true,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;页面主操作 Disabled&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;primary&#39;,</span></span>
<span class="line"><span>        disabled: true,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;页面次要操作 Normal&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;default&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;页面次要操作 Disabled&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;default&#39;,</span></span>
<span class="line"><span>        disabled: true,</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;警告类操作 Normal&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;warn&#39;</span></span>
<span class="line"><span>      },</span></span>
<span class="line"><span>      {</span></span>
<span class="line"><span>        text: &#39;警告类操作 Disabled&#39;,</span></span>
<span class="line"><span>        size: &#39;default&#39;,</span></span>
<span class="line"><span>        type: &#39;warn&#39;,</span></span>
<span class="line"><span>        disabled: true,</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  render () {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;View className=&#39;container&#39;&gt;</span></span>
<span class="line"><span>        {this.state.btn.map(item =&gt; {</span></span>
<span class="line"><span>          return (</span></span>
<span class="line"><span>            &lt;Button</span></span>
<span class="line"><span>              size={item.size ? item.size : &#39;&#39;}</span></span>
<span class="line"><span>              type={item.type ? item.type : &#39;&#39;}</span></span>
<span class="line"><span>              loading={item.loading ? item.loading : false}</span></span>
<span class="line"><span>              disabled={item.disabled ? item.disabled : false}</span></span>
<span class="line"><span>            &gt;</span></span>
<span class="line"><span>              {item.text}</span></span>
<span class="line"><span>            &lt;/Button&gt;</span></span>
<span class="line"><span>          )</span></span>
<span class="line"><span>        })}</span></span>
<span class="line"><span>        &lt;Button className=&#39;btn-max-w&#39; plain type=&#39;primary&#39;&gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button className=&#39;btn-max-w&#39; plain type=&#39;primary&#39; disabled&gt;不可点击的按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button className=&#39;btn-max-w&#39; plain &gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button className=&#39;btn-max-w&#39; plain disabled &gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button size=&#39;mini&#39; type=&#39;primary&#39;&gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button size=&#39;mini&#39; &gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button size=&#39;mini&#39; type=&#39;warn&#39;&gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>        &lt;Button openType=&#39;getPhoneNumber&#39; onGetPhoneNumber=&quot;callback&quot;&gt;按钮&lt;/Button&gt;</span></span>
<span class="line"><span>      &lt;/View&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="input" tabindex="-1">Input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;Input&quot;">​</a></h3><p>输入框。用于获取用户输入。该组件是原生组件，使用时请注意相关限制</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class App extends Component {</span></span>
<span class="line"><span>  render () {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;View className=&#39;example-body&#39;&gt;</span></span>
<span class="line"><span>        &lt;Text&gt;可以自动聚焦的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;text&#39; placeholder=&#39;将会获取焦点&#39; focus/&gt;</span></span>
<span class="line"><span>          &lt;Text&gt;控制最大输入长度的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;text&#39; placeholder=&#39;最大输入长度为 10&#39; maxLength=&#39;10&#39;/&gt;</span></span>
<span class="line"><span>          &lt;Text&gt;数字输入的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;number&#39; placeholder=&#39;这是一个数字输入框&#39;/&gt;</span></span>
<span class="line"><span>          &lt;Text&gt;密码输入的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;password&#39; password placeholder=&#39;这是一个密码输入框&#39;/&gt;</span></span>
<span class="line"><span>          &lt;Text&gt;带小数点的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;digit&#39; placeholder=&#39;带小数点的数字键盘&#39;/&gt;</span></span>
<span class="line"><span>          &lt;Text&gt;身份证输入的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;idcard&#39; placeholder=&#39;身份证输入键盘&#39;/&gt;</span></span>
<span class="line"><span>          &lt;Text&gt;控制占位符颜色的 input&lt;/Text&gt;</span></span>
<span class="line"><span>          &lt;Input type=&#39;text&#39; placeholder=&#39;占位符字体是红色的&#39; placeholderStyle=&#39;color:red&#39;/&gt;</span></span>
<span class="line"><span>      &lt;/View&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h3 id="form" tabindex="-1">Form <a class="header-anchor" href="#form" aria-label="Permalink to &quot;Form&quot;">​</a></h3><p>表单。将组件内的用户输入的 switch input checkbox slider radio picker 提交。</p><div class="language-react vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">react</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>class App extends Component {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  formSubmit = e =&gt; {</span></span>
<span class="line"><span>    console.log(e)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  formReset = e =&gt; {</span></span>
<span class="line"><span>    console.log(e)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  render () {</span></span>
<span class="line"><span>    return (</span></span>
<span class="line"><span>      &lt;Form onSubmit={this.formSubmit} onReset={this.formReset} &gt;</span></span>
<span class="line"><span>        &lt;View className=&#39;example-body&#39;&gt;</span></span>
<span class="line"><span>          &lt;Switch name=&#39;switch&#39; className=&#39;form-switch&#39;&gt;&lt;/Switch&gt;</span></span>
<span class="line"><span>        &lt;/View&gt;</span></span>
<span class="line"><span>      &lt;/Form&gt;</span></span>
<span class="line"><span>    )</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h2 id="taro-api" tabindex="-1">Taro API <a class="header-anchor" href="#taro-api" aria-label="Permalink to &quot;Taro API&quot;">​</a></h2><h3 id="网络请求" tabindex="-1">网络请求 <a class="header-anchor" href="#网络请求" aria-label="Permalink to &quot;网络请求&quot;">​</a></h3><p>使用 <code>Taro.request</code> 发起网络请求</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Taro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">request</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  url: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;test.php&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//仅为示例，并非真实的接口地址</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  data: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    x: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    y: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  header: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;content-type&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;application/json&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 默认值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.data)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="toast-提示" tabindex="-1">Toast 提示 <a class="header-anchor" href="#toast-提示" aria-label="Permalink to &quot;Toast 提示&quot;">​</a></h3><p>使用 <code>Taro.showToast(option)</code> 进行消息提示</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Taro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">showToast</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  title: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;成功&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  icon: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;success&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  duration: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="获取系统信息" tabindex="-1">获取系统信息 <a class="header-anchor" href="#获取系统信息" aria-label="Permalink to &quot;获取系统信息&quot;">​</a></h3><p><a href="https://docs.taro.zone/docs/apis/base/system/getSystemInfo" target="_blank" rel="noreferrer">Taro.getSystemInfo</a> 的同步版本，获取系统信息</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">try</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Taro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getSystemInfoSync</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.model)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.pixelRatio)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.windowWidth)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.windowHeight)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.language)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.version)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(res.platform)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">catch</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (e) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // Do something when catch error</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="路由跳转" tabindex="-1">路由跳转 <a class="header-anchor" href="#路由跳转" aria-label="Permalink to &quot;路由跳转&quot;">​</a></h3><p><code>Taro.navigateTo</code> 、<code>Taro.redirectTo</code> 、 <code>Taro.reLaunch(option)</code> 等接口进行路由跳转。</p><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Taro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">navigateTo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  url: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;test?id=1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  events: {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    acceptDataFromOpenedPage</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    someEvent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">data</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 通过eventChannel向被打开页面传送数据</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    res.eventChannel.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;acceptDataFromOpenerPage&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, { data: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;test&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h2 id="多端环境" tabindex="-1">多端环境 <a class="header-anchor" href="#多端环境" aria-label="Permalink to &quot;多端环境&quot;">​</a></h2><h3 id="process-env-taro-env" tabindex="-1">process.env.TARO_ENV <a class="header-anchor" href="#process-env-taro-env" aria-label="Permalink to &quot;process.env.TARO_ENV&quot;">​</a></h3><div class="language-tsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">tsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">WEAPP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 微信小程序环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">SWAN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 百度小程序环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ALIPAY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 支付宝小程序环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TT</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 抖音小程序环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">WEB</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WEB</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">H5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">RN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ReactNative 环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">QUICKAPP</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 快应用环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">QQ</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> QQ小程序 环境</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ENV_TYPE</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">JD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 京东小程序 环境</span></span></code></pre></div><h3 id="多端组件" tabindex="-1">多端组件 <a class="header-anchor" href="#多端组件" aria-label="Permalink to &quot;多端组件&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                Test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 组件默认的形式，编译到微信小程序、百度小程序和</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> H5</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 之外的端使用的版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.weapp.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          Test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 组件的微信小程序版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.swan.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">           Test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 组件的百度小程序版本</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">└──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.h5.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">             Test</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 组件的</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> H5</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 版本</span></span></code></pre></div><p>而使用 <code>Test</code> 组件的时候，引用的方式依然和之前保持一致。<code>import</code> 的是<strong>不带端类型的文件名</strong>，在编译的时候会自动识别并添加端类型后缀：</p><div class="language-jsx vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jsx</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Test </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;../../components/test&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Test argA</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} argA</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/&gt;</span></span></code></pre></div><h3 id="多端脚本逻辑" tabindex="-1">多端脚本逻辑 <a class="header-anchor" href="#多端脚本逻辑" aria-label="Permalink to &quot;多端脚本逻辑&quot;">​</a></h3><p>编写 <code>set_title.weapp.js</code>：</p><p>set_title.weapp.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Taro </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;@tarojs/taro&#39;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Taro.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setNavigationBarTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    title,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>编写 <code>set_title.h5.js</code>：</p><p>set_title.h5.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> setTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  document.title </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> title</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>调用：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> setTitle </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;../utils/set_title&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">setTitle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;页面标题&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="多端页面路由" tabindex="-1">多端页面路由 <a class="header-anchor" href="#多端页面路由" aria-label="Permalink to &quot;多端页面路由&quot;">​</a></h3><p>可以根据不同平台，设置不同的路由规则。例如：</p><p>app.config.js</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">let</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pages </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (process.env.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TARO_ENV</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;weapp&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pages </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/pages/index/index&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (process.env.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">TARO_ENV</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> ===</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;swan&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pages </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/pages/indexswan/indexswan&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pages,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h1 id="插件" tabindex="-1">插件 <a class="header-anchor" href="#插件" aria-label="Permalink to &quot;插件&quot;">​</a></h1><p>Taro 引入了插件化机制，目的是为了让开发者能够通过编写插件的方式来为 Taro 拓展更多功能或为自身业务定制个性化功能。</p><p>插件化设计的理念 ￼</p><p><strong>解耦合</strong></p><p>插件化设计使得平台特定的编译逻辑与 Taro 的核心功能解耦。开发者可以根据自己的需求，选择性地加载所需的插件，而不影响 Taro 的其他部分。这种解耦合有助于提高代码的可维护性和可扩展性。</p><p><strong>开放性</strong></p><p>Taro 的插件系统允许社区和开发者根据不同的平台需求，自由开发和使用插件。这样的开放性不仅促进了插件的快速迭代和更新，也鼓励社区参与到框架的改进中来。</p><p><strong>可复用性</strong></p><p>通过插件化，开发者可以复用已有的插件，避免重复造轮子。比如，针对不同的小程序平台，开发者可以基于已有的插件进行扩展，只需实现特定的功能，而无需重新实现所有逻辑。</p><h3 id="使用插件" tabindex="-1">使用插件 <a class="header-anchor" href="#使用插件" aria-label="Permalink to &quot;使用插件&quot;">​</a></h3><p>插件在 Taro 中，一般通过<a href="https://docs.taro.zone/docs/config-detail" target="_blank" rel="noreferrer">编译配置</a>中的 <code>plugins</code> 字段进行引入。</p><p><code>plugins</code> 字段取值为一个数组，配置方式如下：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// /config/index.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> config</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 引入 npm 安装的插件</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;@tarojs/plugin-mock&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 引入 npm 安装的插件，并传入插件参数</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    [</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">      &#39;@tarojs/plugin-mock&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        mocks: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">          &#39;/api/user/1&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;judy&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">            desc: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Mental guy&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">          },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    ],</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    // 从本地绝对路径引入插件，同样如果需要传入参数也是如上</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &#39;/absulute/path/plugin/filename&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="编写插件" tabindex="-1">编写插件 <a class="header-anchor" href="#编写插件" aria-label="Permalink to &quot;编写插件&quot;">​</a></h3><p>插件目录：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> plugins</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">                      插件目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   ├──</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> test.js.js</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">               test插件</span></span></code></pre></div><p>插件编写：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// test.js.js</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">ctx</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">options</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // plugin 主体</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onBuildStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;编译开始！&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onBuildFinish</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Webpack 编译结束！&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ctx.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onBuildComplete</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    console.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">log</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Taro 构建完成！&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  })</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>使用自定义插件：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">plugins</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  path.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">resolve</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(__dirname, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;../plugins/test.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span></code></pre></div><h2 id="应用构建与发布" tabindex="-1">应用构建与发布 <a class="header-anchor" href="#应用构建与发布" aria-label="Permalink to &quot;应用构建与发布&quot;">​</a></h2><h3 id="微信小程序" tabindex="-1">微信小程序 <a class="header-anchor" href="#微信小程序" aria-label="Permalink to &quot;微信小程序&quot;">​</a></h3><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pnpm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build:weapp</span></span></code></pre></div><p>构建生成文件之后再微信开发工具进行操作发布。</p><h2 id="附录" tabindex="-1">附录 <a class="header-anchor" href="#附录" aria-label="Permalink to &quot;附录&quot;">​</a></h2><p><a href="https://docs.taro.zone/docs/" target="_blank" rel="noreferrer">Taro</a></p><p><a href="https://react.docschina.org/" target="_blank" rel="noreferrer">React</a></p>`,95)])])}const g=a(l,[["render",t]]);export{E as __pageData,g as default};
