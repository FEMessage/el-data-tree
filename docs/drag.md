拖拽树的节点示例

```vue
<template>
  <el-data-tree
    v-bind="$data"
    :url="getUrl"
    @node-drop="onDrop"
    :onNew="onNew"
    :onEdit="onEdit"
    :onDelete="onDelete"
  />
</template>

<script>
'import Axios from 'axios''

export default {
  data() {
    return {
      dataPath: 'data.payload',
      treeAttrs: {
        draggable: true
      },
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
    onNew(data) {
      return this.$axios.post(this.postUrl, data)
    },
    onEdit(data) {
      return this.$axios.put(this.editUrl, data)
    },
    onDelete(data) {
      return this.$axios.delete(this.deleteUrl, data)
    },
    /**
     * 示例算法
     * 假设node为拖拽的节点，拖拽后的顺序为: prev, node, next, 则 sort = prev.sort
     * @param dragNode
     * @param dropNode
     * @param dropType
     * @param ev
     */
    onDrop(dragNode, dropNode, dropType, ev) {
      const firstSort = -1

      // 默认是在后面插入
      let sort = dropNode.data.sort
      let parentId = dropNode.data.parentId

      // 变为子节点
      if (dropType === 'inner') {
        sort = firstSort
        parentId = dropNode.data.id
      }

      Axios.put(
        'https://www.easy-mock.com/mock/5bbefdf6faedce31cd6a5261/example/sort',
        {
          data: {
            id: dragNode.data.id,
            parentId,
            sort,
            tag: dropNode.data.tag
          }
        }
      )
    },
    allowDrop(dragNode, dropNode, dropType) {
      // 当 prev 时, 意味着得到的是node与next两个节点, 无法根据算法求出sort值, 故什么也不做
      return dropType !== 'prev'
    }
  }
}
</script>
```

示例

![](https://github.com/FEMessage/el-data-tree/raw/dev/assets/20190222.gif)
