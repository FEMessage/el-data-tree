可自定义按钮选项

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    const url = {
      base: 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
    }
    ;['get', 'post', 'edit', 'delete'].forEach(m => {
      url[m] = url.base + `/on-${m}`
    })
    return {
      url: url.get,
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
