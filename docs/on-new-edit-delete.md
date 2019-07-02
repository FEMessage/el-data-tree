自定义新增、修改和删除时的方法

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    const baseUrl = 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
    const getUrl = baseUrl + '/on-get'
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
