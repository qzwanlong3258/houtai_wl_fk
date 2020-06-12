exports.install = function (Vue, options) {
  Vue.prototype.alertMessage = function (action){
    this.$message({
    message: action,
    type: 'warning',
  });
  };
};
