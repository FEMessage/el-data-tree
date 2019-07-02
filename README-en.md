# el-data-tree

![](https://cdn.nlark.com/yuque/0/2019/svg/224563/1561713517736-62f339ed-0fba-4d0a-91bb-2cadd901b94e.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&size=0&status=done&width=90) [![](https://img.shields.io/npm/dm/@femessage/el-data-tree.svg#align=left&display=inline&height=20&originHeight=20&originWidth=140&status=done&width=140)](https://www.npmjs.com/package/@femessage/el-data-tree) ![](https://img.shields.io/npm/v/@femessage/el-data-tree.svg#align=left&display=inline&height=20&originHeight=20&originWidth=80&status=done&width=80) [![](https://img.shields.io/npm/l/@femessage/el-data-tree.svg#align=left&display=inline&height=20&originHeight=20&originWidth=78&status=done&width=78)](https://github.com/FEMessage/el-data-tree/blob/master/LICENSE) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg#align=left&display=inline&height=20&originHeight=20&originWidth=90&status=done&width=90) [![](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg#align=left&display=inline&height=20&originHeight=20&originWidth=104&status=done&width=104)](https://github-tools.github.io/github-release-notes/)

Use `axios` to automatically send requests, support filtering, customize action columns, and make RESTful CRUD simpler 👏

![20190221.gif](https://cdn.nlark.com/yuque/0/2019/gif/224563/1561713421335-6cc64e4c-4533-4236-b452-c007bcbff97a.gif#align=left&display=inline&height=533&name=20190221.gif&originHeight=533&originWidth=640&size=3402604&status=done&width=640)

## Table of Contents

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

el-data-tree is created to solve business problems, so CRUD logic is set inside.<br /> For example, to develop `user` api, suppose its relative path like     this:

```sh
/api/v1/users
```

The restful CRUD api should be:

* Retrieve

```javascript
GET /api/v1/users?type=1
```

* Create

```javascript
POST / api / v1 / users
```

* Update

```javascript
PUT /api/v1/users/:id
```

* Delete

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

* Retrieve

![20190221165504.png](https://cdn.nlark.com/yuque/0/2019/png/224563/1561713729737-7bd1ab69-b726-451c-84c5-efcb8ccf641b.png#align=left&display=inline&height=492&name=20190221165504.png&originHeight=492&originWidth=501&size=47269&status=done&width=501)<br />

* Create

![20190214171329770.png](https://cdn.nlark.com/yuque/0/2019/png/224563/1561713670642-7595b615-90df-462d-9ec7-feefd5fe47d1.png#align=left&display=inline&height=694&name=20190214171329770.png&originHeight=694&originWidth=1588&size=110401&status=done&width=1588)

* Update

![20190214171433211.png](https://cdn.nlark.com/yuque/0/2019/png/224563/1561713696957-20993733-ab50-490f-af7e-8800c196e404.png#align=left&display=inline&height=691&name=20190214171433211.png&originHeight=691&originWidth=1502&size=110867&status=done&width=1502)

* Delete

![20190214171552422.png](https://cdn.nlark.com/yuque/0/2019/png/224563/1561713749814-69f454fd-9411-49e7-a128-06dfde7d8e2b.png#align=left&display=inline&height=687&name=20190214171552422.png&originHeight=687&originWidth=1794&size=116237&status=done&width=1794)

[⬆ Back to Top](#table-of-contents)

## Feature

* Use configuration to call restful api to complete CRUD functions
* Support custom menu bar, as well as custom action functions
* Save the expandedKeys by default and will not losing the expandedKeys state after calling create/delete/update apis
* Optimized node check method

[⬆ Back to Top](#table-of-contents)

## Demo

* [doc and online demo](https://femessage.github.io/el-data-tree/)

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

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):<br />This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[⬆ Back to Top](#table-of-contents)


## License

[MIT](./LICENSE)

[⬆ Back to Top](#table-of-contents)
