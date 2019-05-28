支持配置el-tree

```vue
<template>
  <el-data-tree v-bind="$data" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree',
      hasOperation: false,
      treeAttrs: {
        props: {
          children: 'children2',
          label: 'name'
        }
      },
      dataPath: 'data.payload'
    }
  },
}
</script>
```
