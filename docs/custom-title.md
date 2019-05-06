自定义标题区

```vue
<template>
  <el-data-tree v-bind="$data" :url="getUrl" ref="tree">
    <div slot="title" style="display: flex; justify-content: space-between">
      自定义标题
      <el-button size="small" type="primary" @click="onNew">新增</el-button>
    </div>
  </el-data-tree>
</template>

<script>
export default {
  data() {
    return {
      dataPath: 'data.payload',
      hasTitle: true,
      form: [
        {
          $id: 'name',
          $type: 'input',
          label: '名字',
          $el: {
            placeholder: '请输入'
          }
        }
      ]
    }
  },
  methods: {
    onNew() {
      return this.$refs.tree.onDefaultNew()
    },
  }
}
</script>
```
