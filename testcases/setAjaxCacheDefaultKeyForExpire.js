test("jQuery.setAjaxCacheDefaultKey() - set default key string", function() {
  $.setAjaxCacheDefaultKey('string-key');

  successCacheAjax({
      url: '/script',
      key: 'string-key'
    });

  ok($.cacheAjaxData.get('string-key'),'have string-key');

  $.expireAjaxCache();

  ok(!$.cacheAjaxData.get('string-key'),'string-key expired');
})

test("jQuery.setAjaxCacheDefaultKey() - set default key function", function() {
  $.setAjaxCacheDefaultKey(function(){
    return 'function-key';
  })

  successCacheAjax({
      url: '/script',
      key: 'function-key'
    });

  ok($.cacheAjaxData.get('function-key'),'function-key exist');

  $.expireAjaxCache();

  ok(!$.cacheAjaxData.get('function-key'),'function-key expired');
})
