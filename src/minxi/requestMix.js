export default function () {
  return {
    data() {
      return {
        textState: '',
      };
    },
    methods: {
      decideText(str) {
        let fn = '';
        switch (str) {
          case 0:
            fn = '立即审批';
            break;
          case 1:
            fn = '审批通过';
            break;
          case 2:
            fn = '审批拒绝';
            break;
          default:
            break;
        }
        return fn;
      },
      decideshouText(str) {
        let fn = '';
        switch (str) {
          case 0:
            fn = '风险中等';
            break;
          case 1:
            fn = '风险无';
            break;
          case 2:
            fn = '风险高';
            break;

          default:
            break;
        }
        return fn;
      },
    },
  };
}
