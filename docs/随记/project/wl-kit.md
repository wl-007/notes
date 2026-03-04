---
title: wl-kit
order: 2
group:
  title: 项目
---

# wl-kit

一个简洁的脚手架工具

## 背景介绍

在企业级软件开发过程中，开发团队通常面临规范化、流程化和自动化的挑战。命令行工具能够有效解决这些问题，它的作用体现在以下几个方面：

### 规范化问题

- 项目开发中，代码风格、目录结构、组件命名等方面容易因个人习惯而不一致，导致项目的整体质量下降，维护成本上升。
- 规范化的需求不仅涉及代码层面，还包括项目构建、依赖管理、测试框架的使用等各个方面。

### 流程化问题

- 大型项目通常涉及多个子系统或模块，开发流程复杂，人工操作容易出错或漏操作。
- 在项目初始化、环境配置、依赖安装、测试、部署等流程中，如果没有统一的流程指导和工具辅助，容易出现流程混乱，效率低下的问题。

### 自动化问题

- 随着项目复杂度的增加，手动处理日常开发中的重复性工作不仅耗时耗力，还容易引入人为错误。
- 自动化工具能够帮助团队在开发、测试、构建、部署等环节减少重复劳动，提高工作效率，确保质量的一致性。

脚手架工具就能很好的帮我们处理这些重复而繁琐的工作，我们并不需要每个项目都从零开始做一遍重复的工作，只需要一个命令就可以完成这些工作。

就比如我们想创建一个 vue 项目，那么我们可以使用 create-vue，如果我们想创建一个 react 项目，那么我们可以使用 create-react-app，这些脚手架工具，提供给了开发者非常便捷的功能。

## 项目技术栈

### 核心技术栈

- commander: 强大的 Node.js 命令行接口解决方案，用于解析命令行参数、定义子命令和选项，是构建 CLI 工具的核心库

- @clack/prompts: 现代化的交互式命令行提示工具，提供美观的用户交互界面，用于收集用户输入、确认选择等交互操作

- tsup: 快速、简单、modern 模块打包工具，用于构建 Node.js 项目，支持 TypeScript、ESM、CJS 等模块格式，并支持 TypeScript 类型检查

### 其他依赖

- consola: 优雅的控制台日志工具，提供丰富的日志级别、格式化输出和错误处理功能，比原生 console 更强大

- execa: 进程执行工具，用于在 Node.js 中执行子进程命令，支持 Promise API，比原生 child_process 更易用

- fs-extra: 增强的文件系统操作库，基于 fs 模块扩展，提供了更多实用的文件操作方法，如复制、删除、移动等，并支持 Promise

- picocolors: 轻量级的终端颜色输出工具，用于在命令行中输出带颜色的文本，提升用户体验

- semver: 语义化版本管理工具，用于解析、比较和操作版本号，确保版本号的规范性和一致性

- giget: 下载 git 仓库或模板的工具，支持从 GitHub、Gitee 等平台下载模板，用于脚手架的模板拉取功能

- tar: tar 压缩解压工具，用于处理 tar 格式的压缩文件，在项目模板下载和解压过程中使用 


## 实现方案

### 命令行工具入口

- package.json文件定义bin入口（npm 包的可执行命令配置）

```json
{
	"bin": {
		"wl": "bin/wl"
	},
}
```

- 创建bin/wl文件

```bash
#!/usr/bin/env node

const run = require('../dist/index.js').run
run()

```


> ​	\#!/usr/bin/env node的作用：告诉操作系统使用什么解释器来执行脚本

### 命令行参数解析

在 Node.js 中解析命令行参数有多种方式，下面介绍两种主要方法：

#### 方法一：使用原生 process.argv 解析

Node.js 原生提供了 `process.argv` 来获取命令行参数，这是一个包含命令行参数的数组。

```javascript
// bin/cli.js
#!/usr/bin/env node

const args = process.argv.slice(2); // 去掉前两个元素（node路径和脚本路径）
console.log('原始参数:', args);

// 解析参数
const options = {};
const positionalArgs = [];

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  // 处理 --option=value 格式
  if (arg.startsWith('--')) {
    const parts = arg.slice(2).split('=');
    const key = parts[0];
    const value = parts.length > 1 ? parts[1] : true;
    options[key] = value;
  }
  // 处理 -o 格式
  else if (arg.startsWith('-')) {
    const key = arg.slice(1);
    options[key] = args[i + 1] && !args[i + 1].startsWith('-') ? args[++i] : true;
  }
  // 处理位置参数
  else {
    positionalArgs.push(arg);
  }
}

console.log('选项:', options);
console.log('位置参数:', positionalArgs);
```

