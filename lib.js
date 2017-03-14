"use strict";

/*
*isArray, isObject, isFunction - Проверка параметров на соответствующие типы
* @param {Array} arr - массив
* @param {Object} obj - объект
* @param {Function} func - функция.
*/
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
    var key = 0,
    length = source.length;
    for ( key = 0 ; key < length; key++) {
      callback.call(scope, key, source[key], source);
    }
  } else if (isObject(source)) {
    for(key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        callback.call(scope, key, source[key], source);
      }
    }
  } else {
    throw new TypeError('The function takes an object or an array!');
  }
};

/* Функция копирования
* @param {Array} target - целевой массив
* @param {Array} source - исходный массив
* @param {Object} target - целевой объект
* @param {Object} source - исходный объект
* @param {Boolean}
*/

var clone = function (target, source, mode) {
  if(mode == false) { // не работает!
    target = source;
    return source;
  }

  if(!source || typeof source != 'object'){
    return source;
  }

  var copy;
  if(isArray(source)) {
    copy = [];
    each(source, function(key) {
      target[key] = source[key];
      copy[key] = clone(target[key],source[key]);
    });
    return copy;
  } else if(isObject(source)) {
    copy = {};
    each(source, function(key) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key];
        copy[key] = clone(target[key], source[key]);
      }
    });
    return copy;
  } else throw new TypeError ('Wrong types!');
};


/* Тесты */
var arr1 = [];

var arr2 = [1,2,54];

var copy = {j: 'j'};
var obj = {
  a: 'abc',
  b:  {
    c: 'bcd',
    d: 'd'
  }
};
