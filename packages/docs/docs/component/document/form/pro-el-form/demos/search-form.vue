<script lang="ts">
export default {
  name: "demo-pro-el-from-search-form",
}
</script>
<script setup lang="ts">
import { type ProElFormColumn, ProElForm } from "@aiwen/ui"

const columns: ProElFormColumn<any>[] = new Array(4).fill(1).map((_, i) => ({
  prop: "field" + i,
  label: "字段" + i,
  colSpan: 12,
  fieldProps: {
    placeholder: "请输入字段" + i,
  },
}))
</script>
<template>
  <div>
    <div>
      <ProElForm
        :columns="columns"
        layout-type="SearchForm"
        :submitter="{ searchConfig: { submitText: '查询' } }"
      />
    </div>
  </div>
</template>
