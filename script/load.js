var addScript = function(key, data, scriptSrc) {
  var js = document.createElement('script');
  js.src = scriptSrc;
  js.type = 'text/javascript';
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(js);
};

var load = function(data, callback) {
  if(isArray(data)){
      each(data, addScript);
  } else addScript(data);

  callback(data);
};

var arr2 = 'script/script1.js';
var arr = [
  'script/script1.js',
  'script/script2.js',
  'script/script3.js',
  'script/script4.js',
  'script/script5.js'
];

load(arr, function(src){
  console.log(src);
});
