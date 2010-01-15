/**
 * Copyright (c) 2009 Zhang Jinzhu ( wosmvp@gmail.com )
 * Dual licensed under the MIT and GPL
 *
 *   cacheAjax        -> // can use all $.ajax's setting options.
 *                       force new ajax request
 *                           $.cacheAjax({ force : true })         // force a new ajax request 
 *                       cache key
 *                           $.cacheAjax({ key : customized_key }) // customize 
 *                           url + data                            // default key
 *                       setTimeout
 *                           $.cacheAjax({ timeout : 2000 }) // expire this ajax's response after 2 seconds
 *                           $.setCacheTimeout(2000)         // set global timeout, all cached result will be expire after 2 seconds.
 *                           $.setCacheTimeout(false)        // set global timeout as false, this means never expire.
 *
 *   expireCache  ->
 *                       $.expireCache(/regexp/)
 *                       $.expireCache('string-key')
 *                       $.expireCache()  // expire defaultKey,defaultKey is document.location.hash
 *                         // Set Default Key
 *                         $.setCacheDefaultKey('string')
 *                         $.setCacheDefaultKey(function() {})
 *
 *   addCache     ->    $.addCache(key,value,timeout);
 *
 *   getCache     ->    $.getCache(key)
*/

(function($) {
  var cacheAjax = (function() {
    var defaultKey = document.location.hash, defaultTimeout, data = {};

    function get(/*String*/ key) {
      var value = data[ key];
      return (!value || (value[1] && (new Date()).getTime() > value[1])) ? false : value[0];
    }

    function add(/*String*/ key,/*String*/ value,/*Number*/ timeout) {
      timeout   = timeout || defaultTimeout;
      timeout   = timeout && ((new Date()).getTime() + timeout);
      data[key] = [value, timeout];
    }

    function remove(/*String*/ key) {
      if (key) {
        if(key instanceof RegExp) {
          for (var i in data) { if (key.test(i)) { data[i] = false;} }
        } else {
          data[key] = false;
        }
      } else {
        // default key
        if (defaultKey instanceof Function) {
          key = defaultKey.call(this).toString();
        } else {
          key = defaultKey.toString();
        }
        data[key] = false;
      }
    }

    function ajax(/*Object*/ oldAjaxSetting) {
      var newAjaxSetting = $.extend( {type: 'GET',dataType : 'script'} , oldAjaxSetting);

      if (newAjaxSetting.type == 'GET') {
        // customize/default cache key
        var cache_key = newAjaxSetting.key || (newAjaxSetting.url + newAjaxSetting.data);

        newAjaxSetting.success = function(e) {
          add(/*String*/ cache_key,/*Response*/ e,/*Integer*/ newAjaxSetting.timeout);
          if (newAjaxSetting.dataType == 'script') { eval(e); }
          if (oldAjaxSetting.success) { oldAjaxSetting.success.call(this,e); }
        };

        // force a new ajax request or get cached response.
        var result = newAjaxSetting.force ? false : get(cache_key);

        if (result) {
          if (newAjaxSetting.dataType == 'script') { eval(result); }
          if (oldAjaxSetting.success) { oldAjaxSetting.success.call(this,result); }
          var complete = oldAjaxSetting.complete || jQuery.ajaxSettings.complete;   // FIXME Other jQuery Global Event
          if(complete){ complete.call(this,result); }
        }else{
          // if dataType is 'script',reset it to 'text' to cache the response.
          $.ajax($.extend({}, newAjaxSetting, (newAjaxSetting.dataType == 'script') ? {dataType: 'text'} : {}));
        }
      } else {
        $.ajax(oldAjaxSetting);
      }
    }

    return {
      cacheAjax          : ajax,
      setCacheTimeout    : function(value) { defaultTimeout = value; },
      setCacheDefaultKey : function(value) { defaultKey     = value; },
      expireCache        : function(key) { return remove(key); },
      getCache           : function(key) { return get(key);    },
      addCache           : function(key,value,timeout) { return add(key,value,timeout); }
    }
  })();

  $.extend(cacheAjax);
  $.fn.extend(cacheAjax);
})(jQuery);
