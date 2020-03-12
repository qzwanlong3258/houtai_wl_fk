<template>
  <div class="weclome-box">
      <div class="box-top">欢迎来到 <i class="iconfont iconyoujiantou1"></i></div>
      <div class="box-bottom">非客有家后台管理系统</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { checkNull } from '@/utils/check'
import { Loading } from 'element-ui'
export default {
  data() {
      return {

      }
  },
  methods:{

  },
}
</script>

<style lang="scss" scoped>

.weclome-box{
  width: 400px;
  height: 220px;
  background: rgba(0,0,0,.3);
  align-content: center;
  color: #fff;
  font-size: 17px;
  text-align: center;
  .box-top {
      height: 36px;
      border-bottom: 2px solid #fff;
      width: 200px;
      line-height: 36px;
      margin: 0 auto;
      margin-top: 68px;
      i {
        display: inline-block;
        font-size: 24px;
        margin-left: 16px;
      }
  }
  .box-bottom {
    height: 36px;
    line-height: 36px;
  }
}
</style>
