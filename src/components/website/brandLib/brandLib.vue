<template>
  <div class="brandLib">
    <publicHeader></publicHeader>
    <classify></classify>
    <div class="brandLibWrap">
      <div style="padding-top:30px;border-top:1px solid #e5e5e5;">
        首页><span class="indexLine">3M</span>
      </div>
      <div class="classifyLine">
        分类：
        <span class="defaultClassfy" :class="{qqqq:noLimitClassfy}" v-on:mouseenter="clearAllClassfy">不限</span>
          <span class="fenlei1" v-bind:class="{fenlieselect: classifyIndex===index}" v-on:mouseenter="selectClassfy(index)"  v-for="(item,index) in brandClassfy">
            {{item.oneName}}
          </span>
          <div class="classfyDetail" v-show="fenlie2.length>0">
            <div class="towClassfy" >
              <ul>
                <li :class="{asdff:selectedTwo==index}" v-on:mouseenter="showChilds222(index)" v-for="(item,index) in fenlie2">{{item.toeNmae}}</li>
              </ul>
            </div>
            <div class="threeClassfy">
              <ul>
                <li :class="{asdff:selectedThree==index}" v-on:mouseenter="selectedThreeClassfy(index)" v-for="(item,index) in fenlie3">{{item}}</li>
              </ul>
            </div>
          </div>
      </div>
      <div class="brandLine">
        <span>品牌：</span>
        <span class="defaultBrand" :class="{eedrf:brandNoLimit}" v-on:click="brandNoLimitFn">不限</span>
        <ul>
          <li v-bind:class="{selectedClassfy:item.selected}" v-on:click="selectBrand(index)" v-for="(item,index) in brands">
            {{item.brandNmae}}
            <img v-show="item.selected" src="../../../images/brandLib/1.png" alt="">
            <img v-show="!item.selected" src="../../../images/brandLib/2.png" alt="">
          </li>
        </ul>
      </div>
      <div class="selectedBrand" v-show="haveSelectedBrands.length>0">
        <span v-show="haveSelectedBrands.length>0" style="float:left">已选品牌：</span>
        <ul>
          <li v-show="haveSelectedBrands.length>0"  v-for="(item,index) in haveSelectedBrands">{{item}}</li>
        </ul>
      </div>
      <div class="orderSelect">
        <ul>
          <li v-for="(item,index) in orderArr" v-on:click="sureOrderStyle(index)"  :class="{nowOrder:orderState==index}">
            {{item.orderName}}
            <span></span>
            <img v-if="index==5" v-show="!item.orderSort" src="../../../images/brandLib/6.png" alt="">
            <img v-if="index!=0&&index!=5" v-show="!item.orderSort" src="../../../images/brandLib/7.png" alt="">
          </li>

        </ul>
        <div class="checkBox">
          <checkBox v-on:childsay="listenToMyBoy"></checkBox>
        </div>
      </div>

      <div class="allGoods">
        <ul>
          <li  v-for="(item,index) in allGoods" v-on:click="goToThisDetail(index)">
            <!-- <router-link to="/details/index"> -->
            <img  class="ifGold" v-if="item.ifGold" src="../../../images/brandLib/3.png" alt="">
            <div class="imgWrap">
              <img class="goodImg" src="../../../images/brandLib/4.png" alt="">
              <span></span>
            </div>
            <p class="goodTitle">{{item.goodTitle}}</p>
            <div class="goodBottom">
              <span>￥{{item.goodPrice}}</span>
              <span><img src="../../../images/brandLib/5.png" alt="购物车"></span>
            </div>
            <!-- </router-link> -->
          </li>
        </ul>
      </div>
    </div>
    <div class="fenye">
