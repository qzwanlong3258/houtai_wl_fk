import Vue from 'vue'
/**
 * 性别枚举 1：男；2：女
 */
Vue.filter('sexFilter', function (value) {
    if(value == 1) {
        return '男'
    }else if(value == 2){
        return '女'
    }else{
        return '未知'
    }
})
/**
 * 银行状态枚举 1：正用；2：停用
 */
Vue.filter('bankStatus', function (value) {
    if(value == 1){
        return '正用'
    }else if(value == 2){
        return '停用'
    }
})
/**
 * 预审状态样式枚举 1:待预审；2：已通过；3：未通过
 */
Vue.filter('statusColor', function (value) {
    if (value == 1) {
        return "color-warning";
    } else if (value == 2) {
        return "color-success";
    } else if (value == 3) {
        return "color-danger";
    } else if (value == 4) {
      return "color-success";
    } else if (value == 5) {
      return "color-danger";
    }
})

/**
 * 预审状态样式枚举 1:待预审；2：已通过；3：未通过
 */
Vue.filter('statusName', function (value) {
    if (value == 1) {
        return "待审核";
    } else if (value == 2) {
        return "已通过";
    } else if (value == 3) {
        return "未通过";
    }
})

/**
 * 面签状态枚举:1待完成 2面签成功3面签失败
 */
Vue.filter('faceStatusName', function (value) {
    if (value == 2) {
        return "待完成";
    } else if (value == 4) {
        return "面签成功";
    } else if (value == 5) {
        return "面签失败";
    }
})
/**
 * 婚姻状态1：已婚； 2：未婚; 3:离婚
 */

Vue.filter('marriageStatus', function (value) {
    if (value == 1) {
        return "已婚";
    } else if (value == 2) {
        return "未婚";
    } else if (value == 3) {
        return "离婚";
    }
})
/**
 * 婚姻状态1：已婚； 2：未婚; 3:离婚
 */

Vue.filter('marry', function (value) {
  if (value == 0) {
    return "未婚";
  } else if (value == 1) {
    return "已婚";
  } else if (value == 2) {
    return "离婚";
  }
})
/**
 * 工作单位性质 0'公务员事业单位', 1'一般职员', 2'个体户', 3'企业法人', 4'自由职业', 5'其他'
 */

Vue.filter('workunit', function (value) {
  if (value == 0) {
    return "公务员事业单位";
  } else if (value == 1) {
    return "一般职员";
  } else if (value == 2) {
    return "个体户";
  } else if (value == 3) {
    return "企业法人";
  } else if (value == 4) {
    return "自由职业";
  } else if (value == 5) {
    return "其他";
  }
})




/**
 * 装修情况 1：毛坯房； 2：翻新房
 */

Vue.filter('renovationStatusApply', function (value) {
    if (value == 1) {
        return "毛坯房";
    } else if (value == 2) {
        return "翻新房";
    }
})

/**
 * 装修进度 1:水电；2:瓦工; 3: 木工;4：完工
 */

Vue.filter('renovationScheduleApply', function (value) {
    if (value == 1) {
        return "水电";
    } else if (value == 2) {
        return "瓦工";
    } else if(value == 3) {
        return "木工";
    } else if(value == 4) {
        return "完工"
    }
})

/**
 * 装修类型 1:别墅；2:复式; 3: loft;4：一室一厅一卫;5:两室一厅一卫；6：两室一厅二卫,7:其他
 */

Vue.filter('renovationTypeApply', function (value) {
    if (value == 1) {
        return "别墅";
    } else if (value == 2) {
        return "复式";
    } else if(value == 3) {
        return "loft";
    } else if(value == 4) {
        return "一室一厅一卫"
    } else if(value == 5) {
        return "两室一厅一卫"
    } else if(value == 6) {
        return "两室一厅二卫"
    } else if(value == 7) {
        return "其他"
    }
})

/**
 * 阶段名称，0:初始阶段；n(n>0)：第n阶段
 */

 Vue.filter('getStageName',function(value){
     if(value == 0) {
         return '初始阶段'
     }else {
         return `第${value}阶段`
     }
 })

/**
 * 阶段名称，0:初始阶段；n(n>0)：第n阶段
 */

Vue.filter('Time',function(val){
  if(!val){
    return ''
  }
  if(!val){
    return ''
  }
  var time = new Date(val);

  function timeAdd0(str) {
    if (str < 10) {
      str = '0' + str;
    }
    return str
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + timeAdd0(m) + '-' + timeAdd0(d) + ' ' + timeAdd0(h) + ':' + timeAdd0(mm) + ':' + timeAdd0(s);
})

