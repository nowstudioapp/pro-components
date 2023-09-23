import type { HTMLAttributes, VNode } from "vue"
import type {
  ValueType,
  FieldOption,
  RequestOption,
  FieldProps,
} from "../components/ProElForm/types"
import type { FormItemProps } from "element-plus"

type ElFormItemProps = Omit<FormItemProps, "label" | "value"> & HTMLAttributes

/**
 * @name 通用列配置
 * @param T 数据类型
 */
export interface ProElSchema<T extends Record<string, any>> {
  /** @description 唯一的key，没有的话就取prop */
  key?: string | number
  /**
   *  @name 属性名
   *  @description 必须是泛型T的属性名
   */
  prop: Partial<keyof T>
  /** @name 显示文本 */
  label: string
  /** @name 提示文本 */
  tooltip?: string
  /** @name 排序值 */
  order?: number
  /** @name 渲染类型 */
  valueType?: ValueType
  /** @name 选项 */
  options?: FieldOption[]
  /** @description 初始值 */
  initializeValue?: any
  /** @description 从服务器请求选项 */
  requestOptions?: RequestOption
  // /** @description 自定义渲染只读元素 */
  // render?: (record: T, index: number) => VNode
  /** @description 自定义渲染表单组件 返回一个VNode，会自动被ElFormItem包裹，并绑定v-model */
  renderField?: (formData: T, column: ProElSchema<T>) => VNode
  /** @description 传递给表单组件的Props */
  fieldProps?: FieldProps | ((formData: T) => FieldProps)
  /** @description 传递给表单FormItem的Props */
  formItemProps?: Partial<ElFormItemProps> | ((formData: T) => Partial<ElFormItemProps>)
}
