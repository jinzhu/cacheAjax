test("jQuery.cacheAjax() - success callbacks", function() {
  expect( 8 );
  stop();

  jQuery('body').ajaxStart(function(){
    ok( true, "ajaxStart" );
    }).ajaxStop(function(){
    ok( true, "ajaxStop" );
    start();
    }).ajaxSend(function(){
    ok( true, "ajaxSend" );
    }).ajaxComplete(function(){
    ok( true, "ajaxComplete" );
    }).ajaxError(function(){
    ok( false, "ajaxError" );
    }).ajaxSuccess(function(){
    ok( true, "ajaxSuccess" );
  });

  jQuery.cacheAjax({
    url: url("/ajax"),
    beforeSend: function(){ ok(true, "beforeSend"); },
    success: function(){ ok(true, "success"); },
    error: function(){ ok(false, "error"); },
    complete: function(){ ok(true, "complete"); }
  });
});


test("jQuery.ajax() - error callbacks", function() {
    stop();

    jQuery('body').ajaxStop(function(){
        ok( true, "ajaxStop" );
        start();
    });

    jQuery.ajaxSetup({ timeout: 5 });

    jQuery.cacheAjax({
        url: url("/ajax?wait=1"),
        beforeSend: function(){ ok(true, "beforeSend"); },
        success: function(){ ok(false, "success"); },
        error: function(){ ok(true, "error"); },
        complete: function(){ ok(true, "complete"); },
    })
});
