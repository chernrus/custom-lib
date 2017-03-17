

var arr2 = 'script/script1.js';
var arr = [
  'https://example.com/404.js',
  'script/script1.js',
  'script/script2.js',
  'script/script3.js',
  'script/script4.js',
  'script/script5.js'
];

var f = function() {
  console.log('Success');
};

loadJs(arr, f);

//script.onload//поставить на каждый файл onload*/
//window.onload -> свое событие-> по событию callback

// callback(data);

// removeJs(arr2);

// var script = addScript(data[key]);
// jsContainer.appendChild(script);
// script.onerror = function() {
//   alert('Error: ' + this.src);
// };
