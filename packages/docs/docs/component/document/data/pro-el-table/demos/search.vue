<script lang="ts">
export default {
  name: "demo-pro-el-table-search",
}
</script>
<script setup lang="ts">
import { type RequestProp, ProElTable, type ProElTableColumn } from "@aiwen/pro-components"
import { ElButton } from "element-plus"

type TData = {
  name: string
  age: number
  gender: string
  address: string
}

const tableData: TData[] = new Array(8).fill(1).map((_, i) => ({
  name: "名称" + i,
  age: i + 26,
  gender: i % 2 ? "男" : "女",
  address: "xx省xx市xx县xx街道",
}))

const tableColumns: ProElTableColumn<TData>[] = [
  {
    prop: "name",
    label: "姓名",
    colProps: {
      span: 12,
    },
    fieldProps: {
      placeholder: "请输入姓名",
    },
  },
  {
    prop: "age",
    label: "年龄",
    valueType: "inputNumber",
    fieldProps: {
      controlsPosition: "right",
      placeholder: "年龄",
    },
    colProps: {
      span: 12,
    },
  },
  {
    prop: "gender",
    label: "性别",
    valueType: "select",
    colProps: {
      span: 12,
    },
    fieldProps: {
      clearable: true,
      placeholder: "性别",
    },
    options: [
      {
        label: "男",
        value: "0",
      },
      {
        label: "女",
        value: "1",
      },
    ],
  },
  {
    prop: "address",
    label: "地址",
    hideInSearch: true,
  },
]

const requestTableData: RequestProp<TData> = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        dataList: tableData,
        success: true,
        total: tableData.length,
      })
    }, 1000)
  })
}
</script>
<template>
  <div>
    <ProElTable
      :form-props="{ rowProps: { gutter: 16 } }"
      :columns="tableColumns"
      :request="requestTableData"
    >
      <template #tableTitle>
        <ElButton type="primary">新建</ElButton>
      </template>
    </ProElTable>
  </div>
</template>
