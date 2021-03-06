test("jQuery.cacheAjax() - setTimeout", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({
      url: '/script',
      key: 'timeout',
      timeout : 100,
    });

  window.setTimeout("successCacheAjax({ url: '/script', key: 'timeout', timeout : 2000, });start();",150);
});

test("jQuery.setCacheTimeout() - global default timeout", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  $.setCacheTimeout(100)
  successCacheAjax({
      url: '/script',
      key: 'default_timeout',
    });

  window.setTimeout("successCacheAjax({ url: '/script', key: 'default_timeout', timeout : 100 });start();",110);

  $.setCacheTimeout(false); //reset default timeout
});
