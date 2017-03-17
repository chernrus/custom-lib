var ajax = function (settings,callback, errback, complete) {
  var ajaxSetting = {
    url: '',
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

  each(settings, function(key) {
    if (settings.hasOwnProperty(key)) {
      ajaxSetting[key] = settings[key];
    }
  });

  var xhr = new XMLHttpRequest();

  xhr.open(ajaxSetting.method, ajaxSetting.url, ajaxSetting.async);
  xhr.setRequestHeader('Accept', 'application/' + ajaxSetting.dataType);
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

var formData = new FormData();
  formData.append('name', 'Ruslan');
  formData.append('phone', '71234567890');
  formData.append('email', 'mail@example.com')
  formData.append('text', 'abcdefghijklmnop');

//callback
var print =  function (res){
  var result = JSON.parse(res);
  console.log(result);
};
//errback
var showError = function(error){
  alert(error);
};

//вызов
ajax({
  url: 'https://test.em70.ru/rav/callback/',
  method: 'POST',
  async: true,
  data: formData,
  success: print,
  error: showError,
  dataType: 'javascript'
});
