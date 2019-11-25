<template>
  <div id="app">
    <button @click="zipAll">全部折叠</button>
    <button @click="openAll">全部打开</button>
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" ref="table"></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
import demoDataList from './data';
export default {
  name: "delete",
  data() {
    return {
      treeData: {
        columns: [],
        lists: []
      }
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    onTreeDataChange(list) {
      console.log(list);
      this.treeData.lists = list;
    },
    openAll() {
      this.$refs.table.OpenAll();
    },
    zipAll() {
      this.$refs.table.ZipAll()
    }
  },
  mounted() {
    var columns = [
      {
        type: "selection",
        title: "菜单名称",
        field: "name",
        width: 200,
        align: "left",
        titleAlign: "left"
      },
      {
        title: "操作",
        type: "action",
        width: 150,
        align: "center",
        actions: [
          {
            text: "删除",
            onclick: (row)=> {
              const updatedLists = this.$refs.table.DelById(row.id)
              console.log("当前行的数据" , updatedLists);
              this.treeData.lists = updatedLists;
              alert('本地删除成功')
            },
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
