import React from 'react';
import { connect } from 'pipenet-core/lib/react';
import { Button, Popconfirm, Form, Table, Icon, Input } from 'antd';
import getForm from '../../../components/newForm';
import { DialogCtrl, PanelCtrl } from '../../../components/controls';
import { List } from '../../../components/list';
import { ObjectUtil, StringUtil, ArrayObjectUtil } from '../../../components/_util/util';
import InsObj from '../../../components/insObj';

import styles from './index.less';
const { TextArea } = Input;


const planType = {
  'addNorMalPlan': 1,
  'addTempPlan': 2
};

@Form.create()
@connect(({ global, loading, user, patPlan }) => ({ global, user, ...patPlan, loading: loading.effects['patPlan/initTable'] || loading.effects['patPlan/goPage'] }))
export default class PageReact extends React.Component {
  inputValue;
  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({ type: 'patPlan/initTable' });
  }

  getFooter = () => [<Popconfirm key="ok?" title="确认提交吗？" onConfirm={this.handleSubmit}><Button key="ok" type="primary">确认</Button></Popconfirm>, <Button key="back" onClick={this.closeDialog}>取消</Button>];

  closeDialog = () => {
    this.props.dispatch({ type: 'patPlan/closeDialog', payload: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { form, type, baseMsg, dispatch, planObject } = this.props;
    form.validateFields((err, values) => {
      values.planType = planType[type];

      // 暂停或删除
      if (StringUtil.strIsValid(this.inputValue)) {
        planObject.reason = this.inputValue;
      }
      // 非新增操作
      if (ObjectUtil.objIsValid(planObject)) {
        Object.assign(planObject, values);
        values.gid = planObject.gid;
        dispatch({ type: 'patPlan/setState', payload: { planObject: planObject } });
      }

      if (!err) {
        dispatch({ type: 'patPlan/serverDispatch', payload: { baseMsg: baseMsg, operatorType: type, values: values } });
      }
    });
  };

  // 设置计划详情展示
  getPlanDetailView = () => {
    const style = { margin: 10, color: '#1890ff' };
    const { planObject, patPerson } = this.props;
    let executorName = planObject.executorType + '-' + planObject.executorId;
    let executorObj = ArrayObjectUtil.iteratorSearch(patPerson, 'value', executorName);
    return (
      <div style={{ height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className={styles.divStyle} style={{ marginRight: '20px' }}><Icon type="schedule" style={style} />巡检计划名称： {planObject.name}</div>
          <div className={styles.divStyle} style={{ marginRight: '20px' }}>  <Icon type="idcard" style={style} />计划执行人：{executorObj.title}</div>
          <div className={styles.divStyle} style={{ marginRight: '20px' }}>
            <Icon type="dashboard" style={style} theme="twoTone" />
            <span>开始时间：{planObject.planStartTime}</span>
            <span style={{ marginLeft: '10px' }}>结束时间：{planObject.planEndTime}</span>
          </div>
        </div>
        <div style={{ marginRight: '10px' }}>
          <Button type="primary" onClick={(flag) => { this.closeMapView() }} >返回</Button>
        </div >
      </div >
    );
  }

  // 关闭map操作页面
  closeMapView = () => {
    let { dispatch } = this.props;
    dispatch({ type: 'patPlan/setState', payload: { divType: 'list' } });
  }

  onInputChange = ({ target: { value } }) => {
    this.inputValue = value;
  }

  // 获取主界面展示
  getTableList = (cfg, loading, dialog, dialogComponent, footer, width) => {
    return (<PanelCtrl loading={loading} size={[100, 0]}>
      {cfg.dataSource && <List {...cfg} />}
      {this.getDialog(dialog, dialogComponent, footer, width)}
    </PanelCtrl>);
  }

  // 获取弹出框展示
  getDialog = (dialog, dialogComponent, footer, width) => {
    return (
      dialog && <DialogCtrl {...dialog} footer={footer} center width={width} visible onCancel={this.closeDialog}>
        {dialogComponent}
      </DialogCtrl>
    );
  }

  // 初始化地图控件
  // initMap = () => {
  //   const { token, zsMap, seaMap, zjMap, zjbzMap } = window.g_ctx.getCfgByKey('mapCfg');
  //   const { patObj } = this.props;
  //   if (!ObjectUtil.objIsValid(this.hmap)) {
  //     this.hmap = new HMap();
  //     this.hmap.accessToken(token);
  //     this.hmap.render({ contianer: 'map', center: [121.73396587371826, 29.973192214965824], level: 16/* , click: (g) => console.log(g) */ });
  //     this.hmap.addLayers([zjMap, zjbzMap, zsMap, seaMap]);

  //     this.hdraw = new HDraw(this.hmap);
  //   } else {
  //     this.hmap.render({ contianer: 'map', center: [121.73396587371826, 29.973192214965824], level: 16/* , click: (g) => console.log(g) */ });
  //     this.hmap.addLayers([zjMap, zjbzMap, zsMap, seaMap]);
  //   }

  //   // 初始化巡检对象
  //   this.renderPatObject(patObj);
  // };

  // 初始化整个map操作页面的布局
  getMap = () => {
    let { data, patTypes } = this.props;
    return (
      <div className={styles.mapContainer} >
        <div className={styles.header}>
          {this.getPlanDetailView()}
        </div>
        <div style={{ height: 'calc(100% - 45px)' }}>{data && patTypes && <InsObj data={data} patTypes={patTypes} />}</div>
      </div>
    );
  }

  render() {
    const { dialog, type, baseMsg, loading, dialogTable, showType, cfg, divType, operateMsg } = this.props;
    let divComponent;
    let dialogComponent;
    let footer = [];
    let width = 800;

    if (showType === 'dialog') {
      dialogComponent = getForm(dialogTable.columns, baseMsg, 2, this.props, type);
      footer = this.getFooter();
    } else if (showType === 'table') {
      dialogComponent = (<Table dataSource={dialogTable.dataSource} columns={dialogTable.columns} scroll={{ x: 1000 }} />);
    } else if (showType === 'input') {
      dialogComponent = (<TextArea placeholder={operateMsg} autosize={{ minRows: 3, maxRows: 5 }} onChange={this.onInputChange} />);
      footer = this.getFooter();
      width = 400;
    }
    if (divType === 'list') {
      divComponent = this.getTableList(cfg, loading, dialog, dialogComponent, footer, width);
    } else if (divType === 'map') {
      divComponent = this.getMap();
    }

    return (
      <div style={{ height: '100%' }}>
        {divComponent}
      </div>
    );
  }
}
