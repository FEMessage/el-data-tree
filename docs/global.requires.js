import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElFormRenderer from '@femessage/el-form-renderer'

const baseUrl = 'https://www.easy-mock.com/mock/5c6783930df0c43ba31aca2b/femessage-mock/el-data-tree'
Vue.prototype.$axios = axios.create({
  baseURL: baseUrl
})
Vue.use(ElementUI)
Vue.component('el-form-renderer', ElFormRenderer)

Vue.mixin({
  data() {
    return {
      baseUrl,
      getUrl: '/on-get',
      editUrl: '/on-edit',
      deleteUrl: '/on-delete',
      postUrl: '/on-post',
    }
  }
})
