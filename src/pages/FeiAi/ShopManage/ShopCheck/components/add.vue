<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="600"
      :height="420"
    >

      <div class="title-tip">设置装企</div>
      <div class="change-ps-input">
        <span class="role-tip">公司名称：</span>
        <el-input class="input-box" type="text" v-model="params.name" placeholder="请输入公司名称" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">营业执照编号：</span>
        <el-input class="input-box" type="text" v-model="params.businesslicenseCode" placeholder="请输入营业执照编号" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">法人姓名：</span>
        <el-input class="input-box" type="text" v-model="params.juridicalPerson" placeholder="请输入法人姓名" />
      </div>
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">注册时间：</span>-->
<!--          <el-date-picker-->
<!--            v-model="params.createDate"-->
<!--            format="yyyy-MM-dd "-->
<!--            value-format="yyyy-MM-dd "-->
<!--            type="date"-->
<!--            placeholder="选择注册时间">-->
<!--          </el-date-picker>-->
<!--      </div>-->
      <div class="change-ps-input">
        <span class="role-tip">注册资金：</span>
        <el-input class="input-box" type="text" v-model="params.createNumber" placeholder="请输入注册资金" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">公司地址：</span>
        <el-input class="input-box" type="text" v-model="params.address" placeholder="请输入公司地址" />
      </div>
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">装企描述：</span>-->
<!--        <el-input class="input-box" type="text" v-model="params.describe" placeholder="请输入装企描述" />-->
<!--      </div>-->
      <div class="change-ps-input">
        <span class="role-tip">星级：</span>
        <el-input-number class="input-box" v-model="params.level"  :min="1" :max="10" label="请输入星级"></el-input-number>
      </div>
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">营业执照：</span>-->
<!--        <el-input class="input-box" style="width: 196px" type="text" readonly >-->
<!--          <template slot="prepend" style="background: #ffffff">-->
<!--            &lt;!&ndash;            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />&ndash;&gt;-->
<!--            <img v-if="params.businesslicense"  @click="$imageViewer" :src="params.businesslicense"  min-width="20" height="26"  >-->
<!--          </template>-->
<!--          <template slot="append">-->

<!--            <el-upload-->
<!--              ref="upload"-->
<!--              action="https://jsonplaceholder.typicode.com/posts/"-->
<!--              :show-file-list="false"-->
<!--              :on-success="handleAvatarSuccess"-->
<!--              :before-upload="(file)=> beforeAvatarUpload(file,'businesslicense')"-->
<!--              :auto-upload="true">-->
<!--              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>-->
<!--            </el-upload>-->
<!--          </template>-->

<!--        </el-input>-->

<!--      </div>-->
      <div class="change-ps-input">
        <span class="role-tip">店铺照片：</span>
        <el-input class="input-box" style="width: 196px" type="text" readonly >
          <template slot="prepend" style="background: #ffffff">
            <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
            <img v-if="params.storePhotos"  @click="$imageViewer" :src="params.storePhotos"  min-width="20" height="26"  >
          </template>
          <template slot="append">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="(file)=> beforeAvatarUpload(file,'storePhotos')"
              :auto-upload="true">
              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
            </el-upload>
          </template>

        </el-input>

      </div>
      <div class="change-ps-input">
        <span class="role-tip">营业执照：</span>
        <el-input class="input-box" style="width: 196px" type="text" readonly >
          <template slot="prepend" style="background: #ffffff">
            <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
            <img v-if="params.businesslicense"  @click="$imageViewer" :src="params.businesslicense"  min-width="20" height="26"  >
          </template>
          <template slot="append">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="(file)=> beforeAvatarUpload(file,'businesslicense')"
              :auto-upload="true">
              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
            </el-upload>
          </template>

        </el-input>

      </div>
      <div class="change-ps-input">
        <span class="role-tip">logo：</span>
        <el-input class="input-box" style="width: 196px" type="text" readonly >
          <template slot="prepend" style="background: #ffffff">
            <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
            <img v-if="params.logo"  @click="$imageViewer" :src="params.logo"  min-width="20" height="26"  >
          </template>
          <template slot="append">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="(file)=> beforeAvatarUpload(file,'logo')"
              :auto-upload="true">
              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
            </el-upload>
          </template>

        </el-input>

      </div>
      <div class="change-ps-input">
        <span class="role-tip">详情图：</span>
        <el-input class="input-box" style="width: 196px" type="text" readonly >
          <template slot="prepend" style="background: #ffffff">
            <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
            <img v-if="params.details"  @click="$imageViewer" :src="params.details"  min-width="20" height="26"  >
          </template>
          <template slot="append">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="(file)=> beforeAvatarUpload(file,'details')"
              :auto-upload="true">
              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
            </el-upload>
          </template>

        </el-input>

      </div>

      <el-button
        @click="saveSetting"
        class="test-btn"
        type="primary"
        size="mini"
      >确定</el-button>
    </love-dialog>
  </div>
