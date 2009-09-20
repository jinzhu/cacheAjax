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

// doesn't work with firefox-3.5/linux? works very well with opera/linux,chromium/linux
test("jQuery.cacheAjax() - dataType xml", function() {
  expect(4); // beforeSend,2 success,complete
  stop();

  successCacheAjax({
    url: '/xml',
    key: 'xml-cache',
    dataType: 'xml'
  });

  successCacheAjax({
    url: '/xml',
    key: 'xml-cache',
    dataType: 'xml',
    success: function(e){
        equals(1,$(e).find('name').size(),'xml element number')
      }
    });
  start();
});
