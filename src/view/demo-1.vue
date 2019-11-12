<template>
  <div id="app">
    <dragTreeTable :data="treeData" :onDrag="onTreeDataChange"></dragTreeTable>
  </div>
</template>

<script>

import dragTreeTable from '../lib/dragTreeTable.vue';
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
      console.log(list)
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
                      align: 'left',
                      formatter: (item) => {
                        return '<span>'+item.name+'</span>'
                      }
                    },
                    {
                      title: '链接',
                      field: 'uri',
                      width: 200,
                      align: 'center',
                      flex: 1
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
                            return '<i>查看角色 </i>'
                          }
                        },
                        {
                          text: '编辑',
                          onclick: this.onEdit,
                          formatter: (item) => {
                            return '<i>编辑</i>'
                          }
                        }
                      ]
                    },
                  ]
    this.treeData = {
            columns: columns,
            lists: [{"id":110,"parent_id":0,"order":0,"name":"客户管理","icon":"fa-handshake-o","flag":"","uri":"","assign":1,"lists":[{"id":201,"parent_id":110,"order":0,"name":"联系人","icon":"fa-users","flag":"customer.contacts.get","uri":"/customer/contacts","assign":1,"lists":null,"deep":2,"open":true},{"id":173,"parent_id":110,"order":1,"name":"客户","icon":"fa-list","flag":"customer.customerList.get","uri":"/customer/customerList","assign":1,"lists":null,"deep":2,"open":true},{"id":117,"parent_id":110,"order":2,"name":"客户维护记录","icon":"fa-phone","flag":"customer.maintain.get","uri":"/customer/maintain","assign":1,"lists":null,"deep":2,"open":true},{"id":383,"parent_id":110,"order":3,"name":"客户冲突","icon":"fa-fire","flag":"","uri":"","assign":1,"lists":[{"id":390,"parent_id":383,"order":0,"name":"个人冲突","icon":"fa-telegram","flag":"customer.personalConflict.get","uri":"/customer/personalConflict","assign":1,"lists":null,"deep":3,"open":true},{"id":397,"parent_id":383,"order":1,"name":"团队冲突","icon":"fa-users","flag":"customer.teamConflict.get","uri":"/customer/teamConflict","assign":1,"lists":null,"deep":3,"open":true},{"id":215,"parent_id":383,"order":2,"name":"客户查询","icon":"fa-search","flag":"customer.inquiry.get","uri":"/customer/inquiry","assign":1,"lists":null,"deep":3,"open":true}],"deep":2,"open":true},{"id":138,"parent_id":110,"order":4,"name":"线索管理","icon":"fa-ravelry","flag":"customer.clue.get","uri":"/customer/clue","assign":1,"lists":null,"deep":2,"open":true},{"id":159,"parent_id":110,"order":5,"name":"集团信息","icon":"fa-users","flag":"customer.agent.get","uri":"/customer/agent","assign":1,"lists":null,"deep":2,"open":true}],"deep":1,"open":true},{"id":404,"parent_id":0,"order":1,"name":"审核中心","icon":"fa-modx","flag":"","uri":"","assign":1,"lists":[{"id":187,"parent_id":404,"order":0,"name":"资质审核","icon":"fa-address-book-o","flag":"customer.qualifications.get","uri":"/customer/qualifications","assign":1,"lists":null,"deep":2,"open":true}],"deep":1,"open":true},{"id":306,"parent_id":0,"order":2,"name":"数据统计","icon":"fa-area-chart","flag":"","uri":"","assign":1,"lists":[{"id":222,"parent_id":306,"order":0,"name":"线索","icon":"fa-address-book-o","flag":"customer.clueStatistics.get","uri":"/customer/clueStatistics","assign":1,"lists":null,"deep":2,"open":true},{"id":124,"parent_id":306,"order":1,"name":"客户","icon":"fa-pie-chart","flag":"customer.statistics.get","uri":"/customer/statistics","assign":1,"lists":null,"deep":2,"open":true}],"deep":1,"open":true},{"id":334,"parent_id":0,"order":3,"name":"基础数据","icon":"fa-th-large","flag":"","uri":"","assign":1,"lists":[{"id":152,"parent_id":334,"order":0,"name":"行业信息","icon":"fa-suitcase","flag":"customer.industry.get","uri":"/customer/industry","assign":1,"lists":null,"deep":2,"open":true},{"id":166,"parent_id":334,"order":1,"name":"客户部门","icon":"fa-bandcamp","flag":"customer.departmentType.get","uri":"/customer/departmentType","assign":1,"lists":null,"deep":2,"open":true}],"deep":1,"open":true},{"id":9,"parent_id":0,"order":4,"name":"系统管理","icon":"fa-server","flag":"","uri":"","assign":1,"lists":[{"id":313,"parent_id":9,"order":0,"name":"员工管理","icon":"fa-user","flag":"rbac.userManagement.get","uri":"/rbac/userManagement","assign":1,"lists":null,"deep":2,"open":true},{"id":320,"parent_id":9,"order":1,"name":"部门管理","icon":"fa-users","flag":"rbac.departmentManagement.get","uri":"/rbac/departmentManagement","assign":1,"lists":null,"deep":2,"open":true},{"id":23,"parent_id":9,"order":2,"name":"角色管理","icon":"fa-users","flag":"rbac.roleManagement.get","uri":"/rbac/roleManagement","assign":1,"lists":null,"deep":2,"open":true},{"id":16,"parent_id":9,"order":3,"name":"权限管理","icon":"fa-ban","flag":"rbac.authorityManagement.get","uri":"/rbac/authorityManagement","assign":1,"lists":null,"deep":2,"open":true},{"id":2,"parent_id":9,"order":4,"name":"菜单管理","icon":"fa-bars","flag":"menu.menuManagement.get","uri":"/menu/menuManagement","assign":1,"lists":null,"deep":2,"open":true},{"id":107,"parent_id":9,"order":5,"name":"操作日志","icon":"fa-file","flag":"operation.log.get","uri":"/operation/log","assign":1,"lists":null,"deep":2,"open":true}],"deep":1,"open":true}]
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
