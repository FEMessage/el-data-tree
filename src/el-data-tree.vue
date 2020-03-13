<template>
  <div
    class="el-data-tree"
    :class="{'has-border': hasBorder, 'is-collapsed': isCollapsed}"
    @click="isCollapsed = false"
  >
    <div v-if="collapsable" class="collapse-icon-wrapper">
      <span
        class="collapse-icon"
        @click.prevent.stop="isCollapsed = !isCollapsed"
      >
        <chevron-left-icon />
      </span>
    </div>

    <div class="el-data-tree-main">
      <header v-if="hasTitle || hasHeader" class="header">
        <div class="header-left">
          <!--@slot 自定义标题 -->
          <slot name="title">
            <p class="header-title">{{ title }}</p>
          </slot>
        </div>
        <div class="header-right">
          <span class="header-new-btn" @click="onDefaultNew">
            <!--@slot 头部新增按钮 -->
            <slot name="header-new-btn">
              <el-button type="text" size="mini">
                <i class="el-icon-plus"></i>
              </el-button>
            </slot>
          </span>
          <span class="header-extra-block">
            <!--@slot 标题栏右边的额外区域-->
            <slot name="header-extra-block"></slot>
          </span>
        </div>
      </header>

      <section class="body">
        <el-input
          v-if="showFilter"
          v-model="filterText"
          placeholder="查询"
          suffix-icon="el-icon-search"
          clearable
        ></el-input>
        <el-tree
          ref="tree"
          v-loading="loading"
          :data="treeData"
          v-bind="treeAttributes"
          :filter-node-method="filterNode"
          :default-expanded-keys="defaultExpandedKeys"
          class="data-tree"
          v-on="$listeners"
          @node-expand="handleNodeExpand"
          @node-collapse="handleNodeCollapse"
          @check-change="handleCheckChange"
        >
          <span slot-scope="{node, data}" class="custom-tree-node">
            <span class="custom-tree-node-label">
              <!-- @slot 可定制的节点标签内容, 参数为 { data } -->
              <slot name="node-label" :data="data">{{ node.label }}</slot>
            </span>
            <span
              v-if="hasOperation"
              class="custom-tree-node-btns"
              @click="e => e.stopPropagation()"
            >
              <template v-if="extraButtonsType === 'text'">
                <el-button
                  v-if="hasNew"
                  type="text"
                  @click="handleCommand('new', node, data)"
                  >{{ newText }}</el-button
                >
                <el-button
                  v-if="hasEdit"
                  type="text"
                  @click="handleCommand('edit', node, data)"
                  >{{ editText }}</el-button
                >
                <el-button
                  v-for="(btn, i) in extraButtons.filter(
                    btn => !btn.show || btn.show(data, node)
                  )"
                  :key="i"
                  v-bind="btn"
                  type="text"
                  @click="handleCommand(btn.text, node, data)"
                  >{{ btn.text }}</el-button
                >
                <el-button
                  v-if="hasDelete"
                  type="text"
                  class="delete-button"
                  @click="handleCommand('delete', node, data)"
                  >{{ deleteText }}</el-button
                >
              </template>
              <el-dropdown
                v-else
                trigger="click"
                @command="command => handleCommand(command, data, node)"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="hasNew" command="new">{{
                    newText
                  }}</el-dropdown-item>
                  <el-dropdown-item v-if="hasEdit" command="edit">{{
                    editText
                  }}</el-dropdown-item>
                  <el-dropdown-item
                    v-for="(btn, i) in extraButtons.filter(
                      btn => !btn.show || btn.show(data, node)
                    )"
                    :key="i"
                    v-bind="btn"
                    :command="btn.text"
                    >{{ btn.text }}</el-dropdown-item
                  >
                  <el-dropdown-item v-if="hasDelete" command="delete">{{
                    deleteText
                  }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
        </el-tree>
      </section>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      @close="closeDialog"
    >
      <!--https://github.com/FEMessage/el-form-renderer-->
      <el-form-renderer ref="dialogForm" :content="form" v-bind="formAttrs">
        <!--@slot 额外的弹窗表单内容, 当form不满足需求时可以使用 -->
        <slot name="form"></slot>
      </el-form-renderer>

      <div slot="footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          :loading="confirmLoading"
          size="small"
          @click="confirm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _get from 'lodash.get'
import ChevronLeftIcon from './icons/chevron-left.vue'

const dataPath = 'payload.content'
const dialogForm = 'dialogForm'
const defaultParentKey = 'parentId'
const defaultTreeAttrs = {
  defaultExpandedKeys: [],
  highlightCurrent: true,
  props: {
    children: 'children',
    label: 'name'
  },
  nodeKey: 'id' //tree配置，每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
}

const camelizeRE = /-(\w)/g
const camelize = str =>
  str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))

