## 插件列表

```bash
any-rule
Auto Rename Tag
Autoprefixer
Better Comments  // 加强注释 不适合vue
Bookmarks
Code Runner
Code Spell Checker
Highlight Matching Tag  //高亮匹配标签
HTML CSS Support
JavaScript (ES6) code snippets
Path Intellisense  //路径自动补全
Prettier - Code formatter  //代码格式化
TypeScript Vue Plugin (Volar)
vscode-icons
Vue 3 Snippets
Vue Language Features (Volar）
Vue VSCode Snippets
```



## user设置配置

```json
{
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    // csp视为html
    "files.associations": {
        "*.csp": "html"
    },
    // 默认格式化工具
    // "[javascript]": {
    //     "editor.defaultFormatter": "vscode.typescript-language-features"
    // },
    //默认格式化工具
  
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[scss]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    // tab键占宽度
    "prettier.tabWidth": 4,
    // 每行代码字符数,一般控一屏
    "prettier.printWidth": 100,
    // 使用单引号,格式化双引号直接会全部替换为单引号
    "prettier.singleQuote": true,
    // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.bracketSpacing": true, 
    "workbench.iconTheme": "vscode-icons",
    "easysass.formats": [
        {
            "format": "expanded",
            "extension": ".css"
        },
        {
            "format": "compressed",
            "extension": ".min.css"
        }
    ],
    "stories.backup.localBackup.path": "",
    "liveServer.settings.donotShowInfoMsg": true,
    "explorer.confirmDelete": false,
      //todo-tree 标签配置  标签兼容大小写字母(很好的功能!!!)
    "todo-tree.regex.regex": "((%|#|//|<!--|^\\s*\\*)\\s*($TAGS)|^\\s*- \\[ \\])",
    "todo-tree.general.tags": [    
        "TODO",  //添加自定义的标签成员,将在下面实现它们的样式
        "bug",
        "tag",
        "done",
        "mark",
        // "test",
        // "update"
    ],
    "todo-tree.regex.regexCaseSensitive": false,
    "todo-tree.highlights.defaultHighlight": {  //如果相应变量没赋值就会使用这里的默认值
        "foreground": "black",      //字体颜色
        // "background": "yellow",     //背景色
        "icon": "check",            //标签样式 check 是一个对号的样式
        "rulerColour": "yellow",    //边框颜色
        // "type": "tag",              //填充色类型  可在TODO TREE 细节页面找到允许的值 
        "iconColour": "yellow"      //标签颜色
    },
    "todo-tree.highlights.customHighlight": {
 
        //TODO 		需要做的功能
        "TODO": {
            "icon": "alert",          //标签样式
            "background": "#c9c552",  //背景色
            "rulerColour": "#c9c552", //外框颜色
            "iconColour": "#c9c552",  //标签颜色
        },
 
        //bug		必须要修复的BUG  
        "bug": {
            "background": "#eb5c5c",
            "icon": "bug",
            "rulerColour": "#eb5c5c",
            "iconColour": "#eb5c5c",
        },
 
        //tag		标签
        "tag": {
            "background":  "#38b2f4",//"#38b2f4",
            "icon": "tag",
            "rulerColour": "#38b2f4",
            "iconColour": "#38b2f4",
            "rulerLane": "full"
        },
 
        //done		已完成
        "done": {
            "background":"#5eec95",// "#5eec95",
            "icon": "check",
            "rulerColour": "#5eec95",
            "iconColour": "#5eec95",
        },
 
        //mark     	标记一下
        "mark": {
            "background": "#f90",// "#f90",
            "icon": "note",
            "rulerColour": "#f90",
            "iconColour": "#f90",
        },
 
        // //test		测试代码
        // "test": {
        //     "background": "#df7be6",
        //     "icon": "flame",
        //     "rulerColour": "#df7be6",
        //     "iconColour": "#df7be6",
        // },
 
        // //update  	优化升级点
        // "update": {
        //     "background": "#d65d8e",
        //     "icon": "versions",
        //     "rulerColour": "#d65d8e",
        //     "iconColour": "#d65d8e",
        // }
    },
    "editor.unicodeHighlight.allowedLocales": {
        "zh-hant": true,
        "zh-hans": true
    },
    "editor.tokenColorCustomizations": {
        "comments": "#39bd77"
    },
    "todo-tree.tree.hideIconsWhenGroupedByTag": true,
    "todo-tree.tree.hideTreeWhenEmpty": true,
    "editor.unicodeHighlight.allowedCharacters": {
        " ": true
    },
    "[jsonc]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "security.workspace.trust.untrustedFiles": "open",
    "git.suggestSmartCommit": false,
    "terminal.integrated.defaultProfile.windows": "Command Prompt",
    "diffEditor.wordWrap": "off",
    "editor.fontSize": 18,
    "terminal.integrated.fontSize": 16,
    "cSpell.userWords": [
        "antd",
        "axios",
        "Categroy",
        "craco",
        "echarts",
        "Ecom",
        "expressjwt",
        "qiankun",
        "vuex",
        "Wanglei"
    ],
    "vsicons.dontShowNewVersionMessage": true,
    "update.mode": "none",
    "terminal.integrated.enableMultiLinePasteWarning": false,
    "workbench.colorTheme": "Dracula",
    "extensions.ignoreRecommendations": true,
    "window.zoomLevel": 1,
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    // 标签自动补全
    "emmet.triggerExpansionOnTab": true,
    "emmet.includeLanguages": {
        "javascript": "javascriptreact",
        "wxml": "html"
    },
    "javascript.updateImportsOnFileMove.enabled": "never",
    "[less]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "typescript.updateImportsOnFileMove.enabled": "always",
    "[vue]": {
        "editor.defaultFormatter": "Vue.volar"
    },
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "workbench.editor.enablePreview": false
}

```

