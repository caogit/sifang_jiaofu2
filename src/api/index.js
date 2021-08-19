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
  },
};
