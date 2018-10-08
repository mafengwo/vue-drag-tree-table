<template>
    <div class="tree-column" v-bind:style="{ width: width + 'px'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  name: 'column',
  props: {
    width: String,
    field: String,
    label: String
  },
  data() {
      return {
          open: false
      }
  }
}
</script>
<style>
  .tree-column{
    padding: 0px 4px;
    min-width: 60px;
  }
</style>
