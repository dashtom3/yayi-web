<template>
  <div class="brandLib">
    <loading v-show="myLoading"></loading>
    <publicHeader v-on:listenToBrand="msgFromHeader"></publicHeader>
    <classify></classify>
    <div class="brandLibWrap">
      <div style="padding-top:30px;border-top:1px solid #e5e5e5;">
        <span>当前位置：</span>
        <span @click="goThisBrand('首页')" class="showBlueColor">首页</span>
        <span v-if="firstClassfy">></span>
        <span @click="goThisBrand(firstClassfy,1)" class="showBlueColor" :class="{indexLine:!secondClassfy&&!thirdClassfy&&!haveBrand&&!searchWordFromIndex}" v-if="firstClassfy">{{firstClassfy}}</span>
        <span v-if="secondClassfy">></span>
        <span @click="goThisBrand(secondClassfy,2)" class="showBlueColor" :class="{indexLine:!thirdClassfy&&!haveBrand&&!searchWordFromIndex}" v-if="secondClassfy" >{{secondClassfy}}</span><span v-if="thirdClassfy">></span>
        <span @click="goThisBrand(thirdClassfy,3)" class="showBlueColor" :class="{indexLine:!haveBrand&&!searchWordFromIndex}" v-if="thirdClassfy" >{{thirdClassfy}}</span><span v-if="haveBrand">></span>
        <span class="showBlueColor" :class="{indexLine:!searchWordFromIndex}" v-if="haveBrand" >{{haveBrand}}</span><span v-if="searchWordFromIndex">></span>
        <span class="indexLine">{{searchWordFromIndex}}</span>
      </div>
      <div class="classifyLine" >
        分类：
        <span class="defaultClassfy" :class="{qqqq:noLimitClassfy}" v-on:click="clearAllClassfy()">不限</span>
          <span class="fenlei1" v-bind:class="{fenlieselect: classify1Index===index}" v-on:click="selectClassfy1(index,item)"  v-for="(item,index) in brandClassfy" :key="item.oneClassify">
            {{item.oneClassify}}
          </span>
          <div class="classfyDetail" v-show="fenlie2.length>0">
            <div class="towClassfy" >
              <ul>
                <li :class="{asdff:classify2Index==index}" v-on:click="selectClassfy2(index,item)" v-for="(item,index) in fenlie2" :key="item.classifyTwoName">{{item.classifyTwoName}}</li>
              </ul>
            </div>
            <div class="threeClassfy" v-show="fenlie3.length>0">
              <ul>
                <li :class="{asdff:classify3Index==index}" v-on:click="selectClassfy3(index,item)" v-for="(item,index) in fenlie3" :key="item.classifyThreeName">{{item.classifyThreeName}}</li>
              </ul>
            </div>
          </div>
      </div>
      <div class="brandLine" >
        <span style="margin-top:11px">品牌：</span>
        <span class="defaultBrand" :class="{eedrf:brandNoLimit}" v-on:click="brandNoLimitFn()">不限</span>
        <ul>
          <li v-bind:class="{selectedClassfy:index==selectThisBrand}" v-on:click="selectBrand(index,item)" v-for="(item,index) in brands" :key="item.itemBrandName">
            {{item.itemBrandName}}
            <img v-show="item.selected" src="../../../images/brandLib/1.png" alt="">
            <img v-show="!item.selected" src="../../../images/brandLib/2.png" alt="">
          </li>
        </ul>
      </div>
      <!-- <div class="selectedBrand" v-show="haveSelectedBrands.length>0">
        <span v-show="haveSelectedBrands.length>0" style="float:left">已选品牌：</span>
        <ul>
          <li v-show="haveSelectedBrands.length>0"  v-for="(item,index) in haveSelectedBrands">{{item}}</li>
        </ul>
      </div> -->
      <div class="orderSelect">
        <ul>
          <li v-for="(item,index) in orderArr" v-on:click="sureOrderStyle(index)"  :class="{nowOrder:orderState==index}" :key="item.orderName">
            {{item.orderName}}
            <span></span>
            <img v-if="!item.orderSort&&index>0&&index<3"  src="../../../images/brandLib/7.png" alt="">
            <img v-if="item.orderSort&&index>0&&index<3" src="../../../images/brandLib/8.png" alt="">
            <img v-if="!item.orderSort&&index>0&&index==3" src="../../../images/brandLib/6.png" alt="">
            <img v-if="item.orderSort&&index>0&&index==3" src="../../../images/brandLib/9.png" alt="">
          </li>
        </ul>
        <!-- <div class="checkBox">
          <checkBox v-on:childsay="listenToMyBoy"></checkBox>
        </div> -->
      </div>

      <div class="allGoods">
        <ul v-if="ifHaveData">
          <li  v-for="(item,index) in allGoods" v-on:click="goToThisDetail(index,item.itemId)" :key="item.itemName">
            <div class="imgWrap">
              <img class="goodImg" :src="item.itemDetail.itemPica+'?imageView2/1/w/255/h/255'" alt="">
              <span></span>
            </div>
            <p class="goodTitle">{{item.itemName}}</p>
            <div class="goodBottom">
              <span>￥{{item.itemPrice}}</span>
              <span><img src="../../../images/brandLib/5.png" alt="购物车"></span>
            </div>
          </li>
          <div class="clearfix">

          </div>
        </ul>
        <div v-else style="text-align:center;margin-top:80px;">
          <img src="../../../images/brandLib/noFindGoods.png" alt="未能找到您想要的商品，请重新搜索~">
        </div>
      </div>
      <div class="block" style="margin-bottom:20px;">
        <!-- 分页 -->
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="12" layout="prev, pager, next, jumper" :total="totalCount" v-show="this.totalCount > this.pagesize">
        </el-pagination>
        <!-- 分页 -->
      </div>
    </div>
    <publicFooter></publicFooter>
    <backToTop></backToTop>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import backToTop from '../index/backToTop'
  import classify from '../index/classify'
  import publicFooter from '../index/publicFooter'
  import checkBox from './checkBox'
  import loading from '../loading'
  export default {
    name: 'brandLib',
    data () {
      return {
        //默认每页数据量
        pagesize: 10,
        //当前页码
        currentPage: 1,
        //默认数据总数
        totalCount: 1000,
        ifHaveData:true,
        intClassfy1:null,
        intClassfy2:null,
        intClassfy3:null,
        classify1Index:null,
        classify2Index:null,
        classify3Index:null,
        firstClassfy:'',
        secondClassfy:'',
        thirdClassfy:'',
        haveBrand:null,
        intBrandId:null,
        searchDataFromIndex:[],
        searchWordFromIndex:'',
        seachDataFrombRrandLidPage:null,
        selectThisBrand:null,
        noLimitClassfy:true,
        brandNoLimit:true,
        showAllGold:null,
        isBlueBgc:null,
        orderState:0,
        orderArr:[{orderName:"最新商品",orderSort:false},{orderName:"销量",orderSort:false},{orderName:"价格",orderSort:false},{orderName:"价格",orderSort:false}],
        fenlie2:[],
        fenlie3:[],
        brandIndex:null,
        haveSelectedBrands:[],
        brandClassfy:[],
        searchOneStr:null,
        searchTwoStr:null,
        searchThreeStr:null,
        searchBrandStr:null,
        brands:[],
        allGoods:[],
        aaaaa1:null,
        aaaaa2:null,
        pageProps:null,
        myLoading: true,
      }
    },
    components: {
      publicHeader,
      classify,
      backToTop,
      publicFooter,
      checkBox,
      loading,
    },
    created: function() {
      var that = this;
      // 初始化分类和品牌
      var classifyIdAndbrandId = that.$route.params.classifyIdAndbrandId;
      // 初始化搜索框值
      that.searchDataFromIndex = that.$route.params.data;
      that.searchWordFromIndex = that.$route.params.word;
      if(that.searchDataFromIndex){
        that.totalCount = that.searchDataFromIndex.totalNumber;
      }
        // 品牌和分类，0表示不限
      that.intBrandId = classifyIdAndbrandId.split("AND")[1];//品牌id
      var intClassfy = classifyIdAndbrandId.split("AND")[0];
        // 分类（index+1）
      that.intClassfy1 = intClassfy.split("-")[0];
      that.intClassfy2 = intClassfy.split("-")[1];
      that.intClassfy3 = intClassfy.split("-")[2];
      that.getClassfytAndBrandList();
    },
    watch:{
      seachDataFrombRrandLidPage:{
        handler:function(){
          var that = this;
          that.searchWordFromIndex = that.seachDataFrombRrandLidPage[that.seachDataFrombRrandLidPage.length-1];
          if(that.seachDataFrombRrandLidPage){
            var length = that.seachDataFrombRrandLidPage.length;
            var arr = that.seachDataFrombRrandLidPage;
            var newarr = [];
            if(length>1){
              that.ifHaveData = true;
              that.allGoods = arr.slice(0,length-1);
            }else{
              that.ifHaveData = false;
            }
          }else{
              that.ifHaveData = false;
          }
        },
        deep:true
      },
    },
    methods: {
      handleCurrentChange(val) {
        var that = this;
        that.currentPage = val
        if (val == undefined) {
          that.currentPage = 1
        } else {
          that.currentPage = val
        }
        that.fenYeGetData(that.currentPage);
      },
      fenYeGetData:function(data){
        var that = this;
        that.fenyeNum = data;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
      },
      //监听publicHeader标签
      msgFromHeader: function(data) {
        var that = this;
        that.seachDataFrombRrandLidPage = data;
        that.totalCount = data.totalNumber;
      },
      getClassfytAndBrandList:function(){
        var that = this;
        that.myLoading = true;
        that.global.axiosGetReq('/item/getAllClassifyAndBrand')
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.brandClassfy = res.data.data.classifyList;
            that.myLoading = false;
            for(var i in that.brandClassfy){
                that.brandClassfy[i].classifyTwoList.unshift({classifyTwoName:"不限",classifyThreeList:[]});
                for(var m in that.brandClassfy[i].classifyTwoList){
                  that.brandClassfy[i].classifyTwoList[m].classifyThreeList.unshift({classifyThreeName:"不限"});
                }
            }
            that.brands = res.data.data.itemBrandList;
            that.intClassftAndBrand();
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      getNowClassfyAndBrandGoods:function(rule){
        var that = this;
        that.searchWordFromIndex = null;
        var obj = {};
        if(that.searchOneStr!=null){
          if(that.searchOneStr!="不限"){
            obj.oneClassify = that.searchOneStr;
            that.firstClassfy = that.searchOneStr;
          }
        }
        if(that.searchTwoStr!=null){
          if(that.searchTwoStr!="不限"){
            obj.twoClassify = that.searchTwoStr;
            that.secondClassfy = that.searchTwoStr;
          }
        }
        if(that.searchThreeStr!=null){
          if(that.searchThreeStr!="不限"){
            obj.threeClassify = that.searchThreeStr;
            that.thirdClassfy = that.searchThreeStr;
          }
        }
        if(that.searchBrandStr){
          obj.itemBrandName = that.searchBrandStr;
          that.haveBrand = that.searchBrandStr;
        }
        if(rule){
          obj.rule = rule;
        }
        if(that.fenyeNum){
          obj.currentPage = that.fenyeNum;
        }else{
          obj.currentPage = 1;
        }
        obj.numberPerPage = 10;
        that.global.axiosPostReq('/item/queryItemSearch',obj)
        .then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if(res.data.data.length>0){
              that.ifHaveData = true;
              this.allGoods = res.data.data;
            }else{
              that.ifHaveData = false;
            }
            that.totalCount=res.data.totalNumber;
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      goToThisDetail:function(index,id){
        window.open('/details/' + id)
        // this.$router.push({
        //   path:"/details/"+id,
        // });
      },
      selectClassfy1:function(index,item){
        var that = this;
        that.aaaaa1 = index;
        that.noLimitClassfy = false;
        that.classify2Index = 0;
        that.classify3Index = null;
        that.classify1Index=index;
        that.fenlie2 = that.brandClassfy[index].classifyTwoList;
        that.fenlie3 = [];
        that.searchOneStr = item.oneClassify;
        that.searchTwoStr = null;
        that.searchThreeStr = null;
        that.secondClassfy = null;
        that.thirdClassfy = null;
        that.haveBrand = null;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        that.currentPage = 1;
      },
      selectClassfy2:function(index,item){
        var that = this;
        that.aaaaa2 = index;
        that.fenlie3 = that.fenlie2[index].classifyThreeList;
        that.classify2Index = index;
        that.classify3Index = 0;
        that.searchTwoStr = item.classifyTwoName;
        that.searchThreeStr = null;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        that.currentPage = 1;
        that.thirdClassfy = null;
        that.haveBrand = null;
        if(item.classifyTwoName=="不限"){
          that.fenlie3 = [];
          that.secondClassfy = null;
        }
      },
      selectClassfy3:function(index,item){
        var that = this;
        if(item.classifyThreeName=="不限"){
          that.thirdClassfy = null;
        }
        that.classify3Index = index;
        that.searchThreeStr = item.classifyThreeName;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        that.currentPage = 1;
      },
      selectBrand:function(index,item){
        var that = this;
        for(let i in that.brands){
          that.brands[i].selected = false;
        }
        that.brands[index].selected = true;
        that.brandNoLimit = false;
        that.searchBrandStr = item.itemBrandName;
        that.selectThisBrand = index;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        that.currentPage = 1;
      },
      sureOrderStyle:function(index){
        var that = this;
        that.orderState = index;
        for(let i in this.orderArr){
          that.orderArr[i].orderSort = false;
        }
        that.orderArr[index].orderSort = true;
        var num = parseInt(index)+1;
        that.allGoodsOrderStyle = num ;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        // if(res.data.currentPage==1){
          that.currentPage = 1;
        // }
      },
      listenToMyBoy: function (data){
        this.showAllGold = data;
      },
      brandNoLimitFn:function(){
        var that = this;
        that.haveBrand = null;
        that.searchBrandStr = null,
        that.brandNoLimit = true;
        that.selectThisBrand = null,
        that.haveSelectedBrands = [];
        for(var i = 0;i<that.brands.length;i++){
          that.brands[i].selected = false;
        }
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        that.currentPage = 1;
      },
      clearAllClassfy:function(){
        var that = this;
        that.firstClassfy = null;
        that.secondClassfy = null;
        that.thirdClassfy = null;
        that.noLimitClassfy = true;
        that.classify2Index = null;
        that.classify3Index = null;
        that.classify1Index = null;
        that.fenlie2 = [];
        that.fenlie3 = [];
        that.searchThreeStr = null;
        that.searchTwoStr = null;
        that.searchOneStr = null;
        that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
        that.currentPage = 1;
      },
      goThisBrand:function(arg,index){
        var that = this;
        // firstClassfy:'',
        // secondClassfy:'',
        // thirdClassfy:'',
        if(arg=="首页"){
          that.$router.push({  path:"/index"});
        }
        if(index==1){
          that.classify1Index = that.classify1Index;
          that.classify2Index = 0;
          that.fenlie3 = [];
          that.classify3Index = 0;
          that.secondClassfy = null;
          that.thirdClassfy = null;
        }else if(index==2){
          that.classify1Index = that.classify1Index;
          that.classify3Index = 0;
          that.thirdClassfy = null;
        }else if(index==3){

        }
      },
      intClassftAndBrand:function(){
        var that = this;
        if(that.intClassfy1!=0){
          that.classify1Index = that.intClassfy1-1;
          that.classify2Index = 0;
          that.classify3Index = 0;
          that.noLimitClassfy = false;
          that.fenlie2 = that.brandClassfy[that.intClassfy1-1].classifyTwoList;
          that.fenlie3 = [];
          that.searchOneStr = that.brandClassfy[that.intClassfy1-1].oneClassify;
        }
        if(that.intClassfy2!=0){
          that.fenlie3 = that.fenlie2[that.intClassfy2].classifyThreeList;
          that.classify2Index = that.intClassfy2;
          that.classify3Index = 0;
          that.noLimitClassfy = false;
          that.searchTwoStr = that.brandClassfy[that.intClassfy1-1].classifyTwoList[that.intClassfy2].classifyTwoName;
        }
        if(that.intClassfy3!=0){
          that.classify3Index = that.intClassfy3;
          that.noLimitClassfy = false;
          that.searchThreeStr = that.brandClassfy[that.intClassfy1-1].classifyTwoList[that.intClassfy2].classifyThreeList[that.intClassfy3].classifyThreeName;
        }
        if(that.intBrandId!=null){
          for(let i in that.brands){
            that.brands[i].selected = false;
            if(that.brands[i].itemBrandId==that.intBrandId){
                this.selectThisBrand = i;
                this.brandNoLimit = false;
                that.brands[i].selected = true;
                that.searchBrandStr = that.brands[i].itemBrandName;
            }
          }
        }
        if(that.searchWordFromIndex){
          if(that.searchDataFromIndex.length>0){
            that.allGoods = that.searchDataFromIndex;

          }else{
            that.ifHaveData = false;
          }
        }else{
          that.getNowClassfyAndBrandGoods(that.allGoodsOrderStyle);
          that.currentPage = 1;
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hidden{
  visibility: hidden;
}
.classifyLine .defaultClassfy{
  display: inline-block;
  width: 52px;
padding: 0 5px;
border-radius: 3px;
  line-height: 26px;
  margin: 13px 25px;

    cursor: pointer;
}
.classifyLine .qqqq{
  background: #005aab;
    color: white;
}
.brandLib{
  font-size: 14px;
}
.brandLib .defaultBrand{
  display: inline-block;
  cursor: pointer;
  width: 52px;
padding: 0 5px;
border-radius: 3px;
  line-height: 26px;
  margin: 13px 29px;

    text-align: center;
    height: auto;
    margin-top: 7px;
}
.brandLib .eedrf{
  background: #005aab;
    color: white;
}
.asdff{
  background: #005aab;
  color: white;
}
.fenlei1{
  cursor: pointer;
}
.fenlieselect{
  width: 110px;
    border: 1px solid #bcbcbc;
    text-align: center;
    line-height: 50px;
    border-bottom: none;
    background: #eeeeee;
    color: black;
}
.nowOrder{
  color: #005aab;
}
.nowOrder span{
  background: #005aab;
}
.classfyDetail{
  border: 1px solid #bcbcbc;
  margin-left: 162px;
  margin-top: -1px;
  margin-bottom: 20px;
  background: #eeeeee;
  padding: 0 25px;
  width: 901px;
}
.threeClassfy{
  border-top: 1px solid #bcbcbc;
}
.threeClassfy li {

  display: inline-block;
  cursor: pointer;
    border-radius: 5px;
    min-width: 50px;
    height: 26px;
    line-height: 26px;
    margin-right: 25px;
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
}
.towClassfy{
  padding: 30px 0;
}
.towClassfy ul{
  line-height: 40px;
}
.threeClassfy{
  padding: 30px 0;
}
.towClassfy li {
  display: inline-block;
  cursor: pointer;
    border-radius: 5px;
      min-width: 50px;
      padding-left: 5px;
      padding-right: 5px;
    height: 26px;
    line-height: 26px;
    margin-right: 25px;
    text-align: center;
}
.selectedBrand{
  min-height: 42px;
}
.selectedBrand ul {
  margin-left: 85px;
}
.selectedBrand li{
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 20px;
}
.orderSelect{
  border-bottom: 1px solid #e5e5e5;
  position: relative;
}
.orderSelect .checkBox{
display: inline-block;
position: absolute;
top: 10px;
right: 0;

}
.orderSelect li {
  text-align: center;
  display: inline-block;
  width: 65px;
  position: relative;
  margin-right: 40px;
  cursor: pointer;
  padding-top: 10px;
}
.orderSelect li img {
  position: absolute;
  top: 12px;
  right: 10%;
}
.orderSelect li span{

  height: 2px;
  display: block;
  width: 100%;
  margin: auto;
  margin-top: 10px;
}
.brandLine{
  margin-top: 20px;
}
.brandLine .selectedClassfy{
  color: #005aab;
  border: 1px solid #005aab;
}
.classifyLine{
  margin-top: 20px;
}
.classifyLine .fenlei1:nth-child(1){
  margin-left: 19px;
}
.classifyLine .selectedClassfy{
  color: #005aab;
}
.brandLibWrap{
  width: 1200px;
margin: 0 auto;
}
.indexLine{
  color: #005aab;
}
.showBlueColor:hover{
  color: #005aab;
  cursor: pointer;
}
.classifyLine span {
  display: inline-block;
  /*margin-right: 50px;*/
  line-height: 52px;
  text-align: center;
  width: 93px;
}
.brandLine{
  margin-bottom: 20px;
}
.brandLine span {
  float: left;
  display: block;
  height: 20px;
}
.brandLine ul{
  padding-left: 162px;
}
.brandLine li{
  display: inline-block;
  width: 118px;
  border: 1px solid #bcbcbc;
  line-height: 38px;
  margin-right: 19px;
  margin-bottom: 29px;
  text-align: center;
  cursor: pointer;
  position:relative;
}
.brandLine li img {
  position: absolute;
  bottom: 0;
  right: 0;
}
.allGoods{
  min-height: 200px;
}
.allGoods ul  {
  padding-top: 50px;
  width: 1200px;
}
.allGoods li {
  width: 228px;
  height: 246px;
  border: 1px solid #efefef;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 0 5px 10px 5px;
  overflow: hidden;
}

.allGoods li .ifGold{
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
}

.allGoods li .imgWrap .goodImg{
  /*display: inline-block;*/
  /*vertical-align: middle;*/
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.allGoods li:hover{
  box-shadow: 7px 7px 28px #bcbcbc;
  transition: all 0.5s ease;
  border-color:white;
}
/* .goodImg:hover{ */
  /*box-shadow: 7px 7px 28px #bcbcbc;
transition: all 0.5s ease;*/
/* } */
.allGoods .blueBgc{
  color: white;
  background: #005aab;
}
.allGoods li .imgWrap{
  width: 230px;
  height: 147px;
  margin: auto;
  text-align: center;
/*  margin-top: 4px;*/
}
.allGoods li .imgWrap span{
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.allGoods li .goodTitle{
  display: block;
  margin: 10px auto;
  line-height: 30px;
  height: 40px;
  width: 220px;
  padding: 0 10px;
  text-align: center;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
 /*box-shadow: 3px 3px 5px #eaeaea;*/
}
.allGoods li:hover .goodTitle{
  cursor: pointer;
  /*background: #005aab;*/
  transition: all ease 0.5s;
  color: #005aab;
  transition: all 0.5s ease;
}
.goodBottom{
  color: #cb1700;
  padding: 10px 20px;
}
.goodBottom span:nth-child(2){
  float: right;
}
.fenye{
  text-align: center;
  padding: 20px;
}
</style>
