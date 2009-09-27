test("jQuery.setCacheDefaultKey() - set default key string", function() {
  $.setCacheDefaultKey('string-key');

  successCacheAjax({
      url: '/script',
      key: 'string-key'
    });

  ok($.getCache('string-key'),'have string-key');

  $.expireCache();

  ok(!$.getCache('string-key'),'string-key expired');
})

test("jQuery.setCacheDefaultKey() - set default key function", function() {
  $.setCacheDefaultKey(function(){
    return 'function-key';
  })

  successCacheAjax({
      url: '/script',
      key: 'function-key'
    });

  ok($.getCache('function-key'),'function-key exist');

  $.expireCache();

  ok(!$.getCache('function-key'),'function-key expired');
})
