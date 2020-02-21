<template>
  <div class="table-container">
    <el-table ref="loanSetting" style="width: 100%" :data="list" border>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="贷款人" align="center">
        <template slot-scope="scope">{{scope.row.loanerName}}</template>
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
      <el-table-column label="贷款日期" align="center">
        <template slot-scope="scope">{{scope.row.createTime}}</template>
      </el-table-column>
      <el-table-column v-if="status == 2" label="面签银行" align="center">
        <template slot-scope="scope">{{scope.row.bank}}</template>
      </el-table-column>
      <el-table-column v-if="status == 2" label="面签人员" align="center">
        <template slot-scope="scope">{{scope.row.facesingnerName}}</template>
      </el-table-column>
      <el-table-column v-if="status == 2" label="面签状态" align="center">
        <template slot-scope="scope">{{scope.row.precheckStatus | faceStatusName}}</template>
      </el-table-column>
      <el-table-column v-if="status == 2" label="下发款额" align="center">
        <template slot-scope="scope">{{scope.row.LowerQuota}}</template>
      </el-table-column>
      <el-table-column v-if="status == 2" label="反馈" align="center">
        <template slot-scope="scope">{{scope.row.feiaiFacesignFeedback}}</template>
      </el-table-column>
      <el-table-column v-if="status == 3" label="原因" align="center">
        <template slot-scope="scope">{{scope.row.feiaiOrderFeedback}}</template>
      </el-table-column>
      <el-table-column v-if="status == 0" label="预审状态" align="center">
        <template slot-scope="scope">
          <span :class="scope.row.precheckStatus | statusColor">{{scope.row.precheckStatus|statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" align="center">
        <template slot-scope="scope">{{scope.row.precheckDoer}}</template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.precheckStatus == 1">
            <el-button size="mini" @click="agree(scope.row.id)">通过</el-button>
            <el-button size="mini" type="danger" @click="refuse(scope.row.id)">不通过</el-button>
          </div>
          <div v-if="scope.row.precheckStatus != 1">已处理</div>
        </template>
      </el-table-column>
    </el-table>
    <love-detail
      v-if="showModel"
      :modelStatus="showModel"
      @closeStatus="closeStatus"
      :tableList="tableList"
    />
    <love-refuse
      v-if="refuseModel"
      :modelStatus="refuseModel"
      @closeStatus="closeRefuseStatus"
      :refuseId="refuseId"
      @refuseUpdateList="updataList"
    />
    <love-agree
      v-if="agreeModel"
      :modelStatus="agreeModel"
      @closeStatus="closeAgressStatus"
      :agreeId="agreeId"
      @agreenUpdateList="updataList"
    />
  </div>
</template>
<script>
import Vue from "vue";
import LoveDetail from "./detail";
import LoveRefuse from "./refuse";
import LoveAgree from "./agree";
const tableList = [
  {
    name: "编号",
    objName: "id",
    data: ""
  },
  {
    name: "贷款人",
    objName: "loanerName",
    data: ""
  },
  {
    name: "性别",
    objName: "sex",
    data: ""
  },
  {
    objName: "loanQuota",
    name: "贷款金额",
    data: ""
  },
  {
    objName: "term",
    name: "期限",
    data: ""
  },
  {
    objName: "idCard",
    name: "身份证号",
    data: ""
  },
  {
    objName: "phone",
    name: "联系电话",
    data: ""
  },
  {
    objName: "address",
    name: "现住址",
    data: ""
  },
  {
    objName: "workunit",
    name: "工作单位性质",
    data: ""
  },
  {
    objName: "marryStatus",
    name: "婚姻状态",
    data: ""
  },
  {
    objName: "loanHelper",
    name: "共借人姓名",
    data: ""
  },
  {
    objName: "helperPhone",
    name: "共借人电话",
    data: ""
  },
  {
    objName: "helperWorkunit",
    name: "共借人工作",
    data: ""
  },
  {
    objName: "decoStatus",
    name: "装修情况",
    data: ""
  },
  {
    objName: "decoType",
    name: "装修类型",
    data: ""
  },
  {
    objName: "decoProcess",
    name: "装修进度",
    data: ""
  },
  {
    objName: "familyMonthIncome",
    name: "家庭月收入",
    data: ""
  },
  {
    objName: "credicardCount",
    name: "信用卡数量",
    data: ""
  },
  {
    objName: "credicardMonthPay",
    name: "信用卡月还金额",
    data: ""
  },
  {
    objName: "invitor",
    name: "邀请人",
    data: ""
  },
  {
    objName: "facesignCity",
    name: "面签城市",
    data: ""
  }
];
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
      refuseId: "",
      agreeModel: false,
      agreeId: ""
    };
  },
  components: {
    LoveDetail,
    LoveRefuse,
    LoveAgree
  },
  methods: {
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
    },
    updataList: function(data) {
      if (data.isUpdataList) {
        this.$emit("pupdataList");
      }
    },
    viewDetail(row) {
      const sexFilter = Vue.filter("sexFilter");
      const marriageStatus = Vue.filter("marriageStatus");
      const renovationStatusApply = Vue.filter("renovationStatusApply");
      const renovationScheduleApply = Vue.filter("renovationScheduleApply");
      const renovationTypeApply = Vue.filter("renovationTypeApply");
      this.changeShowModel();
      this.tableList.length &&
        this.tableList.map(item => {
          if (item.objName == "sex") {
            item.data = sexFilter(row[item.objName]);
          } else if (item.objName == "marriage") {
            item.data = marriageStatus(row[item.objName]);
          } else if (item.objName == "renovationStatus") {
            item.data = renovationStatusApply(row[item.objName]);
          } else if (item.objName == "renovationSchedule") {
            item.data = renovationScheduleApply(row[item.objName]);
          } else if (item.objName == "renovationType") {
            item.data = renovationTypeApply(row[item.objName]);
          } else {
            item.data = row[item.objName];
          }
        });
    },
    changeRefuseModel() {
      this.refuseModel = !this.refuseModel;
    },
    closeRefuseStatus() {
      this.changeRefuseModel();
      this.refuseId = "";
    },
    refuse(id) {
      this.changeRefuseModel();
      this.refuseId = id;
    },
    changeAgreeModel() {
      this.agreeModel = !this.agreeModel;
    },
    closeAgressStatus() {
      this.changeAgreeModel();
      this.agreeId = "";
    },
    agree(id) {
      this.changeAgreeModel();
      this.agreeId = id;
    }
  },
  created() {}
};
</script>

<style lang="scss" scoped>
</style>