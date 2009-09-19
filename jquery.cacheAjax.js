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
    cacheAjaxData   : {
      get  : function(key) {
      },
      add  : function(key,value,lifetime) {
      },
      del  : function(key) {
      },
      data : {}
    },
    cacheAjax       : function() {
    },
    expireAjaxCache : function() {
    }
  });
})(jQuery);
