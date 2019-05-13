自定义节点菜单(text)

  ```vue
<template>
  <el-data-tree
    :form="form"
    :url="getUrl"
    data-path="data.payload"
    :extraButtons="extraButtons"
    extraButtonsType="text"
  ></el-data-tree>
</template>

<script>
export default {
  data() {
    return {
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