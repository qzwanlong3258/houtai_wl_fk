<template>
  <div>
    <love-dialog
      class="palyer-dialog"
      :visible.sync="modelStatus"
      @beforeClose="beforeClose"
      :width="830"
      :height="560"
    >
      <div class="title-tip">详情信息</div>
      <el-table class="table-box" :data="tableList" border :show-header="false">
        <el-table-column label="属性名" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="数据" align="center">
            <template slot-scope="scope">{{scope.row.data}}</template>
        </el-table-column>
      </el-table>
    </love-dialog>
  </div>
</template>
<script>
import LoveDialog from "@/components/NoLoveDialog";
export default {
  components: {
    LoveDialog
  },
  props: {
    modelStatus: {
      type: Boolean
    },
    tableList: {
      type: Array,
      default: []
    }
  },
  methods: {
    beforeClose: function() {
      this.$emit("closeStatus");
    }
  }
};
</script>
<style lang="scss" scoped>
.table-box {
    width: 80%;
    margin: 24px 10%;
}
</style>