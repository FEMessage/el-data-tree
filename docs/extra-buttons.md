可自定义按钮选项

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree',
      dataPath: 'data.payload',
      hasNew: false,
      hasEdit: false,
      hasDelete: false,
      extraButtons: [
        {
          text: '隐藏',
          show() {
            return false
          }
        },
        {
          text: '指定条件显示',
          show(data) {
            return data.children && data.children.length > 0
          },
          atClick(data, node) {
            console.log(data, node)
          }
        },
        {
          text: '自定义',
          atClick(data, node) {
            console.log(data, node)
          }
        }
      ]
    }
  },
}
</script>
```
