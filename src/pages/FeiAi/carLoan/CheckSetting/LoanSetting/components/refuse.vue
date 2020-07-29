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
        不通过原因
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
import { getFailList } from "@/api/checkSetting";
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
      default: -1
    }
  },
  data() {
    return {
      reason: '',
      status: true,
      isUpdataList: false
    };
  },
  methods: {
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    saveSetting: function() {
      let param = {
        id: this.refuseId,
        error: this.reason,
        state:8
      };
      getFailList(param).then(res=>{
        if(res.code === 0){
          this.status = !this.status
          this.$emit("refuseUpdateList",{isUpdataList: !this.isUpdataList});
          this.$message.success('提交成功')
        }
      });
    }
  },
  created(){
   this.status =  this.modelStatus
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
