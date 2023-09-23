import { ElCheckbox, ElInput, ElTree, ElIcon, ElScrollbar, ElTooltip } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { computed, defineComponent, ref, watch } from 'vue'
import './index.css'
import type { TreeComponentProps } from 'element-plus/es/components/tree/src/tree.type'

export type TElTreeTransferData = {
  label: string
  value: string | number
  children?: TElTreeTransferData[]
  disabled?: boolean
}

type TProps = {
  children: string
  label: string
  value: string
}

export type TElTreeTransferProps = {
  /** @name 选中的值 */
  modelValue?: TElTreeTransferData[]
  /** @name 标题 */
  titles?: string[]
  height?: number
  /** @name 自定义配置选项 */
  props?: TProps
  /** @name 展示的数据 */
  dataList?: any[]
}

function deepCount(arr: TElTreeTransferData[]): number {
  return arr.reduce((p, i) => {
    if (Array.isArray(i.children) && i.children.length) {
      return p + 1 + deepCount(i.children)
    }
    return p + 1
  }, 0)
}

export const ElTreeTransfer = defineComponent<
  TElTreeTransferProps,
  { 'update:modelValue': (v: TElTreeTransferData[]) => void }
>(
  (
    {
      modelValue = [],
      props = { label: 'label', value: 'value', children: 'children' },
      dataList = [],
      titles = ['默认列表', '已选列表'],
      height = 200
    },
    { emit }
  ) => {
    const maxLen = 6
    const leftTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
    const rightTreeRef = ref<InstanceType<typeof ElTree> | null>(null)
    const leftSelected = ref<TElTreeTransferData[]>([])
    const rightSelected = ref<TElTreeTransferData[]>([])
    const leftStatus = ref(false)
    const rightStatus = ref(false)
    const leftKeyword = ref('')
    const rightKeyword = ref('')

    const activeNodes = ref<TElTreeTransferData[]>(modelValue)

    const options = computed<TElTreeTransferData[]>(() => {
      const p = props
      const labelK = p.label
      const valueK = p.value
      const childrenK = p.children
      function deepInitDisabled(arr: any[]): TElTreeTransferData[] {
        return arr.map((i) => {
          if (Array.isArray(i[childrenK]) && i[childrenK].length) {
            return {
              label: i[labelK],
              value: i[valueK],
              children: deepInitDisabled(i[childrenK])
            }
          } else {
            return {
              label: i[labelK],
              value: i[valueK],
              disabled: activeNodes.value.find((item) => item.value === i[valueK]) ? true : false
            }
          }
        })
      }
      return deepInitDisabled(dataList)
    })

    const leftTreeInfo = computed(() => {
      return {
        allLength: deepCount(options.value),
        checkedLength: leftSelected.value.length
      }
    })

    const rightTreeInfo = computed(() => {
      return {
        allLength: activeNodes.value.length,
        checkedLength: rightSelected.value.length
      }
    })

    const btnConfig = computed<
      { id: number; type: 'left' | 'right'; icon: any; disabled: boolean }[]
    >(() => {
      return [
        {
          id: 0,
          type: 'right',
          icon: <ArrowRight />,
          disabled: !leftSelected.value.length
        },
        {
          id: 1,
          type: 'left',
          icon: <ArrowLeft />,
          disabled: !rightSelected.value.length
        }
      ]
    })

    const leftCheckChange = (
      record: TElTreeTransferData,
      { checkedNodes }: { checkedNodes: TElTreeTransferData[] }
    ) => {
      leftSelected.value = checkedNodes
    }

    const rightCheckChange = (
      record: TElTreeTransferData,
      { checkedNodes }: { checkedNodes: TElTreeTransferData[] }
    ) => {
      rightSelected.value = checkedNodes
    }

    const transferHander = (target: 'left' | 'right') => {
      if (target === 'right') {
        const active = leftSelected.value.filter((i) => {
          return (
            (!Array.isArray(i.children) || !i.children.length) &&
            activeNodes.value.every((item) => item.value !== i.value)
          )
        })
        activeNodes.value = [...activeNodes.value, ...active]
        leftTreeRef.value?.setCheckedKeys([])
        leftSelected.value = []
      } else {
        activeNodes.value = activeNodes.value.filter((i) => {
          return !rightSelected.value.find((item) => item.value === i.value)
        })
        rightSelected.value = []
        rightTreeRef.value?.setCheckedKeys([])
      }
    }

    const leftStatusChange = (v: boolean) => {
      if (v) {
        leftTreeRef.value?.setCheckedKeys(options.value.map((i) => i.value))
        leftSelected.value = leftTreeRef.value?.getCheckedNodes() || ([] as any)
        // leftCheckChange(options.value[0],leftTreeRef.value?.getCurrentNode() || [] as any)
      } else {
        leftSelected.value = []
        leftTreeRef.value?.setCheckedKeys([])
      }
      leftStatus.value = v
    }

    const rightStatusChange = (v: boolean) => {
      if (v) {
        rightTreeRef.value?.setCheckedKeys(activeNodes.value.map((i) => i.value))
        rightSelected.value = rightTreeRef.value?.getCheckedNodes() || ([] as any)
      } else {
        rightSelected.value = []
        rightTreeRef.value?.setCheckedKeys([])
      }
      rightStatus.value = v
    }

    const renderRecord: TreeComponentProps['renderContent'] = (h, { node }) => {
      const text: string = node.data.label
      return h(
        ElTooltip,
        {
          content: text,
          effect: 'light'
        },
        () => [h('span', text.length >= maxLen ? text.slice(0, maxLen) + '...' : text)]
      )
    }

    watch(leftTreeInfo, ({ checkedLength, allLength }) => {
      if (checkedLength === 0) {
        leftStatus.value = false
      } else if (checkedLength === allLength) {
        leftStatus.value = true
      }
    })

    watch(rightTreeInfo, ({ checkedLength, allLength }) => {
      if (checkedLength === 0) {
        rightStatus.value = false
      } else if (checkedLength === allLength) {
        rightStatus.value = true
      }
    })

    watch(leftKeyword, (val) => {
      leftTreeRef.value?.filter(val)
    })

    watch(rightKeyword, (val) => {
      rightTreeRef.value?.filter(val)
    })

    watch(activeNodes, (v) => {
      emit('update:modelValue', v)
    })

    watch(
      () => modelValue,
      (v) => {
        activeNodes.value = v
      }
    )

    return () => (
      <div class="pro-el-tree-transfer select-none w-full">
        <div class="flex justify-between text-sm">
          <div>
            <div class="border border-solid border-[var(--el-border-color)]">
              <header class="pl-3 pr-3 flex justify-between items-center border-0 border-b border-solid border-[var(--el-border-color)]">
                <div class="flex justify-start items-center">
                  <div class="mr-2">
                    <ElCheckbox
                      indeterminate={
                        leftTreeInfo.value.checkedLength < leftTreeInfo.value.allLength &&
                        leftTreeInfo.value.checkedLength !== 0
                      }
                      modelValue={leftStatus.value}
                      onUpdate:modelValue={(v) => {
                        leftStatusChange(v as boolean)
                      }}
                    />
                  </div>
                  <span>{titles[0]}</span>
                </div>
                <div>
                  <span>
                    {leftTreeInfo.value.checkedLength}/{leftTreeInfo.value.allLength}
                  </span>
                </div>
              </header>
              <section class="mt-2 pl-3 pr-3">
                <ElInput
                  validateEvent={false}
                  placeholder="请输入搜索关键字"
                  suffixIcon={'Search'}
                  modelValue={leftKeyword.value}
                  onUpdate:modelValue={(v) => {
                    leftKeyword.value = v
                  }}
                />
              </section>
              <main>
                <div class="pl-3 pr-3 mt-2" style={{ height: height + 'px' }}>
                  <ElScrollbar>
                    <ElTree
                      ref={leftTreeRef}
                      nodeKey="value"
                      showCheckbox
                      data={options.value}
                      onCheck={leftCheckChange}
                      filterNodeMethod={(v, data) => {
                        if (!v) return true
                        return data.label.includes(v)
                      }}
                      renderContent={renderRecord}
                    />
                  </ElScrollbar>
                </div>
              </main>
            </div>
          </div>
          <div class="w-16 flex flex-col justify-center items-center">
            {btnConfig.value.map((i) => {
              return (
                <div
                  key={i.id}
                  onClick={() => {
                    if (i.disabled) return
                    transferHander(i.type)
                  }}
                  class={`${
                    i.disabled
                      ? 'cursor-no-drop'
                      : 'bg-[var(--el-color-primary)] text-white cursor-pointer'
                  } flex justify-center items-center w-6 h-6 rounded-sm bg-[rgba(0,0,0,.04)] border border-solid border-[rgba(0,0,0,.15)] last-of-type:mt-2 `}
                >
                  <ElIcon>{i.icon}</ElIcon>
                </div>
              )
            })}
          </div>
          <div>
            <div class="border border-solid border-[var(--el-border-color)]">
              <header class="pl-3 pr-3 flex justify-between items-center border-0 border-b border-solid border-[var(--el-border-color)]">
                <div class="flex justify-start items-center">
                  <div class="mr-2">
                    <ElCheckbox
                      indeterminate={
                        rightTreeInfo.value.checkedLength < rightTreeInfo.value.allLength &&
                        rightTreeInfo.value.checkedLength !== 0
                      }
                      modelValue={rightStatus.value}
                      onUpdate:modelValue={(v) => {
                        rightStatusChange(v as boolean)
                      }}
                    />
                  </div>
                  <span>{titles[1]}</span>
                </div>
                <div>
                  <span>
                    {rightTreeInfo.value.checkedLength}/{rightTreeInfo.value.allLength}
                  </span>
                </div>
              </header>
              <section class="mt-2 pl-3 pr-3">
                <ElInput
                  validateEvent={false}
                  placeholder="请输入搜索关键字"
                  suffixIcon={'Search'}
                  modelValue={rightKeyword.value}
                  onUpdate:modelValue={(v) => {
                    rightKeyword.value = v
                  }}
                />
              </section>
              <main>
                <div class="pl-3 pr-3 mt-2" style={{ height: height + 'px' }}>
                  <ElScrollbar>
                    <ElTree
                      showCheckbox
                      nodeKey="value"
                      ref={rightTreeRef}
                      data={activeNodes.value}
                      onCheck={rightCheckChange}
                      filterNodeMethod={(v, data) => {
                        if (!v) return true
                        return data.label.includes(v)
                      }}
                      renderContent={renderRecord}
                    />
                  </ElScrollbar>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    name: 'ElTreeTransfer',
    emits: ['update:modelValue'],
    props: ['modelValue', 'titles', 'height', 'props', 'dataList']
  }
)
