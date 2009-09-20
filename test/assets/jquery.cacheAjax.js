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
 *                       $.expireAjaxCache()  // default document.location.hash
 *                           $.setAjaxCacheDefaultKey = 'string' // set default key
 *                           $.setAjaxCacheDefaultKey =  function() {}
*/

(function($) {
  cacheAjax = {
    // cacheAjaxData(get,add,del,data)
    cacheAjaxData   : {
      get  : function(key) {
        r = $.cacheAjaxData.data[key.toString()]; // result
        // unexist or expired
        return (!r || (r[1] && (new Date()).getTime() > r[1])) ? false : r[0];
      },

      add  : function(key,value,timeout) { // default timeout
        timeout = timeout ? ((new Date()).getTime() + timeout) : ($.cacheAjaxData.Timeout || false);
        $.cacheAjaxData.data[key.toString()] = [value,timeout];
      },

      del  : function(key) {
        if(key){
          if(key instanceof RegExp){
            // regexp
            for (var i in $.cacheAjaxData.data) {
              if(key.test(i)){ $.cacheAjaxData.data[i] = false; };
            };
          }else{
            // string
            $.cacheAjaxData.data[key.toString()] = false;
          };
        }else{
          // default key
          if($.cacheAjaxData.defaultKey instanceof Function){
            key = $.cacheAjaxData.defaultKey.call(this).toString()
          }else{
            key = $.cacheAjaxData.defaultKey.toString()
          }
          $.cacheAjaxData.data[key] = false;
        }
      },
      data : {},
      default : {
          type:     'GET',
          dataType: 'script',
        },
      Timeout: false,
      defaultKey: document.location.hash
    },

    cacheAjax       : function(para) {
      opt = $.extend({}, $.cacheAjaxData.default , para);

      opt.success = function(e) {
        $.cacheAjaxData.add(cache_key,e,opt.timeout);
        if(opt.dataType == 'script'){ eval(e) };
        if(para.success){ para.success.call(this,e) };
      };

      if(opt.type == 'GET') {
        // customize cache key
        var cache_key = opt.key || (opt.url + opt.data); //FIXME cache key -> real url

        // force send ajax request
        result = opt.force ? false : $.cacheAjaxData.get(cache_key);

        if(result){
          eval(result);
          if(para.success){ para.success.call(this,result) };
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
    },

    setAjaxCacheDefaultKey: function(value) {
      $.cacheAjaxData.defaultKey = value;
    }
  };

  $.extend(cacheAjax);
  $.fn.extend(cacheAjax);
})(jQuery);
