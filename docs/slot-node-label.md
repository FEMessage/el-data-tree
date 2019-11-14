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
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree',
      dataPath: 'data.payload',
    }
  },
}
</script>
```
