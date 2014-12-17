define("cellula/0.4.2/cellula-util",["./cellula-namespace"],function(require,exports,module){function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return"string"==typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g,h=gap,i=b[a];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(a)),"function"==typeof rep&&(i=rep.call(b,a,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,g=[],"[object Array]"===Object.prototype.toString.apply(i)){for(f=i.length,c=0;f>c;c+=1)g[c]=str(c,i)||"null";return e=0===g.length?"[]":gap?"[\n"+gap+g.join(",\n"+gap)+"\n"+h+"]":"["+g.join(",")+"]",gap=h,e}if(rep&&"object"==typeof rep)for(f=rep.length,c=0;f>c;c+=1)"string"==typeof rep[c]&&(d=rep[c],e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&g.push(quote(d)+(gap?": ":":")+e));return e=0===g.length?"{}":gap?"{\n"+gap+g.join(",\n"+gap)+"\n"+h+"}":"{"+g.join(",")+"}",gap=h,e}}var cellula=require("./cellula-namespace"),util=cellula._util,ArrayProto=Array.prototype,ObjProto=Object.prototype,FuncProto=Function.prototype,slice=util.slice=ArrayProto.slice,toString=util.toString=ObjProto.toString,hasOwnProperty=ObjProto.hasOwnProperty,nativeForEach=ArrayProto.forEach,nativeMap=ArrayProto.map,nativeReduce=ArrayProto.reduce,nativeReduceRight=ArrayProto.reduceRight,nativeIsArray=Array.isArray,nativeKeys=Object.keys,nativeBind=FuncProto.bind,breaker=util.breaker="breaker is used to break a loop",isArray=util.isArray=function(a){return nativeIsArray?nativeIsArray(a):"[object Array]"===toString.call(a)},isObject=util.isObject=function(a){return null==a?!1:"[object Object]"===toString.call(a)},isString=util.isString=function(a){return"[object String]"===toString.call(a)},isFunction=util.isFunction=function(a){return"[object Function]"===toString.call(a)},isArguments=util.isArguments=function(a){return"[object Arguments]"===toString.call(a)},isNodeList=util.isNodeList=function(a){return"[object NodeList]"===toString.call(a)},isClass=util.isClass=function(a){return isFunction(a)&&a.toString()===classCtor().toString()},has=util.has=function(a,b){return hasOwnProperty.call(a,b)},isEmpty=util.isEmpty=function(a,b){if(!a)return!0;if(isArray(a)||isString(a))return 0===a.length;for(var c in a)if(!b||has(a,c))return!1;return!0},iterator=util.iterator=function(a){return a},each=util.each=function(a,b,c,d){if(a){var e;if(null!=d){for(e in a)if((isObject(a)&&has(a,e)||isArray(a)&&e in a)&&b.call(c,a[e],e,a)===d)return e}else if(nativeForEach&&nativeForEach===a.forEach)a.forEach(b,c);else for(e in a)(isObject(a)&&has(a,e)||isArray(a)&&e in a)&&b.call(c,a[e],e,a)}},map=util.map=function(a,b,c){var d=[];return null==a?d:nativeMap&&nativeMap===a.map?a.map(b,c):(each(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),d)},keys=util.keys=function(a){if(nativeKeys)return nativeKeys(a);if(a!==Object(a))throw new TypeError("Invalid object");var b=[];for(var c in a)has(a,c)&&(b[b.length]=c);return b},values=util.values=function(a){return map(a,iterator)},emptyFunc=util.emptyFunc=function(){},bind=util.bind=function(a,b){var c,d;if(nativeBind&&nativeBind===a.bind)return nativeBind.call(a,b);if(!isFunction(a))throw new TypeError;return d=slice.call(arguments,2),c=function(){if(!(this instanceof c))return a.apply(b,slice.call(arguments));emptyFunc.prototype=a.prototype;var d=new emptyFunc,e=a.apply(d,slice.call(arguments));return Object(e)===e?e:d}},toArray=util.toArray=function(a){return a?isArray(a)||isArguments(a)?slice.call(a):values(a):[]},toArrayByLen=util.toArrayByLen=function(a){var b=[];if(a.length)for(var c=0;c<a.length;b[c]=a[c++]);return b},mix=util.mix=function(){for(var a=arguments[0]||{},b=1,c=arguments.length;c>b;b++){var d=arguments[b];if(isObject(d)||isArray(d))for(var e in d)a[e]=d[e]}return a},deepMix=util.deepMix=function(){for(var a=arguments[0]||{},b=1,c=arguments.length;c>b;b++){var d=arguments[b];if(isObject(d)||isArray(d))for(var e in d)a[e]=isObject(a[e])&&isObject(d[e])?deepMix({},a[e],d[e]):d[e]}return a},copy=util.copy=function(a){return isObject(a)||isArray(a)?isArray(a)?a.slice():mix({},a):a},aspect=util.aspect=function(a){if(!util.isObject(a))throw new Error("invalid parameter!");var b={before:function(b,c,d){if(!util.isString(b)||!util.isFunction(c))throw new Error("invalid parameter!");var e=a[b],f=d?util.slice.call(arguments,3):[];a[b]=function(){return c.apply(d||a,f),e.apply(a,arguments)}},after:function(b,c,d){if(!util.isString(b)||!util.isFunction(c))throw new Error("invalid parameter!");var e=a[b],f=d?util.slice.call(arguments,3):[];a[b]=function(){var b=e.apply(a,arguments);return c.apply(d||a,f),b}},wrap:function(b,c){if(!util.isString(b)||!util.isFunction(c))throw new Error("invalid parameter!");var d=a[b];a[b]=function(){var b=a._origin;a._origin=d;var e=c.apply(a,arguments);return a._origin=b,e}}};return b},nativeConsole=window?window.console||{}:{};each(["log","info","warn","error"],function(a){util[a]=nativeConsole[a]&&nativeConsole[a].apply?function(){nativeConsole[a].apply(nativeConsole,toArrayByLen(arguments))}:emptyFunc});var makeTpl=util.makeTpl=function(a,b){var c=a;for(n in b){var d=new RegExp("(\\$\\-\\{"+n+"\\})","g");c=c.replace(d,b[n])}var e=new RegExp("(\\$\\-\\{[/#a-zA-Z0-9]+\\})","g");return c=c.replace(e,"")},parseTpl=util.parseTpl=function(a,b){function c(c){var e=new RegExp("(\\$\\-\\{#"+c+"\\})","g"),f=new RegExp("(\\$\\-\\{/"+c+"\\})","g"),g=new RegExp("(\\$\\-\\{#"+c+"\\})(.*)(\\$\\-\\{/"+c+"\\})","g");if(b[c]!==!1&&b[c])if(isArray(b[c])){var h=g.exec(a);if(h){for(var i=h[2],j="",k=b[c],l=0;l<k.length;l++)j+=this.parseTpl.call(this,i,k[l]);d=d.replace(g,j)}}else d=d.replace(e,"").replace(f,"");else d=d.replace(g,"");return d}if(!isString(a)||!isObject(b))return a;var d=a,e=new RegExp("\\$\\-\\{#(.*)\\}");for(var f in b)c.call(this,f);for(;e.test(d);){var g=e.exec(d)[1];g=g.substring(0,g.indexOf("}")),c.call(this,g)}return makeTpl(d,b)};util.JSON={};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;util.JSON.stringify=function(a,b,c){var d;if(gap="",indent="","number"==typeof c)for(d=0;c>d;d+=1)indent+=" ";else"string"==typeof c&&(indent=c);if(rep=b,b&&"function"!=typeof b&&("object"!=typeof b||"number"!=typeof b.length))throw new Error("JSON.stringify");return str("",{"":a})},util.JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&"object"==typeof e)for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),void 0!==d?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")};var trim=util.trim=function(a){return isString(a)?a.replace(/^\s+/g,"").replace(/\s+$/g,""):a},hasClass=util.hasClass=function(a,b){return a&&1==a.nodeType?(b=" "+b+" ",(" "+a.className+" ").replace(/[\n\t\r]/g," ").indexOf(b)>-1):!1},addClass=util.addClass=function(a,b){if(a&&1==a.nodeType){if(!trim(a.className))return a.className=b;hasClass(a,b)||(a.className=trim(a.className)+" "+b)}},removeClass=util.removeClass=function(a,b){hasClass(a,b)&&(a.className=trim((" "+a.className+" ").replace(/[\n\t\r]/g," ").replace(" "+b+" "," ")))},getElementsByClassName=util.getElementsByClassName=function(a,b,c){if(b=b||document,b.getElementsByClassName)return b.getElementsByClassName(a);c=c||"*";for(var d=[],e=b.getElementsByTagName(c),f=e.length,g=new RegExp("(^|\\s)"+a+"(\\s|$)");--f>=0;)g.test(e[f].className)&&d.push(e[f]);return d};module.exports=util});