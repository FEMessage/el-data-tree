节点过滤

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" />
</template>

<script>
export default {
  data() {
    return {
      showFilter: true,
      dataPath: 'data.payload'
    }
  },
}
</script>
```
