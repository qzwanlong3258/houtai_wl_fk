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
          <el-form-item label="银行名称：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="银行名称"></el-input>
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
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="logo" align="center" show-overflow-tooltip>-->
                  <template slot-scope="scope">
                    <img :src="scope.row.img"  alt="" min-width="20" height="40" >
                  </template>
                </el-table-column>
        <el-table-column label="产品类型" align="center">
          <template slot-scope="scope">{{scope.row.loanTypeId==1?'银行产品':'合作产品'}}</template>
        </el-table-column>
        <el-table-column label=""  :render-header="renderHeader" align="center">
          <template slot-scope="scope"> <div @click="toDetail(scope.row)" title="点击查看">{{scope.row.count}}</div></template>
        </el-table-column>

        <el-table-column label="地址" align="center">
          <template slot-scope="scope">{{scope.row.address}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope"><div >
            <el-tag v-if="scope.row.isdelete == 0" size="mini" type="success">启用</el-tag>
            <el-tag v-else size="mini" type="danger">停用</el-tag>
          </div></template>
        </el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isdelete == 1" size="mini" type="text" @click="upHandle(scope.row)">启用</el-button>
            <el-button v-if="scope.row.isdelete == 0" size="mini" type="text" @click="upHandle(scope.row)">停用</el-button>
            <el-button size="mini" type="text" @click="showModelEvent(scope.row)">编辑</el-button>
            <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>
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
    <check-details ref="checkDetails"></check-details>
  </div>
</template>
<script>
import ChangeModel from "./components/add";
import { getBankList, deleteBank,upBank } from "@/api/bank";
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
  methods: {
    toDetail:function(e) {
      this.$refs.checkDetails.init(e.id)
    },
    renderHeader (h, {column}) {
      return h(
        'div',
        [
          h('div', '接待客户数'),

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
    handleResetSearch(){
      this.listQuery = {
        page: 1,
        size: 5,
        name: '',
      }
      this.getList()
    },
    upHandle(e){
      let a={
        id:e.id,
        delete:e.isdelete==0?1:0
      }
      upBank(a).then(res=>{
        this.$message.success("修改成功");
        this.getList()
      })
    },
    changeShowModel: function() {
      this.showModel = !this.showModel;
    },
    closeStatus: function() {
      this.changeShowModel();
      this.contentList = contentList;
    },
    showModelEvent: function(row) {
      this.changeShowModel();
      if (row) {
        this.contentList = {
          id: row.id,
          name: row.name,
          address: row.address,
          loanType: row.loanTypeId,
          img: row.img
        };
      } else {
        this.contentList = contentList;
      }
    },
    getList() {
      let data = {
        size: this.listQuery.size,
        page: this.listQuery.page,
        name: this.listQuery.name
      };
      getBankList(data).then(res => {
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
          this.list = res.data.list;
        }
      });
      this.showModel=false
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
      this.$confirm("此操作将永久删除该银行, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteBank({ id: row.id }).then(res => {
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


