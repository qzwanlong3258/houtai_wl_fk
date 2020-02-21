<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="260"
    >
      <div class="title-tip">拍照类型</div>
      <div class="change-ps-input">
        <span class="role-tip">类型：</span>
        <el-input class="input-box" type="text" v-model="params.name" placeholder="请输入拍照类型" />
      </div>
      <div class="change-ps-input">
        <span class="role-tip">链接：</span>
        <el-input class="input-box" type="text" v-model="params.sound" placeholder="请输入语音链接" />
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
import { setPotAdd,setPotExit } from "@/api/baseSetting";
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
        id: "",
        name: "",
        sound: "",
        addName: ""
      },
      roleList: []
    };
  },
  methods: {
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
      if (this.params.id) {
        //编辑
        setPotExit(this.params).then(res => {
          if (res.code === 0) {
            this.$message.success("编辑成功");
            this.$emit("updateList");
            this.status = !this.status;
          }
        });
      } else {
        //添加
        setPotAdd(this.params).then(res => {
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
    this.params = this.contentList
    this.getRoleList();
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
    width: 196px;
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
</style>