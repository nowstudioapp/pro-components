<script setup lang="ts">
import { type TElTreeTransferData, ElTreeTransfer } from "@aiwen/pro-components"

defineOptions({
  name: "demo-el-tree-transfer-basic",
})

const options: TElTreeTransferData[] = [
  {
    label: "选项1",
    value: "1",
    children: [
      {
        label: "选项1-1",
        value: "1-1",
      },
    ],
  },
  {
    label: "选项2",
    value: "2",
  },
]
</script>
<template>
  <div>
    <div>
      <ElTreeTransfer :data-list="options" />
    </div>
  </div>
</template>
