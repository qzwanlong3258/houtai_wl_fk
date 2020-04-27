<template>
  <el-dialog
    title="装企审核"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="48%"
    top="180px"
    class="corpContact-detail">
    <div v-loading="!submitAble">
      <table class="zebra-table zebra-table-space" style="margin-bottom: -2px;">
        <thead>
        <tr>
          <td class="zebra-table-label" width="150">贷款人</td>
          <td><div class="zebra-table-scoll">{{dataForm.userName ? dataForm.userName : '—'}}</div></td>
          <td class="zebra-table-label" width="150">城市</td>
          <td><div class="zebra-table-scoll">{{dataForm.cityName ? dataForm.cityName : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">公司名称</td>
          <td><div class="zebra-table-scoll">{{dataForm.name ? dataForm.name : '—'}}</div></td>
          <td class="zebra-table-label" width="150">营业执照编号</td>
          <td><div class="zebra-table-scoll">{{dataForm.businesslicenseCode ? dataForm.businesslicenseCode : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">手机号</td>
          <td><div class="zebra-table-scoll">{{dataForm.phone ? dataForm.phone : '—'}}</div></td>
          <td class="zebra-table-label" width="150">法人</td>
          <td><div class="zebra-table-scoll">{{dataForm.juridicalPerson ? dataForm.juridicalPerson : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">注册资金</td>
          <td><div class="zebra-table-scoll">{{dataForm.createNumber ? dataForm.createNumber : '—'}}</div></td>
          <td class="zebra-table-label" width="150">公司地址</td>
          <td><div class="zebra-table-scoll">{{dataForm.address ? dataForm.address : '—'}}</div></td>
        </tr>


        <tr>
          <td class="zebra-table-label" width="150">营业执照图片</td>
          <td><div class="pre-font"> <img :src="dataForm.businesslicense" @click="$imageViewer" alt="" width="40" height="40" ></div></td>
          <td class="zebra-table-label" width="150">店铺照片</td>
          <td><div class="pre-font"><img :src="dataForm.storePhotos" @click="$imageViewer" alt="" width="40" height="40" ></div></td>
        </tr>

<!--        <tr>-->

<!--          <td class="zebra-table-label" width="150">营业执照图片</td>-->
<!--          <td><div class="pre-font"><img :src="dataForm.businessImg" @click="$imageViewer" alt="" width="40" height="40" ></div></td>-->
<!--          <td class="zebra-table-label" width="150">案例</td>-->
<!--          <td><div class="pre-font"><img :src="dataForm.caseShowImg" @click="$imageViewer" alt="" width="40" height="40" ></div></td>-->
<!--        </tr>-->



        </thead>
      </table>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" :loading="!submitAble">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // import { getFaceListDetail } from "@/api/bohaifacesign";
  export default {
    components: {},
    data () {
      return {
        dataForm: {
        },


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
        this.dataForm=e

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
