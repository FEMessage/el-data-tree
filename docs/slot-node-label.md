自定义节点文本内容

 ```vue
<template>
  <el-data-tree :url="getUrl" data-path="data.payload">
    <span slot="node-label" slot-scope="{ data }">
      <el-tag size="small">{{ data.id }}</el-tag>
      {{ data.name }}
      <el-tag size="mini" type="info">{{ data.tag }}</el-tag>
    </span>
  </el-data-tree>
</template>
```