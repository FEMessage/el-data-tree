节点过滤

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    const baseUrl = 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
    const getUrl = baseUrl + '/on-get'
    return {
      url: getUrl,
      showFilter: true,
      dataPath: 'data.payload'
    }
  },
}
</script>
```
