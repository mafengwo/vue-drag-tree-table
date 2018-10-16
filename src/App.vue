<template>
  <div id="app">
  <dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
  </div>
</template>

<script>

import dragTreeTable from './lib/dragTreeTable.vue';
export default {
  name: 'app',
  data () {
    return {
      treeData: {
        columns: [],
        lists: []
      }
    }
  },
  components: {
      dragTreeTable
  },
  methods: {
    onTreeDataChange(list) {
      this.treeData.lists = list
    },
    onEdit(item) {
        console.log('编辑', item)
      },
      onDetail(item){
        console.log('详情', item)
      }
  },
  mounted() {
    var columns = [
            {
              type: 'selection',
              title: '菜单名称',
              field: 'name',
              width: 200,
              align: 'center',
              formatter: (item) => {
                console.log('查看角色', item)
                return '<span>'+item.name+'</span>'
              }
            },
            {
              title: '链接',
              field: 'uri',
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
                    console.log('查看角色', item)
                    return '<i>查看角色</i>'
                  }
                },
                {
                  text: '编辑',
                  onclick: this.onEdit,
                  formatter: (item) => {
                    console.log('编辑', item)
                    return '<i>编辑</i>'
                  }
                }
              ]
            },
          ]
          this.treeData = {
            columns: columns,
            lists: [{"id":1,"parent_id":0,"order":0,"name":"\u9996\u9875","icon":"fa-bars","flag":"","uri":"\/dashboard","assign":1,"lists":[]},{"id":7,"parent_id":0,"order":0,"name":"\u6d4b\u8bd5\u83dc\u535501","icon":"fa-address-book-o","flag":"","uri":"","assign":1,"lists":[{"id":10,"parent_id":7,"order":0,"name":"\u6d4b\u8bd5\u83dc\u535501-01","icon":"fa-bandcamp","flag":"test01.01","uri":"","assign":1,"lists":[]}]},{"id":2,"parent_id":0,"order":1,"name":"\u6743\u9650\u83dc\u5355","icon":"fa-lock","flag":"","uri":"","assign":1,"lists":[{"id":3,"parent_id":2,"order":0,"name":"\u540e\u53f0\u7528\u6237","icon":"fa-user","flag":"rbac.userManagement","uri":"\/rbac\/userManagement","assign":1,"lists":[]},{"id":4,"parent_id":2,"order":1,"name":"\u89d2\u8272\u7ba1\u7406","icon":"fa-users","flag":"rbac.roleManagement.role.get","uri":"\/rbac\/roleManagement","assign":1,"lists":[]},{"id":5,"parent_id":2,"order":2,"name":"\u6743\u9650\u7ba1\u7406","icon":"fa-ban","flag":"rbac.authorityManagement","uri":"\/rbac\/authorityManagement","assign":1,"lists":[]},{"id":6,"parent_id":2,"order":3,"name":"\u83dc\u5355\u7ba1\u7406","icon":"fa-bars","flag":"menu.menuManagement","uri":"\/menu\/menuManagement","assign":1,"lists":[]}]}]
          }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
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
