<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="500"
      :height="360"
    >
      <div class="title-tip">
        通过
      </div>
<!--      <div class="setting-perssion">-->
<!--        <div class="role-tip" style="margin-left: 30px">产品类型：</div>-->
<!--        <div class="content-box">-->
<!--          <el-select v-model="typeId" size="small" placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in produceType"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </div>-->
<!--      </div>-->
      <div class="setting-perssion">
        <div class="role-tip" style="margin-left: 30px">选择银行：</div>
        <div class="content-box">
          <el-select v-model="bankId" size="small" placeholder="请选择">
            <el-option
              v-for="item in bankSelect"
              :key="item.id"
              :label="item.name+'('+item.address+')'"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="setting-perssion">
        <div class="role-tip" style="margin-left: 30px">指派面签：</div>
        <div class="content-box">
          <el-select v-model="signAdminId" size="small" placeholder="请选择">
            <el-option
              v-for="item in faceSelect"
              :key="item.id"
              :label="item.nickName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </div>
<!--       <div v-if="typeId == 2" class="setting-perssion">-->
<!--        <div class="role-tip" style="margin-left: 30px">指派拍照：</div>-->
<!--        <div class="content-box">-->
<!--          <el-select v-model="takePhoneId" size="small" placeholder="请选择">-->
<!--            <el-option-->
<!--              v-for="item in faceSelect"-->
<!--              :key="item.id"-->
<!--              :label="item.name"-->
<!--              :value="item.id"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </div>-->
<!--      </div>-->
      <el-button
        @click="getList"
        style="margin-left: 140px;position: fixed;bottom: 30px;"
        type="info"
        class="dialog-btn"
      >确定</el-button>
    </love-dialog>
  </div>
</template>
<script>
import LoveDialog from "@/components/NoLoveDialog";
import { getPassList ,passFace,passBank,getface} from "@/api/checkSetting";
// import { getBankList, getAdminList } from "@/api/baseSetting";
import { getBankList } from "@/api/bank";

export default {
  components: {
    LoveDialog
  },
  props: {
    modelStatus: {
      type: Boolean
    },
    agreeId: {
      type: Number
    }

  },
  data() {
    return {
      produceType: [
        {
          id: 1,
          name: '银行产品'
        },
        {
          id: 2,
          name: '合作产品'
        }
      ],
      bankSelect: [],
      faceSelect: [],
      bankId: "",
      typeId: 1,
      signAdminId: "",
      takePhoneId: "",
      status: true,
      isUpdataList: false,
    };
  },
  methods: {
    beforeClose: function() {
      this.status = !this.status
    },
     getList(){
       passFace({
        orderid: this.agreeId,
        visaid: this.signAdminId
      })
       passBank({
        id: this.agreeId,
        bankid:this.bankId
      })
      let param = {
        id: this.agreeId,
        state: 2,
      }
      getPassList(param).then(res=>{
        if(res.code === 0){
          this.$message.success('成功通过')
          this.$emit("agreenUpdateList",{isUpdataList: !this.isUpdataList});
          this.status = !this.status
        }
      })
    }
  },
  created() {

    getBankList({ page: 1, size: 100 ,name:''}).then(res => {
      if (res.code === 0) {
        // res.data.list&&res.data.list.map(item => {
        //   item.bankAddress = JSON.parse(item.bankAddress);
        // });
        let e=[]
        res.data.list.map(item=>{
          if(item.isdelete==0){
            e.push(item)
          }
        })
        this.bankSelect = e;
        console.log(this.bankSelect)
        console.log(e)
      }
    });
    this.status = this.modelStatus
    getface().then(res=>{
      if(res.code === 0){
        this.faceSelect = res.data.list
      }
    })
  }
};
</script>
<style lang="scss" scoped>
.setting-perssion {
  width: 90%;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  .role-tip {
    margin-top: 20px;
  }
  .content-box {
    margin-top: 16px;
    width: 195px;
  }
}
</style>
