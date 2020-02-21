<template>
  <div class="nav-util" @mouseleave="toggle=false">
    <ul class="clearfix">
      <li>
        <div class="tips">0</div>
        <span class="iconfont iconlingdang"></span>
      </li>
      <li>
        <div @mouseenter="toggle=true">
          <img
            class="head-photo"
            :src="userInfo.icon"
            alt="图片失焦"
          />
          <span class="user-name">{{userInfo.nickName}}</span>
        </div>
        <transition name="fade">
          <div class="util-group" :class="{active: toggle}" @mouseleave="toggle=false">
            <dl>
              <dt>{{userInfo.roleName}}</dt>
              <dt @click='goUserInfoView'>基本信息</dt>
              <dt @click="goLogin">退出</dt>
            </dl>
          </div>
        </transition>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      toggle: false,
      userInfo: {},
    };
  },
  computed: {
    
  },
  methods: {
    ...mapActions(["clearToken"]),
    goLogin: function() {
      this.clearToken().then(res => {
        if (res.code === 0) {
          this.$router.push({ path: "/login" });
        } else {
          this.$Message.error(res.msg);
        }
      });
    },
    goUserInfoView: function(){
      this.$router.push({ path: "/baseInfo" });
    }
  },
  created(){
    this.userInfo = JSON.parse(sessionStorage.getItem('user'))
  }
};
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.5s;
}
@import "../../assets/style/mixin";
@import "../../assets/style/variable";
$fc: #949494;
.nav-util {
  position: absolute;
  right: 100px;
  top: 0;
  z-index: 2;
  li {
    float: left;
    padding: 0 40px;
    color: $fc;
    position: relative;
    line-height: 70px;
    color: #fff;
    .iconfont {
      font-size: 30px;
    }
    span {
      cursor: pointer;
    }
    .head-photo {
      width: 40px;
      height: 40px;
      @include rounded(50%);
      background-color: #f7f7f7;
      margin-top: 10px;
      cursor: pointer;
    }
    .user-name {
      display: inline-block;
      position: relative;
      top: -10px;
      font-size: 16px;
      left: 10px;
    }
    .tips {
      padding: 2px 5px;
      font-size: 12px;
      background-color: #ff2d2c;
      position: absolute;
      right: 2.6em;
      top: 16px;
      line-height: 1;
      color: #fff;
      @include rounded(10px);
    }
    .util-group {
      box-sizing: border-box;
      position: absolute;
      left: 0px;
      bottom: -135px;
      width: 202px;
      height: 0;
      opacity: 0;
      z-index: 10;
      transform: translateY(-315px);
      background-color: #fff;
      padding-top: 10px;
      text-align: center;
      @include rounded(0 0 10px 10px);
      box-shadow: 0 0px 1px rgba(0, 0, 0, 0.2);
      border: 1px solid #eee;
      overflow: hidden;
      @include transition(all);
      &.active {
        z-index: 1;
        height: 150px;
        opacity: 1;
        transform: translateY(0);
      }
      dt {
        height: 43px;
        line-height: 43px;
        color: $fc;
        cursor: pointer;
        .iconfont {
          margin-right: 10px;
          font-size: 14px;
        }
        &:nth-child(1) {
          line-height: 46px;
        }
        &:last-child {
          line-height: 46px;
          border-top: 1px solid #eee;
        }
        &:hover {
          background-color: $hover-color;
          color: #fff;
        }
      }
    }
  }
}
@media (max-width: 1580px) {
  .nav-util {
    right: 100px;
  }
}
</style>
