<template>
  <div id="app">
    <h2>客户这一行（第三行）不允许拖拽离开</h2>
    <h2>联系人（第二行）这一行不允许拖拽进入</h2>
    <dragTreeTable
      :data="treeData"
      :onDrag="onTreeDataChange"
      :beforeDragOver="beforeDragOver">
    </dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "../lib/dragTreeTable.vue";
import demoDataList from './data';
export default {
  name: "disable-row-drag",
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
    beforeDragOver(from, to, where) {
      if (from.name == '客户') return false
      if (to.name == '联系人') return false
      return true
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
        title: "链接",
        field: "uri",
        width: 200,
        align: "right",
        titleAlign: "right"
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
