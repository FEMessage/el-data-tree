折叠树

```vue
<template>
  <div style="width: 200px;">
    <el-data-tree v-bind="$data" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree',
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
      collapsable: true,
    }
  },
}
</script>
```