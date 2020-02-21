<template>
  <div>
    <header class="header-bg">
      <div class="logo">
        <a href="javascript:void(0);"></a>
        非客
        <span class="sub">&nbsp;|&nbsp;管理系统</span>
      </div>
      <nav-util></nav-util>
    </header>
    <div class="body-box">
      <Layout class="layout-style" />
      <div class="router-view">
        <Breadcrumb class="app-container" />
        <router-view class="app-container"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import NavUtil from "../components/Navigation/NavUtil";
import Layout from "@/components/Layout/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import "@/utils/pictureGround.js";
export default {
  components: {
    Layout,
    NavUtil,
    Breadcrumb
  },
  methods: {
    initAniCanvas() {
      window.particleground(this.$el.querySelector(".header-bg"), {
        dotColor: "#0e7085",
        lineColor: "#0e7085",
        parallaxMultiplier: 100,
        lineWidth: 0.1,
        height: "100%",
        width: "100%",
        particleRadius: 2
      });
    }
  },
  mounted() {
    this.initAniCanvas();
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/style/mixin.scss";
@import "../assets/style/variable.scss";
header {
  height: 59px;
  line-height: 59px;
  padding: 0 520px;
  position: relative;
  border-bottom: 1px solid #e2e2e2;
  background: $theme-color;
  .logo {
    cursor: pointer;
    position: absolute;
    font-size: 30px;
    font-weight: 700;
    left: 70px;
    color: #fff;
    z-index: 99;
    top: 0;
    a {
      display: inline-block;
      width: 50px;
      height: 50px;
      background: url("../assets/image/LOGO.png") no-repeat;
      background-size: cover;
      vertical-align: middle;
    }
    span {
      font-weight: normal;
      font-size: 16px;
      position: relative;
      top: -2px;
    }
  }
}
@media (max-width: 1580px) {
  header {
    padding: 0 320px;
    .logo {
      left: 100px;
    }
  }
}
.body-box {
  display: flex;
  .layout-style {
    position: absolute;
    @include caleHeight();
    width: 180px;
    background: $theme-color;
    margin-top:-1px;
  }
  .router-view {
    @include caleWidth();
    @include clearfix;
    margin-left: 180px;
    position: relative;
    .app-container {
      width: 96%;
      margin: 0 2%;
    }
  }
}
</style>
