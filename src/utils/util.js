export default {
  selectData(date) {
    let str = '';
    // let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date.getDate();
    d = d < 10 ? '0' + d : d;
    const time = m + '月' + d + '日';
    str = time;
    return str;
  },
};
