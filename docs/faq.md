## 在 TypeScript 中指定组件的类型

```html
<script lang="ts">
// 需要引入这个
// import { ElDataTreeType } from '@femessage/el-data-tree'
export default {
  mounted() {
    (this.$refs.dataTree as ElDataTreeType).fetchData()
  },
}
</script>
```
> 关于更多可用类型请参考：[el-data-tree.d.ts](https://github.com/FEMessage/el-data-tree/blob/dev/src/el-data-tree.d.ts)