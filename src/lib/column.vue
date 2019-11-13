<template>
    <div class="tree-column" v-bind:class="{border: border!== undefined}" v-bind:style="{ width: width + 'px', flex: flex}" v-if="flex">
      <slot></slot>
    </div>
    <div class="tree-column" v-bind:class="{border: border!== undefined}" v-bind:style="{ width: width + 'px'}" v-else>
      <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'column',
  props: {
    width: Number,
    field: String,
    label: String,
    flex: Number,
    border: String
  },
  data() {
      return {
          open: false
      }
  },
  mounted() {
    console.log(this.titleAlign)
  }
}
</script>
<style lang="scss">
  .tree-column{
    padding: 12px 12px;
    min-width: 60px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &.border{
      border-right: 1px solid #eee;
    }
  }
</style>
