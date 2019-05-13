有标题的用法

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" :onNew="onNew" :onEdit="onEdit" :onDelete="onDelete">
    <span slot="title">这是 slot 标题</span>
    <el-button type="primary" size="mini" slot="header-new-btn">添加组织</el-button>
    <el-button type="primary" size="mini" slot="header-extra-block">其他按钮</el-button>
  </el-data-tree>
</template>

<script>
export default {
  data() {
    return {
      dataPath: 'data.payload',
	    hasHeader: true,
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
