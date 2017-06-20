<template>
  <div class="freightSet">
    <el-button>修改运费</el-button>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="自定义邮费" name="first">
        <el-table  :data="tableData"  stripe  style="width: 100%">
          <el-table-column  prop="places" align="center"  label="运送到" >
            <template scope="scope">
              <span v-if="scope.places.length>0" v-for="place in places">{{scope.rows.place}}</span>
            </template>
          </el-table-column>
          <el-table-column  prop="firstNum" align="center"  label="首件数（件）"  width="200">
            <template scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="firstPay" align="center"  label="首费（元）"  width="200">
            <template scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="moreNum" align="center"  label="续件数（件）"  width="200">
            <template scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
          <el-table-column  prop="morePay" align="center"  label="续费（元）"  width="200">
            <template scope="scope">
              <el-input></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="包邮" name="fourth">
    这是邮费</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import tableBoard from './tableBoard'
  export default {
    name: 'freightSet',
    data () {
      return {
        tableData:[
          {}
        ],
        activeName2: 'first'
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
    components: {
      tableBoard,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
