有标题的用法

```vue
<template>
  <el-data-tree v-bind="$data">
    <span slot="title">这是 slot 标题</span>
    <el-button type="primary" size="mini" slot="header-new-btn">添加组织</el-button>
    <el-button type="primary" size="mini" slot="header-extra-block">其他按钮</el-button>
  </el-data-tree>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree',
      dataPath: 'data.payload',
      hasHeader: true,
    }
  },
}
</script>
```
