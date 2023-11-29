import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  useSlots,
  watch,
  withDirectives
} from 'vue'
import type { ElTableEvents, ProElTableProps, WritePaginationProps } from './types'
import { ProElForm, type ProElFormProps, type ProElFormRef } from '../ProElForm'
import {
  ElCheckbox,
  ElCheckboxGroup,
  ElDropdown,
  ElIcon,
  ElTable,
  ElTableColumn,
  ElTooltip,
  ElLoadingDirective,
  ElEmpty,
  ElPagination,
  type TableInstance,
  type TableProps
} from 'element-plus'
import { InfoFilled, RefreshRight, Setting } from '@element-plus/icons-vue'
export * from './types'

const propsArr: (keyof ProElTableProps<any>)[] = [
  'tableData',
  'columns',
  'request',
  'tableProps',
  'formProps',
  'manualRequest',
  'columnEmptyText',
  'search',
  'pagination',
  'hideTools',
  'onReady',
  'loading',
  'tableEvents'
]

const SLOTS_NAME = {
  title: 'tableTitle',
  tools: 'tableTools',
  empty: 'tableEmpty',
  append: 'tableAppend'
}
const defaultColumnEmptyText = '-'

interface State<T> {
  loading: boolean
  tableData: T[]
  showColumnsKeys: string[]
}