<paging0 ></paging0>
    </div>

    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import classify from '../index/classify'
  import publicFooter from '../index/publicFooter'
  import checkBox from './checkBox'
  import paging0 from './paging0'
  export default {
    name: 'brandLib',
    data () {
      return {
        noLimitClassfy:true,
        brandNoLimit:true,
        selectedTwo:0,
        selectedThree:0,
        showAllGold:null,
        isBlueBgc:null,
        orderState:0,
        // false表示toTop,升
        orderArr:[{orderName:"全部",orderSort:""},{orderName:"销量",orderSort:false},{orderName:"新品",orderSort:false},{orderName:"评论",orderSort:false},{orderName:"价格",orderSort:false},{orderName:"价格",orderSort:false}],
        fenlie2:[],
        fenlie3:[],
        classifyIndex:null,
        brandIndex:null,
        haveSelectedBrands:[],
        brandClassfy:[
          {
            oneName:"口腔护理",
            shildres:[
              {
                toeNmae:"不限",
                shildres:["口腔1","口腔1","口腔1","口腔1",]
              },
              {
                toeNmae:"不限1",
                shildres:["口腔2","口腔2","口腔2","口腔2",]
              }
            ]
          },
          {
            oneName:"口内材料",
            shildres:[
              {
                toeNmae:"不限3",
                shildres:["口内1","口内1","口内1","口内1",]
              },
              {
                toeNmae:"不限14",
                shildres:["口内2","口内2","口内2","口内2",]
              }
            ]
          }
        ],
        // brandClassfy:["不限","口腔护理","口腔材料","医用耗材","预备切莫","器械","仪器"],
        brands:[
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌22",selected:false},
          {brandNmae:"品3333",selected:false},
          {brandNmae:"品牌44",selected:false},
          {brandNmae:"品牌55",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},{brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},{brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},{brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false},
          {brandNmae:"品牌11",selected:false}
        ],
        allGoods:[
          {goodImg:"./img/4.png",goodTitle:"商品111111111111113333333333333333333111111111商品111111111111113333333333333333333111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:true},
          {goodImg:"./img/4.png",goodTitle:"商品11111111111111111111111",goodPrice:23,ifGold:false}
        ]
      }
    },
    components: {
      publicHeader,
      classify,
      publicFooter,
      checkBox,
      paging0
    },
    mounted: function() {

    },
    watch:{
      haveSelectedBrands:function(){
        if(this.haveSelectedBrands.length>0){
          this.brandNoLimit = false;
        }else{
          this.brandNoLimit = true;
        }
      }
    },
    methods: {
      goToThisDetail:function(id){
        this.$router.push({
          path:"/details/"+id,
        });
      },
      selectClassfy:function(index){
        this.classifyIndex=index;
        this.noLimitClassfy = false;
        this.fenlie2 = this.brandClassfy[index].shildres;
      },
      showChilds222:function(index){
        this.fenlie3 = this.fenlie2[index].shildres;
        this.selectedTwo = index;
        this.noLimitClassfy = false;
      },
      selectBrand:function(index){
        this.brands[index].selected = !this.brands[index].selected;
        if(this.brands[index].selected){
          this.haveSelectedBrands.push(this.brands[index].brandNmae);
        }else{
          var nowstr = event.target.innerText.trim();
          for(var  i = 0;i < this.haveSelectedBrands.length;i++ ){
            if(nowstr==this.haveSelectedBrands[i]){
              this.haveSelectedBrands.splice(i,1);
            }
          }
        }
      },
      sureOrderStyle:function(index){
        this.orderState = index;
      },
      listenToMyBoy: function (data){
        this.showAllGold = data;
      },
      selectedThreeClassfy:function(index){
        this.selectedThree = index;
          this.noLimitClassfy = false;
      },
      brandNoLimitFn:function(){
        this.brandNoLimit = true;
        this.haveSelectedBrands = [];
        for(var i = 0;i<this.brands.length;i++){
          this.brands[i].selected = false;
        }
      },
      clearAllClassfy:function(){
        this.noLimitClassfy = true;
        this.selectedTwo = null;
        this.selectedThree = null;
        this.fenlie2 = [];
        this.classifyIndex = null;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
  background: #5db7e8;
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
  background: #5db7e8;
    color: white;
}
.asdff{
  background: #5db7e8;
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
  color: #5db7e8;
}
.nowOrder span{
  background: #5db7e8;
}
.classfyDetail{
  border: 1px solid #bcbcbc;
  margin-left: 162px;
  margin-top: -1px;
  margin-bottom: 20px;
  background: #eeeeee;
  padding: 0 25px;
  width: 902px;
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
  color: #5db7e8;
  border: 1px solid #5db7e8;
}
.classifyLine{
  margin-top: 20px;
}
.classifyLine .fenlei1:nth-child(1){
  margin-left: 19px;
}
.classifyLine .selectedClassfy{
  color: #5db7e8;
}
.brandLibWrap{
  width: 1200px;
margin: 0 auto;
}
.indexLine{
  color: #5db7e8;
}
.classifyLine span {
  display: inline-block;
  margin-right: 50px;
  line-height: 52px;
  text-align: center;
  width: 111px;
}
.brandLine{
  border-bottom: 1px solid #e5e5e5;
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
.allGoods ul  {
  padding-top: 50px;
  width: 1200px;
}
.allGoods li {
  width: 279px;
  border: 1px solid #bcbcbc;
  margin-bottom: 19px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin-right: 19px;

}

.allGoods li .ifGold{
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
}



.allGoods li .imgWrap .goodImg{
  display: inline-block;
  vertical-align: middle;
  max-width: 280px;
  max-height: 280px;
}
.goodImg:hover{
  box-shadow: 7px 7px 28px #bcbcbc;
transition: all 0.5s ease;
}
.allGoods .blueBgc{
  color: white;
  background: #5db7e8;
}
.allGoods li .imgWrap{
  width: 280px;
  margin: auto;
  height: 265px;
  text-align: center;
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
  height:60px;
  width: 220px;
  padding: 0 10px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
 box-shadow: 3px 3px 5px #eaeaea;
}
.goodTitle:hover{
  cursor: pointer;
  background: #5db7e8;
  transition: all ease 0.5s;
  color: white;
}
.goodBottom{
  color: #D81E06;
  padding: 10px;
}
.goodBottom span:nth-child(2){
  float: right;
}

.fenye{
  text-align: center;
  padding: 20px;
}
</style>
