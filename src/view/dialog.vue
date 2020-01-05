<template>
  <div class="dialog-container" v-show="visbile">
    <label>菜单名称：</label><input type="text" placeholder="菜单名称" ref="name"><br>
    <label>链接：</label><input type="text" placeholder="链接" ref = "uri"><br>
    <label>ID：</label><input type="text" placeholder="ID"  ref="id"><br>
    <button @click="save">保存</button>
    <button @click="cancle">取消</button>
  </div>
</template>

<script>

export default {
  name: "dialog",
  data() {
    return {
      visbile: false,
      id: ''
    };
  },
  props: {
    onSave: Function,
    onCancle: Function
  },
  methods: {
    save(list) {
        var data = {
            name: this.$refs.name.value,
            uri: this.$refs.uri.value,
            id: this.$refs.id.value
        }
        this.onSave(this.id, data);
        this.visbile = false;
    },
    show(type, data) {
        this.visbile = true;
        if (type === 'edit') {
            this.$refs.name.value = data.name;
            this.$refs.uri.value = data.uri;
            this.$refs.id.value = data.id;
            this.id = data.id;
        } else {
            this.id = data;
        }
    },
    cancle() {
        this.visbile = false
    }
  }
};
</script>
<style lang="scss">
.dialog-container{
    position: fixed;
    width: 300px;
    height: 300px;
    background: #FFF;
    top: 50%;;
    left: 50%;
    margin-left: -150px;
    margin-top: -150px;
    box-shadow: 0px 0px 5px #ccc;
    label{
        display: inline-block;
        width: 80px;
    }
}
</style>
