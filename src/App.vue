<template>
  <div id="app">
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange" :isdraggable="true"></dragTreeTable>
  </div>
</template>

<script>
import dragTreeTable from "./lib/dragTreeTable.vue";
export default {
  name: "app",
  data() {
    return {
      treeData: {
        columns: [],
        children: [],
        custom_field: {
          id: 'id',
          order: 'sort',
          lists: 'children',
          parent_id: 'parent_id'
        },
      }
    };
  },
  components: {
    dragTreeTable
  },
  methods: {
    onTreeDataChange(list) {
      console.log(list);
      this.treeData.children = list;
    },
    onEdit(item) {
      console.log("编辑", item);
    },
    onDetail(item) {
      console.log("详情", item);
    },
    onCheckChange(rows) {
      console.log(rows)
    }
  },
  mounted() {
    this.treeData.columns = [
      {
        type: "checkbox",
        title: "链接",
        field: "uri",
        width: 80,
        align: "center",
        onChange: this.onCheckChange,
        isContainChildren: false // 是否勾选子节点
      },
      {
        type: "selection",
        title: "菜单名称",
        field: "name",
        width: 200,
        align: "left",
        formatter: item => {
          return "<span>" + item.name + "</span>";
        }
      },
      {
        title: "操作",
        type: "action",
        width: 350,
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
    this.treeData.children = [
        {
          id: 110,
          parent_id: 0,
          sort: 0,
          name: "客户管理",
          uri: "",
          checked: true,
          children: [
            {
              id: 201,
              parent_id: 110,
              sort: 0,
              name: "联系人",
              uri: "/customer/contacts",
              children: null
            },
            {
              id: 173,
              parent_id: 110,
              sort: 1,
              name: "客户",
              uri: "/customer/customerList",
              children: null
            },
            {
              id: 117,
              parent_id: 110,
              sort: 2,
              name: "客户维护记录",
              uri: "/customer/maintain",
              children: null
            },
            {
              id: 383,
              parent_id: 110,
              sort: 3,
              name: "客户冲突",
              uri: "",
              children: [
                {
                  id: 390,
                  parent_id: 383,
                  sort: 0,
                  name: "个人冲突",
                  uri: "/customer/personalConflict",
                  children: null
                },
                {
                  id: 397,
                  parent_id: 383,
                  sort: 1,
                  name: "团队冲突",
                  uri: "/customer/teamConflict",
                  children: null
                },
                {
                  id: 215,
                  parent_id: 383,
                  sort: 2,
                  name: "客户查询",
                  uri: "/customer/inquiry",
                  children: null
                }
              ]
            },
            {
              id: 138,
              parent_id: 110,
              sort: 4,
              name: "线索管理",
              uri: "/customer/clue",
              children: null
            },
            {
              id: 159,
              parent_id: 110,
              sort: 5,
              name: "集团信息",
              uri: "/customer/agent",
              children: null
            }
          ]
        },
        {
          id: 404,
          parent_id: 0,
          sort: 1,
          name: "审核中心",
          uri: "",
          children: [
            {
              id: 187,
              parent_id: 404,
              sort: 0,
              name: "资质审核",
              uri: "/customer/qualifications",
              children: null
            }
          ]
        },
        {
          id: 306,
          parent_id: 0,
          sort: 2,
          name: "数据统计",
          uri: "",
          children: [
            {
              id: 222,
              parent_id: 306,
              sort: 0,
              name: "线索",
              uri: "/customer/clueStatistics",
              children: null
            },
            {
              id: 124,
              parent_id: 306,
              sort: 1,
              name: "客户",
              uri: "/customer/statistics",
              children: null
            }
          ]
        },
        {
          id: 334,
          parent_id: 0,
          sort: 3,
          name: "基础数据",
          uri: "",
          children: [
            {
              id: 152,
              parent_id: 334,
              sort: 0,
              name: "行业信息",
              uri: "/customer/industry",
              children: null
            },
            {
              id: 166,
              parent_id: 334,
              sort: 1,
              name: "客户部门",
              uri: "/customer/departmentType",
              children: null
            }
          ]
        },
        {
          id: 9,
          parent_id: 0,
          sort: 4,
          name: "系统管理",
          uri: "",
          children: [
            {
              id: 313,
              parent_id: 9,
              sort: 0,
              name: "员工管理",
              uri: "/rbac/userManagement",
              children: null
            },
            {
              id: 320,
              parent_id: 9,
              sort: 1,
              name: "部门管理",
              uri: "/rbac/departmentManagement",
              children: null
            },
            {
              id: 23,
              parent_id: 9,
              sort: 2,
              name: "角色管理",
              uri: "/rbac/roleManagement",
              children: null
            },
            {
              id: 16,
              parent_id: 9,
              sort: 3,
              name: "权限管理",
              uri: "/rbac/authorityManagement",
              children: null
            },
            {
              id: 2,
              parent_id: 9,
              sort: 4,
              name: "菜单管理",
              uri: "/menu/menuManagement",
              children: null
            },
            {
              id: 107,
              parent_id: 9,
              sort: 5,
              name: "操作日志",
              uri: "/operation/log",
              children: null
            }
          ]
        }
      ]
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #409eff;
}
</style>
