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
        通过
      </div>
      <div class="change-ps-input">
        <span class="role-tip">下发款额：</span>
        <el-input class="input-box" type="text" v-model="money" placeholder="请输入下发款额" />
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
import { getPassDesign } from "@/api/facesign";
export default {
  components: {
    LoveDialog
  },
  props: {
    modelStatus: {
      type: Boolean
    },
    agreeId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      money: "",
      status: false,
    };
  },
  methods: {
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    saveSetting: function(){
      getPassDesign({
        id: this.agreeId,
        state: 9,
      }).then(res=>{
        if(res.code === 0){
          this.status = !this.status
          this.$message.success('提交成功')
          this.$emit("agreenUpdateList",{isUpdataList: !this.isUpdataList});
        }
      })
    }
  },
  created(){
    this.saveSetting()
    // this.status = this.modelStatus
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
