<template>
  <el-dialog
    title="贷款预审"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="60%"
    top="120px"
    class="corpContact-detail">
    <div v-loading="!submitAble">
      <!--      "lastTime": 1588090860000,创建时间 <number>-->
      <!--      "address": "北京市 市辖区 西城区 kjhgfdsa",地址 <string>-->
      <!--      "loanerName": "hgf",贷款人姓名 <string>-->
      <!--      "idCard": "87654321`",身份证号 <string>-->
      <!--      "latitude": "22.686206",纬度 <string>-->
      <!--      "userid": "23",订单申请人id <string>-->
      <!--      "marryStatus": "0",婚姻状态 <string>-->
      <!--      "loanMoney": "4321654",贷款金额 用户要多少钱 <string>-->
      <!--      "cityName": "哈尔滨",城市名称 <string>-->
      <!--      "phone": "87654321",手机号 <string>-->
      <!--      "workunit": "0",单位性质 <string>-->
      <!--      "familyMonthIncome": "65432",家庭月收入 <string>-->
      <!--      "term": "12",还款期数 <string>-->
      <!--      "id": 15,订单id <number>-->
      <!--      "state": "1",状态 1待预审 2预审通过（待面签）3预审没过 4面签通过 5面签未通过 <string>-->
      <!--      "did": "https://wx.qlogo.cn/mmopen/vi_32/gwVXwVRiczoXicb4CbtQprTPibB1ekaMibT0cZ6Lz1MiccWaXuBeQdwrJsMPRA2NKlpYOMrnEmTy16y3PsPnrbPo8SQ/132",装修公司id <string>-->
      <!--      "cid": "1",城市id <string>-->
      <!--      "longitude": "114.230672"经度 <string>-->

      <table class="zebra-table zebra-table-space" style="margin-bottom: -2px;">
        <thead>
        <!--        <handling-title title="申请人信息"></handling-title>-->
        <handling-title title=" 贷款信息 "></handling-title>

        <tr>
          <td class="zebra-table-label" width="150">贷款人姓名</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.loanerName ? dataForm.loanerName : '—'}}</div>
          </td>
          <td class="zebra-table-label" width="150">订单id</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.id ? dataForm.id : '—'}}</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">身份证号码</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.idCard ? dataForm.idCard : '—'}}</div>
          </td>
          <td class="zebra-table-label" width="150">婚姻状态</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.marryStatus|marry }}</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">工作单位性质</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.workunit|workunit}}</div>
          </td>
          <td class="zebra-table-label" width="150">期数</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.term }}期</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">申请金额</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.loanMoney}}元</div>
          </td>
          <td class="zebra-table-label" width="150">家庭月收入</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.familyMonthIncome }}元</div>
          </td>
        </tr>
<!--        <tr>-->
<!--          <td class="zebra-table-label" width="150">城市</td>-->
<!--          <td>-->
<!--            <div class="zebra-table-scoll">{{dataForm.cityName ? dataForm.cityName : '—'}}</div>-->
<!--          </td>-->
<!--          <td class="zebra-table-label" width="150">地址</td>-->
<!--          <td>-->
<!--            <div class="zebra-table-scoll">{{dataForm.address ? dataForm.address : '—'}}</div>-->
<!--          </td>-->
<!--        </tr>-->
        <tr>
          <td class="zebra-table-label" width="150">创建时间</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.lastTime|Time}}</div>
          </td>
          <td class="zebra-table-label" width="150">状态</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.state|statusName}}</div>
          </td>
        </tr>

        <tr>
          <td class="zebra-table-label" width="150">联系电话</td>
          <td colspan="3">
            <div class="zebra-table-scoll">{{dataForm.phone ? dataForm.phone : '—'}}</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">地址</td>
          <td colspan="3">
            <div class="zebra-table-scoll">{{dataForm.address ? dataForm.address : '—'}}</div>
          </td>
        </tr>


        </thead>
      </table>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" :loading="!submitAble">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {getCheckListDetail} from '@/api/checkSettingBohai'

  export default {
    components: {},
    data () {
      return {
        dataForm: {},
        // thisRunningWater:[],
        // spouseRunningWater:[],
        visible: false, // 显示弹窗控件，默认false不显示，true显示
        submitAble: true
      }
    },
    methods: {
      // 查看
      init (e) {
        this.visible = true

        this.$nextTick(() => {
          // this.$refs.replyData.resetFields()
          let DOM = document.getElementsByClassName('corpContact-detail')[0]
          DOM.getElementsByClassName('el-dialog__body')[0].scrollTop = 0
        })
        this.dataForm = e
        // let e ={}
        // e.uuid=uuid
        // e.state=state
        // getCheckListDetail(e).then(res => {
        //   if (res.code === 0) {
        //     this.dataForm = res.data.list[0];
        //     let oneArry =[];
        //     let twoArry =[]
        //
        //     this.thisRunningWater=res.data.wage.map(item=>{
        //       if( item.type ==1){
        //         oneArry.push({img:item.runningWaterImg})
        //       } else {
        //         twoArry.push({img:item.runningWaterImg})
        //
        //       }
        //     })
        //     this.thisRunningWater = oneArry
        //     this.spouseRunningWater = twoArry
        //   }
        // });
      },

    }
  }
</script>
<style lang="scss" scoped>
  .zebra-table {
    width: 100%;
    margin-bottom: 20px;
    font-size: 12px;
    border-spacing: 0;
    table-layout: fixed;
    border-top: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
  }

  .zebra-table tr td {
    // padding: 4px 12px;
    border-right: 1px solid #eeeeee;
    border-bottom: 1px solid #eeeeee;
    word-break: break-all;
  }

  .zebra-table.zebra-table-space {
    border-spacing: 2px;
    border: none;
  }

  .zebra-table.zebra-table-space tr td {
    border-top: 1px solid #eeeeee;
    border-left: 1px solid #eeeeee;
  }

  .zebra-table-scoll {
    padding: 4px 12px;
    height: 34px;
    line-height: 34px;
    overflow-y: auto;
  }

  .zebra-table .zebra-table-label {
    // background: #f6f6f6;
    padding: 4px 12px;
    text-align: right;
    width: 150px;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .pre-font {
    padding: 4px 12px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    margin: 0;
    word-break: break-all;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .incident-handling-title {
    padding: 10px 0px;
  }

  .upload-handle-form {
    line-height: 0px;
  }
</style>
<style>
  .corpContact-detail .el-dialog__body {
    max-height: 60vh;
    /*height: 460px;*/
    overflow-y: auto;
    padding: 20px 50px;
  }

  .corpContact-detail .el-dialog__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    min-Height: 22px;
  }

  .corpContact-detail .dialog__footer {
    min-Height: 22px;
  }
</style>
