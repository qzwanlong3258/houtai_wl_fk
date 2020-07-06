<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">推广商品</span>
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
<!--          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.id}}</div></template>-->
<!--        </el-table-column>-->
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.name}}</div></template>
        </el-table-column>
        <el-table-column label="商品价格" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.price}}</div></template>
        </el-table-column>
        <el-table-column label="商品原价" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.originalPrice}}</div></template>
        </el-table-column>
        <el-table-column label="商品库存" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.count}}</div></template>
        </el-table-column>
        <el-table-column label="兑换次数" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.buyCounts}}</div></template>
        </el-table-column>
        <el-table-column label="商品类型" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.type==1?'积分商品':'推广商品'}}</div></template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope"><div @click="toDetail(scope.row)">{{scope.row.createDate|Time}}</div></template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
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
    <check-details ref="checkDetails"></check-details>
  </div>
</template>
<script>
import ChangeModel from "./components/add";
import { getGood, detGood } from "@/api/market";
import CheckDetails from './components/index-details'
const contentList = {
  id: "",
  name: "",
  price: "",
  originalPrice: "",
  count: "",
  Details: "",
  Showimg: "",
  goodImgList:[],
  playImgList:[]
};
export default {
  name: "userList",
  components: {
    ChangeModel,
    CheckDetails
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
    toDetail:function(e) {
      this.$refs.checkDetails.init(e)
    },
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = {
        id: "",
        name: "",
        price: "",
        originalPrice: "",
        count: "",
        Details: "",
        Showimg: "",
        goodImgList:[],
        playImgList:[]
      };
    },
    showModelEvent: function(row) {

      this.changeShowModel();
      console.log(this.showModel)
      if (row) {
        // if(!this.showModel){
        //   this.changeShowModel();
        // }
        // this.$forceUpdate()
        this.contentList = row;
      } else{
        this.contentList = contentList;
      }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum,
        type:2
      };
      getGood(data).then(res => {
        if (res.code === 0) {
          this.total =Number(res.data.count);
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
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          detGood({ id: row.uuid }).then(res => {
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


