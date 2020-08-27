
import { JSONUtil, ObjectUtil } from '../../../components/_util/util';
import { opNotification } from '../../../components/list';
let operatorObj = {
  'startPlan': function (inspectionPlan, param) {
    inspectionPlan.startPlan();
    inspectionPlan.operatorGid = param.userGid;
    return { entity: JSON.stringify({ 'gid': inspectionPlan.gid, 'state': inspectionPlan.state, 'operatorGid': inspectionPlan.operatorGid }) };
  },
  'callbackStartPlan': function (inspectionPlan, res) {
    if (!ObjectUtil.objIsValid(res) || !res.success) {
      opNotification.error('启动计划失败，请重试或者联系管理员！', false);
    } else {
      opNotification.success('启动计划成功');
    }
  },
  'editPlan': function (inspectionPlan, param) {
    let { patPerson } = param;
    inspectionPlan.matchObj(patPerson);
    return { entity: JSON.stringify(inspectionPlan.editPlan()) };
  },

  'callbackeditPlan': function (inspectionPlan, res) {
    if (!ObjectUtil.objIsValid(res) || !res.success) {
      opNotification.error('修改常规计划失败，' + res.msg, false);
    } else {
      opNotification.success('修改常规计划成功');
    }
  },

  'pausePlan': function (inspectionPlan, param) {
    inspectionPlan.pausePlan(param);

    return { 'state': inspectionPlan.state };
  },

  'callbackpausePlan': function (inspectionPlan, param) {
    // 判断正确，来提示
  },

  'deletePlan': function (inspectionPlan, param) {
    inspectionPlan.operatorGid = param.userGid;
    return { entity: JSON.stringify(inspectionPlan.deletePlan()) };
  },
  'callbackdeletePlan': function (inspectionPlan, res) {
    if (!ObjectUtil.objIsValid(res) || !res.success) {
      opNotification.error('删除常规计划失败' + res.msg, false);
    } else {
      opNotification.success('删除常规计划成功');
    }
  },
  'searcRelationTask': function (inspectionPlan, param) {
    inspectionPlan.startPlan(param);
  },
  'callbacksearcRelationPlan': function (inspectionPlan, param) {
    inspectionPlan.callbacksearcRelationPlan(param);
  },
  'addNorMalPlan': function (inspectionPlan, param) {
    let { userGid, patPerson } = param;
    inspectionPlan.producerGID = userGid;
    inspectionPlan.matchObj(patPerson);
    return { entity: JSON.stringify(JSONUtil.classToJSON(inspectionPlan)) };
  },
  'callbackaddNorMalPlan': function (inspectionPlan, res) {
    if (!ObjectUtil.objIsValid(res) || !res.success) {
      opNotification.error('新增常规计划失败，请重试或者联系管理员！', false);
    } else {
      opNotification.success('新增常规计划成功');
    }
  },
  'addTempPlan': function (inspectionPlan, param) {
    let { userGid, patPerson } = param;
    inspectionPlan.producerGID = userGid;
    inspectionPlan.matchObj(patPerson);
    return { entity: JSON.stringify(JSONUtil.classToJSON(inspectionPlan)) };
  },
  'callbackaddTempPlan': function (inspectionPlan, res) {
    if (!ObjectUtil.objIsValid(res) || !res.success) {
      opNotification.error('新增临时计划失败，请重试或者联系管理员！', false);
    } else {
      opNotification.success('新增临时计划成功');
    }
  },
  suspendPlan: function (inspectionPlan, param) {
    inspectionPlan.operatorGid = param.userGid;
    return { entity: JSON.stringify(inspectionPlan.suspendPlan()) };
  },
  callbacksuspendPlan: function (inspectionPlan, res) {
    if (!ObjectUtil.objIsValid(res) || !res.success) {
      opNotification.error('暂停计划失败，' + res.msg, false);
    } else {
      opNotification.success('暂停计划成功');
    }
  }
};

export default operatorObj;