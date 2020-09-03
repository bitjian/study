import NormalPlan from './NormalPlan';
import TemporaryPlan from './TemporaryPlan';

export default class planFactory {

  static createPlan(type) {
    switch (type.toUpperCase()) {
      case 'NORMALPLAN':
        return new NormalPlan();
      case 'TEMPORARY':
        return new TemporaryPlan();
    }
  }
}