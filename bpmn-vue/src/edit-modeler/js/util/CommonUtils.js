export function isNeedUpdate(newVal,oldVal) {
    return newVal!== undefined && newVal !== oldVal;
}
export function findObjFromArrayByField(array,fieldName,fieldVal) {
    let targert = {};
    for(let obj of array){
        if(obj[fieldName] == fieldVal){
            targert = obj;
            break;
        }
    }
    return targert;
}
export function  isBlank(str) {
    return str === undefined || str.length == 0;
}

// 删除之后去掉空洞
export function  removArrElement(values,memoryValue,expectValue) {
  for(var i = 0;i < values.length;i++){
    console.log('values[i]["$type"]====='+values[i]["$type"]);
    if(values[i][memoryValue] === expectValue){
      values[i] = {}
    }
  }
  let arr = [];
  values.forEach(value => {
    if (value[memoryValue]) {
      arr.push(value);
    }
  })
  return arr;
}

