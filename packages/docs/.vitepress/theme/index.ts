// https://vitepress.dev/guide/custom-theme
import DefaultTheme from "vitepress/theme"
import { ElementPlusContainer } from "@vitepress-demo-preview/component"
import type { EnhanceAppContext, Awaitable } from "vitepress"
import "@vitepress-demo-preview/component/dist/style.css"
import 'element-plus/dist/index.css'
import "./styles/main.css"

export default {
  extends: DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext): Awaitable<void> {
    ctx.app.component("demo-preview", ElementPlusContainer)
  },
}
