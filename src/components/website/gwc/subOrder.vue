<template>
  <div class="subOrder">
    <loading v-if="isLoading"></loading>
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
          <div class="add_item" v-for="(item,index) in items" :key="item" @click="chooseAdd(item)">
            <div class="clearfix"></div>
            <div class="first left">寄送至：</div>
            <div class="second left">
              <el-radio class="radio" v-model="radio" :label="index">{{item.province}} {{item.city}} {{item.county}} {{item.receiverDetail}} ({{item.receiverName}} 收) {{item.phone}}</el-radio>
            </div>
            <i class="el-icon-edit third" @click="add_edit(item)"></i>
            <i class="el-icon-delete fouth" @click="add_remove(item)"></i>
          </div>
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
          <div class="left des_img_img">
            <img style="width:60px;height:60px;" :src="cargo.picPath+'?imageView2/1/w/60/h/60'" alt="img">
          </div>
          <div class="left des_p">
            <p style="margin-bottom: 25px;">{{cargo.itemName}}</p>
            <p>
              <span v-if="cargo.itemPropertyInfo">{{cargo.itemPropertyInfo}}</span>
              <span v-if="cargo.itemPropertyTwoValue">{{'；'+cargo.itemPropertyTwoValue}}</span>
              <span v-if="cargo.itemPropertyThreeValue">{{'；'+cargo.itemPropertyThreeValue}}</span>
              <span v-if="cargo.itemPropertyFourValue">{{'；'+cargo.itemPropertyFourValue}}</span>
              <span v-if="cargo.itemPropertyFiveValue">{{'；'+cargo.itemPropertyFiveValue}}</span>
              <span v-if="cargo.itemPropertySixValue">{{'；'+cargo.itemPropertySixValue}}</span>
            </p>
          </div>
          <div class="left des_price">¥{{cargo.price}}</div>
          <div class="left des_num">{{cargo.num}}</div>
          <div class="left des_stotal">¥{{cargo.price*cargo.num}}</div>
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">乾币抵扣</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked1">使用乾币（1乾币=1元）</el-checkbox>
          <span style="margin-left: 10px;font-size:14px;">（您有<span style="color:#D81E06;">{{allQb}}</span>个乾币,</span>
          <span style="margin-left: 0px;font-size:14px;">本单最多可使用<span style="color:#D81E06;">{{nowQb}}</span>乾币）</span>
          <div style="margin-left:24px;">
            <input type="text" class="qianbi_word" v-show="qianbi_word" @input="changeQb" @blur="qbDed" v-model="qianbi_des" placeholder="请输入乾币数（单位为整数）"><span v-show="hasCount" style="font-size:14px;">已抵扣<span style="color: rgb(216, 30, 6);">{{qianbi_des}}</span>元</span>
          </div>
        </div>
      </div>
      <div class="qianbi_box">
        <div class="qianbi_title">发票</div>
        <div class="qianbi_des">
          <el-checkbox v-model="checked2">申请发票（发票5%）</el-checkbox>
          <div class="tax_word_des" v-show="tax_word_des">
            <span style="margin-right: 10px;">{{taxType}}</span>
            <span style="margin-right: 10px;">{{company_name}}</span>
            <span style="margin-right: 10px;">发票明细</span> 
            <span style="color:#5DB7E7; cursor: pointer;" @click="editTax">修改</span>
          </div>
