import { ArrayObjectUtil, ObjectUtil, JSONUtil} from '../../../components/_util/util';

class InspectionPlan {
  startPlan() {
    this.state = 1;
  }

  editPlan() {
    return JSONUtil.classToJSON(this);
  }

  pausePlan() {
    this.state = 2;
  }

  deletePlan() {
    this.state = 3;
    return { 'state': this.state, 'gid': this.gid, 'operatorGid': this.operatorGid, 'reason': this.reason};
  }

  searcRelationTask() {
    console.log('相关任务');
  }

  suspendPlan() {
    this.state = 2;
    return { 'state': this.state, 'gid': this.gid, 'operatorGid': this.operatorGid, 'reason': this.reason};
  }

  setFieldReadOnly() {
    console.log(1);
  }

  // 匹配执行对象
  matchObj(dataSource) {
    let executorId = this.executorId;

    let matchObj = ArrayObjectUtil.iteratorSearch(dataSource, 'value', executorId);

    if (ObjectUtil.objIsValid(matchObj)) {
      let value = matchObj.value;
      let valueArray = value.split('-');
      this.executorType = parseInt(valueArray[0], 10);
      this.executorId = matchObj.ecode;
    }
  }
}

export default InspectionPlan;
