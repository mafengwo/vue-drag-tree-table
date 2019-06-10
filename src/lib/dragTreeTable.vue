<template>
    <div class="drag-tree-table" ref="table">
        <div class="drag-tree-table-header">
          <column
            v-for="(item, index) in data.columns"
            :width="item.width"
            :flex="item.flex"
            :key="index" >
            <input 
              v-if="item.type == 'checkbox'"
              class="checkbox"
              type="checkbox"
              @click="onCheckAll($event, item.onChange)">
            <span v-else>
              {{item.title}}
            </span>
          </column>
        </div>
        <div class="drag-tree-table-body"
          v-bind:style="bodyStyle"
          @dragover="draging"
          @dragend="drop"
          :class="isDraing ? 'is-draging' : '' ">
          <row depth="0" :columns="data.columns" :isdraggable="isdraggable"
            :model="item"
            v-for="(item, index) in data.lists"
            :custom_field="custom_field"
            :onCheck="onSingleCheckChange"
            :isContainChildren="isContainChildren"
            :key="index">
        </row>
        </div>
    </div>
</template>

<script>
  import row from './row.vue'
  import column from './column.vue'
  import space from './space.vue';
  import func from './func';

  document.body.ondrop = function (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  export default {
    name: "dragTreeTable",
    components: {
        row,
        column,
        space
    },
    computed: {
      bodyStyle(){
        return {
          overflow: this.fixed ? 'auto': 'hidden',
          height: this.fixed ? this.height + 'px' : 'auto'
        }
      }
    },
    props: {
      isdraggable: {
        type: Boolean,
        default: true
      },
      data: Object,
      onDrag: Function,
      fixed: {
        type: Boolean,
        default: false
      },
      height: Number
    },
    data() {
      return {
        dragX: 0,
        dragY: 0,
        dragId: '',
        targetId: '',
        whereInsert: '',
        isDraing: false,
        custom_field: {
          id: 'id',
          parent_id: 'parent_id',
          order: 'order',
          lists: 'lists',
          open: 'open',
          checked: 'checked'
        },
        onCheckChange: null,
        isContainChildren: false
      }
    },
    methods: {
      draging(e) {
        this.isDraing = true;
        if (e.pageX == this.dragX && e.pageY == this.dragY) return
        this.dragX = e.pageX
        this.dragY = e.pageY
        this.filter(e.pageX, e.pageY)
        if (e.clientY < 100) {
          window.scrollTo(0, scrollY - 6)
        } else if (e.clientY > (document.body.clientHeight - 160)) {
          window.scrollTo(0, scrollY + 6)
        }
      },
      drop(event) {
        func.clearHoverStatus()
        this.resetTreeData()
        this.isDraing = false;
      },
      // 查找匹配的行，处理拖拽样式
      filter(x,y) {
        var rows = document.querySelectorAll('.tree-row')
        this.targetId = undefined
        const dragOriginElementTop = func.getElementTop(dragParentNode, this.$refs.table)
        const dragOriginElementLeft = func.getElementLeft(dragParentNode)
        const dragW = dragOriginElementLeft + dragParentNode.clientWidth
        const dragH = dragOriginElementTop + dragParentNode.clientHeight
        if (x >= dragOriginElementLeft && x <= dragW && y >= dragOriginElementTop && y <= dragH) {
          // 当前正在拖拽原始块不允许插入
          return
        }
        for(let i=0; i < rows.length; i++) {
          const row = rows[i]
          const rx = func.getElementLeft(row);
          const ry = func.getElementTop(row, this.$refs.table);
          const rw = row.clientWidth;
          const rh = row.clientHeight;
          if (x > rx && x < (rx + rw) && y > ry && y < (ry + rh)) {
            const diffY = y - ry
            const hoverBlock = row.children[row.children.length - 1]
            hoverBlock.style.display = 'block'
            this.targetId = row.getAttribute('tree-id')
            let whereInsert = ''
            var rowHeight = row.offsetHeight
              if (diffY/rowHeight > 3/4) {
              if (hoverBlock.children[2].style.opacity !== '0.5') {
                func.clearHoverStatus()
                hoverBlock.children[2].style.opacity = 0.5
              }
              whereInsert = 'bottom'
            } else if (diffY/rowHeight > 1/4) {
              if (hoverBlock.children[1].style.opacity !== '0.5') {
                func.clearHoverStatus()
                hoverBlock.children[1].style.opacity = 0.5
              }
              whereInsert = 'center'
            } else {
              if (hoverBlock.children[0].style.opacity !== '0.5') {
                func.clearHoverStatus()
                hoverBlock.children[0].style.opacity = 0.5
              }
              whereInsert = 'top'
            }
            this.whereInsert = whereInsert
          }
        }
      },
      resetTreeData() {
        if (this.targetId === undefined) return
        const listKey = this.custom_field.lists
        const parentIdKey = this.custom_field.parent_id
        const idKey = this.custom_field.id

        const newList = [];
        const curList = this.data.lists;
        const _this = this;
        let curDragItem = null;
        let taggetItem = null;
        function pushData(curList, needPushList) {
          for( let i = 0; i < curList.length; i++) {
            const item = curList[i]
            var obj = func.deepClone(item)
            obj[listKey] = []
            if (_this.targetId == item[idKey]) {
              curDragItem = _this.getItemById(_this.data.lists, window.dragId);
              taggetItem =  _this.getItemById(_this.data.lists, _this.targetId);
              if (_this.whereInsert === 'top') {
                curDragItem[parentIdKey] = item[parentIdKey]
                needPushList.push(curDragItem)
                needPushList.push(obj)
              } else if (_this.whereInsert === 'center'){
                curDragItem[parentIdKey] = item[idKey]
                obj[listKey].push(curDragItem)
                needPushList.push(obj)
              } else {
                curDragItem[parentIdKey] = item[parentIdKey]
                needPushList.push(obj)
                needPushList.push(curDragItem)
              }
            } else {
              if (window.dragId != item[idKey]){
                needPushList.push(obj)
              }
            }
            if (item[listKey] && item[listKey].length) {
              pushData(item[listKey], obj[listKey])
            }
          }
        }
        pushData(curList, newList)
        this.resetOrder(newList)
        this.onDrag(newList, curDragItem, taggetItem, _this.whereInsert)
      },
      // 重置所有数据的顺序order
      resetOrder(list) {
        const listKey = this.custom_field.lists;
        for (var i = 0; i< list.length; i++) {
            list[i][this.custom_field.order] = i;
            if (list[i][listKey] && list[i][listKey].length) {
                this.resetOrder(list[i][listKey])
            }
        }
      },
      // 根据id获取当前行
      getItemById(lists, id) {
        var curItem = null
        const listKey = this.custom_field.lists
        const idKey = this.custom_field.id
        function getchild(curList) {
          for( let i = 0; i < curList.length; i++) {
            var item = curList[i]
            if (item[idKey] == id) {
              curItem = JSON.parse(JSON.stringify(item))
              break
            } else if (item[listKey] && item[listKey].length) {
              getchild(item[listKey])
            }
          }
        }
        getchild(lists)
        return curItem;
      },
      // 全选按钮事件
      onCheckAll(evt, func) {
        this.setAllCheckData(this.data.lists, !!evt.target.checked);
        const checkedList = this.getCheckedList(this.data.lists)
        func && func(checkedList)
      },
      // 单个CheckBox勾选触发
      onSingleCheckChange() {
        const checkedList = this.getCheckedList(this.data.lists)
        this.onCheckChange && this.onCheckChange(checkedList)
      },
      // 根据flag批量处理数据
      setAllCheckData (curList, flag) {
        const listKey = this.custom_field.lists;
        for( let i = 0; i < curList.length; i++) {
          var item = curList[i];
          this.$set(item, 'checked', flag);
          if (item[listKey] && item[listKey].length) {
            this.setAllCheckData(item[listKey], flag);
          }
        }
      },
      // 获取所有选中的行
      getCheckedList(lists) {
        const listKey = this.custom_field.lists;
        var checkedList = [];
        const deepList = func.deepClone(lists)
        function getchild(curList) {
          for( let i = 0; i < curList.length; i++) {
            var item = curList[i]
            if (item.checked && item.isShowCheckbox != false) {
              checkedList.push(item)
            }
            if (item[listKey] && item[listKey].length) {
              getchild(item[listKey])
            }
          }
        }
        getchild(deepList)
        return checkedList;
      },
    },
    mounted() {
      if(this.data.custom_field) {
        this.custom_field = Object.assign({}, this.custom_field, this.data.custom_field)
      }
      setTimeout(() => {
        this.data.columns.map((item) => {
          if(item.type == 'checkbox') {
            this.onCheckChange = item.onChange;
            this.isContainChildren = item.isContainChildren;
          }
        })
      }, 100);      
    }
  }
</script>

<style lang="scss">
  .drag-tree-table{
    margin: 20px 0;
    color: #606266;
    font-size: 12px;
  }
  .drag-tree-table-header{
    display: flex;
    padding: 15px 10px;
    background: #f5f7fa;
    height: 66px;
    line-height: 36px;
    box-sizing: border-box;
    font-weight: 600;
  }
  .tree-icon-hidden{
    visibility: hidden;
  }
  .is-draging .tree-row:hover{
    background: transparent !important;
  }
</style>
