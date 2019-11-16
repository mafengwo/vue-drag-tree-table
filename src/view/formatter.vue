<template>
  <div id="app">
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
import demoDataList from './data';
export default {
  name: "formatter",
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
            text: "查看角色",
            onclick: (row)=> {
              alert(row.name)
            },
            formatter: item => {
              return "<i>查看角色 </i>";
            }
          },
          {
            text: "编辑",
            onclick: (row)=> {
              alert(row.id)
            },
            formatter: item => {
              return "<i>编辑</i>";
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
