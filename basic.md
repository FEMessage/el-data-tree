基础用法

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree',
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
    }
  },
}
</script>
```
