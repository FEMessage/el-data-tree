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
      const url = 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree'
      this.url = this.url ? '' : url
    }
  }
}
</script>
```