export default {
  name: 'ElDataTree',
  components: {
    ChevronLeftIcon
  },
  props: {
    /**
     * 标题文字
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * 是否有边框
     */
    hasBorder: {
      type: Boolean,
      default: true
    },
    /**
     * el-tree 属性设置
     * @link [el-tree文档](http://element-cn.eleme.io/#/zh-CN/component/tree)
     */
    treeAttrs: {
      type: Object,
      default: () => {
        return {}
      }
    },
    /**
     * 请求url, 如果为空, 则不会发送请求; 改变url, 则tree会重新发送请求
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * 父级id的key，默认值 parentKey，
     * 修改时会用到,请求会根据定义的属性值获取parentKey,即row[this.parentKey]
     */
    parentKey: {
      type: String,
      default: defaultParentKey
    },
    /**
     * 接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    dataPath: {
      type: String,
      default: dataPath
    },
    /**
     * 是否展示过滤框
     */
    showFilter: {
      type: Boolean,
      default: false
    },
    /**
     * 通过 checkedKeys 设置目前勾选的节点，支持.sync修饰符
     */
    checkedKeys: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 操作列的自定义菜单, 渲染的是element-ui的dropdown, 支持包括style在内的以下属性: {type: '', text: '', atClick: (data, node) => Promise.resolve(), show: (data, node) => return true时显示 } 点击事件 data参数表示该节点所对应的对象,node表示当前节点
     */
    extraButtons: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 操作列自定义菜单样式, 默认是dropdown
     * `text, dropdown`
     */
    extraButtonsType: {
      type: String,
      default: 'dropdown'
    },
    /**
     * 弹窗表单, 用于新增与修改
     * @link [el-form-renderer文档](https://github.com/FEMessage/el-form-renderer/blob/master/README.md)
     */
    form: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 弹窗表单属性设置
     * @link [el-form文档](http://element.eleme.io/#/zh-CN/component/form#form-attributes)
     */
    formAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 新增/修改提交时注入额外的参数
     */
    extraParams: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 外部的注入额外的查询参数, 键值对形式
     */
    customQuery: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 是否有操作列
     */
    hasOperation: {
      type: Boolean,
      default: true
    },
    /**
     * @deprecated
     * 是否有标题栏，建议使用 hasHeader
     */
    hasTitle: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有标题栏
     */
    hasHeader: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有删除按钮
     */
    hasDelete: {
      type: Boolean,
      default: true
    },
    /**
     * 是否有新增按钮
     */
    hasNew: {
      type: Boolean,
      default: true
    },
    /**
     * 是否有编辑按钮
     */
    hasEdit: {
      type: Boolean,
      default: true
    },
    /**
     * 用于转换获取的数据为目标数据
     */
    transform: {
      type: Function
    },
    /**
     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用, 需要返回promise。
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onNew: {
      type: Function
    },
    /**
     * 点击修改按钮时的方法, 当默认修改方法不满足需求时使用, 需要返回promise。
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onEdit: {
      type: Function
    },
    /**
     * 点击删除按钮时的方法, 当默认删除方法不满足需求时使用, 需要返回promise。
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onDelete: {
      type: Function
    },
    /**
     * 在新增/修改弹窗 点击确认时调用，返回Promise, 如果reject, 则不会发送新增/修改请求。
     * 参数: (data, isNew) data为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗
     */
    beforeConfirm: {
      type: Function,
      default() {
        return Promise.resolve()
      }
    },
    /**
     * 默认新增操作菜单文字
     */
    newText: {
      type: String,
      default: '新增'
    },
    /**
     * 默认修改操作菜单文字
     */
    editText: {
      type: String,
      default: '修改'
    },
    /**
     * 默认删除操作菜单文字
     */
    deleteText: {
      type: String,
      default: '删除'
    },
    /**
     * 是否可以折叠树
     */
    collapsable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      treeData: [], //树形数据
      filterText: '',
      loading: false,

      dialogTitle: '',
      dialogVisible: false,
      isNew: true,
      isEdit: false,
      confirmLoading: false,
      // 要修改的那一行
      row: {},

      // 默认展开节点 keys
      defaultExpandedKeys: [],

      // 展开操作后的节点 keys，用于保存新增、编辑、删除等操作后的展开状态
      cacheExpandedKeys: new Set(),

      // 树折叠状态
      isCollapsed: false
    }
  },
  computed: {
    // 连字符转驼峰
    camelizeTreeAttrs() {
      const treeAttrs = this.treeAttrs
      return Object.keys(treeAttrs).reduce((sum, k) => {
        // 属性名转驼峰
        const key = camelize(k)
        sum[key] = treeAttrs[k]
        return sum
      }, {})
    },
    treeAttributes() {
      return Object.assign({}, defaultTreeAttrs, this.camelizeTreeAttrs)
    }
  },
  watch: {
    url: {
      handler() {
        //如果url变化，则重新拉取列表
        this.fetchData()
      },
      immediate: true
    },
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    checkedKeys(keys) {
      this.updateCheckedKeys(keys)
    },
    'treeAttributes.defaultExpandedKeys': {
      handler(val) {
        val.forEach(item => this.cacheExpandedKeys.add(item))
        this.updateDefaultExpandKeys()
      },
      immediate: true
    }
  },
  methods: {
    updateDefaultExpandKeys() {
      this.defaultExpandedKeys = [...this.cacheExpandedKeys]
    },
    /**
     * 更新树形列表
     * @public
     */
    fetchData() {
      //如果url为空，则不发送请求
      if (!this.url) {
        console.warn('ELDataTree: url 为空, 不发送请求')
        return false
      }

      this.loading = true
      this.$axios
        .get(this.url, {
          params: this.customQuery
        })
        .then(res => {
          //从dataPath获取数据
          const treeData = _get(res, this.dataPath) || []
          this.treeData =
            (this.transform && this.transform(treeData)) || treeData
          // 保持展开状态，新增、删除、编辑不丢失数据
          this.updateDefaultExpandKeys()
          // 确保树已经有数据后再设置选中状态
          this.updateCheckedKeys(this.checkedKeys)
          /**
           * 请求数据成功，返回transform处理后的值和接口返回的值
           * @property {object} treeData - tree的数据
           * @property {object} res - 请求返回的完整 response
           */
          this.$emit('loaded', this.treeData, res)
        })
        .catch(error => {
          this.$emit('error', error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    filterNode(value, data) {
      if (!value) return true
      const label = this.treeAttributes.props.label
      return data[label].indexOf(value) !== -1
    },
    /**
     * 获取el-tree对象，方便调用其方法
     * @returns {tree object}
     * @public
     */
    getTree() {
      return this.$refs.tree
    },
    /**
     * 节点选中状态发生变化时的回调
     * 共三个参数，依次为：
     * 传递给 data 属性的数组中该节点所对应的对象
     * 节点本身是否被选中
     * 节点的子树中是否有被选中的节点
     */
    handleCheckChange() {
      //获取选择的节点，如果节点被选中，则父节点也会选中
      const checkNodes = this.$refs.tree.getCheckedNodes(false, true)
      const nodeKey = this.treeAttributes.nodeKey
      this.$emit('update:checkedKeys', checkNodes.map(item => item[nodeKey]))
    },
    /**
     * 选中指定节点
     * @param {array} keys - 选中的节点的 key 所组成的数组
     * @public
     */
    updateCheckedKeys(keys) {
      //设置checkedKeys的时候，设置父节点，子节点全部也被选中了
      //解决方案：过滤掉有孩子节点的key，不设置checked状态
      const flattenTree = (array, children) =>
        array.reduce(
          (sum, node) =>
            sum.concat(
              node[children] ? flattenTree(node[children], children) : node
            ),
          []
        )
      const treeAttrs = this.treeAttributes

      const checkedKeys = flattenTree(this.treeData, treeAttrs.props.children)
        .filter(node => keys.indexOf(node[treeAttrs.nodeKey]) > -1)
        .map(node => node[treeAttrs.nodeKey])

      this.$refs.tree.setCheckedKeys(checkedKeys)
    },
    handleCommand(command, data, node) {
      const handler = {
        new: this.onDefaultNew,
        edit: this.onDefaultEdit,
        delete: this.onDefaultDelete
      }

      if (handler[command]) {
        handler[command](data, node)
        return
      }

      const btn = this.extraButtons.find(btn => btn.text === command)
      if (btn) {
        typeof btn.atClick === 'function' && btn.atClick(data, node)
      }
    },

    onDefaultNew(data = {}) {
      this.row = data
      this.isNew = true
      this.isEdit = false
      this.dialogTitle = this.newText
      this.dialogVisible = true
    },
    onDefaultEdit(data) {
      this.row = data
      this.isNew = false
      this.isEdit = true
      this.dialogTitle = this.editText
      this.dialogVisible = true

      // 给表单填充值
      this.$nextTick(() => {
        this.$refs[dialogForm].updateForm(data)
      })
    },
    onDefaultDelete(data, node) {
      this.$confirm('确认删除吗', '提示', {
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action !== 'confirm') {
            done()
            return
          }
          instance.confirmButtonLoading = true

          const request =
            (this.onDelete && this.onDelete(data, node)) ||
            this.$axios.delete(
              this.url + '/' + data[this.treeAttributes.nodeKey]
            )
          request
            .then(() => {
              done()
              this.showMessage()
              this.fetchData()
            })
            .catch(err => {
              this.$emit('error', err)
            })
            .finally(() => {
              instance.confirmButtonLoading = false
            })
        }
      }).catch(err => {
        this.$emit('error', err)
      })
    },

    // 组件可以绑定多个相同的事件，不需要emit node-expand/node-collapse 来兼容el-tree
    handleNodeExpand(data) {
      const nodeKey = this.treeAttributes.nodeKey
      this.cacheExpandedKeys.add(data[nodeKey])
    },
    handleNodeCollapse(data) {
      const nodeKey = this.treeAttributes.nodeKey
      this.cacheExpandedKeys.delete(data[nodeKey])
    },

    cancel() {
      this.dialogVisible = false
    },
    confirm() {
      this.$refs[dialogForm].validate(valid => {
        if (!valid) return false

        // 新增 parentKey 为当前节点 id，修改为当前节点 parentKey
        const parentKey = this.isNew
          ? this.treeAttributes.nodeKey
          : this.parentKey

        const data = Object.assign(
          {
            parentId: this.row[parentKey]
          },
          this.$refs[dialogForm].getFormValue(),
          this.extraParams
        )

        this.beforeConfirm(data, this.isNew)
          .then(() => {
            let condiction = 'isNew'
            let customMethod = 'onNew'
            if (this.isEdit) {
              condiction = 'isEdit'
              customMethod = 'onEdit'
            }

            if (this[condiction] && this[customMethod]) {
              this.confirmLoading = true
              this[customMethod](data, this.row)
                .then(() => {
                  this.fetchData()
                  this.showMessage(true)
                  this.cancel()
                })
                .catch(err => {
                  this.$emit('error', err)
                })
                .finally(() => {
                  this.confirmLoading = false
                })
              return
            }

            // 默认新增/修改逻辑
            let method = 'post'
            let url = this.url
            if (this.isEdit) {
              method = 'put'
              url += `/${this.row[this.treeAttributes.nodeKey]}`
            }
            this.confirmLoading = true
            this.$axios[method](url, data, {
              params: this.customQuery
            })
              .then(() => {
                this.showMessage()
                this.fetchData()
                this.cancel()
              })
              .catch(err => {
                /**
                 * CRUD失败
                 * @event error
                 * @property {error} err
                 */
                this.$emit('error', err)
              })
              .finally(() => {
                this.confirmLoading = false
              })
          })
          .catch(() => {})
      })
    },
    closeDialog() {
      this.isNew = false
      this.isEdit = false
      this.confirmLoading = false
      this.$refs[dialogForm].resetFields()
    },
    showMessage(isSuccess = true) {
      if (isSuccess) {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '操作失败'
        })
      }
    }
  }
}
</script>

<style lang="less">
@delete-color: #e24156;

.el-data-tree {
  transition: 0.3s;

  & .el-data-tree-main {
    overflow: hidden;
  }

  &.has-border {
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #ebeef5;

    &:hover,
    &:focus {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .header {
    display: flex;
    align-items: center;
    padding: 18px 20px;
    border-bottom: 1px solid #ebeef5;

    .header-left,
    .header-right {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .header-right {
      justify-content: flex-end;
    }

    .header-title {
      margin: 0;
      color: #303133;
      display: inline-block;
      padding-right: 10px;
    }

    .header-new-btn,
    .header-extra-block {
      margin-left: 10px;
    }
  }

  .body {
    padding: 20px;
  }

  .data-tree-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px;
    margin: 0;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;

    .el-icon-plus {
      cursor: pointer;
    }
  }

  .data-tree {
    padding-top: 8px;
  }

  .custom-tree-node {
    overflow: hidden;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;

    .custom-tree-node-label {
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .custom-tree-node-btns {
      .el-button {
        font-family: inherit;
      }
    }
  }

  .delete-button {
    color: @delete-color;

    &:hover,
    &:focus {
      color: @delete-color;
    }
  }
}
</style>

<style lang="less" src="./styles/collapsable.less"></style>
