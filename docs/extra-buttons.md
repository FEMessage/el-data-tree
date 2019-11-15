可自定义按钮选项

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree',
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
