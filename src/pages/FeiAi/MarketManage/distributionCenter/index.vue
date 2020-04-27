<template>
    <div class="emergency-shelter-container">

      <el-row>
        <el-col :span="3" style="width:180px;">
          <el-menu
            default-active="推广业绩"
            @select="selectMenu"
            class="el-menu-vertical-demo">
            <el-menu-item  v-for="(item, i) in items" :index="item.label" :key="i">
              <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21" style="padding-left:6px;width: calc(100% - 180px);">
          <InviteInfo   v-show="name == '推广业绩'"></InviteInfo>
          <Post   v-show="name == '专属海报'"></Post>
          <Good   v-show="name == '推广商品'"></Good>
<!--          <component ref="componentref" :is="item.component" v-for="(item, i) in items" :key="item.label" v-show="tabIndex == i" :parentApi="item.parentApi" :label="item.label"></component>-->
        </el-col>
      </el-row>

    </div>
</template>

<script>
  import InviteInfo from './InviteInfo/index'
  import Post from './PostSetting/index'
  import Good from './SpreadGood/index'
  export default {
    components:{
      InviteInfo,
      Post,
      Good
    },
    data(){
      return{
        items:[{label:'推广业绩'},
          {label:'专属海报'},
          {label:'推广商品'}

        ],
        name:'推广业绩'

      }
    },
    methods:{
      selectMenu (index) {
        // console.log(index)
        this.name=index
        // arr.forEach((item, i) => {
        //   if (item.label === index) {
        //     this.tabIndex = i
        //     this.notInit = true
        //     this.$refs.componentref[i].init()
        //   }
        // })
      }
    }
  }
</script>

<style scoped>

</style>
