<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">小程序用户信息</span>
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
          <el-form-item label="姓名：">
            <el-input style="width: 203px" v-model="listQuery.realname" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="邀请人：">
            <el-input style="width: 203px" v-model="listQuery.invitor" placeholder="邀请人"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="listQuery.sex" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="appletUser" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="微信头像" align="center">
          <template slot-scope="scope">
            <img class="avatar-box" :src="scope.row.avatar" />
          </template>
        </el-table-column>
        <el-table-column label="微信名" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.realname}}</template>
        </el-table-column>
         <el-table-column label="性别" align="center">
          <template slot-scope="scope">{{scope.row.sex | sexFilter}}</template>
        </el-table-column>
        <el-table-column label="住址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">{{scope.row.mobile}}</template>
        </el-table-column>
        <el-table-column label="贷款次数" align="center">
          <template slot-scope="scope">{{scope.row.loanCount}}</template>
        </el-table-column>
        <el-table-column label="邀请人" align="center">
          <template slot-scope="scope">{{scope.row.applyPerson}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getMemberList } from "@/api/userInfo";
export default {
  name: "appletUser",
  data() {
    return {
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        realname: '',
        invitor: '',
        sex: '',
        pageNum: 1,
        pageSize: 5
      },
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ]
    };
  },

  created() {
    this.getList()
  },
  methods: {
    getList(){
      getMemberList(this.listQuery).then(res=>{
        if(res.code === 0) {
          this.total = res.data.total
          this.list = res.data.list
        }
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleResetSearch(){
      this.listQuery = {
        realname: '',
        invitor: '',
        sex: 0,
        pageNum: 1,
        pageSize: 5
      }
      this.getList()
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  margin-bottom: 24px;
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
.avatar-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>


