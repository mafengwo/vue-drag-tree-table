<template>
  <div id="app">
  <vueDragTreeTable :lists="treeData" @onChange="onTreeDataChange"></vueDragTreeTable>
  </div>
</template>

<script>
import vueDragTreeTable from './lib/vueDragTreeTable.vue';
export default {
  name: 'app',
  data () {
    return {
      treeData: {
        columns: [],
        data: []
      }
    }
  },
  components: {
      vueDragTreeTable
  },
  methods: {
    onTreeDataChange() {

    },
    onEdit(item) {
        console.log('编辑', item)
      },
      onDetail(item){
        console.log('详情', item)
      },
      onDelete(item) {
        console.log('删除', item)
      },
      onAdd(item){
        console.log('添加', item)
      },
      formatTree(list) {
        for( let i = 0; i < list.length; i++) {
            var item = list[i]
            item.open = true
            if (item.lists.length) {
              this.formatTree(item.lists)
            }
          }
      },
  },
  mounted() {
    var columns = [
            {
              type: 'selection',
              title: '菜单名称',
              field: 'name',
              width: '200',
              align: 'left'
            },
            {
              title: '图标',
              field: 'icon',
              width: '100',
              align: 'left'
            },
            {
              title: '链接',
              field: 'uri',
              width: '200',
              align: 'left'
            },
            {
              title: '操作',
              type: 'action',
              width: '350',
              align: 'left',
              actions: [
                {
                  text: '查看',
                  onclik: this.onDetail
                },{
                  text: '编辑',
                  onclik: this.onEdit
                },{
                  text: '添加',
                  onclik: this.onAdd
                },{
                  text: '删除',
                  onclik: this.onDelete
                }
              ]
            },
          ]
          this.treeData = {
            columns: columns,
            data: [
              {
                "id":40,
                "parent_id":0,
                "order":0,
                "name":"\u9996\u9875",
                "icon":"",
                "uri":"",
                "open":true,
                "lists":[]
              },{
                "id":5,
                "parent_id":0,
                "order":1,
                "name":"\u83dc\u5355",
                "icon":"",
                "uri":"",
                "assign":1,
                "open":true,
                "lists":[
                  {
                    "id":12,
                    "parent_id":5,
                    "open":true,
                    "order":0,
                    "name":"\u83dc\u5355\u7ba1\u7406",
                    "icon":"",
                    "uri":"\/menu\/menuManagement",
                    "assign":1,
                    "lists":[]
                  }
                ]
              },
              {
                "id":19,
                "parent_id":0,
                "order":2,
                "name":"\u6743\u9650\u7ba1\u7406",
                "icon":"",
                "uri":"",
                "open":true,
                "assign":1,
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
  color: #42b983;
}
</style>
