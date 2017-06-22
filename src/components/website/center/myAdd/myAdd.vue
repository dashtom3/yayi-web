<template>
  <div class="myAdd">
    <div class="add_box">
      <div class="header_box">管理收货地址</div>
        <el-form :model="form" class="form_box">
          <el-form-item label="所在区域" :label-width="formLabelWidth" class="item">
            <myAddress v-on:listenToChild="showFromChild" style="width:260px;"></myAddress>
            <transition name="shake">
              <span v-show="placeAlert" class="error">请选择所在区域！</span>
            </transition>
          </el-form-item>
          <el-form-item label="收货人" :label-width="formLabelWidth" class="item">
            <el-input v-model="form.name" auto-complete="off" style="width:260px;"></el-input>
            <transition name="shake">
              <span v-show="realAlert" class="error">请填写收货人！</span>
            </transition>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth" class="item">
            <el-input v-model="form.mobile" auto-complete="off" style="width:260px;"></el-input>
            <transition name="shake">
              <span v-show="phoneAlert" class="error">请填写收货人手机号码！</span>
            </transition>
          </el-form-item>
          <el-form-item label="固定电话" :label-width="formLabelWidth" class="item">
            <el-input v-model="form.gmobile" auto-complete="off" style="width:260px;"></el-input>
            <span style="color: #D0011B;">（选填）</span>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth" class="item">
            <el-input v-model="form.address" auto-complete="off" style="width:720px;"></el-input>
            <transition name="shake">
              <span v-show="addAlert" class="error">请填写收货人地址！</span>
            </transition>
          </el-form-item>
          <el-form-item :label-width="formLabelWidth">
            <el-checkbox v-model="setDefault">设为默认地址</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="save_btn" @click="save()">保存</div>
        <!--  v-if start -->
        <div v-if="hasAddress" class="has_address_box">
          <div class="no_address_header">
            <div class="left add_people">收货人</div>
            <div class="left add_place">所在地区</div>
            <div class="left add_des">详细地址</div>
            <div class="left add_mobile">手机号</div>
            <div class="left add_operate">操作</div>
          </div>
          <div class="address_des" v-for="add in address" :key="add">
            <div class="left des_people">{{add.people}}</div>
            <div class="left des_place">{{add.place}}</div>
            <div class="left des_des">{{add.des}}</div>
            <div class="left des_mobile">{{add.mobile}}</div>
            <div class="left des_operate">
              <i class="el-icon-edit edit" @click="add_edit"></i>
              <i class="el-icon-delete remove" @click="add_remove"></i>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <!--  v-if end -->
        <!--  v-else start -->
        <div v-else class="no_address_box">
          <div class="no_address_header">
            <div class="left add_people">收货人</div>
            <div class="left add_place">所在地区</div>
            <div class="left add_des">详细地址</div>
            <div class="left add_mobile">手机号</div>
            <div class="left add_operate">操作</div>
          </div>
          <div style="margin-top:67px; margin-bottom:40px;"><img src="../../../../images/center/noOrder.png" alt="img"></div>
          <div><img src="../../../../images/center/noMessage.png" alt="img"></div>
        </div>
        <!--  v-else end -->
        <!-- 修改地址弹出框开始 -->
        <el-dialog title="修改收货信息" v-model="editAddVisible">
          <el-form :model="form">
            <el-form-item label="收货人" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" style="width:180px;"></el-input>
              <transition name="shake">
                <span v-show="realAlert1" style="color: #D0011B;">请填写收货人！</span>
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
              <span style="color: #D0011B;">（选填）</span>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" auto-complete="off" style="width:70%;"></el-input>
              <transition name="shake">
                <span v-show="addAlert1" style="margin-left: 20px; color: #D0011B;">请填写收货人地址！</span>
              </transition>
            </el-form-item>
            <el-form-item  :label-width="formLabelWidth">
              <el-checkbox v-model="setDefault1">设为默认地址</el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" class="savePeo" @click="saveEdit()">保存修改</el-button>
          </div>
        </el-dialog>
        <!-- 修改地址弹出框结束 -->
        <!-- 删除地址弹出框开始 -->
        <el-dialog title="删除收货信息" :visible.sync="removeVisible" size="tiny">
          <span>是否确定删除收货地址?</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="removeVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm_cancel()">确 定</el-button>
          </span>
        </el-dialog>
        <!-- 删除地址弹出框结束 -->
    </div>
  </div>
</template>

