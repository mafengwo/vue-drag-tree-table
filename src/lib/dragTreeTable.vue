<template>
    <div class="drag-tree-table" ref="table" v-bind:class="{border:border !== undefined}">
        <div class="drag-tree-table-header">
          <column
            v-for="(item, index) in data.columns"
            :width="item.width"
            :flex="item.flex"
            :border="border"
            v-bind:class="['align-' + item.titleAlign, 'colIndex' + index]"
            :key="index" >
            <input 
              v-if="item.type == 'checkbox'"
              class="checkbox"
              type="checkbox"
              @click="onCheckAll($event, item.onChange)">
            <span v-else>
              {{item.title}}
            </span>
            <div class="resize-line" @mousedown="mousedown(index, $event)">

            </div>
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
            :border="border"
            :isContainChildren="isContainChildren"
            :key="index">
        </row>
        </div>
        <div class="drag-line">
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
      height: Number,
      border: String,
      onlySameLevelCanDrag: String,
      hightRowChange: String
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
        isContainChildren: false,
        mouse: {
          status: 0,
          startX: 0,
          curColWidth: 0,
          curIndex: 0
        }
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
        
        if (this.targetId !== undefined) {
          if (this.hightRowChange !== undefined) {
            this.$nextTick(()=> {
              var rowEle = document.querySelector("[tree-id='"+window.dragId+"']");
              rowEle.style.backgroundColor = 'rgba(64,158,255,0.5)';
              setTimeout(() => {
                rowEle.style.backgroundColor = 'rgba(64,158,255,0)';
              }, 2000);
            })
          }
        }
      },
      // 查找匹配的行，处理拖拽样式
      filter(x,y) {
        console.log(2222222)
        var rows = document.querySelectorAll('.tree-row')
        this.targetId = undefined
        const dragOriginElementTop = func.getElementTop(window.dragParentNode, this.$refs.table)
        const dragOriginElementLeft = func.getElementLeft(window.dragParentNode)
        const dragW = dragOriginElementLeft + window.dragParentNode.clientWidth
        const dragH = dragOriginElementTop + window.dragParentNode.clientHeight
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
            const pId = row.getAttribute('tree-p-id');
            // 不允许改变层级结构，只能改变上下顺序逻辑
            if ( this.onlySameLevelCanDrag !== undefined && pId !== window.dragPId) {
              return;
            }
            this.targetId = row.getAttribute('tree-id');
            const hoverBlock = row.children[row.children.length - 1]
            hoverBlock.style.display = 'block'
            let whereInsert = ''
            var rowHeight = row.offsetHeight
              if (diffY/rowHeight > 3/4) {
              if (hoverBlock.children[2].style.opacity !== '0.5') {
                func.clearHoverStatus()
                hoverBlock.children[2].style.opacity = 0.5
              }
              whereInsert = 'bottom'
            } else if (diffY/rowHeight > 1/4) {
              if ( this.onlySameLevelCanDrag !== undefined) {
                // 不允许改变层级结构，只能改变上下顺序逻辑
                return;
              }
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
            this.whereInsert = whereInsert;
            break;
          }
        }
        if (this.targetId === undefined) {
          console.log(33333)
          // 匹配不到清空上一个状态
          func.clearHoverStatus();
          let whereInsert = '';
        }
      },
      resetTreeData() {
        console.log(5555, this.targetId)
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
            var obj = func.deepClone(item);
            obj[listKey] = []
            if (_this.targetId == item[idKey]) {
              curDragItem = _this.getItemById(_this.data.lists, window.dragId);
              taggetItem =  _this.getItemById(_this.data.lists, _this.targetId);
              if (_this.whereInsert === 'top') {
                curDragItem[parentIdKey] = item[parentIdKey]
                needPushList.push(curDragItem)
                needPushList.push(obj)
              } else if (_this.whereInsert === 'center'){
                curDragItem[parentIdKey] = item[idKey];
                obj.open = true;
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
      mousedown(curIndex, e){
        const startX = e.target.getBoundingClientRect().x;
        const curColWidth = e.target.parentElement.offsetWidth;
        this.mouse = {
          status: 1,
          startX,
          curIndex,
          curColWidth
        }
      }
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
      window.addEventListener('mouseup', e => {
        if (this.mouse.status) {
          const curX = e.clientX;
          var line = document.querySelector('.drag-line');
          line.style.left = '-10000px';
          this.mouse.status = 0;
          const curWidth = this.mouse.curColWidth;
          const subWidth = curX - this.mouse.startX;
          const lastWidth = curWidth + subWidth;
          const cols = document.querySelectorAll('.colIndex' + this.mouse.curIndex);
          for (let index = 0; index < cols.length; index++) {
            const element = cols[index];
            element.style.width = lastWidth + 'px'; 
          }
          // 更新数据源
          this.data.columns[this.mouse.curIndex].width = lastWidth;
        }
      });     
      window.addEventListener('mousemove', e => {
        if (this.mouse.status) {
          const endX = e.clientX;
          const tableLeft = document.querySelector('.drag-tree-table').getBoundingClientRect().left;
          var line = document.querySelector('.drag-line');
          line.style.left = endX - tableLeft + 'px';
        }
      });     
    }
  }
</script>

<style lang="scss">
  .drag-tree-table{
    position: relative;
    margin: 20px 0;
    color: #606266;
    font-size: 12px;
    &.border{
      border: 1px solid #eee;
      border-right: none;
    }
  }
  .drag-line{
    position:absolute;
    top: 0;
    left: -1000px;
    height: 100%;
    width: 1px;
    background: #ccc;
  }
  .drag-tree-table-header{
    display: flex;
    // padding: 15px 10px;
    background: #f5f7fa;
    height: 66px;
    line-height: 36px;
    box-sizing: border-box;
    font-weight: 600;
    .align-left{
        text-align: left;
    }
    .align-right{
        text-align: right;
    }
    .align-center{
        text-align: center;
    }
    .tree-column{
      user-select: none;
    }
  }
  .tree-icon-hidden{
    visibility: hidden;
  }
  .is-draging .tree-row:hover{
    background: transparent !important;
  }
  .tree-row{
    background-color: rgba(64,158,255,0);
    transition: background-color 1s linear;
  }
</style>
