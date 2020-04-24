<template>
  <el-dialog
    title="渤海银行贷款预审"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="80%"
    top="50px"
    class="corpContact-detail">
    <div v-loading="!submitAble">
      <table class="zebra-table zebra-table-space" style="margin-bottom: -2px;">
        <thead>
        <handling-title title="申请人信息"></handling-title>

        <tr>
          <td class="zebra-table-label" width="150">姓名</td>
          <td><div class="zebra-table-scoll">{{dataForm.name ? dataForm.name : '—'}}</div></td>
          <td class="zebra-table-label" width="150">编号</td>
          <td><div class="zebra-table-scoll">{{dataForm.id ? dataForm.name : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">身份证号码</td>
          <td><div class="zebra-table-scoll">{{dataForm.certificateCode ? dataForm.certificateCode : '—'}}</div></td>
          <td class="zebra-table-label" width="150">婚姻状态</td>
          <td><div class="zebra-table-scoll">{{dataForm.marriageState ? dataForm.marriageState : '—'}}</div></td>
        </tr>
       <handling-title title=" 贷款信息 "></handling-title>
        <tr>
          <td class="zebra-table-label" width="150">贷款金额</td>
          <td><div class="zebra-table-scoll">{{dataForm.loanAmount ? dataForm.loanAmount : '—'}}</div></td>
          <td class="zebra-table-label" width="150">贷款年限</td>
          <td><div class="zebra-table-scoll">{{dataForm.loanPeriod ? dataForm.loanPeriod : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">还款方式</td>
          <td><div class="zebra-table-scoll">{{dataForm.refundType ? dataForm.refundType : '—'}}</div></td>
          <td class="zebra-table-label" width="150">贷款类型</td>
          <td><div class="zebra-table-scoll">{{dataForm.loanType ? dataForm.loanType : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">联系电话</td>
          <td colspan="3"><div class="zebra-table-scoll">{{dataForm.phone ? dataForm.phone : '—'}}</div></td>
        </tr>
       <handling-title title="  信息采集 "></handling-title>
        <tr>
          <td class="zebra-table-label" width="150">身份证正面照片</td>
          <td><div class="pre-font"> <img :src="dataForm.cardBeforeImg" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">身份证反面照片</td>
          <td><div class="pre-font"><img :src="dataForm.cardAfterImg" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">户口本首页</td>
          <td colspan="3"><div class="pre-font"><img :src="dataForm.bookletIndexImg" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
        </tr>
        <tr>

          <td class="zebra-table-label" width="150">户口本本人页</td>
          <td><div class="pre-font"><img :src="dataForm.bookletThisImg" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">户口本户主页</td>
          <td><div class="pre-font"><img :src="dataForm.bookletMainImg" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">身份证正面照片</td>
          <td><div class="pre-font"> <img :src="dataForm.incomeProof" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">身份证反面照片</td>
          <td><div class="pre-font"><img :src="dataForm.cardAfterImg" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">工作性质</td>
          <td colspan="3"><div class="zebra-table-scoll">{{dataForm.workNature ? dataForm.workNature : '—'}}</div></td>
        </tr>
        <tr v-if="dataForm.workNature =='企业职员'">
          <td class="zebra-table-label" width="150">收入证明</td>
          <td><div class="pre-font"> <img :src="dataForm.incomeProof" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">工资流水</td>
          <td><div class="pre-font"><img  :src="item.img" v-for="(item,index) in dataForm.thisRunningWater" @click="$imageViewer" alt="" width="40" height="40" ></div></td>
        </tr>
        <tr v-if="dataForm.workNature =='法人'">
          <td class="zebra-table-label" width="150">营业执照</td>
          <td><div class="pre-font"> <img :src="dataForm.incomeProof" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">工资流水</td>
          <td><div class="pre-font"><img  :src="item.img" v-for="(item,index) in dataForm.thisRunningWater" @click="$imageViewer" alt="" width="40" height="40" ></div></td>
        </tr>
        <handling-title title="  配偶信息采集 "></handling-title>
        <tr>

          <td class="zebra-table-label" width="150">配偶姓名</td>
          <td><div class="zebra-table-scoll">{{dataForm.marriageName ? dataForm.marriageName : '—'}}</div></td>
          <td class="zebra-table-label" width="150">配偶身份证号码</td>
          <td><div class="zebra-table-scoll">{{dataForm.marriageCertificateCode ? dataForm.marriageCertificateCode : '—'}}</div></td>
        </tr>
        <tr>

          <td class="zebra-table-label" width="150">结婚证</td>
          <td><div class="pre-font"><img :src="dataForm.marriageCertificateType" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">配偶工作性质</td>
          <td><div class="zebra-table-scoll">{{dataForm.marriageWorkNature ? dataForm.marriageWorkNature : '—'}}</div></td>
        </tr>

        <tr v-if="dataForm.marriageWorkNature =='企业职员'">
          <td class="zebra-table-label" width="150">收入证明</td>
          <td><div class="pre-font"> <img :src="dataForm.marriageIncomeProof" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">工资流水</td>
          <td><div class="pre-font"><img  :src="item.img" v-for="(item,index) in dataForm.spouseRunningWater" @click="$imageViewer" alt="" width="40" height="40" ></div></td>
        </tr>
        <tr v-if="dataForm.marriageWorkNature =='法人'">
          <td class="zebra-table-label" width="150">营业执照</td>
          <td><div class="pre-font"> <img :src="dataForm.marriageIncomeProof" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">工资流水</td>
          <td><div class="pre-font"><img :src="item.img" v-for="(item,index) in dataForm.spouseRunningWater" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">离婚证</td>
          <td colspan="3"><div class="pre-font"> <img :src="dataForm.divorce"  @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">预约时间</td>
          <td colspan="3"><div class="zebra-table-scoll">{{dataForm.faceTime ? dataForm.faceTime : '—'}}</div></td>
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
  import { getFaceListDetail } from "@/api/bohaifacesign";
  export default {
    components: {},
    data () {
      return {
        dataForm: {
        },
        thisRunningWater:[],
        spouseRunningWater:[],

        visible: false, // 显示弹窗控件，默认false不显示，true显示
        submitAble: true
      }
    },
    methods: {
      // 查看
      init (uuid,state) {
        this.visible = true


        this.$nextTick(() => {
          // this.$refs.replyData.resetFields()
          let DOM = document.getElementsByClassName('corpContact-detail')[0]
          DOM.getElementsByClassName('el-dialog__body')[0].scrollTop = 0
        })
        let e ={}
        e.uuid=uuid
        e.state=state
        getFaceListDetail(e).then(res => {
          if (res.code === 0) {
            this.dataForm = res.data.list[0];
            let oneArry =[];
            let twoArry =[]

            this.thisRunningWater=res.data.wage.map(item=>{
              if( item.type ==1){
                oneArry.push({img:item.runningWaterImg})
              } else {
                twoArry.push({img:item.runningWaterImg})

              }
            })
            this.thisRunningWater = oneArry
            this.spouseRunningWater = twoArry
          }
        });
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
    word-break:break-all;
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
    white-space:pre-wrap;
    white-space:-moz-pre-wrap;
    white-space:-o-pre-wrap;
    word-wrap:break-word;
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
