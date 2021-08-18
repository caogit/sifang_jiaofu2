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
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '年' + m + '月' + d + '日';
  },
};
