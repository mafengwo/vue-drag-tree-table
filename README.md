# vue drag tree table

[API文档](https://www.mofazhuan.com/2019/11/14/vue-drag-tree-table%E6%96%87%E6%A1%A3/ "vue-drag-tree-table") | [DEMO](https://www.mofazhuan.com/2019/11/15/vue-drag-tree-table%20Demo/ "vue-drag-tree-table")

IE10+/Chrome/firefox
> 基于vue实现的可以拖拽排序的树形表格   

![drag-tree-table](https://www.mofazhuan.com/demo/demo.gif 'drag-tree-table')

## 安装
npm
``` bashs
npm i drag-tree-table --save-dev
```
script
``` bashs
<script src="./dist/dtree-table.js"></script>
```
## 使用方式

```html
<<template>
  <div id="app">
    <dragTreeTable
      :data="treeData"
      :onDrag="onTreeDataChange"
      fixed
      border>
    </dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "drag-tree-table";
export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [...],
        lists: [...]
      }
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    onTreeDataChange(list) {
      this.treeData.lists = list;
    }
  },
};
</script>

```
更多组件详细功能请参考 [API文档](https://www.npmjs.com/package/drag-tree-table "vue-drag-tree-table")
## 我的微信```cold_daywx```，欢迎沟通
