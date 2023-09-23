<script lang="ts">
export default {
  name:'demo-footer-btns-basic'
}
</script>
<script setup lang="ts">
import { ElButton, ElDialog, ElDrawer } from "element-plus"
import { FooterBtns } from "@aiwen/ui"
import { reactive } from "vue"

type TControl = "showModel" | "showDrawer"
type TState = Record<TControl, boolean>

const state = reactive<TState>({
  showModel: false,
  showDrawer: false,
})

const closeModel = (t: TControl) => {
  state[t] = false
}
</script>
<template>
  <div>
    <div>
      <ElButton
        type="primary"
        @click="
          () => {
            state.showDrawer = true
          }
        "
        >点击打开抽屉</ElButton
      >
      <ElButton
        type="primary"
        @click="
          () => {
            state.showModel = true
          }
        "
        >点击打开模态框</ElButton
      >
    </div>
    <ElDialog title="Model" v-model="state.showModel">
      <p>Model Content</p>
      <template #footer>
        <FooterBtns
          @confirm="
            () => {
              closeModel('showModel')
            }
          "
          @cancel="
            () => {
              closeModel('showModel')
            }
          "
        />
      </template>
    </ElDialog>
    <ElDrawer title="Drawer" v-model="state.showDrawer">
      <p>Drawer Content</p>
      <template #footer>
        <FooterBtns
          @confirm="
            () => {
              closeModel('showModel')
            }
          "
          @cancel="
            () => {
              closeModel('showModel')
            }
          "
        />
      </template>
    </ElDrawer>
  </div>
</template>
