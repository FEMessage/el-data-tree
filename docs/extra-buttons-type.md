自定义节点菜单(text)

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
      'data-path': "data.payload",
      extraButtonsType: "text",
      form: [
        {
          $id: 'name',
          $type: 'input',
          label: '名字',
          $el: {
            placeholder: '请输入'
          }
        }
      ],
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
