自定义节点菜单(text)

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
      extraButtonsType: "text",
      extraButtons: [
        {
          text: '自定义按钮',
          atClick: (node, data) => {
            console.log(data)
          }
        }
      ]
    }
  }
}
</script>

```
