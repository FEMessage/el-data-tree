拖拽树的节点示例

```vue
<template>
  <el-data-tree
    v-bind="$data"
    @node-drop="onDrop"
  />
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
      ],
      onNew: (data) => {
        return this.$axios.post(url.post, data)
      },
      onEdit: (data) => {
        return this.$axios.put(url.edit, data)
      },
      onDelete: (data) => {
        return this.$axios.delete(url.delete, data)
      }
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

![](https://github.com/FEMessage/el-data-tree/raw/dev/assets/20190222.gif)
