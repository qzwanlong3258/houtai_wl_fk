<template>
  <div class="table-container">
    <el-table ref="loanSetting" style="width: 100%" :data="list" border>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="贷款人" align="center">
        <template slot-scope="scope">{{scope.row.loanerName}}</template>
      </el-table-column>
      <el-table-column label="放款次数" align="center">
        <template>4</template>
      </el-table-column>
      <el-table-column label="放款阶段" align="center">
        <template>第一阶段</template>
      </el-table-column>
      <el-table-column label="详情信息" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="viewDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="申请金额" align="center">
        <template slot-scope="scope">{{scope.row.loanQuota}}</template>
      </el-table-column>
      <el-table-column label="邀请人" align="center">
        <template slot-scope="scope">{{scope.row.invitor}}</template>
      </el-table-column>
      <el-table-column label="面签城市" align="center">
        <template slot-scope="scope">{{scope.row.facesignCity}}</template>
      </el-table-column>
      <el-table-column label="面签银行" align="center">
        <template slot-scope="scope">{{scope.row.bank}}</template>
      </el-table-column>
      <el-table-column label="下发额度" align="center">
        <template slot-scope="scope">{{scope.row.precheckStatus ==2 ? scope.row.LowerQuota : "0"}}</template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">{{scope.row.addName}}</template>
      </el-table-column>
    </el-table>
    <love-detail v-if="showModel" :modelStatus="showModel" @closeStatus="closeStatus" :tableList="tableList"/>
  </div>
</template>
<script>
    import Vue from "vue"

    export default {
        name: "loanSetting",
        props: {
            list: {
                type: Array,
                default: []
            },
            status: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                showModel: false,
                tableList,
                refuseModel: false,
                refuseId: 0,
                agreeModel: false,
                agreeId: 0
            };
        },
        methods: {
            updataList: function (data) {
                if (data.isUpdataList) {
                    this.$emit("pupdataList");
                }
            },
            changeShowModel: function () {
                this.showModel = !this.showModel;
            },
            closeStatus: function () {
                this.changeShowModel();
                this.contentList = contentList;
            },
            viewDetail(row) {
                this.$store.state.user.loanDetail = row;
                this.$router.push({path: "loanDetail"})
            }
        }
    };
</script>

<style lang="scss" scoped>
</style>
