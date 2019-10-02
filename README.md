# vue drag tree table

IE10+/Chrome/firefox
> 基于vue实现的可以拖拽排序的树形表格，[npm](https://www.npmjs.com/package/drag-tree-table "vue-drag-tree-table")   

![drag-tree-table](./imgs/demo.gif 'drag-tree-table')

## Build Setup

``` bashs
# install dependencies
npm i drag-tree-table --save-dev
# serve with hot reload at localhost:8080
npm run dev
# build for production with minification
npm run build
```
## 使用方式

```html
<dragTreeTable
:data="treeData"
:onDrag="onTreeDataChange"
:fixed="true"
:height="300"
:isdraggable="true"></dragTreeTable>
```

```javascript
<script>
import dragTreeTable from "dragTreeTable";

export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [],
        lists: [],
        custom_field: {
          id: 'id',
          order: 'sort',
          lists: 'children',
          parent_id: 'parent_id'
        }
      }
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    // list:更新后的数据源
    // from: 当前被拖拽的行
    // to: 目标拖拽行
    // where: 拖拽的类型，top（上面）、center（里面）、bottom（下面）
    onTreeDataChange(list, from, to, where) {
      console.log(from, to, where);
      this.treeData.lists = list;
    }
  }
};
</script>


 ```
 custom_field 可选项，支持自定义字段名，如lists改为children

isdraggable:默认true，如不想拖拽可手动添加

fixed: 默认false，如果想固定表头，可以设置true，并设置高度height(必须)

height: 表格高度，当fixed为true时必需
 > 数据源（lists）配置   

参数|可选值|描述
---|:--:|---:
id|String|唯一标志
parent_id|String|父节点ID
order|Number|排序,0开始,onDrag后order会重置
name|String|默认显示内容
open|Boolean（非必须）|true展开,false收起(默认收起)
lists|Array|子节点
isShowCheckbox|Boolean|控制CheckBox列某些行是否显示CheckBox

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
    "isShowCheckbox": false, '如果设置了type=checkbox,但是想控制某些行不显示CheckBox，可以用此属性'
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
type|'selection', 'actions', 'checkbox'|selection会显示折叠图标，actions指操作栏, checkbox支持多选全选,不选默认普通展示
title|String|表格标题
field|String|单元格内容取值使用
width|Number|单元格宽度
flex|Number|自动填充空余区域，遵循CSS的flex布局
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
    type: 'checkbox',
    isContainChildren: true, //是否勾选子节点，默认false
    onChange: this.onCheck, // parmas selectRows
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
