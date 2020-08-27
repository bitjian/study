import { http } from 'yc';

let uuid = 0;

// eslint-disable-next-line import/prefer-default-export
export function getUUID() {
  return `ey-component-${uuid++}`;
}

// 设置数组对象中某字段为空
export function setFieldNull(columns, condition, field) {
  for (let i = 0; i < columns.length; i++) {
    const obj = columns[i];
    if (obj.name === condition) {
      obj[field] = null;
      return;
    }
  }
}

// 获取table元数据
export async function getTableMeta(tableName) {
  const res = await http.table.fields(tableName);
  return res.fields;
}

// 设置table元数据为只读
export function setTableMetaReadOnly(columns, editField, condition) {
  columns.forEach((col) => {
    col[editField] = condition;
  });
}

// 对象工具类
export class ObjectUtil {
  // 判断对象是否为空
  static objIsValid(obj) {
    if (obj && (typeof obj !== 'undefined' && typeof obj === 'object') && Object.keys(obj).length >= 0) {
      return true;
    }
    return false;
  }

  /**
   * 删除字段
   * @param {*} obj
   */
  static deleteField(obj, fields) {
    if (!ObjectUtil.objIsValid(obj)) {
      return {};
    }
    let newObj = JSON.parse(JSON.stringify(obj));
    fields.forEach((elem) => {
      if (newObj.hasOwnProperty(elem)) {
        delete newObj[elem];
      }
    });

    return newObj;
  }

  /**
   * 将对象中key为undefined的值去掉
   * @param {对象} obj
   */
  static getValidObjInfo(obj) {
    let newObj = {};
    for (let key of Object.keys(obj)) {

      if (StringUtil.strIsValid(obj[key])) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  }

  /**
   * 将对象的key值,替换成另外数组中的表达值
   */
  static formatColumns(columns, obj) {
    if (!ObjectUtil.objIsValid(obj)) {
      return {};
    }

    let newObj = {};
    columns.forEach((elem) => {
      let newKey = elem.alias;
      let value = obj[elem.name];


      if (elem.children) {
        let children = elem.children[0].children;
        children.forEach((childElem) => {
          if (parseInt(childElem.ecode, 10) === parseInt(value, 10)) {
            value = childElem.value;
          }
        });
      }

      newObj[newKey] = value;
    });

    return newObj;
  }
}

// 对象数组工具类(通过key值)
export class ArrayObjectUtil {
  /**
   * 查询出满足条件的数组对象 返回一个新的匹对象数组
   * @param {对象数组} objArray
   * @param {匹配字段} field
   * @param {匹配条件 Array} condition (对象值满足匹配数组中的条件)
   * @param {类型,包括正向匹配，和反向匹配} type (contain,unContain)
   */
  static getObjByCon(objArray, field, condition, type) {
    let newObjArray = [];
    if (!ArrayUtil.arrayIsValid(objArray) || !ArrayUtil.arrayIsValid(condition)) {
      return newObjArray;
    }
    if (type === 'contain') {
      newObjArray = objArray.filter((elem) => {
        return elem[field] === condition[field] || ArrayUtil.contain(condition, elem[field]);
      });
    } else if (type === 'unContain') {
      newObjArray = objArray.filter((elem) => {
        return elem[field] === condition[field] || !ArrayUtil.contain(condition, elem[field]);
      });
    }
    return newObjArray;
  }

  /**
   * 数组对象中获取单个对象
   * @param {对象数组} objArray
   * @param {匹配字段} field
   * @param {匹配条件 string||number} condition
   */
  static getObjectSignal(objArray, field, condition) {
    for (let i = 0; i < objArray.length; i++) {
      let obj = objArray[i];
      if (ObjectUtil.objIsValid(obj) && obj[field] === condition) {
        return obj;
      }
    }
  }

  /**
   * 根据条件批量修改数组对象,根据自生条件匹配，匹配后再进行合并，修改对象。
   * @param {数组对象} ObjectArray
   * @param {匹配字段} field
   * @param {匹配条件 ArrayObject} conditions
   */
  static modifyArrObj(ObjectArray, field, conditions) {
    for (let i = 0; i < ObjectArray.length; i++) {
      let obj = ObjectArray[i];

      for (let k = 0; k < conditions.length; k++) {
        if (obj[field] === conditions[k][field]) {
          Object.assign(obj, conditions[k]);
          break;
        }
      }
    }
  }

