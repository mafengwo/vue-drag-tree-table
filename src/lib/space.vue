<template>
  <span class="space-container">
    <span class="space" v-for="(item, index) in spaces" v-bind:key="index"></span>
  </span>
  
</template>
<script>
export default {
  name: 'space',
  props: ['depth'],
  computed: {
      spaces() {
        const aArr = []
        for(let i=0; i<this.depth; i++){
          aArr.push('')
        }
        return aArr
      }
  }
}
</script>
<style>
.space{
  display: inline-block;
  width: 15px;
}
</style>
