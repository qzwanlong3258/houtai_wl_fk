<template>
  <el-dialog
    title="用户列表"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="70%"
    height="200"
    class="corpContact-detail">
    <div class="ctrlbtn-list" >
      <el-button class="ctrlbtn-list-float" size="mini" v-for="(item, index) in btnList" :key="index" :type="item.type" @click="btnMethod(item.id)"  :icon="item.icon">{{item.name}}</el-button>
    </div>

    <div v-loading="!submitAble">
      <div class="table-container">
        <el-table ref="userList" style="width: 100%" size="mini" :data="list" v-loading="listLoading" @selection-change="handleSelectionChange" border>
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column label="日期" align="center">
            <template slot-scope="scope">{{scope.row.lastTime|time}}</template>
          </el-table-column>
          <el-table-column label="头像" align="center">
            <template slot-scope="scope"> <img v-if="scope.row.avatarUrl"  @click="$imageViewer" :src="scope.row.avatarUrl"  style="width: 40px;
  height: 40px;
  border-radius: 50%;"  ></template>
          </el-table-column>
          <el-table-column label="姓名" align="center">
            <template slot-scope="scope">{{scope.row.nickName}}</template>
          </el-table-column>
          <el-table-column label="额度"  align="center">
            <template slot-scope="scope">{{scope.row.loanMoney}}</template>
          </el-table-column>
          <el-table-column label="银行" align="center">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
<!--          <el-table-column label="操作" width="300" align="center">-->
<!--            <template slot-scope="scope">-->
<!--              <el-button v-if="scope.row.isdelete == 1" size="mini" type="text" @click="upHandle(scope.row)">启用</el-button>-->
<!--              <el-button v-if="scope.row.isdelete == 0" size="mini" type="text" @click="upHandle(scope.row)">停用</el-button>-->
<!--              <el-button size="mini" type="text" @click="showModelEvent(scope.row)">编辑</el-button>-->
<!--              <el-button size="mini" type="text" @click="handleDelete(scope.row)">删除</el-button>-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>
      </div>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes,prev, pager, next,jumper"
          :page-size="listQuery.size"
          :page-sizes="[5,10,15]"
          :current-page.sync="listQuery.page"
          :total="total"
        ></el-pagination>
      </div>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false" :loading="!submitAble">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
  // import { getFaceListDetail } from "@/api/bohaifacesign";
  import { getListUser } from "@/api/bank";
  export default {
    components: {},
    data () {
      return {
        list: [],
        listQuery: {
          page: 1,
          size: 5,
        },
        total: null,
        listLoading: false,


        visible: false, // 显示弹窗控件，默认false不显示，true显示
        submitAble: true,
        multipleSelection:[],
        btnList: [
          {id: 'print', name: '打印', type: 'primary', icon: 'el-icon-printer'}
        ],
      }
    },
    filters:{
      time(val){
        if(!val){
          return ''
        }
        var time = new Date(val);

        function timeAdd0(str) {
          if (str < 10) {
            str = '0' + str;
          }
          return str
        }
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours() - 1;
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
      }
    },
    methods: {
      btnMethod (btn) {
        switch (btn) {
          // case 'add' :
          //   this.$refs.addOrUpdate.init()
          //   break
          case 'print' :
            window.open(this.$http.adornUrl(`/api-spms/spms/corpContact/print/${this.$http.appendUrlAccessToken()}`))
            break
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 查看
      init (e) {
        this.visible = true
        this.submitAble =true


        this.$nextTick(() => {
          // this.$refs.replyData.resetFields()
          let DOM = document.getElementsByClassName('corpContact-detail')[0]
          DOM.getElementsByClassName('el-dialog__body')[0].scrollTop = 0
          this.listQuery.id=e
          this.getData()
        })


      },
      getData(e){

        getListUser(this.listQuery).then(res=>{
          this.total =Number(res.data.count) ;
          this.list = res.data.list;
          // this.submitAble =true
        })

      },
      handleSizeChange(val) {
        this.listQuery.page = 1;
        this.listQuery.size = val;
        this.getData();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getData();
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
