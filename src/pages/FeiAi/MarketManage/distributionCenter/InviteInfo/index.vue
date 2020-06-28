<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">邀请信息</span>
      <el-button class="btn-add" type="primary" icon="el-icon-printer" @click="print()" size="mini">打印</el-button>
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
      <el-table ref="userList" style="width: 100%" :data="list" height="440" v-loading="listLoading" border>
        <el-table-column label="用户id" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">{{scope.row.create_time|time}}</template>
        </el-table-column>
        <el-table-column label="邀请人"  align="center">
          <template slot-scope="scope"> {{scope.row.applyName?scope.row.applyName:"无"}}</template>
        </el-table-column>
        <el-table-column label="" :render-header="renderHeader" align="center">
          <template slot-scope="scope"> <div @click="toDetail(scope.row)"  title="点击查看">{{scope.row.applyCount}}</div> </template>
        </el-table-column>
        <el-table-column label="积分" align="center">
          <template slot-scope="scope">{{scope.row.integral}}</template>
        </el-table-column>
        <el-table-column label="角色" align="center">
          <template slot-scope="scope">{{scope.row.applyRoleName}}</template>
        </el-table-column>
<!--        <el-table-column label="状态" align="center">-->
<!--          <template slot-scope="scope"><div >-->
<!--            <el-tag v-if="scope.row.isdelete == 0" size="mini" type="success">启用</el-tag>-->
<!--            <el-tag v-else size="mini" type="danger">停用</el-tag>-->
<!--          </div></template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="地址" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.address}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="操作" width="300" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button v-if="scope.row.isdelete == 1" size="mini" type="text" @click="upHandle(scope.row)">启用</el-button>-->
<!--            <el-button v-if="scope.row.isdelete == 0" size="mini" type="text" @click="upHandle(scope.row)">停用</el-button>-->
<!--            <el-button size="mini" type="text" @click="showModelEvent(scope.row)">编辑</el-button>-->
<!--            <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>
<!--    <div class="pagination-container">-->
<!--      <el-pagination-->
<!--        background-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        layout="total, sizes,prev, pager, next,jumper"-->
<!--        :page-size="listQuery.size"-->
<!--        :page-sizes="[5,10,15]"-->
<!--        :current-page.sync="listQuery.page"-->
<!--        :total="total"-->
<!--      ></el-pagination>-->
<!--    </div>-->
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
import { getUserList } from "@/api/userInfo";
import CheckDetails from './components/index-details'
const contentList = {
  id:'',
  name: "",
  address: "",
  loanType: "",
  img: ""
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
        page: 1,
        size: 5,
        name: '',
      },
      showModel: false,
      contentList: {
        id: "",
        name: "",
        address: "",
        loanType: "",
        img: ""
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
  filters:{
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
      var h = time.getHours() - 1;
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
    }
  },
  methods: {
    print(){
      window.open(this.$http.adornUrl(`/api-spms/spms/corpContact/print/${this.$http.appendUrlAccessToken()}`))
    },
    renderHeader (h, {column}) {
      return h(
        'div',
        [
          h('div', '邀请数量'),

          h('div',[
            h('i', {
              class:'el-icon-warning',
              style:'color:#e6a23c;'
            }),
            h('span', {
              style:{
                'margin-right':'10px',
                'color':'#e6a23c',
                'cursor':'pointer'
              },
            },'点击查看详情'),

          ]),
          // h('el-checkbox',{
          //   style:'margin-left:5px',
          //   on:{
          //     change:this.select // 选中事件
          //   }}),
          // h('img', {
          //   // src: './image/header.png',
          //   // class:'el-icon-location',
          //   style: 'width:120px;height:50px;',
          //   attrs: {
          //     src: require('./image/header.png')
          //   }
          // })
        ]
      )
    },
    toDetail:function(e) {
      this.$refs.checkDetails.init(e.id)
    },
    handleResetSearch(){
      this.listQuery = {
        page: 1,
        size: 500,
        name: '',
      }
      this.getList()
    },
    // upHandle(e){
    //   let a={
    //     id:e.id,
    //     delete:e.isdelete==0?1:0
    //   }
    //   upBank(a).then(res=>{
    //     this.$message.success("修改成功");
    //     this.getList()
    //   })
    // },
    // changeShowModel: function() {
    //   this.showModel = !this.showModel;
    // },
    // closeStatus: function() {
    //   this.changeShowModel();
    //   this.contentList = contentList;
    // },
    // showModelEvent: function(row) {
    //   this.changeShowModel();
    //   if (row) {
    //     this.contentList = {
    //       id: row.id,
    //       name: row.name,
    //       address: row.address,
    //       loanType: row.loanTypeId,
    //       img: row.img
    //     };
    //   } else {
    //     this.contentList = contentList;
    //   }
    // },
    getList() {
      let data = {
        size: this.listQuery.size,
        page: this.listQuery.page,
        name: this.listQuery.name
      };
      getUserList(data).then(res => {
        if (res.code === 0) {
          this.total =Number(res.data.count) ;
          console.log(res.data.list)
          // res.data.list.length &&
          //   res.data.list.map(item => {
          //     if (item.bankAddress) {
          //       item.bankAddress = JSON.parse(item.bankAddress).join("/");
          //     }
          //   });
          //
          // console.log(this.list)
          this.list = []
            res.data.list.map(res=>{
              if(Number(res.applyCount)>0){
                this.list.push(res)
              }
            })
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
    // handleDelete: function(row) {
    //   this.$confirm("此操作将永久删除该角色, 是否继续?", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(() => {
    //       setBankDelete({ id: row.id }).then(res => {
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


