支持配置el-tree

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" />
</template>

<script>
export default {
  data() {
    return {
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
