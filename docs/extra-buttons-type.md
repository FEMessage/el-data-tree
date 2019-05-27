自定义节点菜单(text)

  ```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    const baseUrl = 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
    const getUrl = baseUrl + '/on-get'
    return {
      url: getUrl,
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
