<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">订单管理</span>
    </el-card>

    <el-tabs type="border-card" @tab-click="tabClickEvent">
      <el-tab-pane v-for="(item,index) in statusList" :key="index" :label="item.label">
        <love-table v-if="list.length" :list="list" :status="item.id" @pupdataList="getList" :size="listQuery.pageSize" :page="listQuery.pageNum" />
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
      </el-tab-pane>
    </el-tabs>
    <div style="height: 24px"></div>
  </div>
</template>
<script>
  import LoveTable from "./components/table";
  import { getOrder } from "@/api/order";
  export default {
    data() {
      return {
        statusList: [
          // {
          //   id: 0,
          //   label: "全部"
          // },
          {
            id: 2,
            label: "待发货"
          },
          {
            id: 3,
            label: "待收货"
          },
          {
            id: 4,
            label: "完成"
          },
          // {
          //   id: 5,
          //   label: "退换"
          // }

        ],
        list: [],
        total: null,
        listQuery: {
          state: 2,
          pageNum: 1,
          pageSize: 5
        }
      };
    },
    components: {
      LoveTable
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {

        getOrder(this.listQuery).then(res=>{
          this.$store.commit('setState',{
            orderTotal:Number(res.data.count)
          })
          this.total =Number(res.data.count) ;
          this.list = res.data.list;
        })

      },
      //切换tab
      tabClickEvent(tab, e) {
        this.listQuery ={
          state:  Number(tab.index)+2,
          pageNum: 1,
          pageSize: 5
        }
        // if(tab.index == 0){
        //   this.listQuery.state =2
        // }
        // if(tab.index == 1){
        //   this.listQuery.state =3
        //
        // }
        // if(tab.index == 2){
        //   this.listQuery.state = 4
        //
        // }
        // if(tab.index == 2){
        //   this.listQuery.state = 5
        //
        // }
        //
        // // this.listQuery.state = tab.index;
        this.getList();
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
      handleResetSearch() {
        this.listQuery = {
          state: this.listQuery.state,
          name: "",
          pageNum: 1,
          pageSize: 5
        };
        this.date =[]
        this.getList()
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
</style>



