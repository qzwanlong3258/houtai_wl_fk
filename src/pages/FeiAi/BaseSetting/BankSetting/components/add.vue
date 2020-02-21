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
        <el-input type="text" class="input-box" v-model="params.bankName" placeholder="请输入银行名称" />
      </div>
      <div class="setting-perssion">
        <div class="role-tip">产品类型：</div>
        <div class="content-box">
          <el-select v-model="params.type" size="small" placeholder="请选择">
            <el-option
              v-for="item in produceType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="setting-perssion">
        <div class="role-tip">区域选择：</div>
        <div class="content-box">
          <area-cascader
            :level="0"
            @change="changeLocal"
            type="text"
            placeholder="请选择地区"
            v-model="params.bankAddress"
            :data="$pcaa"
          ></area-cascader>
        </div>
      </div>
      <div class="setting-perssion">
        <div class="role-tip" style="margin-left: 30px">状态：</div>
        <div class="content-box">
          <el-select v-model="params.enabled" size="small" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
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
import { setBankAdd, setBankExit } from "@/api/baseSetting";
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
      options: [
        {
          value: '1',
          label: "在用"
        },
        {
          value: '2',
          label: "停用"
        }
      ],
      params: {
        id: "",
        bankName: "",
        bankAddress: "",
        type: '',
        enabled: 1,
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
    beforeClose: function() {
      this.$emit("closeStatus");
    },
    changeLocal(e) {
      this.contentList.bankAddress = e;
    },
    saveSetting() {
      this.params.bankAddress = JSON.stringify(this.params.bankAddress);
      if (this.params.id) {
        //编辑
        setBankExit(this.params).then(res => {
          if (res.code === 0) {
            this.$message.success("编辑成功");
            this.$emit("updateList");
            this.status = !this.status;
          }
        });
      } else {
        //添加
        setBankAdd(this.params).then(res => {
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