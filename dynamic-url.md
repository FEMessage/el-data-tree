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
      this.url = this.url ? '' : this.getUrl
    }
  }
}
</script>
```