**使用示例：**
```bash
wl command --option1 value1 --option2 value2 -h value3

```
**输出结果**
```bash
选项: { option1: 'value1', option2: 'value2', h: 'value3' }
```


**原生方法的优缺点：**
- ✅ 无需额外依赖
- ✅ 完全可控
- ❌ 需要手动处理各种参数格式
- ❌ 缺少帮助信息、版本号等内置功能
- ❌ 代码复杂，容易出错

#### 方法二：使用 commander 解析

commander 是一个功能强大的命令行参数解析库，提供了更简洁的 API 和丰富的功能。

```javascript
// bin/cli.js
#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('wl')
  .description('一个简洁的脚手架工具')
  .version('1.0.0');

// 定义子命令
program
  .command('create <name>')
  .description('创建一个新项目')
  .option('-t, --template <template>', '项目模板', 'default')
  .option('-f, --force', '强制覆盖已存在的目录')
  .option('-v, --version <version>', '指定项目版本')
  .action((name, options) => {
    console.log('创建项目:', name);
    console.log('模板:', options.template);
    console.log('强制覆盖:', options.force);
    console.log('版本:', options.version);
  });

// 定义全局选项
program
  .option('-d, --debug', '调试模式')
  .option('-c, --config <path>', '配置文件路径');

program.parse(process.argv);

// 访问全局选项
if (program.opts().debug) {
  console.log('调试模式已启用');
}
```

**使用示例：**
```bash
# 创建项目
wl create my-app --template vue --force

# 查看帮助
wl --help

# 查看子命令帮助
wl create --help

# 查看版本
wl --version

# 使用全局选项
wl create my-app -d -c ./config.json
```

**commander 的优缺点：**
- ✅ API 简洁，代码清晰
- ✅ 自动生成帮助信息
- ✅ 支持子命令、选项、参数验证
- ✅ 内置版本号显示
- ✅ 支持自动类型转换
- ✅ 社区活跃，文档完善
- ❌ 需要额外安装依赖
- ❌ 对于非常简单的场景可能显得"重"

#### 推荐使用场景

- **使用原生 process.argv**：适合非常简单的脚本，参数少且格式固定，不想引入额外依赖
- **使用 commander**：适合构建完整的 CLI 工具，需要子命令、帮助信息、参数验证等功能

在实际的脚手架工具开发中，**推荐使用 commander**，因为它能显著提升开发效率和用户体验。

### 用户输入获取

在命令行工具中，获取用户输入是常见的交互方式。下面介绍两种主要方法：

#### 方法一：使用原生 readline 模块

Node.js 原生提供了 `readline` 模块来处理命令行输入输出。

```javascript
// utils/input.js
import readline from 'readline';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

// 简单的文本输入
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

// 确认选择（是/否）
function askConfirm(question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/n): `, (answer) => {
      const normalized = answer.toLowerCase().trim();
      resolve(normalized === 'y' || normalized === 'yes');
    });
  });
}

// 选择列表
function askSelect(question, options) {
  return new Promise((resolve) => {
    console.log(question);
    options.forEach((option, index) => {
      console.log(`  ${index + 1}. ${option}`);
    });
    
    rl.question('请输入选项编号: ', (answer) => {
      const index = parseInt(answer) - 1;
      if (index >= 0 && index < options.length) {
        resolve(options[index]);
      } else {
        console.log('无效的选项');
        resolve(null);
      }
    });
  });
}

```

**原生方法的优缺点：**
- ✅ 无需额外依赖
- ✅ 完全可控，可以自定义所有交互逻辑
- ❌ 用户体验较差，界面简陋
- ❌ 需要手动处理各种输入验证
- ❌ 缺少颜色、动画等视觉效果
- ❌ 代码复杂，需要处理各种边界情况

#### 方法二：使用 @clack/prompts

@clack/prompts 是一个现代化的交互式命令行提示工具，提供美观的用户交互界面。

```javascript
// utils/prompts.js
import * as p from '@clack/prompts';
import { cancel } from '@clack/prompts';

// 文本输入
async function askText(options) {
  return p.text({
    message: options.message,
    placeholder: options.placeholder,
    defaultValue: options.defaultValue,
    validate: options.validate,
  });
}

