支持默认展开

```vue
<template>
  <el-data-tree v-bind="$data" @node-expand="onNodeExpand" @node-collapse="onNodeCollapse" />
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
      ],
      onNew: (data) => {
        return this.$axios.post(url.post, data)
      },
      onEdit: (data) => {
        return this.$axios.put(url.edit, data)
      },
    }
  },
  methods: {
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
