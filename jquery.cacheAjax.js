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
 *                           $.setAjaxCacheDefaultKey('string') // set default key
 *                           $.setAjaxCacheDefaultKey(function() {})
*/

(function($) {
  cacheAjax = {
    // _cacheData(get,add,del,data)
    _cacheData   : {
      get  : function(key) {
        r = $._cacheData.data[key.toString()]; // result
        // unexist or expired
        return (!r || (r[1] && (new Date()).getTime() > r[1])) ? false : r[0];
      },

      add  : function(key,value,timeout) { // default timeout
        timeout = timeout ? ((new Date()).getTime() + timeout) : ($._cacheData.Timeout || false);
        $._cacheData.data[key.toString()] = [value,timeout];
      },

      del  : function(key) {
        if(key){
          if(key instanceof RegExp){
            // regexp
            for (var i in $._cacheData.data) {
              if(key.test(i)){ $._cacheData.data[i] = false; };
            };
          }else{
            // string
            $._cacheData.data[key.toString()] = false;
          };
        }else{
          // default key
          if($._cacheData.defaultKey instanceof Function){
            key = $._cacheData.defaultKey.call(this).toString()
          }else{
            key = $._cacheData.defaultKey.toString();
          }
          $._cacheData.data[key] = false;
        }
      },
      data : {},
      Timeout: false,
      defaultKey: document.location.hash
    },

    cacheAjax       : function(para) {
      opt = $.extend( {type: 'GET',dataType : 'script'} , para);

      opt.success = function(e) {
        $._cacheData.add(cache_key,e,opt.timeout);
        if(opt.dataType == 'script'){ eval(e) };
        if(para.success){ para.success.call(this,e) };
      };

      if(opt.type == 'GET') {
        // customize cache key
        var cache_key = opt.key || (opt.url + opt.data); //FIXME cache key more like real url

        // force send ajax request
        result = opt.force ? false : $._cacheData.get(cache_key);

        if(result){
          // FIXME doesn't care about jQuery Global Event ... ( set global: false? )
          if(opt.dataType == 'script'){ eval(result) };
          complete = para.complete || jQuery.ajaxSettings.complete ;
          if(complete){ complete.call(this,result) };
          if(para.success){ para.success.call(this,result) };
        }else{
          // if dataType is 'script',reset to 'text'
          $.ajax($.extend({},opt,(opt.dataType == 'script') ? {dataType: 'text'} : {}));
        };
      }else{
        $.ajax(para);
      };
    },

    expireCache : function(key) {
      $._cacheData.del(key);
    },

    setAjaxCacheTimeout: function(value) {
      $._cacheData.Timeout = value;
    },

    setAjaxCacheDefaultKey: function(value) {
      $._cacheData.defaultKey = value;
    }
  };

  $.extend(cacheAjax);
  $.fn.extend(cacheAjax);
})(jQuery);
