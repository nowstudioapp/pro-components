# ProElForm 高级表单

ProElForm 在 ElForm 的基础上进行了一些拓展，可根据配置快速生成业务表单，并支持多种表单风格

## 基本使用

<preview path="./demos/basic.vue" />

## 表单联动

<preview path="./demos/linkage.vue" />

## 自定义字段

<preview path="./demos/custom-field.vue" />

## 登录表单

<preview path="./demos/login.vue" />

## 搜索表单

<preview path="./demos/search-form.vue" />

## 浮层表单

<preview path="./demos/modal-form.vue" />

## 抽屉表单

<preview path="./demos/drawer-form.vue" />

## Props

| 属性        | 描述                    | 类型                                                   | 默认值 |
| ----------- | ----------------------- | ------------------------------------------------------ | ------ |
| layoutType  | 表单布局模式            | `Form` \| `DrawerForm` \| `DialogForm` \| `SearchForm` | `Form` |
| columns     | 表单字段定义            | `ProElFormColumn<T>[]`                                 | -      |
| formProps   | 传递给 ElForm 的 Props  | `Partial<Omit<FormProps, 'model'>>`                    | -      |
| drawerProps | 传递给 ElDrawer 的属性  | `Partial<DrawerProps>`                                 | -      |
| modalProps  | 传递给 ElDialog 的属性  | `Partial<DialogProps>`                                 | -      |
| rowProps    | 传递给ElRow的Props      | `Partial<RowProps>`                                    | -      |
| submitter   | 提交相关配置            | `Submitter`                                            | -      |
| onReset     | 点击重置按钮触发        | `(values: T) => Promise<void>`                         | -      |
| onFinish    | 提交表单 通过校验后触发 | `(values: T) => Promise<boolean>`                      | -      |
| onReady     | 组件挂载之后触发        | `(formRef: ProElFormRef) => void`                      | -      |

## ProElFormColumn\<T\>

| 属性       | 描述                     | 类型                                                |
| ---------- | ------------------------ | --------------------------------------------------- |
| hideInForm | 在表单中隐藏，不再保留值 | `boolean             \| ((formData: T) => boolean)` |
| colProps   | 传递给ElCol的Props       | `Partial<ColProps>`                                 |

### ProElFormRef

| 方法           | 描述                                                        | 类型                                     |
| -------------- | ----------------------------------------------------------- | ---------------------------------------- |
| validate       | 对整个表单的内容进行验证。 接收一个回调函数，或返回 Promise | `FormInstance['validate']`               |
| validateField  | 验证具体的某个字段                                          | `FormInstance['validateField']`          |
| resetFields    | 重置该表单项，将其值重置为初始值，并移除校验结果            | `FormInstance['resetFields']`            |
| scrollToField  | 滚动到指定的字段                                            | `FormInstance['scrollToField']`          |
| clearValidate  | 清理某个字段的表单验证信息                                  | `FormInstance['clearValidate']`          |
| getFieldValue  | 获取某个字段的值                                            | `<T>(prop: string) => T`                 |
| getFieldsValue | 获取整个表单值                                              | `<T extends Record<string, any>>() => T` |

## Slots

如果需要自定义表单字段内容，只需要添加对应`v-slot`为对应的`prop`属性的插槽即可

| 插槽名           | 描述                                                              |
| ---------------- | ----------------------------------------------------------------- |
| [prop]           | 自定义内容，作用域参数为 `{ record,formData,column }`             |
| [prop + 'Error'] | 验证错误信息的显示内容，作用域参数为 `{ record,formData,column }` |

### Submitter

| 属性             | 描述             | 类型                     |
| ---------------- | ---------------- | ------------------------ |
| onSubmit         | 提交方法         | `() => void`             |
| onReset          | 重置方法         | `() => void`             |
| ~~searchConfig~~ | 提交配置 (已弃用，请使用 `submitConfig`) | `SubmitConfig`           |
| submitConfig     | 搜索配置         | `SubmitConfig`           |
| render           | 自定义渲染方法   | `(() => VNode) \| VNode` |

### SearchConfig

| 属性             | 描述                  | 类型                               | 默认值  |
| ---------------- | --------------------- | ---------------------------------- | ------- |
| resetText        | 重置按钮文本          | `string`                           | 重置    |
| submitText       | 提交按钮文本          | `string`                           | 提交    |
| collapseText     | 展开文本              | `string`                           | 展开    |
| collapsedText    | 收起文本              | `string`                           | 收起    |
| defaultCollapsed | 默认是否展开          | `boolean`                          | `false` |
| submitProps      | 传递给提交按钮的Props | `TFooterBtnsProps['confirmProps']` | -       |
| resetProps       | 传递给重置按钮的Props | `TFooterBtnsProps['cancelProps']`  | -       |

### Tips

- `inline`布局不会生效,可以通过 colSpan 属性控制表单布局
- 表单按钮是内联的，如果需要块级显示请保证表单字段元素的`colSpan`之和是 24 的整数，因为按钮的空间是向 24 取余得来的
