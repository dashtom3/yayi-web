<template>
  <div class="myAdd">
    <div class="add_box">
      <div class="header_box">管理收货地址</div>
        <el-form :model="form" class="form_box">
          <el-form-item label="所在区域" :label-width="formLabelWidth" class="item">
            <myAddress v-on:listenToChild="showFromChild" :selected="this.xRegion" style="width:260px;"></myAddress>
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
            <span style="color: #cb1700;">（选填）</span>
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
        <div v-if="hasAddress">
          <div class="no_address_header">
            <div class="left add_people">收货人</div>
            <div class="left add_place">所在地区</div>
            <div class="left add_des">详细地址</div>
            <div class="left add_mobile">手机号</div>
            <div class="left add_operate">操作</div>
          </div>
          <table class="table_address_header">
            <tr class="address_des" v-for="add in address" :key="add.receiverName">
              <td class="des_people">{{add.receiverName}}</td>
              <td class="des_place">{{add.province}}{{add.city}}{{add.county}}</td>
              <td class="des_des">{{add.receiverDetail}}</td>
              <td class="des_mobile">{{add.phone}}</td>
              <td class="des_operate">
                <i class="el-icon-edit edit" @click="add_edit(add)"></i>
                <i class="el-icon-delete remove" @click="add_remove(add)"></i>
                <div v-if="add.isDefault" class="default_add">默认地址</div>
                <div class="set_default_add" @click="setDefaultAdd(add)">设为默认</div>
              </td>
            </tr>
          </table>
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
          <el-form :model="edForm">
            <el-form-item label="收货人" :label-width="formLabelWidth">
              <el-input v-model="edForm.name" auto-complete="off" style="width:180px;"></el-input>
              <transition name="shake">
                <span v-show="realAlert1" class="error">请填写收货人！</span>
              </transition>
            </el-form-item>
            <el-form-item label="所在区域" :label-width="formLabelWidth">
              <myAddress v-on:listenToChild="showFromChild1" :aselected="this.xRegion1" style="width:260px;"></myAddress>
              <transition name="shake">
                <span v-show="placeAlert1" class="error">请选择所在区域！</span>
              </transition>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="edForm.mobile"  auto-complete="off" style="width:180px;"></el-input>
              <transition name="shake">
                <span v-show="phoneAlert1" class="error">请填写收货人手机号码！</span>
              </transition>
            </el-form-item>
            <el-form-item label="固定电话" :label-width="formLabelWidth">
              <el-input v-model="edForm.gmobile"  auto-complete="off" style="width:180px;"></el-input>
              <span style="color: #D0011B;">（选填）</span>
            </el-form-item>
            <el-form-item label="详细地址" :label-width="formLabelWidth">
              <el-input v-model="edForm.address" auto-complete="off" style="width:70%;"></el-input>
              <transition name="shake">
                <span v-show="addAlert1" class="error">请填写收货人地址！</span>
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
        hasAddress: false,
        editAddVisible: false,
        removeVisible: false,
        allDetail: true,
        defaultAdd: false,
        address:[],
        form: {
          region: '',
          name: '',
          address: '',
          mobile: '',
          gmobile: '',
        },
        edForm: {
          region: '',
          name: '',
          address: '',
          mobile: '',
          gmobile: '',
        },
        formLabelWidth: '120px',
        xRegion: [],
        xRegion1: [],
        editAdd: {},
      }
    },
    components: {
      myAddress,
    },
    watch: {
      xRegion: function() {
        var that = this;
        if (that.xRegion !== []) {
          that.placeAlert = false;
          // that.placeAlert1 = false;
        }
      },
      xRegion1: function() {
        var that = this;
        if (that.xRegion1 !== []) {
          // that.placeAlert = false;
          that.placeAlert1 = false;
        }
      },
      form: {
        handler: function() {
         var that = this;
         if (that.form.name !== '') {
          that.realAlert = false;
         }
         if (that.form.mobile !== '') {
          that.phoneAlert = false;
         }
         if (that.form.address !== '') {
          that.addAlert = false;
         }
        },
        deep: true
      },
      edForm: {
        handler: function() {
         var that = this;
         if (that.edForm.name !== '') {
          that.realAlert1 = false;
         }
         if (that.edForm.mobile !== '') {
          that.phoneAlert1 = false;
         }
         if (that.edForm.address !== '') {
          that.addAlert1 = false;
         }
        },
        deep: true
      }
    },
    created: function () {
      var that = this;
      that.getMyAdd();
    },
    methods: {
      // 获取收货地址列表
      getMyAdd: function() {
        var that = this;
        var obj = {
          token:that.global.getToken(),
        };
        that.global.axiosGetReq('/shoppingAdress/showShippingAddress', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            if (res.data.data.length == 0) {
              that.hasAddress = false;
            } else {
              that.hasAddress = true;
              that.address = res.data.data;
            }
            //this.getData = res.data.data;
          } else {
            // that.$message.error('网络出错，请稍后再试！');
          }
        })
      },
      // 选择所在区域
      showFromChild: function(data) {
        var that = this;
        that.xRegion = data;
        //console.log(that.xRegion,'22');
      },
      showFromChild1: function(data) {
        var that = this;
        that.xRegion1 = data;
        //console.log(that.xRegion,'22');
      },
      showAll: function() {
         var that = this;
      },
      // 保存地址
      save: function() {
        var that = this;
        if(that.xRegion == [] || that.xRegion.length == 0) {
          that.placeAlert = true;
          return false
        }
        if(that.form.name == '') {
          that.realAlert = true;
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
          //isDefault: 1,
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
          } else {
            that.$message.error('保存地址失败！');
          }
        })
      },
      // 修改地址
      add_edit: function(add) {
        var that = this;
        var place = [];
        place.push(add.province);
        place.push(add.city);
        place.push(add.county);
        that.xRegion1 = place;
        that.editAdd = add;
        that.edForm.name = add.receiverName;
        that.edForm.address = add.receiverDetail;
        that.edForm.mobile = add.phone;
        that.edForm.gmobile = add.landlineNumber;
        that.setDefault1 = add.isDefault;
        that.editAddVisible = true;
      },
      // 保存修改
      saveEdit: function() {
        var that = this;
        if(that.edForm.name == '') {
          that.realAlert1 = true;
          return false
        }
        if(that.xRegion1 == [] || that.xRegion1.length == 0) {
          that.placeAlert1 = true;
          return false
        }
        if(that.edForm.mobile == '') {
          that.phoneAlert1 = true;
          return false
        }
        if(that.edForm.address == '') {
          that.addAlert1 = true;
          return false
        }
        var obj = {
          token:that.global.getToken(),
          receiverId: that.editAdd.receiverId,
          province: that.xRegion1[0],
          city: that.xRegion1[1],
          county: that.xRegion1[2],
          receiverName: that.edForm.name,
          receiverDetail: that.edForm.address,
          landlineNumber: that.edForm.gmobile,
          phone: that.edForm.mobile,
          isDefault: that.setDefault1,
        }
        that.global.axiosPostReq('/shoppingAdress/update', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            // console.log(that.xRegion,'frisco');
            that.editAddVisible = false;
            that.xRegion1 = [];
            that.edForm.name = '';
            that.edForm.address = '';
            that.edForm.gmobile = '';
            that.edForm.mobile = '';
            that.setDefault1 = false;
            that.$message('保存地址成功！');
            that.getMyAdd();
          } else {
            that.$message.error('保存地址失败！');
          }
        })
      },
      // 删除地址
      add_remove: function(add) {
        var that = this;
        that.$confirm('此操作将删除该收货地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var obj = {
            receiverId: add.receiverId,
          }
          that.global.axiosGetReq('/shoppingAdress/deleteShippingAddress', obj).then((res) => {
            if (res.data.callStatus === 'SUCCEED') {
              that.getMyAdd();
              that.$message(res.data.msg);
            } else {
              // that.$message.error('网络出错，请稍后再试！');
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });  
      },
      // 设置默认地址
      setDefaultAdd: function(add) {
        var that = this;
        var obj = {
          token:that.global.getToken(),
          receiverId: add.receiverId,
          province: add.province,
          city: add.city,
          county: add.county,
          receiverName: add.receiverName,
          receiverDetail: add.receiverDetail,
          landlineNumber: add.landlineNumber,
          phone: add.phone,
          isDefault: true,
        }
        that.global.axiosPostReq('/shoppingAdress/update', obj).then((res) => {
          if (res.data.callStatus === 'SUCCEED') {
            that.$message('设置默认地址成功！');
            that.getMyAdd();
          } else {
            // that.$message.error('保存地址失败！');
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse:collapse;
  border-spacing:0;
  border: 1px solid #e9e9e9;
}
th,td {
 padding: 0;
 border: 1px solid #e9e9e9;
}
.error {
  position: absolute; 
  margin-left: 20px; 
  color: #D0011B;
}
.left {
  float: left;
}
.news {
  display: inline-block;
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
  background-color: #005aab;
  margin-bottom: 50px;
}
.save_btn:hover {
  cursor: pointer;
  background-color: #329af0;
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
  width: 1067px;
  height: 40px;
  line-height: 40px;
  background-color: #F8F8F8;
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  color: #333;
  font-weight: bold;
  font-size: 14px;
}
.table_address_header {
  width: 1069px;
  height: 40px;
  line-height: 40px;
  border-left: 1px solid #e9e9e9;
  border-right: 1px solid #e9e9e9;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
  font-size: 14px;
}
.add_people {
  width: 164px;
  text-align: center;
/*  position: relative;*/
}
.add_place {
  width: 215px;
  text-align: center;
}
.add_des {
  width: 342px;
  text-align: center;
}
.add_mobile {
  width: 174px;
  text-align: center;
}
.add_operate {
  width: 143px;
  text-align: center;
}
.address_des {
  width: 1069px;
  height: 100%;
  position: relative;
}
.address_des:hover {
  cursor: pointer;
  transition: all ease 0.3s;
  background-color: #F8F8F8;
}
.address_des:hover .set_default_add {
  display: block;
}
.des_people {
  width: 156px;
  font-size: 14px;
  text-align: center;
}
.des_place {
  width: 205px;
  font-size: 14px;
  text-align: center;
}
.des_des {
  width: 327px;
  font-size: 14px;
  text-align: center;
}
.des_mobile {
  width: 165px;
  font-size: 14px;
  text-align: center;
}
.des_operate {
  width: 157px;
  font-size: 14px;
  position: relative;
}
.edit {
  color: #BFBFBF;
  float: left;
  margin-right: 20px;
  margin-left: 20px;
}
.edit:hover, .remove:hover{
  color: #005aab;
  cursor: pointer;
}
.remove {
  color: #BFBFBF;
  float: left;
}
.default_add {
  color: #005aab; 
  font-size:14px;
  margin: auto;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.set_default_add {
  display: none;
  position: absolute;
  top: 50%;
  bottom: 0px;
  right: 5px;
  transform: translateY(-50%);
  width: 80px;
  height: 25px;
  line-height: 25px;
  text-align: center;  
  border-radius: 6px; 
  color: #fff; 
  background-color: #005aab; 
  font-size: 14px;
}
.all_detail {
  position: absolute;
  width: 120px;
  height: 100px;
  background-color: #fff;
  color: #000;
  font-size: 12px;
  border: 1px solid #eaeaea;
  border-radius: 7px;
}
</style>
