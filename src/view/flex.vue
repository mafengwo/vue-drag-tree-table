<template>
  <div id="app">
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" border></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
import demoDataList from './data';
export default {
  name: "flex",
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
        align: "left"
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
        align: "center",
        flex: 1
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
