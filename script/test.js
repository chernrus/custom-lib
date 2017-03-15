var arr1=[];
var arr2 = [1,2,3]
deepClone(arr1,arr2,false);
console.log(arr1);


/* Функция копирования по ссылке
* @param {Array} source - исходный массив
* @param {Object} source - исходный объект
*/
var clone = function (source) {
  if(isArray || isObject) {
    return source;
  } else {
    throw new TypeError ('Wrong type of argument!')
  }
};
//
