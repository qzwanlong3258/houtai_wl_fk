<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="status"
      @beforeClose="beforeClose"
      :width="830"
      :height="480"
    >
      <div class="title-tip">设置角色</div>
      <div class="change-ps-input">
        <span class="role-tip">角色名称：</span>
        <el-input class="input-box" type="text" v-model="params.role" placeholder="请输入角色名称" />
      </div>
      <div class="setting-perssion">
        <div class="role-tip">权限设置：</div>
        <div class="content-box">
          <div class="cloumn-content" v-for="(types,num) in permissionList" :key="num">
            <div class="content-title">{{types.name}}：</div>
            <el-checkbox-group class="check-box" v-model="params.permission">
              <el-checkbox
                class="box-detail"
                v-for="(item) in types.children"
                :label="item.id"
                :key="item.id"
              >{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
<!--      <el-button-->
<!--        @click="saveSetting"-->
<!--        style="margin-left: 300px;position: fixed;bottom: 30px;"-->
<!--        type="info"-->
<!--        class="dialog-btn"-->
<!--      >确定</el-button>-->
      <el-button
        @click="saveSetting"
        class="test-btn"
        type="primary"
        size="mini"
      >确定</el-button>
    </love-dialog>
  </div>
</template>

<script>
import LoveDialog from "@/components/NoLoveDialog";
import { getPermission, setRoleAdd, setRoleExit } from "@/api/baseSetting";
export default {
  components: {
    LoveDialog
  },
  props: {
    modelStatus: {
      type: Boolean
    },
    contentList: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      status: true,
      permissionList: [],
      params: {
        id: "",
        permission: [],
        role: ""
      }
    };
  },
  methods: {
    //获取角色权限
    getPerList: function() {
      getPermission().then(res => {
        if (res.code === 0) {
          console.log(res)
          this.permissionList = res.data.permission;
        }
      });
    },
    beforeClose: function() {
      this.$emit("closeStatus");
    },
     //根据子集取父级id
      getParentId: function({parentList=[],childrenList=[]}){
        let tempList = childrenList
         childrenList.forEach(item=>{
          parentList.forEach(value=>{
            value.children.length && value.children.forEach(child=>{
              if(child.id === item){
                tempList.push(value.id)
              }
            })
          })
        })
        return Array.from(new Set(tempList))
      },
      saveSetting () {
      console.log(this.permissionList)
        console.log(this.params.permission)
        const choosePermission =  this.getParentId({
          parentList: this.permissionList,
          childrenList: this.params.permission
        })
        console.log(choosePermission)
        if (this.params.id) {
          //编辑
          setRoleExit({
            id: this.params.id,
            role: this.params.role,
            permission: choosePermission.join(',')
          }).then(res => {
            if (res.code === 0) {
              this.$message.success('编辑成功')
              this.$emit('updateList')
              this.status = false
            }
          })
        } else {
          //添加
          setRoleAdd({
            role: this.params.role,
            permission: choosePermission.join(',')
          }).then(res => {
            if (res.code === 0) {
              this.$message.success('添加成功')
              this.$emit('updateList')
              this.status = false
            }
          })
        }
      },
  },
  created() {
    this.params = this.contentList
    this.status = this.modelStatus;
    this.getPerList();
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
  .test-btn{
    /*width: 50px;*/
    height: 55px;
    border-radius: 50%;
    text-align: center;
    position: fixed;
    right: 20px;
    top: 45%;

  }
.change-ps-input {
  width: 90%;
  height: 48px;
  margin: 10px 5%;
  display: flex;
  span {
    line-height: 59px;
  }
  .input-box {
    width: 196px;
    margin-top: 10px;
  }
}
.setting-perssion {
  width: 90%;
  margin: 10px 5%;
  .content-box {
    margin-bottom: 20px;
    transition: all, 0.6s;
    .cloumn-content {
      display: flex;
      display: -webkit-flex;
      margin-top: 20px;
      .content-title {
        margin-left: 32px;
      }
      .check-box {
        margin-right: 84px;
        .box-detail {
          margin-left: 64px;
        }
      }
    }
  }
}
</style>
