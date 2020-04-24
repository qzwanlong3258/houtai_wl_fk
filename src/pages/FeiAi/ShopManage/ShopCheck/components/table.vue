<template>
  <div class="table-container">
    <el-table ref="loanSetting" style="width: 100%" :data="list" border>
      <el-table-column label="编号" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.id}}</span> </template>
      </el-table-column>
      <el-table-column label="贷款人" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.userName}}</span> </template>
      </el-table-column>
      <el-table-column label="城市" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.cityName}}</span> </template>
      </el-table-column>
      <el-table-column label="公司名称" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.name}}</span> </template>
      </el-table-column>
      <el-table-column label="营业执照编号" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.businesslicenseCode}}</span> </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.phone}}</span> </template>
      </el-table-column>
      <el-table-column label="法人" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.juridicalPerson}}</span> </template>
      </el-table-column>
      <el-table-column label="注册资金" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.createNumber}}</span> </template>
      </el-table-column>
      <el-table-column label="公司地址" align="center" show-overflow-tooltip>
        <template slot-scope="scope" ><span @click="toDetail(scope.row)">{{scope.row.address}}</span> </template>
      </el-table-column>

      <el-table-column :label="status == 0?'操作':'状态'" width="200" align="center" fixed="right">
        <template slot-scope="scope">
          <div v-if="status == 0">
            <el-button size="mini" @click="agree(scope.row.id)">通过</el-button>
            <el-button size="mini" type="danger" @click="refuse(scope.row.id)">不通过</el-button>
          </div>
<!--          <div v-if="status == 1">通过</div>-->
<!--          <div v-if="status == 2">不通过</div>-->

          <el-tag v-if="status == 1" size="mini" type="success">通过</el-tag>
          <el-tag v-if="status == 2" size="mini"  type="danger">不通过</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <love-detail v-if="showModel" :modelStatus="showModel" @closeStatus="closeStatus" :tableList="tableList" />
    <love-refuse v-if="refuseModel" :modelStatus="refuseModel" @closeStatus="closeRefuseStatus" :refuseId="refuseId"  @refuseUpdateList="updataList" />
    <love-agree v-if="agreeModel" :modelStatus="agreeModel" @closeStatus="closeAgressStatus" :agreeId="agreeId" @agreenUpdateList="updataList"/>
    <check-details ref="checkDetails"></check-details>
  </div>
</template>
<script>
import Vue from 'vue'
import LoveDetail from "./detail";
import LoveRefuse from "./refuse";
import LoveAgree from "./agree";
import { postShop } from "@/api/shopManage";
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
     updataList: function(data) {
      if (data.isUpdataList) {
        this.$emit("pupdataList");
      }
    },
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = contentList;
    },
    viewDetail(row) {
      const sexFilter = Vue.filter('sexFilter');
      const marriageStatus = Vue.filter('marriageStatus');
      const renovationStatusApply = Vue.filter('renovationStatusApply');
      const renovationScheduleApply = Vue.filter('renovationScheduleApply');
      const renovationTypeApply = Vue.filter('renovationTypeApply');
      this.changeShowModel();
      this.tableList.map(item => {
        if(item.objName == 'sex'){
          item.data =  sexFilter(row[item.objName]);
        } else if(item.objName == 'marriage'){
          item.data = marriageStatus(row[item.objName]);
        }else if(item.objName == 'renovationStatus'){
          item.data = renovationStatusApply(row[item.objName]);
        } else if(item.objName == 'renovationSchedule'){
          item.data = renovationScheduleApply(row[item.objName]);
        } else if(item.objName == 'renovationType'){
          item.data = renovationTypeApply(row[item.objName]);
        }else{
          item.data = row[item.objName]
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
    // agree(id) {
    //   this.changeAgreeModel();
    //   this.agreeId = id;
    // }
    async agree(id) {
      let e ={}
      e.id=id
      e.state ='2'

      await postShop(e).then(res=>{
        if(res.code === 0){

          this.$message.success('提交成功')
          this.$emit('pupdataList')
        }
      });
        // getFailList




    }
  }
};
</script>

<style lang="scss" scoped>
</style>
