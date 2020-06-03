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
        <span class="role-tip">赠送积分：</span>
        <el-input class="input-box" type="number" v-model="point" placeholder="请输入积分" />
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
      point: '0',
    };
  },
  methods: {
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    saveSetting:  function(){
      postPointRecord({
        money : this.point.toString(),
        userid : this.agreeId,
        msg : `管理员送你${this.point.toString()}积分`
      })
      givePoint({
        id: this.agreeId,
        integral: this.point.toString(),
      }).then(res=>{
        if(res.code === 0){
          this.status = false
          this.$message.success('提交成功')
          this.$emit("agreenUpdateList");
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
