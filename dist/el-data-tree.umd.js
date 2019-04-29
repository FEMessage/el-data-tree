(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.get')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash.get'], factory) :
  (global = global || self, factory(global.ElDataTree = {}, global._get));
}(this, function (exports, _get) { 'use strict';

  _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;

  //
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

  var script = {
    name: 'ElDataTree',
    props: {
      /**
       * 标题文字
       */
      title: {
        type: String,
        "default": ''
      },

      /**
       * tree attributes
       */
      treeAttrs: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 请求url, 如果为空, 则不会发送请求; 改变url, 则tree会重新发送请求
       */
      url: {
        type: String,
        "default": ''
      },

      /**
       * 父级id的key，默认值 parentKey，
       * 修改时会用到,请求会根据定义的属性值获取parentKey,即row[this.parentKey]
       */
      parentKey: {
        type: String,
        "default": defaultParentKey
      },

      /**
       * 接口返回的数据中的路径, 嵌套对象使用.表示即可
       */
      dataPath: {
        type: String,
        "default": dataPath
      },

      /**
       * 是否展示过滤框
       */
      showFilter: {
        type: Boolean,
        "default": false
      },

      /**
       * 通过 checkedKeys 设置目前勾选的节点，支持.sync修饰符
       */
      checkedKeys: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },

      /**
       * 操作列的自定义菜单, 渲染的是element-ui的dropdown, 支持包括style在内的以下属性: {type: '', text: '', atClick: (data, node) => Promise.resolve(), show: (data, node) => return true时显示 } 点击事件 data参数表示该节点所对应的对象,node表示当前节点
       */
      extraButtons: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },

      /**
       * 弹窗表单, 用于新增与修改, 详情配置参考 @femessage/el-form-renderer
       * @link https://github.com/FEMessage/el-form-renderer/blob/master/README.md
       */
      form: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },

      /**
       * 弹窗表单属性设置, 详情配置参考element-ui官网
       * @link http://element.eleme.io/#/zh-CN/component/form#form-attributes
       */
      formAttrs: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 新增/修改提交时注入额外的参数
       */
      extraParams: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 外部的注入额外的查询参数, 键值对形式
       */
      customQuery: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },

      /**
       * 是否有操作列
       */
      hasOperation: {
        type: Boolean,
        "default": true
      },

      /**
       * 是否有标题栏
       */
      hasTitle: {
        type: Boolean,
        "default": false
      },

      /**
       * 是否有删除按钮
       */
      hasDelete: {
        type: Boolean,
        "default": true
      },

      /**
       * 是否有新增按钮
       */
      hasNew: {
        type: Boolean,
        "default": true
      },

      /**
       * 是否有编辑按钮
       */
      hasEdit: {
        type: Boolean,
        "default": true
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
        "default": function _default() {
          return Promise.resolve();
        }
      },

      /**
       * 默认新增操作菜单文字
       */
      newText: {
        type: String,
        "default": '新增'
      },

      /**
       * 默认修改操作菜单文字
       */
      editText: {
        type: String,
        "default": '修改'
      },

      /**
       * 默认删除操作菜单文字
       */
      deleteText: {
        type: String,
        "default": '删除'
      }
    },
    data: function data() {
      return {
        treeData: [],
        //树形数据
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
          _this.treeData = _this.transform && _this.transform(treeData) || treeData; // 确保树已经有数据后再设置选中状态

          _this.updateCheckedKeys(_this.checkedKeys);
          /**
           * 请求数据成功，返回transform处理后的值和接口返回的值
           * @event loaded
           */


          _this.$emit('loaded', _this.treeData, res);
        })["catch"](function (error) {
          /**
           * 请求数据失败，返回err对象
           * @event error
           */
          _this.$emit('error', error);
        })["finally"](function () {
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
          "new": this.onDefaultNew,
          edit: this.onDefaultEdit,
          "delete": this.onDefaultDelete
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
        this.dialogVisible = true; // 给表单填充值

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

            var request = _this3.onDelete && _this3.onDelete(data, node) || _this3.$axios["delete"](_this3.url + '/' + data[_this3.treeAttributes.nodeKey]);

            request.then(function () {
              done();

              _this3.showMessage();

              _this3.fetchData();
            })["catch"](function (err) {
              _this3.$emit('error', err);
            })["finally"](function () {
              instance.confirmButtonLoading = false;
            });
          }
        })["catch"](function (err) {
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
          if (!valid) return false; // 新增 parentKey 为当前节点 id，修改为当前节点 parentKey

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
              })["catch"](function (err) {
                _this4.$emit('error', err);
              })["finally"](function (e) {
                _this4.confirmLoading = false;
              });

              return;
            } // 默认新增/修改逻辑


            var method = 'post';
            var url = _this4.url;

            if (_this4.isEdit) {
              method = 'put';
              url += "/".concat(_this4.row[_this4.treeAttributes.nodeKey]);
            }

            _this4.confirmLoading = true;

            _this4.$axios[method](url, data, {
              params: _this4.customQuery
            }).then(function (resp) {
              _this4.showMessage();

              _this4.fetchData();

              _this4.cancel();
            })["catch"](function (err) {
              _this4.$emit('error', err);
            })["finally"](function (e) {
              _this4.confirmLoading = false;
            });
          })["catch"](function (e) {});
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  var browser = createInjector;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      { staticClass: "el-data-tree" },
      [
        _vm.hasTitle
          ? _vm._t("title", [
              _c("p", { staticClass: "data-tree-title" }, [
                _vm._v(_vm._s(_vm.title)),
                _c("i", {
                  staticClass: "el-icon-plus",
                  on: { click: _vm.onDefaultNew }
                })
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.showFilter
          ? _c("el-input", {
              attrs: { placeholder: "查询", clearable: "" },
              model: {
                value: _vm.filterText,
                callback: function($$v) {
                  _vm.filterText = $$v;
                },
                expression: "filterText"
              }
            })
          : _vm._e(),
        _vm._v(" "),
        _c(
          "el-tree",
          _vm._g(
            _vm._b(
              {
                directives: [
                  {
                    name: "loading",
                    rawName: "v-loading",
                    value: _vm.loading,
                    expression: "loading"
                  }
                ],
                ref: "tree",
                staticClass: "data-tree",
                attrs: {
                  data: _vm.treeData,
                  filterNodeMethod: _vm.filterNode,
                  defaultExpandedKeys: _vm.expandedKeys
                },
                on: {
                  "node-expand": _vm.handleNodeExpand,
                  "node-collapse": _vm.handleNodeCollapse,
                  "check-change": _vm.handleCheckChange
                },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(ref) {
                      var node = ref.node;
                      var data = ref.data;
                      return _c("span", { staticClass: "custom-tree-node" }, [
                        _c("span", { staticClass: "custom-tree-node-label" }, [
                          _vm._v(_vm._s(node.label))
                        ]),
                        _vm._v(" "),
                        _vm.hasOperation
                          ? _c(
                              "span",
                              {
                                on: {
                                  click: function(e) {
                                    return e.stopPropagation()
                                  }
                                }
                              },
                              [
                                _c(
                                  "el-dropdown",
                                  {
                                    attrs: { trigger: "click" },
                                    on: {
                                      command: function(command) {
                                        return _vm.handleCommand(
                                          command,
                                          data,
                                          node
                                        )
                                      }
                                    }
                                  },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "el-dropdown-link" },
                                      [_c("i", { staticClass: "el-icon-more" })]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "el-dropdown-menu",
                                      {
                                        attrs: { slot: "dropdown" },
                                        slot: "dropdown"
                                      },
                                      [
                                        _vm.hasNew
                                          ? _c(
                                              "el-dropdown-item",
                                              { attrs: { command: "new" } },
                                              [_vm._v(_vm._s(_vm.newText))]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm.hasEdit
                                          ? _c(
                                              "el-dropdown-item",
                                              { attrs: { command: "edit" } },
                                              [_vm._v(_vm._s(_vm.editText))]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _vm._l(
                                          _vm.extraButtons.filter(function(btn) {
                                            return (
                                              !btn.show || btn.show(data, node)
                                            )
                                          }),
                                          function(btn, i) {
                                            return _c(
                                              "el-dropdown-item",
                                              _vm._b(
                                                {
                                                  key: i,
                                                  attrs: { command: btn.text }
                                                },
                                                "el-dropdown-item",
                                                btn,
                                                false
                                              ),
                                              [
                                                _vm._v(
                                                  "\n              " +
                                                    _vm._s(btn.text) +
                                                    "\n            "
                                                )
                                              ]
                                            )
                                          }
                                        ),
                                        _vm._v(" "),
                                        _vm.hasDelete
                                          ? _c(
                                              "el-dropdown-item",
                                              { attrs: { command: "delete" } },
                                              [_vm._v(_vm._s(_vm.deleteText))]
                                            )
                                          : _vm._e()
                                      ],
                                      2
                                    )
                                  ],
                                  1
                                )
                              ],
                              1
                            )
                          : _vm._e()
                      ])
                    }
                  }
                ])
              },
              "el-tree",
              _vm.treeAttributes,
              false
            ),
            _vm.$listeners
          )
        ),
        _vm._v(" "),
        _c(
          "el-dialog",
          {
            attrs: { title: _vm.dialogTitle, visible: _vm.dialogVisible },
            on: {
              "update:visible": function($event) {
                _vm.dialogVisible = $event;
              },
              close: _vm.closeDialog
            }
          },
          [
            _c(
              "el-form-renderer",
              _vm._b(
                { ref: "dialogForm", attrs: { content: _vm.form } },
                "el-form-renderer",
                _vm.formAttrs,
                false
              ),
              [_vm._t("form")],
              2
            ),
            _vm._v(" "),
            _c(
              "div",
              { attrs: { slot: "footer" }, slot: "footer" },
              [
                _c(
                  "el-button",
                  { attrs: { size: "small" }, on: { click: _vm.cancel } },
                  [_vm._v("取 消")]
                ),
                _vm._v(" "),
                _c(
                  "el-button",
                  {
                    attrs: {
                      type: "primary",
                      loading: _vm.confirmLoading,
                      size: "small"
                    },
                    on: { click: _vm.confirm }
                  },
                  [_vm._v("确 定")]
                )
              ],
              1
            )
          ],
          1
        )
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-17455a4d_0", { source: ".el-data-tree .data-tree-title {\n  padding: 8px;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.el-data-tree .data-tree-title .el-icon-plus {\n  cursor: pointer;\n}\n.el-data-tree .data-tree {\n  padding-top: 8px;\n}\n.el-data-tree .custom-tree-node {\n  overflow: hidden;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 14px;\n  padding-right: 8px;\n}\n.el-data-tree .custom-tree-node-label {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n", map: {"version":3,"sources":["/Users/donald-work/projects/el-data-tree/src/el-data-tree.vue","el-data-tree.vue"],"names":[],"mappings":"AAslBA;EACA,YAAA;EACA,iBAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;ACrlBA;ADulBA;EACA,eAAA;ACrlBA;ADwlBA;EACA,gBAAA;ACtlBA;ADwlBA;EACA,gBAAA;EACA,OAAA;EACA,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,eAAA;EACA,kBAAA;ACtlBA;ADwlBA;EACA,gBAAA;EACA,uBAAA;ACtlBA","file":"el-data-tree.vue","sourcesContent":["<template>\n  <div class=\"el-data-tree\">\n    <slot name=\"title\" v-if=\"hasTitle\">\n      <p class=\"data-tree-title\">{{ title }}<i class=\"el-icon-plus\" @click=\"onDefaultNew\"></i></p>\n    </slot>\n\n    <el-input\n      placeholder=\"查询\"\n      v-if=\"showFilter\"\n      v-model=\"filterText\"\n      clearable\n    >\n    </el-input>\n    <el-tree\n      ref=\"tree\"\n      v-loading=\"loading\"\n      :data=\"treeData\"\n      v-bind=\"treeAttributes\"\n      :filterNodeMethod=\"filterNode\"\n      :defaultExpandedKeys=\"expandedKeys\"\n      v-on=\"$listeners\"\n      @node-expand=\"handleNodeExpand\"\n      @node-collapse=\"handleNodeCollapse\"\n      @check-change=\"handleCheckChange\"\n      class=\"data-tree\"\n    >\n      <span\n        class=\"custom-tree-node\"\n        slot-scope=\"{node, data}\"\n      >\n        <span class=\"custom-tree-node-label\">{{ node.label }}</span>\n        <span @click=\"e => e.stopPropagation()\" v-if=\"hasOperation\">\n          <el-dropdown\n            trigger=\"click\"\n            @command=\"command => handleCommand(command, data, node)\"\n          >\n            <span class=\"el-dropdown-link\"><i class=\"el-icon-more\"></i></span>\n            <el-dropdown-menu slot=\"dropdown\">\n              <el-dropdown-item v-if=\"hasNew\" command=\"new\">{{ newText }}</el-dropdown-item>\n              <el-dropdown-item v-if=\"hasEdit\" command=\"edit\">{{ editText }}</el-dropdown-item>\n              <el-dropdown-item\n                v-for=\"(btn, i) in extraButtons.filter(btn => !btn.show || btn.show(data, node))\"\n                :key=\"i\"\n                v-bind=\"btn\"\n                :command=\"btn.text\"\n              >\n                {{ btn.text }}\n              </el-dropdown-item>\n              <el-dropdown-item v-if=\"hasDelete\" command=\"delete\">{{ deleteText }}</el-dropdown-item>\n            </el-dropdown-menu>\n          </el-dropdown>\n        </span>\n      </span>\n    </el-tree>\n\n    <el-dialog :title=\"dialogTitle\" :visible.sync=\"dialogVisible\" @close=\"closeDialog\">\n      <!--https://github.com/FEMessage/el-form-renderer-->\n      <el-form-renderer :content=\"form\" ref=\"dialogForm\" v-bind=\"formAttrs\">\n        <!--@slot 额外的弹窗表单内容, 当form不满足需求时可以使用 -->\n        <slot name=\"form\"></slot>\n      </el-form-renderer>\n\n      <div slot=\"footer\">\n        <el-button @click=\"cancel\" size=\"small\">取 消</el-button>\n        <el-button type=\"primary\" @click=\"confirm\" :loading=\"confirmLoading\" size=\"small\">确 定</el-button>\n      </div>\n    </el-dialog>\n  </div>\n</template>\n\n<script>\nimport _get from 'lodash.get'\n\nconst dataPath = 'payload.content'\nconst dialogForm = 'dialogForm'\nconst defaultParentKey = 'parentId'\nconst defaultTreeAttrs = {\n  highlightCurrent: true,\n  props: {\n    children: 'children',\n    label: 'name'\n  },\n  nodeKey: 'id' //tree配置，每个树节点用来作为唯一标识的属性，整棵树应该是唯一的\n}\n\nconst camelizeRE = /-(\\w)/g\nconst camelize = str =>\n  str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))\n\nexport default {\n  name: 'ElDataTree',\n  props: {\n    /**\n     * 标题文字\n     */\n    title: {\n      type: String,\n      default: ''\n    },\n    /**\n     * tree attributes\n     */\n    treeAttrs: {\n      type: Object,\n      default: () => {\n        return {}\n      }\n    },\n    /**\n     * 请求url, 如果为空, 则不会发送请求; 改变url, 则tree会重新发送请求\n     */\n    url: {\n      type: String,\n      default: ''\n    },\n    /**\n     * 父级id的key，默认值 parentKey，\n     * 修改时会用到,请求会根据定义的属性值获取parentKey,即row[this.parentKey]\n     */\n    parentKey: {\n      type: String,\n      default: defaultParentKey\n    },\n    /**\n     * 接口返回的数据中的路径, 嵌套对象使用.表示即可\n     */\n    dataPath: {\n      type: String,\n      default: dataPath\n    },\n    /**\n     * 是否展示过滤框\n     */\n    showFilter: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * 通过 checkedKeys 设置目前勾选的节点，支持.sync修饰符\n     */\n    checkedKeys: {\n      type: Array,\n      default() {\n        return []\n      }\n    },\n    /**\n     * 操作列的自定义菜单, 渲染的是element-ui的dropdown, 支持包括style在内的以下属性: {type: '', text: '', atClick: (data, node) => Promise.resolve(), show: (data, node) => return true时显示 } 点击事件 data参数表示该节点所对应的对象,node表示当前节点\n     */\n    extraButtons: {\n      type: Array,\n      default() {\n        return []\n      }\n    },\n    /**\n     * 弹窗表单, 用于新增与修改, 详情配置参考 @femessage/el-form-renderer\n     * @link https://github.com/FEMessage/el-form-renderer/blob/master/README.md\n     */\n    form: {\n      type: Array,\n      default() {\n        return []\n      }\n    },\n    /**\n     * 弹窗表单属性设置, 详情配置参考element-ui官网\n     * @link http://element.eleme.io/#/zh-CN/component/form#form-attributes\n     */\n    formAttrs: {\n      type: Object,\n      default() {\n        return {}\n      }\n    },\n    /**\n     * 新增/修改提交时注入额外的参数\n     */\n    extraParams: {\n      type: Object,\n      default() {\n        return {}\n      }\n    },\n    /**\n     * 外部的注入额外的查询参数, 键值对形式\n     */\n    customQuery: {\n      type: Object,\n      default() {\n        return {}\n      }\n    },\n    /**\n     * 是否有操作列\n     */\n    hasOperation: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * 是否有标题栏\n     */\n    hasTitle: {\n      type: Boolean,\n      default: false\n    },\n    /**\n     * 是否有删除按钮\n     */\n    hasDelete: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * 是否有新增按钮\n     */\n    hasNew: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * 是否有编辑按钮\n     */\n    hasEdit: {\n      type: Boolean,\n      default: true\n    },\n    /**\n     * 用于转换获取的数据为目标数据\n     */\n    transform: {\n      type: Function\n    },\n    /**\n     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用, 需要返回promise\n     * 参数(data, row) data 是form表单的数据, row 是当前行的数据\n     */\n    onNew: {\n      type: Function\n    },\n    /**\n     * 点击修改按钮时的方法, 当默认修改方法不满足需求时使用, 需要返回promise\n     * 参数(data, row) data 是form表单的数据, row 是当前行的数据\n     */\n    onEdit: {\n      type: Function\n    },\n    /**\n     * 点击删除按钮时的方法, 当默认删除方法不满足需求时使用, 需要返回promise\n     * 参数(data, row) data 是form表单的数据, row 是当前行的数据\n     */\n    onDelete: {\n      type: Function\n    },\n    /**\n     * 在新增/修改弹窗 点击确认时调用，返回Promise, 如果reject, 则不会发送新增/修改请求\n     * 参数: (data, isNew) data为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗\n     */\n    beforeConfirm: {\n      type: Function,\n      default() {\n        return Promise.resolve()\n      }\n    },\n    /**\n     * 默认新增操作菜单文字\n     */\n    newText: {\n      type: String,\n      default: '新增'\n    },\n    /**\n     * 默认修改操作菜单文字\n     */\n    editText: {\n      type: String,\n      default: '修改'\n    },\n    /**\n     * 默认删除操作菜单文字\n     */\n    deleteText: {\n      type: String,\n      default: '删除'\n    }\n  },\n  data() {\n    return {\n      treeData: [], //树形数据\n      filterText: '',\n      loading: false,\n\n      dialogTitle: '',\n      dialogVisible: false,\n      isNew: true,\n      isEdit: false,\n      confirmLoading: false,\n      // 要修改的那一行\n      row: {},\n\n      expandedKeys: []\n    }\n  },\n  computed: {\n    // 连字符转驼峰\n    camelizeTreeAttrs() {\n      const treeAttrs = this.treeAttrs\n      return Object.keys(treeAttrs).reduce((sum, k) => {\n        // 属性名转驼峰\n        const key = camelize(k)\n        sum[key] = treeAttrs[k]\n        return sum\n      }, {})\n    },\n    treeAttributes() {\n      return Object.assign({}, defaultTreeAttrs, this.camelizeTreeAttrs)\n    }\n  },\n  watch: {\n    url: {\n      handler() {\n        //如果url变化，则重新拉取列表\n        this.fetchData()\n      },\n      immediate: true\n    },\n    filterText(val) {\n      this.$refs.tree.filter(val)\n    },\n    checkedKeys(keys) {\n      this.updateCheckedKeys(keys)\n    }\n  },\n  mounted() {\n    // 合并默认展开的key\n    if (this.treeAttributes.defaultExpandedKeys) {\n      this.expandedKeys = this.expandedKeys.concat(\n        this.treeAttributes.defaultExpandedKeys\n      )\n    }\n  },\n  methods: {\n    fetchData() {\n      //如果url为空，则不发送请求\n      if (!this.url) {\n        console.warn('ELDataTree: url 为空, 不发送请求')\n        return false\n      }\n\n      this.loading = true\n      this.$axios\n        .get(this.url, {\n          params: this.customQuery\n        })\n        .then(res => {\n          //从dataPath获取数据\n          const treeData = _get(res, this.dataPath) || []\n          this.treeData =\n            (this.transform && this.transform(treeData)) || treeData\n          // 确保树已经有数据后再设置选中状态\n          this.updateCheckedKeys(this.checkedKeys)\n          /**\n           * 请求数据成功，返回transform处理后的值和接口返回的值\n           * @event loaded\n           */\n          this.$emit('loaded', this.treeData, res)\n        })\n        .catch(error => {\n          /**\n           * 请求数据失败，返回err对象\n           * @event error\n           */\n          this.$emit('error', error)\n        })\n        .finally(() => {\n          this.loading = false\n        })\n    },\n    filterNode(value, data) {\n      if (!value) return true\n      const label = this.treeAttributes.props.label\n      return data[label].indexOf(value) !== -1\n    },\n    /**\n     * 获取el-tree对象，方便调用其方法\n     * @returns {tree object}\n     */\n    getTree() {\n      return this.$refs.tree\n    },\n    /**\n     * 节点选中状态发生变化时的回调\n     * 共三个参数，依次为：\n     * 传递给 data 属性的数组中该节点所对应的对象\n     * 节点本身是否被选中\n     * 节点的子树中是否有被选中的节点\n     */\n    handleCheckChange() {\n      //获取选择的节点，如果节点被选中，则父节点也会选中\n      const checkNodes = this.$refs.tree.getCheckedNodes(false, true)\n      const nodeKey = this.treeAttributes.nodeKey\n      this.$emit('update:checkedKeys', checkNodes.map(item => item[nodeKey]))\n    },\n    updateCheckedKeys(keys) {\n      //设置checkedKeys的时候，设置父节点，子节点全部也被选中了\n      //解决方案：过滤掉有孩子节点的key，不设置checked状态\n      const flattenTree = (array, children) =>\n        array.reduce(\n          (sum, node) =>\n            sum.concat(node[children] ? flattenTree(node[children]) : node),\n          []\n        )\n      const treeAttrs = this.treeAttributes\n\n      const checkedKeys = flattenTree(this.treeData, treeAttrs.props.children)\n        .filter(node => keys.indexOf(node[treeAttrs.nodeKey]) > -1)\n        .map(node => node[treeAttrs.nodeKey])\n\n      this.$refs.tree.setCheckedKeys(checkedKeys)\n    },\n    handleCommand(command, data, node) {\n      const handler = {\n        new: this.onDefaultNew,\n        edit: this.onDefaultEdit,\n        delete: this.onDefaultDelete\n      }\n\n      if (handler[command]) {\n        handler[command](data, node)\n        return\n      }\n\n      const btn = this.extraButtons.find(btn => btn.text === command)\n      if (btn) {\n        typeof btn.atClick === 'function' && btn.atClick(data, node)\n      }\n    },\n\n    onDefaultNew(data = {}) {\n      this.row = data\n      this.isNew = true\n      this.isEdit = false\n      this.dialogTitle = this.newText\n      this.dialogVisible = true\n    },\n    onDefaultEdit(data) {\n      this.row = data\n      this.isNew = false\n      this.isEdit = true\n      this.dialogTitle = this.editText\n      this.dialogVisible = true\n\n      // 给表单填充值\n      this.$nextTick(() => {\n        this.$refs[dialogForm].updateForm(data)\n      })\n    },\n    onDefaultDelete(data, node) {\n      this.$confirm('确认删除吗', '提示', {\n        type: 'warning',\n        beforeClose: (action, instance, done) => {\n          if (action !== 'confirm') {\n            done()\n            return\n          }\n          instance.confirmButtonLoading = true\n\n          const request =\n            (this.onDelete && this.onDelete(data, node)) ||\n            this.$axios.delete(\n              this.url + '/' + data[this.treeAttributes.nodeKey]\n            )\n          request\n            .then(() => {\n              done()\n              this.showMessage()\n              this.fetchData()\n            })\n            .catch(err => {\n              this.$emit('error', err)\n            })\n            .finally(() => {\n              instance.confirmButtonLoading = false\n            })\n        }\n      }).catch(err => {\n        this.$emit('error', err)\n      })\n    },\n\n    // 组件可以绑定多个相同的事件，不需要emit node-expand/node-collapse 来兼容el-tree\n    handleNodeExpand(data) {\n      const nodeKey = this.treeAttributes.nodeKey\n      this.expandedKeys.push(data[nodeKey])\n    },\n    handleNodeCollapse(data) {\n      const nodeKey = this.treeAttributes.nodeKey\n      this.expandedKeys = this.expandedKeys.filter(key => key !== data[nodeKey])\n    },\n\n    cancel() {\n      this.dialogVisible = false\n    },\n    confirm() {\n      this.$refs[dialogForm].validate(valid => {\n        if (!valid) return false\n\n        // 新增 parentKey 为当前节点 id，修改为当前节点 parentKey\n        const parentKey = this.isNew\n          ? this.treeAttributes.nodeKey\n          : this.parentKey\n\n        const data = Object.assign(\n          {\n            parentId: this.row[parentKey]\n          },\n          this.$refs[dialogForm].getFormValue(),\n          this.extraParams\n        )\n\n        this.beforeConfirm(data, this.isNew)\n          .then(() => {\n            let condiction = 'isNew'\n            let customMethod = 'onNew'\n            if (this.isEdit) {\n              condiction = 'isEdit'\n              customMethod = 'onEdit'\n            }\n\n            if (this[condiction] && this[customMethod]) {\n              this.confirmLoading = true\n              this[customMethod](data, this.row)\n                .then(resp => {\n                  this.fetchData()\n                  this.showMessage(true)\n                  this.cancel()\n                })\n                .catch(err => {\n                  this.$emit('error', err)\n                })\n                .finally(e => {\n                  this.confirmLoading = false\n                })\n              return\n            }\n\n            // 默认新增/修改逻辑\n            let method = 'post'\n            let url = this.url\n            if (this.isEdit) {\n              method = 'put'\n              url += `/${this.row[this.treeAttributes.nodeKey]}`\n            }\n            this.confirmLoading = true\n            this.$axios[method](url, data, {\n              params: this.customQuery\n            })\n              .then(resp => {\n                this.showMessage()\n                this.fetchData()\n                this.cancel()\n              })\n              .catch(err => {\n                this.$emit('error', err)\n              })\n              .finally(e => {\n                this.confirmLoading = false\n              })\n          })\n          .catch(e => {})\n      })\n    },\n    closeDialog() {\n      this.isNew = false\n      this.isEdit = false\n      this.confirmLoading = false\n      this.$refs[dialogForm].resetFields()\n    },\n    showMessage(isSuccess = true) {\n      if (isSuccess) {\n        this.$message({\n          type: 'success',\n          message: '操作成功'\n        })\n      } else {\n        this.$message({\n          type: 'error',\n          message: '操作失败'\n        })\n      }\n    }\n  }\n}\n</script>\n\n<style lang=\"stylus\">\n  .el-data-tree {\n    .data-tree-title {\n      padding: 8px;\n      font-weight: bold;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n\n      .el-icon-plus {\n        cursor: pointer;\n      }\n    }\n    .data-tree {\n      padding-top: 8px;\n    }\n    .custom-tree-node {\n      overflow: hidden;\n      flex: 1;\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      font-size: 14px;\n      padding-right: 8px;\n    }\n    .custom-tree-node-label {\n      overflow: hidden;\n      text-overflow: ellipsis\n    }\n  }\n</style>\n",".el-data-tree .data-tree-title {\n  padding: 8px;\n  font-weight: bold;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n.el-data-tree .data-tree-title .el-icon-plus {\n  cursor: pointer;\n}\n.el-data-tree .data-tree {\n  padding-top: 8px;\n}\n.el-data-tree .custom-tree-node {\n  overflow: hidden;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  font-size: 14px;\n  padding-right: 8px;\n}\n.el-data-tree .custom-tree-node-label {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = undefined;
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var Component = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  // Import vue component

  function install(Vue) {
    if (install.installed) return;
    install.installed = true;
    Vue.component('ElDataTree', Component);
  } // Create module definition for Vue.use()

  var plugin = {
    install: install // To auto-install when vue is found

  };
  var GlobalVue = null;

  if (typeof window !== 'undefined') {
    GlobalVue = window.Vue;
  } else if (typeof global !== 'undefined') {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  } // To allow use as module (npm/webpack/etc.) export component
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = component;

  exports.default = Component;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
