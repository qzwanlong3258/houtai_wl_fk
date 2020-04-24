<template>
  <div>
    <div class="base-information">
      <div class="layout-title">信息详情</div>
      <div class="safe-setting">
<!--        <div class="infor-input">-->
<!--          <span>-->
<!--            角色：-->
<!--            <span class="value-show" style="color: #666">{{userInformation.roleName}}</span>-->
<!--          </span>-->
<!--          <span class="search-value" @click="changePhoneFun">修改</span>-->
<!--        </div>-->
        <div class="infor-input">
          <span>
            昵称：
            <span class="value-show" style="color: #666">{{userInformation.nickName}}</span>
          </span>
          <span class="search-value" @click="changeNickNameFun">修改</span>
        </div>
        <div class="infor-input">
          <span>
            用户名：
            <span class="value-show" style="color: #666">{{userInformation.username}}</span>
          </span>
          <span class="search-value" @click="changeUserNameFun">修改</span>
        </div>
        <div class="infor-input">
          <span>
            登录密码：
            <span class="value-show" style="color: #666" @click="showClick"><span style="color: #666">{{show? userInformation.password.replace(/./g, "*"):userInformation.password}}</span> <span style="font-size: 9px;color: #666" v-if="show">(点击显示)</span></span>

          </span>
          <span class="search-value" @click="changePasswordFun">修改</span>
        </div>
        <div class="infor-input">
          <span>
            密保手机：
            <span class="value-show" style="color: #666">{{userInformation.phone}}</span>
          </span>
          <span class="search-value" @click="changePhoneFun">修改</span>
        </div>
         <div class="infor-input">
          <span>
            密保邮箱：
            <span class="value-show" style="color: #666">{{userInformation.email}}</span>
          </span>
          <span class="search-value" @click="changeEmailFun">修改</span>
        </div>
        <div class="infor-input">
          <span>
            头像：
            <img class="head-photo" :src="userInformation.avatarUrl" alt="图片失焦" />
          </span>
          <el-upload
            class="upload-value"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >修改</el-upload>
        </div>
      </div>
    </div>
    <div style="height: 60px"></div>
    <love-dialog class="palyer-dialog" :visible.sync="changePassword" :width="400" :height="240">
      <div class="input-box">
        <div class="change-ps-input">
          <input type="password" v-model="oldPassword" placeholder="请输入旧密码" />
        </div>
        <div class="change-ps-input">
          <input type="password" v-model="newPassword" placeholder="请输入6-8位新密码" />
        </div>
        <div class="change-ps-input">
          <input type="password" v-model="newPasswordAgain" placeholder="请再次确认密码" />
        </div>
      </div>
      <el-button @click="saveNewPassword" type="info" class="dialog-btn">确认修改</el-button>
    </love-dialog>
    <love-dialog class="palyer-dialog" :visible.sync="changePhone" :width="400" :height="208">
      <div class="input-box">
        <div style="width: 90%;margin-left: 6%;" class="change-ps-input">
          <i class="iconfont icon-PCchawanwu_yanzhengma"></i>
          <input style="width: 90%" type="text" v-model="newPhone" placeholder="请输入新的密保手机" />
        </div>
<!--        <div style="width: 90%;margin-left: 6%;" class="change-ps-input">-->
<!--          <i class="iconfont icon-PCchawanwu_shurumima"></i>-->
<!--          <input style="width: 60%" type="text" v-model="newCode" placeholder="请输入六位验证码" />-->
<!--          <div class="check-code" @click="getCodeEvent">-->
<!--            <span>{{codeValue}}</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <el-button @click="saveNewPhone" type="info" class="dialog-btn">确认修改</el-button>
    </love-dialog>
     <love-dialog class="palyer-dialog" :visible.sync="changeEmail" :width="400" :height="178">
      <div class="input-box">
        <div style="width: 90%;margin-left: 6%;" class="change-ps-input">
          <i class="iconfont icon-PCchawanwu_yanzhengma"></i>
          <input style="width: 90%" type="text" v-model="newEmail" placeholder="请输入新的密保邮箱" />
        </div>
      </div>
      <el-button @click="saveNewEmail" type="info" class="dialog-btn">确认</el-button>
    </love-dialog>
    <love-dialog class="palyer-dialog" :visible.sync="changeNickName" :width="400" :height="178">
      <div class="input-box">
        <div style="width: 90%;margin-left: 6%;" class="change-ps-input">
          <i class="iconfont icon-PCchawanwu_yanzhengma"></i>
          <input style="width: 90%" type="text" v-model="newNickName" placeholder="请输入新的用户名" />
        </div>
      </div>
      <el-button @click="saveNewNickName" type="info" class="dialog-btn" >确认</el-button>
    </love-dialog>
    <love-dialog class="palyer-dialog" :visible.sync="changeUserName" :width="400" :height="178">
      <div class="input-box">
        <div style="width: 90%;margin-left: 6%;" class="change-ps-input">
          <i class="iconfont icon-PCchawanwu_yanzhengma"></i>
          <input style="width: 90%" type="text" v-model="newUserName" placeholder="请输入新的用户名" />
        </div>
      </div>
      <el-button @click="saveNewUserName" type="info" class="dialog-btn" >确认</el-button>
    </love-dialog>
  </div>
