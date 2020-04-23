<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="420"
    >
      <div class="title-tip">设置选项</div>
      <div class="change-ps-input">
        <span class="role-tip">名称：</span>
        <el-input class="input-box" type="text" v-model="params.name" placeholder="请输入选项名称" />
      </div>
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
        <span class="role-tip">分数：</span>
        <el-input
          class="input-box"
          type="number"
          v-model="params.score"
          placeholder="请输入选项分数"
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
<!--      <div class="change-ps-input" style="border: none">-->
<!--        <span class="role-tip">角色：</span>-->
<!--        <el-select v-model="params.roleId" size="small" placeholder="请选择" class="select-box">-->
<!--          <el-option v-for="item in roleList" :key="item.id" :label="item.role" :value="item.id"></el-option>-->
<!--        </el-select>-->
<!--      </div>-->
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
  import {  addTestOneTestItem,updateTestOneTestItem  } from "@/api/userInfo";
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
          score: "",
          name: "",
          img:""
        },
        show:false

      };
    },
    methods: {
      handleAvatarSuccess(res, file) {

      },
       beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }

        let fd = new FormData();
        fd.append('file',file);//传文件
        // fd.append('id',this.srid);//传其他参数
         uploadPic(fd).then(res=>{
           this.params.img=res.data
           console.log(res)
        })
        // axios.post(`${axios.defaults.baseURL}/ftp/upload`,fd).then(function(res){
        //   // alert('成功');
        //   console.log(res)
        // })
        return isJPG && isLt2M;
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
        if (this.show) {
          //编辑
          updateTestOneTestItem(this.params).then(res => {
            if (res.code === 0) {
              this.$message.success("编辑成功");
              this.$emit("updateList");
              this.status = !this.status;
            }
          });
        } else {
          //添加
          let e ={
            uuid:this.params.id,
            ...this.params
          }
          addTestOneTestItem(e).then(res => {
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
      if(this.contentList.add){
        this.params = this.contentList
        this.show=true
      } else {
        this.params.id=this.contentList.id

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
      width: 60px;
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
