<template>
  <div class="salesIndex">
    <div class="salesHead">
      <el-tabs v-model="activeName">
        <el-tab-pane label="首页" name="first">
1
        </el-tab-pane>
        <el-tab-pane label="我的订单" name="second">
2
        </el-tab-pane>
        <el-tab-pane label="发现客户" name="third">
3
        </el-tab-pane>
        <el-tab-pane label="我的客户" name="fourth">
4
        </el-tab-pane>
        <el-tab-pane label="我的钱包" name="five">
5
        </el-tab-pane>
        <el-tab-pane label="个人信息" name="six">
6
        </el-tab-pane>
    </el-tabs>
  </div>
    <salesFoot></salesFoot>
  </div>
</template>

<script>
  // import salesHead from "./header"
  import salesFoot from "./footer"
  export default {
    name: 'salesIndex',
    data () {
      return {
        activeName: 'first'
      }
    },
    components: {
      // salesHead,
      salesFoot,
    },
    created: function() {
    },
    methods: {
    }
  }
</script>

<style scoped>
.salesHead{
  width: 1200px;
  margin: auto;
  padding-top: 44px;
  padding-bottom: 35px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 30px;
}
</style>
<style>
.salesHead .el-tabs__item{
  width: 150px;
  text-align: center;
}
</style>