</template>
<script>
import LoveDialog from "@/components/NoLoveDialog";
import {
  changeUserPassword,
  getCode,
  changeUserPhone,
  changeUserAvatar,
  changeUserInfor,
  getUserInfor
} from "@/api/login";
import {
  checkPassword,
  checkPhone,
  checkCode,
  checkEmail
} from "@/utils/check.js";
import { mapMutations, mapActions } from "vuex";
import { getCookie } from "@/utils/cookie";
import { uploadPic } from "@/api/uploadPic";
export default {
  data() {
    return {
      show:true,
      codeValue: "获取验证码",
      changePassword: false,
      oldPassword: "",
      newPassword: "",
      newPasswordAgain: "",
      changePhone: false,
      newPhone: "",
      newCode: "",
      changeEmail: false,
      newEmail: "",
      newNickName:'',
      newUserName:'',
      avatar:'',
      userInformation: {},
      changeNickName:false,
      changeUserName:false
    };
  },
  components: {
    LoveDialog
  },

  methods: {
    ...mapActions(["clearToken"]),
    showClick(){
      this.show= !this.show
    },
    //验证码倒计时
    getCodeTime: function(options) {
      var that = this;
      var currentTime = 300;
      that.codeValue = currentTime + "秒";
      let interval = setInterval(function() {
        that.codeValue = currentTime - 1 + "秒";
        currentTime--;
        if (currentTime <= 0) {
          clearInterval(interval);
          that.codeValue = "获取验证码";
        }
      }, 1000);
    },
    //获取验证码
    getCodeEvent: function() {
      const _this = this;
      if (this.codeValue == "获取验证码") {
        getCode({ phone: this.newPhone }).then(res => {
          if (res.code === 0) {
            _this.getCodeTime();
            this.$message.success("验证码已发送");
          }
        });
      }
    },
    //修改密码
    changePasswordFun: function() {
      this.changePassword = !this.changePassword;
    },
    saveNewPassword: function() {
      let temp = true;
      //验证旧密码
      let checkOldPasswordObj = checkPassword(this.oldPassword);
      if (!checkOldPasswordObj.status) {
        temp = false;
        this.$message.error(`旧${checkOldPasswordObj.msg}`);
        return;
      }
      //验证新密码
      let checkPasswordObj = checkPassword(this.newPassword);
      if (!checkPasswordObj.status) {
        temp = false;
        this.$message.error(`新${checkPasswordObj.msg}`);
        return;
      }
      //确认密码与新密码是否一致
      if (this.newPassword != this.newPasswordAgain) {
        temp = false;
        this.$message.error("两次输入密码不一致");
        return;
      }
      if (this.oldPassword === this.newPassword) {
        temp = false;
        this.$message.error("新旧密码不能一致");
        return;
      }
      if (temp) {
        // changeUserPassword({
        //   oldPassword: this.oldPassword,
        //   newPassword: this.newPassword
        // }).then(res => {
        //   if (res.code === 0) {
        //     this.$message.success(`密码修改成功`);
        //     this.clearToken().then(res => {
        //       if (res.code === 0) {
        //         this.$router.push({ path: "/login" });
        //       } else {
        //         this.$Message.error(res.msg);
        //       }
        //     });
        //     this.changePasswordFun();
        //   }
        // });
        changeUserInfor({
          password: this.newPassword,
        }).then(res => {
          if (res.code === 0) {
            this.$message.success(`密码修改成功`);
            this.clearToken().then(res => {
              if (res.code === 0) {
                this.$router.push({ path: "/login" });
              } else {
                this.$Message.error(res.msg);
              }
            });
            this.changePasswordFun();
          }
        });
      }
    },
    //修改手机号码
    changePhoneFun: function() {
      this.changePhone = !this.changePhone;
    },
    saveNewPhone: function() {
      let e={
        phone:this.newPhone
      }

      changeUserInfor(e).then(res=>{
        // this.changePhoneFun()
        // this.getData()
        // this.$message.success("修改手机号成功");
        if (res.code === 0) {
          this.clearToken().then(res => {
            if (res.code === 0) {
              this.$router.push({ path: "/login" });
            } else {
              this.$Message.error(res.msg);
            }
          });
          this.$message.success(`手机修改成功,请重新登录`);
        }
      })
      // let temp = true;
      // //验证手机号码
      // let checkPhoneObj = checkPhone(this.newPhone);
      // if (!checkPhoneObj.status) {
      //   temp = false;
      //   this.$message.error(checkPhoneObj.msg);
      //   return;
      // }
      // //验证注册验证码
      // let checkCodeObj = checkCode(this.newCode);
      // if (!checkCodeObj.status) {
      //   temp = false;
      //   this.$message.error(checkCodeObj.msg);
      //   return;
      // }
      // if (temp) {
      //   changeUserPhone({ phone: this.newPhone, code: this.newCode }).then(
      //     res => {
      //       if (res.code === 0) {
      //         this.clearToken().then(res => {
      //           if (res.code === 0) {
      //             this.$router.push({ path: "/login" });
      //           } else {
      //             this.$Message.error(res.msg);
      //           }
      //         });
      //         this.$message.success(`手机修改成功,请重新登录`);
      //         this.changePhoneFun();
      //       }
      //     }
      //   );
      // }
    },
    //修改邮箱
    changeEmailFun: function() {
      this.changeEmail = !this.changeEmail;
    },
    saveNewEmail: function() {
      let e={
        email:this.newEmail
      }

      changeUserInfor(e).then(res=>{
        this.changeEmailFun()
        this.getData()
        this.$message.success("修改邮箱成功");
      })
      // let temp = true;
      // let checkEmailObj = checkEmail(this.newEmail);
      // if (!checkEmailObj.status) {
      //   temp = false;
      //   this.$message.error(checkEmailObj.msg);
      //   return;
      // }
      // if (temp) {
      //   this.$message.success(`验证已发送您的邮箱，请查看`);
      //   this.changeEmailFun();
      // }
    },
    //修改昵称
    changeNickNameFun(){
      this.changeNickName = !this.changeNickName;
    },
    saveNewNickName(){
      let e={
        nickName:this.newNickName
      }

      changeUserInfor(e).then(res=>{
        // this.changeNickNameFun()
        // this.getData()
        // this.$message.success("修改昵称成功");
        if (res.code === 0) {
          this.clearToken().then(res => {
            if (res.code === 0) {
              this.$router.push({ path: "/login" });
            } else {
              this.$Message.error(res.msg);
            }
          });
          this.$message.success(`昵称修改成功,请重新登录`);
        }
      })
    },
    //修改用户名
    changeUserNameFun(){
      this.changeUserName = !this.changeUserName;
    },
    saveNewUserName(){
      let e={
        username:this.newUserName
      }

      changeUserInfor(e).then(res=>{
        if (res.code === 0) {
          this.clearToken().then(res => {
            if (res.code === 0) {
              this.$router.push({ path: "/login" });
            } else {
              this.$Message.error(res.msg);
            }
          });
          this.$message.success(`用户名修改成功,请重新登录`);
        }
      })
    },
    handleAvatarSuccess(res, file) {

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      let fd = new FormData();
      fd.append('file',file);//传文件
      // fd.append('id',this.srid);//传其他参数
      uploadPic(fd).then(res=>{
        this.userInformation.avatarUrl=res.data
        console.log(res)
        let e={
          avatarUrl:this.userInformation.avatarUrl
        }


        changeUserInfor(e).then(res => {
          if (res.code === 0) {
            this.clearToken().then(res => {
              if (res.code === 0) {
                this.$router.push({ path: "/login" });
              } else {
                this.$Message.error(res.msg);
              }
            });
            this.$message.success(`头像修改成功,请重新登录`);
          }
        });
      })

      return isJPG && isLt2M;
    },
    getData(){
      getUserInfor().then(res=>{
        this.userInformation=res.data.list[0]
      })
    },
  },
  mounted() {
    this.getData()
    // this.userInformation = JSON.parse(getCookie("user"));
  }
};
</script>
<style lang="scss">
@import "src/assets/style/mixin";
@import "src/assets/style/variable";
.palyer-dialog {
  .input-box {
    .change-ps-input {
      display: inline-block;
      width: 75%;
      height: 48px;
      margin: 0 12.5%;
      border-bottom: 1px solid #ddd;
      input {
        width: 96%;
        margin-left: 2%;
        margin-top: 12px;
        height: 36px;
        border: none;
        outline: none;
        -webkit-appearance: none;
      }
      i {
        color: $hover-color;
      }
      .check-code {
        position: absolute;
        right: 0;
        margin-top: -30px;
        margin-right: 36px;
        span {
          display: block;
          width: 90px;
          height: 20px;
          font-size: 13px;
          border: 1px solid $hover-color;
          color: #999;
          line-height: 22px;
          text-align: center;
          border-radius: 9px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "src/assets/style/mixin";
@import "src/assets/style/variable";
.base-information {
  position: relative;
  width: 96%;
  height: 470px;
  margin: 60px 2% 0;
  border: 1px solid #dcdfe6;
  .safe-setting {
    width: 90%;
    margin: 0 5%;
    .infor-input {
      width: 100%;
      height: 62px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      span {
        color: $hover-color;
        margin-top: 36px;
      }
      .head-photo {
        width: 40px;
        height: 40px;
        @include rounded(50%);
        background-color: #666;
        margin-top: -20px;
        cursor: pointer;
        position: absolute;
        margin-left: 30px;
      }
      .value-show {
        margin-top: 36px;
        border: none;
        outline: none;
        -webkit-appearance: none;
        margin-left: 10px;
        width: 50%;
      }
      .search-value {
        text-decoration: underline;
        cursor: pointer;
      }
      .upload-value {
        width: 30px;
        height: 30px;
        line-height: 48px;
        color: $hover-color;
        border-bottom: 1px solid $hover-color;
        margin-top: 20px;
      }
    }
  }
}
.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}
</style>
