successCacheAjax = function(opt) {
  opt = $.extend({},{
        url: url("/ajax"),
        beforeSend: function(xhr){
          ok(true, "beforeSend");
          xhr.setRequestHeader("Accept", "text/javascript");
        },
        success:  function(){ ok(true, "success"); },
        error:    function(){ ok(false, "error"); },
        complete: function(){ ok(true, "complete");start(); },
        async: false,
        dataType: 'script'
      },
      opt
    );

  jQuery.cacheAjax(opt);
};

test("jQuery.cacheAjax() - success callbacks", function() {
  expect(4); //beforeSend,success,complete,ajax call back
  stop();
  successCacheAjax();
});

test("jQuery.ajax() - error callbacks", function() {
  expect(3);
  stop();

  jQuery.ajaxSetup({ timeout: 5 });

  jQuery.cacheAjax({
      url: url("/ajax?wait=1"),
      beforeSend: function(){ ok(true, "beforeSend"); },
      success: function(){ ok(false, "success"); },
      error: function(){ ok(true, "error"); },
      complete: function(){ ok(true, "complete"); start(); }
  });
});

test("jQuery.cacheAjax() - success cache/invoke", function() {
  expect(6); //beforeSend,2 success,complete,2 ajax call back
  stop();

  successCacheAjax({ url: '/ajax',key: 'cache' });
  successCacheAjax({ url: '/ajax',key: 'cache' });
});

test("jQuery.cacheAjax() - pass function to success", function() {
  expect(8); //beforeSend,4 success,complete,2 ajax call back
  stop();

  successCacheAjax({
    url: '/ajax',
    key: 'cache_pass_function',
    success: function(e){
        ok(true,'passed function');
        equals('ok(true, "ajax call back")',e,'save ajax response correctly');
      }
    });

  successCacheAjax({
    url: '/ajax',
    key: 'cache_pass_function',
    success: function(e){
        ok(true,'passed function');
        equals('ok(true, "ajax call back")',e,'save ajax response correctly');
      }
    });
});
