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
          success: function(e) {
                     $.cacheAjaxData.add(cache_key,e);
                     eval(e);
                   }
        }
    },

    cacheAjax       : function(para) {

      opt = $.extend({}, $.cacheAjaxData.default , para);

      if(opt.type == 'GET' && opt.dataType == 'script') {
        // customize cache key
        var cache_key = opt.key || (opt.url + opt.data); //FIXME cache key -> real url

        // force send ajax request
        result = opt.force ? false : $.cacheAjaxData.get(cache_key);

        if(result){
          eval(result);
        }else{
          $.ajax(opt)
        };
      }else{
        $.ajax(opt);
      };
    },

    expireAjaxCache : function(key) {
      $.cacheAjaxData.del(key);
    }
  });
})(jQuery);
