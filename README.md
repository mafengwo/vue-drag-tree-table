# vue drag tree tabl
IE10+/Chrome/firefox
> 基于vue实现的可以拖拽排序的树形表格 [star传送门](https://github.com/ColdDay/vue-drag-tree-table "vue-drag-tree-table")，[npm](https://www.npmjs.com/package/drag-tree-table "vue-drag-tree-table")   

> 实现思路[掘金](https://juejin.im/post/5bc9355a5188255c3853955c "vue-drag-tree-table")   
![drag-tree-table](./imgs/demo.gif 'drag-tree-table')

## Build Setup

``` bash
# install dependencies
npm i drag-tree-table --save-dev
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
```
## 使用方式
----
```javascript
import dragTreeTable from 'drag-tree-table'
```
```html
<dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
 ```
 ```javascript
 treeData: {
   lists: [],
   columns: []
 }
 // methods
 onTreeDataChange(list) {
  this.treeData.lists = list
 },
 ```
 > 数据源（lists）配置   

参数|可选值|描述
---|:--:|---:
id|String|唯一标志
parent_id|String|父节点ID
order|Number|排序,0开始,onDrag后order会重置
name|String|默认显示内容
open|Boolean|true展开,false收起
lists|Array|子节点

 > lists 配置示例
 ```javascript
 [
  {
    "id":40,
    "parent_id":0,
    "order":0,
    "name":"动物类",
    "uri":"/masd/ds",
    "open":true,
    "lists":[]
  },{
    "id":5,
    "parent_id":0,
    "order":1,
    "name":"昆虫类",
    "uri":"/masd/ds",
    "open":true,
    "lists":[
      {
        "id":12,
        "parent_id":5,
        "open":true,
        "order":0,
        "name":"蚂蚁",
        "uri":"/masd/ds",
        "lists":[]
      }
    ]
  },
  {
    "id":19,
    "parent_id":0,
    "order":2,
    "name":"植物类",
    "uri":"/masd/ds",
    "open":true,
    "lists":[]
  }
]
 ```
> 列（columns）配置   

参数|可选值|描述
---|:--:|---:
type|'selection', 'actions'|selection会显示折叠图标，actions指操作栏
title|String|表格标题
field|String|单元格内容取值使用
width|Number|单元格宽度
align|left,center,right|单元格对齐方式，默认局左对齐
formatter|Function|自定义单元格显示内容,参数为当前行数据
 > columns 配置示例
 ```javascript
[
  {
    type: 'selection',
    title: '菜单名称',
    field: 'name',
    width: 200,
    align: 'center',
    formatter: (item) => {
      return '<a>'+item.name+'</a>'
    }
  },
  {
    title: '链接',
    field: 'url',
    width: 200,
    align: 'center'
  },
  {
    title: '操作',
    type: 'action',
    width: 350,
    align: 'center',
    actions: [
      {
        text: '查看角色',
        onclick: this.onDetail,
        formatter: (item) => {
          return '<i>查看角色</i>'
        }
      },
      {
        text: '编辑',
        onclick: this.onEdit,
        formatter: (item) => {
          return '<i>编辑</i>'
        }
      }
    ]
  },
]
```
