test("jQuery.setCacheDefaultKey() - set default key string", function() {
  $.setCacheDefaultKey('string-key');

  successCacheAjax({
      url: '/script',
      key: 'string-key'
    });

  ok($.cacheAjaxData.get('string-key'),'have string-key');

  $.expireCache();

  ok(!$.cacheAjaxData.get('string-key'),'string-key expired');
})

test("jQuery.setCacheDefaultKey() - set default key function", function() {
  $.setCacheDefaultKey(function(){
    return 'function-key';
  })

  successCacheAjax({
      url: '/script',
      key: 'function-key'
    });

  ok($.cacheAjaxData.get('function-key'),'function-key exist');

  $.expireCache();

  ok(!$.cacheAjaxData.get('function-key'),'function-key expired');
})
