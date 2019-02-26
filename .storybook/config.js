import {configure} from '@storybook/vue'

import Vue from 'vue'
import axios from 'axios'

import ElFormRenderer from '@femessage/el-form-renderer'
import {
  Button,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Input,
  Loading,
  Tree,
  MessageBox,
  Message
} from 'element-ui'
import ElDataTree from '../src/index.js'

// Register custom components.
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading.directive)
Vue.use(Tree)

// 注册表单渲染组件及表单组件
// 如要使用其他表单组件, 如radio, 需要另外注册
Vue.component('el-form-renderer', ElFormRenderer)
Vue.use(Input)
Vue.component('el-data-tree', ElDataTree)

// 赋予table发送请求的能力
Vue.prototype.$axios = axios

// 删除操作需要用到确认提示
Vue.prototype.$confirm = MessageBox.confirm
// 操作成功后需要用到消息提醒
Vue.prototype.$message = Message

function loadStories() {
  // You can require as many stories as you need.
  require('../stories')
}

configure(loadStories, module)
