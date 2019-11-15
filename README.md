# el-data-tree

[![Build Status](https://travis-ci.com/FEMessage/el-data-tree.svg?branch=master)](https://travis-ci.com/FEMessage/el-data-tree)
[![NPM Download](https://img.shields.io/npm/dm/@femessage/el-data-tree.svg)](https://www.npmjs.com/package/@femessage/el-data-tree)
[![NPM Version](https://img.shields.io/npm/v/@femessage/el-data-tree.svg)](https://www.npmjs.com/package/@femessage/el-data-tree)
[![NPM License](https://img.shields.io/npm/l/@femessage/el-data-tree.svg)](https://github.com/FEMessage/el-data-tree/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/FEMessage/el-data-tree/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

Use `axios` to automatically send requests, support filtering, customize action columns, and make RESTful CRUD simpler 👏

![el-data-tree-crud.gif](https://i.loli.net/2019/11/14/xd3mkSXasu1oe2n.gif)

[中文文档](./README-zh.md)

## Table of Contents

- [Introduction](#introduction)
  - [CRUD](#crud)
- [Feature](#feature)
- [Demo](#demo)
- [Pre Install](#pre-install)
- [Install](#install)
- [Quick Start](#quick-start)
  - [Global Register Component](#global-register-component)
  - [Template](#template)
- [Contributors](#contributors)
- [License](#license)

## Introduction

### CRUD

el-data-tree is created to solve business problems, so CRUD logic is set inside.<br /> For example, to develop `user` api, suppose its relative path like this:

```sh
/api/v1/users
```

The restful CRUD api should be:

- Retrieve

```javascript
GET /api/v1/users?type=1
```

- Create

```javascript
POST / api / v1 / users
```

- Update

```javascript
PUT /api/v1/users/:id
```

- Delete

```javascript
DELETE /api/v1/users/:id
```

Then only need to use the following code to complete CRUD functions

```html
<template>
  <el-data-tree v-bind="treeConfig"></el-data-tree>
</template>
```

```javascript
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
            $type: 'input',
            $id: 'name',
            label: '用户名',
            $el: {
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

The results are as follows：

- Retrieve

![el-data-tree-search.png](https://i.loli.net/2019/11/14/onYZzKgP8lScEyi.png)

- Create

![el-data-tree-add.png](https://i.loli.net/2019/11/14/NKjsl2Bf5ZQ39pb.png)

- Update

![el-data-tree-modify.png](https://i.loli.net/2019/11/14/QG2hpXIbrB1lZNv.png)

- Delete

![el-data-tree-delete.png](https://i.loli.net/2019/11/14/t7JmLonjlpRVq9K.png)

[⬆ Back to Top](#table-of-contents)

## Feature

- Use configuration to call restful api to complete CRUD functions
- Support custom menu bar, as well as custom action functions
- Save the expandedKeys by default and will not losing the expandedKeys state after calling create/delete/update apis
- Optimized node check method

[⬆ Back to Top](#table-of-contents)

## Demo

- [doc and online demo](https://femessage.github.io/el-data-tree/)

[⬆ Back to Top](#table-of-contents)

## Pre Install

This component peerDependencies on [element-ui](http://element.eleme.io/#/zh-CN/component/tree) and [@femessage/el-form-renderer](https://github.com/FEMessage/el-form-renderer) and [axios](https://github.com/axios/axios)<br />make sure you have installed in your project

```sh
yarn add element-ui @femessage/el-form-renderer axios
```

[⬆ Back to Top](#table-of-contents)

## Install

Encourage using [yarn](https://yarnpkg.com/en/docs/install#mac-stable) to install

```sh
yarn add @femessage/el-data-tree
```

[⬆ Back to Top](#table-of-contents)

## Quick Start

### Global Register Component

This is for minification reason: in this way building your app, webpack or other bundler just bundle the dependencies into one vendor for all pages which using this component, instead of one vendor for one page

```javascript
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

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://github.com/Alvin-Liu"><img src="https://avatars0.githubusercontent.com/u/11909145?v=4" width="100px;" alt="Alvin"/><br /><sub><b>Alvin</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=Alvin-Liu" title="Code">💻</a> <a href="https://github.com/FEMessage/el-data-tree/commits?author=Alvin-Liu" title="Documentation">📖</a> <a href="#example-Alvin-Liu" title="Examples">💡</a></td><td align="center"><a href="https://github.com/levy9527/blog"><img src="https://avatars3.githubusercontent.com/u/9384365?v=4" width="100px;" alt="levy"/><br /><sub><b>levy</b></sub></a><br /><a href="#review-levy9527" title="Reviewed Pull Requests">👀</a> <a href="#translation-levy9527" title="Translation">🌍</a></td><td align="center"><a href="https://coldstone.fun"><img src="https://avatars1.githubusercontent.com/u/18013127?v=4" width="100px;" alt="Cold Stone"/><br /><sub><b>Cold Stone</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=xrr2016" title="Code">💻</a></td><td align="center"><a href="https://evila.me"><img src="https://avatars3.githubusercontent.com/u/19513289?v=4" width="100px;" alt="EVILLT"/><br /><sub><b>EVILLT</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=evillt" title="Code">💻</a> <a href="#maintenance-evillt" title="Maintenance">🚧</a></td><td align="center"><a href="https://donaldshen.github.io/portfolio"><img src="https://avatars3.githubusercontent.com/u/19591950?v=4" width="100px;" alt="Donald Shen"/><br /><sub><b>Donald Shen</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/commits?author=donaldshen" title="Documentation">📖</a> <a href="#maintenance-donaldshen" title="Maintenance">🚧</a></td><td align="center"><a href="https://colmugx.github.io"><img src="https://avatars1.githubusercontent.com/u/21327913?v=4" width="100px;" alt="ColMugX"/><br /><sub><b>ColMugX</b></sub></a><br /><a href="#maintenance-colmugx" title="Maintenance">🚧</a></td><td align="center"><a href="http://67.216.223.155/resume/"><img src="https://avatars3.githubusercontent.com/u/26338853?v=4" width="100px;" alt="OuZuYu"/><br /><sub><b>OuZuYu</b></sub></a><br /><a href="https://github.com/FEMessage/el-data-tree/issues?q=author%3AOuZuYu" title="Bug reports">🐛</a></td></tr></table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)

## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
