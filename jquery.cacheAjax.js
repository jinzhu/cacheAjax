/**
 * Copyright (c) 2009 Zhang Jinzhu ( wosmvp@gmail.com )
 * Dual licensed under the MIT and GPL
 * TODO: 
 *   cacheAjax        -> 
 *                        cache GET request
 *                        url + data as cache key
 *                        force new ajax request
 *                        pass cache key
 *                        work with DataType 'xml','html','script','json'
 *                        set Lifetime/default lifetime
 *   expireAjaxCache  -> string,/regexp/,default(current_url)
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
      add  : function(key,value,lifetime) { // default lifetime
        lifetime = lifetime ? ((new Date()).getTime() + lifetime) : false
        $.cacheAjaxData.data[key] = [value,lifetime]
      },
      del  : function(key) {
        r = $.cacheAjaxData.data[key]; // result
        if(r){ $.cacheAjaxData.data[key] = false };
      },
      data : {}
    },

    cacheAjax       : function() {
    },

    expireAjaxCache : function() {
    }
  });
})(jQuery);
