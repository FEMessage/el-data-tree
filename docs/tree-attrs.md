支持配置el-tree

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree',
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
