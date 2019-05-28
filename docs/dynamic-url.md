url可在运行时动态变化

```vue
<template>
  <div><el-data-tree v-bind="$data" /><el-button @click="handleClick">调整url</el-button></div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      dataPath: 'data.payload',
    }
  },
  methods: {
    handleClick() {
      const baseUrl = 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
      const getUrl = baseUrl + '/on-get'
      this.url = getUrl
    }
  }
}
</script>
```
