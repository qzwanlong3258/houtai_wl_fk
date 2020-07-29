<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="430"
      :height="260"
    >
      <div class="title-tip">
        失败原因
      </div>
      <div class="change-ps-input">
        <textarea type="text" placeholder="请输入原因:" v-model="reason" class="text-area" />
      </div>
      <el-button
        @click="saveSetting"
        style="margin-left: 106px;position: fixed;bottom: 30px;"
        type="info"
        class="dialog-btn"
      >确定</el-button>
    </love-dialog>
  </div>
</template>
<script>
import LoveDialog from "@/components/NoLoveDialog";
import { getFailDesign } from "@/api/facesign";
export default {
  components: {
    LoveDialog
  },
  props: {
    modelStatus: {
      type: Boolean
    },
    refuseId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      reason: "",
      isUpdataList: false,
      status: false
    };
  },
  methods: {
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    saveSetting: function() {
      getFailDesign({reason:this.reason,orderId:this.refuseId,state:10}).then(res=>{
        if(res.code === 0){
          this.status = !this.status
          this.$message.success('提交成功')
          this.$emit("refuseUpdateList",{isUpdataList: !this.isUpdataList});
        }
      });
    }
  },
  mounted(){
    this.status = this.modelStatus
  }
};
</script>
<style lang="scss" scoped>
.change-ps-input {
  display: inline-block;
  width: 90%;
  height: 120px;
  margin: 14px 5%;
  border: 1px solid #eee;
  display: flex;
  .text-area {
    width: 96%;
    height: 100px;
    margin: 10px 2%;
    border: none;
    outline: none;
  }
}
</style>
