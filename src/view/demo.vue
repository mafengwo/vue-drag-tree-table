<template>
  <div id="app">
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" resize></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
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
    dragTreeTable
  },
  methods: {
    onTreeDataChange(list) {
      console.log(list);
      this.treeData.lists = list;
    },
    onEdit(item) {
      alert("当前行的数据" + JSON.stringify(item));
    },
    onDetail(item) {
      alert("当前行的数据" + JSON.stringify(item));
    }
  },
  mounted() {
    var columns = [
      {
        type: "checkbox",
        width: 100,
        align: "center"
      },
      {
        type: "selection",
        title: "菜单名称",
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
            text: "查看角色",
            onclick: this.onDetail,
            formatter: item => {
              return "<i>查看角色 </i>";
            }
          },
          {
            text: "编辑",
            onclick: this.onEdit,
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

<style lang="scss">

</style>
