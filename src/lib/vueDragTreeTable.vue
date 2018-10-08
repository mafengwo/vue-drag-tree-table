<template>
    <div class="drag-tree-table">
        <div class="drag-tree-table-header">
          <column
            v-for="(item, index) in lists.columns"
            :width="item.width"
            :key="index" >
            {{item.title}}
          </column>
        </div>
        <div class="drag-tree-table-body" @dragover="draging" @dragend="drop">
          <row depth="0" :columns="lists.columns"
            :model="item" v-for="(item, index) in lists.data" :key="index">
        </row>
        </div>
        
    </div>
</template>

<script>
  import row from './row.vue'
  import column from './column.vue'
  import space from './space.vue'
  function getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　}
　　function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　}
  export default {
    name: "VueDragTreeTable",
    components: {
        row,
        column,
        space
    },
    props: ['lists'],
    data() {
      return {
        treeData: [],
        dragX: 0,
        dragY: 0,
        dragId: '',
        targetId: '',
        whereInsert: ''
      }
    },
    methods: {
      onDetail(item) {
        this.$bus.$emit('onDetail', item)
      },
      onEdit(item) {
        this.$bus.$emit('onEdit', item)
      },
      onDelete(item) {
        this.$bus.$emit('onDelete', item)
      },
      onAdd(item) {
          this.$bus.$emit('onAdd', item)
      },
      draging(e) {
        if (e.pageX == this.dragX && e.pageY == this.dragY) return
        this.dragX = e.pageX
        this.dragY = e.pageY
        this.filter(e.pageX, e.pageY)
      },
      drop(e) {
        this.clearHoverStatus()
        this.resetTreeData()
      },
      filter(x,y) {
        this.clearHoverStatus()
        var rows = document.querySelectorAll('.tree-row')
        this.targetId = undefined
        for(let i=0; i < rows.length; i++) {
          const row = rows[i]
          const rx = getElementLeft(row);
          const ry = getElementTop(row);
          const rw = row.clientWidth;
          const rh = row.clientHeight;
          if (x > rx && x < (rx + rw) && y > ry && y < (ry + rh)) {
            const diffY = y - ry
            const hoverBlock = row.children[row.children.length - 1]
            hoverBlock.style.display = 'block'
            const targetId = row.getAttribute('tree-id')
            if (targetId == window.dragId){
              console.log('-------------')
              this.targetId = undefined
              return
            }
            this.targetId = targetId
            let whereInsert = ''
            if (diffY/53 > 3/4) {
              hoverBlock.children[2].style.opacity = 0.5
              whereInsert = 'bottom'
            } else if (diffY/53 > 1/4) {
              hoverBlock.children[1].style.opacity = 0.5
              whereInsert = 'center'
            } else {
              hoverBlock.children[0].style.opacity = 0.5
              whereInsert = 'top'
            }
            this.whereInsert = whereInsert
          }
        }
      },
      clearHoverStatus() {
        var rows = document.querySelectorAll('.tree-row')
        for(let i=0; i < rows.length; i++) {
          const row = rows[i]
          const hoverBlock = row.children[row.children.length - 1]
          hoverBlock.style.display = 'none'
          hoverBlock.children[0].style.opacity = 0.1
          hoverBlock.children[1].style.opacity = 0.1
          hoverBlock.children[2].style.opacity = 0.1
        }
      },
      resetTreeData() {
        if (this.targetId === undefined) return 
        console.log(window.dragId, this.targetId, this.whereInsert)
        const newList = []
        const curList = this.lists
        const _this = this
        function pushData(curList, needPushList) {
          for( let i = 0; i < curList.length; i++) {
            const item = curList[i]
            var obj = {
              "id": item.id,
              "parent_id": item.parent_id,
              "order": item.order,
              "name": item.name,
              "icon": item.icon,
              "uri": item.uri,
              "open": item.open,
              "lists": []
            }
           
            if (_this.targetId == item.id) {
              const curDragItem = _this.getCurDragItem(_this.lists, window.dragId)
              if (_this.whereInsert === 'top') {
                curDragItem.parent_id = item.parent_id
                needPushList.push(curDragItem)
                needPushList.push(obj)
              } else if (_this.whereInsert === 'center'){
                curDragItem.parent_id = item.id
                console.log(11)
                obj.lists.push(curDragItem)
                needPushList.push(obj)
              } else {
                curDragItem.parent_id = item.parent_id
                needPushList.push(curDragItem)
                needPushList.push(obj)
              }
            } else {
              if (dragId != item.id)
                needPushList.push(obj)
            }
            
            if (item.lists.length) {
              pushData(item.lists, obj.lists)
            }
          }
        }
        pushData(curList, newList)
        console.log(newList)
        this.$emit('onChange', newList)
      },
      deepClone (obj) {
        var newobj = obj.constructor === Array ? [] : {};
        if(typeof obj !== 'object'){
            return;
        }
        for(var i in obj){
           newobj[i] = typeof obj[i] === 'object' ?
           this.deepClone(obj[i]) : obj[i];
        }
        return newobj
      },
      getCurDragItem(lists, id) {
        var curItem = null
        var _this = this
        function getchild(curList) {
          for( let i = 0; i < curList.length; i++) {
            var item = curList[i]
            if (item.id == id) {
              curItem = _this.deepClone(item)
              break
            } else if (item.lists.length) {
              getchild(item.lists)
            }
          }
        }
        getchild(lists)
        return curItem;
      }
    }
  }
</script>

<style>
.drag-tree-table{
  margin: 20px 0;
  color: #606266;
}
.drag-tree-table-header{
  display: flex;
  padding: 15px 10px;
  background: #f5f7fa;
  height: 36px;
  line-height: 36px;
  box-sizing: content-box;
  font-weight: 600;
}
.tree-icon-hidden{
  visibility: hidden;
}
</style>
