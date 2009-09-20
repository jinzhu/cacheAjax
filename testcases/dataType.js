test("jQuery.cacheAjax() - dataType json", function() {
  expect(5); // beforeSend,3 success,complete
  stop();

  successCacheAjax({
    url: '/json',
    key: 'json-cache',
    dataType: 'json'
  });

  successCacheAjax({
    url: '/json',
    key: 'json-cache',
    dataType: 'json',
    success: function(e){
        equals(e.email,'wosmvp@gmail.com','json save correctly');
        equals(e.name,'jinzhu','json save correctly');
      }
    });

  start();
});
