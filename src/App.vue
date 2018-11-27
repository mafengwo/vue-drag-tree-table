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
                            return '<i>查看角色</i>'
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
            lists: [
             {
               "id":40,
               "parent_id":0,
               "order":0,
               "name":"动物类",
               "uri":"/masd/ds",
               "open":true,
               "lists":[]
             },{
               "id":5,
               "parent_id":0,
               "order":1,
               "name":"昆虫类",
               "uri":"/masd/ds",
               "open":true,
               "lists":[
                 {
                   "id":12,
                   "parent_id":5,
                   "open":true,
                   "order":0,
                   "name":"蚂蚁",
                   "uri":"/masd/ds",
                   "lists":[]
                 },
                 {
                   "id":13,
                   "parent_id":5,
                   "open":true,
                   "order":0,
                   "name":"蜜蜂",
                   "uri":"/masd/ds",
                   "lists":[]
                 }
               ]
             },
             {
               "id":19,
               "parent_id":0,
               "order":2,
               "name":"植物类",
               "uri":"/masd/ds",
               "open":true,
               "lists":[]
             }
            ]
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
