<template>
        <div class="tree-block" draggable @dragstart="dragstart($event)"
            @dragend="dragend($event)">
            <div class="tree-row" 
                @click="toggle" 
                :tree-id="model.id"
                :tree-p-id="model.parent_id"> 
                <column
                    v-for="(subItem, subIndex) in columns"
                    :field="subItem.field"
                    :width="subItem.width"
                    :key="subIndex">
                    <span v-if="subItem.type === 'selection'">
                        <space depth="0"/>
                        <span 
                            v-if = "model.lists && model.lists.length"
                            v-bind:class="model.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'">
                        </span>
                        <span v-else class="el-icon-caret-bottom tree-icon-hidden"></span>
                        <span class="filed-text">{{model[subItem.field]}}</span>
                        
                    </span>
                    <span v-else-if="subItem.type === 'action'">
                        <span class="action-btn"
                            v-for="(acItem, acIndex) in subItem.actions"
                            :key="acIndex"
                            type="text" size="small" 
                            @click.stop.prevent="acItem.onclik(model)">
                            {{acItem.text}}
                        </span>
                    </span>
                    <span v-else class="filed-text" >
                        {{model[subItem.field]}}
                    </span>
                </column>
                <div class="hover-model" style="display: none">
                    <div class="hover-block prev-block">
                        <i class="el-icon-caret-top"></i>
                    </div>
                    <div class="hover-block center-block">
                        <i class="el-icon-caret-right"></i>
                    </div>
                    <div class="hover-block next-block">
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                </div>
            </div>
            <row 
                v-show="model.open"
                v-for="(item, index) in model.lists" 
                :model="item"
                :columns="columns"
                :key="index" 
                :depth="depth * 1 + 1"
                v-if="isFolder">
            </row>
        </div>
        
    </template>
    <script>
    import column from './column.vue'
    import space from './space.vue'
    export default {
      name: 'row',
        props: ['model','depth','columns'],
        data() {
            return {
                open: false,
                visibility: 'visible'
            }
        },
        components: {
          column,
          space
        },
        computed: {
            isFolder() {
                return this.model.lists && this.model.lists.length
            }
        },
        methods: {
            toggle() {
                if(this.isFolder) {
                    this.model.open = !this.model.open
                }
            },
            dragstart(e) {
                window.dragId = e.target.children[0].getAttribute('tree-id')
                e.target.style.opacity = 0.2
            },
            dragend(e) {
                e.target.style.opacity = 1;
                
            }
        },
        mounted() {
        }
    }
    </script>
    <style lang="scss">
    .tree-block{
      width: 100%;
      background: rgba(255,255,255,0.8)
    }
    .tree-row{
      position: relative;
      display: flex;
      padding: 10px 10px;
      border-bottom: 1px solid #eee;
      line-height: 32px;
      &:hover{
          background: #ecf5ff
      }
    }
    .hover-model{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.6);
    }
    .hover-block{
        display: flex;
        opacity: 0.1;
        transition: opacity 0.5s;
        justify-content: center;
        align-items: center;
        i{
            color: #FFF;
        }
    }
    .prev-block{
        height: 25%;
        background: #a0c8f7;
    }
    .center-block{
        height: 50%;
        background: #a0c8f7;
    }
    .next-block{
        height: 25%;
        background: #a0c8f7;
    }
    .action-btn{
        color: #409EFF;
        font-size: 14px;
        font-style: normal;
        cursor: pointer;
    }
    .filed-text{
        vertical-align: middle;
    }
    .el-icon-caret-bottom{
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAACFElEQVRoQ+1WPYsTURQ9Z1gQQQhY2toIQdCtZiYqsdZKOwW19QeIyyKCoAj7A8R2Be20EWvR4t2pVkEGbGwthRBBIuy7MksWsmrWvHdflMU35XDPuefjvUmIA/7wgOtHNvCvG8wN5AaMCeQjZAzQDM8NmCM0EuQGjAGa4bkBc4RGgv+vgeFwuDKZTB4COA1gxRjgDpzktvf+3Xg8Xm/b9nsIZ3ADVVWtkewMJH9UdV1EgrhjDGySvJZcPQBV3RSRGyHcwQYGg8FZ7/0bksHY/YSpqgI4IyJuqQY68qqq7pK8F7Jogdk7zrkHC8ztGYlNkXVdvwRwIXThnPlXzrmLMVyxBtDv94/0er33AI7HLJ7BfBqNRqfatv0awxNtYHqUTgDYInk4ZrmqfgOwKiIfY/A7n+BY4C6uLMtLRVE8j+Hx3l9umuZFDHYXYzYwbWKD5K1AIRvOuduBmF/GkxgAUFRV9ZrkuUUEqepbETkPwC8yv99MKgPdp/UoyQ8Ajv1B1GdVPSkiX6zik9yBWRFlWa4WRdH9EB2aI27iva+bptlKIT65gel9uELy6e8EqupVEXmWSvxSDHSkdV0/AnBzVqiqPhaRPe9SGEl2B34S013q+ySvd3+5VfWJiKwB2E4hepZjWQZS65zLlw38tajnLMoN5AaMCeQjZAzQDM8NmCM0EuQGjAGa4bkBc4RGgtyAMUAz/AeK1okx6YB/WQAAAABJRU5ErkJggg==") no-repeat center;
        background-size: cover;
        vertical-align: middle;
    }
    .el-icon-caret-right{
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABqElEQVRoQ+2XvUoDURCFZ4KQZ/AN7ATTbFKl1UYrGysx2IithYiNP42PkHSp7AWtLOdmCQFBt7SztciCyBqyI4EVgijJ7skPAzf1PbvnO+fe3Fkm4z827p88wLIb9A34BsAE/BYCA4TlvgE4QvABvoFKpbJaLpebqvpBRJfOuWcw1FxyuIFqtdpi5oPRW1X1i5kbItLO5QJYPAuAHjNv/PLQ6vf7R1EUfQHeppLCALVa7YmI1v94W284HO6EYfg2lZOCi+YJMNpS78y8KyKPBf1NlM0VIDsXKTOfi8jVRDcFFswd4MeTqt6laboXhmFcwOe/koUBZA5eB4PBdrfbjWYFsWiA0bn4VNX9TqdzOwuIhQOMbakb59wJCrE0gMz4oYg0EYilAqjqvXNuyzLAg3Nu0ywAEdndQqpq8xBb/xu1e5GZHSVU1e4wZ32cNvNB44goGL+MVLUdx3HDxCdlEAQXpVLpLANIiOgYnW/y3MzwLFSv11eSJDklojVmvhaRlzwG0LUwAGoA1XsANEFU7xtAE0T1vgE0QVTvG0ATRPW+ATRBVG++gW/3mdcxxX/11wAAAABJRU5ErkJggg==") no-repeat center;
        background-size: cover;
        vertical-align: middle;
    }
    </style>
    