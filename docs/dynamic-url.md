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
      const url = 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree'
      this.url = this.url ? '' : url
    }
  }
}
</script>
```
