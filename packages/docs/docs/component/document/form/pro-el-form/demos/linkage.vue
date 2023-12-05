<script lang="ts">
export default {
  name: "demo-pro-el-from-linkage",
}
</script>
<script setup lang="ts">
import { type ProElFormColumn, ProElForm } from "@aiwen/ui"
import { computed } from "vue"

enum Keys {
  A = "a",
  B = "b",
  C = "v",
}
const KeysMap = {
  [Keys.A]: "A",
  [Keys.B]: "B",
  [Keys.C]: "C",
}

const defaultOptions = [Keys.A, Keys.B, Keys.C].map((i) => ({
  label: KeysMap[i],
  value: i,
}))

const columns = computed<ProElFormColumn<any>[]>(() => [
  {
    prop: "field",
    label: "选择字段",
    valueType: "radioGroup",
    options: defaultOptions,
    initializeValue: Keys.A,
  },
  {
    prop: "required",
    label: "必填",
    valueType: "switch",
  },
  {
    prop: "option_a",
    label: "字段A",
    fieldProps: {
      placeholder: "请输入字段A",
    },
    formItemProps(formData) {
      return {
        rules: [
          {
            required: formData["required"],
            message:'请输入字段A'
          },
        ],
      }
    },
    hideInForm: (formData) => formData["field"] !== Keys.A,
  },
  {
    prop: "option_b",
    label: "字段B",
    fieldProps: {
      placeholder: "请输入字段B",
    },
    formItemProps(formData) {
      return {
        rules: [
          {
            required: formData["required"],
            message:'请输入字段B'

          },
        ],
      }
    },
    hideInForm: (formData) => formData["field"] !== Keys.B,
  },
  {
    prop: "option_c",
    label: "字段C",
    fieldProps: {
      placeholder: "请输入字段C",
    },
    formItemProps(formData) {
      return {
        rules: [
          {
            required: formData["required"],
            message:'请输入字段C'
          },
        ],
      }
    },
    hideInForm: (formData) => formData["field"] !== Keys.C,
  },
])
</script>
<template>
  <div>
    <div class="w-80">
      <ProElForm :columns="columns" />
    </div>
  </div>
</template>
