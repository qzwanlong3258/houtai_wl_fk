<template>
  <div class="app-container">
    <el-card class="layout-title" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">小程序用户信息</span>
    </el-card>
<!--    <el-card class="filter-container" shadow="never">-->
<!--      <div>-->
<!--        <i class="el-icon-search"></i>-->
<!--        <span>筛选搜索</span>-->
<!--        <el-button style="float: right" @click="getList" type="primary" size="small">查询结果</el-button>-->
<!--        <el-button-->
<!--          style="float: right;margin-right: 15px"-->
<!--          @click="handleResetSearch()"-->
<!--          size="small"-->
<!--        >重置</el-button>-->
<!--      </div>-->
<!--      <div style="margin-top: 20px">-->
<!--        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">-->
<!--          <el-form-item label="姓名：">-->
<!--            <el-input style="width: 203px" v-model="listQuery.realname" placeholder="姓名"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="邀请人：">-->
<!--            <el-input style="width: 203px" v-model="listQuery.invitor" placeholder="邀请人"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="性别">-->
<!--            <el-select v-model="listQuery.sex" placeholder="请选择">-->
<!--              <el-option-->
<!--                v-for="item in options"-->
<!--                :key="item.value"-->
<!--                :label="item.label"-->
<!--                :value="item.value"-->
<!--              ></el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </el-card>-->
    <div class="table-container">
<!--      "password": "123123",密码 <string>-->
<!--      "role": "管理员",角色列表 <string>-->
<!--      "create_time": 1587920548000,创建时间 <number>-->
<!--      "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/gwVXwVRiczoXicb4CbtQprTPibB1ekaMibT0cZ6Lz1MiccWaXuBeQdwrJsMPRA2NKlpYOMrnEmTy16y3PsPnrbPo8SQ/132",头像 <string>-->
<!--      "phone": "123",手机号 <string>-->
<!--      "nickName": "测试用11",昵称 <string>-->
<!--      "integral": "0",积分 <string>-->
<!--      "id": 15,用户id <number>-->
<!--      "applyName": "可乐加冰",邀请人昵称 <string>-->
<!--      "email": "email123",邮箱 <string>-->
<!--      "username": "admin1"登录名 <string>-->
      <el-table ref="appletUser" style="width: 100%" :data="list" v-loading="listLoading" border>
        <el-table-column label="编号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="微信头像" align="center">
          <template slot-scope="scope">
            <img class="avatar-box" :src="scope.row.avatarUrl" />
          </template>
        </el-table-column>
        <el-table-column label="微信名" align="center">
          <template slot-scope="scope">{{scope.row.nickName}}</template>
        </el-table-column>
        <el-table-column label="积分" align="center">
          <template slot-scope="scope">{{scope.row.integral}}</template>
        </el-table-column>
              <el-table-column label="赠送积分" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="agree(scope.row)">赠送</el-button>
                </template>
              </el-table-column>
<!--         <el-table-column label="性别" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.sex | sexFilter}}</template>-->
<!--        </el-table-column>-->
<!--        <el-table-column label="住址" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.address}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="联系方式" align="center">
          <template slot-scope="scope">{{scope.row.phone}}</template>
        </el-table-column>
<!--        <el-table-column label="贷款次数" align="center">-->
<!--          <template slot-scope="scope">{{scope.row.loanCount}}</template>-->
<!--        </el-table-column>-->
        <el-table-column label="邀请人" align="center">
          <template slot-scope="scope">{{scope.row.applyName}}</template>
        </el-table-column>
      </el-table>
    </div>
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
    <love-agree v-if="agreeModel" :modelStatus="agreeModel" @closeStatus="closeAgressStatus" :agreeId="agreeId" @agreenUpdateList="getList"/>
  </div>
</template>
<script>

import { getAdminList} from "@/api/baseSetting";
import LoveAgree from "./components/agree";
export default {
  components:{
    LoveAgree
  },
  name: "appletUser",
  data() {
    return {
      agreeId: 0,
      list: [],
      total: 0,
      agreeModel:false,
      listLoading: false,
      listQuery: {
        realname: '',
        invitor: '',
        sex: '',
        pageNum: 1,
        pageSize: 5
      },
      options: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ]
    };
  },

  created() {
    this.getList()
  },
  methods: {
    closeAgressStatus() {
      this.changeAgreeModel();
      this.agreeId = "";
    },
    changeAgreeModel() {
      this.agreeModel = !this.agreeModel;
    },
    agree(row) {
      this.changeAgreeModel();
      this.agreeId = row.id;
      },
    getList(){
      getAdminList(this.listQuery).then(res=>{
        if(res.code === 0) {
          this.total =Number(res.data.count)
          this.list = res.data.list
        }
      })
      this.agreeModel=false
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
    handleResetSearch(){
      this.listQuery = {
        realname: '',
        invitor: '',
        sex: 0,
        pageNum: 1,
        pageSize: 5
      }
      this.getList()
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  margin-bottom: 24px;
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
.avatar-box {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
</style>


