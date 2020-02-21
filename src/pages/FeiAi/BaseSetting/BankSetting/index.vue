<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">银行管理</span>
      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
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
          <el-form-item label="贷款类型：">
            <el-select v-model="listQuery.type" size="small" placeholder="请选择">
              <el-option
                v-for="item in produceType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="userList" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="银行" align="center">
          <template slot-scope="scope">{{scope.row.bankName}}</template>
        </el-table-column>
        <el-table-column label="产品类型" align="center">
          <template>银行产品</template>
        </el-table-column>
        <el-table-column label="地点" align="center">
          <template slot-scope="scope">{{scope.row.bankAddress}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">{{scope.row.enabled | bankStatus}}</template>
        </el-table-column>
        <el-table-column label="操作人" align="center">
          <template slot-scope="scope">{{scope.row.actionRealname}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="showModelEvent(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <change-model
      v-if="showModel"
      :modelStatus="showModel"
      @updateList="getList"
      @closeStatus="closeStatus"
      :contentList="contentList"
    />
  </div>
</template>
<script>
import ChangeModel from "./components/add";
import { getBankList, setBankDelete } from "@/api/baseSetting";
const contentList = {
  id: "",
  bankName: "",
  bankAddress: "",
  type: '',
  enabled: 1
};
export default {
  name: "userList",
  components: {
    ChangeModel
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        size: 5,
        type: '0',
      },
      showModel: false,
      contentList: {
        id: "",
        bankName: "",
        bankAddress: "",
        type: '',
        enabled: 1
      },
       produceType: [
         {
           id: '0',
           name: '全部产品'
         },
        {
          id: '1',
          name: "银行产品"
        },
        {
          id: '2',
          name: "合作产品"
        }
      ],
    };
  },
  created() {},
  methods: {
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = contentList;
    },
    showModelEvent: function(row) {
      this.contentList = {
        id: "",
        bankName: "",
        bankAddress: "",
        type: '',
        enabled: 1
      };
      this.changeShowModel();
      if (row) {
        this.contentList = {
          id: row.id,
          bankName: row.bankName,
          bankAddress: row.bankAddress,
          type: row.type,
          enabled: row.enabled
        };
      }
    },
    getList() {
      let data = {
        size: this.listQuery.size,
        page: this.listQuery.page,
        type: this.listQuery.type
      };
      getBankList(data).then(res => {
        if (res.code === 0) {
          this.total = res.data.count;
          console.log(res.data.list)
          res.data.list.length &&
            res.data.list.map(item => {
              if (item.bankAddress) {
                item.bankAddress = JSON.parse(item.bankAddress).join("/");
              }
            });
            
          console.log(this.list)
          this.list = res.data.list;
        }
      });
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
    //删除角色
    handleDelete: function(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setBankDelete({ id: row.id }).then(res => {
            if (res.code === 0) {
              this.getList();
              this.$message.success("删除成功");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getList();
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
.avatar-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>