<!--           <div style="margin-left:24px;">
            <input type="text" class="tax_word" v-show="tax_word" v-model="tax_des" placeholder="请输入姓名或公司名称">
          </div> -->
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
        <input class="leave_word" v-model="leave_des" type="text" placeholder="对本次交易的说明">
      </div>
      <div class="checked_box">
        <p class="first_p"><span style="margin-right: 50px;">共{{haveSelectedGoodNum}}件商品</span><span>商品总额：¥{{gwcTotal}}</span></p>
        <p class="second_p">运费：¥{{freight}}</p>
        <p class="third_p">乾币抵扣：¥{{qbdk}}</p>
        <p class="fouth_p"><b>合计：</b><span style="color: #D81E06;">¥{{gwcTotal+freight-qbdk}}</span></p>
        <p class="fifth_p">本次可获得乾币：{{canHasCoin}}</p>
        <p class="sixth_p"><b>收货人：</b>{{name}} {{phone}}</p>
        <p class="seventh_p"><b>寄送至：</b>{{province}} {{city}} {{county}} {{receiverDetail}} </p>
      </div>
      <div class="clearfix"></div>
      <div class="submit_btn" @click="submit_order">提交订单</div>
      <div class="clearfix"></div>
      <!-- 选择发票类型 开始-->
      <el-dialog title="发票信息" :visible.sync="taxDialogVisible" size="small" :before-close="handleClose">
        <div class="nTax_btn" :class="{ active_btn: isActive1 }" @click="nTaxBtn">普通发票</div>
        <div class="zTax_btn" :class="{ active_btn: isActive2 }" @click="zTaxBtn">增值税发票</div>
        <!--  普通发票选择 开始 -->
        <div class="normalTaxBox" v-if="normal_tax">
          <div class="tax_detail_box">
            <p>选择发票性质为"个人"时，发票抬头为"个人"两字与姓名，如需开具诊所名，请选择发票性质为"公司"</p>
            <p>发票信息相关问题</p>
          </div>
          <div>
            <div style="display:inline-block;font-size:13px;margin-right:45px;">发票性质</div>
            <el-radio class="radio" v-model="taxRadio" label="1">公司</el-radio>
            <el-radio class="radio" v-model="taxRadio" label="2">个人</el-radio>
          </div>
          <!-- 公司发票开票 开始-->
          <el-form v-show="taxActive1" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="margin-top: 20px;">
            <el-form-item label="公司抬头" prop="taitou">
              <el-input v-model="ruleForm.taitou" style="width: 300px !important;" placeholder="请填写营业执照上的公司全称"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="nashui">
              <el-input v-model="ruleForm.nashui" style="width: 300px !important;" placeholder="请填写纳税人识别号或统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item label="发票内容">
              <div class="mingxi">发票明细</div>
            </el-form-item>
            <div style="margin-left:100px;">
              <el-button type="primary" @click="saveComTax('ruleForm')">保存</el-button>
              <el-button @click="cancelTax">不开发票</el-button>
            </div>
          </el-form>
          <!-- 公司发票开票 结束-->
          <!-- 个人发票开票 开始-->
          <el-form v-show="taxActive2" :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" style="margin-top: 20px;">
            <el-form-item label="发票抬头" prop="personal">
              <el-input v-model="ruleForm1.personal" style="width: 300px !important;" placeholder="请填写个人姓名"></el-input>
            </el-form-item>
            <el-form-item label="发票内容">
              <div class="mingxi">发票明细</div>
            </el-form-item>
            <div style="margin-left:100px;">
              <el-button type="primary" @click="savePerTax('ruleForm1')">保存</el-button>
              <el-button @click="cancelTax">不开发票</el-button>
            </div>
          </el-form>
          <!-- 个人发票开票 结束-->
        </div>
        <!--  普通发票选择 结束 -->
        <!--  增值税发票选择 开始 -->
        <div class="addTaxBox" v-else>
          <!-- 公司发票开票 开始-->
          <div class="tax_detail_box">
            <p>必须提供一般纳税人资格证明或相关资料能证明贵司是一般纳税人17个点的，否则不能开具专票</p>
            <p>发票信息相关问题</p>
          </div>
          <span style="font-size:13px; margin-right: 43px;">发票内容</span>
          <div class="mingxi">发票明细</div>
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" style="margin-top: 20px;">
            <el-form-item label="单位名称" prop="companyName">
              <el-input v-model="ruleForm2.companyName" style="width: 300px !important;" placeholder="请填写营业执照上的公司全称"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" style="display:none;">
              <el-input style="width: 300px !important;" placeholder="请填写纳税人识别号或统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item label="纳税人识别号" prop="payTax">
              <el-input v-model="ruleForm2.payTax" style="width: 300px !important;" placeholder="请填写纳税人识别号或统一社会信用代码"></el-input>
            </el-form-item>
            <el-form-item label="注册地址" prop="registerAdd">
              <el-input v-model="ruleForm2.registerAdd" style="width: 300px !important;"></el-input>
            </el-form-item>
            <el-form-item label="注册电话" prop="registerPhone">
              <el-input v-model="ruleForm2.registerPhone" style="width: 300px !important;"></el-input>
            </el-form-item>
            <el-form-item label="开户银行" prop="bank">
              <el-input v-model="ruleForm2.bank" style="width: 300px !important;"></el-input>
            </el-form-item>
            <el-form-item label="银行账号" prop="bankAccount">
              <el-input v-model="ruleForm2.bankAccount" style="width: 300px !important;"></el-input>
            </el-form-item>
            <el-form-item label="收票人姓名" prop="stickName">
              <el-input v-model="ruleForm2.stickName" style="width: 300px !important;"></el-input>
            </el-form-item>
            <el-form-item label="收票人手机号" prop="stickPhone">
              <el-input v-model="ruleForm2.stickPhone" style="width: 300px !important;"></el-input>
            </el-form-item>
            <el-form-item label="收票人地址" prop="stickAdd">
              <el-input v-model="ruleForm2.stickAdd" style="width: 300px !important;"></el-input>
            </el-form-item>
            <div style="margin-left:100px;">
              <el-button type="primary" @click="saveAddTax('ruleForm2')">保存</el-button>
              <el-button @click="cancelTax">不开发票</el-button>
            </div>
          </el-form>
          <!-- 公司发票开票 结束-->
        </div>
        <!--  增值税发票选择 结束 -->
      </el-dialog>
      <!-- 选择发票类型 结束-->
      <!-- 新增／修改地址弹出框开始 -->
      <el-dialog :title="diaTitle" v-model="editAddVisible">
        <el-form :model="form">
          <el-form-item label="收货人" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off" style="width:180px;"></el-input>
            <transition name="shake">
              <span v-show="realAlert" style="margin-left: 20px; color: #D0011B;">请填写收货人！</span>
            </transition>
          </el-form-item>
          <el-form-item label="所在区域" :label-width="formLabelWidth">
            <myAddress v-on:listenToChild="showFromChild" :selected="this.xRegion"></myAddress>
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
            <el-checkbox v-model="setDefault">设为默认地址</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="savePeo" @click="save()">保存修改</el-button>
        </div>
      </el-dialog>
      <!-- 新增／修改地址弹出框结束 -->
    </div>
    <publicFooter></publicFooter>
  </div>
