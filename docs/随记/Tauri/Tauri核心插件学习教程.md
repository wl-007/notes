---
title: Tauri 核心插件学习教程
order: 4
group:
  title: Tauri
---

# Tauri 核心插件学习教程

## Opener 插件

### 知识点

`opener` 插件负责用系统默认程序打开外部 URL、本地文件或目录，也支持在文件管理器中显示某个路径。它和 `shell` 的分工是：`opener` 只做“交给系统打开”，不负责启动任意子进程。

一个 Tauri v2 插件通常由三部分组成：

1. Rust crate：在 `src-tauri/Cargo.toml` 中声明，并在 `src-tauri/src/lib.rs` 注册。
2. JS Guest Bindings：在前端 `package.json` 中声明，页面直接 import。
3. Capability 权限：在 `src-tauri/capabilities/default.json` 中放开对应权限。

### 接入

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

### 前端封装

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

### 示例页面

页面 `src/pages/Opener/index.tsx` 演示三个场景：

1. 输入 URL 后点击“打开 URL”。
2. 通过 `resolveResource` 拿到打包资源 `data/music/2331011627.aac` 的磁盘路径。
3. 用 `openPath` 打开该资源，或用 `revealItemInDir` 在资源管理器中显示。

`resolveResource` 来自 `@tauri-apps/api/path`，它把打包资源解析成应用运行时的绝对路径。这个能力依赖 Tauri 运行时，纯浏览器 `pnpm dev` 下会报错。

### 运行方式

```bash
cd E:\workspace\web\tauri-demo
pnpm tauri dev
```

打开“浏览”下的“Opener 示例”即可测试。它演示的是“把路径交给系统”，而不是在 WebView 内读取文件内容；读取和写入文件需要 `fs` 插件。

## Dialog 与 FS 插件

### 知识点

`dialog` 负责弹出系统原生对话框，只负责“让用户选路径”，不负责读取或写入文件。`fs` 负责真正访问文件系统，包括读文本、写文本、列目录等。

两者的典型配合流程是：

1. `dialog` 让用户选择文件或目录，返回绝对路径。
2. `dialog` 会把用户选中的路径临时加入 `fs` scope。
3. 前端再把路径交给 `fs` 的 API 读取或写入。

`fs` 的 scope 是安全边界。默认只允许应用目录或显式配置的路径，用户通过对话框选择的路径会获得运行时权限，但不会跨启动保存。

### 安装与注册

```bash
pnpm tauri add dialog
pnpm tauri add fs
```

`src-tauri/src/lib.rs`：

```rust
.plugin(tauri_plugin_dialog::init())
.plugin(tauri_plugin_fs::init())
```

`src-tauri/capabilities/default.json`：

```json
{
  "permissions": [
    "core:default",
    "opener:default",
    "dialog:default",
    "fs:default"
  ]
}
```

更严格的写法是把 `fs:default` 换成 `fs:allow-read-text-file`、`fs:allow-write-text-file`、`fs:allow-read-dir` 等具体权限，并为 `fs:scope` 配置明确路径。学习示例先使用 `fs:default`，但理解它不等于“全盘可访问”。

### 前端封装

`src/services/files.ts`：

```ts
import { open, save } from "@tauri-apps/plugin-dialog";
import { readDir, readTextFile, writeTextFile, type DirEntry } from "@tauri-apps/plugin-fs";

export type { DirEntry };

export async function pickTextFile(): Promise<string | null> {
  return open({
    title: "选择文本文件",
    multiple: false,
    filters: [{ name: "文本", extensions: ["txt", "md", "json", "csv"] }],
  });
}

export async function pickDirectory(): Promise<string | null> {
  return open({
    title: "选择目录",
    directory: true,
    multiple: false,
  });
}

export function readTextFileContent(path: string) {
  return readTextFile(path);
}

export function listDirectory(path: string) {
  return readDir(path);
}

export async function saveTextToFile(content: string, defaultName: string) {
  const path = await save({
    title: "保存文本",
    defaultPath: defaultName,
    filters: [{ name: "文本", extensions: ["txt"] }],
  });

  if (path) {
    await writeTextFile(path, content);
  }

  return path;
}
```

### 示例页面

页面 `src/pages/Files/index.tsx` 演示三个能力：

1. 选择文本文件后读取内容并显示在 textarea。
2. 修改内容后通过保存对话框写回磁盘。
3. 选择目录后列出目录下第一层条目。

保存对话框返回的路径会加入当前运行时的 `fs` scope，所以 `writeTextFile` 可以直接写。应用重启后，该运行时 scope 会消失。

### 关键结论

- `dialog` 只给路径，不给内容；内容读写必须走 `fs`。
- `fs` 的所有路径都要受 scope 约束，不要为了省事把整个磁盘放开。
- 对话框选择的路径权限只保留到本次运行，需要长期记住目录时，后续用 `store` 或 `persisted-scope`。
- 插件 API 依赖 Tauri 运行时，纯浏览器 `pnpm dev` 下不可用。
