//js doc


var arr1=[];
var arr2 = [1,2,3]
deepClone(arr1,arr2,false);
console.log(arr1);
/*
*isArray, isObject, isFunction - Проверка параметров на соответствующие типы
* @param {Array} arr - массив
* @param {Object} obj - объект
* @param {Function} func - функция.
*/
// var isArray = function (arr) {
//   return (Object.prototype.toString.call(arr) == "[object Array]");
// };
//
// var isObject = function (obj) {
//  return (Object.prototype.toString.call(obj) == "[object Object]");
// };
//
// var isFunction = function (func) {
//   return (Object.prototype.toString.call(func) == "[object Function]");
// };

/*
* each() - метод, выполняющий перебор элепментов массива или объекта (Универсальный forEach)
* @param {Object} source Входящий объект
* @param {Array} source Входящий массив
* @param {Function} callback Функция обратного вызова
* @param scope
*/
//
// var each = function (source, callback, scope) {
//   //проверка функции
//   if (!isFunction(callback)) {
//     throw new TypeError(callback + ' is not a function!');
//   }
//
//   if (isArray(source)) {
//     var key = 0,
//     length = source.length;
//     for ( key = 0 ; key < length; key++) {
//       callback.call(scope, key, source[key], source);
//     }
//   } else if (isObject(source)) {
//     for(key in source) {
//       if (Object.prototype.hasOwnProperty.call(source, key)) {
//         callback.call(scope, key, source[key], source);
//       }
//     }
//   } else {
//     throw new TypeError('The function takes an object or an array!');
//   }
// };
