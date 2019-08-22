# el-data-tree

[![Build Status](https://travis-ci.com/FEMessage/el-data-tree.svg?branch=master)](https://travis-ci.com/FEMessage/el-data-tree)
[![NPM Download](https://img.shields.io/npm/dm/@femessage/el-data-tree.svg)](https://www.npmjs.com/package/@femessage/el-data-tree)
[![NPM Version](https://img.shields.io/npm/v/@femessage/el-data-tree.svg)](https://www.npmjs.com/package/@femessage/el-data-tree)
[![NPM License](https://img.shields.io/npm/l/@femessage/el-data-tree.svg)](https://github.com/FEMessage/el-data-tree/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-data-tree/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

使用`axios`自动发送请求，支持筛选, 自定义操作列, 让 RESTful 风格的 CRUD 更简单 👏

![image-20190214162009754](https://cdn.nlark.com/yuque/0/2019/gif/304775/1563349479656-c6a6b52d-6b2b-4406-bc3e-b1aacae795f2.gif)

[English](./README-en.md)

## Table of Contents <!-- omit in toc -->

* [Introduction](#introduction)
  * [CRUD](#crud)
* [Feature](#feature)
* [Demo](#demo)
* [Pre Install](#pre-install)
* [Install](#install)
* [Quick Start](#quick-start)
  * [Global Register Component](#global-register-component)
  * [Template](#template)
* [Contributors](#contributors)
* [License](#license)

## Introduction

### CRUD

el-data-tree 就是为了解决业务问题而生的，故而封装了 CRUD 的逻辑在里面。

以用户接口示例，设其相对路径为:

```sh
/api/v1/users
```

则其 restful CRUD 接口如下：

* 查询

```sh
GET /api/v1/users?type=1
```

* 新增

```sh
POST /api/v1/users
```

* 修改(编辑)

```sh
PUT /api/v1/users/:id
```

* 删除

```sh
DELETE /api/v1/users/:id
```

则只需要使用以下代码，即可完成 CRUD 功能

```vue
<template>
  <el-data-tree v-bind="treeConfig"></el-data-tree>
</template>
```

```js
<script>
export default {
  data() {
    return {
      treeConfig: {
        url: '/example/users',
        dataPath: 'data.payload',
        showFilter: true,
        form: [
          {
            type: 'input',
            id: 'name',
            label: '用户名',
            el: {
              placeholder: '请输入'
            },
            rules: [
              {
                required: true,
                message: '请输入用户名',
                trigger: 'blur'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
```

效果如下：

* 查询

![image-20190214165758093](https://cdn.nlark.com/yuque/0/2019/png/304775/1563349470430-32671f09-db40-44ba-a2dc-afbb26d1e16e.png)

* 新增

![image-20190214171329770](https://cdn.nlark.com/yuque/0/2019/png/304775/1563349471728-feb393b5-8cbe-4635-afd1-80e59931cac9.png)

* 修改

![image-20190214171433211](https://cdn.nlark.com/yuque/0/2019/png/304775/1563349471681-d64eba18-7e51-4b5b-9614-b799a51c6b13.png)

* 删除

![image-20190214171552422](https://cdn.nlark.com/yuque/0/2019/png/304775/1563349471832-c6e18734-b91e-4731-bb8d-6c50fa894184.png)

[⬆ Back to Top](#table-of-contents)

## Feature

* 只需进行 json 配置，即可实现 restful 风格的 CRUD 四个接口的对接
* 可扩展自定义菜单栏，以及自定义操作函数
* 默认保存展开状态，新增、删除、编辑不丢失该状态
* 优化节点勾选方法

[⬆ Back to Top](#table-of-contents)

## Demo

* [doc and online demo](https://femessage.github.io/el-data-tree/)

[⬆ Back to Top](#table-of-contents)

## Pre Install

this component peerDependencies on [element-ui](http://element.eleme.io/#/zh-CN/component/tree) and [@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer) and [axios](https://github.com/axios/axios)

make sure you have installed in your project

```sh
yarn add element-ui @femessage/el-form-renderer axios
```

if you want to develop the component on your localhost, you should install with -P

```sh
yarn add element-ui @femessage/el-form-renderer axios -P
```

[⬆ Back to Top](#table-of-contents)

## Install

encourage using [yarn](https://yarnpkg.com/en/docs/install#mac-stable) to install

```sh
yarn add @femessage/el-data-tree
```

[⬆ Back to Top](#table-of-contents)

## Quick Start

### Global Register Component

this is for minification reason: in this way building your app,

webpack or other bundler just bundle the dependencies into one vendor for all pages which using this component,

instead of one vendor for one page

```js
import Vue from 'vue'

// register component and loading directive
import ElDataTree from '@femessage/el-data-tree'
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
Vue.component('el-form-renderer', ElFormRenderer)
Vue.component('el-data-tree', ElDataTree)

// to show confirm before delete
Vue.prototype.$confirm = MessageBox.confirm
// if the tree component cannot access `this.$axios`, it cannot send request
import axios from 'axios'
Vue.prototype.$axios = axios
```

[⬆ Back to Top](#table-of-contents)

### Template

```vue
<template>
  <el-data-tree></el-data-tree>
</template>
```

[⬆ Back to Top](#table-of-contents)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=Alvin-Liu" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-tree/commits?author=Alvin-Liu" title="Documentation">📖</a> <a href="#example-Alvin-Liu" title="Examples">💡</a></td><td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#translation-levy9527" title="Translation">🌍</a></td><td align="center"><a href="https://coldstone.fun"><img src="https://avatars1.githubusercontent.com/u/18013127?v=4" width="100px;" alt="Cold Stone"/><br /><sub><b>Cold Stone</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=xrr2016" title="Code">💻</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=evillt" title="Code">💻</a> <a href="#maintenance-evillt" title="Maintenance">🚧</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=donaldshen" title="Documentation">📖</a> <a href="#maintenance-donaldshen" title="Maintenance">🚧</a></td><td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="#maintenance-colmugx" title="Maintenance">🚧</a></td><td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/issues?q=author%3AOuZuYu" title="Bug reports">🐛</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
