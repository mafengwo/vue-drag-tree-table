<template>
  <div id="app">
    <div id="container">
    <button @click="zipAll">全部折叠</button>
    <button @click="openAll">全部打开</button>
    <button @click="highlight(true)">高亮行</button>
    <button @click="highlight(false)">取消高亮</button>
    <dragTreeTable
      ref="table"
      :data="treeData"
      :onDrag="onTreeDataChange"
      resize
      fixed
      :isdraggable="true">
    </dragTreeTable>
    <Dialog :onSave="onEdit" ref="editDialog"></Dialog>
    <Dialog :onSave="onAdd" ref="addDialog"></Dialog>
    </div>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
import Dialog from "./dialog.vue";
import demoDataList from './data';
export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [],
        lists: []
      }
    };
  },
  components: {
    dragTreeTable,
    Dialog
  },
  methods: {
    onTreeDataChange(list) {
      console.log(list);
      this.treeData.lists = list;
    },
    onAdd(pId, data) {
      this.$refs.table.AddRow(pId, data)
    },
    onEdit(id, data) {
      this.$refs.table.EditRow(id, data)
    },
    openAll() {
      this.$refs.table.OpenAll();
    },
    zipAll() {
      this.$refs.table.ZipAll()
    },
    onDel(item) {
      const updatedLists = this.$refs.table.DelById(item.id)
      console.log("当前行的数据" , updatedLists);
      this.treeData.lists = updatedLists;
      alert('本地删除成功')
    },
    highlight(flag) {
      this.$refs.table.HighlightRow(383, flag, true);
    }
  },
  mounted() {
    var columns = [
      {
        type: "checkbox",
        isContainChildren: true,
        width: 100,
        align: "center",
        onChange: (item)=>{
          console.log(item)
          alert('您选中了'+ item.length + '条数据');
        }
      },
      {
        type: "selection",
        title: "<a>菜单名称</a>",
        field: "name",
        width: 200,
        align: "left",
        titleAlign: "left",
        formatter: item => {
          return "<span>" + item.name + "</span>";
        }
      },
      {
        title: "ID",
        field: "id",
        width: 100,
        align: "center"
      },
      {
        title: "链接",
        field: "uri",
        width: 200,
        align: "center"
      },
      {
        title: "操作",
        type: "action",
        flex: 1,
        align: "center",
        actions: [
          {
            text: "添加子节点",
            onclick: (item) => {
              this.$refs.addDialog.show('add', item.id);
            },
            formatter: item => {
              return "<i>添加子节点 </i>";
            }
          },
          {
            text: "修改子节点",
            onclick: (item) => {
              this.$refs.editDialog.show('edit', item);
            },
            formatter: item => {
              return "<i>修改子节点 </i>";
            }
          },
          
          {
            text: "删除",
            onclick: this.onDel,
            formatter: item => {
              return "<i>删除</i>";
            }
          }
        ]
      }
    ];
    this.treeData = {
      columns: columns,
      lists: demoDataList
    };
  }
};
</script>

<style lang="scss">

</style>
