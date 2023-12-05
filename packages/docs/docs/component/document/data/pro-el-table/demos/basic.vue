<script lang="ts">
export default {
  name: "demo-pro-el-table-basic",
}
</script>
<script setup lang="ts">
import { type RequestProp, ProElTable, type ProElTableColumn } from "@aiwen/ui"
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
    colProps: {
      span: 12,
    },
    tableColumn: {
      sortable: true,
    },
  },
  {
    prop: "gender",
    label: "性别",
    colProps: {
      span: 12,
    },
  },
  {
    prop: "address",
    label: "地址",
    colProps: {
      span: 12,
    },
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
      :is-selection="true"
      :columns="tableColumns"
      :table-events="{
        'selection-change':(e) => {
          console.log(e)
        }
      }"
      :request="requestTableData"
      :tableProps="{ border: true }"
      :form-props="{
        submitter: {
          searchConfig: {
            defaultCollapsed: true,
          },
        },
      }"
    >
    </ProElTable>
  </div>
</template>
