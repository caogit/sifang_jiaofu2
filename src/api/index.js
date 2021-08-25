export const ApiUrl = {
  shenpiData: 'https://www.fastmock.site/mock/c40ef41ee8a236f8f2143321eabc37b2/caotest/03test',
  USER: {
    LOGIN: '/personnelInfo/personnel-info/login',
    GETLOGIN_USER_INFO: '/personnelInfo/personnel-info/getLoginUserInfo',
    LOGOUT: '/personnelInfo/personnel-info/logout', // 退出登录
    UPDATE_PASSWORD: '/personnelInfo/personnel-info/updatePassword', //修改登录密码
  },
  // 首页
  HOME: {
    SAVE: '/workDaily/work-daily/save', // 写日报
    GETLIST_TASKBYUSER: '/businessTask/business-task/getListTaskByUser', //获取在途任务列表
    WORK_VACATION_SAVE: '/workVacation/work-vacation/save', // 新增休假申请
    GETMANGET_LIST: '/personnelInfo/personnel-info/getManagerList', // 获取项目经理列表
  },
  // 我的
  MINE: {
    GETLIST_BYPAGE: '/workDaily/work-daily/getListByPage', //我的日报列表
    WORK_DAILT_DEL: '/workDaily/work-daily/del', // 删除日报
    WORK_DAILT_FIND_PARAM: '/workDaily/work-daily/findParam', // 日报详情
    WORK_DAILT_UPD: '/workDaily/work-daily/upd', //修改日报
  },
};