export const ProElTable = defineComponent<ProElTableProps<any>>(
  <T extends Record<string, any>>(props: ProElTableProps<T>) => {
    const slots = useSlots()
    const formRef = ref<ProElFormRef | null>(null)
    const tableRef = ref<TableInstance | null>(null)
    const state = reactive<State<T>>({
      loading: false,
      tableData: [],
      showColumnsKeys:
        props.columns
          ?.filter((i) => !i.hideInTable && !i.defaultHideInColumn)
          .map((i) => i.prop as string) || []
    })

    /** 分页配置 */
    const pageConfig = reactive<Partial<WritePaginationProps>>({
      total: 0,
      pageSize: 10,
      currentPage: 1,
      layout: 'total, sizes, prev, pager, next, jumper',
      ...(props.pagination === false ? undefined : props.pagination)
    })

    /** 搜索表单列 */
    const searchColumns = computed(() => props.columns?.filter((i) => !i.hideInSearch))

    /** 表格列 */
    const tableColumns = computed(() => props.columns?.filter((i) => !i.hideInTable))

    /** 当前显示的表格列 */
    const currentTableColumns = computed(
      () => tableColumns.value?.filter((i) => state.showColumnsKeys.includes(i.prop as string))
    )

    /** 重置事件 */
    const resetFormHandler = () => {
      formRef.value?.resetFields()
      requestResult()
    }

    /** 请求数据 */
    const requestResult = async () => {
      if (props.request) {
        const f = await formRef.value?.validate()
        if (f === true) {
          const formData = formRef.value?.getFieldsValue<T>()
          state.loading = true
          const res = await props
            .request(formData || {}, pageConfig.pageSize!, pageConfig.currentPage!)
            .finally(() => {
              state.loading = false
            })
          if (res.success) {
            state.tableData.splice(0, state.tableData.length, ...(res.dataList as any))
            pageConfig.total = res.total
          }
          return Promise.resolve(true)
        }

        return Promise.resolve(false)
      }
      state.tableData = (props.tableData as any) || []
      return Promise.resolve(true)
    }

    /** 传递给表单的Props */
    const formProps = computed<ProElFormProps<T>>(() => {
      return {
        layoutType: 'SearchForm',
        columns: searchColumns.value,
        submitter: {
          onReset() {
            resetFormHandler()
          },
          searchConfig: {
            submitText: '查询'
          }
        },
        onReady(ref) {
          formRef.value = ref
        },
        onFinish() {
          return requestResult()
        },
        ...(props.search === false ? undefined : props.search),
        ...props.formProps
      }
    })

    /** 传递给表格的Props */
    const tableProps = computed<Partial<TableProps<T>>>(() => {
      return {
        border: true,
        data: state.tableData,
        ...props.tableProps
      }
    })

    /** 传递给表格的事件 */
    const tableEvents = computed(() => {
      const emits: Record<string, any> = {}
      if (props.tableEvents) {
        Object.keys(props.tableEvents).forEach((k) => {
          let key = k.replace(k.charAt(0), k.charAt(0).toUpperCase())
          key = 'on' + key
          emits[key] = props.tableEvents![k as keyof ElTableEvents]
        })
      }
      return emits
    })

    // const initializeCall = () => {}
    // initializeCall()

    watch([() => pageConfig.currentPage, () => pageConfig.pageSize], () => {
      requestResult()
    })

    watch(
      () => props.loading,
      (loading) => {
        if (loading !== undefined) {
          state.loading = loading
        }
      }
    )

    onMounted(() => {
      if (!props.manualRequest) {
        requestResult()
      }

      if (tableRef.value && formRef.value) {
        const {
          clearSelection,
          getSelectionRows,
          toggleRowSelection,
          toggleAllSelection,
          toggleRowExpansion,
          setCurrentRow,
          clearSort,
          clearFilter,
          doLayout,
          sort,
          scrollTo,
          setScrollTop,
          setScrollLeft
        } = tableRef.value

        if (props.onReady) {
          props.onReady(
            {
              clearSelection,
              getSelectionRows,
              toggleRowSelection,
              toggleAllSelection,
              toggleRowExpansion,
              setCurrentRow,
              clearSort,
              clearFilter,
              doLayout,
              sort,
              scrollTo,
              setScrollTop,
              setScrollLeft,
              reload() {
                requestResult()
              },
              reloadAndReset() {
                resetFormHandler()
              }
            },
            formRef.value
          )
        }
      }
    })
    return () => (
      <div class="pro-el-table">
        {props.search === false ? null : (
          <header>
            <ProElForm {...formProps.value} />
          </header>
        )}
        <main>
          <div
            class="flex justify-between items-center"
            style={{ marginBottom: props.hideTools && !slots[SLOTS_NAME.title] ? 0 : '10px' }}
          >
            <div>{slots[SLOTS_NAME.title] ? slots[SLOTS_NAME.title]!() : null}</div>
            {props.hideTools ? null : (
              <div>
                {slots[SLOTS_NAME.tools] ? (
                  slots[SLOTS_NAME.tools]!()
                ) : (
                  <div class="flex justify-between items-center h-5">
                    <div
                      class="cursor-pointer flex justify-center items-center"
                      onClick={() => {
                        requestResult()
                      }}
                    >
                      <ElTooltip content="刷新" placement="top" effect="light">
                        <ElIcon class={`${state.loading ? 'is-loading' : null}`} size={20}>
                          <RefreshRight />
                        </ElIcon>
                      </ElTooltip>
                    </div>
                    <div style={{ marginLeft: '12px' }}>
                      {tableColumns.value?.length ? (
                        <ElDropdown trigger="click">
                          {{
                            default: () => (
                              <div>
                                <ElTooltip content="列设置" placement="top" effect="light">
                                  <ElIcon class="cursor-pointer" size={20}>
                                    <Setting />
                                  </ElIcon>
                                </ElTooltip>
                              </div>
                            ),
                            dropdown: () => (
                              <div class="p-2">
                                <ElCheckboxGroup
                                  modelValue={state.showColumnsKeys}
                                  onChange={(v) => (state.showColumnsKeys = v as any)}
                                >
                                  {tableColumns.value?.map((item) => (
                                    <ElCheckbox
                                      key={item.prop}
                                      class="pro-el-table-columns-keys"
                                      label={item.prop as string}
                                    >
                                      {item.label}
                                    </ElCheckbox>
                                  ))}
                                </ElCheckboxGroup>
                              </div>
                            )
                          }}
                        </ElDropdown>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            {withDirectives(
              <ElTable
                element-loading-text="loading......"
                {...tableProps.value}
                ref={tableRef}
                {...tableEvents.value}
              >
                {currentTableColumns.value?.map((i) => (
                  <ElTableColumn
                    key={i.key || i.prop}
                    label={i.label}
                    prop={i.prop as string}
                    {...i.tableColumn}
                  >
                    {{
                      default: ({ row, column, $index }: any) => {
                        if (i.tableColumn?.type === 'selection') {
                          return null
                        }
                        const v = i.tableColumn?.formatter
                          ? null
                          : row[i.prop] ?? (props.columnEmptyText || defaultColumnEmptyText)
                        return slots[i.prop as string]
                          ? slots[i.prop as string]!({ row, column, $index })
                          : v
                      },
                      header: ({ column, $index }: any) =>
                        slots[(i.prop as string) + '_header'] ? (
                          slots[(i.prop as string) + '_header']!({ column, $index })
                        ) : i.tooltip ? (
                          <div>
                            <span>{i.label}</span>
                            &ensp;
                            <span>
                              <ElTooltip effect="light" placement="top">
                                {{
                                  default: () => (
                                    <ElIcon class="align-middle cursor-pointer">
                                      <InfoFilled />
                                    </ElIcon>
                                  ),
                                  content: () => i.tooltip
                                }}
                              </ElTooltip>
                            </span>
                          </div>
                        ) : (
                          i.label
                        ),
                      empty: () =>
                        slots[SLOTS_NAME.empty] ? slots[SLOTS_NAME.empty]!() : <ElEmpty />,
                      append: () => (slots[SLOTS_NAME.append] ? slots[SLOTS_NAME.append]!() : null)
                    }}
                  </ElTableColumn>
                ))}
              </ElTable>,
              [[ElLoadingDirective, state.loading]]
            )}
          </div>
          {props.pagination === false ? null : (
            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <div style={{ display: 'inline-block' }}>
                <ElPagination
                  {...pageConfig}
                  onUpdate:page-size={(v) => {
                    pageConfig.pageSize = v
                  }}
                  onUpdate:current-page={(v) => {
                    pageConfig.currentPage = v
                  }}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    )
  },
  {
    name: 'ProElTable',
    props: propsArr
  }
)
