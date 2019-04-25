import Immutable, { Map } from 'immutable';
import Api from '@ethical-jobs/sdk';

/**
 * Appends REQUEST asyc action type
 * @return String
 */
function REQUEST(actionType) {
  return actionType + "_REQUEST";
}

/**
 * Appends SUCCESS asyc action type
 * @return String
 */
function SUCCESS(actionType) {
  return actionType + "_SUCCESS";
}

/**
 * Appends FAILURE asyc action type
 * @return String
 */
function FAILURE(actionType) {
  return actionType + "_FAILURE";
}

/**
 * Promise Generates a namespaced action type
 * @return String
 */
function createActionType(base) {
  return "ej/" + base;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/* Built-in method references that are verified to be native. */
var Map$1 = _getNative(_root, 'Map');

var _Map = Map$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * Merges [entities] properties
 * @param {Immutable} entities
 * @param {Immutable} payload
 * @return {Map}
 */
function entitiesMerger(A, B) {
  if (Immutable.List.isList(A) && Immutable.List.isList(B)) {
    return B; // Replace the nested list
  }
  if (A && A.mergeWith) {
    return A.mergeWith(entitiesMerger, B);
  }
  return B;
}

/**
 * Clears a modules entities
 * @return Object
 */
function clearEntities(state) {
  return state.update('entities', function (entities) {
    return entities.clear();
  }).update('results', function (result) {
    return result.clear();
  }).set('result', false);
}

/**
 * Updates a modules filters
 * @return Object
 */
function updateFilters(state, filters) {
  return state.mergeDeep({ filters: Immutable.fromJS(filters) });
}

/**
 * Clears a modules filters
 * @return Object
 */
function clearFilters(state) {
  return state.update('filters', function (filters) {
    return filters.clear();
  });
}

/**
 * Updates a modules sync filters
 * @return Object
 */
function updateSyncFilters(state, filters) {
  return state.mergeDeep({ syncFilters: Immutable.fromJS(filters) });
}

/**
 * Merges a modules state on request actions
 * @return {Map}
 */
function mergeRequest(state) {
  return state.set('fetching', true).set('error', false);
}

/**
 * Merges a modules state on success action
 * @return {Map}
 */
function mergeSuccess(state, payload) {
  return state.set('fetching', false).set('error', false).update('entities', function (entities) {
    var selected = get_1(payload, 'data.entities', {});
    return entities.mergeWith(entitiesMerger, Immutable.fromJS(selected));
  }).update('result', function (result) {
    return get_1(payload, 'data.result', false);
  });
}

/**
 * Merges a modules state on collection success action
 * @return {Map}
 */
function mergeCollectionSuccess(state, payload) {
  return state.set('fetching', false).set('error', false).update('entities', function (entities) {
    var selected = get_1(payload, 'data.entities', {});
    return entities.mergeDeep(Immutable.fromJS(selected));
  }).update('results', function (results) {
    var selected = get_1(payload, 'data.result', []);
    var payloadResults = Immutable.OrderedSet(selected);
    var resultsSet = Immutable.OrderedSet.isOrderedSet(results) ? results : results.toOrderedSet();
    return resultsSet.union(payloadResults);
  });
}

/**
 * Merges a modules state on failure actions
 * @return Object
 */
function mergeFailure(state, payload) {
  return state.set('error', Immutable.fromJS(payload)).set('fetching', false);
}

/**
 * Creates an ordered map from a list and a map
 * @param {List}
 * @param {Collection}
 * @return OrderedMap
 */
function createOrderedMap(keys, items) {
  return Immutable.OrderedMap(keys.map(function (key) {
    return [key.toString(), items.get(key.toString())];
  }));
}

var ImmutableTools = {
  clearEntities: clearEntities,
  updateFilters: updateFilters,
  clearFilters: clearFilters,
  updateSyncFilters: updateSyncFilters,
  mergeRequest: mergeRequest,
  mergeSuccess: mergeSuccess,
  mergeCollectionSuccess: mergeCollectionSuccess,
  mergeFailure: mergeFailure,
  createOrderedMap: createOrderedMap
};

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

var create = function create(key, property) {
  return function (state) {
    return state.getIn(['entities', key, property]);
  };
};

var createWithDefault = function createWithDefault(key, property, defaultVal) {
  return function (state) {
    return state.getIn(['entities', key, property], defaultVal);
  };
};

var createFiltersSelector = function createFiltersSelector(key) {
  return createWithDefault(key, 'filters', Immutable.Map());
};

var createSyncFiltersSelector = function createSyncFiltersSelector(key) {
  return createWithDefault(key, 'syncFilters', Immutable.Map());
};

var createPropFiltersSelector = function createPropFiltersSelector() {
  return function (state, props) {
    return Immutable.Map(props.filters, Immutable.Map());
  };
};

var createResultSelector = function createResultSelector(key) {
  return createWithDefault(key, 'result', false);
};

var createResultsSelector = function createResultsSelector(key) {
  return createWithDefault(key, 'results', Immutable.List());
};

var createEntitiesSelector = function createEntitiesSelector(key) {
  var nestedKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return function (state) {
    return state.getIn(['entities', key, 'entities', nestedKey || key], Immutable.Map());
  };
};

var createOrderedEntitiesSelector = function createOrderedEntitiesSelector(entitiesSelector, resultsSelector) {
  return createSelector([entitiesSelector, resultsSelector], function (entities, results) {
    return ImmutableTools.createOrderedMap(results, entities);
  });
};

var createIdSelector = function createIdSelector(entitiesSelector, resultSelector) {
  return createSelector([entitiesSelector, resultSelector], function (entities, result) {
    return entities.get(result.toString(), Immutable.Map());
  });
};

var selectorFactory = {
  create: create,
  createWithDefault: createWithDefault,
  createFiltersSelector: createFiltersSelector,
  createPropFiltersSelector: createPropFiltersSelector,
  createSyncFiltersSelector: createSyncFiltersSelector,
  createResultSelector: createResultSelector,
  createResultsSelector: createResultsSelector,
  createEntitiesSelector: createEntitiesSelector,
  createOrderedEntitiesSelector: createOrderedEntitiesSelector,
  createIdSelector: createIdSelector
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_APP_DATA = createActionType('APP/FETCH_DATA');
var UPLOAD_MEDIA = createActionType('APP/UPLOAD_MEDIA');

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

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var LOGIN = createActionType('AUTH/LOGIN');
var LOGOUT = createActionType('AUTH/LOGOUT');
var LOAD = createActionType('AUTH/LOAD');
var RECOVER = createActionType('AUTH/RECOVER');
var RESET = createActionType('AUTH/RESET');
var DO_THIS = createActionType('AUTH/DO_THIS');

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
var initialState$1 = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$1;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case REQUEST(LOGIN):
    case REQUEST(LOGOUT):
    case REQUEST(LOAD):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(LOGIN):
    case SUCCESS(LOAD):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(LOGOUT):
      return initialState$1;

    case FAILURE(LOGIN):
    case FAILURE(LOGOUT):
    case FAILURE(LOAD):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

function defaultEqualityCheck$1(a, b) {
  return a === b;
}

function areArgumentsShallowlyEqual$1(equalityCheck, prev, next) {
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

function defaultMemoize$1(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck$1;

  var lastArgs = null;
  var lastResult = null;
  // we reference arguments instead of spreading them for performance reasons
  return function () {
    if (!areArgumentsShallowlyEqual$1(equalityCheck, lastArgs, arguments)) {
      // apply arguments instead of spreading for performance.
      lastResult = func.apply(null, arguments);
    }

    lastArgs = arguments;
    return lastResult;
  };
}

function getDependencies$1(funcs) {
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

function createSelectorCreator$1(memoize) {
  for (var _len = arguments.length, memoizeOptions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    memoizeOptions[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      funcs[_key2] = arguments[_key2];
    }

    var recomputations = 0;
    var resultFunc = funcs.pop();
    var dependencies = getDependencies$1(funcs);

    var memoizedResultFunc = memoize.apply(undefined, [function () {
      recomputations++;
      // apply arguments instead of spreading for performance.
      return resultFunc.apply(null, arguments);
    }].concat(memoizeOptions));

    // If a selector is called with the exact same arguments we don't need to traverse our dependencies again.
    var selector = defaultMemoize$1(function () {
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

var createSelector$1 = createSelectorCreator$1(defaultMemoize$1);

var fetching = selectorFactory.create('auth', 'fetching');

var error = selectorFactory.create('auth', 'error');

var result = selectorFactory.createResultSelector('auth');

var results = selectorFactory.createResultsSelector('auth');

var users = selectorFactory.createEntitiesSelector('auth', 'users');

var organisations = selectorFactory.createEntitiesSelector('auth', 'organisations');

var authedUser = selectorFactory.createIdSelector(users, result);

var authedOrganisation = createSelector$1([organisations, authedUser], function (orgs, user) {
  return orgs.get(user.get('organisation_id', '').toString());
});

var selectors = /*#__PURE__*/Object.freeze({
  fetching: fetching,
  error: error,
  result: result,
  results: results,
  users: users,
  organisations: organisations,
  authedUser: authedUser,
  authedOrganisation: authedOrganisation
});

var index$1 = {
  reducer: reducer,
  actions: actions$1,
  selectors: selectors
};

// Initial state
var initialState$2 = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$2;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case REQUEST(App.actions.FETCH_APP_DATA):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(App.actions.FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('creditPacks', Immutable.fromJS(action.payload.data.creditPacks));

    case FAILURE(App.actions.FETCH_APP_DATA):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var PURCHASE = createActionType('CREDITS/PURCHASE');

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

var fetching$1 = selectorFactory.create('credits', 'fetching');

var error$1 = selectorFactory.create('credits', 'error');

var creditPacks = function creditPacks(state) {
  return state.getIn(['entities', 'credits', 'creditPacks']);
};

var selectors$1 = /*#__PURE__*/Object.freeze({
  fetching: fetching$1,
  error: error$1,
  creditPacks: creditPacks
});

var index$2 = {
  reducer: reducer$1,
  selectors: selectors$1,
  actions: actions$2
};

// Initial state
var initialState$3 = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$3;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case REQUEST(App.actions.FETCH_APP_DATA):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(App.actions.FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('enumerables', Immutable.fromJS(action.payload.data.enumerables));

    case FAILURE(App.actions.FETCH_APP_DATA):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$2 = selectorFactory.create('enumerables', 'fetching');

var error$2 = selectorFactory.create('enumerables', 'error');

var enumerables = function enumerables(state) {
  return state.getIn(['entities', 'enumerables', 'enumerables']);
};

var orderedEnumerable = function orderedEnumerable(state, enumerableKey) {
  return state.getIn(["entities", "enumerables", "enumerables", enumerableKey], Map()).sortBy(function (value, key) {
    return value;
  });
};

var selectors$2 = /*#__PURE__*/Object.freeze({
  fetching: fetching$2,
  error: error$2,
  enumerables: enumerables,
  orderedEnumerable: orderedEnumerable
});

var index$3 = {
  reducer: reducer$2,
  selectors: selectors$2
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION = createActionType('INVOICES/FETCH_COLLECTION');
var FETCH_ENTITY = createActionType('INVOICES/FETCH_ENTITY');
var SEARCH = createActionType('INVOICES/SEARCH');
var CREATE = createActionType('INVOICES/CREATE');
var UPDATE = createActionType('INVOICES/UPDATE');
var ARCHIVE = createActionType('INVOICES/ARCHIVE');
var RESTORE = createActionType('INVOICES/RESTORE');
var CLEAR_ENTITIES = createActionType('INVOICES/CLEAR_ENTITIES');
var UPDATE_FILTERS = createActionType('INVOICES/UPDATE_FILTERS');
var REPLACE_FILTERS = createActionType('INVOICES/REPLACE_FILTERS');

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

var create$1 = function create(params) {
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

var updateFilters$1 = function updateFilters(filters) {
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
  create: create$1,
  update: update,
  archive: archive,
  restore: restore,
  clear: clear,
  updateFilters: updateFilters$1,
  replaceFilters: replaceFilters
});

// Initial state
var initialState$4 = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$4;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES:
      return ImmutableTools.clearEntities(state);

    case UPDATE_FILTERS:
      return ImmutableTools.updateFilters(state, action.payload);

    case REQUEST(SEARCH):
    case REQUEST(FETCH_COLLECTION):
    case REQUEST(FETCH_ENTITY):
    case REQUEST(CREATE):
    case REQUEST(UPDATE):
    case REQUEST(ARCHIVE):
    case REQUEST(RESTORE):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_ENTITY):
    case SUCCESS(CREATE):
    case SUCCESS(UPDATE):
    case SUCCESS(ARCHIVE):
    case SUCCESS(RESTORE):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(FETCH_COLLECTION):
    case SUCCESS(SEARCH):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(FETCH_COLLECTION):
    case FAILURE(FETCH_ENTITY):
    case FAILURE(CREATE):
    case FAILURE(UPDATE):
    case FAILURE(ARCHIVE):
    case FAILURE(RESTORE):
    case FAILURE(SEARCH):
      return ImmutableTools.mergeFailure(state, action.payload);

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

var fetching$3 = selectorFactory.create('invoices', 'fetching');

var error$3 = selectorFactory.create('invoices', 'error');

var filters = selectorFactory.createFiltersSelector('invoices');

var result$1 = selectorFactory.createResultSelector('invoices');

var results$1 = selectorFactory.createResultsSelector('invoices');

var invoices = selectorFactory.createEntitiesSelector('invoices');

var orderedInvoices = selectorFactory.createOrderedEntitiesSelector(invoices, results$1);

var invoiceByResult = selectorFactory.createIdSelector(invoices, result$1);

var filteredInvoices = createSelector$1([orderedInvoices, filters], selectByFilters);

var selectors$3 = /*#__PURE__*/Object.freeze({
  fetching: fetching$3,
  error: error$3,
  filters: filters,
  result: result$1,
  results: results$1,
  invoices: invoices,
  orderedInvoices: orderedInvoices,
  invoiceByResult: invoiceByResult,
  filteredInvoices: filteredInvoices
});

var index$4 = {
  reducer: reducer$3,
  actions: actions$3,
  selectors: selectors$3
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$1 = createActionType('JOBS/FETCH_COLLECTION');
var FETCH_ENTITY$1 = createActionType('JOBS/FETCH_ENTITY');
var SEARCH$1 = createActionType('JOBS/SEARCH');
var CREATE$1 = createActionType('JOBS/CREATE');
var UPDATE$1 = createActionType('JOBS/UPDATE');
var ARCHIVE$1 = createActionType('JOBS/ARCHIVE');
var RESTORE$1 = createActionType('JOBS/RESTORE');
var APPROVE = createActionType('JOBS/APPROVE');
var EXPIRE = createActionType('JOBS/EXPIRE');
var ATTACH = createActionType('JOBS/ATTACH');
var DETACH = createActionType('JOBS/DETACH');
var LOCK = createActionType('JOBS/LOCK');
var UNLOCK = createActionType('JOBS/UNLOCK');
var CLEAR_ENTITIES$1 = createActionType('JOBS/CLEAR_ENTITIES');
var UPDATE_FILTERS$1 = createActionType('JOBS/UPDATE_FILTERS');
var REPLACE_FILTERS$1 = createActionType('JOBS/REPLACE_FILTERS');
var CLEAR_FILTERS = createActionType('JOBS/CLEAR_FILTERS');
var UPDATE_SYNC_FILTERS = createActionType('JOBS/UPDATE_SYNC_FILTERS');

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

var create$2 = function create(params) {
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

var update$1 = function update(id, params) {
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

var updateFilters$2 = function updateFilters(filters) {
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

var clearFilters$1 = function clearFilters(filters) {
  return {
    type: CLEAR_FILTERS,
    payload: filters
  };
};

var updateSyncFilters$1 = function updateSyncFilters(filters) {
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
  create: create$2,
  draft: draft,
  update: update$1,
  archive: archive$1,
  restore: restore$1,
  approve: approve,
  expire: expire,
  attachMedia: attachMedia,
  detachMedia: detachMedia,
  lock: lock,
  unlock: unlock,
  clear: clear$1,
  updateFilters: updateFilters$2,
  replaceFilters: replaceFilters$1,
  clearFilters: clearFilters$1,
  updateSyncFilters: updateSyncFilters$1
});

// Initial state
var initialState$5 = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$5;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$1:
      return ImmutableTools.clearEntities(state);

    case UPDATE_FILTERS$1:
      return ImmutableTools.updateFilters(state, action.payload);

    case CLEAR_FILTERS:
      return ImmutableTools.clearFilters(state);

    case UPDATE_SYNC_FILTERS:
      return ImmutableTools.updateSyncFilters(state, action.payload);

    case REQUEST(SEARCH$1):
    case REQUEST(FETCH_COLLECTION$1):
    case REQUEST(FETCH_ENTITY$1):
    case REQUEST(CREATE$1):
    case REQUEST(UPDATE$1):
    case REQUEST(ARCHIVE$1):
    case REQUEST(RESTORE$1):
    case REQUEST(APPROVE):
    case REQUEST(EXPIRE):
    case REQUEST(ATTACH):
    case REQUEST(DETACH):
    case REQUEST(LOCK):
    case REQUEST(UNLOCK):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_ENTITY$1):
    case SUCCESS(CREATE$1):
    case SUCCESS(UPDATE$1):
    case SUCCESS(ARCHIVE$1):
    case SUCCESS(RESTORE$1):
    case SUCCESS(APPROVE):
    case SUCCESS(EXPIRE):
    case SUCCESS(ATTACH):
    case SUCCESS(DETACH):
    case SUCCESS(LOCK):
    case SUCCESS(UNLOCK):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(FETCH_COLLECTION$1):
    case SUCCESS(SEARCH$1):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(FETCH_COLLECTION$1):
    case FAILURE(FETCH_ENTITY$1):
    case FAILURE(CREATE$1):
    case FAILURE(UPDATE$1):
    case FAILURE(ARCHIVE$1):
    case FAILURE(RESTORE$1):
    case FAILURE(APPROVE):
    case FAILURE(EXPIRE):
    case FAILURE(ATTACH):
    case FAILURE(DETACH):
    case FAILURE(SEARCH$1):
    case FAILURE(LOCK):
    case FAILURE(UNLOCK):
      return ImmutableTools.mergeFailure(state, action.payload);

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

var fetching$4 = selectorFactory.create('jobs', 'fetching');

var error$4 = selectorFactory.create('jobs', 'error');

var filters$1 = selectorFactory.createFiltersSelector('jobs');

var syncFilters = selectorFactory.createSyncFiltersSelector('jobs');

var propsFilters = selectorFactory.createPropFiltersSelector();

var result$2 = selectorFactory.createResultSelector('jobs');

var results$2 = selectorFactory.createResultsSelector('jobs');

var jobs = selectorFactory.createEntitiesSelector('jobs');

var orderedJobs = selectorFactory.createOrderedEntitiesSelector(jobs, results$2);

var jobByResult = selectorFactory.createIdSelector(jobs, result$2);

var organisations$1 = selectorFactory.createEntitiesSelector('jobs', 'organisations');

var media = selectorFactory.createEntitiesSelector('jobs', 'media');

var attachments = createSelector$1([jobByResult, media], function (job, media) {
  return media.filter(function (item, key) {
    var mediaId = parseInt(key, 10);
    return job.get('attachments').includes(mediaId);
  });
});

var filteredJobs = createSelector$1([jobs, filters$1], filterJobs);

var orderedFilteredJobs = createSelector$1([orderedJobs, filters$1], filterJobs);

var propsOrderedFilteredJobs = createSelector$1([orderedJobs, propsFilters], filterJobs);

var selectors$4 = /*#__PURE__*/Object.freeze({
  fetching: fetching$4,
  error: error$4,
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
  attachments: attachments,
  filteredJobs: filteredJobs,
  orderedFilteredJobs: orderedFilteredJobs,
  propsOrderedFilteredJobs: propsOrderedFilteredJobs
});

var APPROVED = 'APPROVED';

var PENDING$1 = 'PENDING';

var DRAFT = 'DRAFT';

var JobStatus = {
  APPROVED: APPROVED,
  PENDING: PENDING$1,
  DRAFT: DRAFT
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.6.5' };
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

var document = _global.document;
// typeof document.createElement is 'object' in old IE
var is = _isObject(document) && _isObject(document.createElement);
var _domCreate = function (it) {
  return is ? document.createElement(it) : {};
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

var hasOwnProperty$4 = {}.hasOwnProperty;
var _has = function (it, key) {
  return hasOwnProperty$4.call(it, key);
};

var id = 0;
var px = Math.random();
var _uid = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

var _library = false;

var _shared = createCommonjsModule(function (module) {
var SHARED = '__core-js_shared__';
var store = _global[SHARED] || (_global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: _core.version,
  mode: _library ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});
});

var _functionToString = _shared('native-function-to-string', Function.toString);

var _redefine = createCommonjsModule(function (module) {
var SRC = _uid('src');

var TO_STRING = 'toString';
var TPL = ('' + _functionToString).split(TO_STRING);

_core.inspectSource = function (it) {
  return _functionToString.call(it);
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
  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
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
var floor = Math.floor;
var _toInteger = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
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

var shared = _shared('keys');

var _sharedKey = function (key) {
  return shared[key] || (shared[key] = _uid(key));
};

var arrayIndexOf = _arrayIncludes(false);
var IE_PROTO = _sharedKey('IE_PROTO');

var _objectKeysInternal = function (object, names) {
  var O = _toIobject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (_has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
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

var index$5 = {
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

var FETCH_COLLECTION$2 = createActionType('ORGANISATIONS/FETCH_COLLECTION');
var FETCH_ENTITY$2 = createActionType('ORGANISATIONS/FETCH_ENTITY');
var CLEAR_ENTITIES$2 = createActionType('ORGANISATIONS/CLEAR_ENTITIES');
var SEARCH$2 = createActionType('ORGANISATIONS/SEARCH');
var CREATE$2 = createActionType('ORGANISATIONS/CREATE');
var UPDATE$2 = createActionType('ORGANISATIONS/UPDATE');
var PATCH = createActionType('ORGANISATIONS/PATCH');
var ARCHIVE$2 = createActionType('ORGANISATIONS/ARCHIVE');
var RESTORE$2 = createActionType('ORGANISATIONS/RESTORE');
var UPLOAD_LOGO = createActionType('ORGANISATIONS/UPLOAD_LOGO');
var CREATE_CREDITS = createActionType('ORGANISATIONS/CREATE_CREDITS');
var DEDUCT_CREDITS = createActionType('ORGANISATIONS/DEDUCT_CREDITS');
var UPDATE_FILTERS$2 = createActionType('ORGANISATIONS/UPDATE_FILTERS');
var REPLACE_FILTERS$2 = createActionType('ORGANISATIONS/REPLACE_FILTERS');

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

var create$3 = function create(params) {
  return {
    type: CREATE$2,
    payload: Api.post('/organisations', params)
  };
};

var update$2 = function update(id, params) {
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

var updateFilters$3 = function updateFilters(_updateFilters) {
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
  create: create$3,
  update: update$2,
  patch: patch,
  archive: archive$2,
  restore: restore$2,
  uploadLogo: uploadLogo,
  createCredits: createCredits,
  deductCredits: deductCredits,
  clear: clear$2,
  updateFilters: updateFilters$3,
  replaceFilters: replaceFilters$2
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

function reducer$5() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$6;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$2:
      return ImmutableTools.clearEntities(state);

    case UPDATE_FILTERS$2:
      return ImmutableTools.updateFilters(state, action.payload);

    case REQUEST(SEARCH$2):
    case REQUEST(FETCH_COLLECTION$2):
    case REQUEST(FETCH_ENTITY$2):
    case REQUEST(CREATE$2):
    case REQUEST(UPDATE$2):
    case REQUEST(PATCH):
    case REQUEST(ARCHIVE$2):
    case REQUEST(RESTORE$2):
    case REQUEST(UPLOAD_LOGO):
    case REQUEST(CREATE_CREDITS):
    case REQUEST(DEDUCT_CREDITS):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_ENTITY$2):
    case SUCCESS(CREATE$2):
    case SUCCESS(UPDATE$2):
    case SUCCESS(PATCH):
    case SUCCESS(ARCHIVE$2):
    case SUCCESS(RESTORE$2):
    case SUCCESS(UPLOAD_LOGO):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(FETCH_COLLECTION$2):
    case SUCCESS(SEARCH$2):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(FETCH_COLLECTION$2):
    case FAILURE(FETCH_ENTITY$2):
    case FAILURE(CREATE$2):
    case FAILURE(UPDATE$2):
    case FAILURE(PATCH):
    case FAILURE(ARCHIVE$2):
    case FAILURE(RESTORE$2):
    case FAILURE(UPLOAD_LOGO):
    case FAILURE(CREATE_CREDITS):
    case FAILURE(DEDUCT_CREDITS):
    case FAILURE(SEARCH$2):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$5 = selectorFactory.create('organisations', 'fetching');

var error$5 = selectorFactory.create('organisations', 'error');

var filters$2 = selectorFactory.createFiltersSelector('organisations');

var result$3 = selectorFactory.createResultSelector('organisations');

var results$3 = selectorFactory.createResultsSelector('organisations');

var organisations$2 = selectorFactory.createEntitiesSelector('organisations');

var orderedOrganisations = selectorFactory.createOrderedEntitiesSelector(organisations$2, results$3);

var organisationByResult = selectorFactory.createIdSelector(organisations$2, result$3);

var users$1 = selectorFactory.createEntitiesSelector('organisations', 'users');

var organisationOwner = createSelector$1([organisationByResult, users$1], function (org, users) {
  return users.get(org.get('owner_id', '').toString(), Immutable.Map());
});

var organisationAdmin = createSelector$1([organisationByResult, users$1], function (org, users) {
  return users.get(org.get('admin_id', '').toString(), Immutable.Map());
});

var selectors$5 = /*#__PURE__*/Object.freeze({
  fetching: fetching$5,
  error: error$5,
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

var index$6 = {
  reducer: reducer$5,
  actions: actions$5,
  selectors: selectors$5
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$3 = createActionType('POSTS/FETCH_COLLECTION');
var FETCH_ENTITY$3 = createActionType('POSTS/FETCH_ENTITY');
var CLEAR_ENTITIES$3 = createActionType('POSTS/CLEAR_ENTITIES');
var UPDATE_FILTERS$3 = createActionType('POSTS/UPDATE_FILTERS');
var REPLACE_FILTERS$3 = createActionType('POSTS/REPLACE_FILTERS');

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

var updateFilters$4 = function updateFilters(filters) {
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
  updateFilters: updateFilters$4,
  replaceFilters: replaceFilters$3
});

// Initial state
var initialState$7 = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$7;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$3:
      return ImmutableTools.clearEntities(state);

    case UPDATE_FILTERS$3:
      return ImmutableTools.updateFilters(state, action.payload);

    case REQUEST(FETCH_COLLECTION$3):
    case REQUEST(FETCH_ENTITY$3):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_ENTITY$3):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(FETCH_COLLECTION$3):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(FETCH_COLLECTION$3):
    case FAILURE(FETCH_ENTITY$3):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$6 = selectorFactory.create('posts', 'fetching');

var error$6 = selectorFactory.create('posts', 'error');

var filters$3 = selectorFactory.createFiltersSelector('posts');

var result$4 = selectorFactory.createResultSelector('posts');

var results$4 = selectorFactory.createResultsSelector('posts');

var postsSelector = selectorFactory.createEntitiesSelector('posts');

// export const orderedPosts = SelectorFactory.createOrderedEntitiesSelector(postsSelector, results);

var orderedPosts = createSelector$1([postsSelector, results$4], function (posts, results) {
  return Immutable.OrderedMap(results.map(function (result) {
    return [result.toString(), posts.get(result.toString())];
  }));
});

var postByResult = selectorFactory.createIdSelector(postsSelector, result$4);

var selectors$6 = /*#__PURE__*/Object.freeze({
  fetching: fetching$6,
  error: error$6,
  filters: filters$3,
  result: result$4,
  results: results$4,
  postsSelector: postsSelector,
  orderedPosts: orderedPosts,
  postByResult: postByResult
});

var index$7 = {
  reducer: reducer$6,
  actions: actions$6,
  selectors: selectors$6
};

// Initial state
var initialState$8 = Immutable.fromJS({
  fetching: false,
  error: false,
  taxonomies: {}
});

/**
 * Taxonomies reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reducer$7() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$8;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case REQUEST(FETCH_APP_DATA):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_APP_DATA):
      return state.set('fetching', false).set('error', false).set('taxonomies', Immutable.fromJS(action.payload.data.taxonomies));

    case FAILURE(FETCH_APP_DATA):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

// 20.1.2.3 Number.isInteger(number)

var floor$1 = Math.floor;
var _isInteger = function isInteger(it) {
  return !_isObject(it) && isFinite(it) && floor$1(it) === it;
};

// 20.1.2.3 Number.isInteger(number)


_export(_export.S, 'Number', { isInteger: _isInteger });

var isInteger = _core.Number.isInteger;

var fetching$7 = selectorFactory.create('taxonomies', 'fetching');

var error$7 = selectorFactory.create('taxonomies', 'error');

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
  error: error$7,
  taxonomies: taxonomies,
  orderedTaxonomy: orderedTaxonomy,
  orderedTaxonomyWithJobs: orderedTaxonomyWithJobs
});

var index$8 = {
  reducer: reducer$7,
  selectors: selectors$7
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var FETCH_COLLECTION$4 = createActionType('USERS/FETCH_COLLECTION');
var FETCH_ENTITY$4 = createActionType('USERS/FETCH_ENTITY');
var CREATE$3 = createActionType('USERS/CREATE');
var UPDATE$3 = createActionType('USERS/UPDATE');
var PATCH$1 = createActionType('USERS/PATCH');
var ARCHIVE$3 = createActionType('USERS/ARCHIVE');
var RESTORE$3 = createActionType('USERS/RESTORE');
var CLEAR_ENTITIES$4 = createActionType('USERS/CLEAR_ENTITIES');
var UPDATE_FILTERS$4 = createActionType('USERS/UPDATE_FILTERS');
var REPLACE_FILTERS$4 = createActionType('USERS/REPLACE_FILTERS');

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

var create$4 = function create(params) {
  return {
    type: CREATE$3,
    payload: Api.post('/users', params)
  };
};

var update$3 = function update(id, params) {
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

var updateFilters$5 = function updateFilters(filters) {
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
  create: create$4,
  update: update$3,
  patch: patch$1,
  archive: archive$3,
  restore: restore$3,
  clear: clear$4,
  updateFilters: updateFilters$5,
  replaceFilters: replaceFilters$4
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
 * User reducer
 * @author Andrew McLagan <andrew@ethicaljobs.com.au>
 */
function reducer$8() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$9;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$4:
      return ImmutableTools.clearEntities(state);

    case UPDATE_FILTERS$4:
      return ImmutableTools.updateFilters(state, action.payload);

    case REQUEST(FETCH_COLLECTION$4):
    case REQUEST(FETCH_ENTITY$4):
    case REQUEST(CREATE$3):
    case REQUEST(UPDATE$3):
    case REQUEST(PATCH$1):
    case REQUEST(ARCHIVE$3):
    case REQUEST(RESTORE$3):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_ENTITY$4):
    case SUCCESS(CREATE$3):
    case SUCCESS(UPDATE$3):
    case SUCCESS(PATCH$1):
    case SUCCESS(ARCHIVE$3):
    case SUCCESS(RESTORE$3):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(FETCH_COLLECTION$4):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(FETCH_COLLECTION$4):
    case FAILURE(FETCH_ENTITY$4):
    case FAILURE(CREATE$3):
    case FAILURE(UPDATE$3):
    case FAILURE(PATCH$1):
    case FAILURE(ARCHIVE$3):
    case FAILURE(RESTORE$3):
      return ImmutableTools.mergeFailure(state, action.payload);

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

var fetching$8 = selectorFactory.create('users', 'fetching');

var error$8 = selectorFactory.create('users', 'error');

var filters$4 = selectorFactory.createFiltersSelector('users');

var result$5 = selectorFactory.createResultSelector('users');

var results$5 = selectorFactory.createResultsSelector('users');

var users$2 = selectorFactory.createEntitiesSelector('users');

var orderedUsers = selectorFactory.createOrderedEntitiesSelector(users$2, results$5);

var userByResult = selectorFactory.createIdSelector(users$2, result$5);

var filteredUsers = createSelector$1([orderedUsers, filters$4], selectByFilters$1);

var selectors$8 = /*#__PURE__*/Object.freeze({
  fetching: fetching$8,
  error: error$8,
  filters: filters$4,
  result: result$5,
  results: results$5,
  users: users$2,
  orderedUsers: orderedUsers,
  userByResult: userByResult,
  filteredUsers: filteredUsers
});

var index$9 = {
  actions: actions$7,
  reducer: reducer$8,
  selectors: selectors$8
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/

var PURCHASE$1 = createActionType('PAYMENTS/PURCHASE');

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
var initialState$a = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$a;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case REQUEST(PURCHASE$1):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(PURCHASE$1):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case FAILURE(PURCHASE$1):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$9 = selectorFactory.create('payments', 'fetching');

var error$9 = selectorFactory.create('payments', 'error');

var selectors$9 = /*#__PURE__*/Object.freeze({
  fetching: fetching$9,
  error: error$9
});

var index$a = {
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

var CREATE$4 = createActionType('SUBSCRIPTIONS/CREATE');
var FETCH_COLLECTION$5 = createActionType('SUBSCRIPTIONS/FETCH_COLLECTION');
var FETCH_ENTITY$5 = createActionType('SUBSCRIPTIONS/FETCH_ENTITY');
var DELETE = createActionType('SUBSCRIPTIONS/DELETE');
var CONFIRM = createActionType('SUBSCRIPTIONS/CONFIRM');

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/
var create$5 = function create(params) {
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
    type: DELETE,
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
  DELETE: DELETE,
  CONFIRM: CONFIRM,
  create: create$5,
  fetchCollection: fetchCollection$5,
  fetchEntity: fetchEntity$5,
  destroy: destroy,
  confirm: confirm
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
 * subscriptions reducer
 *
 * @author Sebastian Sibelle <sebastian@ethicaljobs.com.au>
 */

function reducer$a() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$b;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {

    case REQUEST(CREATE$4):
    case REQUEST(FETCH_COLLECTION$5):
    case REQUEST(FETCH_ENTITY$5):
    case REQUEST(DELETE):
    case REQUEST(CONFIRM):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(CREATE$4):
    case SUCCESS(FETCH_ENTITY$5):
    case SUCCESS(DELETE):
    case SUCCESS(CONFIRM):
      return ImmutableTools.mergeSuccess(state, action.payload);

    case SUCCESS(FETCH_COLLECTION$5):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(CREATE$4):
    case FAILURE(FETCH_ENTITY$5):
    case FAILURE(FETCH_COLLECTION$5):
    case FAILURE(DELETE):
    case FAILURE(CONFIRM):
      return ImmutableTools.mergeFailure(state, action.payload);

    default:
      return state;
  }
}

var fetching$a = selectorFactory.create('subscriptions', 'fetching');

var error$a = selectorFactory.create('subscriptions', 'error');

var result$6 = selectorFactory.createResultSelector('subscriptions');

var results$6 = selectorFactory.createResultsSelector('subscriptions');

var subscriptions = selectorFactory.createEntitiesSelector('subscriptions');

var alerts = selectorFactory.createEntitiesSelector('subscriptions', 'alerts');

var selectors$a = /*#__PURE__*/Object.freeze({
  fetching: fetching$a,
  error: error$a,
  result: result$6,
  results: results$6,
  subscriptions: subscriptions,
  alerts: alerts
});

var index$b = {
  reducer: reducer$a,
  actions: actions$9,
  selectors: selectors$a
};

/*
|--------------------------------------------------------------------------
| Action Types
|--------------------------------------------------------------------------
*/
var FETCH_COLLECTION$6 = createActionType('ACTIVITIES/FETCH_COLLECTION');
var CLEAR_ENTITIES$5 = createActionType('ACTIVITIES/CLEAR_ENTITIES');
var UPDATE_FILTERS$5 = createActionType('ACTIVITIES/UPDATE_FILTERS');
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

var updateFilters$6 = function updateFilters(_updateFilters) {
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
  updateFilters: updateFilters$6
});

// Initial state
var initialState$c = Immutable.fromJS({
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
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$c;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case CLEAR_ENTITIES$5:
      return ImmutableTools.clearEntities(state);

    case UPDATE_FILTERS$5:
      return ImmutableTools.updateFilters(state, action.payload);

    case REQUEST(FETCH_COLLECTION$6):
      return ImmutableTools.mergeRequest(state);

    case SUCCESS(FETCH_COLLECTION$6):
      return ImmutableTools.mergeCollectionSuccess(state, action.payload);

    case FAILURE(FETCH_COLLECTION$6):
      return ImmutableTools.mergeFailure(state, action.payload);

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

var fetching$b = selectorFactory.create('activities', 'fetching');

var error$b = selectorFactory.create('activities', 'error');

var filters$5 = selectorFactory.createFiltersSelector('activities');

var result$7 = selectorFactory.createResultSelector('activities');

var results$7 = selectorFactory.createResultsSelector('activities');

var activities = selectorFactory.createEntitiesSelector('activities');

var orderedActivities = selectorFactory.createOrderedEntitiesSelector(activities, results$7);

var filteredActivities = createSelector$1([orderedActivities, filters$5], selectByFilters$2);

var selectors$b = /*#__PURE__*/Object.freeze({
  fetching: fetching$b,
  error: error$b,
  filters: filters$5,
  result: result$7,
  results: results$7,
  activities: activities,
  orderedActivities: orderedActivities,
  filteredActivities: filteredActivities
});

var index$c = {
  reducer: reducer$b,
  selectors: selectors$b,
  actions: actions$a
};

export { App, index$1 as Auth, index$2 as Credits, index$3 as Enumerables, index$4 as Invoices, index$5 as Jobs, index$6 as Organisations, index$7 as Posts, index$8 as Taxonomies, index$9 as Users, index$a as Payments, index$b as Subscriptions, index$c as Activities };
