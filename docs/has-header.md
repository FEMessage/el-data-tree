有标题的用法

```vue
<template>
  <el-data-tree v-bind="$data"">
    <span slot="title">这是 slot 标题</span>
    <el-button type="primary" size="mini" slot="header-new-btn">添加组织</el-button>
    <el-button type="primary" size="mini" slot="header-extra-block">其他按钮</el-button>
  </el-data-tree>
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
      ],
      onNew: (data) => {
        return this.$axios.post(url.post, data)
      },
      onEdit: (data) => {
        return this.$axios.put(url.edit, data)
      },
      onDelete: (data) => {
        return this.$axios.delete(url.delete, data)
      }
    }
  },
}
</script>
```
