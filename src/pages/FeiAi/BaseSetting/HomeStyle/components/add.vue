<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="420"
    >
      <div class="title-tip">设置图片及链接</div>
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">名称：</span>-->
<!--        <el-input class="input-box" type="text" v-model="params.name" placeholder="请输入图标名称" />-->
<!--      </div>-->
      <div class="change-ps-input">
        <span class="role-tip">图片：</span>
        <el-input class="input-box" style="width: 196px" type="text" readonly >
          <template slot="prepend" style="background: #ffffff">
            <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
            <img v-if="params.img"  @click="$imageViewer" :src="params.img"  min-width="20" height="26"  >
          </template>
          <template slot="append">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :auto-upload="true">
              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
            </el-upload>
          </template>

        </el-input>

      </div>
      <div class="change-ps-input">
        <span class="role-tip">链接类型：</span>
        <div style="margin-top: 20px;display: flex" class="input-box">
          <el-radio v-model="pictextType" label="1"  size="small">文字</el-radio>
          <el-radio v-model="pictextType" label="2"  size="small">图片</el-radio>
        </div>
      </div>
      <div class="change-ps-input">
        <span class="role-tip">链接：</span>
        <el-input class="input-box" style="width: 196px" type="text" readonly v-if="pictextType==2">
          <template slot="prepend" style="background: #ffffff">
            <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
            <img v-if="params.url"  @click="$imageViewer" :src="params.url"  min-width="20" height="26"  >
          </template>
          <template slot="append">

            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="(file)=> beforeAvatarUpload(file,'url')"
              :auto-upload="true">
              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
            </el-upload>
          </template>

        </el-input>
        <el-input
          class="input-box"
          type="text"
          v-model="params.url"
          placeholder="请输入路由"
          v-if="pictextType==1"
        />
      </div>

      <!--      <div class="change-ps-input">-->
      <!--        <span class="role-tip">密码：</span>-->
      <!--        <el-input-->
      <!--          class="input-box"-->
      <!--          type="text"-->
      <!--          v-model="params.password"-->
      <!--          placeholder="请输入登录密码"-->
      <!--        />-->
      <!--      </div>-->
            <div class="change-ps-input" style="border: none" v-if="!this.params.id">
              <span class="role-tip">角色：</span>
              <div style="margin-top: 15px;display: flex" class="input-box">
                <el-radio v-model="params.type" label="1" border size="small">轮播图</el-radio>
                <el-radio v-model="params.type" label="2" border size="small">广告位</el-radio>
              </div>
            </div>
      <el-button
        @click="saveSetting"
        style="margin-left: 140px;position: fixed;bottom: 30px;"
        type="info"
        class="dialog-btn"
      >确定</el-button>
    </love-dialog>
  </div>
</template>

<script>
  import LoveDialog from "@/components/NoLoveDialog";
  import {  addHomeStyle, updateHomeStyle  } from "@/api/baseSetting";
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
          img: "",
          type:'1'

        },
        pictextType:'1'

      };
    },
    methods: {
      handleAvatarSuccess(res, file) {

      },
      beforeAvatarUpload(file,name) {
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
          if(name=='url'){
            this.params.url=res.data
          } else {
            this.params.img=res.data
          }
          this.$forceUpdate()

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
        if(!this.params.img){
          this.alertMessage('请选择图片')
          return;
        }
        if (this.params.id) {
          //编辑
          updateHomeStyle(this.params).then(res => {
            if (res.code === 0) {
              this.$message.success("编辑成功");
              this.$emit("updateList");
              this.status = !this.status;
            }
          });
        } else {
          //添加
          addHomeStyle(this.params).then(res => {
            if (res.code === 0) {
              this.$message.success("添加成功");
              this.$emit("updateList");
              this.status = !this.status;
            }
          });
        }
      }
    },
    created() {
      if(this.contentList.id){
        this.params = this.contentList
        var testmsg=this.contentList.url.substring(this.contentList.url.lastIndexOf('.')+1)
        const extensio = testmsg === 'jpg'
        const extensio2 = testmsg === 'png'
        if(extensio || extensio2) {
          this.pictextType='2'
        }
      }

      // this.getRoleList();
      this.status = this.modelStatus;
    },
    mounted() {}
  };
</script>
<style lang="scss" scoped>
  .change-ps-input {
    width: 90%;
    height: 48px;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    .role-tip {
      width: 100px;
      text-align: right;
    }
    span {
      line-height: 59px;
    }
    .input-box {
      width: 196px;
      margin-top: 10px;
    }
    .select-box {
      margin-top: 10px;
      width: 196px;
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
