// import { getTable, opNotification } from '../../../components/tableList/utils';
import { getTableMeta, getData, editPlan, addPlan, queryExecutor, modifyPlan, getSchemaData, getSchemaType, getPlanData } from '../services';
import ObjectFactory from '../component/ObjectFactory';
import operateObj from '../component/operatorObj';
import { ArrayObjectUtil, JSONUtil, ObjectUtil } from '../../../components/_util/util';
import { getCfg, opNotification } from '../../../components/list';
import tableColStrategy from '../component/tableColStrategy';
const store = window.g_ctx.dva.getStore();
const planType = {
  1: 'NORMALPLAN',
  2: 'TEMPORARY'
};

let normapParam = {};
let patType = {};
// 前端操作类型
const interfaceData = [
  { key: 'addNorMalPlan', name: '添加常规计划', operatorName: 'addNorMalPlan', operatorCallbackName: 'callbackaddNorMalPlan', serverMethocd: addPlan, normalParam: normapParam },
  { key: 'addTempPlan', name: '添加临时计划', operatorName: 'addTempPlan', operatorCallbackName: 'callbackaddTempPlan', serverMethocd: addPlan },
  { key: 'planDetail', name: '详情', disabled: false, confirm: false, operatorName: 'planDetail', operatorCallbackName: 'callbackplanDetail' },
  { key: 'editPlan', name: '修改', disabled: false, operatorName: 'editPlan', operatorCallbackName: 'callbackeditPlan', serverMethocd: modifyPlan },
  { key: 'stopPlan', name: '删除', disabled: false, confirm: false, operatorName: 'deletePlan', operatorCallbackName: 'callbackdeletePlan', serverMethocd: editPlan },
  { key: 'suspendPlan', name: '暂停', disabled: false, operatorName: 'suspendPlan', operatorCallbackName: 'callbacksuspendPlan', serverMethocd: editPlan },
  { key: 'startPlan', name: '启动', disabled: false, confirm: true, operatorName: 'startPlan', operatorCallbackName: 'callbackStartPlan', serverMethocd: editPlan }
];

// 计划状态
const planState = {
  1: {
    1: ['planDetail', 'editPlan', 'stopPlan', 'suspendPlan', 'searcRelationTask'],
    2: ['planDetail', 'editPlan', 'stopPlan', 'startPlan', 'searcRelationTask'],
    3: ['planDetail', 'searcRelationTask'],
  },
  2: {
    1: ['planDetail'],
  }
};

// 计划类型配置
const planMappingType = [
  {
    'dbFieldValue': 1, // 数据库中类型判断
    'referValue': 'NORMALPLAN', // 代码中对应类型判断
    'fieldDesc': 'negative', // all:全部基础字段 positive部分字段(正) negative部分字段(反)
    'matchField': 'name', // 匹配field的字段
    'field': ['state', 'planType', 'operatorGid', 'reason', 'stopTime', 'createTime', 'updateTime', 'executorType', 'producerGid', 'executeEfficiency'], // 过滤的字段
    'fieldControl': [
      {
        name: 'frequency',
        visible: 1
      }, {
        name: 'dateType',
        visible: 1
      }
    ], // 需要控制的字段条件
  },
  {
    'dbFieldValue': 2,
    'referValue': 'TEMPORARY',
    'fieldDesc': '',
    'matchField': 'name',
    'field': ['frequency', 'dateType', 'state', 'planType', 'operatorGid', 'reason', 'stopTime', 'createTime', 'updateTime', 'executorType', 'producerGid', 'executeEfficiency'],
    'fieldControl': [
      // {
      //   name: 'schemeGid',
      //   editable: 0
      // }
    ],
  }
];

let planObjs = {};

const tableColCfg = [
  {
    'columnIndex': 17,
    'modifyMethod': 'conbinaColumn',
    'condition': 'conbinaColumnValue'
  },
  {
    'columnIndex': 11,
    'modifyMethod': 'modifyColColor',
    'condition': 'setColColorByCon'
  },
  {
    'columnIndex': 6,
    'modifyMethod': 'modifyColIcon',
    'condition': 'judgePlanType'
  }
];



