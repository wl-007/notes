---
title: Tauri Opener 插件
order: 4
group:
  title: Tauri
---

# Tauri Opener 插件

## 知识点

`opener` 插件负责用系统默认程序打开外部 URL、本地文件或目录，也支持在文件管理器中显示某个路径。它和 `shell` 的分工是：`opener` 只做“交给系统打开”，不负责启动任意子进程。

一个 Tauri v2 插件通常由三部分组成：

1. Rust crate：在 `src-tauri/Cargo.toml` 中声明，并在 `src-tauri/src/lib.rs` 注册。
2. JS Guest Bindings：在前端 `package.json` 中声明，页面直接 import。
3. Capability 权限：在 `src-tauri/capabilities/default.json` 中放开对应权限。

## 接入

本项目已经在 Cargo 和 npm 中安装 `opener`，所以只需要确认注册和权限：

`src-tauri/src/lib.rs`：

```rust
.plugin(tauri_plugin_opener::init())
```

`src-tauri/capabilities/default.json`：

```json
{
  "permissions": [
    "core:default",
    "opener:default"
  ]
}
```

## 前端封装

把插件 API 集中到 service，页面不直接依赖插件包：

`src/services/opener.ts`：

```ts
import { openPath, openUrl, revealItemInDir } from "@tauri-apps/plugin-opener";

export function openExternalUrl(url: string) {
  return openUrl(url);
}

export function openLocalPath(path: string) {
  return openPath(path);
}

export function revealPath(path: string) {
  return revealItemInDir(path);
}
```

三个方法分别对应：

- `openUrl`：打开网页，默认浏览器。
- `openPath`：用系统默认程序打开本地文件。
- `revealItemInDir`：在文件管理器中显示路径，移动端不支持。

## 示例页面

页面 `src/pages/Opener/index.tsx` 演示三个场景：

1. 输入 URL 后点击“打开 URL”。
2. 通过 `resolveResource` 拿到打包资源 `data/music/2331011627.aac` 的磁盘路径。
3. 用 `openPath` 打开该资源，或用 `revealItemInDir` 在资源管理器中显示。

`resolveResource` 来自 `@tauri-apps/api/path`，它把打包资源解析成应用运行时的绝对路径。这个能力依赖 Tauri 运行时，纯浏览器 `pnpm dev` 下会报错。

## 代码位置

- 前端封装：`E:\workspace\web\tauri-demo\src\services\opener.ts`
- 示例页面：`E:\workspace\web\tauri-demo\src\pages\Opener\index.tsx`
- 插件注册：`E:\workspace\web\tauri-demo\src-tauri\src\lib.rs`
- 权限配置：`E:\workspace\web\tauri-demo\src-tauri\capabilities\default.json`

## 运行方式

```bash
cd E:\workspace\web\tauri-demo
pnpm tauri dev
```

打开“浏览”下的“Opener 示例”即可测试。它演示的是“把路径交给系统”，而不是在 WebView 内读取文件内容；读取和写入文件需要后面的 `fs` 插件。
