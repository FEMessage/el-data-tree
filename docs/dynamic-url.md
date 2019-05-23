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
      const url = {
        base: 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
      }
      ;['get', 'post', 'edit', 'delete'].forEach(m => {
        url[m] = url.base + `/on-${m}`
      })
      this.url = url.get
    }
  }
}
</script>
```
