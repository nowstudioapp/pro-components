<script lang="ts">
export default {
  name: "demo-pro-el-from-basic",
}
</script>
<script setup lang="ts">
import { type ProElFormColumn, ProElForm } from "@aiwen/ui"

interface TParams {
  input: string
  inputNumber: number
  password: string
  select: string
  radioGroup: string
  checkboxGroup: []
  date: string
  dateTime: string
  dateRange: []
  dateTimeRange: []
  cascader: []
  switch: boolean
  transfer: []
}

const defaultOptions: any[] = new Array(6)
  .fill(1)
  .map((_, index) => ({ label: `选项${index}`, value: index }))

const columns: ProElFormColumn<TParams>[] = [
  {
    prop: "input",
    label: "文本",
    fieldProps: {
      placeholder: "文本框",
    },
  },
  {
    prop: "inputNumber",
    label: "数字",
    valueType: "inputNumber",
    fieldProps: {
      placeholder: "数字",
    },
  },
  {
    prop: "password",
    label: "密码",
    valueType: "password",
    fieldProps: {
      placeholder: "请输入密码",
    },
  },
  {
    prop: "select",
    label: "下拉选择",
    valueType: "select",
    fieldProps: {
      placeholder: "请选择",
    },
    // options: defaultOptions,
    async requestOptions() {
      await new Promise<void>((r) => {
        setTimeout(() => {r()},3000)
      })
      return defaultOptions
    }
  },
  {
    prop: "radioGroup",
    label: "单选",
    valueType: "radioGroup",
    fieldProps: {
      placeholder: "请选择",
    },
    options: defaultOptions,
  },
  {
    prop: "checkboxGroup",
    label: "多选",
    valueType: "checkboxGroup",
    fieldProps: {
      placeholder: "请选择",
    },
    options: defaultOptions,
  },
  {
    prop: "date",
    label: "日期",
    valueType: "date",
    fieldProps: {
      placeholder: "请选择",
    },
  },
  {
    prop: "dateTime",
    label: "日期时间",
    valueType: "dateTime",
    fieldProps: {
      placeholder: "请选择",
    },
  },
  {
    prop: "dateRange",
    label: "日期范围",
    valueType: "dateRange",
    fieldProps: {
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
  },
  {
    prop: "dateTimeRange",
    label: "日期时间范围",
    valueType: "dateTimeRange",
    fieldProps: {
      startPlaceholder: "开始时间",
      endPlaceholder: "结束时间",
    },
  },
  {
    prop: "cascader",
    label: "级联",
    valueType: "cascader",
    fieldProps: {
      placeholder: "请输入",
    },
  },
  {
    prop: "switch",
    label: "开关",
    valueType: "switch",
  },
  {
    prop: "transfer",
    label: "穿梭框",
    valueType: "transfer",
  },
]

const submitHandler = (v: any) => {
  const params: TParams = v
  console.log(params)
  return Promise.resolve(true)
}
</script>
<template>
  <div>
    <div>
      <ProElForm :columns="columns" @finish="submitHandler" />
    </div>
  </div>
</template>
