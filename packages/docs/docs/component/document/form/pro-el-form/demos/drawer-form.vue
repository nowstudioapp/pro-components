<script lang="ts">
export default {
  name: "demo-pro-el-from-drawer-form",
}
</script>
<script setup lang="ts">
import { computed, ref } from "vue"
import { ElButton } from "element-plus"
import { type ProElFormColumn, type ProElFormProps, ProElForm } from "@aiwen/ui"

const show = ref(false)

const columns: ProElFormColumn<any>[] = new Array(6).fill(1).map((_, i) => ({
  prop: "field" + i,
  label: "字段" + i,
  fieldProps: {
    placeholder: "请输入字段" + i,
  },
  formItemProps: {
    rules: [
      {
        required: true,
        message: "请输入字段" + i,
      },
    ],
  },
}))

const formProps = computed<ProElFormProps<any>>(() => ({
  columns: columns,
  layoutType: "DrawerForm",
  drawerProps: {
    modelValue: show.value,
    title: "抽屉表单",
    onClosed:() => {
      show.value = false
    }
  },
}))
</script>
<template>
  <div>
    <ElButton
      type="primary"
      @click="
        () => {
          show = true
        }
      "
      >打开表单</ElButton
    >
    <div>
      <ProElForm
        v-bind="formProps"
        @close="
          () => {
            show = false
          }
        "
      />
    </div>
  </div>
</template>
