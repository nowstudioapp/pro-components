import { computed, defineComponent, type HTMLAttributes } from "vue"
import { type ButtonProps, ElButton } from "element-plus"

export type TFooterBtnsProps = {
  cancelText?: string
  confirmText?: string
  confirmProps?: Partial<ButtonProps> & HTMLAttributes
  cancelProps?: Partial<ButtonProps> & HTMLAttributes
}

export type TFooterBtnsEmits = {
  cancel: () => void
  confirm: () => void
}

export const FooterBtns = defineComponent<TFooterBtnsProps, TFooterBtnsEmits>(
  (p, { emit }) => {
    const props = computed(() => {
      const { cancelText = "取消", confirmText = "确定", confirmProps, cancelProps } = p
      return {
        cancelText,
        confirmText,
        confirmProps,
        cancelProps,
      }
    })
    return () => (
      <div class='footer-btns inline-block'>
        <ElButton
          {...props.value.cancelProps}
          onClick={() => {
            emit("cancel")
          }}
        >
          {props.value.cancelText}
        </ElButton>
        <ElButton
          type='primary'
          {...props.value.confirmProps}
          onClick={() => {
            emit("confirm")
          }}
        >
          {props.value.confirmText}
        </ElButton>
      </div>
    )
  },
  {
    name: "FooterBtns",
    emits: ["cancel", "confirm"],
    props: ["cancelText", "confirmText", "confirmProps", "cancelProps"],
  }
)
