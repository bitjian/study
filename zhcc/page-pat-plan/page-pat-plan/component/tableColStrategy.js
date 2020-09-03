import { Icon, Badge} from 'antd';
// 表单列策略方法
let tableStrategy = {
  // 组合字段值变成新的字段
  conbinaColumn: (c, data, values) => {
    let value = c.colCondition(data);
    return (<div>{value}</div>);
  },

  // 列值根据条件变换颜色
  modifyColColor: (c, data, values) => {
    let conData = c.colCondition(data);
    let status = conData['status'];
    let style = conData['style'];
    return (<div style={style}><Badge status={status} text={values} /></div>);
  },

  // 列值根据条件变换图标以及颜色
  modifyColIcon: (c, data, values) => {
    let condition = c.colCondition;
    let conData = condition(data);
    let type = conData['type'];
    let style = conData['style'];
    return (<div style={style}><Icon type={type} style={{marginRight: '5px'}} />{values}</div>);
  },

  // 合并列中的时间类型,频率，组成一个新的值返回
  conbinaColumnValue: (data) => {
    let dataTypeObj = {
      1: '时',
      2: '天',
      3: '周',
      4: '月',
      5: '年'
    };

    let frequency = data.frequency;
    let dateType = data.dateType;
    return (frequency + dataTypeObj[dateType]) || '';
  },

  // 根据状态匹配值获取颜色显示
  setColColorByCon: (data) => {
    let color = {
      1: {status: 'processing', style: {'color': '#4394ff'}},
      2: {status: 'error', style: {'color': '#808080'}}
    };

    let state = data['state'];
    return color[state];
  },

  // 判断计划类型 schedule 常规 history 临时
  judgePlanType: (data) => {
    let planType = {
      1: {type: 'schedule', style: {'color': '#52c41a'}},
      2: {type: 'clock-circle', style: {'color': '#faad14'}}
    };

    let planTypeValue = data['planType'];
    return planType[planTypeValue];
  }
};

export default tableStrategy;