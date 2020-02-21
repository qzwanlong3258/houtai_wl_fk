<template>
  <div>
    <scroll-bar>
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="false"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        class="menu-setting"
      >
        <sidebar-item :routes="routers"></sidebar-item>
      </el-menu>
    </scroll-bar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SidebarItem from "./SidebarItem";
import ScrollBar from "@/components/ScrollBar";
export default {
  components: { SidebarItem, ScrollBar },
  data(){
    return {
      routers: []
    }
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  created(){
    this.routers = JSON.parse(sessionStorage.getItem('router'))
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/style/variable.scss";
.menu-setting {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
}
</style>

