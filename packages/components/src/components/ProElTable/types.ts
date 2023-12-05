import type { ProElFormColumn, ProElFormProps, ProElFormRef } from '../ProElForm/types'
import type { PaginationProps, TableColumnCtx, TableInstance, TableProps } from 'element-plus'

export type WritePaginationProps = {
  -readonly [K in keyof PaginationProps]: PaginationProps[K]
}

export type TableEmits =
  | 'select'
  | 'select-all'
  | 'expand-change'
  | 'current-change'
  | 'selection-change'
  | 'cell-mouse-enter'
  | 'cell-mouse-leave'
  | 'cell-contextmenu'
  | 'cell-click'
  | 'cell-dblclick'
  | 'row-click'
  | 'row-contextmenu'
  | 'row-dblclick'
  | 'header-click'
  | 'header-contextmenu'
  | 'sort-change'
  | 'filter-change'
  | 'header-dragend'

export type ElTableEvents = Record<TableEmits, (...agrs: any) => void>

export interface ProElTableColumn<T extends Record<string, any>> extends ProElFormColumn<T> {
  /** @name 默认隐藏列 */
  defaultHideInColumn?: true
  /** @name 在搜索表单中隐藏 */
  hideInSearch?: boolean
  /** @name 在表格中隐藏 */
  hideInTable?: boolean
  /** @description 表格Column配置 */
  tableColumn?: Partial<Omit<TableColumnCtx<T>, 'prop' | 'label'>>
}

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

export interface ProElTableProps<T extends Record<string, any>> {
  /** @name 表格数据 */
  tableData?: T[]
  /** @name 表格列配置 */
  columns?: ProElTableColumn<T>[]
  /** @name 表格数据请求方法 */
  request?: RequestProp<T>
  /** @name 传递给ElTable的Props */
  tableProps?: Omit<TableProps<T>, 'data'>
  /** @name 传递给ProElForm的Props */
  formProps?: Pick<
    ProElFormProps<Record<keyof T, any>>,
    'rowProps' | 'submitter' | 'onFinish' | 'onReady'
  >
  /** @name 传递给表格的事件对象 */
  tableEvents?: Partial<ElTableEvents>
  /** @name 是否手动触发首次请求 */
  manualRequest?: true
  /** @description 空值时显示内容 */
  columnEmptyText?: string
  /** @name 分页配置 */
  pagination?: false | Partial<WritePaginationProps>
  /** @name 隐藏表格工具栏 */
  hideTools?: true
  /** @description 组件挂载之后触发 */
  onReady?: (tableRef: ProElTableRef, formRef: ProElFormRef) => void
  /** @name 表格Loading */
  loading?: boolean
  /** 隐藏搜索表单 */
  hideSearchBar?: true
  /** 多选 */
  isSelection?: true
}

/**
 * @name ProElTable 方法
 * @link https://element-plus.org/zh-CN/component/table.html#table-%E6%96%B9%E6%B3%95
 */
export interface ProElTableRef {
  clearSelection: TableInstance['clearSelection']
  getSelectionRows: TableInstance['getSelectionRows']
  toggleRowSelection: TableInstance['toggleRowSelection']
  toggleAllSelection: TableInstance['toggleAllSelection']
  toggleRowExpansion: TableInstance['toggleRowExpansion']
  setCurrentRow: TableInstance['setCurrentRow']
  clearSort: TableInstance['clearSort']
  clearFilter: TableInstance['clearFilter']
  doLayout: TableInstance['doLayout']
  sort: TableInstance['sort']
  scrollTo: TableInstance['scrollTo']
  setScrollTop: TableInstance['setScrollTop']
  setScrollLeft: TableInstance['setScrollLeft']
  /** @name 重置表格数据 */
  reload: () => void
  /** @name 重置表单值并且重置表格数据 */
  reloadAndReset: () => void
}
