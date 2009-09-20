test("jQuery.cacheAjax() - set default cache key string", function() {
  $.setAjaxCacheDefaultKey = 'string-key';

  successCacheAjax({
      url: '/ajax',
    });

  ok($.cacheAjaxData.get('string-key'),'set default cache key string');
})

test("jQuery.cacheAjax() - set default cache key function", function() {
  $.setAjaxCacheDefaultKey = function(){
    return 'function-key';
  };

  successCacheAjax({
      url: '/ajax',
    });

  ok($.cacheAjaxData.get('function-key'),'set default cache key string');
})
