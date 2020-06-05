<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="350"
    >
      <div class="title-tip" style="margin-bottom: 5px">设置标签</div>
      <div style="padding: 0 100px">
<!--        <div style="margin-bottom: 15px;padding-bottom: 20px;" class="card">-->
<!--          <div class="change-ps-input" >-->
<!--            <span class="role-tip">内容：</span>-->
<!--            <el-input class="input-box" type="text" v-model="params.content" size="mini" placeholder="请输入内容" />-->
<!--          </div>-->
<!--        </div>-->
        <div style="margin-bottom: 15px;padding-bottom: 30px;position: relative" class="card"
             v-for="(item , index) in lableTwo"
        >
          <i class="el-icon-circle-plus-outline iconjia" @click="addBtnOne"></i>
          <i class="el-icon-remove-outline iconjian" @click="deleteBtnOne(index)" ></i>
          <div class="change-ps-input" >
            <handling-title title="带图标签"></handling-title>
          </div>
          <div class="change-ps-input">
            <span class="role-tip">名称：</span>
            <el-input class="input-box" type="text" v-model="item.content" size="mini" placeholder="请输入内容" />
          </div>
          <div class="change-ps-input" style="margin: 10px 0">
            <span class="role-tip">图片：</span>
            <el-input class="input-box" size="mini" style="width: 196px" type="text" readonly >
              <template slot="prepend" style="background: #ffffff">
                <!--            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />-->
                <img v-if="item.img"  @click="$imageViewer" :src="item.img"  min-width="20" height="22"  >
              </template>
              <template slot="append">

                <el-upload
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="(file)=> beforeAvatarUpload(file,index)"
                  :auto-upload="true">
                  <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>
                </el-upload>
              </template>

            </el-input>

          </div>
<!--          <div class="change-ps-input">-->
<!--            <span class="role-tip">分数：</span>-->
<!--            <el-input class="input-box" type="number" v-model="item.score" size="mini" placeholder="请输入分数" />-->
<!--          </div>-->

        </div>



        <div style="margin-bottom: 15px;padding-bottom: 30px;position: relative" class="card"
             v-for="(item , index) in lableOne"
        >
          <i class="el-icon-circle-plus-outline iconjia" @click="addBtn"></i>
          <i class="el-icon-remove-outline iconjian" @click="deleteBtn(index)" ></i>
          <div class="change-ps-input" >
            <handling-title title="标签"></handling-title>
          </div>
          <div class="change-ps-input">
            <span class="role-tip">名称：</span>
            <el-input class="input-box" type="text" v-model="item.content" size="mini" placeholder="请输入内容" />
          </div>
          <!--          <div class="change-ps-input" style="margin: 10px 0">-->
          <!--            <span class="role-tip">图片：</span>-->
          <!--            <el-input class="input-box" size="mini" style="width: 196px" type="text" readonly >-->
          <!--              <template slot="prepend" style="background: #ffffff">-->
          <!--                &lt;!&ndash;            <img v-if="dataForm.objId" :src="$http.adornUrl(`/api-base/base/mongo/file/showImage/${dataForm.objId + $http.appendUrlAccessToken()}`)"  min-width="20" height="26" />&ndash;&gt;-->
          <!--                <img v-if="item.img"  @click="$imageViewer" :src="item.img"  min-width="20" height="22"  >-->
          <!--              </template>-->
          <!--              <template slot="append">-->

          <!--                <el-upload-->
          <!--                  ref="upload"-->
          <!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
          <!--                  :show-file-list="false"-->
          <!--                  :on-success="handleAvatarSuccess"-->
          <!--                  :before-upload="(file)=> beforeAvatarUpload(file,index)"-->
          <!--                  :auto-upload="true">-->
          <!--                  <el-button slot="trigger" size="mini" type="primary" >浏览</el-button>-->
          <!--                </el-upload>-->
          <!--              </template>-->

          <!--            </el-input>-->

          <!--          </div>-->
