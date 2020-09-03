class InspectionType {
  gid;// 字段含义
  name;// 类型名称
  tableName;// 物理表
  companyGid;// 所属单位
  idField;// ID字段
  nameField;// 名称字段
  filterCriteria;// 过滤条件
  createTime;// 创建时间
  updateTime;// 修改时间
}

// 码头巡检
export class WharfPatrol extends InspectionType {

}
// 厂区巡检
export class FactoryPatrol extends InspectionType {

}
// 皮带机巡检
export class BeltPatrol extends InspectionType {

}
// 夜查
export class NightPatrol extends InspectionType {

}
// 24小时督查
export class DayPatrol extends InspectionType {

}
// 专项巡检
export class SpecialPatrol extends InspectionType {

}
