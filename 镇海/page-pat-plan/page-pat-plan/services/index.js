import { http } from 'yc';

const { get } = http;
const baseServerUrl = 'api/spv/patrol/PatPlanController/';
const metaServerUrl = 'api/base/operate/MtAttFieldController/';
const patPerson = 'api/spv/patrol/PatInspectorController/';
export async function getTableMeta(params) {
  const res = await get({
    svn: 'SPV_SVR',
    path: metaServerUrl + '/queryByTablename',
    data: params,
  });
  return res;
}

// 查询计划数据
export async function getData(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/queryByPage',
    data,
  });
  return res;
}

// 新增计划
export async function addPlan(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/insert',
    data,
  });
  return res;
}

export async function editPlan(data = {}) {
  let entity = JSON.parse(data.entity);
  let result = await isTask({ gid: entity.gid });
  if (!result.success) {
    const res = await get({
      svn: 'SPV_SVR',
      path: baseServerUrl + '/updateState',
      data,
    });
    return res;
  } else {
    return {'success': false, 'msg': '计划已在任务中', 'code': -1};
  }
}

export async function getPlanData(params = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: '/api/spv/patrol/PatInspectorController/queryAllOfTree',
    data: params,
  });
  return res;
}

// 查询方案巡检对象
export async function getSchemaData(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: '/api/spv/patrol/PatObjectController/queryPatObject',
    data
  });
  return res;
}

export async function getSchemaType() {
  const res = await get({
    svn: 'SPV_SVR',
    path: '/api/spv/patrol/PatTypeController/queryAllByEntity',
    data: {},
  });
  return res;
}

export async function modifyPlan(data = {}) {
  let entity = JSON.parse(data.entity);
  let result = await isTask({ gid: entity.gid });

  if (!result.success) {
    // 查询计划是否已生成任务
    const res = await get({
      svn: 'SPV_SVR',
      path: baseServerUrl + '/update',
      data,
    });
    return res;
  } else {
    return {'success': false, 'msg': '计划已在任务中', 'code': -1};
  }

}

// 查询计划是否已生成任务
export async function isTask(data = {}) {
  // 查询计划是否已生成任务
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/queryPlanInTask',
    data,
  });
  return res;
}

// 停止计划
export async function stopPlan(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/queryByPage',
    data,
  });
  return res;
}

// 停止计划
export async function deletePlan(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/queryByPage',
    data,
  });
  return res;
}

// 查询方案
export async function searchSchema(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/queryByPage',
    data,
  });
  return res;
}

// 查询执行人
export async function queryExecutor(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: patPerson + '/queryAllOfTree',
    data,
  });
  return res;
}

// 查看关联任务
export async function relationTask(data = {}) {
  const res = await get({
    svn: 'SPV_SVR',
    path: baseServerUrl + '/queryByPage',
    data,
  });
  return res;
}