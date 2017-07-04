<template>
  <div class="allOrder">
    <div class="order_table" v-show="order_table">
      <div class="left cargo">商品</div>
      <div class="left price">单价（元）</div>
      <div class="left num">数量</div>
      <div class="left cargo_operate">小计</div>
      <div class="left now_pay">实付款（元）</div>
      <div class="left deal_state">交易状态</div>
      <div class="left deal_operate">交易操作</div>
    </div>
    <!--  暂无订单开始 -->
    <div class="no_order" v-show="no_order">
      <div class="order_table_spe">
        <div class="left cargo">商品</div>
        <div class="left price">单价（元）</div>
        <div class="left num">数量</div>
        <div class="left cargo_operate">小计</div>
        <div class="left now_pay">实付款（元）</div>
        <div class="left deal_state">交易状态</div>
        <div class="left deal_operate">交易操作</div>
      </div>
      <div style="margin-top:67px; margin-bottom:40px;"><img src="../../../../images/center/noOrder.png" alt="img"></div>
      <div><img src="../../../../images/center/noOrderWord.png" alt="img"></div>
    </div>
    <!--  暂无订单结束 -->
    <!--  查询无数据订单开始 -->
    <div class="no_order" v-show="no_search_order">
      <div class="order_table_spe">
        <div class="left cargo">商品</div>
        <div class="left price">单价（元）</div>
        <div class="left num">数量</div>
        <div class="left cargo_operate">小计</div>
        <div class="left now_pay">实付款（元）</div>
        <div class="left deal_state">交易状态</div>
        <div class="left deal_operate">交易操作</div>
      </div>
      <div style="margin-top:67px; margin-bottom:40px;"><img src="../../../../images/center/noOrder.png" alt="img"></div>
      <div><img src="../../../../images/center/noSearch.png" alt="img"></div>
    </div>
    <!--  查询无数据订单结束 -->
    <div class="order_item" v-for="item in items" :key="item" v-show="order_list">
      <div class="order_title">
        <span class="order_date">{{item.date}}</span>
        <span class="order_num">订单号: {{item.orderId}}</span>
      </div>
      <!--  订单详情item 开始 -->
      <div class="order_des" v-for="cargo in item.cargo" :key="cargo">
        <div class="left des_img">
          <img src="../../../../images/center/order.png" alt="img">
        </div>
        <div class="left des_p">
          <p style="margin-bottom: 20px;">{{cargo.des}}</p>
          <p>{{cargo.color}}</p>
        </div>
        <div class="left des_price">￥{{cargo.price}}</div>
        <div class="left des_num">{{cargo.num}}</div>
        <div class="left des_state">￥{{cargo.price*cargo.num}}</div>
      </div>
      <!--  订单详情item 结束 -->
      <div class="order_des_right">
        <div class="left now_pay_des">
          <p class="spe_p">￥{{item.total}}</p>
          <p>（含运费：￥6.00）</p>
          <p>（乾币已抵扣：￥2.00）</p>
        </div>
        <div class="left wait_pay_des">{{item.state | frisco}}</div>
        <div class="left operate_des" v-if="item.state!==1">
          <p class="payBtn" @click="operate(item)">{{item.state | operate}}</p>
          <p class="cancelBtn" @click="cancel_order">取消订单</p>
        </div>
      </div>
    </div>
