<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">优惠券</span>
<!--      <el-button class="btn-add" @click="showModelEvent()" size="mini">添加</el-button>-->
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
          <el-form-item label="昵称：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="昵称"></el-input>
          </el-form-item>
        </el-form>
      </div>
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
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="姓名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="头像" align="center">
          <template slot-scope="scope"> <img :src="scope.row.logo" class="head-photo" alt=""  ></template>
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
              <span style="margin-top: 5px">优惠券</span>
              <el-button class="btn-add" @click="showModelEventButton('',scope.row.uuid)" size="mini">添加</el-button>
            </el-card>
            <div class="table2box">
              <el-table
                ref="tabletow"

                :data="scope.row.volume"

                border
                style="width: 100%"

              >
                <el-table-column label="编号" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.vid}}</template>
                </el-table-column>
                <el-table-column label="描述" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.describe}}</template>
                </el-table-column>
                <el-table-column label="开始时间" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.begin}}</template>
                </el-table-column>
                <el-table-column label="结束时间" align="center">
                  <template slot-scope="btnScope">{{btnScope.row.end}}</template>
                </el-table-column>
<!--                <el-table-column label="状态" align="center">&ndash;&gt;-->
<!--                            <template slot-scope="btnScope"><div >-->
<!--                              <el-tag v-if="btnScope.row.state == 1" size="mini" type="warning">待预约</el-tag>-->
<!--                              <el-tag v-if="btnScope.row.state == 2" size="mini" type="success">通过</el-tag>-->
<!--                              <el-tag v-if="btnScope.row.state == 3" size="mini" type="danger">不通过</el-tag>-->
<!--                            </div></template>-->
<!--                          </el-table-column>-->
                <el-table-column label="操作"  width="300" align="center">
                  <template slot-scope="btnScope">
                    <el-button  size="mini" type="text"  @click="showModelEventButton(btnScope.row,scope.row.uuid)">编辑</el-button>
                    <el-button  size="mini" type="text" @click="handleDelete(btnScope.row)">删除</el-button>
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
import { getCoupon } from "@/api/shopManage";

const contentList = {
  id: "",
  button: "",
  cname:''
};
const contentListButton = {

  begin:'',
  end:'',
  uuid:'',
  describe:''
}
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
        pageSize: 5,
        name:''
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

        begin:'',
        end:'',
        uuid:'',
        describe:''

      };
    },
    showModelEventButton: function(row,uuid) {
      this.changeShowModelButton();
      console.log(row)
      console.log(uuid)

      if (row) {
        //
        this.contentListButton.begin = row.begin;
        this.contentListButton.end = row.end;
        this.contentListButton.describe = row.describe;
        // this.contentListButton.name = row.bname

        // console.log(this.contentList)
      }else {
        this.contentListButton.uuid=uuid
      }
    },
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
    getCouponList(e){

      console.log(e)
      this.list=e.map(res=>{
        if(res.volume){
        let volume = res.volume.split(',')

        console.log(volume)
        var b=[]
        volume.map(reso=>{
          let qa=reso.split(';')
          let qaz=qa.map(re=>{
            return re.split(':')
          })
          console.log(qaz)
          let e=new Object()
          qaz.map(res=>{
            e[res[0]]=res[1]
          })
          console.log(e)

          let num= e.describe.replace(/[^0-9]/ig,"")
          e.num=num
          b.push(e)
        })
        }

        return{
          expansion:false,
          ...res,
          volume:b
        }
      })
      console.log(this.list)
    },
    getList() {
      // let data = {
      //   pageSize: this.listQuery.pageSize,
      //   pageNum: this.listQuery.pageNum
      // };
      getCoupon(this.listQuery).then(res => {
        if (res.code === 0) {
          console.log(res)
           this.getCouponList(res.data.list)
          // this.total = res.data.total;
          // this.list = res.data.list.map(res=>{
          //   return{
          //     expansion:false,
          //     ...res
          //   }
          // })
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
    handleResetSearch() {
      this.listQuery = {

        name: "",

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
  .head-photo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
</style>

