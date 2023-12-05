import type {
  ColProps,
  DialogProps,
  DrawerProps,
  FormInstance,
  FormProps,
  RowProps,
  InputProps,
  InputNumberProps,
  RadioGroupProps,
  CheckboxGroupProps,
  CascaderProps,
  SwitchProps,
  DatePickerProps
} from 'element-plus'
import type { ProElSchema } from '../../interfaces'
import type { TElTreeTransferProps } from '../../components/ElTreeTransfer'
import type { VNode, ObjectEmitsOptions, HTMLAttributes } from 'vue'
import type { TFooterBtnsProps } from '../FooterBtns'

/** ProElField ------------------------------------------- */

export type FieldProps = Partial<
  InputProps &
    InputNumberProps &
    RadioGroupProps &
    CheckboxGroupProps &
    CascaderProps &
    SwitchProps &
    DatePickerProps &
    TElTreeTransferProps &
    HTMLAttributes &
    Record<string, unknown>
>

/** @name 渲染类型 */
export type ValueType =
  | 'input'
  | 'inputNumber'
  | 'password'
  | 'select'
  | 'radioGroup'
  | 'checkboxGroup'
  | 'date'
  | 'dateTime'
  | 'dateRange'
  | 'dateTimeRange'
  | 'cascader'
  | 'switch'
  | 'transfer'

/** @description 请求选项的方法 */
export type RequestOption = () => Promise<FieldOption[]>

/** @name 选项数据 */
export interface FieldOption {
  /** @name 显示文本 */
  label: string | number
  /** @name 值 */
  value: string | number
  /** @name 子级选项 */
  children?: FieldOption[]
}

export interface ProFieldProps {
  modelValue: any
  /** 传递给字段组件的props */
  fieldProps: FieldProps
  valueType?: ValueType
  /** 字段选项 */
  options?: FieldOption[]
  requestOptions?: RequestOption
}

export interface ProFieldEmits extends ObjectEmitsOptions {
  'update:modelValue': (v: any) => void
}

/** ProElForm ------------------------------------------- */

/** @description 暴露的Exposes */
export interface ProElFormRef {
  validate: FormInstance['validate']
  validateField: FormInstance['validateField']
  resetFields: FormInstance['resetFields']
  scrollToField: FormInstance['scrollToField']
  clearValidate: FormInstance['clearValidate']
  getFieldValue: <T>(prop: string) => T
  getFieldsValue: <T extends Record<string, any>>() => T
}

/**
 * @name 表单列配置
 * @param T 数据类型
 * @param V 字段值的类型
 * @param P valueType渲染的组件Props
 */
export interface ProElFormColumn<T extends Record<string, any>> extends ProElSchema<T> {
  /** @description 在表单中隐藏，不再保留值 */
  hideInForm?: boolean | ((formData: T) => boolean)
  /** @description 传递给ElCol的Props */
  colProps?: Partial<ColProps>
}

export interface ProElFormProps<T extends Record<string, any>> {
  /**  @name 表单布局模式 */
  layoutType?: LayoutType
  /**  @name 表单字段定义 */
  columns?: ProElFormColumn<T>[]
  /** @description 传递给ElForm的Props */
  formProps?: Partial<Omit<FormProps, 'model'>>
  /** @description 传递给ElDialog的Props */
  modalProps?: Partial<DialogProps>
  /** @description 传递给ElDrawer的Props */
  drawerProps?: Partial<DrawerProps>
  /** @description 传递给ElRow的Props */
  rowProps?: Partial<RowProps>
  /** @name 提交相关配置 */
  submitter?: Submitter
  /** @description 点击重置按钮触发 */
  onReset?: (values: T) => Promise<void>
  /** @description 提交表单 通过校验后触发 */
  onFinish?: (values: T) => Promise<boolean>
  /** @description 组件挂载之后触发 */
  onReady?: (formRef: ProElFormRef) => void
}

export type LayoutType = 'Form' | 'DrawerForm' | 'DialogForm' | 'SearchForm'

export interface SubmitConfig {
  /** @name 重置按钮文本 */
  resetText?: string
  /** @name 提交按钮文本 */
  submitText?: string
  /** @name 展开文本 */
  collapseText?: string
  /** @name 收起文本 */
  collapsedText?: string
  /** @name 默认是否展开 */
  defaultCollapsed?: boolean
  /** @description 传递给提交按钮的Props */
  submitProps?: TFooterBtnsProps['confirmProps']
  /** @description 传递给重置按钮的Props */
  resetProps?: TFooterBtnsProps['cancelProps']
}

export interface Submitter {
  /** @name 提交方法 */
  onSubmit?: () => void
  /** @name 重置方法 */
  onReset?: () => void
  /**
   * @deprecated 搜索配置 已弃用 请使用 `submitConfig`
   */
  searchConfig?: SubmitConfig
  /** @name 提交按钮配置 */
  submitConfig?: SubmitConfig
  /** @name 自定义渲染方法 */
  render?: (() => VNode) | VNode
}
