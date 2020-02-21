<template>
  <div>
    <div class="app-wrapper" :class="classObj">
      <sidebar class="sidebar-container"></sidebar>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
export default {
  name: "layout",
  components: {
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
   
  },
  mounted() {
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/assets/style/mixin.scss";
@import "src/assets/style/variable.scss";
.app-wrapper {
  @include clearfix;
  width: 180px !important;
  margin-top: -1px;
  border-right: 1px solid $border-color;
  height: 100%;
  position: relative;
  .sidebar-container {
    position: absolute;
    z-index: 99;
    top: 0;
  }
}
</style>
