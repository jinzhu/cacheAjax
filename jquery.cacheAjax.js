/**
 * Copyright (c) 2009 Zhang Jinzhu ( wosmvp@gmail.com )
 * Dual licensed under the MIT and GPL
 *
 *   cacheAjax        -> 
 *                       force new ajax request
 *                           $.cacheAjax({ force : true }) // force new ajax request 
 *                       cache key
 *                           $.cacheAjax({ key : customized_key }) // customize 
 *                           url + data                            // default key
 *                       setTimeout
 *                           $.cacheAjax({ timeout : 2000 }) // 2 seconds
 *                           $.setAjaxCacheTimeout(2000)     // 2 seconds, global default
 *                           $.setAjaxCacheTimeout(false)    // never expire
 *
 *   expireAjaxCache  ->
 *                       $.expireAjaxCache(/regexp/)
 *                       $.expireAjaxCache('string-key')
 *                       $.expireAjaxCache() // default
*/

(function($) {
  $.fn.extend({
    // cacheAjaxData(get,add,del,data)
    cacheAjaxData   : {
      get  : function(key) {
        r = $.cacheAjaxData.data[key]; // result
        // unexist or expired
        return (!r || (r[1] && (new Date()).getTime() > r[1])) ? false : r[0];
      },

      add  : function(key,value,timeout) { // default timeout
        timeout = timeout ? ((new Date()).getTime() + timeout) : ($.cacheAjaxData.Timeout || false);
        $.cacheAjaxData.data[key] = [value,timeout];
      },

      del  : function(key) {
        if(key){
          // regexp
          if(key instanceof RegExp){
            for (var i in $.cacheAjaxData.data) {
              if(key.test(i)){ $.cacheAjaxData.data[i] = false; };
            };
          };

          // string
          $.cacheAjaxData.data[key] = false;
        }else{
          // default
          //FIXME make configurable?
          $.cacheAjaxData.data[document.location.hash] = false;
        }
      },
      data : {},
      default : {
          type:     'GET',
          dataType: 'script',
        },
      Timeout: false
    },

    cacheAjax       : function(para) {
      opt = $.extend({}, $.cacheAjaxData.default , para);

      opt.success = function(e) {
        $.cacheAjaxData.add(cache_key,e,opt.timeout);
        eval(e) if opt.dataType == 'script';
        para.success.call(this,e) if para.success
      }

      if(opt.type == 'GET') {
        // customize cache key
        var cache_key = opt.key || (opt.url + opt.data); //FIXME cache key -> real url

        // force send ajax request
        result = opt.force ? false : $.cacheAjaxData.get(cache_key);

        if(result){
          eval(result);
        }else{
          $.ajax($.extend({},opt ,{dataType: 'text'}))
        };
      }else{
        $.ajax(para);
      };
    },

    expireAjaxCache : function(key) {
      $.cacheAjaxData.del(key);
    },

    setAjaxCacheTimeout: function(value) {
      $.cacheAjaxData.Timeout = value;
    }
  });
})(jQuery);
