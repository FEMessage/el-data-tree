基础用法

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" :onNew="onNew" :onEdit="onEdit" :onDelete="onDelete" />
</template>

<script>
export default {
  data() {
    return {
      dataPath: 'data.payload',
      form: [
        {
          $id: 'name',
          $type: 'input',
          label: '名字',
          $el: {
            placeholder: '请输入'
          }
        }
      ]
    }
  },
  methods: {
    onNew(data) {
      return this.$axios.post(this.postUrl, data)
    },
    onEdit(data) {
      return this.$axios.put(this.editUrl, data)
    },
    onDelete(data) {
      return this.$axios.delete(this.deleteUrl, data)
    }
  }
}
</script>
```
