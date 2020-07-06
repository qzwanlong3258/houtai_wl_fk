<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="260"
    >
      <div class="title-tip">
        货运单号
      </div>
      <div class="change-ps-input">
        <span class="role-tip">货运单号：</span>
        <el-input class="input-box" type="text" v-model="sentId" placeholder="请输入货运单号" />
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
  import { givePoint,postPointRecord } from "@/api/userInfo";
  import { sentOrder } from "@/api/order";
  export default {
    components: {
      LoveDialog
    },
    props: {
      modelStatus: {
        type: Boolean
      },
      agreeId: {
        type: String,
        default: ()=>{

        }
      }
    },
    data() {
      return {
        sentId: '',
      };
    },
    methods: {
      beforeClose: function() {
        this.$emit("closeStatus");
      },
      saveSetting:  function(){
        if(!this.sentId){
          this.alertMessage('请输入货运单号')
          return;
        }
        sentOrder({
          uuid:this.agreeId,
          awb:this.sentId
        }).then(res=>{
          if(res.code === 0){

            this.$message.success('提交成功')
            this.$emit("agreenUpdateList",{isUpdataList: true});
            this.$emit("closeStatus");
          }
        })

      }
    },
    created(){
      // this.saveSetting()
      this.status = this.modelStatus
    }
  };
</script>
<style lang="scss" scoped>
  .change-ps-input {
    width: 90%;
    height: 48px;
    margin: 30px 0;
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
</style>