<!--     <paging0></paging0> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <span>确定取消订单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm_cancel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="评价" :visible.sync="dialogVisibleComment" size="tiny">
      <div class="comment_box">
        <img class="comment_img" src="../../../../images/center/small.png" alt="img">
        <p class="comment_des">爱丽丝 #标准</p>
        <div class="clearfix"></div>
        <div class="score_box">
          <div class="score_word">评分：</div>
          <el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" class="score_des"></el-rate>
          <div class="getScore" v-show="getScore"><span style="color: #D81E06">{{score}}</span>分</div>
        </div>
        <div class="clearfix"></div>
        <div class="comment_word_box">
          <div class="comment_word_des">评价：</div>
          <el-input type="textarea" :rows="5" placeholder="请输入评价内容~" v-model="textarea" :autosize="{ minRows: 5, maxRows: 5}" class="textarea_des">
          </el-input>
        </div>
        <div class="clearfix"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleComment = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import paging0 from '../../brandLib/paging0'
  export default {
    name: 'allOrder',
    data () {
      return {
        items: [{
          date: '2017-05-17',
          orderId : '19877240650895924',
          state: 0,
          total: 368,
          cargo: [{
            des: '爱丽丝 标准#',
            color: '红色厚',
            price: '134',
            num: '1',
          },{
            des: '爱丽丝 标准#',
            color: '红色厚',
            price: '134',
            num: '1',
          },{
            des: '爱丽丝 标准#',
            color: '红色厚',
            price: '100',
            num: '1',
          }],
        },{
          date: '2017-05-07',
          orderId : '19877240650895924',
          state: 1,
          total: 22220,
          cargo: [{
            des: '爱丽丝 标准#',
            color: '红色厚',
            price: '2222',
            num: '10',
          }],
        },{
          date: '2017-05-01',
          orderId : '19877240650895924',
          total: 1500,
          state: 2,
          cargo: [{
            des: '爱丽丝 标准#',
            color: '红色厚',
            price: '500',
            num: '3',
          }],
        }],
        cargos: [],
        // no_find: '暂无订单～',
        order_table: true,
        order_list: true,
        no_order: false,
        no_search_order: false,
        dialogVisible: false,
        dialogVisibleComment: false,
        operate_close: true,
        value2: null,
        textarea: '',
        score : '',
        getScore: false,
      }
    },
    components: {
      paging0,
    },
    created: function() {
      var that = this;
    },
    mounted: function() {
      var that = this;
      // console.log(that.items);
    },
    watch: {
      value2: function() {
        var that = this;
        if (that.value2 == 0) {
          that.getScore = false;
        }
        if (that.value2 == 1) {
          that.getScore = true;
          that.score = '1';
        }
        if (that.value2 == 2) {
          that.getScore = true;
          that.score = '2';
        }
        if (that.value2 == 3) {
          that.getScore = true;
          that.score = '3';
        }
        if (that.value2 == 4) {
          that.getScore = true;
          that.score = '4';
        }
        if (that.value2 == 5) {
          that.getScore = true;
          that.score = '5';
        }
        // console.log(that.value2);
      }
    },
    methods: {
      //显示所有订单
      getAllOrder: function() {
        var that = this;
        that.global.axiosPostReq('/OrderDetails/show').then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res);
          } else {
            that.$message.error('网络错误！');
          }
        })
      },
      // 取消订单
      cancel_order: function() {
        var that = this;
        that.dialogVisible = true;
      },
      // 确定取消
      confirm_cancel: function() {
        var that = this;
        that.dialogVisible = false;
        that.$message('取消订单成功！');
      },
      handleClose: function() {
        var that = this;
      },
      // 交易操作
      operate: function(item) {
        var that = this;
        console.log(item.state);
        if(item.state == 2) {
          that.dialogVisibleComment = true;
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .left {
    float: left;
  }
  .search_box {
    width: 300px;
    height: 40px;
    margin-top: 30px;
    position: relative;
  }
  .search_word {
    width: 300px;
    height: 40px;
    padding-left: 10px;
    font-size: 14px;
    border: 1px solid #5DB7E8;
    outline: medium;
  }
  .search_word:focus {
    border: 1px solid #5DB7E7 !important;
/*    transition: all linear 0.2s;*/
  }
  .search_img {
    position: absolute;
    top: 9px;
    right: 2px;
  }
  .order_table {
    width: 1069px;
    height: 40px;
    margin-top: 30px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background-color: #F8F8F8;
  }
  .cargo {
    width: 200px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-right: 180px;
  }
  .price {
    width: 98px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .num {
    width: 80px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .cargo_operate {
    width: 110px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .now_pay {
    width: 183px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .deal_state {
    width: 108px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .deal_operate {
    width: 109px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .order_item {
    width: 1067px;
    font-size: 14px;
    border: 1px solid #D7D7D7;
    position: relative;
    margin-bottom: 40px;
  }
  .order_title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #000;
    background-color: #F8F8F8;
  }
  .order_date {
    margin-left: 43px;
    margin-right: 43px;
  }
  .order_des {
    width: 633px;
    height: 82px;
    padding: 30px 20px 30px 20px;
    border-right: 1px solid #D7D7D7;
    border-top: 1px solid #D7D7D7;
    background-color: #fff;
  }
  .order_des:nth-child(2) {
    border-top: none !important;
  }
  .des_img {
    margin-right: 20px;
    border: 1px solid #D7D7D7;
  }
  .des_p {
    width: 270px;
  }
  .des_price {
    width: 100px;
    margin-top: 26px;
    margin-left: 10px;
  }
  .des_num {
    width: 70px;
    margin-top: 26px;
    margin-left: 10px;
  }
  .des_state {
    width: 70px;
    margin-top: 26px;
  }
  .order_des_right {
    position: absolute;
    top: 40px;
    right: 0px;
    width: 393px;
    background-color: #fff;
  }
  .now_pay_des {
    width: 180px;
    text-align: center;
    margin-top: 30px;
  }
  .now_pay_des p {
    margin-bottom: 5px;
    color: #999999;
    font-size: 14px;
  }
  .spe_p {
    color: #D81E06 !important;
  }
  .wait_pay_des {
    width: 100px;
    margin-top: 53px;
    margin-left: 10px;
    text-align: center;
  }
  .operate_des {
    width: 103px;
    text-align: center;
  }
  .payBtn {
    width: 70px;
    height: 28px;
    margin: 0 auto;
    margin-top: 36px;
    margin-bottom: 5px;
    line-height: 28px;
    background-color: #5DB7E7;
    color: #fff;
    border-radius: 5px;
  }
  .payBtn:hover {
    cursor: pointer;
    background-color: #5ed6dc;
    transition: all ease 0.2s;
  }
  .cancelBtn {
    font-size: 14px;
    color: #999999;
  }
  .cancelBtn:hover {
    cursor: pointer;
    color: #D81E06;
    transition: all ease 0.2s;
  }
/* 暂无订单,没有符合条件的订单*/
  .order_table_spe {
    width: 1069px;
    height: 40px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background-color: #F8F8F8;
  }
  .no_order {
    width: 1069px;
    height: 300px;
    text-align: center;
    font-size: 20px;
    color: #000;
    margin-top: 30px;
    border: 1px solid #D7D7D7;
  }
/* 评论评分框 */
  .comment_box {
    width: 100%;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
  }
  .comment_img {
    border: 1px solid #e9e9e9;
    margin-right: 15px;
    float: left;
  }
  .comment_des {
    margin-top: 18px;
    float: left;
  }
  .score_box {
    width: 100%;
    margin-top: 20px;
  }
  .score_word {
    float: left;
    margin-right: 20px;
  }
  .score_des {
    float: left;
  }
  .comment_word_box {
    width: 100%;
    margin-top: 20px;
  }
  .comment_word_des {
    float: left;
    margin-right: 20px;
  }
  .textarea_des {
    width: 80%;
  }
  .getScore {
    float: left;
    margin-left: 20px;
  }
</style>
