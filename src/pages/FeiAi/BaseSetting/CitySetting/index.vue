<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">城市管理</span>
      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="userList" style="width: 100%" :data="list" v-loading="listLoading" :row-key="getRowKeys" row-click="toggleRowExpansion" border>
        <el-table-column prop="cangku_name" align="center" width="50" label=" ">
          <template slot-scope="scope">
            <span
              id="linkspan"
              @click="toogleExpand(scope.row)"
            >{{scope.row.expansion ? '收起' : '展开'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>


        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="showModelEvent(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column type="expand" width="1">
          <template slot-scope="scope">
            <el-card class="layout-title-button" style="position: relative" shadow="never">
              <i class="el-icon-tickets" style="margin-top: -15px"></i>
              <span style="margin-top: 5px">按钮管理</span>
              <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
            </el-card>
            <div class="table2box">
              <el-table
                ref="tabletow"

                :data="scope.row.button"

                border
                style="width: 100%"

              >
                <el-table-column label="编号" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.id}}</template>
                </el-table-column>
                <el-table-column label="名称" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.buttonName}}</template>
                </el-table-column>
                <el-table-column label="图片" align="center">
                  <template slot-scope="btnScope">
                    <img :src="buttonList.find(item => item.id == btnScope.row.id).icon"  alt="" width="40" height="40" >
                    </template>
                </el-table-column>
                <el-table-column label="路由" align="center">
                  <template slot-scope="btnScope">{{buttonList.find(item => item.id == btnScope.row.id).url}}</template>
                </el-table-column>
<!--                <el-table-column label="角色名称" align="center">-->
<!--                  <template slot-scope="btnScope">{{btnScope.row.role}}</template>-->
<!--                </el-table-column>-->
                <el-table-column label="操作" width="300" align="center">
                  <template slot-scope="btnScope">
                    <el-button size="mini" @click="showModelEvent(btnScope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(btnScope.row)">删除</el-button>
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
import { getCityList, setAdminDelete,getButtonList} from "@/api/baseSetting";
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
      buttonList:[],
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
            return row.id
          },
    // 手风琴
    toogleExpand(row) {
      let $table = this.$refs.userList;
      this.list.map(item => {
        if (row.id != item.id) {
          $table.toggleRowExpansion(item, false);
          item.expansion = false;
        } else {
          item.expansion = !item.expansion;
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
      }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum
      };
      getCityList(data).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.total = res.data.total;
          this.list = res.data.list.map(res=>{
            return{
              expansion:false,
              ...res
            }
          })
          console.log(this.list)
        }
      });
      getButtonList().then( res=>{
        if (res.code === 0) {
          console.log(res)

          this.buttonList = res.data.list
          console.log(this.buttonList)
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
    //删除角色
    handleDelete: function(row) {
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
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


