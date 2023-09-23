# 通用配置

## 通用列配置

### `ProElSchema<T extends Record<string, any>>`

| 属性名          | 说明                                                                    | 类型                                                                      |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| key             | 唯一的key，没有的话就取prop                                             | `string \| number`                                                        |
| prop            | 属性名， **必须是泛型T的属性名**                                        | `Partial<keyof T>`                                                        |
| label           | 显示文本                                                                | `string`                                                                  |
| tooltip         | 提示文本                                                                | `string`                                                                  |
| order           | 排序值                                                                  | `number`                                                                  |
| valueType       | 渲染类型                                                                | `ValueType`                                                               |
| options         | 选项                                                                    | `FieldOption[]`                                                           |
| initializeValue | 初始值                                                                  | `any`                                                                     |
| requestOptions  | 从服务器请求选项                                                        | `() => Promise<FieldOption[]>`                                            |
| render          | 自定义渲染只读元素                                                      | `(record: T, index: number) => VNode`                                     |
| renderField     | 自定义渲染表单组件 返回一个VNode，会自动被ElFormItem包裹，并绑定v-model | `(formData: T, column: ProElSchema<T>) => VNode`                          |
| fieldProps      | 传递给表单组件的Props                                                   | `FieldProps \| ((formData: T) => FieldProps)`                             |
| formItemProps   | 传递给表单FormItem的Props                                               | `Partial<ElFormItemProps> \| ((formData: T) => Partial<ElFormItemProps>)` |

### ValueType

| 类型          | 说明             |
| ------------- | ---------------- |
| input         | 输入框           |
| inputNnumber  | 数字输入框       |
| password      | 密码框           |
| select        | 下拉选择框       |
| radioGroup    | 单选框           |
| checkboxGroup | 多选框           |
| date          | 日期框           |
| dateTime      | 日期时间选择框   |
| dateRange     | 日期范围选择框   |
| dateTimeRange | 日期时间范围选择 |
| cascader      | 级联选择框       |
| switch        | 开关             |
| transfer      | 穿梭框           |

### FieldOption

| 类型     | 说明     |
| -------- | -------- |
| label    | 显示文本 |
| value    | 值       |
| children | 子级选项 |
