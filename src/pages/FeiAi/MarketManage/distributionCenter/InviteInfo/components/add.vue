<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="390"
    >
      <div class="title-tip">设置银行</div>
      <div class="change-ps-input">
        <span class="role-tip">银行名称：</span>
        <el-input type="text" class="input-box" v-model="params.name" placeholder="请输入银行名称" />
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
      <div class="setting-perssion">
        <div class="role-tip">产品类型：</div>
        <div class="content-box">
          <el-select v-model="params.loanType" size="small" placeholder="请选择">
            <el-option
              v-for="item in produceType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="change-ps-input">
        <span class="role-tip">地址：</span>
        <el-input type="text" class="input-box" v-model="params.address" placeholder="请输入银行地址" />
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
import { addBank, putBank } from "@/api/bank";
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
      // options: [
      //   {
      //     value: '1',
      //     label: "在用"
      //   },
      //   {
      //     value: '2',
      //     label: "停用"
      //   }
      // ],
      params: {
        name: "",
        address: "",
        loanType: "",
        img: ""
      },
      produceType: [
        {
          id: '1',
          name: '银行产品'
        },
        {
          id: '2',
          name: '合作产品'
        }
      ]
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
v
    },
    beforeAvatarUpload(file) {
      var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
      const extension = testmsg === 'jpg'
      const extension2 = testmsg === 'png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if(!extension && !extension2) {
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
        this.params.img=res.data
        this.$forceUpdate()
        console.log(res)
      })
      // axios.post(`${axios.defaults.baseURL}/ftp/upload`,fd).then(function(res){
      //   // alert('成功');
      //   console.log(res)
      // })
      return isJPG && isLt2M;
      // return false  //屏蔽了action的默认上传

    },
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    changeLocal(e) {
      this.contentList.bankAddress = e;
    },
    saveSetting() {
      // this.params.bankAddress = JSON.stringify(this.params.bankAddress);
      if (this.params.id) {
        //编辑
        putBank(this.params).then(res => {
          if (res.code === 0) {
            this.$message.success("编辑成功");
            this.$emit("updateList");
            this.status = !this.status;
          }
        });
      } else {
        //添加
        addBank(this.params).then(res => {
          if (res.code === 0) {
            this.$message.success("添加成功");
            this.$emit("updateList");
            this.status = !this.status;
          }
        });
      }
      this.params = {
        id: "",
        bankName: "",
        bankAddress: "",
        type: '',
        enabled: 1,
      };
    }
  },
  created() {
    if (this.contentList.bankAddress) {
      this.contentList.bankAddress = this.contentList.bankAddress.split("/");
    }
    this.params = this.contentList;
    this.status = this.modelStatus;
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.title-tip {
  margin-bottom: 20px;
}
.change-ps-input {
  width: 90%;
  height: 48px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  span {
    line-height: 59px;
  }
  .input-box {
    width: 196px;
    margin-top: 10px;
  }
}
.setting-perssion {
  width: 90%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  .role-tip {
    margin-top: 20px;
  }
  .content-box {
    margin-top: 16px;
    width: 195px;
  }
}
</style>
