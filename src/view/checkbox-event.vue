<template>
  <div id="app">
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
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
    }
  },
  mounted() {
    var columns = [
      {
        type: "checkbox",
        width: 100,
        align: "center",
        isContainChildren: true, //是否勾选子节点，默认false
        onChange: (selectRows) => {
          alert('一共选择了' + selectRows.length + '条数据')
          console.log(selectRows)
        }
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
        title: "链接",
        field: "uri",
        width: 200,
        align: "center"
      },
      {
        title: "父ID",
        field: "parent_id",
        width: 150,
        align: "center"
      },
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
