import {storiesOf} from '@storybook/vue'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'

const baseUrl =
  'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'

const getUrl = baseUrl + '/on-get'
const editUrl = baseUrl + '/on-edit'
const deleteUrl = baseUrl + '/on-delete'
const postUrl = baseUrl + '/on-post'

storiesOf('el-data-tree', module)
  .add('基础用法', () => ({
    template:
      '<el-data-tree v-bind="$data" :onNew="onNew" :onEdit="onEdit" :onDelete="onDelete"></el-data-tree>',
    data() {
      return {
        url: getUrl,
        dataPath: 'data.payload',
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
        return Axios.post(postUrl, data)
      },
      onEdit(data) {
        return Axios.put(editUrl, data)
      },
      onDelete(data) {
        return Axios.delete(deleteUrl, data)
      }
    }
  }))
  .add('动态变化url', () => ({
    template:
      '<div><el-data-tree v-bind="$data"></el-data-tree><el-button @click="handleClick">调整url</el-button></div>',
    data() {
      return {
        url: '',
        dataPath: 'data.payload'
      }
    },
    methods: {
      handleClick() {
        this.url = this.url ? '' : getUrl
      }
    }
  }))
  .add('节点过滤', () => ({
    template: '<el-data-tree v-bind="$data"></el-data-tree>',
    data() {
      return {
        url: getUrl,
        showFilter: true,
        dataPath: 'data.payload'
      }
    }
  }))
  .add('测试覆盖el-tree配置', () => ({
    template: '<el-data-tree v-bind="$data"></el-data-tree>',
    data() {
      return {
        url: getUrl,
        hasOperation: false,
        treeAttrs: {
          props: {
            children: 'children2',
            label: 'name'
          }
        },
        dataPath: 'data.payload'
      }
    }
  }))
  .add('树节点的选择', () => ({
    template: `<div>
      <el-data-tree v-bind="$data" 
        :checkedKeys.sync="checkedKeys" 
        @check-change="handleCheckChange"
        ref="tree"></el-data-tree>
      <div>
        <el-button @click="setCheckedKeys">通过key设置</el-button>
        <el-button @click="getCheckedNodes">通过node获取</el-button>
        <el-button @click="resetChecked">清空</el-button>
      </div>
    </div>`,
    data() {
      return {
        url: getUrl,
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
  }))
  .add('保存展开状态', () => ({
    template: `<el-data-tree v-bind="$data" :onNew="onNew" :onEdit="onEdit" @node-expand="onNodeExpand" @node-collapse="onNodeCollapse"></el-data-tree>`,
    data() {
      return {
        url: getUrl,
        dataPath: 'data.payload',
        treeAttrs: {
          defaultExpandedKeys: [92062]
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
      onNew(data, row) {
        return Axios.post(postUrl, data)
      },
      onEdit(data, row) {
        return Axios.put(editUrl, data)
      },
      onNodeExpand(data, node, tree) {
        console.log('onNodeExpand', data, node, tree)
      },
      onNodeCollapse(data, node, tree) {
        console.log('onNodeCollapse', data, node, tree)
      }
    }
  }))
  .add('自定义菜单', () => ({
    template: `<el-data-tree v-bind="$data"></el-data-tree>`,
    data() {
      return {
        url: getUrl,
        dataPath: 'data.payload',
        hasNew: false,
        hasEdit: false,
        hasDelete: false,
        extraButtons: [
          {
            text: '隐藏',
            show() {
              return false
            }
          },
          {
            text: '指定条件显示',
            show(data) {
              return data.children && data.children.length > 0
            },
            atClick(data, node) {
              console.log(data, node)
            }
          },
          {
            text: '自定义',
            atClick(data, node) {
              console.log(data, node)
            }
          }
        ]
      }
    }
  }))
