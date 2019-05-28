在新增/修改弹窗点击确认, 并完成表单 form 表单校验后调用，需要返回 Promise.
如果 resolve, 则会发送新增/修改请求; 如果 reject, 则不会发送新增/修改请求.
参数: (data, isNew) data 为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗

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
    return {
      url: getUrl,
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
      ],
      onNew: (data) => {
        return this.$axios.post(postUrl, data)
      },
      onEdit: (data) => {
        return this.$axios.put(editUrl, data)
      },
      beforeConfirm(data, isNew) {
        if (isNew) {
          alert('新增可以发送请求')
          return Promise.resolve()
        } else {
          alert('修改不可以发送请求')
          return Promise.reject()
        }
      }
    }
  },
}
</script>
```
