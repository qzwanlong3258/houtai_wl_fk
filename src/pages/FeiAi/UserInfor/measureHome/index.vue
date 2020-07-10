<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">约量房</span>
<!--      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>-->
    </el-card>
    <div class="table-container">
      <el-table ref="userList" style="width: 100%" :data="list" height="500" v-loading="listLoading" :row-key="getRowKeys" row-click="toggleRowExpansion" border>
        <el-table-column prop="cangku_name" align="center" width="50" label=" ">
          <template slot-scope="scope">
            <span
              id="linkspan"
              @click="toogleExpand(scope.row)"
            >{{scope.row.expansion ? '收起' : '展开'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          type="index"
          width="50" label="编号" align="center">
        </el-table-column>
<!--        <el-table-column label="编号" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.id}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="手机号" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
        <el-table-column label="地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="小区名称" align="center">
          <template slot-scope="scope">{{scope.row.communityName}}</template>
        </el-table-column>
        <el-table-column label="装修面积" align="center">
          <template slot-scope="scope">{{scope.row.area}} m²</template>
        </el-table-column>


<!--        <el-table-column label="操作" width="300" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button size="mini" @click="showModelEvent(scope.row)">编辑</el-button>-->
<!--            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column type="expand" width="1">
          <template slot-scope="scope">
            <el-card class="layout-title-button" style="position: relative" shadow="never">
              <i class="el-icon-tickets" style="margin-top: -15px"></i>
              <span style="margin-top: 5px">装修公司</span>
<!--              <el-button class="btn-add" @click="showModelEventButton()" size="mini">添加</el-button>-->
            </el-card>
            <div class="table2box">
              <el-table
                ref="tabletow"

                :data="scope.row.make"

                border
                style="width: 100%"

              >
                <el-table-column
                  type="index"
                  width="50" label="序号" align="center">
                </el-table-column>
<!--                <el-table-column label="编号" align="center">-->
<!--                  <template slot-scope="btnScope">{{btnScope.row.makeid}}</template>-->
<!--                </el-table-column>-->
                <el-table-column label="装修公司名称" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.decorateName}}</template>
                </el-table-column>
                <el-table-column label="预约时间" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.createTime}}</template>
                </el-table-column>
                <el-table-column label="状态" align="center">-->
                            <template slot-scope="btnScope"><div >
                              <el-tag v-if="btnScope.row.state == 1" size="mini" type="warning">待量房</el-tag>
                              <el-tag v-if="btnScope.row.state == 2" size="mini" type="success">通过</el-tag>
                              <el-tag v-if="btnScope.row.state == 3" size="mini" type="danger">不通过</el-tag>
                            </div></template>
                          </el-table-column>
                <el-table-column label="操作"  width="300" align="center">
                  <template slot-scope="btnScope">
                    <el-button v-if="btnScope.row.state == 3||btnScope.row.state == 1" size="mini" type="text"  @click="showModelEvent(btnScope.row)">通过</el-button>
                    <el-button v-if="btnScope.row.state == 2||btnScope.row.state == 1" size="mini" type="text" @click="handleDelete(btnScope.row)">不通过</el-button>
<!--                    <el-button size="mini" type="text" @click="showModelEvent(scope.row)">编辑</el-button>-->
<!--                    <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>-->
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
      ref="showModel"
      :modelStatus="showModel"
      @updateList="getList"
      @closeStatus="closeStatus"
      :contentList="contentList"
    />
    <change-model-button
      v-if="showModelButton"
      :modelStatus="showModelButton"
      @updateList="getList"
      @closeStatus="closeStatusButton"
      :contentList="contentListButton"
    />
  </div>
</template>
<script>
import ChangeModel from "./components/add";
import ChangeModelButton from "./components/addbutton";
import { getMeasureHome,putMeasureHome} from "@/api/userInfo";
const contentList = {
  id: "",
  button: "",
  cname:''
};
const contentListButton = {
  url: "",
  name: "",
  icon:""
};
export default {
  name: "userList",
  components: {
    ChangeModel,
    ChangeModelButton
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
      showModelButton:false,
      contentList,
      contentListButton
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
    changeShowModelButton: function() {
      this.showModelButton = !this.showModelButton;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = {
        id: "",
        cname:'',
        button: "",
        // phone: "",
        // userName: "",
        // password: "",
        // roleId: "",
        // role: "",
        // addName: ""
      };
    },
    closeStatusButton: function() {
      this.changeShowModelButton();
      this.contentListButton = {
        url: "",
        name: "",
        icon:""

      };
    },
    // showModelEventButton: function(row) {
    //   this.changeShowModelButton();
    //   console.log(row)
    //   if (row) {
    //     //
    //     this.contentListButton = row;
    //     // this.contentListButton.name = row.bname
    //
    //     // console.log(this.contentList)
    //   }else {
    //     this.contentListButton = {
    //       url: "",
    //       name: "",
    //       icon:""
    //     };
    //   }
    // },
    showModelEvent: function(row) {
      putMeasureHome({
        id: row.makeid,
        state: '2'
      }).then(res=>{
        this.getList()
        this.$message.success("修改成功");

      })
      // this.changeShowModel();
      // if (row) {
      //   this.contentList.id = row.uuid;
      //   this.contentList.cname = row.name
      //   if(row.button){
      //     this.contentList.button = row.button.map(res=>{
      //       return res.id
      //     }).toString();
      //   }
      //   // console.log(this.contentList)
      // }else {
      //   this.contentList = {
      //     id: "",
      //     cname:'',
      //     button: ""
      //   };
      // }
    },
    getList() {
      let data = {
        pageSize: this.listQuery.pageSize,
        pageNum: this.listQuery.pageNum
      };
      getMeasureHome(data).then(res => {
        if (res.code === 0) {
          console.log(res)
          this.total = res.data.total;
          this.list = res.data.list.map(res=>{
            return{
              expansion:false,
              ...res
            }
          })
          // console.log(this.list)
        }
      });
      // this.showModel=false
      // this.showModelButton=false
      // getButtonList().then( res=>{
      //   if (res.code === 0) {
      //     // console.log(res)
      //
      //     this.buttonList = res.data.list
      //     // console.log(this.buttonList)
      //   }
      // })
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
    //删除城市
    handleDelete: function(row) {
      putMeasureHome({
        id: row.makeid,
        state: '3'
      }).then(res=>{
        this.getList()
        this.$message.success("修改成功");

      })
      // this.$confirm("此操作将永久删除该城市, 是否继续?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     deleteCity({ uuid: row.uuid }).then(res => {
      //       if (res.code === 0) {
      //         this.getList();
      //         this.$message.success("删除成功");
      //       }
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消删除"
      //     });
      //   });
    },
    // handleDeleteButton: function(row) {
    //   this.$confirm("此操作将永久删除该按钮, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       deleteButton({ id: row.id }).then(res => {
    //         if (res.code === 0) {
    //           this.getList();
    //           this.$message.success("删除成功");
    //         }
    //       });
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: "info",
    //         message: "已取消删除"
    //       });
    //     });
    // }
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


