<template>
  <div>
    <div class="app-container">
      <div class="total-layout">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="total-frame">
              <i class="iconfont icondingdan total-icon"></i>
              <div class="total-title">今日贷款笔数</div>
              <div class="total-value">{{top.toDayCount}}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <i class="iconfont iconjinqian total-icon"></i>
              <div class="total-title">今日贷款总额</div>
              <div class="total-value">￥{{top.toDayloanMoney}}</div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="total-frame">
              <i class="iconfont iconjifen1 total-icon"></i>
              <div class="total-title">贷款总额</div>
              <div class="total-value">{{top.loanMoney}}</div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="un-handle-layout">
        <div class="layout-title">待处理事务</div>
        <div class="un-handle-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">待预审贷款申请</span>
                <span style="float: right" class="color-danger">({{midTop.stayPre}})</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">已通过贷款申请</span>
                <span style="float: right" class="color-danger">({{midTop.stayPreOK}})</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">未通过贷款申请</span>
                <span style="float: right" class="color-danger">({{midTop.stayPreNO}})</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">贷款面签待面签数</span>
                <span
                  style="float: right"
                  class="color-danger"
                >({{midTop.stayPreOK}})</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">贷款面签成功数</span>
                <span
                  style="float: right"
                  class="color-danger"
                >({{midTop.stayVisaOK}})</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="un-handle-item">
                <span class="font-medium">贷款面签失败数</span>
                <span style="float: right" class="color-danger">({{midTop.stayVisaNO}})</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="overview-layout">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="out-border">
              <div class="layout-title">银行总览</div>
              <div style="padding: 40px">
                <el-row>
                  <el-col
                    :span="8"
                    class="color-danger overview-item-value"
                  >{{bank.ALL}}</el-col>
                  <el-col
                    :span="8"
                    class="color-danger overview-item-value"
                  >{{bank.NO}}</el-col>
<!--                  <el-col-->
<!--                    :span="6"-->
<!--                    class="color-danger overview-item-value"-->
<!--                  >{{topData.bankStatistics.deleted}}</el-col>-->
                  <el-col
                    :span="8"
                    class="color-danger overview-item-value"
                  >{{bank.OK}}</el-col>
                </el-row>
                <el-row class="font-medium">
                  <el-col :span="8" class="overview-item-title">正在用</el-col>
                  <el-col :span="8" class="overview-item-title">已停用</el-col>
<!--                  <el-col :span="6" class="overview-item-title">已删除</el-col>-->
                  <el-col :span="8" class="overview-item-title">全部银行</el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="out-border">
              <div class="layout-title">用户总览</div>
              <div style="padding: 40px">
                <el-row>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{user.role}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{user.user}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{user.user}}</el-col>
                  <el-col
                    :span="6"
                    class="color-danger overview-item-value"
                  >{{user.decorate}}</el-col>
                </el-row>
                <el-row class="font-medium">
                  <el-col :span="6" class="overview-item-title">角色</el-col>
                  <el-col :span="6" class="overview-item-title">成员</el-col>
                  <el-col :span="6" class="overview-item-title">用户</el-col>
                  <el-col :span="6" class="overview-item-title">商家</el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
<!--      <div class="statistics-layout">-->
<!--        <div class="layout-title">贷款统计</div>-->
<!--        <el-row>-->
<!--          <el-col :span="4">-->
<!--            <div style="padding: 20px">-->
<!--              <div>-->
<!--                <div style="color: #909399;font-size: 14px">本月贷款总数</div>-->
<!--                <div-->
<!--                  style="color: #606266;font-size: 24px;padding: 10px 0"-->
<!--                >{{topData.vchat.monthCounts}}</div>-->
<!--                <div>-->
<!--                  <span-->
<!--                    class="color-success"-->
<!--                    style="font-size: 14px"-->
<!--                  >{{topData.vchat.addMonthOrderRate}}</span>-->
<!--                  <span style="color: #C0C4CC;font-size: 14px">同比上月</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div style="margin-top: 20px;">-->
<!--                <div style="color: #909399;font-size: 14px">本周贷款总数</div>-->
<!--                <div-->
<!--                  style="color: #606266;font-size: 24px;padding: 10px 0"-->
<!--                >{{topData.vchat.weakCounts}}</div>-->
<!--                <div>-->
<!--                  <span-->
<!--                    class="color-success"-->
<!--                    style="font-size: 14px"-->
<!--                  >{{topData.vchat.addWeakOrderRate}}</span>-->
<!--                  <span style="color: #C0C4CC;font-size: 14px">同比上周</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div style="margin-top: 20px;">-->
<!--                <div style="color: #909399;font-size: 14px">本月贷款总额</div>-->
<!--                <div-->
<!--                  style="color: #606266;font-size: 24px;padding: 10px 0"-->
<!--                >{{topData.vchat.monthMoney}}</div>-->
<!--                <div>-->
<!--                  <span-->
<!--                    class="color-success"-->
<!--                    style="font-size: 14px"-->
<!--                  >{{topData.vchat.addMonthMoneyRate}}</span>-->
<!--                  <span style="color: #C0C4CC;font-size: 14px">同比上月</span>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div style="margin-top: 20px;">-->
<!--                <div style="color: #909399;font-size: 14px">本周贷款总额</div>-->
<!--                <div-->
<!--                  style="color: #606266;font-size: 24px;padding: 10px 0"-->
<!--                >{{topData.vchat.weakMoney}}</div>-->
<!--                <div>-->
<!--                  <span-->
<!--                    class="color-success"-->
<!--                    style="font-size: 14px"-->
<!--                  >{{topData.vchat.addWeakMoneyRate}}</span>-->
<!--                  <span style="color: #C0C4CC;font-size: 14px">同比上周</span>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-col>-->
<!--          <el-col :span="20">-->
<!--            <div style="padding: 10px;border-left:1px solid #DCDFE6">-->
<!--              <el-date-picker-->
<!--                style="float: right;z-index: 1"-->
<!--                size="small"-->
<!--                v-model="orderCountDate"-->
<!--                type="daterange"-->
<!--                align="right"-->
<!--                unlink-panels-->
<!--                range-separator="至"-->
<!--                start-placeholder="开始日期"-->
<!--                end-placeholder="结束日期"-->
<!--                @change="handleDateChange"-->
<!--                :picker-options="pickerOptions"-->
<!--              ></el-date-picker>-->
<!--              <div>-->
<!--                <ve-line-->
<!--                  :data="chartData"-->
<!--                  :legend-visible="false"-->
<!--                  :loading="loading"-->
<!--                  :data-empty="dataEmpty"-->
<!--                  :settings="chartSettings"-->
<!--                ></ve-line>-->
<!--              </div>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
<!--      </div>-->
      <div style="height: 34px;"></div>
    </div>
  </div>
