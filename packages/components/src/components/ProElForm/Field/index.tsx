import { defineComponent, computed, h, ref } from 'vue'
import type { FieldOption, ProFieldProps } from '../types'
import { ElTreeTransfer } from '../../ElTreeTransfer'
import {
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElDatePicker,
  ElCascader,
  ElSwitch
} from 'element-plus'

const propsArr: (keyof ProFieldProps)[] = [
  'modelValue',
  'fieldProps',
  'valueType',
  'options',
  'requestOptions'
]
/** 应该是类型ProFieldEmits 的Key */
const emitsArr: string[] = ['update:modelValue']

export const ProField = defineComponent<
  ProFieldProps,
  {
    'update:modelValue': (v: any) => void
  }
>(
  (props: ProFieldProps, { emit }) => {
    const activeOptions = ref<FieldOption[]>([])
    const value = computed({
      get() {
        return props.modelValue
      },
      set(v) {
        emit('update:modelValue', v)
      }
    })

    const getOptions = async () => {
      if (props.requestOptions) {
        const res = await props.requestOptions()
        activeOptions.value = res
      }
    }
    getOptions()

    const fieldDom = computed(() => {
      const t = props.valueType
      const options = props.options || activeOptions.value || []
      switch (t) {
        case 'input':
          return <ElInput />
        case 'cascader':
          return <ElCascader />
        case 'checkboxGroup':
          return (
            <ElCheckboxGroup>
              {options.map((item) => (
                <ElCheckbox key={item.value} label={item.value}>
                  {item.label}
                </ElCheckbox>
              ))}
            </ElCheckboxGroup>
          )
        case 'date':
          return <ElDatePicker type="date" />
        case 'dateRange':
          return <ElDatePicker type="daterange" />
        case 'dateTime':
          return <ElDatePicker type="datetime" />
        case 'dateTimeRange':
          return <ElDatePicker type="datetimerange" />
        case 'inputNumber':
          return <ElInputNumber />
        case 'password':
          return <ElInput type="password" />
        case 'radioGroup':
          return (
            <ElRadioGroup>
              {options.map((item) => (
                <ElRadio key={item.value} label={item.value}>
                  {item.label}
                </ElRadio>
              ))}
            </ElRadioGroup>
          )
        case 'select':
          return (
            <ElSelect>
              {options.map((item) => (
                <ElOption key={item.value} label={item.label} value={item.value} />
              ))}
            </ElSelect>
          )
        case 'switch':
          return <ElSwitch />
        case 'transfer':
          return <ElTreeTransfer />

        default:
          return <ElInput />
      }
    })

    return () =>
      h(fieldDom.value, {
        ...props.fieldProps,
        modelValue: value.value,
        'onUpdate:modelValue': (v: any) => {
          value.value = v
        }
      })
  },
  {
    name: 'ProField',
    props: [...propsArr],
    emits: [...emitsArr]
  }
)
