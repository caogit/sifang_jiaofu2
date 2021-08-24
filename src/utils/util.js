export default {
  selectData(date) {
    // let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    return m + '月' + d + '日';
  },
  selectDataY(date) {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      return y + '年' + m + '月' + d + '日';
    } else {
      return date;
    }
  },
  // 提交格式 yyyy-mm-dd
  formatData(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
  },
};
