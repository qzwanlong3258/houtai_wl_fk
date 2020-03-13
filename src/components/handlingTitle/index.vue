<template>
  <div class="incident-handling-title group-lable"><b>{{title}}</b></div>
</template>

<script>
  export default {  // 添加分组标题
    name: 'handling-title',
    props: {
      title: String
    }
  }
</script>

<style lang="scss" scoped>
  // @import '../../assets/scss/index.scss';
  .incident-handling-title {
    font-size: 15px;
    color: #333;
    padding: 10px 15px;
    margin-left: 20px;
  }
  // .group-lable {
  //   padding: 8px 16px;
  //   background-color: mix(#fff, $--color-primary, 90%);
  //   border-radius: 4px;
  //   border-left: 5px solid $--color-primary;
  //   margin: 20px 0;
  // }
</style>
