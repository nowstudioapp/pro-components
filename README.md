# @aiva/vbox

> vue3组件库和文档开发工具

## 目录结构

```
<!-- prettier-ignore -->
@aiva/vbox
│  .gitignore
│  package.json
│  pnpm-lock.yaml
│  pnpm-workspace.yaml
│  README.md
└─packages  工作空间
    ├─docs  组件文档项目
    │  │  package.json
    │  │  tsconfig.json
    │  ├─.vitepress
    │  │  │  .gitignore
    │  │  │  config.ts  vitepress 配置
    │  │  └─theme  vitepress 主题配置
    │  │      │  index.ts
    │  │      │
    │  │      └─styles  样式
    │  ├─docs  文档目录
    │  │  │  index.md 首页MD
    └─components  组件项目
        │  .eslintrc.cjs
        │  .gitignore
        │  .prettierrc.json
        │  env.d.ts
        │  package.json
        │  README.md
        │  tsconfig.app.json
        │  tsconfig.json
        │  tsconfig.node.json
        │  vite.config.ts
        ├─assets  静态资源
        │  └─css
        ├─src  组件源码
```

## 快速开始

首先，**请确保你的依赖管理工具为 [pnpm](https://pnpm.io/zh/)**

- 在 packages/docs 目录下运行 `pnpm uninstall aiva-components` (_默认组件库名字叫做 `aiva-components`_)

- 修改组件库名称

  1.  修改packages/components目录下的`package.json`文件，将 `name` 属性值替换为你的组件库名称
  2.  修改constants目录下的 `index.ts` 文件，将 `NAME` 变量值修改为你的组件库名称 (_页面显示_)
  3.  找到packages/docs目录下的 `tsconfig.json` 文件，然后找到 `paths` 中 key 为 `aiva-components` 的属性，将**属性名**修改为你的组件库名称

- 在 packages/components 目录下运行 `pnpm link --dir ../docs`

- 安装依赖，在根目录运行 `pnpm install`

## 开发

### 准备工作

- 进入packages/docs项目，运行 `pnpm dev`

- **由于在上一步已经修改组件库名称, 所以docs项目内的demo的依赖也需要修改**

```vue
<script setup lang="ts">
// import { Btn } from "aiva-components" 删除此行
import { Btn } from "your-lib-name"
</script>
<template>
  <div><Btn>按钮</Btn></div>
</template>
```

- 修改packages/components代码，docs项目会热更新

## 构建

### 构建组件库

进入packages/components目录，运行 `pnpm build`

### 构建文档

- 进入packages/docs项目，运行 `pnpm build`
