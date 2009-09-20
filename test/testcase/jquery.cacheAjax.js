test("jQuery.cacheAjax() - success callbacks", function() {
  expect(3);
  stop();

  jQuery.cacheAjax({
    url: url("/ajax"),
    beforeSend: function(){ ok(true, "beforeSend"); },
    success: function(){ ok(true, "success"); },
    error: function(){ ok(false, "error"); },
    complete: function(){ ok(true, "complete");start(); }
  });
});

test("jQuery.ajax() - error callbacks", function() {
  expect(3);
  stop();

  jQuery.ajaxSetup({ timeout: 5 });

  jQuery.cacheAjax({
      url: url("/ajax?wait=1"),
      beforeSend: function(){ ok(true, "beforeSend"); },
      success: function(){ ok(false, "success"); },
      error: function(){ ok(true, "error"); },
      complete: function(){ ok(true, "complete"); start(); }
  });
});
