<template>
  <div class="table-container">
    <el-table ref="loanSetting"  style="width: 100%" :data="list" border>
      <!--"phone": "31231",收货人手机号 <string>
      "gnamem": "Chanel 护手霜",商品名称 <string>
      "name": "而我却",收入姓名 <string>
      "count": "1",购买数量 <string>
      "addres": "天津市河西区 3213212131232",收货地址 <string>
      "state": "2",商品状态 <string>
      "uuid": "f522f405e40048d39ae583b8eb0fe0f2"订单id <string>-->
      <el-table-column
        width="50" label="序号" align="center">
        <template slot-scope="scope">
          <span >
              {{(page * size - size) + scope.$index + 1}}
            </span>
        </template>
      </el-table-column>
      <el-table-column label="订单id" align="center" width="100" show-overflow-tooltip>
        <template slot-scope="scope"><span @click="toDetail(scope.row)">{{scope.row.uuid}}</span></template>
      </el-table-column>
      <el-table-column label="收货人姓名" align="center">
        <template slot-scope="scope"><span @click="toDetail(scope.row)">{{scope.row.name}}</span></template>
      </el-table-column>
      <el-table-column label="购买数量" align="center">
        <template slot-scope="scope"><span @click="toDetail(scope.row)">{{scope.row.count}}</span></template>
      </el-table-column>
      <el-table-column label="收货人手机号" align="center">
        <template slot-scope="scope"><span @click="toDetail(scope.row)">{{scope.row.phone}}</span></template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" width="160">
        <template slot-scope="scope"><span @click="toDetail(scope.row)">{{scope.row.gnamem}}</span></template>
      </el-table-column>
      <el-table-column label="收货地址" align="center" width="160">
        <template slot-scope="scope"><span @click="toDetail(scope.row)">{{scope.row.addres}}</span></template>
      </el-table-column>

<!--      <el-table-column v-if="status == 1" label="预审状态" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span :class="scope.row.state | statusColor">{{scope.row.state|statusName}}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作人" align="center">-->
<!--        <template slot-scope="scope">{{scope.row.precheckDoer}}</template>-->
<!--      </el-table-column>-->
      <el-table-column :label="status == 2?'操作':'状态'" width="200" align="center">
        <template slot-scope="scope">
          <div v-if="status == 2">
            <el-button size="mini" type="success" @click="agree(scope.row.uuid)">发货</el-button>
<!--            <el-button size="mini" type="danger" @click="refuse(scope.row.id)">不通过</el-button>-->
          </div>
          <!--          <div v-if="status == 1">通过</div>-->
          <!--          <div v-if="status == 2">不通过</div>-->
          <el-tag v-if="status == 3" size="mini"  type="success">待收货</el-tag>
          <el-tag v-if="status == 4" size="mini" type="success">完成</el-tag>
          <el-tag v-if="status == 5" size="mini"  type="success">退换</el-tag>
<!--          <div v-if="scope.row.state == 1">-->
<!--            <el-button size="mini" @click="agree(scope.row.id)">通过</el-button>-->
<!--            <el-button size="mini" type="danger" @click="refuse(scope.row.id)">不通过</el-button>-->
<!--          </div>-->
<!--          <div v-if="scope.row.precheckStatus != 1">已处理</div>-->
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
    <check-details ref="checkDetails"></check-details>
  </div>
</template>
<script>
import Vue from "vue";
import LoveDetail from "./detail";
import LoveRefuse from "./refuse";
import LoveAgree from "./agree";
import CheckDetails from './index-details'


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
    },
    size: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
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
    LoveAgree,
    CheckDetails
  },
  methods: {
    toDetail:function(e) {
      this.$refs.checkDetails.init(e)
    },
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
