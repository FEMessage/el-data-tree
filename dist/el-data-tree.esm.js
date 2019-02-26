import _get from 'lodash.get';

(function () {
  if (typeof document !== 'undefined') {
    var head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        css = ".el-data-tree .data-tree-title { padding: 8px; font-weight: bold; display: flex; align-items: center; justify-content: space-between; } .el-data-tree .data-tree-title .el-icon-plus { cursor: pointer; } .el-data-tree .data-tree { padding-top: 8px; } .el-data-tree .custom-tree-node { overflow: hidden; flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px; } .el-data-tree .custom-tree-node-label { overflow: hidden; text-overflow: ellipsis; } ";style.type = 'text/css';if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }head.appendChild(style);
  }
})();

var dataPath = 'payload.content';
var dialogForm = 'dialogForm';
var defaultParentKey = 'parentId';
var defaultTreeAttrs = {
  highlightCurrent: true,
  props: {
    children: 'children',
    label: 'name'
  },
  nodeKey: 'id' //tree配置，每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
};

var camelizeRE = /-(\w)/g;
var camelize = function camelize(str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
};

var Component = { render: function render() {
    var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { staticClass: "el-data-tree" }, [_vm.hasTitle ? _vm._t("title", [_c('p', { staticClass: "data-tree-title" }, [_vm._v(_vm._s(_vm.title)), _c('i', { staticClass: "el-icon-plus", on: { "click": _vm.onDefaultNew } })])]) : _vm._e(), _vm._v(" "), _vm.showFilter ? _c('el-input', { attrs: { "placeholder": "查询", "clearable": "" }, model: { value: _vm.filterText, callback: function callback($$v) {
          _vm.filterText = $$v;
        }, expression: "filterText" } }) : _vm._e(), _vm._v(" "), _c('el-tree', _vm._g(_vm._b({ directives: [{ name: "loading", rawName: "v-loading", value: _vm.loading, expression: "loading" }], ref: "tree", staticClass: "data-tree", attrs: { "data": _vm.treeData, "filterNodeMethod": _vm.filterNode, "defaultExpandedKeys": _vm.expandedKeys }, on: { "node-expand": _vm.handleNodeExpand, "node-collapse": _vm.handleNodeCollapse, "check-change": _vm.handleCheckChange }, scopedSlots: _vm._u([{ key: "default", fn: function fn(_ref) {
          var node = _ref.node,
              data = _ref.data;
          return _c('span', { staticClass: "custom-tree-node" }, [_c('span', { staticClass: "custom-tree-node-label" }, [_vm._v(_vm._s(node.label))]), _vm._v(" "), _vm.hasOperation ? _c('span', { on: { "click": function click(e) {
                return e.stopPropagation();
              } } }, [_c('el-dropdown', { attrs: { "trigger": "click" }, on: { "command": function command(_command) {
                return _vm.handleCommand(_command, data, node);
              } } }, [_c('span', { staticClass: "el-dropdown-link" }, [_c('i', { staticClass: "el-icon-more" })]), _vm._v(" "), _c('el-dropdown-menu', { attrs: { "slot": "dropdown" }, slot: "dropdown" }, [_vm.hasNew ? _c('el-dropdown-item', { attrs: { "command": "new" } }, [_vm._v(_vm._s(_vm.newText))]) : _vm._e(), _vm._v(" "), _vm.hasEdit ? _c('el-dropdown-item', { attrs: { "command": "edit" } }, [_vm._v(_vm._s(_vm.editText))]) : _vm._e(), _vm._v(" "), _vm._l(_vm.extraButtons.filter(function (btn) {
            return !btn.show || btn.show(data, node);
          }), function (btn, i) {
            return _c('el-dropdown-item', _vm._b({ key: i, attrs: { "command": btn.text } }, 'el-dropdown-item', btn, false), [_vm._v(" " + _vm._s(btn.text) + " ")]);
          }), _vm._v(" "), _vm.hasDelete ? _c('el-dropdown-item', { attrs: { "command": "delete" } }, [_vm._v(_vm._s(_vm.deleteText))]) : _vm._e()], 2)], 1)], 1) : _vm._e()]);
        } }]) }, 'el-tree', _vm.treeAttributes, false), _vm.$listeners)), _vm._v(" "), _c('el-dialog', { attrs: { "title": _vm.dialogTitle, "visible": _vm.dialogVisible }, on: { "update:visible": function updateVisible($event) {
          _vm.dialogVisible = $event;
        }, "close": _vm.closeDialog } }, [_c('el-form-renderer', _vm._b({ ref: "dialogForm", attrs: { "content": _vm.form } }, 'el-form-renderer', _vm.formAttrs, false), [_vm._t("form")], 2), _vm._v(" "), _c('div', { attrs: { "slot": "footer" }, slot: "footer" }, [_c('el-button', { attrs: { "size": "small" }, on: { "click": _vm.cancel } }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', { attrs: { "type": "primary", "loading": _vm.confirmLoading, "size": "small" }, on: { "click": _vm.confirm } }, [_vm._v("确 定")])], 1)], 1)], 2);
  }, staticRenderFns: [],
  name: 'ElDataTree',
  props: {
    /**
     * 标题文字
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * tree attributes
     */
    treeAttrs: {
      type: Object,
      default: function _default() {
        return {};
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
      default: function _default() {
        return [];
      }
    },
    /**
     * 操作列的自定义菜单, 渲染的是element-ui的dropdown, 支持包括style在内的以下属性: {type: '', text: '', atClick: (data, node) => Promise.resolve(), show: (data, node) => return true时显示 } 点击事件 data参数表示该节点所对应的对象,node表示当前节点
     */
    extraButtons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    /**
     * 弹窗表单, 用于新增与修改, 详情配置参考 @femessage/el-form-renderer
     * @link https://github.com/FEMessage/el-form-renderer/blob/master/README.md
     */
    form: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    /**
     * 弹窗表单属性设置, 详情配置参考element-ui官网
     * @link http://element.eleme.io/#/zh-CN/component/form#form-attributes
     */
    formAttrs: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /**
     * 新增/修改提交时注入额外的参数
     */
    extraParams: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    /**
     * 外部的注入额外的查询参数, 键值对形式
     */
    customQuery: {
      type: Object,
      default: function _default() {
        return {};
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
     * 是否有标题栏
     */
    hasTitle: {
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
     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onNew: {
      type: Function
    },
    /**
     * 点击修改按钮时的方法, 当默认修改方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onEdit: {
      type: Function
    },
    /**
     * 点击删除按钮时的方法, 当默认删除方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onDelete: {
      type: Function
    },
    /**
     * 在新增/修改弹窗 点击确认时调用，返回Promise, 如果reject, 则不会发送新增/修改请求
     * 参数: (data, isNew) data为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗
     */
    beforeConfirm: {
      type: Function,
      default: function _default() {
        return Promise.resolve();
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
    }
  },
  data: function data() {
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

      expandedKeys: []
    };
  },

  computed: {
    // 连字符转驼峰
    camelizeTreeAttrs: function camelizeTreeAttrs() {
      var treeAttrs = this.treeAttrs;
      return Object.keys(treeAttrs).reduce(function (sum, k) {
        // 属性名转驼峰
        var key = camelize(k);
        sum[key] = treeAttrs[k];
        return sum;
      }, {});
    },
    treeAttributes: function treeAttributes() {
      return Object.assign({}, defaultTreeAttrs, this.camelizeTreeAttrs);
    }
  },
  watch: {
    url: {
      handler: function handler() {
        //如果url变化，则重新拉取列表
        this.fetchData();
      },

      immediate: true
    },
    filterText: function filterText(val) {
      this.$refs.tree.filter(val);
    },
    checkedKeys: function checkedKeys(keys) {
      this.updateCheckedKeys(keys);
    }
  },
  mounted: function mounted() {
    // 合并默认展开的key
    if (this.treeAttributes.defaultExpandedKeys) {
      this.expandedKeys = this.expandedKeys.concat(this.treeAttributes.defaultExpandedKeys);
    }
  },

  methods: {
    fetchData: function fetchData() {
      var _this = this;

      //如果url为空，则不发送请求
      if (!this.url) {
        console.warn('ELDataTree: url 为空, 不发送请求');
        return false;
      }

      this.loading = true;
      this.$axios.get(this.url, {
        params: this.customQuery
      }).then(function (res) {
        //从dataPath获取数据
        var treeData = _get(res, _this.dataPath) || [];
        _this.treeData = _this.transform && _this.transform(treeData) || treeData;
        // 确保树已经有数据后再设置选中状态
        _this.updateCheckedKeys(_this.checkedKeys);
        /**
         * 请求数据成功，返回transform处理后的值和接口返回的值
         * @event loaded
         */
        _this.$emit('loaded', _this.treeData, res);
      }).catch(function (error) {
        /**
         * 请求数据失败，返回err对象
         * @event error
         */
        _this.$emit('error', error);
      }).finally(function () {
        _this.loading = false;
      });
    },
    filterNode: function filterNode(value, data) {
      if (!value) return true;
      var label = this.treeAttributes.props.label;
      return data[label].indexOf(value) !== -1;
    },

    /**
     * 获取el-tree对象，方便调用其方法
     * @returns {tree object}
     */
    getTree: function getTree() {
      return this.$refs.tree;
    },

    /**
     * 节点选中状态发生变化时的回调
     * 共三个参数，依次为：
     * 传递给 data 属性的数组中该节点所对应的对象
     * 节点本身是否被选中
     * 节点的子树中是否有被选中的节点
     */
    handleCheckChange: function handleCheckChange() {
      //获取选择的节点，如果节点被选中，则父节点也会选中
      var checkNodes = this.$refs.tree.getCheckedNodes(false, true);
      var nodeKey = this.treeAttributes.nodeKey;
      this.$emit('update:checkedKeys', checkNodes.map(function (item) {
        return item[nodeKey];
      }));
    },
    updateCheckedKeys: function updateCheckedKeys(keys) {
      //设置checkedKeys的时候，设置父节点，子节点全部也被选中了
      //解决方案：过滤掉有孩子节点的key，不设置checked状态
      var flattenTree = function flattenTree(array, children) {
        return array.reduce(function (sum, node) {
          return sum.concat(node[children] ? flattenTree(node[children]) : node);
        }, []);
      };
      var treeAttrs = this.treeAttributes;

      var checkedKeys = flattenTree(this.treeData, treeAttrs.props.children).filter(function (node) {
        return keys.indexOf(node[treeAttrs.nodeKey]) > -1;
      }).map(function (node) {
        return node[treeAttrs.nodeKey];
      });

      this.$refs.tree.setCheckedKeys(checkedKeys);
    },
    handleCommand: function handleCommand(command, data, node) {
      var handler = {
        new: this.onDefaultNew,
        edit: this.onDefaultEdit,
        delete: this.onDefaultDelete
      };

      if (handler[command]) {
        handler[command](data, node);
        return;
      }

      var btn = this.extraButtons.find(function (btn) {
        return btn.text === command;
      });
      if (btn) {
        typeof btn.atClick === 'function' && btn.atClick(data, node);
      }
    },
    onDefaultNew: function onDefaultNew() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.row = data;
      this.isNew = true;
      this.isEdit = false;
      this.dialogTitle = this.newText;
      this.dialogVisible = true;
    },
    onDefaultEdit: function onDefaultEdit(data) {
      var _this2 = this;

      this.row = data;
      this.isNew = false;
      this.isEdit = true;
      this.dialogTitle = this.editText;
      this.dialogVisible = true;

      // 给表单填充值
      this.$nextTick(function () {
        _this2.$refs[dialogForm].updateForm(data);
      });
    },
    onDefaultDelete: function onDefaultDelete(data, node) {
      var _this3 = this;

      this.$confirm('确认删除吗', '提示', {
        type: 'warning',
        beforeClose: function beforeClose(action, instance, done) {
          if (action !== 'confirm') {
            done();
            return;
          }
          instance.confirmButtonLoading = true;

          var request = _this3.onDelete && _this3.onDelete(data, node) || _this3.$axios.delete(_this3.url + '/' + data[_this3.treeAttributes.nodeKey]);
          request.then(function () {
            done();
            _this3.showMessage();
            _this3.fetchData();
          }).catch(function (err) {
            _this3.$emit('error', err);
          }).finally(function () {
            instance.confirmButtonLoading = false;
          });
        }
      }).catch(function (err) {
        _this3.$emit('error', err);
      });
    },


    // 组件可以绑定多个相同的事件，不需要emit node-expand/node-collapse 来兼容el-tree
    handleNodeExpand: function handleNodeExpand(data) {
      var nodeKey = this.treeAttributes.nodeKey;
      this.expandedKeys.push(data[nodeKey]);
    },
    handleNodeCollapse: function handleNodeCollapse(data) {
      var nodeKey = this.treeAttributes.nodeKey;
      this.expandedKeys = this.expandedKeys.filter(function (key) {
        return key !== data[nodeKey];
      });
    },
    cancel: function cancel() {
      this.dialogVisible = false;
    },
    confirm: function confirm() {
      var _this4 = this;

      this.$refs[dialogForm].validate(function (valid) {
        if (!valid) return false;

        // 新增 parentKey 为当前节点 id，修改为当前节点 parentKey
        var parentKey = _this4.isNew ? _this4.treeAttributes.nodeKey : _this4.parentKey;

        var data = Object.assign({
          parentId: _this4.row[parentKey]
        }, _this4.$refs[dialogForm].getFormValue(), _this4.extraParams);

        _this4.beforeConfirm(data, _this4.isNew).then(function () {
          var condiction = 'isNew';
          var customMethod = 'onNew';
          if (_this4.isEdit) {
            condiction = 'isEdit';
            customMethod = 'onEdit';
          }

          if (_this4[condiction] && _this4[customMethod]) {
            _this4.confirmLoading = true;
            _this4[customMethod](data, _this4.row).then(function (resp) {
              _this4.fetchData();
              _this4.showMessage(true);
              _this4.cancel();
            }).catch(function (err) {
              _this4.$emit('error', err);
            }).finally(function (e) {
              _this4.confirmLoading = false;
            });
            return;
          }

          // 默认新增/修改逻辑
          var method = 'post';
          var url = _this4.url;
          if (_this4.isEdit) {
            method = 'put';
            url += '/' + _this4.row[_this4.treeAttributes.nodeKey];
          }
          _this4.confirmLoading = true;
          _this4.$axios[method](url, data, {
            params: _this4.customQuery
          }).then(function (resp) {
            _this4.showMessage();
            _this4.fetchData();
            _this4.cancel();
          }).catch(function (err) {
            _this4.$emit('error', err);
          }).finally(function (e) {
            _this4.confirmLoading = false;
          });
        }).catch(function (e) {});
      });
    },
    closeDialog: function closeDialog() {
      this.isNew = false;
      this.isEdit = false;
      this.confirmLoading = false;
      this.$refs[dialogForm].resetFields();
    },
    showMessage: function showMessage() {
      var isSuccess = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (isSuccess) {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '操作失败'
        });
      }
    }
  }
};

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('ElDataTree', Component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install

  // To auto-install when vue is found
};var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default Component;
export { install };