</template>

<script>
  import axios from 'axios'
  import publicHeader from '../index/publicHeader'
  import publicFooter from '../index/publicFooter'
  import myAddress from '../details/selectThree'
  import loading from '../loading'
  export default {
    name: 'subOrder',
    data () {
      return {
        items: [],
        cargos: [],
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
        radio: null,
        diaTitle: '',
        checked1: false,
        checked2: false,
        checked3: false,
        addNewVisible: false,
        editAddVisible: false,
        taxDialogVisible: false,
        taxActive1: true,
        taxActive2: false,
        normal_tax: true,
        removeVisible: false,
        realAlert: false,
        addAlert: false,
        placeAlert: false,
        phoneAlert: false,
        gphoneAlert: false,
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
        setDefault: false,
        tax_des: '',
        qianbi_des: '',
        qbdk: '0',
        tax_word: false,
        qianbi_word: false,
        leave_des: '',
        xRegion: [],
        editAdd: {},
        nowQb: '',
        allQb: '',
        hasCount: false,
        leave_word: 0,
        gwcTotal:'',
        haveSelectedGoodNum: '',
        name: '',
        phone: '',
        province: '',
        city: '',
        county: '',
        receiverDetail: '',
        receiverId: '',
        freight: '',
        fromGwc: '',
        orderItem: '',
        canHasCoin: 0,
        isLoading: false,
        isActive1: true,
        isActive2: false,
        taxRadio: '1',
        ruleForm: {
          taitou: '',
          nashui: '',
        },
        ruleForm1: {
          personal: '',
        },
        ruleForm2: {
          companyName: '',
          payTax: '',
          registerAdd: '',
          registerPhone: '',
          bank: '',
          bankAccount: '',
          stickName: '',
          stickPhone: '',
          stickAdd: '',
        },
        rules: {
          taitou: [
            { required: true, message: '请填写营业执照上的公司全称', trigger: 'blur' }
          ],
          nashui: [
            { required: true, message: '请填写纳税人识别号或统一社会信用代码', trigger: 'blur' }
          ],
        },
        rules1: {
          personal: [
            { required: true, message: '请填写个人姓名', trigger: 'blur' }
          ]
        }, 
        rules2: {
          companyName: [
            { required: true, message: '请填写单位名称', trigger: 'blur' }
          ],
          payTax: [
            { required: true, message: '请填写纳税人识别号或统一社会信用代码', trigger: 'blur' }
          ],
          registerAdd: [
            { required: true, message: '请填写注册地址', trigger: 'blur' }
          ],
          registerPhone: [
            { required: true, message: '请填写注册电话', trigger: 'blur' }
          ],
          bank: [
            { required: true, message: '请填写开户银行', trigger: 'blur' }
          ],
          bankAccount: [
            { required: true, message: '请填写银行账号', trigger: 'blur' }
          ],
          stickName: [
            { required: true, message: '请填写收票人姓名', trigger: 'blur' }
          ],
          stickPhone: [
            { required: true, message: '请填写收票人手机号', trigger: 'blur' }
          ],
          stickAdd: [
            { required: true, message: '请填写收票人地址', trigger: 'blur' }
          ]
        }, 
        tax_word_des: false,
        invoiceHand: 0, //发票抬头
        invoice_style: '',
        invoice_state: '',
        company_name: '',
        taxpayer_num: '',
        registered_address: '',
        registered_phone: '',
        open_bank: '',
        bank_number: '',
        stick_name: '',
        stick_phone: '',
        stick_address: '',
        taxType: '',
      }
    },
    //*******导航钩子*********//
    beforeRouteEnter (to, from, next) {
      // 通过 `vm` 访问组件实例
      next(vm => {
        var that = vm;
        if (that.fromGwc == null) {
          that.$router.push({path:'/gwc'})
        }else {
          that.canHasCoin = that.global.goodToMoney(that.fromGwc.details)
          // console.log(that.fromGwc.details,'uiuiuiu')
          // console.log(that.global.goodToMoney(that.fromGwc.details),'papapap')
        }
      })
    },
    watch: {
      // radio: function() {

      // },
      xRegion: function() {
        var that = this
        if (that.xRegion !== []) {
          that.placeAlert = false
          // that.placeAlert1 = false;
        }
      },
      form: {
        handler: function() {
         var that = this;
         if (that.form.name !== '') {
          that.realAlert = false
         }
         if (that.form.mobile !== '') {
          that.phoneAlert = false
         }
         if (that.form.address !== '') {
          that.addAlert = false
         }
        },
        deep: true
      },
      items: function() {
        var that = this;
        if (that.items.length == 0) {
          that.diaTitle = '新增收货信息'
          that.editAddVisible = true
        }
      },
      checked1: function() {
        var that = this;
        if (that.checked1 == true) {
          that.qianbi_word = true
        } else {
          that.qianbi_word = false
          that.qianbi_des = ''
          that.qbdk = '0'
          that.hasCount = false
        }
      },
      checked2: function() {
        var that = this;
        if (that.checked2 == true && that.taxType == '') {
          that.taxDialogVisible = true
          that.tax_word = true
          that.invoiceHand = 1
        } else {
          that.tax_word = false
          that.tax_des = ''
          that.invoiceHand = 0
          that.tax_word_des = false
          that.ruleForm.taitou = ''
          that.ruleForm.nashui = ''
          that.ruleForm1.personal = ''
          that.ruleForm2.companyName = ''
          that.ruleForm2.payTax = ''
          that.ruleForm2.registerAdd = ''
          that.ruleForm2.registerPhone = ''
          that.ruleForm2.bank = ''
          that.ruleForm2.bankAccount = ''
          that.ruleForm2.stickName = ''
          that.ruleForm2.stickPhone = ''
          that.ruleForm2.stickAdd = ''
          that.taxType = ''
          that.invoice_style = ''
          that.invoice_state = ''
        }
      },
      checked3: function() {
        var that = this;
        if (that.checked3 == false) {
          that.leave_word = 0
        } else {
          that.leave_word = 1
        }
      },
      qianbi_des: function() {
        var that = this;
        if (that.qianbi_des > that.nowQb) {
          that.$message.error('本单最多只可使用' + that.nowQb + '乾币！');
          that.qianbi_des = that.nowQb
        } else if (that.qianbi_des == '') {
          that.hasCount = false
        }
      },
      //发票信息
      taxRadio: function() {
        var that = this
        if (that.taxRadio == '1') {
          that.taxActive1 = true
          that.taxActive2 = false
        } else {
          that.taxActive1 = false
          that.taxActive2 = true
        }
      },
      freight: function() {
        var that = this
        let total = that.gwcTotal + that.freight
        if (that.allQb >= total) {
          that.nowQb = total
        }else {
        
        }
      }
    },
    components: {
      publicHeader,
      publicFooter,
      myAddress,
      loading,
    },
    created: function () {
      var that = this;
      that.getMyAdd();
      var arr = JSON.parse(window.sessionStorage.getItem('suborderData'))
      that.fromGwc = arr;
      that.orderItem = arr.details;
      console.log(that.fromGwc,'uiuiuiu')
      that.cargos = arr.details;
      that.gwcTotal = arr.allMoney;
      that.haveSelectedGoodNum = arr.haveSelectedGoodNum
      that.canHasCoin = that.global.goodToMoney(that.fromGwc.details)
      var obj = {
        token:that.global.getToken()
      };
      that.global.axiosGetReq('/userMyQb/query', obj).then((res) => {
        if (res.data.callStatus === 'SUCCEED') {
          if(res.data.data.length>0){
            that.allQb = res.data.data[0].user.qbBalance;
            that.nowQb = res.data.data[0].user.qbBalance;
          } else {
            that.nowQb = 0
            that.allQb = 0
          }
        } else {
          that.$message.error('网络出错，请稍后再试！');
        }
      })
    },
    mounted: function() {
      var that = this;
    },
    methods: {
      // 修改发票信息
      editTax: function() {
        var that = this
        that.taxDialogVisible = true
        if (that.taxType == '普通发票') {
          that.isActive1 = true;
          that.isActive2 = false;
          that.normal_tax = true;
        } else {
          that.isActive1 = false;
          that.isActive2 = true;
          that.normal_tax = false;
        }
      },
      // 选择普通发票时
      nTaxBtn: function() {
        var that = this
        that.isActive1 = true;
        that.isActive2 = false;
        that.normal_tax = true;
      },
      // 选择增值说发票时
      zTaxBtn: function() {
        var that = this
        that.isActive1 = false;
        that.isActive2 = true;
        that.normal_tax = false;
      },
      // 普通发票公司
      saveComTax: function(formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.taxType = '普通发票'
            that.invoice_style = 0
            that.invoice_state = 1
            that.company_name = that.ruleForm.taitou
            that.taxpayer_num = that.ruleForm.nashui
            that.registered_address = ''
            that.registered_phone = ''
            that.open_bank = ''
            that.bank_number = ''
            that.stick_name = ''
            that.stick_phone = ''
            that.stick_address = ''
            that.tax_word_des = true
            that.taxDialogVisible = false
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      // 普通发票个人
      savePerTax: function(formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.taxType = '普通发票'
            that.invoice_style = 0
            that.invoice_state = 0
            that.company_name = that.ruleForm1.personal
            that.taxpayer_num = ''
            that.registered_address = ''
            that.registered_phone = ''
            that.open_bank = ''
            that.bank_number = ''
            that.stick_name = ''
            that.stick_phone = ''
            that.stick_address = ''
            that.tax_word_des = true
            that.taxDialogVisible = false
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      // 增值税发票
      saveAddTax: function(formName) {
        var that = this
        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.taxType = '增值税发票'
            that.invoice_style = 1
            that.company_name = that.ruleForm2.companyName
            that.taxpayer_num = that.ruleForm2.payTax
            that.registered_address = that.ruleForm2.registerAdd
            that.registered_phone = that.ruleForm2.registerPhone
            that.open_bank = that.ruleForm2.bank
            that.bank_number = that.ruleForm2.bankAccount
            that.stick_name = that.ruleForm2.stickName
            that.stick_phone = that.ruleForm2.stickPhone
            that.stick_address = that.ruleForm2.stickAdd
            that.tax_word_des = true
            that.taxDialogVisible = false
          } else {
            console.log('error submit!!')
            return false;
          }
        })
      },
      cancelTax: function() {
        var that = this
        that.taxDialogVisible = false
        that.checked2 = false
        if (that.taxType !== '') {
          console.log('修改')
        }else {
          that.ruleForm.taitou = ''
          that.ruleForm.nashui = ''
          that.ruleForm1.personal = ''
          that.ruleForm2.companyName = ''
          that.ruleForm2.payTax = ''
          that.ruleForm2.registerAdd = ''
          that.ruleForm2.registerPhone = ''
          that.ruleForm2.bank = ''
          that.ruleForm2.bankAccount = ''
          that.ruleForm2.stickName = ''
          that.ruleForm2.stickPhone = ''
          that.ruleForm2.stickAdd = ''
          that.taxType = ''
        }
      },
      handleClose: function() {
        var that = this;
        that.$confirm('关闭将视为不开发票？').then(_ => {
          that.taxDialogVisible = false;
          that.checked2 = false
          done();
        }).catch(_ => {});
      },
      changeQb: function() {
        var that = this;
        that.hasCount = false;
      },
      //失去焦点时
      qbDed: function() {
        var that = this; 
        var r = /^\+?[1-9][0-9]*$/;　　//正整数
        // if (isNaN(that.qianbi_des)) {
        //   that.$message.error('请输入正确数字格式！');
        //   return false
        // }
        if (!r.test(that.qianbi_des)) {
          that.$message.error('请输入整数！');
          return false
        }
        that.isLoading = true;
        window.setTimeout(function(){
        if (that.qianbi_des !== '') {
          if (that.qianbi_des > that.nowQb) {
            that.$message.error('本单最多只可使用' + that.nowQb + '乾币！');
            that.hasCount = false;
            that.qbdk = 0;
            that.qianbi_des = that.nowQb
            return false
          }
          var obj = {
            token:that.global.getToken(),
            qbnum: parseInt(that.qianbi_des),
          };
          that.global.axiosPostReq('/po/Ded', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              console.log(res.data);
              if (res.data.msg == '余额充足') {
                that.hasCount = true;
                that.qbdk = that.qianbi_des;
                that.isLoading = false;
              } else {
                // that.$message.error(res.data.msg);
                that.$message.error('乾币余额不足！');
                that.hasCount = false;
                that.isLoading = false;
              }
            } else {
              that.$message.error('网络出错，请稍后再试！');
              that.isLoading = false;
            }
          })
        } else {
          that.checked2 = false;
          that.hasCount = false;
          that.isLoading = false;
          that.qbdk = 0;
          that.$message.error('请输入乾币数！');
        }
        },2000)
      },
      // 新增收货地址按钮
      addNew: function() {
        var that = this;
        that.diaTitle = '新增收货信息';
        that.editAddVisible = true;
      },
      // 修改收货地址按钮
      add_edit: function(item) {
        var that = this;
        that.diaTitle = '修改收货信息';
        var place = [];
        place.push(item.province);
        place.push(item.city);
        place.push(item.county);
        that.xRegion = place;
        that.editAdd = item;
        that.form.name = item.receiverName;
        that.form.address = item.receiverDetail;
        that.form.mobile = item.phone;
        that.form.gmobile = item.landlineNumber;
        that.setDefault = item.isDefault;
        that.editAddVisible = true;
      },
      // 获取我的地址
      getMyAdd: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
        };
        that.global.axiosGetReq('/shoppingAdress/showShippingAddress', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            console.log(res.data.data);
            that.items = res.data.data;
            var a = that.items.filter(function(ele,index,arr) {
                return ele.isDefault == true;
            })
            if (a.length == 0) {
              that.radio = 0
              that.name = that.items[0].receiverName
              that.phone = that.items[0].phone
              that.province = that.items[0].province
              that.city = that.items[0].city
              that.county = that.items[0].county
              that.receiverDetail = that.items[0].receiverDetail
              that.receiverId = that.items[0].receiverId
              var arr = JSON.parse(window.sessionStorage.getItem('suborderData'))
              var freight = {
                receiverId: that.items[0].receiverId,
                sumPrice: arr.allMoney,
                itemSum: arr.haveSelectedGoodNum,
              }
              that.global.axiosGetReq('/po/upateAddress', freight).then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  that.freight = res.data.data.postFee
                  let total = that.gwcTotal + that.freight
                  if (that.allQb >= total) {
                    that.nowQb = total
                  }
                  console.log(that.freight,'无默认地址运费')
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
              })
            } else {
              that.name = a[0].receiverName
              that.phone = a[0].phone
              that.province = a[0].province
              that.city = a[0].city
              that.county = a[0].county
              that.receiverDetail = a[0].receiverDetail
              that.receiverId = a[0].receiverId
              var arr = JSON.parse(window.sessionStorage.getItem('suborderData'))
              var freight = {
                receiverId: a[0].receiverId,
                sumPrice: arr.allMoney,
                itemSum: arr.haveSelectedGoodNum,
              }
              that.global.axiosGetReq('/po/upateAddress', freight).then((res) => {
                if (res.data.callStatus === 'SUCCEED') {
                  that.freight = res.data.data.postFee
                  let total = that.gwcTotal + that.freight
                  if (that.allQb >= total) {
                    that.nowQb = total
                  }
                  console.log(that.freight,'运费')
                } else {
                  that.$message.error('网络出错，请稍后再试！');
                }
              })
            }
            for (var i = 0; i < that.items.length; i++) {
              if(that.items[i].isDefault == true) {
                that.radio = i;
              } else {
                that.radio = 0;
              }
            }
            if (res.data.data.length == 0) {
              that.diaTitle = '新增收货信息';
              that.editAddVisible = true;
              return false
            }
            //this.getData = res.data.data;
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 删除地址
      add_remove: function(item) {
        var that = this;
        that.$confirm('此操作将删除该收货地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            receiverId: item.receiverId,
          }
          that.global.axiosGetReq('/shoppingAdress/deleteShippingAddress', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.getMyAdd();
              that.freight = 0;
              that.$message(res.data.msg);
            } else {
              that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      // 选择所在区域
      showFromChild: function(data) {
        var that = this;
        that.xRegion = data;
        //console.log(that.xRegion,'22');
      },
      // 保存地址
      save: function() {
        var that = this;
        if (that.diaTitle == '新增收货信息') {
          if(that.form.name == '') {
            that.realAlert = true;
            return false
          }
          if(that.xRegion == [] || that.xRegion.length == 0) {
            that.placeAlert = true;
            return false
          }
          if(that.form.mobile == '') {
            that.phoneAlert = true;
            return false
          }
          if(that.form.address == '') {
            that.addAlert = true;
            return false
          }
          var obj = {
            token:that.global.getToken(),
            province: that.xRegion[0],
            city: that.xRegion[1],
            county: that.xRegion[2],
            receiverName: that.form.name,
            receiverDetail: that.form.address,
            landlineNumber: that.form.gmobile,
            phone: that.form.mobile,
            isDefault: that.setDefault,
          }
          that.global.axiosPostReq('/shoppingAdress/insert', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              // console.log(that.xRegion,'frisco');
              that.xRegion = [];
              that.form.name = '';
              that.form.address = '';
              that.form.gmobile = '';
              that.form.mobile = '';
              that.setDefault = false;
              that.$message('保存地址成功！');
              that.getMyAdd();
              that.editAddVisible = false;
            } else {
              that.$message.error('保存地址失败！');
            }
          })
        } else {
          if(that.form.name == '') {
            that.realAlert = true;
            return false
          }
          if(that.xRegion == [] || that.xRegion.length == 0) {
            that.placeAlert = true;
            return false
          }
          if(that.form.mobile == '') {
            that.phoneAlert = true;
            return false
          }
          if(that.form.address == '') {
            that.addAlert = true;
            return false
          }
          var obj = {
            token:that.global.getToken(),
            receiverId: that.editAdd.receiverId,
            province: that.xRegion[0],
            city: that.xRegion[1],
            county: that.xRegion[2],
            receiverName: that.form.name,
            receiverDetail: that.form.address,
            landlineNumber: that.form.gmobile,
            phone: that.form.mobile,
            isDefault: that.setDefault,
          }
          that.global.axiosPostReq('/shoppingAdress/update', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              // console.log(that.xRegion,'frisco');
              that.xRegion = [];
              that.form.name = '';
              that.form.address = '';
              that.form.gmobile = '';
              that.form.mobile = '';
              that.setDefault = false;
              that.$message('修改地址成功！');
              that.getMyAdd();
              that.editAddVisible = false;
            } else {
              that.$message.error('保存地址失败！');
            }
          })
        }
      },
      // 选择地址
      chooseAdd: function(item) {
        var that = this;
        that.name = item.receiverName
        that.phone = item.phone
        that.province = item.province
        that.city = item.city
        that.county = item.county
        that.receiverDetail = item.receiverDetail
        that.receiverId = item.receiverId
        var arr = JSON.parse(window.sessionStorage.getItem('suborderData'))
        var freight = {
          receiverId: item.receiverId,
          sumPrice: arr.allMoney,
          itemSum: arr.haveSelectedGoodNum,
        }
        that.global.axiosGetReq('/po/upateAddress', freight).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.freight = res.data.data.postFee
            console.log(that.freight,'选择地址时运费')
          } else {
            that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 提交订单按钮
      submit_order: function() {
        var that = this;
        if (that.receiverId == '') {
          that.$message.error('请选择一个收货地址！');
          return false
        }
        for (var i = 0; i < that.orderItem.length; i++) {
          // that.orderItem[i].itemName = that.orderItem[i].name
          // that.orderItem[i].picPath = that.orderItem[i].pic
          delete that.orderItem[i].name
          delete that.orderItem[i].pic
          delete that.orderItem[i].userId
          delete that.orderItem[i].updated
          delete that.orderItem[i].totalMoney
          delete that.orderItem[i].itemPropertyNamea
          delete that.orderItem[i].itemPropertyNameb
          delete that.orderItem[i].itemPropertyNamec
          delete that.orderItem[i].cartId
          delete that.orderItem[i].checked
          delete that.orderItem[i].created
          delete that.orderItem[i].goodLeaveNum
          delete that.orderItem[i].itemPropertyName
          delete that.orderItem[i].itemPropertyInfo
          delete that.orderItem[i].itemPropertyNameTwo
          delete that.orderItem[i].itemPropertyTwoValue
          delete that.orderItem[i].itemPropertyNameThree
          delete that.orderItem[i].itemPropertyThreeValue
          delete that.orderItem[i].itemPropertyFourName
          delete that.orderItem[i].itemPropertyFourValue
          delete that.orderItem[i].itemPropertyFiveName
          delete that.orderItem[i].itemPropertyFiveValue
          delete that.orderItem[i].itemPropertySixName
          delete that.orderItem[i].itemPropertySixValue
        }
        // console.log(that.orderItem,'ll')
        var orderItem = JSON.stringify(that.orderItem)
        var obj = {
          // totalFee: that.gwcTotal, //总价
          // actualPay: that.gwcTotal-that.qianbi_des, //实际付款
          token:that.global.getToken(),
          receiverId: parseInt(that.receiverId), //收货地址id
          postFee: that.freight,
          // invoiceHand: that.tax_des, //发票抬头
          isRegister: that.leave_word, //是否需要产品注册证
          qbDed: that.qianbi_des, //钱币抵扣
          buyerMessage: that.leave_des, //买家留言
          giveQb: '',  //获得乾币
          orderItem: orderItem, //JSON数组
          invoiceStyle: that.invoice_style, // 发票类型
          invoiceState: that.invoice_state, // 发票性质
          invoiceHand: that.invoiceHand, //发票抬头
          companyName: that.company_name,
          taxpayerNum: that.taxpayer_num,
          registeredAddress: that.registered_address,
          registeredPhone: that.registered_phone,
          openBank: that.open_bank,
          bankNumber: that.bank_number,
          stickName: that.stick_name,
          stickPhone: that.stick_phone,
          stickAddress: that.stick_address,
        }
        console.log(obj,'opopopp');
        axios.defaults.headers['token'] = that.global.getToken()
        that.global.axiosPostReq('/po/generaOrder', obj).then((res) => {
          console.log(res,'huihui')
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data == null) {
              that.$message.error('提交订单失败！');
            } else{
              console.log(res.data.data.actualPay, 'kkkkk')
              if (res.data.data.actualPay == 0) {
                that.$router.push({name:'paySuccess', params: { payData: 'success' }})
              } else {
                let orderD = res.data.data
                window.sessionStorage.setItem('order', JSON.stringify(orderD))
                window.sessionStorage.removeItem('suborderData')
                that.$router.push({ path:'/pay' });
              }
            }
          } else {
            that.$message.error('提交订单失败！');
          }
        })
      }
    }
  }
