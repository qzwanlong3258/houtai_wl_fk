<template>
  <div class="order-detail">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">订单信息</span>
      <div class="un-handle-layout">
        <div class="un-handle-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">编号：</span>
                <span class="color-success">{{detail.id}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">贷款人：</span>
                <span class="color-success">{{detail.name}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">性别：</span>
                <span class="color-success">{{detail.sex ? '男' : '女'}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">贷款金额：</span>
                <span class="color-success">{{detail.applyAmount}}元</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">期限：</span>
                <span class="color-success">{{detail.term}}期</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">身份证号：</span>
                <span class="color-success">{{detail.idCard}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">联系电话：</span>
                <span class="color-success">{{detail.phone}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">先住址：</span>
                <span class="color-success">{{detail.address}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">工作单位：</span>
                <span class="color-success">前端工程师</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">婚姻状态：</span>
                <span class="color-success">已婚</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">共借人姓名：</span>
                <span class="color-success">陈静</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">共借人电话：</span>
                <span class="color-success">{{detail.pwPhone}}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">共借人工作：</span>
                <span class="color-success">美术老师</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">装修情况：</span>
                <span class="color-success">木工</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">装修类型：</span>
                <span class="color-success">别墅</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">装修进度：</span>
                <span class="color-success">瓦工</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">家庭月收入：</span>
                <span class="color-success">10000000元</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">信用卡数量：</span>
                <span class="color-success">5</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">信用卡月还金额：</span>
                <span class="color-success">1500元</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">邀请人：</span>
                <span class="color-success">蝉嘶雪</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">面签城市：</span>
                <span class="color-success">{{detail.faceCity}}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="un-handle-item">
                <span class="font-medium">贷款银行：</span>
                <span class="color-success">{{detail.bank}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-card>
    <el-card class="layout-title" shadow="never">
      <i class="iconfont iconrenshengjieduan" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">放款阶段</span>
      <div class="stage-clonum" v-for="(item,index) in stageList" :key="index">
        <div
          class="stage-name"
        >{{item.period | getStageName}}{{item.period != 0 ? `:${item.periodName}(比率: ${item.percent}%)`:""}}
        </div>
        <div v-if="item.photoList.length">
          <el-row :gutter="20">
            <el-col :span="6" v-for="(v,k) in item.photoList" :key="k">
              <div class="un-handle-item">
                <img :src="v.photo" alt="图片失焦"/>
                <div class="phone-type color-success">{{v.potName}}</div>
              </div>
            </el-col>
          </el-row>
          <div v-if="item.periodStatus == 1" class="todo-btn">
            <el-button size="medium" @click="passLoan(item.period)">同意</el-button>
            <el-button @click="refuse(item.period)" size="medium">拒绝</el-button>
          </div>
          <div v-if="item.periodStatus == 2" class="color-success todo-status">放款成功</div>
          <div v-if="item.periodStatus == 3">
            <div class="color-danger todo-status">放款失败</div>
            <div class="refuse-reason color-danger">原因: 根据图片显示，未达到装修阶段</div>
          </div>
        </div>
        <div v-if="!item.photoList.length">
          <div class="un-handle-content">该阶段尚未开通</div>
        </div>
      </div>
    </el-card>
    <love-refuse
      v-if="refuseModel"
      :modelStatus="refuseModel"
      @closeStatus="closeRefuseStatus"
      :refuseId="orderId"
      :refusePeriod="refusePeriod"
      @refuseUpdateList="updataList"
    />
  </div>
</template>

<script>
    import LoveRefuse from "./refuse";
    import {getStageList, setLoanPass} from "@/api/loanSetting";

    export default {
        data() {
            return {
                orderId: 1,
                detail: {},
                imgUrl:
                    "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573451622870&di=76c38458e71e140fe6dc67d519e79d51&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F80a44365136f55c263ec2ffe099bb04938d5707bec82-QHgAi1_fw658",
                refuseModel: false,
                refusePeriod: "",
                stageList: []
            };
        },
        components: {
            LoveRefuse
        },
        methods: {
            changeRefuseModel() {
                this.refuseModel = !this.refuseModel;
            },
            closeRefuseStatus() {
                this.changeRefuseModel();
            },
            refuse(period) {
                this.changeRefuseModel();
                this.refusePeriod = period
            },
            updataList: function (data) {
                if (data.isUpdataList) {
                    this.$emit("pupdataList");
                }
            },
            //放款通过
            passLoan(period) {
                let data = {
                    orderId: this.orderId,
                    period,
                }
                setLoanPass(data).then(res => {
                    if (res.code == 0) {
                        this.$message.success("放款成功")
                    }
                })
            },
            //获取阶段列表
            getStageList() {
                getStageList({orderId: this.orderId}).then(res => {
                    if (res.code === 0) {
                        this.stageList = res.data.list;
                    }
                });
            }
        },
        created() {
            this.getStageList();
            this.detail = this.$store.state.user.loanDetail;
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .layout-title {
    color: #606266;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .layout-title {
    padding: 15px 20px;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    padding: 10px;

    img {
      width: 240px;
      height: 300px;
    }

    .phone-type {
      width: 240px;
      text-align: center;
      line-height: 30px;
    }
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

  .stage-clonum {
    border-bottom: 1px solid #dcdfe6;

    .stage-name {
      margin: 24px;
    }

    .todo-status {
      font-size: 20px;
      margin-bottom: 20px;
      width: 100%;
      text-align: right;
    }

    .refuse-reason {
      margin-bottom: 20px;
      width: 100%;
      text-align: right;
    }

    .todo-btn {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    }
  }
</style>
