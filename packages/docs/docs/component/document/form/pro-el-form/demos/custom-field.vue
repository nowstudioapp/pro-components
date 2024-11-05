<script lang="ts">
export default {
  name: "demo-pro-el-from-custom-field",
}
</script>

<script setup lang="ts">
import { ElInput, ElButton } from "element-plus"
import { type ProElFormColumn, type ProElFormRef, ProElForm } from "@aiwen/pro-components"
import { h, ref } from "vue"

const formRef = ref<ProElFormRef | null>(null)

const columns: ProElFormColumn<any>[] = [
  {
    prop: "input",
    label: "文本框",
    fieldProps: {
      placeholder: "请输入",
    },
    tooltip: "请输入",
  },
  {
    prop: "custom",
    label: "自定义",
  },
  {
    prop: "custom2",
    label: "自定义2",

    renderField(formData, column) {
      return h(ElInput)
    },
  },
]

const submit = (v: any) => {
  console.log(v)
  return Promise.resolve(true)
}
</script>
<template>
  <div>
    <div class="w-80">
      <ProElForm
        :columns="columns"
        @finish="submit"
        @ready="
          (ref) => {
            formRef = ref
          }
        "
      >
        <template #custom>
          <div>
            <h4>我是自定义内容</h4>
          </div>
        </template>
      </ProElForm>
    </div>
  </div>
</template>
