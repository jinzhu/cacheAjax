test("jQuery.cacheAjax() - setTimeout", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  successCacheAjax({
      url: '/ajax',
      key: 'timeout',
      timeout : 100,
    });

  window.setTimeout("successCacheAjax({ url: '/ajax', key: 'timeout', timeout : 2000, });start();",150);
});

test("jQuery.setAjaxCacheTimeout() - global default timeout", function() {
  expect(8); // 2 beforeSend,2 success,2 complete,2 ajax call back
  stop();

  $.setAjaxCacheTimeout(100)
  successCacheAjax({
      url: '/ajax',
      key: 'default_timeout',
    });

  window.setTimeout("successCacheAjax({ url: '/ajax', key: 'default_timeout', timeout : 100 });start();",110);

  $.setAjaxCacheTimeout(false); //reset default timeout
});