// 确认选择
async function askConfirm(options) {
  return p.confirm({
    message: options.message,
    initialValue: options.initialValue,
  });
}

// 单选列表
async function askSelect(options) {
  return p.select({
    message: options.message,
    options: options.items,
    initialValue: options.initialValue,
  });
}

// 多选列表
async function askMultiSelect(options) {
  return p.multiselect({
    message: options.message,
    options: options.items,
    required: options.required,
  });
}

// 密码输入
async function askPassword(options) {
  return p.password({
    message: options.message,
    validate: options.validate,
  });
}

```

**@clack/prompts 的优缺点：**
- ✅ 界面美观，提供现代化的用户体验
- ✅ 支持多种输入类型（文本、密码、单选、多选等）
- ✅ 内置输入验证和错误处理
- ✅ 支持颜色、动画等视觉效果
- ✅ API 简洁，代码清晰
- ✅ 支持取消操作和状态管理
- ❌ 需要额外安装依赖
- ❌ 相对较新，社区资源相对较少

#### 高级功能对比

**原生 readline：**
```javascript
// 需要手动实现的功能
- 输入验证
- 默认值处理
- 输入历史记录
- 自动补全
- 密码掩码
- 颜色输出
- 进度条
- 动画效果
```

**@clack/prompts：**
```javascript
// 内置支持的功能
✓ 输入验证
✓ 默认值处理
✓ 密码掩码
✓ 颜色输出
✓ 动画效果
✓ 进度条
✓ 状态管理
✓ 取消操作
```

#### 推荐使用场景

- **使用原生 readline**：适合非常简单的脚本，只需要基本的文本输入，对用户体验要求不高
- **使用 @clack/prompts**：适合构建完整的 CLI 工具，需要良好的用户体验、多种输入类型和丰富的交互功能

在实际的脚手架工具开发中，**强烈推荐使用 @clack/prompts**，因为它能显著提升用户体验，减少开发工作量，让工具看起来更专业。

> 补充： prompts 也是一个比较好的用户输入获取选择方案，存在时间悠久，经得起验证。


### 完整示例

```ts
import { Command } from 'commander'
import { logger } from '../../utils/logger'
import { loadTemplate } from '../../utils/loadTemplate'
import { handleCancel } from '../../utils/handleCancel'
import pc from 'picocolors'
import { text, select, confirm } from '@clack/prompts';

function validateName(value: string | undefined): string | undefined {
    if (!value) return '请输入项目名称';

    if (value.length > 50) return '项目名称不能超过50个字符';

    if (value.length < 2) return '项目名称至少需要2个字符';

    if (/^\d/.test(value)) return '项目名称不能以数字开头';

    if (!/^[a-zA-Z0-9-_]+$/.test(value)) return '项目名称只能包含字母、数字、连字符(-)和下划线(_)';

    if (value.startsWith('.')) return '项目名称不能以点(.)开头';

    const reservedNames = ['node', 'npm', 'package', 'module', 'system', 'core', 'lib', 'bin'];
    if (reservedNames.includes(value.toLowerCase())) {
        return `项目名称 "${value}" 是保留名称，请使用其他名称`;
    }

    return undefined;
}

export function create(program: Command) {
    // 初始化项目
    return program
        .createCommand('create')
        .description('create project')
        .argument('[name]', 'project name')
        .option('-t, --template <template>', 'template name')
        .action(async (projectName, options) => {
            let { template } = options
            if (!projectName) {
                const name = await text({
                    message: '请输入项目名称',
                    validate: validateName,
                });
                projectName = handleCancel(name) as string;
            }
            if (!template) {
                const framework = await select({
                    message: '请选择一个模板:',
                    options: [
                        { value: 'react19', label: 'React19' },
                        { value: 'vue3', label: 'Vue3' },
                    ],
                });
                template = handleCancel(framework) as string;
            }
            logger.info(`正在创建项目 ${pc.green(projectName)}`)
            logger.info(`正在使用模板 ${pc.green(template)}`)
            loadTemplate({ projectName, templateName: template, local: false })
        })
}

```

### 使用方法

- 正常情况下我们是把打包好的产物发布大npm仓里面，然后通过`npm install -g ` 安装到本地， 本地电脑就可以使用命名`wl`了。

- 如果不想推送到npm仓里面，也可以打包好之后使用 `npm link` 创建软链接，这样本地就可以使用命名`wl`了,需注意这种情况就不要删除代码仓了,不然软链接会失效。