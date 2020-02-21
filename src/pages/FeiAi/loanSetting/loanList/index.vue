<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">放款管理</span>
    </el-card>
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="getList" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 20px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="贷款人：">
            <el-input style="width: 203px" v-model="listQuery.loanerName" placeholder="贷款人"></el-input>
          </el-form-item>
          <el-form-item label="贷款额度：">
            <el-input style="width: 203px" v-model="listQuery.loanQuota" placeholder="贷款额度"></el-input>
          </el-form-item>
          <el-form-item label="面签城市：">
            <area-cascader
              :level="0"
              type="text"
              placeholder="请选择地区"
              v-model="listQuery.facesignCity"
              :data="$pcaa"
              style="line-height: 20px"
            ></area-cascader>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-tabs type="border-card" @tab-click="tabClickEvent">
      <el-tab-pane v-for="(item,index) in statusList" :key="index" :label="item.label">
        <love-table :list="list" :status="item.id" @pupdataList="getList" />
        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes,prev, pager, next,jumper"
            :page-size="listQuery.size"
            :page-sizes="[5,10,15]"
            :current-page.sync="listQuery.page"
            :total="total"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div style="height: 24px"></div>
  </div>
</template>
<script>
import LoveTable from "./components/table";
import { getLoanList } from "@/api/loanSetting";
export default {
  data() {
    return {
      statusList: [
        {
          id: 1,
          label: "待放款"
        },
        {
          id: 2,
          label: "放款成功"
        },
        {
          id: 3,
          label: "放款失败"
        }
      ],
      list: [],
      total: null,
      listQuery: {
        loanerName: "",
        loanQuota: "",
        facesignCity: "",
        periodStatus: 0,
        page: 1,
        size: 5
      }
    };
  },
  components: {
    LoveTable
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getLoanList(this.listQuery).then(res => {
        if (res.code === 0) {
          this.total = res.data.count;
          this.list = res.data.list;
        }
      });
    },
    //切换tab
    tabClickEvent(tab, e) {
      this.listQuery.periodStatus = tab.index;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = {
        loanerName: "",
        loanQuota: "",
        facesignCity: "",
        periodStatus: 0,
        page: 1,
        size: 5
      };
      this.getList();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  margin-bottom: 24px;
  overflow: inherit;
}
.layout-title {
  color: #606266;
  background: #f2f6fc;
  font-weight: bold;
  height: 60px;
  margin-bottom: 24px;
  button {
    position: absolute;
    right: 3%;
  }
}
</style>