  /**
   *  根据条件批量修改数组对象,根据外部条件
   * @param {对象数组} ObjectArray
   * @param {需要修改的字段} field
   * @param {字段对象的新值对象} conditions
   */
  static modifyArrObjByOut(ObjectArray, field, conditions) {
    for (let i = 0; i < ObjectArray.length; i++) {
      let obj = ObjectArray[i];

      obj[field] = conditions[obj[field]] || obj[field];
    }
  }

  /**
   * 递归遍历获取对象父子节点信息(以children进行,单个字段匹配) 返回匹配对象
   * @param {对象数组} ObjectArray
   * @param {匹配字段} field
   * @param {匹配条件 string,number} condition
   */
  static iteratorSearch(ObjectArray, field, condition) {
    for (let i = 0; i < ObjectArray.length; i++) {
      let obj = ObjectArray[i];
      if (obj[field] === condition) {
        return obj;
      } else if (ArrayUtil.arrayIsValid(obj.children)) {
        let iteratorResult = ArrayObjectUtil.iteratorSearch(obj.children, field, condition);

        if (ObjectUtil.objIsValid(iteratorResult)) {
          return iteratorResult;
        }
      } else {
        return null;
      }
    }
  }

  //
  /**
   * 将数组对象转换成指定数据格式
   * @param {对象数组} ObjectArray
   * @param {对象格式} objFormat
   * @param {条件,[function]} condition (对象作为参数,外部修改对象值)
   * objectFormat{'新对象字段':'原始对象字段'}
   */
  static refactorByCon(ObjectArray, objFormat, condition) {
    let newObjectArray = [];

    ObjectArray.forEach((elem) => {
      let obj = {};
      for (let key of Object.keys(objFormat)) {
        obj[key] = elem[objFormat[key]];
      }
      if (ObjectUtil.objIsValid(condition)) {
        condition.forEach((elem) => {
          elem(obj);
        });
      }
      newObjectArray.push(obj);
    });

    return newObjectArray;
  }
}

// 字符串工具类
export class StringUtil {
  // 判断字符串是否为空
  static strIsValid(str) {
    if (str && (typeof str !== 'undefined' && typeof str === 'string') && str !== '') {
      return true;
    }
    return false;
  }
}

// 数据工具类
export class ArrayUtil {
  // 判断数组是否为空
  static arrayIsValid(arr) {
    if (arr && (typeof arr !== 'undefined') && Array.isArray(arr) && arr.length >= 0) {
      return true;
    }
    return false;
  }

  // 将数组编程二维数组
  static arrayToDu(arr, num) {
    const iconsArr = []; // 声明数组
    if (!arr) {
      return [];
    }
    arr.forEach((item, index) => {
      const page = Math.floor(index / num); // 计算该元素为第几个素组内
      if (!iconsArr[page]) { // 判断是否存在
        iconsArr[page] = [];
      }
      iconsArr[page].push(item);
    });
    return iconsArr;
  }

  // 数组去重
  static arrayRemoveDuplicate(arr) {
    return arr.filter((value, index, arr) => arr.indexOf(value) === index);
  }

  /**
   * 判断数组中是否包含值 返回true或false
   * @param {数组} array
   * @param {值} val
   */
  static contain(array, val) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === val) {
        return true;
      }
    }

    return false;
  }

  /**
   * 交换数组中值的位置
   *
   */
  static exchange(array, sourceField, exField) {
    for (let i = 0; i < sourceField.length; i++) {
      let sourceIndex = array.indexOf(sourceField[i]);
      let exIndex = array.indexOf(exField[i]);

      let temp = exIndex;

      array[sourceIndex] = exField[i];
      array[temp] = sourceField[i];
    }
  }
}

// JSON工具
export class JSONUtil {
  /**
   * 将对象转换成只包含自生属性的json对象
   * @param {对象} objClass
   */
  static classToJSON(objClass) {
    let objKeys = Object.keys(objClass);

    let objJson = {};

    objKeys.forEach((elem) => {
      if (objClass[elem] && typeof objClass[elem] !== 'undefined') {
        objJson[elem] = objClass[elem];
      }
    });

    return objJson;
  }

  /**
   * 将json对象转换成对象
   * @param {json对象}objJSON
   * @param {对象} objClass
   */
  static jsonToClass(objJSON, objClass) {
    let objKeys = Object.keys(objClass);
    objKeys.forEach((elem) => {
      if (objJSON[elem] && typeof objJSON[elem] !== 'undefined') {
        objClass[elem] = objJSON[elem] || null;
      }
    });
  }
}

export function generateUUID() {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
