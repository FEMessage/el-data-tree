自定义节点文本内容

 ```vue
<template>
  <el-data-tree v-bind="$data">
    <span slot="node-label" slot-scope="{ data }">
      <el-tag size="small">{{ data.id }}</el-tag>
      {{ data.name }}
      <el-tag size="mini" type="info">{{ data.tag }}</el-tag>
    </span>
  </el-data-tree>
</template>
<script>
export default {
  data() {
    return {
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree',
      dataPath: 'data.payload',
    }
  },
}
</script>
```
