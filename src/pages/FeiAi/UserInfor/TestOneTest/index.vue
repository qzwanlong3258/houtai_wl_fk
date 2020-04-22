<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">问题管理</span>
      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="testList" style="width: 100%" :data="list" :row-key="getRowKeys"  v-loading="listLoading" border>
        <el-table-column prop="cangku_name" align="center" width="50" label=" ">
          <template slot-scope="scope">
            <span
              id="linkspan"
              @click="toogleExpand(scope.row)"
            >{{scope.row.expansion ? '收起' : '展开'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.tid}}</template>
        </el-table-column>
        <el-table-column label="问题" align="center">
          <template slot-scope="scope">{{scope.row.content}}</template>
        </el-table-column>

        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="showModelEvent(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand" width="1">
          <template slot-scope="scope">
            <el-card class="layout-title-button" shadow="never" style="position: relative">
              <i class="el-icon-tickets" style="margin-top: 5px"></i>
              <span style="margin-top: 5px">选项管理</span>
              <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
            </el-card>
            <div class="table2box">
              <el-table
                ref="tabletow"
                :data="scope.row.choose"
                border
                style="width: 100%"
              >
                <el-table-column label="编号" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.cid}}</template>
                </el-table-column>
                <el-table-column label="名称" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.cname}}</template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                  <template slot-scope="btnScope">
                    <img :src="btnScope.row.img"  @click="$imageViewer" alt="" width="40" height="40" >
                  </template>
                </el-table-column>

                <!--                <el-table-column label="角色名称" align="center">-->
                <!--                  <template slot-scope="btnScope">{{btnScope.row.role}}</template>-->
                <!--                </el-table-column>-->
                <el-table-column label="操作" width="300" align="center">
                  <template slot-scope="btnScope">
                    <el-button size="mini" @click="showModelEventChoose">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDeleteChoose">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
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
import { getTestOneTest } from "@/api/userInfo";
const contentList = {
  id: "",
  name: "",
  phone: "",
  userName: "",
  password: "",
  roleId: "",
  role: "",
  addName: ""
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
    getRowKeys(row) {
      return row.tid
    },
    // 手风琴
    toogleExpand(row) {
      let $table = this.$refs.testList;
      this.list.map(item => {
        if (row.tid != item.tid) {
          $table.toggleRowExpansion(item, false);
          item.expansion = false;
          console.log(this.list)
        } else {
          item.expansion = !item.expansion;
          console.log(this.list)
        }
      });
      $table.toggleRowExpansion(row);
    },
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = {
        id: "",
        name: "",
        phone: "",
        userName: "",
        password: "",
        roleId: "",
        role: "",
        addName: ""
      };
    },
    showModelEvent: function(row) {
      this.changeShowModel();
      if (row) {
        this.contentList = row;
      } else {
        this.contentList = {
        };
      }
    },
    showModelEventChoose: function(row) {
      this.changeShowModel();
      if (row) {
        this.contentList = row;
      } else {
        this.contentList = {
        };
      }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum
      };
      getTestOneTest(data).then(res => {
        if (res.code === 0) {
          // this.total = res.data.total;
          this.list = res.data.list.map(res=>{
            return{
              expansion:false,
              ...res
            }
          });
        }
      });
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
      this.$confirm("此操作将永久删除该问题, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setAdminDelete({ id: row.id }).then(res => {
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
    },
    //删除选项
    handleDeleteChoose: function(row) {
      this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          setAdminDelete({ id: row.id }).then(res => {
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
.layout-title-button {
  color: #606266;
  background: #f2f6fc;
  font-weight: bold;
  height: 60px;
  button {
    position: absolute;
    right: 3%;
  }
}
</style>


