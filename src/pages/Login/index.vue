<template>
  <div class="login">
    <div class="back-gorund-login">
      <div class="content-box">
        <Welcome class="welcome-compenent" />
        <Login />
      </div>
    </div>
  </div>
</template>

<script>
import "@/utils/pictureGround.js";
import Login from "@/components/Login/login";
import Welcome from "@/components/Login/welcome";

export default {
  components: {
    Login,
    Welcome
  },
  data: () => {
    return {};
  },
  methods: {
    initAniCanvas() {
      window.particleground(this.$el.querySelector(".back-gorund-login"), {
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
@import "src/assets/style/variable.scss";
.login {
  position: absolute;
  height: 100%;
  width: 100%;
  .back-gorund-login {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: $theme-color;
    .content-box {
      position: absolute;
      width: 800px;
      height: 220px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }
}

.login-module {
  position: absolute;
  z-index: 1;
}
</style>
