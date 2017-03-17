(function(global) {
  "use strict";

  /*Функция проверки на пустоту
  *@param () - entity любой тип
  */
  var isEmpty = function (entity) {
    if(!entity) {
      return true;
    } else if(isNumber(entity) || isString(entity) || isArray(entity)) {
      var length = entity.length;
      if(length <= 0) return true;
    } else if(isObject(entity)) {
      for(var key in entity) {
        return false;
      }
      return true;
    }
    return false;
  };

  /*isArray, isObject, isFunction, isNumber, isString, isNull - Проверка параметров на соответствующие типы
  * @param {Array} arr - массив
  * @param {Object} obj - объект
  * @param {Function} func - функция
  * @param {Number} num - числовая переменная.
  * @param {String} str - строка.
  * @param {Null} nul - null.
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

  var isNumber = function (num) {
    return (Object.prototype.toString.call(num) == "[object Number]");
  };

  var isString = function (str) {
    return (Object.prototype.toString.call(str) == "[object String]");
  };

  var isNull = function (nul) {
    return (Object.prototype.toString.call(nul) == "[object Null]");
  };

  /*Возвращает тип данных
  * @param() entity любой тип данных
  */
  var getType = function (entity) {
    var type = Object.prototype.toString.call(entity);
    const regex = /\object (\w*)\]/;
    var m;
    if ((m = regex.exec(type)) !== null) {
       return m[1];
    }
  };

  /*
  * each() - метод, выполняющий перебор элепментов массива или объекта (Универсальный forEach)
  * @param {Object} source Входящий объект
  * @param {Array} source Входящий массив
  * @param {Function} callback Функция обратного вызова
  * @param scope
  */

  var each = function (source, callback, scope) {

    if (!isFunction(callback)) {
      throw new TypeError(callback + ' is not a function!');
    }

    if (isArray(source)) {
      var key = 0,
      length = source.length;
      for ( key = 0 ; key < length; key++) {
        callback.call(scope, key, source, source[key]);
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

  /* Функция глубокого копирования
  * @param {Array} target - целевой массив
  * @param {Array} source - исходный массив
  * @param {Object} target - целевой объект
  * @param {Object} source - исходный объект
  * @param {Boolean} mode - true - глубокое копирование, false or undefined - простое
  */
  var deepClone = function (target, source, mode) {
    if(Object.prototype.toString.call(target) != Object.prototype.toString.call(source)){
      throw new Error('Target and source are different types!');
    }

    if(mode == true) {
      if(!source || typeof source != 'object'){
        return source;
      }

      var copy;
      if(isArray(source)) {
        copy = [];
        each(source, function(key) {
          target[key] = source[key];
          copy[key] = clone(target[key],source[key], true);
        });
        return copy;
      } else if(isObject(source)) {
        copy = {};
        each(source, function(key) {
          if (source.hasOwnProperty(key)) {
            target[key] = source[key];
            copy[key] = clone(target[key], source[key], true);
          }
        });
        return copy;
      } else throw new TypeError ('Wrong types of arguments!');
    } else if(!mode){
      each (source, function(key){
        target[key] = source[key];
      });
      return source;
    } else {
      throw new TypeError('Wrong type of \'mode\'. Must be \'true\' or \'false\'!');
    }
  };

  /* Функция AJAX
  *@param (Object) settings - объект, содержащий настройки запроса
  */
  var ajax = function (settings) {
    var ajaxSetting = {
      url: '/',
      method: 'GET',
      data: {},
      async: true,
      headers: '',
      dataType: '*/*',
      success: function(){
        alert('Success');
      },
      error: function(){
        alert('Error');
      }
    }
    //Установка конфигураций
    each(settings, function(key) {
      if (settings.hasOwnProperty(key)) {
        ajaxSetting[key] = settings[key];
      }
    });

    var xhr = new XMLHttpRequest();

    xhr.open(ajaxSetting.method, ajaxSetting.url, ajaxSetting.async);
    xhr.setRequestHeader('Accept', ajaxSetting.dataType);
    if(ajaxSetting.headers) {
      each(ajaxSetting.headers,function(key){
        xhr.setRequestHeader(key, ajaxSetting.headers[key]);
      });
    }
    xhr.send(ajaxSetting.data);

    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;

      if (xhr.status != 200) {
        ajaxSetting.error(xhr.status, xhr.statusText,xhr.responseText);
      } else {
        ajaxSetting.success(xhr.responseText);
      }
    };
  };

  /*Добавление/удаление ресурсов
  */
  /*Проверка всх состояний
  *@param(Object) state состояния загрузки каждого ресурса
  */
  var checkState = function(state) {
    for(var key in state) {
      if(!state[key]){
        return false;
      }
    }
    return true;
  }

  /*Добавление в элемент DOM дерева скрипта
  * @param(String) - uri скрипта
  * @param(DOM Element) - контейнер скриптов
  */
  var addScript = function(scriptSrc, head, state, callback) {
    var js = document.createElement('script');
    js.src = scriptSrc;
    js.type = 'text/javascript';
    js.setAttribute('defer','');
    head.appendChild(js);
    js.onload = function(){
      state[scriptSrc] = true;
      //проверка
      if(checkState(state)){
        callback();
      }
    };
    js.onerror = function() {
      alert('Error:' + this.src);
    };
  };

  /*Загрузка скриптов main function
  *@param (Array String/String) - Массив строк или массив, uri ресурсов
  *@param (Function) - callback после загрузки всех скриптов
  */

  var loadJs = function(data, callback) {
    var state = {};
    each(data, function(key, data) {
      state[data[key]] = false;
    });

    var head = document.head;

    if(isArray(data)) {
        each(data, function(key, data) {
           addScript(data[key], head, state, callback);
        });
    } else addScript(data[key], head, state, callback);
  };

  /*Удаление скрипта
  * @param (String) scriptSrc uri ресурса на удаление
  */
  var removeJs = function(scriptSrc) {
    var alltargets = document.getElementsByTagName('script');
    var i = 0,
      length = alltargets.length - 1;
    while(length)
    {
      if (alltargets[length].src && alltargets[length].src.indexOf(scriptSrc)!= -1) {
        alltargets[length].parentNode.removeChild(alltargets[length]);
      }
      length--;
    }
  };

  global.isEmpty = isEmpty;
  global.getType = getType;
  global.each = each;
  global.clone = deepClone;
  global.isArray = isArray;
  global.isObject = isObject;
  global.isFunction = isFunction;
  global.isNumber = isNumber;
  global.isString = isString;
  global.isNull = isNull;
  global.ajax = ajax;
  global.loadJs = loadJs;
  global.removeJs = removeJs;

})(this);
