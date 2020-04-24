<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">装企审核</span>
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
          <el-form-item label="城市：">
            <el-select v-model="listQuery.cid" size="small" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="Number(item.id)"
                :label="item.name"
                :value="Number(item.id) "
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="装修公司名称：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="贷款人"></el-input>
          </el-form-item>
<!--          <el-form-item label="贷款额度：">-->
<!--            <el-input style="width: 203px" v-model="listQuery.loanQuota" placeholder="贷款额度"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="面签城市：">-->
<!--            <area-cascader-->
<!--              :level="0"-->
<!--              type="text"-->
<!--              placeholder="请选择地区"-->
<!--              v-model="listQuery.facesignCity"-->
<!--              :data="$pcaa"-->
<!--              style="line-height: 20px"-->
<!--            ></area-cascader>-->
<!--          </el-form-item>-->
        </el-form>
      </div>
    </el-card>
    <el-tabs type="border-card" @tab-click="tabClickEvent">
      <el-tab-pane v-for="(item,index) in statusList" :key="index" :label="item.label">
        <love-table :list="list" :status="item.id" @pupdataList="getList" />
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
import { getShop,getShopOne } from "@/api/shopManage";
import { getCityList} from "@/api/baseSetting";
export default {
  data() {
    return {
      statusList: [
        {
          id: 0,
          label: "装企预审"
        },
        {
          id: 1,
          label: "已通过"
        },
        {
          id: 2,
          label: "未通过"
        },
      ],
      cityList: [

      ],
      list: [],
      total: null,
      listQuery: {
        cid: '',
        name: "",
        pageNum: 1,
        pageSize: 5,
        state:1
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

      if(this.listQuery.cid){
        getShop(this.listQuery).then(res => {
          if (res.code === 0) {
            this.total = Number(res.data.count) ;
            // this.listQuery.pageSize = res.data.list.length
            this.list = res.data.list;
          }
        });
      } else {
        getShopOne({
          name: this.listQuery.name,
          pageNum: this.listQuery.pageNum,
          pageSize: this.listQuery.pageSize,
          state:this.listQuery.state
        }).then(res=>{
          this.total =Number(res.data.count);
          // this.listQuery.pageSize = res.data.list.length
          this.list = res.data.list;
        })
      }

      getCityList().then(res => {
        if (res.code === 0) {
          this.cityList = res.data.list
          // console.log(this.list)
        }
      });
    },
    //切换tab
    tabClickEvent(tab, e) {
      console.log(tab)
      if(tab.index == 0){
        this.listQuery.state =1
      }
      if(tab.index == 1){
        this.listQuery.state =2

      }
      if(tab.index == 2){
        this.listQuery.state = 3

      }
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
        cid: '',
        name: "",
        pageNum: 1,
        pageSize: 5,
        state:1
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
</style>



