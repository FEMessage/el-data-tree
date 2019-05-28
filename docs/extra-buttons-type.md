自定义节点菜单(text)

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
