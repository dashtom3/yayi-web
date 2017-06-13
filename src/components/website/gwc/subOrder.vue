<template>
  <div class="subOrder">
    <publicHeader></publicHeader>
    <div class="confirmAdd_box">
      <div class="title_box">
        <img class="confirmAdd_img" src="../../../images/gwc/subOrder.png" alt="img">
        <div class="line"></div>
      </div>
      <div class="address_box">
        <div class="address_title">
          <p class="left_word">收货信息</p>
          <p class="right_word" @click="addNew">新增收货地址</p>
        </div>
        <div class="add_des_box">
          <div class="add_item" v-for="item in items" :key="item">
            <div class="clearfix"></div>
            <div class="first left">寄送至：</div>
            <div class="second left">
              <el-radio class="radio" v-model="radio" :label="item.num">{{item.add}}</el-radio>
            </div>
            <i class="el-icon-edit third" @click="add_edit"></i>
            <i class="el-icon-delete fouth" @click="add_remove"></i>
          </div>
          <div class="otherAdd">使用其它地址</div>
        </div>
      </div>
      <div class="list_box">
        <div class="list_title">商品清单</div>
        <div class="list_header">
          <div class="left message">商品信息</div>
          <div class="left price">单价（元）</div>
          <div class="left num">数量</div>
          <div class="left stotal">小计（元）</div>
        </div>
        <div class="list_des" v-for="cargo in cargos">
          <div class="left des_img">
            <img src="../../../images/center/order.png" alt="img">
          </div>
          <div class="left des_p">
            <p style="margin-bottom: 40px;">{{cargo.des}}</p>
            <p>{{cargo.color}}</p>
          </div>
          <div class="left des_price">¥{{cargo.price}}</div>
          <div class="left des_num">{{cargo.num}}</div>
          <div class="left des_stotal">¥{{cargo.price*cargo.num}}</div>
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">钱币抵扣</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked1">使用钱币（1钱币=1元）</el-checkbox>
          <span style="margin-left: 50px;font-size:14px;">做多可使用<span style="color:#D81E06;">200</span>钱币</span>  
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">发票</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked2">申请发票（发票5%）</el-checkbox>
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">产品注册证</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked3">需要产品注册证号（纸质）</el-checkbox>
        </div>
      </div>
      <div class="leave_message">
        <div class="leave_title">订单留言</div>
        <input class="leave_word" type="text" placeholder="对本次交易的说明">
      </div>
      <div class="checked_box">
        <p class="first_p"><span style="margin-right: 50px;">共5件商品</span><span>商品总额：¥245.00</span></p>
        <p class="second_p">运费：¥8.00</p>
        <p class="third_p">钱币抵扣：¥20.00</p>
        <p class="fouth_p"><b>合计：</b><span style="color: #D81E06;">¥96.00</span></p>
        <p class="fifth_p">本次可获得钱币：¥6.00</p>
        <p class="sixth_p"><b>收货人：</b>李子林 13611890909</p>
        <p class="seventh_p"><b>寄送至：</b>上海 杨浦区 城区 中国创业者公共实训基地1号楼-国定东路200号中国创业者公共实训基地903室</p>
      </div>
      <div class="clearfix"></div>
      <div class="submit_btn" @click="submit_order">提交订单</div>
      <div class="clearfix"></div>
      <!-- 修改地址弹出框开始 -->
      <el-dialog title="修改收货信息" v-model="editAddVisible">
        <el-form :model="form">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="realAlert1" style="margin-left: 20px; color: #D0011B;">请填写收货人！</span>
            </transition>
          </el-form-item>
          <el-form-item label="所在区域" :label-width="formLabelWidth">
            <myAddress></myAddress>
            <transition name="shake">
              <span v-show="placeAlert" style="margin-left: 20px; color: #D0011B;">请选择所在区域！</span>
            </transition>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="phoneAlert" style="margin-left: 20px; color: #D0011B;">请填写收货人手机号码！</span>
            </transition>
          </el-form-item>
          <el-form-item label="固定电话" :label-width="formLabelWidth">
            <el-input v-model="form.gmobile" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="gphoneAlert" style="margin-left: 20px; color: #D0011B;">请填写收货人固定电话号码！</span>
            </transition>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" auto-complete="off" style="width:70%;"></el-input>
            <transition name="shake">
              <span v-show="addAlert" style="margin-left: 20px; color: #D0011B;">请填写收货人地址！</span>
            </transition>
          </el-form-item>
          <el-form-item  :label-width="formLabelWidth">
            <el-checkbox v-model="setDefault2">设为默认地址</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="savePeo" @click="save()">保存修改</el-button>
        </div>
      </el-dialog>
      <!-- 修改地址弹出框结束 -->
      <!-- 删除地址弹出框开始 -->
      <el-dialog title="删除收货信息" :visible.sync="removeVisible" size="tiny" :before-close="handleClose">
        <span>是否确定删除收货地址?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="removeVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm_cancel()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除地址弹出框结束 -->
      <!-- 新增地址弹出框开始 -->
      <el-dialog title="添加收货信息" v-model="addNewVisible">
        <el-form :model="form">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="realAlert1" style="margin-left: 20px; color: #D0011B;">请填写收货人！</span>
            </transition>
          </el-form-item>
          <el-form-item label="所在区域" :label-width="formLabelWidth">
            <myAddress></myAddress>
            <transition name="shake">
              <span v-show="placeAlert1" style="margin-left: 20px; color: #D0011B;">请选择所在区域！</span>
            </transition>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="phoneAlert1" style="margin-left: 20px; color: #D0011B;">请填写收货人手机号码！</span>
            </transition>
          </el-form-item>
          <el-form-item label="固定电话" :label-width="formLabelWidth">
            <el-input v-model="form.gmobile" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="gphoneAlert1" style="margin-left: 20px; color: #D0011B;">请填写收货人固定电话号码！</span>
            </transition>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" auto-complete="off" style="width:70%;"></el-input>
            <transition name="shake">
              <span v-show="addAlert1" style="margin-left: 20px; color: #D0011B;">请填写收货人地址！</span>
            </transition>
          </el-form-item>
          <el-form-item  :label-width="formLabelWidth">
            <el-checkbox v-model="setDefault2">设为默认地址</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="savePeo" @click="save()">保存修改</el-button>
        </div>
      </el-dialog>
      <!-- 新增地址弹出框结束 -->
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'
  import myAddress from '../details/selectThree'
  export default {
    name: 'subOrder',
    data () {
      return {
        items: [{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '1'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '2'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '3'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '4'
        },{
          add: '上海市 杨浦区 五角场镇 国定东路200号1号楼903室（王林娟 收）13122390809',
          num: '5'
        }],
        cargos: [{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        },{
          des: '爱丽丝 标准#',
          color: '红色厚',
          price: 134,
          num: 1,
        }],
        place:[{
          "ProID": 1,
          "name": "北京市",
          "ProSort": 1,
          "ProRemark": "直辖市"
        }, {
          "ProID": 2,
          "name": "天津市",
          "ProSort": 2,
          "ProRemark": "直辖市"
        }, {
          "ProID": 3,
          "name": "河北省",
          "ProSort": 5,
          "ProRemark": "省份"
        }, {
          "ProID": 4,
          "name": "山西省",
          "ProSort": 6,
          "ProRemark": "省份"
        }, {
          "ProID": 5,
          "name": "内蒙古自治区",
          "ProSort": 32,
          "ProRemark": "自治区"
        }, {
          "ProID": 6,
          "name": "辽宁省",
          "ProSort": 8,
          "ProRemark": "省份"
        }, {
          "ProID": 7,
          "name": "吉林省",
          "ProSort": 9,
          "ProRemark": "省份"
        }, {
          "ProID": 8,
          "name": "黑龙江省",
          "ProSort": 10,
          "ProRemark": "省份"
        }, {
          "ProID": 9,
          "name": "上海市",
          "ProSort": 3,
          "ProRemark": "直辖市"
        }, {
          "ProID": 10,
          "name": "江苏省",
          "ProSort": 11,
          "ProRemark": "省份"
        }, {
          "ProID": 11,
          "name": "浙江省",
          "ProSort": 12,
          "ProRemark": "省份"
        }, {
          "ProID": 12,
          "name": "安徽省",
          "ProSort": 13,
          "ProRemark": "省份"
        }, {
          "ProID": 13,
          "name": "福建省",
          "ProSort": 14,
          "ProRemark": "省份"
        }, {
          "ProID": 14,
          "name": "江西省",
          "ProSort": 15,
          "ProRemark": "省份"
        }, {
          "ProID": 15,
          "name": "山东省",
          "ProSort": 16,
          "ProRemark": "省份"
        }, {
          "ProID": 16,
          "name": "河南省",
          "ProSort": 17,
          "ProRemark": "省份"
        }, {
          "ProID": 17,
          "name": "湖北省",
          "ProSort": 18,
          "ProRemark": "省份"
        }, {
          "ProID": 18,
          "name": "湖南省",
          "ProSort": 19,
          "ProRemark": "省份"
        }, {
          "ProID": 19,
          "name": "广东省",
          "ProSort": 20,
          "ProRemark": "省份"
        }, {
          "ProID": 20,
          "name": "海南省",
          "ProSort": 24,
          "ProRemark": "省份"
        }, {
          "ProID": 21,
          "name": "广西壮族自治区",
          "ProSort": 28,
          "ProRemark": "自治区"
        }, {
          "ProID": 22,
          "name": "甘肃省",
          "ProSort": 21,
          "ProRemark": "省份"
        }, {
          "ProID": 23,
          "name": "陕西省",
          "ProSort": 27,
          "ProRemark": "省份"
        }, {
          "ProID": 24,
          "name": "新疆维吾尔自治区",
          "ProSort": 31,
          "ProRemark": "自治区"
        }, {
          "ProID": 25,
          "name": "青海省",
          "ProSort": 26,
          "ProRemark": "省份"
        }, {
          "ProID": 26,
          "name": "宁夏回族自治区",
          "ProSort": 30,
          "ProRemark": "自治区"
        }, {
          "ProID": 27,
          "name": "重庆市",
          "ProSort": 4,
          "ProRemark": "直辖市"
        }, {
          "ProID": 28,
          "name": "四川省",
          "ProSort": 22,
          "ProRemark": "省份"
        }, {
          "ProID": 29,
          "name": "贵州省",
          "ProSort": 23,
          "ProRemark": "省份"
        }, {
          "ProID": 30,
          "name": "云南省",
          "ProSort": 25,
          "ProRemark": "省份"
        }, {
          "ProID": 31,
          "name": "西藏自治区",
          "ProSort": 29,
          "ProRemark": "自治区"
        }, {
          "ProID": 32,
          "name": "台湾省",
          "ProSort": 7,
          "ProRemark": "省份"
        }, {
          "ProID": 33,
          "name": "澳门特别行政区",
          "ProSort": 33,
          "ProRemark": "特别行政区"
        }, {
          "ProID": 34,
          "name": "香港特别行政区",
          "ProSort": 34,
          "ProRemark": "特别行政区"
        }], //省市地址
        radio: '',
        checked1: false,
        checked2: false,
        checked3: false,
        addNewVisible: false,
        editAddVisible: false,
        removeVisible: false,
        realAlert: false,
        addAlert: false,
        placeAlert: false,
        phoneAlert: false,
        gphoneAlert: false,
        realAlert1: false,
        addAlert1: false,
        placeAlert1: false,
        phoneAlert1: false,
        gphoneAlert1: false,
        form: {
          name: '',
          region: '',
          address: '',
          mobile: '',
          gmobile: '',
          type: [],
          resource: '',
        },
        formLabelWidth: '120px',
        setDefault2: false,
      }
    },
    components: {
      publicHeader,
      publicFooter,
      myAddress,
    },
    methods: {
      // 新增收货地址按钮
      addNew: function() {
        var that = this;
        that.addNewVisible = true;
      },
      // 修改收货地址按钮
      add_edit: function() {
        var that = this;
        that.editAddVisible = true;
      },
      // 删除收货地址按钮
      add_remove: function() {
        var that = this;
        that.removeVisible = true;
      },
      // 确定取消
      confirm_cancel: function() {
        var that = this;
        that.removeVisible = false;
        that.$message('删除地址成功！');
      },
      // 提交订单按钮
      submit_order: function() {
        var that = this;
        that.$router.push({ path:'/pay' });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*过渡动画开始*/
  .shake-enter-active {
    animation: shake .5s;
  }
  .shake-leave-active {
    transition: all 0.3s ease;
    opacity: 0;
  }
  @-webkit-keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  @keyframes shake {
    from, to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    10%, 30%, 50%, 70%, 90% {
      -webkit-transform: translate3d(-7px, 0, 0);
      transform: translate3d(-7px, 0, 0);
    }

    20%, 40%, 60%, 80% {
      -webkit-transform: translate3d(7px, 0, 0);
      transform: translate3d(7px, 0, 0);
    }
  }

  .shake {
    -webkit-animation-name: shake;
    animation-name: shake;
  }
  /*过渡动画结束*/
input {
  border: 1px solid #e9e9e9;
  outline:medium;
  font-size: 15px;
  padding: 0 7px 0 7px;
}
input:focus {
  border: 1px solid #e9e9e9;
}
.left {
  float: left;
}
.confirmAdd_box {
  width: 1200px;
/*  background-color: #EECE7C;*/
  margin: 0 auto;
}
.title_box {
  text-align: center;
  margin-bottom: 30px;
}
.confirmAdd_img {
  width: 241px;
  height: 97px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #5DB7E7;
  margin-top: 31px;
}
.address_box {
  width: 100%;
  border-bottom: 1px solid #E9E9E9;
  padding-bottom: 30px;
}
.address_title {
  width: 100%;
  height: 40px;
  position: relative;
  margin-bottom: 10px;
}
.left_word {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  font-weight: bold;
  color: #000;
}
.right_word {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 14px;
  color: #000;
}
.add_des_box {
  width: 100%;
}
.add_item {
  width: 1200px;
  height: 40px;
  line-height: 41px;
  position: relative;
  margin-bottom: 5px;
}
.add_item:hover {
  cursor: pointer;
  background-color: #5DB7E7;
  transition: all ease-out 0.3s;
  color: #fff;
}
.add_item:hover .el-radio{
  color: #fff !important;
  transition: all ease-out 0.3s;
}
.add_item:hover .first{
  opacity: 1;
}
.add_item:hover .third{
  opacity: 1;
}
.add_item:hover .fouth{
  opacity: 1;
}
.first {
  margin-left: 30px;
  margin-right: 77px;
  font-size: 14px;
  opacity: 0;
}
.second {
  font-size: 14px;
}
.third {
  position: absolute;
  top: 13px;
  right: 100px;
  opacity: 0;
}
.fouth {
  position: absolute;
  top: 13px;
  right: 20px;
  opacity: 0;
}
.el-icon-edit, .el-icon-delete {
  color: #fff;
}
.otherAdd {
  width: 160px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #E9E9E9;
  color: #010101;
  font-size: 14px;
  margin-left: 163px;
  margin-top: 40px;
}
.otherAdd:hover {
  cursor: pointer;
  opacity: 0.8;
}
.list_box {
  width: 1200px;
  margin-top: 23px;
  font-size: 14px;
  border-bottom: 1px solid #E9E9E9;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.list_title {
  font-weight: bold;
}
.list_header {
  width: 1200px;
  height: 40px;
  line-height: 40px;
  margin-top: 40px;
  background-color: #E9E9E9;
}
.message {
  margin-left: 160px;
}
.price {
  margin-left: 333px;
}
.num {
  margin-left: 200px;
}
.stotal {
  margin-left: 200px;
}
.list_des {
  width: 1160px;
  height: 63px;
  padding: 40px 20px 40px 20px;
/*  background-color: #A08F65;*/
}
.des_img {
  margin-right: 20px;
  border: 1px solid #D7D7D7;
}
.des_p {
  width: 420px;
} 
.des_price {
  width: 75px;
  text-align: center;
  margin-top: 26px;
  margin-right: 200px;
}
.des_num {
  width: 32px;
  margin-top: 26px;
  margin-right: 170px;
  text-align: center;
}
.des_stotal {
  width: 120px;
  margin-top: 26px;
  text-align: center;
  color: #D81E06;
}
.qianbi_box {
  width: 1200px;
  height: 80px;
  position: relative;
  margin-bottom: 50px;
}
.qianbi_title {
  font-weight: bold;
  font-size: 14px;
}
.qianbi_des {
  position: absolute;
  left: 150px;
  bottom: 0px;
}
.leave_message {
  width: 1200px;
  height: 80px;
  position: relative;
  border-bottom: 1px solid #E9E9E9;
  margin-bottom: 50px;
/*  background-color: #EECE7C;*/
  position: relative;
  font-size: 14px;
}
.leave_title {
  font-weight: bold;
  position: absolute;
  top: 8px;
}
.leave_word {
  width: 722px;
  height: 38px;
  position: absolute;
  top: 0px;
  left: 126px;
}
.checked_box {
  width: 472px;
  height: 308px;
  border: 1px solid #5DB7E7;
  padding: 20px;
  float: right;
}
.first_p {
  width: 330px;
  margin-left: 98px;
  margin-bottom: 25px;
  font-size: 14px;
}
.second_p {
  margin-left: 240px;
  margin-bottom: 25px;
  font-size: 14px;
}
.third_p {
  margin-left: 213px;
  margin-bottom: 25px;
  font-size: 14px;
}
.fouth_p {
  margin-left: 240px;
  margin-bottom: 25px;
  font-size: 14px;
}
.fifth_p {
  margin-left: 170px;
  margin-bottom: 25px;
  font-size: 14px;
  color: #5DB7E7;
}
.sixth_p {
  margin-bottom: 25px;
  font-size: 14px;
}
.seventh_p {
  font-size: 14px;
}
.submit_btn {
  width: 160px;
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #fff;
  background-color: #5DB7E7;
  border-radius: 5px;
  float: right;
  margin-top: 30px;
  margin-bottom: 100px;
}
.submit_btn:hover {
  background-color: #5ed6dc;
  transition: all ease 0.5s;
  cursor: pointer;
}
.right_word:hover {
  color: #5DB7E7;
  transition: all ease 0.5s;
  cursor: pointer;
}
</style>
