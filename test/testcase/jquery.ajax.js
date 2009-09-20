test("jQuery.ajax() - success callbacks", function() {
  expect( 8 );
  stop();

  jQuery(document).ajaxStart(function(){
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
    complete: function(){ ok(true, "complete"); start(); }
  });
});
