test("jQuery.cacheAjax() - set default cache key string", function() {
  $.setAjaxCacheDefaultKey('string-key');

  successCacheAjax({
      url: '/ajax',
      key: 'string-key'
    });

  ok($.cacheAjaxData.get('string-key'),'have string-key');

  $.expireAjaxCache();

  ok(!$.cacheAjaxData.get('string-key'),'string-key expired');
})

test("jQuery.cacheAjax() - set default cache key function", function() {
  $.setAjaxCacheDefaultKey(function(){
    return 'function-key';
  })

  successCacheAjax({
      url: '/ajax',
      key: 'function-key'
    });

  ok($.cacheAjaxData.get('function-key'),'function-key exist');

  $.expireAjaxCache();

  ok(!$.cacheAjaxData.get('function-key'),'function-key expired');
})