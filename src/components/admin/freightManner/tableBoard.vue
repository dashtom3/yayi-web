<template>
  <div class="tableBoard">
    <el-dialog title="选择区域" :visible.sync="state2" :before-close="handleClose" :show-close="false">
      <div class="allChoose_bigbox" v-for="item in items" :key="item">
        <div class="allChoose_box">
          <el-checkbox :indeterminate="isIndeterminate" v-model="item.allcheck" @change="handleCheckAllChange(item)" class="allchecked">{{item.area}}</el-checkbox>
            <el-checkbox v-for="cities in item.place" :label="cities.city" :key="cities.city" v-model="cities.checked" @change="handleCheckedCitiesChange(cities,item)">{{cities.city}}</el-checkbox>
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
        watchItem: null,
      }
    },
    props:["childrenState","defaultSelectedCity"],
    watch: {
      childrenState:function(){
        var that = this;
        that.state2 = that.childrenState;
      },
      defaultSelectedCity:{
        handler:function(){
          var that = this;
          if(that.defaultSelectedCity.length>0){
            for(let i in that.items){
              var flag = true;
              for(let n in that.items[i].place){
                for(let m in that.defaultSelectedCity){
                  if(that.defaultSelectedCity[m]==that.items[i].place[n].city){
                    that.items[i].place[n].checked = true;
                  }
                }
                if(that.items[i].place[n].checked==!true){
                  flag = false;
                }
              }
              if(flag){
                that.items[i].allcheck = true;
              }
            }
          }
        },
        deep:true
      },
      items: {
        handler: function() {
          var that = this;
          // for (var i = 0; i < that.items.length; i++) {
          //   for (k in that.items[i].place)
          //     if (that.items[i].place[k].checked == ) {
          //       expression
          //     }
          // }
        },
        deep: true
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
          
        },
        deep: true
      },
    },
    methods: {
      returnDefault:function(){
        var that = this;
        for(let i in that.items){
          that.items[i].allcheck = false;
          for(let n in that.items[i].place){
            that.items[i].place[n].checked = false;
          }
        }
      },
      handleClose:function(){
        this.returnDefault();
      },
      handleCheckAllChange(item) {
        var that = this;
        var arr = item.place;
        if (item.allcheck == true) {
          for (var i = 0; i < arr.length; i++) {
            arr[i].checked = true;
            that.checkedCities.push(arr[i].city);
          }
          return false
        }
        if (item.allcheck == false) {
          for (var i = 0; i < arr.length; i++) {
            arr[i].checked = false;
            for (var j = 0; j < that.checkedCities.length; j++) {
              if (that.checkedCities[j] == arr[i].city) {
                that.checkedCities.splice(j, 1);
              }
            }
          }
          return false
        }
      },
      handleCheckedCitiesChange(cities,item) {
        var that = this;
        if (cities.checked == true) {
          var a =[];
          that.checkedCities.push(cities.city)
          for (var i = 0; i < item.place.length; i++) {
            if (item.place[i].checked == true) {
              a.push(item.place[i].checked);
            }
          }
          if (a.length == item.place.length) {
            item.allcheck = true;
          }
          
        } else {
          for (var i = 0; i < item.place.length; i++) {
            if (item.place[i].checked == false) {
              item.allcheck = false
            }
          }
          for (var i = 0; i < that.checkedCities.length; i++) {
            if (that.checkedCities[i] == cities.city) {
              that.checkedCities.splice(i, 1);
              break
            }
          }
        }
      },
      lzy_returnData:function () {
        var that = this;
        var arr = [];
        for(let i in that.items){
          for(let a in that.items[i].place){
            if(that.items[i].place[a].checked==true){
              arr.push(that.items[i].place[a].city);
            }
          }
        }
        return arr;
      },
      confirm: function() {
        var that = this;
        var arr = that.submitCities;
        var arr2 = that.lzy_returnData()
        // that.$emit('listenChildren',arr);
        that.$emit('listenChildren',arr2);
        that.state2 = false;
        this.returnDefault();
      },
      cancel: function() {
        var that = this;
        that.$emit('listenChildren',"1");
        that.state2 = false;
        this.returnDefault();
      },
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
