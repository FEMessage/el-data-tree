被选中的节点的id会自动同步到checkedKeys以供后续提交。

```vue
<template>
  <div>
    <el-data-tree v-bind="$data" 
      :checkedKeys.sync="checkedKeys" 
      @check-change="handleCheckChange"
      ref="tree" />
    <div>
      <el-button @click="setCheckedKeys">通过key设置</el-button>
      <el-button @click="getCheckedNodes">通过node获取</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree',
      treeAttrs: {
        showCheckbox: true
      },
      dataPath: 'data.payload',
      checkedKeys: [92016, 92018, 92023]
    }
  },
  methods: {
    getCheckedNodes() {
      console.log('------------------------------------')
      console.log(this.checkedKeys)
      console.log('------------------------------------')
    },
    setCheckedKeys() {
      this.checkedKeys = [92016, 92018, 92023]
    },
    resetChecked() {
      this.checkedKeys = []
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    }
  }
}
</script>
```
