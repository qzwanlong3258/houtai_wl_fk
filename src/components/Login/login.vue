<template>
  <div class="login-box">
    <el-row>
      <el-col :span="24">
        <el-input id="name" v-model="name" placeholder="请输入帐号">
          <template slot="prepend">帐号</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-input id="password" v-model="password" type="password" placeholder="请输入密码">
          <template slot="prepend">密码</template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button id="login" @click="checkUserLogin" style="width:100%" type="primary">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { checkNull } from "@/utils/check";
import { Loading } from "element-ui";
import { setCookie } from "@/utils/cookie";
import { postUserInfo } from "@/api/userInfo";
export default {
  data() {
    return {
      name: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["login", "getRouter"]),

    checkUserLogin: function() {
      if (checkNull(this.name, "账号") && checkNull(this.password, "密码")) {
        let data = {
          name: this.name,
          password: this.password
        };
        this.login(data).then(res => {
          if (res.code === 0) {
            postUserInfo().then(res=>{
              // console.log(1)
            })
            this.getRouter({ id: Number(res.data.role[0])  }).then( res => {
              if (res.code === 0) {
                console.log(this.$router.options.routes)

                // setCookie('token',)
                this.$router.push({ path: "/feiai" });
              }
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.login-box {
  width: 400px;
  height: 220px;
  background: rgba(225, 225, 225, 0.3);
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-content: center;
}
</style>
