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
      url: 'https://easy-mock.com/mock/5c1b3895fe5907404e654045/femessage-mock/el-data-tree',
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
