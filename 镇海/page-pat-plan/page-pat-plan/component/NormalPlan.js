import InspectionPlan from './InspectionPlan';

class NormalPlan extends InspectionPlan {
  gid;// 主键
  schemeGid;// 方案GID
  name;// 计划名称
  producerGid;// 制定人GID
  executorType;// 执行类型
  executorId;// 执行者ID
  planType;// 计划类型
  frequency;// 频率
  dateType;// 时间类型
  planStartTime;// 开始时间
  planEndTime;// 结束时间
  state;// 状态
  operatorGid;// 操作人GID
  reason;// 原因
  stopTime;// 停止时间
  createTime;// 创建时间
  updateTime;// 修改时间
  isToTask;// 是否添加到任务
}

export default NormalPlan;