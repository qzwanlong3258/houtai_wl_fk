<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">活动管理</span>
      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="userList" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column
          width="50" label="序号" align="center">
          <template slot-scope="scope">
          <span >
              {{(listQuery.pageNum * listQuery.pageSize - listQuery.pageSize) + scope.$index + 1}}
            <!-- <icon-svg name="admin"></icon-svg> -->
            </span>
          </template>
        </el-table-column>
<!--        <el-table-column label="编号" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.id}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="活动名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="活动描述" align="center">
          <template slot-scope="scope">{{scope.row.describe}}</template>
        </el-table-column>
        <el-table-column label="数量" align="center">
          <template slot-scope="scope">{{scope.row.count}}</template>
        </el-table-column>
        <el-table-column label="角色名称" align="center">
          <template slot-scope="scope">{{scope.row.roleName}}</template>
        </el-table-column>
        <el-table-column label="展示图" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.img"  @click="$imageViewer" alt="" min-width="20" height="40" >
          </template>
        </el-table-column>
        <el-table-column label="奖励积分" align="center">
          <template slot-scope="scope">{{scope.row.money}}</template>
        </el-table-column>
        <el-table-column label="开始时间" align="center" width="180">
          <template slot-scope="scope">{{scope.row.bdate|time}}</template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" width="180">
          <template slot-scope="scope">{{scope.row.edate|time}}</template>
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
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
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
import { getRecommendCenter,deleteRecommendCenter} from "@/api/market";
const contentList = {
  name:"",
  img:"",
  roleid:"",
  money:"",
  describe:"",
  count:"",
  bdate:"",
  edate:""
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
        name:"",
        img:"",
        roleid:"",
        money:"",
        describe:"",
        count:"",
        bdate:"",
        edate:""
      };
    },
    time(val){
      if(!val){
        return ''
      }
      var time = new Date(val);

      function timeAdd0(str) {
        if (str < 10) {
          str = '0' + str;
        }
        return str
      }
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
    },
    showModelEvent: function(row) {
      this.changeShowModel();
      if (row) {
        this.contentList = {...row};
        this.contentList.bdate = this.time(row.bdate)
        this.contentList.edate = this.time(row.edate)
      } else {
        this.contentList = contentList
      }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum
      };
      getRecommendCenter(data).then(res => {
        if (res.code === 0) {
          this.total =Number(res.data.count) ;
          this.list = res.data.list;
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
      this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRecommendCenter({ id: row.id }).then(res => {
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


