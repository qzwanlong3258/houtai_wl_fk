<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="420"
    >
      <div class="title-tip">优惠券</div>
      <div class="change-ps-input">
        <span class="role-tip">描述：</span>
        <el-input class="input-box" type="text" v-model="params.describe" placeholder="请输入优惠卷描述" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">开始时间：</span>
        <el-date-picker
          v-model="params.begin"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd "
          type="date"
          placeholder="选择开始时间">
        </el-date-picker>
      </div>
      <div class="change-ps-input">
        <span class="role-tip">结束时间：</span>
        <el-date-picker
          v-model="params.end"
          format="yyyy-MM-dd "
          value-format="yyyy-MM-dd "
          type="date"
          placeholder="选择结束时间">
        </el-date-picker>
      </div>
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">图片：</span>-->
<!--        <el-input class="input-box" style="width: 196px" type="text" readonly >-->
<!--          <template slot="prepend" style="background: #ffffff">-->
<!--&lt;!&ndash;            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />&ndash;&gt;-->
<!--            <img v-if="params.icon"  @click="$imageViewer" :src="params.icon"  min-width="20" height="26"  >-->
<!--          </template>-->
<!--          <template slot="append">-->

<!--            <el-upload-->
<!--              ref="upload"-->
<!--              action="https://jsonplaceholder.typicode.com/posts/"-->
<!--              :show-file-list="false"-->
<!--              :on-success="handleAvatarSuccess"-->
<!--              :before-upload="beforeAvatarUpload"-->
<!--              :auto-upload="true">-->
<!--              <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>-->
<!--            </el-upload>-->
<!--          </template>-->

<!--        </el-input>-->

<!--      </div>-->
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">路由：</span>-->
<!--        <el-input-->
<!--          class="input-box"-->
<!--          type="text"-->
<!--          v-model="params.url"-->
<!--          placeholder="请输入路由"-->
<!--        />-->
<!--      </div>-->
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
  import {  addCoupon, putCoupon  } from "@/api/shopManage";
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
          begin:'',
          end:'',
          describe:'',
          img:''

        },

      };
    },
    methods: {
      handleAvatarSuccess(res, file) {

      },
       beforeAvatarUpload(file) {
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
           this.params.icon=res.data
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
        if(!this.params.describe){
          this.alertMessage('请输入优惠卷描述')
          return;
        }
        if(!this.params.begin){
          this.alertMessage('请选择开始时间')
          return;
        }
        if(!this.params.end){
          this.alertMessage('请选择结束时间')
          return;
        }
        if (this.contentList.describe) {
          //编辑
          putCoupon(this.params).then(res => {
            if (res.code === 0) {
              this.$message.success("编辑成功");
              this.$emit("updateList");
              this.status = !this.status;
            }
          });
        } else {
          //添加
          this.params.did=this.params.uuid

          addCoupon(this.params).then(res => {
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
      if(this.contentList.describe){

        this.params = this.contentList
      } else {
        console.log(this.contentList.uuid)
        this.params.uuid=this.contentList.uuid
      }

      console.log(this.contentList)
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
      width: 120px;
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