<script>
  import myAddress from '../../details/selectThree'
  export default {
    name: 'myAdd',
    data () {
      return {
        realAlert: false,
        addAlert: false,
        placeAlert: false,
        phoneAlert: false,
        setDefault: false,
        realAlert1: false,
        addAlert1: false,
        placeAlert1: false,
        phoneAlert1: false,
        setDefault1: false,
        hasAddress: true,
        editAddVisible: false,
        removeVisible: false,
        address:[{
          people: '收货人1号',
          place: '上海 上海市 静安区',
          des: '共和新路街道洛川中路1100弄31号103（居委会）',
          mobile: '18652111236',
        },{
          people: '收货人1号',
          place: '上海 上海市 静安区',
          des: '共和新路街道洛川中路1100弄31号103（居委会）',
          mobile: '18652111236',
        },{
          people: '收货人1号',
          place: '上海 上海市 静安区',
          des: '共和新路街道洛川中路1100弄31号103（居委会）',
          mobile: '18652111236',
        }],
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
      }
    },
    components: {
      myAddress,
    },
    created: function () {
      var that = this;
      var obj = {
        token:that.global.getToken()
      };
      // that.global.axiosGetReq('/userMyQb/query', obj)
      // .then((res) => {
      //   if (res.data.callStatus === 'SUCCEED') {
      //     this.getData = res.data.data;
      //   } else {
      //     that.$message.error('网络出错，请稍后再试！');
      //   }
      // })
    },
    methods: {
      //
      showFromChild: function(data) {
        var that = this;
        console.log(data,'22');
      },
      // 保存地址
      save: function() {
        var that = this;
        that.realAlert = true;
        that.addAlert = true;
        that.placeAlert = true;
        that.phoneAlert = true;
      },
      // 修改地址
      add_edit: function() {
        var that = this;
        that.editAddVisible = true;
      },
      // 删除地址
      add_remove: function() {
        var that = this;
        that.removeVisible = true;   
      },
      // 确定取消
      confirm_cancel: function() {
        var that = this;
        that.removeVisible = false;
        that.$message('删除地址成功！');
        if (condition) {
          expression
        }
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  position: absolute; 
  margin-left: 20px; 
  color: #D0011B;
}
.left {
  float: left;
}
.add_box {
  width: 1069px;
}
.header_box {
  width: 1031px;
  height: 32px;
  padding-left: 38px;
  border-bottom: 1px solid #e9e9e9;
  font-size: 14px;
}
.form_box {
  margin-top: 30px;
}
.item {
  margin-bottom: 39px !important;
}
.save_btn {
  width: 160px;
  height: 43px;
  line-height: 42px;
  margin: 0 auto;
  text-align: center;
  color: #fff;
  border-radius: 5px;
  background-color: #5DB7E7;
  margin-bottom: 50px;
}
.save_btn:hover {
  cursor: pointer;
  background-color: #5ed6dc;
  transition: all ease 0.5s;
}
.has_address_box {
  width: 1069px;
  border: 1px solid #e9e9e9;
  text-align: center;
}
.no_address_box {
  width: 1069px;
  height: 303px;
  border: 1px solid #e9e9e9;
  text-align: center;
}
.no_address_header {
  width: 1069px;
  height: 40px;
  line-height: 40px;
  background-color: #F8F8F8;
  color: #333;
  font-weight: bold;
  font-size: 14px;
}
.add_people {
  width: 156px;
  text-align: center;
}
.add_place {
  width: 210px;
  text-align: center;
}
.add_des {
  width: 332px;
  text-align: center;
}
.add_mobile {
  width: 171px;
  text-align: center;
}
.add_operate {
  width: 200px;
  text-align: center;
}
.address_des {
  width: 1069px;
}
.des_people {
  width: 156px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
/*  border-left: 1px solid #e9e9e9;*/
  border-right: 1px solid #e9e9e9;
/*  border-bottom: 1px solid #e9e9e9;*/
}
.des_place {
  width: 210px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #e9e9e9;
/*  border-bottom: 1px solid #e9e9e9;*/
}
.des_des {
  width: 332px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #e9e9e9;
/*  border-bottom: 1px solid #e9e9e9;*/
}
.des_mobile {
  width: 171px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  border-right: 1px solid #e9e9e9;
/*  border-bottom: 1px solid #e9e9e9;*/
}
.des_operate {
  width: 195px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
/*  border-right: 1px solid #e9e9e9;*/
/*  border-bottom: 1px solid #e9e9e9;*/
}
.edit {
  color: #BFBFBF;
  margin-right: 50px;
}
.edit:hover, .remove:hover{
  color: #5DB7E7;
  cursor: pointer;
}
.remove {
  color: #BFBFBF;
}
</style>
