支持默认展开

```vue
<template>
  <el-data-tree v-bind="$data" @node-expand="onNodeExpand" @node-collapse="onNodeCollapse" />
</template>
<script>
export default {
  data() {
    const baseUrl = 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
    const getUrl = baseUrl + '/on-get'
    return {
      url: getUrl,
      dataPath: 'data.payload',
      treeAttrs: {
        defaultExpandedKeys: [92062]
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
