拖拽树的节点示例

```vue
<template>
  <el-data-tree v-bind="$data" @node-drop="onDrop" />
</template>

<script>
export default {
  data() {
    return {
      url: 'https://mockapi.eolinker.com/IeZWjzy87c204a1f7030b2a17b00f3776ce0a07a5030a1b/el-data-tree',
      dataPath: 'data.payload',
      treeAttrs: {
        draggable: true
      },
    }
  },
  methods: {
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

      this.$axios.put(
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

![el-data-tree-drag _1_.gif](https://i.loli.net/2019/11/14/WCvnBc91zs6Rjp8.gif)
