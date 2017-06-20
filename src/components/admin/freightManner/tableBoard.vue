<template>
  <div class="tableBoard">
    <el-dialog title="选择区域" :visible.sync="state2">
      <div class="allChoose_bigbox" v-for="item in items" :key="item">
        <div class="allChoose_box">
          <el-checkbox :indeterminate="isIndeterminate" v-model="item.allcheck" @change="handleCheckAllChange(item)" class="allchecked">{{item.area}}</el-checkbox>
            <el-checkbox v-for="cities in item.place" :label="cities.city" :key="cities" v-model="cities.checked" @change="handleCheckedCitiesChange(cities)">{{cities.city}}</el-checkbox>
          <div class="clearfix"></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm()">确 定</el-button>
        <el-button @click="cancel()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'tableBoard',
    data () {
      return {
        state2:false,
        checkAll: false,
        checkedCities: [],
        isIndeterminate: false,
        items: [{
                  area: '华东',
                  allcheck: false,
                  place: [{city: '上海',checked: false},{city: '江苏',checked: false},{city: '浙江',checked: false},{city: '安徽',checked: false},{city: '江西',checked: false}],
                },{
                  area: '华北',
                  allcheck: false,
                  place: [{city: '北京',checked: false},{city: '天津',checked: false},{city: '山西',checked: false},{city: '山东',checked: false},{city: '河北',checked: false},{city: '内蒙古',checked: false}],
                },{
                  area: '华中',
                  allcheck: false,
                  place: [{city: '湖南',checked: false},{city: '湖北',checked: false},{city: '河南',checked: false}],
                },{
                  area: '华南',
                  allcheck: false,
                  place: [{city: '广东',checked: false},{city: '广西',checked: false},{city: '福建',checked: false},{city: '海南',checked: false}],
                },{
                  area: '东北',
                  allcheck: false,
                  place: [{city: '辽宁',checked: false},{city: '吉林',checked: false},{city: '黑龙江',checked: false}],
                },{
                  area: '西北',
                  allcheck: false,
                  place: [{city: '陕西',checked: false},{city: '新疆',checked: false},{city: '甘肃',checked: false},{city: '宁夏',checked: false},{city: '青海',checked: false}],
                },{
                  area: '西南',
                  allcheck: false,
                  place: [{city: '重庆',checked: false},{city: '云南',checked: false},{city: '贵州',checked: false},{city: '西藏',checked: false},{city: '四川',checked: false}],
                },{
                  area: '港澳台',
                  allcheck: false,
                  place: [{city: '香港',checked: false},{city: '澳门',checked: false},{city: '台湾',checked: false}],
                },{
                  area: '海外',
                  allcheck: false,
                  place: [{city: '海外',checked: false}],
        }],
        submitCities: [],
      }
    },
    props:["childrenState"],
    watch: {
      childrenState:function(){
        var that = this;

        that.state2 = that.childrenState;
        console.log(that.childrenState)
      },
      checkedCities: {
        handler: function() {
          var that = this;
          var a = that.checkedCities;
          for (var i=a.length-1; i>=0; i--) {
            var targetNode = a[i];
            for (var j=0; j<i; j++) {
              if(targetNode == a[j]){
                  a.splice(i,1);
                  break;
              }
            }
          }
          that.submitCities = a;
          // console.log(that.submitCities);
        },
        deep: true
      },
    },
    methods: {
      handleCheckAllChange(item) {
        var that = this;
        var arr = item.place;
        if (item.allcheck == true) {
          for (var i = 0; i < arr.length; i++) {
            arr[i].checked = true;
            that.checkedCities.push(arr[i].city);
          }
        } else {
          for (var i = 0; i < arr.length; i++) {
            arr[i].checked = false;
            for (var j = 0; j < that.checkedCities.length; j++) {
              if (that.checkedCities[j] == arr[i].city) {
                that.checkedCities.splice(j, 1);
              }
            }
            // that.checkedCities2 = [];
          }
        }
      },
      handleCheckedCitiesChange(cities) {
        var that = this;
        if (cities.checked == true) {
          that.checkedCities.push(cities.city)
        } else {
          for (var i = 0; i < that.checkedCities.length; i++) {
            if (that.checkedCities[i] == cities.city) {
              that.checkedCities.splice(i, 1);
              break
            }
          }
        }
      },
      confirm: function() {
        var that = this;
        var arr = that.submitCities;
        // console.log(arr, '22222');
        that.$emit('listenChildren',that.submitCities);
        that.state2 = false;
      },
      cancel: function() {
        var that = this;

        that.$emit('listenChildren',"1");
        that.state2 = false;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.allChoose_box {
  margin-top: 20px;
}
.allchecked {
  width: 20%;
  float: left;
}
.allchecked_box {
  width: 80%;
  float: left;
}
</style>
