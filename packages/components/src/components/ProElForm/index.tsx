import { ref, reactive, computed, defineComponent, toRaw, useSlots, h, onMounted } from 'vue'
import type { ProElFormRef, LayoutType, ProElFormProps } from './types'
import {
  ElRow,
  ElCol,
  ElForm,
  ElFormItem,
  ElDialog,
  ElDrawer,
  ElIcon,
  type FormInstance,
  ElTooltip
} from 'element-plus'
import { ProField } from './Field'
import { type TFooterBtnsProps, FooterBtns } from '../FooterBtns'
import { ArrowDown, InfoFilled } from '@element-plus/icons-vue'
export * from './types'

const compProps: (keyof ProElFormProps<Record<string, any>>)[] = [
  'layoutType',
  'columns',
  'drawerProps',
  'modalProps',
  'rowProps',
  'onFinish',
  'onReset',
  'onReady',
  'submitter',
  'formProps'
]
const compEmits: string[] = []

export const ProElForm = defineComponent<ProElFormProps<any>>(
  <T extends Record<string, any>>(props: ProElFormProps<T>) => {
    /** 24分栏 */
    const allSpanAtRowCount = 24
    const defaultFormData = reactive<T>({} as T)
    const formData = reactive<T>(defaultFormData)
    const loading = ref(false)
    const formRef = ref<null | FormInstance>(null)
    const expand = ref(props.submitter?.searchConfig?.defaultCollapsed || false)

    const slots = useSlots()

    /** 表单布局类型 */
    const formLayoutType = computed<LayoutType>(() => props.layoutType || 'Form')

    /** 表单值 */
    const originFormData = computed<T>(() => toRaw(formData))

    /** 表单列 */
    const columns = computed(() => {
      const arr =
        props.columns?.filter((i) =>
          typeof i.hideInForm === 'function' ? !i.hideInForm(originFormData.value) : !i.hideInForm
        ) || []
      arr.sort(({ order: orderA = 0 }, { order: orderB = 0 }) => {
        if (orderA === orderB) return 0
        return orderA > orderB ? 1 : -1
      })

      return arr
    })

    /** 搜索表单列 */
    const searchColumns = computed(() => {
      let endIndex: number | undefined = undefined
      if (!expand.value) {
        try {
          columns.value.reduce((p, item, index) => {
            const span = item.colProps?.span || allSpanAtRowCount
            const result = p + span
            if (result > allSpanAtRowCount) {
              endIndex = index
              throw new Error('over')
            } else {
              return result
            }
          }, 0)
        } catch (err) {
          /* empty */
        }
      }
      return columns.value.slice(0, endIndex)
    })

    /** 是否展示搜索表单收起展开按钮 */
    const showSearchFormExpand = computed(() => {
      return (
        columns.value.reduce((p, item) => {
          const span = item.colProps?.span || allSpanAtRowCount
          return p + span
        }, 0) > allSpanAtRowCount
      )
    })

    /** 提交表单事件 */
    const submitHandler = async () => {
      const result = await formRef.value?.validate()
      if (result === true) {
        loading.value = true
        if (props.onFinish) {
          const res = await props.onFinish(originFormData.value)
          if (res) {
            loading.value = false
          }
        }
      }
    }
    /** 重置表单事件 */
    const resetHandler = () => {
      if (props.onReset) {
        props.onReset(originFormData.value)
        return
      }
      initializeFormData()
    }

    /** 表单按钮VNode对象 */
    const formBtnsNode = computed(() => {
      const { onSubmit, onReset, searchConfig, render } = props.submitter || {}
      const {
        submitText = '提交',
        resetText = '重置',
        submitProps,
        resetProps
      } = searchConfig || {}

      const submitBtnProps: TFooterBtnsProps['confirmProps'] = loading.value
        ? ({ ...submitProps, disabled: true, loading: true } as TFooterBtnsProps['confirmProps'])
        : submitProps
      if (render) {
        if (typeof render === 'function') {
          return render()
        }
        return render
      }
      return (
        <FooterBtns
          cancelText={resetText}
          confirmText={submitText}
          confirmProps={submitBtnProps}
          cancelProps={resetProps}
          onCancel={onReset || resetHandler}
          onConfirm={onSubmit || submitHandler}
        />
      )
    })

    /** 表单VNode对象 */
    const formNode = computed(() => {
      // 通过判断字段最后一行剩余的栅格来放置按钮
      let spanCount =
        columns.value.reduce((p, item) => {
          const span = item.colProps?.span || allSpanAtRowCount
          return p + span
        }, 0) % allSpanAtRowCount
      spanCount = spanCount === 0 ? allSpanAtRowCount : spanCount
      const btnSpan = allSpanAtRowCount - spanCount

      const hideFormBtnTypes: LayoutType[] = ['DialogForm', 'DrawerForm', 'SearchForm']
      const arr = formLayoutType.value === 'SearchForm' ? searchColumns.value : columns.value

      return (
        <ElForm ref={formRef} model={formData} {...props.formProps}>
          <ElRow gutter={16} {...props.rowProps}>
            {arr.map((item) => {
              let formItemProps = item.formItemProps || {}
              if (typeof item.formItemProps === 'function') {
                formItemProps = item.formItemProps(originFormData.value)
              }
              let formFieldProps = item.fieldProps || {}
              if (typeof item.fieldProps === 'function') {
                formFieldProps = item.fieldProps(originFormData.value)
              }
              return (
                <ElCol {...item.colProps} key={item.key || item.prop}>
                  <ElFormItem label={item.label} prop={item.prop as string} {...formItemProps}>
                    {{
                      label: () =>
                        item.tooltip ? (
                          <div>
                            <span>{item.label}</span>
                            &ensp;
                            <span>
                              <ElTooltip effect="light" placement="top">
                                {{
                                  default: () => (
                                    <ElIcon class="align-middle cursor-pointer">
                                      <InfoFilled />
                                    </ElIcon>
                                  ),
                                  content: () => item.tooltip
                                }}
                              </ElTooltip>
                            </span>
                          </div>
                        ) : null,
                      error: () =>
                        slots[(item.prop as string) + 'Error']
                          ? slots[(item.prop as string) + 'Error']!({
                              record: originFormData.value[item.prop],
                              formData: originFormData.value,
                              column: item
                            })
                          : null,
                      default: () =>
                        slots[item.prop as string] ? (
                          slots[item.prop as string]!({
                            record: originFormData.value[item.prop],
                            formData: originFormData.value,
                            column: item
                          })
                        ) : item.renderField ? (
                          h(item.renderField(originFormData.value, item), {
                            modelValue: formData[item.prop],
                            'onUpdate:modelValue': (v: any) => {
                              formData[item.prop] = v
                            }
                          })
                        ) : (
                          <ProField
                            fieldProps={formFieldProps as any}
                            valueType={item.valueType}
                            options={item.options}
                            modelValue={formData[item.prop]}
                            onUpdate:modelValue={(v) => {
                              formData[item.prop] = v
                            }}
                          />
                        )
                    }}
                  </ElFormItem>
                </ElCol>
              )
            })}
            {hideFormBtnTypes.includes(formLayoutType.value) ? null : (
              <ElCol span={btnSpan === 0 ? allSpanAtRowCount : btnSpan}>
                <ElFormItem>{formBtnsNode.value}</ElFormItem>
              </ElCol>
            )}
          </ElRow>
        </ElForm>
      )
    })

    /** 表单布局 */
    const formLayoutNode = computed(() => {
      const { collapsedText = '收起', collapseText = '展开' } = props.submitter?.searchConfig || {}
      switch (formLayoutType.value) {
        case 'Form':
          return <div>{formNode.value}</div>

        case 'SearchForm':
          return (
            <div class="flex justify-between items-start">
              <div class="flex-grow">{formNode.value}</div>
              <div class="w-52 flex-shrink-0 flex justify-end items-center">
                {formBtnsNode.value}
                {showSearchFormExpand.value ? (
                  <div
                    class="ml-2 text-sm cursor-pointer text-[var(--el-color-primary)] select-none"
                    onClick={() => {
                      expand.value = !expand.value
                    }}
                  >
                    <span class="mr-1 text-xs">{expand.value ? collapsedText : collapseText}</span>
                    <ElIcon class={{ transition: true, 'rotate-180': expand.value }}>
                      <ArrowDown />
                    </ElIcon>
                  </div>
                ) : null}
              </div>
            </div>
          )
        case 'DialogForm':
          return (
            <ElDialog {...props.modalProps}>
              {{
                default: () => formNode.value,
                footer: () => formBtnsNode.value
              }}
            </ElDialog>
          )
        case 'DrawerForm':
          return (
            <ElDrawer {...props.drawerProps}>
              {{
                default: () => formNode.value,
                footer: () => formBtnsNode.value
              }}
            </ElDrawer>
          )
        default:
          return <div>{formNode.value}</div>
      }
    })

    /** 生成初始表单数据 */
    const initializeFormData = () => {
      const data = { ...defaultFormData }
      columns.value.forEach((i) => {
        data[i.prop] = i.initializeValue
      })
      Object.keys(data).forEach((i) => {
        const k = i as keyof T
        formData[k] = data[k]
      })
    }

    /** 获取所有表单数据 */
    const getFieldsValue: ProElFormRef['getFieldsValue'] = () => {
      return originFormData.value as any
    }

    /** 获取prop获取表单数据 */
    const getFieldValue: ProElFormRef['getFieldValue'] = (prop) => {
      return originFormData.value[prop]
    }

    const initializeCall = () => {
      initializeFormData()
    }
    initializeCall()

    onMounted(() => {
      if (formRef.value) {
        const { validate, validateField, resetFields, scrollToField, clearValidate } = formRef.value
        if (props.onReady) {
          props.onReady({
            validate,
            validateField,
            resetFields,
            scrollToField,
            clearValidate,
            getFieldsValue,
            getFieldValue
          })
        }
      }
    })

    return () => <div class="pro-el-form">{formLayoutNode.value}</div>
  },
  {
    name: 'ProElForm',
    props: [...compProps],
    emits: [...compEmits]
  }
)
