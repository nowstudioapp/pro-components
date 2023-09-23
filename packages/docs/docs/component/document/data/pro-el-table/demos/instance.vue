<script lang="ts">
export default {
  name: "demo-pro-el-table-form-page",
}
</script>
<script setup lang="ts">
import { type RequestProp, type ProElTableColumn, ProElTable, ProElForm } from "@aiwen/ui"
import { ElButton, ElSpace } from "element-plus"
import { reactive, computed } from "vue"

type TData = {
  name: string
  age: number
  gender: string
  address: string
}

const state = reactive<{
  showForm: boolean
  activeRecord: Partial<TData>
}>({
  showForm: false,
  activeRecord: {},
})

const tableData: TData[] = reactive(
  new Array(8).fill(1).map((_, i) => ({
    name: "名称" + i,
    age: i + 26,
    gender: i % 2 ? "男" : "女",
    address: "xx省xx市xx县xx街道",
  }))
)

const tableColumns = computed<ProElTableColumn<TData>[]>(() => {
  const { name, age, address, gender } = state.activeRecord

  return [
    {
      prop: "name",
      label: "姓名",
      colProps: {
        span: 12,
      },
      fieldProps: {
        placeholder: "请输入姓名",
      },
      initializeValue: name,
    },
    {
      prop: "age",
      label: "年龄",
      valueType: "inputNnumber",
      fieldProps: {
        controlsPosition: "right",
        placeholder: "年龄",
      },
      colProps: {
        span: 12,
      },
      initializeValue: age,
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
      initializeValue: gender,
    },
    {
      prop: "address",
      label: "地址",
      fieldProps: {
        placeholder: "请输入地址",
      },
      showOverflowTooltip: {
        effect: "light",
      },
      hideInSearch: true,
      initializeValue: address,
    },
    {
      prop: "action" as any,
      label: "操作",
      hideInForm: true,
      hideInSearch: true,
    },
  ]
})

const formColumns = computed(() => {
  return tableColumns.value
    .filter((i) => !i.hideInForm)
    .map((i) => ({
      ...i,
      formItemProps: {
        ...i.formItemProps,
        rules: [
          {
            required: true,
          },
        ],
      },
    }))
})

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
    <ProElTable :columns="tableColumns as any" :request="requestTableData">
      <template #tableTitle>
        <ElButton
          type="primary"
          @click="
            () => {
              state.activeRecord = {}
              state.showForm = true
            }
          "
          >新建</ElButton
        >
      </template>
      <template #action="{ row }">
        <ElSpace>
          <ElButton
            link
            type="primary"
            @click="
              () => {
                state.activeRecord = row
                state.showForm = true
              }
            "
            >编辑</ElButton
          >
          <ElButton link type="danger">删除</ElButton>
        </ElSpace>
      </template>
    </ProElTable>

    <ProElForm
      :form-columns="formColumns"
      layout-type="DrawerForm"
      :drawer-props="{
        title: '新建',
        modelValue: state.showForm,
      }"
      @close="
        () => {
          state.showForm = false
        }
      "
    />
  </div>
</template>
