# FooterBtns 页脚按钮

主要适用于表单、抽屉、模态框的页脚按钮组件

## 基本使用

<preview path="./demos/basic.vue" />

## Props

| 属性名       | 说明            | 类型                                    | 默认值 |
| ------------ | --------------- | --------------------------------------- | ------ |
| cancelText   | 取消文本        | `string`                                | 取消   |
| confirmText  | 确认文本        | `string`                                | 确定   |
| confirmProps | 确认按钮的Props | `Partial<ButtonProps> & HTMLAttributes` | -      |
| cancelProps  | 取消按钮的Props | `Partial<ButtonProps> & HTMLAttributes` | -      |

## Events

| 事件名  | 说明               | 类型         |
| ------- | ------------------ | ------------ |
| cancel  | 点击取消按钮时触发 | `() => void` |
| confirm | 点击确认按钮时触发 | `() => void` |
