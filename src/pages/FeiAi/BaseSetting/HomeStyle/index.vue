<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">首页主题管理</span>
      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="userList" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="图片" align="center">
          <template slot-scope="scope">
            <img  @click="$imageViewer" :src="scope.row.img"  min-width="20" height="40"  >
          </template>
        </el-table-column>
        <el-table-column label="链接" align="center" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.url}}</template>
        </el-table-column>
        <el-table-column label="分类" align="center">
          <template slot-scope="scope">{{scope.row.type==1?'轮播图':'广告位'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="showModelEvent(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination-container">
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
    </div>-->
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
import { getHomeStyle, deleteHomeStyle } from "@/api/baseSetting";
const contentList = {
  id: "",
  img: "",
  url: ""
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
        pageNum: 1,
        pageSize: 5
      },
      showModel: false,
      contentList
    };
  },
  created() {
    this.getList();
  },
  methods: {
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = {
        id: "",
        img: "",
        url: ""
      };
    },
    showModelEvent: function(row) {
      this.changeShowModel();
      if (row) {
        this.contentList = row;
      } else {
        this.contentList = {
          id: "",
          img: "",
          url: ""
        };
      }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum
      };
      getHomeStyle(data).then(res => {
        if (res.code === 0) {
          this.total = res.data.total;
          let e=[]
           res.data.list.map(res=>{
             if(res.type==1||res.type==2){
               e.push(res)
             }
           });
          this.list=e
        }
      });
      this.showModel=false
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
    //删除角色
    handleDelete: function(row) {
      this.$confirm("此操作将永久删除该图片及链接, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteHomeStyle({ id: row.id }).then(res => {
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
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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


