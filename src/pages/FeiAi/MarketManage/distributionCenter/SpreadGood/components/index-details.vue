<template>
  <el-dialog
    title="商品详情"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="50%"
    top="80px"
    class="corpContact-detail">
    <div v-loading="!submitAble">
      <table class="zebra-table zebra-table-space" style="margin-bottom: -2px;">
        <thead>
        <tr>
          <td class="zebra-table-label" width="150">商品名称</td>
          <td><div class="zebra-table-scoll">{{dataForm.name ? dataForm.name : '—'}}</div></td>
          <td class="zebra-table-label" width="150">商品编号</td>
          <td><div class="zebra-table-scoll">{{dataForm.id ? dataForm.id : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">商品价格</td>
          <td><div class="zebra-table-scoll">{{dataForm.price ? dataForm.price : '—'}}</div></td>
          <td class="zebra-table-label" width="150">商品原价</td>
          <td><div class="zebra-table-scoll">{{dataForm.originalPrice ? dataForm.originalPrice : '—'}}</div></td>
        </tr>
        <tr>
          <td class="zebra-table-label" width="150">商品类型</td>
          <td><div class="zebra-table-scoll">{{dataForm.type==1?'积分商品':'推广商品' }}</div></td>
          <td class="zebra-table-label" width="150">创建时间</td>
          <td><div class="zebra-table-scoll">{{dataForm.createDate|Time}}</div></td>
        </tr>
        <tr >
          <td class="zebra-table-label" width="150">商品详情图片</td>
          <td><div class="pre-font"><img style="margin-left: 1px" :src="item" v-for="(item,index) in dataForm.goodImgList" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
          <td class="zebra-table-label" width="150">轮播图</td>
          <td><div class="pre-font"><img style="margin-left: 1px" :src="item" v-for="(item,index) in dataForm.playImgList" @click="$imageViewer" alt="" min-width="20" height="40" ></div></td>
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
  import { getCheckListDetail } from "@/api/checkSettingBohai";
  import {getGoodDetail } from "@/api/market";
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
      getData(row){
        getGoodDetail(row.uuid).then(res=>{

          this.dataForm=row
          console.log(res.data)
          let a = res.data.Details.map(res=>{
            return res.url
          })
          let b = res.data.showimg.map(res=>{
            return res.url
          })
          this.dataForm.goodImgList = a
          this.dataForm.playImgList = b
          console.log(this.dataForm)
          // this.params.Details = a.toString()
          // this.params.Showimg = b.toString()
          // console.log(this.contentList)

        })
      },
      // 查看
      init (row) {
        this.visible = true


        this.$nextTick(() => {
          // this.$refs.replyData.resetFields()
          let DOM = document.getElementsByClassName('corpContact-detail')[0]
          DOM.getElementsByClassName('el-dialog__body')[0].scrollTop = 0

        })
        this.getData(row)


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
