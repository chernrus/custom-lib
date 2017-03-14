//js doc
var isArray = function (arr) {
  return (Object.prototype.toString.call(arr) == "[object Array]");
};

var isObject = function (obj) {
 return (Object.prototype.toString.call(obj) == "[object Object]");
};

var isFunction = function (func) {
  return (Object.prototype.toString.call(func) == "[object Function]");
};

/*
* each() - метод, выполняющий перебор элепментов массива или объекта (Универсальный forEach)
* @param {Object} source Входящий объект
* @param {Array} source Входящий массив
* @param {Function} callback Функция обратного вызова
* @param scope
*/

var each = function (source, callback, scope) {
  //проверка функции
  if (!isFunction(callback)) {
    throw new TypeError(callback + ' is not a function!');
  }

  if (isArray(source)) {
    var i = 0,
    length = source.length;
    for ( i ; i < length; i++) {
      if (Array.prototype.hasOwnProperty.call(source, i)) {
        callback.call(scope, source[i], i, source);
      }
    }
  } else if (isObject(source)) {
    for(var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        callback.call(scope, source[key], key, source);
      }
    }
  } else {
    throw new TypeError('The function takes an object or an array!');//ошибка
  }
};

var obj = {
  b: {d: 1},
  c: 2
};
var arr = [1,2,3,45,0,['a',3]];

var print = function(a){
  console.log(a);
};

for ( var key in obj) {
  console.log(obj[key]);
}

for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

console.log('-------');
each(obj,print);
each(arr,print)
