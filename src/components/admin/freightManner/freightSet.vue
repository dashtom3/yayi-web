<template>
  <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
    <el-tab-pane label="自定义邮费" name="first">自定义邮费</el-tab-pane>
    <el-tab-pane label="包邮" name="fourth">包邮</el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    name: 'freightSet',
    data () {
      return {
        activeName2: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
