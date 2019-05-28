import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ElFormRenderer from '@femessage/el-form-renderer'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(config => {
  config.url += `?requestid=${Math.random()}`
  return config
})
Vue.prototype.$axios = axiosInstance
Vue.use(ElementUI)
Vue.component('el-form-renderer', ElFormRenderer)
