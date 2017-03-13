var clone = function (target, source, mode) {
  var copy;
  // if(Object.prototype.toString.call(target) == Object.prototype.toString.call(source)) {
    if (typeof target != "object" || source == null || mode == false) return source;

    var i = 0;
    if(source instanceof Array) {
      copy = [];
      for(i; i < source.length; i++) {
        copy[i] = clone([],source[i]);
      }
      return copy;
    }

    if(source instanceof Object) {
       copy = {};
      for (var attr in source) {
        if (source.hasOwnProperty(attr)) {
          copy[attr] = clone(target[attr], source[attr]);
          target[attr] = copy[attr];
        }
      }
      return copy;
    }

  // }
};

var a = {
   b: {d: 'd'}
}

var copy = {j: 'j'};
var obj = {
  a: 'abc',
  b:  {
    c: 'bcd',
    d: 'd'
  }
};

clone(copy, obj, true);
console.log(copy);

var c = clone({}, a, true);

console.log(a.b);
console.log(c.b);
a.b = {e:'e'};
console.log(a.b);
console.log(c.b);

clone(c, a, true);
console.log(c);
var obj1 = {
  first: 'a',
  second: 'b'
};

var obj2 = {
  third: 'c'
};

var obj3 = {
  a: {pr1: 'd', pr2: 'e'},
  b: {pr1: 'f', pr2: 'g'},
  c: 'c'
}
var obj4 = {};
clone(obj2, obj3, true);
console.log(obj2);

var arr1 = ['a','b'];
var arr2 = ['c'];
var arr3 = ['d', ['e','g']]

// arr2 = clone2(arr1);
// console.log(arr2);
// arr1 = clone2(arr3);
// console.log(arr1);
// console.log(arr2);
// console.log(arr3);
//
// var obj4 = clone2(obj1);
// console.log(obj4);
// obj1 = clone(obj3);
// console.log(obj1);
// console.log(obj4);
// console.log(obj3);


// obj2 = clone(arr2);
// console.log(obj2);
// console.log(Object.prototype.toString.call(obj2));
// if(Object.prototype.toString.call(this) == Object.prototype.toString.call(source)) {
//
//
//     } else {
//       console.log("Error: different type of object!")
//     }

// var clone2 = function(source) {
//   if (null == source || "object" != typeof source) return source;
//   var copy = source.constructor();
//   for (var attr in source) {
//     if (source.hasOwnProperty(attr)) copy[attr] = source[attr];
//   }
//   return copy;
// };
//
// var clone3 = function(source) {
//   return source;
// };
