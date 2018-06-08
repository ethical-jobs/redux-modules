(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('ethical-jobs-redux')) :
	typeof define === 'function' && define.amd ? define(['exports', 'ethical-jobs-redux'], factory) :
	(factory((global.ethicalJobsReduxModules = {}),global.ethicalJobsRedux));
}(this, (function (exports,ethicalJobsRedux) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var process$1 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var inherits;
	if (typeof Object.create === 'function'){
	  inherits = function inherits(ctor, superCtor) {
	    // implementation from standard node.js 'util' module
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  inherits = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}
	var inherits$1 = inherits;

	// Copyright Joyent, Inc. and other Node contributors.
	var formatRegExp = /%[sdj%]/g;
	function format(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	}

	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	function deprecate(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process$1.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process$1.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process$1.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}

	var debugs = {};
	var debugEnviron;
	function debuglog(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process$1.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = 0;
	      debugs[set] = function() {
	        var msg = format.apply(null, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	}

	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    _extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}

	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}

	function isNull(arg) {
	  return arg === null;
	}

	function isNullOrUndefined(arg) {
	  return arg == null;
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isString(arg) {
	  return typeof arg === 'string';
	}

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}

	function isBuffer(maybeBuf) {
	  return Buffer.isBuffer(maybeBuf);
	}

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	function log() {
	  console.log('%s - %s', timestamp(), format.apply(null, arguments));
	}

	function _extend(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	}
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var util = {
	  inherits: inherits$1,
	  _extend: _extend,
	  log: log,
	  isBuffer: isBuffer,
	  isPrimitive: isPrimitive,
	  isFunction: isFunction,
	  isError: isError,
	  isDate: isDate,
	  isObject: isObject,
	  isRegExp: isRegExp,
	  isUndefined: isUndefined,
	  isSymbol: isSymbol,
	  isString: isString,
	  isNumber: isNumber,
	  isNullOrUndefined: isNullOrUndefined,
	  isNull: isNull,
	  isBoolean: isBoolean,
	  isArray: isArray,
	  inspect: inspect,
	  deprecate: deprecate,
	  format: format,
	  debuglog: debuglog
	};

	var util$1 = /*#__PURE__*/Object.freeze({
		format: format,
		deprecate: deprecate,
		debuglog: debuglog,
		inspect: inspect,
		isArray: isArray,
		isBoolean: isBoolean,
		isNull: isNull,
		isNullOrUndefined: isNullOrUndefined,
		isNumber: isNumber,
		isString: isString,
		isSymbol: isSymbol,
		isUndefined: isUndefined,
		isRegExp: isRegExp,
		isObject: isObject,
		isDate: isDate,
		isError: isError,
		isFunction: isFunction,
		isPrimitive: isPrimitive,
		isBuffer: isBuffer,
		log: log,
		inherits: inherits$1,
		_extend: _extend,
		default: util
	});

	var domain;

	// This constructor is used to store event handlers. Instantiating this is
	// faster than explicitly calling `Object.create(null)` to get a "clean" empty
	// object (tested with v8 v4.9).
	function EventHandlers() {}
	EventHandlers.prototype = Object.create(null);

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}

	// nodejs oddity
	// require('events') === require('events').EventEmitter
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.usingDomains = false;

	EventEmitter.prototype.domain = undefined;
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	EventEmitter.init = function() {
	  this.domain = null;
	  if (EventEmitter.usingDomains) {
	    // if there is an active domain, then attach to it.
	    if (domain.active && !(this instanceof domain.Domain)) {
	      this.domain = domain.active;
	    }
	  }

	  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
	    this._events = new EventHandlers();
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || isNaN(n))
	    throw new TypeError('"n" argument must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	function $getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return $getMaxListeners(this);
	};

	// These standalone emit* functions are used to optimize calling of event
	// handlers for fast cases because emit() itself often has a variable number of
	// arguments and can be deoptimized because of that. These functions always have
	// the same number of arguments and thus do not get deoptimized, so the code
	// inside them can execute faster.
	function emitNone(handler, isFn, self) {
	  if (isFn)
	    handler.call(self);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self);
	  }
	}
	function emitOne(handler, isFn, self, arg1) {
	  if (isFn)
	    handler.call(self, arg1);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1);
	  }
	}
	function emitTwo(handler, isFn, self, arg1, arg2) {
	  if (isFn)
	    handler.call(self, arg1, arg2);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2);
	  }
	}
	function emitThree(handler, isFn, self, arg1, arg2, arg3) {
	  if (isFn)
	    handler.call(self, arg1, arg2, arg3);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].call(self, arg1, arg2, arg3);
	  }
	}

	function emitMany(handler, isFn, self, args) {
	  if (isFn)
	    handler.apply(self, args);
	  else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      listeners[i].apply(self, args);
	  }
	}

	EventEmitter.prototype.emit = function emit(type) {
	  var er, handler, len, args, i, events, domain;
	  var doError = (type === 'error');

	  events = this._events;
	  if (events)
	    doError = (doError && events.error == null);
	  else if (!doError)
	    return false;

	  domain = this.domain;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    er = arguments[1];
	    if (domain) {
	      if (!er)
	        er = new Error('Uncaught, unspecified "error" event');
	      er.domainEmitter = this;
	      er.domain = domain;
	      er.domainThrown = false;
	      domain.emit('error', er);
	    } else if (er instanceof Error) {
	      throw er; // Unhandled 'error' event
	    } else {
	      // At least give some kind of context to the user
	      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	      err.context = er;
	      throw err;
	    }
	    return false;
	  }

	  handler = events[type];

	  if (!handler)
	    return false;

	  var isFn = typeof handler === 'function';
	  len = arguments.length;
	  switch (len) {
	    // fast cases
	    case 1:
	      emitNone(handler, isFn, this);
	      break;
	    case 2:
	      emitOne(handler, isFn, this, arguments[1]);
	      break;
	    case 3:
	      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
	      break;
	    case 4:
	      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
	      break;
	    // slower
	    default:
	      args = new Array(len - 1);
	      for (i = 1; i < len; i++)
	        args[i - 1] = arguments[i];
	      emitMany(handler, isFn, this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');

	  events = target._events;
	  if (!events) {
	    events = target._events = new EventHandlers();
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (!existing) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] = prepend ? [listener, existing] :
	                                          [existing, listener];
	    } else {
	      // If we've already got an array, just append.
	      if (prepend) {
	        existing.unshift(listener);
	      } else {
	        existing.push(listener);
	      }
	    }

	    // Check for listener leak
	    if (!existing.warned) {
	      m = $getMaxListeners(target);
	      if (m && m > 0 && existing.length > m) {
	        existing.warned = true;
	        var w = new Error('Possible EventEmitter memory leak detected. ' +
	                            existing.length + ' ' + type + ' listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit');
	        w.name = 'MaxListenersExceededWarning';
	        w.emitter = target;
	        w.type = type;
	        w.count = existing.length;
	        emitWarning(w);
	      }
	    }
	  }

	  return target;
	}
	function emitWarning(e) {
	  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
	}
	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function _onceWrap(target, type, listener) {
	  var fired = false;
	  function g() {
	    target.removeListener(type, g);
	    if (!fired) {
	      fired = true;
	      listener.apply(target, arguments);
	    }
	  }
	  g.listener = listener;
	  return g;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  if (typeof listener !== 'function')
	    throw new TypeError('"listener" argument must be a function');
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      if (typeof listener !== 'function')
	        throw new TypeError('"listener" argument must be a function');

	      events = this._events;
	      if (!events)
	        return this;

	      list = events[type];
	      if (!list)
	        return this;

	      if (list === listener || (list.listener && list.listener === listener)) {
	        if (--this._eventsCount === 0)
	          this._events = new EventHandlers();
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length; i-- > 0;) {
	          if (list[i] === listener ||
	              (list[i].listener && list[i].listener === listener)) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (list.length === 1) {
	          list[0] = undefined;
	          if (--this._eventsCount === 0) {
	            this._events = new EventHandlers();
	            return this;
	          } else {
	            delete events[type];
	          }
	        } else {
	          spliceOne(list, position);
	        }

	        if (events.removeListener)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events;

	      events = this._events;
	      if (!events)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (!events.removeListener) {
	        if (arguments.length === 0) {
	          this._events = new EventHandlers();
	          this._eventsCount = 0;
	        } else if (events[type]) {
	          if (--this._eventsCount === 0)
	            this._events = new EventHandlers();
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        for (var i = 0, key; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = new EventHandlers();
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners) {
	        // LIFO order
	        do {
	          this.removeListener(type, listeners[listeners.length - 1]);
	        } while (listeners[0]);
	      }

	      return this;
	    };

	EventEmitter.prototype.listeners = function listeners(type) {
	  var evlistener;
	  var ret;
	  var events = this._events;

	  if (!events)
	    ret = [];
	  else {
	    evlistener = events[type];
	    if (!evlistener)
	      ret = [];
	    else if (typeof evlistener === 'function')
	      ret = [evlistener.listener || evlistener];
	    else
	      ret = unwrapListeners(evlistener);
	  }

	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
	};

	// About 1.5x faster than the two-arg version of Array#splice().
	function spliceOne(list, index) {
	  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
	    list[i] = list[k];
	  list.pop();
	}

	function arrayClone(arr, i) {
	  var copy = new Array(i);
	  while (i--)
	    copy[i] = arr[i];
	  return copy;
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
	var inited = false;
	function init () {
	  inited = true;
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i];
	    revLookup[code.charCodeAt(i)] = i;
	  }

	  revLookup['-'.charCodeAt(0)] = 62;
	  revLookup['_'.charCodeAt(0)] = 63;
	}

	function toByteArray (b64) {
	  if (!inited) {
	    init();
	  }
	  var i, j, l, tmp, placeHolders, arr;
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders);

	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len;

	  var L = 0;

	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
	    arr[L++] = (tmp >> 16) & 0xFF;
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[L++] = tmp & 0xFF;
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[L++] = (tmp >> 8) & 0xFF;
	    arr[L++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  if (!inited) {
	    init();
	  }
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var output = '';
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    output += lookup[tmp >> 2];
	    output += lookup[(tmp << 4) & 0x3F];
	    output += '==';
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
	    output += lookup[tmp >> 10];
	    output += lookup[(tmp >> 4) & 0x3F];
	    output += lookup[(tmp << 2) & 0x3F];
	    output += '=';
	  }

	  parts.push(output);

	  return parts.join('')
	}

	function read (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	function write (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = nBytes * 8 - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	}

	var toString = {}.toString;

	var isArray$1 = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */

	var INSPECT_MAX_BYTES = 50;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer$1.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : true;

	function kMaxLength () {
	  return Buffer$1.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length);
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer$1(length);
	    }
	    that.length = length;
	  }

	  return that
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer$1 (arg, encodingOrOffset, length) {
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
	    return new Buffer$1(arg, encodingOrOffset, length)
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}

	Buffer$1.poolSize = 8192; // not used by this implementation

	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer$1._augment = function (arr) {
	  arr.__proto__ = Buffer$1.prototype;
	  return arr
	};

	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }

	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }

	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }

	  return fromObject(that, value)
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer$1.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	};

	if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	  Buffer$1.prototype.__proto__ = Uint8Array.prototype;
	  Buffer$1.__proto__ = Uint8Array;
	}

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}

	function alloc (that, size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer$1.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	};

	function allocUnsafe (that, size) {
	  assertSize(size);
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0;
	    }
	  }
	  return that
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer$1.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer$1.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	};

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer$1.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }

	  var length = byteLength(string, encoding) | 0;
	  that = createBuffer(that, length);

	  var actual = that.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual);
	  }

	  return that
	}

	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  that = createBuffer(that, length);
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255;
	  }
	  return that
	}

	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }

	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array);
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset);
	  } else {
	    array = new Uint8Array(array, byteOffset, length);
	  }

	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array;
	    that.__proto__ = Buffer$1.prototype;
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array);
	  }
	  return that
	}

	function fromObject (that, obj) {
	  if (internalIsBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    that = createBuffer(that, len);

	    if (that.length === 0) {
	      return that
	    }

	    obj.copy(that, 0, 0, len);
	    return that
	  }

	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }

	    if (obj.type === 'Buffer' && isArray$1(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }

	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	Buffer$1.isBuffer = isBuffer$1;
	function internalIsBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer$1.compare = function compare (a, b) {
	  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer$1.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer$1.concat = function concat (list, length) {
	  if (!isArray$1(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer$1.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer$1.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (!internalIsBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (internalIsBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string;
	  }

	  var len = string.length;
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer$1.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer$1.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer$1.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer$1.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer$1.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer$1.prototype.toString = function toString () {
	  var length = this.length | 0;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer$1.prototype.equals = function equals (b) {
	  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer$1.compare(this, b) === 0
	};

	Buffer$1.prototype.inspect = function inspect () {
	  var str = '';
	  var max = INSPECT_MAX_BYTES;
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
	    if (this.length > max) str += ' ... ';
	  }
	  return '<Buffer ' + str + '>'
	};

	Buffer$1.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!internalIsBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset;  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer$1.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (internalIsBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (Buffer$1.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read$$1 (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read$$1(arr, i) === read$$1(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read$$1(arr, i + j) !== read$$1(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer$1.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer$1.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer$1.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length;
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer$1.prototype.write = function write$$1 (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0;
	    if (isFinite(length)) {
	      length = length | 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer$1.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return fromByteArray(buf)
	  } else {
	    return fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
	  }
	  return res
	}

	Buffer$1.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf;
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end);
	    newBuf.__proto__ = Buffer$1.prototype;
	  } else {
	    var sliceLen = end - start;
	    newBuf = new Buffer$1(sliceLen, undefined);
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start];
	    }
	  }

	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer$1.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer$1.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer$1.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer$1.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer$1.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer$1.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer$1.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer$1.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer$1.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer$1.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer$1.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer$1.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer$1.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer$1.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer$1.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, true, 23, 4)
	};

	Buffer$1.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return read(this, offset, false, 23, 4)
	};

	Buffer$1.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, true, 52, 8)
	};

	Buffer$1.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer$1.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  byteLength = byteLength | 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8;
	  }
	}

	Buffer$1.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1;
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
	  }
	}

	Buffer$1.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 1] = (value >>> 8);
	    this[offset] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer$1.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer$1.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	  } else {
	    objectWriteUInt16(this, value, offset, true);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8);
	    this[offset + 1] = (value & 0xff);
	  } else {
	    objectWriteUInt16(this, value, offset, false);
	  }
	  return offset + 2
	};

	Buffer$1.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff);
	    this[offset + 1] = (value >>> 8);
	    this[offset + 2] = (value >>> 16);
	    this[offset + 3] = (value >>> 24);
	  } else {
	    objectWriteUInt32(this, value, offset, true);
	  }
	  return offset + 4
	};

	Buffer$1.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset | 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24);
	    this[offset + 1] = (value >>> 16);
	    this[offset + 2] = (value >>> 8);
	    this[offset + 3] = (value & 0xff);
	  } else {
	    objectWriteUInt32(this, value, offset, false);
	  }
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
	  }
	  write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer$1.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer$1.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
	  }
	  write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer$1.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer$1.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer$1.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;
	  var i;

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else if (len < 1000 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer$1.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if (code < 256) {
	        val = code;
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer$1.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = internalIsBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer$1(val, encoding).toString());
	    var len = bytes.length;
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}


	function base64ToBytes (str) {
	  return toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}


	// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	function isBuffer$1(obj) {
	  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
	}

	function isFastBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
	}

	function BufferList() {
	  this.head = null;
	  this.tail = null;
	  this.length = 0;
	}

	BufferList.prototype.push = function (v) {
	  var entry = { data: v, next: null };
	  if (this.length > 0) this.tail.next = entry;else this.head = entry;
	  this.tail = entry;
	  ++this.length;
	};

	BufferList.prototype.unshift = function (v) {
	  var entry = { data: v, next: this.head };
	  if (this.length === 0) this.tail = entry;
	  this.head = entry;
	  ++this.length;
	};

	BufferList.prototype.shift = function () {
	  if (this.length === 0) return;
	  var ret = this.head.data;
	  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	  --this.length;
	  return ret;
	};

	BufferList.prototype.clear = function () {
	  this.head = this.tail = null;
	  this.length = 0;
	};

	BufferList.prototype.join = function (s) {
	  if (this.length === 0) return '';
	  var p = this.head;
	  var ret = '' + p.data;
	  while (p = p.next) {
	    ret += s + p.data;
	  }return ret;
	};

	BufferList.prototype.concat = function (n) {
	  if (this.length === 0) return Buffer$1.alloc(0);
	  if (this.length === 1) return this.head.data;
	  var ret = Buffer$1.allocUnsafe(n >>> 0);
	  var p = this.head;
	  var i = 0;
	  while (p) {
	    p.data.copy(ret, i);
	    i += p.data.length;
	    p = p.next;
	  }
	  return ret;
	};

	// Copyright Joyent, Inc. and other Node contributors.
	var isBufferEncoding = Buffer$1.isEncoding
	  || function(encoding) {
	       switch (encoding && encoding.toLowerCase()) {
	         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
	         default: return false;
	       }
	     };


	function assertEncoding(encoding) {
	  if (encoding && !isBufferEncoding(encoding)) {
	    throw new Error('Unknown encoding: ' + encoding);
	  }
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters. CESU-8 is handled as part of the UTF-8 encoding.
	//
	// @TODO Handling all encodings inside a single object makes it very difficult
	// to reason about this code, so it should be split up in the future.
	// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
	// points as used by CESU-8.
	function StringDecoder(encoding) {
	  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
	  assertEncoding(encoding);
	  switch (this.encoding) {
	    case 'utf8':
	      // CESU-8 represents each of Surrogate Pair by 3-bytes
	      this.surrogateSize = 3;
	      break;
	    case 'ucs2':
	    case 'utf16le':
	      // UTF-16 represents each of Surrogate Pair by 2-bytes
	      this.surrogateSize = 2;
	      this.detectIncompleteChar = utf16DetectIncompleteChar;
	      break;
	    case 'base64':
	      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
	      this.surrogateSize = 3;
	      this.detectIncompleteChar = base64DetectIncompleteChar;
	      break;
	    default:
	      this.write = passThroughWrite;
	      return;
	  }

	  // Enough space to store all bytes of a single character. UTF-8 needs 4
	  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
	  this.charBuffer = new Buffer$1(6);
	  // Number of bytes received for the current incomplete multi-byte character.
	  this.charReceived = 0;
	  // Number of bytes expected for the current incomplete multi-byte character.
	  this.charLength = 0;
	}

	// write decodes the given buffer and returns it as JS string that is
	// guaranteed to not contain any partial multi-byte characters. Any partial
	// character found at the end of the buffer is buffered up, and will be
	// returned when calling write again with the remaining bytes.
	//
	// Note: Converting a Buffer containing an orphan surrogate to a String
	// currently works, but converting a String to a Buffer (via `new Buffer`, or
	// Buffer#write) will replace incomplete surrogates with the unicode
	// replacement character. See https://codereview.chromium.org/121173009/ .
	StringDecoder.prototype.write = function(buffer) {
	  var charStr = '';
	  // if our last write ended with an incomplete multibyte character
	  while (this.charLength) {
	    // determine how many remaining bytes this buffer has to offer for this char
	    var available = (buffer.length >= this.charLength - this.charReceived) ?
	        this.charLength - this.charReceived :
	        buffer.length;

	    // add the new bytes to the char buffer
	    buffer.copy(this.charBuffer, this.charReceived, 0, available);
	    this.charReceived += available;

	    if (this.charReceived < this.charLength) {
	      // still not enough chars in this buffer? wait for more ...
	      return '';
	    }

	    // remove bytes belonging to the current character from the buffer
	    buffer = buffer.slice(available, buffer.length);

	    // get the character that was split
	    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

	    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	    var charCode = charStr.charCodeAt(charStr.length - 1);
	    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	      this.charLength += this.surrogateSize;
	      charStr = '';
	      continue;
	    }
	    this.charReceived = this.charLength = 0;

	    // if there are no more bytes in this buffer, just emit our char
	    if (buffer.length === 0) {
	      return charStr;
	    }
	    break;
	  }

	  // determine and set charLength / charReceived
	  this.detectIncompleteChar(buffer);

	  var end = buffer.length;
	  if (this.charLength) {
	    // buffer the incomplete character bytes we got
	    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
	    end -= this.charReceived;
	  }

	  charStr += buffer.toString(this.encoding, 0, end);

	  var end = charStr.length - 1;
	  var charCode = charStr.charCodeAt(end);
	  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
	  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
	    var size = this.surrogateSize;
	    this.charLength += size;
	    this.charReceived += size;
	    this.charBuffer.copy(this.charBuffer, size, 0, size);
	    buffer.copy(this.charBuffer, 0, 0, size);
	    return charStr.substring(0, end);
	  }

	  // or just emit the charStr
	  return charStr;
	};

	// detectIncompleteChar determines if there is an incomplete UTF-8 character at
	// the end of the given buffer. If so, it sets this.charLength to the byte
	// length that character, and sets this.charReceived to the number of bytes
	// that are available for this character.
	StringDecoder.prototype.detectIncompleteChar = function(buffer) {
	  // determine how many bytes we have to check at the end of this buffer
	  var i = (buffer.length >= 3) ? 3 : buffer.length;

	  // Figure out if one of the last i bytes of our buffer announces an
	  // incomplete char.
	  for (; i > 0; i--) {
	    var c = buffer[buffer.length - i];

	    // See http://en.wikipedia.org/wiki/UTF-8#Description

	    // 110XXXXX
	    if (i == 1 && c >> 5 == 0x06) {
	      this.charLength = 2;
	      break;
	    }

	    // 1110XXXX
	    if (i <= 2 && c >> 4 == 0x0E) {
	      this.charLength = 3;
	      break;
	    }

	    // 11110XXX
	    if (i <= 3 && c >> 3 == 0x1E) {
	      this.charLength = 4;
	      break;
	    }
	  }
	  this.charReceived = i;
	};

	StringDecoder.prototype.end = function(buffer) {
	  var res = '';
	  if (buffer && buffer.length)
	    res = this.write(buffer);

	  if (this.charReceived) {
	    var cr = this.charReceived;
	    var buf = this.charBuffer;
	    var enc = this.encoding;
	    res += buf.slice(0, cr).toString(enc);
	  }

	  return res;
	};

	function passThroughWrite(buffer) {
	  return buffer.toString(this.encoding);
	}

	function utf16DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 2;
	  this.charLength = this.charReceived ? 2 : 0;
	}

	function base64DetectIncompleteChar(buffer) {
	  this.charReceived = buffer.length % 3;
	  this.charLength = this.charReceived ? 3 : 0;
	}

	Readable.ReadableState = ReadableState;

	var debug = debuglog('stream');
	inherits$1(Readable, EventEmitter);

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') {
	    return emitter.prependListener(event, fn);
	  } else {
	    // This is a hack to make sure that our error handler is attached before any
	    // userland ones.  NEVER DO THIS. This is here only because this code needs
	    // to continue to work with older versions of Node.js that do not include
	    // the prependListener() method. The goal is to eventually remove this hack.
	    if (!emitter._events || !emitter._events[event])
	      emitter.on(event, fn);
	    else if (Array.isArray(emitter._events[event]))
	      emitter._events[event].unshift(fn);
	    else
	      emitter._events[event] = [fn, emitter._events[event]];
	  }
	}
	function listenerCount$1 (emitter, type) {
	  return emitter.listeners(type).length;
	}
	function ReadableState(options, stream) {

	  options = options || {};

	  // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

	  // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()
	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.
	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // when piping, we only care about 'readable' events that happen
	  // after read()ing all the bytes and not getting any pushback.
	  this.ranOut = false;

	  // the number of writers that are awaiting a drain event in .pipe()s
	  this.awaitDrain = 0;

	  // if true, a maybeReadMore has been scheduled
	  this.readingMore = false;

	  this.decoder = null;
	  this.encoding = null;
	  if (options.encoding) {
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}
	function Readable(options) {

	  if (!(this instanceof Readable)) return new Readable(options);

	  this._readableState = new ReadableState(options, this);

	  // legacy
	  this.readable = true;

	  if (options && typeof options.read === 'function') this._read = options.read;

	  EventEmitter.call(this);
	}

	// Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.
	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;

	  if (!state.objectMode && typeof chunk === 'string') {
	    encoding = encoding || state.defaultEncoding;
	    if (encoding !== state.encoding) {
	      chunk = Buffer.from(chunk, encoding);
	      encoding = '';
	    }
	  }

	  return readableAddChunk(this, state, chunk, encoding, false);
	};

	// Unshift should *always* be something directly out of read()
	Readable.prototype.unshift = function (chunk) {
	  var state = this._readableState;
	  return readableAddChunk(this, state, chunk, '', true);
	};

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	};

	function readableAddChunk(stream, state, chunk, encoding, addToFront) {
	  var er = chunkInvalid(state, chunk);
	  if (er) {
	    stream.emit('error', er);
	  } else if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else if (state.objectMode || chunk && chunk.length > 0) {
	    if (state.ended && !addToFront) {
	      var e = new Error('stream.push() after EOF');
	      stream.emit('error', e);
	    } else if (state.endEmitted && addToFront) {
	      var _e = new Error('stream.unshift() after end event');
	      stream.emit('error', _e);
	    } else {
	      var skipAdd;
	      if (state.decoder && !addToFront && !encoding) {
	        chunk = state.decoder.write(chunk);
	        skipAdd = !state.objectMode && chunk.length === 0;
	      }

	      if (!addToFront) state.reading = false;

	      // Don't add to the buffer if we've decoded to an empty string chunk and
	      // we're not in object mode
	      if (!skipAdd) {
	        // if we want the data now, just emit it.
	        if (state.flowing && state.length === 0 && !state.sync) {
	          stream.emit('data', chunk);
	          stream.read(0);
	        } else {
	          // update the buffer info.
	          state.length += state.objectMode ? 1 : chunk.length;
	          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

	          if (state.needReadable) emitReadable(stream);
	        }
	      }

	      maybeReadMore(stream, state);
	    }
	  } else if (!addToFront) {
	    state.reading = false;
	  }

	  return needMoreData(state);
	}

	// if it's past the high water mark, we can push in some more.
	// Also, if we have no data yet, we can stand some
	// more bytes.  This is to work around cases where hwm=0,
	// such as the repl.  Also, if the push() triggered a
	// readable event, and the user called read(largeNumber) such that
	// needReadable was set, then we ought to push more, so that another
	// 'readable' event will be triggered.
	function needMoreData(state) {
	  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
	}

	// backwards compatibility.
	Readable.prototype.setEncoding = function (enc) {
	  this._readableState.decoder = new StringDecoder(enc);
	  this._readableState.encoding = enc;
	  return this;
	};

	// Don't raise the hwm > 8MB
	var MAX_HWM = 0x800000;
	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }
	  return n;
	}

	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;
	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  }
	  // If we're asking for more than the current hwm, then raise the hwm.
	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n;
	  // Don't have enough
	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }
	  return state.length;
	}

	// you can override either this method, or the async _read(n) below.
	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;

	  if (n !== 0) state.emittedReadable = false;

	  // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.
	  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state);

	  // if we've ended, and we're now clear, then finish it up.
	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  }

	  // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.

	  // if we need a readable event, then we need to do some reading.
	  var doRead = state.needReadable;
	  debug('need readable', doRead);

	  // if we currently have less than the highWaterMark, then also read some
	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  }

	  // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.
	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true;
	    // if the length is currently zero, then we *need* a readable event.
	    if (state.length === 0) state.needReadable = true;
	    // call internal read method
	    this._read(state.highWaterMark);
	    state.sync = false;
	    // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.
	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = true;
	    n = 0;
	  } else {
	    state.length -= n;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true;

	    // If we tried to read() past the EOF, then emit end on the next tick.
	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);

	  return ret;
	};

	function chunkInvalid(state, chunk) {
	  var er = null;
	  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  return er;
	}

	function onEofChunk(stream, state) {
	  if (state.ended) return;
	  if (state.decoder) {
	    var chunk = state.decoder.end();
	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }
	  state.ended = true;

	  // emit 'readable' now to make sure it gets picked up.
	  emitReadable(stream);
	}

	// Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.
	function emitReadable(stream) {
	  var state = stream._readableState;
	  state.needReadable = false;
	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
	  }
	}

	function emitReadable_(stream) {
	  debug('emit readable');
	  stream.emit('readable');
	  flow(stream);
	}

	// at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.
	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  var len = state.length;
	  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length)
	      // didn't get any data, stop spinning.
	      break;else len = state.length;
	  }
	  state.readingMore = false;
	}

	// abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.
	Readable.prototype._read = function (n) {
	  this.emit('error', new Error('not implemented'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;
	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;
	    default:
	      state.pipes.push(dest);
	      break;
	  }
	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

	  var doEnd = (!pipeOpts || pipeOpts.end !== false);

	  var endFn = doEnd ? onend : cleanup;
	  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

	  dest.on('unpipe', onunpipe);
	  function onunpipe(readable) {
	    debug('onunpipe');
	    if (readable === src) {
	      cleanup();
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  }

	  // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.
	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);

	  var cleanedUp = false;
	  function cleanup() {
	    debug('cleanup');
	    // cleanup event handlers once the pipe is broken
	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', cleanup);
	    src.removeListener('data', ondata);

	    cleanedUp = true;

	    // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.
	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  // If the user pushes more data while we're writing to dest then we'll end up
	  // in ondata again. However, we only want to increase awaitDrain once because
	  // dest will only emit one 'drain' event for the multiple writes.
	  // => Introduce a guard on increasing awaitDrain.
	  var increasedAwaitDrain = false;
	  src.on('data', ondata);
	  function ondata(chunk) {
	    debug('ondata');
	    increasedAwaitDrain = false;
	    var ret = dest.write(chunk);
	    if (false === ret && !increasedAwaitDrain) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', src._readableState.awaitDrain);
	        src._readableState.awaitDrain++;
	        increasedAwaitDrain = true;
	      }
	      src.pause();
	    }
	  }

	  // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.
	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (listenerCount$1(dest, 'error') === 0) dest.emit('error', er);
	  }

	  // Make sure our error handler is attached before userland ones.
	  prependListener(dest, 'error', onerror);

	  // Both close and finish should trigger unpipe, but only once.
	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }
	  dest.once('close', onclose);
	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }
	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  }

	  // tell the dest that it's being piped to
	  dest.emit('pipe', src);

	  // start the flow if it hasn't been started already.
	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function () {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;
	    if (state.awaitDrain === 0 && src.listeners('data').length) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;

	  // if we're not piping anywhere, then do nothing.
	  if (state.pipesCount === 0) return this;

	  // just one destination.  most common case.
	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;

	    if (!dest) dest = state.pipes;

	    // got a match.
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this);
	    return this;
	  }

	  // slow case. multiple pipe destinations.

	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var _i = 0; _i < len; _i++) {
	      dests[_i].emit('unpipe', this);
	    }return this;
	  }

	  // try to find the right one.
	  var i = indexOf(state.pipes, dest);
	  if (i === -1) return this;

	  state.pipes.splice(i, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];

	  dest.emit('unpipe', this);

	  return this;
	};

	// set up data events if they are asked for
	// Ensure readable listeners eventually get something
	Readable.prototype.on = function (ev, fn) {
	  var res = EventEmitter.prototype.on.call(this, ev, fn);

	  if (ev === 'data') {
	    // Start flowing on next tick if stream isn't explicitly paused
	    if (this._readableState.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    var state = this._readableState;
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.emittedReadable = false;
	      if (!state.reading) {
	        nextTick(nReadingNextTick, this);
	      } else if (state.length) {
	        emitReadable(this, state);
	      }
	    }
	  }

	  return res;
	};
	Readable.prototype.addListener = Readable.prototype.on;

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	}

	// pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.
	Readable.prototype.resume = function () {
	  var state = this._readableState;
	  if (!state.flowing) {
	    debug('resume');
	    state.flowing = true;
	    resume(this, state);
	  }
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  if (!state.reading) {
	    debug('resume read 0');
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  state.awaitDrain = 0;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);
	  if (false !== this._readableState.flowing) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);
	  while (state.flowing && stream.read() !== null) {}
	}

	// wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.
	Readable.prototype.wrap = function (stream) {
	  var state = this._readableState;
	  var paused = false;

	  var self = this;
	  stream.on('end', function () {
	    debug('wrapped end');
	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) self.push(chunk);
	    }

	    self.push(null);
	  });

	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk);

	    // don't skip over falsy values in objectMode
	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = self.push(chunk);
	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  });

	  // proxy all the other methods.
	  // important when wrapping filters and duplexes.
	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function (method) {
	        return function () {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  }

	  // proxy certain important events.
	  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
	  forEach(events, function (ev) {
	    stream.on(ev, self.emit.bind(self, ev));
	  });

	  // when we try to consume some more bytes, simply unpause the
	  // underlying stream.
	  self._read = function (n) {
	    debug('wrapped _read', n);
	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return self;
	};

	// exposed for testing purposes only.
	Readable._fromList = fromList;

	// Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;

	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = fromListPartial(n, state.buffer, state.decoder);
	  }

	  return ret;
	}

	// Extracts only enough buffered data to satisfy the amount requested.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function fromListPartial(n, list, hasStrings) {
	  var ret;
	  if (n < list.head.data.length) {
	    // slice is the same for buffers and strings
	    ret = list.head.data.slice(0, n);
	    list.head.data = list.head.data.slice(n);
	  } else if (n === list.head.data.length) {
	    // first chunk is a perfect match
	    ret = list.shift();
	  } else {
	    // result spans more than one buffer
	    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
	  }
	  return ret;
	}

	// Copies a specified amount of characters from the list of buffered data
	// chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBufferString(n, list) {
	  var p = list.head;
	  var c = 1;
	  var ret = p.data;
	  n -= ret.length;
	  while (p = p.next) {
	    var str = p.data;
	    var nb = n > str.length ? str.length : n;
	    if (nb === str.length) ret += str;else ret += str.slice(0, n);
	    n -= nb;
	    if (n === 0) {
	      if (nb === str.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = str.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	// Copies a specified amount of bytes from the list of buffered data chunks.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.
	function copyFromBuffer(n, list) {
	  var ret = Buffer.allocUnsafe(n);
	  var p = list.head;
	  var c = 1;
	  p.data.copy(ret);
	  n -= p.data.length;
	  while (p = p.next) {
	    var buf = p.data;
	    var nb = n > buf.length ? buf.length : n;
	    buf.copy(ret, ret.length - n, 0, nb);
	    n -= nb;
	    if (n === 0) {
	      if (nb === buf.length) {
	        ++c;
	        if (p.next) list.head = p.next;else list.head = list.tail = null;
	      } else {
	        list.head = p;
	        p.data = buf.slice(nb);
	      }
	      break;
	    }
	    ++c;
	  }
	  list.length -= c;
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;

	  // If we get here before consuming all the bytes, then that is a
	  // bug in node.  Should never happen.
	  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

	  if (!state.endEmitted) {
	    state.ended = true;
	    nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  // Check that we didn't get one last unshift.
	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');
	  }
	}

	function forEach(xs, f) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    f(xs[i], i);
	  }
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }
	  return -1;
	}

	// A bit simpler than readable streams.
	Writable.WritableState = WritableState;
	inherits$1(Writable, EventEmitter);

	function nop() {}

	function WriteReq(chunk, encoding, cb) {
	  this.chunk = chunk;
	  this.encoding = encoding;
	  this.callback = cb;
	  this.next = null;
	}

	function WritableState(options, stream) {
	  Object.defineProperty(this, 'buffer', {
	    get: deprecate(function () {
	      return this.getBuffer();
	    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
	  });
	  options = options || {};

	  // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.
	  this.objectMode = !!options.objectMode;

	  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

	  // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()
	  var hwm = options.highWaterMark;
	  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
	  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

	  // cast to ints.
	  this.highWaterMark = ~ ~this.highWaterMark;

	  this.needDrain = false;
	  // at the start of calling end()
	  this.ending = false;
	  // when end() has been called, and returned
	  this.ended = false;
	  // when 'finish' is emitted
	  this.finished = false;

	  // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.
	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode;

	  // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.
	  this.defaultEncoding = options.defaultEncoding || 'utf8';

	  // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.
	  this.length = 0;

	  // a flag to see when we're in the middle of a write.
	  this.writing = false;

	  // when true all writes will be buffered until .uncork() call
	  this.corked = 0;

	  // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.
	  this.sync = true;

	  // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.
	  this.bufferProcessing = false;

	  // the callback that's passed to _write(chunk,cb)
	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  };

	  // the callback that the user supplies to write(chunk,encoding,cb)
	  this.writecb = null;

	  // the amount that is being written when _write is called.
	  this.writelen = 0;

	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null;

	  // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted
	  this.pendingcb = 0;

	  // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams
	  this.prefinished = false;

	  // True if the error was already emitted and should not be thrown again
	  this.errorEmitted = false;

	  // count buffered requests
	  this.bufferedRequestCount = 0;

	  // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two
	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function writableStateGetBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];
	  while (current) {
	    out.push(current);
	    current = current.next;
	  }
	  return out;
	};
	function Writable(options) {

	  // Writable ctor is applied to Duplexes, though they're not
	  // instanceof Writable, they're instanceof Readable.
	  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

	  this._writableState = new WritableState(options, this);

	  // legacy.
	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;

	    if (typeof options.writev === 'function') this._writev = options.writev;
	  }

	  EventEmitter.call(this);
	}

	// Otherwise people can pipe Writable streams, which is just wrong.
	Writable.prototype.pipe = function () {
	  this.emit('error', new Error('Cannot pipe, not readable'));
	};

	function writeAfterEnd(stream, cb) {
	  var er = new Error('write after end');
	  // TODO: defer error events consistently everywhere, not just the cb
	  stream.emit('error', er);
	  nextTick(cb, er);
	}

	// If we get something that is not a buffer, string, null, or undefined,
	// and we're not in objectMode, then that's an error.
	// Otherwise stream chunks are all considered to be of length=1, and the
	// watermarks determine how many objects to keep in the buffer, rather than
	// how many bytes or characters.
	function validChunk(stream, state, chunk, cb) {
	  var valid = true;
	  var er = false;
	  // Always throw error if a null is written
	  // if we are not in object mode then throw
	  // if it is not a buffer, string, or undefined.
	  if (chunk === null) {
	    er = new TypeError('May not write null values to stream');
	  } else if (!Buffer$1.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new TypeError('Invalid non-string/buffer chunk');
	  }
	  if (er) {
	    stream.emit('error', er);
	    nextTick(cb, er);
	    valid = false;
	  }
	  return valid;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (Buffer$1.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

	  if (typeof cb !== 'function') cb = nop;

	  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, chunk, encoding, cb);
	  }

	  return ret;
	};

	Writable.prototype.cork = function () {
	  var state = this._writableState;

	  state.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;

	    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer$1.from(chunk, encoding);
	  }
	  return chunk;
	}

	// if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.
	function writeOrBuffer(stream, state, chunk, encoding, cb) {
	  chunk = decodeChunk(state, chunk, encoding);

	  if (Buffer$1.isBuffer(chunk)) encoding = 'buffer';
	  var len = state.objectMode ? 1 : chunk.length;

	  state.length += len;

	  var ret = state.length < state.highWaterMark;
	  // we must ensure that previous needDrain will not be reset to false.
	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }
	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;
	  if (sync) nextTick(cb, er);else cb(er);

	  stream._writableState.errorEmitted = true;
	  stream.emit('error', er);
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;

	  onwriteStateUpdate(state);

	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state);

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      /*<replacement>*/
	        nextTick(afterWrite, stream, state, finished, cb);
	      /*</replacement>*/
	    } else {
	        afterWrite(stream, state, finished, cb);
	      }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	}

	// Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.
	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	}

	// if there's something in the buffer waiting, then process it
	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;

	    var count = 0;
	    while (entry) {
	      buffer[count] = entry;
	      entry = entry.next;
	      count += 1;
	    }

	    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

	    // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite
	    state.pendingcb++;
	    state.lastBufferedRequest = null;
	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;

	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.
	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequestCount = 0;
	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new Error('not implemented'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

	  // .end() fully uncorks
	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  }

	  // ignore unnecessary end() calls.
	  if (!state.ending && !state.finished) endWritable(this, state, cb);
	};

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function prefinish(stream, state) {
	  if (!state.prefinished) {
	    state.prefinished = true;
	    stream.emit('prefinish');
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);
	  if (need) {
	    if (state.pendingcb === 0) {
	      prefinish(stream, state);
	      state.finished = true;
	      stream.emit('finish');
	    } else {
	      prefinish(stream, state);
	    }
	  }
	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);
	  if (cb) {
	    if (state.finished) nextTick(cb);else stream.once('finish', cb);
	  }
	  state.ended = true;
	  stream.writable = false;
	}

	// It seems a linked list but it is not
	// there will be only 2 of these for each stream
	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function (err) {
	    var entry = _this.entry;
	    _this.entry = null;
	    while (entry) {
	      var cb = entry.callback;
	      state.pendingcb--;
	      cb(err);
	      entry = entry.next;
	    }
	    if (state.corkedRequestsFree) {
	      state.corkedRequestsFree.next = _this;
	    } else {
	      state.corkedRequestsFree = _this;
	    }
	  };
	}

	inherits$1(Duplex, Readable);

	var keys = Object.keys(Writable.prototype);
	for (var v = 0; v < keys.length; v++) {
	  var method = keys[v];
	  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	}
	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);

	  Readable.call(this, options);
	  Writable.call(this, options);

	  if (options && options.readable === false) this.readable = false;

	  if (options && options.writable === false) this.writable = false;

	  this.allowHalfOpen = true;
	  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

	  this.once('end', onend);
	}

	// the no-half-open enforcer
	function onend() {
	  // if we allow half-open state, or if the writable side ended,
	  // then we're ok.
	  if (this.allowHalfOpen || this._writableState.ended) return;

	  // no more data can be written.
	  // But allow more writes to happen in this tick.
	  nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	// a transform stream is a readable/writable stream where you do
	inherits$1(Transform, Duplex);

	function TransformState(stream) {
	  this.afterTransform = function (er, data) {
	    return afterTransform(stream, er, data);
	  };

	  this.needTransform = false;
	  this.transforming = false;
	  this.writecb = null;
	  this.writechunk = null;
	  this.writeencoding = null;
	}

	function afterTransform(stream, er, data) {
	  var ts = stream._transformState;
	  ts.transforming = false;

	  var cb = ts.writecb;

	  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

	  ts.writechunk = null;
	  ts.writecb = null;

	  if (data !== null && data !== undefined) stream.push(data);

	  cb(er);

	  var rs = stream._readableState;
	  rs.reading = false;
	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    stream._read(rs.highWaterMark);
	  }
	}
	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);

	  Duplex.call(this, options);

	  this._transformState = new TransformState(this);

	  // when the writable side finishes, then flush out anything remaining.
	  var stream = this;

	  // start out asking for a readable event once data is transformed.
	  this._readableState.needReadable = true;

	  // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.
	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;

	    if (typeof options.flush === 'function') this._flush = options.flush;
	  }

	  this.once('prefinish', function () {
	    if (typeof this._flush === 'function') this._flush(function (er) {
	      done(stream, er);
	    });else done(stream);
	  });
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	};

	// This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.
	Transform.prototype._transform = function (chunk, encoding, cb) {
	  throw new Error('Not implemented');
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;
	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	};

	// Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.
	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
	    ts.transforming = true;
	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	function done(stream, er) {
	  if (er) return stream.emit('error', er);

	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided
	  var ws = stream._writableState;
	  var ts = stream._transformState;

	  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

	  if (ts.transforming) throw new Error('Calling transform done when still transforming');

	  return stream.push(null);
	}

	inherits$1(PassThrough, Transform);
	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);

	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};

	inherits$1(Stream, EventEmitter);
	Stream.Readable = Readable;
	Stream.Writable = Writable;
	Stream.Duplex = Duplex;
	Stream.Transform = Transform;
	Stream.PassThrough = PassThrough;

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;

	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EventEmitter.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EventEmitter.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};

	var stream = /*#__PURE__*/Object.freeze({
		default: Stream,
		Readable: Readable,
		Writable: Writable,
		Duplex: Duplex,
		Transform: Transform,
		PassThrough: PassThrough,
		Stream: Stream
	});

	var require$$0 = ( stream && Stream ) || stream;

	var util$2 = ( util$1 && util ) || util$1;

	var Stream$1 = require$$0.Stream;


	var delayed_stream = DelayedStream;
	function DelayedStream() {
	  this.source = null;
	  this.dataSize = 0;
	  this.maxDataSize = 1024 * 1024;
	  this.pauseStream = true;

	  this._maxDataSizeExceeded = false;
	  this._released = false;
	  this._bufferedEvents = [];
	}
	util$2.inherits(DelayedStream, Stream$1);

	DelayedStream.create = function(source, options) {
	  var delayedStream = new this();

	  options = options || {};
	  for (var option in options) {
	    delayedStream[option] = options[option];
	  }

	  delayedStream.source = source;

	  var realEmit = source.emit;
	  source.emit = function() {
	    delayedStream._handleEmit(arguments);
	    return realEmit.apply(source, arguments);
	  };

	  source.on('error', function() {});
	  if (delayedStream.pauseStream) {
	    source.pause();
	  }

	  return delayedStream;
	};

	Object.defineProperty(DelayedStream.prototype, 'readable', {
	  configurable: true,
	  enumerable: true,
	  get: function() {
	    return this.source.readable;
	  }
	});

	DelayedStream.prototype.setEncoding = function() {
	  return this.source.setEncoding.apply(this.source, arguments);
	};

	DelayedStream.prototype.resume = function() {
	  if (!this._released) {
	    this.release();
	  }

	  this.source.resume();
	};

	DelayedStream.prototype.pause = function() {
	  this.source.pause();
	};

	DelayedStream.prototype.release = function() {
	  this._released = true;

	  this._bufferedEvents.forEach(function(args) {
	    this.emit.apply(this, args);
	  }.bind(this));
	  this._bufferedEvents = [];
	};

	DelayedStream.prototype.pipe = function() {
	  var r = Stream$1.prototype.pipe.apply(this, arguments);
	  this.resume();
	  return r;
	};

	DelayedStream.prototype._handleEmit = function(args) {
	  if (this._released) {
	    this.emit.apply(this, args);
	    return;
	  }

	  if (args[0] === 'data') {
	    this.dataSize += args[1].length;
	    this._checkIfMaxDataSizeExceeded();
	  }

	  this._bufferedEvents.push(args);
	};

	DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
	  if (this._maxDataSizeExceeded) {
	    return;
	  }

	  if (this.dataSize <= this.maxDataSize) {
	    return;
	  }

	  this._maxDataSizeExceeded = true;
	  var message =
	    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
	  this.emit('error', new Error(message));
	};

	var defer_1 = defer;

	/**
	 * Runs provided function on next iteration of the event loop
	 *
	 * @param {function} fn - function to run
	 */
	function defer(fn)
	{
	  var nextTick = typeof setImmediate == 'function'
	    ? setImmediate
	    : (
	      typeof process == 'object' && typeof process.nextTick == 'function'
	      ? process.nextTick
	      : null
	    );

	  if (nextTick)
	  {
	    nextTick(fn);
	  }
	  else
	  {
	    setTimeout(fn, 0);
	  }
	}

	var Stream$2 = require$$0.Stream;



	var combined_stream = CombinedStream;
	function CombinedStream() {
	  this.writable = false;
	  this.readable = true;
	  this.dataSize = 0;
	  this.maxDataSize = 2 * 1024 * 1024;
	  this.pauseStreams = true;

	  this._released = false;
	  this._streams = [];
	  this._currentStream = null;
	}
	util$2.inherits(CombinedStream, Stream$2);

	CombinedStream.create = function(options) {
	  var combinedStream = new this();

	  options = options || {};
	  for (var option in options) {
	    combinedStream[option] = options[option];
	  }

	  return combinedStream;
	};

	CombinedStream.isStreamLike = function(stream) {
	  return (typeof stream !== 'function')
	    && (typeof stream !== 'string')
	    && (typeof stream !== 'boolean')
	    && (typeof stream !== 'number')
	    && (!Buffer.isBuffer(stream));
	};

	CombinedStream.prototype.append = function(stream) {
	  var isStreamLike = CombinedStream.isStreamLike(stream);

	  if (isStreamLike) {
	    if (!(stream instanceof delayed_stream)) {
	      var newStream = delayed_stream.create(stream, {
	        maxDataSize: Infinity,
	        pauseStream: this.pauseStreams,
	      });
	      stream.on('data', this._checkDataSize.bind(this));
	      stream = newStream;
	    }

	    this._handleErrors(stream);

	    if (this.pauseStreams) {
	      stream.pause();
	    }
	  }

	  this._streams.push(stream);
	  return this;
	};

	CombinedStream.prototype.pipe = function(dest, options) {
	  Stream$2.prototype.pipe.call(this, dest, options);
	  this.resume();
	  return dest;
	};

	CombinedStream.prototype._getNext = function() {
	  this._currentStream = null;
	  var stream = this._streams.shift();


	  if (typeof stream == 'undefined') {
	    this.end();
	    return;
	  }

	  if (typeof stream !== 'function') {
	    this._pipeNext(stream);
	    return;
	  }

	  var getStream = stream;
	  getStream(function(stream) {
	    var isStreamLike = CombinedStream.isStreamLike(stream);
	    if (isStreamLike) {
	      stream.on('data', this._checkDataSize.bind(this));
	      this._handleErrors(stream);
	    }

	    defer_1(this._pipeNext.bind(this, stream));
	  }.bind(this));
	};

	CombinedStream.prototype._pipeNext = function(stream) {
	  this._currentStream = stream;

	  var isStreamLike = CombinedStream.isStreamLike(stream);
	  if (isStreamLike) {
	    stream.on('end', this._getNext.bind(this));
	    stream.pipe(this, {end: false});
	    return;
	  }

	  var value = stream;
	  this.write(value);
	  this._getNext();
	};

	CombinedStream.prototype._handleErrors = function(stream) {
	  var self = this;
	  stream.on('error', function(err) {
	    self._emitError(err);
	  });
	};

	CombinedStream.prototype.write = function(data) {
	  this.emit('data', data);
	};

	CombinedStream.prototype.pause = function() {
	  if (!this.pauseStreams) {
	    return;
	  }

	  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
	  this.emit('pause');
	};

	CombinedStream.prototype.resume = function() {
	  if (!this._released) {
	    this._released = true;
	    this.writable = true;
	    this._getNext();
	  }

	  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
	  this.emit('resume');
	};

	CombinedStream.prototype.end = function() {
	  this._reset();
	  this.emit('end');
	};

	CombinedStream.prototype.destroy = function() {
	  this._reset();
	  this.emit('close');
	};

	CombinedStream.prototype._reset = function() {
	  this.writable = false;
	  this._streams = [];
	  this._currentStream = null;
	};

	CombinedStream.prototype._checkDataSize = function() {
	  this._updateDataSize();
	  if (this.dataSize <= this.maxDataSize) {
	    return;
	  }

	  var message =
	    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
	  this._emitError(new Error(message));
	};

	CombinedStream.prototype._updateDataSize = function() {
	  this.dataSize = 0;

	  var self = this;
	  this._streams.forEach(function(stream) {
	    if (!stream.dataSize) {
	      return;
	    }

	    self.dataSize += stream.dataSize;
	  });

	  if (this._currentStream && this._currentStream.dataSize) {
	    this.dataSize += this._currentStream.dataSize;
	  }
	};

	CombinedStream.prototype._emitError = function(err) {
	  this._reset();
	  this.emit('error', err);
	};

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	function resolve() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : '/';

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	}
	// path.normalize(path)
	// posix version
	function normalize(path) {
	  var isPathAbsolute = isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isPathAbsolute).join('/');

	  if (!path && !isPathAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isPathAbsolute ? '/' : '') + path;
	}
	// posix version
	function isAbsolute(path) {
	  return path.charAt(0) === '/';
	}

	// posix version
	function join() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	}


	// path.relative(from, to)
	// posix version
	function relative(from, to) {
	  from = resolve(from).substr(1);
	  to = resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	}

	var sep = '/';
	var delimiter = ':';

	function dirname(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	}

	function basename(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	}


	function extname(path) {
	  return splitPath(path)[3];
	}
	var path = {
	  extname: extname,
	  basename: basename,
	  dirname: dirname,
	  sep: sep,
	  delimiter: delimiter,
	  relative: relative,
	  join: join,
	  isAbsolute: isAbsolute,
	  normalize: normalize,
	  resolve: resolve
	};
	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b' ?
	    function (str, start, len) { return str.substr(start, len) } :
	    function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	var path$1 = /*#__PURE__*/Object.freeze({
		resolve: resolve,
		normalize: normalize,
		isAbsolute: isAbsolute,
		join: join,
		relative: relative,
		sep: sep,
		delimiter: delimiter,
		dirname: dirname,
		basename: basename,
		extname: extname,
		default: path
	});

	var hasFetch = isFunction$1(global.fetch) && isFunction$1(global.ReadableStream);

	var _blobConstructor;
	function blobConstructor() {
	  if (typeof _blobConstructor !== 'undefined') {
	    return _blobConstructor;
	  }
	  try {
	    new global.Blob([new ArrayBuffer(1)]);
	    _blobConstructor = true;
	  } catch (e) {
	    _blobConstructor = false;
	  }
	  return _blobConstructor
	}
	var xhr;

	function checkTypeSupport(type) {
	  if (!xhr) {
	    xhr = new global.XMLHttpRequest();
	    // If location.host is empty, e.g. if this page/worker was loaded
	    // from a Blob, then use example.com to avoid an error
	    xhr.open('GET', global.location.host ? '/' : 'https://example.com');
	  }
	  try {
	    xhr.responseType = type;
	    return xhr.responseType === type
	  } catch (e) {
	    return false
	  }

	}

	// For some strange reason, Safari 7.0 reports typeof global.ArrayBuffer === 'object'.
	// Safari 7.1 appears to have fixed this bug.
	var haveArrayBuffer = typeof global.ArrayBuffer !== 'undefined';
	var haveSlice = haveArrayBuffer && isFunction$1(global.ArrayBuffer.prototype.slice);

	var arraybuffer = haveArrayBuffer && checkTypeSupport('arraybuffer');
	  // These next two tests unavoidably show warnings in Chrome. Since fetch will always
	  // be used if it's available, just return false for these to avoid the warnings.
	var msstream = !hasFetch && haveSlice && checkTypeSupport('ms-stream');
	var mozchunkedarraybuffer = !hasFetch && haveArrayBuffer &&
	  checkTypeSupport('moz-chunked-arraybuffer');
	var overrideMimeType = isFunction$1(xhr.overrideMimeType);
	var vbArray = isFunction$1(global.VBArray);

	function isFunction$1(value) {
	  return typeof value === 'function'
	}

	xhr = null; // Help gc

	var rStates = {
	  UNSENT: 0,
	  OPENED: 1,
	  HEADERS_RECEIVED: 2,
	  LOADING: 3,
	  DONE: 4
	};
	function IncomingMessage(xhr, response, mode) {
	  var self = this;
	  Readable.call(self);

	  self._mode = mode;
	  self.headers = {};
	  self.rawHeaders = [];
	  self.trailers = {};
	  self.rawTrailers = [];

	  // Fake the 'close' event, but only once 'end' fires
	  self.on('end', function() {
	    // The nextTick is necessary to prevent the 'request' module from causing an infinite loop
	    process.nextTick(function() {
	      self.emit('close');
	    });
	  });
	  var read;
	  if (mode === 'fetch') {
	    self._fetchResponse = response;

	    self.url = response.url;
	    self.statusCode = response.status;
	    self.statusMessage = response.statusText;
	      // backwards compatible version of for (<item> of <iterable>):
	      // for (var <item>,_i,_it = <iterable>[Symbol.iterator](); <item> = (_i = _it.next()).value,!_i.done;)
	    for (var header, _i, _it = response.headers[Symbol.iterator](); header = (_i = _it.next()).value, !_i.done;) {
	      self.headers[header[0].toLowerCase()] = header[1];
	      self.rawHeaders.push(header[0], header[1]);
	    }

	    // TODO: this doesn't respect backpressure. Once WritableStream is available, this can be fixed
	    var reader = response.body.getReader();

	    read = function () {
	      reader.read().then(function(result) {
	        if (self._destroyed)
	          return
	        if (result.done) {
	          self.push(null);
	          return
	        }
	        self.push(new Buffer(result.value));
	        read();
	      });
	    };
	    read();

	  } else {
	    self._xhr = xhr;
	    self._pos = 0;

	    self.url = xhr.responseURL;
	    self.statusCode = xhr.status;
	    self.statusMessage = xhr.statusText;
	    var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
	    headers.forEach(function(header) {
	      var matches = header.match(/^([^:]+):\s*(.*)/);
	      if (matches) {
	        var key = matches[1].toLowerCase();
	        if (key === 'set-cookie') {
	          if (self.headers[key] === undefined) {
	            self.headers[key] = [];
	          }
	          self.headers[key].push(matches[2]);
	        } else if (self.headers[key] !== undefined) {
	          self.headers[key] += ', ' + matches[2];
	        } else {
	          self.headers[key] = matches[2];
	        }
	        self.rawHeaders.push(matches[1], matches[2]);
	      }
	    });

	    self._charset = 'x-user-defined';
	    if (!overrideMimeType) {
	      var mimeType = self.rawHeaders['mime-type'];
	      if (mimeType) {
	        var charsetMatch = mimeType.match(/;\s*charset=([^;])(;|$)/);
	        if (charsetMatch) {
	          self._charset = charsetMatch[1].toLowerCase();
	        }
	      }
	      if (!self._charset)
	        self._charset = 'utf-8'; // best guess
	    }
	  }
	}

	inherits$1(IncomingMessage, Readable);

	IncomingMessage.prototype._read = function() {};

	IncomingMessage.prototype._onXHRProgress = function() {
	  var self = this;

	  var xhr = self._xhr;

	  var response = null;
	  switch (self._mode) {
	  case 'text:vbarray': // For IE9
	    if (xhr.readyState !== rStates.DONE)
	      break
	    try {
	      // This fails in IE8
	      response = new global.VBArray(xhr.responseBody).toArray();
	    } catch (e) {
	      // pass
	    }
	    if (response !== null) {
	      self.push(new Buffer(response));
	      break
	    }
	    // Falls through in IE8
	  case 'text':
	    try { // This will fail when readyState = 3 in IE9. Switch mode and wait for readyState = 4
	      response = xhr.responseText;
	    } catch (e) {
	      self._mode = 'text:vbarray';
	      break
	    }
	    if (response.length > self._pos) {
	      var newData = response.substr(self._pos);
	      if (self._charset === 'x-user-defined') {
	        var buffer = new Buffer(newData.length);
	        for (var i = 0; i < newData.length; i++)
	          buffer[i] = newData.charCodeAt(i) & 0xff;

	        self.push(buffer);
	      } else {
	        self.push(newData, self._charset);
	      }
	      self._pos = response.length;
	    }
	    break
	  case 'arraybuffer':
	    if (xhr.readyState !== rStates.DONE || !xhr.response)
	      break
	    response = xhr.response;
	    self.push(new Buffer(new Uint8Array(response)));
	    break
	  case 'moz-chunked-arraybuffer': // take whole
	    response = xhr.response;
	    if (xhr.readyState !== rStates.LOADING || !response)
	      break
	    self.push(new Buffer(new Uint8Array(response)));
	    break
	  case 'ms-stream':
	    response = xhr.response;
	    if (xhr.readyState !== rStates.LOADING)
	      break
	    var reader = new global.MSStreamReader();
	    reader.onprogress = function() {
	      if (reader.result.byteLength > self._pos) {
	        self.push(new Buffer(new Uint8Array(reader.result.slice(self._pos))));
	        self._pos = reader.result.byteLength;
	      }
	    };
	    reader.onload = function() {
	      self.push(null);
	    };
	      // reader.onerror = ??? // TODO: this
	    reader.readAsArrayBuffer(response);
	    break
	  }

	  // The ms-stream case handles end separately in reader.onload()
	  if (self._xhr.readyState === rStates.DONE && self._mode !== 'ms-stream') {
	    self.push(null);
	  }
	};

	// from https://github.com/jhiesey/to-arraybuffer/blob/6502d9850e70ba7935a7df4ad86b358fc216f9f0/index.js
	function toArrayBuffer (buf) {
	  // If the buffer is backed by a Uint8Array, a faster version will work
	  if (buf instanceof Uint8Array) {
	    // If the buffer isn't a subarray, return the underlying ArrayBuffer
	    if (buf.byteOffset === 0 && buf.byteLength === buf.buffer.byteLength) {
	      return buf.buffer
	    } else if (typeof buf.buffer.slice === 'function') {
	      // Otherwise we need to get a proper copy
	      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
	    }
	  }

	  if (isBuffer$1(buf)) {
	    // This is the slow version that will work with any Buffer
	    // implementation (even in old browsers)
	    var arrayCopy = new Uint8Array(buf.length);
	    var len = buf.length;
	    for (var i = 0; i < len; i++) {
	      arrayCopy[i] = buf[i];
	    }
	    return arrayCopy.buffer
	  } else {
	    throw new Error('Argument must be a Buffer')
	  }
	}

	function decideMode(preferBinary, useFetch) {
	  if (hasFetch && useFetch) {
	    return 'fetch'
	  } else if (mozchunkedarraybuffer) {
	    return 'moz-chunked-arraybuffer'
	  } else if (msstream) {
	    return 'ms-stream'
	  } else if (arraybuffer && preferBinary) {
	    return 'arraybuffer'
	  } else if (vbArray && preferBinary) {
	    return 'text:vbarray'
	  } else {
	    return 'text'
	  }
	}

	function ClientRequest(opts) {
	  var self = this;
	  Writable.call(self);

	  self._opts = opts;
	  self._body = [];
	  self._headers = {};
	  if (opts.auth)
	    self.setHeader('Authorization', 'Basic ' + new Buffer(opts.auth).toString('base64'));
	  Object.keys(opts.headers).forEach(function(name) {
	    self.setHeader(name, opts.headers[name]);
	  });

	  var preferBinary;
	  var useFetch = true;
	  if (opts.mode === 'disable-fetch') {
	    // If the use of XHR should be preferred and includes preserving the 'content-type' header
	    useFetch = false;
	    preferBinary = true;
	  } else if (opts.mode === 'prefer-streaming') {
	    // If streaming is a high priority but binary compatibility and
	    // the accuracy of the 'content-type' header aren't
	    preferBinary = false;
	  } else if (opts.mode === 'allow-wrong-content-type') {
	    // If streaming is more important than preserving the 'content-type' header
	    preferBinary = !overrideMimeType;
	  } else if (!opts.mode || opts.mode === 'default' || opts.mode === 'prefer-fast') {
	    // Use binary if text streaming may corrupt data or the content-type header, or for speed
	    preferBinary = true;
	  } else {
	    throw new Error('Invalid value for opts.mode')
	  }
	  self._mode = decideMode(preferBinary, useFetch);

	  self.on('finish', function() {
	    self._onFinish();
	  });
	}

	inherits$1(ClientRequest, Writable);
	// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
	var unsafeHeaders = [
	  'accept-charset',
	  'accept-encoding',
	  'access-control-request-headers',
	  'access-control-request-method',
	  'connection',
	  'content-length',
	  'cookie',
	  'cookie2',
	  'date',
	  'dnt',
	  'expect',
	  'host',
	  'keep-alive',
	  'origin',
	  'referer',
	  'te',
	  'trailer',
	  'transfer-encoding',
	  'upgrade',
	  'user-agent',
	  'via'
	];
	ClientRequest.prototype.setHeader = function(name, value) {
	  var self = this;
	  var lowerName = name.toLowerCase();
	    // This check is not necessary, but it prevents warnings from browsers about setting unsafe
	    // headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	    // http-browserify did it, so I will too.
	  if (unsafeHeaders.indexOf(lowerName) !== -1)
	    return

	  self._headers[lowerName] = {
	    name: name,
	    value: value
	  };
	};

	ClientRequest.prototype.getHeader = function(name) {
	  var self = this;
	  return self._headers[name.toLowerCase()].value
	};

	ClientRequest.prototype.removeHeader = function(name) {
	  var self = this;
	  delete self._headers[name.toLowerCase()];
	};

	ClientRequest.prototype._onFinish = function() {
	  var self = this;

	  if (self._destroyed)
	    return
	  var opts = self._opts;

	  var headersObj = self._headers;
	  var body;
	  if (opts.method === 'POST' || opts.method === 'PUT' || opts.method === 'PATCH') {
	    if (blobConstructor()) {
	      body = new global.Blob(self._body.map(function(buffer) {
	        return toArrayBuffer(buffer)
	      }), {
	        type: (headersObj['content-type'] || {}).value || ''
	      });
	    } else {
	      // get utf8 string
	      body = Buffer.concat(self._body).toString();
	    }
	  }

	  if (self._mode === 'fetch') {
	    var headers = Object.keys(headersObj).map(function(name) {
	      return [headersObj[name].name, headersObj[name].value]
	    });

	    global.fetch(self._opts.url, {
	      method: self._opts.method,
	      headers: headers,
	      body: body,
	      mode: 'cors',
	      credentials: opts.withCredentials ? 'include' : 'same-origin'
	    }).then(function(response) {
	      self._fetchResponse = response;
	      self._connect();
	    }, function(reason) {
	      self.emit('error', reason);
	    });
	  } else {
	    var xhr = self._xhr = new global.XMLHttpRequest();
	    try {
	      xhr.open(self._opts.method, self._opts.url, true);
	    } catch (err) {
	      process.nextTick(function() {
	        self.emit('error', err);
	      });
	      return
	    }

	    // Can't set responseType on really old browsers
	    if ('responseType' in xhr)
	      xhr.responseType = self._mode.split(':')[0];

	    if ('withCredentials' in xhr)
	      xhr.withCredentials = !!opts.withCredentials;

	    if (self._mode === 'text' && 'overrideMimeType' in xhr)
	      xhr.overrideMimeType('text/plain; charset=x-user-defined');

	    Object.keys(headersObj).forEach(function(name) {
	      xhr.setRequestHeader(headersObj[name].name, headersObj[name].value);
	    });

	    self._response = null;
	    xhr.onreadystatechange = function() {
	      switch (xhr.readyState) {
	      case rStates.LOADING:
	      case rStates.DONE:
	        self._onXHRProgress();
	        break
	      }
	    };
	      // Necessary for streaming in Firefox, since xhr.response is ONLY defined
	      // in onprogress, not in onreadystatechange with xhr.readyState = 3
	    if (self._mode === 'moz-chunked-arraybuffer') {
	      xhr.onprogress = function() {
	        self._onXHRProgress();
	      };
	    }

	    xhr.onerror = function() {
	      if (self._destroyed)
	        return
	      self.emit('error', new Error('XHR error'));
	    };

	    try {
	      xhr.send(body);
	    } catch (err) {
	      process.nextTick(function() {
	        self.emit('error', err);
	      });
	      return
	    }
	  }
	};

	/**
	 * Checks if xhr.status is readable and non-zero, indicating no error.
	 * Even though the spec says it should be available in readyState 3,
	 * accessing it throws an exception in IE8
	 */
	function statusValid(xhr) {
	  try {
	    var status = xhr.status;
	    return (status !== null && status !== 0)
	  } catch (e) {
	    return false
	  }
	}

	ClientRequest.prototype._onXHRProgress = function() {
	  var self = this;

	  if (!statusValid(self._xhr) || self._destroyed)
	    return

	  if (!self._response)
	    self._connect();

	  self._response._onXHRProgress();
	};

	ClientRequest.prototype._connect = function() {
	  var self = this;

	  if (self._destroyed)
	    return

	  self._response = new IncomingMessage(self._xhr, self._fetchResponse, self._mode);
	  self.emit('response', self._response);
	};

	ClientRequest.prototype._write = function(chunk, encoding, cb) {
	  var self = this;

	  self._body.push(chunk);
	  cb();
	};

	ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function() {
	  var self = this;
	  self._destroyed = true;
	  if (self._response)
	    self._response._destroyed = true;
	  if (self._xhr)
	    self._xhr.abort();
	    // Currently, there isn't a way to truly abort a fetch.
	    // If you like bikeshedding, see https://github.com/whatwg/fetch/issues/27
	};

	ClientRequest.prototype.end = function(data, encoding, cb) {
	  var self = this;
	  if (typeof data === 'function') {
	    cb = data;
	    data = undefined;
	  }

	  Writable.prototype.end.call(self, data, encoding, cb);
	};

	ClientRequest.prototype.flushHeaders = function() {};
	ClientRequest.prototype.setTimeout = function() {};
	ClientRequest.prototype.setNoDelay = function() {};
	ClientRequest.prototype.setSocketKeepAlive = function() {};

	/*! https://mths.be/punycode v1.4.1 by @mathias */


	/** Highest positive signed 32-bit float value */
	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	var base = 36;
	var tMin = 1;
	var tMax = 26;
	var skew = 38;
	var damp = 700;
	var initialBias = 72;
	var initialN = 128; // 0x80
	var delimiter$1 = '-'; // '\x2D'
	var regexNonASCII = /[^\x20-\x7E]/; // unprintable ASCII chars + non-ASCII chars
	var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators

	/** Error messages */
	var errors = {
	  'overflow': 'Overflow: input needs wider integers to process',
	  'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	  'invalid-input': 'Invalid input'
	};

	/** Convenience shortcuts */
	var baseMinusTMin = base - tMin;
	var floor = Math.floor;
	var stringFromCharCode = String.fromCharCode;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
	  throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
	  var length = array.length;
	  var result = [];
	  while (length--) {
	    result[length] = fn(array[length]);
	  }
	  return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
	  var parts = string.split('@');
	  var result = '';
	  if (parts.length > 1) {
	    // In email addresses, only the domain name should be punycoded. Leave
	    // the local part (i.e. everything up to `@`) intact.
	    result = parts[0] + '@';
	    string = parts[1];
	  }
	  // Avoid `split(regex)` for IE8 compatibility. See #17.
	  string = string.replace(regexSeparators, '\x2E');
	  var labels = string.split('.');
	  var encoded = map(labels, fn).join('.');
	  return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
	  var output = [],
	    counter = 0,
	    length = string.length,
	    value,
	    extra;
	  while (counter < length) {
	    value = string.charCodeAt(counter++);
	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
	      // high surrogate, and there is a next character
	      extra = string.charCodeAt(counter++);
	      if ((extra & 0xFC00) == 0xDC00) { // low surrogate
	        output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
	      } else {
	        // unmatched surrogate; only append this code unit, in case the next
	        // code unit is the high surrogate of a surrogate pair
	        output.push(value);
	        counter--;
	      }
	    } else {
	      output.push(value);
	    }
	  }
	  return output;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
	  //  0..25 map to ASCII a..z or A..Z
	  // 26..35 map to ASCII 0..9
	  return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
	  var k = 0;
	  delta = firstTime ? floor(delta / damp) : delta >> 1;
	  delta += floor(delta / numPoints);
	  for ( /* no initialization */ ; delta > baseMinusTMin * tMax >> 1; k += base) {
	    delta = floor(delta / baseMinusTMin);
	  }
	  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
	  var n,
	    delta,
	    handledCPCount,
	    basicLength,
	    bias,
	    j,
	    m,
	    q,
	    k,
	    t,
	    currentValue,
	    output = [],
	    /** `inputLength` will hold the number of code points in `input`. */
	    inputLength,
	    /** Cached calculation results */
	    handledCPCountPlusOne,
	    baseMinusT,
	    qMinusT;

	  // Convert the input in UCS-2 to Unicode
	  input = ucs2decode(input);

	  // Cache the length
	  inputLength = input.length;

	  // Initialize the state
	  n = initialN;
	  delta = 0;
	  bias = initialBias;

	  // Handle the basic code points
	  for (j = 0; j < inputLength; ++j) {
	    currentValue = input[j];
	    if (currentValue < 0x80) {
	      output.push(stringFromCharCode(currentValue));
	    }
	  }

	  handledCPCount = basicLength = output.length;

	  // `handledCPCount` is the number of code points that have been handled;
	  // `basicLength` is the number of basic code points.

	  // Finish the basic string - if it is not empty - with a delimiter
	  if (basicLength) {
	    output.push(delimiter$1);
	  }

	  // Main encoding loop:
	  while (handledCPCount < inputLength) {

	    // All non-basic code points < n have been handled already. Find the next
	    // larger one:
	    for (m = maxInt, j = 0; j < inputLength; ++j) {
	      currentValue = input[j];
	      if (currentValue >= n && currentValue < m) {
	        m = currentValue;
	      }
	    }

	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	    // but guard against overflow
	    handledCPCountPlusOne = handledCPCount + 1;
	    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
	      error('overflow');
	    }

	    delta += (m - n) * handledCPCountPlusOne;
	    n = m;

	    for (j = 0; j < inputLength; ++j) {
	      currentValue = input[j];

	      if (currentValue < n && ++delta > maxInt) {
	        error('overflow');
	      }

	      if (currentValue == n) {
	        // Represent delta as a generalized variable-length integer
	        for (q = delta, k = base; /* no condition */ ; k += base) {
	          t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	          if (q < t) {
	            break;
	          }
	          qMinusT = q - t;
	          baseMinusT = base - t;
	          output.push(
	            stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
	          );
	          q = floor(qMinusT / baseMinusT);
	        }

	        output.push(stringFromCharCode(digitToBasic(q, 0)));
	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
	        delta = 0;
	        ++handledCPCount;
	      }
	    }

	    ++delta;
	    ++n;

	  }
	  return output.join('');
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
	  return mapDomain(input, function(string) {
	    return regexNonASCII.test(string) ?
	      'xn--' + encode(string) :
	      string;
	  });
	}

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.


	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty$1(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	var isArray$2 = Array.isArray || function (xs) {
	  return Object.prototype.toString.call(xs) === '[object Array]';
	};
	function stringifyPrimitive(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;

	    case 'boolean':
	      return v ? 'true' : 'false';

	    case 'number':
	      return isFinite(v) ? v : '';

	    default:
	      return '';
	  }
	}

	function stringify (obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }

	  if (typeof obj === 'object') {
	    return map$1(objectKeys(obj), function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (isArray$2(obj[k])) {
	        return map$1(obj[k], function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);

	  }

	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	}
	function map$1 (xs, f) {
	  if (xs.map) return xs.map(f);
	  var res = [];
	  for (var i = 0; i < xs.length; i++) {
	    res.push(f(xs[i], i));
	  }
	  return res;
	}

	var objectKeys = Object.keys || function (obj) {
	  var res = [];
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
	  }
	  return res;
	};

	function parse(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};

	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }

	  var regexp = /\+/g;
	  qs = qs.split(sep);

	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }

	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }

	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;

	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }

	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);

	    if (!hasOwnProperty$1(obj, k)) {
	      obj[k] = v;
	    } else if (isArray$2(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }

	  return obj;
	}

	// Copyright Joyent, Inc. and other Node contributors.
	var url = {
	  parse: urlParse,
	  resolve: urlResolve,
	  resolveObject: urlResolveObject,
	  format: urlFormat,
	  Url: Url
	};
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}

	// Reference: RFC 3986, RFC 1808, RFC 2396

	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	  portPattern = /:[0-9]*$/,

	  // Special case for a simple path URL
	  simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

	  // RFC 2396: characters reserved for delimiting URLs.
	  // We actually just auto-escape these.
	  delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

	  // RFC 2396: characters not allowed for various reasons.
	  unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

	  // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	  autoEscape = ['\''].concat(unwise),
	  // Characters that are never ever allowed in a hostname.
	  // Note that any invalid chars are also handled, but these
	  // are the ones that are *expected* to be seen, so we fast-path
	  // them.
	  nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	  hostEndingChars = ['/', '?', '#'],
	  hostnameMaxLen = 255,
	  hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	  hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	  // protocols that can allow "unsafe" and "unwise" chars.
	  unsafeProtocol = {
	    'javascript': true,
	    'javascript:': true
	  },
	  // protocols that never have a hostname.
	  hostlessProtocol = {
	    'javascript': true,
	    'javascript:': true
	  },
	  // protocols that always contain a // bit.
	  slashedProtocol = {
	    'http': true,
	    'https': true,
	    'ftp': true,
	    'gopher': true,
	    'file': true,
	    'http:': true,
	    'https:': true,
	    'ftp:': true,
	    'gopher:': true,
	    'file:': true
	  };

	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;

	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  return parse$1(this, url, parseQueryString, slashesDenoteHost);
	};

	function parse$1(self, url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError('Parameter \'url\' must be a string, not ' + typeof url);
	  }

	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	    splitter =
	    (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	    uSplit = url.split(splitter),
	    slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);

	  var rest = url;

	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();

	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      self.path = rest;
	      self.href = rest;
	      self.pathname = simplePath[1];
	      if (simplePath[2]) {
	        self.search = simplePath[2];
	        if (parseQueryString) {
	          self.query = parse(self.search.substr(1));
	        } else {
	          self.query = self.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        self.search = '';
	        self.query = {};
	      }
	      return self;
	    }
	  }

	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    self.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }

	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      self.slashes = true;
	    }
	  }
	  var i, hec, l, p;
	  if (!hostlessProtocol[proto] &&
	    (slashes || (proto && !slashedProtocol[proto]))) {

	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c

	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.

	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (i = 0; i < hostEndingChars.length; i++) {
	      hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }

	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }

	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      self.auth = decodeURIComponent(auth);
	    }

	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (i = 0; i < nonHostChars.length; i++) {
	      hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;

	    self.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);

	    // pull out port.
	    parseHost(self);

	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    self.hostname = self.hostname || '';

	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = self.hostname[0] === '[' &&
	      self.hostname[self.hostname.length - 1] === ']';

	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = self.hostname.split(/\./);
	      for (i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            self.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }

	    if (self.hostname.length > hostnameMaxLen) {
	      self.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      self.hostname = self.hostname.toLowerCase();
	    }

	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      self.hostname = toASCII(self.hostname);
	    }

	    p = self.port ? ':' + self.port : '';
	    var h = self.hostname || '';
	    self.host = h + p;
	    self.href += self.host;

	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      self.hostname = self.hostname.substr(1, self.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }

	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {

	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }


	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    self.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    self.search = rest.substr(qm);
	    self.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      self.query = parse(self.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    self.search = '';
	    self.query = {};
	  }
	  if (rest) self.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	    self.hostname && !self.pathname) {
	    self.pathname = '/';
	  }

	  //to support http.request
	  if (self.pathname || self.search) {
	    p = self.pathname || '';
	    var s = self.search || '';
	    self.path = p + s;
	  }

	  // finally, reconstruct the href based on what has been validated.
	  self.href = format$1(self);
	  return self;
	}

	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = parse$1({}, obj);
	  return format$1(obj);
	}

	function format$1(self) {
	  var auth = self.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }

	  var protocol = self.protocol || '',
	    pathname = self.pathname || '',
	    hash = self.hash || '',
	    host = false,
	    query = '';

	  if (self.host) {
	    host = auth + self.host;
	  } else if (self.hostname) {
	    host = auth + (self.hostname.indexOf(':') === -1 ?
	      self.hostname :
	      '[' + this.hostname + ']');
	    if (self.port) {
	      host += ':' + self.port;
	    }
	  }

	  if (self.query &&
	    isObject(self.query) &&
	    Object.keys(self.query).length) {
	    query = stringify(self.query);
	  }

	  var search = self.search || (query && ('?' + query)) || '';

	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (self.slashes ||
	    (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }

	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;

	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');

	  return protocol + host + pathname + search + hash;
	}

	Url.prototype.format = function() {
	  return format$1(this);
	};

	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}

	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};

	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}

	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }

	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }

	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;

	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }

	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }

	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	      result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }

	    result.href = result.format();
	    return result;
	  }
	  var relPath;
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }

	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }

	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	    isRelAbs = (
	      relative.host ||
	      relative.pathname && relative.pathname.charAt(0) === '/'
	    ),
	    mustEndAbs = (isRelAbs || isSourceAbs ||
	      (result.host && relative.pathname)),
	    removeAllDots = mustEndAbs,
	    srcPath = result.pathname && result.pathname.split('/') || [],
	    psychotic = result.protocol && !slashedProtocol[result.protocol];
	  relPath = relative.pathname && relative.pathname.split('/') || [];
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	  var authInHost;
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	      relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      authInHost = result.host && result.host.indexOf('@') > 0 ?
	        result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	        (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }

	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }

	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	    (result.host || relative.host || srcPath.length > 1) &&
	    (last === '.' || last === '..') || last === '');

	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }

	  if (mustEndAbs && srcPath[0] !== '' &&
	    (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }

	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }

	  var isAbsolute = srcPath[0] === '' ||
	    (srcPath[0] && srcPath[0].charAt(0) === '/');

	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	      srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    authInHost = result.host && result.host.indexOf('@') > 0 ?
	      result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }

	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }

	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }

	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	      (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};

	Url.prototype.parseHost = function() {
	  return parseHost(this);
	};

	function parseHost(self) {
	  var host = self.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      self.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) self.hostname = host;
	}

	var url$1 = /*#__PURE__*/Object.freeze({
		parse: urlParse,
		resolve: urlResolve,
		resolveObject: urlResolveObject,
		format: urlFormat,
		default: url,
		Url: Url
	});

	/*
	this and http-lib folder

	The MIT License

	Copyright (c) 2015 John Hiesey

	Permission is hereby granted, free of charge,
	to any person obtaining a copy of this software and
	associated documentation files (the "Software"), to
	deal in the Software without restriction, including
	without limitation the rights to use, copy, modify,
	merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom
	the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice
	shall be included in all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR
	ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	*/

	function request(opts, cb) {
	  if (typeof opts === 'string')
	    opts = urlParse(opts);


	  // Normally, the page is loaded from http or https, so not specifying a protocol
	  // will result in a (valid) protocol-relative url. However, this won't work if
	  // the protocol is something else, like 'file:'
	  var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : '';

	  var protocol = opts.protocol || defaultProtocol;
	  var host = opts.hostname || opts.host;
	  var port = opts.port;
	  var path = opts.path || '/';

	  // Necessary for IPv6 addresses
	  if (host && host.indexOf(':') !== -1)
	    host = '[' + host + ']';

	  // This may be a relative url. The browser should always be able to interpret it correctly.
	  opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path;
	  opts.method = (opts.method || 'GET').toUpperCase();
	  opts.headers = opts.headers || {};

	  // Also valid opts.auth, opts.mode

	  var req = new ClientRequest(opts);
	  if (cb)
	    req.on('response', cb);
	  return req
	}

	function get(opts, cb) {
	  var req = request(opts, cb);
	  req.end();
	  return req
	}

	function Agent() {}
	Agent.defaultMaxSockets = 4;

	var METHODS = [
	  'CHECKOUT',
	  'CONNECT',
	  'COPY',
	  'DELETE',
	  'GET',
	  'HEAD',
	  'LOCK',
	  'M-SEARCH',
	  'MERGE',
	  'MKACTIVITY',
	  'MKCOL',
	  'MOVE',
	  'NOTIFY',
	  'OPTIONS',
	  'PATCH',
	  'POST',
	  'PROPFIND',
	  'PROPPATCH',
	  'PURGE',
	  'PUT',
	  'REPORT',
	  'SEARCH',
	  'SUBSCRIBE',
	  'TRACE',
	  'UNLOCK',
	  'UNSUBSCRIBE'
	];
	var STATUS_CODES = {
	  100: 'Continue',
	  101: 'Switching Protocols',
	  102: 'Processing', // RFC 2518, obsoleted by RFC 4918
	  200: 'OK',
	  201: 'Created',
	  202: 'Accepted',
	  203: 'Non-Authoritative Information',
	  204: 'No Content',
	  205: 'Reset Content',
	  206: 'Partial Content',
	  207: 'Multi-Status', // RFC 4918
	  300: 'Multiple Choices',
	  301: 'Moved Permanently',
	  302: 'Moved Temporarily',
	  303: 'See Other',
	  304: 'Not Modified',
	  305: 'Use Proxy',
	  307: 'Temporary Redirect',
	  400: 'Bad Request',
	  401: 'Unauthorized',
	  402: 'Payment Required',
	  403: 'Forbidden',
	  404: 'Not Found',
	  405: 'Method Not Allowed',
	  406: 'Not Acceptable',
	  407: 'Proxy Authentication Required',
	  408: 'Request Time-out',
	  409: 'Conflict',
	  410: 'Gone',
	  411: 'Length Required',
	  412: 'Precondition Failed',
	  413: 'Request Entity Too Large',
	  414: 'Request-URI Too Large',
	  415: 'Unsupported Media Type',
	  416: 'Requested Range Not Satisfiable',
	  417: 'Expectation Failed',
	  418: 'I\'m a teapot', // RFC 2324
	  422: 'Unprocessable Entity', // RFC 4918
	  423: 'Locked', // RFC 4918
	  424: 'Failed Dependency', // RFC 4918
	  425: 'Unordered Collection', // RFC 4918
	  426: 'Upgrade Required', // RFC 2817
	  428: 'Precondition Required', // RFC 6585
	  429: 'Too Many Requests', // RFC 6585
	  431: 'Request Header Fields Too Large', // RFC 6585
	  500: 'Internal Server Error',
	  501: 'Not Implemented',
	  502: 'Bad Gateway',
	  503: 'Service Unavailable',
	  504: 'Gateway Time-out',
	  505: 'HTTP Version Not Supported',
	  506: 'Variant Also Negotiates', // RFC 2295
	  507: 'Insufficient Storage', // RFC 4918
	  509: 'Bandwidth Limit Exceeded',
	  510: 'Not Extended', // RFC 2774
	  511: 'Network Authentication Required' // RFC 6585
	};

	var http = {
	  request,
	  get,
	  Agent,
	  METHODS,
	  STATUS_CODES
	};

	var http$1 = /*#__PURE__*/Object.freeze({
		request: request,
		get: get,
		Agent: Agent,
		METHODS: METHODS,
		STATUS_CODES: STATUS_CODES,
		default: http
	});

	var empty = {};

	var empty$1 = /*#__PURE__*/Object.freeze({
		default: empty
	});

	var db = {
		"application/1d-interleaved-parityfec": {
		source: "iana"
	},
		"application/3gpdash-qoe-report+xml": {
		source: "iana"
	},
		"application/3gpp-ims+xml": {
		source: "iana"
	},
		"application/a2l": {
		source: "iana"
	},
		"application/activemessage": {
		source: "iana"
	},
		"application/alto-costmap+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-costmapfilter+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-directory+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-endpointcost+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-endpointcostparams+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-endpointprop+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-endpointpropparams+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-error+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-networkmap+json": {
		source: "iana",
		compressible: true
	},
		"application/alto-networkmapfilter+json": {
		source: "iana",
		compressible: true
	},
		"application/aml": {
		source: "iana"
	},
		"application/andrew-inset": {
		source: "iana",
		extensions: [
			"ez"
		]
	},
		"application/applefile": {
		source: "iana"
	},
		"application/applixware": {
		source: "apache",
		extensions: [
			"aw"
		]
	},
		"application/atf": {
		source: "iana"
	},
		"application/atfx": {
		source: "iana"
	},
		"application/atom+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"atom"
		]
	},
		"application/atomcat+xml": {
		source: "iana",
		extensions: [
			"atomcat"
		]
	},
		"application/atomdeleted+xml": {
		source: "iana"
	},
		"application/atomicmail": {
		source: "iana"
	},
		"application/atomsvc+xml": {
		source: "iana",
		extensions: [
			"atomsvc"
		]
	},
		"application/atxml": {
		source: "iana"
	},
		"application/auth-policy+xml": {
		source: "iana"
	},
		"application/bacnet-xdd+zip": {
		source: "iana"
	},
		"application/batch-smtp": {
		source: "iana"
	},
		"application/bdoc": {
		compressible: false,
		extensions: [
			"bdoc"
		]
	},
		"application/beep+xml": {
		source: "iana"
	},
		"application/calendar+json": {
		source: "iana",
		compressible: true
	},
		"application/calendar+xml": {
		source: "iana"
	},
		"application/call-completion": {
		source: "iana"
	},
		"application/cals-1840": {
		source: "iana"
	},
		"application/cbor": {
		source: "iana"
	},
		"application/cccex": {
		source: "iana"
	},
		"application/ccmp+xml": {
		source: "iana"
	},
		"application/ccxml+xml": {
		source: "iana",
		extensions: [
			"ccxml"
		]
	},
		"application/cdfx+xml": {
		source: "iana"
	},
		"application/cdmi-capability": {
		source: "iana",
		extensions: [
			"cdmia"
		]
	},
		"application/cdmi-container": {
		source: "iana",
		extensions: [
			"cdmic"
		]
	},
		"application/cdmi-domain": {
		source: "iana",
		extensions: [
			"cdmid"
		]
	},
		"application/cdmi-object": {
		source: "iana",
		extensions: [
			"cdmio"
		]
	},
		"application/cdmi-queue": {
		source: "iana",
		extensions: [
			"cdmiq"
		]
	},
		"application/cdni": {
		source: "iana"
	},
		"application/cea": {
		source: "iana"
	},
		"application/cea-2018+xml": {
		source: "iana"
	},
		"application/cellml+xml": {
		source: "iana"
	},
		"application/cfw": {
		source: "iana"
	},
		"application/clue_info+xml": {
		source: "iana"
	},
		"application/cms": {
		source: "iana"
	},
		"application/cnrp+xml": {
		source: "iana"
	},
		"application/coap-group+json": {
		source: "iana",
		compressible: true
	},
		"application/coap-payload": {
		source: "iana"
	},
		"application/commonground": {
		source: "iana"
	},
		"application/conference-info+xml": {
		source: "iana"
	},
		"application/cose": {
		source: "iana"
	},
		"application/cose-key": {
		source: "iana"
	},
		"application/cose-key-set": {
		source: "iana"
	},
		"application/cpl+xml": {
		source: "iana"
	},
		"application/csrattrs": {
		source: "iana"
	},
		"application/csta+xml": {
		source: "iana"
	},
		"application/cstadata+xml": {
		source: "iana"
	},
		"application/csvm+json": {
		source: "iana",
		compressible: true
	},
		"application/cu-seeme": {
		source: "apache",
		extensions: [
			"cu"
		]
	},
		"application/cybercash": {
		source: "iana"
	},
		"application/dart": {
		compressible: true
	},
		"application/dash+xml": {
		source: "iana",
		extensions: [
			"mpd"
		]
	},
		"application/dashdelta": {
		source: "iana"
	},
		"application/davmount+xml": {
		source: "iana",
		extensions: [
			"davmount"
		]
	},
		"application/dca-rft": {
		source: "iana"
	},
		"application/dcd": {
		source: "iana"
	},
		"application/dec-dx": {
		source: "iana"
	},
		"application/dialog-info+xml": {
		source: "iana"
	},
		"application/dicom": {
		source: "iana"
	},
		"application/dicom+json": {
		source: "iana",
		compressible: true
	},
		"application/dicom+xml": {
		source: "iana"
	},
		"application/dii": {
		source: "iana"
	},
		"application/dit": {
		source: "iana"
	},
		"application/dns": {
		source: "iana"
	},
		"application/docbook+xml": {
		source: "apache",
		extensions: [
			"dbk"
		]
	},
		"application/dskpp+xml": {
		source: "iana"
	},
		"application/dssc+der": {
		source: "iana",
		extensions: [
			"dssc"
		]
	},
		"application/dssc+xml": {
		source: "iana",
		extensions: [
			"xdssc"
		]
	},
		"application/dvcs": {
		source: "iana"
	},
		"application/ecmascript": {
		source: "iana",
		compressible: true,
		extensions: [
			"ecma"
		]
	},
		"application/edi-consent": {
		source: "iana"
	},
		"application/edi-x12": {
		source: "iana",
		compressible: false
	},
		"application/edifact": {
		source: "iana",
		compressible: false
	},
		"application/efi": {
		source: "iana"
	},
		"application/emergencycalldata.comment+xml": {
		source: "iana"
	},
		"application/emergencycalldata.control+xml": {
		source: "iana"
	},
		"application/emergencycalldata.deviceinfo+xml": {
		source: "iana"
	},
		"application/emergencycalldata.ecall.msd": {
		source: "iana"
	},
		"application/emergencycalldata.providerinfo+xml": {
		source: "iana"
	},
		"application/emergencycalldata.serviceinfo+xml": {
		source: "iana"
	},
		"application/emergencycalldata.subscriberinfo+xml": {
		source: "iana"
	},
		"application/emergencycalldata.veds+xml": {
		source: "iana"
	},
		"application/emma+xml": {
		source: "iana",
		extensions: [
			"emma"
		]
	},
		"application/emotionml+xml": {
		source: "iana"
	},
		"application/encaprtp": {
		source: "iana"
	},
		"application/epp+xml": {
		source: "iana"
	},
		"application/epub+zip": {
		source: "iana",
		extensions: [
			"epub"
		]
	},
		"application/eshop": {
		source: "iana"
	},
		"application/exi": {
		source: "iana",
		extensions: [
			"exi"
		]
	},
		"application/fastinfoset": {
		source: "iana"
	},
		"application/fastsoap": {
		source: "iana"
	},
		"application/fdt+xml": {
		source: "iana"
	},
		"application/fhir+xml": {
		source: "iana"
	},
		"application/fido.trusted-apps+json": {
		compressible: true
	},
		"application/fits": {
		source: "iana"
	},
		"application/font-sfnt": {
		source: "iana"
	},
		"application/font-tdpfr": {
		source: "iana",
		extensions: [
			"pfr"
		]
	},
		"application/font-woff": {
		source: "iana",
		compressible: false,
		extensions: [
			"woff"
		]
	},
		"application/framework-attributes+xml": {
		source: "iana"
	},
		"application/geo+json": {
		source: "iana",
		compressible: true,
		extensions: [
			"geojson"
		]
	},
		"application/geo+json-seq": {
		source: "iana"
	},
		"application/geoxacml+xml": {
		source: "iana"
	},
		"application/gml+xml": {
		source: "iana",
		extensions: [
			"gml"
		]
	},
		"application/gpx+xml": {
		source: "apache",
		extensions: [
			"gpx"
		]
	},
		"application/gxf": {
		source: "apache",
		extensions: [
			"gxf"
		]
	},
		"application/gzip": {
		source: "iana",
		compressible: false,
		extensions: [
			"gz"
		]
	},
		"application/h224": {
		source: "iana"
	},
		"application/held+xml": {
		source: "iana"
	},
		"application/hjson": {
		extensions: [
			"hjson"
		]
	},
		"application/http": {
		source: "iana"
	},
		"application/hyperstudio": {
		source: "iana",
		extensions: [
			"stk"
		]
	},
		"application/ibe-key-request+xml": {
		source: "iana"
	},
		"application/ibe-pkg-reply+xml": {
		source: "iana"
	},
		"application/ibe-pp-data": {
		source: "iana"
	},
		"application/iges": {
		source: "iana"
	},
		"application/im-iscomposing+xml": {
		source: "iana"
	},
		"application/index": {
		source: "iana"
	},
		"application/index.cmd": {
		source: "iana"
	},
		"application/index.obj": {
		source: "iana"
	},
		"application/index.response": {
		source: "iana"
	},
		"application/index.vnd": {
		source: "iana"
	},
		"application/inkml+xml": {
		source: "iana",
		extensions: [
			"ink",
			"inkml"
		]
	},
		"application/iotp": {
		source: "iana"
	},
		"application/ipfix": {
		source: "iana",
		extensions: [
			"ipfix"
		]
	},
		"application/ipp": {
		source: "iana"
	},
		"application/isup": {
		source: "iana"
	},
		"application/its+xml": {
		source: "iana"
	},
		"application/java-archive": {
		source: "apache",
		compressible: false,
		extensions: [
			"jar",
			"war",
			"ear"
		]
	},
		"application/java-serialized-object": {
		source: "apache",
		compressible: false,
		extensions: [
			"ser"
		]
	},
		"application/java-vm": {
		source: "apache",
		compressible: false,
		extensions: [
			"class"
		]
	},
		"application/javascript": {
		source: "iana",
		charset: "UTF-8",
		compressible: true,
		extensions: [
			"js",
			"mjs"
		]
	},
		"application/jf2feed+json": {
		source: "iana",
		compressible: true
	},
		"application/jose": {
		source: "iana"
	},
		"application/jose+json": {
		source: "iana",
		compressible: true
	},
		"application/jrd+json": {
		source: "iana",
		compressible: true
	},
		"application/json": {
		source: "iana",
		charset: "UTF-8",
		compressible: true,
		extensions: [
			"json",
			"map"
		]
	},
		"application/json-patch+json": {
		source: "iana",
		compressible: true
	},
		"application/json-seq": {
		source: "iana"
	},
		"application/json5": {
		extensions: [
			"json5"
		]
	},
		"application/jsonml+json": {
		source: "apache",
		compressible: true,
		extensions: [
			"jsonml"
		]
	},
		"application/jwk+json": {
		source: "iana",
		compressible: true
	},
		"application/jwk-set+json": {
		source: "iana",
		compressible: true
	},
		"application/jwt": {
		source: "iana"
	},
		"application/kpml-request+xml": {
		source: "iana"
	},
		"application/kpml-response+xml": {
		source: "iana"
	},
		"application/ld+json": {
		source: "iana",
		compressible: true,
		extensions: [
			"jsonld"
		]
	},
		"application/lgr+xml": {
		source: "iana"
	},
		"application/link-format": {
		source: "iana"
	},
		"application/load-control+xml": {
		source: "iana"
	},
		"application/lost+xml": {
		source: "iana",
		extensions: [
			"lostxml"
		]
	},
		"application/lostsync+xml": {
		source: "iana"
	},
		"application/lxf": {
		source: "iana"
	},
		"application/mac-binhex40": {
		source: "iana",
		extensions: [
			"hqx"
		]
	},
		"application/mac-compactpro": {
		source: "apache",
		extensions: [
			"cpt"
		]
	},
		"application/macwriteii": {
		source: "iana"
	},
		"application/mads+xml": {
		source: "iana",
		extensions: [
			"mads"
		]
	},
		"application/manifest+json": {
		charset: "UTF-8",
		compressible: true,
		extensions: [
			"webmanifest"
		]
	},
		"application/marc": {
		source: "iana",
		extensions: [
			"mrc"
		]
	},
		"application/marcxml+xml": {
		source: "iana",
		extensions: [
			"mrcx"
		]
	},
		"application/mathematica": {
		source: "iana",
		extensions: [
			"ma",
			"nb",
			"mb"
		]
	},
		"application/mathml+xml": {
		source: "iana",
		extensions: [
			"mathml"
		]
	},
		"application/mathml-content+xml": {
		source: "iana"
	},
		"application/mathml-presentation+xml": {
		source: "iana"
	},
		"application/mbms-associated-procedure-description+xml": {
		source: "iana"
	},
		"application/mbms-deregister+xml": {
		source: "iana"
	},
		"application/mbms-envelope+xml": {
		source: "iana"
	},
		"application/mbms-msk+xml": {
		source: "iana"
	},
		"application/mbms-msk-response+xml": {
		source: "iana"
	},
		"application/mbms-protection-description+xml": {
		source: "iana"
	},
		"application/mbms-reception-report+xml": {
		source: "iana"
	},
		"application/mbms-register+xml": {
		source: "iana"
	},
		"application/mbms-register-response+xml": {
		source: "iana"
	},
		"application/mbms-schedule+xml": {
		source: "iana"
	},
		"application/mbms-user-service-description+xml": {
		source: "iana"
	},
		"application/mbox": {
		source: "iana",
		extensions: [
			"mbox"
		]
	},
		"application/media-policy-dataset+xml": {
		source: "iana"
	},
		"application/media_control+xml": {
		source: "iana"
	},
		"application/mediaservercontrol+xml": {
		source: "iana",
		extensions: [
			"mscml"
		]
	},
		"application/merge-patch+json": {
		source: "iana",
		compressible: true
	},
		"application/metalink+xml": {
		source: "apache",
		extensions: [
			"metalink"
		]
	},
		"application/metalink4+xml": {
		source: "iana",
		extensions: [
			"meta4"
		]
	},
		"application/mets+xml": {
		source: "iana",
		extensions: [
			"mets"
		]
	},
		"application/mf4": {
		source: "iana"
	},
		"application/mikey": {
		source: "iana"
	},
		"application/mmt-usd+xml": {
		source: "iana"
	},
		"application/mods+xml": {
		source: "iana",
		extensions: [
			"mods"
		]
	},
		"application/moss-keys": {
		source: "iana"
	},
		"application/moss-signature": {
		source: "iana"
	},
		"application/mosskey-data": {
		source: "iana"
	},
		"application/mosskey-request": {
		source: "iana"
	},
		"application/mp21": {
		source: "iana",
		extensions: [
			"m21",
			"mp21"
		]
	},
		"application/mp4": {
		source: "iana",
		extensions: [
			"mp4s",
			"m4p"
		]
	},
		"application/mpeg4-generic": {
		source: "iana"
	},
		"application/mpeg4-iod": {
		source: "iana"
	},
		"application/mpeg4-iod-xmt": {
		source: "iana"
	},
		"application/mrb-consumer+xml": {
		source: "iana"
	},
		"application/mrb-publish+xml": {
		source: "iana"
	},
		"application/msc-ivr+xml": {
		source: "iana"
	},
		"application/msc-mixer+xml": {
		source: "iana"
	},
		"application/msword": {
		source: "iana",
		compressible: false,
		extensions: [
			"doc",
			"dot"
		]
	},
		"application/mud+json": {
		source: "iana",
		compressible: true
	},
		"application/mxf": {
		source: "iana",
		extensions: [
			"mxf"
		]
	},
		"application/n-quads": {
		source: "iana"
	},
		"application/n-triples": {
		source: "iana"
	},
		"application/nasdata": {
		source: "iana"
	},
		"application/news-checkgroups": {
		source: "iana"
	},
		"application/news-groupinfo": {
		source: "iana"
	},
		"application/news-transmission": {
		source: "iana"
	},
		"application/nlsml+xml": {
		source: "iana"
	},
		"application/node": {
		source: "iana"
	},
		"application/nss": {
		source: "iana"
	},
		"application/ocsp-request": {
		source: "iana"
	},
		"application/ocsp-response": {
		source: "iana"
	},
		"application/octet-stream": {
		source: "iana",
		compressible: false,
		extensions: [
			"bin",
			"dms",
			"lrf",
			"mar",
			"so",
			"dist",
			"distz",
			"pkg",
			"bpk",
			"dump",
			"elc",
			"deploy",
			"exe",
			"dll",
			"deb",
			"dmg",
			"iso",
			"img",
			"msi",
			"msp",
			"msm",
			"buffer"
		]
	},
		"application/oda": {
		source: "iana",
		extensions: [
			"oda"
		]
	},
		"application/odx": {
		source: "iana"
	},
		"application/oebps-package+xml": {
		source: "iana",
		extensions: [
			"opf"
		]
	},
		"application/ogg": {
		source: "iana",
		compressible: false,
		extensions: [
			"ogx"
		]
	},
		"application/omdoc+xml": {
		source: "apache",
		extensions: [
			"omdoc"
		]
	},
		"application/onenote": {
		source: "apache",
		extensions: [
			"onetoc",
			"onetoc2",
			"onetmp",
			"onepkg"
		]
	},
		"application/oxps": {
		source: "iana",
		extensions: [
			"oxps"
		]
	},
		"application/p2p-overlay+xml": {
		source: "iana"
	},
		"application/parityfec": {
		source: "iana"
	},
		"application/passport": {
		source: "iana"
	},
		"application/patch-ops-error+xml": {
		source: "iana",
		extensions: [
			"xer"
		]
	},
		"application/pdf": {
		source: "iana",
		compressible: false,
		extensions: [
			"pdf"
		]
	},
		"application/pdx": {
		source: "iana"
	},
		"application/pgp-encrypted": {
		source: "iana",
		compressible: false,
		extensions: [
			"pgp"
		]
	},
		"application/pgp-keys": {
		source: "iana"
	},
		"application/pgp-signature": {
		source: "iana",
		extensions: [
			"asc",
			"sig"
		]
	},
		"application/pics-rules": {
		source: "apache",
		extensions: [
			"prf"
		]
	},
		"application/pidf+xml": {
		source: "iana"
	},
		"application/pidf-diff+xml": {
		source: "iana"
	},
		"application/pkcs10": {
		source: "iana",
		extensions: [
			"p10"
		]
	},
		"application/pkcs12": {
		source: "iana"
	},
		"application/pkcs7-mime": {
		source: "iana",
		extensions: [
			"p7m",
			"p7c"
		]
	},
		"application/pkcs7-signature": {
		source: "iana",
		extensions: [
			"p7s"
		]
	},
		"application/pkcs8": {
		source: "iana",
		extensions: [
			"p8"
		]
	},
		"application/pkcs8-encrypted": {
		source: "iana"
	},
		"application/pkix-attr-cert": {
		source: "iana",
		extensions: [
			"ac"
		]
	},
		"application/pkix-cert": {
		source: "iana",
		extensions: [
			"cer"
		]
	},
		"application/pkix-crl": {
		source: "iana",
		extensions: [
			"crl"
		]
	},
		"application/pkix-pkipath": {
		source: "iana",
		extensions: [
			"pkipath"
		]
	},
		"application/pkixcmp": {
		source: "iana",
		extensions: [
			"pki"
		]
	},
		"application/pls+xml": {
		source: "iana",
		extensions: [
			"pls"
		]
	},
		"application/poc-settings+xml": {
		source: "iana"
	},
		"application/postscript": {
		source: "iana",
		compressible: true,
		extensions: [
			"ai",
			"eps",
			"ps"
		]
	},
		"application/ppsp-tracker+json": {
		source: "iana",
		compressible: true
	},
		"application/problem+json": {
		source: "iana",
		compressible: true
	},
		"application/problem+xml": {
		source: "iana"
	},
		"application/provenance+xml": {
		source: "iana"
	},
		"application/prs.alvestrand.titrax-sheet": {
		source: "iana"
	},
		"application/prs.cww": {
		source: "iana",
		extensions: [
			"cww"
		]
	},
		"application/prs.hpub+zip": {
		source: "iana"
	},
		"application/prs.nprend": {
		source: "iana"
	},
		"application/prs.plucker": {
		source: "iana"
	},
		"application/prs.rdf-xml-crypt": {
		source: "iana"
	},
		"application/prs.xsf+xml": {
		source: "iana"
	},
		"application/pskc+xml": {
		source: "iana",
		extensions: [
			"pskcxml"
		]
	},
		"application/qsig": {
		source: "iana"
	},
		"application/raml+yaml": {
		compressible: true,
		extensions: [
			"raml"
		]
	},
		"application/raptorfec": {
		source: "iana"
	},
		"application/rdap+json": {
		source: "iana",
		compressible: true
	},
		"application/rdf+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"rdf"
		]
	},
		"application/reginfo+xml": {
		source: "iana",
		extensions: [
			"rif"
		]
	},
		"application/relax-ng-compact-syntax": {
		source: "iana",
		extensions: [
			"rnc"
		]
	},
		"application/remote-printing": {
		source: "iana"
	},
		"application/reputon+json": {
		source: "iana",
		compressible: true
	},
		"application/resource-lists+xml": {
		source: "iana",
		extensions: [
			"rl"
		]
	},
		"application/resource-lists-diff+xml": {
		source: "iana",
		extensions: [
			"rld"
		]
	},
		"application/rfc+xml": {
		source: "iana"
	},
		"application/riscos": {
		source: "iana"
	},
		"application/rlmi+xml": {
		source: "iana"
	},
		"application/rls-services+xml": {
		source: "iana",
		extensions: [
			"rs"
		]
	},
		"application/route-apd+xml": {
		source: "iana"
	},
		"application/route-s-tsid+xml": {
		source: "iana"
	},
		"application/route-usd+xml": {
		source: "iana"
	},
		"application/rpki-ghostbusters": {
		source: "iana",
		extensions: [
			"gbr"
		]
	},
		"application/rpki-manifest": {
		source: "iana",
		extensions: [
			"mft"
		]
	},
		"application/rpki-publication": {
		source: "iana"
	},
		"application/rpki-roa": {
		source: "iana",
		extensions: [
			"roa"
		]
	},
		"application/rpki-updown": {
		source: "iana"
	},
		"application/rsd+xml": {
		source: "apache",
		extensions: [
			"rsd"
		]
	},
		"application/rss+xml": {
		source: "apache",
		compressible: true,
		extensions: [
			"rss"
		]
	},
		"application/rtf": {
		source: "iana",
		compressible: true,
		extensions: [
			"rtf"
		]
	},
		"application/rtploopback": {
		source: "iana"
	},
		"application/rtx": {
		source: "iana"
	},
		"application/samlassertion+xml": {
		source: "iana"
	},
		"application/samlmetadata+xml": {
		source: "iana"
	},
		"application/sbml+xml": {
		source: "iana",
		extensions: [
			"sbml"
		]
	},
		"application/scaip+xml": {
		source: "iana"
	},
		"application/scim+json": {
		source: "iana",
		compressible: true
	},
		"application/scvp-cv-request": {
		source: "iana",
		extensions: [
			"scq"
		]
	},
		"application/scvp-cv-response": {
		source: "iana",
		extensions: [
			"scs"
		]
	},
		"application/scvp-vp-request": {
		source: "iana",
		extensions: [
			"spq"
		]
	},
		"application/scvp-vp-response": {
		source: "iana",
		extensions: [
			"spp"
		]
	},
		"application/sdp": {
		source: "iana",
		extensions: [
			"sdp"
		]
	},
		"application/sep+xml": {
		source: "iana"
	},
		"application/sep-exi": {
		source: "iana"
	},
		"application/session-info": {
		source: "iana"
	},
		"application/set-payment": {
		source: "iana"
	},
		"application/set-payment-initiation": {
		source: "iana",
		extensions: [
			"setpay"
		]
	},
		"application/set-registration": {
		source: "iana"
	},
		"application/set-registration-initiation": {
		source: "iana",
		extensions: [
			"setreg"
		]
	},
		"application/sgml": {
		source: "iana"
	},
		"application/sgml-open-catalog": {
		source: "iana"
	},
		"application/shf+xml": {
		source: "iana",
		extensions: [
			"shf"
		]
	},
		"application/sieve": {
		source: "iana"
	},
		"application/simple-filter+xml": {
		source: "iana"
	},
		"application/simple-message-summary": {
		source: "iana"
	},
		"application/simplesymbolcontainer": {
		source: "iana"
	},
		"application/slate": {
		source: "iana"
	},
		"application/smil": {
		source: "iana"
	},
		"application/smil+xml": {
		source: "iana",
		extensions: [
			"smi",
			"smil"
		]
	},
		"application/smpte336m": {
		source: "iana"
	},
		"application/soap+fastinfoset": {
		source: "iana"
	},
		"application/soap+xml": {
		source: "iana",
		compressible: true
	},
		"application/sparql-query": {
		source: "iana",
		extensions: [
			"rq"
		]
	},
		"application/sparql-results+xml": {
		source: "iana",
		extensions: [
			"srx"
		]
	},
		"application/spirits-event+xml": {
		source: "iana"
	},
		"application/sql": {
		source: "iana"
	},
		"application/srgs": {
		source: "iana",
		extensions: [
			"gram"
		]
	},
		"application/srgs+xml": {
		source: "iana",
		extensions: [
			"grxml"
		]
	},
		"application/sru+xml": {
		source: "iana",
		extensions: [
			"sru"
		]
	},
		"application/ssdl+xml": {
		source: "apache",
		extensions: [
			"ssdl"
		]
	},
		"application/ssml+xml": {
		source: "iana",
		extensions: [
			"ssml"
		]
	},
		"application/tamp-apex-update": {
		source: "iana"
	},
		"application/tamp-apex-update-confirm": {
		source: "iana"
	},
		"application/tamp-community-update": {
		source: "iana"
	},
		"application/tamp-community-update-confirm": {
		source: "iana"
	},
		"application/tamp-error": {
		source: "iana"
	},
		"application/tamp-sequence-adjust": {
		source: "iana"
	},
		"application/tamp-sequence-adjust-confirm": {
		source: "iana"
	},
		"application/tamp-status-query": {
		source: "iana"
	},
		"application/tamp-status-response": {
		source: "iana"
	},
		"application/tamp-update": {
		source: "iana"
	},
		"application/tamp-update-confirm": {
		source: "iana"
	},
		"application/tar": {
		compressible: true
	},
		"application/tei+xml": {
		source: "iana",
		extensions: [
			"tei",
			"teicorpus"
		]
	},
		"application/thraud+xml": {
		source: "iana",
		extensions: [
			"tfi"
		]
	},
		"application/timestamp-query": {
		source: "iana"
	},
		"application/timestamp-reply": {
		source: "iana"
	},
		"application/timestamped-data": {
		source: "iana",
		extensions: [
			"tsd"
		]
	},
		"application/tnauthlist": {
		source: "iana"
	},
		"application/trig": {
		source: "iana"
	},
		"application/ttml+xml": {
		source: "iana"
	},
		"application/tve-trigger": {
		source: "iana"
	},
		"application/ulpfec": {
		source: "iana"
	},
		"application/urc-grpsheet+xml": {
		source: "iana"
	},
		"application/urc-ressheet+xml": {
		source: "iana"
	},
		"application/urc-targetdesc+xml": {
		source: "iana"
	},
		"application/urc-uisocketdesc+xml": {
		source: "iana"
	},
		"application/vcard+json": {
		source: "iana",
		compressible: true
	},
		"application/vcard+xml": {
		source: "iana"
	},
		"application/vemmi": {
		source: "iana"
	},
		"application/vividence.scriptfile": {
		source: "apache"
	},
		"application/vnd.1000minds.decision-model+xml": {
		source: "iana"
	},
		"application/vnd.3gpp-prose+xml": {
		source: "iana"
	},
		"application/vnd.3gpp-prose-pc3ch+xml": {
		source: "iana"
	},
		"application/vnd.3gpp-v2x-local-service-information": {
		source: "iana"
	},
		"application/vnd.3gpp.access-transfer-events+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.bsf+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.gmop+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mcptt-affiliation-command+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mcptt-floor-request+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mcptt-info+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mcptt-location-info+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mcptt-signed+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.mid-call+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.pic-bw-large": {
		source: "iana",
		extensions: [
			"plb"
		]
	},
		"application/vnd.3gpp.pic-bw-small": {
		source: "iana",
		extensions: [
			"psb"
		]
	},
		"application/vnd.3gpp.pic-bw-var": {
		source: "iana",
		extensions: [
			"pvb"
		]
	},
		"application/vnd.3gpp.sms": {
		source: "iana"
	},
		"application/vnd.3gpp.sms+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.srvcc-ext+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.srvcc-info+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.state-and-event-info+xml": {
		source: "iana"
	},
		"application/vnd.3gpp.ussd+xml": {
		source: "iana"
	},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
		source: "iana"
	},
		"application/vnd.3gpp2.sms": {
		source: "iana"
	},
		"application/vnd.3gpp2.tcap": {
		source: "iana",
		extensions: [
			"tcap"
		]
	},
		"application/vnd.3lightssoftware.imagescal": {
		source: "iana"
	},
		"application/vnd.3m.post-it-notes": {
		source: "iana",
		extensions: [
			"pwn"
		]
	},
		"application/vnd.accpac.simply.aso": {
		source: "iana",
		extensions: [
			"aso"
		]
	},
		"application/vnd.accpac.simply.imp": {
		source: "iana",
		extensions: [
			"imp"
		]
	},
		"application/vnd.acucobol": {
		source: "iana",
		extensions: [
			"acu"
		]
	},
		"application/vnd.acucorp": {
		source: "iana",
		extensions: [
			"atc",
			"acutc"
		]
	},
		"application/vnd.adobe.air-application-installer-package+zip": {
		source: "apache",
		extensions: [
			"air"
		]
	},
		"application/vnd.adobe.flash.movie": {
		source: "iana"
	},
		"application/vnd.adobe.formscentral.fcdt": {
		source: "iana",
		extensions: [
			"fcdt"
		]
	},
		"application/vnd.adobe.fxp": {
		source: "iana",
		extensions: [
			"fxp",
			"fxpl"
		]
	},
		"application/vnd.adobe.partial-upload": {
		source: "iana"
	},
		"application/vnd.adobe.xdp+xml": {
		source: "iana",
		extensions: [
			"xdp"
		]
	},
		"application/vnd.adobe.xfdf": {
		source: "iana",
		extensions: [
			"xfdf"
		]
	},
		"application/vnd.aether.imp": {
		source: "iana"
	},
		"application/vnd.ah-barcode": {
		source: "iana"
	},
		"application/vnd.ahead.space": {
		source: "iana",
		extensions: [
			"ahead"
		]
	},
		"application/vnd.airzip.filesecure.azf": {
		source: "iana",
		extensions: [
			"azf"
		]
	},
		"application/vnd.airzip.filesecure.azs": {
		source: "iana",
		extensions: [
			"azs"
		]
	},
		"application/vnd.amadeus+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.amazon.ebook": {
		source: "apache",
		extensions: [
			"azw"
		]
	},
		"application/vnd.amazon.mobi8-ebook": {
		source: "iana"
	},
		"application/vnd.americandynamics.acc": {
		source: "iana",
		extensions: [
			"acc"
		]
	},
		"application/vnd.amiga.ami": {
		source: "iana",
		extensions: [
			"ami"
		]
	},
		"application/vnd.amundsen.maze+xml": {
		source: "iana"
	},
		"application/vnd.android.package-archive": {
		source: "apache",
		compressible: false,
		extensions: [
			"apk"
		]
	},
		"application/vnd.anki": {
		source: "iana"
	},
		"application/vnd.anser-web-certificate-issue-initiation": {
		source: "iana",
		extensions: [
			"cii"
		]
	},
		"application/vnd.anser-web-funds-transfer-initiation": {
		source: "apache",
		extensions: [
			"fti"
		]
	},
		"application/vnd.antix.game-component": {
		source: "iana",
		extensions: [
			"atx"
		]
	},
		"application/vnd.apache.thrift.binary": {
		source: "iana"
	},
		"application/vnd.apache.thrift.compact": {
		source: "iana"
	},
		"application/vnd.apache.thrift.json": {
		source: "iana"
	},
		"application/vnd.api+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.apothekende.reservation+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.apple.installer+xml": {
		source: "iana",
		extensions: [
			"mpkg"
		]
	},
		"application/vnd.apple.mpegurl": {
		source: "iana",
		extensions: [
			"m3u8"
		]
	},
		"application/vnd.apple.pkpass": {
		compressible: false,
		extensions: [
			"pkpass"
		]
	},
		"application/vnd.arastra.swi": {
		source: "iana"
	},
		"application/vnd.aristanetworks.swi": {
		source: "iana",
		extensions: [
			"swi"
		]
	},
		"application/vnd.artsquare": {
		source: "iana"
	},
		"application/vnd.astraea-software.iota": {
		source: "iana",
		extensions: [
			"iota"
		]
	},
		"application/vnd.audiograph": {
		source: "iana",
		extensions: [
			"aep"
		]
	},
		"application/vnd.autopackage": {
		source: "iana"
	},
		"application/vnd.avalon+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.avistar+xml": {
		source: "iana"
	},
		"application/vnd.balsamiq.bmml+xml": {
		source: "iana"
	},
		"application/vnd.balsamiq.bmpr": {
		source: "iana"
	},
		"application/vnd.bbf.usp.msg": {
		source: "iana"
	},
		"application/vnd.bbf.usp.msg+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.bekitzur-stech+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.bint.med-content": {
		source: "iana"
	},
		"application/vnd.biopax.rdf+xml": {
		source: "iana"
	},
		"application/vnd.blink-idb-value-wrapper": {
		source: "iana"
	},
		"application/vnd.blueice.multipass": {
		source: "iana",
		extensions: [
			"mpm"
		]
	},
		"application/vnd.bluetooth.ep.oob": {
		source: "iana"
	},
		"application/vnd.bluetooth.le.oob": {
		source: "iana"
	},
		"application/vnd.bmi": {
		source: "iana",
		extensions: [
			"bmi"
		]
	},
		"application/vnd.businessobjects": {
		source: "iana",
		extensions: [
			"rep"
		]
	},
		"application/vnd.cab-jscript": {
		source: "iana"
	},
		"application/vnd.canon-cpdl": {
		source: "iana"
	},
		"application/vnd.canon-lips": {
		source: "iana"
	},
		"application/vnd.capasystems-pg+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.cendio.thinlinc.clientconf": {
		source: "iana"
	},
		"application/vnd.century-systems.tcp_stream": {
		source: "iana"
	},
		"application/vnd.chemdraw+xml": {
		source: "iana",
		extensions: [
			"cdxml"
		]
	},
		"application/vnd.chess-pgn": {
		source: "iana"
	},
		"application/vnd.chipnuts.karaoke-mmd": {
		source: "iana",
		extensions: [
			"mmd"
		]
	},
		"application/vnd.cinderella": {
		source: "iana",
		extensions: [
			"cdy"
		]
	},
		"application/vnd.cirpack.isdn-ext": {
		source: "iana"
	},
		"application/vnd.citationstyles.style+xml": {
		source: "iana"
	},
		"application/vnd.claymore": {
		source: "iana",
		extensions: [
			"cla"
		]
	},
		"application/vnd.cloanto.rp9": {
		source: "iana",
		extensions: [
			"rp9"
		]
	},
		"application/vnd.clonk.c4group": {
		source: "iana",
		extensions: [
			"c4g",
			"c4d",
			"c4f",
			"c4p",
			"c4u"
		]
	},
		"application/vnd.cluetrust.cartomobile-config": {
		source: "iana",
		extensions: [
			"c11amc"
		]
	},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
		source: "iana",
		extensions: [
			"c11amz"
		]
	},
		"application/vnd.coffeescript": {
		source: "iana"
	},
		"application/vnd.collabio.xodocuments.document": {
		source: "iana"
	},
		"application/vnd.collabio.xodocuments.document-template": {
		source: "iana"
	},
		"application/vnd.collabio.xodocuments.presentation": {
		source: "iana"
	},
		"application/vnd.collabio.xodocuments.presentation-template": {
		source: "iana"
	},
		"application/vnd.collabio.xodocuments.spreadsheet": {
		source: "iana"
	},
		"application/vnd.collabio.xodocuments.spreadsheet-template": {
		source: "iana"
	},
		"application/vnd.collection+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.collection.doc+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.collection.next+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.comicbook+zip": {
		source: "iana"
	},
		"application/vnd.comicbook-rar": {
		source: "iana"
	},
		"application/vnd.commerce-battelle": {
		source: "iana"
	},
		"application/vnd.commonspace": {
		source: "iana",
		extensions: [
			"csp"
		]
	},
		"application/vnd.contact.cmsg": {
		source: "iana",
		extensions: [
			"cdbcmsg"
		]
	},
		"application/vnd.coreos.ignition+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.cosmocaller": {
		source: "iana",
		extensions: [
			"cmc"
		]
	},
		"application/vnd.crick.clicker": {
		source: "iana",
		extensions: [
			"clkx"
		]
	},
		"application/vnd.crick.clicker.keyboard": {
		source: "iana",
		extensions: [
			"clkk"
		]
	},
		"application/vnd.crick.clicker.palette": {
		source: "iana",
		extensions: [
			"clkp"
		]
	},
		"application/vnd.crick.clicker.template": {
		source: "iana",
		extensions: [
			"clkt"
		]
	},
		"application/vnd.crick.clicker.wordbank": {
		source: "iana",
		extensions: [
			"clkw"
		]
	},
		"application/vnd.criticaltools.wbs+xml": {
		source: "iana",
		extensions: [
			"wbs"
		]
	},
		"application/vnd.ctc-posml": {
		source: "iana",
		extensions: [
			"pml"
		]
	},
		"application/vnd.ctct.ws+xml": {
		source: "iana"
	},
		"application/vnd.cups-pdf": {
		source: "iana"
	},
		"application/vnd.cups-postscript": {
		source: "iana"
	},
		"application/vnd.cups-ppd": {
		source: "iana",
		extensions: [
			"ppd"
		]
	},
		"application/vnd.cups-raster": {
		source: "iana"
	},
		"application/vnd.cups-raw": {
		source: "iana"
	},
		"application/vnd.curl": {
		source: "iana"
	},
		"application/vnd.curl.car": {
		source: "apache",
		extensions: [
			"car"
		]
	},
		"application/vnd.curl.pcurl": {
		source: "apache",
		extensions: [
			"pcurl"
		]
	},
		"application/vnd.cyan.dean.root+xml": {
		source: "iana"
	},
		"application/vnd.cybank": {
		source: "iana"
	},
		"application/vnd.d2l.coursepackage1p0+zip": {
		source: "iana"
	},
		"application/vnd.dart": {
		source: "iana",
		compressible: true,
		extensions: [
			"dart"
		]
	},
		"application/vnd.data-vision.rdz": {
		source: "iana",
		extensions: [
			"rdz"
		]
	},
		"application/vnd.datapackage+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.dataresource+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.debian.binary-package": {
		source: "iana"
	},
		"application/vnd.dece.data": {
		source: "iana",
		extensions: [
			"uvf",
			"uvvf",
			"uvd",
			"uvvd"
		]
	},
		"application/vnd.dece.ttml+xml": {
		source: "iana",
		extensions: [
			"uvt",
			"uvvt"
		]
	},
		"application/vnd.dece.unspecified": {
		source: "iana",
		extensions: [
			"uvx",
			"uvvx"
		]
	},
		"application/vnd.dece.zip": {
		source: "iana",
		extensions: [
			"uvz",
			"uvvz"
		]
	},
		"application/vnd.denovo.fcselayout-link": {
		source: "iana",
		extensions: [
			"fe_launch"
		]
	},
		"application/vnd.desmume-movie": {
		source: "iana"
	},
		"application/vnd.desmume.movie": {
		source: "apache"
	},
		"application/vnd.dir-bi.plate-dl-nosuffix": {
		source: "iana"
	},
		"application/vnd.dm.delegation+xml": {
		source: "iana"
	},
		"application/vnd.dna": {
		source: "iana",
		extensions: [
			"dna"
		]
	},
		"application/vnd.document+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.dolby.mlp": {
		source: "apache",
		extensions: [
			"mlp"
		]
	},
		"application/vnd.dolby.mobile.1": {
		source: "iana"
	},
		"application/vnd.dolby.mobile.2": {
		source: "iana"
	},
		"application/vnd.doremir.scorecloud-binary-document": {
		source: "iana"
	},
		"application/vnd.dpgraph": {
		source: "iana",
		extensions: [
			"dpg"
		]
	},
		"application/vnd.dreamfactory": {
		source: "iana",
		extensions: [
			"dfac"
		]
	},
		"application/vnd.drive+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.ds-keypoint": {
		source: "apache",
		extensions: [
			"kpxx"
		]
	},
		"application/vnd.dtg.local": {
		source: "iana"
	},
		"application/vnd.dtg.local.flash": {
		source: "iana"
	},
		"application/vnd.dtg.local.html": {
		source: "iana"
	},
		"application/vnd.dvb.ait": {
		source: "iana",
		extensions: [
			"ait"
		]
	},
		"application/vnd.dvb.dvbj": {
		source: "iana"
	},
		"application/vnd.dvb.esgcontainer": {
		source: "iana"
	},
		"application/vnd.dvb.ipdcdftnotifaccess": {
		source: "iana"
	},
		"application/vnd.dvb.ipdcesgaccess": {
		source: "iana"
	},
		"application/vnd.dvb.ipdcesgaccess2": {
		source: "iana"
	},
		"application/vnd.dvb.ipdcesgpdd": {
		source: "iana"
	},
		"application/vnd.dvb.ipdcroaming": {
		source: "iana"
	},
		"application/vnd.dvb.iptv.alfec-base": {
		source: "iana"
	},
		"application/vnd.dvb.iptv.alfec-enhancement": {
		source: "iana"
	},
		"application/vnd.dvb.notif-aggregate-root+xml": {
		source: "iana"
	},
		"application/vnd.dvb.notif-container+xml": {
		source: "iana"
	},
		"application/vnd.dvb.notif-generic+xml": {
		source: "iana"
	},
		"application/vnd.dvb.notif-ia-msglist+xml": {
		source: "iana"
	},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
		source: "iana"
	},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
		source: "iana"
	},
		"application/vnd.dvb.notif-init+xml": {
		source: "iana"
	},
		"application/vnd.dvb.pfr": {
		source: "iana"
	},
		"application/vnd.dvb.service": {
		source: "iana",
		extensions: [
			"svc"
		]
	},
		"application/vnd.dxr": {
		source: "iana"
	},
		"application/vnd.dynageo": {
		source: "iana",
		extensions: [
			"geo"
		]
	},
		"application/vnd.dzr": {
		source: "iana"
	},
		"application/vnd.easykaraoke.cdgdownload": {
		source: "iana"
	},
		"application/vnd.ecdis-update": {
		source: "iana"
	},
		"application/vnd.ecip.rlp": {
		source: "iana"
	},
		"application/vnd.ecowin.chart": {
		source: "iana",
		extensions: [
			"mag"
		]
	},
		"application/vnd.ecowin.filerequest": {
		source: "iana"
	},
		"application/vnd.ecowin.fileupdate": {
		source: "iana"
	},
		"application/vnd.ecowin.series": {
		source: "iana"
	},
		"application/vnd.ecowin.seriesrequest": {
		source: "iana"
	},
		"application/vnd.ecowin.seriesupdate": {
		source: "iana"
	},
		"application/vnd.efi.img": {
		source: "iana"
	},
		"application/vnd.efi.iso": {
		source: "iana"
	},
		"application/vnd.emclient.accessrequest+xml": {
		source: "iana"
	},
		"application/vnd.enliven": {
		source: "iana",
		extensions: [
			"nml"
		]
	},
		"application/vnd.enphase.envoy": {
		source: "iana"
	},
		"application/vnd.eprints.data+xml": {
		source: "iana"
	},
		"application/vnd.epson.esf": {
		source: "iana",
		extensions: [
			"esf"
		]
	},
		"application/vnd.epson.msf": {
		source: "iana",
		extensions: [
			"msf"
		]
	},
		"application/vnd.epson.quickanime": {
		source: "iana",
		extensions: [
			"qam"
		]
	},
		"application/vnd.epson.salt": {
		source: "iana",
		extensions: [
			"slt"
		]
	},
		"application/vnd.epson.ssf": {
		source: "iana",
		extensions: [
			"ssf"
		]
	},
		"application/vnd.ericsson.quickcall": {
		source: "iana"
	},
		"application/vnd.espass-espass+zip": {
		source: "iana"
	},
		"application/vnd.eszigno3+xml": {
		source: "iana",
		extensions: [
			"es3",
			"et3"
		]
	},
		"application/vnd.etsi.aoc+xml": {
		source: "iana"
	},
		"application/vnd.etsi.asic-e+zip": {
		source: "iana"
	},
		"application/vnd.etsi.asic-s+zip": {
		source: "iana"
	},
		"application/vnd.etsi.cug+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvcommand+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvdiscovery+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvprofile+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvsad-bc+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvsad-cod+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvsad-npvr+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvservice+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvsync+xml": {
		source: "iana"
	},
		"application/vnd.etsi.iptvueprofile+xml": {
		source: "iana"
	},
		"application/vnd.etsi.mcid+xml": {
		source: "iana"
	},
		"application/vnd.etsi.mheg5": {
		source: "iana"
	},
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
		source: "iana"
	},
		"application/vnd.etsi.pstn+xml": {
		source: "iana"
	},
		"application/vnd.etsi.sci+xml": {
		source: "iana"
	},
		"application/vnd.etsi.simservs+xml": {
		source: "iana"
	},
		"application/vnd.etsi.timestamp-token": {
		source: "iana"
	},
		"application/vnd.etsi.tsl+xml": {
		source: "iana"
	},
		"application/vnd.etsi.tsl.der": {
		source: "iana"
	},
		"application/vnd.eudora.data": {
		source: "iana"
	},
		"application/vnd.evolv.ecig.profile": {
		source: "iana"
	},
		"application/vnd.evolv.ecig.settings": {
		source: "iana"
	},
		"application/vnd.evolv.ecig.theme": {
		source: "iana"
	},
		"application/vnd.ezpix-album": {
		source: "iana",
		extensions: [
			"ez2"
		]
	},
		"application/vnd.ezpix-package": {
		source: "iana",
		extensions: [
			"ez3"
		]
	},
		"application/vnd.f-secure.mobile": {
		source: "iana"
	},
		"application/vnd.fastcopy-disk-image": {
		source: "iana"
	},
		"application/vnd.fdf": {
		source: "iana",
		extensions: [
			"fdf"
		]
	},
		"application/vnd.fdsn.mseed": {
		source: "iana",
		extensions: [
			"mseed"
		]
	},
		"application/vnd.fdsn.seed": {
		source: "iana",
		extensions: [
			"seed",
			"dataless"
		]
	},
		"application/vnd.ffsns": {
		source: "iana"
	},
		"application/vnd.filmit.zfc": {
		source: "iana"
	},
		"application/vnd.fints": {
		source: "iana"
	},
		"application/vnd.firemonkeys.cloudcell": {
		source: "iana"
	},
		"application/vnd.flographit": {
		source: "iana",
		extensions: [
			"gph"
		]
	},
		"application/vnd.fluxtime.clip": {
		source: "iana",
		extensions: [
			"ftc"
		]
	},
		"application/vnd.font-fontforge-sfd": {
		source: "iana"
	},
		"application/vnd.framemaker": {
		source: "iana",
		extensions: [
			"fm",
			"frame",
			"maker",
			"book"
		]
	},
		"application/vnd.frogans.fnc": {
		source: "iana",
		extensions: [
			"fnc"
		]
	},
		"application/vnd.frogans.ltf": {
		source: "iana",
		extensions: [
			"ltf"
		]
	},
		"application/vnd.fsc.weblaunch": {
		source: "iana",
		extensions: [
			"fsc"
		]
	},
		"application/vnd.fujitsu.oasys": {
		source: "iana",
		extensions: [
			"oas"
		]
	},
		"application/vnd.fujitsu.oasys2": {
		source: "iana",
		extensions: [
			"oa2"
		]
	},
		"application/vnd.fujitsu.oasys3": {
		source: "iana",
		extensions: [
			"oa3"
		]
	},
		"application/vnd.fujitsu.oasysgp": {
		source: "iana",
		extensions: [
			"fg5"
		]
	},
		"application/vnd.fujitsu.oasysprs": {
		source: "iana",
		extensions: [
			"bh2"
		]
	},
		"application/vnd.fujixerox.art-ex": {
		source: "iana"
	},
		"application/vnd.fujixerox.art4": {
		source: "iana"
	},
		"application/vnd.fujixerox.ddd": {
		source: "iana",
		extensions: [
			"ddd"
		]
	},
		"application/vnd.fujixerox.docuworks": {
		source: "iana",
		extensions: [
			"xdw"
		]
	},
		"application/vnd.fujixerox.docuworks.binder": {
		source: "iana",
		extensions: [
			"xbd"
		]
	},
		"application/vnd.fujixerox.docuworks.container": {
		source: "iana"
	},
		"application/vnd.fujixerox.hbpl": {
		source: "iana"
	},
		"application/vnd.fut-misnet": {
		source: "iana"
	},
		"application/vnd.fuzzysheet": {
		source: "iana",
		extensions: [
			"fzs"
		]
	},
		"application/vnd.genomatix.tuxedo": {
		source: "iana",
		extensions: [
			"txd"
		]
	},
		"application/vnd.geo+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.geocube+xml": {
		source: "iana"
	},
		"application/vnd.geogebra.file": {
		source: "iana",
		extensions: [
			"ggb"
		]
	},
		"application/vnd.geogebra.tool": {
		source: "iana",
		extensions: [
			"ggt"
		]
	},
		"application/vnd.geometry-explorer": {
		source: "iana",
		extensions: [
			"gex",
			"gre"
		]
	},
		"application/vnd.geonext": {
		source: "iana",
		extensions: [
			"gxt"
		]
	},
		"application/vnd.geoplan": {
		source: "iana",
		extensions: [
			"g2w"
		]
	},
		"application/vnd.geospace": {
		source: "iana",
		extensions: [
			"g3w"
		]
	},
		"application/vnd.gerber": {
		source: "iana"
	},
		"application/vnd.globalplatform.card-content-mgt": {
		source: "iana"
	},
		"application/vnd.globalplatform.card-content-mgt-response": {
		source: "iana"
	},
		"application/vnd.gmx": {
		source: "iana",
		extensions: [
			"gmx"
		]
	},
		"application/vnd.google-apps.document": {
		compressible: false,
		extensions: [
			"gdoc"
		]
	},
		"application/vnd.google-apps.presentation": {
		compressible: false,
		extensions: [
			"gslides"
		]
	},
		"application/vnd.google-apps.spreadsheet": {
		compressible: false,
		extensions: [
			"gsheet"
		]
	},
		"application/vnd.google-earth.kml+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"kml"
		]
	},
		"application/vnd.google-earth.kmz": {
		source: "iana",
		compressible: false,
		extensions: [
			"kmz"
		]
	},
		"application/vnd.gov.sk.e-form+xml": {
		source: "iana"
	},
		"application/vnd.gov.sk.e-form+zip": {
		source: "iana"
	},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
		source: "iana"
	},
		"application/vnd.grafeq": {
		source: "iana",
		extensions: [
			"gqf",
			"gqs"
		]
	},
		"application/vnd.gridmp": {
		source: "iana"
	},
		"application/vnd.groove-account": {
		source: "iana",
		extensions: [
			"gac"
		]
	},
		"application/vnd.groove-help": {
		source: "iana",
		extensions: [
			"ghf"
		]
	},
		"application/vnd.groove-identity-message": {
		source: "iana",
		extensions: [
			"gim"
		]
	},
		"application/vnd.groove-injector": {
		source: "iana",
		extensions: [
			"grv"
		]
	},
		"application/vnd.groove-tool-message": {
		source: "iana",
		extensions: [
			"gtm"
		]
	},
		"application/vnd.groove-tool-template": {
		source: "iana",
		extensions: [
			"tpl"
		]
	},
		"application/vnd.groove-vcard": {
		source: "iana",
		extensions: [
			"vcg"
		]
	},
		"application/vnd.hal+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.hal+xml": {
		source: "iana",
		extensions: [
			"hal"
		]
	},
		"application/vnd.handheld-entertainment+xml": {
		source: "iana",
		extensions: [
			"zmm"
		]
	},
		"application/vnd.hbci": {
		source: "iana",
		extensions: [
			"hbci"
		]
	},
		"application/vnd.hc+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.hcl-bireports": {
		source: "iana"
	},
		"application/vnd.hdt": {
		source: "iana"
	},
		"application/vnd.heroku+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.hhe.lesson-player": {
		source: "iana",
		extensions: [
			"les"
		]
	},
		"application/vnd.hp-hpgl": {
		source: "iana",
		extensions: [
			"hpgl"
		]
	},
		"application/vnd.hp-hpid": {
		source: "iana",
		extensions: [
			"hpid"
		]
	},
		"application/vnd.hp-hps": {
		source: "iana",
		extensions: [
			"hps"
		]
	},
		"application/vnd.hp-jlyt": {
		source: "iana",
		extensions: [
			"jlt"
		]
	},
		"application/vnd.hp-pcl": {
		source: "iana",
		extensions: [
			"pcl"
		]
	},
		"application/vnd.hp-pclxl": {
		source: "iana",
		extensions: [
			"pclxl"
		]
	},
		"application/vnd.httphone": {
		source: "iana"
	},
		"application/vnd.hydrostatix.sof-data": {
		source: "iana",
		extensions: [
			"sfd-hdstx"
		]
	},
		"application/vnd.hyper-item+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.hyperdrive+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.hzn-3d-crossword": {
		source: "iana"
	},
		"application/vnd.ibm.afplinedata": {
		source: "iana"
	},
		"application/vnd.ibm.electronic-media": {
		source: "iana"
	},
		"application/vnd.ibm.minipay": {
		source: "iana",
		extensions: [
			"mpy"
		]
	},
		"application/vnd.ibm.modcap": {
		source: "iana",
		extensions: [
			"afp",
			"listafp",
			"list3820"
		]
	},
		"application/vnd.ibm.rights-management": {
		source: "iana",
		extensions: [
			"irm"
		]
	},
		"application/vnd.ibm.secure-container": {
		source: "iana",
		extensions: [
			"sc"
		]
	},
		"application/vnd.iccprofile": {
		source: "iana",
		extensions: [
			"icc",
			"icm"
		]
	},
		"application/vnd.ieee.1905": {
		source: "iana"
	},
		"application/vnd.igloader": {
		source: "iana",
		extensions: [
			"igl"
		]
	},
		"application/vnd.imagemeter.folder+zip": {
		source: "iana"
	},
		"application/vnd.imagemeter.image+zip": {
		source: "iana"
	},
		"application/vnd.immervision-ivp": {
		source: "iana",
		extensions: [
			"ivp"
		]
	},
		"application/vnd.immervision-ivu": {
		source: "iana",
		extensions: [
			"ivu"
		]
	},
		"application/vnd.ims.imsccv1p1": {
		source: "iana"
	},
		"application/vnd.ims.imsccv1p2": {
		source: "iana"
	},
		"application/vnd.ims.imsccv1p3": {
		source: "iana"
	},
		"application/vnd.ims.lis.v2.result+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.ims.lti.v2.toolproxy+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.ims.lti.v2.toolsettings+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.informedcontrol.rms+xml": {
		source: "iana"
	},
		"application/vnd.informix-visionary": {
		source: "iana"
	},
		"application/vnd.infotech.project": {
		source: "iana"
	},
		"application/vnd.infotech.project+xml": {
		source: "iana"
	},
		"application/vnd.innopath.wamp.notification": {
		source: "iana"
	},
		"application/vnd.insors.igm": {
		source: "iana",
		extensions: [
			"igm"
		]
	},
		"application/vnd.intercon.formnet": {
		source: "iana",
		extensions: [
			"xpw",
			"xpx"
		]
	},
		"application/vnd.intergeo": {
		source: "iana",
		extensions: [
			"i2g"
		]
	},
		"application/vnd.intertrust.digibox": {
		source: "iana"
	},
		"application/vnd.intertrust.nncp": {
		source: "iana"
	},
		"application/vnd.intu.qbo": {
		source: "iana",
		extensions: [
			"qbo"
		]
	},
		"application/vnd.intu.qfx": {
		source: "iana",
		extensions: [
			"qfx"
		]
	},
		"application/vnd.iptc.g2.catalogitem+xml": {
		source: "iana"
	},
		"application/vnd.iptc.g2.conceptitem+xml": {
		source: "iana"
	},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
		source: "iana"
	},
		"application/vnd.iptc.g2.newsitem+xml": {
		source: "iana"
	},
		"application/vnd.iptc.g2.newsmessage+xml": {
		source: "iana"
	},
		"application/vnd.iptc.g2.packageitem+xml": {
		source: "iana"
	},
		"application/vnd.iptc.g2.planningitem+xml": {
		source: "iana"
	},
		"application/vnd.ipunplugged.rcprofile": {
		source: "iana",
		extensions: [
			"rcprofile"
		]
	},
		"application/vnd.irepository.package+xml": {
		source: "iana",
		extensions: [
			"irp"
		]
	},
		"application/vnd.is-xpr": {
		source: "iana",
		extensions: [
			"xpr"
		]
	},
		"application/vnd.isac.fcs": {
		source: "iana",
		extensions: [
			"fcs"
		]
	},
		"application/vnd.jam": {
		source: "iana",
		extensions: [
			"jam"
		]
	},
		"application/vnd.japannet-directory-service": {
		source: "iana"
	},
		"application/vnd.japannet-jpnstore-wakeup": {
		source: "iana"
	},
		"application/vnd.japannet-payment-wakeup": {
		source: "iana"
	},
		"application/vnd.japannet-registration": {
		source: "iana"
	},
		"application/vnd.japannet-registration-wakeup": {
		source: "iana"
	},
		"application/vnd.japannet-setstore-wakeup": {
		source: "iana"
	},
		"application/vnd.japannet-verification": {
		source: "iana"
	},
		"application/vnd.japannet-verification-wakeup": {
		source: "iana"
	},
		"application/vnd.jcp.javame.midlet-rms": {
		source: "iana",
		extensions: [
			"rms"
		]
	},
		"application/vnd.jisp": {
		source: "iana",
		extensions: [
			"jisp"
		]
	},
		"application/vnd.joost.joda-archive": {
		source: "iana",
		extensions: [
			"joda"
		]
	},
		"application/vnd.jsk.isdn-ngn": {
		source: "iana"
	},
		"application/vnd.kahootz": {
		source: "iana",
		extensions: [
			"ktz",
			"ktr"
		]
	},
		"application/vnd.kde.karbon": {
		source: "iana",
		extensions: [
			"karbon"
		]
	},
		"application/vnd.kde.kchart": {
		source: "iana",
		extensions: [
			"chrt"
		]
	},
		"application/vnd.kde.kformula": {
		source: "iana",
		extensions: [
			"kfo"
		]
	},
		"application/vnd.kde.kivio": {
		source: "iana",
		extensions: [
			"flw"
		]
	},
		"application/vnd.kde.kontour": {
		source: "iana",
		extensions: [
			"kon"
		]
	},
		"application/vnd.kde.kpresenter": {
		source: "iana",
		extensions: [
			"kpr",
			"kpt"
		]
	},
		"application/vnd.kde.kspread": {
		source: "iana",
		extensions: [
			"ksp"
		]
	},
		"application/vnd.kde.kword": {
		source: "iana",
		extensions: [
			"kwd",
			"kwt"
		]
	},
		"application/vnd.kenameaapp": {
		source: "iana",
		extensions: [
			"htke"
		]
	},
		"application/vnd.kidspiration": {
		source: "iana",
		extensions: [
			"kia"
		]
	},
		"application/vnd.kinar": {
		source: "iana",
		extensions: [
			"kne",
			"knp"
		]
	},
		"application/vnd.koan": {
		source: "iana",
		extensions: [
			"skp",
			"skd",
			"skt",
			"skm"
		]
	},
		"application/vnd.kodak-descriptor": {
		source: "iana",
		extensions: [
			"sse"
		]
	},
		"application/vnd.las.las+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.las.las+xml": {
		source: "iana",
		extensions: [
			"lasxml"
		]
	},
		"application/vnd.liberty-request+xml": {
		source: "iana"
	},
		"application/vnd.llamagraphics.life-balance.desktop": {
		source: "iana",
		extensions: [
			"lbd"
		]
	},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
		source: "iana",
		extensions: [
			"lbe"
		]
	},
		"application/vnd.lotus-1-2-3": {
		source: "iana",
		extensions: [
			"123"
		]
	},
		"application/vnd.lotus-approach": {
		source: "iana",
		extensions: [
			"apr"
		]
	},
		"application/vnd.lotus-freelance": {
		source: "iana",
		extensions: [
			"pre"
		]
	},
		"application/vnd.lotus-notes": {
		source: "iana",
		extensions: [
			"nsf"
		]
	},
		"application/vnd.lotus-organizer": {
		source: "iana",
		extensions: [
			"org"
		]
	},
		"application/vnd.lotus-screencam": {
		source: "iana",
		extensions: [
			"scm"
		]
	},
		"application/vnd.lotus-wordpro": {
		source: "iana",
		extensions: [
			"lwp"
		]
	},
		"application/vnd.macports.portpkg": {
		source: "iana",
		extensions: [
			"portpkg"
		]
	},
		"application/vnd.mapbox-vector-tile": {
		source: "iana"
	},
		"application/vnd.marlin.drm.actiontoken+xml": {
		source: "iana"
	},
		"application/vnd.marlin.drm.conftoken+xml": {
		source: "iana"
	},
		"application/vnd.marlin.drm.license+xml": {
		source: "iana"
	},
		"application/vnd.marlin.drm.mdcf": {
		source: "iana"
	},
		"application/vnd.mason+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.maxmind.maxmind-db": {
		source: "iana"
	},
		"application/vnd.mcd": {
		source: "iana",
		extensions: [
			"mcd"
		]
	},
		"application/vnd.medcalcdata": {
		source: "iana",
		extensions: [
			"mc1"
		]
	},
		"application/vnd.mediastation.cdkey": {
		source: "iana",
		extensions: [
			"cdkey"
		]
	},
		"application/vnd.meridian-slingshot": {
		source: "iana"
	},
		"application/vnd.mfer": {
		source: "iana",
		extensions: [
			"mwf"
		]
	},
		"application/vnd.mfmp": {
		source: "iana",
		extensions: [
			"mfm"
		]
	},
		"application/vnd.micro+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.micrografx.flo": {
		source: "iana",
		extensions: [
			"flo"
		]
	},
		"application/vnd.micrografx.igx": {
		source: "iana",
		extensions: [
			"igx"
		]
	},
		"application/vnd.microsoft.portable-executable": {
		source: "iana"
	},
		"application/vnd.microsoft.windows.thumbnail-cache": {
		source: "iana"
	},
		"application/vnd.miele+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.mif": {
		source: "iana",
		extensions: [
			"mif"
		]
	},
		"application/vnd.minisoft-hp3000-save": {
		source: "iana"
	},
		"application/vnd.mitsubishi.misty-guard.trustweb": {
		source: "iana"
	},
		"application/vnd.mobius.daf": {
		source: "iana",
		extensions: [
			"daf"
		]
	},
		"application/vnd.mobius.dis": {
		source: "iana",
		extensions: [
			"dis"
		]
	},
		"application/vnd.mobius.mbk": {
		source: "iana",
		extensions: [
			"mbk"
		]
	},
		"application/vnd.mobius.mqy": {
		source: "iana",
		extensions: [
			"mqy"
		]
	},
		"application/vnd.mobius.msl": {
		source: "iana",
		extensions: [
			"msl"
		]
	},
		"application/vnd.mobius.plc": {
		source: "iana",
		extensions: [
			"plc"
		]
	},
		"application/vnd.mobius.txf": {
		source: "iana",
		extensions: [
			"txf"
		]
	},
		"application/vnd.mophun.application": {
		source: "iana",
		extensions: [
			"mpn"
		]
	},
		"application/vnd.mophun.certificate": {
		source: "iana",
		extensions: [
			"mpc"
		]
	},
		"application/vnd.motorola.flexsuite": {
		source: "iana"
	},
		"application/vnd.motorola.flexsuite.adsi": {
		source: "iana"
	},
		"application/vnd.motorola.flexsuite.fis": {
		source: "iana"
	},
		"application/vnd.motorola.flexsuite.gotap": {
		source: "iana"
	},
		"application/vnd.motorola.flexsuite.kmr": {
		source: "iana"
	},
		"application/vnd.motorola.flexsuite.ttc": {
		source: "iana"
	},
		"application/vnd.motorola.flexsuite.wem": {
		source: "iana"
	},
		"application/vnd.motorola.iprm": {
		source: "iana"
	},
		"application/vnd.mozilla.xul+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"xul"
		]
	},
		"application/vnd.ms-3mfdocument": {
		source: "iana"
	},
		"application/vnd.ms-artgalry": {
		source: "iana",
		extensions: [
			"cil"
		]
	},
		"application/vnd.ms-asf": {
		source: "iana"
	},
		"application/vnd.ms-cab-compressed": {
		source: "iana",
		extensions: [
			"cab"
		]
	},
		"application/vnd.ms-color.iccprofile": {
		source: "apache"
	},
		"application/vnd.ms-excel": {
		source: "iana",
		compressible: false,
		extensions: [
			"xls",
			"xlm",
			"xla",
			"xlc",
			"xlt",
			"xlw"
		]
	},
		"application/vnd.ms-excel.addin.macroenabled.12": {
		source: "iana",
		extensions: [
			"xlam"
		]
	},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
		source: "iana",
		extensions: [
			"xlsb"
		]
	},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
		source: "iana",
		extensions: [
			"xlsm"
		]
	},
		"application/vnd.ms-excel.template.macroenabled.12": {
		source: "iana",
		extensions: [
			"xltm"
		]
	},
		"application/vnd.ms-fontobject": {
		source: "iana",
		compressible: true,
		extensions: [
			"eot"
		]
	},
		"application/vnd.ms-htmlhelp": {
		source: "iana",
		extensions: [
			"chm"
		]
	},
		"application/vnd.ms-ims": {
		source: "iana",
		extensions: [
			"ims"
		]
	},
		"application/vnd.ms-lrm": {
		source: "iana",
		extensions: [
			"lrm"
		]
	},
		"application/vnd.ms-office.activex+xml": {
		source: "iana"
	},
		"application/vnd.ms-officetheme": {
		source: "iana",
		extensions: [
			"thmx"
		]
	},
		"application/vnd.ms-opentype": {
		source: "apache",
		compressible: true
	},
		"application/vnd.ms-outlook": {
		compressible: false,
		extensions: [
			"msg"
		]
	},
		"application/vnd.ms-package.obfuscated-opentype": {
		source: "apache"
	},
		"application/vnd.ms-pki.seccat": {
		source: "apache",
		extensions: [
			"cat"
		]
	},
		"application/vnd.ms-pki.stl": {
		source: "apache",
		extensions: [
			"stl"
		]
	},
		"application/vnd.ms-playready.initiator+xml": {
		source: "iana"
	},
		"application/vnd.ms-powerpoint": {
		source: "iana",
		compressible: false,
		extensions: [
			"ppt",
			"pps",
			"pot"
		]
	},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
		source: "iana",
		extensions: [
			"ppam"
		]
	},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
		source: "iana",
		extensions: [
			"pptm"
		]
	},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
		source: "iana",
		extensions: [
			"sldm"
		]
	},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
		source: "iana",
		extensions: [
			"ppsm"
		]
	},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
		source: "iana",
		extensions: [
			"potm"
		]
	},
		"application/vnd.ms-printdevicecapabilities+xml": {
		source: "iana"
	},
		"application/vnd.ms-printing.printticket+xml": {
		source: "apache"
	},
		"application/vnd.ms-printschematicket+xml": {
		source: "iana"
	},
		"application/vnd.ms-project": {
		source: "iana",
		extensions: [
			"mpp",
			"mpt"
		]
	},
		"application/vnd.ms-tnef": {
		source: "iana"
	},
		"application/vnd.ms-windows.devicepairing": {
		source: "iana"
	},
		"application/vnd.ms-windows.nwprinting.oob": {
		source: "iana"
	},
		"application/vnd.ms-windows.printerpairing": {
		source: "iana"
	},
		"application/vnd.ms-windows.wsd.oob": {
		source: "iana"
	},
		"application/vnd.ms-wmdrm.lic-chlg-req": {
		source: "iana"
	},
		"application/vnd.ms-wmdrm.lic-resp": {
		source: "iana"
	},
		"application/vnd.ms-wmdrm.meter-chlg-req": {
		source: "iana"
	},
		"application/vnd.ms-wmdrm.meter-resp": {
		source: "iana"
	},
		"application/vnd.ms-word.document.macroenabled.12": {
		source: "iana",
		extensions: [
			"docm"
		]
	},
		"application/vnd.ms-word.template.macroenabled.12": {
		source: "iana",
		extensions: [
			"dotm"
		]
	},
		"application/vnd.ms-works": {
		source: "iana",
		extensions: [
			"wps",
			"wks",
			"wcm",
			"wdb"
		]
	},
		"application/vnd.ms-wpl": {
		source: "iana",
		extensions: [
			"wpl"
		]
	},
		"application/vnd.ms-xpsdocument": {
		source: "iana",
		compressible: false,
		extensions: [
			"xps"
		]
	},
		"application/vnd.msa-disk-image": {
		source: "iana"
	},
		"application/vnd.mseq": {
		source: "iana",
		extensions: [
			"mseq"
		]
	},
		"application/vnd.msign": {
		source: "iana"
	},
		"application/vnd.multiad.creator": {
		source: "iana"
	},
		"application/vnd.multiad.creator.cif": {
		source: "iana"
	},
		"application/vnd.music-niff": {
		source: "iana"
	},
		"application/vnd.musician": {
		source: "iana",
		extensions: [
			"mus"
		]
	},
		"application/vnd.muvee.style": {
		source: "iana",
		extensions: [
			"msty"
		]
	},
		"application/vnd.mynfc": {
		source: "iana",
		extensions: [
			"taglet"
		]
	},
		"application/vnd.ncd.control": {
		source: "iana"
	},
		"application/vnd.ncd.reference": {
		source: "iana"
	},
		"application/vnd.nearst.inv+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.nervana": {
		source: "iana"
	},
		"application/vnd.netfpx": {
		source: "iana"
	},
		"application/vnd.neurolanguage.nlu": {
		source: "iana",
		extensions: [
			"nlu"
		]
	},
		"application/vnd.nintendo.nitro.rom": {
		source: "iana"
	},
		"application/vnd.nintendo.snes.rom": {
		source: "iana"
	},
		"application/vnd.nitf": {
		source: "iana",
		extensions: [
			"ntf",
			"nitf"
		]
	},
		"application/vnd.noblenet-directory": {
		source: "iana",
		extensions: [
			"nnd"
		]
	},
		"application/vnd.noblenet-sealer": {
		source: "iana",
		extensions: [
			"nns"
		]
	},
		"application/vnd.noblenet-web": {
		source: "iana",
		extensions: [
			"nnw"
		]
	},
		"application/vnd.nokia.catalogs": {
		source: "iana"
	},
		"application/vnd.nokia.conml+wbxml": {
		source: "iana"
	},
		"application/vnd.nokia.conml+xml": {
		source: "iana"
	},
		"application/vnd.nokia.iptv.config+xml": {
		source: "iana"
	},
		"application/vnd.nokia.isds-radio-presets": {
		source: "iana"
	},
		"application/vnd.nokia.landmark+wbxml": {
		source: "iana"
	},
		"application/vnd.nokia.landmark+xml": {
		source: "iana"
	},
		"application/vnd.nokia.landmarkcollection+xml": {
		source: "iana"
	},
		"application/vnd.nokia.n-gage.ac+xml": {
		source: "iana"
	},
		"application/vnd.nokia.n-gage.data": {
		source: "iana",
		extensions: [
			"ngdat"
		]
	},
		"application/vnd.nokia.n-gage.symbian.install": {
		source: "iana",
		extensions: [
			"n-gage"
		]
	},
		"application/vnd.nokia.ncd": {
		source: "iana"
	},
		"application/vnd.nokia.pcd+wbxml": {
		source: "iana"
	},
		"application/vnd.nokia.pcd+xml": {
		source: "iana"
	},
		"application/vnd.nokia.radio-preset": {
		source: "iana",
		extensions: [
			"rpst"
		]
	},
		"application/vnd.nokia.radio-presets": {
		source: "iana",
		extensions: [
			"rpss"
		]
	},
		"application/vnd.novadigm.edm": {
		source: "iana",
		extensions: [
			"edm"
		]
	},
		"application/vnd.novadigm.edx": {
		source: "iana",
		extensions: [
			"edx"
		]
	},
		"application/vnd.novadigm.ext": {
		source: "iana",
		extensions: [
			"ext"
		]
	},
		"application/vnd.ntt-local.content-share": {
		source: "iana"
	},
		"application/vnd.ntt-local.file-transfer": {
		source: "iana"
	},
		"application/vnd.ntt-local.ogw_remote-access": {
		source: "iana"
	},
		"application/vnd.ntt-local.sip-ta_remote": {
		source: "iana"
	},
		"application/vnd.ntt-local.sip-ta_tcp_stream": {
		source: "iana"
	},
		"application/vnd.oasis.opendocument.chart": {
		source: "iana",
		extensions: [
			"odc"
		]
	},
		"application/vnd.oasis.opendocument.chart-template": {
		source: "iana",
		extensions: [
			"otc"
		]
	},
		"application/vnd.oasis.opendocument.database": {
		source: "iana",
		extensions: [
			"odb"
		]
	},
		"application/vnd.oasis.opendocument.formula": {
		source: "iana",
		extensions: [
			"odf"
		]
	},
		"application/vnd.oasis.opendocument.formula-template": {
		source: "iana",
		extensions: [
			"odft"
		]
	},
		"application/vnd.oasis.opendocument.graphics": {
		source: "iana",
		compressible: false,
		extensions: [
			"odg"
		]
	},
		"application/vnd.oasis.opendocument.graphics-template": {
		source: "iana",
		extensions: [
			"otg"
		]
	},
		"application/vnd.oasis.opendocument.image": {
		source: "iana",
		extensions: [
			"odi"
		]
	},
		"application/vnd.oasis.opendocument.image-template": {
		source: "iana",
		extensions: [
			"oti"
		]
	},
		"application/vnd.oasis.opendocument.presentation": {
		source: "iana",
		compressible: false,
		extensions: [
			"odp"
		]
	},
		"application/vnd.oasis.opendocument.presentation-template": {
		source: "iana",
		extensions: [
			"otp"
		]
	},
		"application/vnd.oasis.opendocument.spreadsheet": {
		source: "iana",
		compressible: false,
		extensions: [
			"ods"
		]
	},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
		source: "iana",
		extensions: [
			"ots"
		]
	},
		"application/vnd.oasis.opendocument.text": {
		source: "iana",
		compressible: false,
		extensions: [
			"odt"
		]
	},
		"application/vnd.oasis.opendocument.text-master": {
		source: "iana",
		extensions: [
			"odm"
		]
	},
		"application/vnd.oasis.opendocument.text-template": {
		source: "iana",
		extensions: [
			"ott"
		]
	},
		"application/vnd.oasis.opendocument.text-web": {
		source: "iana",
		extensions: [
			"oth"
		]
	},
		"application/vnd.obn": {
		source: "iana"
	},
		"application/vnd.ocf+cbor": {
		source: "iana"
	},
		"application/vnd.oftn.l10n+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.oipf.contentaccessdownload+xml": {
		source: "iana"
	},
		"application/vnd.oipf.contentaccessstreaming+xml": {
		source: "iana"
	},
		"application/vnd.oipf.cspg-hexbinary": {
		source: "iana"
	},
		"application/vnd.oipf.dae.svg+xml": {
		source: "iana"
	},
		"application/vnd.oipf.dae.xhtml+xml": {
		source: "iana"
	},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
		source: "iana"
	},
		"application/vnd.oipf.pae.gem": {
		source: "iana"
	},
		"application/vnd.oipf.spdiscovery+xml": {
		source: "iana"
	},
		"application/vnd.oipf.spdlist+xml": {
		source: "iana"
	},
		"application/vnd.oipf.ueprofile+xml": {
		source: "iana"
	},
		"application/vnd.oipf.userprofile+xml": {
		source: "iana"
	},
		"application/vnd.olpc-sugar": {
		source: "iana",
		extensions: [
			"xo"
		]
	},
		"application/vnd.oma-scws-config": {
		source: "iana"
	},
		"application/vnd.oma-scws-http-request": {
		source: "iana"
	},
		"application/vnd.oma-scws-http-response": {
		source: "iana"
	},
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.drm-trigger+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.imd+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.ltkm": {
		source: "iana"
	},
		"application/vnd.oma.bcast.notification+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.provisioningtrigger": {
		source: "iana"
	},
		"application/vnd.oma.bcast.sgboot": {
		source: "iana"
	},
		"application/vnd.oma.bcast.sgdd+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.sgdu": {
		source: "iana"
	},
		"application/vnd.oma.bcast.simple-symbol-container": {
		source: "iana"
	},
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.sprov+xml": {
		source: "iana"
	},
		"application/vnd.oma.bcast.stkm": {
		source: "iana"
	},
		"application/vnd.oma.cab-address-book+xml": {
		source: "iana"
	},
		"application/vnd.oma.cab-feature-handler+xml": {
		source: "iana"
	},
		"application/vnd.oma.cab-pcc+xml": {
		source: "iana"
	},
		"application/vnd.oma.cab-subs-invite+xml": {
		source: "iana"
	},
		"application/vnd.oma.cab-user-prefs+xml": {
		source: "iana"
	},
		"application/vnd.oma.dcd": {
		source: "iana"
	},
		"application/vnd.oma.dcdc": {
		source: "iana"
	},
		"application/vnd.oma.dd2+xml": {
		source: "iana",
		extensions: [
			"dd2"
		]
	},
		"application/vnd.oma.drm.risd+xml": {
		source: "iana"
	},
		"application/vnd.oma.group-usage-list+xml": {
		source: "iana"
	},
		"application/vnd.oma.lwm2m+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.oma.lwm2m+tlv": {
		source: "iana"
	},
		"application/vnd.oma.pal+xml": {
		source: "iana"
	},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
		source: "iana"
	},
		"application/vnd.oma.poc.final-report+xml": {
		source: "iana"
	},
		"application/vnd.oma.poc.groups+xml": {
		source: "iana"
	},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
		source: "iana"
	},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
		source: "iana"
	},
		"application/vnd.oma.push": {
		source: "iana"
	},
		"application/vnd.oma.scidm.messages+xml": {
		source: "iana"
	},
		"application/vnd.oma.xcap-directory+xml": {
		source: "iana"
	},
		"application/vnd.omads-email+xml": {
		source: "iana"
	},
		"application/vnd.omads-file+xml": {
		source: "iana"
	},
		"application/vnd.omads-folder+xml": {
		source: "iana"
	},
		"application/vnd.omaloc-supl-init": {
		source: "iana"
	},
		"application/vnd.onepager": {
		source: "iana"
	},
		"application/vnd.onepagertamp": {
		source: "iana"
	},
		"application/vnd.onepagertamx": {
		source: "iana"
	},
		"application/vnd.onepagertat": {
		source: "iana"
	},
		"application/vnd.onepagertatp": {
		source: "iana"
	},
		"application/vnd.onepagertatx": {
		source: "iana"
	},
		"application/vnd.openblox.game+xml": {
		source: "iana"
	},
		"application/vnd.openblox.game-binary": {
		source: "iana"
	},
		"application/vnd.openeye.oeb": {
		source: "iana"
	},
		"application/vnd.openofficeorg.extension": {
		source: "apache",
		extensions: [
			"oxt"
		]
	},
		"application/vnd.openstreetmap.data+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
		source: "iana",
		compressible: false,
		extensions: [
			"pptx"
		]
	},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
		source: "iana",
		extensions: [
			"sldx"
		]
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
		source: "iana",
		extensions: [
			"ppsx"
		]
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
		source: "iana",
		extensions: [
			"potx"
		]
	},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
		source: "iana",
		compressible: false,
		extensions: [
			"xlsx"
		]
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
		source: "iana",
		extensions: [
			"xltx"
		]
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.vmldrawing": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
		source: "iana",
		compressible: false,
		extensions: [
			"docx"
		]
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
		source: "iana",
		extensions: [
			"dotx"
		]
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-package.core-properties+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
		source: "iana"
	},
		"application/vnd.openxmlformats-package.relationships+xml": {
		source: "iana"
	},
		"application/vnd.oracle.resource+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.orange.indata": {
		source: "iana"
	},
		"application/vnd.osa.netdeploy": {
		source: "iana"
	},
		"application/vnd.osgeo.mapguide.package": {
		source: "iana",
		extensions: [
			"mgp"
		]
	},
		"application/vnd.osgi.bundle": {
		source: "iana"
	},
		"application/vnd.osgi.dp": {
		source: "iana",
		extensions: [
			"dp"
		]
	},
		"application/vnd.osgi.subsystem": {
		source: "iana",
		extensions: [
			"esa"
		]
	},
		"application/vnd.otps.ct-kip+xml": {
		source: "iana"
	},
		"application/vnd.oxli.countgraph": {
		source: "iana"
	},
		"application/vnd.pagerduty+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.palm": {
		source: "iana",
		extensions: [
			"pdb",
			"pqa",
			"oprc"
		]
	},
		"application/vnd.panoply": {
		source: "iana"
	},
		"application/vnd.paos+xml": {
		source: "iana"
	},
		"application/vnd.paos.xml": {
		source: "apache"
	},
		"application/vnd.patentdive": {
		source: "iana"
	},
		"application/vnd.pawaafile": {
		source: "iana",
		extensions: [
			"paw"
		]
	},
		"application/vnd.pcos": {
		source: "iana"
	},
		"application/vnd.pg.format": {
		source: "iana",
		extensions: [
			"str"
		]
	},
		"application/vnd.pg.osasli": {
		source: "iana",
		extensions: [
			"ei6"
		]
	},
		"application/vnd.piaccess.application-licence": {
		source: "iana"
	},
		"application/vnd.picsel": {
		source: "iana",
		extensions: [
			"efif"
		]
	},
		"application/vnd.pmi.widget": {
		source: "iana",
		extensions: [
			"wg"
		]
	},
		"application/vnd.poc.group-advertisement+xml": {
		source: "iana"
	},
		"application/vnd.pocketlearn": {
		source: "iana",
		extensions: [
			"plf"
		]
	},
		"application/vnd.powerbuilder6": {
		source: "iana",
		extensions: [
			"pbd"
		]
	},
		"application/vnd.powerbuilder6-s": {
		source: "iana"
	},
		"application/vnd.powerbuilder7": {
		source: "iana"
	},
		"application/vnd.powerbuilder7-s": {
		source: "iana"
	},
		"application/vnd.powerbuilder75": {
		source: "iana"
	},
		"application/vnd.powerbuilder75-s": {
		source: "iana"
	},
		"application/vnd.preminet": {
		source: "iana"
	},
		"application/vnd.previewsystems.box": {
		source: "iana",
		extensions: [
			"box"
		]
	},
		"application/vnd.proteus.magazine": {
		source: "iana",
		extensions: [
			"mgz"
		]
	},
		"application/vnd.publishare-delta-tree": {
		source: "iana",
		extensions: [
			"qps"
		]
	},
		"application/vnd.pvi.ptid1": {
		source: "iana",
		extensions: [
			"ptid"
		]
	},
		"application/vnd.pwg-multiplexed": {
		source: "iana"
	},
		"application/vnd.pwg-xhtml-print+xml": {
		source: "iana"
	},
		"application/vnd.qualcomm.brew-app-res": {
		source: "iana"
	},
		"application/vnd.quarantainenet": {
		source: "iana"
	},
		"application/vnd.quark.quarkxpress": {
		source: "iana",
		extensions: [
			"qxd",
			"qxt",
			"qwd",
			"qwt",
			"qxl",
			"qxb"
		]
	},
		"application/vnd.quobject-quoxdocument": {
		source: "iana"
	},
		"application/vnd.radisys.moml+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-audit+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-audit-conf+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-audit-conn+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-audit-dialog+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-audit-stream+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-conf+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog-base+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog-group+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog-speech+xml": {
		source: "iana"
	},
		"application/vnd.radisys.msml-dialog-transform+xml": {
		source: "iana"
	},
		"application/vnd.rainstor.data": {
		source: "iana"
	},
		"application/vnd.rapid": {
		source: "iana"
	},
		"application/vnd.rar": {
		source: "iana"
	},
		"application/vnd.realvnc.bed": {
		source: "iana",
		extensions: [
			"bed"
		]
	},
		"application/vnd.recordare.musicxml": {
		source: "iana",
		extensions: [
			"mxl"
		]
	},
		"application/vnd.recordare.musicxml+xml": {
		source: "iana",
		extensions: [
			"musicxml"
		]
	},
		"application/vnd.renlearn.rlprint": {
		source: "iana"
	},
		"application/vnd.restful+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.rig.cryptonote": {
		source: "iana",
		extensions: [
			"cryptonote"
		]
	},
		"application/vnd.rim.cod": {
		source: "apache",
		extensions: [
			"cod"
		]
	},
		"application/vnd.rn-realmedia": {
		source: "apache",
		extensions: [
			"rm"
		]
	},
		"application/vnd.rn-realmedia-vbr": {
		source: "apache",
		extensions: [
			"rmvb"
		]
	},
		"application/vnd.route66.link66+xml": {
		source: "iana",
		extensions: [
			"link66"
		]
	},
		"application/vnd.rs-274x": {
		source: "iana"
	},
		"application/vnd.ruckus.download": {
		source: "iana"
	},
		"application/vnd.s3sms": {
		source: "iana"
	},
		"application/vnd.sailingtracker.track": {
		source: "iana",
		extensions: [
			"st"
		]
	},
		"application/vnd.sbm.cid": {
		source: "iana"
	},
		"application/vnd.sbm.mid2": {
		source: "iana"
	},
		"application/vnd.scribus": {
		source: "iana"
	},
		"application/vnd.sealed.3df": {
		source: "iana"
	},
		"application/vnd.sealed.csf": {
		source: "iana"
	},
		"application/vnd.sealed.doc": {
		source: "iana"
	},
		"application/vnd.sealed.eml": {
		source: "iana"
	},
		"application/vnd.sealed.mht": {
		source: "iana"
	},
		"application/vnd.sealed.net": {
		source: "iana"
	},
		"application/vnd.sealed.ppt": {
		source: "iana"
	},
		"application/vnd.sealed.tiff": {
		source: "iana"
	},
		"application/vnd.sealed.xls": {
		source: "iana"
	},
		"application/vnd.sealedmedia.softseal.html": {
		source: "iana"
	},
		"application/vnd.sealedmedia.softseal.pdf": {
		source: "iana"
	},
		"application/vnd.seemail": {
		source: "iana",
		extensions: [
			"see"
		]
	},
		"application/vnd.sema": {
		source: "iana",
		extensions: [
			"sema"
		]
	},
		"application/vnd.semd": {
		source: "iana",
		extensions: [
			"semd"
		]
	},
		"application/vnd.semf": {
		source: "iana",
		extensions: [
			"semf"
		]
	},
		"application/vnd.shana.informed.formdata": {
		source: "iana",
		extensions: [
			"ifm"
		]
	},
		"application/vnd.shana.informed.formtemplate": {
		source: "iana",
		extensions: [
			"itp"
		]
	},
		"application/vnd.shana.informed.interchange": {
		source: "iana",
		extensions: [
			"iif"
		]
	},
		"application/vnd.shana.informed.package": {
		source: "iana",
		extensions: [
			"ipk"
		]
	},
		"application/vnd.sigrok.session": {
		source: "iana"
	},
		"application/vnd.simtech-mindmapper": {
		source: "iana",
		extensions: [
			"twd",
			"twds"
		]
	},
		"application/vnd.siren+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.smaf": {
		source: "iana",
		extensions: [
			"mmf"
		]
	},
		"application/vnd.smart.notebook": {
		source: "iana"
	},
		"application/vnd.smart.teacher": {
		source: "iana",
		extensions: [
			"teacher"
		]
	},
		"application/vnd.software602.filler.form+xml": {
		source: "iana"
	},
		"application/vnd.software602.filler.form-xml-zip": {
		source: "iana"
	},
		"application/vnd.solent.sdkm+xml": {
		source: "iana",
		extensions: [
			"sdkm",
			"sdkd"
		]
	},
		"application/vnd.spotfire.dxp": {
		source: "iana",
		extensions: [
			"dxp"
		]
	},
		"application/vnd.spotfire.sfs": {
		source: "iana",
		extensions: [
			"sfs"
		]
	},
		"application/vnd.sqlite3": {
		source: "iana"
	},
		"application/vnd.sss-cod": {
		source: "iana"
	},
		"application/vnd.sss-dtf": {
		source: "iana"
	},
		"application/vnd.sss-ntf": {
		source: "iana"
	},
		"application/vnd.stardivision.calc": {
		source: "apache",
		extensions: [
			"sdc"
		]
	},
		"application/vnd.stardivision.draw": {
		source: "apache",
		extensions: [
			"sda"
		]
	},
		"application/vnd.stardivision.impress": {
		source: "apache",
		extensions: [
			"sdd"
		]
	},
		"application/vnd.stardivision.math": {
		source: "apache",
		extensions: [
			"smf"
		]
	},
		"application/vnd.stardivision.writer": {
		source: "apache",
		extensions: [
			"sdw",
			"vor"
		]
	},
		"application/vnd.stardivision.writer-global": {
		source: "apache",
		extensions: [
			"sgl"
		]
	},
		"application/vnd.stepmania.package": {
		source: "iana",
		extensions: [
			"smzip"
		]
	},
		"application/vnd.stepmania.stepchart": {
		source: "iana",
		extensions: [
			"sm"
		]
	},
		"application/vnd.street-stream": {
		source: "iana"
	},
		"application/vnd.sun.wadl+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"wadl"
		]
	},
		"application/vnd.sun.xml.calc": {
		source: "apache",
		extensions: [
			"sxc"
		]
	},
		"application/vnd.sun.xml.calc.template": {
		source: "apache",
		extensions: [
			"stc"
		]
	},
		"application/vnd.sun.xml.draw": {
		source: "apache",
		extensions: [
			"sxd"
		]
	},
		"application/vnd.sun.xml.draw.template": {
		source: "apache",
		extensions: [
			"std"
		]
	},
		"application/vnd.sun.xml.impress": {
		source: "apache",
		extensions: [
			"sxi"
		]
	},
		"application/vnd.sun.xml.impress.template": {
		source: "apache",
		extensions: [
			"sti"
		]
	},
		"application/vnd.sun.xml.math": {
		source: "apache",
		extensions: [
			"sxm"
		]
	},
		"application/vnd.sun.xml.writer": {
		source: "apache",
		extensions: [
			"sxw"
		]
	},
		"application/vnd.sun.xml.writer.global": {
		source: "apache",
		extensions: [
			"sxg"
		]
	},
		"application/vnd.sun.xml.writer.template": {
		source: "apache",
		extensions: [
			"stw"
		]
	},
		"application/vnd.sus-calendar": {
		source: "iana",
		extensions: [
			"sus",
			"susp"
		]
	},
		"application/vnd.svd": {
		source: "iana",
		extensions: [
			"svd"
		]
	},
		"application/vnd.swiftview-ics": {
		source: "iana"
	},
		"application/vnd.symbian.install": {
		source: "apache",
		extensions: [
			"sis",
			"sisx"
		]
	},
		"application/vnd.syncml+xml": {
		source: "iana",
		extensions: [
			"xsm"
		]
	},
		"application/vnd.syncml.dm+wbxml": {
		source: "iana",
		extensions: [
			"bdm"
		]
	},
		"application/vnd.syncml.dm+xml": {
		source: "iana",
		extensions: [
			"xdm"
		]
	},
		"application/vnd.syncml.dm.notification": {
		source: "iana"
	},
		"application/vnd.syncml.dmddf+wbxml": {
		source: "iana"
	},
		"application/vnd.syncml.dmddf+xml": {
		source: "iana"
	},
		"application/vnd.syncml.dmtnds+wbxml": {
		source: "iana"
	},
		"application/vnd.syncml.dmtnds+xml": {
		source: "iana"
	},
		"application/vnd.syncml.ds.notification": {
		source: "iana"
	},
		"application/vnd.tableschema+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.tao.intent-module-archive": {
		source: "iana",
		extensions: [
			"tao"
		]
	},
		"application/vnd.tcpdump.pcap": {
		source: "iana",
		extensions: [
			"pcap",
			"cap",
			"dmp"
		]
	},
		"application/vnd.tmd.mediaflex.api+xml": {
		source: "iana"
	},
		"application/vnd.tml": {
		source: "iana"
	},
		"application/vnd.tmobile-livetv": {
		source: "iana",
		extensions: [
			"tmo"
		]
	},
		"application/vnd.tri.onesource": {
		source: "iana"
	},
		"application/vnd.trid.tpt": {
		source: "iana",
		extensions: [
			"tpt"
		]
	},
		"application/vnd.triscape.mxs": {
		source: "iana",
		extensions: [
			"mxs"
		]
	},
		"application/vnd.trueapp": {
		source: "iana",
		extensions: [
			"tra"
		]
	},
		"application/vnd.truedoc": {
		source: "iana"
	},
		"application/vnd.ubisoft.webplayer": {
		source: "iana"
	},
		"application/vnd.ufdl": {
		source: "iana",
		extensions: [
			"ufd",
			"ufdl"
		]
	},
		"application/vnd.uiq.theme": {
		source: "iana",
		extensions: [
			"utz"
		]
	},
		"application/vnd.umajin": {
		source: "iana",
		extensions: [
			"umj"
		]
	},
		"application/vnd.unity": {
		source: "iana",
		extensions: [
			"unityweb"
		]
	},
		"application/vnd.uoml+xml": {
		source: "iana",
		extensions: [
			"uoml"
		]
	},
		"application/vnd.uplanet.alert": {
		source: "iana"
	},
		"application/vnd.uplanet.alert-wbxml": {
		source: "iana"
	},
		"application/vnd.uplanet.bearer-choice": {
		source: "iana"
	},
		"application/vnd.uplanet.bearer-choice-wbxml": {
		source: "iana"
	},
		"application/vnd.uplanet.cacheop": {
		source: "iana"
	},
		"application/vnd.uplanet.cacheop-wbxml": {
		source: "iana"
	},
		"application/vnd.uplanet.channel": {
		source: "iana"
	},
		"application/vnd.uplanet.channel-wbxml": {
		source: "iana"
	},
		"application/vnd.uplanet.list": {
		source: "iana"
	},
		"application/vnd.uplanet.list-wbxml": {
		source: "iana"
	},
		"application/vnd.uplanet.listcmd": {
		source: "iana"
	},
		"application/vnd.uplanet.listcmd-wbxml": {
		source: "iana"
	},
		"application/vnd.uplanet.signal": {
		source: "iana"
	},
		"application/vnd.uri-map": {
		source: "iana"
	},
		"application/vnd.valve.source.material": {
		source: "iana"
	},
		"application/vnd.vcx": {
		source: "iana",
		extensions: [
			"vcx"
		]
	},
		"application/vnd.vd-study": {
		source: "iana"
	},
		"application/vnd.vectorworks": {
		source: "iana"
	},
		"application/vnd.vel+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.verimatrix.vcas": {
		source: "iana"
	},
		"application/vnd.vidsoft.vidconference": {
		source: "iana"
	},
		"application/vnd.visio": {
		source: "iana",
		extensions: [
			"vsd",
			"vst",
			"vss",
			"vsw"
		]
	},
		"application/vnd.visionary": {
		source: "iana",
		extensions: [
			"vis"
		]
	},
		"application/vnd.vividence.scriptfile": {
		source: "iana"
	},
		"application/vnd.vsf": {
		source: "iana",
		extensions: [
			"vsf"
		]
	},
		"application/vnd.wap.sic": {
		source: "iana"
	},
		"application/vnd.wap.slc": {
		source: "iana"
	},
		"application/vnd.wap.wbxml": {
		source: "iana",
		extensions: [
			"wbxml"
		]
	},
		"application/vnd.wap.wmlc": {
		source: "iana",
		extensions: [
			"wmlc"
		]
	},
		"application/vnd.wap.wmlscriptc": {
		source: "iana",
		extensions: [
			"wmlsc"
		]
	},
		"application/vnd.webturbo": {
		source: "iana",
		extensions: [
			"wtb"
		]
	},
		"application/vnd.wfa.p2p": {
		source: "iana"
	},
		"application/vnd.wfa.wsc": {
		source: "iana"
	},
		"application/vnd.windows.devicepairing": {
		source: "iana"
	},
		"application/vnd.wmc": {
		source: "iana"
	},
		"application/vnd.wmf.bootstrap": {
		source: "iana"
	},
		"application/vnd.wolfram.mathematica": {
		source: "iana"
	},
		"application/vnd.wolfram.mathematica.package": {
		source: "iana"
	},
		"application/vnd.wolfram.player": {
		source: "iana",
		extensions: [
			"nbp"
		]
	},
		"application/vnd.wordperfect": {
		source: "iana",
		extensions: [
			"wpd"
		]
	},
		"application/vnd.wqd": {
		source: "iana",
		extensions: [
			"wqd"
		]
	},
		"application/vnd.wrq-hp3000-labelled": {
		source: "iana"
	},
		"application/vnd.wt.stf": {
		source: "iana",
		extensions: [
			"stf"
		]
	},
		"application/vnd.wv.csp+wbxml": {
		source: "iana"
	},
		"application/vnd.wv.csp+xml": {
		source: "iana"
	},
		"application/vnd.wv.ssp+xml": {
		source: "iana"
	},
		"application/vnd.xacml+json": {
		source: "iana",
		compressible: true
	},
		"application/vnd.xara": {
		source: "iana",
		extensions: [
			"xar"
		]
	},
		"application/vnd.xfdl": {
		source: "iana",
		extensions: [
			"xfdl"
		]
	},
		"application/vnd.xfdl.webform": {
		source: "iana"
	},
		"application/vnd.xmi+xml": {
		source: "iana"
	},
		"application/vnd.xmpie.cpkg": {
		source: "iana"
	},
		"application/vnd.xmpie.dpkg": {
		source: "iana"
	},
		"application/vnd.xmpie.plan": {
		source: "iana"
	},
		"application/vnd.xmpie.ppkg": {
		source: "iana"
	},
		"application/vnd.xmpie.xlim": {
		source: "iana"
	},
		"application/vnd.yamaha.hv-dic": {
		source: "iana",
		extensions: [
			"hvd"
		]
	},
		"application/vnd.yamaha.hv-script": {
		source: "iana",
		extensions: [
			"hvs"
		]
	},
		"application/vnd.yamaha.hv-voice": {
		source: "iana",
		extensions: [
			"hvp"
		]
	},
		"application/vnd.yamaha.openscoreformat": {
		source: "iana",
		extensions: [
			"osf"
		]
	},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
		source: "iana",
		extensions: [
			"osfpvg"
		]
	},
		"application/vnd.yamaha.remote-setup": {
		source: "iana"
	},
		"application/vnd.yamaha.smaf-audio": {
		source: "iana",
		extensions: [
			"saf"
		]
	},
		"application/vnd.yamaha.smaf-phrase": {
		source: "iana",
		extensions: [
			"spf"
		]
	},
		"application/vnd.yamaha.through-ngn": {
		source: "iana"
	},
		"application/vnd.yamaha.tunnel-udpencap": {
		source: "iana"
	},
		"application/vnd.yaoweme": {
		source: "iana"
	},
		"application/vnd.yellowriver-custom-menu": {
		source: "iana",
		extensions: [
			"cmp"
		]
	},
		"application/vnd.youtube.yt": {
		source: "iana"
	},
		"application/vnd.zul": {
		source: "iana",
		extensions: [
			"zir",
			"zirz"
		]
	},
		"application/vnd.zzazz.deck+xml": {
		source: "iana",
		extensions: [
			"zaz"
		]
	},
		"application/voicexml+xml": {
		source: "iana",
		extensions: [
			"vxml"
		]
	},
		"application/voucher-cms+json": {
		source: "iana",
		compressible: true
	},
		"application/vq-rtcpxr": {
		source: "iana"
	},
		"application/wasm": {
		compressible: true,
		extensions: [
			"wasm"
		]
	},
		"application/watcherinfo+xml": {
		source: "iana"
	},
		"application/webpush-options+json": {
		source: "iana",
		compressible: true
	},
		"application/whoispp-query": {
		source: "iana"
	},
		"application/whoispp-response": {
		source: "iana"
	},
		"application/widget": {
		source: "iana",
		extensions: [
			"wgt"
		]
	},
		"application/winhlp": {
		source: "apache",
		extensions: [
			"hlp"
		]
	},
		"application/wita": {
		source: "iana"
	},
		"application/wordperfect5.1": {
		source: "iana"
	},
		"application/wsdl+xml": {
		source: "iana",
		extensions: [
			"wsdl"
		]
	},
		"application/wspolicy+xml": {
		source: "iana",
		extensions: [
			"wspolicy"
		]
	},
		"application/x-7z-compressed": {
		source: "apache",
		compressible: false,
		extensions: [
			"7z"
		]
	},
		"application/x-abiword": {
		source: "apache",
		extensions: [
			"abw"
		]
	},
		"application/x-ace-compressed": {
		source: "apache",
		extensions: [
			"ace"
		]
	},
		"application/x-amf": {
		source: "apache"
	},
		"application/x-apple-diskimage": {
		source: "apache",
		extensions: [
			"dmg"
		]
	},
		"application/x-arj": {
		compressible: false,
		extensions: [
			"arj"
		]
	},
		"application/x-authorware-bin": {
		source: "apache",
		extensions: [
			"aab",
			"x32",
			"u32",
			"vox"
		]
	},
		"application/x-authorware-map": {
		source: "apache",
		extensions: [
			"aam"
		]
	},
		"application/x-authorware-seg": {
		source: "apache",
		extensions: [
			"aas"
		]
	},
		"application/x-bcpio": {
		source: "apache",
		extensions: [
			"bcpio"
		]
	},
		"application/x-bdoc": {
		compressible: false,
		extensions: [
			"bdoc"
		]
	},
		"application/x-bittorrent": {
		source: "apache",
		extensions: [
			"torrent"
		]
	},
		"application/x-blorb": {
		source: "apache",
		extensions: [
			"blb",
			"blorb"
		]
	},
		"application/x-bzip": {
		source: "apache",
		compressible: false,
		extensions: [
			"bz"
		]
	},
		"application/x-bzip2": {
		source: "apache",
		compressible: false,
		extensions: [
			"bz2",
			"boz"
		]
	},
		"application/x-cbr": {
		source: "apache",
		extensions: [
			"cbr",
			"cba",
			"cbt",
			"cbz",
			"cb7"
		]
	},
		"application/x-cdlink": {
		source: "apache",
		extensions: [
			"vcd"
		]
	},
		"application/x-cfs-compressed": {
		source: "apache",
		extensions: [
			"cfs"
		]
	},
		"application/x-chat": {
		source: "apache",
		extensions: [
			"chat"
		]
	},
		"application/x-chess-pgn": {
		source: "apache",
		extensions: [
			"pgn"
		]
	},
		"application/x-chrome-extension": {
		extensions: [
			"crx"
		]
	},
		"application/x-cocoa": {
		source: "nginx",
		extensions: [
			"cco"
		]
	},
		"application/x-compress": {
		source: "apache"
	},
		"application/x-conference": {
		source: "apache",
		extensions: [
			"nsc"
		]
	},
		"application/x-cpio": {
		source: "apache",
		extensions: [
			"cpio"
		]
	},
		"application/x-csh": {
		source: "apache",
		extensions: [
			"csh"
		]
	},
		"application/x-deb": {
		compressible: false
	},
		"application/x-debian-package": {
		source: "apache",
		extensions: [
			"deb",
			"udeb"
		]
	},
		"application/x-dgc-compressed": {
		source: "apache",
		extensions: [
			"dgc"
		]
	},
		"application/x-director": {
		source: "apache",
		extensions: [
			"dir",
			"dcr",
			"dxr",
			"cst",
			"cct",
			"cxt",
			"w3d",
			"fgd",
			"swa"
		]
	},
		"application/x-doom": {
		source: "apache",
		extensions: [
			"wad"
		]
	},
		"application/x-dtbncx+xml": {
		source: "apache",
		extensions: [
			"ncx"
		]
	},
		"application/x-dtbook+xml": {
		source: "apache",
		extensions: [
			"dtb"
		]
	},
		"application/x-dtbresource+xml": {
		source: "apache",
		extensions: [
			"res"
		]
	},
		"application/x-dvi": {
		source: "apache",
		compressible: false,
		extensions: [
			"dvi"
		]
	},
		"application/x-envoy": {
		source: "apache",
		extensions: [
			"evy"
		]
	},
		"application/x-eva": {
		source: "apache",
		extensions: [
			"eva"
		]
	},
		"application/x-font-bdf": {
		source: "apache",
		extensions: [
			"bdf"
		]
	},
		"application/x-font-dos": {
		source: "apache"
	},
		"application/x-font-framemaker": {
		source: "apache"
	},
		"application/x-font-ghostscript": {
		source: "apache",
		extensions: [
			"gsf"
		]
	},
		"application/x-font-libgrx": {
		source: "apache"
	},
		"application/x-font-linux-psf": {
		source: "apache",
		extensions: [
			"psf"
		]
	},
		"application/x-font-pcf": {
		source: "apache",
		extensions: [
			"pcf"
		]
	},
		"application/x-font-snf": {
		source: "apache",
		extensions: [
			"snf"
		]
	},
		"application/x-font-speedo": {
		source: "apache"
	},
		"application/x-font-sunos-news": {
		source: "apache"
	},
		"application/x-font-type1": {
		source: "apache",
		extensions: [
			"pfa",
			"pfb",
			"pfm",
			"afm"
		]
	},
		"application/x-font-vfont": {
		source: "apache"
	},
		"application/x-freearc": {
		source: "apache",
		extensions: [
			"arc"
		]
	},
		"application/x-futuresplash": {
		source: "apache",
		extensions: [
			"spl"
		]
	},
		"application/x-gca-compressed": {
		source: "apache",
		extensions: [
			"gca"
		]
	},
		"application/x-glulx": {
		source: "apache",
		extensions: [
			"ulx"
		]
	},
		"application/x-gnumeric": {
		source: "apache",
		extensions: [
			"gnumeric"
		]
	},
		"application/x-gramps-xml": {
		source: "apache",
		extensions: [
			"gramps"
		]
	},
		"application/x-gtar": {
		source: "apache",
		extensions: [
			"gtar"
		]
	},
		"application/x-gzip": {
		source: "apache"
	},
		"application/x-hdf": {
		source: "apache",
		extensions: [
			"hdf"
		]
	},
		"application/x-httpd-php": {
		compressible: true,
		extensions: [
			"php"
		]
	},
		"application/x-install-instructions": {
		source: "apache",
		extensions: [
			"install"
		]
	},
		"application/x-iso9660-image": {
		source: "apache",
		extensions: [
			"iso"
		]
	},
		"application/x-java-archive-diff": {
		source: "nginx",
		extensions: [
			"jardiff"
		]
	},
		"application/x-java-jnlp-file": {
		source: "apache",
		compressible: false,
		extensions: [
			"jnlp"
		]
	},
		"application/x-javascript": {
		compressible: true
	},
		"application/x-latex": {
		source: "apache",
		compressible: false,
		extensions: [
			"latex"
		]
	},
		"application/x-lua-bytecode": {
		extensions: [
			"luac"
		]
	},
		"application/x-lzh-compressed": {
		source: "apache",
		extensions: [
			"lzh",
			"lha"
		]
	},
		"application/x-makeself": {
		source: "nginx",
		extensions: [
			"run"
		]
	},
		"application/x-mie": {
		source: "apache",
		extensions: [
			"mie"
		]
	},
		"application/x-mobipocket-ebook": {
		source: "apache",
		extensions: [
			"prc",
			"mobi"
		]
	},
		"application/x-mpegurl": {
		compressible: false
	},
		"application/x-ms-application": {
		source: "apache",
		extensions: [
			"application"
		]
	},
		"application/x-ms-shortcut": {
		source: "apache",
		extensions: [
			"lnk"
		]
	},
		"application/x-ms-wmd": {
		source: "apache",
		extensions: [
			"wmd"
		]
	},
		"application/x-ms-wmz": {
		source: "apache",
		extensions: [
			"wmz"
		]
	},
		"application/x-ms-xbap": {
		source: "apache",
		extensions: [
			"xbap"
		]
	},
		"application/x-msaccess": {
		source: "apache",
		extensions: [
			"mdb"
		]
	},
		"application/x-msbinder": {
		source: "apache",
		extensions: [
			"obd"
		]
	},
		"application/x-mscardfile": {
		source: "apache",
		extensions: [
			"crd"
		]
	},
		"application/x-msclip": {
		source: "apache",
		extensions: [
			"clp"
		]
	},
		"application/x-msdos-program": {
		extensions: [
			"exe"
		]
	},
		"application/x-msdownload": {
		source: "apache",
		extensions: [
			"exe",
			"dll",
			"com",
			"bat",
			"msi"
		]
	},
		"application/x-msmediaview": {
		source: "apache",
		extensions: [
			"mvb",
			"m13",
			"m14"
		]
	},
		"application/x-msmetafile": {
		source: "apache",
		extensions: [
			"wmf",
			"wmz",
			"emf",
			"emz"
		]
	},
		"application/x-msmoney": {
		source: "apache",
		extensions: [
			"mny"
		]
	},
		"application/x-mspublisher": {
		source: "apache",
		extensions: [
			"pub"
		]
	},
		"application/x-msschedule": {
		source: "apache",
		extensions: [
			"scd"
		]
	},
		"application/x-msterminal": {
		source: "apache",
		extensions: [
			"trm"
		]
	},
		"application/x-mswrite": {
		source: "apache",
		extensions: [
			"wri"
		]
	},
		"application/x-netcdf": {
		source: "apache",
		extensions: [
			"nc",
			"cdf"
		]
	},
		"application/x-ns-proxy-autoconfig": {
		compressible: true,
		extensions: [
			"pac"
		]
	},
		"application/x-nzb": {
		source: "apache",
		extensions: [
			"nzb"
		]
	},
		"application/x-perl": {
		source: "nginx",
		extensions: [
			"pl",
			"pm"
		]
	},
		"application/x-pilot": {
		source: "nginx",
		extensions: [
			"prc",
			"pdb"
		]
	},
		"application/x-pkcs12": {
		source: "apache",
		compressible: false,
		extensions: [
			"p12",
			"pfx"
		]
	},
		"application/x-pkcs7-certificates": {
		source: "apache",
		extensions: [
			"p7b",
			"spc"
		]
	},
		"application/x-pkcs7-certreqresp": {
		source: "apache",
		extensions: [
			"p7r"
		]
	},
		"application/x-rar-compressed": {
		source: "apache",
		compressible: false,
		extensions: [
			"rar"
		]
	},
		"application/x-redhat-package-manager": {
		source: "nginx",
		extensions: [
			"rpm"
		]
	},
		"application/x-research-info-systems": {
		source: "apache",
		extensions: [
			"ris"
		]
	},
		"application/x-sea": {
		source: "nginx",
		extensions: [
			"sea"
		]
	},
		"application/x-sh": {
		source: "apache",
		compressible: true,
		extensions: [
			"sh"
		]
	},
		"application/x-shar": {
		source: "apache",
		extensions: [
			"shar"
		]
	},
		"application/x-shockwave-flash": {
		source: "apache",
		compressible: false,
		extensions: [
			"swf"
		]
	},
		"application/x-silverlight-app": {
		source: "apache",
		extensions: [
			"xap"
		]
	},
		"application/x-sql": {
		source: "apache",
		extensions: [
			"sql"
		]
	},
		"application/x-stuffit": {
		source: "apache",
		compressible: false,
		extensions: [
			"sit"
		]
	},
		"application/x-stuffitx": {
		source: "apache",
		extensions: [
			"sitx"
		]
	},
		"application/x-subrip": {
		source: "apache",
		extensions: [
			"srt"
		]
	},
		"application/x-sv4cpio": {
		source: "apache",
		extensions: [
			"sv4cpio"
		]
	},
		"application/x-sv4crc": {
		source: "apache",
		extensions: [
			"sv4crc"
		]
	},
		"application/x-t3vm-image": {
		source: "apache",
		extensions: [
			"t3"
		]
	},
		"application/x-tads": {
		source: "apache",
		extensions: [
			"gam"
		]
	},
		"application/x-tar": {
		source: "apache",
		compressible: true,
		extensions: [
			"tar"
		]
	},
		"application/x-tcl": {
		source: "apache",
		extensions: [
			"tcl",
			"tk"
		]
	},
		"application/x-tex": {
		source: "apache",
		extensions: [
			"tex"
		]
	},
		"application/x-tex-tfm": {
		source: "apache",
		extensions: [
			"tfm"
		]
	},
		"application/x-texinfo": {
		source: "apache",
		extensions: [
			"texinfo",
			"texi"
		]
	},
		"application/x-tgif": {
		source: "apache",
		extensions: [
			"obj"
		]
	},
		"application/x-ustar": {
		source: "apache",
		extensions: [
			"ustar"
		]
	},
		"application/x-virtualbox-hdd": {
		compressible: true,
		extensions: [
			"hdd"
		]
	},
		"application/x-virtualbox-ova": {
		compressible: true,
		extensions: [
			"ova"
		]
	},
		"application/x-virtualbox-ovf": {
		compressible: true,
		extensions: [
			"ovf"
		]
	},
		"application/x-virtualbox-vbox": {
		compressible: true,
		extensions: [
			"vbox"
		]
	},
		"application/x-virtualbox-vbox-extpack": {
		compressible: false,
		extensions: [
			"vbox-extpack"
		]
	},
		"application/x-virtualbox-vdi": {
		compressible: true,
		extensions: [
			"vdi"
		]
	},
		"application/x-virtualbox-vhd": {
		compressible: true,
		extensions: [
			"vhd"
		]
	},
		"application/x-virtualbox-vmdk": {
		compressible: true,
		extensions: [
			"vmdk"
		]
	},
		"application/x-wais-source": {
		source: "apache",
		extensions: [
			"src"
		]
	},
		"application/x-web-app-manifest+json": {
		compressible: true,
		extensions: [
			"webapp"
		]
	},
		"application/x-www-form-urlencoded": {
		source: "iana",
		compressible: true
	},
		"application/x-x509-ca-cert": {
		source: "apache",
		extensions: [
			"der",
			"crt",
			"pem"
		]
	},
		"application/x-xfig": {
		source: "apache",
		extensions: [
			"fig"
		]
	},
		"application/x-xliff+xml": {
		source: "apache",
		extensions: [
			"xlf"
		]
	},
		"application/x-xpinstall": {
		source: "apache",
		compressible: false,
		extensions: [
			"xpi"
		]
	},
		"application/x-xz": {
		source: "apache",
		extensions: [
			"xz"
		]
	},
		"application/x-zmachine": {
		source: "apache",
		extensions: [
			"z1",
			"z2",
			"z3",
			"z4",
			"z5",
			"z6",
			"z7",
			"z8"
		]
	},
		"application/x400-bp": {
		source: "iana"
	},
		"application/xacml+xml": {
		source: "iana"
	},
		"application/xaml+xml": {
		source: "apache",
		extensions: [
			"xaml"
		]
	},
		"application/xcap-att+xml": {
		source: "iana"
	},
		"application/xcap-caps+xml": {
		source: "iana"
	},
		"application/xcap-diff+xml": {
		source: "iana",
		extensions: [
			"xdf"
		]
	},
		"application/xcap-el+xml": {
		source: "iana"
	},
		"application/xcap-error+xml": {
		source: "iana"
	},
		"application/xcap-ns+xml": {
		source: "iana"
	},
		"application/xcon-conference-info+xml": {
		source: "iana"
	},
		"application/xcon-conference-info-diff+xml": {
		source: "iana"
	},
		"application/xenc+xml": {
		source: "iana",
		extensions: [
			"xenc"
		]
	},
		"application/xhtml+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"xhtml",
			"xht"
		]
	},
		"application/xhtml-voice+xml": {
		source: "apache"
	},
		"application/xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"xml",
			"xsl",
			"xsd",
			"rng"
		]
	},
		"application/xml-dtd": {
		source: "iana",
		compressible: true,
		extensions: [
			"dtd"
		]
	},
		"application/xml-external-parsed-entity": {
		source: "iana"
	},
		"application/xml-patch+xml": {
		source: "iana"
	},
		"application/xmpp+xml": {
		source: "iana"
	},
		"application/xop+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"xop"
		]
	},
		"application/xproc+xml": {
		source: "apache",
		extensions: [
			"xpl"
		]
	},
		"application/xslt+xml": {
		source: "iana",
		extensions: [
			"xslt"
		]
	},
		"application/xspf+xml": {
		source: "apache",
		extensions: [
			"xspf"
		]
	},
		"application/xv+xml": {
		source: "iana",
		extensions: [
			"mxml",
			"xhvml",
			"xvml",
			"xvm"
		]
	},
		"application/yang": {
		source: "iana",
		extensions: [
			"yang"
		]
	},
		"application/yang-data+json": {
		source: "iana",
		compressible: true
	},
		"application/yang-data+xml": {
		source: "iana"
	},
		"application/yang-patch+json": {
		source: "iana",
		compressible: true
	},
		"application/yang-patch+xml": {
		source: "iana"
	},
		"application/yin+xml": {
		source: "iana",
		extensions: [
			"yin"
		]
	},
		"application/zip": {
		source: "iana",
		compressible: false,
		extensions: [
			"zip"
		]
	},
		"application/zlib": {
		source: "iana"
	},
		"audio/1d-interleaved-parityfec": {
		source: "iana"
	},
		"audio/32kadpcm": {
		source: "iana"
	},
		"audio/3gpp": {
		source: "iana",
		compressible: false,
		extensions: [
			"3gpp"
		]
	},
		"audio/3gpp2": {
		source: "iana"
	},
		"audio/ac3": {
		source: "iana"
	},
		"audio/adpcm": {
		source: "apache",
		extensions: [
			"adp"
		]
	},
		"audio/amr": {
		source: "iana"
	},
		"audio/amr-wb": {
		source: "iana"
	},
		"audio/amr-wb+": {
		source: "iana"
	},
		"audio/aptx": {
		source: "iana"
	},
		"audio/asc": {
		source: "iana"
	},
		"audio/atrac-advanced-lossless": {
		source: "iana"
	},
		"audio/atrac-x": {
		source: "iana"
	},
		"audio/atrac3": {
		source: "iana"
	},
		"audio/basic": {
		source: "iana",
		compressible: false,
		extensions: [
			"au",
			"snd"
		]
	},
		"audio/bv16": {
		source: "iana"
	},
		"audio/bv32": {
		source: "iana"
	},
		"audio/clearmode": {
		source: "iana"
	},
		"audio/cn": {
		source: "iana"
	},
		"audio/dat12": {
		source: "iana"
	},
		"audio/dls": {
		source: "iana"
	},
		"audio/dsr-es201108": {
		source: "iana"
	},
		"audio/dsr-es202050": {
		source: "iana"
	},
		"audio/dsr-es202211": {
		source: "iana"
	},
		"audio/dsr-es202212": {
		source: "iana"
	},
		"audio/dv": {
		source: "iana"
	},
		"audio/dvi4": {
		source: "iana"
	},
		"audio/eac3": {
		source: "iana"
	},
		"audio/encaprtp": {
		source: "iana"
	},
		"audio/evrc": {
		source: "iana"
	},
		"audio/evrc-qcp": {
		source: "iana"
	},
		"audio/evrc0": {
		source: "iana"
	},
		"audio/evrc1": {
		source: "iana"
	},
		"audio/evrcb": {
		source: "iana"
	},
		"audio/evrcb0": {
		source: "iana"
	},
		"audio/evrcb1": {
		source: "iana"
	},
		"audio/evrcnw": {
		source: "iana"
	},
		"audio/evrcnw0": {
		source: "iana"
	},
		"audio/evrcnw1": {
		source: "iana"
	},
		"audio/evrcwb": {
		source: "iana"
	},
		"audio/evrcwb0": {
		source: "iana"
	},
		"audio/evrcwb1": {
		source: "iana"
	},
		"audio/evs": {
		source: "iana"
	},
		"audio/fwdred": {
		source: "iana"
	},
		"audio/g711-0": {
		source: "iana"
	},
		"audio/g719": {
		source: "iana"
	},
		"audio/g722": {
		source: "iana"
	},
		"audio/g7221": {
		source: "iana"
	},
		"audio/g723": {
		source: "iana"
	},
		"audio/g726-16": {
		source: "iana"
	},
		"audio/g726-24": {
		source: "iana"
	},
		"audio/g726-32": {
		source: "iana"
	},
		"audio/g726-40": {
		source: "iana"
	},
		"audio/g728": {
		source: "iana"
	},
		"audio/g729": {
		source: "iana"
	},
		"audio/g7291": {
		source: "iana"
	},
		"audio/g729d": {
		source: "iana"
	},
		"audio/g729e": {
		source: "iana"
	},
		"audio/gsm": {
		source: "iana"
	},
		"audio/gsm-efr": {
		source: "iana"
	},
		"audio/gsm-hr-08": {
		source: "iana"
	},
		"audio/ilbc": {
		source: "iana"
	},
		"audio/ip-mr_v2.5": {
		source: "iana"
	},
		"audio/isac": {
		source: "apache"
	},
		"audio/l16": {
		source: "iana"
	},
		"audio/l20": {
		source: "iana"
	},
		"audio/l24": {
		source: "iana",
		compressible: false
	},
		"audio/l8": {
		source: "iana"
	},
		"audio/lpc": {
		source: "iana"
	},
		"audio/melp": {
		source: "iana"
	},
		"audio/melp1200": {
		source: "iana"
	},
		"audio/melp2400": {
		source: "iana"
	},
		"audio/melp600": {
		source: "iana"
	},
		"audio/midi": {
		source: "apache",
		extensions: [
			"mid",
			"midi",
			"kar",
			"rmi"
		]
	},
		"audio/mobile-xmf": {
		source: "iana"
	},
		"audio/mp3": {
		compressible: false,
		extensions: [
			"mp3"
		]
	},
		"audio/mp4": {
		source: "iana",
		compressible: false,
		extensions: [
			"m4a",
			"mp4a"
		]
	},
		"audio/mp4a-latm": {
		source: "iana"
	},
		"audio/mpa": {
		source: "iana"
	},
		"audio/mpa-robust": {
		source: "iana"
	},
		"audio/mpeg": {
		source: "iana",
		compressible: false,
		extensions: [
			"mpga",
			"mp2",
			"mp2a",
			"mp3",
			"m2a",
			"m3a"
		]
	},
		"audio/mpeg4-generic": {
		source: "iana"
	},
		"audio/musepack": {
		source: "apache"
	},
		"audio/ogg": {
		source: "iana",
		compressible: false,
		extensions: [
			"oga",
			"ogg",
			"spx"
		]
	},
		"audio/opus": {
		source: "iana"
	},
		"audio/parityfec": {
		source: "iana"
	},
		"audio/pcma": {
		source: "iana"
	},
		"audio/pcma-wb": {
		source: "iana"
	},
		"audio/pcmu": {
		source: "iana"
	},
		"audio/pcmu-wb": {
		source: "iana"
	},
		"audio/prs.sid": {
		source: "iana"
	},
		"audio/qcelp": {
		source: "iana"
	},
		"audio/raptorfec": {
		source: "iana"
	},
		"audio/red": {
		source: "iana"
	},
		"audio/rtp-enc-aescm128": {
		source: "iana"
	},
		"audio/rtp-midi": {
		source: "iana"
	},
		"audio/rtploopback": {
		source: "iana"
	},
		"audio/rtx": {
		source: "iana"
	},
		"audio/s3m": {
		source: "apache",
		extensions: [
			"s3m"
		]
	},
		"audio/silk": {
		source: "apache",
		extensions: [
			"sil"
		]
	},
		"audio/smv": {
		source: "iana"
	},
		"audio/smv-qcp": {
		source: "iana"
	},
		"audio/smv0": {
		source: "iana"
	},
		"audio/sp-midi": {
		source: "iana"
	},
		"audio/speex": {
		source: "iana"
	},
		"audio/t140c": {
		source: "iana"
	},
		"audio/t38": {
		source: "iana"
	},
		"audio/telephone-event": {
		source: "iana"
	},
		"audio/tone": {
		source: "iana"
	},
		"audio/uemclip": {
		source: "iana"
	},
		"audio/ulpfec": {
		source: "iana"
	},
		"audio/vdvi": {
		source: "iana"
	},
		"audio/vmr-wb": {
		source: "iana"
	},
		"audio/vnd.3gpp.iufp": {
		source: "iana"
	},
		"audio/vnd.4sb": {
		source: "iana"
	},
		"audio/vnd.audiokoz": {
		source: "iana"
	},
		"audio/vnd.celp": {
		source: "iana"
	},
		"audio/vnd.cisco.nse": {
		source: "iana"
	},
		"audio/vnd.cmles.radio-events": {
		source: "iana"
	},
		"audio/vnd.cns.anp1": {
		source: "iana"
	},
		"audio/vnd.cns.inf1": {
		source: "iana"
	},
		"audio/vnd.dece.audio": {
		source: "iana",
		extensions: [
			"uva",
			"uvva"
		]
	},
		"audio/vnd.digital-winds": {
		source: "iana",
		extensions: [
			"eol"
		]
	},
		"audio/vnd.dlna.adts": {
		source: "iana"
	},
		"audio/vnd.dolby.heaac.1": {
		source: "iana"
	},
		"audio/vnd.dolby.heaac.2": {
		source: "iana"
	},
		"audio/vnd.dolby.mlp": {
		source: "iana"
	},
		"audio/vnd.dolby.mps": {
		source: "iana"
	},
		"audio/vnd.dolby.pl2": {
		source: "iana"
	},
		"audio/vnd.dolby.pl2x": {
		source: "iana"
	},
		"audio/vnd.dolby.pl2z": {
		source: "iana"
	},
		"audio/vnd.dolby.pulse.1": {
		source: "iana"
	},
		"audio/vnd.dra": {
		source: "iana",
		extensions: [
			"dra"
		]
	},
		"audio/vnd.dts": {
		source: "iana",
		extensions: [
			"dts"
		]
	},
		"audio/vnd.dts.hd": {
		source: "iana",
		extensions: [
			"dtshd"
		]
	},
		"audio/vnd.dvb.file": {
		source: "iana"
	},
		"audio/vnd.everad.plj": {
		source: "iana"
	},
		"audio/vnd.hns.audio": {
		source: "iana"
	},
		"audio/vnd.lucent.voice": {
		source: "iana",
		extensions: [
			"lvp"
		]
	},
		"audio/vnd.ms-playready.media.pya": {
		source: "iana",
		extensions: [
			"pya"
		]
	},
		"audio/vnd.nokia.mobile-xmf": {
		source: "iana"
	},
		"audio/vnd.nortel.vbk": {
		source: "iana"
	},
		"audio/vnd.nuera.ecelp4800": {
		source: "iana",
		extensions: [
			"ecelp4800"
		]
	},
		"audio/vnd.nuera.ecelp7470": {
		source: "iana",
		extensions: [
			"ecelp7470"
		]
	},
		"audio/vnd.nuera.ecelp9600": {
		source: "iana",
		extensions: [
			"ecelp9600"
		]
	},
		"audio/vnd.octel.sbc": {
		source: "iana"
	},
		"audio/vnd.presonus.multitrack": {
		source: "iana"
	},
		"audio/vnd.qcelp": {
		source: "iana"
	},
		"audio/vnd.rhetorex.32kadpcm": {
		source: "iana"
	},
		"audio/vnd.rip": {
		source: "iana",
		extensions: [
			"rip"
		]
	},
		"audio/vnd.rn-realaudio": {
		compressible: false
	},
		"audio/vnd.sealedmedia.softseal.mpeg": {
		source: "iana"
	},
		"audio/vnd.vmx.cvsd": {
		source: "iana"
	},
		"audio/vnd.wave": {
		compressible: false
	},
		"audio/vorbis": {
		source: "iana",
		compressible: false
	},
		"audio/vorbis-config": {
		source: "iana"
	},
		"audio/wav": {
		compressible: false,
		extensions: [
			"wav"
		]
	},
		"audio/wave": {
		compressible: false,
		extensions: [
			"wav"
		]
	},
		"audio/webm": {
		source: "apache",
		compressible: false,
		extensions: [
			"weba"
		]
	},
		"audio/x-aac": {
		source: "apache",
		compressible: false,
		extensions: [
			"aac"
		]
	},
		"audio/x-aiff": {
		source: "apache",
		extensions: [
			"aif",
			"aiff",
			"aifc"
		]
	},
		"audio/x-caf": {
		source: "apache",
		compressible: false,
		extensions: [
			"caf"
		]
	},
		"audio/x-flac": {
		source: "apache",
		extensions: [
			"flac"
		]
	},
		"audio/x-m4a": {
		source: "nginx",
		extensions: [
			"m4a"
		]
	},
		"audio/x-matroska": {
		source: "apache",
		extensions: [
			"mka"
		]
	},
		"audio/x-mpegurl": {
		source: "apache",
		extensions: [
			"m3u"
		]
	},
		"audio/x-ms-wax": {
		source: "apache",
		extensions: [
			"wax"
		]
	},
		"audio/x-ms-wma": {
		source: "apache",
		extensions: [
			"wma"
		]
	},
		"audio/x-pn-realaudio": {
		source: "apache",
		extensions: [
			"ram",
			"ra"
		]
	},
		"audio/x-pn-realaudio-plugin": {
		source: "apache",
		extensions: [
			"rmp"
		]
	},
		"audio/x-realaudio": {
		source: "nginx",
		extensions: [
			"ra"
		]
	},
		"audio/x-tta": {
		source: "apache"
	},
		"audio/x-wav": {
		source: "apache",
		extensions: [
			"wav"
		]
	},
		"audio/xm": {
		source: "apache",
		extensions: [
			"xm"
		]
	},
		"chemical/x-cdx": {
		source: "apache",
		extensions: [
			"cdx"
		]
	},
		"chemical/x-cif": {
		source: "apache",
		extensions: [
			"cif"
		]
	},
		"chemical/x-cmdf": {
		source: "apache",
		extensions: [
			"cmdf"
		]
	},
		"chemical/x-cml": {
		source: "apache",
		extensions: [
			"cml"
		]
	},
		"chemical/x-csml": {
		source: "apache",
		extensions: [
			"csml"
		]
	},
		"chemical/x-pdb": {
		source: "apache"
	},
		"chemical/x-xyz": {
		source: "apache",
		extensions: [
			"xyz"
		]
	},
		"font/collection": {
		source: "iana",
		extensions: [
			"ttc"
		]
	},
		"font/otf": {
		source: "iana",
		compressible: true,
		extensions: [
			"otf"
		]
	},
		"font/sfnt": {
		source: "iana"
	},
		"font/ttf": {
		source: "iana",
		extensions: [
			"ttf"
		]
	},
		"font/woff": {
		source: "iana",
		extensions: [
			"woff"
		]
	},
		"font/woff2": {
		source: "iana",
		extensions: [
			"woff2"
		]
	},
		"image/aces": {
		source: "iana"
	},
		"image/apng": {
		compressible: false,
		extensions: [
			"apng"
		]
	},
		"image/bmp": {
		source: "iana",
		compressible: true,
		extensions: [
			"bmp"
		]
	},
		"image/cgm": {
		source: "iana",
		extensions: [
			"cgm"
		]
	},
		"image/dicom-rle": {
		source: "iana"
	},
		"image/emf": {
		source: "iana"
	},
		"image/fits": {
		source: "iana"
	},
		"image/g3fax": {
		source: "iana",
		extensions: [
			"g3"
		]
	},
		"image/gif": {
		source: "iana",
		compressible: false,
		extensions: [
			"gif"
		]
	},
		"image/ief": {
		source: "iana",
		extensions: [
			"ief"
		]
	},
		"image/jls": {
		source: "iana"
	},
		"image/jp2": {
		source: "iana",
		compressible: false,
		extensions: [
			"jp2",
			"jpg2"
		]
	},
		"image/jpeg": {
		source: "iana",
		compressible: false,
		extensions: [
			"jpeg",
			"jpg",
			"jpe"
		]
	},
		"image/jpm": {
		source: "iana",
		compressible: false,
		extensions: [
			"jpm"
		]
	},
		"image/jpx": {
		source: "iana",
		compressible: false,
		extensions: [
			"jpx",
			"jpf"
		]
	},
		"image/ktx": {
		source: "iana",
		extensions: [
			"ktx"
		]
	},
		"image/naplps": {
		source: "iana"
	},
		"image/pjpeg": {
		compressible: false
	},
		"image/png": {
		source: "iana",
		compressible: false,
		extensions: [
			"png"
		]
	},
		"image/prs.btif": {
		source: "iana",
		extensions: [
			"btif"
		]
	},
		"image/prs.pti": {
		source: "iana"
	},
		"image/pwg-raster": {
		source: "iana"
	},
		"image/sgi": {
		source: "apache",
		extensions: [
			"sgi"
		]
	},
		"image/svg+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"svg",
			"svgz"
		]
	},
		"image/t38": {
		source: "iana"
	},
		"image/tiff": {
		source: "iana",
		compressible: false,
		extensions: [
			"tiff",
			"tif"
		]
	},
		"image/tiff-fx": {
		source: "iana"
	},
		"image/vnd.adobe.photoshop": {
		source: "iana",
		compressible: true,
		extensions: [
			"psd"
		]
	},
		"image/vnd.airzip.accelerator.azv": {
		source: "iana"
	},
		"image/vnd.cns.inf2": {
		source: "iana"
	},
		"image/vnd.dece.graphic": {
		source: "iana",
		extensions: [
			"uvi",
			"uvvi",
			"uvg",
			"uvvg"
		]
	},
		"image/vnd.djvu": {
		source: "iana",
		extensions: [
			"djvu",
			"djv"
		]
	},
		"image/vnd.dvb.subtitle": {
		source: "iana",
		extensions: [
			"sub"
		]
	},
		"image/vnd.dwg": {
		source: "iana",
		extensions: [
			"dwg"
		]
	},
		"image/vnd.dxf": {
		source: "iana",
		extensions: [
			"dxf"
		]
	},
		"image/vnd.fastbidsheet": {
		source: "iana",
		extensions: [
			"fbs"
		]
	},
		"image/vnd.fpx": {
		source: "iana",
		extensions: [
			"fpx"
		]
	},
		"image/vnd.fst": {
		source: "iana",
		extensions: [
			"fst"
		]
	},
		"image/vnd.fujixerox.edmics-mmr": {
		source: "iana",
		extensions: [
			"mmr"
		]
	},
		"image/vnd.fujixerox.edmics-rlc": {
		source: "iana",
		extensions: [
			"rlc"
		]
	},
		"image/vnd.globalgraphics.pgb": {
		source: "iana"
	},
		"image/vnd.microsoft.icon": {
		source: "iana"
	},
		"image/vnd.mix": {
		source: "iana"
	},
		"image/vnd.mozilla.apng": {
		source: "iana"
	},
		"image/vnd.ms-modi": {
		source: "iana",
		extensions: [
			"mdi"
		]
	},
		"image/vnd.ms-photo": {
		source: "apache",
		extensions: [
			"wdp"
		]
	},
		"image/vnd.net-fpx": {
		source: "iana",
		extensions: [
			"npx"
		]
	},
		"image/vnd.radiance": {
		source: "iana"
	},
		"image/vnd.sealed.png": {
		source: "iana"
	},
		"image/vnd.sealedmedia.softseal.gif": {
		source: "iana"
	},
		"image/vnd.sealedmedia.softseal.jpg": {
		source: "iana"
	},
		"image/vnd.svf": {
		source: "iana"
	},
		"image/vnd.tencent.tap": {
		source: "iana"
	},
		"image/vnd.valve.source.texture": {
		source: "iana"
	},
		"image/vnd.wap.wbmp": {
		source: "iana",
		extensions: [
			"wbmp"
		]
	},
		"image/vnd.xiff": {
		source: "iana",
		extensions: [
			"xif"
		]
	},
		"image/vnd.zbrush.pcx": {
		source: "iana"
	},
		"image/webp": {
		source: "apache",
		extensions: [
			"webp"
		]
	},
		"image/wmf": {
		source: "iana"
	},
		"image/x-3ds": {
		source: "apache",
		extensions: [
			"3ds"
		]
	},
		"image/x-cmu-raster": {
		source: "apache",
		extensions: [
			"ras"
		]
	},
		"image/x-cmx": {
		source: "apache",
		extensions: [
			"cmx"
		]
	},
		"image/x-freehand": {
		source: "apache",
		extensions: [
			"fh",
			"fhc",
			"fh4",
			"fh5",
			"fh7"
		]
	},
		"image/x-icon": {
		source: "apache",
		compressible: true,
		extensions: [
			"ico"
		]
	},
		"image/x-jng": {
		source: "nginx",
		extensions: [
			"jng"
		]
	},
		"image/x-mrsid-image": {
		source: "apache",
		extensions: [
			"sid"
		]
	},
		"image/x-ms-bmp": {
		source: "nginx",
		compressible: true,
		extensions: [
			"bmp"
		]
	},
		"image/x-pcx": {
		source: "apache",
		extensions: [
			"pcx"
		]
	},
		"image/x-pict": {
		source: "apache",
		extensions: [
			"pic",
			"pct"
		]
	},
		"image/x-portable-anymap": {
		source: "apache",
		extensions: [
			"pnm"
		]
	},
		"image/x-portable-bitmap": {
		source: "apache",
		extensions: [
			"pbm"
		]
	},
		"image/x-portable-graymap": {
		source: "apache",
		extensions: [
			"pgm"
		]
	},
		"image/x-portable-pixmap": {
		source: "apache",
		extensions: [
			"ppm"
		]
	},
		"image/x-rgb": {
		source: "apache",
		extensions: [
			"rgb"
		]
	},
		"image/x-tga": {
		source: "apache",
		extensions: [
			"tga"
		]
	},
		"image/x-xbitmap": {
		source: "apache",
		extensions: [
			"xbm"
		]
	},
		"image/x-xcf": {
		compressible: false
	},
		"image/x-xpixmap": {
		source: "apache",
		extensions: [
			"xpm"
		]
	},
		"image/x-xwindowdump": {
		source: "apache",
		extensions: [
			"xwd"
		]
	},
		"message/cpim": {
		source: "iana"
	},
		"message/delivery-status": {
		source: "iana"
	},
		"message/disposition-notification": {
		source: "iana",
		extensions: [
			"disposition-notification"
		]
	},
		"message/external-body": {
		source: "iana"
	},
		"message/feedback-report": {
		source: "iana"
	},
		"message/global": {
		source: "iana",
		extensions: [
			"u8msg"
		]
	},
		"message/global-delivery-status": {
		source: "iana",
		extensions: [
			"u8dsn"
		]
	},
		"message/global-disposition-notification": {
		source: "iana",
		extensions: [
			"u8mdn"
		]
	},
		"message/global-headers": {
		source: "iana",
		extensions: [
			"u8hdr"
		]
	},
		"message/http": {
		source: "iana",
		compressible: false
	},
		"message/imdn+xml": {
		source: "iana",
		compressible: true
	},
		"message/news": {
		source: "iana"
	},
		"message/partial": {
		source: "iana",
		compressible: false
	},
		"message/rfc822": {
		source: "iana",
		compressible: true,
		extensions: [
			"eml",
			"mime"
		]
	},
		"message/s-http": {
		source: "iana"
	},
		"message/sip": {
		source: "iana"
	},
		"message/sipfrag": {
		source: "iana"
	},
		"message/tracking-status": {
		source: "iana"
	},
		"message/vnd.si.simp": {
		source: "iana"
	},
		"message/vnd.wfa.wsc": {
		source: "iana",
		extensions: [
			"wsc"
		]
	},
		"model/3mf": {
		source: "iana"
	},
		"model/gltf+json": {
		source: "iana",
		compressible: true,
		extensions: [
			"gltf"
		]
	},
		"model/gltf-binary": {
		source: "iana",
		compressible: true,
		extensions: [
			"glb"
		]
	},
		"model/iges": {
		source: "iana",
		compressible: false,
		extensions: [
			"igs",
			"iges"
		]
	},
		"model/mesh": {
		source: "iana",
		compressible: false,
		extensions: [
			"msh",
			"mesh",
			"silo"
		]
	},
		"model/vnd.collada+xml": {
		source: "iana",
		extensions: [
			"dae"
		]
	},
		"model/vnd.dwf": {
		source: "iana",
		extensions: [
			"dwf"
		]
	},
		"model/vnd.flatland.3dml": {
		source: "iana"
	},
		"model/vnd.gdl": {
		source: "iana",
		extensions: [
			"gdl"
		]
	},
		"model/vnd.gs-gdl": {
		source: "apache"
	},
		"model/vnd.gs.gdl": {
		source: "iana"
	},
		"model/vnd.gtw": {
		source: "iana",
		extensions: [
			"gtw"
		]
	},
		"model/vnd.moml+xml": {
		source: "iana"
	},
		"model/vnd.mts": {
		source: "iana",
		extensions: [
			"mts"
		]
	},
		"model/vnd.opengex": {
		source: "iana"
	},
		"model/vnd.parasolid.transmit.binary": {
		source: "iana"
	},
		"model/vnd.parasolid.transmit.text": {
		source: "iana"
	},
		"model/vnd.rosette.annotated-data-model": {
		source: "iana"
	},
		"model/vnd.valve.source.compiled-map": {
		source: "iana"
	},
		"model/vnd.vtu": {
		source: "iana",
		extensions: [
			"vtu"
		]
	},
		"model/vrml": {
		source: "iana",
		compressible: false,
		extensions: [
			"wrl",
			"vrml"
		]
	},
		"model/x3d+binary": {
		source: "apache",
		compressible: false,
		extensions: [
			"x3db",
			"x3dbz"
		]
	},
		"model/x3d+fastinfoset": {
		source: "iana"
	},
		"model/x3d+vrml": {
		source: "apache",
		compressible: false,
		extensions: [
			"x3dv",
			"x3dvz"
		]
	},
		"model/x3d+xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"x3d",
			"x3dz"
		]
	},
		"model/x3d-vrml": {
		source: "iana"
	},
		"multipart/alternative": {
		source: "iana",
		compressible: false
	},
		"multipart/appledouble": {
		source: "iana"
	},
		"multipart/byteranges": {
		source: "iana"
	},
		"multipart/digest": {
		source: "iana"
	},
		"multipart/encrypted": {
		source: "iana",
		compressible: false
	},
		"multipart/form-data": {
		source: "iana",
		compressible: false
	},
		"multipart/header-set": {
		source: "iana"
	},
		"multipart/mixed": {
		source: "iana",
		compressible: false
	},
		"multipart/multilingual": {
		source: "iana"
	},
		"multipart/parallel": {
		source: "iana"
	},
		"multipart/related": {
		source: "iana",
		compressible: false
	},
		"multipart/report": {
		source: "iana"
	},
		"multipart/signed": {
		source: "iana",
		compressible: false
	},
		"multipart/vnd.bint.med-plus": {
		source: "iana"
	},
		"multipart/voice-message": {
		source: "iana"
	},
		"multipart/x-mixed-replace": {
		source: "iana"
	},
		"text/1d-interleaved-parityfec": {
		source: "iana"
	},
		"text/cache-manifest": {
		source: "iana",
		compressible: true,
		extensions: [
			"appcache",
			"manifest"
		]
	},
		"text/calendar": {
		source: "iana",
		extensions: [
			"ics",
			"ifb"
		]
	},
		"text/calender": {
		compressible: true
	},
		"text/cmd": {
		compressible: true
	},
		"text/coffeescript": {
		extensions: [
			"coffee",
			"litcoffee"
		]
	},
		"text/css": {
		source: "iana",
		charset: "UTF-8",
		compressible: true,
		extensions: [
			"css"
		]
	},
		"text/csv": {
		source: "iana",
		compressible: true,
		extensions: [
			"csv"
		]
	},
		"text/csv-schema": {
		source: "iana"
	},
		"text/directory": {
		source: "iana"
	},
		"text/dns": {
		source: "iana"
	},
		"text/ecmascript": {
		source: "iana"
	},
		"text/encaprtp": {
		source: "iana"
	},
		"text/enriched": {
		source: "iana"
	},
		"text/fwdred": {
		source: "iana"
	},
		"text/grammar-ref-list": {
		source: "iana"
	},
		"text/html": {
		source: "iana",
		compressible: true,
		extensions: [
			"html",
			"htm",
			"shtml"
		]
	},
		"text/jade": {
		extensions: [
			"jade"
		]
	},
		"text/javascript": {
		source: "iana",
		compressible: true
	},
		"text/jcr-cnd": {
		source: "iana"
	},
		"text/jsx": {
		compressible: true,
		extensions: [
			"jsx"
		]
	},
		"text/less": {
		extensions: [
			"less"
		]
	},
		"text/markdown": {
		source: "iana",
		compressible: true,
		extensions: [
			"markdown",
			"md"
		]
	},
		"text/mathml": {
		source: "nginx",
		extensions: [
			"mml"
		]
	},
		"text/mizar": {
		source: "iana"
	},
		"text/n3": {
		source: "iana",
		compressible: true,
		extensions: [
			"n3"
		]
	},
		"text/parameters": {
		source: "iana"
	},
		"text/parityfec": {
		source: "iana"
	},
		"text/plain": {
		source: "iana",
		compressible: true,
		extensions: [
			"txt",
			"text",
			"conf",
			"def",
			"list",
			"log",
			"in",
			"ini"
		]
	},
		"text/provenance-notation": {
		source: "iana"
	},
		"text/prs.fallenstein.rst": {
		source: "iana"
	},
		"text/prs.lines.tag": {
		source: "iana",
		extensions: [
			"dsc"
		]
	},
		"text/prs.prop.logic": {
		source: "iana"
	},
		"text/raptorfec": {
		source: "iana"
	},
		"text/red": {
		source: "iana"
	},
		"text/rfc822-headers": {
		source: "iana"
	},
		"text/richtext": {
		source: "iana",
		compressible: true,
		extensions: [
			"rtx"
		]
	},
		"text/rtf": {
		source: "iana",
		compressible: true,
		extensions: [
			"rtf"
		]
	},
		"text/rtp-enc-aescm128": {
		source: "iana"
	},
		"text/rtploopback": {
		source: "iana"
	},
		"text/rtx": {
		source: "iana"
	},
		"text/sgml": {
		source: "iana",
		extensions: [
			"sgml",
			"sgm"
		]
	},
		"text/shex": {
		extensions: [
			"shex"
		]
	},
		"text/slim": {
		extensions: [
			"slim",
			"slm"
		]
	},
		"text/strings": {
		source: "iana"
	},
		"text/stylus": {
		extensions: [
			"stylus",
			"styl"
		]
	},
		"text/t140": {
		source: "iana"
	},
		"text/tab-separated-values": {
		source: "iana",
		compressible: true,
		extensions: [
			"tsv"
		]
	},
		"text/troff": {
		source: "iana",
		extensions: [
			"t",
			"tr",
			"roff",
			"man",
			"me",
			"ms"
		]
	},
		"text/turtle": {
		source: "iana",
		extensions: [
			"ttl"
		]
	},
		"text/ulpfec": {
		source: "iana"
	},
		"text/uri-list": {
		source: "iana",
		compressible: true,
		extensions: [
			"uri",
			"uris",
			"urls"
		]
	},
		"text/vcard": {
		source: "iana",
		compressible: true,
		extensions: [
			"vcard"
		]
	},
		"text/vnd.a": {
		source: "iana"
	},
		"text/vnd.abc": {
		source: "iana"
	},
		"text/vnd.ascii-art": {
		source: "iana"
	},
		"text/vnd.curl": {
		source: "iana",
		extensions: [
			"curl"
		]
	},
		"text/vnd.curl.dcurl": {
		source: "apache",
		extensions: [
			"dcurl"
		]
	},
		"text/vnd.curl.mcurl": {
		source: "apache",
		extensions: [
			"mcurl"
		]
	},
		"text/vnd.curl.scurl": {
		source: "apache",
		extensions: [
			"scurl"
		]
	},
		"text/vnd.debian.copyright": {
		source: "iana"
	},
		"text/vnd.dmclientscript": {
		source: "iana"
	},
		"text/vnd.dvb.subtitle": {
		source: "iana",
		extensions: [
			"sub"
		]
	},
		"text/vnd.esmertec.theme-descriptor": {
		source: "iana"
	},
		"text/vnd.fly": {
		source: "iana",
		extensions: [
			"fly"
		]
	},
		"text/vnd.fmi.flexstor": {
		source: "iana",
		extensions: [
			"flx"
		]
	},
		"text/vnd.graphviz": {
		source: "iana",
		extensions: [
			"gv"
		]
	},
		"text/vnd.in3d.3dml": {
		source: "iana",
		extensions: [
			"3dml"
		]
	},
		"text/vnd.in3d.spot": {
		source: "iana",
		extensions: [
			"spot"
		]
	},
		"text/vnd.iptc.newsml": {
		source: "iana"
	},
		"text/vnd.iptc.nitf": {
		source: "iana"
	},
		"text/vnd.latex-z": {
		source: "iana"
	},
		"text/vnd.motorola.reflex": {
		source: "iana"
	},
		"text/vnd.ms-mediapackage": {
		source: "iana"
	},
		"text/vnd.net2phone.commcenter.command": {
		source: "iana"
	},
		"text/vnd.radisys.msml-basic-layout": {
		source: "iana"
	},
		"text/vnd.si.uricatalogue": {
		source: "iana"
	},
		"text/vnd.sun.j2me.app-descriptor": {
		source: "iana",
		extensions: [
			"jad"
		]
	},
		"text/vnd.trolltech.linguist": {
		source: "iana"
	},
		"text/vnd.wap.si": {
		source: "iana"
	},
		"text/vnd.wap.sl": {
		source: "iana"
	},
		"text/vnd.wap.wml": {
		source: "iana",
		extensions: [
			"wml"
		]
	},
		"text/vnd.wap.wmlscript": {
		source: "iana",
		extensions: [
			"wmls"
		]
	},
		"text/vtt": {
		charset: "UTF-8",
		compressible: true,
		extensions: [
			"vtt"
		]
	},
		"text/x-asm": {
		source: "apache",
		extensions: [
			"s",
			"asm"
		]
	},
		"text/x-c": {
		source: "apache",
		extensions: [
			"c",
			"cc",
			"cxx",
			"cpp",
			"h",
			"hh",
			"dic"
		]
	},
		"text/x-component": {
		source: "nginx",
		extensions: [
			"htc"
		]
	},
		"text/x-fortran": {
		source: "apache",
		extensions: [
			"f",
			"for",
			"f77",
			"f90"
		]
	},
		"text/x-gwt-rpc": {
		compressible: true
	},
		"text/x-handlebars-template": {
		extensions: [
			"hbs"
		]
	},
		"text/x-java-source": {
		source: "apache",
		extensions: [
			"java"
		]
	},
		"text/x-jquery-tmpl": {
		compressible: true
	},
		"text/x-lua": {
		extensions: [
			"lua"
		]
	},
		"text/x-markdown": {
		compressible: true,
		extensions: [
			"mkd"
		]
	},
		"text/x-nfo": {
		source: "apache",
		extensions: [
			"nfo"
		]
	},
		"text/x-opml": {
		source: "apache",
		extensions: [
			"opml"
		]
	},
		"text/x-org": {
		compressible: true,
		extensions: [
			"org"
		]
	},
		"text/x-pascal": {
		source: "apache",
		extensions: [
			"p",
			"pas"
		]
	},
		"text/x-processing": {
		compressible: true,
		extensions: [
			"pde"
		]
	},
		"text/x-sass": {
		extensions: [
			"sass"
		]
	},
		"text/x-scss": {
		extensions: [
			"scss"
		]
	},
		"text/x-setext": {
		source: "apache",
		extensions: [
			"etx"
		]
	},
		"text/x-sfv": {
		source: "apache",
		extensions: [
			"sfv"
		]
	},
		"text/x-suse-ymp": {
		compressible: true,
		extensions: [
			"ymp"
		]
	},
		"text/x-uuencode": {
		source: "apache",
		extensions: [
			"uu"
		]
	},
		"text/x-vcalendar": {
		source: "apache",
		extensions: [
			"vcs"
		]
	},
		"text/x-vcard": {
		source: "apache",
		extensions: [
			"vcf"
		]
	},
		"text/xml": {
		source: "iana",
		compressible: true,
		extensions: [
			"xml"
		]
	},
		"text/xml-external-parsed-entity": {
		source: "iana"
	},
		"text/yaml": {
		extensions: [
			"yaml",
			"yml"
		]
	},
		"video/1d-interleaved-parityfec": {
		source: "iana"
	},
		"video/3gpp": {
		source: "iana",
		extensions: [
			"3gp",
			"3gpp"
		]
	},
		"video/3gpp-tt": {
		source: "iana"
	},
		"video/3gpp2": {
		source: "iana",
		extensions: [
			"3g2"
		]
	},
		"video/bmpeg": {
		source: "iana"
	},
		"video/bt656": {
		source: "iana"
	},
		"video/celb": {
		source: "iana"
	},
		"video/dv": {
		source: "iana"
	},
		"video/encaprtp": {
		source: "iana"
	},
		"video/h261": {
		source: "iana",
		extensions: [
			"h261"
		]
	},
		"video/h263": {
		source: "iana",
		extensions: [
			"h263"
		]
	},
		"video/h263-1998": {
		source: "iana"
	},
		"video/h263-2000": {
		source: "iana"
	},
		"video/h264": {
		source: "iana",
		extensions: [
			"h264"
		]
	},
		"video/h264-rcdo": {
		source: "iana"
	},
		"video/h264-svc": {
		source: "iana"
	},
		"video/h265": {
		source: "iana"
	},
		"video/iso.segment": {
		source: "iana"
	},
		"video/jpeg": {
		source: "iana",
		extensions: [
			"jpgv"
		]
	},
		"video/jpeg2000": {
		source: "iana"
	},
		"video/jpm": {
		source: "apache",
		extensions: [
			"jpm",
			"jpgm"
		]
	},
		"video/mj2": {
		source: "iana",
		extensions: [
			"mj2",
			"mjp2"
		]
	},
		"video/mp1s": {
		source: "iana"
	},
		"video/mp2p": {
		source: "iana"
	},
		"video/mp2t": {
		source: "iana",
		extensions: [
			"ts"
		]
	},
		"video/mp4": {
		source: "iana",
		compressible: false,
		extensions: [
			"mp4",
			"mp4v",
			"mpg4"
		]
	},
		"video/mp4v-es": {
		source: "iana"
	},
		"video/mpeg": {
		source: "iana",
		compressible: false,
		extensions: [
			"mpeg",
			"mpg",
			"mpe",
			"m1v",
			"m2v"
		]
	},
		"video/mpeg4-generic": {
		source: "iana"
	},
		"video/mpv": {
		source: "iana"
	},
		"video/nv": {
		source: "iana"
	},
		"video/ogg": {
		source: "iana",
		compressible: false,
		extensions: [
			"ogv"
		]
	},
		"video/parityfec": {
		source: "iana"
	},
		"video/pointer": {
		source: "iana"
	},
		"video/quicktime": {
		source: "iana",
		compressible: false,
		extensions: [
			"qt",
			"mov"
		]
	},
		"video/raptorfec": {
		source: "iana"
	},
		"video/raw": {
		source: "iana"
	},
		"video/rtp-enc-aescm128": {
		source: "iana"
	},
		"video/rtploopback": {
		source: "iana"
	},
		"video/rtx": {
		source: "iana"
	},
		"video/smpte291": {
		source: "iana"
	},
		"video/smpte292m": {
		source: "iana"
	},
		"video/ulpfec": {
		source: "iana"
	},
		"video/vc1": {
		source: "iana"
	},
		"video/vnd.cctv": {
		source: "iana"
	},
		"video/vnd.dece.hd": {
		source: "iana",
		extensions: [
			"uvh",
			"uvvh"
		]
	},
		"video/vnd.dece.mobile": {
		source: "iana",
		extensions: [
			"uvm",
			"uvvm"
		]
	},
		"video/vnd.dece.mp4": {
		source: "iana"
	},
		"video/vnd.dece.pd": {
		source: "iana",
		extensions: [
			"uvp",
			"uvvp"
		]
	},
		"video/vnd.dece.sd": {
		source: "iana",
		extensions: [
			"uvs",
			"uvvs"
		]
	},
		"video/vnd.dece.video": {
		source: "iana",
		extensions: [
			"uvv",
			"uvvv"
		]
	},
		"video/vnd.directv.mpeg": {
		source: "iana"
	},
		"video/vnd.directv.mpeg-tts": {
		source: "iana"
	},
		"video/vnd.dlna.mpeg-tts": {
		source: "iana"
	},
		"video/vnd.dvb.file": {
		source: "iana",
		extensions: [
			"dvb"
		]
	},
		"video/vnd.fvt": {
		source: "iana",
		extensions: [
			"fvt"
		]
	},
		"video/vnd.hns.video": {
		source: "iana"
	},
		"video/vnd.iptvforum.1dparityfec-1010": {
		source: "iana"
	},
		"video/vnd.iptvforum.1dparityfec-2005": {
		source: "iana"
	},
		"video/vnd.iptvforum.2dparityfec-1010": {
		source: "iana"
	},
		"video/vnd.iptvforum.2dparityfec-2005": {
		source: "iana"
	},
		"video/vnd.iptvforum.ttsavc": {
		source: "iana"
	},
		"video/vnd.iptvforum.ttsmpeg2": {
		source: "iana"
	},
		"video/vnd.motorola.video": {
		source: "iana"
	},
		"video/vnd.motorola.videop": {
		source: "iana"
	},
		"video/vnd.mpegurl": {
		source: "iana",
		extensions: [
			"mxu",
			"m4u"
		]
	},
		"video/vnd.ms-playready.media.pyv": {
		source: "iana",
		extensions: [
			"pyv"
		]
	},
		"video/vnd.nokia.interleaved-multimedia": {
		source: "iana"
	},
		"video/vnd.nokia.mp4vr": {
		source: "iana"
	},
		"video/vnd.nokia.videovoip": {
		source: "iana"
	},
		"video/vnd.objectvideo": {
		source: "iana"
	},
		"video/vnd.radgamettools.bink": {
		source: "iana"
	},
		"video/vnd.radgamettools.smacker": {
		source: "iana"
	},
		"video/vnd.sealed.mpeg1": {
		source: "iana"
	},
		"video/vnd.sealed.mpeg4": {
		source: "iana"
	},
		"video/vnd.sealed.swf": {
		source: "iana"
	},
		"video/vnd.sealedmedia.softseal.mov": {
		source: "iana"
	},
		"video/vnd.uvvu.mp4": {
		source: "iana",
		extensions: [
			"uvu",
			"uvvu"
		]
	},
		"video/vnd.vivo": {
		source: "iana",
		extensions: [
			"viv"
		]
	},
		"video/vp8": {
		source: "iana"
	},
		"video/webm": {
		source: "apache",
		compressible: false,
		extensions: [
			"webm"
		]
	},
		"video/x-f4v": {
		source: "apache",
		extensions: [
			"f4v"
		]
	},
		"video/x-fli": {
		source: "apache",
		extensions: [
			"fli"
		]
	},
		"video/x-flv": {
		source: "apache",
		compressible: false,
		extensions: [
			"flv"
		]
	},
		"video/x-m4v": {
		source: "apache",
		extensions: [
			"m4v"
		]
	},
		"video/x-matroska": {
		source: "apache",
		compressible: false,
		extensions: [
			"mkv",
			"mk3d",
			"mks"
		]
	},
		"video/x-mng": {
		source: "apache",
		extensions: [
			"mng"
		]
	},
		"video/x-ms-asf": {
		source: "apache",
		extensions: [
			"asf",
			"asx"
		]
	},
		"video/x-ms-vob": {
		source: "apache",
		extensions: [
			"vob"
		]
	},
		"video/x-ms-wm": {
		source: "apache",
		extensions: [
			"wm"
		]
	},
		"video/x-ms-wmv": {
		source: "apache",
		compressible: false,
		extensions: [
			"wmv"
		]
	},
		"video/x-ms-wmx": {
		source: "apache",
		extensions: [
			"wmx"
		]
	},
		"video/x-ms-wvx": {
		source: "apache",
		extensions: [
			"wvx"
		]
	},
		"video/x-msvideo": {
		source: "apache",
		extensions: [
			"avi"
		]
	},
		"video/x-sgi-movie": {
		source: "apache",
		extensions: [
			"movie"
		]
	},
		"video/x-smv": {
		source: "apache",
		extensions: [
			"smv"
		]
	},
		"x-conference/x-cooltalk": {
		source: "apache",
		extensions: [
			"ice"
		]
	},
		"x-shader/x-fragment": {
		compressible: true
	},
		"x-shader/x-vertex": {
		compressible: true
	}
	};

	var db$1 = /*#__PURE__*/Object.freeze({
		default: db
	});

	var require$$0$1 = ( db$1 && db ) || db$1;

	/*!
	 * mime-db
	 * Copyright(c) 2014 Jonathan Ong
	 * MIT Licensed
	 */

	/**
	 * Module exports.
	 */

	var mimeDb = require$$0$1;

	var require$$0$2 = ( path$1 && path ) || path$1;

	var mimeTypes = createCommonjsModule(function (module, exports) {

	/**
	 * Module dependencies.
	 * @private
	 */


	var extname = require$$0$2.extname;

	/**
	 * Module variables.
	 * @private
	 */

	var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
	var TEXT_TYPE_REGEXP = /^text\//i;

	/**
	 * Module exports.
	 * @public
	 */

	exports.charset = charset;
	exports.charsets = { lookup: charset };
	exports.contentType = contentType;
	exports.extension = extension;
	exports.extensions = Object.create(null);
	exports.lookup = lookup;
	exports.types = Object.create(null);

	// Populate the extensions/types maps
	populateMaps(exports.extensions, exports.types);

	/**
	 * Get the default charset for a MIME type.
	 *
	 * @param {string} type
	 * @return {boolean|string}
	 */

	function charset (type) {
	  if (!type || typeof type !== 'string') {
	    return false
	  }

	  // TODO: use media-typer
	  var match = EXTRACT_TYPE_REGEXP.exec(type);
	  var mime = match && mimeDb[match[1].toLowerCase()];

	  if (mime && mime.charset) {
	    return mime.charset
	  }

	  // default text/* to utf-8
	  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
	    return 'UTF-8'
	  }

	  return false
	}

	/**
	 * Create a full Content-Type header given a MIME type or extension.
	 *
	 * @param {string} str
	 * @return {boolean|string}
	 */

	function contentType (str) {
	  // TODO: should this even be in this module?
	  if (!str || typeof str !== 'string') {
	    return false
	  }

	  var mime = str.indexOf('/') === -1
	    ? exports.lookup(str)
	    : str;

	  if (!mime) {
	    return false
	  }

	  // TODO: use content-type or other module
	  if (mime.indexOf('charset') === -1) {
	    var charset = exports.charset(mime);
	    if (charset) mime += '; charset=' + charset.toLowerCase();
	  }

	  return mime
	}

	/**
	 * Get the default extension for a MIME type.
	 *
	 * @param {string} type
	 * @return {boolean|string}
	 */

	function extension (type) {
	  if (!type || typeof type !== 'string') {
	    return false
	  }

	  // TODO: use media-typer
	  var match = EXTRACT_TYPE_REGEXP.exec(type);

	  // get extensions
	  var exts = match && exports.extensions[match[1].toLowerCase()];

	  if (!exts || !exts.length) {
	    return false
	  }

	  return exts[0]
	}

	/**
	 * Lookup the MIME type for a file path/extension.
	 *
	 * @param {string} path
	 * @return {boolean|string}
	 */

	function lookup (path) {
	  if (!path || typeof path !== 'string') {
	    return false
	  }

	  // get the extension ("ext" or ".ext" or full path)
	  var extension = extname('x.' + path)
	    .toLowerCase()
	    .substr(1);

	  if (!extension) {
	    return false
	  }

	  return exports.types[extension] || false
	}

	/**
	 * Populate the extensions and types maps.
	 * @private
	 */

	function populateMaps (extensions, types) {
	  // source preference (least -> most)
	  var preference = ['nginx', 'apache', undefined, 'iana'];

	  Object.keys(mimeDb).forEach(function forEachMimeType (type) {
	    var mime = mimeDb[type];
	    var exts = mime.extensions;

	    if (!exts || !exts.length) {
	      return
	    }

	    // mime -> extensions
	    extensions[type] = exts;

	    // extension -> mime
	    for (var i = 0; i < exts.length; i++) {
	      var extension = exts[i];

	      if (types[extension]) {
	        var from = preference.indexOf(mimeDb[types[extension]].source);
	        var to = preference.indexOf(mime.source);

	        if (types[extension] !== 'application/octet-stream' &&
	          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
	          // skip the remapping
	          continue
	        }
	      }

	      // set the extension -> mime
	      types[extension] = type;
	    }
	  });
	}
	});
	var mimeTypes_1 = mimeTypes.charset;
	var mimeTypes_2 = mimeTypes.charsets;
	var mimeTypes_3 = mimeTypes.contentType;
	var mimeTypes_4 = mimeTypes.extension;
	var mimeTypes_5 = mimeTypes.extensions;
	var mimeTypes_6 = mimeTypes.lookup;
	var mimeTypes_7 = mimeTypes.types;

	var defer_1$1 = defer$1;

	/**
	 * Runs provided function on next iteration of the event loop
	 *
	 * @param {function} fn - function to run
	 */
	function defer$1(fn)
	{
	  var nextTick = typeof setImmediate == 'function'
	    ? setImmediate
	    : (
	      typeof process == 'object' && typeof process.nextTick == 'function'
	      ? process.nextTick
	      : null
	    );

	  if (nextTick)
	  {
	    nextTick(fn);
	  }
	  else
	  {
	    setTimeout(fn, 0);
	  }
	}

	// API
	var async_1 = async;

	/**
	 * Runs provided callback asynchronously
	 * even if callback itself is not
	 *
	 * @param   {function} callback - callback to invoke
	 * @returns {function} - augmented callback
	 */
	function async(callback)
	{
	  var isAsync = false;

	  // check if async happened
	  defer_1$1(function() { isAsync = true; });

	  return function async_callback(err, result)
	  {
	    if (isAsync)
	    {
	      callback(err, result);
	    }
	    else
	    {
	      defer_1$1(function nextTick_callback()
	      {
	        callback(err, result);
	      });
	    }
	  };
	}

	// API
	var abort_1 = abort;

	/**
	 * Aborts leftover active jobs
	 *
	 * @param {object} state - current state object
	 */
	function abort(state)
	{
	  Object.keys(state.jobs).forEach(clean.bind(state));

	  // reset leftover jobs
	  state.jobs = {};
	}

	/**
	 * Cleans up leftover job by invoking abort function for the provided job id
	 *
	 * @this  state
	 * @param {string|number} key - job id to abort
	 */
	function clean(key)
	{
	  if (typeof this.jobs[key] == 'function')
	  {
	    this.jobs[key]();
	  }
	}

	// API
	var iterate_1 = iterate;

	/**
	 * Iterates over each job object
	 *
	 * @param {array|object} list - array or object (named list) to iterate over
	 * @param {function} iterator - iterator to run
	 * @param {object} state - current job status
	 * @param {function} callback - invoked when all elements processed
	 */
	function iterate(list, iterator, state, callback)
	{
	  // store current index
	  var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

	  state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
	  {
	    // don't repeat yourself
	    // skip secondary callbacks
	    if (!(key in state.jobs))
	    {
	      return;
	    }

	    // clean up jobs
	    delete state.jobs[key];

	    if (error)
	    {
	      // don't process rest of the results
	      // stop still active jobs
	      // and reset the list
	      abort_1(state);
	    }
	    else
	    {
	      state.results[key] = output;
	    }

	    // return salvaged results
	    callback(error, state.results);
	  });
	}

	/**
	 * Runs iterator over provided job element
	 *
	 * @param   {function} iterator - iterator to invoke
	 * @param   {string|number} key - key/index of the element in the list of jobs
	 * @param   {mixed} item - job description
	 * @param   {function} callback - invoked after iterator is done with the job
	 * @returns {function|mixed} - job abort function or something else
	 */
	function runJob(iterator, key, item, callback)
	{
	  var aborter;

	  // allow shortcut if iterator expects only two arguments
	  if (iterator.length == 2)
	  {
	    aborter = iterator(item, async_1(callback));
	  }
	  // otherwise go with full three arguments
	  else
	  {
	    aborter = iterator(item, key, async_1(callback));
	  }

	  return aborter;
	}

	// API
	var state_1 = state;

	/**
	 * Creates initial state object
	 * for iteration over list
	 *
	 * @param   {array|object} list - list to iterate over
	 * @param   {function|null} sortMethod - function to use for keys sort,
	 *                                     or `null` to keep them as is
	 * @returns {object} - initial state object
	 */
	function state(list, sortMethod)
	{
	  var isNamedList = !Array.isArray(list)
	    , initState =
	    {
	      index    : 0,
	      keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
	      jobs     : {},
	      results  : isNamedList ? {} : [],
	      size     : isNamedList ? Object.keys(list).length : list.length
	    }
	    ;

	  if (sortMethod)
	  {
	    // sort array keys based on it's values
	    // sort object's keys just on own merit
	    initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
	    {
	      return sortMethod(list[a], list[b]);
	    });
	  }

	  return initState;
	}

	// API
	var terminator_1 = terminator;

	/**
	 * Terminates jobs in the attached state context
	 *
	 * @this  AsyncKitState#
	 * @param {function} callback - final callback to invoke after termination
	 */
	function terminator(callback)
	{
	  if (!Object.keys(this.jobs).length)
	  {
	    return;
	  }

	  // fast forward iteration index
	  this.index = this.size;

	  // abort jobs
	  abort_1(this);

	  // send back results we have so far
	  async_1(callback)(null, this.results);
	}

	// Public API
	var parallel_1 = parallel;

	/**
	 * Runs iterator over provided array elements in parallel
	 *
	 * @param   {array|object} list - array or object (named list) to iterate over
	 * @param   {function} iterator - iterator to run
	 * @param   {function} callback - invoked when all elements processed
	 * @returns {function} - jobs terminator
	 */
	function parallel(list, iterator, callback)
	{
	  var state = state_1(list);

	  while (state.index < (state['keyedList'] || list).length)
	  {
	    iterate_1(list, iterator, state, function(error, result)
	    {
	      if (error)
	      {
	        callback(error, result);
	        return;
	      }

	      // looks like it's the last one
	      if (Object.keys(state.jobs).length === 0)
	      {
	        callback(null, state.results);
	        return;
	      }
	    });

	    state.index++;
	  }

	  return terminator_1.bind(state, callback);
	}

	// Public API
	var serialOrdered_1 = serialOrdered;
	// sorting helpers
	var ascending_1  = ascending;
	var descending_1 = descending;

	/**
	 * Runs iterator over provided sorted array elements in series
	 *
	 * @param   {array|object} list - array or object (named list) to iterate over
	 * @param   {function} iterator - iterator to run
	 * @param   {function} sortMethod - custom sort function
	 * @param   {function} callback - invoked when all elements processed
	 * @returns {function} - jobs terminator
	 */
	function serialOrdered(list, iterator, sortMethod, callback)
	{
	  var state = state_1(list, sortMethod);

	  iterate_1(list, iterator, state, function iteratorHandler(error, result)
	  {
	    if (error)
	    {
	      callback(error, result);
	      return;
	    }

	    state.index++;

	    // are we there yet?
	    if (state.index < (state['keyedList'] || list).length)
	    {
	      iterate_1(list, iterator, state, iteratorHandler);
	      return;
	    }

	    // done here
	    callback(null, state.results);
	  });

	  return terminator_1.bind(state, callback);
	}

	/*
	 * -- Sort methods
	 */

	/**
	 * sort helper to sort array elements in ascending order
	 *
	 * @param   {mixed} a - an item to compare
	 * @param   {mixed} b - an item to compare
	 * @returns {number} - comparison result
	 */
	function ascending(a, b)
	{
	  return a < b ? -1 : a > b ? 1 : 0;
	}

	/**
	 * sort helper to sort array elements in descending order
	 *
	 * @param   {mixed} a - an item to compare
	 * @param   {mixed} b - an item to compare
	 * @returns {number} - comparison result
	 */
	function descending(a, b)
	{
	  return -1 * ascending(a, b);
	}
	serialOrdered_1.ascending = ascending_1;
	serialOrdered_1.descending = descending_1;

	// Public API
	var serial_1 = serial;

	/**
	 * Runs iterator over provided array elements in series
	 *
	 * @param   {array|object} list - array or object (named list) to iterate over
	 * @param   {function} iterator - iterator to run
	 * @param   {function} callback - invoked when all elements processed
	 * @returns {function} - jobs terminator
	 */
	function serial(list, iterator, callback)
	{
	  return serialOrdered_1(list, iterator, null, callback);
	}

	var asynckit =
	{
	  parallel      : parallel_1,
	  serial        : serial_1,
	  serialOrdered : serialOrdered_1
	};

	// populates missing values
	var populate = function(dst, src) {

	  Object.keys(src).forEach(function(prop)
	  {
	    dst[prop] = dst[prop] || src[prop];
	  });

	  return dst;
	};

	var http$2 = ( http$1 && http ) || http$1;

	var require$$0$3 = ( url$1 && url ) || url$1;

	var fs = ( empty$1 && empty ) || empty$1;

	var parseUrl = require$$0$3.parse;





	// Public API
	var form_data = FormData$1;

	// make it a Stream
	util$2.inherits(FormData$1, combined_stream);

	/**
	 * Create readable "multipart/form-data" streams.
	 * Can be used to submit forms
	 * and file uploads to other web applications.
	 *
	 * @constructor
	 * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
	 */
	function FormData$1(options) {
	  if (!(this instanceof FormData$1)) {
	    return new FormData$1();
	  }

	  this._overheadLength = 0;
	  this._valueLength = 0;
	  this._valuesToMeasure = [];

	  combined_stream.call(this);

	  options = options || {};
	  for (var option in options) {
	    this[option] = options[option];
	  }
	}

	FormData$1.LINE_BREAK = '\r\n';
	FormData$1.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

	FormData$1.prototype.append = function(field, value, options) {

	  options = options || {};

	  // allow filename as single option
	  if (typeof options == 'string') {
	    options = {filename: options};
	  }

	  var append = combined_stream.prototype.append.bind(this);

	  // all that streamy business can't handle numbers
	  if (typeof value == 'number') {
	    value = '' + value;
	  }

	  // https://github.com/felixge/node-form-data/issues/38
	  if (util$2.isArray(value)) {
	    // Please convert your array into string
	    // the way web server expects it
	    this._error(new Error('Arrays are not supported.'));
	    return;
	  }

	  var header = this._multiPartHeader(field, value, options);
	  var footer = this._multiPartFooter();

	  append(header);
	  append(value);
	  append(footer);

	  // pass along options.knownLength
	  this._trackLength(header, value, options);
	};

	FormData$1.prototype._trackLength = function(header, value, options) {
	  var valueLength = 0;

	  // used w/ getLengthSync(), when length is known.
	  // e.g. for streaming directly from a remote server,
	  // w/ a known file a size, and not wanting to wait for
	  // incoming file to finish to get its size.
	  if (options.knownLength != null) {
	    valueLength += +options.knownLength;
	  } else if (Buffer.isBuffer(value)) {
	    valueLength = value.length;
	  } else if (typeof value === 'string') {
	    valueLength = Buffer.byteLength(value);
	  }

	  this._valueLength += valueLength;

	  // @check why add CRLF? does this account for custom/multiple CRLFs?
	  this._overheadLength +=
	    Buffer.byteLength(header) +
	    FormData$1.LINE_BREAK.length;

	  // empty or either doesn't have path or not an http response
	  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) )) {
	    return;
	  }

	  // no need to bother with the length
	  if (!options.knownLength) {
	    this._valuesToMeasure.push(value);
	  }
	};

	FormData$1.prototype._lengthRetriever = function(value, callback) {

	  if (value.hasOwnProperty('fd')) {

	    // take read range into a account
	    // `end` = Infinity –> read file till the end
	    //
	    // TODO: Looks like there is bug in Node fs.createReadStream
	    // it doesn't respect `end` options without `start` options
	    // Fix it when node fixes it.
	    // https://github.com/joyent/node/issues/7819
	    if (value.end != undefined && value.end != Infinity && value.start != undefined) {

	      // when end specified
	      // no need to calculate range
	      // inclusive, starts with 0
	      callback(null, value.end + 1 - (value.start ? value.start : 0));

	    // not that fast snoopy
	    } else {
	      // still need to fetch file size from fs
	      fs.stat(value.path, function(err, stat) {

	        var fileSize;

	        if (err) {
	          callback(err);
	          return;
	        }

	        // update final size based on the range options
	        fileSize = stat.size - (value.start ? value.start : 0);
	        callback(null, fileSize);
	      });
	    }

	  // or http response
	  } else if (value.hasOwnProperty('httpVersion')) {
	    callback(null, +value.headers['content-length']);

	  // or request stream http://github.com/mikeal/request
	  } else if (value.hasOwnProperty('httpModule')) {
	    // wait till response come back
	    value.on('response', function(response) {
	      value.pause();
	      callback(null, +response.headers['content-length']);
	    });
	    value.resume();

	  // something else
	  } else {
	    callback('Unknown stream');
	  }
	};

	FormData$1.prototype._multiPartHeader = function(field, value, options) {
	  // custom header specified (as string)?
	  // it becomes responsible for boundary
	  // (e.g. to handle extra CRLFs on .NET servers)
	  if (typeof options.header == 'string') {
	    return options.header;
	  }

	  var contentDisposition = this._getContentDisposition(value, options);
	  var contentType = this._getContentType(value, options);

	  var contents = '';
	  var headers  = {
	    // add custom disposition as third element or keep it two elements if not
	    'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
	    // if no content type. allow it to be empty array
	    'Content-Type': [].concat(contentType || [])
	  };

	  // allow custom headers.
	  if (typeof options.header == 'object') {
	    populate(headers, options.header);
	  }

	  var header;
	  for (var prop in headers) {
	    if (!headers.hasOwnProperty(prop)) continue;
	    header = headers[prop];

	    // skip nullish headers.
	    if (header == null) {
	      continue;
	    }

	    // convert all headers to arrays.
	    if (!Array.isArray(header)) {
	      header = [header];
	    }

	    // add non-empty headers.
	    if (header.length) {
	      contents += prop + ': ' + header.join('; ') + FormData$1.LINE_BREAK;
	    }
	  }

	  return '--' + this.getBoundary() + FormData$1.LINE_BREAK + contents + FormData$1.LINE_BREAK;
	};

	FormData$1.prototype._getContentDisposition = function(value, options) {

	  var filename
	    , contentDisposition
	    ;

	  if (typeof options.filepath === 'string') {
	    // custom filepath for relative paths
	    filename = require$$0$2.normalize(options.filepath).replace(/\\/g, '/');
	  } else if (options.filename || value.name || value.path) {
	    // custom filename take precedence
	    // formidable and the browser add a name property
	    // fs- and request- streams have path property
	    filename = require$$0$2.basename(options.filename || value.name || value.path);
	  } else if (value.readable && value.hasOwnProperty('httpVersion')) {
	    // or try http response
	    filename = require$$0$2.basename(value.client._httpMessage.path);
	  }

	  if (filename) {
	    contentDisposition = 'filename="' + filename + '"';
	  }

	  return contentDisposition;
	};

	FormData$1.prototype._getContentType = function(value, options) {

	  // use custom content-type above all
	  var contentType = options.contentType;

	  // or try `name` from formidable, browser
	  if (!contentType && value.name) {
	    contentType = mimeTypes.lookup(value.name);
	  }

	  // or try `path` from fs-, request- streams
	  if (!contentType && value.path) {
	    contentType = mimeTypes.lookup(value.path);
	  }

	  // or if it's http-reponse
	  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
	    contentType = value.headers['content-type'];
	  }

	  // or guess it from the filepath or filename
	  if (!contentType && (options.filepath || options.filename)) {
	    contentType = mimeTypes.lookup(options.filepath || options.filename);
	  }

	  // fallback to the default content type if `value` is not simple value
	  if (!contentType && typeof value == 'object') {
	    contentType = FormData$1.DEFAULT_CONTENT_TYPE;
	  }

	  return contentType;
	};

	FormData$1.prototype._multiPartFooter = function() {
	  return function(next) {
	    var footer = FormData$1.LINE_BREAK;

	    var lastPart = (this._streams.length === 0);
	    if (lastPart) {
	      footer += this._lastBoundary();
	    }

	    next(footer);
	  }.bind(this);
	};

	FormData$1.prototype._lastBoundary = function() {
	  return '--' + this.getBoundary() + '--' + FormData$1.LINE_BREAK;
	};

	FormData$1.prototype.getHeaders = function(userHeaders) {
	  var header;
	  var formHeaders = {
	    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
	  };

	  for (header in userHeaders) {
	    if (userHeaders.hasOwnProperty(header)) {
	      formHeaders[header.toLowerCase()] = userHeaders[header];
	    }
	  }

	  return formHeaders;
	};

	FormData$1.prototype.getBoundary = function() {
	  if (!this._boundary) {
	    this._generateBoundary();
	  }

	  return this._boundary;
	};

	FormData$1.prototype._generateBoundary = function() {
	  // This generates a 50 character boundary similar to those used by Firefox.
	  // They are optimized for boyer-moore parsing.
	  var boundary = '--------------------------';
	  for (var i = 0; i < 24; i++) {
	    boundary += Math.floor(Math.random() * 10).toString(16);
	  }

	  this._boundary = boundary;
	};

	// Note: getLengthSync DOESN'T calculate streams length
	// As workaround one can calculate file size manually
	// and add it as knownLength option
	FormData$1.prototype.getLengthSync = function() {
	  var knownLength = this._overheadLength + this._valueLength;

	  // Don't get confused, there are 3 "internal" streams for each keyval pair
	  // so it basically checks if there is any value added to the form
	  if (this._streams.length) {
	    knownLength += this._lastBoundary().length;
	  }

	  // https://github.com/form-data/form-data/issues/40
	  if (!this.hasKnownLength()) {
	    // Some async length retrievers are present
	    // therefore synchronous length calculation is false.
	    // Please use getLength(callback) to get proper length
	    this._error(new Error('Cannot calculate proper length in synchronous way.'));
	  }

	  return knownLength;
	};

	// Public API to check if length of added values is known
	// https://github.com/form-data/form-data/issues/196
	// https://github.com/form-data/form-data/issues/262
	FormData$1.prototype.hasKnownLength = function() {
	  var hasKnownLength = true;

	  if (this._valuesToMeasure.length) {
	    hasKnownLength = false;
	  }

	  return hasKnownLength;
	};

	FormData$1.prototype.getLength = function(cb) {
	  var knownLength = this._overheadLength + this._valueLength;

	  if (this._streams.length) {
	    knownLength += this._lastBoundary().length;
	  }

	  if (!this._valuesToMeasure.length) {
	    process.nextTick(cb.bind(this, null, knownLength));
	    return;
	  }

	  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
	    if (err) {
	      cb(err);
	      return;
	    }

	    values.forEach(function(length) {
	      knownLength += length;
	    });

	    cb(null, knownLength);
	  });
	};

	FormData$1.prototype.submit = function(params, cb) {
	  var request
	    , options
	    , defaults = {method: 'post'}
	    ;

	  // parse provided url if it's string
	  // or treat it as options object
	  if (typeof params == 'string') {

	    params = parseUrl(params);
	    options = populate({
	      port: params.port,
	      path: params.pathname,
	      host: params.hostname,
	      protocol: params.protocol
	    }, defaults);

	  // use custom params
	  } else {

	    options = populate(params, defaults);
	    // if no port provided use default one
	    if (!options.port) {
	      options.port = options.protocol == 'https:' ? 443 : 80;
	    }
	  }

	  // put that good code in getHeaders to some use
	  options.headers = this.getHeaders(params.headers);

	  // https if specified, fallback to http in any other case
	  if (options.protocol == 'https:') {
	    request = http$2.request(options);
	  } else {
	    request = http$2.request(options);
	  }

	  // get content length and fire away
	  this.getLength(function(err, length) {
	    if (err) {
	      this._error(err);
	      return;
	    }

	    // add content length
	    request.setHeader('Content-Length', length);

	    this.pipe(request);
	    if (cb) {
	      request.on('error', cb);
	      request.on('response', cb.bind(this, null));
	    }
	  }.bind(this));

	  return request;
	};

	FormData$1.prototype._error = function(err) {
	  if (!this.error) {
	    this.error = err;
	    this.pause();
	    this.emit('error', err);
	  }
	};

	FormData$1.prototype.toString = function () {
	  return '[object FormData]';
	};

	var ethicalJobsSdk = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
		module.exports = factory();
	}(commonjsGlobal, (function () {
	/**
	 * The code was extracted from:
	 * https://github.com/davidchambers/Base64.js
	 */

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function InvalidCharacterError(message) {
	  this.message = message;
	}

	InvalidCharacterError.prototype = new Error();
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	function polyfill(input) {
	  var str = String(input).replace(/=+$/, '');
	  if (str.length % 4 == 1) {
	    throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
	  }
	  for (
	  // initialize result and counters
	  var bc = 0, bs, buffer, idx = 0, output = '';
	  // get next character
	  buffer = str.charAt(idx++);
	  // character found in table? initialize bit storage and add its ascii value;
	  ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
	  // and if not first of each 4 characters,
	  // convert the first 8 bits to one ascii character
	  bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
	    // try to find character in table (0-63, not found => -1)
	    buffer = chars.indexOf(buffer);
	  }
	  return output;
	}

	var atob = typeof window !== 'undefined' && window.atob && window.atob.bind(window) || polyfill;

	function b64DecodeUnicode(str) {
	  return decodeURIComponent(atob(str).replace(/(.)/g, function (m, p) {
	    var code = p.charCodeAt(0).toString(16).toUpperCase();
	    if (code.length < 2) {
	      code = '0' + code;
	    }
	    return '%' + code;
	  }));
	}

	var base64_url_decode = function base64_url_decode(str) {
	  var output = str.replace(/-/g, "+").replace(/_/g, "/");
	  switch (output.length % 4) {
	    case 0:
	      break;
	    case 2:
	      output += "==";
	      break;
	    case 3:
	      output += "=";
	      break;
	    default:
	      throw "Illegal base64url string!";
	  }

	  try {
	    return b64DecodeUnicode(output);
	  } catch (err) {
	    return atob(output);
	  }
	};

	function InvalidTokenError(message) {
	  this.message = message;
	}

	InvalidTokenError.prototype = new Error();
	InvalidTokenError.prototype.name = 'InvalidTokenError';

	var index$1 = function index(token, options) {
	  if (typeof token !== 'string') {
	    throw new InvalidTokenError('Invalid token specified');
	  }

	  options = options || {};
	  var pos = options.header === true ? 0 : 1;
	  try {
	    return JSON.parse(base64_url_decode(token.split('.')[pos]));
	  } catch (e) {
	    throw new InvalidTokenError('Invalid token specified: ' + e.message);
	  }
	};

	var InvalidTokenError_1 = InvalidTokenError;

	index$1.InvalidTokenError = InvalidTokenError_1;

	function unwrapExports$$1 (x) {
		return x && x.__esModule ? x['default'] : x;
	}

	function createCommonjsModule$$1(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};











	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	var createClass = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();









	var inherits = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	};











	var possibleConstructorReturn = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && (typeof call === "object" || typeof call === "function") ? call : self;
	};

	var index$2 = createCommonjsModule$$1(function (module, exports) {

	  Object.defineProperty(exports, "__esModule", {
	    value: true
	  });

	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _possibleConstructorReturn(self, call) {
	    if (!self) {
	      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	    }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	  }

	  function _inherits(subClass, superClass) {
	    if (typeof superClass !== "function" && superClass !== null) {
	      throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
	    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	  }

	  function _extendableBuiltin(cls) {
	    function ExtendableBuiltin() {
	      cls.apply(this, arguments);
	    }

	    ExtendableBuiltin.prototype = Object.create(cls.prototype, {
	      constructor: {
	        value: cls,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });

	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(ExtendableBuiltin, cls);
	    } else {
	      ExtendableBuiltin.__proto__ = cls;
	    }

	    return ExtendableBuiltin;
	  }

	  var ExtendableError = function (_extendableBuiltin2) {
	    _inherits(ExtendableError, _extendableBuiltin2);

	    function ExtendableError() {
	      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	      _classCallCheck(this, ExtendableError);

	      // extending Error is weird and does not propagate `message`
	      var _this = _possibleConstructorReturn(this, (ExtendableError.__proto__ || Object.getPrototypeOf(ExtendableError)).call(this, message));

	      Object.defineProperty(_this, 'message', {
	        configurable: true,
	        enumerable: false,
	        value: message,
	        writable: true
	      });

	      Object.defineProperty(_this, 'name', {
	        configurable: true,
	        enumerable: false,
	        value: _this.constructor.name,
	        writable: true
	      });

	      if (Error.hasOwnProperty('captureStackTrace')) {
	        Error.captureStackTrace(_this, _this.constructor);
	        return _possibleConstructorReturn(_this);
	      }

	      Object.defineProperty(_this, 'stack', {
	        configurable: true,
	        enumerable: false,
	        value: new Error(message).stack,
	        writable: true
	      });
	      return _this;
	    }

	    return ExtendableError;
	  }(_extendableBuiltin(Error));

	  exports.default = ExtendableError;
	  module.exports = exports['default'];
	});

	var ExtendableError = unwrapExports$$1(index$2);

	var ApiError = function (_ExtendableError) {
	  inherits(ApiError, _ExtendableError);

	  function ApiError(message, errors, statusCode) {
	    var debug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	    classCallCheck(this, ApiError);

	    var _this = possibleConstructorReturn(this, (ApiError.__proto__ || Object.getPrototypeOf(ApiError)).call(this, message));

	    _this.errors = errors;
	    _this.statusCode = statusCode;
	    _this.debug = debug;
	    return _this;
	  }

	  return ApiError;
	}(ExtendableError);

	/**
	 * Checks if structure is 'like' an ImmutableJS object
	 * @param  {mixed}  maybeImmutable
	 */
	function isImmutable(maybeImmutable) {
	  if (maybeImmutable) {
	    return typeof maybeImmutable.toJS === 'function';
	  }
	  return false;
	}

	/**
	 * Jsonifies immutable structures
	 * @param  {mixed} maybeImmutable
	 */
	function fromImmutable(maybeImmutable) {
	  return isImmutable(maybeImmutable) ? maybeImmutable.toJS() : maybeImmutable;
	}

	var index$5 = function index(str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/

	/* eslint-disable no-unused-vars */

	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var index$7 = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	function encoderForArrayFormat(opts) {
		switch (opts.arrayFormat) {
			case 'index':
				return function (key, value, index) {
					return value === null ? [encode(key, opts), '[', index, ']'].join('') : [encode(key, opts), '[', encode(index, opts), ']=', encode(value, opts)].join('');
				};

			case 'bracket':
				return function (key, value) {
					return value === null ? encode(key, opts) : [encode(key, opts), '[]=', encode(value, opts)].join('');
				};

			default:
				return function (key, value) {
					return value === null ? encode(key, opts) : [encode(key, opts), '=', encode(value, opts)].join('');
				};
		}
	}

	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? index$5(value) : encodeURIComponent(value);
		}

		return value;
	}

	var stringify$1 = function stringify(obj, opts) {
		var defaults$$1 = {
			encode: true,
			strict: true,
			arrayFormat: 'none'
		};

		opts = index$7(defaults$$1, opts);

		var formatter = encoderForArrayFormat(opts);

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return encode(key, opts);
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					result.push(formatter(key, val2, result.length));
				});

				return result.join('&');
			}

			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};

	function stringify$$1(params) {
	  Object.keys(params).map(function (key) {
	    if (params[key] === false) {
	      params[key] = 0;
	    } else if (params[key] === true) {
	      params[key] = 1;
	    }
	  });
	  return stringify$1(params, { arrayFormat: 'bracket' });
	}

	/**
	 * Detects if DOM is present
	 * @return {bool}
	 */
	function canUseDom() {
	  return typeof window !== 'undefined';
	}

	/**
	 * Gets best fit env var or returns fallback
	 * @param {String} key
	 * @param {mixed} defaultValue
	 * @return {mixed}
	 */
	function getEnvironmentVariable(key) {
	  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	  if (canUseDom()) {
	    return window[key] || defaultValue;
	  }
	  return process.env[key] || process.env['REACT_APP_' + key] || defaultValue;
	}

	if (!canUseDom()) {
	  commonjsGlobal.FormData = form_data;
	}

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function _toInteger(it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function _defined(it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function _stringAt(TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that)),
	        i = _toInteger(pos),
	        l = s.length,
	        a,
	        b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var _global = createCommonjsModule$$1(function (module) {
	  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	  if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule$$1(function (module) {
	  var core = module.exports = { version: '2.4.0' };
	  if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});

	var _isObject = function _isObject(it) {
	  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function _anObject(it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function _fails(exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

	var document$1 = _global.document;
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function _domCreate(it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function get() {
	      return 7;
	    } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function _toPrimitive(it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) {/* empty */}
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
	  f: f
	};

	var _propertyDesc = function _propertyDesc(bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has = function _has(it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function _uid(key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule$$1(function (module) {
	  var SRC = _uid('src'),
	      TO_STRING = 'toString',
	      $toString = Function[TO_STRING],
	      TPL = ('' + $toString).split(TO_STRING);

	  _core.inspectSource = function (it) {
	    return $toString.call(it);
	  };

	  (module.exports = function (O, key, val, safe) {
	    var isFunction = typeof val == 'function';
	    if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	    if (O[key] === val) return;
	    if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	    if (O === _global) {
	      O[key] = val;
	    } else {
	      if (!safe) {
	        delete O[key];
	        _hide(O, key, val);
	      } else {
	        if (O[key]) O[key] = val;else _hide(O, key, val);
	      }
	    }
	    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	  })(Function.prototype, TO_STRING, function toString() {
	    return typeof this == 'function' && this[SRC] || $toString.call(this);
	  });
	});

	var _aFunction = function _aFunction(it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function _ctx(fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1:
	      return function (a) {
	        return fn.call(that, a);
	      };
	    case 2:
	      return function (a, b) {
	        return fn.call(that, a, b);
	      };
	    case 3:
	      return function (a, b, c) {
	        return fn.call(that, a, b, c);
	      };
	  }
	  return function () /* ...args */{
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function $export(type, name, source) {
	  var IS_FORCED = type & $export.F,
	      IS_GLOBAL = type & $export.G,
	      IS_STATIC = type & $export.S,
	      IS_PROTO = type & $export.P,
	      IS_BIND = type & $export.B,
	      target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE],
	      exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {}),
	      expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {}),
	      key,
	      own,
	      out,
	      exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1; // forced
	$export.G = 2; // global
	$export.S = 4; // static
	$export.P = 8; // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	$export.U = 64; // safe
	$export.R = 128; // real proto method for `library` 
	var _export = $export;

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function _cof(it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings

	var _toIobject = function _toIobject(it) {
	  return _iobject(_defined(it));
	};

	// 7.1.15 ToLength
	var min = Math.min;
	var _toLength = function _toLength(it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toIndex = function _toIndex(index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes

	var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this),
	        length = _toLength(O.length),
	        index = _toIndex(fromIndex, length),
	        value;
	    // Array#includes uses SameValueZero equality algorithm
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      if (value != value) return true;
	      // Array#toIndex ignores holes, Array#includes - not
	    } else for (; length > index; index++) {
	      if (IS_INCLUDES || index in O) {
	        if (O[index] === el) return IS_INCLUDES || index || 0;
	      }
	    }return !IS_INCLUDES && -1;
	  };
	};

	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});
	var _shared = function _shared(key) {
	  return store[key] || (store[key] = {});
	};

	var shared = _shared('keys');
	var _sharedKey = function _sharedKey(key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO$1 = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function _objectKeysInternal(object, names) {
	  var O = _toIobject(object),
	      i = 0,
	      result = [],
	      key;
	  for (key in O) {
	    if (key != IE_PROTO$1) _has(O, key) && result.push(key);
	  } // Don't enum bug & hidden keys
	  while (names.length > i) {
	    if (_has(O, key = names[i++])) {
	      ~arrayIndexOf(result, key) || result.push(key);
	    }
	  }return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)


	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties),
	      length = keys.length,
	      i = 0,
	      P;
	  while (length > i) {
	    _objectDp.f(O, P = keys[i++], Properties[P]);
	  }return O;
	};

	var _html = _global.document && document.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var IE_PROTO = _sharedKey('IE_PROTO');
	var Empty = function Empty() {/* empty */};
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var _createDict = function createDict() {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe'),
	      i = _enumBugKeys.length,
	      lt = '<',
	      gt = '>',
	      iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  _createDict = iframeDocument.F;
	  while (i--) {
	    delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  }return _createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = _createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var _wks = createCommonjsModule$$1(function (module) {
	  var store = _shared('wks'),
	      _Symbol = _global.Symbol,
	      USE_SYMBOL = typeof _Symbol == 'function';

	  var $exports = module.exports = function (name) {
	    return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : _uid)('Symbol.' + name));
	  };

	  $exports.store = store;
	});

	var def = _objectDp.f;
	var TAG = _wks('toStringTag');

	var _setToStringTag = function _setToStringTag(it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () {
	  return this;
	});

	var _iterCreate = function _iterCreate(Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function _toObject(it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  }return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys());
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function returnThis() {
	  return this;
	};

	var _iterDefine = function _iterDefine(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function getMethod(kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS:
	        return function keys() {
	          return new Constructor(this, kind);
	        };
	      case VALUES:
	        return function values() {
	          return new Constructor(this, kind);
	        };
	    }return function entries() {
	      return new Constructor(this, kind);
	    };
	  };
	  var TAG = NAME + ' Iterator',
	      DEF_VALUES = DEFAULT == VALUES,
	      VALUES_BUG = false,
	      proto = Base.prototype,
	      $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
	      $default = $native || getMethod(DEFAULT),
	      $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined,
	      $anyNative = NAME == 'Array' ? proto.entries || $native : $native,
	      methods,
	      key,
	      IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_has(IteratorPrototype, ITERATOR)) _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() {
	      return $native.call(this);
	    };
	  }
	  // Define iterator
	  if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0; // next index
	  // 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t,
	      index = this._i,
	      point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// call something on iterator step with safe closing on error

	var _iterCall = function _iterCall(iterator, fn, value, entries) {
	  try {
	    return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
	    // 7.4.6 IteratorClose(iterator, completion)
	  } catch (e) {
	    var ret = iterator['return'];
	    if (ret !== undefined) _anObject(ret.call(iterator));
	    throw e;
	  }
	};

	// check on default Array iterator
	var ITERATOR$1 = _wks('iterator');
	var ArrayProto = Array.prototype;

	var _isArrayIter = function _isArrayIter(it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto[ITERATOR$1] === it);
	};

	var _createProperty = function _createProperty(object, index, value) {
	  if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));else object[index] = value;
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var TAG$1 = _wks('toStringTag'
	// ES3 wrong here
	);
	var ARG = _cof(function () {
	  return arguments;
	}()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function tryGet(it, key) {
	  try {
	    return it[key];
	  } catch (e) {/* empty */}
	};

	var _classof = function _classof(it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	  // @@toStringTag case
	  : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	  // builtinTag case
	  : ARG ? _cof(O
	  // ES3 arguments fallback
	  ) : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$2 = _wks('iterator');
	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$2] || it['@@iterator'] || _iterators[_classof(it)];
	};

	var ITERATOR$3 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$3]();
	  riter['return'] = function () {
	    SAFE_CLOSING = true;
	  };
	} catch (e) {/* empty */}

	var _iterDetect = function _iterDetect(exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7],
	        iter = arr[ITERATOR$3]();
	    iter.next = function () {
	      return { done: safe = true };
	    };
	    arr[ITERATOR$3] = function () {
	      return iter;
	    };
	    exec(arr);
	  } catch (e) {/* empty */}
	  return safe;
	};

	_export(_export.S + _export.F * !_iterDetect(function (iter) {
	}), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike /*, mapfn = undefined, thisArg = undefined*/) {
	    var O = _toObject(arrayLike),
	        C = typeof this == 'function' ? this : Array,
	        aLen = arguments.length,
	        mapfn = aLen > 1 ? arguments[1] : undefined,
	        mapping = mapfn !== undefined,
	        index = 0,
	        iterFn = core_getIteratorMethod(O),
	        length,
	        result,
	        step,
	        iterator;
	    if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
	      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
	        _createProperty(result, index, mapping ? _iterCall(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = _toLength(O.length);
	      for (result = new C(length); length > index; index++) {
	        _createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});

	if (!canUseDom()) {
	  var valuesMap = new Map();

	  var LocalStorage = function () {
	    function LocalStorage() {
	      classCallCheck(this, LocalStorage);
	    }

	    createClass(LocalStorage, [{
	      key: 'getItem',
	      value: function getItem(key) {
	        var stringKey = String(key);
	        if (valuesMap.has(key)) {
	          return String(valuesMap.get(stringKey));
	        }
	        return null;
	      }
	    }, {
	      key: 'setItem',
	      value: function setItem(key, val) {
	        valuesMap.set(String(key), String(val));
	      }
	    }, {
	      key: 'removeItem',
	      value: function removeItem(key) {
	        valuesMap.delete(key);
	      }
	    }, {
	      key: 'clear',
	      value: function clear() {
	        valuesMap.clear();
	      }
	    }, {
	      key: 'key',
	      value: function key(i) {
	        if (arguments.length === 0) {
	          throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."); // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
	        }
	        var arr = Array.from(valuesMap.keys());
	        return arr[i];
	      }
	    }, {
	      key: 'length',
	      get: function get$$1() {
	        return valuesMap.size;
	      }
	    }]);
	    return LocalStorage;
	  }();

	  var instance = new LocalStorage();

	  commonjsGlobal.localStorage = new Proxy(instance, {
	    set: function set$$1(obj, prop, value) {
	      if (LocalStorage.prototype.hasOwnProperty(prop)) {
	        instance[prop] = value;
	      } else {
	        instance.setItem(prop, value);
	      }
	      return true;
	    },
	    get: function get$$1(target, name) {
	      if (LocalStorage.prototype.hasOwnProperty(name)) {
	        return instance[name];
	      }
	      if (valuesMap.has(name)) {
	        return instance.getItem(name);
	      }
	    }
	  });
	}

	var index = new function () {
	  var _this = this;

	  ['auth', 'jobs', 'media'].forEach(function (helperNamespace) {
	    _this[helperNamespace] = {};
	  });

	  /**
	   * Determines current env
	   * @return String
	   */
	  this.getEnvironment = function () {
	    return getEnvironmentVariable('EJ_ENV', 'production');
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.parseParams = function (params) {
	    if (params instanceof FormData) {
	      return params;
	    }
	    return JSON.stringify(fromImmutable(params));
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.getHeaders = function (params, headers) {
	    var authHeader = {
	      'Authorization': _this.getAuthToken()
	    };
	    var jsonHeaders = {
	      'Content-Type': 'application/json',
	      'Accept': 'application/json'
	    };
	    return params instanceof FormData ? Object.assign({}, authHeader, headers) : Object.assign({}, jsonHeaders, authHeader, headers);
	  };

	  /**
	   * Helper to return the body of the request
	   * - If it is a GET or HEAD request, then set the body to undefined to support IE Edge.
	   * 
	   * @return XXX
	   */
	  this.getParamsBody = function (verb, params) {
	    var noBody = verb.toUpperCase() === 'GET' || verb.toUpperCase() === 'HEAD';
	    return noBody ? undefined : _this.parseParams(params);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return {string}
	   */
	  this.getAuthToken = function () {
	    return localStorage.getItem('_token') ? 'Bearer ' + localStorage.getItem('_token') : '';
	  };

	  /**
	  * Javascript style DocBlock
	  * @return XXX
	  */
	  this.getParams = function () {
	    var verb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
	    var params = arguments[1];
	    var headers = arguments[2];

	    var parsed = {
	      method: verb.toUpperCase(),
	      timeout: 15000,
	      body: _this.getParamsBody(verb, params),
	      headers: _this.getHeaders(params, headers)
	    };
	    // Isomorphic SSL support
	    // TODO: verify actual certs
	    if (!canUseDom()) {
	      var https = http$2;
	      parsed.agent = new https.Agent({
	        rejectUnauthorized: false
	      });
	    }
	    return parsed;
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.getDomain = function () {
	    var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	    switch (environment.toLowerCase()) {
	      default:
	      case 'production':
	        return 'https://api.ethicaljobs.com.au';
	      case 'staging':
	        return 'https://api.ethicalstaging.com.au';
	      case 'development':
	        return 'https://api.ethicaljobs.local';
	    }
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.getRoute = function () {
	    var route = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    var verb = arguments[1];
	    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (verb.toUpperCase() === 'GET') {
	      var parsedParams = fromImmutable(params);
	      var queryString = stringify$$1(parsedParams);
	      return route + (queryString.length ? '?' + queryString : '');
	    } else {
	      return route;
	    }
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.parseJson = function (response) {
	    return response.text().then(function (text) {
	      var json = text ? JSON.parse(text) : {};
	      return {
	        status: response.status,
	        ok: response.ok,
	        json: json
	      };
	    });
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.checkStatus = function (response) {
	    if (response.ok) {
	      return response.json;
	    } else {
	      throw new ApiError(response.json.message, response.json.errors, response.status, response.json.debug);
	    }
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.setTokenFromResponse = function (response) {
	    if (response.hasOwnProperty('access_token')) {
	      localStorage.setItem('_token', response.access_token);
	    } else if (response && response.meta && response.meta.access_token) {
	      localStorage.setItem('_token', response.meta.access_token);
	    }
	    return response;
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.dispatchRequest = function (verb, route, params, headers) {
	    var reqUrl = _this.getDomain(_this.environment) + _this.getRoute(route, verb, params);
	    var reqParams = _this.getParams(verb, params, headers);

	    return fetch(reqUrl, reqParams).then(_this.parseJson).then(_this.checkStatus).then(_this.setTokenFromResponse);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.link = function (route, params) {
	    var stringifiedParams = '';
	    if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object' && Object.keys(params).length) {
	      stringifiedParams = '?' + stringify$$1(params);
	    }
	    return '' + _this.getDomain(_this.environment) + route + stringifiedParams;
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.initialize = function () {
	    return _this.get('/', {});
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.exportUrl = function (resource, params) {
	    return _this.link('/exports/csv/' + resource, params);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.search = function (resource, params) {
	    return _this.get('/search/' + resource, params);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.archive = function (resource, id) {
	    return _this.delete('/' + resource + '/' + id);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.restore = function (resource, id) {
	    return _this.patch('/' + resource + '/' + id, { deleted_at: null });
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.auth.login = function (values) {
	    var _fromImmutable = fromImmutable(values),
	        username = _fromImmutable.username,
	        password = _fromImmutable.password;

	    return _this.post('/oauth/token', {
	      client_id: getEnvironmentVariable('AUTH_CLIENT_ID'),
	      client_secret: getEnvironmentVariable('AUTH_CLIENT_SECRET'),
	      grant_type: 'password',
	      scope: '*',
	      username: username,
	      password: password
	    }).then(_this.setTokenFromResponse).then(_this.auth.load);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.auth.logout = function () {
	    return new Promise(function (resolve) {
	      localStorage.removeItem('_token');
	      resolve(true);
	    });
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.auth.load = function () {
	    var token = localStorage.getItem('_token');
	    try {
	      return _this.get('/users/' + index$1(token).sub);
	    } catch (error) {
	      return _this.get('/users/-1');
	    }
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.auth.recoverPassword = function (email) {
	    return _this.post('/users/passwords/recover', { email: email });
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.auth.resetPassword = function (params) {
	    return _this.post('/users/passwords/reset', params);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.jobs.approve = function (id) {
	    return _this.patch('/jobs/' + id, { status: 'APPROVED' });
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.jobs.expire = function (id) {
	    return _this.patch('/jobs/' + id, { expires_at: new Date().getTime() });
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.media.upload = function (file) {
	    var formData = new FormData();
	    formData.append('media', file);
	    return _this.post('/media', formData);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.media.attach = function (file, resource, resourceId) {
	    var formData = new FormData();
	    formData.append('media', file);
	    return _this.post('/media/' + resource + '/' + resourceId, formData);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.media.detach = function (id, resource) {
	    return _this.delete('/media/' + id + '/' + resource);
	  };

	  /**
	   * Javascript style DocBlock
	   * @return XXX
	   */
	  this.media.delete = function (id) {
	    return _this.delete('/media/' + id);
	  };

	  this.environment = this.getEnvironment();

	  ['post', 'get', 'put', 'patch', 'delete'].forEach(function (verb) {
	    _this[verb] = function (route, params, headers) {
	      return _this.dispatchRequest(verb, route, params, headers);
	    };
	  });
	}();

	return index;

	})));

	});

	var Api = unwrapExports(ethicalJobsSdk);

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var FETCH_APP_DATA = ethicalJobsRedux.createActionType('APP/FETCH_DATA');
	var UPLOAD_MEDIA = ethicalJobsRedux.createActionType('APP/UPLOAD_MEDIA');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchAppData = function fetchAppData() {
	  return {
	    type: FETCH_APP_DATA,
	    payload: Api.get('/')
	  };
	};

	var uploadMedia = function uploadMedia(file) {
	  return {
	    type: UPLOAD_MEDIA,
	    payload: Api.media.upload(file)
	  };
	};

	var actions = /*#__PURE__*/Object.freeze({
		FETCH_APP_DATA: FETCH_APP_DATA,
		UPLOAD_MEDIA: UPLOAD_MEDIA,
		fetchAppData: fetchAppData,
		uploadMedia: uploadMedia
	});

	var App = {
	  actions: actions
	};

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	// Used for setting prototype methods that IE8 chokes on.
	var DELETE = 'delete';

	// Constants describing the size of trie nodes.
	var SHIFT = 5; // Resulted in best performance after ______?
	var SIZE = 1 << SHIFT;
	var MASK = SIZE - 1;

	// A consistent shared value representing "not set" which equals nothing other
	// than itself, and nothing that could be provided externally.
	var NOT_SET = {};

	// Boolean references, Rough equivalent of `bool &`.
	var CHANGE_LENGTH = { value: false };
	var DID_ALTER = { value: false };

	function MakeRef(ref) {
	  ref.value = false;
	  return ref;
	}

	function SetRef(ref) {
	  ref && (ref.value = true);
	}

	// A function which returns a value representing an "owner" for transient writes
	// to tries. The return value will only ever equal itself, and will not equal
	// the return of any subsequent call of this function.
	function OwnerID() {}

	function ensureSize(iter) {
	  if (iter.size === undefined) {
	    iter.size = iter.__iterate(returnTrue);
	  }
	  return iter.size;
	}

	function wrapIndex(iter, index) {
	  // This implements "is array index" which the ECMAString spec defines as:
	  //
	  //     A String property name P is an array index if and only if
	  //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	  //     to 2^32−1.
	  //
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	  if (typeof index !== 'number') {
	    var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	    if ('' + uint32Index !== index || uint32Index === 4294967295) {
	      return NaN;
	    }
	    index = uint32Index;
	  }
	  return index < 0 ? ensureSize(iter) + index : index;
	}

	function returnTrue() {
	  return true;
	}

	function wholeSlice(begin, end, size) {
	  return (
	    ((begin === 0 && !isNeg(begin)) ||
	      (size !== undefined && begin <= -size)) &&
	    (end === undefined || (size !== undefined && end >= size))
	  );
	}

	function resolveBegin(begin, size) {
	  return resolveIndex(begin, size, 0);
	}

	function resolveEnd(end, size) {
	  return resolveIndex(end, size, size);
	}

	function resolveIndex(index, size, defaultIndex) {
	  // Sanitize indices using this shorthand for ToInt32(argument)
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	  return index === undefined
	    ? defaultIndex
	    : isNeg(index)
	      ? size === Infinity ? size : Math.max(0, size + index) | 0
	      : size === undefined || size === index
	        ? index
	        : Math.min(size, index) | 0;
	}

	function isNeg(value) {
	  // Account for -0 which is negative, but not less than 0.
	  return value < 0 || (value === 0 && 1 / value === -Infinity);
	}

	function isImmutable(maybeImmutable) {
	  return isCollection(maybeImmutable) || isRecord(maybeImmutable);
	}

	function isCollection(maybeCollection) {
	  return !!(maybeCollection && maybeCollection[IS_ITERABLE_SENTINEL]);
	}

	function isKeyed(maybeKeyed) {
	  return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	}

	function isIndexed(maybeIndexed) {
	  return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	}

	function isAssociative(maybeAssociative) {
	  return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	}

	function isOrdered(maybeOrdered) {
	  return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	}

	function isRecord(maybeRecord) {
	  return !!(maybeRecord && maybeRecord[IS_RECORD_SENTINEL]);
	}

	function isValueObject(maybeValue) {
	  return !!(
	    maybeValue &&
	    typeof maybeValue.equals === 'function' &&
	    typeof maybeValue.hashCode === 'function'
	  );
	}

	var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
	var IS_RECORD_SENTINEL = '@@__IMMUTABLE_RECORD__@@';

	var Collection = function Collection(value) {
	  return isCollection(value) ? value : Seq(value);
	};

	var KeyedCollection = (function (Collection) {
	  function KeyedCollection(value) {
	    return isKeyed(value) ? value : KeyedSeq(value);
	  }

	  if ( Collection ) KeyedCollection.__proto__ = Collection;
	  KeyedCollection.prototype = Object.create( Collection && Collection.prototype );
	  KeyedCollection.prototype.constructor = KeyedCollection;

	  return KeyedCollection;
	}(Collection));

	var IndexedCollection = (function (Collection) {
	  function IndexedCollection(value) {
	    return isIndexed(value) ? value : IndexedSeq(value);
	  }

	  if ( Collection ) IndexedCollection.__proto__ = Collection;
	  IndexedCollection.prototype = Object.create( Collection && Collection.prototype );
	  IndexedCollection.prototype.constructor = IndexedCollection;

	  return IndexedCollection;
	}(Collection));

	var SetCollection = (function (Collection) {
	  function SetCollection(value) {
	    return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
	  }

	  if ( Collection ) SetCollection.__proto__ = Collection;
	  SetCollection.prototype = Object.create( Collection && Collection.prototype );
	  SetCollection.prototype.constructor = SetCollection;

	  return SetCollection;
	}(Collection));

	Collection.Keyed = KeyedCollection;
	Collection.Indexed = IndexedCollection;
	Collection.Set = SetCollection;

	var ITERATE_KEYS = 0;
	var ITERATE_VALUES = 1;
	var ITERATE_ENTRIES = 2;

	var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	var FAUX_ITERATOR_SYMBOL = '@@iterator';

	var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

	var Iterator = function Iterator(next) {
	  this.next = next;
	};

	Iterator.prototype.toString = function toString () {
	  return '[Iterator]';
	};

	Iterator.KEYS = ITERATE_KEYS;
	Iterator.VALUES = ITERATE_VALUES;
	Iterator.ENTRIES = ITERATE_ENTRIES;

	Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
	  return this.toString();
	};
	Iterator.prototype[ITERATOR_SYMBOL] = function() {
	  return this;
	};

	function iteratorValue(type, k, v, iteratorResult) {
	  var value = type === 0 ? k : type === 1 ? v : [k, v];
	  iteratorResult
	    ? (iteratorResult.value = value)
	    : (iteratorResult = {
	        value: value,
	        done: false
	      });
	  return iteratorResult;
	}

	function iteratorDone() {
	  return { value: undefined, done: true };
	}

	function hasIterator(maybeIterable) {
	  return !!getIteratorFn(maybeIterable);
	}

	function isIterator(maybeIterator) {
	  return maybeIterator && typeof maybeIterator.next === 'function';
	}

	function getIterator(iterable) {
	  var iteratorFn = getIteratorFn(iterable);
	  return iteratorFn && iteratorFn.call(iterable);
	}

	function getIteratorFn(iterable) {
	  var iteratorFn =
	    iterable &&
	    ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
	      iterable[FAUX_ITERATOR_SYMBOL]);
	  if (typeof iteratorFn === 'function') {
	    return iteratorFn;
	  }
	}

	var hasOwnProperty$2 = Object.prototype.hasOwnProperty;

	function isArrayLike(value) {
	  return value && typeof value.length === 'number';
	}

	var Seq = (function (Collection$$1) {
	  function Seq(value) {
	    return value === null || value === undefined
	      ? emptySequence()
	      : isImmutable(value) ? value.toSeq() : seqFromValue(value);
	  }

	  if ( Collection$$1 ) Seq.__proto__ = Collection$$1;
	  Seq.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
	  Seq.prototype.constructor = Seq;

	  Seq.prototype.toSeq = function toSeq () {
	    return this;
	  };

	  Seq.prototype.toString = function toString () {
	    return this.__toString('Seq {', '}');
	  };

	  Seq.prototype.cacheResult = function cacheResult () {
	    if (!this._cache && this.__iterateUncached) {
	      this._cache = this.entrySeq().toArray();
	      this.size = this._cache.length;
	    }
	    return this;
	  };

	  // abstract __iterateUncached(fn, reverse)

	  Seq.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var cache = this._cache;
	    if (cache) {
	      var size = cache.length;
	      var i = 0;
	      while (i !== size) {
	        var entry = cache[reverse ? size - ++i : i++];
	        if (fn(entry[1], entry[0], this$1) === false) {
	          break;
	        }
	      }
	      return i;
	    }
	    return this.__iterateUncached(fn, reverse);
	  };

	  // abstract __iteratorUncached(type, reverse)

	  Seq.prototype.__iterator = function __iterator (type, reverse) {
	    var cache = this._cache;
	    if (cache) {
	      var size = cache.length;
	      var i = 0;
	      return new Iterator(function () {
	        if (i === size) {
	          return iteratorDone();
	        }
	        var entry = cache[reverse ? size - ++i : i++];
	        return iteratorValue(type, entry[0], entry[1]);
	      });
	    }
	    return this.__iteratorUncached(type, reverse);
	  };

	  return Seq;
	}(Collection));

	var KeyedSeq = (function (Seq) {
	  function KeyedSeq(value) {
	    return value === null || value === undefined
	      ? emptySequence().toKeyedSeq()
	      : isCollection(value)
	        ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq()
	        : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
	  }

	  if ( Seq ) KeyedSeq.__proto__ = Seq;
	  KeyedSeq.prototype = Object.create( Seq && Seq.prototype );
	  KeyedSeq.prototype.constructor = KeyedSeq;

	  KeyedSeq.prototype.toKeyedSeq = function toKeyedSeq () {
	    return this;
	  };

	  return KeyedSeq;
	}(Seq));

	var IndexedSeq = (function (Seq) {
	  function IndexedSeq(value) {
	    return value === null || value === undefined
	      ? emptySequence()
	      : isCollection(value)
	        ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq()
	        : isRecord(value)
	          ? value.toSeq().entrySeq()
	          : indexedSeqFromValue(value);
	  }

	  if ( Seq ) IndexedSeq.__proto__ = Seq;
	  IndexedSeq.prototype = Object.create( Seq && Seq.prototype );
	  IndexedSeq.prototype.constructor = IndexedSeq;

	  IndexedSeq.of = function of (/*...values*/) {
	    return IndexedSeq(arguments);
	  };

	  IndexedSeq.prototype.toIndexedSeq = function toIndexedSeq () {
	    return this;
	  };

	  IndexedSeq.prototype.toString = function toString () {
	    return this.__toString('Seq [', ']');
	  };

	  return IndexedSeq;
	}(Seq));

	var SetSeq = (function (Seq) {
	  function SetSeq(value) {
	    return (isCollection(value) && !isAssociative(value)
	      ? value
	      : IndexedSeq(value)
	    ).toSetSeq();
	  }

	  if ( Seq ) SetSeq.__proto__ = Seq;
	  SetSeq.prototype = Object.create( Seq && Seq.prototype );
	  SetSeq.prototype.constructor = SetSeq;

	  SetSeq.of = function of (/*...values*/) {
	    return SetSeq(arguments);
	  };

	  SetSeq.prototype.toSetSeq = function toSetSeq () {
	    return this;
	  };

	  return SetSeq;
	}(Seq));

	Seq.isSeq = isSeq;
	Seq.Keyed = KeyedSeq;
	Seq.Set = SetSeq;
	Seq.Indexed = IndexedSeq;

	var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	Seq.prototype[IS_SEQ_SENTINEL] = true;

	// #pragma Root Sequences

	var ArraySeq = (function (IndexedSeq) {
	  function ArraySeq(array) {
	    this._array = array;
	    this.size = array.length;
	  }

	  if ( IndexedSeq ) ArraySeq.__proto__ = IndexedSeq;
	  ArraySeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
	  ArraySeq.prototype.constructor = ArraySeq;

	  ArraySeq.prototype.get = function get (index, notSetValue) {
	    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	  };

	  ArraySeq.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var array = this._array;
	    var size = array.length;
	    var i = 0;
	    while (i !== size) {
	      var ii = reverse ? size - ++i : i++;
	      if (fn(array[ii], ii, this$1) === false) {
	        break;
	      }
	    }
	    return i;
	  };

	  ArraySeq.prototype.__iterator = function __iterator (type, reverse) {
	    var array = this._array;
	    var size = array.length;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }
	      var ii = reverse ? size - ++i : i++;
	      return iteratorValue(type, ii, array[ii]);
	    });
	  };

	  return ArraySeq;
	}(IndexedSeq));

	var ObjectSeq = (function (KeyedSeq) {
	  function ObjectSeq(object) {
	    var keys = Object.keys(object);
	    this._object = object;
	    this._keys = keys;
	    this.size = keys.length;
	  }

	  if ( KeyedSeq ) ObjectSeq.__proto__ = KeyedSeq;
	  ObjectSeq.prototype = Object.create( KeyedSeq && KeyedSeq.prototype );
	  ObjectSeq.prototype.constructor = ObjectSeq;

	  ObjectSeq.prototype.get = function get (key, notSetValue) {
	    if (notSetValue !== undefined && !this.has(key)) {
	      return notSetValue;
	    }
	    return this._object[key];
	  };

	  ObjectSeq.prototype.has = function has (key) {
	    return hasOwnProperty$2.call(this._object, key);
	  };

	  ObjectSeq.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var object = this._object;
	    var keys = this._keys;
	    var size = keys.length;
	    var i = 0;
	    while (i !== size) {
	      var key = keys[reverse ? size - ++i : i++];
	      if (fn(object[key], key, this$1) === false) {
	        break;
	      }
	    }
	    return i;
	  };

	  ObjectSeq.prototype.__iterator = function __iterator (type, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var size = keys.length;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }
	      var key = keys[reverse ? size - ++i : i++];
	      return iteratorValue(type, key, object[key]);
	    });
	  };

	  return ObjectSeq;
	}(KeyedSeq));
	ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

	var CollectionSeq = (function (IndexedSeq) {
	  function CollectionSeq(collection) {
	    this._collection = collection;
	    this.size = collection.length || collection.size;
	  }

	  if ( IndexedSeq ) CollectionSeq.__proto__ = IndexedSeq;
	  CollectionSeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
	  CollectionSeq.prototype.constructor = CollectionSeq;

	  CollectionSeq.prototype.__iterateUncached = function __iterateUncached (fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var collection = this._collection;
	    var iterator = getIterator(collection);
	    var iterations = 0;
	    if (isIterator(iterator)) {
	      var step;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this$1) === false) {
	          break;
	        }
	      }
	    }
	    return iterations;
	  };

	  CollectionSeq.prototype.__iteratorUncached = function __iteratorUncached (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var collection = this._collection;
	    var iterator = getIterator(collection);
	    if (!isIterator(iterator)) {
	      return new Iterator(iteratorDone);
	    }
	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value);
	    });
	  };

	  return CollectionSeq;
	}(IndexedSeq));

	var IteratorSeq = (function (IndexedSeq) {
	  function IteratorSeq(iterator) {
	    this._iterator = iterator;
	    this._iteratorCache = [];
	  }

	  if ( IndexedSeq ) IteratorSeq.__proto__ = IndexedSeq;
	  IteratorSeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
	  IteratorSeq.prototype.constructor = IteratorSeq;

	  IteratorSeq.prototype.__iterateUncached = function __iterateUncached (fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    while (iterations < cache.length) {
	      if (fn(cache[iterations], iterations++, this$1) === false) {
	        return iterations;
	      }
	    }
	    var step;
	    while (!(step = iterator.next()).done) {
	      var val = step.value;
	      cache[iterations] = val;
	      if (fn(val, iterations++, this$1) === false) {
	        break;
	      }
	    }
	    return iterations;
	  };

	  IteratorSeq.prototype.__iteratorUncached = function __iteratorUncached (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    return new Iterator(function () {
	      if (iterations >= cache.length) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        cache[iterations] = step.value;
	      }
	      return iteratorValue(type, iterations, cache[iterations++]);
	    });
	  };

	  return IteratorSeq;
	}(IndexedSeq));

	// # pragma Helper functions

	function isSeq(maybeSeq) {
	  return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	}

	var EMPTY_SEQ;

	function emptySequence() {
	  return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	}

	function keyedSeqFromValue(value) {
	  var seq = Array.isArray(value)
	    ? new ArraySeq(value)
	    : isIterator(value)
	      ? new IteratorSeq(value)
	      : hasIterator(value) ? new CollectionSeq(value) : undefined;
	  if (seq) {
	    return seq.fromEntrySeq();
	  }
	  if (typeof value === 'object') {
	    return new ObjectSeq(value);
	  }
	  throw new TypeError(
	    'Expected Array or collection object of [k, v] entries, or keyed object: ' +
	      value
	  );
	}

	function indexedSeqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);
	  if (seq) {
	    return seq;
	  }
	  throw new TypeError(
	    'Expected Array or collection object of values: ' + value
	  );
	}

	function seqFromValue(value) {
	  var seq = maybeIndexedSeqFromValue(value);
	  if (seq) {
	    return seq;
	  }
	  if (typeof value === 'object') {
	    return new ObjectSeq(value);
	  }
	  throw new TypeError(
	    'Expected Array or collection object of values, or keyed object: ' + value
	  );
	}

	function maybeIndexedSeqFromValue(value) {
	  return isArrayLike(value)
	    ? new ArraySeq(value)
	    : isIterator(value)
	      ? new IteratorSeq(value)
	      : hasIterator(value) ? new CollectionSeq(value) : undefined;
	}

	/**
	 * An extension of the "same-value" algorithm as [described for use by ES6 Map
	 * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	 *
	 * NaN is considered the same as NaN, however -0 and 0 are considered the same
	 * value, which is different from the algorithm described by
	 * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	 *
	 * This is extended further to allow Objects to describe the values they
	 * represent, by way of `valueOf` or `equals` (and `hashCode`).
	 *
	 * Note: because of this extension, the key equality of Immutable.Map and the
	 * value equality of Immutable.Set will differ from ES6 Map and Set.
	 *
	 * ### Defining custom values
	 *
	 * The easiest way to describe the value an object represents is by implementing
	 * `valueOf`. For example, `Date` represents a value by returning a unix
	 * timestamp for `valueOf`:
	 *
	 *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	 *     var date2 = new Date(1234567890000);
	 *     date1.valueOf(); // 1234567890000
	 *     assert( date1 !== date2 );
	 *     assert( Immutable.is( date1, date2 ) );
	 *
	 * Note: overriding `valueOf` may have other implications if you use this object
	 * where JavaScript expects a primitive, such as implicit string coercion.
	 *
	 * For more complex types, especially collections, implementing `valueOf` may
	 * not be performant. An alternative is to implement `equals` and `hashCode`.
	 *
	 * `equals` takes another object, presumably of similar type, and returns true
	 * if it is equal. Equality is symmetrical, so the same result should be
	 * returned if this and the argument are flipped.
	 *
	 *     assert( a.equals(b) === b.equals(a) );
	 *
	 * `hashCode` returns a 32bit integer number representing the object which will
	 * be used to determine how to store the value object in a Map or Set. You must
	 * provide both or neither methods, one must not exist without the other.
	 *
	 * Also, an important relationship between these methods must be upheld: if two
	 * values are equal, they *must* return the same hashCode. If the values are not
	 * equal, they might have the same hashCode; this is called a hash collision,
	 * and while undesirable for performance reasons, it is acceptable.
	 *
	 *     if (a.equals(b)) {
	 *       assert( a.hashCode() === b.hashCode() );
	 *     }
	 *
	 * All Immutable collections are Value Objects: they implement `equals()`
	 * and `hashCode()`.
	 */
	function is(valueA, valueB) {
	  if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	    return true;
	  }
	  if (!valueA || !valueB) {
	    return false;
	  }
	  if (
	    typeof valueA.valueOf === 'function' &&
	    typeof valueB.valueOf === 'function'
	  ) {
	    valueA = valueA.valueOf();
	    valueB = valueB.valueOf();
	    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	  }
	  return !!(
	    isValueObject(valueA) &&
	    isValueObject(valueB) &&
	    valueA.equals(valueB)
	  );
	}

	var imul =
	  typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2
	    ? Math.imul
	    : function imul(a, b) {
	        a |= 0; // int
	        b |= 0; // int
	        var c = a & 0xffff;
	        var d = b & 0xffff;
	        // Shift by 0 fixes the sign on the high part.
	        return (c * d + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0)) | 0; // int
	      };

	// v8 has an optimization for storing 31-bit signed numbers.
	// Values which have either 00 or 11 as the high order bits qualify.
	// This function drops the highest order bit in a signed number, maintaining
	// the sign bit.
	function smi(i32) {
	  return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
	}

	function hash(o) {
	  if (o === false || o === null || o === undefined) {
	    return 0;
	  }
	  if (typeof o.valueOf === 'function') {
	    o = o.valueOf();
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	  }
	  if (o === true) {
	    return 1;
	  }
	  var type = typeof o;
	  if (type === 'number') {
	    if (o !== o || o === Infinity) {
	      return 0;
	    }
	    var h = o | 0;
	    if (h !== o) {
	      h ^= o * 0xffffffff;
	    }
	    while (o > 0xffffffff) {
	      o /= 0xffffffff;
	      h ^= o;
	    }
	    return smi(h);
	  }
	  if (type === 'string') {
	    return o.length > STRING_HASH_CACHE_MIN_STRLEN
	      ? cachedHashString(o)
	      : hashString(o);
	  }
	  if (typeof o.hashCode === 'function') {
	    // Drop any high bits from accidentally long hash codes.
	    return smi(o.hashCode());
	  }
	  if (type === 'object') {
	    return hashJSObj(o);
	  }
	  if (typeof o.toString === 'function') {
	    return hashString(o.toString());
	  }
	  throw new Error('Value type ' + type + ' cannot be hashed.');
	}

	function cachedHashString(string) {
	  var hashed = stringHashCache[string];
	  if (hashed === undefined) {
	    hashed = hashString(string);
	    if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	      STRING_HASH_CACHE_SIZE = 0;
	      stringHashCache = {};
	    }
	    STRING_HASH_CACHE_SIZE++;
	    stringHashCache[string] = hashed;
	  }
	  return hashed;
	}

	// http://jsperf.com/hashing-strings
	function hashString(string) {
	  // This is the hash from JVM
	  // The hash code for a string is computed as
	  // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	  // where s[i] is the ith character of the string and n is the length of
	  // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	  // (exclusive) by dropping high bits.
	  var hashed = 0;
	  for (var ii = 0; ii < string.length; ii++) {
	    hashed = (31 * hashed + string.charCodeAt(ii)) | 0;
	  }
	  return smi(hashed);
	}

	function hashJSObj(obj) {
	  var hashed;
	  if (usingWeakMap) {
	    hashed = weakMap.get(obj);
	    if (hashed !== undefined) {
	      return hashed;
	    }
	  }

	  hashed = obj[UID_HASH_KEY];
	  if (hashed !== undefined) {
	    return hashed;
	  }

	  if (!canDefineProperty) {
	    hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	    if (hashed !== undefined) {
	      return hashed;
	    }

	    hashed = getIENodeHash(obj);
	    if (hashed !== undefined) {
	      return hashed;
	    }
	  }

	  hashed = ++objHashUID;
	  if (objHashUID & 0x40000000) {
	    objHashUID = 0;
	  }

	  if (usingWeakMap) {
	    weakMap.set(obj, hashed);
	  } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	    throw new Error('Non-extensible objects are not allowed as keys.');
	  } else if (canDefineProperty) {
	    Object.defineProperty(obj, UID_HASH_KEY, {
	      enumerable: false,
	      configurable: false,
	      writable: false,
	      value: hashed
	    });
	  } else if (
	    obj.propertyIsEnumerable !== undefined &&
	    obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable
	  ) {
	    // Since we can't define a non-enumerable property on the object
	    // we'll hijack one of the less-used non-enumerable properties to
	    // save our hash on it. Since this is a function it will not show up in
	    // `JSON.stringify` which is what we want.
	    obj.propertyIsEnumerable = function() {
	      return this.constructor.prototype.propertyIsEnumerable.apply(
	        this,
	        arguments
	      );
	    };
	    obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
	  } else if (obj.nodeType !== undefined) {
	    // At this point we couldn't get the IE `uniqueID` to use as a hash
	    // and we couldn't use a non-enumerable property to exploit the
	    // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	    // itself.
	    obj[UID_HASH_KEY] = hashed;
	  } else {
	    throw new Error('Unable to set a non-enumerable property on object.');
	  }

	  return hashed;
	}

	// Get references to ES5 object methods.
	var isExtensible = Object.isExtensible;

	// True if Object.defineProperty works as expected. IE8 fails this test.
	var canDefineProperty = (function() {
	  try {
	    Object.defineProperty({}, '@', {});
	    return true;
	  } catch (e) {
	    return false;
	  }
	})();

	// IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	// and avoid memory leaks from the IE cloneNode bug.
	function getIENodeHash(node) {
	  if (node && node.nodeType > 0) {
	    switch (node.nodeType) {
	      case 1: // Element
	        return node.uniqueID;
	      case 9: // Document
	        return node.documentElement && node.documentElement.uniqueID;
	    }
	  }
	}

	// If possible, use a WeakMap.
	var usingWeakMap = typeof WeakMap === 'function';
	var weakMap;
	if (usingWeakMap) {
	  weakMap = new WeakMap();
	}

	var objHashUID = 0;

	var UID_HASH_KEY = '__immutablehash__';
	if (typeof Symbol === 'function') {
	  UID_HASH_KEY = Symbol(UID_HASH_KEY);
	}

	var STRING_HASH_CACHE_MIN_STRLEN = 16;
	var STRING_HASH_CACHE_MAX_SIZE = 255;
	var STRING_HASH_CACHE_SIZE = 0;
	var stringHashCache = {};

	var ToKeyedSequence = (function (KeyedSeq$$1) {
	  function ToKeyedSequence(indexed, useKeys) {
	    this._iter = indexed;
	    this._useKeys = useKeys;
	    this.size = indexed.size;
	  }

	  if ( KeyedSeq$$1 ) ToKeyedSequence.__proto__ = KeyedSeq$$1;
	  ToKeyedSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
	  ToKeyedSequence.prototype.constructor = ToKeyedSequence;

	  ToKeyedSequence.prototype.get = function get (key, notSetValue) {
	    return this._iter.get(key, notSetValue);
	  };

	  ToKeyedSequence.prototype.has = function has (key) {
	    return this._iter.has(key);
	  };

	  ToKeyedSequence.prototype.valueSeq = function valueSeq () {
	    return this._iter.valueSeq();
	  };

	  ToKeyedSequence.prototype.reverse = function reverse () {
	    var this$1 = this;

	    var reversedSequence = reverseFactory(this, true);
	    if (!this._useKeys) {
	      reversedSequence.valueSeq = function () { return this$1._iter.toSeq().reverse(); };
	    }
	    return reversedSequence;
	  };

	  ToKeyedSequence.prototype.map = function map (mapper, context) {
	    var this$1 = this;

	    var mappedSequence = mapFactory(this, mapper, context);
	    if (!this._useKeys) {
	      mappedSequence.valueSeq = function () { return this$1._iter.toSeq().map(mapper, context); };
	    }
	    return mappedSequence;
	  };

	  ToKeyedSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._iter.__iterate(function (v, k) { return fn(v, k, this$1); }, reverse);
	  };

	  ToKeyedSequence.prototype.__iterator = function __iterator (type, reverse) {
	    return this._iter.__iterator(type, reverse);
	  };

	  return ToKeyedSequence;
	}(KeyedSeq));
	ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

	var ToIndexedSequence = (function (IndexedSeq$$1) {
	  function ToIndexedSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  if ( IndexedSeq$$1 ) ToIndexedSequence.__proto__ = IndexedSeq$$1;
	  ToIndexedSequence.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
	  ToIndexedSequence.prototype.constructor = ToIndexedSequence;

	  ToIndexedSequence.prototype.includes = function includes (value) {
	    return this._iter.includes(value);
	  };

	  ToIndexedSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var i = 0;
	    reverse && ensureSize(this);
	    return this._iter.__iterate(
	      function (v) { return fn(v, reverse ? this$1.size - ++i : i++, this$1); },
	      reverse
	    );
	  };

	  ToIndexedSequence.prototype.__iterator = function __iterator (type, reverse) {
	    var this$1 = this;

	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var i = 0;
	    reverse && ensureSize(this);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done
	        ? step
	        : iteratorValue(
	            type,
	            reverse ? this$1.size - ++i : i++,
	            step.value,
	            step
	          );
	    });
	  };

	  return ToIndexedSequence;
	}(IndexedSeq));

	var ToSetSequence = (function (SetSeq$$1) {
	  function ToSetSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  if ( SetSeq$$1 ) ToSetSequence.__proto__ = SetSeq$$1;
	  ToSetSequence.prototype = Object.create( SetSeq$$1 && SetSeq$$1.prototype );
	  ToSetSequence.prototype.constructor = ToSetSequence;

	  ToSetSequence.prototype.has = function has (key) {
	    return this._iter.includes(key);
	  };

	  ToSetSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._iter.__iterate(function (v) { return fn(v, v, this$1); }, reverse);
	  };

	  ToSetSequence.prototype.__iterator = function __iterator (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done
	        ? step
	        : iteratorValue(type, step.value, step.value, step);
	    });
	  };

	  return ToSetSequence;
	}(SetSeq));

	var FromEntriesSequence = (function (KeyedSeq$$1) {
	  function FromEntriesSequence(entries) {
	    this._iter = entries;
	    this.size = entries.size;
	  }

	  if ( KeyedSeq$$1 ) FromEntriesSequence.__proto__ = KeyedSeq$$1;
	  FromEntriesSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
	  FromEntriesSequence.prototype.constructor = FromEntriesSequence;

	  FromEntriesSequence.prototype.entrySeq = function entrySeq () {
	    return this._iter.toSeq();
	  };

	  FromEntriesSequence.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._iter.__iterate(function (entry) {
	      // Check if entry exists first so array access doesn't throw for holes
	      // in the parent iteration.
	      if (entry) {
	        validateEntry(entry);
	        var indexedCollection = isCollection(entry);
	        return fn(
	          indexedCollection ? entry.get(1) : entry[1],
	          indexedCollection ? entry.get(0) : entry[0],
	          this$1
	        );
	      }
	    }, reverse);
	  };

	  FromEntriesSequence.prototype.__iterator = function __iterator (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedCollection = isCollection(entry);
	          return iteratorValue(
	            type,
	            indexedCollection ? entry.get(0) : entry[0],
	            indexedCollection ? entry.get(1) : entry[1],
	            step
	          );
	        }
	      }
	    });
	  };

	  return FromEntriesSequence;
	}(KeyedSeq));

	ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

	function flipFactory(collection) {
	  var flipSequence = makeSequence(collection);
	  flipSequence._iter = collection;
	  flipSequence.size = collection.size;
	  flipSequence.flip = function () { return collection; };
	  flipSequence.reverse = function() {
	    var reversedSequence = collection.reverse.apply(this); // super.reverse()
	    reversedSequence.flip = function () { return collection.reverse(); };
	    return reversedSequence;
	  };
	  flipSequence.has = function (key) { return collection.includes(key); };
	  flipSequence.includes = function (key) { return collection.has(key); };
	  flipSequence.cacheResult = cacheResultThrough;
	  flipSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    return collection.__iterate(function (v, k) { return fn(k, v, this$1) !== false; }, reverse);
	  };
	  flipSequence.__iteratorUncached = function(type, reverse) {
	    if (type === ITERATE_ENTRIES) {
	      var iterator = collection.__iterator(type, reverse);
	      return new Iterator(function () {
	        var step = iterator.next();
	        if (!step.done) {
	          var k = step.value[0];
	          step.value[0] = step.value[1];
	          step.value[1] = k;
	        }
	        return step;
	      });
	    }
	    return collection.__iterator(
	      type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
	      reverse
	    );
	  };
	  return flipSequence;
	}

	function mapFactory(collection, mapper, context) {
	  var mappedSequence = makeSequence(collection);
	  mappedSequence.size = collection.size;
	  mappedSequence.has = function (key) { return collection.has(key); };
	  mappedSequence.get = function (key, notSetValue) {
	    var v = collection.get(key, NOT_SET);
	    return v === NOT_SET
	      ? notSetValue
	      : mapper.call(context, v, key, collection);
	  };
	  mappedSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    return collection.__iterate(
	      function (v, k, c) { return fn(mapper.call(context, v, k, c), k, this$1) !== false; },
	      reverse
	    );
	  };
	  mappedSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      var key = entry[0];
	      return iteratorValue(
	        type,
	        key,
	        mapper.call(context, entry[1], key, collection),
	        step
	      );
	    });
	  };
	  return mappedSequence;
	}

	function reverseFactory(collection, useKeys) {
	  var this$1 = this;

	  var reversedSequence = makeSequence(collection);
	  reversedSequence._iter = collection;
	  reversedSequence.size = collection.size;
	  reversedSequence.reverse = function () { return collection; };
	  if (collection.flip) {
	    reversedSequence.flip = function() {
	      var flipSequence = flipFactory(collection);
	      flipSequence.reverse = function () { return collection.flip(); };
	      return flipSequence;
	    };
	  }
	  reversedSequence.get = function (key, notSetValue) { return collection.get(useKeys ? key : -1 - key, notSetValue); };
	  reversedSequence.has = function (key) { return collection.has(useKeys ? key : -1 - key); };
	  reversedSequence.includes = function (value) { return collection.includes(value); };
	  reversedSequence.cacheResult = cacheResultThrough;
	  reversedSequence.__iterate = function(fn, reverse) {
	    var this$1 = this;

	    var i = 0;
	    reverse && ensureSize(collection);
	    return collection.__iterate(
	      function (v, k) { return fn(v, useKeys ? k : reverse ? this$1.size - ++i : i++, this$1); },
	      !reverse
	    );
	  };
	  reversedSequence.__iterator = function (type, reverse) {
	    var i = 0;
	    reverse && ensureSize(collection);
	    var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      return iteratorValue(
	        type,
	        useKeys ? entry[0] : reverse ? this$1.size - ++i : i++,
	        entry[1],
	        step
	      );
	    });
	  };
	  return reversedSequence;
	}

	function filterFactory(collection, predicate, context, useKeys) {
	  var filterSequence = makeSequence(collection);
	  if (useKeys) {
	    filterSequence.has = function (key) {
	      var v = collection.get(key, NOT_SET);
	      return v !== NOT_SET && !!predicate.call(context, v, key, collection);
	    };
	    filterSequence.get = function (key, notSetValue) {
	      var v = collection.get(key, NOT_SET);
	      return v !== NOT_SET && predicate.call(context, v, key, collection)
	        ? v
	        : notSetValue;
	    };
	  }
	  filterSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    var iterations = 0;
	    collection.__iterate(function (v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1);
	      }
	    }, reverse);
	    return iterations;
	  };
	  filterSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    var iterations = 0;
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        var value = entry[1];
	        if (predicate.call(context, value, key, collection)) {
	          return iteratorValue(type, useKeys ? key : iterations++, value, step);
	        }
	      }
	    });
	  };
	  return filterSequence;
	}

	function countByFactory(collection, grouper, context) {
	  var groups = Map$1().asMutable();
	  collection.__iterate(function (v, k) {
	    groups.update(grouper.call(context, v, k, collection), 0, function (a) { return a + 1; });
	  });
	  return groups.asImmutable();
	}

	function groupByFactory(collection, grouper, context) {
	  var isKeyedIter = isKeyed(collection);
	  var groups = (isOrdered(collection) ? OrderedMap() : Map$1()).asMutable();
	  collection.__iterate(function (v, k) {
	    groups.update(
	      grouper.call(context, v, k, collection),
	      function (a) { return ((a = a || []), a.push(isKeyedIter ? [k, v] : v), a); }
	    );
	  });
	  var coerce = collectionClass(collection);
	  return groups.map(function (arr) { return reify(collection, coerce(arr)); });
	}

	function sliceFactory(collection, begin, end, useKeys) {
	  var originalSize = collection.size;

	  if (wholeSlice(begin, end, originalSize)) {
	    return collection;
	  }

	  var resolvedBegin = resolveBegin(begin, originalSize);
	  var resolvedEnd = resolveEnd(end, originalSize);

	  // begin or end will be NaN if they were provided as negative numbers and
	  // this collection's size is unknown. In that case, cache first so there is
	  // a known size and these do not resolve to NaN.
	  if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	    return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
	  }

	  // Note: resolvedEnd is undefined when the original sequence's length is
	  // unknown and this slice did not supply an end and should contain all
	  // elements after resolvedBegin.
	  // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	  var resolvedSize = resolvedEnd - resolvedBegin;
	  var sliceSize;
	  if (resolvedSize === resolvedSize) {
	    sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	  }

	  var sliceSeq = makeSequence(collection);

	  // If collection.size is undefined, the size of the realized sliceSeq is
	  // unknown at this point unless the number of items to slice is 0
	  sliceSeq.size =
	    sliceSize === 0 ? sliceSize : (collection.size && sliceSize) || undefined;

	  if (!useKeys && isSeq(collection) && sliceSize >= 0) {
	    sliceSeq.get = function(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return index >= 0 && index < sliceSize
	        ? collection.get(index + resolvedBegin, notSetValue)
	        : notSetValue;
	    };
	  }

	  sliceSeq.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    if (sliceSize === 0) {
	      return 0;
	    }
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var skipped = 0;
	    var isSkipping = true;
	    var iterations = 0;
	    collection.__iterate(function (v, k) {
	      if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	        iterations++;
	        return (
	          fn(v, useKeys ? k : iterations - 1, this$1) !== false &&
	          iterations !== sliceSize
	        );
	      }
	    });
	    return iterations;
	  };

	  sliceSeq.__iteratorUncached = function(type, reverse) {
	    if (sliceSize !== 0 && reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    // Don't bother instantiating parent iterator if taking 0.
	    if (sliceSize === 0) {
	      return new Iterator(iteratorDone);
	    }
	    var iterator = collection.__iterator(type, reverse);
	    var skipped = 0;
	    var iterations = 0;
	    return new Iterator(function () {
	      while (skipped++ < resolvedBegin) {
	        iterator.next();
	      }
	      if (++iterations > sliceSize) {
	        return iteratorDone();
	      }
	      var step = iterator.next();
	      if (useKeys || type === ITERATE_VALUES || step.done) {
	        return step;
	      }
	      if (type === ITERATE_KEYS) {
	        return iteratorValue(type, iterations - 1, undefined, step);
	      }
	      return iteratorValue(type, iterations - 1, step.value[1], step);
	    });
	  };

	  return sliceSeq;
	}

	function takeWhileFactory(collection, predicate, context) {
	  var takeSequence = makeSequence(collection);
	  takeSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    collection.__iterate(
	      function (v, k, c) { return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1); }
	    );
	    return iterations;
	  };
	  takeSequence.__iteratorUncached = function(type, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    var iterating = true;
	    return new Iterator(function () {
	      if (!iterating) {
	        return iteratorDone();
	      }
	      var step = iterator.next();
	      if (step.done) {
	        return step;
	      }
	      var entry = step.value;
	      var k = entry[0];
	      var v = entry[1];
	      if (!predicate.call(context, v, k, this$1)) {
	        iterating = false;
	        return iteratorDone();
	      }
	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    });
	  };
	  return takeSequence;
	}

	function skipWhileFactory(collection, predicate, context, useKeys) {
	  var skipSequence = makeSequence(collection);
	  skipSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var isSkipping = true;
	    var iterations = 0;
	    collection.__iterate(function (v, k, c) {
	      if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	        iterations++;
	        return fn(v, useKeys ? k : iterations - 1, this$1);
	      }
	    });
	    return iterations;
	  };
	  skipSequence.__iteratorUncached = function(type, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
	    var skipping = true;
	    var iterations = 0;
	    return new Iterator(function () {
	      var step;
	      var k;
	      var v;
	      do {
	        step = iterator.next();
	        if (step.done) {
	          if (useKeys || type === ITERATE_VALUES) {
	            return step;
	          }
	          if (type === ITERATE_KEYS) {
	            return iteratorValue(type, iterations++, undefined, step);
	          }
	          return iteratorValue(type, iterations++, step.value[1], step);
	        }
	        var entry = step.value;
	        k = entry[0];
	        v = entry[1];
	        skipping && (skipping = predicate.call(context, v, k, this$1));
	      } while (skipping);
	      return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	    });
	  };
	  return skipSequence;
	}

	function concatFactory(collection, values) {
	  var isKeyedCollection = isKeyed(collection);
	  var iters = [collection]
	    .concat(values)
	    .map(function (v) {
	      if (!isCollection(v)) {
	        v = isKeyedCollection
	          ? keyedSeqFromValue(v)
	          : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedCollection) {
	        v = KeyedCollection(v);
	      }
	      return v;
	    })
	    .filter(function (v) { return v.size !== 0; });

	  if (iters.length === 0) {
	    return collection;
	  }

	  if (iters.length === 1) {
	    var singleton = iters[0];
	    if (
	      singleton === collection ||
	      (isKeyedCollection && isKeyed(singleton)) ||
	      (isIndexed(collection) && isIndexed(singleton))
	    ) {
	      return singleton;
	    }
	  }

	  var concatSeq = new ArraySeq(iters);
	  if (isKeyedCollection) {
	    concatSeq = concatSeq.toKeyedSeq();
	  } else if (!isIndexed(collection)) {
	    concatSeq = concatSeq.toSetSeq();
	  }
	  concatSeq = concatSeq.flatten(true);
	  concatSeq.size = iters.reduce(function (sum, seq) {
	    if (sum !== undefined) {
	      var size = seq.size;
	      if (size !== undefined) {
	        return sum + size;
	      }
	    }
	  }, 0);
	  return concatSeq;
	}

	function flattenFactory(collection, depth, useKeys) {
	  var flatSequence = makeSequence(collection);
	  flatSequence.__iterateUncached = function(fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterations = 0;
	    var stopped = false;
	    function flatDeep(iter, currentDepth) {
	      iter.__iterate(function (v, k) {
	        if ((!depth || currentDepth < depth) && isCollection(v)) {
	          flatDeep(v, currentDepth + 1);
	        } else {
	          iterations++;
	          if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
	            stopped = true;
	          }
	        }
	        return !stopped;
	      }, reverse);
	    }
	    flatDeep(collection, 0);
	    return iterations;
	  };
	  flatSequence.__iteratorUncached = function(type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = collection.__iterator(type, reverse);
	    var stack = [];
	    var iterations = 0;
	    return new Iterator(function () {
	      while (iterator) {
	        var step = iterator.next();
	        if (step.done !== false) {
	          iterator = stack.pop();
	          continue;
	        }
	        var v = step.value;
	        if (type === ITERATE_ENTRIES) {
	          v = v[1];
	        }
	        if ((!depth || stack.length < depth) && isCollection(v)) {
	          stack.push(iterator);
	          iterator = v.__iterator(type, reverse);
	        } else {
	          return useKeys ? step : iteratorValue(type, iterations++, v, step);
	        }
	      }
	      return iteratorDone();
	    });
	  };
	  return flatSequence;
	}

	function flatMapFactory(collection, mapper, context) {
	  var coerce = collectionClass(collection);
	  return collection
	    .toSeq()
	    .map(function (v, k) { return coerce(mapper.call(context, v, k, collection)); })
	    .flatten(true);
	}

	function interposeFactory(collection, separator) {
	  var interposedSequence = makeSequence(collection);
	  interposedSequence.size = collection.size && collection.size * 2 - 1;
	  interposedSequence.__iterateUncached = function(fn, reverse) {
	    var this$1 = this;

	    var iterations = 0;
	    collection.__iterate(
	      function (v) { return (!iterations || fn(separator, iterations++, this$1) !== false) &&
	        fn(v, iterations++, this$1) !== false; },
	      reverse
	    );
	    return iterations;
	  };
	  interposedSequence.__iteratorUncached = function(type, reverse) {
	    var iterator = collection.__iterator(ITERATE_VALUES, reverse);
	    var iterations = 0;
	    var step;
	    return new Iterator(function () {
	      if (!step || iterations % 2) {
	        step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	      }
	      return iterations % 2
	        ? iteratorValue(type, iterations++, separator)
	        : iteratorValue(type, iterations++, step.value, step);
	    });
	  };
	  return interposedSequence;
	}

	function sortFactory(collection, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }
	  var isKeyedCollection = isKeyed(collection);
	  var index = 0;
	  var entries = collection
	    .toSeq()
	    .map(function (v, k) { return [k, v, index++, mapper ? mapper(v, k, collection) : v]; })
	    .valueSeq()
	    .toArray();
	  entries.sort(function (a, b) { return comparator(a[3], b[3]) || a[2] - b[2]; }).forEach(
	    isKeyedCollection
	      ? function (v, i) {
	          entries[i].length = 2;
	        }
	      : function (v, i) {
	          entries[i] = v[1];
	        }
	  );
	  return isKeyedCollection
	    ? KeyedSeq(entries)
	    : isIndexed(collection) ? IndexedSeq(entries) : SetSeq(entries);
	}

	function maxFactory(collection, comparator, mapper) {
	  if (!comparator) {
	    comparator = defaultComparator;
	  }
	  if (mapper) {
	    var entry = collection
	      .toSeq()
	      .map(function (v, k) { return [v, mapper(v, k, collection)]; })
	      .reduce(function (a, b) { return (maxCompare(comparator, a[1], b[1]) ? b : a); });
	    return entry && entry[0];
	  }
	  return collection.reduce(function (a, b) { return (maxCompare(comparator, a, b) ? b : a); });
	}

	function maxCompare(comparator, a, b) {
	  var comp = comparator(b, a);
	  // b is considered the new max if the comparator declares them equal, but
	  // they are not equal and b is in fact a nullish value.
	  return (
	    (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) ||
	    comp > 0
	  );
	}

	function zipWithFactory(keyIter, zipper, iters, zipAll) {
	  var zipSequence = makeSequence(keyIter);
	  var sizes = new ArraySeq(iters).map(function (i) { return i.size; });
	  zipSequence.size = zipAll ? sizes.max() : sizes.min();
	  // Note: this a generic base implementation of __iterate in terms of
	  // __iterator which may be more generically useful in the future.
	  zipSequence.__iterate = function(fn, reverse) {
	    var this$1 = this;

	    /* generic:
	    var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	    var step;
	    var iterations = 0;
	    while (!(step = iterator.next()).done) {
	      iterations++;
	      if (fn(step.value[1], step.value[0], this) === false) {
	        break;
	      }
	    }
	    return iterations;
	    */
	    // indexed:
	    var iterator = this.__iterator(ITERATE_VALUES, reverse);
	    var step;
	    var iterations = 0;
	    while (!(step = iterator.next()).done) {
	      if (fn(step.value, iterations++, this$1) === false) {
	        break;
	      }
	    }
	    return iterations;
	  };
	  zipSequence.__iteratorUncached = function(type, reverse) {
	    var iterators = iters.map(
	      function (i) { return ((i = Collection(i)), getIterator(reverse ? i.reverse() : i)); }
	    );
	    var iterations = 0;
	    var isDone = false;
	    return new Iterator(function () {
	      var steps;
	      if (!isDone) {
	        steps = iterators.map(function (i) { return i.next(); });
	        isDone = zipAll ? steps.every(function (s) { return s.done; }) : steps.some(function (s) { return s.done; });
	      }
	      if (isDone) {
	        return iteratorDone();
	      }
	      return iteratorValue(
	        type,
	        iterations++,
	        zipper.apply(null, steps.map(function (s) { return s.value; }))
	      );
	    });
	  };
	  return zipSequence;
	}

	// #pragma Helper Functions

	function reify(iter, seq) {
	  return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
	}

	function validateEntry(entry) {
	  if (entry !== Object(entry)) {
	    throw new TypeError('Expected [K, V] tuple: ' + entry);
	  }
	}

	function collectionClass(collection) {
	  return isKeyed(collection)
	    ? KeyedCollection
	    : isIndexed(collection) ? IndexedCollection : SetCollection;
	}

	function makeSequence(collection) {
	  return Object.create(
	    (isKeyed(collection)
	      ? KeyedSeq
	      : isIndexed(collection) ? IndexedSeq : SetSeq
	    ).prototype
	  );
	}

	function cacheResultThrough() {
	  if (this._iter.cacheResult) {
	    this._iter.cacheResult();
	    this.size = this._iter.size;
	    return this;
	  }
	  return Seq.prototype.cacheResult.call(this);
	}

	function defaultComparator(a, b) {
	  if (a === undefined && b === undefined) {
	    return 0;
	  }

	  if (a === undefined) {
	    return 1;
	  }

	  if (b === undefined) {
	    return -1;
	  }

	  return a > b ? 1 : a < b ? -1 : 0;
	}

	// http://jsperf.com/copy-array-inline
	function arrCopy(arr, offset) {
	  offset = offset || 0;
	  var len = Math.max(0, arr.length - offset);
	  var newArr = new Array(len);
	  for (var ii = 0; ii < len; ii++) {
	    newArr[ii] = arr[ii + offset];
	  }
	  return newArr;
	}

	function invariant(condition, error) {
	  if (!condition) { throw new Error(error); }
	}

	function assertNotInfinite(size) {
	  invariant(
	    size !== Infinity,
	    'Cannot perform this action with an infinite size.'
	  );
	}

	function coerceKeyPath(keyPath) {
	  if (isArrayLike(keyPath) && typeof keyPath !== 'string') {
	    return keyPath;
	  }
	  if (isOrdered(keyPath)) {
	    return keyPath.toArray();
	  }
	  throw new TypeError(
	    'Invalid keyPath: expected Ordered Collection or Array: ' + keyPath
	  );
	}

	function isPlainObj(value) {
	  return (
	    value && (value.constructor === Object || value.constructor === undefined)
	  );
	}

	/**
	 * Returns true if the value is a potentially-persistent data structure, either
	 * provided by Immutable.js or a plain Array or Object.
	 */
	function isDataStructure(value) {
	  return isImmutable(value) || Array.isArray(value) || isPlainObj(value);
	}

	/**
	 * Converts a value to a string, adding quotes if a string was provided.
	 */
	function quoteString(value) {
	  try {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  } catch (_ignoreError) {
	    return JSON.stringify(value);
	  }
	}

	function has(collection, key) {
	  return isImmutable(collection)
	    ? collection.has(key)
	    : isDataStructure(collection) && hasOwnProperty$2.call(collection, key);
	}

	function get$1(collection, key, notSetValue) {
	  return isImmutable(collection)
	    ? collection.get(key, notSetValue)
	    : !has(collection, key)
	      ? notSetValue
	      : typeof collection.get === 'function'
	        ? collection.get(key)
	        : collection[key];
	}

	function shallowCopy(from) {
	  if (Array.isArray(from)) {
	    return arrCopy(from);
	  }
	  var to = {};
	  for (var key in from) {
	    if (hasOwnProperty$2.call(from, key)) {
	      to[key] = from[key];
	    }
	  }
	  return to;
	}

	function remove(collection, key) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError(
	      'Cannot update non-data-structure value: ' + collection
	    );
	  }
	  if (isImmutable(collection)) {
	    if (!collection.remove) {
	      throw new TypeError(
	        'Cannot update immutable value without .remove() method: ' + collection
	      );
	    }
	    return collection.remove(key);
	  }
	  if (!hasOwnProperty$2.call(collection, key)) {
	    return collection;
	  }
	  var collectionCopy = shallowCopy(collection);
	  if (Array.isArray(collectionCopy)) {
	    collectionCopy.splice(key, 1);
	  } else {
	    delete collectionCopy[key];
	  }
	  return collectionCopy;
	}

	function set(collection, key, value) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError(
	      'Cannot update non-data-structure value: ' + collection
	    );
	  }
	  if (isImmutable(collection)) {
	    if (!collection.set) {
	      throw new TypeError(
	        'Cannot update immutable value without .set() method: ' + collection
	      );
	    }
	    return collection.set(key, value);
	  }
	  if (hasOwnProperty$2.call(collection, key) && value === collection[key]) {
	    return collection;
	  }
	  var collectionCopy = shallowCopy(collection);
	  collectionCopy[key] = value;
	  return collectionCopy;
	}

	function updateIn(collection, keyPath, notSetValue, updater) {
	  if (!updater) {
	    updater = notSetValue;
	    notSetValue = undefined;
	  }
	  var updatedValue = updateInDeeply(
	    isImmutable(collection),
	    collection,
	    coerceKeyPath(keyPath),
	    0,
	    notSetValue,
	    updater
	  );
	  return updatedValue === NOT_SET ? notSetValue : updatedValue;
	}

	function updateInDeeply(
	  inImmutable,
	  existing,
	  keyPath,
	  i,
	  notSetValue,
	  updater
	) {
	  var wasNotSet = existing === NOT_SET;
	  if (i === keyPath.length) {
	    var existingValue = wasNotSet ? notSetValue : existing;
	    var newValue = updater(existingValue);
	    return newValue === existingValue ? existing : newValue;
	  }
	  if (!wasNotSet && !isDataStructure(existing)) {
	    throw new TypeError(
	      'Cannot update within non-data-structure value in path [' +
	        keyPath.slice(0, i).map(quoteString) +
	        ']: ' +
	        existing
	    );
	  }
	  var key = keyPath[i];
	  var nextExisting = wasNotSet ? NOT_SET : get$1(existing, key, NOT_SET);
	  var nextUpdated = updateInDeeply(
	    nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
	    nextExisting,
	    keyPath,
	    i + 1,
	    notSetValue,
	    updater
	  );
	  return nextUpdated === nextExisting
	    ? existing
	    : nextUpdated === NOT_SET
	      ? remove(existing, key)
	      : set(
	          wasNotSet ? (inImmutable ? emptyMap() : {}) : existing,
	          key,
	          nextUpdated
	        );
	}

	function setIn$1(collection, keyPath, value) {
	  return updateIn(collection, keyPath, NOT_SET, function () { return value; });
	}

	function setIn$$1(keyPath, v) {
	  return setIn$1(this, keyPath, v);
	}

	function removeIn(collection, keyPath) {
	  return updateIn(collection, keyPath, function () { return NOT_SET; });
	}

	function deleteIn(keyPath) {
	  return removeIn(this, keyPath);
	}

	function update$1(collection, key, notSetValue, updater) {
	  return updateIn(collection, [key], notSetValue, updater);
	}

	function update$$1(key, notSetValue, updater) {
	  return arguments.length === 1
	    ? key(this)
	    : update$1(this, key, notSetValue, updater);
	}

	function updateIn$1(keyPath, notSetValue, updater) {
	  return updateIn(this, keyPath, notSetValue, updater);
	}

	function merge() {
	  var iters = [], len = arguments.length;
	  while ( len-- ) iters[ len ] = arguments[ len ];

	  return mergeIntoKeyedWith(this, iters);
	}

	function mergeWith(merger) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return mergeIntoKeyedWith(this, iters, merger);
	}

	function mergeIntoKeyedWith(collection, collections, merger) {
	  var iters = [];
	  for (var ii = 0; ii < collections.length; ii++) {
	    var collection$1 = KeyedCollection(collections[ii]);
	    if (collection$1.size !== 0) {
	      iters.push(collection$1);
	    }
	  }
	  if (iters.length === 0) {
	    return collection;
	  }
	  if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	    return collection.constructor(iters[0]);
	  }
	  return collection.withMutations(function (collection) {
	    var mergeIntoCollection = merger
	      ? function (value, key) {
	          update$1(
	            collection,
	            key,
	            NOT_SET,
	            function (oldVal) { return (oldVal === NOT_SET ? value : merger(oldVal, value, key)); }
	          );
	        }
	      : function (value, key) {
	          collection.set(key, value);
	        };
	    for (var ii = 0; ii < iters.length; ii++) {
	      iters[ii].forEach(mergeIntoCollection);
	    }
	  });
	}

	function merge$1(collection) {
	  var sources = [], len = arguments.length - 1;
	  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

	  return mergeWithSources(collection, sources);
	}

	function mergeWith$1(merger, collection) {
	  var sources = [], len = arguments.length - 2;
	  while ( len-- > 0 ) sources[ len ] = arguments[ len + 2 ];

	  return mergeWithSources(collection, sources, merger);
	}

	function mergeDeep$1(collection) {
	  var sources = [], len = arguments.length - 1;
	  while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

	  return mergeDeepWithSources(collection, sources);
	}

	function mergeDeepWith$1(merger, collection) {
	  var sources = [], len = arguments.length - 2;
	  while ( len-- > 0 ) sources[ len ] = arguments[ len + 2 ];

	  return mergeDeepWithSources(collection, sources, merger);
	}

	function mergeDeepWithSources(collection, sources, merger) {
	  return mergeWithSources(collection, sources, deepMergerWith(merger));
	}

	function mergeWithSources(collection, sources, merger) {
	  if (!isDataStructure(collection)) {
	    throw new TypeError(
	      'Cannot merge into non-data-structure value: ' + collection
	    );
	  }
	  if (isImmutable(collection)) {
	    return collection.mergeWith
	      ? collection.mergeWith.apply(collection, [ merger ].concat( sources ))
	      : collection.concat.apply(collection, sources);
	  }
	  var isArray = Array.isArray(collection);
	  var merged = collection;
	  var Collection$$1 = isArray ? IndexedCollection : KeyedCollection;
	  var mergeItem = isArray
	    ? function (value) {
	        // Copy on write
	        if (merged === collection) {
	          merged = shallowCopy(merged);
	        }
	        merged.push(value);
	      }
	    : function (value, key) {
	        var hasVal = hasOwnProperty$2.call(merged, key);
	        var nextVal =
	          hasVal && merger ? merger(merged[key], value, key) : value;
	        if (!hasVal || nextVal !== merged[key]) {
	          // Copy on write
	          if (merged === collection) {
	            merged = shallowCopy(merged);
	          }
	          merged[key] = nextVal;
	        }
	      };
	  for (var i = 0; i < sources.length; i++) {
	    Collection$$1(sources[i]).forEach(mergeItem);
	  }
	  return merged;
	}

	function deepMergerWith(merger) {
	  function deepMerger(oldValue, newValue, key) {
	    return isDataStructure(oldValue) && isDataStructure(newValue)
	      ? mergeWithSources(oldValue, [newValue], deepMerger)
	      : merger ? merger(oldValue, newValue, key) : newValue;
	  }
	  return deepMerger;
	}

	function mergeDeep() {
	  var iters = [], len = arguments.length;
	  while ( len-- ) iters[ len ] = arguments[ len ];

	  return mergeDeepWithSources(this, iters);
	}

	function mergeDeepWith(merger) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return mergeDeepWithSources(this, iters, merger);
	}

	function mergeIn(keyPath) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return updateIn(this, keyPath, emptyMap(), function (m) { return mergeWithSources(m, iters); });
	}

	function mergeDeepIn(keyPath) {
	  var iters = [], len = arguments.length - 1;
	  while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

	  return updateIn(this, keyPath, emptyMap(), function (m) { return mergeDeepWithSources(m, iters); }
	  );
	}

	function withMutations(fn) {
	  var mutable = this.asMutable();
	  fn(mutable);
	  return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	}

	function asMutable() {
	  return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	}

	function asImmutable() {
	  return this.__ensureOwner();
	}

	function wasAltered() {
	  return this.__altered;
	}

	var Map$1 = (function (KeyedCollection$$1) {
	  function Map(value) {
	    return value === null || value === undefined
	      ? emptyMap()
	      : isMap(value) && !isOrdered(value)
	        ? value
	        : emptyMap().withMutations(function (map) {
	            var iter = KeyedCollection$$1(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v, k) { return map.set(k, v); });
	          });
	  }

	  if ( KeyedCollection$$1 ) Map.__proto__ = KeyedCollection$$1;
	  Map.prototype = Object.create( KeyedCollection$$1 && KeyedCollection$$1.prototype );
	  Map.prototype.constructor = Map;

	  Map.of = function of () {
	    var keyValues = [], len = arguments.length;
	    while ( len-- ) keyValues[ len ] = arguments[ len ];

	    return emptyMap().withMutations(function (map) {
	      for (var i = 0; i < keyValues.length; i += 2) {
	        if (i + 1 >= keyValues.length) {
	          throw new Error('Missing value for key: ' + keyValues[i]);
	        }
	        map.set(keyValues[i], keyValues[i + 1]);
	      }
	    });
	  };

	  Map.prototype.toString = function toString () {
	    return this.__toString('Map {', '}');
	  };

	  // @pragma Access

	  Map.prototype.get = function get (k, notSetValue) {
	    return this._root
	      ? this._root.get(0, undefined, k, notSetValue)
	      : notSetValue;
	  };

	  // @pragma Modification

	  Map.prototype.set = function set (k, v) {
	    return updateMap(this, k, v);
	  };

	  Map.prototype.remove = function remove (k) {
	    return updateMap(this, k, NOT_SET);
	  };

	  Map.prototype.deleteAll = function deleteAll (keys) {
	    var collection = Collection(keys);

	    if (collection.size === 0) {
	      return this;
	    }

	    return this.withMutations(function (map) {
	      collection.forEach(function (key) { return map.remove(key); });
	    });
	  };

	  Map.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._root = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyMap();
	  };

	  // @pragma Composition

	  Map.prototype.sort = function sort (comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator));
	  };

	  Map.prototype.sortBy = function sortBy (mapper, comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator, mapper));
	  };

	  // @pragma Mutability

	  Map.prototype.__iterator = function __iterator (type, reverse) {
	    return new MapIterator(this, type, reverse);
	  };

	  Map.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var iterations = 0;
	    this._root &&
	      this._root.iterate(function (entry) {
	        iterations++;
	        return fn(entry[1], entry[0], this$1);
	      }, reverse);
	    return iterations;
	  };

	  Map.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyMap();
	      }
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeMap(this.size, this._root, ownerID, this.__hash);
	  };

	  return Map;
	}(KeyedCollection));

	function isMap(maybeMap) {
	  return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	}

	Map$1.isMap = isMap;

	var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	var MapPrototype = Map$1.prototype;
	MapPrototype[IS_MAP_SENTINEL] = true;
	MapPrototype[DELETE] = MapPrototype.remove;
	MapPrototype.removeAll = MapPrototype.deleteAll;
	MapPrototype.concat = MapPrototype.merge;
	MapPrototype.setIn = setIn$$1;
	MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
	MapPrototype.update = update$$1;
	MapPrototype.updateIn = updateIn$1;
	MapPrototype.merge = merge;
	MapPrototype.mergeWith = mergeWith;
	MapPrototype.mergeDeep = mergeDeep;
	MapPrototype.mergeDeepWith = mergeDeepWith;
	MapPrototype.mergeIn = mergeIn;
	MapPrototype.mergeDeepIn = mergeDeepIn;
	MapPrototype.withMutations = withMutations;
	MapPrototype.wasAltered = wasAltered;
	MapPrototype.asImmutable = asImmutable;
	MapPrototype['@@transducer/init'] = MapPrototype.asMutable = asMutable;
	MapPrototype['@@transducer/step'] = function(result, arr) {
	  return result.set(arr[0], arr[1]);
	};
	MapPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	// #pragma Trie Nodes

	var ArrayMapNode = function ArrayMapNode(ownerID, entries) {
	  this.ownerID = ownerID;
	  this.entries = entries;
	};

	ArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  var entries = this.entries;
	  for (var ii = 0, len = entries.length; ii < len; ii++) {
	    if (is(key, entries[ii][0])) {
	      return entries[ii][1];
	    }
	  }
	  return notSetValue;
	};

	ArrayMapNode.prototype.update = function update$$1 (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  var removed = value === NOT_SET;

	  var entries = this.entries;
	  var idx = 0;
	  var len = entries.length;
	  for (; idx < len; idx++) {
	    if (is(key, entries[idx][0])) {
	      break;
	    }
	  }
	  var exists = idx < len;

	  if (exists ? entries[idx][1] === value : removed) {
	    return this;
	  }

	  SetRef(didAlter);
	  (removed || !exists) && SetRef(didChangeSize);

	  if (removed && entries.length === 1) {
	    return; // undefined
	  }

	  if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	    return createNodes(ownerID, entries, key, value);
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newEntries = isEditable ? entries : arrCopy(entries);

	  if (exists) {
	    if (removed) {
	      idx === len - 1
	        ? newEntries.pop()
	        : (newEntries[idx] = newEntries.pop());
	    } else {
	      newEntries[idx] = [key, value];
	    }
	  } else {
	    newEntries.push([key, value]);
	  }

	  if (isEditable) {
	    this.entries = newEntries;
	    return this;
	  }

	  return new ArrayMapNode(ownerID, newEntries);
	};

	var BitmapIndexedNode = function BitmapIndexedNode(ownerID, bitmap, nodes) {
	  this.ownerID = ownerID;
	  this.bitmap = bitmap;
	  this.nodes = nodes;
	};

	BitmapIndexedNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
	  var bitmap = this.bitmap;
	  return (bitmap & bit) === 0
	    ? notSetValue
	    : this.nodes[popCount(bitmap & (bit - 1))].get(
	        shift + SHIFT,
	        keyHash,
	        key,
	        notSetValue
	      );
	};

	BitmapIndexedNode.prototype.update = function update$$1 (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var bit = 1 << keyHashFrag;
	  var bitmap = this.bitmap;
	  var exists = (bitmap & bit) !== 0;

	  if (!exists && value === NOT_SET) {
	    return this;
	  }

	  var idx = popCount(bitmap & (bit - 1));
	  var nodes = this.nodes;
	  var node = exists ? nodes[idx] : undefined;
	  var newNode = updateNode(
	    node,
	    ownerID,
	    shift + SHIFT,
	    keyHash,
	    key,
	    value,
	    didChangeSize,
	    didAlter
	  );

	  if (newNode === node) {
	    return this;
	  }

	  if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	    return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	  }

	  if (
	    exists &&
	    !newNode &&
	    nodes.length === 2 &&
	    isLeafNode(nodes[idx ^ 1])
	  ) {
	    return nodes[idx ^ 1];
	  }

	  if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	    return newNode;
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newBitmap = exists ? (newNode ? bitmap : bitmap ^ bit) : bitmap | bit;
	  var newNodes = exists
	    ? newNode
	      ? setAt(nodes, idx, newNode, isEditable)
	      : spliceOut(nodes, idx, isEditable)
	    : spliceIn(nodes, idx, newNode, isEditable);

	  if (isEditable) {
	    this.bitmap = newBitmap;
	    this.nodes = newNodes;
	    return this;
	  }

	  return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	};

	var HashArrayMapNode = function HashArrayMapNode(ownerID, count, nodes) {
	  this.ownerID = ownerID;
	  this.count = count;
	  this.nodes = nodes;
	};

	HashArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var node = this.nodes[idx];
	  return node
	    ? node.get(shift + SHIFT, keyHash, key, notSetValue)
	    : notSetValue;
	};

	HashArrayMapNode.prototype.update = function update$$1 (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }
	  var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	  var removed = value === NOT_SET;
	  var nodes = this.nodes;
	  var node = nodes[idx];

	  if (removed && !node) {
	    return this;
	  }

	  var newNode = updateNode(
	    node,
	    ownerID,
	    shift + SHIFT,
	    keyHash,
	    key,
	    value,
	    didChangeSize,
	    didAlter
	  );
	  if (newNode === node) {
	    return this;
	  }

	  var newCount = this.count;
	  if (!node) {
	    newCount++;
	  } else if (!newNode) {
	    newCount--;
	    if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	      return packNodes(ownerID, nodes, newCount, idx);
	    }
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newNodes = setAt(nodes, idx, newNode, isEditable);

	  if (isEditable) {
	    this.count = newCount;
	    this.nodes = newNodes;
	    return this;
	  }

	  return new HashArrayMapNode(ownerID, newCount, newNodes);
	};

	var HashCollisionNode = function HashCollisionNode(ownerID, keyHash, entries) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entries = entries;
	};

	HashCollisionNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  var entries = this.entries;
	  for (var ii = 0, len = entries.length; ii < len; ii++) {
	    if (is(key, entries[ii][0])) {
	      return entries[ii][1];
	    }
	  }
	  return notSetValue;
	};

	HashCollisionNode.prototype.update = function update$$1 (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  if (keyHash === undefined) {
	    keyHash = hash(key);
	  }

	  var removed = value === NOT_SET;

	  if (keyHash !== this.keyHash) {
	    if (removed) {
	      return this;
	    }
	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	  }

	  var entries = this.entries;
	  var idx = 0;
	  var len = entries.length;
	  for (; idx < len; idx++) {
	    if (is(key, entries[idx][0])) {
	      break;
	    }
	  }
	  var exists = idx < len;

	  if (exists ? entries[idx][1] === value : removed) {
	    return this;
	  }

	  SetRef(didAlter);
	  (removed || !exists) && SetRef(didChangeSize);

	  if (removed && len === 2) {
	    return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	  }

	  var isEditable = ownerID && ownerID === this.ownerID;
	  var newEntries = isEditable ? entries : arrCopy(entries);

	  if (exists) {
	    if (removed) {
	      idx === len - 1
	        ? newEntries.pop()
	        : (newEntries[idx] = newEntries.pop());
	    } else {
	      newEntries[idx] = [key, value];
	    }
	  } else {
	    newEntries.push([key, value]);
	  }

	  if (isEditable) {
	    this.entries = newEntries;
	    return this;
	  }

	  return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	};

	var ValueNode = function ValueNode(ownerID, keyHash, entry) {
	  this.ownerID = ownerID;
	  this.keyHash = keyHash;
	  this.entry = entry;
	};

	ValueNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
	  return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	};

	ValueNode.prototype.update = function update$$1 (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	  var removed = value === NOT_SET;
	  var keyMatch = is(key, this.entry[0]);
	  if (keyMatch ? value === this.entry[1] : removed) {
	    return this;
	  }

	  SetRef(didAlter);

	  if (removed) {
	    SetRef(didChangeSize);
	    return; // undefined
	  }

	  if (keyMatch) {
	    if (ownerID && ownerID === this.ownerID) {
	      this.entry[1] = value;
	      return this;
	    }
	    return new ValueNode(ownerID, this.keyHash, [key, value]);
	  }

	  SetRef(didChangeSize);
	  return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	};

	// #pragma Iterators

	ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(
	  fn,
	  reverse
	) {
	  var entries = this.entries;
	  for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	    if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	      return false;
	    }
	  }
	};

	BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(
	  fn,
	  reverse
	) {
	  var nodes = this.nodes;
	  for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	    var node = nodes[reverse ? maxIndex - ii : ii];
	    if (node && node.iterate(fn, reverse) === false) {
	      return false;
	    }
	  }
	};

	// eslint-disable-next-line no-unused-vars
	ValueNode.prototype.iterate = function(fn, reverse) {
	  return fn(this.entry);
	};

	var MapIterator = (function (Iterator$$1) {
	  function MapIterator(map, type, reverse) {
	    this._type = type;
	    this._reverse = reverse;
	    this._stack = map._root && mapIteratorFrame(map._root);
	  }

	  if ( Iterator$$1 ) MapIterator.__proto__ = Iterator$$1;
	  MapIterator.prototype = Object.create( Iterator$$1 && Iterator$$1.prototype );
	  MapIterator.prototype.constructor = MapIterator;

	  MapIterator.prototype.next = function next () {
	    var this$1 = this;

	    var type = this._type;
	    var stack = this._stack;
	    while (stack) {
	      var node = stack.node;
	      var index = stack.index++;
	      var maxIndex = (void 0);
	      if (node.entry) {
	        if (index === 0) {
	          return mapIteratorValue(type, node.entry);
	        }
	      } else if (node.entries) {
	        maxIndex = node.entries.length - 1;
	        if (index <= maxIndex) {
	          return mapIteratorValue(
	            type,
	            node.entries[this$1._reverse ? maxIndex - index : index]
	          );
	        }
	      } else {
	        maxIndex = node.nodes.length - 1;
	        if (index <= maxIndex) {
	          var subNode = node.nodes[this$1._reverse ? maxIndex - index : index];
	          if (subNode) {
	            if (subNode.entry) {
	              return mapIteratorValue(type, subNode.entry);
	            }
	            stack = this$1._stack = mapIteratorFrame(subNode, stack);
	          }
	          continue;
	        }
	      }
	      stack = this$1._stack = this$1._stack.__prev;
	    }
	    return iteratorDone();
	  };

	  return MapIterator;
	}(Iterator));

	function mapIteratorValue(type, entry) {
	  return iteratorValue(type, entry[0], entry[1]);
	}

	function mapIteratorFrame(node, prev) {
	  return {
	    node: node,
	    index: 0,
	    __prev: prev
	  };
	}

	function makeMap(size, root, ownerID, hash$$1) {
	  var map = Object.create(MapPrototype);
	  map.size = size;
	  map._root = root;
	  map.__ownerID = ownerID;
	  map.__hash = hash$$1;
	  map.__altered = false;
	  return map;
	}

	var EMPTY_MAP;
	function emptyMap() {
	  return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	}

	function updateMap(map, k, v) {
	  var newRoot;
	  var newSize;
	  if (!map._root) {
	    if (v === NOT_SET) {
	      return map;
	    }
	    newSize = 1;
	    newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	  } else {
	    var didChangeSize = MakeRef(CHANGE_LENGTH);
	    var didAlter = MakeRef(DID_ALTER);
	    newRoot = updateNode(
	      map._root,
	      map.__ownerID,
	      0,
	      undefined,
	      k,
	      v,
	      didChangeSize,
	      didAlter
	    );
	    if (!didAlter.value) {
	      return map;
	    }
	    newSize = map.size + (didChangeSize.value ? (v === NOT_SET ? -1 : 1) : 0);
	  }
	  if (map.__ownerID) {
	    map.size = newSize;
	    map._root = newRoot;
	    map.__hash = undefined;
	    map.__altered = true;
	    return map;
	  }
	  return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	}

	function updateNode(
	  node,
	  ownerID,
	  shift,
	  keyHash,
	  key,
	  value,
	  didChangeSize,
	  didAlter
	) {
	  if (!node) {
	    if (value === NOT_SET) {
	      return node;
	    }
	    SetRef(didAlter);
	    SetRef(didChangeSize);
	    return new ValueNode(ownerID, keyHash, [key, value]);
	  }
	  return node.update(
	    ownerID,
	    shift,
	    keyHash,
	    key,
	    value,
	    didChangeSize,
	    didAlter
	  );
	}

	function isLeafNode(node) {
	  return (
	    node.constructor === ValueNode || node.constructor === HashCollisionNode
	  );
	}

	function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	  if (node.keyHash === keyHash) {
	    return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	  }

	  var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	  var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	  var newNode;
	  var nodes =
	    idx1 === idx2
	      ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)]
	      : ((newNode = new ValueNode(ownerID, keyHash, entry)),
	        idx1 < idx2 ? [node, newNode] : [newNode, node]);

	  return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
	}

	function createNodes(ownerID, entries, key, value) {
	  if (!ownerID) {
	    ownerID = new OwnerID();
	  }
	  var node = new ValueNode(ownerID, hash(key), [key, value]);
	  for (var ii = 0; ii < entries.length; ii++) {
	    var entry = entries[ii];
	    node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	  }
	  return node;
	}

	function packNodes(ownerID, nodes, count, excluding) {
	  var bitmap = 0;
	  var packedII = 0;
	  var packedNodes = new Array(count);
	  for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	    var node = nodes[ii];
	    if (node !== undefined && ii !== excluding) {
	      bitmap |= bit;
	      packedNodes[packedII++] = node;
	    }
	  }
	  return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	}

	function expandNodes(ownerID, nodes, bitmap, including, node) {
	  var count = 0;
	  var expandedNodes = new Array(SIZE);
	  for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	    expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	  }
	  expandedNodes[including] = node;
	  return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	}

	function popCount(x) {
	  x -= (x >> 1) & 0x55555555;
	  x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
	  x = (x + (x >> 4)) & 0x0f0f0f0f;
	  x += x >> 8;
	  x += x >> 16;
	  return x & 0x7f;
	}

	function setAt(array, idx, val, canEdit) {
	  var newArray = canEdit ? array : arrCopy(array);
	  newArray[idx] = val;
	  return newArray;
	}

	function spliceIn(array, idx, val, canEdit) {
	  var newLen = array.length + 1;
	  if (canEdit && idx + 1 === newLen) {
	    array[idx] = val;
	    return array;
	  }
	  var newArray = new Array(newLen);
	  var after = 0;
	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      newArray[ii] = val;
	      after = -1;
	    } else {
	      newArray[ii] = array[ii + after];
	    }
	  }
	  return newArray;
	}

	function spliceOut(array, idx, canEdit) {
	  var newLen = array.length - 1;
	  if (canEdit && idx === newLen) {
	    array.pop();
	    return array;
	  }
	  var newArray = new Array(newLen);
	  var after = 0;
	  for (var ii = 0; ii < newLen; ii++) {
	    if (ii === idx) {
	      after = 1;
	    }
	    newArray[ii] = array[ii + after];
	  }
	  return newArray;
	}

	var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	var List = (function (IndexedCollection$$1) {
	  function List(value) {
	    var empty = emptyList();
	    if (value === null || value === undefined) {
	      return empty;
	    }
	    if (isList(value)) {
	      return value;
	    }
	    var iter = IndexedCollection$$1(value);
	    var size = iter.size;
	    if (size === 0) {
	      return empty;
	    }
	    assertNotInfinite(size);
	    if (size > 0 && size < SIZE) {
	      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	    }
	    return empty.withMutations(function (list) {
	      list.setSize(size);
	      iter.forEach(function (v, i) { return list.set(i, v); });
	    });
	  }

	  if ( IndexedCollection$$1 ) List.__proto__ = IndexedCollection$$1;
	  List.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
	  List.prototype.constructor = List;

	  List.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  List.prototype.toString = function toString () {
	    return this.__toString('List [', ']');
	  };

	  // @pragma Access

	  List.prototype.get = function get (index, notSetValue) {
	    index = wrapIndex(this, index);
	    if (index >= 0 && index < this.size) {
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    }
	    return notSetValue;
	  };

	  // @pragma Modification

	  List.prototype.set = function set (index, value) {
	    return updateList(this, index, value);
	  };

	  List.prototype.remove = function remove (index) {
	    return !this.has(index)
	      ? this
	      : index === 0
	        ? this.shift()
	        : index === this.size - 1 ? this.pop() : this.splice(index, 1);
	  };

	  List.prototype.insert = function insert (index, value) {
	    return this.splice(index, 0, value);
	  };

	  List.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = this._origin = this._capacity = 0;
	      this._level = SHIFT;
	      this._root = this._tail = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyList();
	  };

	  List.prototype.push = function push (/*...values*/) {
	    var values = arguments;
	    var oldSize = this.size;
	    return this.withMutations(function (list) {
	      setListBounds(list, 0, oldSize + values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(oldSize + ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.pop = function pop () {
	    return setListBounds(this, 0, -1);
	  };

	  List.prototype.unshift = function unshift (/*...values*/) {
	    var values = arguments;
	    return this.withMutations(function (list) {
	      setListBounds(list, -values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.shift = function shift () {
	    return setListBounds(this, 1);
	  };

	  // @pragma Composition

	  List.prototype.concat = function concat (/*...collections*/) {
	    var arguments$1 = arguments;

	    var seqs = [];
	    for (var i = 0; i < arguments.length; i++) {
	      var argument = arguments$1[i];
	      var seq = IndexedCollection$$1(
	        typeof argument !== 'string' && hasIterator(argument)
	          ? argument
	          : [argument]
	      );
	      if (seq.size !== 0) {
	        seqs.push(seq);
	      }
	    }
	    if (seqs.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
	      return this.constructor(seqs[0]);
	    }
	    return this.withMutations(function (list) {
	      seqs.forEach(function (seq) { return seq.forEach(function (value) { return list.push(value); }); });
	    });
	  };

	  List.prototype.setSize = function setSize (size) {
	    return setListBounds(this, 0, size);
	  };

	  // @pragma Iteration

	  List.prototype.slice = function slice (begin, end) {
	    var size = this.size;
	    if (wholeSlice(begin, end, size)) {
	      return this;
	    }
	    return setListBounds(
	      this,
	      resolveBegin(begin, size),
	      resolveEnd(end, size)
	    );
	  };

	  List.prototype.__iterator = function __iterator (type, reverse) {
	    var index = reverse ? this.size : 0;
	    var values = iterateList(this, reverse);
	    return new Iterator(function () {
	      var value = values();
	      return value === DONE
	        ? iteratorDone()
	        : iteratorValue(type, reverse ? --index : index++, value);
	    });
	  };

	  List.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var index = reverse ? this.size : 0;
	    var values = iterateList(this, reverse);
	    var value;
	    while ((value = values()) !== DONE) {
	      if (fn(value, reverse ? --index : index++, this$1) === false) {
	        break;
	      }
	    }
	    return index;
	  };

	  List.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyList();
	      }
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeList(
	      this._origin,
	      this._capacity,
	      this._level,
	      this._root,
	      this._tail,
	      ownerID,
	      this.__hash
	    );
	  };

	  return List;
	}(IndexedCollection));

	function isList(maybeList) {
	  return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	}

	List.isList = isList;

	var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	var ListPrototype = List.prototype;
	ListPrototype[IS_LIST_SENTINEL] = true;
	ListPrototype[DELETE] = ListPrototype.remove;
	ListPrototype.merge = ListPrototype.concat;
	ListPrototype.setIn = setIn$$1;
	ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
	ListPrototype.update = update$$1;
	ListPrototype.updateIn = updateIn$1;
	ListPrototype.mergeIn = mergeIn;
	ListPrototype.mergeDeepIn = mergeDeepIn;
	ListPrototype.withMutations = withMutations;
	ListPrototype.wasAltered = wasAltered;
	ListPrototype.asImmutable = asImmutable;
	ListPrototype['@@transducer/init'] = ListPrototype.asMutable = asMutable;
	ListPrototype['@@transducer/step'] = function(result, arr) {
	  return result.push(arr);
	};
	ListPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	var VNode = function VNode(array, ownerID) {
	  this.array = array;
	  this.ownerID = ownerID;
	};

	// TODO: seems like these methods are very similar

	VNode.prototype.removeBefore = function removeBefore (ownerID, level, index) {
	  if (index === level ? 1 << level : this.array.length === 0) {
	    return this;
	  }
	  var originIndex = (index >>> level) & MASK;
	  if (originIndex >= this.array.length) {
	    return new VNode([], ownerID);
	  }
	  var removingFirst = originIndex === 0;
	  var newChild;
	  if (level > 0) {
	    var oldChild = this.array[originIndex];
	    newChild =
	      oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	    if (newChild === oldChild && removingFirst) {
	      return this;
	    }
	  }
	  if (removingFirst && !newChild) {
	    return this;
	  }
	  var editable = editableVNode(this, ownerID);
	  if (!removingFirst) {
	    for (var ii = 0; ii < originIndex; ii++) {
	      editable.array[ii] = undefined;
	    }
	  }
	  if (newChild) {
	    editable.array[originIndex] = newChild;
	  }
	  return editable;
	};

	VNode.prototype.removeAfter = function removeAfter (ownerID, level, index) {
	  if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	    return this;
	  }
	  var sizeIndex = ((index - 1) >>> level) & MASK;
	  if (sizeIndex >= this.array.length) {
	    return this;
	  }

	  var newChild;
	  if (level > 0) {
	    var oldChild = this.array[sizeIndex];
	    newChild =
	      oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	    if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	      return this;
	    }
	  }

	  var editable = editableVNode(this, ownerID);
	  editable.array.splice(sizeIndex + 1);
	  if (newChild) {
	    editable.array[sizeIndex] = newChild;
	  }
	  return editable;
	};

	var DONE = {};

	function iterateList(list, reverse) {
	  var left = list._origin;
	  var right = list._capacity;
	  var tailPos = getTailOffset(right);
	  var tail = list._tail;

	  return iterateNodeOrLeaf(list._root, list._level, 0);

	  function iterateNodeOrLeaf(node, level, offset) {
	    return level === 0
	      ? iterateLeaf(node, offset)
	      : iterateNode(node, level, offset);
	  }

	  function iterateLeaf(node, offset) {
	    var array = offset === tailPos ? tail && tail.array : node && node.array;
	    var from = offset > left ? 0 : left - offset;
	    var to = right - offset;
	    if (to > SIZE) {
	      to = SIZE;
	    }
	    return function () {
	      if (from === to) {
	        return DONE;
	      }
	      var idx = reverse ? --to : from++;
	      return array && array[idx];
	    };
	  }

	  function iterateNode(node, level, offset) {
	    var values;
	    var array = node && node.array;
	    var from = offset > left ? 0 : (left - offset) >> level;
	    var to = ((right - offset) >> level) + 1;
	    if (to > SIZE) {
	      to = SIZE;
	    }
	    return function () {
	      while (true) {
	        if (values) {
	          var value = values();
	          if (value !== DONE) {
	            return value;
	          }
	          values = null;
	        }
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        values = iterateNodeOrLeaf(
	          array && array[idx],
	          level - SHIFT,
	          offset + (idx << level)
	        );
	      }
	    };
	  }
	}

	function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	  var list = Object.create(ListPrototype);
	  list.size = capacity - origin;
	  list._origin = origin;
	  list._capacity = capacity;
	  list._level = level;
	  list._root = root;
	  list._tail = tail;
	  list.__ownerID = ownerID;
	  list.__hash = hash;
	  list.__altered = false;
	  return list;
	}

	var EMPTY_LIST;
	function emptyList() {
	  return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	}

	function updateList(list, index, value) {
	  index = wrapIndex(list, index);

	  if (index !== index) {
	    return list;
	  }

	  if (index >= list.size || index < 0) {
	    return list.withMutations(function (list) {
	      index < 0
	        ? setListBounds(list, index).set(0, value)
	        : setListBounds(list, 0, index + 1).set(index, value);
	    });
	  }

	  index += list._origin;

	  var newTail = list._tail;
	  var newRoot = list._root;
	  var didAlter = MakeRef(DID_ALTER);
	  if (index >= getTailOffset(list._capacity)) {
	    newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	  } else {
	    newRoot = updateVNode(
	      newRoot,
	      list.__ownerID,
	      list._level,
	      index,
	      value,
	      didAlter
	    );
	  }

	  if (!didAlter.value) {
	    return list;
	  }

	  if (list.__ownerID) {
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }
	  return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	}

	function updateVNode(node, ownerID, level, index, value, didAlter) {
	  var idx = (index >>> level) & MASK;
	  var nodeHas = node && idx < node.array.length;
	  if (!nodeHas && value === undefined) {
	    return node;
	  }

	  var newNode;

	  if (level > 0) {
	    var lowerNode = node && node.array[idx];
	    var newLowerNode = updateVNode(
	      lowerNode,
	      ownerID,
	      level - SHIFT,
	      index,
	      value,
	      didAlter
	    );
	    if (newLowerNode === lowerNode) {
	      return node;
	    }
	    newNode = editableVNode(node, ownerID);
	    newNode.array[idx] = newLowerNode;
	    return newNode;
	  }

	  if (nodeHas && node.array[idx] === value) {
	    return node;
	  }

	  SetRef(didAlter);

	  newNode = editableVNode(node, ownerID);
	  if (value === undefined && idx === newNode.array.length - 1) {
	    newNode.array.pop();
	  } else {
	    newNode.array[idx] = value;
	  }
	  return newNode;
	}

	function editableVNode(node, ownerID) {
	  if (ownerID && node && ownerID === node.ownerID) {
	    return node;
	  }
	  return new VNode(node ? node.array.slice() : [], ownerID);
	}

	function listNodeFor(list, rawIndex) {
	  if (rawIndex >= getTailOffset(list._capacity)) {
	    return list._tail;
	  }
	  if (rawIndex < 1 << (list._level + SHIFT)) {
	    var node = list._root;
	    var level = list._level;
	    while (node && level > 0) {
	      node = node.array[(rawIndex >>> level) & MASK];
	      level -= SHIFT;
	    }
	    return node;
	  }
	}

	function setListBounds(list, begin, end) {
	  // Sanitize begin & end using this shorthand for ToInt32(argument)
	  // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	  if (begin !== undefined) {
	    begin |= 0;
	  }
	  if (end !== undefined) {
	    end |= 0;
	  }
	  var owner = list.__ownerID || new OwnerID();
	  var oldOrigin = list._origin;
	  var oldCapacity = list._capacity;
	  var newOrigin = oldOrigin + begin;
	  var newCapacity =
	    end === undefined
	      ? oldCapacity
	      : end < 0 ? oldCapacity + end : oldOrigin + end;
	  if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	    return list;
	  }

	  // If it's going to end after it starts, it's empty.
	  if (newOrigin >= newCapacity) {
	    return list.clear();
	  }

	  var newLevel = list._level;
	  var newRoot = list._root;

	  // New origin might need creating a higher root.
	  var offsetShift = 0;
	  while (newOrigin + offsetShift < 0) {
	    newRoot = new VNode(
	      newRoot && newRoot.array.length ? [undefined, newRoot] : [],
	      owner
	    );
	    newLevel += SHIFT;
	    offsetShift += 1 << newLevel;
	  }
	  if (offsetShift) {
	    newOrigin += offsetShift;
	    oldOrigin += offsetShift;
	    newCapacity += offsetShift;
	    oldCapacity += offsetShift;
	  }

	  var oldTailOffset = getTailOffset(oldCapacity);
	  var newTailOffset = getTailOffset(newCapacity);

	  // New size might need creating a higher root.
	  while (newTailOffset >= 1 << (newLevel + SHIFT)) {
	    newRoot = new VNode(
	      newRoot && newRoot.array.length ? [newRoot] : [],
	      owner
	    );
	    newLevel += SHIFT;
	  }

	  // Locate or create the new tail.
	  var oldTail = list._tail;
	  var newTail =
	    newTailOffset < oldTailOffset
	      ? listNodeFor(list, newCapacity - 1)
	      : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	  // Merge Tail into tree.
	  if (
	    oldTail &&
	    newTailOffset > oldTailOffset &&
	    newOrigin < oldCapacity &&
	    oldTail.array.length
	  ) {
	    newRoot = editableVNode(newRoot, owner);
	    var node = newRoot;
	    for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	      var idx = (oldTailOffset >>> level) & MASK;
	      node = node.array[idx] = editableVNode(node.array[idx], owner);
	    }
	    node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
	  }

	  // If the size has been reduced, there's a chance the tail needs to be trimmed.
	  if (newCapacity < oldCapacity) {
	    newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	  }

	  // If the new origin is within the tail, then we do not need a root.
	  if (newOrigin >= newTailOffset) {
	    newOrigin -= newTailOffset;
	    newCapacity -= newTailOffset;
	    newLevel = SHIFT;
	    newRoot = null;
	    newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	    // Otherwise, if the root has been trimmed, garbage collect.
	  } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	    offsetShift = 0;

	    // Identify the new top root node of the subtree of the old root.
	    while (newRoot) {
	      var beginIndex = (newOrigin >>> newLevel) & MASK;
	      if ((beginIndex !== newTailOffset >>> newLevel) & MASK) {
	        break;
	      }
	      if (beginIndex) {
	        offsetShift += (1 << newLevel) * beginIndex;
	      }
	      newLevel -= SHIFT;
	      newRoot = newRoot.array[beginIndex];
	    }

	    // Trim the new sides of the new root.
	    if (newRoot && newOrigin > oldOrigin) {
	      newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	    }
	    if (newRoot && newTailOffset < oldTailOffset) {
	      newRoot = newRoot.removeAfter(
	        owner,
	        newLevel,
	        newTailOffset - offsetShift
	      );
	    }
	    if (offsetShift) {
	      newOrigin -= offsetShift;
	      newCapacity -= offsetShift;
	    }
	  }

	  if (list.__ownerID) {
	    list.size = newCapacity - newOrigin;
	    list._origin = newOrigin;
	    list._capacity = newCapacity;
	    list._level = newLevel;
	    list._root = newRoot;
	    list._tail = newTail;
	    list.__hash = undefined;
	    list.__altered = true;
	    return list;
	  }
	  return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	}

	function getTailOffset(size) {
	  return size < SIZE ? 0 : ((size - 1) >>> SHIFT) << SHIFT;
	}

	var OrderedMap = (function (Map$$1) {
	  function OrderedMap(value) {
	    return value === null || value === undefined
	      ? emptyOrderedMap()
	      : isOrderedMap(value)
	        ? value
	        : emptyOrderedMap().withMutations(function (map) {
	            var iter = KeyedCollection(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v, k) { return map.set(k, v); });
	          });
	  }

	  if ( Map$$1 ) OrderedMap.__proto__ = Map$$1;
	  OrderedMap.prototype = Object.create( Map$$1 && Map$$1.prototype );
	  OrderedMap.prototype.constructor = OrderedMap;

	  OrderedMap.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  OrderedMap.prototype.toString = function toString () {
	    return this.__toString('OrderedMap {', '}');
	  };

	  // @pragma Access

	  OrderedMap.prototype.get = function get (k, notSetValue) {
	    var index = this._map.get(k);
	    return index !== undefined ? this._list.get(index)[1] : notSetValue;
	  };

	  // @pragma Modification

	  OrderedMap.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._map.clear();
	      this._list.clear();
	      return this;
	    }
	    return emptyOrderedMap();
	  };

	  OrderedMap.prototype.set = function set (k, v) {
	    return updateOrderedMap(this, k, v);
	  };

	  OrderedMap.prototype.remove = function remove (k) {
	    return updateOrderedMap(this, k, NOT_SET);
	  };

	  OrderedMap.prototype.wasAltered = function wasAltered () {
	    return this._map.wasAltered() || this._list.wasAltered();
	  };

	  OrderedMap.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._list.__iterate(
	      function (entry) { return entry && fn(entry[1], entry[0], this$1); },
	      reverse
	    );
	  };

	  OrderedMap.prototype.__iterator = function __iterator (type, reverse) {
	    return this._list.fromEntrySeq().__iterator(type, reverse);
	  };

	  OrderedMap.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    var newList = this._list.__ensureOwner(ownerID);
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyOrderedMap();
	      }
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      this._list = newList;
	      return this;
	    }
	    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	  };

	  return OrderedMap;
	}(Map$1));

	function isOrderedMap(maybeOrderedMap) {
	  return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	}

	OrderedMap.isOrderedMap = isOrderedMap;

	OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

	function makeOrderedMap(map, list, ownerID, hash) {
	  var omap = Object.create(OrderedMap.prototype);
	  omap.size = map ? map.size : 0;
	  omap._map = map;
	  omap._list = list;
	  omap.__ownerID = ownerID;
	  omap.__hash = hash;
	  return omap;
	}

	var EMPTY_ORDERED_MAP;
	function emptyOrderedMap() {
	  return (
	    EMPTY_ORDERED_MAP ||
	    (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()))
	  );
	}

	function updateOrderedMap(omap, k, v) {
	  var map = omap._map;
	  var list = omap._list;
	  var i = map.get(k);
	  var has = i !== undefined;
	  var newMap;
	  var newList;
	  if (v === NOT_SET) {
	    // removed
	    if (!has) {
	      return omap;
	    }
	    if (list.size >= SIZE && list.size >= map.size * 2) {
	      newList = list.filter(function (entry, idx) { return entry !== undefined && i !== idx; });
	      newMap = newList
	        .toKeyedSeq()
	        .map(function (entry) { return entry[0]; })
	        .flip()
	        .toMap();
	      if (omap.__ownerID) {
	        newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	      }
	    } else {
	      newMap = map.remove(k);
	      newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	    }
	  } else if (has) {
	    if (v === list.get(i)[1]) {
	      return omap;
	    }
	    newMap = map;
	    newList = list.set(i, [k, v]);
	  } else {
	    newMap = map.set(k, list.size);
	    newList = list.set(list.size, [k, v]);
	  }
	  if (omap.__ownerID) {
	    omap.size = newMap.size;
	    omap._map = newMap;
	    omap._list = newList;
	    omap.__hash = undefined;
	    return omap;
	  }
	  return makeOrderedMap(newMap, newList);
	}

	var Stack = (function (IndexedCollection$$1) {
	  function Stack(value) {
	    return value === null || value === undefined
	      ? emptyStack()
	      : isStack(value) ? value : emptyStack().pushAll(value);
	  }

	  if ( IndexedCollection$$1 ) Stack.__proto__ = IndexedCollection$$1;
	  Stack.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
	  Stack.prototype.constructor = Stack;

	  Stack.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  Stack.prototype.toString = function toString () {
	    return this.__toString('Stack [', ']');
	  };

	  // @pragma Access

	  Stack.prototype.get = function get (index, notSetValue) {
	    var head = this._head;
	    index = wrapIndex(this, index);
	    while (head && index--) {
	      head = head.next;
	    }
	    return head ? head.value : notSetValue;
	  };

	  Stack.prototype.peek = function peek () {
	    return this._head && this._head.value;
	  };

	  // @pragma Modification

	  Stack.prototype.push = function push (/*...values*/) {
	    var arguments$1 = arguments;

	    if (arguments.length === 0) {
	      return this;
	    }
	    var newSize = this.size + arguments.length;
	    var head = this._head;
	    for (var ii = arguments.length - 1; ii >= 0; ii--) {
	      head = {
	        value: arguments$1[ii],
	        next: head
	      };
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pushAll = function pushAll (iter) {
	    iter = IndexedCollection$$1(iter);
	    if (iter.size === 0) {
	      return this;
	    }
	    if (this.size === 0 && isStack(iter)) {
	      return iter;
	    }
	    assertNotInfinite(iter.size);
	    var newSize = this.size;
	    var head = this._head;
	    iter.__iterate(function (value) {
	      newSize++;
	      head = {
	        value: value,
	        next: head
	      };
	    }, /* reverse */ true);
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pop = function pop () {
	    return this.slice(1);
	  };

	  Stack.prototype.clear = function clear () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._head = undefined;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyStack();
	  };

	  Stack.prototype.slice = function slice (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);
	    if (resolvedEnd !== this.size) {
	      // super.slice(begin, end);
	      return IndexedCollection$$1.prototype.slice.call(this, begin, end);
	    }
	    var newSize = this.size - resolvedBegin;
	    var head = this._head;
	    while (resolvedBegin--) {
	      head = head.next;
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  // @pragma Mutability

	  Stack.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      if (this.size === 0) {
	        return emptyStack();
	      }
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeStack(this.size, this._head, ownerID, this.__hash);
	  };

	  // @pragma Iteration

	  Stack.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    if (reverse) {
	      return new ArraySeq(this.toArray()).__iterate(
	        function (v, k) { return fn(v, k, this$1); },
	        reverse
	      );
	    }
	    var iterations = 0;
	    var node = this._head;
	    while (node) {
	      if (fn(node.value, iterations++, this$1) === false) {
	        break;
	      }
	      node = node.next;
	    }
	    return iterations;
	  };

	  Stack.prototype.__iterator = function __iterator (type, reverse) {
	    if (reverse) {
	      return new ArraySeq(this.toArray()).__iterator(type, reverse);
	    }
	    var iterations = 0;
	    var node = this._head;
	    return new Iterator(function () {
	      if (node) {
	        var value = node.value;
	        node = node.next;
	        return iteratorValue(type, iterations++, value);
	      }
	      return iteratorDone();
	    });
	  };

	  return Stack;
	}(IndexedCollection));

	function isStack(maybeStack) {
	  return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	}

	Stack.isStack = isStack;

	var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	var StackPrototype = Stack.prototype;
	StackPrototype[IS_STACK_SENTINEL] = true;
	StackPrototype.shift = StackPrototype.pop;
	StackPrototype.unshift = StackPrototype.push;
	StackPrototype.unshiftAll = StackPrototype.pushAll;
	StackPrototype.withMutations = withMutations;
	StackPrototype.wasAltered = wasAltered;
	StackPrototype.asImmutable = asImmutable;
	StackPrototype['@@transducer/init'] = StackPrototype.asMutable = asMutable;
	StackPrototype['@@transducer/step'] = function(result, arr) {
	  return result.unshift(arr);
	};
	StackPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	function makeStack(size, head, ownerID, hash) {
	  var map = Object.create(StackPrototype);
	  map.size = size;
	  map._head = head;
	  map.__ownerID = ownerID;
	  map.__hash = hash;
	  map.__altered = false;
	  return map;
	}

	var EMPTY_STACK;
	function emptyStack() {
	  return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	}

	function deepEqual(a, b) {
	  if (a === b) {
	    return true;
	  }

	  if (
	    !isCollection(b) ||
	    (a.size !== undefined && b.size !== undefined && a.size !== b.size) ||
	    (a.__hash !== undefined &&
	      b.__hash !== undefined &&
	      a.__hash !== b.__hash) ||
	    isKeyed(a) !== isKeyed(b) ||
	    isIndexed(a) !== isIndexed(b) ||
	    isOrdered(a) !== isOrdered(b)
	  ) {
	    return false;
	  }

	  if (a.size === 0 && b.size === 0) {
	    return true;
	  }

	  var notAssociative = !isAssociative(a);

	  if (isOrdered(a)) {
	    var entries = a.entries();
	    return (
	      b.every(function (v, k) {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done
	    );
	  }

	  var flipped = false;

	  if (a.size === undefined) {
	    if (b.size === undefined) {
	      if (typeof a.cacheResult === 'function') {
	        a.cacheResult();
	      }
	    } else {
	      flipped = true;
	      var _ = a;
	      a = b;
	      b = _;
	    }
	  }

	  var allEqual = true;
	  var bSize = b.__iterate(function (v, k) {
	    if (
	      notAssociative
	        ? !a.has(v)
	        : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)
	    ) {
	      allEqual = false;
	      return false;
	    }
	  });

	  return allEqual && a.size === bSize;
	}

	/**
	 * Contributes additional methods to a constructor
	 */
	function mixin(ctor, methods) {
	  var keyCopier = function (key) {
	    ctor.prototype[key] = methods[key];
	  };
	  Object.keys(methods).forEach(keyCopier);
	  Object.getOwnPropertySymbols &&
	    Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	  return ctor;
	}

	function toJS(value) {
	  return isDataStructure(value)
	    ? Seq(value)
	        .map(toJS)
	        .toJSON()
	    : value;
	}

	var Set = (function (SetCollection$$1) {
	  function Set(value) {
	    return value === null || value === undefined
	      ? emptySet()
	      : isSet(value) && !isOrdered(value)
	        ? value
	        : emptySet().withMutations(function (set) {
	            var iter = SetCollection$$1(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v) { return set.add(v); });
	          });
	  }

	  if ( SetCollection$$1 ) Set.__proto__ = SetCollection$$1;
	  Set.prototype = Object.create( SetCollection$$1 && SetCollection$$1.prototype );
	  Set.prototype.constructor = Set;

	  Set.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  Set.fromKeys = function fromKeys (value) {
	    return this(KeyedCollection(value).keySeq());
	  };

	  Set.intersect = function intersect (sets) {
	    sets = Collection(sets).toArray();
	    return sets.length
	      ? SetPrototype.intersect.apply(Set(sets.pop()), sets)
	      : emptySet();
	  };

	  Set.union = function union (sets) {
	    sets = Collection(sets).toArray();
	    return sets.length
	      ? SetPrototype.union.apply(Set(sets.pop()), sets)
	      : emptySet();
	  };

	  Set.prototype.toString = function toString () {
	    return this.__toString('Set {', '}');
	  };

	  // @pragma Access

	  Set.prototype.has = function has (value) {
	    return this._map.has(value);
	  };

	  // @pragma Modification

	  Set.prototype.add = function add (value) {
	    return updateSet(this, this._map.set(value, value));
	  };

	  Set.prototype.remove = function remove (value) {
	    return updateSet(this, this._map.remove(value));
	  };

	  Set.prototype.clear = function clear () {
	    return updateSet(this, this._map.clear());
	  };

	  // @pragma Composition

	  Set.prototype.union = function union () {
	    var iters = [], len = arguments.length;
	    while ( len-- ) iters[ len ] = arguments[ len ];

	    iters = iters.filter(function (x) { return x.size !== 0; });
	    if (iters.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	      return this.constructor(iters[0]);
	    }
	    return this.withMutations(function (set) {
	      for (var ii = 0; ii < iters.length; ii++) {
	        SetCollection$$1(iters[ii]).forEach(function (value) { return set.add(value); });
	      }
	    });
	  };

	  Set.prototype.intersect = function intersect () {
	    var iters = [], len = arguments.length;
	    while ( len-- ) iters[ len ] = arguments[ len ];

	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) { return SetCollection$$1(iter); });
	    var toRemove = [];
	    this.forEach(function (value) {
	      if (!iters.every(function (iter) { return iter.includes(value); })) {
	        toRemove.push(value);
	      }
	    });
	    return this.withMutations(function (set) {
	      toRemove.forEach(function (value) {
	        set.remove(value);
	      });
	    });
	  };

	  Set.prototype.subtract = function subtract () {
	    var iters = [], len = arguments.length;
	    while ( len-- ) iters[ len ] = arguments[ len ];

	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) { return SetCollection$$1(iter); });
	    var toRemove = [];
	    this.forEach(function (value) {
	      if (iters.some(function (iter) { return iter.includes(value); })) {
	        toRemove.push(value);
	      }
	    });
	    return this.withMutations(function (set) {
	      toRemove.forEach(function (value) {
	        set.remove(value);
	      });
	    });
	  };

	  Set.prototype.sort = function sort (comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator));
	  };

	  Set.prototype.sortBy = function sortBy (mapper, comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator, mapper));
	  };

	  Set.prototype.wasAltered = function wasAltered () {
	    return this._map.wasAltered();
	  };

	  Set.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    return this._map.__iterate(function (k) { return fn(k, k, this$1); }, reverse);
	  };

	  Set.prototype.__iterator = function __iterator (type, reverse) {
	    return this._map.__iterator(type, reverse);
	  };

	  Set.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      if (this.size === 0) {
	        return this.__empty();
	      }
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return this.__make(newMap, ownerID);
	  };

	  return Set;
	}(SetCollection));

	function isSet(maybeSet) {
	  return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	}

	Set.isSet = isSet;

	var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	var SetPrototype = Set.prototype;
	SetPrototype[IS_SET_SENTINEL] = true;
	SetPrototype[DELETE] = SetPrototype.remove;
	SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
	SetPrototype.withMutations = withMutations;
	SetPrototype.asImmutable = asImmutable;
	SetPrototype['@@transducer/init'] = SetPrototype.asMutable = asMutable;
	SetPrototype['@@transducer/step'] = function(result, arr) {
	  return result.add(arr);
	};
	SetPrototype['@@transducer/result'] = function(obj) {
	  return obj.asImmutable();
	};

	SetPrototype.__empty = emptySet;
	SetPrototype.__make = makeSet;

	function updateSet(set, newMap) {
	  if (set.__ownerID) {
	    set.size = newMap.size;
	    set._map = newMap;
	    return set;
	  }
	  return newMap === set._map
	    ? set
	    : newMap.size === 0 ? set.__empty() : set.__make(newMap);
	}

	function makeSet(map, ownerID) {
	  var set = Object.create(SetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}

	var EMPTY_SET;
	function emptySet() {
	  return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	}

	/**
	 * Returns a lazy seq of nums from start (inclusive) to end
	 * (exclusive), by step, where start defaults to 0, step to 1, and end to
	 * infinity. When start is equal to end, returns empty list.
	 */
	var Range = (function (IndexedSeq$$1) {
	  function Range(start, end, step) {
	    if (!(this instanceof Range)) {
	      return new Range(start, end, step);
	    }
	    invariant(step !== 0, 'Cannot step a Range by 0');
	    start = start || 0;
	    if (end === undefined) {
	      end = Infinity;
	    }
	    step = step === undefined ? 1 : Math.abs(step);
	    if (end < start) {
	      step = -step;
	    }
	    this._start = start;
	    this._end = end;
	    this._step = step;
	    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	    if (this.size === 0) {
	      if (EMPTY_RANGE) {
	        return EMPTY_RANGE;
	      }
	      EMPTY_RANGE = this;
	    }
	  }

	  if ( IndexedSeq$$1 ) Range.__proto__ = IndexedSeq$$1;
	  Range.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
	  Range.prototype.constructor = Range;

	  Range.prototype.toString = function toString () {
	    if (this.size === 0) {
	      return 'Range []';
	    }
	    return (
	      'Range [ ' +
	      this._start +
	      '...' +
	      this._end +
	      (this._step !== 1 ? ' by ' + this._step : '') +
	      ' ]'
	    );
	  };

	  Range.prototype.get = function get (index, notSetValue) {
	    return this.has(index)
	      ? this._start + wrapIndex(this, index) * this._step
	      : notSetValue;
	  };

	  Range.prototype.includes = function includes (searchValue) {
	    var possibleIndex = (searchValue - this._start) / this._step;
	    return (
	      possibleIndex >= 0 &&
	      possibleIndex < this.size &&
	      possibleIndex === Math.floor(possibleIndex)
	    );
	  };

	  Range.prototype.slice = function slice (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    begin = resolveBegin(begin, this.size);
	    end = resolveEnd(end, this.size);
	    if (end <= begin) {
	      return new Range(0, 0);
	    }
	    return new Range(
	      this.get(begin, this._end),
	      this.get(end, this._end),
	      this._step
	    );
	  };

	  Range.prototype.indexOf = function indexOf (searchValue) {
	    var offsetValue = searchValue - this._start;
	    if (offsetValue % this._step === 0) {
	      var index = offsetValue / this._step;
	      if (index >= 0 && index < this.size) {
	        return index;
	      }
	    }
	    return -1;
	  };

	  Range.prototype.lastIndexOf = function lastIndexOf (searchValue) {
	    return this.indexOf(searchValue);
	  };

	  Range.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var size = this.size;
	    var step = this._step;
	    var value = reverse ? this._start + (size - 1) * step : this._start;
	    var i = 0;
	    while (i !== size) {
	      if (fn(value, reverse ? size - ++i : i++, this$1) === false) {
	        break;
	      }
	      value += reverse ? -step : step;
	    }
	    return i;
	  };

	  Range.prototype.__iterator = function __iterator (type, reverse) {
	    var size = this.size;
	    var step = this._step;
	    var value = reverse ? this._start + (size - 1) * step : this._start;
	    var i = 0;
	    return new Iterator(function () {
	      if (i === size) {
	        return iteratorDone();
	      }
	      var v = value;
	      value += reverse ? -step : step;
	      return iteratorValue(type, reverse ? size - ++i : i++, v);
	    });
	  };

	  Range.prototype.equals = function equals (other) {
	    return other instanceof Range
	      ? this._start === other._start &&
	          this._end === other._end &&
	          this._step === other._step
	      : deepEqual(this, other);
	  };

	  return Range;
	}(IndexedSeq));

	var EMPTY_RANGE;

	function getIn$1(collection, searchKeyPath, notSetValue) {
	  var keyPath = coerceKeyPath(searchKeyPath);
	  var i = 0;
	  while (i !== keyPath.length) {
	    collection = get$1(collection, keyPath[i++], NOT_SET);
	    if (collection === NOT_SET) {
	      return notSetValue;
	    }
	  }
	  return collection;
	}

	function getIn$$1(searchKeyPath, notSetValue) {
	  return getIn$1(this, searchKeyPath, notSetValue);
	}

	function hasIn$1(collection, keyPath) {
	  return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
	}

	function hasIn$$1(searchKeyPath) {
	  return hasIn$1(this, searchKeyPath);
	}

	function toObject() {
	  assertNotInfinite(this.size);
	  var object = {};
	  this.__iterate(function (v, k) {
	    object[k] = v;
	  });
	  return object;
	}

	// Note: all of these methods are deprecated.
	Collection.isIterable = isCollection;
	Collection.isKeyed = isKeyed;
	Collection.isIndexed = isIndexed;
	Collection.isAssociative = isAssociative;
	Collection.isOrdered = isOrdered;

	Collection.Iterator = Iterator;

	mixin(Collection, {
	  // ### Conversion to other types

	  toArray: function toArray() {
	    assertNotInfinite(this.size);
	    var array = new Array(this.size || 0);
	    var useTuples = isKeyed(this);
	    var i = 0;
	    this.__iterate(function (v, k) {
	      // Keyed collections produce an array of tuples.
	      array[i++] = useTuples ? [k, v] : v;
	    });
	    return array;
	  },

	  toIndexedSeq: function toIndexedSeq() {
	    return new ToIndexedSequence(this);
	  },

	  toJS: function toJS$1() {
	    return toJS(this);
	  },

	  toKeyedSeq: function toKeyedSeq() {
	    return new ToKeyedSequence(this, true);
	  },

	  toMap: function toMap() {
	    // Use Late Binding here to solve the circular dependency.
	    return Map$1(this.toKeyedSeq());
	  },

	  toObject: toObject,

	  toOrderedMap: function toOrderedMap() {
	    // Use Late Binding here to solve the circular dependency.
	    return OrderedMap(this.toKeyedSeq());
	  },

	  toOrderedSet: function toOrderedSet() {
	    // Use Late Binding here to solve the circular dependency.
	    return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	  },

	  toSet: function toSet() {
	    // Use Late Binding here to solve the circular dependency.
	    return Set(isKeyed(this) ? this.valueSeq() : this);
	  },

	  toSetSeq: function toSetSeq() {
	    return new ToSetSequence(this);
	  },

	  toSeq: function toSeq() {
	    return isIndexed(this)
	      ? this.toIndexedSeq()
	      : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
	  },

	  toStack: function toStack() {
	    // Use Late Binding here to solve the circular dependency.
	    return Stack(isKeyed(this) ? this.valueSeq() : this);
	  },

	  toList: function toList() {
	    // Use Late Binding here to solve the circular dependency.
	    return List(isKeyed(this) ? this.valueSeq() : this);
	  },

	  // ### Common JavaScript methods and properties

	  toString: function toString() {
	    return '[Collection]';
	  },

	  __toString: function __toString(head, tail) {
	    if (this.size === 0) {
	      return head + tail;
	    }
	    return (
	      head +
	      ' ' +
	      this.toSeq()
	        .map(this.__toStringMapper)
	        .join(', ') +
	      ' ' +
	      tail
	    );
	  },

	  // ### ES6 Collection methods (ES6 Array and Map)

	  concat: function concat() {
	    var values = [], len = arguments.length;
	    while ( len-- ) values[ len ] = arguments[ len ];

	    return reify(this, concatFactory(this, values));
	  },

	  includes: function includes(searchValue) {
	    return this.some(function (value) { return is(value, searchValue); });
	  },

	  entries: function entries() {
	    return this.__iterator(ITERATE_ENTRIES);
	  },

	  every: function every(predicate, context) {
	    assertNotInfinite(this.size);
	    var returnValue = true;
	    this.__iterate(function (v, k, c) {
	      if (!predicate.call(context, v, k, c)) {
	        returnValue = false;
	        return false;
	      }
	    });
	    return returnValue;
	  },

	  filter: function filter(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, true));
	  },

	  find: function find(predicate, context, notSetValue) {
	    var entry = this.findEntry(predicate, context);
	    return entry ? entry[1] : notSetValue;
	  },

	  forEach: function forEach(sideEffect, context) {
	    assertNotInfinite(this.size);
	    return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	  },

	  join: function join(separator) {
	    assertNotInfinite(this.size);
	    separator = separator !== undefined ? '' + separator : ',';
	    var joined = '';
	    var isFirst = true;
	    this.__iterate(function (v) {
	      isFirst ? (isFirst = false) : (joined += separator);
	      joined += v !== null && v !== undefined ? v.toString() : '';
	    });
	    return joined;
	  },

	  keys: function keys() {
	    return this.__iterator(ITERATE_KEYS);
	  },

	  map: function map(mapper, context) {
	    return reify(this, mapFactory(this, mapper, context));
	  },

	  reduce: function reduce$1(reducer, initialReduction, context) {
	    return reduce(
	      this,
	      reducer,
	      initialReduction,
	      context,
	      arguments.length < 2,
	      false
	    );
	  },

	  reduceRight: function reduceRight(reducer, initialReduction, context) {
	    return reduce(
	      this,
	      reducer,
	      initialReduction,
	      context,
	      arguments.length < 2,
	      true
	    );
	  },

	  reverse: function reverse() {
	    return reify(this, reverseFactory(this, true));
	  },

	  slice: function slice(begin, end) {
	    return reify(this, sliceFactory(this, begin, end, true));
	  },

	  some: function some(predicate, context) {
	    return !this.every(not(predicate), context);
	  },

	  sort: function sort(comparator) {
	    return reify(this, sortFactory(this, comparator));
	  },

	  values: function values() {
	    return this.__iterator(ITERATE_VALUES);
	  },

	  // ### More sequential methods

	  butLast: function butLast() {
	    return this.slice(0, -1);
	  },

	  isEmpty: function isEmpty() {
	    return this.size !== undefined ? this.size === 0 : !this.some(function () { return true; });
	  },

	  count: function count(predicate, context) {
	    return ensureSize(
	      predicate ? this.toSeq().filter(predicate, context) : this
	    );
	  },

	  countBy: function countBy(grouper, context) {
	    return countByFactory(this, grouper, context);
	  },

	  equals: function equals(other) {
	    return deepEqual(this, other);
	  },

	  entrySeq: function entrySeq() {
	    var collection = this;
	    if (collection._cache) {
	      // We cache as an entries array, so we can just return the cache!
	      return new ArraySeq(collection._cache);
	    }
	    var entriesSequence = collection
	      .toSeq()
	      .map(entryMapper)
	      .toIndexedSeq();
	    entriesSequence.fromEntrySeq = function () { return collection.toSeq(); };
	    return entriesSequence;
	  },

	  filterNot: function filterNot(predicate, context) {
	    return this.filter(not(predicate), context);
	  },

	  findEntry: function findEntry(predicate, context, notSetValue) {
	    var found = notSetValue;
	    this.__iterate(function (v, k, c) {
	      if (predicate.call(context, v, k, c)) {
	        found = [k, v];
	        return false;
	      }
	    });
	    return found;
	  },

	  findKey: function findKey(predicate, context) {
	    var entry = this.findEntry(predicate, context);
	    return entry && entry[0];
	  },

	  findLast: function findLast(predicate, context, notSetValue) {
	    return this.toKeyedSeq()
	      .reverse()
	      .find(predicate, context, notSetValue);
	  },

	  findLastEntry: function findLastEntry(predicate, context, notSetValue) {
	    return this.toKeyedSeq()
	      .reverse()
	      .findEntry(predicate, context, notSetValue);
	  },

	  findLastKey: function findLastKey(predicate, context) {
	    return this.toKeyedSeq()
	      .reverse()
	      .findKey(predicate, context);
	  },

	  first: function first() {
	    return this.find(returnTrue);
	  },

	  flatMap: function flatMap(mapper, context) {
	    return reify(this, flatMapFactory(this, mapper, context));
	  },

	  flatten: function flatten(depth) {
	    return reify(this, flattenFactory(this, depth, true));
	  },

	  fromEntrySeq: function fromEntrySeq() {
	    return new FromEntriesSequence(this);
	  },

	  get: function get(searchKey, notSetValue) {
	    return this.find(function (_, key) { return is(key, searchKey); }, undefined, notSetValue);
	  },

	  getIn: getIn$$1,

	  groupBy: function groupBy(grouper, context) {
	    return groupByFactory(this, grouper, context);
	  },

	  has: function has(searchKey) {
	    return this.get(searchKey, NOT_SET) !== NOT_SET;
	  },

	  hasIn: hasIn$$1,

	  isSubset: function isSubset(iter) {
	    iter = typeof iter.includes === 'function' ? iter : Collection(iter);
	    return this.every(function (value) { return iter.includes(value); });
	  },

	  isSuperset: function isSuperset(iter) {
	    iter = typeof iter.isSubset === 'function' ? iter : Collection(iter);
	    return iter.isSubset(this);
	  },

	  keyOf: function keyOf(searchValue) {
	    return this.findKey(function (value) { return is(value, searchValue); });
	  },

	  keySeq: function keySeq() {
	    return this.toSeq()
	      .map(keyMapper)
	      .toIndexedSeq();
	  },

	  last: function last() {
	    return this.toSeq()
	      .reverse()
	      .first();
	  },

	  lastKeyOf: function lastKeyOf(searchValue) {
	    return this.toKeyedSeq()
	      .reverse()
	      .keyOf(searchValue);
	  },

	  max: function max(comparator) {
	    return maxFactory(this, comparator);
	  },

	  maxBy: function maxBy(mapper, comparator) {
	    return maxFactory(this, comparator, mapper);
	  },

	  min: function min(comparator) {
	    return maxFactory(
	      this,
	      comparator ? neg(comparator) : defaultNegComparator
	    );
	  },

	  minBy: function minBy(mapper, comparator) {
	    return maxFactory(
	      this,
	      comparator ? neg(comparator) : defaultNegComparator,
	      mapper
	    );
	  },

	  rest: function rest() {
	    return this.slice(1);
	  },

	  skip: function skip(amount) {
	    return amount === 0 ? this : this.slice(Math.max(0, amount));
	  },

	  skipLast: function skipLast(amount) {
	    return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
	  },

	  skipWhile: function skipWhile(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, true));
	  },

	  skipUntil: function skipUntil(predicate, context) {
	    return this.skipWhile(not(predicate), context);
	  },

	  sortBy: function sortBy(mapper, comparator) {
	    return reify(this, sortFactory(this, comparator, mapper));
	  },

	  take: function take(amount) {
	    return this.slice(0, Math.max(0, amount));
	  },

	  takeLast: function takeLast(amount) {
	    return this.slice(-Math.max(0, amount));
	  },

	  takeWhile: function takeWhile(predicate, context) {
	    return reify(this, takeWhileFactory(this, predicate, context));
	  },

	  takeUntil: function takeUntil(predicate, context) {
	    return this.takeWhile(not(predicate), context);
	  },

	  update: function update(fn) {
	    return fn(this);
	  },

	  valueSeq: function valueSeq() {
	    return this.toIndexedSeq();
	  },

	  // ### Hashable Object

	  hashCode: function hashCode() {
	    return this.__hash || (this.__hash = hashCollection(this));
	  }

	  // ### Internal

	  // abstract __iterate(fn, reverse)

	  // abstract __iterator(type, reverse)
	});

	var CollectionPrototype = Collection.prototype;
	CollectionPrototype[IS_ITERABLE_SENTINEL] = true;
	CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
	CollectionPrototype.toJSON = CollectionPrototype.toArray;
	CollectionPrototype.__toStringMapper = quoteString;
	CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
	  return this.toString();
	};
	CollectionPrototype.chain = CollectionPrototype.flatMap;
	CollectionPrototype.contains = CollectionPrototype.includes;

	mixin(KeyedCollection, {
	  // ### More sequential methods

	  flip: function flip() {
	    return reify(this, flipFactory(this));
	  },

	  mapEntries: function mapEntries(mapper, context) {
	    var this$1 = this;

	    var iterations = 0;
	    return reify(
	      this,
	      this.toSeq()
	        .map(function (v, k) { return mapper.call(context, [k, v], iterations++, this$1); })
	        .fromEntrySeq()
	    );
	  },

	  mapKeys: function mapKeys(mapper, context) {
	    var this$1 = this;

	    return reify(
	      this,
	      this.toSeq()
	        .flip()
	        .map(function (k, v) { return mapper.call(context, k, v, this$1); })
	        .flip()
	    );
	  }
	});

	var KeyedCollectionPrototype = KeyedCollection.prototype;
	KeyedCollectionPrototype[IS_KEYED_SENTINEL] = true;
	KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
	KeyedCollectionPrototype.toJSON = toObject;
	KeyedCollectionPrototype.__toStringMapper = function (v, k) { return quoteString(k) + ': ' + quoteString(v); };

	mixin(IndexedCollection, {
	  // ### Conversion to other types

	  toKeyedSeq: function toKeyedSeq() {
	    return new ToKeyedSequence(this, false);
	  },

	  // ### ES6 Collection methods (ES6 Array and Map)

	  filter: function filter(predicate, context) {
	    return reify(this, filterFactory(this, predicate, context, false));
	  },

	  findIndex: function findIndex(predicate, context) {
	    var entry = this.findEntry(predicate, context);
	    return entry ? entry[0] : -1;
	  },

	  indexOf: function indexOf(searchValue) {
	    var key = this.keyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },

	  lastIndexOf: function lastIndexOf(searchValue) {
	    var key = this.lastKeyOf(searchValue);
	    return key === undefined ? -1 : key;
	  },

	  reverse: function reverse() {
	    return reify(this, reverseFactory(this, false));
	  },

	  slice: function slice(begin, end) {
	    return reify(this, sliceFactory(this, begin, end, false));
	  },

	  splice: function splice(index, removeNum /*, ...values*/) {
	    var numArgs = arguments.length;
	    removeNum = Math.max(removeNum || 0, 0);
	    if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
	      return this;
	    }
	    // If index is negative, it should resolve relative to the size of the
	    // collection. However size may be expensive to compute if not cached, so
	    // only call count() if the number is in fact negative.
	    index = resolveBegin(index, index < 0 ? this.count() : this.size);
	    var spliced = this.slice(0, index);
	    return reify(
	      this,
	      numArgs === 1
	        ? spliced
	        : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
	    );
	  },

	  // ### More collection methods

	  findLastIndex: function findLastIndex(predicate, context) {
	    var entry = this.findLastEntry(predicate, context);
	    return entry ? entry[0] : -1;
	  },

	  first: function first() {
	    return this.get(0);
	  },

	  flatten: function flatten(depth) {
	    return reify(this, flattenFactory(this, depth, false));
	  },

	  get: function get(index, notSetValue) {
	    index = wrapIndex(this, index);
	    return index < 0 ||
	      (this.size === Infinity || (this.size !== undefined && index > this.size))
	      ? notSetValue
	      : this.find(function (_, key) { return key === index; }, undefined, notSetValue);
	  },

	  has: function has(index) {
	    index = wrapIndex(this, index);
	    return (
	      index >= 0 &&
	      (this.size !== undefined
	        ? this.size === Infinity || index < this.size
	        : this.indexOf(index) !== -1)
	    );
	  },

	  interpose: function interpose(separator) {
	    return reify(this, interposeFactory(this, separator));
	  },

	  interleave: function interleave(/*...collections*/) {
	    var collections = [this].concat(arrCopy(arguments));
	    var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
	    var interleaved = zipped.flatten(true);
	    if (zipped.size) {
	      interleaved.size = zipped.size * collections.length;
	    }
	    return reify(this, interleaved);
	  },

	  keySeq: function keySeq() {
	    return Range(0, this.size);
	  },

	  last: function last() {
	    return this.get(-1);
	  },

	  skipWhile: function skipWhile(predicate, context) {
	    return reify(this, skipWhileFactory(this, predicate, context, false));
	  },

	  zip: function zip(/*, ...collections */) {
	    var collections = [this].concat(arrCopy(arguments));
	    return reify(this, zipWithFactory(this, defaultZipper, collections));
	  },

	  zipAll: function zipAll(/*, ...collections */) {
	    var collections = [this].concat(arrCopy(arguments));
	    return reify(this, zipWithFactory(this, defaultZipper, collections, true));
	  },

	  zipWith: function zipWith(zipper /*, ...collections */) {
	    var collections = arrCopy(arguments);
	    collections[0] = this;
	    return reify(this, zipWithFactory(this, zipper, collections));
	  }
	});

	var IndexedCollectionPrototype = IndexedCollection.prototype;
	IndexedCollectionPrototype[IS_INDEXED_SENTINEL] = true;
	IndexedCollectionPrototype[IS_ORDERED_SENTINEL] = true;

	mixin(SetCollection, {
	  // ### ES6 Collection methods (ES6 Array and Map)

	  get: function get(value, notSetValue) {
	    return this.has(value) ? value : notSetValue;
	  },

	  includes: function includes(value) {
	    return this.has(value);
	  },

	  // ### More sequential methods

	  keySeq: function keySeq() {
	    return this.valueSeq();
	  }
	});

	SetCollection.prototype.has = CollectionPrototype.includes;
	SetCollection.prototype.contains = SetCollection.prototype.includes;

	// Mixin subclasses

	mixin(KeyedSeq, KeyedCollection.prototype);
	mixin(IndexedSeq, IndexedCollection.prototype);
	mixin(SetSeq, SetCollection.prototype);

	// #pragma Helper functions

	function reduce(collection, reducer, reduction, context, useFirst, reverse) {
	  assertNotInfinite(collection.size);
	  collection.__iterate(function (v, k, c) {
	    if (useFirst) {
	      useFirst = false;
	      reduction = v;
	    } else {
	      reduction = reducer.call(context, reduction, v, k, c);
	    }
	  }, reverse);
	  return reduction;
	}

	function keyMapper(v, k) {
	  return k;
	}

	function entryMapper(v, k) {
	  return [k, v];
	}

	function not(predicate) {
	  return function() {
	    return !predicate.apply(this, arguments);
	  };
	}

	function neg(predicate) {
	  return function() {
	    return -predicate.apply(this, arguments);
	  };
	}

	function defaultZipper() {
	  return arrCopy(arguments);
	}

	function defaultNegComparator(a, b) {
	  return a < b ? 1 : a > b ? -1 : 0;
	}

	function hashCollection(collection) {
	  if (collection.size === Infinity) {
	    return 0;
	  }
	  var ordered = isOrdered(collection);
	  var keyed = isKeyed(collection);
	  var h = ordered ? 1 : 0;
	  var size = collection.__iterate(
	    keyed
	      ? ordered
	        ? function (v, k) {
	            h = (31 * h + hashMerge(hash(v), hash(k))) | 0;
	          }
	        : function (v, k) {
	            h = (h + hashMerge(hash(v), hash(k))) | 0;
	          }
	      : ordered
	        ? function (v) {
	            h = (31 * h + hash(v)) | 0;
	          }
	        : function (v) {
	            h = (h + hash(v)) | 0;
	          }
	  );
	  return murmurHashOfSize(size, h);
	}

	function murmurHashOfSize(size, h) {
	  h = imul(h, 0xcc9e2d51);
	  h = imul((h << 15) | (h >>> -15), 0x1b873593);
	  h = imul((h << 13) | (h >>> -13), 5);
	  h = ((h + 0xe6546b64) | 0) ^ size;
	  h = imul(h ^ (h >>> 16), 0x85ebca6b);
	  h = imul(h ^ (h >>> 13), 0xc2b2ae35);
	  h = smi(h ^ (h >>> 16));
	  return h;
	}

	function hashMerge(a, b) {
	  return (a ^ (b + 0x9e3779b9 + (a << 6) + (a >> 2))) | 0; // int
	}

	var OrderedSet = (function (Set$$1) {
	  function OrderedSet(value) {
	    return value === null || value === undefined
	      ? emptyOrderedSet()
	      : isOrderedSet(value)
	        ? value
	        : emptyOrderedSet().withMutations(function (set) {
	            var iter = SetCollection(value);
	            assertNotInfinite(iter.size);
	            iter.forEach(function (v) { return set.add(v); });
	          });
	  }

	  if ( Set$$1 ) OrderedSet.__proto__ = Set$$1;
	  OrderedSet.prototype = Object.create( Set$$1 && Set$$1.prototype );
	  OrderedSet.prototype.constructor = OrderedSet;

	  OrderedSet.of = function of (/*...values*/) {
	    return this(arguments);
	  };

	  OrderedSet.fromKeys = function fromKeys (value) {
	    return this(KeyedCollection(value).keySeq());
	  };

	  OrderedSet.prototype.toString = function toString () {
	    return this.__toString('OrderedSet {', '}');
	  };

	  return OrderedSet;
	}(Set));

	function isOrderedSet(maybeOrderedSet) {
	  return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	}

	OrderedSet.isOrderedSet = isOrderedSet;

	var OrderedSetPrototype = OrderedSet.prototype;
	OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;
	OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
	OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;

	OrderedSetPrototype.__empty = emptyOrderedSet;
	OrderedSetPrototype.__make = makeOrderedSet;

	function makeOrderedSet(map, ownerID) {
	  var set = Object.create(OrderedSetPrototype);
	  set.size = map ? map.size : 0;
	  set._map = map;
	  set.__ownerID = ownerID;
	  return set;
	}

	var EMPTY_ORDERED_SET;
	function emptyOrderedSet() {
	  return (
	    EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()))
	  );
	}

	var Record = function Record(defaultValues, name) {
	  var hasInitialized;

	  var RecordType = function Record(values) {
	    var this$1 = this;

	    if (values instanceof RecordType) {
	      return values;
	    }
	    if (!(this instanceof RecordType)) {
	      return new RecordType(values);
	    }
	    if (!hasInitialized) {
	      hasInitialized = true;
	      var keys = Object.keys(defaultValues);
	      var indices = (RecordTypePrototype._indices = {});
	      RecordTypePrototype._name = name;
	      RecordTypePrototype._keys = keys;
	      RecordTypePrototype._defaultValues = defaultValues;
	      for (var i = 0; i < keys.length; i++) {
	        var propName = keys[i];
	        indices[propName] = i;
	        if (RecordTypePrototype[propName]) {
	          /* eslint-disable no-console */
	          typeof console === 'object' &&
	            console.warn &&
	            console.warn(
	              'Cannot define ' +
	                recordName(this$1) +
	                ' with property "' +
	                propName +
	                '" since that property name is part of the Record API.'
	            );
	          /* eslint-enable no-console */
	        } else {
	          setProp(RecordTypePrototype, propName);
	        }
	      }
	    }
	    this.__ownerID = undefined;
	    this._values = List().withMutations(function (l) {
	      l.setSize(this$1._keys.length);
	      KeyedCollection(values).forEach(function (v, k) {
	        l.set(this$1._indices[k], v === this$1._defaultValues[k] ? undefined : v);
	      });
	    });
	  };

	  var RecordTypePrototype = (RecordType.prototype = Object.create(
	    RecordPrototype
	  ));
	  RecordTypePrototype.constructor = RecordType;

	  return RecordType;
	};

	Record.prototype.toString = function toString () {
	    var this$1 = this;

	  var str = recordName(this) + ' { ';
	  var keys = this._keys;
	  var k;
	  for (var i = 0, l = keys.length; i !== l; i++) {
	    k = keys[i];
	    str += (i ? ', ' : '') + k + ': ' + quoteString(this$1.get(k));
	  }
	  return str + ' }';
	};

	Record.prototype.equals = function equals (other) {
	  return (
	    this === other ||
	    (other &&
	      this._keys === other._keys &&
	      recordSeq(this).equals(recordSeq(other)))
	  );
	};

	Record.prototype.hashCode = function hashCode () {
	  return recordSeq(this).hashCode();
	};

	// @pragma Access

	Record.prototype.has = function has (k) {
	  return this._indices.hasOwnProperty(k);
	};

	Record.prototype.get = function get (k, notSetValue) {
	  if (!this.has(k)) {
	    return notSetValue;
	  }
	  var index = this._indices[k];
	  var value = this._values.get(index);
	  return value === undefined ? this._defaultValues[k] : value;
	};

	// @pragma Modification

	Record.prototype.set = function set (k, v) {
	  if (this.has(k)) {
	    var newValues = this._values.set(
	      this._indices[k],
	      v === this._defaultValues[k] ? undefined : v
	    );
	    if (newValues !== this._values && !this.__ownerID) {
	      return makeRecord(this, newValues);
	    }
	  }
	  return this;
	};

	Record.prototype.remove = function remove (k) {
	  return this.set(k);
	};

	Record.prototype.clear = function clear () {
	  var newValues = this._values.clear().setSize(this._keys.length);
	  return this.__ownerID ? this : makeRecord(this, newValues);
	};

	Record.prototype.wasAltered = function wasAltered () {
	  return this._values.wasAltered();
	};

	Record.prototype.toSeq = function toSeq () {
	  return recordSeq(this);
	};

	Record.prototype.toJS = function toJS$1 () {
	  return toJS(this);
	};

	Record.prototype.entries = function entries () {
	  return this.__iterator(ITERATE_ENTRIES);
	};

	Record.prototype.__iterator = function __iterator (type, reverse) {
	  return recordSeq(this).__iterator(type, reverse);
	};

	Record.prototype.__iterate = function __iterate (fn, reverse) {
	  return recordSeq(this).__iterate(fn, reverse);
	};

	Record.prototype.__ensureOwner = function __ensureOwner (ownerID) {
	  if (ownerID === this.__ownerID) {
	    return this;
	  }
	  var newValues = this._values.__ensureOwner(ownerID);
	  if (!ownerID) {
	    this.__ownerID = ownerID;
	    this._values = newValues;
	    return this;
	  }
	  return makeRecord(this, newValues, ownerID);
	};

	Record.isRecord = isRecord;
	Record.getDescriptiveName = recordName;
	var RecordPrototype = Record.prototype;
	RecordPrototype[IS_RECORD_SENTINEL] = true;
	RecordPrototype[DELETE] = RecordPrototype.remove;
	RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
	RecordPrototype.getIn = getIn$$1;
	RecordPrototype.hasIn = CollectionPrototype.hasIn;
	RecordPrototype.merge = merge;
	RecordPrototype.mergeWith = mergeWith;
	RecordPrototype.mergeIn = mergeIn;
	RecordPrototype.mergeDeep = mergeDeep;
	RecordPrototype.mergeDeepWith = mergeDeepWith;
	RecordPrototype.mergeDeepIn = mergeDeepIn;
	RecordPrototype.setIn = setIn$$1;
	RecordPrototype.update = update$$1;
	RecordPrototype.updateIn = updateIn$1;
	RecordPrototype.withMutations = withMutations;
	RecordPrototype.asMutable = asMutable;
	RecordPrototype.asImmutable = asImmutable;
	RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
	RecordPrototype.toJSON = RecordPrototype.toObject =
	  CollectionPrototype.toObject;
	RecordPrototype.inspect = RecordPrototype.toSource = function() {
	  return this.toString();
	};

	function makeRecord(likeRecord, values, ownerID) {
	  var record = Object.create(Object.getPrototypeOf(likeRecord));
	  record._values = values;
	  record.__ownerID = ownerID;
	  return record;
	}

	function recordName(record) {
	  return record._name || record.constructor.name || 'Record';
	}

	function recordSeq(record) {
	  return keyedSeqFromValue(record._keys.map(function (k) { return [k, record.get(k)]; }));
	}

	function setProp(prototype, name) {
	  try {
	    Object.defineProperty(prototype, name, {
	      get: function() {
	        return this.get(name);
	      },
	      set: function(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  } catch (error) {
	    // Object.defineProperty failed. Probably IE8.
	  }
	}

	/**
	 * Returns a lazy Seq of `value` repeated `times` times. When `times` is
	 * undefined, returns an infinite sequence of `value`.
	 */
	var Repeat = (function (IndexedSeq$$1) {
	  function Repeat(value, times) {
	    if (!(this instanceof Repeat)) {
	      return new Repeat(value, times);
	    }
	    this._value = value;
	    this.size = times === undefined ? Infinity : Math.max(0, times);
	    if (this.size === 0) {
	      if (EMPTY_REPEAT) {
	        return EMPTY_REPEAT;
	      }
	      EMPTY_REPEAT = this;
	    }
	  }

	  if ( IndexedSeq$$1 ) Repeat.__proto__ = IndexedSeq$$1;
	  Repeat.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
	  Repeat.prototype.constructor = Repeat;

	  Repeat.prototype.toString = function toString () {
	    if (this.size === 0) {
	      return 'Repeat []';
	    }
	    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	  };

	  Repeat.prototype.get = function get (index, notSetValue) {
	    return this.has(index) ? this._value : notSetValue;
	  };

	  Repeat.prototype.includes = function includes (searchValue) {
	    return is(this._value, searchValue);
	  };

	  Repeat.prototype.slice = function slice (begin, end) {
	    var size = this.size;
	    return wholeSlice(begin, end, size)
	      ? this
	      : new Repeat(
	          this._value,
	          resolveEnd(end, size) - resolveBegin(begin, size)
	        );
	  };

	  Repeat.prototype.reverse = function reverse () {
	    return this;
	  };

	  Repeat.prototype.indexOf = function indexOf (searchValue) {
	    if (is(this._value, searchValue)) {
	      return 0;
	    }
	    return -1;
	  };

	  Repeat.prototype.lastIndexOf = function lastIndexOf (searchValue) {
	    if (is(this._value, searchValue)) {
	      return this.size;
	    }
	    return -1;
	  };

	  Repeat.prototype.__iterate = function __iterate (fn, reverse) {
	    var this$1 = this;

	    var size = this.size;
	    var i = 0;
	    while (i !== size) {
	      if (fn(this$1._value, reverse ? size - ++i : i++, this$1) === false) {
	        break;
	      }
	    }
	    return i;
	  };

	  Repeat.prototype.__iterator = function __iterator (type, reverse) {
	    var this$1 = this;

	    var size = this.size;
	    var i = 0;
	    return new Iterator(
	      function () { return i === size
	          ? iteratorDone()
	          : iteratorValue(type, reverse ? size - ++i : i++, this$1._value); }
	    );
	  };

	  Repeat.prototype.equals = function equals (other) {
	    return other instanceof Repeat
	      ? is(this._value, other._value)
	      : deepEqual(other);
	  };

	  return Repeat;
	}(IndexedSeq));

	var EMPTY_REPEAT;

	function fromJS(value, converter) {
	  return fromJSWith(
	    [],
	    converter || defaultConverter,
	    value,
	    '',
	    converter && converter.length > 2 ? [] : undefined,
	    { '': value }
	  );
	}

	function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
	  var toSeq = Array.isArray(value)
	    ? IndexedSeq
	    : isPlainObj(value) ? KeyedSeq : null;
	  if (toSeq) {
	    if (~stack.indexOf(value)) {
	      throw new TypeError('Cannot convert circular structure to Immutable');
	    }
	    stack.push(value);
	    keyPath && key !== '' && keyPath.push(key);
	    var converted = converter.call(
	      parentValue,
	      key,
	      toSeq(value).map(function (v, k) { return fromJSWith(stack, converter, v, k, keyPath, value); }
	      ),
	      keyPath && keyPath.slice()
	    );
	    stack.pop();
	    keyPath && keyPath.pop();
	    return converted;
	  }
	  return value;
	}

	function defaultConverter(k, v) {
	  return isKeyed(v) ? v.toMap() : v.toList();
	}

	var version$2 = "4.0.0-rc.9";

	// Functional read/write API
	var Immutable = {
	  version: version$2,

	  Collection: Collection,
	  // Note: Iterable is deprecated
	  Iterable: Collection,

	  Seq: Seq,
	  Map: Map$1,
	  OrderedMap: OrderedMap,
	  List: List,
	  Stack: Stack,
	  Set: Set,
	  OrderedSet: OrderedSet,

	  Record: Record,
	  Range: Range,
	  Repeat: Repeat,

	  is: is,
	  fromJS: fromJS,
	  hash: hash,

	  isImmutable: isImmutable,
	  isCollection: isCollection,
	  isKeyed: isKeyed,
	  isIndexed: isIndexed,
	  isAssociative: isAssociative,
	  isOrdered: isOrdered,
	  isValueObject: isValueObject,

	  get: get$1,
	  getIn: getIn$1,
	  has: has,
	  hasIn: hasIn$1,
	  merge: merge$1,
	  mergeDeep: mergeDeep$1,
	  mergeWith: mergeWith$1,
	  mergeDeepWith: mergeDeepWith$1,
	  remove: remove,
	  removeIn: removeIn,
	  set: set,
	  setIn: setIn$1,
	  update: update$1,
	  updateIn: updateIn
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var LOGIN = ethicalJobsRedux.createActionType('AUTH/LOGIN');
	var LOGOUT = ethicalJobsRedux.createActionType('AUTH/LOGOUT');
	var LOAD = ethicalJobsRedux.createActionType('AUTH/LOAD');
	var RECOVER = ethicalJobsRedux.createActionType('AUTH/RECOVER');
	var RESET = ethicalJobsRedux.createActionType('AUTH/RESET');
	var DO_THIS = ethicalJobsRedux.createActionType('AUTH/DO_THIS');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var login = function login(params) {
	  return {
	    type: LOGIN,
	    payload: Api.auth.login(params)
	  };
	};

	var logout = function logout() {
	  return {
	    type: LOGOUT,
	    payload: Api.auth.logout()
	  };
	};

	var load = function load() {
	  return {
	    type: LOAD,
	    payload: Api.auth.load()
	  };
	};

	var recover = function recover(params) {
	  return {
	    type: RECOVER,
	    payload: Api.auth.recoverPassword(params)
	  };
	};

	var reset = function reset(params) {
	  return {
	    type: RESET,
	    payload: Api.auth.resetPassword(params)
	  };
	};

	var actions$1 = /*#__PURE__*/Object.freeze({
		LOGIN: LOGIN,
		LOGOUT: LOGOUT,
		LOAD: LOAD,
		RECOVER: RECOVER,
		RESET: RESET,
		DO_THIS: DO_THIS,
		login: login,
		logout: logout,
		load: load,
		recover: recover,
		reset: reset
	});

	// Initial state
	var initialState = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Auth reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case ethicalJobsRedux.REQUEST(LOGIN):
	    case ethicalJobsRedux.REQUEST(LOGOUT):
	    case ethicalJobsRedux.REQUEST(LOAD):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(LOGIN):
	    case ethicalJobsRedux.SUCCESS(LOAD):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(LOGOUT):
	      return initialState;

	    case ethicalJobsRedux.FAILURE(LOGIN):
	    case ethicalJobsRedux.FAILURE(LOGOUT):
	    case ethicalJobsRedux.FAILURE(LOAD):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	function defaultEqualityCheck(a, b) {
	  return a === b;
	}

	function areArgumentsShallowlyEqual(equalityCheck, prev, next) {
	  if (prev === null || next === null || prev.length !== next.length) {
	    return false;
	  }

	  // Do this in a for loop (and not a `forEach` or an `every`) so we can determine equality as fast as possible.
	  var length = prev.length;
	  for (var i = 0; i < length; i++) {
	    if (!equalityCheck(prev[i], next[i])) {
	      return false;
	    }
	  }

	  return true;
	}

	function defaultMemoize(func) {
	  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;

	  var lastArgs = null;
	  var lastResult = null;
	  // we reference arguments instead of spreading them for performance reasons
	  return function () {
	    if (!areArgumentsShallowlyEqual(equalityCheck, lastArgs, arguments)) {
	      // apply arguments instead of spreading for performance.
	      lastResult = func.apply(null, arguments);
	    }

	    lastArgs = arguments;
	    return lastResult;
	  };
	}

	function getDependencies(funcs) {
	  var dependencies = Array.isArray(funcs[0]) ? funcs[0] : funcs;

	  if (!dependencies.every(function (dep) {
	    return typeof dep === 'function';
	  })) {
	    var dependencyTypes = dependencies.map(function (dep) {
	      return typeof dep;
	    }).join(', ');
	    throw new Error('Selector creators expect all input-selectors to be functions, ' + ('instead received the following types: [' + dependencyTypes + ']'));
	  }

	  return dependencies;
	}

	function createSelectorCreator(memoize) {
	  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    memoizeOptions[_key - 1] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      funcs[_key2] = arguments[_key2];
	    }

	    var recomputations = 0;
	    var resultFunc = funcs.pop();
	    var dependencies = getDependencies(funcs);

	    var memoizedResultFunc = memoize.apply(undefined, [function () {
	      recomputations++;
	      // apply arguments instead of spreading for performance.
	      return resultFunc.apply(null, arguments);
	    }].concat(memoizeOptions));

	    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
	    var selector = defaultMemoize(function () {
	      var params = [];
	      var length = dependencies.length;

	      for (var i = 0; i < length; i++) {
	        // apply arguments instead of spreading and mutate a local list of params for performance.
	        params.push(dependencies[i].apply(null, arguments));
	      }

	      // apply arguments instead of spreading for performance.
	      return memoizedResultFunc.apply(null, params);
	    });

	    selector.resultFunc = resultFunc;
	    selector.recomputations = function () {
	      return recomputations;
	    };
	    selector.resetRecomputations = function () {
	      return recomputations = 0;
	    };
	    return selector;
	  };
	}

	var createSelector = createSelectorCreator(defaultMemoize);

	var fetching = ethicalJobsRedux.SelectorFactory.create('auth', 'fetching');

	var error$1 = ethicalJobsRedux.SelectorFactory.create('auth', 'error');

	var result = ethicalJobsRedux.SelectorFactory.createResultSelector('auth');

	var results = ethicalJobsRedux.SelectorFactory.createResultsSelector('auth');

	var users = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('auth', 'users');

	var organisations = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('auth', 'organisations');

	var authedUser = ethicalJobsRedux.SelectorFactory.createIdSelector(users, result);

	var authedOrganisation = createSelector([organisations, authedUser], function (orgs, user) {
	  return orgs.get(user.get('organisation_id', '').toString());
	});

	var selectors = /*#__PURE__*/Object.freeze({
		fetching: fetching,
		error: error$1,
		result: result,
		results: results,
		users: users,
		organisations: organisations,
		authedUser: authedUser,
		authedOrganisation: authedOrganisation
	});

	var index = {
	  reducer: reducer,
	  actions: actions$1,
	  selectors: selectors
	};

	// Initial state
	var initialState$1 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  creditPacks: []
	});

	/**
	 * Credits reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer$1() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$1;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case ethicalJobsRedux.REQUEST(App.actions.FETCH_APP_DATA):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(App.actions.FETCH_APP_DATA):
	      return state.set('fetching', false).set('error', false).set('creditPacks', Immutable.fromJS(action.payload.data.creditPacks));

	    case ethicalJobsRedux.FAILURE(App.actions.FETCH_APP_DATA):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var PURCHASE = ethicalJobsRedux.createActionType('CREDITS/PURCHASE');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var purchase = function purchase(params) {
	  return {
	    type: PURCHASE,
	    payload: Api.post('/credits/purchase', params)
	  };
	};

	var actions$2 = /*#__PURE__*/Object.freeze({
		PURCHASE: PURCHASE,
		purchase: purchase
	});

	var fetching$1 = ethicalJobsRedux.SelectorFactory.create('credits', 'fetching');

	var error$2 = ethicalJobsRedux.SelectorFactory.create('credits', 'error');

	var creditPacks = function creditPacks(state) {
	  return state.getIn(['entities', 'credits', 'creditPacks']);
	};

	var selectors$1 = /*#__PURE__*/Object.freeze({
		fetching: fetching$1,
		error: error$2,
		creditPacks: creditPacks
	});

	var index$1 = {
	  reducer: reducer$1,
	  selectors: selectors$1,
	  actions: actions$2
	};

	// Initial state
	var initialState$2 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  enumerables: {}
	});

	/**
	 * Enumerables reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer$2() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$2;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case ethicalJobsRedux.REQUEST(App.actions.FETCH_APP_DATA):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(App.actions.FETCH_APP_DATA):
	      return state.set('fetching', false).set('error', false).set('enumerables', Immutable.fromJS(action.payload.data.enumerables));

	    case ethicalJobsRedux.FAILURE(App.actions.FETCH_APP_DATA):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	var fetching$2 = ethicalJobsRedux.SelectorFactory.create('enumerables', 'fetching');

	var error$3 = ethicalJobsRedux.SelectorFactory.create('enumerables', 'error');

	var enumerables = function enumerables(state) {
	  return state.getIn(['entities', 'enumerables', 'enumerables']);
	};

	var selectors$2 = /*#__PURE__*/Object.freeze({
		fetching: fetching$2,
		error: error$3,
		enumerables: enumerables
	});

	var index$2 = {
	  reducer: reducer$2,
	  selectors: selectors$2
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var FETCH_COLLECTION = ethicalJobsRedux.createActionType('INVOICES/FETCH_COLLECTION');
	var FETCH_ENTITY = ethicalJobsRedux.createActionType('INVOICES/FETCH_ENTITY');
	var SEARCH = ethicalJobsRedux.createActionType('INVOICES/SEARCH');
	var CREATE = ethicalJobsRedux.createActionType('INVOICES/CREATE');
	var UPDATE = ethicalJobsRedux.createActionType('INVOICES/UPDATE');
	var ARCHIVE = ethicalJobsRedux.createActionType('INVOICES/ARCHIVE');
	var RESTORE = ethicalJobsRedux.createActionType('INVOICES/RESTORE');
	var CLEAR_ENTITIES = ethicalJobsRedux.createActionType('INVOICES/CLEAR_ENTITIES');
	var UPDATE_FILTERS = ethicalJobsRedux.createActionType('INVOICES/UPDATE_FILTERS');
	var REPLACE_FILTERS = ethicalJobsRedux.createActionType('INVOICES/REPLACE_FILTERS');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchCollection = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION,
	    payload: Api.get('/invoices', params)
	  };
	};

	var fetchEntity = function fetchEntity(id) {
	  return {
	    type: FETCH_ENTITY,
	    payload: Api.get('/invoices/' + id)
	  };
	};

	var searchCollection = function searchCollection(params) {
	  return {
	    type: SEARCH,
	    payload: Api.search('invoices', params)
	  };
	};

	var create = function create(params) {
	  return {
	    type: CREATE,
	    payload: Api.post('/invoices', params)
	  };
	};

	var update = function update(id, params) {
	  return {
	    type: UPDATE,
	    payload: Api.put('/invoices/' + id, params)
	  };
	};

	var archive = function archive(id) {
	  return {
	    type: ARCHIVE,
	    payload: Api.archive('invoices', id)
	  };
	};

	var restore = function restore(id) {
	  return {
	    type: RESTORE,
	    payload: Api.restore('invoices', id)
	  };
	};

	/*
	|--------------------------------------------------------------------------
	| Sync Actions
	|--------------------------------------------------------------------------
	*/

	var clear = function clear() {
	  return {
	    type: CLEAR_ENTITIES
	  };
	};

	var updateFilters = function updateFilters(filters) {
	  return {
	    type: UPDATE_FILTERS,
	    payload: filters
	  };
	};

	var replaceFilters = function replaceFilters(filters) {
	  return {
	    type: REPLACE_FILTERS,
	    payload: filters
	  };
	};

	var actions$3 = /*#__PURE__*/Object.freeze({
		FETCH_COLLECTION: FETCH_COLLECTION,
		FETCH_ENTITY: FETCH_ENTITY,
		SEARCH: SEARCH,
		CREATE: CREATE,
		UPDATE: UPDATE,
		ARCHIVE: ARCHIVE,
		RESTORE: RESTORE,
		CLEAR_ENTITIES: CLEAR_ENTITIES,
		UPDATE_FILTERS: UPDATE_FILTERS,
		REPLACE_FILTERS: REPLACE_FILTERS,
		fetchCollection: fetchCollection,
		fetchEntity: fetchEntity,
		searchCollection: searchCollection,
		create: create,
		update: update,
		archive: archive,
		restore: restore,
		clear: clear,
		updateFilters: updateFilters,
		replaceFilters: replaceFilters
	});

	// Initial state
	var initialState$3 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Invoice reducer
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */
	function reducer$3() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$3;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case CLEAR_ENTITIES:
	      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

	    case UPDATE_FILTERS:
	      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

	    case ethicalJobsRedux.REQUEST(SEARCH):
	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION):
	    case ethicalJobsRedux.REQUEST(FETCH_ENTITY):
	    case ethicalJobsRedux.REQUEST(CREATE):
	    case ethicalJobsRedux.REQUEST(UPDATE):
	    case ethicalJobsRedux.REQUEST(ARCHIVE):
	    case ethicalJobsRedux.REQUEST(RESTORE):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY):
	    case ethicalJobsRedux.SUCCESS(CREATE):
	    case ethicalJobsRedux.SUCCESS(UPDATE):
	    case ethicalJobsRedux.SUCCESS(ARCHIVE):
	    case ethicalJobsRedux.SUCCESS(RESTORE):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION):
	    case ethicalJobsRedux.SUCCESS(SEARCH):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION):
	    case ethicalJobsRedux.FAILURE(FETCH_ENTITY):
	    case ethicalJobsRedux.FAILURE(CREATE):
	    case ethicalJobsRedux.FAILURE(UPDATE):
	    case ethicalJobsRedux.FAILURE(ARCHIVE):
	    case ethicalJobsRedux.FAILURE(RESTORE):
	    case ethicalJobsRedux.FAILURE(SEARCH):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	/**
	 * Returns invoices filtered by {organisationId}
	 * @param {Map} invoice entity
	 * @param {Number|Collection} organisations
	 * @returns {Bool}
	 */
	function byOrganisations(invoice, organisations) {
	  if (!organisations) {
	    return true; // pass through
	  }
	  if (Immutable.isCollection(organisations)) {
	    return organisations.includes(invoice.get('organisation_id'));
	  }
	  return invoice.get('organisation_id') === organisations;
	}

	/**
	 * Filters invoice entities
	 * @param {Map} Invoices to be filtered
	 * @param {Map} Filters to apply
	 * @returns {any} The filtered invoice state.
	 */
	function selectByFilters(invoices, filters) {
	  return invoices.filter(function (invoice) {
	    return byOrganisations(invoice, filters.get('organisations'));
	  });
	}

	var fetching$3 = ethicalJobsRedux.SelectorFactory.create('invoices', 'fetching');

	var error$4 = ethicalJobsRedux.SelectorFactory.create('invoices', 'error');

	var filters = ethicalJobsRedux.SelectorFactory.createFiltersSelector('invoices');

	var result$1 = ethicalJobsRedux.SelectorFactory.createResultSelector('invoices');

	var results$1 = ethicalJobsRedux.SelectorFactory.createResultsSelector('invoices');

	var invoices = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('invoices');

	var orderedInvoices = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(invoices, results$1);

	var invoiceByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(invoices, result$1);

	var filteredInvoices = createSelector([orderedInvoices, filters], selectByFilters);

	var selectors$3 = /*#__PURE__*/Object.freeze({
		fetching: fetching$3,
		error: error$4,
		filters: filters,
		result: result$1,
		results: results$1,
		invoices: invoices,
		orderedInvoices: orderedInvoices,
		invoiceByResult: invoiceByResult,
		filteredInvoices: filteredInvoices
	});

	var index$3 = {
	  reducer: reducer$3,
	  actions: actions$3,
	  selectors: selectors$3
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var FETCH_COLLECTION$1 = ethicalJobsRedux.createActionType('JOBS/FETCH_COLLECTION');
	var FETCH_ENTITY$1 = ethicalJobsRedux.createActionType('JOBS/FETCH_ENTITY');
	var SEARCH$1 = ethicalJobsRedux.createActionType('JOBS/SEARCH');
	var CREATE$1 = ethicalJobsRedux.createActionType('JOBS/CREATE');
	var UPDATE$1 = ethicalJobsRedux.createActionType('JOBS/UPDATE');
	var ARCHIVE$1 = ethicalJobsRedux.createActionType('JOBS/ARCHIVE');
	var RESTORE$1 = ethicalJobsRedux.createActionType('JOBS/RESTORE');
	var APPROVE = ethicalJobsRedux.createActionType('JOBS/APPROVE');
	var EXPIRE = ethicalJobsRedux.createActionType('JOBS/EXPIRE');
	var ATTACH = ethicalJobsRedux.createActionType('JOBS/ATTACH');
	var DETACH = ethicalJobsRedux.createActionType('JOBS/DETACH');
	var LOCK = ethicalJobsRedux.createActionType('JOBS/LOCK');
	var UNLOCK = ethicalJobsRedux.createActionType('JOBS/UNLOCK');
	var CLEAR_ENTITIES$1 = ethicalJobsRedux.createActionType('JOBS/CLEAR_ENTITIES');
	var UPDATE_FILTERS$1 = ethicalJobsRedux.createActionType('JOBS/UPDATE_FILTERS');
	var REPLACE_FILTERS$1 = ethicalJobsRedux.createActionType('JOBS/REPLACE_FILTERS');
	var CLEAR_FILTERS = ethicalJobsRedux.createActionType('JOBS/CLEAR_FILTERS');
	var UPDATE_SYNC_FILTERS = ethicalJobsRedux.createActionType('JOBS/UPDATE_SYNC_FILTERS');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchCollection$1 = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION$1,
	    payload: Api.get('/jobs', params)
	  };
	};

	var searchCollection$1 = function searchCollection(params) {
	  return {
	    type: SEARCH$1,
	    payload: Api.search('jobs', params)
	  };
	};

	var fetchEntity$1 = function fetchEntity(id) {
	  return {
	    type: FETCH_ENTITY$1,
	    payload: Api.get('/jobs/' + id)
	  };
	};

	var create$1 = function create(params) {
	  return {
	    type: CREATE$1,
	    payload: Api.post('/jobs', params)
	  };
	};

	var draft = function draft(params) {
	  return {
	    type: CREATE$1,
	    payload: Api.post('/jobs/drafts', params)
	  };
	};

	var update$2 = function update(id, params) {
	  return {
	    type: UPDATE$1,
	    payload: Api.put('/jobs/' + id, params)
	  };
	};

	var archive$1 = function archive(id) {
	  return {
	    type: ARCHIVE$1,
	    payload: Api.archive('jobs', id)
	  };
	};

	var restore$1 = function restore(id) {
	  return {
	    type: RESTORE$1,
	    payload: Api.restore('jobs', id)
	  };
	};

	var approve = function approve(id) {
	  return {
	    type: APPROVE,
	    payload: Api.jobs.approve(id)
	  };
	};

	var expire = function expire(id) {
	  return {
	    type: EXPIRE,
	    payload: Api.jobs.expire(id)
	  };
	};

	var attachMedia = function attachMedia(id, file) {
	  return {
	    type: ATTACH,
	    payload: Api.media.attach(file, 'jobs', id)
	  };
	};

	var detachMedia = function detachMedia(id) {
	  return {
	    type: DETACH,
	    payload: Api.media.detach(id, 'jobs')
	  };
	};

	var lock = function lock(params) {
	  return {
	    type: LOCK,
	    payload: Api.post('/jobs/users', params)
	  };
	};

	var unlock = function unlock(params) {
	  return {
	    type: UNLOCK,
	    payload: Api.delete('/jobs/users', params)
	  };
	};

	/*
	|--------------------------------------------------------------------------
	| Sync Actions
	|--------------------------------------------------------------------------
	*/

	var clear$1 = function clear() {
	  return {
	    type: CLEAR_ENTITIES$1
	  };
	};

	var updateFilters$1 = function updateFilters(filters) {
	  return {
	    type: UPDATE_FILTERS$1,
	    payload: filters
	  };
	};

	var replaceFilters$1 = function replaceFilters(filters) {
	  return {
	    type: REPLACE_FILTERS$1,
	    payload: filters
	  };
	};

	var clearFilters = function clearFilters(filters) {
	  return {
	    type: CLEAR_FILTERS,
	    payload: filters
	  };
	};

	var updateSyncFilters = function updateSyncFilters(filters) {
	  return {
	    type: UPDATE_SYNC_FILTERS,
	    payload: filters
	  };
	};

	var actions$4 = /*#__PURE__*/Object.freeze({
		FETCH_COLLECTION: FETCH_COLLECTION$1,
		FETCH_ENTITY: FETCH_ENTITY$1,
		SEARCH: SEARCH$1,
		CREATE: CREATE$1,
		UPDATE: UPDATE$1,
		ARCHIVE: ARCHIVE$1,
		RESTORE: RESTORE$1,
		APPROVE: APPROVE,
		EXPIRE: EXPIRE,
		ATTACH: ATTACH,
		DETACH: DETACH,
		LOCK: LOCK,
		UNLOCK: UNLOCK,
		CLEAR_ENTITIES: CLEAR_ENTITIES$1,
		UPDATE_FILTERS: UPDATE_FILTERS$1,
		REPLACE_FILTERS: REPLACE_FILTERS$1,
		CLEAR_FILTERS: CLEAR_FILTERS,
		UPDATE_SYNC_FILTERS: UPDATE_SYNC_FILTERS,
		fetchCollection: fetchCollection$1,
		searchCollection: searchCollection$1,
		fetchEntity: fetchEntity$1,
		create: create$1,
		draft: draft,
		update: update$2,
		archive: archive$1,
		restore: restore$1,
		approve: approve,
		expire: expire,
		attachMedia: attachMedia,
		detachMedia: detachMedia,
		lock: lock,
		unlock: unlock,
		clear: clear$1,
		updateFilters: updateFilters$1,
		replaceFilters: replaceFilters$1,
		clearFilters: clearFilters,
		updateSyncFilters: updateSyncFilters
	});

	// Initial state
	var initialState$4 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  syncFilters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Organisations reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer$4() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$4;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case CLEAR_ENTITIES$1:
	      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

	    case UPDATE_FILTERS$1:
	      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

	    case CLEAR_FILTERS:
	      return ethicalJobsRedux.ImmutableUtils.clearFilters(state);

	    case UPDATE_SYNC_FILTERS:
	      return ethicalJobsRedux.ImmutableUtils.updateSyncFilters(state, action.payload);

	    case ethicalJobsRedux.REQUEST(SEARCH$1):
	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$1):
	    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$1):
	    case ethicalJobsRedux.REQUEST(CREATE$1):
	    case ethicalJobsRedux.REQUEST(UPDATE$1):
	    case ethicalJobsRedux.REQUEST(ARCHIVE$1):
	    case ethicalJobsRedux.REQUEST(RESTORE$1):
	    case ethicalJobsRedux.REQUEST(APPROVE):
	    case ethicalJobsRedux.REQUEST(EXPIRE):
	    case ethicalJobsRedux.REQUEST(ATTACH):
	    case ethicalJobsRedux.REQUEST(DETACH):
	    case ethicalJobsRedux.REQUEST(LOCK):
	    case ethicalJobsRedux.REQUEST(UNLOCK):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$1):
	    case ethicalJobsRedux.SUCCESS(CREATE$1):
	    case ethicalJobsRedux.SUCCESS(UPDATE$1):
	    case ethicalJobsRedux.SUCCESS(ARCHIVE$1):
	    case ethicalJobsRedux.SUCCESS(RESTORE$1):
	    case ethicalJobsRedux.SUCCESS(APPROVE):
	    case ethicalJobsRedux.SUCCESS(EXPIRE):
	    case ethicalJobsRedux.SUCCESS(ATTACH):
	    case ethicalJobsRedux.SUCCESS(DETACH):
	    case ethicalJobsRedux.SUCCESS(LOCK):
	    case ethicalJobsRedux.SUCCESS(UNLOCK):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$1):
	    case ethicalJobsRedux.SUCCESS(SEARCH$1):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$1):
	    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$1):
	    case ethicalJobsRedux.FAILURE(CREATE$1):
	    case ethicalJobsRedux.FAILURE(UPDATE$1):
	    case ethicalJobsRedux.FAILURE(ARCHIVE$1):
	    case ethicalJobsRedux.FAILURE(RESTORE$1):
	    case ethicalJobsRedux.FAILURE(APPROVE):
	    case ethicalJobsRedux.FAILURE(EXPIRE):
	    case ethicalJobsRedux.FAILURE(ATTACH):
	    case ethicalJobsRedux.FAILURE(DETACH):
	    case ethicalJobsRedux.FAILURE(SEARCH$1):
	    case ethicalJobsRedux.FAILURE(LOCK):
	    case ethicalJobsRedux.FAILURE(UNLOCK):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	/**
	 * Returns jobs filtered by {organisationId}
	 * @param {Map} job entity
	 * @param {Number|Collection} organisations
	 * @returns {Bool}
	 */
	function byOrganisations$1(job, organisations) {
	  if (!organisations) {
	    return true; // pass through
	  }
	  if (Immutable.isCollection(organisations)) {
	    return organisations.includes(job.get('organisation_id'));
	  }
	  return job.get('organisation_id') === organisations;
	}

	/**
	 * Returns jobs filtered by {status}
	 * @param {Map} job entity
	 * @param {String} jobs status to filter
	 * @returns {Bool}
	 */
	function byStatus(job, status) {
	  if (!status) {
	    return true; // pass through
	  }
	  var jobStatus = job.get('status', '').toUpperCase();
	  if (Immutable.isCollection(status)) {
	    return status.map(function (stati) {
	      return stati.toUpperCase();
	    }).includes(jobStatus);
	  }
	  return jobStatus === status.toUpperCase();
	}

	/**
	 * Returns jobs filtered by {expired}
	 * @param {Map} job entity
	 * @param {Bool} true for expired
	 * @returns {Bool}
	 */
	function byExpiration(job, expiration) {
	  if (expiration === null || typeof expiration === 'undefined') {
	    return true;
	  }
	  return job.get('expired') === expiration;
	}

	/**
	 * Returns jobs filtered by {taxonomy}
	 * @param {Map} job entity
	 * @param {String} taxonomy key
	 * @param {List} taxonomy filterTerms
	 * @returns {Bool}
	 */
	function byTaxonomy(job, filters, taxonomy) {
	  var jobTerms = job.get(taxonomy, Immutable.List());
	  if (!filters) {
	    return true; // pass through
	  }
	  if (typeof filters === 'string' || typeof filters === 'number') {
	    return jobTerms.includes(parseInt(filters, 10)); // is single term
	  }
	  return filters.size > jobTerms.size ? jobTerms.isSubset(filters) : filters.isSubset(jobTerms);
	}

	/**
	 * Returns jobs that were "searched" for
	 * @param {Map} job entity
	 * @param {String} taxonomy key
	 * @param {List} taxonomy filterTerms
	 * @returns {Bool}
	 */
	function bySearched(job) {
	  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	  if (!query) {
	    return true; // pass through
	  }
	  return job.get('_score', 0) > 0;
	}

	/**
	 * Filters job entities
	 * @param {Map} Jobs to be filtered
	 * @param {Map} Filters to apply
	 * @returns {any} The filtered job state.
	 */
	function filterJobs(jobs, filters) {
	  return jobs.filter(function (job) {
	    return byOrganisations$1(job, filters.get('organisations'));
	  }).filter(function (job) {
	    return byStatus(job, filters.get('status'));
	  }).filter(function (job) {
	    return byExpiration(job, filters.get('expired'));
	  }).filter(function (job) {
	    return byTaxonomy(job, filters.get('categories'), 'categories');
	  }).filter(function (job) {
	    return byTaxonomy(job, filters.get('locations'), 'locations');
	  }).filter(function (job) {
	    return byTaxonomy(job, filters.get('sectors'), 'sectors');
	  }).filter(function (job) {
	    return byTaxonomy(job, filters.get('workTypes'), 'workTypes');
	  }).filter(function (job) {
	    return bySearched(job, filters.get('q'));
	  });
	}

	var fetching$4 = ethicalJobsRedux.SelectorFactory.create('jobs', 'fetching');

	var error$5 = ethicalJobsRedux.SelectorFactory.create('jobs', 'error');

	var filters$1 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('jobs');

	var syncFilters = ethicalJobsRedux.SelectorFactory.createSyncFiltersSelector('jobs');

	var propsFilters = ethicalJobsRedux.SelectorFactory.createPropFiltersSelector();

	var result$2 = ethicalJobsRedux.SelectorFactory.createResultSelector('jobs');

	var results$2 = ethicalJobsRedux.SelectorFactory.createResultsSelector('jobs');

	var jobs = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('jobs');

	var orderedJobs = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(jobs, results$2);

	var jobByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(jobs, result$2);

	var organisations$1 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('jobs', 'organisations');

	var media = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('jobs', 'media');

	var filteredJobs = createSelector([jobs, filters$1], filterJobs);

	var orderedFilteredJobs = createSelector([orderedJobs, filters$1], filterJobs);

	var propsOrderedFilteredJobs = createSelector([orderedJobs, propsFilters], filterJobs);

	var selectors$4 = /*#__PURE__*/Object.freeze({
		fetching: fetching$4,
		error: error$5,
		filters: filters$1,
		syncFilters: syncFilters,
		propsFilters: propsFilters,
		result: result$2,
		results: results$2,
		jobs: jobs,
		orderedJobs: orderedJobs,
		jobByResult: jobByResult,
		organisations: organisations$1,
		media: media,
		filteredJobs: filteredJobs,
		orderedFilteredJobs: orderedFilteredJobs,
		propsOrderedFilteredJobs: propsOrderedFilteredJobs
	});

	var APPROVED = 'APPROVED';

	var PENDING = 'PENDING';

	var DRAFT = 'DRAFT';

	var JobStatus = {
	  APPROVED: APPROVED,
	  PENDING: PENDING,
	  DRAFT: DRAFT
	};

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is$1 ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$3 = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty$3.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString$1 = {}.toString;

	var _cof = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor$1 = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf$1 = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var JobTypes = Object.assign({}, JobStatus, {
	  EXPIRED: 'EXPIRED'
	});

	var getFiltersByType = (function (type) {
	  switch (type) {
	    case JobTypes.PENDING:
	      return {
	        status: JobStatus.PENDING
	      };
	    case JobTypes.EXPIRED:
	      return {
	        status: [JobStatus.APPROVED, JobStatus.PENDING],
	        expired: true,
	        limit: 1200
	      };
	    case JobTypes.DRAFT:
	      return {
	        status: JobStatus.DRAFT,
	        limit: 1200
	      };
	    case JobTypes.APPROVED:
	    default:
	      return {
	        status: JobStatus.APPROVED,
	        expired: false
	      };
	  }
	});

	var index$4 = {
	  reducer: reducer$4,
	  actions: actions$4,
	  selectors: selectors$4,
	  statuses: JobStatus,
	  getFiltersByType: getFiltersByType
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var FETCH_COLLECTION$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/FETCH_COLLECTION');
	var FETCH_ENTITY$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/FETCH_ENTITY');
	var CLEAR_ENTITIES$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/CLEAR_ENTITIES');
	var SEARCH$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/SEARCH');
	var CREATE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/CREATE');
	var UPDATE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/UPDATE');
	var PATCH = ethicalJobsRedux.createActionType('ORGANISATIONS/PATCH');
	var ARCHIVE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/ARCHIVE');
	var RESTORE$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/RESTORE');
	var UPLOAD_LOGO = ethicalJobsRedux.createActionType('ORGANISATIONS/UPLOAD_LOGO');
	var CREATE_CREDITS = ethicalJobsRedux.createActionType('ORGANISATIONS/CREATE_CREDITS');
	var DEDUCT_CREDITS = ethicalJobsRedux.createActionType('ORGANISATIONS/DEDUCT_CREDITS');
	var UPDATE_FILTERS$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/UPDATE_FILTERS');
	var REPLACE_FILTERS$2 = ethicalJobsRedux.createActionType('ORGANISATIONS/REPLACE_FILTERS');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchCollection$2 = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION$2,
	    payload: Api.get('/organisations', params)
	  };
	};

	var fetchEntity$2 = function fetchEntity(id) {
	  return {
	    type: FETCH_ENTITY$2,
	    payload: Api.get('/organisations/' + id)
	  };
	};

	var searchCollection$2 = function searchCollection(params) {
	  return {
	    type: SEARCH$2,
	    payload: Api.search('organisations', params)
	  };
	};

	var create$2 = function create(params) {
	  return {
	    type: CREATE$2,
	    payload: Api.post('/organisations', params)
	  };
	};

	var update$3 = function update(id, params) {
	  return {
	    type: UPDATE$2,
	    payload: Api.put('/organisations/' + id, params)
	  };
	};

	var patch = function patch(id, params) {
	  return {
	    type: PATCH,
	    payload: Api.patch('/organisations/' + id, params)
	  };
	};

	var archive$2 = function archive(id) {
	  return {
	    type: ARCHIVE$2,
	    payload: Api.archive('organisations', id)
	  };
	};

	var restore$2 = function restore(id) {
	  return {
	    type: RESTORE$2,
	    payload: Api.restore('organisations', id)
	  };
	};

	var uploadLogo = function uploadLogo(file, id) {
	  return {
	    type: UPLOAD_LOGO,
	    payload: Api.media.attach(file, 'organisations', id)
	  };
	};

	var createCredits = function createCredits(params) {
	  return {
	    type: CREATE_CREDITS,
	    payload: Api.post('/credits', params)
	  };
	};

	var deductCredits = function deductCredits(params) {
	  return {
	    type: DEDUCT_CREDITS,
	    payload: Api.delete('/credits', params)
	  };
	};

	/*
	|--------------------------------------------------------------------------
	| Sync Actions
	|--------------------------------------------------------------------------
	*/

	var clear$2 = function clear() {
	  return {
	    type: CLEAR_ENTITIES$2
	  };
	};

	var updateFilters$2 = function updateFilters(_updateFilters) {
	  return {
	    type: UPDATE_FILTERS$2,
	    payload: _updateFilters
	  };
	};

	var replaceFilters$2 = function replaceFilters(updateFilters) {
	  return {
	    type: REPLACE_FILTERS$2,
	    payload: updateFilters
	  };
	};

	var actions$5 = /*#__PURE__*/Object.freeze({
		FETCH_COLLECTION: FETCH_COLLECTION$2,
		FETCH_ENTITY: FETCH_ENTITY$2,
		CLEAR_ENTITIES: CLEAR_ENTITIES$2,
		SEARCH: SEARCH$2,
		CREATE: CREATE$2,
		UPDATE: UPDATE$2,
		PATCH: PATCH,
		ARCHIVE: ARCHIVE$2,
		RESTORE: RESTORE$2,
		UPLOAD_LOGO: UPLOAD_LOGO,
		CREATE_CREDITS: CREATE_CREDITS,
		DEDUCT_CREDITS: DEDUCT_CREDITS,
		UPDATE_FILTERS: UPDATE_FILTERS$2,
		REPLACE_FILTERS: REPLACE_FILTERS$2,
		fetchCollection: fetchCollection$2,
		fetchEntity: fetchEntity$2,
		searchCollection: searchCollection$2,
		create: create$2,
		update: update$3,
		patch: patch,
		archive: archive$2,
		restore: restore$2,
		uploadLogo: uploadLogo,
		createCredits: createCredits,
		deductCredits: deductCredits,
		clear: clear$2,
		updateFilters: updateFilters$2,
		replaceFilters: replaceFilters$2
	});

	// Initial state
	var initialState$5 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Organisations reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer$5() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$5;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case CLEAR_ENTITIES$2:
	      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

	    case UPDATE_FILTERS$2:
	      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

	    case ethicalJobsRedux.REQUEST(SEARCH$2):
	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$2):
	    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$2):
	    case ethicalJobsRedux.REQUEST(CREATE$2):
	    case ethicalJobsRedux.REQUEST(UPDATE$2):
	    case ethicalJobsRedux.REQUEST(PATCH):
	    case ethicalJobsRedux.REQUEST(ARCHIVE$2):
	    case ethicalJobsRedux.REQUEST(RESTORE$2):
	    case ethicalJobsRedux.REQUEST(UPLOAD_LOGO):
	    case ethicalJobsRedux.REQUEST(CREATE_CREDITS):
	    case ethicalJobsRedux.REQUEST(DEDUCT_CREDITS):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$2):
	    case ethicalJobsRedux.SUCCESS(CREATE$2):
	    case ethicalJobsRedux.SUCCESS(UPDATE$2):
	    case ethicalJobsRedux.SUCCESS(PATCH):
	    case ethicalJobsRedux.SUCCESS(ARCHIVE$2):
	    case ethicalJobsRedux.SUCCESS(RESTORE$2):
	    case ethicalJobsRedux.SUCCESS(UPLOAD_LOGO):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$2):
	    case ethicalJobsRedux.SUCCESS(SEARCH$2):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$2):
	    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$2):
	    case ethicalJobsRedux.FAILURE(CREATE$2):
	    case ethicalJobsRedux.FAILURE(UPDATE$2):
	    case ethicalJobsRedux.FAILURE(PATCH):
	    case ethicalJobsRedux.FAILURE(ARCHIVE$2):
	    case ethicalJobsRedux.FAILURE(RESTORE$2):
	    case ethicalJobsRedux.FAILURE(UPLOAD_LOGO):
	    case ethicalJobsRedux.FAILURE(CREATE_CREDITS):
	    case ethicalJobsRedux.FAILURE(DEDUCT_CREDITS):
	    case ethicalJobsRedux.FAILURE(SEARCH$2):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	var fetching$5 = ethicalJobsRedux.SelectorFactory.create('organisations', 'fetching');

	var error$6 = ethicalJobsRedux.SelectorFactory.create('organisations', 'error');

	var filters$2 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('organisations');

	var result$3 = ethicalJobsRedux.SelectorFactory.createResultSelector('organisations');

	var results$3 = ethicalJobsRedux.SelectorFactory.createResultsSelector('organisations');

	var organisations$2 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('organisations');

	var orderedOrganisations = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(organisations$2, results$3);

	var organisationByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(organisations$2, result$3);

	var users$1 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('organisations', 'users');

	var organisationOwner = createSelector([organisationByResult, users$1], function (org, users) {
	  return users.get(org.get('owner_id', '').toString(), Immutable.Map());
	});

	var organisationAdmin = createSelector([organisationByResult, users$1], function (org, users) {
	  return users.get(org.get('admin_id', '').toString(), Immutable.Map());
	});

	var selectors$5 = /*#__PURE__*/Object.freeze({
		fetching: fetching$5,
		error: error$6,
		filters: filters$2,
		result: result$3,
		results: results$3,
		organisations: organisations$2,
		orderedOrganisations: orderedOrganisations,
		organisationByResult: organisationByResult,
		users: users$1,
		organisationOwner: organisationOwner,
		organisationAdmin: organisationAdmin
	});

	var index$5 = {
	  reducer: reducer$5,
	  actions: actions$5,
	  selectors: selectors$5
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var FETCH_COLLECTION$3 = ethicalJobsRedux.createActionType('POSTS/FETCH_COLLECTION');
	var FETCH_ENTITY$3 = ethicalJobsRedux.createActionType('POSTS/FETCH_ENTITY');
	var CLEAR_ENTITIES$3 = ethicalJobsRedux.createActionType('POSTS/CLEAR_ENTITIES');
	var UPDATE_FILTERS$3 = ethicalJobsRedux.createActionType('POSTS/UPDATE_FILTERS');
	var REPLACE_FILTERS$3 = ethicalJobsRedux.createActionType('POSTS/REPLACE_FILTERS');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchCollection$3 = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION$3,
	    payload: Api.get('/content/posts', params)
	  };
	};

	var fetchEntity$3 = function fetchEntity(id) {
	  return {
	    type: FETCH_ENTITY$3,
	    payload: Api.get('/content/posts/' + id)
	  };
	};

	var fetchBySlug = function fetchBySlug(slug) {
	  return {
	    type: FETCH_ENTITY$3,
	    payload: Api.get('/content/posts?slug=' + slug)
	  };
	};

	/*
	|--------------------------------------------------------------------------
	| Sync Actions
	|--------------------------------------------------------------------------
	*/

	var clear$3 = function clear() {
	  return {
	    type: CLEAR_ENTITIES$3
	  };
	};

	var updateFilters$3 = function updateFilters(filters) {
	  return {
	    type: UPDATE_FILTERS$3,
	    payload: filters
	  };
	};

	var replaceFilters$3 = function replaceFilters(filters) {
	  return {
	    type: REPLACE_FILTERS$3,
	    payload: filters
	  };
	};

	var actions$6 = /*#__PURE__*/Object.freeze({
		FETCH_COLLECTION: FETCH_COLLECTION$3,
		FETCH_ENTITY: FETCH_ENTITY$3,
		CLEAR_ENTITIES: CLEAR_ENTITIES$3,
		UPDATE_FILTERS: UPDATE_FILTERS$3,
		REPLACE_FILTERS: REPLACE_FILTERS$3,
		fetchCollection: fetchCollection$3,
		fetchEntity: fetchEntity$3,
		fetchBySlug: fetchBySlug,
		clear: clear$3,
		updateFilters: updateFilters$3,
		replaceFilters: replaceFilters$3
	});

	// Initial state
	var initialState$6 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Organisations reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer$6() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$6;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case CLEAR_ENTITIES$3:
	      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

	    case UPDATE_FILTERS$3:
	      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$3):
	    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$3):
	    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	var fetching$6 = ethicalJobsRedux.SelectorFactory.create('posts', 'fetching');

	var error$7 = ethicalJobsRedux.SelectorFactory.create('posts', 'error');

	var filters$3 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('posts');

	var result$4 = ethicalJobsRedux.SelectorFactory.createResultSelector('posts');

	var results$4 = ethicalJobsRedux.SelectorFactory.createResultsSelector('posts');

	var postsSelector = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('posts');

	// export const orderedPosts = SelectorFactory.createOrderedEntitiesSelector(postsSelector, results);

	var orderedPosts = createSelector([postsSelector, results$4], function (posts, results) {
	  return Immutable.OrderedMap(results.map(function (result) {
	    return [result.toString(), posts.get(result.toString())];
	  }));
	});

	var postByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(postsSelector, result$4);

	var selectors$6 = /*#__PURE__*/Object.freeze({
		fetching: fetching$6,
		error: error$7,
		filters: filters$3,
		result: result$4,
		results: results$4,
		postsSelector: postsSelector,
		orderedPosts: orderedPosts,
		postByResult: postByResult
	});

	var index$6 = {
	  reducer: reducer$6,
	  actions: actions$6,
	  selectors: selectors$6
	};

	// Initial state
	var initialState$7 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  taxonomies: {}
	});

	/**
	 * Taxonomies reducer
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */
	function reducer$7() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$7;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case ethicalJobsRedux.REQUEST(FETCH_APP_DATA):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_APP_DATA):
	      return state.set('fetching', false).set('error', false).set('taxonomies', Immutable.fromJS(action.payload.data.taxonomies));

	    case ethicalJobsRedux.FAILURE(FETCH_APP_DATA):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	// 20.1.2.3 Number.isInteger(number)

	var floor$2 = Math.floor;
	var _isInteger = function isInteger(it) {
	  return !_isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// 20.1.2.3 Number.isInteger(number)


	_export(_export.S, 'Number', { isInteger: _isInteger });

	var isInteger = _core.Number.isInteger;

	var fetching$7 = ethicalJobsRedux.SelectorFactory.create('taxonomies', 'fetching');

	var error$8 = ethicalJobsRedux.SelectorFactory.create('taxonomies', 'error');

	var taxonomies = function taxonomies(state) {
	  return state.getIn(['entities', 'taxonomies', 'taxonomies']);
	};

	var orderedTaxonomy = function orderedTaxonomy(state, taxonomy) {
	  var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'title';

	  return taxonomies(state).get(taxonomy, Immutable.Map()).toOrderedMap().sort(function (a, b) {
	    if (Number.isInteger(a.get(orderBy))) {
	      return a.get('id') - b.get('id');
	    } else {
	      return a.get(orderBy).localeCompare(b.get(orderBy));
	    }
	  });
	};

	var orderedTaxonomyWithJobs = function orderedTaxonomyWithJobs(state, taxonomy) {
	  var orderBy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'title';

	  return orderedTaxonomy(state, taxonomy, orderBy).filter(function (term) {
	    return term.has('job_count') && term.get('job_count') > 0;
	  });
	};

	var selectors$7 = /*#__PURE__*/Object.freeze({
		fetching: fetching$7,
		error: error$8,
		taxonomies: taxonomies,
		orderedTaxonomy: orderedTaxonomy,
		orderedTaxonomyWithJobs: orderedTaxonomyWithJobs
	});

	var index$7 = {
	  reducer: reducer$7,
	  selectors: selectors$7
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var FETCH_COLLECTION$4 = ethicalJobsRedux.createActionType('USERS/FETCH_COLLECTION');
	var FETCH_ENTITY$4 = ethicalJobsRedux.createActionType('USERS/FETCH_ENTITY');
	var CREATE$3 = ethicalJobsRedux.createActionType('USERS/CREATE');
	var UPDATE$3 = ethicalJobsRedux.createActionType('USERS/UPDATE');
	var PATCH$1 = ethicalJobsRedux.createActionType('USERS/PATCH');
	var ARCHIVE$3 = ethicalJobsRedux.createActionType('USERS/ARCHIVE');
	var RESTORE$3 = ethicalJobsRedux.createActionType('USERS/RESTORE');
	var CLEAR_ENTITIES$4 = ethicalJobsRedux.createActionType('USERS/CLEAR_ENTITIES');
	var UPDATE_FILTERS$4 = ethicalJobsRedux.createActionType('USERS/UPDATE_FILTERS');
	var REPLACE_FILTERS$4 = ethicalJobsRedux.createActionType('USERS/REPLACE_FILTERS');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchCollection$4 = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION$4,
	    payload: Api.get('/users', params)
	  };
	};

	var fetchEntity$4 = function fetchEntity(id) {
	  return {
	    type: FETCH_ENTITY$4,
	    payload: Api.get('/users/' + id)
	  };
	};

	var create$3 = function create(params) {
	  return {
	    type: CREATE$3,
	    payload: Api.post('/users', params)
	  };
	};

	var update$4 = function update(id, params) {
	  return {
	    type: UPDATE$3,
	    payload: Api.put('/users/' + id, params)
	  };
	};

	var patch$1 = function patch(id, params) {
	  return {
	    type: PATCH$1,
	    payload: Api.patch('/users/' + id, params)
	  };
	};

	var archive$3 = function archive(id) {
	  return {
	    type: ARCHIVE$3,
	    payload: Api.archive('users', id)
	  };
	};

	var restore$3 = function restore(id) {
	  return {
	    type: RESTORE$3,
	    payload: Api.restore('users', id)
	  };
	};

	/*
	|--------------------------------------------------------------------------
	| Sync Actions
	|--------------------------------------------------------------------------
	*/

	var clear$4 = function clear() {
	  return {
	    type: CLEAR_ENTITIES$4
	  };
	};

	var updateFilters$4 = function updateFilters(filters) {
	  return {
	    type: UPDATE_FILTERS$4,
	    payload: filters
	  };
	};

	var replaceFilters$4 = function replaceFilters(filters) {
	  return {
	    type: REPLACE_FILTERS$4,
	    payload: filters
	  };
	};

	var actions$7 = /*#__PURE__*/Object.freeze({
		FETCH_COLLECTION: FETCH_COLLECTION$4,
		FETCH_ENTITY: FETCH_ENTITY$4,
		CREATE: CREATE$3,
		UPDATE: UPDATE$3,
		PATCH: PATCH$1,
		ARCHIVE: ARCHIVE$3,
		RESTORE: RESTORE$3,
		CLEAR_ENTITIES: CLEAR_ENTITIES$4,
		UPDATE_FILTERS: UPDATE_FILTERS$4,
		REPLACE_FILTERS: REPLACE_FILTERS$4,
		fetchCollection: fetchCollection$4,
		fetchEntity: fetchEntity$4,
		create: create$3,
		update: update$4,
		patch: patch$1,
		archive: archive$3,
		restore: restore$3,
		clear: clear$4,
		updateFilters: updateFilters$4,
		replaceFilters: replaceFilters$4
	});

	// Initial state
	var initialState$8 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * User reducer
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */
	function reducer$8() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$8;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case CLEAR_ENTITIES$4:
	      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

	    case UPDATE_FILTERS$4:
	      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$4):
	    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$4):
	    case ethicalJobsRedux.REQUEST(CREATE$3):
	    case ethicalJobsRedux.REQUEST(UPDATE$3):
	    case ethicalJobsRedux.REQUEST(PATCH$1):
	    case ethicalJobsRedux.REQUEST(ARCHIVE$3):
	    case ethicalJobsRedux.REQUEST(RESTORE$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$4):
	    case ethicalJobsRedux.SUCCESS(CREATE$3):
	    case ethicalJobsRedux.SUCCESS(UPDATE$3):
	    case ethicalJobsRedux.SUCCESS(PATCH$1):
	    case ethicalJobsRedux.SUCCESS(ARCHIVE$3):
	    case ethicalJobsRedux.SUCCESS(RESTORE$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$4):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$4):
	    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$4):
	    case ethicalJobsRedux.FAILURE(CREATE$3):
	    case ethicalJobsRedux.FAILURE(UPDATE$3):
	    case ethicalJobsRedux.FAILURE(PATCH$1):
	    case ethicalJobsRedux.FAILURE(ARCHIVE$3):
	    case ethicalJobsRedux.FAILURE(RESTORE$3):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	/**
	 * Returns users filtered by {roles}
	 * @param {Map} user entity
	 * @param {String|Collection} roles
	 * @returns {Bool}
	 */
	function byRoles(user, roles) {
	  if (!roles) {
	    return true; // pass through
	  }
	  return user.get('roles').isSuperset(roles);
	}

	/**
	 * Filters user entities
	 * @param {Map} Users to be filtered
	 * @param {Map} Filters to apply
	 * @returns {any} The filtered user state.
	 */
	function selectByFilters$1(users, filters) {
	  return users.filter(function (user) {
	    return byRoles(user, filters.get('roles'));
	  });
	}

	var fetching$8 = ethicalJobsRedux.SelectorFactory.create('users', 'fetching');

	var error$9 = ethicalJobsRedux.SelectorFactory.create('users', 'error');

	var filters$4 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('users');

	var result$5 = ethicalJobsRedux.SelectorFactory.createResultSelector('users');

	var results$5 = ethicalJobsRedux.SelectorFactory.createResultsSelector('users');

	var users$2 = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('users');

	var orderedUsers = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(users$2, results$5);

	var userByResult = ethicalJobsRedux.SelectorFactory.createIdSelector(users$2, result$5);

	var filteredUsers = createSelector([orderedUsers, filters$4], selectByFilters$1);

	var selectors$8 = /*#__PURE__*/Object.freeze({
		fetching: fetching$8,
		error: error$9,
		filters: filters$4,
		result: result$5,
		results: results$5,
		users: users$2,
		orderedUsers: orderedUsers,
		userByResult: userByResult,
		filteredUsers: filteredUsers
	});

	var index$8 = {
	  actions: actions$7,
	  reducer: reducer$8,
	  selectors: selectors$8
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var PURCHASE$1 = ethicalJobsRedux.createActionType('PAYMENTS/PURCHASE');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/
	var purchase$1 = function purchase(params) {
	  return {
	    type: PURCHASE$1,
	    payload: Api.post('/payments', params)
	  };
	};

	var actions$8 = /*#__PURE__*/Object.freeze({
		PURCHASE: PURCHASE$1,
		purchase: purchase$1
	});

	// Initial state
	var initialState$9 = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Purchase reducer
	 *
	 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
	 */

	function reducer$9() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$9;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case ethicalJobsRedux.REQUEST(PURCHASE$1):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(PURCHASE$1):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(PURCHASE$1):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	var fetching$9 = ethicalJobsRedux.SelectorFactory.create('payments', 'fetching');

	var error$a = ethicalJobsRedux.SelectorFactory.create('payments', 'error');

	var selectors$9 = /*#__PURE__*/Object.freeze({
		fetching: fetching$9,
		error: error$a
	});

	var index$9 = {
	  reducer: reducer$9,
	  actions: actions$8,
	  selectors: selectors$9
	};

	/**
	 * API prefix for the subscriptions API
	 *
	 * @type {string}
	 */
	var prefix = '/alerts';
	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/

	var CREATE$4 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/CREATE');
	var FETCH_COLLECTION$5 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/FETCH_COLLECTION');
	var FETCH_ENTITY$5 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/FETCH_ENTITY');
	var DELETE$1 = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/DELETE');
	var CONFIRM = ethicalJobsRedux.createActionType('SUBSCRIPTIONS/CONFIRM');

	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/
	var create$4 = function create(params) {
	  return {
	    type: CREATE$4,
	    payload: Api.post(prefix + '/subscriptions', params)
	  };
	};

	var fetchCollection$5 = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION$5,
	    payload: Api.get(prefix + '/subscriptions', params)
	  };
	};

	var fetchEntity$5 = function fetchEntity(id) {
	  return {
	    type: FETCH_ENTITY$5,
	    payload: Api.get(prefix + ('/subscriptions/' + id))
	  };
	};

	var destroy = function destroy(id) {
	  return {
	    type: DELETE$1,
	    payload: Api.delete(prefix + ('/subscriptions/' + id))
	  };
	};

	var confirm = function confirm(id, params) {
	  return {
	    type: CONFIRM,
	    payload: Api.put(prefix + ('/subscriptions/' + id), params)
	  };
	};

	var actions$9 = /*#__PURE__*/Object.freeze({
		CREATE: CREATE$4,
		FETCH_COLLECTION: FETCH_COLLECTION$5,
		FETCH_ENTITY: FETCH_ENTITY$5,
		DELETE: DELETE$1,
		CONFIRM: CONFIRM,
		create: create$4,
		fetchCollection: fetchCollection$5,
		fetchEntity: fetchEntity$5,
		destroy: destroy,
		confirm: confirm
	});

	// Initial state
	var initialState$a = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * subscriptions reducer
	 *
	 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
	 */

	function reducer$a() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$a;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {

	    case ethicalJobsRedux.REQUEST(CREATE$4):
	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$5):
	    case ethicalJobsRedux.REQUEST(FETCH_ENTITY$5):
	    case ethicalJobsRedux.REQUEST(DELETE$1):
	    case ethicalJobsRedux.REQUEST(CONFIRM):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(CREATE$4):
	    case ethicalJobsRedux.SUCCESS(FETCH_ENTITY$5):
	    case ethicalJobsRedux.SUCCESS(DELETE$1):
	    case ethicalJobsRedux.SUCCESS(CONFIRM):
	      return ethicalJobsRedux.ImmutableUtils.mergeSuccess(state, action.payload);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$5):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(CREATE$4):
	    case ethicalJobsRedux.FAILURE(FETCH_ENTITY$5):
	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$5):
	    case ethicalJobsRedux.FAILURE(DELETE$1):
	    case ethicalJobsRedux.FAILURE(CONFIRM):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	var fetching$a = ethicalJobsRedux.SelectorFactory.create('subscriptions', 'fetching');

	var error$b = ethicalJobsRedux.SelectorFactory.create('subscriptions', 'error');

	var result$6 = ethicalJobsRedux.SelectorFactory.createResultSelector('subscriptions');

	var results$6 = ethicalJobsRedux.SelectorFactory.createResultsSelector('subscriptions');

	var subscriptions = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('subscriptions');

	var alerts = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('subscriptions', 'alerts');

	var selectors$a = /*#__PURE__*/Object.freeze({
		fetching: fetching$a,
		error: error$b,
		result: result$6,
		results: results$6,
		subscriptions: subscriptions,
		alerts: alerts
	});

	var index$a = {
	  reducer: reducer$a,
	  actions: actions$9,
	  selectors: selectors$a
	};

	/*
	|--------------------------------------------------------------------------
	| Action Types
	|--------------------------------------------------------------------------
	*/
	var FETCH_COLLECTION$6 = ethicalJobsRedux.createActionType('ACTIVITIES/FETCH_COLLECTION');
	var CLEAR_ENTITIES$5 = ethicalJobsRedux.createActionType('ACTIVITIES/CLEAR_ENTITIES');
	var UPDATE_FILTERS$5 = ethicalJobsRedux.createActionType('ACTIVITIES/UPDATE_FILTERS');
	/*
	|--------------------------------------------------------------------------
	| Async Actions
	|--------------------------------------------------------------------------
	*/

	var fetchCollection$6 = function fetchCollection(params) {
	  return {
	    type: FETCH_COLLECTION$6,
	    payload: Api.get('/activities', params)
	  };
	};

	var clear$5 = function clear() {
	  return {
	    type: CLEAR_ENTITIES$5
	  };
	};

	var updateFilters$5 = function updateFilters(_updateFilters) {
	  return {
	    type: UPDATE_FILTERS$5,
	    payload: _updateFilters
	  };
	};

	var actions$a = /*#__PURE__*/Object.freeze({
		FETCH_COLLECTION: FETCH_COLLECTION$6,
		CLEAR_ENTITIES: CLEAR_ENTITIES$5,
		UPDATE_FILTERS: UPDATE_FILTERS$5,
		fetchCollection: fetchCollection$6,
		clear: clear$5,
		updateFilters: updateFilters$5
	});

	// Initial state
	var initialState$b = Immutable.fromJS({
	  fetching: false,
	  error: false,
	  filters: {},
	  entities: {},
	  results: [],
	  result: false
	});

	/**
	 * Activity reducer
	 *
	 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
	 */
	function reducer$b() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$b;
	  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  switch (action.type) {
	    case CLEAR_ENTITIES$5:
	      return ethicalJobsRedux.ImmutableUtils.clearEntities(state);

	    case UPDATE_FILTERS$5:
	      return ethicalJobsRedux.ImmutableUtils.updateFilters(state, action.payload);

	    case ethicalJobsRedux.REQUEST(FETCH_COLLECTION$6):
	      return ethicalJobsRedux.ImmutableUtils.mergeRequest(state);

	    case ethicalJobsRedux.SUCCESS(FETCH_COLLECTION$6):
	      return ethicalJobsRedux.ImmutableUtils.mergeCollectionSuccess(state, action.payload);

	    case ethicalJobsRedux.FAILURE(FETCH_COLLECTION$6):
	      return ethicalJobsRedux.ImmutableUtils.mergeFailure(state, action.payload);

	    default:
	      return state;
	  }
	}

	/**
	 * Returns invoices filtered by {organisationId}
	 * @param {Map} invoice entity
	 * @param {Number|Collection} organisations
	 * @returns {Bool}
	 */
	function byOrganisations$2(activity, organisations) {
	  if (!organisations) {
	    return true; // pass through
	  }
	  if (Immutable.isCollection(organisations)) {
	    return organisations.includes(activity.get('subject_id'));
	  }
	  return activity.get('subject_id') === organisations;
	}

	/**
	 * Filters invoice entities
	 * @param {Map} Invoices to be filtered
	 * @param {Map} Filters to apply
	 * @returns {any} The filtered invoice state.
	 */
	function selectByFilters$2(activities, filters) {

	  return activities.filter(function (activity) {
	    return byOrganisations$2(activity, filters.get('organisations'));
	  });
	}

	var fetching$b = ethicalJobsRedux.SelectorFactory.create('activities', 'fetching');

	var error$c = ethicalJobsRedux.SelectorFactory.create('activities', 'error');

	var filters$5 = ethicalJobsRedux.SelectorFactory.createFiltersSelector('activities');

	var result$7 = ethicalJobsRedux.SelectorFactory.createResultSelector('activities');

	var results$7 = ethicalJobsRedux.SelectorFactory.createResultsSelector('activities');

	var activities = ethicalJobsRedux.SelectorFactory.createEntitiesSelector('activities');

	var orderedActivities = ethicalJobsRedux.SelectorFactory.createOrderedEntitiesSelector(activities, results$7);

	var filteredActivities = createSelector([orderedActivities, filters$5], selectByFilters$2);

	var selectors$b = /*#__PURE__*/Object.freeze({
		fetching: fetching$b,
		error: error$c,
		filters: filters$5,
		result: result$7,
		results: results$7,
		activities: activities,
		orderedActivities: orderedActivities,
		filteredActivities: filteredActivities
	});

	var index$b = {
	  reducer: reducer$b,
	  selectors: selectors$b,
	  actions: actions$a
	};

	exports.App = App;
	exports.Auth = index;
	exports.Credits = index$1;
	exports.Enumerables = index$2;
	exports.Invoices = index$3;
	exports.Jobs = index$4;
	exports.Organisations = index$5;
	exports.Posts = index$6;
	exports.Taxonomies = index$7;
	exports.Users = index$8;
	exports.Payments = index$9;
	exports.Subscriptions = index$a;
	exports.Activities = index$b;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
