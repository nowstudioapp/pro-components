<script lang="ts">
export default {
  name: "demo-pro-el-from-login",
}
</script>
<script setup lang="ts">
import { type ProElFormColumn, ProElForm } from "@aiwen/pro-components"

const columns: ProElFormColumn<any>[] = [
  {
    prop: "account",
    label: "账号",
    fieldProps: {
      placeholder: "请输入账号",
    },
    formItemProps: {
      rules: [
        {
          required: true,
          message: "请输入账号",
        },
      ],
    },
    initializeValue: "admin",
  },
  {
    prop: "password",
    label: "密码",
    fieldProps: {
      placeholder: "请输入密码",
      showPassword: true,
    },
    valueType: "password",
    formItemProps: {
      rules: [
        {
          required: true,
          message: "请输入密码",
        },
      ],
    },
  },
]
</script>
<template>
  <div>
    <div class="w-80">
      <ProElForm
        :columns="columns"
        :submitter="{
          searchConfig: {
            submitText: '登录',
            submitProps: { style: { width: '100px' } },
            resetProps: { style: { display: 'none' } },
          },
        }"
      />
    </div>
  </div>
</template>
