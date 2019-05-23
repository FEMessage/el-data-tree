支持配置el-tree

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
      hasOperation: false,
      treeAttrs: {
        props: {
          children: 'children2',
          label: 'name'
        }
      },
      dataPath: 'data.payload'
    }
  },
}
</script>
```