<!--          <div class="change-ps-input">-->
<!--            <span class="role-tip">分数：</span>-->
<!--            <el-input class="input-box" type="number" v-model="item.score" size="mini" placeholder="请输入分数" />-->
<!--          </div>-->

        </div>

      </div>



      <!--      <el-button-->
      <!--        @click="saveSetting"-->
      <!--        style="margin-left: 140px;position: fixed;bottom: 30px;"-->
      <!--        type="info"-->
      <!--        class="dialog-btn"-->
      <!--      >确定</el-button>-->
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
  import {  postLable } from "@/api/shopManage";
  import { uploadPic } from "@/api/uploadPic";
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

        lableOne:[  {
          type: "1",
          content: ""
        }],
        lableTwo:[{
          img: "",
          type: "2",
          content: ""
        },],
        uuid:'',
        roleList: []
      };
    },
    methods: {
      addBtn () {
        let obj =  {
          type: "1",
          content: ""
        }
        console.log(obj)
        this.lableOne.push(obj)
      },
      deleteBtn (i) {
        if (i === 0) {
          this.lableOne.shift()
          this.lableOne.unshift({
            type: "1",
            content: ""
          })
        } else {
          this.$confirm(`是否确定删除该选项？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.lableOne.splice(i, 1)
          }).catch(fail => {
            if (fail !== 'cancel') this.commonError()
          })
        }
      },
      addBtnOne () {
        let obj = {
          img: "",
          type: "2",
          content: ""
        }
        console.log(obj)
        this.lableTwo.push(obj)
      },
      deleteBtnOne (i) {
        if (i === 0) {
          this.lableTwo.shift()
          this.lableTwo.unshift({
            img: "",
            type: "2",
            content: ""
          })
        } else {
          this.$confirm(`是否确定删除该选项？`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.lableTwo.splice(i, 1)
          }).catch(fail => {
            if (fail !== 'cancel') this.commonError()
          })
        }
      },
      handleAvatarSuccess(res, file) {

      },
      beforeAvatarUpload(file,i) {
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
          this.lableTwo[i].img=res.data
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

      beforeClose: function() {
        this.$emit("closeStatus");
      },
      saveSetting() {
        let c = this.lableOne.concat(this.lableTwo);
        let e={
          uuid: this.uuid,
          volume: c
        }
        postLable(e).then(res => {
              if (res.code === 0) {
                this.$message.success("编辑成功");
                this.$emit("updateList");
                this.status = !this.status;
              }
            });
        // if (this.params.id) {
        //   //编辑
        //   updateTestOneTest(this.params).then(res => {
        //     if (res.code === 0) {
        //       this.$message.success("编辑成功");
        //       this.$emit("updateList");
        //       this.status = !this.status;
        //     }
        //   });
        // } else {
        //   //添加
        //   if(this.params.choose.length<2){
        //     this.$message.error('一个问题至少要有两个选项！')
        //     return
        //   }
        //   console.log(this.params)
        //   addTestOneTest(this.params).then(res => {
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
      this.uuid=this.contentList.uuid
      if(this.contentList.lable.length>0){
        let a=[]
        let b=[]
        // console.log(this.contentList)

        this.contentList.lable.map(res=>{
          if(res.type == '1'){
            a.push({...res})
          } else {
            b.push({...res})
          }
        })
        this.lableTwo = b
        this.lableOne = a
        // console.log(b)
        // console.log(a)
      }



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
  .iconjia{
    color: #409EFF;
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 30%;

  }
  .iconjian{
    color: #409EFF;
    font-size: 20px;
    position: absolute;
    right: 10px;
    top: 70%;
  }
  .change-ps-input {
    width: 90%;
    height: 30px;
    /*margin: 10px 0;*/
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
  .card {
    border: 1.5px solid #11A983;
    border-radius: 10px;
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
