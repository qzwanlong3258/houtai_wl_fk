<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">测一测数据</span>
<!--      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>-->
    </el-card>
    <div class="table-container">
      <el-table ref="testList" style="width: 100%"  :data="list" :row-key="getRowKeys"  v-loading="listLoading" border>
        <el-table-column prop="cangku_name" align="center" width="50" label=" ">
          <template slot-scope="scope">
            <span
              id="linkspan"
              @click="toogleExpand(scope.row)"
            >{{scope.row.expansion ? '收起' : '展开'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          width="50" label="序号" align="center">
          <template slot-scope="scope">
          <span >
              {{(listQuery.pageNum * listQuery.pageSize - listQuery.pageSize) + scope.$index + 1}}
            <!-- <icon-svg name="admin"></icon-svg> -->
            </span>
          </template>
        </el-table-column>

        <el-table-column label="城市" align="center">
          <template slot-scope="scope">{{scope.row.cityName}}</template>
        </el-table-column>
        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">{{scope.row.phone?scope.row.phone:'-'}}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope">
            <template slot-scope="scope">
            <img class="avatar-box" :src="scope.row.avatarUrl" />
          </template></template>
        </el-table-column>
        <el-table-column label="微信名" align="center">
        <template slot-scope="scope">{{scope.row.nickName}}</template>
      </el-table-column>
        <el-table-column label="剩余积分" align="center">
          <template slot-scope="scope">{{scope.row.integral}}</template>
        </el-table-column>

<!--        <el-table-column label="操作" width="300" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" @click="showModelEvent(scope.row)">编辑</el-button>-->
<!--            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column type="expand" width="1">
          <template slot-scope="scope">
            <el-card class="layout-title-button" shadow="never" style="position: relative">
              <i class="el-icon-tickets" style="margin-top: 5px"></i>
              <span style="margin-top: 5px">用户选择</span>
<!--              <el-button class="btn-add" @click="showModelEventChoose(scope.row,true)" size="mini">添加</el-button>-->
            </el-card>
            <div class="table2box">
              <el-table
                ref="tabletow"
                :data="scope.row.wenti"
                border
                style="width: 100%"
              >
<!--                <el-table-column label="编号" align="center">-->
<!--                  <template slot-scope="btnScope">{{btnScope.row.cid}}</template>-->
<!--                </el-table-column>-->
                <el-table-column label="问题" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.issue}}</template>
                </el-table-column>
<!--                <el-table-column label="问题" align="center">-->
<!--                  <template slot-scope="btnScope">-->
<!--                    <img :src="btnScope.row.img"  @click="$imageViewer" alt="" min-width="20" height="40" >-->
<!--                  </template>-->
<!--                </el-table-column>-->

                                <el-table-column label="所选选项" align="center">
                                  <template slot-scope="btnScope">{{btnScope.row.answer}}</template>
                                </el-table-column>
<!--                <el-table-column label="操作" width="300" align="center">-->
<!--                  <template slot-scope="btnScope">-->
<!--                    <el-button size="mini" @click="showModelEventChoose(btnScope.row)">编辑</el-button>-->
<!--                    <el-button size="mini" type="danger" @click="handleDeleteChoose(btnScope.row)">删除</el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
              </el-table>
            </div>
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
    <change-model-test
      v-if="showModelTest"
      :modelStatus="showModelTest"
      @updateList="getList"
      @closeStatus="closeStatusTest"
      :contentList="contentListTest"
    />
  </div>
</template>
<script>
import ChangeModel from "./components/add";
import { getTestOneTestRecord ,deleteTestOneTest,deleteTestOneTestItem } from "@/api/userInfo";
import ChangeModelTest from "./components/addtest";
const contentList = {
  id: "",
  content:''
};
const contentListTest = {
  id: "",
  name: "",
  img: "",
  score: ""
};
export default {
  name: "userList",
  components: {
    ChangeModel,
    ChangeModelTest
  },
  data() {
    return {
      list: [],
      total: null,
      listLoading: false,
      showModelTest:false,
      listQuery: {
        pageNum: 1,
        pageSize: 5
      },
      showModel: false,
      contentList,
      contentListTest,

    };
  },
  created() {
    this.getList();
  },
  methods: {
    getRowKeys(row) {
      return row.nickName
    },
    // 手风琴
    toogleExpand(row) {
      let $table = this.$refs.testList;
      this.list.map(item => {
        if (row.nickName != item.nickName) {
          $table.toggleRowExpansion(item, false);
          item.expansion = false;
          console.log(1)
        } else {
          item.expansion = !item.expansion;
          console.log(2)
        }
      });
      $table.toggleRowExpansion(row);
    },
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    changeShowModelTest: function() {
      this.showModelTest = !this.showModelTest;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = {
        id: "",
        content:''
      };
    },
    closeStatusTest: function() {
      this.changeShowModelTest();
      this.contentListTest = {
        id: "",
        name: "",
        img: "",
        score: ""
      };
    },
    showModelEvent: function(row) {
      this.changeShowModel();
      if (row) {
        this.contentList.id = row.tid;
        this.contentList.content = row.content;
      } else {
        this.contentList =  {
          id: "",
          content:''
        };
      }
    },
    showModelEventChoose: function(row,add) {
      this.changeShowModelTest();
      console.log(row)
      if (row) {
        if(add){
          this.contentListTest = {
            id: row.tid,
          };

        } else {
          this.contentListTest.name = row.cname;
          this.contentListTest.score = row.score;
          this.contentListTest.img = row.img;
          this.contentListTest.id=row.cid
          this.contentListTest.add=true

        }


      }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum,
        type:'2'
      };
      getTestOneTestRecord(data).then(res => {
        if (res.code === 0) {
          // this.total = res.data.total;
          this.list = res.data.list.map(res=>{
            return{
              expansion:false,
              ...res,
              wenti:res.wen.split(',').map(res=>{
                 return {issue : res.split(';')[0],
                  answer : res.split(';')[1]
                 }
              })
            }
          });
        }
      });
      this.showModel=false
      this.showModelTest=false
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
          deleteTestOneTest({ id: row.tid }).then(res => {
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
          deleteTestOneTestItem({ id: row.cid }).then(res => {
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
.avatar-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>


