<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="650"
      :height="620"
    >

      <div class="title-tip">设置积分商品</div>
      <div class="change-ps-input">
        <span class="role-tip">商品名称：</span>
        <el-input class="input-box" type="text" v-model="params.name" placeholder="请输入商品名称" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">商品价格：</span>
        <el-input class="input-box" type="text" v-model="params.price" placeholder="请输入商品价格" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">商品原价：</span>
        <el-input
          class="input-box"
          type="text"
          v-model="params.originalPrice"
          placeholder="请输入商品原价"
        />
      </div>
<!--      <div class="change-ps-input" style="border: none" v-if="!params.id">-->
<!--        <span class="role-tip">类型：</span>-->
<!--        <el-select v-model="params.type" size="small" placeholder="请选择" class="input-box">-->
<!--          <el-option v-for="item in roleList" :key="item.id" :label="item.role" :value="item.id"></el-option>-->
<!--        </el-select>-->
<!--      </div>-->

      <div class="change-ps-input">
        <span class="role-tip">商品库存：</span>
        <el-input
          class="input-box"
          type="number"
          v-model="params.count"
          placeholder="请输入商品库存"
        />
      </div>
      <div class="change-ps-input-list" style="position: relative">
        <span class="role-tip">商品详情图片：</span>
        <div style="display: flex;flex-wrap: wrap" class="input-box">
          <block  v-for="(item,index) in params.goodImgList" :key="index">


          <div class="clickTrue" style="display: flex;margin-bottom: 2px" v-if="item"  closable >
            <img :src="item"  @click="$imageViewer" alt="" width="20" height="20" >
            <!--          {{item.name}}-->
            <i class="el-icon-close" @click="detGoodImg(index)" ></i>
          </div>
          </block>
        </div>
        <el-upload
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="(file)=>beforeAvatarUpload(file,0)"
          :auto-upload="true">
          <el-button  class="test-btn" size="mini">浏览</el-button>
        </el-upload>

      </div>
      <div class="change-ps-input-list" style="position: relative">
        <span class="role-tip">商品轮播图：</span>
        <div style="display: flex;flex-wrap: wrap" class="input-box">
          <block  v-for="(item,index) in params.playImgList" :key="index">


          <div class="clickTrue" style="display: flex;margin-bottom: 2px" v-if="item"  closable >
            <img :src="item"   @click="$imageViewer" alt="" width="20" height="20" >
            <!--          {{item.name}}-->
            <i class="el-icon-close" @click="detPlayImg(index)"  ></i>
          </div>
          </block>
        </div>

        <el-upload
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="(file)=>beforeAvatarUpload(file,1)"
          :auto-upload="true">
          <el-button  class="test-btn" size="mini">浏览</el-button>
        </el-upload>
      </div>

      <el-button
        @click="saveSetting"
        style="margin-left: 210px;position: fixed;bottom: 30px;"
        type="info"
        class="dialog-btn"
      >确定</el-button>
    </love-dialog>
  </div>
</template>

<script>
import LoveDialog from "@/components/NoLoveDialog";
import { addGood,putGood,getGoodDetail } from "@/api/market";
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
      params: {
        name: "",
        price: "",
        originalPrice: "",
        count: "",
        Details: "",
        Showimg: "",
        goodImgList:[],
        playImgList:[],
        type:''
      },
      // roleList:[
      //   {
      //     role:'积分商品',
      //     id:'1'
      //   },
      //   {
      //     role:'推广商品',
      //     id:'2'
      //   }
      // ]

    };
  },
  methods: {
    handleAvatarSuccess(res, file) {

    },
    beforeAvatarUpload(file,e) {
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
        if(e == 0){
          this.params.goodImgList.push(res.data)
          this.$forceUpdate();
        } else {
          this.params.playImgList.push(res.data)
          this.$forceUpdate();
        }

        console.log(res)
      })
      // axios.post(`${axios.defaults.baseURL}/ftp/upload`,fd).then(function(res){
      //   // alert('成功');
      //   console.log(res)
      // })
      return isJPG && isLt2M;
      // return false  //屏蔽了action的默认上传

    },

    detGoodImg(i){
      this.$confirm(`是否确定删除该图片？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.params.goodImgList.splice(i, 1)
        this.$forceUpdate();
        console.log(this.params.goodImgList)
      })
    },
    detPlayImg(i){
      this.$confirm(`是否确定删除该图片？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.params.playImgList.splice(i, 1)
        console.log(this.params.playImgList)
        this.$forceUpdate();
      })
    },
    //得到角色列表
    // getRoleList: function() {
    //   getAdminRole().then(res => {
    //     if (res.code === 0) {
    //       this.roleList = res.data.list;
    //     }
    //   });
    // },
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    saveSetting() {
      if (this.params.id) {
        //编辑
        let e={
          id:this.params.uuid,
          name: this.params.name,
          count: this.params.count,
          originalPrice: this.params.originalPrice,
          price: this.params.price,
          Details: this.params.goodImgList.toString(),
          Showimg: this.params.playImgList.toString()
        }
        putGood(e).then(res => {
          if (res.code === 0) {
            this.$message.success("编辑成功");
            this.$emit("updateList");
            this.status = !this.status;
          }
        });
      } else {
        //添加
        let e={

          type: 1,
          name: this.params.name,
          count: this.params.count,
          originalPrice: this.params.originalPrice,
          price: this.params.price,
          Details: this.params.goodImgList.toString(),
          Showimg: this.params.playImgList.toString()
        }
        // this.params.Showimg=
        // this.params.Details=
        addGood(e).then(res => {
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

    // console.log(this.status)
    if (this.contentList.id) {
      getGoodDetail(this.contentList.uuid).then(res=>{

        this.params = this.contentList
        console.log(res.data)
        let a = res.data.Details.map(res=>{
          return res.url
        })
        let b = res.data.showimg.map(res=>{
          return res.url
        })
        this.params.goodImgList = a
        this.params.playImgList = b
        this.params.Details = a.toString()
        this.params.Showimg = b.toString()
        console.log(this.contentList)

      })

      console.log(this.contentList)
    }
    this.status = this.modelStatus;
    // this.getRoleList();

  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
  .test-btn{
    /*width: 50px;*/
    /*height: 55px;*/
    /*border-radius: 50%;*/
    /*text-align: center;*/
    position: absolute;
    right: 80px;
    top: 45%;

  }
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
    width: 223px;
    margin-top: 10px;
  }
  .select-box {
    margin-top: 10px;
    width: 196px;
  }
}
.change-ps-input-list {
  width: 90%;
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
    width: 223px;
    margin-top: 10px;
  }
  .select-box {
    margin-top: 10px;
    width: 196px;
  }
}
/*多选效果*/
.clickFalse {
  border: 0px;
  border-radius: 5px;
  background: transparent;
  display: inline;
  margin-right: 20px;
  padding: 10px 24px 10px 10px;

}
.clickFalse:hover,
.clickTrue:hover {
  cursor: pointer;
}
.clickTrue,
.clickFalse:visited {
  border-radius: 5px;
  display: inline;
  margin-right: 20px;
  padding: 10px;
  color: white;
  background: #337ab7;
  border: 0;
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
