import { defineConfig } from "vitepress"
import vueJsx from "@vitejs/plugin-vue-jsx"
import { containerPreview, componentPreview } from "@vitepress-demo-preview/plugin"
import { resolve } from "path"
import autoprefixer from "autoprefixer"
import tailwind from "tailwindcss"
import { DIR_NAME, NAME } from "../../../constants"
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: NAME,
  description: "Vue3组件库开发工具",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/intro", activeMatch: "/guide" },
      {
        text: "组件",
        link: "/component/document/common/",
        activeMatch: "/component",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          text: "简介",
          link: "/guide/intro",
        },
        {
          text: "快速开始",
          link: "/guide/start",
        },
        {
          text: "开发指南",
          link: "/guide/dev",
        },
        {
          text: "FAQ",
          link: "/guide/faq",
        },
      ],
      "/component/": [
        {
          text: "通用配置",
          link: "/component/document/common/",
        },
        {
          text: "表单",
          items: [
            {
              text: "ElTreeTransfer",
              link: "/component/document/form/el-tree-transfer/",
            },
            {
              text: "ProElForm",
              link: "/component/document/form/pro-el-form/",
            },
          ],
        },
        {
          text: "数据展示",
          items: [
            {
              text: "ProElTable",
              link: "/component/document/data/pro-el-table/",
            },
          ],
        },
        {
          text: "其它",
          items: [
            {
              text: "FooterBtns",
              link: "/component/document/display/footer-btns/",
            },
          ],
        },
      ],
    },
    socialLinks: [
      // { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
    search: {
      provider: "local",
    },
  },
  /** 相对于docs文件夹 */
  srcDir: "./docs",
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    },
  },
  vite: {
    plugins: [vueJsx()],
    resolve: {
      alias: [
        {
          find: DIR_NAME,
          replacement: resolve(__dirname, "../../components/src/index.ts"),
        },
      ],
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer(),
          tailwind({
            content: ["../docs/**/*.{vue,css,tsx,jsx}"],
            corePlugins: {
              preflight: false,
            },
          }),
        ],
      },
    },
  },
})
