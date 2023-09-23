# ElTreeTransfer 穿梭框

基于 ElTransfer 进行拓展的穿梭框组件，支持树形数据

## 基本使用

<preview path="./demos/basic.vue" />

## Props

| 属性名     | 说明           | 类型                    | 默认值                     |
| ---------- | -------------- | ----------------------- | -------------------------- |
| modelValue | 选中的值       | `TElTreeTransferData[]` | `[]`                       |
| titles     | 标题           | `string[]`              | `["默认列表", "已选列表"]` |
| height     | 高度           | `number`                | `200`                      |
| props      | 自定义配置选项 | `TProps`                | -                          |
| dataList   | 展示的数据     | `any[]`                 | `[]`                       |

### Events

| 事件名            | 说明             | 类型                                 |
| ----------------- | ---------------- | ------------------------------------ |
| update:modelValue | 选中项改变时触发 | `(v: TElTreeTransferData[]) => void` |

### TElTreeTransferData

| 属性名   | 说明     | 类型                               |
| -------- | -------- | ---------------------------------- |
| label    | 选项标题 | `string`                           |
| value    | 选项值   | `string                 \| number` |
| children | 子选项   | `TElTreeTransferData[]`            |
| disabled | 是否禁用 | `boolean`                          |

### TProps

| 属性名   | 说明              | 类型         |
| -------- | ----------------- | ------------ |
| label    | label 的字段名    | `string`     |
| value    | value 的字段名    | `string    ` |
| children | children 的字段名 | `string`     |
