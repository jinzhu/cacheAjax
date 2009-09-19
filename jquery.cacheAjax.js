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
        if(r){ $.cacheAjaxData.data[key] = false }; //FIXME current_url,regexp
      },
      data : {}
    },

    cacheAjax       : function(para) {
    //FIXME merge opt
      if(para.type == 'GET' && (!para.dataType || para.dataType == 'script')) {
        //FIXME make cache key looks like real url
        var cache_key = para.url + para.data;
        result = $.cacheAjaxData.get(cache_key);

        //FIXME force send ajax request
        if(result){
          eval(result);
        }else{
          $.ajax({
            url:  para.url,
            type: para.type,
            data: para.data,
            dataType: para.dataType,
            //FIXME merge function
            success: function(e) {
                       $.cacheAjaxData.add(cache_key,e);
                       eval(e);
                     }
             });
        };
      }else{
        $.ajax(para);
      };
    },

    expireAjaxCache : function(key) {
      $.cacheAjaxData.del(key);
    }
  });
})(jQuery);
