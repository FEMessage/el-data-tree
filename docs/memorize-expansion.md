支持默认展开

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" :onNew="onNew" :onEdit="onEdit" @node-expand="onNodeExpand" @node-collapse="onNodeCollapse" />
</template>
<script>
export default {
  data() {
    return {
      dataPath: 'data.payload',
      treeAttrs: {
        defaultExpandedKeys: [92062]
      },
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
    onNew(data, row) {
      return this.$axios.post(this.postUrl, data)
    },
    onEdit(data, row) {
      return this.$axios.put(this.editUrl, data)
    },
    onNodeExpand(data, node, tree) {
      console.log('onNodeExpand', data, node, tree)
    },
    onNodeCollapse(data, node, tree) {
      console.log('onNodeCollapse', data, node, tree)
    }
  }
}
</script>
```
