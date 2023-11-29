# ProElTable 高级表格

基于 ProElForm 和 Element Plus 组件库拓展的页面级表格组件，默认集成了分页、查询、列配置、列类型定义等功能，覆盖大部分业务场景。

## 基本使用

<preview path="./demos/basic.vue" />

## 自定义列

<preview path="./demos/custom-field.vue" />

## 搜索

<preview path="./demos/search.vue" />

## 页面实例

<preview path="./demos/instance.vue" />

## Props

| 属性            | 描述                   | 类型                                                                                                                            | 默认值  |
| --------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| tableData       | 表格数据               | `T[]`                                                                                                                           | `[]`    |
| columns         | 表格列配置             | `ProElTableColumn<T>[]`                                                                                                         | `[]`    |
| request         | 表格数据请求方法       | `RequestProp<T>`                                                                                                                | -       |
| tableProps      | 传递给ElTable的Props   | `Omit<TableProps<T>, 'data'>`                                                                                                   | -       |
| proElFormProps  | 传递给ProElForm的Props | `ProElFormProps<Record<keyof T,any>>`                                                                                           | -       |
| tableEvents     | 传递给表格的事件对象   | `Partial<ElTableEvents>`                                                                                                        | false   |
| manualRequest   | 是否手动触发首次请求   | `true`                                                                                                                          | -       |
| columnEmptyText | 空值时显示内容         | `string`                                                                                                                        | `-`     |
| search          | 搜索表单配置           | `false \| Omit<ProElFormProps<T>, 'columns'                                                  \| 'modalProps' \| 'drawerProps'>` | -       |
| pagination      | 分页配置               | `false                                                     \| Partial<WritePaginationProps>`                                    | -       |
| hideTools       | 隐藏表格工具栏         | `true`                                                                                                                          | `false` |
| onReady         | 组件挂载之后触发       | `(tableRef: ProElTableRef, formRef: ProElFormRef) => void`                                                                      | -       |
| loading         | 表格Loading            | `boolean`                                                                                                                       | -       |

## ProElTableColumn\<T\>[]

| Event               | 描述                     | 类型                                                              |
| ------------------- | ------------------------ | ----------------------------------------------------------------- |
| hideInForm          | 在表单中隐藏，不再保留值 | `boolean             \| ((formData: T) => boolean)`               |
| colProps            | 传递给ElCol的Props       | `Partial<ColProps>`                                               |
| defaultHideInColumn | 默认隐藏列               | `true`                                                            |
| hideInSearch        | 在搜索表单中隐藏         | `boolean`                                                         |
| hideInTable         | 在表格中隐藏             | `boolean`                                                         |
| tableColumn         | 表格Column配置           | `Partial<Omit<TableColumnCtx<T>, 'prop'             \| 'label'>>` |

## Request

```ts
export interface RequestResponse<T> {
  success: boolean
  dataList: T[]
  total: number
}

export type RequestProp<T, P = Partial<T>> = (
  params: P,
  pageSize: number,
  current: number
) => Promise<RequestResponse<T>>
```

### Slots

如果需要自定义单元格内容，只需要添加对应`v-slot`为对应的`prop`属性的插槽即可

| slot                 | 描述                                                                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `[prop]`             | 自定义列的内容，作用域参数为 `{ row, column, $index }`                                                                                  |
| `[prop] + "_header"` | 自定义表头的内容， 作用域参数为 `{ column, $index }`                                                                                    |
| append               | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
| empty                | 当数据为空时自定义的内容                                                                                                                |
| tableTitle           | 表格标题，位于表格左上方                                                                                                                |
| tableTools           | 表格工具栏，位于表格右上方                                                                                                              |

### ProElTableRef

基于ElTable拓展以下方法

| 方法           | 描述                       | 类型         |
| -------------- | -------------------------- | ------------ |
| reload         | 重置表格数据               | `() => void` |
| reloadAndReset | 重置表单值并且重置表格数据 | `() => void` |