</template>

<script>
import { str2Date } from "@/utils/date";
import { getHomeData, getEchatData,getHomeTop,getHomeMidTop,getHomeBank,getHomeUser} from "@/api/home";
export default {
  name: "home",
  data() {
    return {
      topData: {
        bankStatistics: {
          allBank: 0,
          deleted: 0,
          stopping: 0,
          using: 0,
        },
        loanStatistics: {
          loansMoney: 0,
          todayLoans: 0,
          todayOrders: 0,
        },
        processed: {
          failOrders: 0,
          passOrders: 0,
          pendingOrders: 0,
          preendOrders: 0,
          refuseOrders: 0,
          successOrders: 0,
        },
        userStatistics: {
          admin: 0,
          member: 0,
          role: 0,
          shop: 0
        },
        vchat: {
          addMonthMoneyRate: "",
          addMonthOrderRate: "",
          addWeakMoneyRate: "",
          addWeakOrderRate: "",
          monthCounts: 0,
          monthMoney: 0,
          weakCounts: 0,
          weakMoney: 0,
        }
      },
      top:{
        toDayCount: "",
        loanMoney: "",
        toDayloanMoney: ""
      },
      midTop:{},
      bank:{},
      user:{},
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              let end = new Date();
              let start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一月",
            onClick(picker) {
              let end = new Date();
              let start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      orderCountDate: "",
      chartSettings: {
        xAxisType: "time",
        area: true,
        axisSite: { right: ["orderAmount"] },
        labelMap: { orderCount: "贷款数量", orderAmount: "贷款金额" }
      },
      chartData: {
        columns: ["date", "orderCount", "orderAmount"],
        rows: []
      },
      loading: false,
      dataEmpty: false,
    };
  },
  created() {
    this.getList()
    // this.initOrderCountDate()
    // this.getData()
    // this.getTopData()
    // this.upUser()
  },
  methods: {
    getList(){
      getHomeTop().then(res=>{
        this.top = res.data
      })
      getHomeMidTop().then(res=>{
        this.midTop = res.data
      })
      getHomeBank().then(res=>{
        this.bank = res.data
      })
      getHomeUser().then(res=>{
        this.user = res.data
      })
    },
    //得到除图形之外的数据
    getTopData() {
      getHomeData().then(res=>{
        this.topData = res.data
      })
    },
    handleDateChange() {
      this.getData()
    },
    initOrderCountDate() {
      let end = new Date();
      const start = new Date();
      start.setTime(end.getTime() - 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [start, end];
    },
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ["date", "orderCount", "orderAmount"],
          rows: []
        };
        let data = {startTime: this.orderCountDate[0].getTime(),endTime: this.orderCountDate[1].getTime()}
        getEchatData(data).then(res=>{
          this.chartData.rows = res.data
        })
        this.dataEmpty = false;
        this.loading = false;
      }, 1000);
    },
    upUser(){

    }
  }
};
</script>

<style lang="scss" scoped>
.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  position: relative;
  color: #409eff;
  font-size: 60px;
  top: 10px;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
.mine-layout {
  position: absolute;
  right: 140px;
  top: 107px;
  width: 250px;
  height: 235px;
}
.address-content {
  padding: 20px;
  font-size: 18px;
}
</style>
