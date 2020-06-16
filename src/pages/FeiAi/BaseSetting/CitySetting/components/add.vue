<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="420"
    >
      <div class="title-tip">设置城市</div>
      <div class="change-ps-input">
        <span class="role-tip">城市名：</span>
        <el-input class="input-box" type="text" v-model="params.cname" placeholder="请输入城市名" />
      </div>
<!--      <div class="change-ps-input">-->
<!--        <span class="role-tip">电话：</span>-->
<!--        <el-input class="input-box" type="text" v-model="params.phone" placeholder="请输入成员电话" />-->
<!--      </div>-->
      <div class="change-ps-input" style="margin-top: 30px">
<!--        <div class="title" style="margin-left: 115px;">按钮：</div>-->
        <span class="role-tip">按钮：</span>
        <div style="display: flex;flex-wrap: wrap" class="input-box">
          <div :class="[item.click?'clickTrue':'clickFalse']" style="display: flex;margin-bottom: 2px"  v-for="(item,index) in buttonList" :key="index"  closable @click="clickSearch($event,item.id)">
            <img :src="item.icon"  alt="" width="20" height="20" >
            <!--          {{item.name}}-->
                      <i class="el-icon-close" v-if="item.click"></i>
          </div>
        </div>

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
import {  addCity,getButtonList,updateCity} from "@/api/baseSetting";
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
      buttonList:[],
      status: true,
      params: {
        cname:''
      },
      searchArray: []
    };
  },
  methods: {
    clickSearch($event,id) {
      if ($event.currentTarget.className == "clickFalse") {
        this.buttonList.find(item => item.id == id).click=true
        this.searchArray.push(id);
        // console.log(this.buttonList)

        // $event.currentTarget.firstElementChild.removeAttribute("hidden");
      } else {
        // $event.currentTarget.className = "clickFalse";
        // $event.currentTarget.firstElementChild.setAttribute("hidden", "hidden");
        this.buttonList.find(item => item.id == id).click=false
        // console.log(this.buttonList)
        let index = -1;
        for (var i = 0; i < this.searchArray.length; i++) {
          if (
            this.searchArray[i] == id
          ) {
            index = i
            break;
          }
        }
        this.searchArray.splice(index, 1);
      }
    },
    //得到角色列表
    getButList: function() {
      getButtonList().then( res=>{
        if (res.code === 0) {
          console.log(res)
          this.buttonList = res.data.list.map(res=>{
            return {
              click:false,
              ...res
            }
          })
          if (this.params.id &&this.params.button) {
            let arry=this.params.button.split(",")
            console.log(arry)
            for (let i =0;i<arry.length;i++){
              this.buttonList.find(item => item.id == arry[i]).click=true
            }

          }


          // console.log(this.buttonList)
        }
      })
    },
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    saveSetting() {
      if(!this.params.cname){
        this.alertMessage('请输入城市名')
        return;
      }
      if (this.params.id) {
        //编辑
        this.params.button=this.searchArray.toString()
        console.log( this.params.button)
        let e={
          uuid:this.params.id,
          button:this.params.button,
          cname:this.params.cname
        }

        updateCity(e).then(res => {
          if (res.code === 0) {

            this.$message.success("编辑成功");
            this.$emit("updateList");
            this.status = !this.status;
          }
        });
        // setAdminExit(this.params).then(res => {
        //   if (res.code === 0) {
        //     this.$message.success("编辑成功");
        //     this.$emit("updateList");
        //     this.status = !this.status;
        //   }
        // });
      } else {
        //添加
        console.log(this.params)
        this.params.button=this.searchArray.toString()
        addCity(this.params).then(res => {
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

    if (this.contentList.id) {
      this.params = this.contentList
      if(this.params.button){
        this.searchArray = this.params.button.split(",")
      }

      // console.log(this.params)
      // console.log(this.searchArray)
    }

    this.getButList();
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
    width: 223px;
    margin-top: 10px;
  }
  .select-box {
    margin-top: 10px;
    width: 196px;
  }
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
  .title{
    white-space:nowrap;
    margin-top: 10px;
  }
</style>
