test("jQuery.expireAjaxCache() - expire cache /regexp/ ", function() {
  expect(16); // 4 beforeSend,4 success,4 complete,4 ajax call back
  stop();

  successCacheAjax({
      url: '/ajax',
      key: 'expire_cache',
    });

  successCacheAjax({
      url: '/ajax',
      key: 'expire_cache_another',
    });

  $.expireAjaxCache(/expire/)

  successCacheAjax({
    url: '/ajax',
    key: 'expire_cache',
    });

  successCacheAjax({
    url: '/ajax',
    key: 'expire_cache_another',
    });

  start();
});

test("jQuery.expireAjaxCache() - expire cache string", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({
      url: '/ajax',
      key: 'string_expire_cache',
    });

  $.expireAjaxCache('string_expire_cache')

  successCacheAjax({
    url: '/ajax',
    key: 'string_expire_cache',
    });

  start();
});
