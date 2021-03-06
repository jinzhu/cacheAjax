successCacheAjax = function(opt) {
  opt = $.extend({},{
        url: url("/script"),
        beforeSend: function(xhr){
          ok(true, "beforeSend");
          xhr.setRequestHeader("Accept", "text/javascript");
        },
        success:  function(){ ok(true, "success"); },
        error:    function(){ ok(false, "error"); },
        complete: function(){ ok(true, "complete"); },
        async: false,
        dataType: 'script'
      },
      opt
    );

  jQuery.cacheAjax(opt);
};

test("jQuery.cacheAjax() - successful cache/invoke", function() {
  expect(7); //beforeSend,2 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({ url: '/script',key: 'cache' });
  successCacheAjax({ url: '/script',key: 'cache' });

  start();
});

test("jQuery.cacheAjax() - pass function", function() {
  expect(8); //beforeSend,3 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({
    url: '/script',
    key: 'cache_pass_function',
    success: function(e){
        equals('ok(true, "ajax call back")',e,'save ajax response correctly');
      }
    });

  successCacheAjax({
    url: '/script',
    key: 'cache_pass_function',
    success: function(e){
        ok(true,'passed function');
        equals('ok(true, "ajax call back")',e,'save ajax response correctly');
      }
    });

  start();
});

test("jQuery.cacheAjax() - force new request", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({
      url: '/script',
      key: 'force_to_request',
      force: true
    });

  successCacheAjax({
    url: '/script',
    key: 'force_to_request',
    force: true
    });

  start();
});
