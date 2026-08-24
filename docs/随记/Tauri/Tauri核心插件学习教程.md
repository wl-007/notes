---
title: Tauri 核心插件学习教程
order: 5
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
    "opener:default",
    {
      "identifier": "opener:allow-open-path",
      "allow": [
        {
          "path": "$RESOURCE/**/*"
        }
      ]
    }
  ]
}
```

`opener:default` 只默认允许打开 `http(s)`、`tel`、`mailto` URL，以及在文件管理器中显示路径。`openPath` 打开本地文件还需要 `opener:allow-open-path`，并通过 scope 限定允许的路径；示例只放行打包资源目录 `$RESOURCE`。

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

页面 `src/pages/Browse/Opener/index.tsx` 演示三个场景：

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
    "fs:default",
    {
      "identifier": "fs:allow-write-text-file",
      "allow": [
        {
          "path": "$HOME/**"
        }
      ]
    }
  ]
}
```

`fs:default` 只提供应用专属目录的读权限，不包含写文本命令。保存文本需要单独启用 `fs:allow-write-text-file`，并配置允许写入的路径 scope；示例只放开用户主目录 `$HOME`。

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

export async function chooseAndSaveTextFile(content: string, defaultName: string) {
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

export function writeTextToExistingFile(path: string, content: string) {
  return writeTextFile(path, content);
}
```

### 示例页面

页面 `src/pages/Browse/Files/index.tsx` 演示文件生命周期：

1. “新增”：清空当前文件路径和内容，进入新建状态。
2. “选择文本文件”：打开并读取文件，记录当前路径。
3. “保存”：已有路径时直接写入原文件；没有路径时打开保存对话框选择位置。
4. “另存为”：始终打开保存对话框，保存后切换当前路径。
5. “选择目录”：列出目录下第一层条目。

保存对话框返回的路径会加入当前运行时的 `fs` scope，所以 `writeTextFile` 可以直接写。应用重启后，该运行时 scope 会消失。

### 关键结论

- `dialog` 只给路径，不给内容；内容读写必须走 `fs`。
- `fs` 的所有路径都要受 scope 约束，不要为了省事把整个磁盘放开。
- 对话框选择的路径权限只保留到本次运行，需要长期记住目录时，后续用 `store` 或 `persisted-scope`。
- 插件 API 依赖 Tauri 运行时，纯浏览器 `pnpm dev` 下不可用。

## FS Pro 增强插件

### 知识点

`tauri-plugin-fs-pro` 是社区增强插件，不是官方 `fs` 的替代品。官方 `fs` 负责文本读写、列目录、删除、移动等基础能力；`fs-pro` 主要补充：

- `metadata`：同时支持文件和目录的大小与元数据。
- `size`：文件或目录的字节大小。
- `compress` / `decompress`：tar.gz 压缩和解压。
- `transfer`：移动文件或目录。
- `icon`：获取系统文件图标。

官方 `fs` 的 `stat` 获取大小主要面向文件，而 `fs-pro` 的 `metadata` 和 `size` 可以递归计算目录大小。

### 安装与注册

```bash
cargo add tauri-plugin-fs-pro
pnpm add tauri-plugin-fs-pro-api
```

`src-tauri/src/lib.rs`：

```rust
.plugin(tauri_plugin_fs_pro::init())
```

`src-tauri/capabilities/default.json`：

```json
{
  "permissions": [
    "fs-pro:default"
  ]
}
```

### 前端封装

`src/services/fsPro.ts`：

```ts
import { metadata, size, type Metadata } from "tauri-plugin-fs-pro-api";

export type { Metadata };

export function getPathMetadata(path: string) {
  return metadata(path);
}

export function getPathSize(path: string) {
  return size(path);
}
```

### 示例页面

`src/pages/Browse/Files/index.tsx` 新增“FS Pro 信息”区域：

1. 目标路径优先取当前文本文件路径，没有则取当前目录路径。
2. “查看信息”调用 `metadata`，展示 `fullName`、`isFile`、`isDir`、`size`、`parentName`。
3. “计算大小”调用 `size`，文件和目录都可以计算。

### 安全注意点

`fs-pro:default` 会一次性放开插件的大部分能力，适合学习 Demo，不适合直接带到生产。生产环境建议只配置实际用到的权限，例如：

```json
{
  "identifier": "fs-pro:allow-metadata",
  "allow": [
    {
      "path": "$HOME/**"
    }
  ]
}
```

`compress`、`decompress`、`transfer` 属于高影响操作，使用前必须明确限制路径 scope，不要让前端传入任意路径。

## Store 插件

### 知识点

`store` 是官方提供的异步 key-value 持久化插件，默认把数据保存到应用数据目录下的 JSON 文件。它适合保存设置、最近路径、用户偏好等小型配置，不适合当关系型数据库用。

和 Web 侧方案的区别：

- `localStorage`：同步、浏览器内可用，但前端无法感知磁盘文件，也不适合 Rust 侧读取。
- `IndexedDB`：适合结构化、大量前端数据，但不能直接作为 Tauri 后端可读的配置文件。
- `store`：前端和 Rust 都能访问，数据落到 `app_data_dir` 的 JSON 文件，适合应用设置。

### 安装与注册

```bash
pnpm tauri add store
```

`src-tauri/src/lib.rs`：

```rust
.plugin(tauri_plugin_store::Builder::new().build())
```

`src-tauri/capabilities/default.json`：

```json
{
  "permissions": [
    "store:default"
  ]
}
```

### API

```ts
import { Store } from "@tauri-apps/plugin-store";

const store = await Store.load("settings.json");
const theme = (await store.get<string>("theme")) ?? "light";

await store.set("theme", "dark");
await store.save();
```

`Store.load` 返回同一个路径对应的实例；`get` 读取不到时返回 `undefined`，所以要自己给默认值；`set` 只改内存，`save` 才会写入磁盘。

### 前端封装

`src/services/settings.ts` 集中管理设置：

```ts
import { Store } from "@tauri-apps/plugin-store";

const storePath = "settings.json";

async function getSettingsStore() {
  return Store.load(storePath, { autoSave: false });
}

export async function loadSettings() {
  const store = await getSettingsStore();
  const theme = await store.get<string>("theme");
  const lastOpenedPath = await store.get<string>("lastOpenedPath");

  return {
    theme: theme ?? "light",
    lastOpenedPath: lastOpenedPath ?? "",
  };
}

export async function saveSettings(settings: Partial<AppSettings>) {
  const current = await loadSettings();
  const next = { ...current, ...settings };
  const store = await getSettingsStore();

  await store.set("theme", next.theme);
  await store.set("lastOpenedPath", next.lastOpenedPath);
  await store.save();

  return next;
}
```

### 主题联动

`src/theme/useTheme.ts` 启动时先从 store 读取主题，读取失败时回退 localStorage；主题变化时同时写 localStorage 和 store。这样 `pnpm tauri dev` 使用 store 持久化，纯浏览器 `pnpm dev` 仍能靠 localStorage 工作。

### 示例页面

`src/pages/Browse/Store/index.tsx` 提供主题选择、最近打开路径输入、保存和重置。保存后重启应用，主题和路径都会从 `settings.json` 恢复。

## SQL 官方插件

### 知识点

`tauri-plugin-sql` 基于 `sqlx`，支持 SQLite、MySQL、Postgres。本项目只启用 `sqlite` feature，其他驱动不会打包进应用。

官方插件通过 `Database.load` 连接数据库，提供两个核心方法：

- `execute(query, values)`：执行 INSERT、UPDATE、DELETE。
- `select<T>(query, values)`：执行 SELECT。

SQLite 和 Postgres 使用 `$1`、`$2` 参数占位符；MySQL 使用 `?`。本项目只学 SQLite。

### 安装与注册

```bash
pnpm tauri add sql
```

`src-tauri/Cargo.toml` 只启用 SQLite：

```toml
tauri-plugin-sql = { version = "2", features = ["sqlite"] }
```

`src-tauri/src/lib.rs`：

```rust
.plugin(tauri_plugin_sql::Builder::new().build())
```

`src-tauri/capabilities/default.json`：

```json
{
  "permissions": [
    "sql:default"
  ]
}
```

### API

```ts
import Database from "@tauri-apps/plugin-sql";

const db = await Database.load("sqlite:demo.db");

await db.execute(
  "INSERT INTO notes (title, content) VALUES ($1, $2)",
  ["标题", "内容"],
);

const rows = await db.select(
  "SELECT id, title, content FROM notes WHERE id = $1",
  [1],
);
```

SQLite 数据库路径相对 Tauri 的应用配置/数据目录，`Database.load` 会自动创建数据库文件。

### 前端封装

`src/services/database.ts` 集中封装建表、列表、新增、更新、删除：

```ts
let dbPromise: Promise<Database> | null = null;

function getDatabase() {
  dbPromise ??= Database.load("sqlite:demo.db").then(async (db) => {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    return db;
  });

  return dbPromise;
}
```

页面所有 SQL 都走 `createNote`、`updateNote`、`deleteNote`、`listNotes` 封装，不直接在 React 组件里拼接 SQL。

### 示例页面

`src/pages/Browse/Sql/index.tsx` 实现笔记 CRUD：

1. 打开页面时自动建表并加载记录。
2. “新增”插入一条记录。
3. “编辑”把记录回填到表单，“保存修改”执行 UPDATE。
4. “删除”按主键执行 DELETE。

### 事务注意点

官方 `tauri-plugin-sql` 的前端 API 没有独立的事务方法。直接在 JS 里执行 `BEGIN` / `COMMIT` 不可靠，因为连接池可能使用不同连接。真实事务应该写在 Rust 命令中，由同一个连接完成，再暴露给前端调用。

## SQLite 路径设置窗口

### 知识点

JS API 创建的独立窗口 `#/window-settings` 改成了 SQLite 路径管理器：首次打开显示默认路径，用户选择或输入新的 `.db` 文件路径后保存到 `settings.json`。切换路径时，如果旧数据库文件存在就复制到新位置；旧文件不存在则跳过复制。

`AppSettings` 增加 `sqlitePath` 字段，空字符串表示“使用默认路径”。默认路径通过 `appConfigDir()` 拼上 `demo.db` 得到，和官方 SQL 插件默认使用的应用配置目录一致。

### 路径切换流程

1. 设置窗口读取 `loadSettings()` 和 `getDefaultSqlitePath()`，展示当前生效路径。
2. 点击“选择文件”调用 dialog 的 `save()`，得到完整的 `.db` 文件路径。
3. 保存前先检查目标文件是否存在：存在则报错，不覆盖。
4. 用 `isAbsolute` 校验目标是绝对路径，避免相对路径在复制和 SQL 解析时指向不同位置。
5. 关闭旧的 SQLite 连接，再调用 Rust 命令 `sqlite:copy` 复制文件；源文件不存在时返回 `copied: false`，直接跳过复制。
6. `saveSettings({ sqlitePath })` 写入 store，并 `emit("sqlite-path-changed", path)`。

SQL 服务不再硬编码 `sqlite:demo.db`，每次连接前读取当前设置；路径变化时先关闭旧连接再 `Database.load("sqlite:" + path)`。SQL 页面监听 `sqlite-path-changed` 事件，切换后自动刷新列表。

### 为什么复制用 Rust 命令

`tauri-plugin-fs` 的文件访问受 scope 限制，历史会话里选择的路径不会一直留在运行时 scope 中。复制命令放在 `command_rust` 里用 `std::fs::copy` 完成，避免为了任意路径放宽 fs scope，也避免复制时被 SQLite 文件锁影响。

### 权限

`src-tauri/capabilities/default.json` 的 `windows` 需要同时包含 `main` 和 `demo-settings-window`，否则 JS 创建的新窗口没有 store、dialog、sql、fs-pro 等插件权限。

注意 `sql:default` 只包含 `load`、`select`、`close`，不包含 `execute`；要执行 INSERT/UPDATE/DELETE 必须在 capabilities 里额外加 `sql:allow-execute`。
