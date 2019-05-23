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
    const url = {
      base: 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
    }
    ;['get', 'post', 'edit', 'delete'].forEach(m => {
      url[m] = url.base + `/on-${m}`
    })
    return {
      url: url.get,
      dataPath: 'data.payload',
    }
  },
}
</script>
```
