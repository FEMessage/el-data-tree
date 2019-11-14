自定义新增、修改和删除时的方法

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    const baseUrl = 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree'
    const getUrl = baseUrl
    const postUrl = baseUrl + '/on-post'
    const editUrl = baseUrl + '/on-edit'
    const deleteUrl = baseUrl + '/on-delete'
    return {
      url: getUrl,
      dataPath: 'data.payload',
      form: [
        {
          id: 'name',
          type: 'input',
          label: '名字',
          el: {
            placeholder: '请输入'
          }
        }
      ],
      onNew: (data) => {
        return this.$axios.post(postUrl, data)
      },
      onEdit: (data) => {
        return this.$axios.put(editUrl, data)
      },
      onDelete: (data) => {
        return this.$axios.delete(deleteUrl, data)
      }
    }
  },
}
</script>
```