</template>

<script>
  import LoveDialog from "@/components/NoLoveDialog";
  import {  putShopManage  } from "@/api/shopManage";
  import { uploadPic } from "@/api/uploadPic";
  import axios from "axios"
  export default {
    components: {
      LoveDialog
    },
    props: {
      modelStatus: {
        type: Boolean
      },
      contentList: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        status: true,
        params: {
          url: "",
          name: "",
          icon:""

        },

      };
    },
    methods: {
      handleAvatarSuccess(res, file) {

      },
      beforeAvatarUpload(file,type) {
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = testmsg === 'jpg'
        const extension2 = testmsg === 'png'
        const extension3 = testmsg === 'jpeg'
        const isLt2M = file.size / 1024 / 1024 < 10
        if(!extension && !extension2 && !extension3) {
          this.$message({
            message: '上传文件只能是 jpg、png格式!',
            type: 'warning'
          });
        }
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 10MB!',
            type: 'warning'
          });
        }

        let fd = new FormData();
        fd.append('file',file);//传文件
        // fd.append('id',this.srid);//传其他参数
        uploadPic(fd).then(res=>{
          this.params[type]=res.data
          console.log(res)
        })
        // axios.post(`${axios.defaults.baseURL}/ftp/upload`,fd).then(function(res){
        //   // alert('成功');
        //   console.log(res)
        // })
        return testmsg && isLt2M;
        // return false  //屏蔽了action的默认上传

      },
      //得到角色列表
      getRoleList: function() {
        getAdminRole().then(res => {
          if (res.code === 0) {
            this.roleList = res.data.list;
          }
        });
      },
      beforeClose: function() {
        this.$emit("closeStatus");
      },
      saveSetting() {

        if(!this.params.name){
          this.alertMessage('请输入公司名称')
          return;
        }
        if(!this.params.businesslicenseCode){
          this.alertMessage('请输入营业执照编号')
          return;
        }

        if(!this.params.juridicalPerson){
          this.alertMessage('请输入法人姓名')
          return;
        }
        if(!this.params.createNumber){
          this.alertMessage('请输入注册资金')
          return;
        }
        if(!this.params.businesslicenseCode){
          this.alertMessage('请输入营业执照编号')
          return;
        }
        if(!this.params.address){
          this.alertMessage('请输入地址')
          return;
        }
        // if(!this.params.describe){
        //   this.alertMessage('请输入装企描述')
        //   return;
        // }
        if(!this.params.level){
          this.alertMessage('请选择星级')
          return;
        }
        if(!this.params.storePhotos){
          this.alertMessage('请选择店铺照片')
          return;
        }
        if(!this.params.businesslicense){
          this.alertMessage('请选择营业执照')
          return;
        }
        if(!this.params.logo){
          this.alertMessage('请选择logo')
          return;
        }
        if(!this.params.details){
          this.alertMessage('请选择详情图')
          return;
        }

        putShopManage(this.params).then(res => {
          if (res.code === 0) {
            this.$message.success("编辑成功");
            this.$emit("updateList",{isUpdataList: !this.isUpdataList});
            this.status = !this.status;
          }
        });


        // if (this.params.id) {
        //   //编辑
        //   updateButton(this.params).then(res => {
        //     if (res.code === 0) {
        //       this.$message.success("编辑成功");
        //       this.$emit("updateList");
        //       this.status = !this.status;
        //     }
        //   });
        // } else {
        //   //添加
        //   addButton(this.params).then(res => {
        //     if (res.code === 0) {
        //       this.$message.success("添加成功");
        //       this.$emit("updateList");
        //       this.status = !this.status;
        //     }
        //   });
        // }
      }
    },
    created() {
      if(this.contentList.uuid){

        this.params = this.contentList
      }

      console.log(this.contentList)
      // this.getRoleList();
      this.status = this.modelStatus;
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
  .test-btn{
    /*width: 50px;*/
    height: 55px;
    border-radius: 50%;
    text-align: center;
    position: fixed;
    right: 20px;
    top: 45%;
  }
  .change-ps-input {
    width: 90%;
    height: 48px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    .role-tip {
      width: 120px;
      text-align: right;
    }
    span {
      line-height: 59px;
    }
    .input-box {
      width: 236px;
      margin-top: 10px;
    }
    .select-box {
      margin-top: 10px;
      width: 236px;
    }
  }
  .btn{
    width: 60px;
    margin-top: 10px;
    /*display: flex;*/
  }
  .setting-perssion {
    width: 90%;
    margin: 10px 5%;
    .content-box {
      margin-bottom: 20px;
      transition: all, 0.6s;
      .cloumn-content {
        display: flex;
        display: -webkit-flex;
        margin-top: 20px;
        .content-title {
          margin-left: 32px;
        }
        .check-box {
          margin-right: 84px;
          .box-detail {
            margin-left: 64px;
          }
        }
      }
    }
  }
</style>
