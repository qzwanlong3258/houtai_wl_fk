<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">贷款预审</span>
      <div  class="button">
        <el-date-picker
                      v-model="dateOut"
                      size="mini"
                      type="datetimerange"
                      range-separator="至"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
        <el-button class="btn-add"  type="primary" icon="el-icon-printer" @click="print()" size="mini">打印</el-button>
      </div>
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
<!--           <el-form-item label="贷款类型：">-->
<!--            <el-select v-model="listQuery.type" size="small" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in produceType"-->
<!--                :key="item.id"-->
<!--                :label="item.name"-->
<!--                :value="item.id"-->
<!--              ></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="贷款人：">
            <el-input style="width: 203px" v-model="listQuery.name" placeholder="贷款人"></el-input>
          </el-form-item>
          <el-form-item label="日期：">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期">

            </el-date-picker>
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
import { getCheckList,getCheckListAll } from "@/api/checkSetting";
import {orderOut} from "@/api/out"
export default {
  data() {
    return {
       date:[],
       dateOut:[],
       produceType: [
        {
          id: 1,
          name: "银行产品"
        },
        {
          id: 2,
          name: "合作产品"
        }
      ],
      statusList: [
        // {
        //   id: 0,
        //   label: "全部"
        // },
        {
          id: 6,
          label: "待审核"
        },
        {
          id: 7,
          label: "已通过"
        },
        {
          id: 8,
          label: "未通过"
        }
      ],
      list: [],
      total: null,
      listQuery: {
        state: 6,
        name: "",
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
    print(){
      orderOut({
        state:this.listQuery.state,
        bdate:this.dateOut[0]?this.dateOut[0]:"",
        edate:this.dateOut[1]?this.dateOut[1]:"",
      }).then(res=>{
        // console.log(res)
        window.open(res, '_self')
      })
    },
    getList() {
      if(this.date.length == 0){
        getCheckList(this.listQuery).then(res => {
          if (res.code === 0) {
            // this.$store.commit('setState',{
            //   loanTotal:Number(res.data.count)
            // })
            this.total =Number(res.data.count) ;
            this.list = res.data.list;
          }
        });
      } else {
        this.listQuery.bdate =this.date[0]
        this.listQuery.edate =this.date[1]
        getCheckListAll(this.listQuery).then(res => {
          if (res.code === 0) {
            // this.$store.commit('setState',{
            //   loanTotal:Number(res.data.count)
            // })
            this.total = res.data.total;
            this.list = res.data.list;
          }
        });
      }

    },
    //切换tab
    tabClickEvent(tab, e) {
      if(tab.index == 0){
        this.listQuery.state =6
      }
      if(tab.index == 1){
        this.listQuery.state =7

      }
      if(tab.index == 2){
        this.listQuery.state =8

      }

      // this.listQuery.state = tab.index;
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
  position: relative;
  .button {
    position: absolute;
    right: 3%;
    top: 35%;
  }
}
.ctrlbtn-list {
  margin-bottom: 6px;
  height: 30px;
}
.ctrlbtn-list-float {
  margin-left: 10px;
  float: right;
  font-size: 12px;
  line-height: 1;
}
</style>

<style>
  /*.dateGloab{*/
  /*  position: absolute;*/
  /*  right: 10%;*/
  /*}*/
</style>