</script>
<style>
.el-form-item__label {
  text-align: left !important;
  font-size: 13px !important;
/*  width: 110px !important;*/
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  border: 1px solid #e9e9e9;
  outline:medium;
  font-size: 14px;
  padding: 0 7px 0 7px;
}
input:focus {
  border: 1px solid #e9e9e9;
}
.el-radio__label {
  padding-left: 20px !important;
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
/*.otherAdd {
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
}*/
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
  margin-top: 20px;
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
}
.des_img_img {
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
  width: 68px;
  margin-top: 26px;
  margin-right: 138px;
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
  margin-bottom: 40px;
}
.qianbi_title {
  font-weight: bold;
  font-size: 14px;
}
.qianbi_des {
   margin-top: 20px;
/*   margin-left: 70px;*/
}
.tax_word {
   margin-top: 10px;
   width: 200px;
   height: 30px;
}
.qianbi_word {
   margin-top: 10px;
   width: 200px;
   height: 30px;
   margin-right: 13px;
}
.qianbi_word:focus,.tax_word:focus,.leave_word:focus {
   border: 1px solid #5DB7E7;
   transition: all ease 0.5s;
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
.nTax_btn {
  width: 100px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 7px;
  display: inline-block;
  margin-right: 10px;
}
.zTax_btn {
  width: 100px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 7px;
  display: inline-block;
}
.active_btn {
  cursor: pointer;
  border: 1px solid #5DB7E7;
  background-color: #5DB7E7;
  color: #fff;
}
.zTax_btn:hover,.nTax_btn:hover {
  cursor: pointer;
  border: 1px solid #5DB7E7;
  background-color: #5DB7E7;
  color: #fff;
  transition: all ease 0.5s;
}
.tax_detail_box {
  margin-top: 15px;
  margin-bottom: 15px;
  background-color: #FFFDED;
  font-size: 12px;
}
.mingxi {
  width: 80px;
  height: 37px;
  line-height: 37px;
  text-align: center;
  border: 1px solid #5DB7E7;
  background-color: #5DB7E7;
  color: #fff;
  border-radius: 7px;
  display: inline-block;
}
.tax_word_des {
  font-size: 14px; 
  margin-top: 10px;
}
</style>
