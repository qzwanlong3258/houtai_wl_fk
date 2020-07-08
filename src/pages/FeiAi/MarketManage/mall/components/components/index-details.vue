<template>
  <el-dialog
    title="订单"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="60%"
    top="120px"
    class="corpContact-detail">
    <div v-loading="!submitAble">
      <!--"phone": "31231",收货人手机号 <string>
    "gnamem": "Chanel 护手霜",商品名称 <string>
    "name": "而我却",收入姓名 <string>
    "count": "1",购买数量 <string>
    "addres": "天津市河西区 3213212131232",收货地址 <string>
    "state": "2",商品状态 <string>
    "uuid": "f522f405e40048d39ae583b8eb0fe0f2"订单id <string>-->

      <table class="zebra-table zebra-table-space" style="margin-bottom: -2px;">
        <thead>
        <!--        <handling-title title="申请人信息"></handling-title>-->
        <handling-title title=" 订单信息 "></handling-title>
        <tr>
          <td class="zebra-table-label" width="150">订单id</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.uuid ? dataForm.uuid : '—'}}</div>
          </td>
          <td class="zebra-table-label" width="150">状态</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.state |orderState}}</div>
          </td>
        </tr>

        <tr>
          <td class="zebra-table-label" width="150">收货人姓名</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.name ? dataForm.name : '—'}}</div>
          </td>
          <td class="zebra-table-label" width="150">购买数量</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.count ? dataForm.count : '—'}}</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">商品名称</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.gnamem ? dataForm.gnamem : '—'}}</div>
          </td>
          <td class="zebra-table-label" width="150">购买数量</td>
          <td>
            <div class="zebra-table-scoll">{{dataForm.count }}</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">收货地址</td>
          <td colspan="3">
            <div class="zebra-table-scoll">{{dataForm.addres ? dataForm.addres : '—'}}</div>
          </td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">收货人电话</td>
          <td colspan="3">
            <div class="zebra-table-scoll">{{dataForm.phone ? dataForm.phone : '—'}}</div>
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