export default {
  namespace: 'patPlan',

  state: {
    table: {},
    dialog: null,
    baseMsg: null,
    nItem: null,
    dialogTable: {},
    cfg: {},
    detailIsshow: false,
    lastGeo: {},
  },

  effects: {
    // 初始化表格但不加载数据
    * initTable({ payload, callback }, { call, put, select, take }) {
      const metas = yield call(getTableMeta, { tableName: 'PAT_PLAN' });
      const taskMeta = yield call(getTableMeta, { tableName: 'PAT_TASK' });
      if (taskMeta && taskMeta.success) {
        let taskColumns = taskMeta.data.list;
        yield put({ type: 'setState', payload: { taskColumns } });
      }

      if (metas && metas.success) {
        let columns = metas.data.list;

        // 渲染指定的列
        tableColCfg.forEach((elem) => {
          let columnIndex = elem.columnIndex;
          columns[columnIndex].render = tableColStrategy[elem['modifyMethod']];
          columns[columnIndex]['colCondition'] = tableColStrategy[elem['condition']];
        });

        const searchFields = columns.filter((f) => f.updaterule);
        yield put({ type: 'getPatPerson', payload: { columns } });

        yield take('getPatPerson/@@end');
        // 根据不同的状态来渲染不同的操作菜单
        const menus = (record, index) => {
          return ArrayObjectUtil.getObjByCon(interfaceData, 'key', planState[record['planType']][record['state']], 'contain');
        };

        const listName = '巡查计划管理';
        const menuEvent = (key, record, index) => {
          // 不同类型的处理
          store.dispatch({ type: 'patPlan/showDialog', payload: { key, baseMsg: record } });
        };

        let addBtnList = ArrayObjectUtil.getObjByCon(interfaceData, 'key', ['addNorMalPlan', 'addTempPlan'], 'contain');
        const buttons = addBtnList;
        const goPage = (page, pageSize, where) => store.dispatch({ type: 'patPlan/goPage', payload: { page, pageSize, where } });
        const cfg = getCfg({ columns, menus, listName, goPage, menuEvent, buttons, autoDesc: false, searchFields, menuItem: 4 });
        let dialogTable = cfg;
        yield put({ type: 'setState', payload: { cfg, dialogTable, divType: 'list' } });
        yield put({ type: 'goPage', payload: { page: 1, pageSize: 50, where: { order: 'desc' } } });
      } else {
        opNotification.error('获取巡查计划失败，请重试或者联系管理员！', false);
      }
    },

    // 获取执行人树形结构
    * getPatPerson({ payload, callback }, { call, put }) {
      let { columns } = payload;
      let personTreeInfo = yield call(queryExecutor, {});

      if (personTreeInfo && personTreeInfo.success) {
        let personTreeData = personTreeInfo.data;
        let objFormat = {
          'title': 'userName',
          'value': 'inspectorGid',
          'ecode': 'inspectorGid'
        };

        let newpersonTreeInfos = [];
        for (let key of Object.keys(personTreeData)) {
          let personChildren = personTreeData[key]['INSPECTOR'];
          let newPerson = {};
          newPerson['title'] = personTreeData[key]['DEPARTMENTNAME'];

          // value应该是对应的gid
          newPerson['value'] = `2-${key}`;
          newPerson['ecode'] = parseInt(key, 10);

          let newpersonChildren = ArrayObjectUtil.refactorByCon(personChildren, objFormat, [(obj) => { obj['value'] = `1-${obj['value']}` }]);

          newPerson['children'] = newpersonChildren;

          newpersonTreeInfos.push(newPerson);
        }

        yield put({ type: 'setState', payload: { patPerson: newpersonTreeInfos } });
        columns[5].children = newpersonTreeInfos;
      }
    },

    * getPlanMapData({ payload, callback }, { call, put, select }) {
      let { schemeGid } = payload;

      let data = {
        schemeGid: schemeGid,
        info: true
      };

      const res = yield call(getPlanData);
      const res1 = yield call(getSchemaData, data);

      if (!patType.data) {
        patType = yield call(getSchemaType);
      }

      if (res && res.success) {
        if (patType && patType.success) {
          yield put({ type: 'setState', payload: { data: res1.data || [], patTypes: patType.data || {} } });
        } else {
          patType = yield call(getSchemaType);
          opNotification.error('获取巡检类型失败，请重试或联系管理员！', false);
        }
      } else {
        opNotification.error('获取巡检人员数据失败，请重试或联系管理员！', false);
      }
    },

    // 获取数据
    * goPage({ payload, callback }, { call, put }) {
      const { page, pageSize, where = {} } = payload;
      const res = yield call(getData, { page, pageSize, entity: where });
      if (res && res.success) {
        const dataSource = res.data.list;
        // 创建planObjs对象
        dataSource.forEach(element => {
          let operatePlan = ObjectFactory.createPlan(planType[element.planType]);
          JSONUtil.jsonToClass(element, operatePlan);
          // element['executorId'] = `${element.executorType}-${element.executorId}`;
          planObjs[operatePlan.gid] = operatePlan;
        });

        const { total } = res.data.pagination;
        yield put({ type: 'updateTable', payload: { page, pageSize, dataSource, total, where } });
      } else {
        opNotification.error('获取数据失败，请重试或者联系管理员！', false);
      }
    },

    // 设置不同计划类型需要展示的数据结构
    * setDataSource({ payload, callback }, { call, put, select }) {
      let { planType, table, showType } = payload;
      let dialogTable = JSON.parse(JSON.stringify(table));
      // 获取对应计划的配置
      let planCOnfig = ArrayObjectUtil.getObjectSignal(planMappingType, 'dbFieldValue', parseInt(planType, 10));

      // 获取对应计划的数据展示结构
      let matchField = planCOnfig.matchField;
      let columnsControl = ArrayObjectUtil.getObjByCon(dialogTable.columns, matchField, planCOnfig.field, 'unContain');
      // 重新定义数据结构控制
      ArrayObjectUtil.modifyArrObj(columnsControl, 'name', planCOnfig.fieldControl);
      dialogTable.columns = columnsControl;
      yield put({ type: 'setState', payload: { dialogTable, showType } });
    },

    // 打开弹出框
    * showDialog({ payload, callback }, { call, put, select, take }) {
      const type = payload.key || '';
      const baseMsg = payload.baseMsg || {};
      let planType = baseMsg.planType;
      let title = '';
      let table = {};
      let user;
      let patPerson;
      switch (type) {
        case 'addNorMalPlan':
          title = '新增常规计划';
          table = yield select((state) => state.patPlan.cfg);
          user = yield select((state) => state.user);
          patPerson = yield select((state) => state.patPlan.patPerson);
          normapParam = { 'userGid': user.currentUser.gid, 'patPerson': patPerson };
          yield put({ type: 'setDataSource', payload: { planType: 1, table: table, showType: 'dialog' } });
          break;
        case 'addTempPlan':
          title = '新增临时计划';
          table = yield select((state) => state.patPlan.cfg);
          user = yield select((state) => state.user);
          patPerson = yield select((state) => state.patPlan.patPerson);
          normapParam = { 'userGid': user.currentUser.gid, 'patPerson': patPerson };
          yield put({ type: 'setDataSource', payload: { planType: 2, table: table, showType: 'dialog' } });
          break;
        case 'startPlan':
          user = yield select((state) => state.user);
          normapParam = { 'userGid': user.currentUser.gid };
          yield put({ type: 'patPlan/serverDispatch', payload: { operatorType: type, values: baseMsg } });
          return;
        case 'editPlan':
          table = yield select((state) => state.patPlan.cfg);
          patPerson = yield select((state) => state.patPlan.patPerson);
          normapParam = { 'patPerson': patPerson };
          baseMsg.executorId = `${baseMsg.executorType}-${baseMsg.executorId}`;
          yield put({ type: 'setDataSource', payload: { planType: planType, table: table, showType: 'dialog', values: baseMsg } });
          yield put({ type: 'setState', payload: { planObject: planObjs[baseMsg['gid']] } });
          title = '编辑计划';
          break;
        case 'stopPlan':
          title = '删除计划';
          user = yield select((state) => state.user);
          normapParam = { 'userGid': user.currentUser.gid };
          // yield put({ type: 'patPlan/serverDispatch', payload: { operatorType: type, values: baseMsg } });
          yield put({ type: 'setState', payload: { dialogTable: table, showType: 'input', operateMsg: '请输入删除计划原因', planObject: planObjs[baseMsg['gid']] } });
          break;
        // return;
        case 'planDetail':
          yield put({ type: 'patPlan/getPlanMapData', payload: { 'schemeGid': planObjs[baseMsg['gid']].schemeGid } });
          yield take('getPlanMapData/@@end');
          yield put({ type: 'setState', payload: { divType: 'map', planObject: planObjs[baseMsg['gid']] } });
          return;
        case 'suspendPlan':
          title = '暂停计划';
          user = yield select((state) => state.user);
          normapParam = { 'userGid': user.currentUser.gid };
          yield put({ type: 'setState', payload: { dialogTable: table, showType: 'input', operateMsg: '请输入暂停计划原因', planObject: planObjs[baseMsg['gid']] } });
          break;
        default:
          return;
      }
      const dialog = { title };
      yield put({ type: 'setState', payload: { dialog, baseMsg, type } });
    },

    // 关闭弹出框
    * closeDialog({ payload, callback }, { call, put }) {
      yield put({ type: 'setState', payload: { dialog: null } });
    },

    /**
     * 服务分发
     * @param {请求参数} values
     * @param {操作类型} operatorType
     */
    * serverDispatch({ payload, callback }, { call, put, select }) {
      let { values, operatorType } = payload;
      values.planType = parseInt(values.planType, 10);
      let planType = values.planType;

      // 根据type获取计划类型
      // 获取对应计划的配置
      let planCOnfig = ArrayObjectUtil.getObjectSignal(planMappingType, 'dbFieldValue', planType || 1);

      let operatePlan = {};
      if (!ObjectUtil.objIsValid(planObjs[values.gid])) {
        operatePlan = ObjectFactory.createPlan(planCOnfig.referValue);

        JSONUtil.jsonToClass(values, operatePlan);
      } else {
        operatePlan = planObjs[values.gid];
      }
      let operatorList = ArrayObjectUtil.getObjByCon(interfaceData, 'key', [operatorType], 'contain');
      let operatorFunctionObj = operatorList[0];
      // 调用接口处理前函数
      let requestParam = {};

      // 调用接口处理后回掉函数
      let resultData = operateObj[operatorFunctionObj.operatorName](operatePlan, normapParam);
      Object.assign(requestParam, resultData);
      yield put({ type: 'requestServer', payload: { requestParam: requestParam, operatePlan: operatePlan, url: 'dfs', serverMethod: operatorFunctionObj.serverMethocd, beforeServer: operatorFunctionObj.beforeServer }, callback: operateObj[operatorFunctionObj.operatorCallbackName] });
    },

    // 服务请求(利用类的回掉，主要针对对象来进行)
    * requestServer({ payload, callback }, { call, put }) {
      let { requestParam, operatePlan, serverMethod } = payload;

      const res = yield call(serverMethod, requestParam);
      callback(operatePlan, res);
      yield put({ type: 'goPage', payload: { page: 1, pageSize: 50, where: { order: 'desc' } } });
      yield put({ type: 'setState', payload: { dialog: null, baseMsg: {} } });
    },
  },

  reducers: {
    setState(state, action) {
      return { ...state, ...action.payload };
    },
    updateTable(state, action) {
      const cfg = Object.assign({ ...state.cfg }, action.payload);
      return { ...state, cfg };
    },
  },
};
