带有标题栏

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" :onNew="onNew" :onEdit="onEdit" :onDelete="onDelete">
    <div slot="headerButtons">
      <el-button type="primary" size="mini">添加组织</el-button>
      <el-button type="primary" size="mini">保存节点顺序</el-button>
    </div>
  </el-data-tree>
</template>

<script>
export default {
  data() {
    return {
      dataPath: 'data.payload',
      hasTitle: true,
      title: "这是一个标题",
      subTitle: "这是一个副标题",
      form: [
        {
          $id: 'name',
          $type: 'input',
          label: '名字',
          $el: {
            placeholder: '请输入'
          }
        }
      ]
    }
  },
  methods: {
    onNew(data) {
      return this.$axios.post(this.postUrl, data)
    },
    onEdit(data) {
      return this.$axios.put(this.editUrl, data)
    },
    onDelete(data) {
      return this.$axios.delete(this.deleteUrl, data)
    }
  }
}
</script>
```
