test("jQuery.expireCache() - expire cache /regexp/ ", function() {
  expect(16); // 4 beforeSend,4 success,4 complete,4 ajax call back
  stop();

  successCacheAjax({
      url: '/script',
      key: 'expire_cache',
    });

  successCacheAjax({
      url: '/script',
      key: 'expire_cache_another',
    });

  $.expireCache(/expire/)

  successCacheAjax({
    url: '/script',
    key: 'expire_cache',
    });

  successCacheAjax({
    url: '/script',
    key: 'expire_cache_another',
    });

  start();
});

test("jQuery.expireCache() - expire cache string", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({
      url: '/script',
      key: 'string_expire_cache',
    });

  $.expireCache('string_expire_cache')

  successCacheAjax({
    url: '/script',
    key: 'string_expire_cache',
    });

  start();
});
