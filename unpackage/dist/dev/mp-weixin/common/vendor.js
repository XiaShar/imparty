"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$2 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$2.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x2) => x2.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = 0, len = evts.length; i2 < len; i2++) {
        if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
          liveEvents.push(evts[i2]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__5DFC08B",
    appName: "myApp",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.7.9",
    uniRuntimeVersion: "3.7.9",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__5DFC08B",
      appName: "myApp",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  const newWx = {};
  for (const key in wx) {
    if (isWxKey(key)) {
      newWx[key] = wx[key];
    }
  }
  if (typeof globalThis !== "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$1(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i2 = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i2 < queue.length; i2++) {
    const cb = queue[i2];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i2, 1);
      i2--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a2, b2) => {
  const diff2 = getId(a2) - getId(b2);
  if (diff2 === 0) {
    if (a2.pre && !b2.pre)
      return -1;
    if (b2.pre && !a2.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => isString(a2) ? a2.trim() : a2);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i2) => i2,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i2) => i2.__$el || (i2.__$el = {}),
    $data: (i2) => i2.data,
    $props: (i2) => shallowReadonly(i2.props),
    $attrs: (i2) => shallowReadonly(i2.attrs),
    $slots: (i2) => shallowReadonly(i2.slots),
    $refs: (i2) => shallowReadonly(i2.refs),
    $parent: (i2) => getPublicInstance(i2.parent),
    $root: (i2) => getPublicInstance(i2.root),
    $emit: (i2) => i2.emit,
    $options: (i2) => resolveMergedOptions(i2),
    $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i2) => instanceWatch.bind(i2)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn$1(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn$1(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c2 = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn$1(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k2, v2) {
  result[k2] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u: u2 } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u2) {
        queuePostRenderEffect(u2);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? eventTarget.dataset.eventsync === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p$1 = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      properties.name = {
        type: null,
        value: ""
      };
      properties.value = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var gtpushMinExports = {};
var gtpushMin = {
  get exports() {
    return gtpushMinExports;
  },
  set exports(v2) {
    gtpushMinExports = v2;
  }
};
/*! For license information please see gtpush-min.js.LICENSE.txt */
(function(module2, exports2) {
  (function t2(e2, r2) {
    module2.exports = r2();
  })(self, () => (() => {
    var t2 = { 4736: (t3, e3, r3) => {
      t3 = r3.nmd(t3);
      var i3;
      var n2 = function(t4) {
        var e4 = 1e7, r4 = 7, i4 = 9007199254740992, s2 = d2(i4), a2 = "0123456789abcdefghijklmnopqrstuvwxyz";
        var o2 = "function" === typeof BigInt;
        function u2(t5, e5, r5, i5) {
          if ("undefined" === typeof t5)
            return u2[0];
          if ("undefined" !== typeof e5)
            return 10 === +e5 && !r5 ? st2(t5) : X2(t5, e5, r5, i5);
          return st2(t5);
        }
        function c2(t5, e5) {
          this.value = t5;
          this.sign = e5;
          this.isSmall = false;
        }
        c2.prototype = Object.create(u2.prototype);
        function l2(t5) {
          this.value = t5;
          this.sign = t5 < 0;
          this.isSmall = true;
        }
        l2.prototype = Object.create(u2.prototype);
        function f2(t5) {
          this.value = t5;
        }
        f2.prototype = Object.create(u2.prototype);
        function h2(t5) {
          return -i4 < t5 && t5 < i4;
        }
        function d2(t5) {
          if (t5 < 1e7)
            return [t5];
          if (t5 < 1e14)
            return [t5 % 1e7, Math.floor(t5 / 1e7)];
          return [t5 % 1e7, Math.floor(t5 / 1e7) % 1e7, Math.floor(t5 / 1e14)];
        }
        function v2(t5) {
          p2(t5);
          var r5 = t5.length;
          if (r5 < 4 && N2(t5, s2) < 0)
            switch (r5) {
              case 0:
                return 0;
              case 1:
                return t5[0];
              case 2:
                return t5[0] + t5[1] * e4;
              default:
                return t5[0] + (t5[1] + t5[2] * e4) * e4;
            }
          return t5;
        }
        function p2(t5) {
          var e5 = t5.length;
          while (0 === t5[--e5])
            ;
          t5.length = e5 + 1;
        }
        function g2(t5) {
          var e5 = new Array(t5);
          var r5 = -1;
          while (++r5 < t5)
            e5[r5] = 0;
          return e5;
        }
        function y2(t5) {
          if (t5 > 0)
            return Math.floor(t5);
          return Math.ceil(t5);
        }
        function m2(t5, r5) {
          var i5 = t5.length, n3 = r5.length, s3 = new Array(i5), a3 = 0, o3 = e4, u3, c3;
          for (c3 = 0; c3 < n3; c3++) {
            u3 = t5[c3] + r5[c3] + a3;
            a3 = u3 >= o3 ? 1 : 0;
            s3[c3] = u3 - a3 * o3;
          }
          while (c3 < i5) {
            u3 = t5[c3] + a3;
            a3 = u3 === o3 ? 1 : 0;
            s3[c3++] = u3 - a3 * o3;
          }
          if (a3 > 0)
            s3.push(a3);
          return s3;
        }
        function w2(t5, e5) {
          if (t5.length >= e5.length)
            return m2(t5, e5);
          return m2(e5, t5);
        }
        function _2(t5, r5) {
          var i5 = t5.length, n3 = new Array(i5), s3 = e4, a3, o3;
          for (o3 = 0; o3 < i5; o3++) {
            a3 = t5[o3] - s3 + r5;
            r5 = Math.floor(a3 / s3);
            n3[o3] = a3 - r5 * s3;
            r5 += 1;
          }
          while (r5 > 0) {
            n3[o3++] = r5 % s3;
            r5 = Math.floor(r5 / s3);
          }
          return n3;
        }
        c2.prototype.add = function(t5) {
          var e5 = st2(t5);
          if (this.sign !== e5.sign)
            return this.subtract(e5.negate());
          var r5 = this.value, i5 = e5.value;
          if (e5.isSmall)
            return new c2(_2(r5, Math.abs(i5)), this.sign);
          return new c2(w2(r5, i5), this.sign);
        };
        c2.prototype.plus = c2.prototype.add;
        l2.prototype.add = function(t5) {
          var e5 = st2(t5);
          var r5 = this.value;
          if (r5 < 0 !== e5.sign)
            return this.subtract(e5.negate());
          var i5 = e5.value;
          if (e5.isSmall) {
            if (h2(r5 + i5))
              return new l2(r5 + i5);
            i5 = d2(Math.abs(i5));
          }
          return new c2(_2(i5, Math.abs(r5)), r5 < 0);
        };
        l2.prototype.plus = l2.prototype.add;
        f2.prototype.add = function(t5) {
          return new f2(this.value + st2(t5).value);
        };
        f2.prototype.plus = f2.prototype.add;
        function S2(t5, r5) {
          var i5 = t5.length, n3 = r5.length, s3 = new Array(i5), a3 = 0, o3 = e4, u3, c3;
          for (u3 = 0; u3 < n3; u3++) {
            c3 = t5[u3] - a3 - r5[u3];
            if (c3 < 0) {
              c3 += o3;
              a3 = 1;
            } else
              a3 = 0;
            s3[u3] = c3;
          }
          for (u3 = n3; u3 < i5; u3++) {
            c3 = t5[u3] - a3;
            if (c3 < 0)
              c3 += o3;
            else {
              s3[u3++] = c3;
              break;
            }
            s3[u3] = c3;
          }
          for (; u3 < i5; u3++)
            s3[u3] = t5[u3];
          p2(s3);
          return s3;
        }
        function b2(t5, e5, r5) {
          var i5;
          if (N2(t5, e5) >= 0)
            i5 = S2(t5, e5);
          else {
            i5 = S2(e5, t5);
            r5 = !r5;
          }
          i5 = v2(i5);
          if ("number" === typeof i5) {
            if (r5)
              i5 = -i5;
            return new l2(i5);
          }
          return new c2(i5, r5);
        }
        function E2(t5, r5, i5) {
          var n3 = t5.length, s3 = new Array(n3), a3 = -r5, o3 = e4, u3, f3;
          for (u3 = 0; u3 < n3; u3++) {
            f3 = t5[u3] + a3;
            a3 = Math.floor(f3 / o3);
            f3 %= o3;
            s3[u3] = f3 < 0 ? f3 + o3 : f3;
          }
          s3 = v2(s3);
          if ("number" === typeof s3) {
            if (i5)
              s3 = -s3;
            return new l2(s3);
          }
          return new c2(s3, i5);
        }
        c2.prototype.subtract = function(t5) {
          var e5 = st2(t5);
          if (this.sign !== e5.sign)
            return this.add(e5.negate());
          var r5 = this.value, i5 = e5.value;
          if (e5.isSmall)
            return E2(r5, Math.abs(i5), this.sign);
          return b2(r5, i5, this.sign);
        };
        c2.prototype.minus = c2.prototype.subtract;
        l2.prototype.subtract = function(t5) {
          var e5 = st2(t5);
          var r5 = this.value;
          if (r5 < 0 !== e5.sign)
            return this.add(e5.negate());
          var i5 = e5.value;
          if (e5.isSmall)
            return new l2(r5 - i5);
          return E2(i5, Math.abs(r5), r5 >= 0);
        };
        l2.prototype.minus = l2.prototype.subtract;
        f2.prototype.subtract = function(t5) {
          return new f2(this.value - st2(t5).value);
        };
        f2.prototype.minus = f2.prototype.subtract;
        c2.prototype.negate = function() {
          return new c2(this.value, !this.sign);
        };
        l2.prototype.negate = function() {
          var t5 = this.sign;
          var e5 = new l2(-this.value);
          e5.sign = !t5;
          return e5;
        };
        f2.prototype.negate = function() {
          return new f2(-this.value);
        };
        c2.prototype.abs = function() {
          return new c2(this.value, false);
        };
        l2.prototype.abs = function() {
          return new l2(Math.abs(this.value));
        };
        f2.prototype.abs = function() {
          return new f2(this.value >= 0 ? this.value : -this.value);
        };
        function D2(t5, r5) {
          var i5 = t5.length, n3 = r5.length, s3 = i5 + n3, a3 = g2(s3), o3 = e4, u3, c3, l3, f3, h3;
          for (l3 = 0; l3 < i5; ++l3) {
            f3 = t5[l3];
            for (var d3 = 0; d3 < n3; ++d3) {
              h3 = r5[d3];
              u3 = f3 * h3 + a3[l3 + d3];
              c3 = Math.floor(u3 / o3);
              a3[l3 + d3] = u3 - c3 * o3;
              a3[l3 + d3 + 1] += c3;
            }
          }
          p2(a3);
          return a3;
        }
        function T(t5, r5) {
          var i5 = t5.length, n3 = new Array(i5), s3 = e4, a3 = 0, o3, u3;
          for (u3 = 0; u3 < i5; u3++) {
            o3 = t5[u3] * r5 + a3;
            a3 = Math.floor(o3 / s3);
            n3[u3] = o3 - a3 * s3;
          }
          while (a3 > 0) {
            n3[u3++] = a3 % s3;
            a3 = Math.floor(a3 / s3);
          }
          return n3;
        }
        function M2(t5, e5) {
          var r5 = [];
          while (e5-- > 0)
            r5.push(0);
          return r5.concat(t5);
        }
        function I2(t5, e5) {
          var r5 = Math.max(t5.length, e5.length);
          if (r5 <= 30)
            return D2(t5, e5);
          r5 = Math.ceil(r5 / 2);
          var i5 = t5.slice(r5), n3 = t5.slice(0, r5), s3 = e5.slice(r5), a3 = e5.slice(0, r5);
          var o3 = I2(n3, a3), u3 = I2(i5, s3), c3 = I2(w2(n3, i5), w2(a3, s3));
          var l3 = w2(w2(o3, M2(S2(S2(c3, o3), u3), r5)), M2(u3, 2 * r5));
          p2(l3);
          return l3;
        }
        function A2(t5, e5) {
          return -0.012 * t5 - 0.012 * e5 + 15e-6 * t5 * e5 > 0;
        }
        c2.prototype.multiply = function(t5) {
          var r5 = st2(t5), i5 = this.value, n3 = r5.value, s3 = this.sign !== r5.sign, a3;
          if (r5.isSmall) {
            if (0 === n3)
              return u2[0];
            if (1 === n3)
              return this;
            if (-1 === n3)
              return this.negate();
            a3 = Math.abs(n3);
            if (a3 < e4)
              return new c2(T(i5, a3), s3);
            n3 = d2(a3);
          }
          if (A2(i5.length, n3.length))
            return new c2(I2(i5, n3), s3);
          return new c2(D2(i5, n3), s3);
        };
        c2.prototype.times = c2.prototype.multiply;
        function x2(t5, r5, i5) {
          if (t5 < e4)
            return new c2(T(r5, t5), i5);
          return new c2(D2(r5, d2(t5)), i5);
        }
        l2.prototype._multiplyBySmall = function(t5) {
          if (h2(t5.value * this.value))
            return new l2(t5.value * this.value);
          return x2(Math.abs(t5.value), d2(Math.abs(this.value)), this.sign !== t5.sign);
        };
        c2.prototype._multiplyBySmall = function(t5) {
          if (0 === t5.value)
            return u2[0];
          if (1 === t5.value)
            return this;
          if (-1 === t5.value)
            return this.negate();
          return x2(Math.abs(t5.value), this.value, this.sign !== t5.sign);
        };
        l2.prototype.multiply = function(t5) {
          return st2(t5)._multiplyBySmall(this);
        };
        l2.prototype.times = l2.prototype.multiply;
        f2.prototype.multiply = function(t5) {
          return new f2(this.value * st2(t5).value);
        };
        f2.prototype.times = f2.prototype.multiply;
        function R2(t5) {
          var r5 = t5.length, i5 = g2(r5 + r5), n3 = e4, s3, a3, o3, u3, c3;
          for (o3 = 0; o3 < r5; o3++) {
            u3 = t5[o3];
            a3 = 0 - u3 * u3;
            for (var l3 = o3; l3 < r5; l3++) {
              c3 = t5[l3];
              s3 = 2 * (u3 * c3) + i5[o3 + l3] + a3;
              a3 = Math.floor(s3 / n3);
              i5[o3 + l3] = s3 - a3 * n3;
            }
            i5[o3 + r5] = a3;
          }
          p2(i5);
          return i5;
        }
        c2.prototype.square = function() {
          return new c2(R2(this.value), false);
        };
        l2.prototype.square = function() {
          var t5 = this.value * this.value;
          if (h2(t5))
            return new l2(t5);
          return new c2(R2(d2(Math.abs(this.value))), false);
        };
        f2.prototype.square = function(t5) {
          return new f2(this.value * this.value);
        };
        function B2(t5, r5) {
          var i5 = t5.length, n3 = r5.length, s3 = e4, a3 = g2(r5.length), o3 = r5[n3 - 1], u3 = Math.ceil(s3 / (2 * o3)), c3 = T(t5, u3), l3 = T(r5, u3), f3, h3, d3, p3, y3, m3, w3;
          if (c3.length <= i5)
            c3.push(0);
          l3.push(0);
          o3 = l3[n3 - 1];
          for (h3 = i5 - n3; h3 >= 0; h3--) {
            f3 = s3 - 1;
            if (c3[h3 + n3] !== o3)
              f3 = Math.floor((c3[h3 + n3] * s3 + c3[h3 + n3 - 1]) / o3);
            d3 = 0;
            p3 = 0;
            m3 = l3.length;
            for (y3 = 0; y3 < m3; y3++) {
              d3 += f3 * l3[y3];
              w3 = Math.floor(d3 / s3);
              p3 += c3[h3 + y3] - (d3 - w3 * s3);
              d3 = w3;
              if (p3 < 0) {
                c3[h3 + y3] = p3 + s3;
                p3 = -1;
              } else {
                c3[h3 + y3] = p3;
                p3 = 0;
              }
            }
            while (0 !== p3) {
              f3 -= 1;
              d3 = 0;
              for (y3 = 0; y3 < m3; y3++) {
                d3 += c3[h3 + y3] - s3 + l3[y3];
                if (d3 < 0) {
                  c3[h3 + y3] = d3 + s3;
                  d3 = 0;
                } else {
                  c3[h3 + y3] = d3;
                  d3 = 1;
                }
              }
              p3 += d3;
            }
            a3[h3] = f3;
          }
          c3 = k2(c3, u3)[0];
          return [v2(a3), v2(c3)];
        }
        function O(t5, r5) {
          var i5 = t5.length, n3 = r5.length, s3 = [], a3 = [], o3 = e4, u3, c3, l3, f3, h3;
          while (i5) {
            a3.unshift(t5[--i5]);
            p2(a3);
            if (N2(a3, r5) < 0) {
              s3.push(0);
              continue;
            }
            c3 = a3.length;
            l3 = a3[c3 - 1] * o3 + a3[c3 - 2];
            f3 = r5[n3 - 1] * o3 + r5[n3 - 2];
            if (c3 > n3)
              l3 = (l3 + 1) * o3;
            u3 = Math.ceil(l3 / f3);
            do {
              h3 = T(r5, u3);
              if (N2(h3, a3) <= 0)
                break;
              u3--;
            } while (u3);
            s3.push(u3);
            a3 = S2(a3, h3);
          }
          s3.reverse();
          return [v2(s3), v2(a3)];
        }
        function k2(t5, r5) {
          var i5 = t5.length, n3 = g2(i5), s3 = e4, a3, o3, u3, c3;
          u3 = 0;
          for (a3 = i5 - 1; a3 >= 0; --a3) {
            c3 = u3 * s3 + t5[a3];
            o3 = y2(c3 / r5);
            u3 = c3 - o3 * r5;
            n3[a3] = 0 | o3;
          }
          return [n3, 0 | u3];
        }
        function C2(t5, r5) {
          var i5, n3 = st2(r5);
          if (o2)
            return [new f2(t5.value / n3.value), new f2(t5.value % n3.value)];
          var s3 = t5.value, a3 = n3.value;
          var h3;
          if (0 === a3)
            throw new Error("Cannot divide by zero");
          if (t5.isSmall) {
            if (n3.isSmall)
              return [new l2(y2(s3 / a3)), new l2(s3 % a3)];
            return [u2[0], t5];
          }
          if (n3.isSmall) {
            if (1 === a3)
              return [t5, u2[0]];
            if (-1 == a3)
              return [t5.negate(), u2[0]];
            var p3 = Math.abs(a3);
            if (p3 < e4) {
              i5 = k2(s3, p3);
              h3 = v2(i5[0]);
              var g3 = i5[1];
              if (t5.sign)
                g3 = -g3;
              if ("number" === typeof h3) {
                if (t5.sign !== n3.sign)
                  h3 = -h3;
                return [new l2(h3), new l2(g3)];
              }
              return [new c2(h3, t5.sign !== n3.sign), new l2(g3)];
            }
            a3 = d2(p3);
          }
          var m3 = N2(s3, a3);
          if (-1 === m3)
            return [u2[0], t5];
          if (0 === m3)
            return [u2[t5.sign === n3.sign ? 1 : -1], u2[0]];
          if (s3.length + a3.length <= 200)
            i5 = B2(s3, a3);
          else
            i5 = O(s3, a3);
          h3 = i5[0];
          var w3 = t5.sign !== n3.sign, _3 = i5[1], S3 = t5.sign;
          if ("number" === typeof h3) {
            if (w3)
              h3 = -h3;
            h3 = new l2(h3);
          } else
            h3 = new c2(h3, w3);
          if ("number" === typeof _3) {
            if (S3)
              _3 = -_3;
            _3 = new l2(_3);
          } else
            _3 = new c2(_3, S3);
          return [h3, _3];
        }
        c2.prototype.divmod = function(t5) {
          var e5 = C2(this, t5);
          return { quotient: e5[0], remainder: e5[1] };
        };
        f2.prototype.divmod = l2.prototype.divmod = c2.prototype.divmod;
        c2.prototype.divide = function(t5) {
          return C2(this, t5)[0];
        };
        f2.prototype.over = f2.prototype.divide = function(t5) {
          return new f2(this.value / st2(t5).value);
        };
        l2.prototype.over = l2.prototype.divide = c2.prototype.over = c2.prototype.divide;
        c2.prototype.mod = function(t5) {
          return C2(this, t5)[1];
        };
        f2.prototype.mod = f2.prototype.remainder = function(t5) {
          return new f2(this.value % st2(t5).value);
        };
        l2.prototype.remainder = l2.prototype.mod = c2.prototype.remainder = c2.prototype.mod;
        c2.prototype.pow = function(t5) {
          var e5 = st2(t5), r5 = this.value, i5 = e5.value, n3, s3, a3;
          if (0 === i5)
            return u2[1];
          if (0 === r5)
            return u2[0];
          if (1 === r5)
            return u2[1];
          if (-1 === r5)
            return e5.isEven() ? u2[1] : u2[-1];
          if (e5.sign)
            return u2[0];
          if (!e5.isSmall)
            throw new Error("The exponent " + e5.toString() + " is too large.");
          if (this.isSmall) {
            if (h2(n3 = Math.pow(r5, i5)))
              return new l2(y2(n3));
          }
          s3 = this;
          a3 = u2[1];
          while (true) {
            if (i5 & true) {
              a3 = a3.times(s3);
              --i5;
            }
            if (0 === i5)
              break;
            i5 /= 2;
            s3 = s3.square();
          }
          return a3;
        };
        l2.prototype.pow = c2.prototype.pow;
        f2.prototype.pow = function(t5) {
          var e5 = st2(t5);
          var r5 = this.value, i5 = e5.value;
          var n3 = BigInt(0), s3 = BigInt(1), a3 = BigInt(2);
          if (i5 === n3)
            return u2[1];
          if (r5 === n3)
            return u2[0];
          if (r5 === s3)
            return u2[1];
          if (r5 === BigInt(-1))
            return e5.isEven() ? u2[1] : u2[-1];
          if (e5.isNegative())
            return new f2(n3);
          var o3 = this;
          var c3 = u2[1];
          while (true) {
            if ((i5 & s3) === s3) {
              c3 = c3.times(o3);
              --i5;
            }
            if (i5 === n3)
              break;
            i5 /= a3;
            o3 = o3.square();
          }
          return c3;
        };
        c2.prototype.modPow = function(t5, e5) {
          t5 = st2(t5);
          e5 = st2(e5);
          if (e5.isZero())
            throw new Error("Cannot take modPow with modulus 0");
          var r5 = u2[1], i5 = this.mod(e5);
          if (t5.isNegative()) {
            t5 = t5.multiply(u2[-1]);
            i5 = i5.modInv(e5);
          }
          while (t5.isPositive()) {
            if (i5.isZero())
              return u2[0];
            if (t5.isOdd())
              r5 = r5.multiply(i5).mod(e5);
            t5 = t5.divide(2);
            i5 = i5.square().mod(e5);
          }
          return r5;
        };
        f2.prototype.modPow = l2.prototype.modPow = c2.prototype.modPow;
        function N2(t5, e5) {
          if (t5.length !== e5.length)
            return t5.length > e5.length ? 1 : -1;
          for (var r5 = t5.length - 1; r5 >= 0; r5--)
            if (t5[r5] !== e5[r5])
              return t5[r5] > e5[r5] ? 1 : -1;
          return 0;
        }
        c2.prototype.compareAbs = function(t5) {
          var e5 = st2(t5), r5 = this.value, i5 = e5.value;
          if (e5.isSmall)
            return 1;
          return N2(r5, i5);
        };
        l2.prototype.compareAbs = function(t5) {
          var e5 = st2(t5), r5 = Math.abs(this.value), i5 = e5.value;
          if (e5.isSmall) {
            i5 = Math.abs(i5);
            return r5 === i5 ? 0 : r5 > i5 ? 1 : -1;
          }
          return -1;
        };
        f2.prototype.compareAbs = function(t5) {
          var e5 = this.value;
          var r5 = st2(t5).value;
          e5 = e5 >= 0 ? e5 : -e5;
          r5 = r5 >= 0 ? r5 : -r5;
          return e5 === r5 ? 0 : e5 > r5 ? 1 : -1;
        };
        c2.prototype.compare = function(t5) {
          if (t5 === 1 / 0)
            return -1;
          if (t5 === -1 / 0)
            return 1;
          var e5 = st2(t5), r5 = this.value, i5 = e5.value;
          if (this.sign !== e5.sign)
            return e5.sign ? 1 : -1;
          if (e5.isSmall)
            return this.sign ? -1 : 1;
          return N2(r5, i5) * (this.sign ? -1 : 1);
        };
        c2.prototype.compareTo = c2.prototype.compare;
        l2.prototype.compare = function(t5) {
          if (t5 === 1 / 0)
            return -1;
          if (t5 === -1 / 0)
            return 1;
          var e5 = st2(t5), r5 = this.value, i5 = e5.value;
          if (e5.isSmall)
            return r5 == i5 ? 0 : r5 > i5 ? 1 : -1;
          if (r5 < 0 !== e5.sign)
            return r5 < 0 ? -1 : 1;
          return r5 < 0 ? 1 : -1;
        };
        l2.prototype.compareTo = l2.prototype.compare;
        f2.prototype.compare = function(t5) {
          if (t5 === 1 / 0)
            return -1;
          if (t5 === -1 / 0)
            return 1;
          var e5 = this.value;
          var r5 = st2(t5).value;
          return e5 === r5 ? 0 : e5 > r5 ? 1 : -1;
        };
        f2.prototype.compareTo = f2.prototype.compare;
        c2.prototype.equals = function(t5) {
          return 0 === this.compare(t5);
        };
        f2.prototype.eq = f2.prototype.equals = l2.prototype.eq = l2.prototype.equals = c2.prototype.eq = c2.prototype.equals;
        c2.prototype.notEquals = function(t5) {
          return 0 !== this.compare(t5);
        };
        f2.prototype.neq = f2.prototype.notEquals = l2.prototype.neq = l2.prototype.notEquals = c2.prototype.neq = c2.prototype.notEquals;
        c2.prototype.greater = function(t5) {
          return this.compare(t5) > 0;
        };
        f2.prototype.gt = f2.prototype.greater = l2.prototype.gt = l2.prototype.greater = c2.prototype.gt = c2.prototype.greater;
        c2.prototype.lesser = function(t5) {
          return this.compare(t5) < 0;
        };
        f2.prototype.lt = f2.prototype.lesser = l2.prototype.lt = l2.prototype.lesser = c2.prototype.lt = c2.prototype.lesser;
        c2.prototype.greaterOrEquals = function(t5) {
          return this.compare(t5) >= 0;
        };
        f2.prototype.geq = f2.prototype.greaterOrEquals = l2.prototype.geq = l2.prototype.greaterOrEquals = c2.prototype.geq = c2.prototype.greaterOrEquals;
        c2.prototype.lesserOrEquals = function(t5) {
          return this.compare(t5) <= 0;
        };
        f2.prototype.leq = f2.prototype.lesserOrEquals = l2.prototype.leq = l2.prototype.lesserOrEquals = c2.prototype.leq = c2.prototype.lesserOrEquals;
        c2.prototype.isEven = function() {
          return 0 === (1 & this.value[0]);
        };
        l2.prototype.isEven = function() {
          return 0 === (1 & this.value);
        };
        f2.prototype.isEven = function() {
          return (this.value & BigInt(1)) === BigInt(0);
        };
        c2.prototype.isOdd = function() {
          return 1 === (1 & this.value[0]);
        };
        l2.prototype.isOdd = function() {
          return 1 === (1 & this.value);
        };
        f2.prototype.isOdd = function() {
          return (this.value & BigInt(1)) === BigInt(1);
        };
        c2.prototype.isPositive = function() {
          return !this.sign;
        };
        l2.prototype.isPositive = function() {
          return this.value > 0;
        };
        f2.prototype.isPositive = l2.prototype.isPositive;
        c2.prototype.isNegative = function() {
          return this.sign;
        };
        l2.prototype.isNegative = function() {
          return this.value < 0;
        };
        f2.prototype.isNegative = l2.prototype.isNegative;
        c2.prototype.isUnit = function() {
          return false;
        };
        l2.prototype.isUnit = function() {
          return 1 === Math.abs(this.value);
        };
        f2.prototype.isUnit = function() {
          return this.abs().value === BigInt(1);
        };
        c2.prototype.isZero = function() {
          return false;
        };
        l2.prototype.isZero = function() {
          return 0 === this.value;
        };
        f2.prototype.isZero = function() {
          return this.value === BigInt(0);
        };
        c2.prototype.isDivisibleBy = function(t5) {
          var e5 = st2(t5);
          if (e5.isZero())
            return false;
          if (e5.isUnit())
            return true;
          if (0 === e5.compareAbs(2))
            return this.isEven();
          return this.mod(e5).isZero();
        };
        f2.prototype.isDivisibleBy = l2.prototype.isDivisibleBy = c2.prototype.isDivisibleBy;
        function P2(t5) {
          var e5 = t5.abs();
          if (e5.isUnit())
            return false;
          if (e5.equals(2) || e5.equals(3) || e5.equals(5))
            return true;
          if (e5.isEven() || e5.isDivisibleBy(3) || e5.isDivisibleBy(5))
            return false;
          if (e5.lesser(49))
            return true;
        }
        function V2(t5, e5) {
          var r5 = t5.prev(), i5 = r5, s3 = 0, a3, u3, c3;
          while (i5.isEven())
            i5 = i5.divide(2), s3++;
          t:
            for (u3 = 0; u3 < e5.length; u3++) {
              if (t5.lesser(e5[u3]))
                continue;
              c3 = n2(e5[u3]).modPow(i5, t5);
              if (c3.isUnit() || c3.equals(r5))
                continue;
              for (a3 = s3 - 1; 0 != a3; a3--) {
                c3 = c3.square().mod(t5);
                if (c3.isUnit())
                  return false;
                if (c3.equals(r5))
                  continue t;
              }
              return false;
            }
          return true;
        }
        c2.prototype.isPrime = function(e5) {
          var r5 = P2(this);
          if (r5 !== t4)
            return r5;
          var i5 = this.abs();
          var s3 = i5.bitLength();
          if (s3 <= 64)
            return V2(i5, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37]);
          var a3 = Math.log(2) * s3.toJSNumber();
          var o3 = Math.ceil(true === e5 ? 2 * Math.pow(a3, 2) : a3);
          for (var u3 = [], c3 = 0; c3 < o3; c3++)
            u3.push(n2(c3 + 2));
          return V2(i5, u3);
        };
        f2.prototype.isPrime = l2.prototype.isPrime = c2.prototype.isPrime;
        c2.prototype.isProbablePrime = function(e5, r5) {
          var i5 = P2(this);
          if (i5 !== t4)
            return i5;
          var s3 = this.abs();
          var a3 = e5 === t4 ? 5 : e5;
          for (var o3 = [], u3 = 0; u3 < a3; u3++)
            o3.push(n2.randBetween(2, s3.minus(2), r5));
          return V2(s3, o3);
        };
        f2.prototype.isProbablePrime = l2.prototype.isProbablePrime = c2.prototype.isProbablePrime;
        c2.prototype.modInv = function(t5) {
          var e5 = n2.zero, r5 = n2.one, i5 = st2(t5), s3 = this.abs(), a3, o3, u3;
          while (!s3.isZero()) {
            a3 = i5.divide(s3);
            o3 = e5;
            u3 = i5;
            e5 = r5;
            i5 = s3;
            r5 = o3.subtract(a3.multiply(r5));
            s3 = u3.subtract(a3.multiply(s3));
          }
          if (!i5.isUnit())
            throw new Error(this.toString() + " and " + t5.toString() + " are not co-prime");
          if (-1 === e5.compare(0))
            e5 = e5.add(t5);
          if (this.isNegative())
            return e5.negate();
          return e5;
        };
        f2.prototype.modInv = l2.prototype.modInv = c2.prototype.modInv;
        c2.prototype.next = function() {
          var t5 = this.value;
          if (this.sign)
            return E2(t5, 1, this.sign);
          return new c2(_2(t5, 1), this.sign);
        };
        l2.prototype.next = function() {
          var t5 = this.value;
          if (t5 + 1 < i4)
            return new l2(t5 + 1);
          return new c2(s2, false);
        };
        f2.prototype.next = function() {
          return new f2(this.value + BigInt(1));
        };
        c2.prototype.prev = function() {
          var t5 = this.value;
          if (this.sign)
            return new c2(_2(t5, 1), true);
          return E2(t5, 1, this.sign);
        };
        l2.prototype.prev = function() {
          var t5 = this.value;
          if (t5 - 1 > -i4)
            return new l2(t5 - 1);
          return new c2(s2, true);
        };
        f2.prototype.prev = function() {
          return new f2(this.value - BigInt(1));
        };
        var L2 = [1];
        while (2 * L2[L2.length - 1] <= e4)
          L2.push(2 * L2[L2.length - 1]);
        var H2 = L2.length, U2 = L2[H2 - 1];
        function K2(t5) {
          return Math.abs(t5) <= e4;
        }
        c2.prototype.shiftLeft = function(t5) {
          var e5 = st2(t5).toJSNumber();
          if (!K2(e5))
            throw new Error(String(e5) + " is too large for shifting.");
          if (e5 < 0)
            return this.shiftRight(-e5);
          var r5 = this;
          if (r5.isZero())
            return r5;
          while (e5 >= H2) {
            r5 = r5.multiply(U2);
            e5 -= H2 - 1;
          }
          return r5.multiply(L2[e5]);
        };
        f2.prototype.shiftLeft = l2.prototype.shiftLeft = c2.prototype.shiftLeft;
        c2.prototype.shiftRight = function(t5) {
          var e5;
          var r5 = st2(t5).toJSNumber();
          if (!K2(r5))
            throw new Error(String(r5) + " is too large for shifting.");
          if (r5 < 0)
            return this.shiftLeft(-r5);
          var i5 = this;
          while (r5 >= H2) {
            if (i5.isZero() || i5.isNegative() && i5.isUnit())
              return i5;
            e5 = C2(i5, U2);
            i5 = e5[1].isNegative() ? e5[0].prev() : e5[0];
            r5 -= H2 - 1;
          }
          e5 = C2(i5, L2[r5]);
          return e5[1].isNegative() ? e5[0].prev() : e5[0];
        };
        f2.prototype.shiftRight = l2.prototype.shiftRight = c2.prototype.shiftRight;
        function j2(t5, e5, r5) {
          e5 = st2(e5);
          var i5 = t5.isNegative(), s3 = e5.isNegative();
          var a3 = i5 ? t5.not() : t5, o3 = s3 ? e5.not() : e5;
          var u3 = 0, c3 = 0;
          var l3 = null, f3 = null;
          var h3 = [];
          while (!a3.isZero() || !o3.isZero()) {
            l3 = C2(a3, U2);
            u3 = l3[1].toJSNumber();
            if (i5)
              u3 = U2 - 1 - u3;
            f3 = C2(o3, U2);
            c3 = f3[1].toJSNumber();
            if (s3)
              c3 = U2 - 1 - c3;
            a3 = l3[0];
            o3 = f3[0];
            h3.push(r5(u3, c3));
          }
          var d3 = 0 !== r5(i5 ? 1 : 0, s3 ? 1 : 0) ? n2(-1) : n2(0);
          for (var v3 = h3.length - 1; v3 >= 0; v3 -= 1)
            d3 = d3.multiply(U2).add(n2(h3[v3]));
          return d3;
        }
        c2.prototype.not = function() {
          return this.negate().prev();
        };
        f2.prototype.not = l2.prototype.not = c2.prototype.not;
        c2.prototype.and = function(t5) {
          return j2(this, t5, function(t6, e5) {
            return t6 & e5;
          });
        };
        f2.prototype.and = l2.prototype.and = c2.prototype.and;
        c2.prototype.or = function(t5) {
          return j2(this, t5, function(t6, e5) {
            return t6 | e5;
          });
        };
        f2.prototype.or = l2.prototype.or = c2.prototype.or;
        c2.prototype.xor = function(t5) {
          return j2(this, t5, function(t6, e5) {
            return t6 ^ e5;
          });
        };
        f2.prototype.xor = l2.prototype.xor = c2.prototype.xor;
        var q2 = 1 << 30, F2 = (e4 & -e4) * (e4 & -e4) | q2;
        function z2(t5) {
          var r5 = t5.value, i5 = "number" === typeof r5 ? r5 | q2 : "bigint" === typeof r5 ? r5 | BigInt(q2) : r5[0] + r5[1] * e4 | F2;
          return i5 & -i5;
        }
        function G2(t5, e5) {
          if (e5.compareTo(t5) <= 0) {
            var r5 = G2(t5, e5.square(e5));
            var i5 = r5.p;
            var s3 = r5.e;
            var a3 = i5.multiply(e5);
            return a3.compareTo(t5) <= 0 ? { p: a3, e: 2 * s3 + 1 } : { p: i5, e: 2 * s3 };
          }
          return { p: n2(1), e: 0 };
        }
        c2.prototype.bitLength = function() {
          var t5 = this;
          if (t5.compareTo(n2(0)) < 0)
            t5 = t5.negate().subtract(n2(1));
          if (0 === t5.compareTo(n2(0)))
            return n2(0);
          return n2(G2(t5, n2(2)).e).add(n2(1));
        };
        f2.prototype.bitLength = l2.prototype.bitLength = c2.prototype.bitLength;
        function Y2(t5, e5) {
          t5 = st2(t5);
          e5 = st2(e5);
          return t5.greater(e5) ? t5 : e5;
        }
        function W2(t5, e5) {
          t5 = st2(t5);
          e5 = st2(e5);
          return t5.lesser(e5) ? t5 : e5;
        }
        function J2(t5, e5) {
          t5 = st2(t5).abs();
          e5 = st2(e5).abs();
          if (t5.equals(e5))
            return t5;
          if (t5.isZero())
            return e5;
          if (e5.isZero())
            return t5;
          var r5 = u2[1], i5, n3;
          while (t5.isEven() && e5.isEven()) {
            i5 = W2(z2(t5), z2(e5));
            t5 = t5.divide(i5);
            e5 = e5.divide(i5);
            r5 = r5.multiply(i5);
          }
          while (t5.isEven())
            t5 = t5.divide(z2(t5));
          do {
            while (e5.isEven())
              e5 = e5.divide(z2(e5));
            if (t5.greater(e5)) {
              n3 = e5;
              e5 = t5;
              t5 = n3;
            }
            e5 = e5.subtract(t5);
          } while (!e5.isZero());
          return r5.isUnit() ? t5 : t5.multiply(r5);
        }
        function Z2(t5, e5) {
          t5 = st2(t5).abs();
          e5 = st2(e5).abs();
          return t5.divide(J2(t5, e5)).multiply(e5);
        }
        function $2(t5, r5, i5) {
          t5 = st2(t5);
          r5 = st2(r5);
          var n3 = i5 || Math.random;
          var s3 = W2(t5, r5), a3 = Y2(t5, r5);
          var o3 = a3.subtract(s3).add(1);
          if (o3.isSmall)
            return s3.add(Math.floor(n3() * o3));
          var c3 = et2(o3, e4).value;
          var l3 = [], f3 = true;
          for (var h3 = 0; h3 < c3.length; h3++) {
            var d3 = f3 ? c3[h3] + (h3 + 1 < c3.length ? c3[h3 + 1] / e4 : 0) : e4;
            var v3 = y2(n3() * d3);
            l3.push(v3);
            if (v3 < c3[h3])
              f3 = false;
          }
          return s3.add(u2.fromArray(l3, e4, false));
        }
        var X2 = function(t5, e5, r5, i5) {
          r5 = r5 || a2;
          t5 = String(t5);
          if (!i5) {
            t5 = t5.toLowerCase();
            r5 = r5.toLowerCase();
          }
          var n3 = t5.length;
          var s3;
          var o3 = Math.abs(e5);
          var u3 = {};
          for (s3 = 0; s3 < r5.length; s3++)
            u3[r5[s3]] = s3;
          for (s3 = 0; s3 < n3; s3++) {
            var c3 = t5[s3];
            if ("-" === c3)
              continue;
            if (c3 in u3) {
              if (u3[c3] >= o3) {
                if ("1" === c3 && 1 === o3)
                  continue;
                throw new Error(c3 + " is not a valid digit in base " + e5 + ".");
              }
            }
          }
          e5 = st2(e5);
          var l3 = [];
          var f3 = "-" === t5[0];
          for (s3 = f3 ? 1 : 0; s3 < t5.length; s3++) {
            var c3 = t5[s3];
            if (c3 in u3)
              l3.push(st2(u3[c3]));
            else if ("<" === c3) {
              var h3 = s3;
              do {
                s3++;
              } while (">" !== t5[s3] && s3 < t5.length);
              l3.push(st2(t5.slice(h3 + 1, s3)));
            } else
              throw new Error(c3 + " is not a valid character");
          }
          return Q2(l3, e5, f3);
        };
        function Q2(t5, e5, r5) {
          var i5 = u2[0], n3 = u2[1], s3;
          for (s3 = t5.length - 1; s3 >= 0; s3--) {
            i5 = i5.add(t5[s3].times(n3));
            n3 = n3.times(e5);
          }
          return r5 ? i5.negate() : i5;
        }
        function tt3(t5, e5) {
          e5 = e5 || a2;
          if (t5 < e5.length)
            return e5[t5];
          return "<" + t5 + ">";
        }
        function et2(t5, e5) {
          e5 = n2(e5);
          if (e5.isZero()) {
            if (t5.isZero())
              return { value: [0], isNegative: false };
            throw new Error("Cannot convert nonzero numbers to base 0.");
          }
          if (e5.equals(-1)) {
            if (t5.isZero())
              return { value: [0], isNegative: false };
            if (t5.isNegative())
              return { value: [].concat.apply([], Array.apply(null, Array(-t5.toJSNumber())).map(Array.prototype.valueOf, [1, 0])), isNegative: false };
            var r5 = Array.apply(null, Array(t5.toJSNumber() - 1)).map(Array.prototype.valueOf, [0, 1]);
            r5.unshift([1]);
            return { value: [].concat.apply([], r5), isNegative: false };
          }
          var i5 = false;
          if (t5.isNegative() && e5.isPositive()) {
            i5 = true;
            t5 = t5.abs();
          }
          if (e5.isUnit()) {
            if (t5.isZero())
              return { value: [0], isNegative: false };
            return { value: Array.apply(null, Array(t5.toJSNumber())).map(Number.prototype.valueOf, 1), isNegative: i5 };
          }
          var s3 = [];
          var a3 = t5, o3;
          while (a3.isNegative() || a3.compareAbs(e5) >= 0) {
            o3 = a3.divmod(e5);
            a3 = o3.quotient;
            var u3 = o3.remainder;
            if (u3.isNegative()) {
              u3 = e5.minus(u3).abs();
              a3 = a3.next();
            }
            s3.push(u3.toJSNumber());
          }
          s3.push(a3.toJSNumber());
          return { value: s3.reverse(), isNegative: i5 };
        }
        function rt2(t5, e5, r5) {
          var i5 = et2(t5, e5);
          return (i5.isNegative ? "-" : "") + i5.value.map(function(t6) {
            return tt3(t6, r5);
          }).join("");
        }
        c2.prototype.toArray = function(t5) {
          return et2(this, t5);
        };
        l2.prototype.toArray = function(t5) {
          return et2(this, t5);
        };
        f2.prototype.toArray = function(t5) {
          return et2(this, t5);
        };
        c2.prototype.toString = function(e5, r5) {
          if (e5 === t4)
            e5 = 10;
          if (10 !== e5)
            return rt2(this, e5, r5);
          var i5 = this.value, n3 = i5.length, s3 = String(i5[--n3]), a3 = "0000000", o3;
          while (--n3 >= 0) {
            o3 = String(i5[n3]);
            s3 += a3.slice(o3.length) + o3;
          }
          var u3 = this.sign ? "-" : "";
          return u3 + s3;
        };
        l2.prototype.toString = function(e5, r5) {
          if (e5 === t4)
            e5 = 10;
          if (10 != e5)
            return rt2(this, e5, r5);
          return String(this.value);
        };
        f2.prototype.toString = l2.prototype.toString;
        f2.prototype.toJSON = c2.prototype.toJSON = l2.prototype.toJSON = function() {
          return this.toString();
        };
        c2.prototype.valueOf = function() {
          return parseInt(this.toString(), 10);
        };
        c2.prototype.toJSNumber = c2.prototype.valueOf;
        l2.prototype.valueOf = function() {
          return this.value;
        };
        l2.prototype.toJSNumber = l2.prototype.valueOf;
        f2.prototype.valueOf = f2.prototype.toJSNumber = function() {
          return parseInt(this.toString(), 10);
        };
        function it2(t5) {
          if (h2(+t5)) {
            var e5 = +t5;
            if (e5 === y2(e5))
              return o2 ? new f2(BigInt(e5)) : new l2(e5);
            throw new Error("Invalid integer: " + t5);
          }
          var i5 = "-" === t5[0];
          if (i5)
            t5 = t5.slice(1);
          var n3 = t5.split(/e/i);
          if (n3.length > 2)
            throw new Error("Invalid integer: " + n3.join("e"));
          if (2 === n3.length) {
            var s3 = n3[1];
            if ("+" === s3[0])
              s3 = s3.slice(1);
            s3 = +s3;
            if (s3 !== y2(s3) || !h2(s3))
              throw new Error("Invalid integer: " + s3 + " is not a valid exponent.");
            var a3 = n3[0];
            var u3 = a3.indexOf(".");
            if (u3 >= 0) {
              s3 -= a3.length - u3 - 1;
              a3 = a3.slice(0, u3) + a3.slice(u3 + 1);
            }
            if (s3 < 0)
              throw new Error("Cannot include negative exponent part for integers");
            a3 += new Array(s3 + 1).join("0");
            t5 = a3;
          }
          var d3 = /^([0-9][0-9]*)$/.test(t5);
          if (!d3)
            throw new Error("Invalid integer: " + t5);
          if (o2)
            return new f2(BigInt(i5 ? "-" + t5 : t5));
          var v3 = [], g3 = t5.length, m3 = r4, w3 = g3 - m3;
          while (g3 > 0) {
            v3.push(+t5.slice(w3, g3));
            w3 -= m3;
            if (w3 < 0)
              w3 = 0;
            g3 -= m3;
          }
          p2(v3);
          return new c2(v3, i5);
        }
        function nt2(t5) {
          if (o2)
            return new f2(BigInt(t5));
          if (h2(t5)) {
            if (t5 !== y2(t5))
              throw new Error(t5 + " is not an integer.");
            return new l2(t5);
          }
          return it2(t5.toString());
        }
        function st2(t5) {
          if ("number" === typeof t5)
            return nt2(t5);
          if ("string" === typeof t5)
            return it2(t5);
          if ("bigint" === typeof t5)
            return new f2(t5);
          return t5;
        }
        for (var at2 = 0; at2 < 1e3; at2++) {
          u2[at2] = st2(at2);
          if (at2 > 0)
            u2[-at2] = st2(-at2);
        }
        u2.one = u2[1];
        u2.zero = u2[0];
        u2.minusOne = u2[-1];
        u2.max = Y2;
        u2.min = W2;
        u2.gcd = J2;
        u2.lcm = Z2;
        u2.isInstance = function(t5) {
          return t5 instanceof c2 || t5 instanceof l2 || t5 instanceof f2;
        };
        u2.randBetween = $2;
        u2.fromArray = function(t5, e5, r5) {
          return Q2(t5.map(st2), st2(e5 || 10), r5);
        };
        return u2;
      }();
      if (t3.hasOwnProperty("exports"))
        t3.exports = n2;
      i3 = function() {
        return n2;
      }.call(e3, r3, e3, t3), void 0 !== i3 && (t3.exports = i3);
    }, 452: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(8269), r3(8214), r3(888), r3(5109));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.BlockCipher;
          var n2 = e4.algo;
          var s2 = [];
          var a2 = [];
          var o2 = [];
          var u2 = [];
          var c2 = [];
          var l2 = [];
          var f2 = [];
          var h2 = [];
          var d2 = [];
          var v2 = [];
          (function() {
            var t5 = [];
            for (var e5 = 0; e5 < 256; e5++)
              if (e5 < 128)
                t5[e5] = e5 << 1;
              else
                t5[e5] = e5 << 1 ^ 283;
            var r5 = 0;
            var i4 = 0;
            for (var e5 = 0; e5 < 256; e5++) {
              var n3 = i4 ^ i4 << 1 ^ i4 << 2 ^ i4 << 3 ^ i4 << 4;
              n3 = n3 >>> 8 ^ 255 & n3 ^ 99;
              s2[r5] = n3;
              a2[n3] = r5;
              var p3 = t5[r5];
              var g3 = t5[p3];
              var y2 = t5[g3];
              var m2 = 257 * t5[n3] ^ 16843008 * n3;
              o2[r5] = m2 << 24 | m2 >>> 8;
              u2[r5] = m2 << 16 | m2 >>> 16;
              c2[r5] = m2 << 8 | m2 >>> 24;
              l2[r5] = m2;
              var m2 = 16843009 * y2 ^ 65537 * g3 ^ 257 * p3 ^ 16843008 * r5;
              f2[n3] = m2 << 24 | m2 >>> 8;
              h2[n3] = m2 << 16 | m2 >>> 16;
              d2[n3] = m2 << 8 | m2 >>> 24;
              v2[n3] = m2;
              if (!r5)
                r5 = i4 = 1;
              else {
                r5 = p3 ^ t5[t5[t5[y2 ^ p3]]];
                i4 ^= t5[t5[i4]];
              }
            }
          })();
          var p2 = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
          var g2 = n2.AES = i3.extend({ _doReset: function() {
            var t5;
            if (this._nRounds && this._keyPriorReset === this._key)
              return;
            var e5 = this._keyPriorReset = this._key;
            var r5 = e5.words;
            var i4 = e5.sigBytes / 4;
            var n3 = this._nRounds = i4 + 6;
            var a3 = 4 * (n3 + 1);
            var o3 = this._keySchedule = [];
            for (var u3 = 0; u3 < a3; u3++)
              if (u3 < i4)
                o3[u3] = r5[u3];
              else {
                t5 = o3[u3 - 1];
                if (!(u3 % i4)) {
                  t5 = t5 << 8 | t5 >>> 24;
                  t5 = s2[t5 >>> 24] << 24 | s2[t5 >>> 16 & 255] << 16 | s2[t5 >>> 8 & 255] << 8 | s2[255 & t5];
                  t5 ^= p2[u3 / i4 | 0] << 24;
                } else if (i4 > 6 && u3 % i4 == 4)
                  t5 = s2[t5 >>> 24] << 24 | s2[t5 >>> 16 & 255] << 16 | s2[t5 >>> 8 & 255] << 8 | s2[255 & t5];
                o3[u3] = o3[u3 - i4] ^ t5;
              }
            var c3 = this._invKeySchedule = [];
            for (var l3 = 0; l3 < a3; l3++) {
              var u3 = a3 - l3;
              if (l3 % 4)
                var t5 = o3[u3];
              else
                var t5 = o3[u3 - 4];
              if (l3 < 4 || u3 <= 4)
                c3[l3] = t5;
              else
                c3[l3] = f2[s2[t5 >>> 24]] ^ h2[s2[t5 >>> 16 & 255]] ^ d2[s2[t5 >>> 8 & 255]] ^ v2[s2[255 & t5]];
            }
          }, encryptBlock: function(t5, e5) {
            this._doCryptBlock(t5, e5, this._keySchedule, o2, u2, c2, l2, s2);
          }, decryptBlock: function(t5, e5) {
            var r5 = t5[e5 + 1];
            t5[e5 + 1] = t5[e5 + 3];
            t5[e5 + 3] = r5;
            this._doCryptBlock(t5, e5, this._invKeySchedule, f2, h2, d2, v2, a2);
            var r5 = t5[e5 + 1];
            t5[e5 + 1] = t5[e5 + 3];
            t5[e5 + 3] = r5;
          }, _doCryptBlock: function(t5, e5, r5, i4, n3, s3, a3, o3) {
            var u3 = this._nRounds;
            var c3 = t5[e5] ^ r5[0];
            var l3 = t5[e5 + 1] ^ r5[1];
            var f3 = t5[e5 + 2] ^ r5[2];
            var h3 = t5[e5 + 3] ^ r5[3];
            var d3 = 4;
            for (var v3 = 1; v3 < u3; v3++) {
              var p3 = i4[c3 >>> 24] ^ n3[l3 >>> 16 & 255] ^ s3[f3 >>> 8 & 255] ^ a3[255 & h3] ^ r5[d3++];
              var g3 = i4[l3 >>> 24] ^ n3[f3 >>> 16 & 255] ^ s3[h3 >>> 8 & 255] ^ a3[255 & c3] ^ r5[d3++];
              var y2 = i4[f3 >>> 24] ^ n3[h3 >>> 16 & 255] ^ s3[c3 >>> 8 & 255] ^ a3[255 & l3] ^ r5[d3++];
              var m2 = i4[h3 >>> 24] ^ n3[c3 >>> 16 & 255] ^ s3[l3 >>> 8 & 255] ^ a3[255 & f3] ^ r5[d3++];
              c3 = p3;
              l3 = g3;
              f3 = y2;
              h3 = m2;
            }
            var p3 = (o3[c3 >>> 24] << 24 | o3[l3 >>> 16 & 255] << 16 | o3[f3 >>> 8 & 255] << 8 | o3[255 & h3]) ^ r5[d3++];
            var g3 = (o3[l3 >>> 24] << 24 | o3[f3 >>> 16 & 255] << 16 | o3[h3 >>> 8 & 255] << 8 | o3[255 & c3]) ^ r5[d3++];
            var y2 = (o3[f3 >>> 24] << 24 | o3[h3 >>> 16 & 255] << 16 | o3[c3 >>> 8 & 255] << 8 | o3[255 & l3]) ^ r5[d3++];
            var m2 = (o3[h3 >>> 24] << 24 | o3[c3 >>> 16 & 255] << 16 | o3[l3 >>> 8 & 255] << 8 | o3[255 & f3]) ^ r5[d3++];
            t5[e5] = p3;
            t5[e5 + 1] = g3;
            t5[e5 + 2] = y2;
            t5[e5 + 3] = m2;
          }, keySize: 256 / 32 });
          e4.AES = i3._createHelper(g2);
        })();
        return t4.AES;
      });
    }, 5109: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(888));
      })(this, function(t4) {
        t4.lib.Cipher || function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.Base;
          var s2 = i3.WordArray;
          var a2 = i3.BufferedBlockAlgorithm;
          var o2 = r4.enc;
          o2.Utf8;
          var c2 = o2.Base64;
          var l2 = r4.algo;
          var f2 = l2.EvpKDF;
          var h2 = i3.Cipher = a2.extend({ cfg: n2.extend(), createEncryptor: function(t5, e5) {
            return this.create(this._ENC_XFORM_MODE, t5, e5);
          }, createDecryptor: function(t5, e5) {
            return this.create(this._DEC_XFORM_MODE, t5, e5);
          }, init: function(t5, e5, r5) {
            this.cfg = this.cfg.extend(r5);
            this._xformMode = t5;
            this._key = e5;
            this.reset();
          }, reset: function() {
            a2.reset.call(this);
            this._doReset();
          }, process: function(t5) {
            this._append(t5);
            return this._process();
          }, finalize: function(t5) {
            if (t5)
              this._append(t5);
            var e5 = this._doFinalize();
            return e5;
          }, keySize: 128 / 32, ivSize: 128 / 32, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function() {
            function t5(t6) {
              if ("string" == typeof t6)
                return M2;
              else
                return E2;
            }
            return function(e5) {
              return { encrypt: function(r5, i4, n3) {
                return t5(i4).encrypt(e5, r5, i4, n3);
              }, decrypt: function(r5, i4, n3) {
                return t5(i4).decrypt(e5, r5, i4, n3);
              } };
            };
          }() });
          i3.StreamCipher = h2.extend({ _doFinalize: function() {
            var t5 = this._process(true);
            return t5;
          }, blockSize: 1 });
          var v2 = r4.mode = {};
          var p2 = i3.BlockCipherMode = n2.extend({ createEncryptor: function(t5, e5) {
            return this.Encryptor.create(t5, e5);
          }, createDecryptor: function(t5, e5) {
            return this.Decryptor.create(t5, e5);
          }, init: function(t5, e5) {
            this._cipher = t5;
            this._iv = e5;
          } });
          var g2 = v2.CBC = function() {
            var t5 = p2.extend();
            t5.Encryptor = t5.extend({ processBlock: function(t6, e5) {
              var i4 = this._cipher;
              var n3 = i4.blockSize;
              r5.call(this, t6, e5, n3);
              i4.encryptBlock(t6, e5);
              this._prevBlock = t6.slice(e5, e5 + n3);
            } });
            t5.Decryptor = t5.extend({ processBlock: function(t6, e5) {
              var i4 = this._cipher;
              var n3 = i4.blockSize;
              var s3 = t6.slice(e5, e5 + n3);
              i4.decryptBlock(t6, e5);
              r5.call(this, t6, e5, n3);
              this._prevBlock = s3;
            } });
            function r5(t6, r6, i4) {
              var n3;
              var s3 = this._iv;
              if (s3) {
                n3 = s3;
                this._iv = e4;
              } else
                n3 = this._prevBlock;
              for (var a3 = 0; a3 < i4; a3++)
                t6[r6 + a3] ^= n3[a3];
            }
            return t5;
          }();
          var y2 = r4.pad = {};
          var m2 = y2.Pkcs7 = { pad: function(t5, e5) {
            var r5 = 4 * e5;
            var i4 = r5 - t5.sigBytes % r5;
            var n3 = i4 << 24 | i4 << 16 | i4 << 8 | i4;
            var a3 = [];
            for (var o3 = 0; o3 < i4; o3 += 4)
              a3.push(n3);
            var u2 = s2.create(a3, i4);
            t5.concat(u2);
          }, unpad: function(t5) {
            var e5 = 255 & t5.words[t5.sigBytes - 1 >>> 2];
            t5.sigBytes -= e5;
          } };
          i3.BlockCipher = h2.extend({ cfg: h2.cfg.extend({ mode: g2, padding: m2 }), reset: function() {
            var t5;
            h2.reset.call(this);
            var e5 = this.cfg;
            var r5 = e5.iv;
            var i4 = e5.mode;
            if (this._xformMode == this._ENC_XFORM_MODE)
              t5 = i4.createEncryptor;
            else {
              t5 = i4.createDecryptor;
              this._minBufferSize = 1;
            }
            if (this._mode && this._mode.__creator == t5)
              this._mode.init(this, r5 && r5.words);
            else {
              this._mode = t5.call(i4, this, r5 && r5.words);
              this._mode.__creator = t5;
            }
          }, _doProcessBlock: function(t5, e5) {
            this._mode.processBlock(t5, e5);
          }, _doFinalize: function() {
            var t5;
            var e5 = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
              e5.pad(this._data, this.blockSize);
              t5 = this._process(true);
            } else {
              t5 = this._process(true);
              e5.unpad(t5);
            }
            return t5;
          }, blockSize: 128 / 32 });
          var _2 = i3.CipherParams = n2.extend({ init: function(t5) {
            this.mixIn(t5);
          }, toString: function(t5) {
            return (t5 || this.formatter).stringify(this);
          } });
          var S2 = r4.format = {};
          var b2 = S2.OpenSSL = { stringify: function(t5) {
            var e5;
            var r5 = t5.ciphertext;
            var i4 = t5.salt;
            if (i4)
              e5 = s2.create([1398893684, 1701076831]).concat(i4).concat(r5);
            else
              e5 = r5;
            return e5.toString(c2);
          }, parse: function(t5) {
            var e5;
            var r5 = c2.parse(t5);
            var i4 = r5.words;
            if (1398893684 == i4[0] && 1701076831 == i4[1]) {
              e5 = s2.create(i4.slice(2, 4));
              i4.splice(0, 4);
              r5.sigBytes -= 16;
            }
            return _2.create({ ciphertext: r5, salt: e5 });
          } };
          var E2 = i3.SerializableCipher = n2.extend({ cfg: n2.extend({ format: b2 }), encrypt: function(t5, e5, r5, i4) {
            i4 = this.cfg.extend(i4);
            var n3 = t5.createEncryptor(r5, i4);
            var s3 = n3.finalize(e5);
            var a3 = n3.cfg;
            return _2.create({ ciphertext: s3, key: r5, iv: a3.iv, algorithm: t5, mode: a3.mode, padding: a3.padding, blockSize: t5.blockSize, formatter: i4.format });
          }, decrypt: function(t5, e5, r5, i4) {
            i4 = this.cfg.extend(i4);
            e5 = this._parse(e5, i4.format);
            var n3 = t5.createDecryptor(r5, i4).finalize(e5.ciphertext);
            return n3;
          }, _parse: function(t5, e5) {
            if ("string" == typeof t5)
              return e5.parse(t5, this);
            else
              return t5;
          } });
          var D2 = r4.kdf = {};
          var T = D2.OpenSSL = { execute: function(t5, e5, r5, i4) {
            if (!i4)
              i4 = s2.random(64 / 8);
            var n3 = f2.create({ keySize: e5 + r5 }).compute(t5, i4);
            var a3 = s2.create(n3.words.slice(e5), 4 * r5);
            n3.sigBytes = 4 * e5;
            return _2.create({ key: n3, iv: a3, salt: i4 });
          } };
          var M2 = i3.PasswordBasedCipher = E2.extend({ cfg: E2.cfg.extend({ kdf: T }), encrypt: function(t5, e5, r5, i4) {
            i4 = this.cfg.extend(i4);
            var n3 = i4.kdf.execute(r5, t5.keySize, t5.ivSize);
            i4.iv = n3.iv;
            var s3 = E2.encrypt.call(this, t5, e5, n3.key, i4);
            s3.mixIn(n3);
            return s3;
          }, decrypt: function(t5, e5, r5, i4) {
            i4 = this.cfg.extend(i4);
            e5 = this._parse(e5, i4.format);
            var n3 = i4.kdf.execute(r5, t5.keySize, t5.ivSize, e5.salt);
            i4.iv = n3.iv;
            var s3 = E2.decrypt.call(this, t5, e5, n3.key, i4);
            return s3;
          } });
        }();
      });
    }, 8249: function(t3, e3, r3) {
      (function(r4, i3) {
        t3.exports = i3();
      })(this, function() {
        var t4 = t4 || function(t5, e4) {
          var i3;
          if ("undefined" !== typeof window && window.crypto)
            i3 = window.crypto;
          if ("undefined" !== typeof self && self.crypto)
            i3 = self.crypto;
          if ("undefined" !== typeof globalThis && globalThis.crypto)
            i3 = globalThis.crypto;
          if (!i3 && "undefined" !== typeof window && window.msCrypto)
            i3 = window.msCrypto;
          if (!i3 && "undefined" !== typeof r3.g && r3.g.crypto)
            i3 = r3.g.crypto;
          if (!i3 && true)
            try {
              i3 = r3(2480);
            } catch (t6) {
            }
          var n2 = function() {
            if (i3) {
              if ("function" === typeof i3.getRandomValues)
                try {
                  return i3.getRandomValues(new Uint32Array(1))[0];
                } catch (t6) {
                }
              if ("function" === typeof i3.randomBytes)
                try {
                  return i3.randomBytes(4).readInt32LE();
                } catch (t6) {
                }
            }
            throw new Error("Native crypto module could not be used to get secure random number.");
          };
          var s2 = Object.create || function() {
            function t6() {
            }
            return function(e5) {
              var r4;
              t6.prototype = e5;
              r4 = new t6();
              t6.prototype = null;
              return r4;
            };
          }();
          var a2 = {};
          var o2 = a2.lib = {};
          var u2 = o2.Base = function() {
            return { extend: function(t6) {
              var e5 = s2(this);
              if (t6)
                e5.mixIn(t6);
              if (!e5.hasOwnProperty("init") || this.init === e5.init)
                e5.init = function() {
                  e5.$super.init.apply(this, arguments);
                };
              e5.init.prototype = e5;
              e5.$super = this;
              return e5;
            }, create: function() {
              var t6 = this.extend();
              t6.init.apply(t6, arguments);
              return t6;
            }, init: function() {
            }, mixIn: function(t6) {
              for (var e5 in t6)
                if (t6.hasOwnProperty(e5))
                  this[e5] = t6[e5];
              if (t6.hasOwnProperty("toString"))
                this.toString = t6.toString;
            }, clone: function() {
              return this.init.prototype.extend(this);
            } };
          }();
          var c2 = o2.WordArray = u2.extend({ init: function(t6, r4) {
            t6 = this.words = t6 || [];
            if (r4 != e4)
              this.sigBytes = r4;
            else
              this.sigBytes = 4 * t6.length;
          }, toString: function(t6) {
            return (t6 || f2).stringify(this);
          }, concat: function(t6) {
            var e5 = this.words;
            var r4 = t6.words;
            var i4 = this.sigBytes;
            var n3 = t6.sigBytes;
            this.clamp();
            if (i4 % 4)
              for (var s3 = 0; s3 < n3; s3++) {
                var a3 = r4[s3 >>> 2] >>> 24 - s3 % 4 * 8 & 255;
                e5[i4 + s3 >>> 2] |= a3 << 24 - (i4 + s3) % 4 * 8;
              }
            else
              for (var o3 = 0; o3 < n3; o3 += 4)
                e5[i4 + o3 >>> 2] = r4[o3 >>> 2];
            this.sigBytes += n3;
            return this;
          }, clamp: function() {
            var e5 = this.words;
            var r4 = this.sigBytes;
            e5[r4 >>> 2] &= 4294967295 << 32 - r4 % 4 * 8;
            e5.length = t5.ceil(r4 / 4);
          }, clone: function() {
            var t6 = u2.clone.call(this);
            t6.words = this.words.slice(0);
            return t6;
          }, random: function(t6) {
            var e5 = [];
            for (var r4 = 0; r4 < t6; r4 += 4)
              e5.push(n2());
            return new c2.init(e5, t6);
          } });
          var l2 = a2.enc = {};
          var f2 = l2.Hex = { stringify: function(t6) {
            var e5 = t6.words;
            var r4 = t6.sigBytes;
            var i4 = [];
            for (var n3 = 0; n3 < r4; n3++) {
              var s3 = e5[n3 >>> 2] >>> 24 - n3 % 4 * 8 & 255;
              i4.push((s3 >>> 4).toString(16));
              i4.push((15 & s3).toString(16));
            }
            return i4.join("");
          }, parse: function(t6) {
            var e5 = t6.length;
            var r4 = [];
            for (var i4 = 0; i4 < e5; i4 += 2)
              r4[i4 >>> 3] |= parseInt(t6.substr(i4, 2), 16) << 24 - i4 % 8 * 4;
            return new c2.init(r4, e5 / 2);
          } };
          var h2 = l2.Latin1 = { stringify: function(t6) {
            var e5 = t6.words;
            var r4 = t6.sigBytes;
            var i4 = [];
            for (var n3 = 0; n3 < r4; n3++) {
              var s3 = e5[n3 >>> 2] >>> 24 - n3 % 4 * 8 & 255;
              i4.push(String.fromCharCode(s3));
            }
            return i4.join("");
          }, parse: function(t6) {
            var e5 = t6.length;
            var r4 = [];
            for (var i4 = 0; i4 < e5; i4++)
              r4[i4 >>> 2] |= (255 & t6.charCodeAt(i4)) << 24 - i4 % 4 * 8;
            return new c2.init(r4, e5);
          } };
          var d2 = l2.Utf8 = { stringify: function(t6) {
            try {
              return decodeURIComponent(escape(h2.stringify(t6)));
            } catch (t7) {
              throw new Error("Malformed UTF-8 data");
            }
          }, parse: function(t6) {
            return h2.parse(unescape(encodeURIComponent(t6)));
          } };
          var v2 = o2.BufferedBlockAlgorithm = u2.extend({ reset: function() {
            this._data = new c2.init();
            this._nDataBytes = 0;
          }, _append: function(t6) {
            if ("string" == typeof t6)
              t6 = d2.parse(t6);
            this._data.concat(t6);
            this._nDataBytes += t6.sigBytes;
          }, _process: function(e5) {
            var r4;
            var i4 = this._data;
            var n3 = i4.words;
            var s3 = i4.sigBytes;
            var a3 = this.blockSize;
            var o3 = 4 * a3;
            var u3 = s3 / o3;
            if (e5)
              u3 = t5.ceil(u3);
            else
              u3 = t5.max((0 | u3) - this._minBufferSize, 0);
            var l3 = u3 * a3;
            var f3 = t5.min(4 * l3, s3);
            if (l3) {
              for (var h3 = 0; h3 < l3; h3 += a3)
                this._doProcessBlock(n3, h3);
              r4 = n3.splice(0, l3);
              i4.sigBytes -= f3;
            }
            return new c2.init(r4, f3);
          }, clone: function() {
            var t6 = u2.clone.call(this);
            t6._data = this._data.clone();
            return t6;
          }, _minBufferSize: 0 });
          o2.Hasher = v2.extend({ cfg: u2.extend(), init: function(t6) {
            this.cfg = this.cfg.extend(t6);
            this.reset();
          }, reset: function() {
            v2.reset.call(this);
            this._doReset();
          }, update: function(t6) {
            this._append(t6);
            this._process();
            return this;
          }, finalize: function(t6) {
            if (t6)
              this._append(t6);
            var e5 = this._doFinalize();
            return e5;
          }, blockSize: 512 / 32, _createHelper: function(t6) {
            return function(e5, r4) {
              return new t6.init(r4).finalize(e5);
            };
          }, _createHmacHelper: function(t6) {
            return function(e5, r4) {
              return new g2.HMAC.init(t6, r4).finalize(e5);
            };
          } });
          var g2 = a2.algo = {};
          return a2;
        }(Math);
        return t4;
      });
    }, 8269: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = e4.enc;
          n2.Base64 = { stringify: function(t5) {
            var e5 = t5.words;
            var r5 = t5.sigBytes;
            var i4 = this._map;
            t5.clamp();
            var n3 = [];
            for (var s2 = 0; s2 < r5; s2 += 3) {
              var a3 = e5[s2 >>> 2] >>> 24 - s2 % 4 * 8 & 255;
              var o2 = e5[s2 + 1 >>> 2] >>> 24 - (s2 + 1) % 4 * 8 & 255;
              var u2 = e5[s2 + 2 >>> 2] >>> 24 - (s2 + 2) % 4 * 8 & 255;
              var c2 = a3 << 16 | o2 << 8 | u2;
              for (var l2 = 0; l2 < 4 && s2 + 0.75 * l2 < r5; l2++)
                n3.push(i4.charAt(c2 >>> 6 * (3 - l2) & 63));
            }
            var f2 = i4.charAt(64);
            if (f2)
              while (n3.length % 4)
                n3.push(f2);
            return n3.join("");
          }, parse: function(t5) {
            var e5 = t5.length;
            var r5 = this._map;
            var i4 = this._reverseMap;
            if (!i4) {
              i4 = this._reverseMap = [];
              for (var n3 = 0; n3 < r5.length; n3++)
                i4[r5.charCodeAt(n3)] = n3;
            }
            var s2 = r5.charAt(64);
            if (s2) {
              var o2 = t5.indexOf(s2);
              if (-1 !== o2)
                e5 = o2;
            }
            return a2(t5, e5, i4);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
          function a2(t5, e5, r5) {
            var n3 = [];
            var s2 = 0;
            for (var a3 = 0; a3 < e5; a3++)
              if (a3 % 4) {
                var o2 = r5[t5.charCodeAt(a3 - 1)] << a3 % 4 * 2;
                var u2 = r5[t5.charCodeAt(a3)] >>> 6 - a3 % 4 * 2;
                var c2 = o2 | u2;
                n3[s2 >>> 2] |= c2 << 24 - s2 % 4 * 8;
                s2++;
              }
            return i3.create(n3, s2);
          }
        })();
        return t4.enc.Base64;
      });
    }, 3786: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = e4.enc;
          n2.Base64url = { stringify: function(t5, e5 = true) {
            var r5 = t5.words;
            var i4 = t5.sigBytes;
            var n3 = e5 ? this._safe_map : this._map;
            t5.clamp();
            var s2 = [];
            for (var a3 = 0; a3 < i4; a3 += 3) {
              var o2 = r5[a3 >>> 2] >>> 24 - a3 % 4 * 8 & 255;
              var u2 = r5[a3 + 1 >>> 2] >>> 24 - (a3 + 1) % 4 * 8 & 255;
              var c2 = r5[a3 + 2 >>> 2] >>> 24 - (a3 + 2) % 4 * 8 & 255;
              var l2 = o2 << 16 | u2 << 8 | c2;
              for (var f2 = 0; f2 < 4 && a3 + 0.75 * f2 < i4; f2++)
                s2.push(n3.charAt(l2 >>> 6 * (3 - f2) & 63));
            }
            var h2 = n3.charAt(64);
            if (h2)
              while (s2.length % 4)
                s2.push(h2);
            return s2.join("");
          }, parse: function(t5, e5 = true) {
            var r5 = t5.length;
            var i4 = e5 ? this._safe_map : this._map;
            var n3 = this._reverseMap;
            if (!n3) {
              n3 = this._reverseMap = [];
              for (var s2 = 0; s2 < i4.length; s2++)
                n3[i4.charCodeAt(s2)] = s2;
            }
            var o2 = i4.charAt(64);
            if (o2) {
              var u2 = t5.indexOf(o2);
              if (-1 !== u2)
                r5 = u2;
            }
            return a2(t5, r5, n3);
          }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_" };
          function a2(t5, e5, r5) {
            var n3 = [];
            var s2 = 0;
            for (var a3 = 0; a3 < e5; a3++)
              if (a3 % 4) {
                var o2 = r5[t5.charCodeAt(a3 - 1)] << a3 % 4 * 2;
                var u2 = r5[t5.charCodeAt(a3)] >>> 6 - a3 % 4 * 2;
                var c2 = o2 | u2;
                n3[s2 >>> 2] |= c2 << 24 - s2 % 4 * 8;
                s2++;
              }
            return i3.create(n3, s2);
          }
        })();
        return t4.enc.Base64url;
      });
    }, 298: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = e4.enc;
          n2.Utf16 = n2.Utf16BE = { stringify: function(t5) {
            var e5 = t5.words;
            var r5 = t5.sigBytes;
            var i4 = [];
            for (var n3 = 0; n3 < r5; n3 += 2) {
              var s2 = e5[n3 >>> 2] >>> 16 - n3 % 4 * 8 & 65535;
              i4.push(String.fromCharCode(s2));
            }
            return i4.join("");
          }, parse: function(t5) {
            var e5 = t5.length;
            var r5 = [];
            for (var n3 = 0; n3 < e5; n3++)
              r5[n3 >>> 1] |= t5.charCodeAt(n3) << 16 - n3 % 2 * 16;
            return i3.create(r5, 2 * e5);
          } };
          n2.Utf16LE = { stringify: function(t5) {
            var e5 = t5.words;
            var r5 = t5.sigBytes;
            var i4 = [];
            for (var n3 = 0; n3 < r5; n3 += 2) {
              var s2 = a2(e5[n3 >>> 2] >>> 16 - n3 % 4 * 8 & 65535);
              i4.push(String.fromCharCode(s2));
            }
            return i4.join("");
          }, parse: function(t5) {
            var e5 = t5.length;
            var r5 = [];
            for (var n3 = 0; n3 < e5; n3++)
              r5[n3 >>> 1] |= a2(t5.charCodeAt(n3) << 16 - n3 % 2 * 16);
            return i3.create(r5, 2 * e5);
          } };
          function a2(t5) {
            return t5 << 8 & 4278255360 | t5 >>> 8 & 16711935;
          }
        })();
        return t4.enc.Utf16;
      });
    }, 888: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(2783), r3(9824));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.Base;
          var n2 = r4.WordArray;
          var s2 = e4.algo;
          var a2 = s2.MD5;
          var o2 = s2.EvpKDF = i3.extend({ cfg: i3.extend({ keySize: 128 / 32, hasher: a2, iterations: 1 }), init: function(t5) {
            this.cfg = this.cfg.extend(t5);
          }, compute: function(t5, e5) {
            var r5;
            var i4 = this.cfg;
            var s3 = i4.hasher.create();
            var a3 = n2.create();
            var o3 = a3.words;
            var u2 = i4.keySize;
            var c2 = i4.iterations;
            while (o3.length < u2) {
              if (r5)
                s3.update(r5);
              r5 = s3.update(t5).finalize(e5);
              s3.reset();
              for (var l2 = 1; l2 < c2; l2++) {
                r5 = s3.finalize(r5);
                s3.reset();
              }
              a3.concat(r5);
            }
            a3.sigBytes = 4 * u2;
            return a3;
          } });
          e4.EvpKDF = function(t5, e5, r5) {
            return o2.create(r5).compute(t5, e5);
          };
        })();
        return t4.EvpKDF;
      });
    }, 2209: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        (function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.CipherParams;
          var s2 = r4.enc;
          var a2 = s2.Hex;
          var o2 = r4.format;
          o2.Hex = { stringify: function(t5) {
            return t5.ciphertext.toString(a2);
          }, parse: function(t5) {
            var e5 = a2.parse(t5);
            return n2.create({ ciphertext: e5 });
          } };
        })();
        return t4.format.Hex;
      });
    }, 9824: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.Base;
          var n2 = e4.enc;
          var s2 = n2.Utf8;
          var a2 = e4.algo;
          a2.HMAC = i3.extend({ init: function(t5, e5) {
            t5 = this._hasher = new t5.init();
            if ("string" == typeof e5)
              e5 = s2.parse(e5);
            var r5 = t5.blockSize;
            var i4 = 4 * r5;
            if (e5.sigBytes > i4)
              e5 = t5.finalize(e5);
            e5.clamp();
            var n3 = this._oKey = e5.clone();
            var a3 = this._iKey = e5.clone();
            var o2 = n3.words;
            var u2 = a3.words;
            for (var c2 = 0; c2 < r5; c2++) {
              o2[c2] ^= 1549556828;
              u2[c2] ^= 909522486;
            }
            n3.sigBytes = a3.sigBytes = i4;
            this.reset();
          }, reset: function() {
            var t5 = this._hasher;
            t5.reset();
            t5.update(this._iKey);
          }, update: function(t5) {
            this._hasher.update(t5);
            return this;
          }, finalize: function(t5) {
            var e5 = this._hasher;
            var r5 = e5.finalize(t5);
            e5.reset();
            var i4 = e5.finalize(this._oKey.clone().concat(r5));
            return i4;
          } });
        })();
      });
    }, 1354: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(4938), r3(4433), r3(298), r3(8269), r3(3786), r3(8214), r3(2783), r3(2153), r3(7792), r3(34), r3(7460), r3(3327), r3(706), r3(9824), r3(2112), r3(888), r3(5109), r3(8568), r3(4242), r3(9968), r3(7660), r3(1148), r3(3615), r3(2807), r3(1077), r3(6475), r3(6991), r3(2209), r3(452), r3(4253), r3(1857), r3(4454), r3(3974));
      })(this, function(t4) {
        return t4;
      });
    }, 4433: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function() {
          if ("function" != typeof ArrayBuffer)
            return;
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = i3.init;
          var s2 = i3.init = function(t5) {
            if (t5 instanceof ArrayBuffer)
              t5 = new Uint8Array(t5);
            if (t5 instanceof Int8Array || "undefined" !== typeof Uint8ClampedArray && t5 instanceof Uint8ClampedArray || t5 instanceof Int16Array || t5 instanceof Uint16Array || t5 instanceof Int32Array || t5 instanceof Uint32Array || t5 instanceof Float32Array || t5 instanceof Float64Array)
              t5 = new Uint8Array(t5.buffer, t5.byteOffset, t5.byteLength);
            if (t5 instanceof Uint8Array) {
              var e5 = t5.byteLength;
              var r5 = [];
              for (var i4 = 0; i4 < e5; i4++)
                r5[i4 >>> 2] |= t5[i4] << 24 - i4 % 4 * 8;
              n2.call(this, r5, e5);
            } else
              n2.apply(this, arguments);
          };
          s2.prototype = i3;
        })();
        return t4.lib.WordArray;
      });
    }, 8214: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.WordArray;
          var s2 = i3.Hasher;
          var a2 = r4.algo;
          var o2 = [];
          (function() {
            for (var t5 = 0; t5 < 64; t5++)
              o2[t5] = 4294967296 * e4.abs(e4.sin(t5 + 1)) | 0;
          })();
          var u2 = a2.MD5 = s2.extend({ _doReset: function() {
            this._hash = new n2.init([1732584193, 4023233417, 2562383102, 271733878]);
          }, _doProcessBlock: function(t5, e5) {
            for (var r5 = 0; r5 < 16; r5++) {
              var i4 = e5 + r5;
              var n3 = t5[i4];
              t5[i4] = 16711935 & (n3 << 8 | n3 >>> 24) | 4278255360 & (n3 << 24 | n3 >>> 8);
            }
            var s3 = this._hash.words;
            var a3 = t5[e5 + 0];
            var u3 = t5[e5 + 1];
            var d2 = t5[e5 + 2];
            var v2 = t5[e5 + 3];
            var p2 = t5[e5 + 4];
            var g2 = t5[e5 + 5];
            var y2 = t5[e5 + 6];
            var m2 = t5[e5 + 7];
            var w2 = t5[e5 + 8];
            var _2 = t5[e5 + 9];
            var S2 = t5[e5 + 10];
            var b2 = t5[e5 + 11];
            var E2 = t5[e5 + 12];
            var D2 = t5[e5 + 13];
            var T = t5[e5 + 14];
            var M2 = t5[e5 + 15];
            var I2 = s3[0];
            var A2 = s3[1];
            var x2 = s3[2];
            var R2 = s3[3];
            I2 = c2(I2, A2, x2, R2, a3, 7, o2[0]);
            R2 = c2(R2, I2, A2, x2, u3, 12, o2[1]);
            x2 = c2(x2, R2, I2, A2, d2, 17, o2[2]);
            A2 = c2(A2, x2, R2, I2, v2, 22, o2[3]);
            I2 = c2(I2, A2, x2, R2, p2, 7, o2[4]);
            R2 = c2(R2, I2, A2, x2, g2, 12, o2[5]);
            x2 = c2(x2, R2, I2, A2, y2, 17, o2[6]);
            A2 = c2(A2, x2, R2, I2, m2, 22, o2[7]);
            I2 = c2(I2, A2, x2, R2, w2, 7, o2[8]);
            R2 = c2(R2, I2, A2, x2, _2, 12, o2[9]);
            x2 = c2(x2, R2, I2, A2, S2, 17, o2[10]);
            A2 = c2(A2, x2, R2, I2, b2, 22, o2[11]);
            I2 = c2(I2, A2, x2, R2, E2, 7, o2[12]);
            R2 = c2(R2, I2, A2, x2, D2, 12, o2[13]);
            x2 = c2(x2, R2, I2, A2, T, 17, o2[14]);
            A2 = c2(A2, x2, R2, I2, M2, 22, o2[15]);
            I2 = l2(I2, A2, x2, R2, u3, 5, o2[16]);
            R2 = l2(R2, I2, A2, x2, y2, 9, o2[17]);
            x2 = l2(x2, R2, I2, A2, b2, 14, o2[18]);
            A2 = l2(A2, x2, R2, I2, a3, 20, o2[19]);
            I2 = l2(I2, A2, x2, R2, g2, 5, o2[20]);
            R2 = l2(R2, I2, A2, x2, S2, 9, o2[21]);
            x2 = l2(x2, R2, I2, A2, M2, 14, o2[22]);
            A2 = l2(A2, x2, R2, I2, p2, 20, o2[23]);
            I2 = l2(I2, A2, x2, R2, _2, 5, o2[24]);
            R2 = l2(R2, I2, A2, x2, T, 9, o2[25]);
            x2 = l2(x2, R2, I2, A2, v2, 14, o2[26]);
            A2 = l2(A2, x2, R2, I2, w2, 20, o2[27]);
            I2 = l2(I2, A2, x2, R2, D2, 5, o2[28]);
            R2 = l2(R2, I2, A2, x2, d2, 9, o2[29]);
            x2 = l2(x2, R2, I2, A2, m2, 14, o2[30]);
            A2 = l2(A2, x2, R2, I2, E2, 20, o2[31]);
            I2 = f2(I2, A2, x2, R2, g2, 4, o2[32]);
            R2 = f2(R2, I2, A2, x2, w2, 11, o2[33]);
            x2 = f2(x2, R2, I2, A2, b2, 16, o2[34]);
            A2 = f2(A2, x2, R2, I2, T, 23, o2[35]);
            I2 = f2(I2, A2, x2, R2, u3, 4, o2[36]);
            R2 = f2(R2, I2, A2, x2, p2, 11, o2[37]);
            x2 = f2(x2, R2, I2, A2, m2, 16, o2[38]);
            A2 = f2(A2, x2, R2, I2, S2, 23, o2[39]);
            I2 = f2(I2, A2, x2, R2, D2, 4, o2[40]);
            R2 = f2(R2, I2, A2, x2, a3, 11, o2[41]);
            x2 = f2(x2, R2, I2, A2, v2, 16, o2[42]);
            A2 = f2(A2, x2, R2, I2, y2, 23, o2[43]);
            I2 = f2(I2, A2, x2, R2, _2, 4, o2[44]);
            R2 = f2(R2, I2, A2, x2, E2, 11, o2[45]);
            x2 = f2(x2, R2, I2, A2, M2, 16, o2[46]);
            A2 = f2(A2, x2, R2, I2, d2, 23, o2[47]);
            I2 = h2(I2, A2, x2, R2, a3, 6, o2[48]);
            R2 = h2(R2, I2, A2, x2, m2, 10, o2[49]);
            x2 = h2(x2, R2, I2, A2, T, 15, o2[50]);
            A2 = h2(A2, x2, R2, I2, g2, 21, o2[51]);
            I2 = h2(I2, A2, x2, R2, E2, 6, o2[52]);
            R2 = h2(R2, I2, A2, x2, v2, 10, o2[53]);
            x2 = h2(x2, R2, I2, A2, S2, 15, o2[54]);
            A2 = h2(A2, x2, R2, I2, u3, 21, o2[55]);
            I2 = h2(I2, A2, x2, R2, w2, 6, o2[56]);
            R2 = h2(R2, I2, A2, x2, M2, 10, o2[57]);
            x2 = h2(x2, R2, I2, A2, y2, 15, o2[58]);
            A2 = h2(A2, x2, R2, I2, D2, 21, o2[59]);
            I2 = h2(I2, A2, x2, R2, p2, 6, o2[60]);
            R2 = h2(R2, I2, A2, x2, b2, 10, o2[61]);
            x2 = h2(x2, R2, I2, A2, d2, 15, o2[62]);
            A2 = h2(A2, x2, R2, I2, _2, 21, o2[63]);
            s3[0] = s3[0] + I2 | 0;
            s3[1] = s3[1] + A2 | 0;
            s3[2] = s3[2] + x2 | 0;
            s3[3] = s3[3] + R2 | 0;
          }, _doFinalize: function() {
            var t5 = this._data;
            var r5 = t5.words;
            var i4 = 8 * this._nDataBytes;
            var n3 = 8 * t5.sigBytes;
            r5[n3 >>> 5] |= 128 << 24 - n3 % 32;
            var s3 = e4.floor(i4 / 4294967296);
            var a3 = i4;
            r5[(n3 + 64 >>> 9 << 4) + 15] = 16711935 & (s3 << 8 | s3 >>> 24) | 4278255360 & (s3 << 24 | s3 >>> 8);
            r5[(n3 + 64 >>> 9 << 4) + 14] = 16711935 & (a3 << 8 | a3 >>> 24) | 4278255360 & (a3 << 24 | a3 >>> 8);
            t5.sigBytes = 4 * (r5.length + 1);
            this._process();
            var o3 = this._hash;
            var u3 = o3.words;
            for (var c3 = 0; c3 < 4; c3++) {
              var l3 = u3[c3];
              u3[c3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
            }
            return o3;
          }, clone: function() {
            var t5 = s2.clone.call(this);
            t5._hash = this._hash.clone();
            return t5;
          } });
          function c2(t5, e5, r5, i4, n3, s3, a3) {
            var o3 = t5 + (e5 & r5 | ~e5 & i4) + n3 + a3;
            return (o3 << s3 | o3 >>> 32 - s3) + e5;
          }
          function l2(t5, e5, r5, i4, n3, s3, a3) {
            var o3 = t5 + (e5 & i4 | r5 & ~i4) + n3 + a3;
            return (o3 << s3 | o3 >>> 32 - s3) + e5;
          }
          function f2(t5, e5, r5, i4, n3, s3, a3) {
            var o3 = t5 + (e5 ^ r5 ^ i4) + n3 + a3;
            return (o3 << s3 | o3 >>> 32 - s3) + e5;
          }
          function h2(t5, e5, r5, i4, n3, s3, a3) {
            var o3 = t5 + (r5 ^ (e5 | ~i4)) + n3 + a3;
            return (o3 << s3 | o3 >>> 32 - s3) + e5;
          }
          r4.MD5 = s2._createHelper(u2);
          r4.HmacMD5 = s2._createHmacHelper(u2);
        })(Math);
        return t4.MD5;
      });
    }, 8568: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.mode.CFB = function() {
          var e4 = t4.lib.BlockCipherMode.extend();
          e4.Encryptor = e4.extend({ processBlock: function(t5, e5) {
            var i3 = this._cipher;
            var n2 = i3.blockSize;
            r4.call(this, t5, e5, n2, i3);
            this._prevBlock = t5.slice(e5, e5 + n2);
          } });
          e4.Decryptor = e4.extend({ processBlock: function(t5, e5) {
            var i3 = this._cipher;
            var n2 = i3.blockSize;
            var s2 = t5.slice(e5, e5 + n2);
            r4.call(this, t5, e5, n2, i3);
            this._prevBlock = s2;
          } });
          function r4(t5, e5, r5, i3) {
            var n2;
            var s2 = this._iv;
            if (s2) {
              n2 = s2.slice(0);
              this._iv = void 0;
            } else
              n2 = this._prevBlock;
            i3.encryptBlock(n2, 0);
            for (var a2 = 0; a2 < r5; a2++)
              t5[e5 + a2] ^= n2[a2];
          }
          return e4;
        }();
        return t4.mode.CFB;
      });
    }, 9968: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.mode.CTRGladman = function() {
          var e4 = t4.lib.BlockCipherMode.extend();
          function r4(t5) {
            if (255 === (t5 >> 24 & 255)) {
              var e5 = t5 >> 16 & 255;
              var r5 = t5 >> 8 & 255;
              var i4 = 255 & t5;
              if (255 === e5) {
                e5 = 0;
                if (255 === r5) {
                  r5 = 0;
                  if (255 === i4)
                    i4 = 0;
                  else
                    ++i4;
                } else
                  ++r5;
              } else
                ++e5;
              t5 = 0;
              t5 += e5 << 16;
              t5 += r5 << 8;
              t5 += i4;
            } else
              t5 += 1 << 24;
            return t5;
          }
          function i3(t5) {
            if (0 === (t5[0] = r4(t5[0])))
              t5[1] = r4(t5[1]);
            return t5;
          }
          var n2 = e4.Encryptor = e4.extend({ processBlock: function(t5, e5) {
            var r5 = this._cipher;
            var n3 = r5.blockSize;
            var s2 = this._iv;
            var a2 = this._counter;
            if (s2) {
              a2 = this._counter = s2.slice(0);
              this._iv = void 0;
            }
            i3(a2);
            var o2 = a2.slice(0);
            r5.encryptBlock(o2, 0);
            for (var u2 = 0; u2 < n3; u2++)
              t5[e5 + u2] ^= o2[u2];
          } });
          e4.Decryptor = n2;
          return e4;
        }();
        return t4.mode.CTRGladman;
      });
    }, 4242: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.mode.CTR = function() {
          var e4 = t4.lib.BlockCipherMode.extend();
          var r4 = e4.Encryptor = e4.extend({ processBlock: function(t5, e5) {
            var r5 = this._cipher;
            var i3 = r5.blockSize;
            var n2 = this._iv;
            var s2 = this._counter;
            if (n2) {
              s2 = this._counter = n2.slice(0);
              this._iv = void 0;
            }
            var a2 = s2.slice(0);
            r5.encryptBlock(a2, 0);
            s2[i3 - 1] = s2[i3 - 1] + 1 | 0;
            for (var o2 = 0; o2 < i3; o2++)
              t5[e5 + o2] ^= a2[o2];
          } });
          e4.Decryptor = r4;
          return e4;
        }();
        return t4.mode.CTR;
      });
    }, 1148: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.mode.ECB = function() {
          var e4 = t4.lib.BlockCipherMode.extend();
          e4.Encryptor = e4.extend({ processBlock: function(t5, e5) {
            this._cipher.encryptBlock(t5, e5);
          } });
          e4.Decryptor = e4.extend({ processBlock: function(t5, e5) {
            this._cipher.decryptBlock(t5, e5);
          } });
          return e4;
        }();
        return t4.mode.ECB;
      });
    }, 7660: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.mode.OFB = function() {
          var e4 = t4.lib.BlockCipherMode.extend();
          var r4 = e4.Encryptor = e4.extend({ processBlock: function(t5, e5) {
            var r5 = this._cipher;
            var i3 = r5.blockSize;
            var n2 = this._iv;
            var s2 = this._keystream;
            if (n2) {
              s2 = this._keystream = n2.slice(0);
              this._iv = void 0;
            }
            r5.encryptBlock(s2, 0);
            for (var a2 = 0; a2 < i3; a2++)
              t5[e5 + a2] ^= s2[a2];
          } });
          e4.Decryptor = r4;
          return e4;
        }();
        return t4.mode.OFB;
      });
    }, 3615: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.pad.AnsiX923 = { pad: function(t5, e4) {
          var r4 = t5.sigBytes;
          var i3 = 4 * e4;
          var n2 = i3 - r4 % i3;
          var s2 = r4 + n2 - 1;
          t5.clamp();
          t5.words[s2 >>> 2] |= n2 << 24 - s2 % 4 * 8;
          t5.sigBytes += n2;
        }, unpad: function(t5) {
          var e4 = 255 & t5.words[t5.sigBytes - 1 >>> 2];
          t5.sigBytes -= e4;
        } };
        return t4.pad.Ansix923;
      });
    }, 2807: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.pad.Iso10126 = { pad: function(e4, r4) {
          var i3 = 4 * r4;
          var n2 = i3 - e4.sigBytes % i3;
          e4.concat(t4.lib.WordArray.random(n2 - 1)).concat(t4.lib.WordArray.create([n2 << 24], 1));
        }, unpad: function(t5) {
          var e4 = 255 & t5.words[t5.sigBytes - 1 >>> 2];
          t5.sigBytes -= e4;
        } };
        return t4.pad.Iso10126;
      });
    }, 1077: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.pad.Iso97971 = { pad: function(e4, r4) {
          e4.concat(t4.lib.WordArray.create([2147483648], 1));
          t4.pad.ZeroPadding.pad(e4, r4);
        }, unpad: function(e4) {
          t4.pad.ZeroPadding.unpad(e4);
          e4.sigBytes--;
        } };
        return t4.pad.Iso97971;
      });
    }, 6991: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.pad.NoPadding = { pad: function() {
        }, unpad: function() {
        } };
        return t4.pad.NoPadding;
      });
    }, 6475: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(5109));
      })(this, function(t4) {
        t4.pad.ZeroPadding = { pad: function(t5, e4) {
          var r4 = 4 * e4;
          t5.clamp();
          t5.sigBytes += r4 - (t5.sigBytes % r4 || r4);
        }, unpad: function(t5) {
          var e4 = t5.words;
          var r4 = t5.sigBytes - 1;
          for (var r4 = t5.sigBytes - 1; r4 >= 0; r4--)
            if (e4[r4 >>> 2] >>> 24 - r4 % 4 * 8 & 255) {
              t5.sigBytes = r4 + 1;
              break;
            }
        } };
        return t4.pad.ZeroPadding;
      });
    }, 2112: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(2783), r3(9824));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.Base;
          var n2 = r4.WordArray;
          var s2 = e4.algo;
          var a2 = s2.SHA1;
          var o2 = s2.HMAC;
          var u2 = s2.PBKDF2 = i3.extend({ cfg: i3.extend({ keySize: 128 / 32, hasher: a2, iterations: 1 }), init: function(t5) {
            this.cfg = this.cfg.extend(t5);
          }, compute: function(t5, e5) {
            var r5 = this.cfg;
            var i4 = o2.create(r5.hasher, t5);
            var s3 = n2.create();
            var a3 = n2.create([1]);
            var u3 = s3.words;
            var c2 = a3.words;
            var l2 = r5.keySize;
            var f2 = r5.iterations;
            while (u3.length < l2) {
              var h2 = i4.update(e5).finalize(a3);
              i4.reset();
              var d2 = h2.words;
              var v2 = d2.length;
              var p2 = h2;
              for (var g2 = 1; g2 < f2; g2++) {
                p2 = i4.finalize(p2);
                i4.reset();
                var y2 = p2.words;
                for (var m2 = 0; m2 < v2; m2++)
                  d2[m2] ^= y2[m2];
              }
              s3.concat(h2);
              c2[0]++;
            }
            s3.sigBytes = 4 * l2;
            return s3;
          } });
          e4.PBKDF2 = function(t5, e5, r5) {
            return u2.create(r5).compute(t5, e5);
          };
        })();
        return t4.PBKDF2;
      });
    }, 3974: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(8269), r3(8214), r3(888), r3(5109));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.StreamCipher;
          var n2 = e4.algo;
          var s2 = [];
          var a2 = [];
          var o2 = [];
          var u2 = n2.RabbitLegacy = i3.extend({ _doReset: function() {
            var t5 = this._key.words;
            var e5 = this.cfg.iv;
            var r5 = this._X = [t5[0], t5[3] << 16 | t5[2] >>> 16, t5[1], t5[0] << 16 | t5[3] >>> 16, t5[2], t5[1] << 16 | t5[0] >>> 16, t5[3], t5[2] << 16 | t5[1] >>> 16];
            var i4 = this._C = [t5[2] << 16 | t5[2] >>> 16, 4294901760 & t5[0] | 65535 & t5[1], t5[3] << 16 | t5[3] >>> 16, 4294901760 & t5[1] | 65535 & t5[2], t5[0] << 16 | t5[0] >>> 16, 4294901760 & t5[2] | 65535 & t5[3], t5[1] << 16 | t5[1] >>> 16, 4294901760 & t5[3] | 65535 & t5[0]];
            this._b = 0;
            for (var n3 = 0; n3 < 4; n3++)
              c2.call(this);
            for (var n3 = 0; n3 < 8; n3++)
              i4[n3] ^= r5[n3 + 4 & 7];
            if (e5) {
              var s3 = e5.words;
              var a3 = s3[0];
              var o3 = s3[1];
              var u3 = 16711935 & (a3 << 8 | a3 >>> 24) | 4278255360 & (a3 << 24 | a3 >>> 8);
              var l2 = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
              var f2 = u3 >>> 16 | 4294901760 & l2;
              var h2 = l2 << 16 | 65535 & u3;
              i4[0] ^= u3;
              i4[1] ^= f2;
              i4[2] ^= l2;
              i4[3] ^= h2;
              i4[4] ^= u3;
              i4[5] ^= f2;
              i4[6] ^= l2;
              i4[7] ^= h2;
              for (var n3 = 0; n3 < 4; n3++)
                c2.call(this);
            }
          }, _doProcessBlock: function(t5, e5) {
            var r5 = this._X;
            c2.call(this);
            s2[0] = r5[0] ^ r5[5] >>> 16 ^ r5[3] << 16;
            s2[1] = r5[2] ^ r5[7] >>> 16 ^ r5[5] << 16;
            s2[2] = r5[4] ^ r5[1] >>> 16 ^ r5[7] << 16;
            s2[3] = r5[6] ^ r5[3] >>> 16 ^ r5[1] << 16;
            for (var i4 = 0; i4 < 4; i4++) {
              s2[i4] = 16711935 & (s2[i4] << 8 | s2[i4] >>> 24) | 4278255360 & (s2[i4] << 24 | s2[i4] >>> 8);
              t5[e5 + i4] ^= s2[i4];
            }
          }, blockSize: 128 / 32, ivSize: 64 / 32 });
          function c2() {
            var t5 = this._X;
            var e5 = this._C;
            for (var r5 = 0; r5 < 8; r5++)
              a2[r5] = e5[r5];
            e5[0] = e5[0] + 1295307597 + this._b | 0;
            e5[1] = e5[1] + 3545052371 + (e5[0] >>> 0 < a2[0] >>> 0 ? 1 : 0) | 0;
            e5[2] = e5[2] + 886263092 + (e5[1] >>> 0 < a2[1] >>> 0 ? 1 : 0) | 0;
            e5[3] = e5[3] + 1295307597 + (e5[2] >>> 0 < a2[2] >>> 0 ? 1 : 0) | 0;
            e5[4] = e5[4] + 3545052371 + (e5[3] >>> 0 < a2[3] >>> 0 ? 1 : 0) | 0;
            e5[5] = e5[5] + 886263092 + (e5[4] >>> 0 < a2[4] >>> 0 ? 1 : 0) | 0;
            e5[6] = e5[6] + 1295307597 + (e5[5] >>> 0 < a2[5] >>> 0 ? 1 : 0) | 0;
            e5[7] = e5[7] + 3545052371 + (e5[6] >>> 0 < a2[6] >>> 0 ? 1 : 0) | 0;
            this._b = e5[7] >>> 0 < a2[7] >>> 0 ? 1 : 0;
            for (var r5 = 0; r5 < 8; r5++) {
              var i4 = t5[r5] + e5[r5];
              var n3 = 65535 & i4;
              var s3 = i4 >>> 16;
              var u3 = ((n3 * n3 >>> 17) + n3 * s3 >>> 15) + s3 * s3;
              var c3 = ((4294901760 & i4) * i4 | 0) + ((65535 & i4) * i4 | 0);
              o2[r5] = u3 ^ c3;
            }
            t5[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
            t5[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
            t5[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
            t5[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
            t5[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
            t5[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
            t5[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
            t5[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
          }
          e4.RabbitLegacy = i3._createHelper(u2);
        })();
        return t4.RabbitLegacy;
      });
    }, 4454: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(8269), r3(8214), r3(888), r3(5109));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.StreamCipher;
          var n2 = e4.algo;
          var s2 = [];
          var a2 = [];
          var o2 = [];
          var u2 = n2.Rabbit = i3.extend({ _doReset: function() {
            var t5 = this._key.words;
            var e5 = this.cfg.iv;
            for (var r5 = 0; r5 < 4; r5++)
              t5[r5] = 16711935 & (t5[r5] << 8 | t5[r5] >>> 24) | 4278255360 & (t5[r5] << 24 | t5[r5] >>> 8);
            var i4 = this._X = [t5[0], t5[3] << 16 | t5[2] >>> 16, t5[1], t5[0] << 16 | t5[3] >>> 16, t5[2], t5[1] << 16 | t5[0] >>> 16, t5[3], t5[2] << 16 | t5[1] >>> 16];
            var n3 = this._C = [t5[2] << 16 | t5[2] >>> 16, 4294901760 & t5[0] | 65535 & t5[1], t5[3] << 16 | t5[3] >>> 16, 4294901760 & t5[1] | 65535 & t5[2], t5[0] << 16 | t5[0] >>> 16, 4294901760 & t5[2] | 65535 & t5[3], t5[1] << 16 | t5[1] >>> 16, 4294901760 & t5[3] | 65535 & t5[0]];
            this._b = 0;
            for (var r5 = 0; r5 < 4; r5++)
              c2.call(this);
            for (var r5 = 0; r5 < 8; r5++)
              n3[r5] ^= i4[r5 + 4 & 7];
            if (e5) {
              var s3 = e5.words;
              var a3 = s3[0];
              var o3 = s3[1];
              var u3 = 16711935 & (a3 << 8 | a3 >>> 24) | 4278255360 & (a3 << 24 | a3 >>> 8);
              var l2 = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
              var f2 = u3 >>> 16 | 4294901760 & l2;
              var h2 = l2 << 16 | 65535 & u3;
              n3[0] ^= u3;
              n3[1] ^= f2;
              n3[2] ^= l2;
              n3[3] ^= h2;
              n3[4] ^= u3;
              n3[5] ^= f2;
              n3[6] ^= l2;
              n3[7] ^= h2;
              for (var r5 = 0; r5 < 4; r5++)
                c2.call(this);
            }
          }, _doProcessBlock: function(t5, e5) {
            var r5 = this._X;
            c2.call(this);
            s2[0] = r5[0] ^ r5[5] >>> 16 ^ r5[3] << 16;
            s2[1] = r5[2] ^ r5[7] >>> 16 ^ r5[5] << 16;
            s2[2] = r5[4] ^ r5[1] >>> 16 ^ r5[7] << 16;
            s2[3] = r5[6] ^ r5[3] >>> 16 ^ r5[1] << 16;
            for (var i4 = 0; i4 < 4; i4++) {
              s2[i4] = 16711935 & (s2[i4] << 8 | s2[i4] >>> 24) | 4278255360 & (s2[i4] << 24 | s2[i4] >>> 8);
              t5[e5 + i4] ^= s2[i4];
            }
          }, blockSize: 128 / 32, ivSize: 64 / 32 });
          function c2() {
            var t5 = this._X;
            var e5 = this._C;
            for (var r5 = 0; r5 < 8; r5++)
              a2[r5] = e5[r5];
            e5[0] = e5[0] + 1295307597 + this._b | 0;
            e5[1] = e5[1] + 3545052371 + (e5[0] >>> 0 < a2[0] >>> 0 ? 1 : 0) | 0;
            e5[2] = e5[2] + 886263092 + (e5[1] >>> 0 < a2[1] >>> 0 ? 1 : 0) | 0;
            e5[3] = e5[3] + 1295307597 + (e5[2] >>> 0 < a2[2] >>> 0 ? 1 : 0) | 0;
            e5[4] = e5[4] + 3545052371 + (e5[3] >>> 0 < a2[3] >>> 0 ? 1 : 0) | 0;
            e5[5] = e5[5] + 886263092 + (e5[4] >>> 0 < a2[4] >>> 0 ? 1 : 0) | 0;
            e5[6] = e5[6] + 1295307597 + (e5[5] >>> 0 < a2[5] >>> 0 ? 1 : 0) | 0;
            e5[7] = e5[7] + 3545052371 + (e5[6] >>> 0 < a2[6] >>> 0 ? 1 : 0) | 0;
            this._b = e5[7] >>> 0 < a2[7] >>> 0 ? 1 : 0;
            for (var r5 = 0; r5 < 8; r5++) {
              var i4 = t5[r5] + e5[r5];
              var n3 = 65535 & i4;
              var s3 = i4 >>> 16;
              var u3 = ((n3 * n3 >>> 17) + n3 * s3 >>> 15) + s3 * s3;
              var c3 = ((4294901760 & i4) * i4 | 0) + ((65535 & i4) * i4 | 0);
              o2[r5] = u3 ^ c3;
            }
            t5[0] = o2[0] + (o2[7] << 16 | o2[7] >>> 16) + (o2[6] << 16 | o2[6] >>> 16) | 0;
            t5[1] = o2[1] + (o2[0] << 8 | o2[0] >>> 24) + o2[7] | 0;
            t5[2] = o2[2] + (o2[1] << 16 | o2[1] >>> 16) + (o2[0] << 16 | o2[0] >>> 16) | 0;
            t5[3] = o2[3] + (o2[2] << 8 | o2[2] >>> 24) + o2[1] | 0;
            t5[4] = o2[4] + (o2[3] << 16 | o2[3] >>> 16) + (o2[2] << 16 | o2[2] >>> 16) | 0;
            t5[5] = o2[5] + (o2[4] << 8 | o2[4] >>> 24) + o2[3] | 0;
            t5[6] = o2[6] + (o2[5] << 16 | o2[5] >>> 16) + (o2[4] << 16 | o2[4] >>> 16) | 0;
            t5[7] = o2[7] + (o2[6] << 8 | o2[6] >>> 24) + o2[5] | 0;
          }
          e4.Rabbit = i3._createHelper(u2);
        })();
        return t4.Rabbit;
      });
    }, 1857: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(8269), r3(8214), r3(888), r3(5109));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.StreamCipher;
          var n2 = e4.algo;
          var s2 = n2.RC4 = i3.extend({ _doReset: function() {
            var t5 = this._key;
            var e5 = t5.words;
            var r5 = t5.sigBytes;
            var i4 = this._S = [];
            for (var n3 = 0; n3 < 256; n3++)
              i4[n3] = n3;
            for (var n3 = 0, s3 = 0; n3 < 256; n3++) {
              var a3 = n3 % r5;
              var o3 = e5[a3 >>> 2] >>> 24 - a3 % 4 * 8 & 255;
              s3 = (s3 + i4[n3] + o3) % 256;
              var u2 = i4[n3];
              i4[n3] = i4[s3];
              i4[s3] = u2;
            }
            this._i = this._j = 0;
          }, _doProcessBlock: function(t5, e5) {
            t5[e5] ^= a2.call(this);
          }, keySize: 256 / 32, ivSize: 0 });
          function a2() {
            var t5 = this._S;
            var e5 = this._i;
            var r5 = this._j;
            var i4 = 0;
            for (var n3 = 0; n3 < 4; n3++) {
              e5 = (e5 + 1) % 256;
              r5 = (r5 + t5[e5]) % 256;
              var s3 = t5[e5];
              t5[e5] = t5[r5];
              t5[r5] = s3;
              i4 |= t5[(t5[e5] + t5[r5]) % 256] << 24 - 8 * n3;
            }
            this._i = e5;
            this._j = r5;
            return i4;
          }
          e4.RC4 = i3._createHelper(s2);
          var o2 = n2.RC4Drop = s2.extend({ cfg: s2.cfg.extend({ drop: 192 }), _doReset: function() {
            s2._doReset.call(this);
            for (var t5 = this.cfg.drop; t5 > 0; t5--)
              a2.call(this);
          } });
          e4.RC4Drop = i3._createHelper(o2);
        })();
        return t4.RC4;
      });
    }, 706: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.WordArray;
          var s2 = i3.Hasher;
          var a2 = r4.algo;
          var o2 = n2.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]);
          var u2 = n2.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]);
          var c2 = n2.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]);
          var l2 = n2.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]);
          var f2 = n2.create([0, 1518500249, 1859775393, 2400959708, 2840853838]);
          var h2 = n2.create([1352829926, 1548603684, 1836072691, 2053994217, 0]);
          var d2 = a2.RIPEMD160 = s2.extend({ _doReset: function() {
            this._hash = n2.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          }, _doProcessBlock: function(t5, e5) {
            for (var r5 = 0; r5 < 16; r5++) {
              var i4 = e5 + r5;
              var n3 = t5[i4];
              t5[i4] = 16711935 & (n3 << 8 | n3 >>> 24) | 4278255360 & (n3 << 24 | n3 >>> 8);
            }
            var s3 = this._hash.words;
            var a3 = f2.words;
            var d3 = h2.words;
            var _2 = o2.words;
            var S2 = u2.words;
            var b2 = c2.words;
            var E2 = l2.words;
            var D2, T, M2, I2, A2;
            var x2, R2, B2, O, k2;
            x2 = D2 = s3[0];
            R2 = T = s3[1];
            B2 = M2 = s3[2];
            O = I2 = s3[3];
            k2 = A2 = s3[4];
            var C2;
            for (var r5 = 0; r5 < 80; r5 += 1) {
              C2 = D2 + t5[e5 + _2[r5]] | 0;
              if (r5 < 16)
                C2 += v2(T, M2, I2) + a3[0];
              else if (r5 < 32)
                C2 += p2(T, M2, I2) + a3[1];
              else if (r5 < 48)
                C2 += g2(T, M2, I2) + a3[2];
              else if (r5 < 64)
                C2 += y2(T, M2, I2) + a3[3];
              else
                C2 += m2(T, M2, I2) + a3[4];
              C2 |= 0;
              C2 = w2(C2, b2[r5]);
              C2 = C2 + A2 | 0;
              D2 = A2;
              A2 = I2;
              I2 = w2(M2, 10);
              M2 = T;
              T = C2;
              C2 = x2 + t5[e5 + S2[r5]] | 0;
              if (r5 < 16)
                C2 += m2(R2, B2, O) + d3[0];
              else if (r5 < 32)
                C2 += y2(R2, B2, O) + d3[1];
              else if (r5 < 48)
                C2 += g2(R2, B2, O) + d3[2];
              else if (r5 < 64)
                C2 += p2(R2, B2, O) + d3[3];
              else
                C2 += v2(R2, B2, O) + d3[4];
              C2 |= 0;
              C2 = w2(C2, E2[r5]);
              C2 = C2 + k2 | 0;
              x2 = k2;
              k2 = O;
              O = w2(B2, 10);
              B2 = R2;
              R2 = C2;
            }
            C2 = s3[1] + M2 + O | 0;
            s3[1] = s3[2] + I2 + k2 | 0;
            s3[2] = s3[3] + A2 + x2 | 0;
            s3[3] = s3[4] + D2 + R2 | 0;
            s3[4] = s3[0] + T + B2 | 0;
            s3[0] = C2;
          }, _doFinalize: function() {
            var t5 = this._data;
            var e5 = t5.words;
            var r5 = 8 * this._nDataBytes;
            var i4 = 8 * t5.sigBytes;
            e5[i4 >>> 5] |= 128 << 24 - i4 % 32;
            e5[(i4 + 64 >>> 9 << 4) + 14] = 16711935 & (r5 << 8 | r5 >>> 24) | 4278255360 & (r5 << 24 | r5 >>> 8);
            t5.sigBytes = 4 * (e5.length + 1);
            this._process();
            var n3 = this._hash;
            var s3 = n3.words;
            for (var a3 = 0; a3 < 5; a3++) {
              var o3 = s3[a3];
              s3[a3] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
            }
            return n3;
          }, clone: function() {
            var t5 = s2.clone.call(this);
            t5._hash = this._hash.clone();
            return t5;
          } });
          function v2(t5, e5, r5) {
            return t5 ^ e5 ^ r5;
          }
          function p2(t5, e5, r5) {
            return t5 & e5 | ~t5 & r5;
          }
          function g2(t5, e5, r5) {
            return (t5 | ~e5) ^ r5;
          }
          function y2(t5, e5, r5) {
            return t5 & r5 | e5 & ~r5;
          }
          function m2(t5, e5, r5) {
            return t5 ^ (e5 | ~r5);
          }
          function w2(t5, e5) {
            return t5 << e5 | t5 >>> 32 - e5;
          }
          r4.RIPEMD160 = s2._createHelper(d2);
          r4.HmacRIPEMD160 = s2._createHmacHelper(d2);
        })();
        return t4.RIPEMD160;
      });
    }, 2783: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = r4.Hasher;
          var s2 = e4.algo;
          var a2 = [];
          var o2 = s2.SHA1 = n2.extend({ _doReset: function() {
            this._hash = new i3.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520]);
          }, _doProcessBlock: function(t5, e5) {
            var r5 = this._hash.words;
            var i4 = r5[0];
            var n3 = r5[1];
            var s3 = r5[2];
            var o3 = r5[3];
            var u2 = r5[4];
            for (var c2 = 0; c2 < 80; c2++) {
              if (c2 < 16)
                a2[c2] = 0 | t5[e5 + c2];
              else {
                var l2 = a2[c2 - 3] ^ a2[c2 - 8] ^ a2[c2 - 14] ^ a2[c2 - 16];
                a2[c2] = l2 << 1 | l2 >>> 31;
              }
              var f2 = (i4 << 5 | i4 >>> 27) + u2 + a2[c2];
              if (c2 < 20)
                f2 += (n3 & s3 | ~n3 & o3) + 1518500249;
              else if (c2 < 40)
                f2 += (n3 ^ s3 ^ o3) + 1859775393;
              else if (c2 < 60)
                f2 += (n3 & s3 | n3 & o3 | s3 & o3) - 1894007588;
              else
                f2 += (n3 ^ s3 ^ o3) - 899497514;
              u2 = o3;
              o3 = s3;
              s3 = n3 << 30 | n3 >>> 2;
              n3 = i4;
              i4 = f2;
            }
            r5[0] = r5[0] + i4 | 0;
            r5[1] = r5[1] + n3 | 0;
            r5[2] = r5[2] + s3 | 0;
            r5[3] = r5[3] + o3 | 0;
            r5[4] = r5[4] + u2 | 0;
          }, _doFinalize: function() {
            var t5 = this._data;
            var e5 = t5.words;
            var r5 = 8 * this._nDataBytes;
            var i4 = 8 * t5.sigBytes;
            e5[i4 >>> 5] |= 128 << 24 - i4 % 32;
            e5[(i4 + 64 >>> 9 << 4) + 14] = Math.floor(r5 / 4294967296);
            e5[(i4 + 64 >>> 9 << 4) + 15] = r5;
            t5.sigBytes = 4 * e5.length;
            this._process();
            return this._hash;
          }, clone: function() {
            var t5 = n2.clone.call(this);
            t5._hash = this._hash.clone();
            return t5;
          } });
          e4.SHA1 = n2._createHelper(o2);
          e4.HmacSHA1 = n2._createHmacHelper(o2);
        })();
        return t4.SHA1;
      });
    }, 7792: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(2153));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = e4.algo;
          var s2 = n2.SHA256;
          var a2 = n2.SHA224 = s2.extend({ _doReset: function() {
            this._hash = new i3.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428]);
          }, _doFinalize: function() {
            var t5 = s2._doFinalize.call(this);
            t5.sigBytes -= 4;
            return t5;
          } });
          e4.SHA224 = s2._createHelper(a2);
          e4.HmacSHA224 = s2._createHmacHelper(a2);
        })();
        return t4.SHA224;
      });
    }, 2153: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.WordArray;
          var s2 = i3.Hasher;
          var a2 = r4.algo;
          var o2 = [];
          var u2 = [];
          (function() {
            function t5(t6) {
              var r6 = e4.sqrt(t6);
              for (var i5 = 2; i5 <= r6; i5++)
                if (!(t6 % i5))
                  return false;
              return true;
            }
            function r5(t6) {
              return 4294967296 * (t6 - (0 | t6)) | 0;
            }
            var i4 = 2;
            var n3 = 0;
            while (n3 < 64) {
              if (t5(i4)) {
                if (n3 < 8)
                  o2[n3] = r5(e4.pow(i4, 1 / 2));
                u2[n3] = r5(e4.pow(i4, 1 / 3));
                n3++;
              }
              i4++;
            }
          })();
          var c2 = [];
          var l2 = a2.SHA256 = s2.extend({ _doReset: function() {
            this._hash = new n2.init(o2.slice(0));
          }, _doProcessBlock: function(t5, e5) {
            var r5 = this._hash.words;
            var i4 = r5[0];
            var n3 = r5[1];
            var s3 = r5[2];
            var a3 = r5[3];
            var o3 = r5[4];
            var l3 = r5[5];
            var f2 = r5[6];
            var h2 = r5[7];
            for (var d2 = 0; d2 < 64; d2++) {
              if (d2 < 16)
                c2[d2] = 0 | t5[e5 + d2];
              else {
                var v2 = c2[d2 - 15];
                var p2 = (v2 << 25 | v2 >>> 7) ^ (v2 << 14 | v2 >>> 18) ^ v2 >>> 3;
                var g2 = c2[d2 - 2];
                var y2 = (g2 << 15 | g2 >>> 17) ^ (g2 << 13 | g2 >>> 19) ^ g2 >>> 10;
                c2[d2] = p2 + c2[d2 - 7] + y2 + c2[d2 - 16];
              }
              var m2 = o3 & l3 ^ ~o3 & f2;
              var w2 = i4 & n3 ^ i4 & s3 ^ n3 & s3;
              var _2 = (i4 << 30 | i4 >>> 2) ^ (i4 << 19 | i4 >>> 13) ^ (i4 << 10 | i4 >>> 22);
              var S2 = (o3 << 26 | o3 >>> 6) ^ (o3 << 21 | o3 >>> 11) ^ (o3 << 7 | o3 >>> 25);
              var b2 = h2 + S2 + m2 + u2[d2] + c2[d2];
              var E2 = _2 + w2;
              h2 = f2;
              f2 = l3;
              l3 = o3;
              o3 = a3 + b2 | 0;
              a3 = s3;
              s3 = n3;
              n3 = i4;
              i4 = b2 + E2 | 0;
            }
            r5[0] = r5[0] + i4 | 0;
            r5[1] = r5[1] + n3 | 0;
            r5[2] = r5[2] + s3 | 0;
            r5[3] = r5[3] + a3 | 0;
            r5[4] = r5[4] + o3 | 0;
            r5[5] = r5[5] + l3 | 0;
            r5[6] = r5[6] + f2 | 0;
            r5[7] = r5[7] + h2 | 0;
          }, _doFinalize: function() {
            var t5 = this._data;
            var r5 = t5.words;
            var i4 = 8 * this._nDataBytes;
            var n3 = 8 * t5.sigBytes;
            r5[n3 >>> 5] |= 128 << 24 - n3 % 32;
            r5[(n3 + 64 >>> 9 << 4) + 14] = e4.floor(i4 / 4294967296);
            r5[(n3 + 64 >>> 9 << 4) + 15] = i4;
            t5.sigBytes = 4 * r5.length;
            this._process();
            return this._hash;
          }, clone: function() {
            var t5 = s2.clone.call(this);
            t5._hash = this._hash.clone();
            return t5;
          } });
          r4.SHA256 = s2._createHelper(l2);
          r4.HmacSHA256 = s2._createHmacHelper(l2);
        })(Math);
        return t4.SHA256;
      });
    }, 3327: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(4938));
      })(this, function(t4) {
        (function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.WordArray;
          var s2 = i3.Hasher;
          var a2 = r4.x64;
          var o2 = a2.Word;
          var u2 = r4.algo;
          var c2 = [];
          var l2 = [];
          var f2 = [];
          (function() {
            var t5 = 1, e5 = 0;
            for (var r5 = 0; r5 < 24; r5++) {
              c2[t5 + 5 * e5] = (r5 + 1) * (r5 + 2) / 2 % 64;
              var i4 = e5 % 5;
              var n3 = (2 * t5 + 3 * e5) % 5;
              t5 = i4;
              e5 = n3;
            }
            for (var t5 = 0; t5 < 5; t5++)
              for (var e5 = 0; e5 < 5; e5++)
                l2[t5 + 5 * e5] = e5 + (2 * t5 + 3 * e5) % 5 * 5;
            var s3 = 1;
            for (var a3 = 0; a3 < 24; a3++) {
              var u3 = 0;
              var h3 = 0;
              for (var d3 = 0; d3 < 7; d3++) {
                if (1 & s3) {
                  var v2 = (1 << d3) - 1;
                  if (v2 < 32)
                    h3 ^= 1 << v2;
                  else
                    u3 ^= 1 << v2 - 32;
                }
                if (128 & s3)
                  s3 = s3 << 1 ^ 113;
                else
                  s3 <<= 1;
              }
              f2[a3] = o2.create(u3, h3);
            }
          })();
          var h2 = [];
          (function() {
            for (var t5 = 0; t5 < 25; t5++)
              h2[t5] = o2.create();
          })();
          var d2 = u2.SHA3 = s2.extend({ cfg: s2.cfg.extend({ outputLength: 512 }), _doReset: function() {
            var t5 = this._state = [];
            for (var e5 = 0; e5 < 25; e5++)
              t5[e5] = new o2.init();
            this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
          }, _doProcessBlock: function(t5, e5) {
            var r5 = this._state;
            var i4 = this.blockSize / 2;
            for (var n3 = 0; n3 < i4; n3++) {
              var s3 = t5[e5 + 2 * n3];
              var a3 = t5[e5 + 2 * n3 + 1];
              s3 = 16711935 & (s3 << 8 | s3 >>> 24) | 4278255360 & (s3 << 24 | s3 >>> 8);
              a3 = 16711935 & (a3 << 8 | a3 >>> 24) | 4278255360 & (a3 << 24 | a3 >>> 8);
              var o3 = r5[n3];
              o3.high ^= a3;
              o3.low ^= s3;
            }
            for (var u3 = 0; u3 < 24; u3++) {
              for (var d3 = 0; d3 < 5; d3++) {
                var v2 = 0, p2 = 0;
                for (var g2 = 0; g2 < 5; g2++) {
                  var o3 = r5[d3 + 5 * g2];
                  v2 ^= o3.high;
                  p2 ^= o3.low;
                }
                var y2 = h2[d3];
                y2.high = v2;
                y2.low = p2;
              }
              for (var d3 = 0; d3 < 5; d3++) {
                var m2 = h2[(d3 + 4) % 5];
                var w2 = h2[(d3 + 1) % 5];
                var _2 = w2.high;
                var S2 = w2.low;
                var v2 = m2.high ^ (_2 << 1 | S2 >>> 31);
                var p2 = m2.low ^ (S2 << 1 | _2 >>> 31);
                for (var g2 = 0; g2 < 5; g2++) {
                  var o3 = r5[d3 + 5 * g2];
                  o3.high ^= v2;
                  o3.low ^= p2;
                }
              }
              for (var b2 = 1; b2 < 25; b2++) {
                var v2;
                var p2;
                var o3 = r5[b2];
                var E2 = o3.high;
                var D2 = o3.low;
                var T = c2[b2];
                if (T < 32) {
                  v2 = E2 << T | D2 >>> 32 - T;
                  p2 = D2 << T | E2 >>> 32 - T;
                } else {
                  v2 = D2 << T - 32 | E2 >>> 64 - T;
                  p2 = E2 << T - 32 | D2 >>> 64 - T;
                }
                var M2 = h2[l2[b2]];
                M2.high = v2;
                M2.low = p2;
              }
              var I2 = h2[0];
              var A2 = r5[0];
              I2.high = A2.high;
              I2.low = A2.low;
              for (var d3 = 0; d3 < 5; d3++)
                for (var g2 = 0; g2 < 5; g2++) {
                  var b2 = d3 + 5 * g2;
                  var o3 = r5[b2];
                  var x2 = h2[b2];
                  var R2 = h2[(d3 + 1) % 5 + 5 * g2];
                  var B2 = h2[(d3 + 2) % 5 + 5 * g2];
                  o3.high = x2.high ^ ~R2.high & B2.high;
                  o3.low = x2.low ^ ~R2.low & B2.low;
                }
              var o3 = r5[0];
              var O = f2[u3];
              o3.high ^= O.high;
              o3.low ^= O.low;
            }
          }, _doFinalize: function() {
            var t5 = this._data;
            var r5 = t5.words;
            8 * this._nDataBytes;
            var s3 = 8 * t5.sigBytes;
            var a3 = 32 * this.blockSize;
            r5[s3 >>> 5] |= 1 << 24 - s3 % 32;
            r5[(e4.ceil((s3 + 1) / a3) * a3 >>> 5) - 1] |= 128;
            t5.sigBytes = 4 * r5.length;
            this._process();
            var o3 = this._state;
            var u3 = this.cfg.outputLength / 8;
            var c3 = u3 / 8;
            var l3 = [];
            for (var f3 = 0; f3 < c3; f3++) {
              var h3 = o3[f3];
              var d3 = h3.high;
              var v2 = h3.low;
              d3 = 16711935 & (d3 << 8 | d3 >>> 24) | 4278255360 & (d3 << 24 | d3 >>> 8);
              v2 = 16711935 & (v2 << 8 | v2 >>> 24) | 4278255360 & (v2 << 24 | v2 >>> 8);
              l3.push(v2);
              l3.push(d3);
            }
            return new n2.init(l3, u3);
          }, clone: function() {
            var t5 = s2.clone.call(this);
            var e5 = t5._state = this._state.slice(0);
            for (var r5 = 0; r5 < 25; r5++)
              e5[r5] = e5[r5].clone();
            return t5;
          } });
          r4.SHA3 = s2._createHelper(d2);
          r4.HmacSHA3 = s2._createHmacHelper(d2);
        })(Math);
        return t4.SHA3;
      });
    }, 7460: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(4938), r3(34));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.x64;
          var i3 = r4.Word;
          var n2 = r4.WordArray;
          var s2 = e4.algo;
          var a2 = s2.SHA512;
          var o2 = s2.SHA384 = a2.extend({ _doReset: function() {
            this._hash = new n2.init([new i3.init(3418070365, 3238371032), new i3.init(1654270250, 914150663), new i3.init(2438529370, 812702999), new i3.init(355462360, 4144912697), new i3.init(1731405415, 4290775857), new i3.init(2394180231, 1750603025), new i3.init(3675008525, 1694076839), new i3.init(1203062813, 3204075428)]);
          }, _doFinalize: function() {
            var t5 = a2._doFinalize.call(this);
            t5.sigBytes -= 16;
            return t5;
          } });
          e4.SHA384 = a2._createHelper(o2);
          e4.HmacSHA384 = a2._createHmacHelper(o2);
        })();
        return t4.SHA384;
      });
    }, 34: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(4938));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.Hasher;
          var n2 = e4.x64;
          var s2 = n2.Word;
          var a2 = n2.WordArray;
          var o2 = e4.algo;
          function u2() {
            return s2.create.apply(s2, arguments);
          }
          var c2 = [u2(1116352408, 3609767458), u2(1899447441, 602891725), u2(3049323471, 3964484399), u2(3921009573, 2173295548), u2(961987163, 4081628472), u2(1508970993, 3053834265), u2(2453635748, 2937671579), u2(2870763221, 3664609560), u2(3624381080, 2734883394), u2(310598401, 1164996542), u2(607225278, 1323610764), u2(1426881987, 3590304994), u2(1925078388, 4068182383), u2(2162078206, 991336113), u2(2614888103, 633803317), u2(3248222580, 3479774868), u2(3835390401, 2666613458), u2(4022224774, 944711139), u2(264347078, 2341262773), u2(604807628, 2007800933), u2(770255983, 1495990901), u2(1249150122, 1856431235), u2(1555081692, 3175218132), u2(1996064986, 2198950837), u2(2554220882, 3999719339), u2(2821834349, 766784016), u2(2952996808, 2566594879), u2(3210313671, 3203337956), u2(3336571891, 1034457026), u2(3584528711, 2466948901), u2(113926993, 3758326383), u2(338241895, 168717936), u2(666307205, 1188179964), u2(773529912, 1546045734), u2(1294757372, 1522805485), u2(1396182291, 2643833823), u2(1695183700, 2343527390), u2(1986661051, 1014477480), u2(2177026350, 1206759142), u2(2456956037, 344077627), u2(2730485921, 1290863460), u2(2820302411, 3158454273), u2(3259730800, 3505952657), u2(3345764771, 106217008), u2(3516065817, 3606008344), u2(3600352804, 1432725776), u2(4094571909, 1467031594), u2(275423344, 851169720), u2(430227734, 3100823752), u2(506948616, 1363258195), u2(659060556, 3750685593), u2(883997877, 3785050280), u2(958139571, 3318307427), u2(1322822218, 3812723403), u2(1537002063, 2003034995), u2(1747873779, 3602036899), u2(1955562222, 1575990012), u2(2024104815, 1125592928), u2(2227730452, 2716904306), u2(2361852424, 442776044), u2(2428436474, 593698344), u2(2756734187, 3733110249), u2(3204031479, 2999351573), u2(3329325298, 3815920427), u2(3391569614, 3928383900), u2(3515267271, 566280711), u2(3940187606, 3454069534), u2(4118630271, 4000239992), u2(116418474, 1914138554), u2(174292421, 2731055270), u2(289380356, 3203993006), u2(460393269, 320620315), u2(685471733, 587496836), u2(852142971, 1086792851), u2(1017036298, 365543100), u2(1126000580, 2618297676), u2(1288033470, 3409855158), u2(1501505948, 4234509866), u2(1607167915, 987167468), u2(1816402316, 1246189591)];
          var l2 = [];
          (function() {
            for (var t5 = 0; t5 < 80; t5++)
              l2[t5] = u2();
          })();
          var f2 = o2.SHA512 = i3.extend({ _doReset: function() {
            this._hash = new a2.init([new s2.init(1779033703, 4089235720), new s2.init(3144134277, 2227873595), new s2.init(1013904242, 4271175723), new s2.init(2773480762, 1595750129), new s2.init(1359893119, 2917565137), new s2.init(2600822924, 725511199), new s2.init(528734635, 4215389547), new s2.init(1541459225, 327033209)]);
          }, _doProcessBlock: function(t5, e5) {
            var r5 = this._hash.words;
            var i4 = r5[0];
            var n3 = r5[1];
            var s3 = r5[2];
            var a3 = r5[3];
            var o3 = r5[4];
            var u3 = r5[5];
            var f3 = r5[6];
            var h2 = r5[7];
            var d2 = i4.high;
            var v2 = i4.low;
            var p2 = n3.high;
            var g2 = n3.low;
            var y2 = s3.high;
            var m2 = s3.low;
            var w2 = a3.high;
            var _2 = a3.low;
            var S2 = o3.high;
            var b2 = o3.low;
            var E2 = u3.high;
            var D2 = u3.low;
            var T = f3.high;
            var M2 = f3.low;
            var I2 = h2.high;
            var A2 = h2.low;
            var x2 = d2;
            var R2 = v2;
            var B2 = p2;
            var O = g2;
            var k2 = y2;
            var C2 = m2;
            var N2 = w2;
            var P2 = _2;
            var V2 = S2;
            var L2 = b2;
            var H2 = E2;
            var U2 = D2;
            var K2 = T;
            var j2 = M2;
            var q2 = I2;
            var F2 = A2;
            for (var z2 = 0; z2 < 80; z2++) {
              var G2;
              var Y2;
              var W2 = l2[z2];
              if (z2 < 16) {
                Y2 = W2.high = 0 | t5[e5 + 2 * z2];
                G2 = W2.low = 0 | t5[e5 + 2 * z2 + 1];
              } else {
                var J2 = l2[z2 - 15];
                var Z2 = J2.high;
                var $2 = J2.low;
                var X2 = (Z2 >>> 1 | $2 << 31) ^ (Z2 >>> 8 | $2 << 24) ^ Z2 >>> 7;
                var Q2 = ($2 >>> 1 | Z2 << 31) ^ ($2 >>> 8 | Z2 << 24) ^ ($2 >>> 7 | Z2 << 25);
                var tt3 = l2[z2 - 2];
                var et2 = tt3.high;
                var rt2 = tt3.low;
                var it2 = (et2 >>> 19 | rt2 << 13) ^ (et2 << 3 | rt2 >>> 29) ^ et2 >>> 6;
                var nt2 = (rt2 >>> 19 | et2 << 13) ^ (rt2 << 3 | et2 >>> 29) ^ (rt2 >>> 6 | et2 << 26);
                var st2 = l2[z2 - 7];
                var at2 = st2.high;
                var ot2 = st2.low;
                var ut2 = l2[z2 - 16];
                var ct2 = ut2.high;
                var lt2 = ut2.low;
                G2 = Q2 + ot2;
                Y2 = X2 + at2 + (G2 >>> 0 < Q2 >>> 0 ? 1 : 0);
                G2 += nt2;
                Y2 = Y2 + it2 + (G2 >>> 0 < nt2 >>> 0 ? 1 : 0);
                G2 += lt2;
                Y2 = Y2 + ct2 + (G2 >>> 0 < lt2 >>> 0 ? 1 : 0);
                W2.high = Y2;
                W2.low = G2;
              }
              var ft2 = V2 & H2 ^ ~V2 & K2;
              var ht2 = L2 & U2 ^ ~L2 & j2;
              var dt2 = x2 & B2 ^ x2 & k2 ^ B2 & k2;
              var vt2 = R2 & O ^ R2 & C2 ^ O & C2;
              var pt2 = (x2 >>> 28 | R2 << 4) ^ (x2 << 30 | R2 >>> 2) ^ (x2 << 25 | R2 >>> 7);
              var gt2 = (R2 >>> 28 | x2 << 4) ^ (R2 << 30 | x2 >>> 2) ^ (R2 << 25 | x2 >>> 7);
              var yt2 = (V2 >>> 14 | L2 << 18) ^ (V2 >>> 18 | L2 << 14) ^ (V2 << 23 | L2 >>> 9);
              var mt2 = (L2 >>> 14 | V2 << 18) ^ (L2 >>> 18 | V2 << 14) ^ (L2 << 23 | V2 >>> 9);
              var wt2 = c2[z2];
              var _t2 = wt2.high;
              var St2 = wt2.low;
              var bt2 = F2 + mt2;
              var Et2 = q2 + yt2 + (bt2 >>> 0 < F2 >>> 0 ? 1 : 0);
              var bt2 = bt2 + ht2;
              var Et2 = Et2 + ft2 + (bt2 >>> 0 < ht2 >>> 0 ? 1 : 0);
              var bt2 = bt2 + St2;
              var Et2 = Et2 + _t2 + (bt2 >>> 0 < St2 >>> 0 ? 1 : 0);
              var bt2 = bt2 + G2;
              var Et2 = Et2 + Y2 + (bt2 >>> 0 < G2 >>> 0 ? 1 : 0);
              var Dt = gt2 + vt2;
              var Tt2 = pt2 + dt2 + (Dt >>> 0 < gt2 >>> 0 ? 1 : 0);
              q2 = K2;
              F2 = j2;
              K2 = H2;
              j2 = U2;
              H2 = V2;
              U2 = L2;
              L2 = P2 + bt2 | 0;
              V2 = N2 + Et2 + (L2 >>> 0 < P2 >>> 0 ? 1 : 0) | 0;
              N2 = k2;
              P2 = C2;
              k2 = B2;
              C2 = O;
              B2 = x2;
              O = R2;
              R2 = bt2 + Dt | 0;
              x2 = Et2 + Tt2 + (R2 >>> 0 < bt2 >>> 0 ? 1 : 0) | 0;
            }
            v2 = i4.low = v2 + R2;
            i4.high = d2 + x2 + (v2 >>> 0 < R2 >>> 0 ? 1 : 0);
            g2 = n3.low = g2 + O;
            n3.high = p2 + B2 + (g2 >>> 0 < O >>> 0 ? 1 : 0);
            m2 = s3.low = m2 + C2;
            s3.high = y2 + k2 + (m2 >>> 0 < C2 >>> 0 ? 1 : 0);
            _2 = a3.low = _2 + P2;
            a3.high = w2 + N2 + (_2 >>> 0 < P2 >>> 0 ? 1 : 0);
            b2 = o3.low = b2 + L2;
            o3.high = S2 + V2 + (b2 >>> 0 < L2 >>> 0 ? 1 : 0);
            D2 = u3.low = D2 + U2;
            u3.high = E2 + H2 + (D2 >>> 0 < U2 >>> 0 ? 1 : 0);
            M2 = f3.low = M2 + j2;
            f3.high = T + K2 + (M2 >>> 0 < j2 >>> 0 ? 1 : 0);
            A2 = h2.low = A2 + F2;
            h2.high = I2 + q2 + (A2 >>> 0 < F2 >>> 0 ? 1 : 0);
          }, _doFinalize: function() {
            var t5 = this._data;
            var e5 = t5.words;
            var r5 = 8 * this._nDataBytes;
            var i4 = 8 * t5.sigBytes;
            e5[i4 >>> 5] |= 128 << 24 - i4 % 32;
            e5[(i4 + 128 >>> 10 << 5) + 30] = Math.floor(r5 / 4294967296);
            e5[(i4 + 128 >>> 10 << 5) + 31] = r5;
            t5.sigBytes = 4 * e5.length;
            this._process();
            var n3 = this._hash.toX32();
            return n3;
          }, clone: function() {
            var t5 = i3.clone.call(this);
            t5._hash = this._hash.clone();
            return t5;
          }, blockSize: 1024 / 32 });
          e4.SHA512 = i3._createHelper(f2);
          e4.HmacSHA512 = i3._createHmacHelper(f2);
        })();
        return t4.SHA512;
      });
    }, 4253: function(t3, e3, r3) {
      (function(i3, n2, s2) {
        t3.exports = n2(r3(8249), r3(8269), r3(8214), r3(888), r3(5109));
      })(this, function(t4) {
        (function() {
          var e4 = t4;
          var r4 = e4.lib;
          var i3 = r4.WordArray;
          var n2 = r4.BlockCipher;
          var s2 = e4.algo;
          var a2 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4];
          var o2 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32];
          var u2 = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28];
          var c2 = [{ 0: 8421888, 268435456: 32768, 536870912: 8421378, 805306368: 2, 1073741824: 512, 1342177280: 8421890, 1610612736: 8389122, 1879048192: 8388608, 2147483648: 514, 2415919104: 8389120, 2684354560: 33280, 2952790016: 8421376, 3221225472: 32770, 3489660928: 8388610, 3758096384: 0, 4026531840: 33282, 134217728: 0, 402653184: 8421890, 671088640: 33282, 939524096: 32768, 1207959552: 8421888, 1476395008: 512, 1744830464: 8421378, 2013265920: 2, 2281701376: 8389120, 2550136832: 33280, 2818572288: 8421376, 3087007744: 8389122, 3355443200: 8388610, 3623878656: 32770, 3892314112: 514, 4160749568: 8388608, 1: 32768, 268435457: 2, 536870913: 8421888, 805306369: 8388608, 1073741825: 8421378, 1342177281: 33280, 1610612737: 512, 1879048193: 8389122, 2147483649: 8421890, 2415919105: 8421376, 2684354561: 8388610, 2952790017: 33282, 3221225473: 514, 3489660929: 8389120, 3758096385: 32770, 4026531841: 0, 134217729: 8421890, 402653185: 8421376, 671088641: 8388608, 939524097: 512, 1207959553: 32768, 1476395009: 8388610, 1744830465: 2, 2013265921: 33282, 2281701377: 32770, 2550136833: 8389122, 2818572289: 514, 3087007745: 8421888, 3355443201: 8389120, 3623878657: 0, 3892314113: 33280, 4160749569: 8421378 }, { 0: 1074282512, 16777216: 16384, 33554432: 524288, 50331648: 1074266128, 67108864: 1073741840, 83886080: 1074282496, 100663296: 1073758208, 117440512: 16, 134217728: 540672, 150994944: 1073758224, 167772160: 1073741824, 184549376: 540688, 201326592: 524304, 218103808: 0, 234881024: 16400, 251658240: 1074266112, 8388608: 1073758208, 25165824: 540688, 41943040: 16, 58720256: 1073758224, 75497472: 1074282512, 92274688: 1073741824, 109051904: 524288, 125829120: 1074266128, 142606336: 524304, 159383552: 0, 176160768: 16384, 192937984: 1074266112, 209715200: 1073741840, 226492416: 540672, 243269632: 1074282496, 260046848: 16400, 268435456: 0, 285212672: 1074266128, 301989888: 1073758224, 318767104: 1074282496, 335544320: 1074266112, 352321536: 16, 369098752: 540688, 385875968: 16384, 402653184: 16400, 419430400: 524288, 436207616: 524304, 452984832: 1073741840, 469762048: 540672, 486539264: 1073758208, 503316480: 1073741824, 520093696: 1074282512, 276824064: 540688, 293601280: 524288, 310378496: 1074266112, 327155712: 16384, 343932928: 1073758208, 360710144: 1074282512, 377487360: 16, 394264576: 1073741824, 411041792: 1074282496, 427819008: 1073741840, 444596224: 1073758224, 461373440: 524304, 478150656: 0, 494927872: 16400, 511705088: 1074266128, 528482304: 540672 }, { 0: 260, 1048576: 0, 2097152: 67109120, 3145728: 65796, 4194304: 65540, 5242880: 67108868, 6291456: 67174660, 7340032: 67174400, 8388608: 67108864, 9437184: 67174656, 10485760: 65792, 11534336: 67174404, 12582912: 67109124, 13631488: 65536, 14680064: 4, 15728640: 256, 524288: 67174656, 1572864: 67174404, 2621440: 0, 3670016: 67109120, 4718592: 67108868, 5767168: 65536, 6815744: 65540, 7864320: 260, 8912896: 4, 9961472: 256, 11010048: 67174400, 12058624: 65796, 13107200: 65792, 14155776: 67109124, 15204352: 67174660, 16252928: 67108864, 16777216: 67174656, 17825792: 65540, 18874368: 65536, 19922944: 67109120, 20971520: 256, 22020096: 67174660, 23068672: 67108868, 24117248: 0, 25165824: 67109124, 26214400: 67108864, 27262976: 4, 28311552: 65792, 29360128: 67174400, 30408704: 260, 31457280: 65796, 32505856: 67174404, 17301504: 67108864, 18350080: 260, 19398656: 67174656, 20447232: 0, 21495808: 65540, 22544384: 67109120, 23592960: 256, 24641536: 67174404, 25690112: 65536, 26738688: 67174660, 27787264: 65796, 28835840: 67108868, 29884416: 67109124, 30932992: 67174400, 31981568: 4, 33030144: 65792 }, { 0: 2151682048, 65536: 2147487808, 131072: 4198464, 196608: 2151677952, 262144: 0, 327680: 4198400, 393216: 2147483712, 458752: 4194368, 524288: 2147483648, 589824: 4194304, 655360: 64, 720896: 2147487744, 786432: 2151678016, 851968: 4160, 917504: 4096, 983040: 2151682112, 32768: 2147487808, 98304: 64, 163840: 2151678016, 229376: 2147487744, 294912: 4198400, 360448: 2151682112, 425984: 0, 491520: 2151677952, 557056: 4096, 622592: 2151682048, 688128: 4194304, 753664: 4160, 819200: 2147483648, 884736: 4194368, 950272: 4198464, 1015808: 2147483712, 1048576: 4194368, 1114112: 4198400, 1179648: 2147483712, 1245184: 0, 1310720: 4160, 1376256: 2151678016, 1441792: 2151682048, 1507328: 2147487808, 1572864: 2151682112, 1638400: 2147483648, 1703936: 2151677952, 1769472: 4198464, 1835008: 2147487744, 1900544: 4194304, 1966080: 64, 2031616: 4096, 1081344: 2151677952, 1146880: 2151682112, 1212416: 0, 1277952: 4198400, 1343488: 4194368, 1409024: 2147483648, 1474560: 2147487808, 1540096: 64, 1605632: 2147483712, 1671168: 4096, 1736704: 2147487744, 1802240: 2151678016, 1867776: 4160, 1933312: 2151682048, 1998848: 4194304, 2064384: 4198464 }, { 0: 128, 4096: 17039360, 8192: 262144, 12288: 536870912, 16384: 537133184, 20480: 16777344, 24576: 553648256, 28672: 262272, 32768: 16777216, 36864: 537133056, 40960: 536871040, 45056: 553910400, 49152: 553910272, 53248: 0, 57344: 17039488, 61440: 553648128, 2048: 17039488, 6144: 553648256, 10240: 128, 14336: 17039360, 18432: 262144, 22528: 537133184, 26624: 553910272, 30720: 536870912, 34816: 537133056, 38912: 0, 43008: 553910400, 47104: 16777344, 51200: 536871040, 55296: 553648128, 59392: 16777216, 63488: 262272, 65536: 262144, 69632: 128, 73728: 536870912, 77824: 553648256, 81920: 16777344, 86016: 553910272, 90112: 537133184, 94208: 16777216, 98304: 553910400, 102400: 553648128, 106496: 17039360, 110592: 537133056, 114688: 262272, 118784: 536871040, 122880: 0, 126976: 17039488, 67584: 553648256, 71680: 16777216, 75776: 17039360, 79872: 537133184, 83968: 536870912, 88064: 17039488, 92160: 128, 96256: 553910272, 100352: 262272, 104448: 553910400, 108544: 0, 112640: 553648128, 116736: 16777344, 120832: 262144, 124928: 537133056, 129024: 536871040 }, { 0: 268435464, 256: 8192, 512: 270532608, 768: 270540808, 1024: 268443648, 1280: 2097152, 1536: 2097160, 1792: 268435456, 2048: 0, 2304: 268443656, 2560: 2105344, 2816: 8, 3072: 270532616, 3328: 2105352, 3584: 8200, 3840: 270540800, 128: 270532608, 384: 270540808, 640: 8, 896: 2097152, 1152: 2105352, 1408: 268435464, 1664: 268443648, 1920: 8200, 2176: 2097160, 2432: 8192, 2688: 268443656, 2944: 270532616, 3200: 0, 3456: 270540800, 3712: 2105344, 3968: 268435456, 4096: 268443648, 4352: 270532616, 4608: 270540808, 4864: 8200, 5120: 2097152, 5376: 268435456, 5632: 268435464, 5888: 2105344, 6144: 2105352, 6400: 0, 6656: 8, 6912: 270532608, 7168: 8192, 7424: 268443656, 7680: 270540800, 7936: 2097160, 4224: 8, 4480: 2105344, 4736: 2097152, 4992: 268435464, 5248: 268443648, 5504: 8200, 5760: 270540808, 6016: 270532608, 6272: 270540800, 6528: 270532616, 6784: 8192, 7040: 2105352, 7296: 2097160, 7552: 0, 7808: 268435456, 8064: 268443656 }, { 0: 1048576, 16: 33555457, 32: 1024, 48: 1049601, 64: 34604033, 80: 0, 96: 1, 112: 34603009, 128: 33555456, 144: 1048577, 160: 33554433, 176: 34604032, 192: 34603008, 208: 1025, 224: 1049600, 240: 33554432, 8: 34603009, 24: 0, 40: 33555457, 56: 34604032, 72: 1048576, 88: 33554433, 104: 33554432, 120: 1025, 136: 1049601, 152: 33555456, 168: 34603008, 184: 1048577, 200: 1024, 216: 34604033, 232: 1, 248: 1049600, 256: 33554432, 272: 1048576, 288: 33555457, 304: 34603009, 320: 1048577, 336: 33555456, 352: 34604032, 368: 1049601, 384: 1025, 400: 34604033, 416: 1049600, 432: 1, 448: 0, 464: 34603008, 480: 33554433, 496: 1024, 264: 1049600, 280: 33555457, 296: 34603009, 312: 1, 328: 33554432, 344: 1048576, 360: 1025, 376: 34604032, 392: 33554433, 408: 34603008, 424: 0, 440: 34604033, 456: 1049601, 472: 1024, 488: 33555456, 504: 1048577 }, { 0: 134219808, 1: 131072, 2: 134217728, 3: 32, 4: 131104, 5: 134350880, 6: 134350848, 7: 2048, 8: 134348800, 9: 134219776, 10: 133120, 11: 134348832, 12: 2080, 13: 0, 14: 134217760, 15: 133152, 2147483648: 2048, 2147483649: 134350880, 2147483650: 134219808, 2147483651: 134217728, 2147483652: 134348800, 2147483653: 133120, 2147483654: 133152, 2147483655: 32, 2147483656: 134217760, 2147483657: 2080, 2147483658: 131104, 2147483659: 134350848, 2147483660: 0, 2147483661: 134348832, 2147483662: 134219776, 2147483663: 131072, 16: 133152, 17: 134350848, 18: 32, 19: 2048, 20: 134219776, 21: 134217760, 22: 134348832, 23: 131072, 24: 0, 25: 131104, 26: 134348800, 27: 134219808, 28: 134350880, 29: 133120, 30: 2080, 31: 134217728, 2147483664: 131072, 2147483665: 2048, 2147483666: 134348832, 2147483667: 133152, 2147483668: 32, 2147483669: 134348800, 2147483670: 134217728, 2147483671: 134219808, 2147483672: 134350880, 2147483673: 134217760, 2147483674: 134219776, 2147483675: 0, 2147483676: 133120, 2147483677: 2080, 2147483678: 131104, 2147483679: 134350848 }];
          var l2 = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679];
          var f2 = s2.DES = n2.extend({ _doReset: function() {
            var t5 = this._key;
            var e5 = t5.words;
            var r5 = [];
            for (var i4 = 0; i4 < 56; i4++) {
              var n3 = a2[i4] - 1;
              r5[i4] = e5[n3 >>> 5] >>> 31 - n3 % 32 & 1;
            }
            var s3 = this._subKeys = [];
            for (var c3 = 0; c3 < 16; c3++) {
              var l3 = s3[c3] = [];
              var f3 = u2[c3];
              for (var i4 = 0; i4 < 24; i4++) {
                l3[i4 / 6 | 0] |= r5[(o2[i4] - 1 + f3) % 28] << 31 - i4 % 6;
                l3[4 + (i4 / 6 | 0)] |= r5[28 + (o2[i4 + 24] - 1 + f3) % 28] << 31 - i4 % 6;
              }
              l3[0] = l3[0] << 1 | l3[0] >>> 31;
              for (var i4 = 1; i4 < 7; i4++)
                l3[i4] = l3[i4] >>> 4 * (i4 - 1) + 3;
              l3[7] = l3[7] << 5 | l3[7] >>> 27;
            }
            var h3 = this._invSubKeys = [];
            for (var i4 = 0; i4 < 16; i4++)
              h3[i4] = s3[15 - i4];
          }, encryptBlock: function(t5, e5) {
            this._doCryptBlock(t5, e5, this._subKeys);
          }, decryptBlock: function(t5, e5) {
            this._doCryptBlock(t5, e5, this._invSubKeys);
          }, _doCryptBlock: function(t5, e5, r5) {
            this._lBlock = t5[e5];
            this._rBlock = t5[e5 + 1];
            h2.call(this, 4, 252645135);
            h2.call(this, 16, 65535);
            d2.call(this, 2, 858993459);
            d2.call(this, 8, 16711935);
            h2.call(this, 1, 1431655765);
            for (var i4 = 0; i4 < 16; i4++) {
              var n3 = r5[i4];
              var s3 = this._lBlock;
              var a3 = this._rBlock;
              var o3 = 0;
              for (var u3 = 0; u3 < 8; u3++)
                o3 |= c2[u3][((a3 ^ n3[u3]) & l2[u3]) >>> 0];
              this._lBlock = a3;
              this._rBlock = s3 ^ o3;
            }
            var f3 = this._lBlock;
            this._lBlock = this._rBlock;
            this._rBlock = f3;
            h2.call(this, 1, 1431655765);
            d2.call(this, 8, 16711935);
            d2.call(this, 2, 858993459);
            h2.call(this, 16, 65535);
            h2.call(this, 4, 252645135);
            t5[e5] = this._lBlock;
            t5[e5 + 1] = this._rBlock;
          }, keySize: 64 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
          function h2(t5, e5) {
            var r5 = (this._lBlock >>> t5 ^ this._rBlock) & e5;
            this._rBlock ^= r5;
            this._lBlock ^= r5 << t5;
          }
          function d2(t5, e5) {
            var r5 = (this._rBlock >>> t5 ^ this._lBlock) & e5;
            this._lBlock ^= r5;
            this._rBlock ^= r5 << t5;
          }
          e4.DES = n2._createHelper(f2);
          var v2 = s2.TripleDES = n2.extend({ _doReset: function() {
            var t5 = this._key;
            var e5 = t5.words;
            if (2 !== e5.length && 4 !== e5.length && e5.length < 6)
              throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
            var r5 = e5.slice(0, 2);
            var n3 = e5.length < 4 ? e5.slice(0, 2) : e5.slice(2, 4);
            var s3 = e5.length < 6 ? e5.slice(0, 2) : e5.slice(4, 6);
            this._des1 = f2.createEncryptor(i3.create(r5));
            this._des2 = f2.createEncryptor(i3.create(n3));
            this._des3 = f2.createEncryptor(i3.create(s3));
          }, encryptBlock: function(t5, e5) {
            this._des1.encryptBlock(t5, e5);
            this._des2.decryptBlock(t5, e5);
            this._des3.encryptBlock(t5, e5);
          }, decryptBlock: function(t5, e5) {
            this._des3.decryptBlock(t5, e5);
            this._des2.encryptBlock(t5, e5);
            this._des1.decryptBlock(t5, e5);
          }, keySize: 192 / 32, ivSize: 64 / 32, blockSize: 64 / 32 });
          e4.TripleDES = n2._createHelper(v2);
        })();
        return t4.TripleDES;
      });
    }, 4938: function(t3, e3, r3) {
      (function(i3, n2) {
        t3.exports = n2(r3(8249));
      })(this, function(t4) {
        (function(e4) {
          var r4 = t4;
          var i3 = r4.lib;
          var n2 = i3.Base;
          var s2 = i3.WordArray;
          var a2 = r4.x64 = {};
          a2.Word = n2.extend({ init: function(t5, e5) {
            this.high = t5;
            this.low = e5;
          } });
          a2.WordArray = n2.extend({ init: function(t5, r5) {
            t5 = this.words = t5 || [];
            if (r5 != e4)
              this.sigBytes = r5;
            else
              this.sigBytes = 8 * t5.length;
          }, toX32: function() {
            var t5 = this.words;
            var e5 = t5.length;
            var r5 = [];
            for (var i4 = 0; i4 < e5; i4++) {
              var n3 = t5[i4];
              r5.push(n3.high);
              r5.push(n3.low);
            }
            return s2.create(r5, this.sigBytes);
          }, clone: function() {
            var t5 = n2.clone.call(this);
            var e5 = t5.words = this.words.slice(0);
            var r5 = e5.length;
            for (var i4 = 0; i4 < r5; i4++)
              e5[i4] = e5[i4].clone();
            return t5;
          } });
        })();
        return t4;
      });
    }, 4198: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      e3.ErrorCode = void 0;
      (function(t4) {
        t4[t4["SUCCESS"] = 0] = "SUCCESS";
        t4[t4["CLIENT_ID_NOT_FOUND"] = 1] = "CLIENT_ID_NOT_FOUND";
        t4[t4["OPERATION_TOO_OFTEN"] = 2] = "OPERATION_TOO_OFTEN";
        t4[t4["REPEAT_MESSAGE"] = 3] = "REPEAT_MESSAGE";
        t4[t4["TIME_OUT"] = 4] = "TIME_OUT";
      })(e3.ErrorCode || (e3.ErrorCode = {}));
    }, 9021: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      const n2 = i3(r3(6893));
      const s2 = i3(r3(7555));
      const a2 = i3(r3(6379));
      const o2 = i3(r3(529));
      var u2;
      (function(t4) {
        function e4(t5) {
          o2.default.debugMode = t5;
          o2.default.info(`setDebugMode: ${t5}`);
        }
        t4.setDebugMode = e4;
        function r4(t5) {
          try {
            s2.default.init(t5);
          } catch (t6) {
            o2.default.error(`init error`, t6);
          }
        }
        t4.init = r4;
        function i4(t5) {
          try {
            if (!t5.url)
              throw new Error("invalid url");
            if (!t5.key || !t5.keyId)
              throw new Error("invalid key or keyId");
            a2.default.socketUrl = t5.url;
            a2.default.publicKeyId = t5.keyId;
            a2.default.publicKey = t5.key;
          } catch (t6) {
            o2.default.error(`setSocketServer error`, t6);
          }
        }
        t4.setSocketServer = i4;
        function u3(t5) {
          try {
            s2.default.enableSocket(t5);
          } catch (t6) {
            o2.default.error(`enableSocket error`, t6);
          }
        }
        t4.enableSocket = u3;
        function c2() {
          return n2.default.SDK_VERSION;
        }
        t4.getVersion = c2;
      })(u2 || (u2 = {}));
      t3.exports = u2;
    }, 9478: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(496));
      const s2 = i3(r3(3555));
      const a2 = i3(r3(1929));
      const o2 = i3(r3(4379));
      const u2 = i3(r3(6899));
      const c2 = i3(r3(776));
      const l2 = i3(r3(2002));
      const f2 = i3(r3(5807));
      const h2 = i3(r3(9704));
      const d2 = i3(r3(6545));
      const v2 = i3(r3(3680));
      const p2 = i3(r3(7706));
      const g2 = i3(r3(4486));
      const y2 = i3(r3(5867));
      const m2 = i3(r3(7006));
      var w2;
      (function(t4) {
        let e4;
        let r4;
        let i4;
        function w3() {
          if ("undefined" != typeof index) {
            e4 = new d2.default();
            r4 = new v2.default();
            i4 = new p2.default();
          } else if ("undefined" != typeof tt) {
            e4 = new l2.default();
            r4 = new f2.default();
            i4 = new h2.default();
          } else if ("undefined" != typeof my) {
            e4 = new n2.default();
            r4 = new s2.default();
            i4 = new a2.default();
          } else if ("undefined" != typeof wx$1) {
            e4 = new g2.default();
            r4 = new y2.default();
            i4 = new m2.default();
          } else if ("undefined" != typeof window) {
            e4 = new o2.default();
            r4 = new u2.default();
            i4 = new c2.default();
          }
        }
        function _2() {
          if (!e4)
            w3();
          return e4;
        }
        t4.getDevice = _2;
        function S2() {
          if (!r4)
            w3();
          return r4;
        }
        t4.getStorage = S2;
        function b2() {
          if (!i4)
            w3();
          return i4;
        }
        t4.getWebSocket = b2;
      })(w2 || (w2 = {}));
      e3["default"] = w2;
    }, 4685: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(9478));
      var s2;
      (function(t4) {
        function e4() {
          return n2.default.getDevice().os();
        }
        t4.os = e4;
        function r4() {
          return n2.default.getDevice().osVersion();
        }
        t4.osVersion = r4;
        function i4() {
          return n2.default.getDevice().model();
        }
        t4.model = i4;
        function s3() {
          return n2.default.getDevice().brand();
        }
        t4.brand = s3;
        function a2() {
          return n2.default.getDevice().platform();
        }
        t4.platform = a2;
        function o2() {
          return n2.default.getDevice().platformVersion();
        }
        t4.platformVersion = o2;
        function u2() {
          return n2.default.getDevice().platformId();
        }
        t4.platformId = u2;
        function c2() {
          return n2.default.getDevice().language();
        }
        t4.language = c2;
        function l2() {
          let t5 = n2.default.getDevice().userAgent;
          if (t5)
            return t5();
          return "";
        }
        t4.userAgent = l2;
        function f2(t5) {
          n2.default.getDevice().getNetworkType(t5);
        }
        t4.getNetworkType = f2;
        function h2(t5) {
          n2.default.getDevice().onNetworkStatusChange(t5);
        }
        t4.onNetworkStatusChange = h2;
      })(s2 || (s2 = {}));
      e3["default"] = s2;
    }, 7002: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(6379));
      const s2 = i3(r3(1386));
      const a2 = i3(r3(4054));
      const o2 = r3(2918);
      const u2 = i3(r3(7167));
      const c2 = i3(r3(529));
      const l2 = i3(r3(9478));
      const f2 = i3(r3(8506));
      var h2;
      (function(t4) {
        let e4;
        let r4 = false;
        let i4 = false;
        let h3 = false;
        let d2 = [];
        const v2 = 10;
        let p2 = 0;
        t4.allowReconnect = true;
        function g2() {
          return r4 && i4;
        }
        t4.isAvailable = g2;
        function y2(e5) {
          let r5 = new Date().getTime();
          if (r5 - p2 < 1e3) {
            c2.default.warn(`enableSocket ${e5} fail: this function can only be called once a second`);
            return;
          }
          p2 = r5;
          t4.allowReconnect = e5;
          if (e5)
            t4.reconnect(10);
          else
            t4.close(`enableSocket ${e5}`);
        }
        t4.enableSocket = y2;
        function m2(e5 = 0) {
          if (!t4.allowReconnect)
            return;
          if (!S2())
            return;
          setTimeout(function() {
            w2();
          }, e5);
        }
        t4.reconnect = m2;
        function w2() {
          t4.allowReconnect = true;
          if (!S2())
            return;
          if (!b2())
            return;
          h3 = true;
          let r5 = n2.default.socketUrl;
          try {
            let t5 = f2.default.getSync(f2.default.KEY_REDIRECT_SERVER, "");
            if (t5) {
              let e5 = o2.RedirectServerData.parse(t5);
              let i5 = e5.addressList[0].split(",");
              let n3 = i5[0];
              let s3 = Number(i5[1]);
              let a3 = new Date().getTime();
              if (a3 - e5.time < 1e3 * s3)
                r5 = n3;
            }
          } catch (t5) {
          }
          e4 = l2.default.getWebSocket().connect({ url: r5, success: function() {
            i4 = true;
            _2();
          }, fail: function() {
            i4 = false;
            T();
            m2(100);
          } });
          e4.onOpen(M2);
          e4.onClose(x2);
          e4.onError(A2);
          e4.onMessage(I2);
        }
        t4.connect = w2;
        function _2() {
          if (i4 && r4) {
            h3 = false;
            s2.default.create().send();
            u2.default.getInstance().start();
          }
        }
        function S2() {
          if (!n2.default.networkConnected) {
            c2.default.error(`connect failed, network is not available`);
            return false;
          }
          if (h3) {
            c2.default.warn(`connecting`);
            return false;
          }
          if (g2()) {
            c2.default.warn(`already connected`);
            return false;
          }
          return true;
        }
        function b2() {
          var t5 = d2.length;
          let e5 = new Date().getTime();
          if (t5 > 0) {
            for (var r5 = t5 - 1; r5 >= 0; r5--)
              if (e5 - d2[r5] > 5e3) {
                d2.splice(0, r5 + 1);
                break;
              }
          }
          t5 = d2.length;
          d2.push(e5);
          if (t5 >= v2) {
            c2.default.error("connect failed, connection limit reached");
            return false;
          }
          return true;
        }
        function E2(t5 = "") {
          null === e4 || void 0 === e4 || e4.close({ code: 1e3, reason: t5, success: function(t6) {
          }, fail: function(t6) {
          } });
          T();
        }
        t4.close = E2;
        function D2(t5) {
          if (r4 && r4)
            null === e4 || void 0 === e4 || e4.send({ data: t5, success: function(t6) {
            }, fail: function(t6) {
            } });
          else
            throw new Error(`socket not connect`);
        }
        t4.send = D2;
        function T(t5) {
          var e5;
          i4 = false;
          r4 = false;
          h3 = false;
          u2.default.getInstance().cancel();
          if (n2.default.online) {
            n2.default.online = false;
            null === (e5 = n2.default.onlineState) || void 0 === e5 || e5.call(n2.default.onlineState, { online: n2.default.online });
          }
        }
        let M2 = function(t5) {
          r4 = true;
          _2();
        };
        let I2 = function(t5) {
          try {
            t5.data;
            u2.default.getInstance().refresh();
            a2.default.receiveMessage(t5.data);
          } catch (t6) {
          }
        };
        let A2 = function(t5) {
          E2(`socket error`);
        };
        let x2 = function(t5) {
          T();
        };
      })(h2 || (h2 = {}));
      e3["default"] = h2;
    }, 8506: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(9478));
      var s2;
      (function(t4) {
        t4.KEY_APPID = "getui_appid";
        t4.KEY_CID = "getui_cid";
        t4.KEY_SESSION = "getui_session";
        t4.KEY_REGID = "getui_regid";
        t4.KEY_SOCKET_URL = "getui_socket_url";
        t4.KEY_DEVICE_ID = "getui_deviceid";
        t4.KEY_ADD_PHONE_INFO_TIME = "getui_api_time";
        t4.KEY_BIND_ALIAS_TIME = "getui_ba_time";
        t4.KEY_SET_TAG_TIME = "getui_st_time";
        t4.KEY_REDIRECT_SERVER = "getui_redirect_server";
        t4.KEY_LAST_CONNECT_TIME = "getui_last_connect_time";
        function e4(t5) {
          n2.default.getStorage().set(t5);
        }
        t4.set = e4;
        function r4(t5, e5) {
          n2.default.getStorage().setSync(t5, e5);
        }
        t4.setSync = r4;
        function i4(t5) {
          n2.default.getStorage().get(t5);
        }
        t4.get = i4;
        function s3(t5, e5) {
          let r5 = n2.default.getStorage().getSync(t5);
          return r5 ? r5 : e5;
        }
        t4.getSync = s3;
      })(s2 || (s2 = {}));
      e3["default"] = s2;
    }, 496: (t3) => {
      class e3 {
        constructor() {
          this.systemInfo = my.getSystemInfoSync();
        }
        os() {
          var t4;
          return null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.platform;
        }
        osVersion() {
          var t4;
          return null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.system;
        }
        model() {
          var t4;
          return null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.model;
        }
        brand() {
          var t4;
          return null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.brand;
        }
        platform() {
          return "MP-ALIPAY";
        }
        platformVersion() {
          return this.systemInfo.app + " " + this.systemInfo.version;
        }
        platformId() {
          return my.getAppIdSync();
        }
        language() {
          var t4;
          return null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.language;
        }
        getNetworkType(t4) {
          my.getNetworkType({ success: (e4) => {
            var r3;
            null === (r3 = t4.success) || void 0 === r3 || r3.call(t4.success, { networkType: e4.networkType });
          }, fail: () => {
            var e4;
            null === (e4 = t4.fail) || void 0 === e4 || e4.call(t4.fail, "");
          } });
        }
        onNetworkStatusChange(t4) {
          my.onNetworkStatusChange(t4);
        }
      }
      t3.exports = e3;
    }, 3555: (t3) => {
      class e3 {
        set(t4) {
          my.setStorage({ key: t4.key, data: t4.data, success: t4.success, fail: t4.fail });
        }
        setSync(t4, e4) {
          my.setStorageSync({ key: t4, data: e4 });
        }
        get(t4) {
          my.getStorage({ key: t4.key, success: t4.success, fail: t4.fail, complete: t4.complete });
        }
        getSync(t4) {
          return my.getStorageSync({ key: t4 }).data;
        }
      }
      t3.exports = e3;
    }, 1929: (t3) => {
      class e3 {
        connect(t4) {
          my.connectSocket({ url: t4.url, header: t4.header, method: t4.method, success: t4.success, fail: t4.fail, complete: t4.complete });
          return { onOpen: my.onSocketOpen, send: my.sendSocketMessage, onMessage: (t5) => {
            my.onSocketMessage.call(my.onSocketMessage, (e4) => {
              t5.call(t5, { data: e4 ? e4.data : "" });
            });
          }, onError: my.onSocketError, onClose: my.onSocketClose, close: my.closeSocket };
        }
      }
      t3.exports = e3;
    }, 4379: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        os() {
          let t4 = window.navigator.userAgent.toLowerCase();
          if (t4.indexOf("android") > 0 || t4.indexOf("adr") > 0)
            return "android";
          if (!!t4.match(/\(i[^;]+;( u;)? cpu.+mac os x/))
            return "ios";
          if (t4.indexOf("windows") > 0 || t4.indexOf("win32") > 0 || t4.indexOf("win64") > 0)
            return "windows";
          if (t4.indexOf("macintosh") > 0 || t4.indexOf("mac os") > 0)
            return "mac os";
          if (t4.indexOf("linux") > 0)
            return "linux";
          if (t4.indexOf("unix") > 0)
            return "linux";
          return "other";
        }
        osVersion() {
          let t4 = window.navigator.userAgent.toLowerCase();
          let e4 = t4.substring(t4.indexOf(";") + 1).trim();
          if (e4.indexOf(";") > 0)
            return e4.substring(0, e4.indexOf(";")).trim();
          return e4.substring(0, e4.indexOf(")")).trim();
        }
        model() {
          return "";
        }
        brand() {
          return "";
        }
        platform() {
          return "H5";
        }
        platformVersion() {
          return "";
        }
        platformId() {
          return "";
        }
        language() {
          return window.navigator.language;
        }
        userAgent() {
          return window.navigator.userAgent;
        }
        getNetworkType(t4) {
          var e4;
          null === (e4 = t4.success) || void 0 === e4 || e4.call(t4.success, { networkType: window.navigator.onLine ? "unknown" : "none" });
        }
        onNetworkStatusChange(t4) {
        }
      }
      e3["default"] = r3;
    }, 6899: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        set(t4) {
          var e4;
          window.localStorage.setItem(t4.key, t4.data);
          null === (e4 = t4.success) || void 0 === e4 || e4.call(t4.success, "");
        }
        setSync(t4, e4) {
          window.localStorage.setItem(t4, e4);
        }
        get(t4) {
          var e4;
          let r4 = window.localStorage.getItem(t4.key);
          null === (e4 = t4.success) || void 0 === e4 || e4.call(t4.success, r4);
        }
        getSync(t4) {
          return window.localStorage.getItem(t4);
        }
      }
      e3["default"] = r3;
    }, 776: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        connect(t4) {
          let e4 = new WebSocket(t4.url);
          return { send: (t5) => {
            var r4, i3;
            try {
              e4.send(t5.data);
              null === (r4 = t5.success) || void 0 === r4 || r4.call(t5.success, { errMsg: "" });
            } catch (e5) {
              null === (i3 = t5.fail) || void 0 === i3 || i3.call(t5.fail, { errMsg: e5 + "" });
            }
          }, close: (t5) => {
            var r4, i3;
            try {
              e4.close(t5.code, t5.reason);
              null === (r4 = t5.success) || void 0 === r4 || r4.call(t5.success, { errMsg: "" });
            } catch (e5) {
              null === (i3 = t5.fail) || void 0 === i3 || i3.call(t5.fail, { errMsg: e5 + "" });
            }
          }, onOpen: (r4) => {
            e4.onopen = (e5) => {
              var i3;
              null === (i3 = t4.success) || void 0 === i3 || i3.call(t4.success, "");
              r4({ header: "" });
            };
          }, onError: (r4) => {
            e4.onerror = (e5) => {
              var i3;
              null === (i3 = t4.fail) || void 0 === i3 || i3.call(t4.fail, "");
              r4({ errMsg: "" });
            };
          }, onMessage: (t5) => {
            e4.onmessage = (e5) => {
              t5({ data: e5.data });
            };
          }, onClose: (t5) => {
            e4.onclose = (e5) => {
              t5(e5);
            };
          } };
        }
      }
      e3["default"] = r3;
    }, 2002: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        constructor() {
          this.systemInfo = tt.getSystemInfoSync();
        }
        os() {
          return this.systemInfo.platform;
        }
        osVersion() {
          return this.systemInfo.system;
        }
        model() {
          return this.systemInfo.model;
        }
        brand() {
          return this.systemInfo.brand;
        }
        platform() {
          return "MP-TOUTIAO";
        }
        platformVersion() {
          return this.systemInfo.appName + " " + this.systemInfo.version;
        }
        language() {
          return "";
        }
        platformId() {
          return "";
        }
        getNetworkType(t4) {
          tt.getNetworkType(t4);
        }
        onNetworkStatusChange(t4) {
          tt.onNetworkStatusChange(t4);
        }
      }
      e3["default"] = r3;
    }, 5807: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        set(t4) {
          tt.setStorage(t4);
        }
        setSync(t4, e4) {
          tt.setStorageSync(t4, e4);
        }
        get(t4) {
          tt.getStorage(t4);
        }
        getSync(t4) {
          return tt.getStorageSync(t4);
        }
      }
      e3["default"] = r3;
    }, 9704: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        connect(t4) {
          let e4 = tt.connectSocket({ url: t4.url, header: t4.header, protocols: t4.protocols, success: t4.success, fail: t4.fail, complete: t4.complete });
          return { onOpen: e4.onOpen, send: e4.send, onMessage: e4.onMessage, onError: e4.onError, onClose: e4.onClose, close: e4.close };
        }
      }
      e3["default"] = r3;
    }, 6545: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        constructor() {
          try {
            this.systemInfo = index.getSystemInfoSync();
            this.accountInfo = index.getAccountInfoSync();
          } catch (t4) {
          }
        }
        os() {
          return this.systemInfo ? this.systemInfo.platform : "";
        }
        model() {
          return this.systemInfo ? this.systemInfo.model : "";
        }
        brand() {
          var t4;
          return (null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.brand) ? this.systemInfo.brand : "";
        }
        osVersion() {
          return this.systemInfo ? this.systemInfo.system : "";
        }
        platform() {
          let t4 = "";
          t4 = "MP-WEIXIN";
          return t4;
        }
        platformVersion() {
          return this.systemInfo ? this.systemInfo.version : "";
        }
        platformId() {
          return this.accountInfo ? this.accountInfo.miniProgram.appId : "";
        }
        language() {
          var t4;
          return (null === (t4 = this.systemInfo) || void 0 === t4 ? void 0 : t4.language) ? this.systemInfo.language : "";
        }
        userAgent() {
          return window ? window.navigator.userAgent : "";
        }
        getNetworkType(t4) {
          index.getNetworkType(t4);
        }
        onNetworkStatusChange(t4) {
          index.onNetworkStatusChange(t4);
        }
      }
      e3["default"] = r3;
    }, 3680: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        set(t4) {
          index.setStorage(t4);
        }
        setSync(t4, e4) {
          index.setStorageSync(t4, e4);
        }
        get(t4) {
          index.getStorage(t4);
        }
        getSync(t4) {
          return index.getStorageSync(t4);
        }
      }
      e3["default"] = r3;
    }, 7706: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        connect(t4) {
          let e4 = index.connectSocket(t4);
          return { send: (t5) => {
            null === e4 || void 0 === e4 || e4.send(t5);
          }, close: (t5) => {
            null === e4 || void 0 === e4 || e4.close(t5);
          }, onOpen: (t5) => {
            null === e4 || void 0 === e4 || e4.onOpen(t5);
          }, onError: (t5) => {
            null === e4 || void 0 === e4 || e4.onError(t5);
          }, onMessage: (t5) => {
            null === e4 || void 0 === e4 || e4.onMessage(t5);
          }, onClose: (t5) => {
            null === e4 || void 0 === e4 || e4.onClose(t5);
          } };
        }
      }
      e3["default"] = r3;
    }, 4486: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        constructor() {
          this.systemInfo = wx$1.getSystemInfoSync();
        }
        os() {
          return this.systemInfo.platform;
        }
        osVersion() {
          return this.systemInfo.system;
        }
        model() {
          return this.systemInfo.model;
        }
        brand() {
          return this.systemInfo.brand;
        }
        platform() {
          return "MP-WEIXIN";
        }
        platformVersion() {
          return this.systemInfo.version;
        }
        language() {
          return this.systemInfo.language;
        }
        platformId() {
          if (wx$1.canIUse("getAccountInfoSync"))
            return wx$1.getAccountInfoSync().miniProgram.appId;
          return "";
        }
        getNetworkType(t4) {
          wx$1.getNetworkType({ success: (e4) => {
            var r4;
            null === (r4 = t4.success) || void 0 === r4 || r4.call(t4.success, { networkType: e4.networkType });
          }, fail: t4.fail });
        }
        onNetworkStatusChange(t4) {
          wx$1.onNetworkStatusChange(t4);
        }
      }
      e3["default"] = r3;
    }, 5867: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        set(t4) {
          wx$1.setStorage(t4);
        }
        setSync(t4, e4) {
          wx$1.setStorageSync(t4, e4);
        }
        get(t4) {
          wx$1.getStorage(t4);
        }
        getSync(t4) {
          return wx$1.getStorageSync(t4);
        }
      }
      e3["default"] = r3;
    }, 7006: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        connect(t4) {
          let e4 = wx$1.connectSocket({ url: t4.url, header: t4.header, protocols: t4.protocols, success: t4.success, fail: t4.fail, complete: t4.complete });
          return { onOpen: e4.onOpen, send: e4.send, onMessage: e4.onMessage, onError: e4.onError, onClose: e4.onClose, close: e4.close };
        }
      }
      e3["default"] = r3;
    }, 6893: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      var r3;
      (function(t4) {
        t4.SDK_VERSION = "GTMP-2.0.3.dcloud";
        t4.DEFAULT_SOCKET_URL = "wss://wshzn.gepush.com:5223/nws";
        t4.SOCKET_PROTOCOL_VERSION = "1.0";
        t4.SERVER_PUBLIC_KEY = "MHwwDQYJKoZIhvcNAQEBBQADawAwaAJhAJp1rROuvBF7sBSnvLaesj2iFhMcY8aXyLvpnNLKs2wjL3JmEnyr++SlVa35liUlzi83tnAFkn3A9GB7pHBNzawyUkBh8WUhq5bnFIkk2RaDa6+5MpG84DEv52p7RR+aWwIDAQAB";
        t4.SERVER_PUBLIC_KEY_ID = "69d747c4b9f641baf4004be4297e9f3b";
        t4.ID_U_2_G = true;
      })(r3 || (r3 = {}));
      e3["default"] = r3;
    }, 7555: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(7002));
      const s2 = i3(r3(529));
      const a2 = i3(r3(6379));
      class o2 {
        static init(t4) {
          var e4;
          if (this.inited)
            return;
          try {
            this.checkAppid(t4.appid);
            this.inited = true;
            s2.default.info(`init: appid=${t4.appid}`);
            a2.default.init(t4);
            n2.default.connect();
          } catch (r4) {
            this.inited = false;
            null === (e4 = t4.onError) || void 0 === e4 || e4.call(t4.onError, { error: r4 });
            throw r4;
          }
        }
        static enableSocket(t4) {
          this.checkInit();
          n2.default.enableSocket(t4);
        }
        static checkInit() {
          if (!this.inited)
            throw new Error(`not init, please invoke init method firstly`);
        }
        static checkAppid(t4) {
          if (null == t4 || void 0 == t4 || "" == t4.trim())
            throw new Error(`invalid appid ${t4}`);
        }
      }
      o2.inited = false;
      e3["default"] = o2;
    }, 6379: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(6667));
      const s2 = i3(r3(8506));
      const a2 = i3(r3(6893));
      const o2 = i3(r3(7002));
      const u2 = i3(r3(529));
      const c2 = i3(r3(4685));
      const l2 = i3(r3(2323));
      class f2 {
        static init(t4) {
          var e4;
          if (a2.default.ID_U_2_G)
            this.appid = l2.default.to_getui(t4.appid);
          else
            this.appid = t4.appid;
          this.onError = t4.onError;
          this.onClientId = t4.onClientId;
          this.onlineState = t4.onlineState;
          this.onPushMsg = t4.onPushMsg;
          if (this.appid != s2.default.getSync(s2.default.KEY_APPID, this.appid)) {
            u2.default.info("appid changed, clear session and cid");
            s2.default.setSync(s2.default.KEY_CID, "");
            s2.default.setSync(s2.default.KEY_SESSION, "");
          }
          s2.default.setSync(s2.default.KEY_APPID, this.appid);
          this.cid = s2.default.getSync(s2.default.KEY_CID, this.cid);
          if (this.cid)
            null === (e4 = this.onClientId) || void 0 === e4 || e4.call(this.onClientId, { cid: f2.cid });
          this.session = s2.default.getSync(s2.default.KEY_SESSION, this.session);
          this.deviceId = s2.default.getSync(s2.default.KEY_DEVICE_ID, this.deviceId);
          this.regId = s2.default.getSync(s2.default.KEY_REGID, this.regId);
          if (!this.regId) {
            this.regId = this.createRegId();
            s2.default.set({ key: s2.default.KEY_REGID, data: this.regId });
          }
          this.socketUrl = s2.default.getSync(s2.default.KEY_SOCKET_URL, this.socketUrl);
          let r4 = this;
          c2.default.getNetworkType({ success: (t5) => {
            r4.networkType = t5.networkType;
            r4.networkConnected = "none" != r4.networkType && "" != r4.networkType;
          } });
          c2.default.onNetworkStatusChange((t5) => {
            r4.networkConnected = t5.isConnected;
            r4.networkType = t5.networkType;
            if (r4.networkConnected)
              o2.default.reconnect(100);
          });
        }
        static createRegId() {
          return `M-V${n2.default.md5Hex(this.getUuid())}-${new Date().getTime()}`;
        }
        static getUuid() {
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t4) {
            let e4 = 16 * Math.random() | 0, r4 = "x" === t4 ? e4 : 3 & e4 | 8;
            return r4.toString(16);
          });
        }
      }
      f2.appid = "";
      f2.cid = "";
      f2.regId = "";
      f2.session = "";
      f2.deviceId = "";
      f2.packetId = 1;
      f2.online = false;
      f2.socketUrl = a2.default.DEFAULT_SOCKET_URL;
      f2.publicKeyId = a2.default.SERVER_PUBLIC_KEY_ID;
      f2.publicKey = a2.default.SERVER_PUBLIC_KEY;
      f2.lastAliasTime = 0;
      f2.networkConnected = true;
      f2.networkType = "none";
      e3["default"] = f2;
    }, 9586: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      var n2, s2;
      Object.defineProperty(e3, "__esModule", { value: true });
      const a2 = i3(r3(661));
      const o2 = r3(4198);
      const u2 = i3(r3(6379));
      class c2 extends a2.default {
        constructor() {
          super(...arguments);
          this.actionMsgData = new l2();
        }
        static initActionMsg(t4, ...e4) {
          super.initMsg(t4);
          t4.command = a2.default.Command.CLIENT_MSG;
          t4.data = t4.actionMsgData = l2.create();
          return t4;
        }
        static parseActionMsg(t4, e4) {
          super.parseMsg(t4, e4);
          t4.actionMsgData = l2.parse(t4.data);
          return t4;
        }
        send() {
          setTimeout(() => {
            var t4;
            if (c2.waitingLoginMsgMap.has(this.actionMsgData.msgId) || c2.waitingResponseMsgMap.has(this.actionMsgData.msgId)) {
              c2.waitingLoginMsgMap.delete(this.actionMsgData.msgId);
              c2.waitingResponseMsgMap.delete(this.actionMsgData.msgId);
              null === (t4 = this.callback) || void 0 === t4 || t4.call(this.callback, { resultCode: o2.ErrorCode.TIME_OUT, message: "waiting time out" });
            }
          }, 1e4);
          if (!u2.default.online) {
            c2.waitingLoginMsgMap.set(this.actionMsgData.msgId, this);
            return;
          }
          if (this.actionMsgData.msgAction != c2.ClientAction.RECEIVED)
            c2.waitingResponseMsgMap.set(this.actionMsgData.msgId, this);
          super.send();
        }
        receive() {
        }
        static sendWaitingMessages() {
          let t4 = this.waitingLoginMsgMap.keys();
          let e4;
          while (e4 = t4.next(), !e4.done) {
            let t5 = this.waitingLoginMsgMap.get(e4.value);
            this.waitingLoginMsgMap.delete(e4.value);
            null === t5 || void 0 === t5 || t5.send();
          }
        }
        static getWaitingResponseMessage(t4) {
          return c2.waitingResponseMsgMap.get(t4);
        }
        static removeWaitingResponseMessage(t4) {
          let e4 = c2.waitingResponseMsgMap.get(t4);
          if (e4)
            c2.waitingResponseMsgMap.delete(t4);
          return e4;
        }
      }
      c2.ServerAction = (n2 = class {
      }, n2.PUSH_MESSAGE = "pushmessage", n2.REDIRECT_SERVER = "redirect_server", n2.ADD_PHONE_INFO_RESULT = "addphoneinfo", n2.SET_MODE_RESULT = "set_mode_result", n2.SET_TAG_RESULT = "settag_result", n2.BIND_ALIAS_RESULT = "response_bind", n2.UNBIND_ALIAS_RESULT = "response_unbind", n2.FEED_BACK_RESULT = "pushmessage_feedback", n2.RECEIVED = "received", n2);
      c2.ClientAction = (s2 = class {
      }, s2.ADD_PHONE_INFO = "addphoneinfo", s2.SET_MODE = "set_mode", s2.FEED_BACK = "pushmessage_feedback", s2.SET_TAGS = "set_tag", s2.BIND_ALIAS = "bind_alias", s2.UNBIND_ALIAS = "unbind_alias", s2.RECEIVED = "received", s2);
      c2.waitingLoginMsgMap = /* @__PURE__ */ new Map();
      c2.waitingResponseMsgMap = /* @__PURE__ */ new Map();
      class l2 {
        constructor() {
          this.appId = "";
          this.cid = "";
          this.msgId = "";
          this.msgAction = "";
          this.msgData = "";
          this.msgExtraData = "";
        }
        static create() {
          let t4 = new l2();
          t4.appId = u2.default.appid;
          t4.cid = u2.default.cid;
          t4.msgId = (2147483647 & new Date().getTime()).toString();
          return t4;
        }
        static parse(t4) {
          let e4 = new l2();
          let r4 = JSON.parse(t4);
          e4.appId = r4.appId;
          e4.cid = r4.cid;
          e4.msgId = r4.msgId;
          e4.msgAction = r4.msgAction;
          e4.msgData = r4.msgData;
          e4.msgExtraData = r4.msgExtraData;
          return e4;
        }
      }
      e3["default"] = c2;
    }, 4516: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(4685));
      const s2 = i3(r3(8506));
      const a2 = i3(r3(6893));
      const o2 = r3(4198);
      const u2 = i3(r3(9586));
      const c2 = i3(r3(6379));
      class l2 extends u2.default {
        constructor() {
          super(...arguments);
          this.addPhoneInfoData = new f2();
        }
        static create() {
          let t4 = new l2();
          super.initActionMsg(t4);
          t4.callback = (e4) => {
            if (e4.resultCode != o2.ErrorCode.SUCCESS && e4.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                t4.send();
              }, 30 * 1e3);
            else
              s2.default.set({ key: s2.default.KEY_ADD_PHONE_INFO_TIME, data: new Date().getTime() });
          };
          t4.actionMsgData.msgAction = u2.default.ClientAction.ADD_PHONE_INFO;
          t4.addPhoneInfoData = f2.create();
          t4.actionMsgData.msgData = JSON.stringify(t4.addPhoneInfoData);
          return t4;
        }
        send() {
          let t4 = new Date().getTime();
          let e4 = s2.default.getSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
          if (t4 - e4 < 24 * 60 * 60 * 1e3)
            return;
          super.send();
        }
      }
      class f2 {
        constructor() {
          this.model = "";
          this.brand = "";
          this.system_version = "";
          this.version = "";
          this.deviceid = "";
          this.type = "";
        }
        static create() {
          let t4 = new f2();
          t4.model = n2.default.model();
          t4.brand = n2.default.brand();
          t4.system_version = n2.default.osVersion();
          t4.version = a2.default.SDK_VERSION;
          t4.device_token = "";
          t4.imei = "";
          t4.oaid = "";
          t4.mac = "";
          t4.idfa = "";
          t4.type = "MINIPROGRAM";
          t4.deviceid = `${t4.type}-${c2.default.deviceId}`;
          t4.extra = { os: n2.default.os(), platform: n2.default.platform(), platformVersion: n2.default.platformVersion(), platformId: n2.default.platformId(), language: n2.default.language(), userAgent: n2.default.userAgent() };
          return t4;
        }
      }
      e3["default"] = l2;
    }, 8723: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      var n2, s2;
      Object.defineProperty(e3, "__esModule", { value: true });
      const a2 = i3(r3(6379));
      const o2 = r3(4198);
      const u2 = i3(r3(9586));
      class c2 extends u2.default {
        constructor() {
          super(...arguments);
          this.feedbackData = new l2();
        }
        static create(t4, e4) {
          let r4 = new c2();
          super.initActionMsg(r4);
          r4.callback = (t5) => {
            if (t5.resultCode != o2.ErrorCode.SUCCESS && t5.resultCode != o2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                r4.send();
              }, 30 * 1e3);
          };
          r4.feedbackData = l2.create(t4, e4);
          r4.actionMsgData.msgAction = u2.default.ClientAction.FEED_BACK;
          r4.actionMsgData.msgData = JSON.stringify(r4.feedbackData);
          return r4;
        }
        send() {
          super.send();
        }
      }
      c2.ActionId = (n2 = class {
      }, n2.RECEIVE = "0", n2.MP_RECEIVE = "210000", n2.WEB_RECEIVE = "220000", n2.BEGIN = "1", n2);
      c2.RESULT = (s2 = class {
      }, s2.OK = "ok", s2);
      class l2 {
        constructor() {
          this.messageid = "";
          this.appkey = "";
          this.appid = "";
          this.taskid = "";
          this.actionid = "";
          this.result = "";
          this.timestamp = "";
        }
        static create(t4, e4) {
          let r4 = new l2();
          r4.messageid = t4.pushMessageData.messageid;
          r4.appkey = t4.pushMessageData.appKey;
          r4.appid = a2.default.appid;
          r4.taskid = t4.pushMessageData.taskId;
          r4.actionid = e4;
          r4.result = c2.RESULT.OK;
          r4.timestamp = new Date().getTime().toString();
          return r4;
        }
      }
      e3["default"] = c2;
    }, 6362: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(661));
      class s2 extends n2.default {
        static create() {
          let t4 = new s2();
          super.initMsg(t4);
          t4.command = n2.default.Command.HEART_BEAT;
          return t4;
        }
      }
      e3["default"] = s2;
    }, 1386: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(6667));
      const s2 = i3(r3(6379));
      const a2 = i3(r3(661));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.keyNegotiateData = new u2();
        }
        static create() {
          let t4 = new o2();
          super.initMsg(t4);
          t4.command = a2.default.Command.KEY_NEGOTIATE;
          n2.default.resetKey();
          t4.data = t4.keyNegotiateData = u2.create();
          return t4;
        }
        send() {
          super.send();
        }
      }
      class u2 {
        constructor() {
          this.appId = "";
          this.rsaPublicKeyId = "";
          this.algorithm = "";
          this.secretKey = "";
          this.iv = "";
        }
        static create() {
          let t4 = new u2();
          t4.appId = s2.default.appid;
          t4.rsaPublicKeyId = s2.default.publicKeyId;
          t4.algorithm = "AES";
          t4.secretKey = n2.default.getEncryptedSecretKey();
          t4.iv = n2.default.getEncryptedIV();
          return t4;
        }
      }
      e3["default"] = o2;
    }, 1280: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(661));
      const s2 = i3(r3(6667));
      const a2 = i3(r3(8858));
      const o2 = i3(r3(529));
      const u2 = i3(r3(6379));
      class c2 extends n2.default {
        constructor() {
          super(...arguments);
          this.keyNegotiateResultData = new l2();
        }
        static parse(t4) {
          let e4 = new c2();
          super.parseMsg(e4, t4);
          e4.keyNegotiateResultData = l2.parse(e4.data);
          return e4;
        }
        receive() {
          var t4, e4;
          if (0 != this.keyNegotiateResultData.errorCode) {
            o2.default.error(`key negotiate fail: ${this.data}`);
            null === (t4 = u2.default.onError) || void 0 === t4 || t4.call(u2.default.onError, { error: `key negotiate fail: ${this.data}` });
            return;
          }
          let r4 = this.keyNegotiateResultData.encryptType.split("/");
          if (!s2.default.algorithmMap.has(r4[0].trim().toLowerCase()) || !s2.default.modeMap.has(r4[1].trim().toLowerCase()) || !s2.default.paddingMap.has(r4[2].trim().toLowerCase())) {
            o2.default.error(`key negotiate fail: ${this.data}`);
            null === (e4 = u2.default.onError) || void 0 === e4 || e4.call(u2.default.onError, { error: `key negotiate fail: ${this.data}` });
            return;
          }
          s2.default.setEncryptParams(r4[0].trim().toLowerCase(), r4[1].trim().toLowerCase(), r4[2].trim().toLowerCase());
          a2.default.create().send();
        }
      }
      class l2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.encryptType = "";
        }
        static parse(t4) {
          let e4 = new l2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          e4.encryptType = r4.encryptType;
          return e4;
        }
      }
      e3["default"] = c2;
    }, 8858: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(6379));
      const s2 = i3(r3(6667));
      const a2 = i3(r3(661));
      const o2 = i3(r3(4534));
      class u2 extends a2.default {
        constructor() {
          super(...arguments);
          this.loginData = new c2();
        }
        static create() {
          let t4 = new u2();
          super.initMsg(t4);
          t4.command = a2.default.Command.LOGIN;
          t4.data = t4.loginData = c2.create();
          return t4;
        }
        send() {
          if (!this.loginData.session || n2.default.cid != s2.default.md5Hex(this.loginData.session)) {
            o2.default.create().send();
            return;
          }
          super.send();
        }
      }
      class c2 {
        constructor() {
          this.appId = "";
          this.session = "";
        }
        static create() {
          let t4 = new c2();
          t4.appId = n2.default.appid;
          t4.session = n2.default.session;
          return t4;
        }
      }
      e3["default"] = u2;
    }, 1606: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(8506));
      const s2 = i3(r3(661));
      const a2 = i3(r3(6379));
      const o2 = i3(r3(9586));
      const u2 = i3(r3(4516));
      const c2 = i3(r3(8858));
      class l2 extends s2.default {
        constructor() {
          super(...arguments);
          this.loginResultData = new f2();
        }
        static parse(t4) {
          let e4 = new l2();
          super.parseMsg(e4, t4);
          e4.loginResultData = f2.parse(e4.data);
          return e4;
        }
        receive() {
          var t4;
          if (0 != this.loginResultData.errorCode) {
            this.data;
            a2.default.session = a2.default.cid = "";
            n2.default.setSync(n2.default.KEY_CID, "");
            n2.default.setSync(n2.default.KEY_SESSION, "");
            c2.default.create().send();
            return;
          }
          if (!a2.default.online) {
            a2.default.online = true;
            null === (t4 = a2.default.onlineState) || void 0 === t4 || t4.call(a2.default.onlineState, { online: a2.default.online });
          }
          o2.default.sendWaitingMessages();
          u2.default.create().send();
        }
      }
      class f2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.session = "";
        }
        static parse(t4) {
          let e4 = new f2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          e4.session = r4.session;
          return e4;
        }
      }
      e3["default"] = l2;
    }, 661: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      var n2;
      Object.defineProperty(e3, "__esModule", { value: true });
      const s2 = i3(r3(9593));
      const a2 = i3(r3(7002));
      const o2 = i3(r3(6893));
      const u2 = i3(r3(6379));
      class c2 {
        constructor() {
          this.version = "";
          this.command = 0;
          this.packetId = 0;
          this.timeStamp = 0;
          this.data = "";
          this.signature = "";
        }
        static initMsg(t4, ...e4) {
          t4.version = o2.default.SOCKET_PROTOCOL_VERSION;
          t4.command = 0;
          t4.timeStamp = new Date().getTime();
          return t4;
        }
        static parseMsg(t4, e4) {
          let r4 = JSON.parse(e4);
          t4.version = r4.version;
          t4.command = r4.command;
          t4.packetId = r4.packetId;
          t4.timeStamp = r4.timeStamp;
          t4.data = r4.data;
          t4.signature = r4.signature;
          return t4;
        }
        stringify() {
          return JSON.stringify(this, ["version", "command", "packetId", "timeStamp", "data", "signature"]);
        }
        send() {
          if (!a2.default.isAvailable())
            return;
          this.packetId = u2.default.packetId++;
          this.data = JSON.stringify(this.data);
          this.stringify();
          if (this.command != c2.Command.HEART_BEAT) {
            s2.default.sign(this);
            if (this.data && this.command != c2.Command.KEY_NEGOTIATE)
              s2.default.encrypt(this);
          }
          a2.default.send(this.stringify());
        }
      }
      c2.Command = (n2 = class {
      }, n2.HEART_BEAT = 0, n2.KEY_NEGOTIATE = 1, n2.KEY_NEGOTIATE_RESULT = 16, n2.REGISTER = 2, n2.REGISTER_RESULT = 32, n2.LOGIN = 3, n2.LOGIN_RESULT = 48, n2.LOGOUT = 4, n2.LOGOUT_RESULT = 64, n2.CLIENT_MSG = 5, n2.SERVER_MSG = 80, n2.SERVER_CLOSE = 96, n2.REDIRECT_SERVER = 112, n2);
      e3["default"] = c2;
    }, 9593: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(6667));
      var s2;
      (function(t4) {
        function e4(t5) {
          t5.data = n2.default.encrypt(t5.data);
        }
        t4.encrypt = e4;
        function r4(t5) {
          t5.data = n2.default.decrypt(t5.data);
        }
        t4.decrypt = r4;
        function i4(t5) {
          t5.signature = n2.default.sha256(`${t5.timeStamp}${t5.packetId}${t5.command}${t5.data}`);
        }
        t4.sign = i4;
        function s3(t5) {
          let e5 = n2.default.sha256(`${t5.timeStamp}${t5.packetId}${t5.command}${t5.data}`);
          if (t5.signature != e5)
            throw new Error(`msg signature vierfy failed`);
        }
        t4.verify = s3;
      })(s2 || (s2 = {}));
      e3["default"] = s2;
    }, 4054: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(1280));
      const s2 = i3(r3(1606));
      const a2 = i3(r3(661));
      const o2 = i3(r3(1277));
      const u2 = i3(r3(910));
      const c2 = i3(r3(9538));
      const l2 = i3(r3(9479));
      const f2 = i3(r3(6755));
      const h2 = i3(r3(2918));
      const d2 = i3(r3(9586));
      const v2 = i3(r3(9510));
      const p2 = i3(r3(4626));
      const g2 = i3(r3(7562));
      const y2 = i3(r3(9593));
      const m2 = i3(r3(9586));
      const w2 = i3(r3(9519));
      const _2 = i3(r3(8947));
      class S2 {
        static receiveMessage(t4) {
          let e4 = a2.default.parseMsg(new a2.default(), t4);
          if (e4.command == a2.default.Command.HEART_BEAT)
            return;
          if (e4.command != a2.default.Command.KEY_NEGOTIATE_RESULT && e4.command != a2.default.Command.SERVER_CLOSE && e4.command != a2.default.Command.REDIRECT_SERVER)
            y2.default.decrypt(e4);
          if (e4.command != a2.default.Command.SERVER_CLOSE && e4.command != a2.default.Command.REDIRECT_SERVER)
            y2.default.verify(e4);
          switch (e4.command) {
            case a2.default.Command.KEY_NEGOTIATE_RESULT:
              n2.default.parse(e4.stringify()).receive();
              break;
            case a2.default.Command.REGISTER_RESULT:
              o2.default.parse(e4.stringify()).receive();
              break;
            case a2.default.Command.LOGIN_RESULT:
              s2.default.parse(e4.stringify()).receive();
              break;
            case a2.default.Command.SERVER_MSG:
              this.receiveActionMsg(e4.stringify());
              break;
            case a2.default.Command.SERVER_CLOSE:
              _2.default.parse(e4.stringify()).receive();
              break;
            case a2.default.Command.REDIRECT_SERVER:
              h2.default.parse(e4.stringify()).receive();
              break;
          }
        }
        static receiveActionMsg(t4) {
          let e4 = m2.default.parseActionMsg(new m2.default(), t4);
          if (e4.actionMsgData.msgAction != d2.default.ServerAction.RECEIVED && e4.actionMsgData.msgAction != d2.default.ServerAction.REDIRECT_SERVER) {
            let t5 = JSON.parse(e4.actionMsgData.msgData);
            w2.default.create(t5.id).send();
          }
          switch (e4.actionMsgData.msgAction) {
            case d2.default.ServerAction.PUSH_MESSAGE:
              f2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.ADD_PHONE_INFO_RESULT:
              u2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.SET_MODE_RESULT:
              v2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.SET_TAG_RESULT:
              p2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.BIND_ALIAS_RESULT:
              c2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.UNBIND_ALIAS_RESULT:
              g2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.FEED_BACK_RESULT:
              l2.default.parse(t4).receive();
              break;
            case d2.default.ServerAction.RECEIVED:
              w2.default.parse(t4).receive();
              break;
          }
        }
      }
      e3["default"] = S2;
    }, 9519: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = r3(4198);
      const s2 = i3(r3(6379));
      const a2 = i3(r3(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.receivedData = new u2();
        }
        static create(t4) {
          let e4 = new o2();
          super.initActionMsg(e4);
          e4.callback = (t5) => {
            if (t5.resultCode != n2.ErrorCode.SUCCESS && t5.resultCode != n2.ErrorCode.REPEAT_MESSAGE)
              setTimeout(function() {
                e4.send();
              }, 3 * 1e3);
          };
          e4.actionMsgData.msgAction = a2.default.ClientAction.RECEIVED;
          e4.receivedData = u2.create(t4);
          e4.actionMsgData.msgData = JSON.stringify(e4.receivedData);
          return e4;
        }
        static parse(t4) {
          let e4 = new o2();
          super.parseActionMsg(e4, t4);
          e4.receivedData = u2.parse(e4.data);
          return e4;
        }
        receive() {
          var t4;
          let e4 = a2.default.getWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4 && e4.actionMsgData.msgAction == a2.default.ClientAction.ADD_PHONE_INFO || e4 && e4.actionMsgData.msgAction == a2.default.ClientAction.FEED_BACK) {
            a2.default.removeWaitingResponseMessage(e4.actionMsgData.msgId);
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
          }
        }
        send() {
          super.send();
        }
      }
      class u2 {
        constructor() {
          this.msgId = "";
          this.cid = "";
        }
        static create(t4) {
          let e4 = new u2();
          e4.cid = s2.default.cid;
          e4.msgId = t4;
          return e4;
        }
        static parse(t4) {
          let e4 = new u2();
          let r4 = JSON.parse(t4);
          e4.cid = r4.cid;
          e4.msgId = r4.msgId;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 2918: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      e3.RedirectServerData = void 0;
      const n2 = i3(r3(7002));
      const s2 = i3(r3(8506));
      const a2 = i3(r3(661));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.redirectServerData = new u2();
        }
        static parse(t4) {
          let e4 = new o2();
          super.parseMsg(e4, t4);
          e4.redirectServerData = u2.parse(e4.data);
          return e4;
        }
        receive() {
          this.redirectServerData;
          s2.default.setSync(s2.default.KEY_REDIRECT_SERVER, JSON.stringify(this.redirectServerData));
          n2.default.close("redirect server");
          n2.default.reconnect(this.redirectServerData.delay);
        }
      }
      class u2 {
        constructor() {
          this.addressList = [];
          this.delay = 0;
          this.loc = "";
          this.conf = "";
          this.time = 0;
        }
        static parse(t4) {
          let e4 = new u2();
          let r4 = JSON.parse(t4);
          e4.addressList = r4.addressList;
          e4.delay = r4.delay;
          e4.loc = r4.loc;
          e4.conf = r4.conf;
          e4.time = r4.time ? r4.time : new Date().getTime();
          return e4;
        }
      }
      e3.RedirectServerData = u2;
      e3["default"] = o2;
    }, 4534: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(6379));
      const s2 = i3(r3(661));
      class a2 extends s2.default {
        constructor() {
          super(...arguments);
          this.registerData = new o2();
        }
        static create() {
          let t4 = new a2();
          super.initMsg(t4);
          t4.command = s2.default.Command.REGISTER;
          t4.data = t4.registerData = o2.create();
          return t4;
        }
        send() {
          super.send();
        }
      }
      class o2 {
        constructor() {
          this.appId = "";
          this.regId = "";
        }
        static create() {
          let t4 = new o2();
          t4.appId = n2.default.appid;
          t4.regId = n2.default.regId;
          return t4;
        }
      }
      e3["default"] = a2;
    }, 1277: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(661));
      const s2 = i3(r3(8506));
      const a2 = i3(r3(6379));
      const o2 = i3(r3(8858));
      const u2 = i3(r3(529));
      class c2 extends n2.default {
        constructor() {
          super(...arguments);
          this.registerResultData = new l2();
        }
        static parse(t4) {
          let e4 = new c2();
          super.parseMsg(e4, t4);
          e4.registerResultData = l2.parse(e4.data);
          return e4;
        }
        receive() {
          var t4, e4;
          if (0 != this.registerResultData.errorCode || !this.registerResultData.cid || !this.registerResultData.session) {
            u2.default.error(`register fail: ${this.data}`);
            null === (t4 = a2.default.onError) || void 0 === t4 || t4.call(a2.default.onError, { error: `register fail: ${this.data}` });
            return;
          }
          if (a2.default.cid != this.registerResultData.cid)
            s2.default.setSync(s2.default.KEY_ADD_PHONE_INFO_TIME, 0);
          a2.default.cid = this.registerResultData.cid;
          null === (e4 = a2.default.onClientId) || void 0 === e4 || e4.call(a2.default.onClientId, { cid: a2.default.cid });
          s2.default.set({ key: s2.default.KEY_CID, data: a2.default.cid });
          a2.default.session = this.registerResultData.session;
          s2.default.set({ key: s2.default.KEY_SESSION, data: a2.default.session });
          a2.default.deviceId = this.registerResultData.deviceId;
          s2.default.set({ key: s2.default.KEY_DEVICE_ID, data: a2.default.deviceId });
          o2.default.create().send();
        }
      }
      class l2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
          this.cid = "";
          this.session = "";
          this.deviceId = "";
          this.regId = "";
        }
        static parse(t4) {
          let e4 = new l2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          e4.cid = r4.cid;
          e4.session = r4.session;
          e4.deviceId = r4.deviceId;
          e4.regId = r4.regId;
          return e4;
        }
      }
      e3["default"] = c2;
    }, 8947: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(7002));
      const s2 = i3(r3(529));
      const a2 = i3(r3(661));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.serverCloseData = new u2();
        }
        static parse(t4) {
          let e4 = new o2();
          super.parseMsg(e4, t4);
          e4.serverCloseData = u2.parse(e4.data);
          return e4;
        }
        receive() {
          JSON.stringify(this.serverCloseData);
          let t4 = `server close ${this.serverCloseData.code}`;
          if (20 == this.serverCloseData.code || 23 == this.serverCloseData.code || 24 == this.serverCloseData.code) {
            n2.default.allowReconnect = false;
            n2.default.close(t4);
          } else if (21 == this.serverCloseData.code)
            this.safeClose21(t4);
          else {
            n2.default.allowReconnect = true;
            n2.default.close(t4);
            n2.default.reconnect(10);
          }
        }
        safeClose21(t4) {
          try {
            if ("undefined" != typeof document) {
              if (document.hasFocus() && "visible" == document.visibilityState) {
                n2.default.allowReconnect = true;
                n2.default.close(t4);
                n2.default.reconnect(10);
                return;
              }
            }
            n2.default.allowReconnect = false;
            n2.default.close(t4);
          } catch (e4) {
            s2.default.error(`ServerClose t1`, e4);
            n2.default.allowReconnect = false;
            n2.default.close(`${t4} error`);
          }
        }
      }
      class u2 {
        constructor() {
          this.code = -1;
          this.msg = "";
        }
        static parse(t4) {
          let e4 = new u2();
          let r4 = JSON.parse(t4);
          e4.code = r4.code;
          e4.msg = r4.msg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 910: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(8506));
      const s2 = i3(r3(9586));
      class a2 extends s2.default {
        constructor() {
          super(...arguments);
          this.addPhoneInfoResultData = new o2();
        }
        static parse(t4) {
          let e4 = new a2();
          super.parseActionMsg(e4, t4);
          e4.addPhoneInfoResultData = o2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          this.addPhoneInfoResultData;
          let e4 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4)
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: this.addPhoneInfoResultData.errorCode, message: this.addPhoneInfoResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_ADD_PHONE_INFO_TIME, data: new Date().getTime() });
        }
      }
      class o2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t4) {
          let e4 = new o2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          return e4;
        }
      }
      e3["default"] = a2;
    }, 9538: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(8506));
      const s2 = i3(r3(529));
      const a2 = i3(r3(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.bindAliasResultData = new u2();
        }
        static parse(t4) {
          let e4 = new o2();
          super.parseActionMsg(e4, t4);
          e4.bindAliasResultData = u2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          s2.default.info(`bind alias result`, this.bindAliasResultData);
          let e4 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4)
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: this.bindAliasResultData.errorCode, message: this.bindAliasResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: new Date().getTime() });
        }
      }
      class u2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t4) {
          let e4 = new u2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 9479: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = r3(4198);
      const s2 = i3(r3(9586));
      class a2 extends s2.default {
        constructor() {
          super(...arguments);
          this.feedbackResultData = new o2();
        }
        static parse(t4) {
          let e4 = new a2();
          super.parseActionMsg(e4, t4);
          e4.feedbackResultData = o2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          this.feedbackResultData;
          let e4 = s2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4)
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: n2.ErrorCode.SUCCESS, message: "received" });
        }
      }
      class o2 {
        constructor() {
          this.actionId = "";
          this.taskId = "";
          this.result = "";
        }
        static parse(t4) {
          let e4 = new o2();
          let r4 = JSON.parse(t4);
          e4.actionId = r4.actionId;
          e4.taskId = r4.taskId;
          e4.result = r4.result;
          return e4;
        }
      }
      e3["default"] = a2;
    }, 6755: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      var n2;
      Object.defineProperty(e3, "__esModule", { value: true });
      const s2 = i3(r3(6379));
      const a2 = i3(r3(9586));
      const o2 = i3(r3(8723));
      class u2 extends a2.default {
        constructor() {
          super(...arguments);
          this.pushMessageData = new c2();
        }
        static parse(t4) {
          let e4 = new u2();
          super.parseActionMsg(e4, t4);
          e4.pushMessageData = c2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          this.pushMessageData;
          if (this.pushMessageData.appId != s2.default.appid || !this.pushMessageData.messageid || !this.pushMessageData.taskId)
            this.stringify();
          o2.default.create(this, o2.default.ActionId.RECEIVE).send();
          o2.default.create(this, o2.default.ActionId.MP_RECEIVE).send();
          if (this.actionMsgData.msgExtraData && s2.default.onPushMsg)
            null === (t4 = s2.default.onPushMsg) || void 0 === t4 || t4.call(s2.default.onPushMsg, { message: this.actionMsgData.msgExtraData });
        }
      }
      class c2 {
        constructor() {
          this.id = "";
          this.appKey = "";
          this.appId = "";
          this.messageid = "";
          this.taskId = "";
          this.actionChain = [];
          this.cdnType = "";
        }
        static parse(t4) {
          let e4 = new c2();
          let r4 = JSON.parse(t4);
          e4.id = r4.id;
          e4.appKey = r4.appKey;
          e4.appId = r4.appId;
          e4.messageid = r4.messageid;
          e4.taskId = r4.taskId;
          e4.actionChain = r4.actionChain;
          e4.cdnType = r4.cdnType;
          return e4;
        }
      }
      n2 = class {
      }, n2.GO_TO = "goto", n2.TRANSMIT = "transmit";
      e3["default"] = u2;
    }, 9510: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(9586));
      class s2 extends n2.default {
        constructor() {
          super(...arguments);
          this.setModeResultData = new a2();
        }
        static parse(t4) {
          let e4 = new s2();
          super.parseActionMsg(e4, t4);
          e4.setModeResultData = a2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          this.setModeResultData;
          let e4 = n2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4)
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: this.setModeResultData.errorCode, message: this.setModeResultData.errorMsg });
        }
      }
      class a2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t4) {
          let e4 = new a2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          return e4;
        }
      }
      e3["default"] = s2;
    }, 4626: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(8506));
      const s2 = i3(r3(529));
      const a2 = i3(r3(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.setTagResultData = new u2();
        }
        static parse(t4) {
          let e4 = new o2();
          super.parseActionMsg(e4, t4);
          e4.setTagResultData = u2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          s2.default.info(`set tag result`, this.setTagResultData);
          let e4 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4)
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: this.setTagResultData.errorCode, message: this.setTagResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_SET_TAG_TIME, data: new Date().getTime() });
        }
      }
      class u2 {
        constructor() {
          this.errorCode = 0;
          this.errorMsg = "";
        }
        static parse(t4) {
          let e4 = new u2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 7562: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(8506));
      const s2 = i3(r3(529));
      const a2 = i3(r3(9586));
      class o2 extends a2.default {
        constructor() {
          super(...arguments);
          this.unbindAliasResultData = new u2();
        }
        static parse(t4) {
          let e4 = new o2();
          super.parseActionMsg(e4, t4);
          e4.unbindAliasResultData = u2.parse(e4.actionMsgData.msgData);
          return e4;
        }
        receive() {
          var t4;
          s2.default.info(`unbind alias result`, this.unbindAliasResultData);
          let e4 = a2.default.removeWaitingResponseMessage(this.actionMsgData.msgId);
          if (e4)
            null === (t4 = e4.callback) || void 0 === t4 || t4.call(e4.callback, { resultCode: this.unbindAliasResultData.errorCode, message: this.unbindAliasResultData.errorMsg });
          n2.default.set({ key: n2.default.KEY_BIND_ALIAS_TIME, data: new Date().getTime() });
        }
      }
      class u2 {
        constructor() {
          this.errorCode = -1;
          this.errorMsg = "";
        }
        static parse(t4) {
          let e4 = new u2();
          let r4 = JSON.parse(t4);
          e4.errorCode = r4.errorCode;
          e4.errorMsg = r4.errorMsg;
          return e4;
        }
      }
      e3["default"] = o2;
    }, 8227: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        constructor(t4) {
          this.delay = 10;
          this.delay = t4;
        }
        start() {
          this.cancel();
          let t4 = this;
          this.timer = setInterval(function() {
            t4.run();
          }, this.delay);
        }
        cancel() {
          if (this.timer)
            clearInterval(this.timer);
        }
      }
      e3["default"] = r3;
    }, 7167: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      var n2;
      Object.defineProperty(e3, "__esModule", { value: true });
      const s2 = i3(r3(6362));
      const a2 = i3(r3(8227));
      class o2 extends a2.default {
        static getInstance() {
          return o2.InstanceHolder.instance;
        }
        run() {
          s2.default.create().send();
        }
        refresh() {
          this.delay = 60 * 1e3;
          this.start();
        }
      }
      o2.INTERVAL = 60 * 1e3;
      o2.InstanceHolder = (n2 = class {
      }, n2.instance = new o2(o2.INTERVAL), n2);
      e3["default"] = o2;
    }, 2323: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(4736));
      const s2 = i3(r3(6667));
      var a2;
      (function(t4) {
        let e4 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let r4 = (0, n2.default)("9223372036854775808");
        function i4(t5) {
          let e5 = a3(t5);
          let r5 = o2(e5);
          let i5 = r5[1];
          let n3 = r5[0];
          return u2(i5) + u2(n3);
        }
        t4.to_getui = i4;
        function a3(t5) {
          let e5 = s2.default.md5Hex(t5);
          let r5 = c2(e5);
          r5[6] &= 15;
          r5[6] |= 48;
          r5[8] &= 63;
          r5[8] |= 128;
          return r5;
        }
        function o2(t5) {
          let e5 = (0, n2.default)(0);
          let r5 = (0, n2.default)(0);
          for (let r6 = 0; r6 < 8; r6++)
            e5 = e5.multiply(256).plus((0, n2.default)(255 & t5[r6]));
          for (let e6 = 8; e6 < 16; e6++)
            r5 = r5.multiply(256).plus((0, n2.default)(255 & t5[e6]));
          return [e5, r5];
        }
        function u2(t5) {
          if (t5 >= r4)
            t5 = r4.multiply(2).minus(t5);
          let i5 = "";
          for (; t5 > (0, n2.default)(0); t5 = t5.divide(62))
            i5 += e4.charAt(Number(t5.divmod(62).remainder));
          return i5;
        }
        function c2(t5) {
          let e5 = t5.length;
          if (e5 % 2 != 0)
            return [];
          let r5 = new Array();
          for (let i5 = 0; i5 < e5; i5 += 2)
            r5.push(parseInt(t5.substring(i5, i5 + 2), 16));
          return r5;
        }
      })(a2 || (a2 = {}));
      e3["default"] = a2;
    }, 6667: function(t3, e3, r3) {
      var i3 = this && this.__importDefault || function(t4) {
        return t4 && t4.__esModule ? t4 : { default: t4 };
      };
      Object.defineProperty(e3, "__esModule", { value: true });
      const n2 = i3(r3(2620));
      const s2 = i3(r3(1354));
      const a2 = i3(r3(6379));
      var o2;
      (function(t4) {
        let e4;
        let r4;
        let i4;
        let o3;
        let u2 = new n2.default();
        let c2 = s2.default.mode.CBC;
        let l2 = s2.default.pad.Pkcs7;
        let f2 = s2.default.AES;
        t4.algorithmMap = /* @__PURE__ */ new Map([["aes", s2.default.AES]]);
        t4.modeMap = /* @__PURE__ */ new Map([["cbc", s2.default.mode.CBC], ["cfb", s2.default.mode.CFB], ["cfb128", s2.default.mode.CFB], ["ecb", s2.default.mode.ECB], ["ofb", s2.default.mode.OFB]]);
        t4.paddingMap = /* @__PURE__ */ new Map([["nopadding", s2.default.pad.NoPadding], ["pkcs7", s2.default.pad.Pkcs7]]);
        function h2() {
          e4 = s2.default.MD5(new Date().getTime().toString());
          r4 = s2.default.MD5(e4);
          u2.setPublicKey(a2.default.publicKey);
          e4.toString(s2.default.enc.Hex);
          r4.toString(s2.default.enc.Hex);
          i4 = u2.encrypt(e4.toString(s2.default.enc.Hex));
          o3 = u2.encrypt(r4.toString(s2.default.enc.Hex));
        }
        t4.resetKey = h2;
        function d2(e5, r5, i5) {
          f2 = t4.algorithmMap.get(e5);
          c2 = t4.modeMap.get(r5);
          l2 = t4.paddingMap.get(i5);
        }
        t4.setEncryptParams = d2;
        function v2(t5) {
          return f2.encrypt(t5, e4, { iv: r4, mode: c2, padding: l2 }).toString();
        }
        t4.encrypt = v2;
        function p2(t5) {
          return f2.decrypt(t5, e4, { iv: r4, mode: c2, padding: l2 }).toString(s2.default.enc.Utf8);
        }
        t4.decrypt = p2;
        function g2(t5) {
          return s2.default.SHA256(t5).toString(s2.default.enc.Base64);
        }
        t4.sha256 = g2;
        function y2(t5) {
          return s2.default.MD5(t5).toString(s2.default.enc.Hex);
        }
        t4.md5Hex = y2;
        function m2() {
          return i4 ? i4 : "";
        }
        t4.getEncryptedSecretKey = m2;
        function w2() {
          return o3 ? o3 : "";
        }
        t4.getEncryptedIV = w2;
      })(o2 || (o2 = {}));
      e3["default"] = o2;
    }, 529: (t3, e3) => {
      Object.defineProperty(e3, "__esModule", { value: true });
      class r3 {
        static info(...t4) {
          if (this.debugMode)
            console.info(`[GtPush]`, t4);
        }
        static warn(...t4) {
          console.warn(`[GtPush]`, t4);
        }
        static error(...t4) {
          console.error(`[GtPush]`, t4);
        }
      }
      r3.debugMode = false;
      e3["default"] = r3;
    }, 2620: (t3, e3, r3) => {
      r3.r(e3);
      r3.d(e3, { JSEncrypt: () => wt2, default: () => _t2 });
      var i3 = "0123456789abcdefghijklmnopqrstuvwxyz";
      function n2(t4) {
        return i3.charAt(t4);
      }
      function s2(t4, e4) {
        return t4 & e4;
      }
      function a2(t4, e4) {
        return t4 | e4;
      }
      function o2(t4, e4) {
        return t4 ^ e4;
      }
      function u2(t4, e4) {
        return t4 & ~e4;
      }
      function c2(t4) {
        if (0 == t4)
          return -1;
        var e4 = 0;
        if (0 == (65535 & t4)) {
          t4 >>= 16;
          e4 += 16;
        }
        if (0 == (255 & t4)) {
          t4 >>= 8;
          e4 += 8;
        }
        if (0 == (15 & t4)) {
          t4 >>= 4;
          e4 += 4;
        }
        if (0 == (3 & t4)) {
          t4 >>= 2;
          e4 += 2;
        }
        if (0 == (1 & t4))
          ++e4;
        return e4;
      }
      function l2(t4) {
        var e4 = 0;
        while (0 != t4) {
          t4 &= t4 - 1;
          ++e4;
        }
        return e4;
      }
      var f2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      var h2 = "=";
      function d2(t4) {
        var e4;
        var r4;
        var i4 = "";
        for (e4 = 0; e4 + 3 <= t4.length; e4 += 3) {
          r4 = parseInt(t4.substring(e4, e4 + 3), 16);
          i4 += f2.charAt(r4 >> 6) + f2.charAt(63 & r4);
        }
        if (e4 + 1 == t4.length) {
          r4 = parseInt(t4.substring(e4, e4 + 1), 16);
          i4 += f2.charAt(r4 << 2);
        } else if (e4 + 2 == t4.length) {
          r4 = parseInt(t4.substring(e4, e4 + 2), 16);
          i4 += f2.charAt(r4 >> 2) + f2.charAt((3 & r4) << 4);
        }
        while ((3 & i4.length) > 0)
          i4 += h2;
        return i4;
      }
      function v2(t4) {
        var e4 = "";
        var r4;
        var i4 = 0;
        var s3 = 0;
        for (r4 = 0; r4 < t4.length; ++r4) {
          if (t4.charAt(r4) == h2)
            break;
          var a3 = f2.indexOf(t4.charAt(r4));
          if (a3 < 0)
            continue;
          if (0 == i4) {
            e4 += n2(a3 >> 2);
            s3 = 3 & a3;
            i4 = 1;
          } else if (1 == i4) {
            e4 += n2(s3 << 2 | a3 >> 4);
            s3 = 15 & a3;
            i4 = 2;
          } else if (2 == i4) {
            e4 += n2(s3);
            e4 += n2(a3 >> 2);
            s3 = 3 & a3;
            i4 = 3;
          } else {
            e4 += n2(s3 << 2 | a3 >> 4);
            e4 += n2(15 & a3);
            i4 = 0;
          }
        }
        if (1 == i4)
          e4 += n2(s3 << 2);
        return e4;
      }
      var g2;
      var y2 = { decode: function(t4) {
        var e4;
        if (void 0 === g2) {
          var r4 = "0123456789ABCDEF";
          var i4 = " \f\n\r	 \u2028\u2029";
          g2 = {};
          for (e4 = 0; e4 < 16; ++e4)
            g2[r4.charAt(e4)] = e4;
          r4 = r4.toLowerCase();
          for (e4 = 10; e4 < 16; ++e4)
            g2[r4.charAt(e4)] = e4;
          for (e4 = 0; e4 < i4.length; ++e4)
            g2[i4.charAt(e4)] = -1;
        }
        var n3 = [];
        var s3 = 0;
        var a3 = 0;
        for (e4 = 0; e4 < t4.length; ++e4) {
          var o3 = t4.charAt(e4);
          if ("=" == o3)
            break;
          o3 = g2[o3];
          if (-1 == o3)
            continue;
          if (void 0 === o3)
            throw new Error("Illegal character at offset " + e4);
          s3 |= o3;
          if (++a3 >= 2) {
            n3[n3.length] = s3;
            s3 = 0;
            a3 = 0;
          } else
            s3 <<= 4;
        }
        if (a3)
          throw new Error("Hex encoding incomplete: 4 bits missing");
        return n3;
      } };
      var m2;
      var w2 = { decode: function(t4) {
        var e4;
        if (void 0 === m2) {
          var r4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          var i4 = "= \f\n\r	 \u2028\u2029";
          m2 = /* @__PURE__ */ Object.create(null);
          for (e4 = 0; e4 < 64; ++e4)
            m2[r4.charAt(e4)] = e4;
          m2["-"] = 62;
          m2["_"] = 63;
          for (e4 = 0; e4 < i4.length; ++e4)
            m2[i4.charAt(e4)] = -1;
        }
        var n3 = [];
        var s3 = 0;
        var a3 = 0;
        for (e4 = 0; e4 < t4.length; ++e4) {
          var o3 = t4.charAt(e4);
          if ("=" == o3)
            break;
          o3 = m2[o3];
          if (-1 == o3)
            continue;
          if (void 0 === o3)
            throw new Error("Illegal character at offset " + e4);
          s3 |= o3;
          if (++a3 >= 4) {
            n3[n3.length] = s3 >> 16;
            n3[n3.length] = s3 >> 8 & 255;
            n3[n3.length] = 255 & s3;
            s3 = 0;
            a3 = 0;
          } else
            s3 <<= 6;
        }
        switch (a3) {
          case 1:
            throw new Error("Base64 encoding incomplete: at least 2 bits missing");
          case 2:
            n3[n3.length] = s3 >> 10;
            break;
          case 3:
            n3[n3.length] = s3 >> 16;
            n3[n3.length] = s3 >> 8 & 255;
            break;
        }
        return n3;
      }, re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/, unarmor: function(t4) {
        var e4 = w2.re.exec(t4);
        if (e4)
          if (e4[1])
            t4 = e4[1];
          else if (e4[2])
            t4 = e4[2];
          else
            throw new Error("RegExp out of sync");
        return w2.decode(t4);
      } };
      var _2 = 1e13;
      var S2 = function() {
        function t4(t5) {
          this.buf = [+t5 || 0];
        }
        t4.prototype.mulAdd = function(t5, e4) {
          var r4 = this.buf;
          var i4 = r4.length;
          var n3;
          var s3;
          for (n3 = 0; n3 < i4; ++n3) {
            s3 = r4[n3] * t5 + e4;
            if (s3 < _2)
              e4 = 0;
            else {
              e4 = 0 | s3 / _2;
              s3 -= e4 * _2;
            }
            r4[n3] = s3;
          }
          if (e4 > 0)
            r4[n3] = e4;
        };
        t4.prototype.sub = function(t5) {
          var e4 = this.buf;
          var r4 = e4.length;
          var i4;
          var n3;
          for (i4 = 0; i4 < r4; ++i4) {
            n3 = e4[i4] - t5;
            if (n3 < 0) {
              n3 += _2;
              t5 = 1;
            } else
              t5 = 0;
            e4[i4] = n3;
          }
          while (0 === e4[e4.length - 1])
            e4.pop();
        };
        t4.prototype.toString = function(t5) {
          if (10 != (t5 || 10))
            throw new Error("only base 10 is supported");
          var e4 = this.buf;
          var r4 = e4[e4.length - 1].toString();
          for (var i4 = e4.length - 2; i4 >= 0; --i4)
            r4 += (_2 + e4[i4]).toString().substring(1);
          return r4;
        };
        t4.prototype.valueOf = function() {
          var t5 = this.buf;
          var e4 = 0;
          for (var r4 = t5.length - 1; r4 >= 0; --r4)
            e4 = e4 * _2 + t5[r4];
          return e4;
        };
        t4.prototype.simplify = function() {
          var t5 = this.buf;
          return 1 == t5.length ? t5[0] : this;
        };
        return t4;
      }();
      var b2 = "…";
      var E2 = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      var D2 = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
      function T(t4, e4) {
        if (t4.length > e4)
          t4 = t4.substring(0, e4) + b2;
        return t4;
      }
      var M2 = function() {
        function t4(e4, r4) {
          this.hexDigits = "0123456789ABCDEF";
          if (e4 instanceof t4) {
            this.enc = e4.enc;
            this.pos = e4.pos;
          } else {
            this.enc = e4;
            this.pos = r4;
          }
        }
        t4.prototype.get = function(t5) {
          if (void 0 === t5)
            t5 = this.pos++;
          if (t5 >= this.enc.length)
            throw new Error("Requesting byte offset " + t5 + " on a stream of length " + this.enc.length);
          return "string" === typeof this.enc ? this.enc.charCodeAt(t5) : this.enc[t5];
        };
        t4.prototype.hexByte = function(t5) {
          return this.hexDigits.charAt(t5 >> 4 & 15) + this.hexDigits.charAt(15 & t5);
        };
        t4.prototype.hexDump = function(t5, e4, r4) {
          var i4 = "";
          for (var n3 = t5; n3 < e4; ++n3) {
            i4 += this.hexByte(this.get(n3));
            if (true !== r4)
              switch (15 & n3) {
                case 7:
                  i4 += "  ";
                  break;
                case 15:
                  i4 += "\n";
                  break;
                default:
                  i4 += " ";
              }
          }
          return i4;
        };
        t4.prototype.isASCII = function(t5, e4) {
          for (var r4 = t5; r4 < e4; ++r4) {
            var i4 = this.get(r4);
            if (i4 < 32 || i4 > 176)
              return false;
          }
          return true;
        };
        t4.prototype.parseStringISO = function(t5, e4) {
          var r4 = "";
          for (var i4 = t5; i4 < e4; ++i4)
            r4 += String.fromCharCode(this.get(i4));
          return r4;
        };
        t4.prototype.parseStringUTF = function(t5, e4) {
          var r4 = "";
          for (var i4 = t5; i4 < e4; ) {
            var n3 = this.get(i4++);
            if (n3 < 128)
              r4 += String.fromCharCode(n3);
            else if (n3 > 191 && n3 < 224)
              r4 += String.fromCharCode((31 & n3) << 6 | 63 & this.get(i4++));
            else
              r4 += String.fromCharCode((15 & n3) << 12 | (63 & this.get(i4++)) << 6 | 63 & this.get(i4++));
          }
          return r4;
        };
        t4.prototype.parseStringBMP = function(t5, e4) {
          var r4 = "";
          var i4;
          var n3;
          for (var s3 = t5; s3 < e4; ) {
            i4 = this.get(s3++);
            n3 = this.get(s3++);
            r4 += String.fromCharCode(i4 << 8 | n3);
          }
          return r4;
        };
        t4.prototype.parseTime = function(t5, e4, r4) {
          var i4 = this.parseStringISO(t5, e4);
          var n3 = (r4 ? E2 : D2).exec(i4);
          if (!n3)
            return "Unrecognized time: " + i4;
          if (r4) {
            n3[1] = +n3[1];
            n3[1] += +n3[1] < 70 ? 2e3 : 1900;
          }
          i4 = n3[1] + "-" + n3[2] + "-" + n3[3] + " " + n3[4];
          if (n3[5]) {
            i4 += ":" + n3[5];
            if (n3[6]) {
              i4 += ":" + n3[6];
              if (n3[7])
                i4 += "." + n3[7];
            }
          }
          if (n3[8]) {
            i4 += " UTC";
            if ("Z" != n3[8]) {
              i4 += n3[8];
              if (n3[9])
                i4 += ":" + n3[9];
            }
          }
          return i4;
        };
        t4.prototype.parseInteger = function(t5, e4) {
          var r4 = this.get(t5);
          var i4 = r4 > 127;
          var n3 = i4 ? 255 : 0;
          var s3;
          var a3 = "";
          while (r4 == n3 && ++t5 < e4)
            r4 = this.get(t5);
          s3 = e4 - t5;
          if (0 === s3)
            return i4 ? -1 : 0;
          if (s3 > 4) {
            a3 = r4;
            s3 <<= 3;
            while (0 == (128 & (+a3 ^ n3))) {
              a3 = +a3 << 1;
              --s3;
            }
            a3 = "(" + s3 + " bit)\n";
          }
          if (i4)
            r4 -= 256;
          var o3 = new S2(r4);
          for (var u3 = t5 + 1; u3 < e4; ++u3)
            o3.mulAdd(256, this.get(u3));
          return a3 + o3.toString();
        };
        t4.prototype.parseBitString = function(t5, e4, r4) {
          var i4 = this.get(t5);
          var n3 = (e4 - t5 - 1 << 3) - i4;
          var s3 = "(" + n3 + " bit)\n";
          var a3 = "";
          for (var o3 = t5 + 1; o3 < e4; ++o3) {
            var u3 = this.get(o3);
            var c3 = o3 == e4 - 1 ? i4 : 0;
            for (var l3 = 7; l3 >= c3; --l3)
              a3 += u3 >> l3 & 1 ? "1" : "0";
            if (a3.length > r4)
              return s3 + T(a3, r4);
          }
          return s3 + a3;
        };
        t4.prototype.parseOctetString = function(t5, e4, r4) {
          if (this.isASCII(t5, e4))
            return T(this.parseStringISO(t5, e4), r4);
          var i4 = e4 - t5;
          var n3 = "(" + i4 + " byte)\n";
          r4 /= 2;
          if (i4 > r4)
            e4 = t5 + r4;
          for (var s3 = t5; s3 < e4; ++s3)
            n3 += this.hexByte(this.get(s3));
          if (i4 > r4)
            n3 += b2;
          return n3;
        };
        t4.prototype.parseOID = function(t5, e4, r4) {
          var i4 = "";
          var n3 = new S2();
          var s3 = 0;
          for (var a3 = t5; a3 < e4; ++a3) {
            var o3 = this.get(a3);
            n3.mulAdd(128, 127 & o3);
            s3 += 7;
            if (!(128 & o3)) {
              if ("" === i4) {
                n3 = n3.simplify();
                if (n3 instanceof S2) {
                  n3.sub(80);
                  i4 = "2." + n3.toString();
                } else {
                  var u3 = n3 < 80 ? n3 < 40 ? 0 : 1 : 2;
                  i4 = u3 + "." + (n3 - 40 * u3);
                }
              } else
                i4 += "." + n3.toString();
              if (i4.length > r4)
                return T(i4, r4);
              n3 = new S2();
              s3 = 0;
            }
          }
          if (s3 > 0)
            i4 += ".incomplete";
          return i4;
        };
        return t4;
      }();
      var I2 = function() {
        function t4(t5, e4, r4, i4, n3) {
          if (!(i4 instanceof A2))
            throw new Error("Invalid tag value.");
          this.stream = t5;
          this.header = e4;
          this.length = r4;
          this.tag = i4;
          this.sub = n3;
        }
        t4.prototype.typeName = function() {
          switch (this.tag.tagClass) {
            case 0:
              switch (this.tag.tagNumber) {
                case 0:
                  return "EOC";
                case 1:
                  return "BOOLEAN";
                case 2:
                  return "INTEGER";
                case 3:
                  return "BIT_STRING";
                case 4:
                  return "OCTET_STRING";
                case 5:
                  return "NULL";
                case 6:
                  return "OBJECT_IDENTIFIER";
                case 7:
                  return "ObjectDescriptor";
                case 8:
                  return "EXTERNAL";
                case 9:
                  return "REAL";
                case 10:
                  return "ENUMERATED";
                case 11:
                  return "EMBEDDED_PDV";
                case 12:
                  return "UTF8String";
                case 16:
                  return "SEQUENCE";
                case 17:
                  return "SET";
                case 18:
                  return "NumericString";
                case 19:
                  return "PrintableString";
                case 20:
                  return "TeletexString";
                case 21:
                  return "VideotexString";
                case 22:
                  return "IA5String";
                case 23:
                  return "UTCTime";
                case 24:
                  return "GeneralizedTime";
                case 25:
                  return "GraphicString";
                case 26:
                  return "VisibleString";
                case 27:
                  return "GeneralString";
                case 28:
                  return "UniversalString";
                case 30:
                  return "BMPString";
              }
              return "Universal_" + this.tag.tagNumber.toString();
            case 1:
              return "Application_" + this.tag.tagNumber.toString();
            case 2:
              return "[" + this.tag.tagNumber.toString() + "]";
            case 3:
              return "Private_" + this.tag.tagNumber.toString();
          }
        };
        t4.prototype.content = function(t5) {
          if (void 0 === this.tag)
            return null;
          if (void 0 === t5)
            t5 = 1 / 0;
          var e4 = this.posContent();
          var r4 = Math.abs(this.length);
          if (!this.tag.isUniversal()) {
            if (null !== this.sub)
              return "(" + this.sub.length + " elem)";
            return this.stream.parseOctetString(e4, e4 + r4, t5);
          }
          switch (this.tag.tagNumber) {
            case 1:
              return 0 === this.stream.get(e4) ? "false" : "true";
            case 2:
              return this.stream.parseInteger(e4, e4 + r4);
            case 3:
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e4, e4 + r4, t5);
            case 4:
              return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e4, e4 + r4, t5);
            case 6:
              return this.stream.parseOID(e4, e4 + r4, t5);
            case 16:
            case 17:
              if (null !== this.sub)
                return "(" + this.sub.length + " elem)";
              else
                return "(no elem)";
            case 12:
              return T(this.stream.parseStringUTF(e4, e4 + r4), t5);
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 26:
              return T(this.stream.parseStringISO(e4, e4 + r4), t5);
            case 30:
              return T(this.stream.parseStringBMP(e4, e4 + r4), t5);
            case 23:
            case 24:
              return this.stream.parseTime(e4, e4 + r4, 23 == this.tag.tagNumber);
          }
          return null;
        };
        t4.prototype.toString = function() {
          return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]";
        };
        t4.prototype.toPrettyString = function(t5) {
          if (void 0 === t5)
            t5 = "";
          var e4 = t5 + this.typeName() + " @" + this.stream.pos;
          if (this.length >= 0)
            e4 += "+";
          e4 += this.length;
          if (this.tag.tagConstructed)
            e4 += " (constructed)";
          else if (this.tag.isUniversal() && (3 == this.tag.tagNumber || 4 == this.tag.tagNumber) && null !== this.sub)
            e4 += " (encapsulates)";
          e4 += "\n";
          if (null !== this.sub) {
            t5 += "  ";
            for (var r4 = 0, i4 = this.sub.length; r4 < i4; ++r4)
              e4 += this.sub[r4].toPrettyString(t5);
          }
          return e4;
        };
        t4.prototype.posStart = function() {
          return this.stream.pos;
        };
        t4.prototype.posContent = function() {
          return this.stream.pos + this.header;
        };
        t4.prototype.posEnd = function() {
          return this.stream.pos + this.header + Math.abs(this.length);
        };
        t4.prototype.toHexString = function() {
          return this.stream.hexDump(this.posStart(), this.posEnd(), true);
        };
        t4.decodeLength = function(t5) {
          var e4 = t5.get();
          var r4 = 127 & e4;
          if (r4 == e4)
            return r4;
          if (r4 > 6)
            throw new Error("Length over 48 bits not supported at position " + (t5.pos - 1));
          if (0 === r4)
            return null;
          e4 = 0;
          for (var i4 = 0; i4 < r4; ++i4)
            e4 = 256 * e4 + t5.get();
          return e4;
        };
        t4.prototype.getHexStringValue = function() {
          var t5 = this.toHexString();
          var e4 = 2 * this.header;
          var r4 = 2 * this.length;
          return t5.substr(e4, r4);
        };
        t4.decode = function(e4) {
          var r4;
          if (!(e4 instanceof M2))
            r4 = new M2(e4, 0);
          else
            r4 = e4;
          var i4 = new M2(r4);
          var n3 = new A2(r4);
          var s3 = t4.decodeLength(r4);
          var a3 = r4.pos;
          var o3 = a3 - i4.pos;
          var u3 = null;
          var c3 = function() {
            var e5 = [];
            if (null !== s3) {
              var i5 = a3 + s3;
              while (r4.pos < i5)
                e5[e5.length] = t4.decode(r4);
              if (r4.pos != i5)
                throw new Error("Content size is not correct for container starting at offset " + a3);
            } else
              try {
                for (; ; ) {
                  var n4 = t4.decode(r4);
                  if (n4.tag.isEOC())
                    break;
                  e5[e5.length] = n4;
                }
                s3 = a3 - r4.pos;
              } catch (t5) {
                throw new Error("Exception while decoding undefined length content: " + t5);
              }
            return e5;
          };
          if (n3.tagConstructed)
            u3 = c3();
          else if (n3.isUniversal() && (3 == n3.tagNumber || 4 == n3.tagNumber))
            try {
              if (3 == n3.tagNumber) {
                if (0 != r4.get())
                  throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
              }
              u3 = c3();
              for (var l3 = 0; l3 < u3.length; ++l3)
                if (u3[l3].tag.isEOC())
                  throw new Error("EOC is not supposed to be actual content.");
            } catch (t5) {
              u3 = null;
            }
          if (null === u3) {
            if (null === s3)
              throw new Error("We can't skip over an invalid tag with undefined length at offset " + a3);
            r4.pos = a3 + Math.abs(s3);
          }
          return new t4(i4, o3, s3, n3, u3);
        };
        return t4;
      }();
      var A2 = function() {
        function t4(t5) {
          var e4 = t5.get();
          this.tagClass = e4 >> 6;
          this.tagConstructed = 0 !== (32 & e4);
          this.tagNumber = 31 & e4;
          if (31 == this.tagNumber) {
            var r4 = new S2();
            do {
              e4 = t5.get();
              r4.mulAdd(128, 127 & e4);
            } while (128 & e4);
            this.tagNumber = r4.simplify();
          }
        }
        t4.prototype.isUniversal = function() {
          return 0 === this.tagClass;
        };
        t4.prototype.isEOC = function() {
          return 0 === this.tagClass && 0 === this.tagNumber;
        };
        return t4;
      }();
      var x2;
      var R2 = 244837814094590;
      var B2 = 15715070 == (16777215 & R2);
      var O = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
      var k2 = (1 << 26) / O[O.length - 1];
      var C2 = function() {
        function t4(t5, e4, r4) {
          if (null != t5)
            if ("number" == typeof t5)
              this.fromNumber(t5, e4, r4);
            else if (null == e4 && "string" != typeof t5)
              this.fromString(t5, 256);
            else
              this.fromString(t5, e4);
        }
        t4.prototype.toString = function(t5) {
          if (this.s < 0)
            return "-" + this.negate().toString(t5);
          var e4;
          if (16 == t5)
            e4 = 4;
          else if (8 == t5)
            e4 = 3;
          else if (2 == t5)
            e4 = 1;
          else if (32 == t5)
            e4 = 5;
          else if (4 == t5)
            e4 = 2;
          else
            return this.toRadix(t5);
          var r4 = (1 << e4) - 1;
          var i4;
          var s3 = false;
          var a3 = "";
          var o3 = this.t;
          var u3 = this.DB - o3 * this.DB % e4;
          if (o3-- > 0) {
            if (u3 < this.DB && (i4 = this[o3] >> u3) > 0) {
              s3 = true;
              a3 = n2(i4);
            }
            while (o3 >= 0) {
              if (u3 < e4) {
                i4 = (this[o3] & (1 << u3) - 1) << e4 - u3;
                i4 |= this[--o3] >> (u3 += this.DB - e4);
              } else {
                i4 = this[o3] >> (u3 -= e4) & r4;
                if (u3 <= 0) {
                  u3 += this.DB;
                  --o3;
                }
              }
              if (i4 > 0)
                s3 = true;
              if (s3)
                a3 += n2(i4);
            }
          }
          return s3 ? a3 : "0";
        };
        t4.prototype.negate = function() {
          var e4 = H2();
          t4.ZERO.subTo(this, e4);
          return e4;
        };
        t4.prototype.abs = function() {
          return this.s < 0 ? this.negate() : this;
        };
        t4.prototype.compareTo = function(t5) {
          var e4 = this.s - t5.s;
          if (0 != e4)
            return e4;
          var r4 = this.t;
          e4 = r4 - t5.t;
          if (0 != e4)
            return this.s < 0 ? -e4 : e4;
          while (--r4 >= 0)
            if (0 != (e4 = this[r4] - t5[r4]))
              return e4;
          return 0;
        };
        t4.prototype.bitLength = function() {
          if (this.t <= 0)
            return 0;
          return this.DB * (this.t - 1) + W2(this[this.t - 1] ^ this.s & this.DM);
        };
        t4.prototype.mod = function(e4) {
          var r4 = H2();
          this.abs().divRemTo(e4, null, r4);
          if (this.s < 0 && r4.compareTo(t4.ZERO) > 0)
            e4.subTo(r4, r4);
          return r4;
        };
        t4.prototype.modPowInt = function(t5, e4) {
          var r4;
          if (t5 < 256 || e4.isEven())
            r4 = new P2(e4);
          else
            r4 = new V2(e4);
          return this.exp(t5, r4);
        };
        t4.prototype.clone = function() {
          var t5 = H2();
          this.copyTo(t5);
          return t5;
        };
        t4.prototype.intValue = function() {
          if (this.s < 0) {
            if (1 == this.t)
              return this[0] - this.DV;
            else if (0 == this.t)
              return -1;
          } else if (1 == this.t)
            return this[0];
          else if (0 == this.t)
            return 0;
          return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
        };
        t4.prototype.byteValue = function() {
          return 0 == this.t ? this.s : this[0] << 24 >> 24;
        };
        t4.prototype.shortValue = function() {
          return 0 == this.t ? this.s : this[0] << 16 >> 16;
        };
        t4.prototype.signum = function() {
          if (this.s < 0)
            return -1;
          else if (this.t <= 0 || 1 == this.t && this[0] <= 0)
            return 0;
          else
            return 1;
        };
        t4.prototype.toByteArray = function() {
          var t5 = this.t;
          var e4 = [];
          e4[0] = this.s;
          var r4 = this.DB - t5 * this.DB % 8;
          var i4;
          var n3 = 0;
          if (t5-- > 0) {
            if (r4 < this.DB && (i4 = this[t5] >> r4) != (this.s & this.DM) >> r4)
              e4[n3++] = i4 | this.s << this.DB - r4;
            while (t5 >= 0) {
              if (r4 < 8) {
                i4 = (this[t5] & (1 << r4) - 1) << 8 - r4;
                i4 |= this[--t5] >> (r4 += this.DB - 8);
              } else {
                i4 = this[t5] >> (r4 -= 8) & 255;
                if (r4 <= 0) {
                  r4 += this.DB;
                  --t5;
                }
              }
              if (0 != (128 & i4))
                i4 |= -256;
              if (0 == n3 && (128 & this.s) != (128 & i4))
                ++n3;
              if (n3 > 0 || i4 != this.s)
                e4[n3++] = i4;
            }
          }
          return e4;
        };
        t4.prototype.equals = function(t5) {
          return 0 == this.compareTo(t5);
        };
        t4.prototype.min = function(t5) {
          return this.compareTo(t5) < 0 ? this : t5;
        };
        t4.prototype.max = function(t5) {
          return this.compareTo(t5) > 0 ? this : t5;
        };
        t4.prototype.and = function(t5) {
          var e4 = H2();
          this.bitwiseTo(t5, s2, e4);
          return e4;
        };
        t4.prototype.or = function(t5) {
          var e4 = H2();
          this.bitwiseTo(t5, a2, e4);
          return e4;
        };
        t4.prototype.xor = function(t5) {
          var e4 = H2();
          this.bitwiseTo(t5, o2, e4);
          return e4;
        };
        t4.prototype.andNot = function(t5) {
          var e4 = H2();
          this.bitwiseTo(t5, u2, e4);
          return e4;
        };
        t4.prototype.not = function() {
          var t5 = H2();
          for (var e4 = 0; e4 < this.t; ++e4)
            t5[e4] = this.DM & ~this[e4];
          t5.t = this.t;
          t5.s = ~this.s;
          return t5;
        };
        t4.prototype.shiftLeft = function(t5) {
          var e4 = H2();
          if (t5 < 0)
            this.rShiftTo(-t5, e4);
          else
            this.lShiftTo(t5, e4);
          return e4;
        };
        t4.prototype.shiftRight = function(t5) {
          var e4 = H2();
          if (t5 < 0)
            this.lShiftTo(-t5, e4);
          else
            this.rShiftTo(t5, e4);
          return e4;
        };
        t4.prototype.getLowestSetBit = function() {
          for (var t5 = 0; t5 < this.t; ++t5)
            if (0 != this[t5])
              return t5 * this.DB + c2(this[t5]);
          if (this.s < 0)
            return this.t * this.DB;
          return -1;
        };
        t4.prototype.bitCount = function() {
          var t5 = 0;
          var e4 = this.s & this.DM;
          for (var r4 = 0; r4 < this.t; ++r4)
            t5 += l2(this[r4] ^ e4);
          return t5;
        };
        t4.prototype.testBit = function(t5) {
          var e4 = Math.floor(t5 / this.DB);
          if (e4 >= this.t)
            return 0 != this.s;
          return 0 != (this[e4] & 1 << t5 % this.DB);
        };
        t4.prototype.setBit = function(t5) {
          return this.changeBit(t5, a2);
        };
        t4.prototype.clearBit = function(t5) {
          return this.changeBit(t5, u2);
        };
        t4.prototype.flipBit = function(t5) {
          return this.changeBit(t5, o2);
        };
        t4.prototype.add = function(t5) {
          var e4 = H2();
          this.addTo(t5, e4);
          return e4;
        };
        t4.prototype.subtract = function(t5) {
          var e4 = H2();
          this.subTo(t5, e4);
          return e4;
        };
        t4.prototype.multiply = function(t5) {
          var e4 = H2();
          this.multiplyTo(t5, e4);
          return e4;
        };
        t4.prototype.divide = function(t5) {
          var e4 = H2();
          this.divRemTo(t5, e4, null);
          return e4;
        };
        t4.prototype.remainder = function(t5) {
          var e4 = H2();
          this.divRemTo(t5, null, e4);
          return e4;
        };
        t4.prototype.divideAndRemainder = function(t5) {
          var e4 = H2();
          var r4 = H2();
          this.divRemTo(t5, e4, r4);
          return [e4, r4];
        };
        t4.prototype.modPow = function(t5, e4) {
          var r4 = t5.bitLength();
          var i4;
          var n3 = Y2(1);
          var s3;
          if (r4 <= 0)
            return n3;
          else if (r4 < 18)
            i4 = 1;
          else if (r4 < 48)
            i4 = 3;
          else if (r4 < 144)
            i4 = 4;
          else if (r4 < 768)
            i4 = 5;
          else
            i4 = 6;
          if (r4 < 8)
            s3 = new P2(e4);
          else if (e4.isEven())
            s3 = new L2(e4);
          else
            s3 = new V2(e4);
          var a3 = [];
          var o3 = 3;
          var u3 = i4 - 1;
          var c3 = (1 << i4) - 1;
          a3[1] = s3.convert(this);
          if (i4 > 1) {
            var l3 = H2();
            s3.sqrTo(a3[1], l3);
            while (o3 <= c3) {
              a3[o3] = H2();
              s3.mulTo(l3, a3[o3 - 2], a3[o3]);
              o3 += 2;
            }
          }
          var f3 = t5.t - 1;
          var h3;
          var d3 = true;
          var v3 = H2();
          var p2;
          r4 = W2(t5[f3]) - 1;
          while (f3 >= 0) {
            if (r4 >= u3)
              h3 = t5[f3] >> r4 - u3 & c3;
            else {
              h3 = (t5[f3] & (1 << r4 + 1) - 1) << u3 - r4;
              if (f3 > 0)
                h3 |= t5[f3 - 1] >> this.DB + r4 - u3;
            }
            o3 = i4;
            while (0 == (1 & h3)) {
              h3 >>= 1;
              --o3;
            }
            if ((r4 -= o3) < 0) {
              r4 += this.DB;
              --f3;
            }
            if (d3) {
              a3[h3].copyTo(n3);
              d3 = false;
            } else {
              while (o3 > 1) {
                s3.sqrTo(n3, v3);
                s3.sqrTo(v3, n3);
                o3 -= 2;
              }
              if (o3 > 0)
                s3.sqrTo(n3, v3);
              else {
                p2 = n3;
                n3 = v3;
                v3 = p2;
              }
              s3.mulTo(v3, a3[h3], n3);
            }
            while (f3 >= 0 && 0 == (t5[f3] & 1 << r4)) {
              s3.sqrTo(n3, v3);
              p2 = n3;
              n3 = v3;
              v3 = p2;
              if (--r4 < 0) {
                r4 = this.DB - 1;
                --f3;
              }
            }
          }
          return s3.revert(n3);
        };
        t4.prototype.modInverse = function(e4) {
          var r4 = e4.isEven();
          if (this.isEven() && r4 || 0 == e4.signum())
            return t4.ZERO;
          var i4 = e4.clone();
          var n3 = this.clone();
          var s3 = Y2(1);
          var a3 = Y2(0);
          var o3 = Y2(0);
          var u3 = Y2(1);
          while (0 != i4.signum()) {
            while (i4.isEven()) {
              i4.rShiftTo(1, i4);
              if (r4) {
                if (!s3.isEven() || !a3.isEven()) {
                  s3.addTo(this, s3);
                  a3.subTo(e4, a3);
                }
                s3.rShiftTo(1, s3);
              } else if (!a3.isEven())
                a3.subTo(e4, a3);
              a3.rShiftTo(1, a3);
            }
            while (n3.isEven()) {
              n3.rShiftTo(1, n3);
              if (r4) {
                if (!o3.isEven() || !u3.isEven()) {
                  o3.addTo(this, o3);
                  u3.subTo(e4, u3);
                }
                o3.rShiftTo(1, o3);
              } else if (!u3.isEven())
                u3.subTo(e4, u3);
              u3.rShiftTo(1, u3);
            }
            if (i4.compareTo(n3) >= 0) {
              i4.subTo(n3, i4);
              if (r4)
                s3.subTo(o3, s3);
              a3.subTo(u3, a3);
            } else {
              n3.subTo(i4, n3);
              if (r4)
                o3.subTo(s3, o3);
              u3.subTo(a3, u3);
            }
          }
          if (0 != n3.compareTo(t4.ONE))
            return t4.ZERO;
          if (u3.compareTo(e4) >= 0)
            return u3.subtract(e4);
          if (u3.signum() < 0)
            u3.addTo(e4, u3);
          else
            return u3;
          if (u3.signum() < 0)
            return u3.add(e4);
          else
            return u3;
        };
        t4.prototype.pow = function(t5) {
          return this.exp(t5, new N2());
        };
        t4.prototype.gcd = function(t5) {
          var e4 = this.s < 0 ? this.negate() : this.clone();
          var r4 = t5.s < 0 ? t5.negate() : t5.clone();
          if (e4.compareTo(r4) < 0) {
            var i4 = e4;
            e4 = r4;
            r4 = i4;
          }
          var n3 = e4.getLowestSetBit();
          var s3 = r4.getLowestSetBit();
          if (s3 < 0)
            return e4;
          if (n3 < s3)
            s3 = n3;
          if (s3 > 0) {
            e4.rShiftTo(s3, e4);
            r4.rShiftTo(s3, r4);
          }
          while (e4.signum() > 0) {
            if ((n3 = e4.getLowestSetBit()) > 0)
              e4.rShiftTo(n3, e4);
            if ((n3 = r4.getLowestSetBit()) > 0)
              r4.rShiftTo(n3, r4);
            if (e4.compareTo(r4) >= 0) {
              e4.subTo(r4, e4);
              e4.rShiftTo(1, e4);
            } else {
              r4.subTo(e4, r4);
              r4.rShiftTo(1, r4);
            }
          }
          if (s3 > 0)
            r4.lShiftTo(s3, r4);
          return r4;
        };
        t4.prototype.isProbablePrime = function(t5) {
          var e4;
          var r4 = this.abs();
          if (1 == r4.t && r4[0] <= O[O.length - 1]) {
            for (e4 = 0; e4 < O.length; ++e4)
              if (r4[0] == O[e4])
                return true;
            return false;
          }
          if (r4.isEven())
            return false;
          e4 = 1;
          while (e4 < O.length) {
            var i4 = O[e4];
            var n3 = e4 + 1;
            while (n3 < O.length && i4 < k2)
              i4 *= O[n3++];
            i4 = r4.modInt(i4);
            while (e4 < n3)
              if (i4 % O[e4++] == 0)
                return false;
          }
          return r4.millerRabin(t5);
        };
        t4.prototype.copyTo = function(t5) {
          for (var e4 = this.t - 1; e4 >= 0; --e4)
            t5[e4] = this[e4];
          t5.t = this.t;
          t5.s = this.s;
        };
        t4.prototype.fromInt = function(t5) {
          this.t = 1;
          this.s = t5 < 0 ? -1 : 0;
          if (t5 > 0)
            this[0] = t5;
          else if (t5 < -1)
            this[0] = t5 + this.DV;
          else
            this.t = 0;
        };
        t4.prototype.fromString = function(e4, r4) {
          var i4;
          if (16 == r4)
            i4 = 4;
          else if (8 == r4)
            i4 = 3;
          else if (256 == r4)
            i4 = 8;
          else if (2 == r4)
            i4 = 1;
          else if (32 == r4)
            i4 = 5;
          else if (4 == r4)
            i4 = 2;
          else {
            this.fromRadix(e4, r4);
            return;
          }
          this.t = 0;
          this.s = 0;
          var n3 = e4.length;
          var s3 = false;
          var a3 = 0;
          while (--n3 >= 0) {
            var o3 = 8 == i4 ? 255 & +e4[n3] : G2(e4, n3);
            if (o3 < 0) {
              if ("-" == e4.charAt(n3))
                s3 = true;
              continue;
            }
            s3 = false;
            if (0 == a3)
              this[this.t++] = o3;
            else if (a3 + i4 > this.DB) {
              this[this.t - 1] |= (o3 & (1 << this.DB - a3) - 1) << a3;
              this[this.t++] = o3 >> this.DB - a3;
            } else
              this[this.t - 1] |= o3 << a3;
            a3 += i4;
            if (a3 >= this.DB)
              a3 -= this.DB;
          }
          if (8 == i4 && 0 != (128 & +e4[0])) {
            this.s = -1;
            if (a3 > 0)
              this[this.t - 1] |= (1 << this.DB - a3) - 1 << a3;
          }
          this.clamp();
          if (s3)
            t4.ZERO.subTo(this, this);
        };
        t4.prototype.clamp = function() {
          var t5 = this.s & this.DM;
          while (this.t > 0 && this[this.t - 1] == t5)
            --this.t;
        };
        t4.prototype.dlShiftTo = function(t5, e4) {
          var r4;
          for (r4 = this.t - 1; r4 >= 0; --r4)
            e4[r4 + t5] = this[r4];
          for (r4 = t5 - 1; r4 >= 0; --r4)
            e4[r4] = 0;
          e4.t = this.t + t5;
          e4.s = this.s;
        };
        t4.prototype.drShiftTo = function(t5, e4) {
          for (var r4 = t5; r4 < this.t; ++r4)
            e4[r4 - t5] = this[r4];
          e4.t = Math.max(this.t - t5, 0);
          e4.s = this.s;
        };
        t4.prototype.lShiftTo = function(t5, e4) {
          var r4 = t5 % this.DB;
          var i4 = this.DB - r4;
          var n3 = (1 << i4) - 1;
          var s3 = Math.floor(t5 / this.DB);
          var a3 = this.s << r4 & this.DM;
          for (var o3 = this.t - 1; o3 >= 0; --o3) {
            e4[o3 + s3 + 1] = this[o3] >> i4 | a3;
            a3 = (this[o3] & n3) << r4;
          }
          for (var o3 = s3 - 1; o3 >= 0; --o3)
            e4[o3] = 0;
          e4[s3] = a3;
          e4.t = this.t + s3 + 1;
          e4.s = this.s;
          e4.clamp();
        };
        t4.prototype.rShiftTo = function(t5, e4) {
          e4.s = this.s;
          var r4 = Math.floor(t5 / this.DB);
          if (r4 >= this.t) {
            e4.t = 0;
            return;
          }
          var i4 = t5 % this.DB;
          var n3 = this.DB - i4;
          var s3 = (1 << i4) - 1;
          e4[0] = this[r4] >> i4;
          for (var a3 = r4 + 1; a3 < this.t; ++a3) {
            e4[a3 - r4 - 1] |= (this[a3] & s3) << n3;
            e4[a3 - r4] = this[a3] >> i4;
          }
          if (i4 > 0)
            e4[this.t - r4 - 1] |= (this.s & s3) << n3;
          e4.t = this.t - r4;
          e4.clamp();
        };
        t4.prototype.subTo = function(t5, e4) {
          var r4 = 0;
          var i4 = 0;
          var n3 = Math.min(t5.t, this.t);
          while (r4 < n3) {
            i4 += this[r4] - t5[r4];
            e4[r4++] = i4 & this.DM;
            i4 >>= this.DB;
          }
          if (t5.t < this.t) {
            i4 -= t5.s;
            while (r4 < this.t) {
              i4 += this[r4];
              e4[r4++] = i4 & this.DM;
              i4 >>= this.DB;
            }
            i4 += this.s;
          } else {
            i4 += this.s;
            while (r4 < t5.t) {
              i4 -= t5[r4];
              e4[r4++] = i4 & this.DM;
              i4 >>= this.DB;
            }
            i4 -= t5.s;
          }
          e4.s = i4 < 0 ? -1 : 0;
          if (i4 < -1)
            e4[r4++] = this.DV + i4;
          else if (i4 > 0)
            e4[r4++] = i4;
          e4.t = r4;
          e4.clamp();
        };
        t4.prototype.multiplyTo = function(e4, r4) {
          var i4 = this.abs();
          var n3 = e4.abs();
          var s3 = i4.t;
          r4.t = s3 + n3.t;
          while (--s3 >= 0)
            r4[s3] = 0;
          for (s3 = 0; s3 < n3.t; ++s3)
            r4[s3 + i4.t] = i4.am(0, n3[s3], r4, s3, 0, i4.t);
          r4.s = 0;
          r4.clamp();
          if (this.s != e4.s)
            t4.ZERO.subTo(r4, r4);
        };
        t4.prototype.squareTo = function(t5) {
          var e4 = this.abs();
          var r4 = t5.t = 2 * e4.t;
          while (--r4 >= 0)
            t5[r4] = 0;
          for (r4 = 0; r4 < e4.t - 1; ++r4) {
            var i4 = e4.am(r4, e4[r4], t5, 2 * r4, 0, 1);
            if ((t5[r4 + e4.t] += e4.am(r4 + 1, 2 * e4[r4], t5, 2 * r4 + 1, i4, e4.t - r4 - 1)) >= e4.DV) {
              t5[r4 + e4.t] -= e4.DV;
              t5[r4 + e4.t + 1] = 1;
            }
          }
          if (t5.t > 0)
            t5[t5.t - 1] += e4.am(r4, e4[r4], t5, 2 * r4, 0, 1);
          t5.s = 0;
          t5.clamp();
        };
        t4.prototype.divRemTo = function(e4, r4, i4) {
          var n3 = e4.abs();
          if (n3.t <= 0)
            return;
          var s3 = this.abs();
          if (s3.t < n3.t) {
            if (null != r4)
              r4.fromInt(0);
            if (null != i4)
              this.copyTo(i4);
            return;
          }
          if (null == i4)
            i4 = H2();
          var a3 = H2();
          var o3 = this.s;
          var u3 = e4.s;
          var c3 = this.DB - W2(n3[n3.t - 1]);
          if (c3 > 0) {
            n3.lShiftTo(c3, a3);
            s3.lShiftTo(c3, i4);
          } else {
            n3.copyTo(a3);
            s3.copyTo(i4);
          }
          var l3 = a3.t;
          var f3 = a3[l3 - 1];
          if (0 == f3)
            return;
          var h3 = f3 * (1 << this.F1) + (l3 > 1 ? a3[l3 - 2] >> this.F2 : 0);
          var d3 = this.FV / h3;
          var v3 = (1 << this.F1) / h3;
          var p2 = 1 << this.F2;
          var g3 = i4.t;
          var y3 = g3 - l3;
          var m3 = null == r4 ? H2() : r4;
          a3.dlShiftTo(y3, m3);
          if (i4.compareTo(m3) >= 0) {
            i4[i4.t++] = 1;
            i4.subTo(m3, i4);
          }
          t4.ONE.dlShiftTo(l3, m3);
          m3.subTo(a3, a3);
          while (a3.t < l3)
            a3[a3.t++] = 0;
          while (--y3 >= 0) {
            var w3 = i4[--g3] == f3 ? this.DM : Math.floor(i4[g3] * d3 + (i4[g3 - 1] + p2) * v3);
            if ((i4[g3] += a3.am(0, w3, i4, y3, 0, l3)) < w3) {
              a3.dlShiftTo(y3, m3);
              i4.subTo(m3, i4);
              while (i4[g3] < --w3)
                i4.subTo(m3, i4);
            }
          }
          if (null != r4) {
            i4.drShiftTo(l3, r4);
            if (o3 != u3)
              t4.ZERO.subTo(r4, r4);
          }
          i4.t = l3;
          i4.clamp();
          if (c3 > 0)
            i4.rShiftTo(c3, i4);
          if (o3 < 0)
            t4.ZERO.subTo(i4, i4);
        };
        t4.prototype.invDigit = function() {
          if (this.t < 1)
            return 0;
          var t5 = this[0];
          if (0 == (1 & t5))
            return 0;
          var e4 = 3 & t5;
          e4 = e4 * (2 - (15 & t5) * e4) & 15;
          e4 = e4 * (2 - (255 & t5) * e4) & 255;
          e4 = e4 * (2 - ((65535 & t5) * e4 & 65535)) & 65535;
          e4 = e4 * (2 - t5 * e4 % this.DV) % this.DV;
          return e4 > 0 ? this.DV - e4 : -e4;
        };
        t4.prototype.isEven = function() {
          return 0 == (this.t > 0 ? 1 & this[0] : this.s);
        };
        t4.prototype.exp = function(e4, r4) {
          if (e4 > 4294967295 || e4 < 1)
            return t4.ONE;
          var i4 = H2();
          var n3 = H2();
          var s3 = r4.convert(this);
          var a3 = W2(e4) - 1;
          s3.copyTo(i4);
          while (--a3 >= 0) {
            r4.sqrTo(i4, n3);
            if ((e4 & 1 << a3) > 0)
              r4.mulTo(n3, s3, i4);
            else {
              var o3 = i4;
              i4 = n3;
              n3 = o3;
            }
          }
          return r4.revert(i4);
        };
        t4.prototype.chunkSize = function(t5) {
          return Math.floor(Math.LN2 * this.DB / Math.log(t5));
        };
        t4.prototype.toRadix = function(t5) {
          if (null == t5)
            t5 = 10;
          if (0 == this.signum() || t5 < 2 || t5 > 36)
            return "0";
          var e4 = this.chunkSize(t5);
          var r4 = Math.pow(t5, e4);
          var i4 = Y2(r4);
          var n3 = H2();
          var s3 = H2();
          var a3 = "";
          this.divRemTo(i4, n3, s3);
          while (n3.signum() > 0) {
            a3 = (r4 + s3.intValue()).toString(t5).substr(1) + a3;
            n3.divRemTo(i4, n3, s3);
          }
          return s3.intValue().toString(t5) + a3;
        };
        t4.prototype.fromRadix = function(e4, r4) {
          this.fromInt(0);
          if (null == r4)
            r4 = 10;
          var i4 = this.chunkSize(r4);
          var n3 = Math.pow(r4, i4);
          var s3 = false;
          var a3 = 0;
          var o3 = 0;
          for (var u3 = 0; u3 < e4.length; ++u3) {
            var c3 = G2(e4, u3);
            if (c3 < 0) {
              if ("-" == e4.charAt(u3) && 0 == this.signum())
                s3 = true;
              continue;
            }
            o3 = r4 * o3 + c3;
            if (++a3 >= i4) {
              this.dMultiply(n3);
              this.dAddOffset(o3, 0);
              a3 = 0;
              o3 = 0;
            }
          }
          if (a3 > 0) {
            this.dMultiply(Math.pow(r4, a3));
            this.dAddOffset(o3, 0);
          }
          if (s3)
            t4.ZERO.subTo(this, this);
        };
        t4.prototype.fromNumber = function(e4, r4, i4) {
          if ("number" == typeof r4)
            if (e4 < 2)
              this.fromInt(1);
            else {
              this.fromNumber(e4, i4);
              if (!this.testBit(e4 - 1))
                this.bitwiseTo(t4.ONE.shiftLeft(e4 - 1), a2, this);
              if (this.isEven())
                this.dAddOffset(1, 0);
              while (!this.isProbablePrime(r4)) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > e4)
                  this.subTo(t4.ONE.shiftLeft(e4 - 1), this);
              }
            }
          else {
            var n3 = [];
            var s3 = 7 & e4;
            n3.length = (e4 >> 3) + 1;
            r4.nextBytes(n3);
            if (s3 > 0)
              n3[0] &= (1 << s3) - 1;
            else
              n3[0] = 0;
            this.fromString(n3, 256);
          }
        };
        t4.prototype.bitwiseTo = function(t5, e4, r4) {
          var i4;
          var n3;
          var s3 = Math.min(t5.t, this.t);
          for (i4 = 0; i4 < s3; ++i4)
            r4[i4] = e4(this[i4], t5[i4]);
          if (t5.t < this.t) {
            n3 = t5.s & this.DM;
            for (i4 = s3; i4 < this.t; ++i4)
              r4[i4] = e4(this[i4], n3);
            r4.t = this.t;
          } else {
            n3 = this.s & this.DM;
            for (i4 = s3; i4 < t5.t; ++i4)
              r4[i4] = e4(n3, t5[i4]);
            r4.t = t5.t;
          }
          r4.s = e4(this.s, t5.s);
          r4.clamp();
        };
        t4.prototype.changeBit = function(e4, r4) {
          var i4 = t4.ONE.shiftLeft(e4);
          this.bitwiseTo(i4, r4, i4);
          return i4;
        };
        t4.prototype.addTo = function(t5, e4) {
          var r4 = 0;
          var i4 = 0;
          var n3 = Math.min(t5.t, this.t);
          while (r4 < n3) {
            i4 += this[r4] + t5[r4];
            e4[r4++] = i4 & this.DM;
            i4 >>= this.DB;
          }
          if (t5.t < this.t) {
            i4 += t5.s;
            while (r4 < this.t) {
              i4 += this[r4];
              e4[r4++] = i4 & this.DM;
              i4 >>= this.DB;
            }
            i4 += this.s;
          } else {
            i4 += this.s;
            while (r4 < t5.t) {
              i4 += t5[r4];
              e4[r4++] = i4 & this.DM;
              i4 >>= this.DB;
            }
            i4 += t5.s;
          }
          e4.s = i4 < 0 ? -1 : 0;
          if (i4 > 0)
            e4[r4++] = i4;
          else if (i4 < -1)
            e4[r4++] = this.DV + i4;
          e4.t = r4;
          e4.clamp();
        };
        t4.prototype.dMultiply = function(t5) {
          this[this.t] = this.am(0, t5 - 1, this, 0, 0, this.t);
          ++this.t;
          this.clamp();
        };
        t4.prototype.dAddOffset = function(t5, e4) {
          if (0 == t5)
            return;
          while (this.t <= e4)
            this[this.t++] = 0;
          this[e4] += t5;
          while (this[e4] >= this.DV) {
            this[e4] -= this.DV;
            if (++e4 >= this.t)
              this[this.t++] = 0;
            ++this[e4];
          }
        };
        t4.prototype.multiplyLowerTo = function(t5, e4, r4) {
          var i4 = Math.min(this.t + t5.t, e4);
          r4.s = 0;
          r4.t = i4;
          while (i4 > 0)
            r4[--i4] = 0;
          for (var n3 = r4.t - this.t; i4 < n3; ++i4)
            r4[i4 + this.t] = this.am(0, t5[i4], r4, i4, 0, this.t);
          for (var n3 = Math.min(t5.t, e4); i4 < n3; ++i4)
            this.am(0, t5[i4], r4, i4, 0, e4 - i4);
          r4.clamp();
        };
        t4.prototype.multiplyUpperTo = function(t5, e4, r4) {
          --e4;
          var i4 = r4.t = this.t + t5.t - e4;
          r4.s = 0;
          while (--i4 >= 0)
            r4[i4] = 0;
          for (i4 = Math.max(e4 - this.t, 0); i4 < t5.t; ++i4)
            r4[this.t + i4 - e4] = this.am(e4 - i4, t5[i4], r4, 0, 0, this.t + i4 - e4);
          r4.clamp();
          r4.drShiftTo(1, r4);
        };
        t4.prototype.modInt = function(t5) {
          if (t5 <= 0)
            return 0;
          var e4 = this.DV % t5;
          var r4 = this.s < 0 ? t5 - 1 : 0;
          if (this.t > 0)
            if (0 == e4)
              r4 = this[0] % t5;
            else
              for (var i4 = this.t - 1; i4 >= 0; --i4)
                r4 = (e4 * r4 + this[i4]) % t5;
          return r4;
        };
        t4.prototype.millerRabin = function(e4) {
          var r4 = this.subtract(t4.ONE);
          var i4 = r4.getLowestSetBit();
          if (i4 <= 0)
            return false;
          var n3 = r4.shiftRight(i4);
          e4 = e4 + 1 >> 1;
          if (e4 > O.length)
            e4 = O.length;
          var s3 = H2();
          for (var a3 = 0; a3 < e4; ++a3) {
            s3.fromInt(O[Math.floor(Math.random() * O.length)]);
            var o3 = s3.modPow(n3, this);
            if (0 != o3.compareTo(t4.ONE) && 0 != o3.compareTo(r4)) {
              var u3 = 1;
              while (u3++ < i4 && 0 != o3.compareTo(r4)) {
                o3 = o3.modPowInt(2, this);
                if (0 == o3.compareTo(t4.ONE))
                  return false;
              }
              if (0 != o3.compareTo(r4))
                return false;
            }
          }
          return true;
        };
        t4.prototype.square = function() {
          var t5 = H2();
          this.squareTo(t5);
          return t5;
        };
        t4.prototype.gcda = function(t5, e4) {
          var r4 = this.s < 0 ? this.negate() : this.clone();
          var i4 = t5.s < 0 ? t5.negate() : t5.clone();
          if (r4.compareTo(i4) < 0) {
            var n3 = r4;
            r4 = i4;
            i4 = n3;
          }
          var s3 = r4.getLowestSetBit();
          var a3 = i4.getLowestSetBit();
          if (a3 < 0) {
            e4(r4);
            return;
          }
          if (s3 < a3)
            a3 = s3;
          if (a3 > 0) {
            r4.rShiftTo(a3, r4);
            i4.rShiftTo(a3, i4);
          }
          var o3 = function() {
            if ((s3 = r4.getLowestSetBit()) > 0)
              r4.rShiftTo(s3, r4);
            if ((s3 = i4.getLowestSetBit()) > 0)
              i4.rShiftTo(s3, i4);
            if (r4.compareTo(i4) >= 0) {
              r4.subTo(i4, r4);
              r4.rShiftTo(1, r4);
            } else {
              i4.subTo(r4, i4);
              i4.rShiftTo(1, i4);
            }
            if (!(r4.signum() > 0)) {
              if (a3 > 0)
                i4.lShiftTo(a3, i4);
              setTimeout(function() {
                e4(i4);
              }, 0);
            } else
              setTimeout(o3, 0);
          };
          setTimeout(o3, 10);
        };
        t4.prototype.fromNumberAsync = function(e4, r4, i4, n3) {
          if ("number" == typeof r4)
            if (e4 < 2)
              this.fromInt(1);
            else {
              this.fromNumber(e4, i4);
              if (!this.testBit(e4 - 1))
                this.bitwiseTo(t4.ONE.shiftLeft(e4 - 1), a2, this);
              if (this.isEven())
                this.dAddOffset(1, 0);
              var s3 = this;
              var o3 = function() {
                s3.dAddOffset(2, 0);
                if (s3.bitLength() > e4)
                  s3.subTo(t4.ONE.shiftLeft(e4 - 1), s3);
                if (s3.isProbablePrime(r4))
                  setTimeout(function() {
                    n3();
                  }, 0);
                else
                  setTimeout(o3, 0);
              };
              setTimeout(o3, 0);
            }
          else {
            var u3 = [];
            var c3 = 7 & e4;
            u3.length = (e4 >> 3) + 1;
            r4.nextBytes(u3);
            if (c3 > 0)
              u3[0] &= (1 << c3) - 1;
            else
              u3[0] = 0;
            this.fromString(u3, 256);
          }
        };
        return t4;
      }();
      var N2 = function() {
        function t4() {
        }
        t4.prototype.convert = function(t5) {
          return t5;
        };
        t4.prototype.revert = function(t5) {
          return t5;
        };
        t4.prototype.mulTo = function(t5, e4, r4) {
          t5.multiplyTo(e4, r4);
        };
        t4.prototype.sqrTo = function(t5, e4) {
          t5.squareTo(e4);
        };
        return t4;
      }();
      var P2 = function() {
        function t4(t5) {
          this.m = t5;
        }
        t4.prototype.convert = function(t5) {
          if (t5.s < 0 || t5.compareTo(this.m) >= 0)
            return t5.mod(this.m);
          else
            return t5;
        };
        t4.prototype.revert = function(t5) {
          return t5;
        };
        t4.prototype.reduce = function(t5) {
          t5.divRemTo(this.m, null, t5);
        };
        t4.prototype.mulTo = function(t5, e4, r4) {
          t5.multiplyTo(e4, r4);
          this.reduce(r4);
        };
        t4.prototype.sqrTo = function(t5, e4) {
          t5.squareTo(e4);
          this.reduce(e4);
        };
        return t4;
      }();
      var V2 = function() {
        function t4(t5) {
          this.m = t5;
          this.mp = t5.invDigit();
          this.mpl = 32767 & this.mp;
          this.mph = this.mp >> 15;
          this.um = (1 << t5.DB - 15) - 1;
          this.mt2 = 2 * t5.t;
        }
        t4.prototype.convert = function(t5) {
          var e4 = H2();
          t5.abs().dlShiftTo(this.m.t, e4);
          e4.divRemTo(this.m, null, e4);
          if (t5.s < 0 && e4.compareTo(C2.ZERO) > 0)
            this.m.subTo(e4, e4);
          return e4;
        };
        t4.prototype.revert = function(t5) {
          var e4 = H2();
          t5.copyTo(e4);
          this.reduce(e4);
          return e4;
        };
        t4.prototype.reduce = function(t5) {
          while (t5.t <= this.mt2)
            t5[t5.t++] = 0;
          for (var e4 = 0; e4 < this.m.t; ++e4) {
            var r4 = 32767 & t5[e4];
            var i4 = r4 * this.mpl + ((r4 * this.mph + (t5[e4] >> 15) * this.mpl & this.um) << 15) & t5.DM;
            r4 = e4 + this.m.t;
            t5[r4] += this.m.am(0, i4, t5, e4, 0, this.m.t);
            while (t5[r4] >= t5.DV) {
              t5[r4] -= t5.DV;
              t5[++r4]++;
            }
          }
          t5.clamp();
          t5.drShiftTo(this.m.t, t5);
          if (t5.compareTo(this.m) >= 0)
            t5.subTo(this.m, t5);
        };
        t4.prototype.mulTo = function(t5, e4, r4) {
          t5.multiplyTo(e4, r4);
          this.reduce(r4);
        };
        t4.prototype.sqrTo = function(t5, e4) {
          t5.squareTo(e4);
          this.reduce(e4);
        };
        return t4;
      }();
      var L2 = function() {
        function t4(t5) {
          this.m = t5;
          this.r2 = H2();
          this.q3 = H2();
          C2.ONE.dlShiftTo(2 * t5.t, this.r2);
          this.mu = this.r2.divide(t5);
        }
        t4.prototype.convert = function(t5) {
          if (t5.s < 0 || t5.t > 2 * this.m.t)
            return t5.mod(this.m);
          else if (t5.compareTo(this.m) < 0)
            return t5;
          else {
            var e4 = H2();
            t5.copyTo(e4);
            this.reduce(e4);
            return e4;
          }
        };
        t4.prototype.revert = function(t5) {
          return t5;
        };
        t4.prototype.reduce = function(t5) {
          t5.drShiftTo(this.m.t - 1, this.r2);
          if (t5.t > this.m.t + 1) {
            t5.t = this.m.t + 1;
            t5.clamp();
          }
          this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
          this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
          while (t5.compareTo(this.r2) < 0)
            t5.dAddOffset(1, this.m.t + 1);
          t5.subTo(this.r2, t5);
          while (t5.compareTo(this.m) >= 0)
            t5.subTo(this.m, t5);
        };
        t4.prototype.mulTo = function(t5, e4, r4) {
          t5.multiplyTo(e4, r4);
          this.reduce(r4);
        };
        t4.prototype.sqrTo = function(t5, e4) {
          t5.squareTo(e4);
          this.reduce(e4);
        };
        return t4;
      }();
      function H2() {
        return new C2(null);
      }
      function U2(t4, e4) {
        return new C2(t4, e4);
      }
      var K2 = "undefined" !== typeof navigator;
      if (K2 && B2 && "Microsoft Internet Explorer" == navigator.appName) {
        C2.prototype.am = function t4(e4, r4, i4, n3, s3, a3) {
          var o3 = 32767 & r4;
          var u3 = r4 >> 15;
          while (--a3 >= 0) {
            var c3 = 32767 & this[e4];
            var l3 = this[e4++] >> 15;
            var f3 = u3 * c3 + l3 * o3;
            c3 = o3 * c3 + ((32767 & f3) << 15) + i4[n3] + (1073741823 & s3);
            s3 = (c3 >>> 30) + (f3 >>> 15) + u3 * l3 + (s3 >>> 30);
            i4[n3++] = 1073741823 & c3;
          }
          return s3;
        };
        x2 = 30;
      } else if (K2 && B2 && "Netscape" != navigator.appName) {
        C2.prototype.am = function t4(e4, r4, i4, n3, s3, a3) {
          while (--a3 >= 0) {
            var o3 = r4 * this[e4++] + i4[n3] + s3;
            s3 = Math.floor(o3 / 67108864);
            i4[n3++] = 67108863 & o3;
          }
          return s3;
        };
        x2 = 26;
      } else {
        C2.prototype.am = function t4(e4, r4, i4, n3, s3, a3) {
          var o3 = 16383 & r4;
          var u3 = r4 >> 14;
          while (--a3 >= 0) {
            var c3 = 16383 & this[e4];
            var l3 = this[e4++] >> 14;
            var f3 = u3 * c3 + l3 * o3;
            c3 = o3 * c3 + ((16383 & f3) << 14) + i4[n3] + s3;
            s3 = (c3 >> 28) + (f3 >> 14) + u3 * l3;
            i4[n3++] = 268435455 & c3;
          }
          return s3;
        };
        x2 = 28;
      }
      C2.prototype.DB = x2;
      C2.prototype.DM = (1 << x2) - 1;
      C2.prototype.DV = 1 << x2;
      var j2 = 52;
      C2.prototype.FV = Math.pow(2, j2);
      C2.prototype.F1 = j2 - x2;
      C2.prototype.F2 = 2 * x2 - j2;
      var q2 = [];
      var F2;
      var z2;
      F2 = "0".charCodeAt(0);
      for (z2 = 0; z2 <= 9; ++z2)
        q2[F2++] = z2;
      F2 = "a".charCodeAt(0);
      for (z2 = 10; z2 < 36; ++z2)
        q2[F2++] = z2;
      F2 = "A".charCodeAt(0);
      for (z2 = 10; z2 < 36; ++z2)
        q2[F2++] = z2;
      function G2(t4, e4) {
        var r4 = q2[t4.charCodeAt(e4)];
        return null == r4 ? -1 : r4;
      }
      function Y2(t4) {
        var e4 = H2();
        e4.fromInt(t4);
        return e4;
      }
      function W2(t4) {
        var e4 = 1;
        var r4;
        if (0 != (r4 = t4 >>> 16)) {
          t4 = r4;
          e4 += 16;
        }
        if (0 != (r4 = t4 >> 8)) {
          t4 = r4;
          e4 += 8;
        }
        if (0 != (r4 = t4 >> 4)) {
          t4 = r4;
          e4 += 4;
        }
        if (0 != (r4 = t4 >> 2)) {
          t4 = r4;
          e4 += 2;
        }
        if (0 != (r4 = t4 >> 1)) {
          t4 = r4;
          e4 += 1;
        }
        return e4;
      }
      C2.ZERO = Y2(0);
      C2.ONE = Y2(1);
      var J2 = function() {
        function t4() {
          this.i = 0;
          this.j = 0;
          this.S = [];
        }
        t4.prototype.init = function(t5) {
          var e4;
          var r4;
          var i4;
          for (e4 = 0; e4 < 256; ++e4)
            this.S[e4] = e4;
          r4 = 0;
          for (e4 = 0; e4 < 256; ++e4) {
            r4 = r4 + this.S[e4] + t5[e4 % t5.length] & 255;
            i4 = this.S[e4];
            this.S[e4] = this.S[r4];
            this.S[r4] = i4;
          }
          this.i = 0;
          this.j = 0;
        };
        t4.prototype.next = function() {
          var t5;
          this.i = this.i + 1 & 255;
          this.j = this.j + this.S[this.i] & 255;
          t5 = this.S[this.i];
          this.S[this.i] = this.S[this.j];
          this.S[this.j] = t5;
          return this.S[t5 + this.S[this.i] & 255];
        };
        return t4;
      }();
      function Z2() {
        return new J2();
      }
      var $2 = 256;
      var X2;
      var Q2 = null;
      var tt3;
      if (null == Q2) {
        Q2 = [];
        tt3 = 0;
      }
      function nt2() {
        if (null == X2) {
          X2 = Z2();
          while (tt3 < $2) {
            var t4 = Math.floor(65536 * Math.random());
            Q2[tt3++] = 255 & t4;
          }
          X2.init(Q2);
          for (tt3 = 0; tt3 < Q2.length; ++tt3)
            Q2[tt3] = 0;
          tt3 = 0;
        }
        return X2.next();
      }
      var st2 = function() {
        function t4() {
        }
        t4.prototype.nextBytes = function(t5) {
          for (var e4 = 0; e4 < t5.length; ++e4)
            t5[e4] = nt2();
        };
        return t4;
      }();
      function at2(t4, e4) {
        if (e4 < t4.length + 22) {
          console.error("Message too long for RSA");
          return null;
        }
        var r4 = e4 - t4.length - 6;
        var i4 = "";
        for (var n3 = 0; n3 < r4; n3 += 2)
          i4 += "ff";
        var s3 = "0001" + i4 + "00" + t4;
        return U2(s3, 16);
      }
      function ot2(t4, e4) {
        if (e4 < t4.length + 11) {
          console.error("Message too long for RSA");
          return null;
        }
        var r4 = [];
        var i4 = t4.length - 1;
        while (i4 >= 0 && e4 > 0) {
          var n3 = t4.charCodeAt(i4--);
          if (n3 < 128)
            r4[--e4] = n3;
          else if (n3 > 127 && n3 < 2048) {
            r4[--e4] = 63 & n3 | 128;
            r4[--e4] = n3 >> 6 | 192;
          } else {
            r4[--e4] = 63 & n3 | 128;
            r4[--e4] = n3 >> 6 & 63 | 128;
            r4[--e4] = n3 >> 12 | 224;
          }
        }
        r4[--e4] = 0;
        var s3 = new st2();
        var a3 = [];
        while (e4 > 2) {
          a3[0] = 0;
          while (0 == a3[0])
            s3.nextBytes(a3);
          r4[--e4] = a3[0];
        }
        r4[--e4] = 2;
        r4[--e4] = 0;
        return new C2(r4);
      }
      var ut2 = function() {
        function t4() {
          this.n = null;
          this.e = 0;
          this.d = null;
          this.p = null;
          this.q = null;
          this.dmp1 = null;
          this.dmq1 = null;
          this.coeff = null;
        }
        t4.prototype.doPublic = function(t5) {
          return t5.modPowInt(this.e, this.n);
        };
        t4.prototype.doPrivate = function(t5) {
          if (null == this.p || null == this.q)
            return t5.modPow(this.d, this.n);
          var e4 = t5.mod(this.p).modPow(this.dmp1, this.p);
          var r4 = t5.mod(this.q).modPow(this.dmq1, this.q);
          while (e4.compareTo(r4) < 0)
            e4 = e4.add(this.p);
          return e4.subtract(r4).multiply(this.coeff).mod(this.p).multiply(this.q).add(r4);
        };
        t4.prototype.setPublic = function(t5, e4) {
          if (null != t5 && null != e4 && t5.length > 0 && e4.length > 0) {
            this.n = U2(t5, 16);
            this.e = parseInt(e4, 16);
          } else
            console.error("Invalid RSA public key");
        };
        t4.prototype.encrypt = function(t5) {
          var e4 = this.n.bitLength() + 7 >> 3;
          var r4 = ot2(t5, e4);
          if (null == r4)
            return null;
          var i4 = this.doPublic(r4);
          if (null == i4)
            return null;
          var n3 = i4.toString(16);
          var s3 = n3.length;
          for (var a3 = 0; a3 < 2 * e4 - s3; a3++)
            n3 = "0" + n3;
          return n3;
        };
        t4.prototype.setPrivate = function(t5, e4, r4) {
          if (null != t5 && null != e4 && t5.length > 0 && e4.length > 0) {
            this.n = U2(t5, 16);
            this.e = parseInt(e4, 16);
            this.d = U2(r4, 16);
          } else
            console.error("Invalid RSA private key");
        };
        t4.prototype.setPrivateEx = function(t5, e4, r4, i4, n3, s3, a3, o3) {
          if (null != t5 && null != e4 && t5.length > 0 && e4.length > 0) {
            this.n = U2(t5, 16);
            this.e = parseInt(e4, 16);
            this.d = U2(r4, 16);
            this.p = U2(i4, 16);
            this.q = U2(n3, 16);
            this.dmp1 = U2(s3, 16);
            this.dmq1 = U2(a3, 16);
            this.coeff = U2(o3, 16);
          } else
            console.error("Invalid RSA private key");
        };
        t4.prototype.generate = function(t5, e4) {
          var r4 = new st2();
          var i4 = t5 >> 1;
          this.e = parseInt(e4, 16);
          var n3 = new C2(e4, 16);
          for (; ; ) {
            for (; ; ) {
              this.p = new C2(t5 - i4, 1, r4);
              if (0 == this.p.subtract(C2.ONE).gcd(n3).compareTo(C2.ONE) && this.p.isProbablePrime(10))
                break;
            }
            for (; ; ) {
              this.q = new C2(i4, 1, r4);
              if (0 == this.q.subtract(C2.ONE).gcd(n3).compareTo(C2.ONE) && this.q.isProbablePrime(10))
                break;
            }
            if (this.p.compareTo(this.q) <= 0) {
              var s3 = this.p;
              this.p = this.q;
              this.q = s3;
            }
            var a3 = this.p.subtract(C2.ONE);
            var o3 = this.q.subtract(C2.ONE);
            var u3 = a3.multiply(o3);
            if (0 == u3.gcd(n3).compareTo(C2.ONE)) {
              this.n = this.p.multiply(this.q);
              this.d = n3.modInverse(u3);
              this.dmp1 = this.d.mod(a3);
              this.dmq1 = this.d.mod(o3);
              this.coeff = this.q.modInverse(this.p);
              break;
            }
          }
        };
        t4.prototype.decrypt = function(t5) {
          var e4 = U2(t5, 16);
          var r4 = this.doPrivate(e4);
          if (null == r4)
            return null;
          return ct2(r4, this.n.bitLength() + 7 >> 3);
        };
        t4.prototype.generateAsync = function(t5, e4, r4) {
          var i4 = new st2();
          var n3 = t5 >> 1;
          this.e = parseInt(e4, 16);
          var s3 = new C2(e4, 16);
          var a3 = this;
          var o3 = function() {
            var e5 = function() {
              if (a3.p.compareTo(a3.q) <= 0) {
                var t6 = a3.p;
                a3.p = a3.q;
                a3.q = t6;
              }
              var e6 = a3.p.subtract(C2.ONE);
              var i5 = a3.q.subtract(C2.ONE);
              var n4 = e6.multiply(i5);
              if (0 == n4.gcd(s3).compareTo(C2.ONE)) {
                a3.n = a3.p.multiply(a3.q);
                a3.d = s3.modInverse(n4);
                a3.dmp1 = a3.d.mod(e6);
                a3.dmq1 = a3.d.mod(i5);
                a3.coeff = a3.q.modInverse(a3.p);
                setTimeout(function() {
                  r4();
                }, 0);
              } else
                setTimeout(o3, 0);
            };
            var u3 = function() {
              a3.q = H2();
              a3.q.fromNumberAsync(n3, 1, i4, function() {
                a3.q.subtract(C2.ONE).gcda(s3, function(t6) {
                  if (0 == t6.compareTo(C2.ONE) && a3.q.isProbablePrime(10))
                    setTimeout(e5, 0);
                  else
                    setTimeout(u3, 0);
                });
              });
            };
            var c3 = function() {
              a3.p = H2();
              a3.p.fromNumberAsync(t5 - n3, 1, i4, function() {
                a3.p.subtract(C2.ONE).gcda(s3, function(t6) {
                  if (0 == t6.compareTo(C2.ONE) && a3.p.isProbablePrime(10))
                    setTimeout(u3, 0);
                  else
                    setTimeout(c3, 0);
                });
              });
            };
            setTimeout(c3, 0);
          };
          setTimeout(o3, 0);
        };
        t4.prototype.sign = function(t5, e4, r4) {
          var i4 = ht2(r4);
          var n3 = i4 + e4(t5).toString();
          var s3 = at2(n3, this.n.bitLength() / 4);
          if (null == s3)
            return null;
          var a3 = this.doPrivate(s3);
          if (null == a3)
            return null;
          var o3 = a3.toString(16);
          if (0 == (1 & o3.length))
            return o3;
          else
            return "0" + o3;
        };
        t4.prototype.verify = function(t5, e4, r4) {
          var i4 = U2(e4, 16);
          var n3 = this.doPublic(i4);
          if (null == n3)
            return null;
          var s3 = n3.toString(16).replace(/^1f+00/, "");
          var a3 = dt2(s3);
          return a3 == r4(t5).toString();
        };
        t4.prototype.encryptLong = function(t5) {
          var e4 = this;
          var r4 = "";
          var i4 = (this.n.bitLength() + 7 >> 3) - 11;
          var n3 = this.setSplitChn(t5, i4);
          n3.forEach(function(t6) {
            r4 += e4.encrypt(t6);
          });
          return r4;
        };
        t4.prototype.decryptLong = function(t5) {
          var e4 = "";
          var r4 = this.n.bitLength() + 7 >> 3;
          var i4 = 2 * r4;
          if (t5.length > i4) {
            var n3 = t5.match(new RegExp(".{1," + i4 + "}", "g")) || [];
            var s3 = [];
            for (var a3 = 0; a3 < n3.length; a3++) {
              var o3 = U2(n3[a3], 16);
              var u3 = this.doPrivate(o3);
              if (null == u3)
                return null;
              s3.push(u3);
            }
            e4 = lt2(s3, r4);
          } else
            e4 = this.decrypt(t5);
          return e4;
        };
        t4.prototype.setSplitChn = function(t5, e4, r4) {
          if (void 0 === r4)
            r4 = [];
          var i4 = t5.split("");
          var n3 = 0;
          for (var s3 = 0; s3 < i4.length; s3++) {
            var a3 = i4[s3].charCodeAt(0);
            if (a3 <= 127)
              n3 += 1;
            else if (a3 <= 2047)
              n3 += 2;
            else if (a3 <= 65535)
              n3 += 3;
            else
              n3 += 4;
            if (n3 > e4) {
              var o3 = t5.substring(0, s3);
              r4.push(o3);
              return this.setSplitChn(t5.substring(s3), e4, r4);
            }
          }
          r4.push(t5);
          return r4;
        };
        return t4;
      }();
      function ct2(t4, e4) {
        var r4 = t4.toByteArray();
        var i4 = 0;
        while (i4 < r4.length && 0 == r4[i4])
          ++i4;
        if (r4.length - i4 != e4 - 1 || 2 != r4[i4])
          return null;
        ++i4;
        while (0 != r4[i4])
          if (++i4 >= r4.length)
            return null;
        var n3 = "";
        while (++i4 < r4.length) {
          var s3 = 255 & r4[i4];
          if (s3 < 128)
            n3 += String.fromCharCode(s3);
          else if (s3 > 191 && s3 < 224) {
            n3 += String.fromCharCode((31 & s3) << 6 | 63 & r4[i4 + 1]);
            ++i4;
          } else {
            n3 += String.fromCharCode((15 & s3) << 12 | (63 & r4[i4 + 1]) << 6 | 63 & r4[i4 + 2]);
            i4 += 2;
          }
        }
        return n3;
      }
      function lt2(t4, e4) {
        var r4 = [];
        for (var i4 = 0; i4 < t4.length; i4++) {
          var n3 = t4[i4];
          var s3 = n3.toByteArray();
          var a3 = 0;
          while (a3 < s3.length && 0 == s3[a3])
            ++a3;
          if (s3.length - a3 != e4 - 1 || 2 != s3[a3])
            return null;
          ++a3;
          while (0 != s3[a3])
            if (++a3 >= s3.length)
              return null;
          r4 = r4.concat(s3.slice(a3 + 1));
        }
        var o3 = r4;
        var u3 = -1;
        var c3 = "";
        while (++u3 < o3.length) {
          var l3 = 255 & o3[u3];
          if (l3 < 128)
            c3 += String.fromCharCode(l3);
          else if (l3 > 191 && l3 < 224) {
            c3 += String.fromCharCode((31 & l3) << 6 | 63 & o3[u3 + 1]);
            ++u3;
          } else {
            c3 += String.fromCharCode((15 & l3) << 12 | (63 & o3[u3 + 1]) << 6 | 63 & o3[u3 + 2]);
            u3 += 2;
          }
        }
        return c3;
      }
      var ft2 = { md2: "3020300c06082a864886f70d020205000410", md5: "3020300c06082a864886f70d020505000410", sha1: "3021300906052b0e03021a05000414", sha224: "302d300d06096086480165030402040500041c", sha256: "3031300d060960864801650304020105000420", sha384: "3041300d060960864801650304020205000430", sha512: "3051300d060960864801650304020305000440", ripemd160: "3021300906052b2403020105000414" };
      function ht2(t4) {
        return ft2[t4] || "";
      }
      function dt2(t4) {
        for (var e4 in ft2)
          if (ft2.hasOwnProperty(e4)) {
            var r4 = ft2[e4];
            var i4 = r4.length;
            if (t4.substr(0, i4) == r4)
              return t4.substr(i4);
          }
        return t4;
      }
      var vt2 = {};
      vt2.lang = { extend: function(t4, e4, r4) {
        if (!e4 || !t4)
          throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
        var i4 = function() {
        };
        i4.prototype = e4.prototype;
        t4.prototype = new i4();
        t4.prototype.constructor = t4;
        t4.superclass = e4.prototype;
        if (e4.prototype.constructor == Object.prototype.constructor)
          e4.prototype.constructor = e4;
        if (r4) {
          var n3;
          for (n3 in r4)
            t4.prototype[n3] = r4[n3];
          var s3 = function() {
          }, a3 = ["toString", "valueOf"];
          try {
            if (/MSIE/.test(navigator.userAgent))
              s3 = function(t5, e5) {
                for (n3 = 0; n3 < a3.length; n3 += 1) {
                  var r5 = a3[n3], i5 = e5[r5];
                  if ("function" === typeof i5 && i5 != Object.prototype[r5])
                    t5[r5] = i5;
                }
              };
          } catch (t5) {
          }
          s3(t4.prototype, r4);
        }
      } };
      var pt2 = {};
      if ("undefined" == typeof pt2.asn1 || !pt2.asn1)
        pt2.asn1 = {};
      pt2.asn1.ASN1Util = new function() {
        this.integerToByteHex = function(t4) {
          var e4 = t4.toString(16);
          if (e4.length % 2 == 1)
            e4 = "0" + e4;
          return e4;
        };
        this.bigIntToMinTwosComplementsHex = function(t4) {
          var e4 = t4.toString(16);
          if ("-" != e4.substr(0, 1)) {
            if (e4.length % 2 == 1)
              e4 = "0" + e4;
            else if (!e4.match(/^[0-7]/))
              e4 = "00" + e4;
          } else {
            var r4 = e4.substr(1);
            var i4 = r4.length;
            if (i4 % 2 == 1)
              i4 += 1;
            else if (!e4.match(/^[0-7]/))
              i4 += 2;
            var n3 = "";
            for (var s3 = 0; s3 < i4; s3++)
              n3 += "f";
            var a3 = new C2(n3, 16);
            var o3 = a3.xor(t4).add(C2.ONE);
            e4 = o3.toString(16).replace(/^-/, "");
          }
          return e4;
        };
        this.getPEMStringFromHex = function(t4, e4) {
          return hextopem(t4, e4);
        };
        this.newObject = function(t4) {
          var e4 = pt2, r4 = e4.asn1, i4 = r4.DERBoolean, n3 = r4.DERInteger, s3 = r4.DERBitString, a3 = r4.DEROctetString, o3 = r4.DERNull, u3 = r4.DERObjectIdentifier, c3 = r4.DEREnumerated, l3 = r4.DERUTF8String, f3 = r4.DERNumericString, h3 = r4.DERPrintableString, d3 = r4.DERTeletexString, v3 = r4.DERIA5String, p2 = r4.DERUTCTime, g3 = r4.DERGeneralizedTime, y3 = r4.DERSequence, m3 = r4.DERSet, w3 = r4.DERTaggedObject, _3 = r4.ASN1Util.newObject;
          var S3 = Object.keys(t4);
          if (1 != S3.length)
            throw "key of param shall be only one.";
          var b3 = S3[0];
          if (-1 == ":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b3 + ":"))
            throw "undefined key: " + b3;
          if ("bool" == b3)
            return new i4(t4[b3]);
          if ("int" == b3)
            return new n3(t4[b3]);
          if ("bitstr" == b3)
            return new s3(t4[b3]);
          if ("octstr" == b3)
            return new a3(t4[b3]);
          if ("null" == b3)
            return new o3(t4[b3]);
          if ("oid" == b3)
            return new u3(t4[b3]);
          if ("enum" == b3)
            return new c3(t4[b3]);
          if ("utf8str" == b3)
            return new l3(t4[b3]);
          if ("numstr" == b3)
            return new f3(t4[b3]);
          if ("prnstr" == b3)
            return new h3(t4[b3]);
          if ("telstr" == b3)
            return new d3(t4[b3]);
          if ("ia5str" == b3)
            return new v3(t4[b3]);
          if ("utctime" == b3)
            return new p2(t4[b3]);
          if ("gentime" == b3)
            return new g3(t4[b3]);
          if ("seq" == b3) {
            var E3 = t4[b3];
            var D3 = [];
            for (var T2 = 0; T2 < E3.length; T2++) {
              var M3 = _3(E3[T2]);
              D3.push(M3);
            }
            return new y3({ array: D3 });
          }
          if ("set" == b3) {
            var E3 = t4[b3];
            var D3 = [];
            for (var T2 = 0; T2 < E3.length; T2++) {
              var M3 = _3(E3[T2]);
              D3.push(M3);
            }
            return new m3({ array: D3 });
          }
          if ("tag" == b3) {
            var I3 = t4[b3];
            if ("[object Array]" === Object.prototype.toString.call(I3) && 3 == I3.length) {
              var A3 = _3(I3[2]);
              return new w3({ tag: I3[0], explicit: I3[1], obj: A3 });
            } else {
              var x3 = {};
              if (void 0 !== I3.explicit)
                x3.explicit = I3.explicit;
              if (void 0 !== I3.tag)
                x3.tag = I3.tag;
              if (void 0 === I3.obj)
                throw "obj shall be specified for 'tag'.";
              x3.obj = _3(I3.obj);
              return new w3(x3);
            }
          }
        };
        this.jsonToASN1HEX = function(t4) {
          var e4 = this.newObject(t4);
          return e4.getEncodedHex();
        };
      }();
      pt2.asn1.ASN1Util.oidHexToInt = function(t4) {
        var e4 = "";
        var r4 = parseInt(t4.substr(0, 2), 16);
        var i4 = Math.floor(r4 / 40);
        var n3 = r4 % 40;
        var e4 = i4 + "." + n3;
        var s3 = "";
        for (var a3 = 2; a3 < t4.length; a3 += 2) {
          var o3 = parseInt(t4.substr(a3, 2), 16);
          var u3 = ("00000000" + o3.toString(2)).slice(-8);
          s3 += u3.substr(1, 7);
          if ("0" == u3.substr(0, 1)) {
            var c3 = new C2(s3, 2);
            e4 = e4 + "." + c3.toString(10);
            s3 = "";
          }
        }
        return e4;
      };
      pt2.asn1.ASN1Util.oidIntToHex = function(t4) {
        var e4 = function(t5) {
          var e5 = t5.toString(16);
          if (1 == e5.length)
            e5 = "0" + e5;
          return e5;
        };
        var r4 = function(t5) {
          var r5 = "";
          var i5 = new C2(t5, 10);
          var n4 = i5.toString(2);
          var s4 = 7 - n4.length % 7;
          if (7 == s4)
            s4 = 0;
          var a4 = "";
          for (var o3 = 0; o3 < s4; o3++)
            a4 += "0";
          n4 = a4 + n4;
          for (var o3 = 0; o3 < n4.length - 1; o3 += 7) {
            var u3 = n4.substr(o3, 7);
            if (o3 != n4.length - 7)
              u3 = "1" + u3;
            r5 += e4(parseInt(u3, 2));
          }
          return r5;
        };
        if (!t4.match(/^[0-9.]+$/))
          throw "malformed oid string: " + t4;
        var i4 = "";
        var n3 = t4.split(".");
        var s3 = 40 * parseInt(n3[0]) + parseInt(n3[1]);
        i4 += e4(s3);
        n3.splice(0, 2);
        for (var a3 = 0; a3 < n3.length; a3++)
          i4 += r4(n3[a3]);
        return i4;
      };
      pt2.asn1.ASN1Object = function() {
        var n3 = "";
        this.getLengthHexFromValue = function() {
          if ("undefined" == typeof this.hV || null == this.hV)
            throw "this.hV is null or undefined.";
          if (this.hV.length % 2 == 1)
            throw "value hex must be even length: n=" + n3.length + ",v=" + this.hV;
          var t4 = this.hV.length / 2;
          var e4 = t4.toString(16);
          if (e4.length % 2 == 1)
            e4 = "0" + e4;
          if (t4 < 128)
            return e4;
          else {
            var r4 = e4.length / 2;
            if (r4 > 15)
              throw "ASN.1 length too long to represent by 8x: n = " + t4.toString(16);
            var i4 = 128 + r4;
            return i4.toString(16) + e4;
          }
        };
        this.getEncodedHex = function() {
          if (null == this.hTLV || this.isModified) {
            this.hV = this.getFreshValueHex();
            this.hL = this.getLengthHexFromValue();
            this.hTLV = this.hT + this.hL + this.hV;
            this.isModified = false;
          }
          return this.hTLV;
        };
        this.getValueHex = function() {
          this.getEncodedHex();
          return this.hV;
        };
        this.getFreshValueHex = function() {
          return "";
        };
      };
      pt2.asn1.DERAbstractString = function(t4) {
        pt2.asn1.DERAbstractString.superclass.constructor.call(this);
        this.getString = function() {
          return this.s;
        };
        this.setString = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.s = t5;
          this.hV = stohex(this.s);
        };
        this.setStringHex = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = t5;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t4) {
          if ("string" == typeof t4)
            this.setString(t4);
          else if ("undefined" != typeof t4["str"])
            this.setString(t4["str"]);
          else if ("undefined" != typeof t4["hex"])
            this.setStringHex(t4["hex"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DERAbstractString, pt2.asn1.ASN1Object);
      pt2.asn1.DERAbstractTime = function(t4) {
        pt2.asn1.DERAbstractTime.superclass.constructor.call(this);
        this.localDateToUTC = function(t5) {
          utc = t5.getTime() + 6e4 * t5.getTimezoneOffset();
          var e4 = new Date(utc);
          return e4;
        };
        this.formatDate = function(t5, e4, r4) {
          var i4 = this.zeroPadding;
          var n3 = this.localDateToUTC(t5);
          var s3 = String(n3.getFullYear());
          if ("utc" == e4)
            s3 = s3.substr(2, 2);
          var a3 = i4(String(n3.getMonth() + 1), 2);
          var o3 = i4(String(n3.getDate()), 2);
          var u3 = i4(String(n3.getHours()), 2);
          var c3 = i4(String(n3.getMinutes()), 2);
          var l3 = i4(String(n3.getSeconds()), 2);
          var f3 = s3 + a3 + o3 + u3 + c3 + l3;
          if (true === r4) {
            var h3 = n3.getMilliseconds();
            if (0 != h3) {
              var d3 = i4(String(h3), 3);
              d3 = d3.replace(/[0]+$/, "");
              f3 = f3 + "." + d3;
            }
          }
          return f3 + "Z";
        };
        this.zeroPadding = function(t5, e4) {
          if (t5.length >= e4)
            return t5;
          return new Array(e4 - t5.length + 1).join("0") + t5;
        };
        this.getString = function() {
          return this.s;
        };
        this.setString = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.s = t5;
          this.hV = stohex(t5);
        };
        this.setByDateValue = function(t5, e4, r4, i4, n3, s3) {
          var a3 = new Date(Date.UTC(t5, e4 - 1, r4, i4, n3, s3, 0));
          this.setByDate(a3);
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
      };
      vt2.lang.extend(pt2.asn1.DERAbstractTime, pt2.asn1.ASN1Object);
      pt2.asn1.DERAbstractStructured = function(t4) {
        pt2.asn1.DERAbstractString.superclass.constructor.call(this);
        this.setByASN1ObjectArray = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array = t5;
        };
        this.appendASN1Object = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.asn1Array.push(t5);
        };
        this.asn1Array = new Array();
        if ("undefined" != typeof t4) {
          if ("undefined" != typeof t4["array"])
            this.asn1Array = t4["array"];
        }
      };
      vt2.lang.extend(pt2.asn1.DERAbstractStructured, pt2.asn1.ASN1Object);
      pt2.asn1.DERBoolean = function() {
        pt2.asn1.DERBoolean.superclass.constructor.call(this);
        this.hT = "01";
        this.hTLV = "0101ff";
      };
      vt2.lang.extend(pt2.asn1.DERBoolean, pt2.asn1.ASN1Object);
      pt2.asn1.DERInteger = function(t4) {
        pt2.asn1.DERInteger.superclass.constructor.call(this);
        this.hT = "02";
        this.setByBigInteger = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = pt2.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t5);
        };
        this.setByInteger = function(t5) {
          var e4 = new C2(String(t5), 10);
          this.setByBigInteger(e4);
        };
        this.setValueHex = function(t5) {
          this.hV = t5;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t4) {
          if ("undefined" != typeof t4["bigint"])
            this.setByBigInteger(t4["bigint"]);
          else if ("undefined" != typeof t4["int"])
            this.setByInteger(t4["int"]);
          else if ("number" == typeof t4)
            this.setByInteger(t4);
          else if ("undefined" != typeof t4["hex"])
            this.setValueHex(t4["hex"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DERInteger, pt2.asn1.ASN1Object);
      pt2.asn1.DERBitString = function(t4) {
        if (void 0 !== t4 && "undefined" !== typeof t4.obj) {
          var e4 = pt2.asn1.ASN1Util.newObject(t4.obj);
          t4.hex = "00" + e4.getEncodedHex();
        }
        pt2.asn1.DERBitString.superclass.constructor.call(this);
        this.hT = "03";
        this.setHexValueIncludingUnusedBits = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = t5;
        };
        this.setUnusedBitsAndHexValue = function(t5, e5) {
          if (t5 < 0 || 7 < t5)
            throw "unused bits shall be from 0 to 7: u = " + t5;
          var r4 = "0" + t5;
          this.hTLV = null;
          this.isModified = true;
          this.hV = r4 + e5;
        };
        this.setByBinaryString = function(t5) {
          t5 = t5.replace(/0+$/, "");
          var e5 = 8 - t5.length % 8;
          if (8 == e5)
            e5 = 0;
          for (var r4 = 0; r4 <= e5; r4++)
            t5 += "0";
          var i4 = "";
          for (var r4 = 0; r4 < t5.length - 1; r4 += 8) {
            var n3 = t5.substr(r4, 8);
            var s3 = parseInt(n3, 2).toString(16);
            if (1 == s3.length)
              s3 = "0" + s3;
            i4 += s3;
          }
          this.hTLV = null;
          this.isModified = true;
          this.hV = "0" + e5 + i4;
        };
        this.setByBooleanArray = function(t5) {
          var e5 = "";
          for (var r4 = 0; r4 < t5.length; r4++)
            if (true == t5[r4])
              e5 += "1";
            else
              e5 += "0";
          this.setByBinaryString(e5);
        };
        this.newFalseArray = function(t5) {
          var e5 = new Array(t5);
          for (var r4 = 0; r4 < t5; r4++)
            e5[r4] = false;
          return e5;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t4) {
          if ("string" == typeof t4 && t4.toLowerCase().match(/^[0-9a-f]+$/))
            this.setHexValueIncludingUnusedBits(t4);
          else if ("undefined" != typeof t4["hex"])
            this.setHexValueIncludingUnusedBits(t4["hex"]);
          else if ("undefined" != typeof t4["bin"])
            this.setByBinaryString(t4["bin"]);
          else if ("undefined" != typeof t4["array"])
            this.setByBooleanArray(t4["array"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DERBitString, pt2.asn1.ASN1Object);
      pt2.asn1.DEROctetString = function(t4) {
        if (void 0 !== t4 && "undefined" !== typeof t4.obj) {
          var e4 = pt2.asn1.ASN1Util.newObject(t4.obj);
          t4.hex = e4.getEncodedHex();
        }
        pt2.asn1.DEROctetString.superclass.constructor.call(this, t4);
        this.hT = "04";
      };
      vt2.lang.extend(pt2.asn1.DEROctetString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERNull = function() {
        pt2.asn1.DERNull.superclass.constructor.call(this);
        this.hT = "05";
        this.hTLV = "0500";
      };
      vt2.lang.extend(pt2.asn1.DERNull, pt2.asn1.ASN1Object);
      pt2.asn1.DERObjectIdentifier = function(t4) {
        var e4 = function(t5) {
          var e5 = t5.toString(16);
          if (1 == e5.length)
            e5 = "0" + e5;
          return e5;
        };
        var r4 = function(t5) {
          var r5 = "";
          var i4 = new C2(t5, 10);
          var n3 = i4.toString(2);
          var s3 = 7 - n3.length % 7;
          if (7 == s3)
            s3 = 0;
          var a3 = "";
          for (var o3 = 0; o3 < s3; o3++)
            a3 += "0";
          n3 = a3 + n3;
          for (var o3 = 0; o3 < n3.length - 1; o3 += 7) {
            var u3 = n3.substr(o3, 7);
            if (o3 != n3.length - 7)
              u3 = "1" + u3;
            r5 += e4(parseInt(u3, 2));
          }
          return r5;
        };
        pt2.asn1.DERObjectIdentifier.superclass.constructor.call(this);
        this.hT = "06";
        this.setValueHex = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = t5;
        };
        this.setValueOidString = function(t5) {
          if (!t5.match(/^[0-9.]+$/))
            throw "malformed oid string: " + t5;
          var i4 = "";
          var n3 = t5.split(".");
          var s3 = 40 * parseInt(n3[0]) + parseInt(n3[1]);
          i4 += e4(s3);
          n3.splice(0, 2);
          for (var a3 = 0; a3 < n3.length; a3++)
            i4 += r4(n3[a3]);
          this.hTLV = null;
          this.isModified = true;
          this.s = null;
          this.hV = i4;
        };
        this.setValueName = function(t5) {
          var e5 = pt2.asn1.x509.OID.name2oid(t5);
          if ("" !== e5)
            this.setValueOidString(e5);
          else
            throw "DERObjectIdentifier oidName undefined: " + t5;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if (void 0 !== t4) {
          if ("string" === typeof t4)
            if (t4.match(/^[0-2].[0-9.]+$/))
              this.setValueOidString(t4);
            else
              this.setValueName(t4);
          else if (void 0 !== t4.oid)
            this.setValueOidString(t4.oid);
          else if (void 0 !== t4.hex)
            this.setValueHex(t4.hex);
          else if (void 0 !== t4.name)
            this.setValueName(t4.name);
        }
      };
      vt2.lang.extend(pt2.asn1.DERObjectIdentifier, pt2.asn1.ASN1Object);
      pt2.asn1.DEREnumerated = function(t4) {
        pt2.asn1.DEREnumerated.superclass.constructor.call(this);
        this.hT = "0a";
        this.setByBigInteger = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.hV = pt2.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t5);
        };
        this.setByInteger = function(t5) {
          var e4 = new C2(String(t5), 10);
          this.setByBigInteger(e4);
        };
        this.setValueHex = function(t5) {
          this.hV = t5;
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t4) {
          if ("undefined" != typeof t4["int"])
            this.setByInteger(t4["int"]);
          else if ("number" == typeof t4)
            this.setByInteger(t4);
          else if ("undefined" != typeof t4["hex"])
            this.setValueHex(t4["hex"]);
        }
      };
      vt2.lang.extend(pt2.asn1.DEREnumerated, pt2.asn1.ASN1Object);
      pt2.asn1.DERUTF8String = function(t4) {
        pt2.asn1.DERUTF8String.superclass.constructor.call(this, t4);
        this.hT = "0c";
      };
      vt2.lang.extend(pt2.asn1.DERUTF8String, pt2.asn1.DERAbstractString);
      pt2.asn1.DERNumericString = function(t4) {
        pt2.asn1.DERNumericString.superclass.constructor.call(this, t4);
        this.hT = "12";
      };
      vt2.lang.extend(pt2.asn1.DERNumericString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERPrintableString = function(t4) {
        pt2.asn1.DERPrintableString.superclass.constructor.call(this, t4);
        this.hT = "13";
      };
      vt2.lang.extend(pt2.asn1.DERPrintableString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERTeletexString = function(t4) {
        pt2.asn1.DERTeletexString.superclass.constructor.call(this, t4);
        this.hT = "14";
      };
      vt2.lang.extend(pt2.asn1.DERTeletexString, pt2.asn1.DERAbstractString);
      pt2.asn1.DERIA5String = function(t4) {
        pt2.asn1.DERIA5String.superclass.constructor.call(this, t4);
        this.hT = "16";
      };
      vt2.lang.extend(pt2.asn1.DERIA5String, pt2.asn1.DERAbstractString);
      pt2.asn1.DERUTCTime = function(t4) {
        pt2.asn1.DERUTCTime.superclass.constructor.call(this, t4);
        this.hT = "17";
        this.setByDate = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.date = t5;
          this.s = this.formatDate(this.date, "utc");
          this.hV = stohex(this.s);
        };
        this.getFreshValueHex = function() {
          if ("undefined" == typeof this.date && "undefined" == typeof this.s) {
            this.date = new Date();
            this.s = this.formatDate(this.date, "utc");
            this.hV = stohex(this.s);
          }
          return this.hV;
        };
        if (void 0 !== t4) {
          if (void 0 !== t4.str)
            this.setString(t4.str);
          else if ("string" == typeof t4 && t4.match(/^[0-9]{12}Z$/))
            this.setString(t4);
          else if (void 0 !== t4.hex)
            this.setStringHex(t4.hex);
          else if (void 0 !== t4.date)
            this.setByDate(t4.date);
        }
      };
      vt2.lang.extend(pt2.asn1.DERUTCTime, pt2.asn1.DERAbstractTime);
      pt2.asn1.DERGeneralizedTime = function(t4) {
        pt2.asn1.DERGeneralizedTime.superclass.constructor.call(this, t4);
        this.hT = "18";
        this.withMillis = false;
        this.setByDate = function(t5) {
          this.hTLV = null;
          this.isModified = true;
          this.date = t5;
          this.s = this.formatDate(this.date, "gen", this.withMillis);
          this.hV = stohex(this.s);
        };
        this.getFreshValueHex = function() {
          if (void 0 === this.date && void 0 === this.s) {
            this.date = new Date();
            this.s = this.formatDate(this.date, "gen", this.withMillis);
            this.hV = stohex(this.s);
          }
          return this.hV;
        };
        if (void 0 !== t4) {
          if (void 0 !== t4.str)
            this.setString(t4.str);
          else if ("string" == typeof t4 && t4.match(/^[0-9]{14}Z$/))
            this.setString(t4);
          else if (void 0 !== t4.hex)
            this.setStringHex(t4.hex);
          else if (void 0 !== t4.date)
            this.setByDate(t4.date);
          if (true === t4.millis)
            this.withMillis = true;
        }
      };
      vt2.lang.extend(pt2.asn1.DERGeneralizedTime, pt2.asn1.DERAbstractTime);
      pt2.asn1.DERSequence = function(t4) {
        pt2.asn1.DERSequence.superclass.constructor.call(this, t4);
        this.hT = "30";
        this.getFreshValueHex = function() {
          var t5 = "";
          for (var e4 = 0; e4 < this.asn1Array.length; e4++) {
            var r4 = this.asn1Array[e4];
            t5 += r4.getEncodedHex();
          }
          this.hV = t5;
          return this.hV;
        };
      };
      vt2.lang.extend(pt2.asn1.DERSequence, pt2.asn1.DERAbstractStructured);
      pt2.asn1.DERSet = function(t4) {
        pt2.asn1.DERSet.superclass.constructor.call(this, t4);
        this.hT = "31";
        this.sortFlag = true;
        this.getFreshValueHex = function() {
          var t5 = new Array();
          for (var e4 = 0; e4 < this.asn1Array.length; e4++) {
            var r4 = this.asn1Array[e4];
            t5.push(r4.getEncodedHex());
          }
          if (true == this.sortFlag)
            t5.sort();
          this.hV = t5.join("");
          return this.hV;
        };
        if ("undefined" != typeof t4) {
          if ("undefined" != typeof t4.sortflag && false == t4.sortflag)
            this.sortFlag = false;
        }
      };
      vt2.lang.extend(pt2.asn1.DERSet, pt2.asn1.DERAbstractStructured);
      pt2.asn1.DERTaggedObject = function(t4) {
        pt2.asn1.DERTaggedObject.superclass.constructor.call(this);
        this.hT = "a0";
        this.hV = "";
        this.isExplicit = true;
        this.asn1Object = null;
        this.setASN1Object = function(t5, e4, r4) {
          this.hT = e4;
          this.isExplicit = t5;
          this.asn1Object = r4;
          if (this.isExplicit) {
            this.hV = this.asn1Object.getEncodedHex();
            this.hTLV = null;
            this.isModified = true;
          } else {
            this.hV = null;
            this.hTLV = r4.getEncodedHex();
            this.hTLV = this.hTLV.replace(/^../, e4);
            this.isModified = false;
          }
        };
        this.getFreshValueHex = function() {
          return this.hV;
        };
        if ("undefined" != typeof t4) {
          if ("undefined" != typeof t4["tag"])
            this.hT = t4["tag"];
          if ("undefined" != typeof t4["explicit"])
            this.isExplicit = t4["explicit"];
          if ("undefined" != typeof t4["obj"]) {
            this.asn1Object = t4["obj"];
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object);
          }
        }
      };
      vt2.lang.extend(pt2.asn1.DERTaggedObject, pt2.asn1.ASN1Object);
      var gt2 = function() {
        var t4 = function(e4, r4) {
          t4 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t5, e5) {
            t5.__proto__ = e5;
          } || function(t5, e5) {
            for (var r5 in e5)
              if (Object.prototype.hasOwnProperty.call(e5, r5))
                t5[r5] = e5[r5];
          };
          return t4(e4, r4);
        };
        return function(e4, r4) {
          if ("function" !== typeof r4 && null !== r4)
            throw new TypeError("Class extends value " + String(r4) + " is not a constructor or null");
          t4(e4, r4);
          function i4() {
            this.constructor = e4;
          }
          e4.prototype = null === r4 ? Object.create(r4) : (i4.prototype = r4.prototype, new i4());
        };
      }();
      var yt2 = function(t4) {
        gt2(e4, t4);
        function e4(r4) {
          var i4 = t4.call(this) || this;
          if (r4) {
            if ("string" === typeof r4)
              i4.parseKey(r4);
            else if (e4.hasPrivateKeyProperty(r4) || e4.hasPublicKeyProperty(r4))
              i4.parsePropertiesFrom(r4);
          }
          return i4;
        }
        e4.prototype.parseKey = function(t5) {
          try {
            var e5 = 0;
            var r4 = 0;
            var i4 = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;
            var n3 = i4.test(t5) ? y2.decode(t5) : w2.unarmor(t5);
            var s3 = I2.decode(n3);
            if (3 === s3.sub.length)
              s3 = s3.sub[2].sub[0];
            if (9 === s3.sub.length) {
              e5 = s3.sub[1].getHexStringValue();
              this.n = U2(e5, 16);
              r4 = s3.sub[2].getHexStringValue();
              this.e = parseInt(r4, 16);
              var a3 = s3.sub[3].getHexStringValue();
              this.d = U2(a3, 16);
              var o3 = s3.sub[4].getHexStringValue();
              this.p = U2(o3, 16);
              var u3 = s3.sub[5].getHexStringValue();
              this.q = U2(u3, 16);
              var c3 = s3.sub[6].getHexStringValue();
              this.dmp1 = U2(c3, 16);
              var l3 = s3.sub[7].getHexStringValue();
              this.dmq1 = U2(l3, 16);
              var f3 = s3.sub[8].getHexStringValue();
              this.coeff = U2(f3, 16);
            } else if (2 === s3.sub.length) {
              var h3 = s3.sub[1];
              var d3 = h3.sub[0];
              e5 = d3.sub[0].getHexStringValue();
              this.n = U2(e5, 16);
              r4 = d3.sub[1].getHexStringValue();
              this.e = parseInt(r4, 16);
            } else
              return false;
            return true;
          } catch (t6) {
            return false;
          }
        };
        e4.prototype.getPrivateBaseKey = function() {
          var t5 = { array: [new pt2.asn1.DERInteger({ int: 0 }), new pt2.asn1.DERInteger({ bigint: this.n }), new pt2.asn1.DERInteger({ int: this.e }), new pt2.asn1.DERInteger({ bigint: this.d }), new pt2.asn1.DERInteger({ bigint: this.p }), new pt2.asn1.DERInteger({ bigint: this.q }), new pt2.asn1.DERInteger({ bigint: this.dmp1 }), new pt2.asn1.DERInteger({ bigint: this.dmq1 }), new pt2.asn1.DERInteger({ bigint: this.coeff })] };
          var e5 = new pt2.asn1.DERSequence(t5);
          return e5.getEncodedHex();
        };
        e4.prototype.getPrivateBaseKeyB64 = function() {
          return d2(this.getPrivateBaseKey());
        };
        e4.prototype.getPublicBaseKey = function() {
          var t5 = new pt2.asn1.DERSequence({ array: [new pt2.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }), new pt2.asn1.DERNull()] });
          var e5 = new pt2.asn1.DERSequence({ array: [new pt2.asn1.DERInteger({ bigint: this.n }), new pt2.asn1.DERInteger({ int: this.e })] });
          var r4 = new pt2.asn1.DERBitString({ hex: "00" + e5.getEncodedHex() });
          var i4 = new pt2.asn1.DERSequence({ array: [t5, r4] });
          return i4.getEncodedHex();
        };
        e4.prototype.getPublicBaseKeyB64 = function() {
          return d2(this.getPublicBaseKey());
        };
        e4.wordwrap = function(t5, e5) {
          e5 = e5 || 64;
          if (!t5)
            return t5;
          var r4 = "(.{1," + e5 + "})( +|$\n?)|(.{1," + e5 + "})";
          return t5.match(RegExp(r4, "g")).join("\n");
        };
        e4.prototype.getPrivateKey = function() {
          var t5 = "-----BEGIN RSA PRIVATE KEY-----\n";
          t5 += e4.wordwrap(this.getPrivateBaseKeyB64()) + "\n";
          t5 += "-----END RSA PRIVATE KEY-----";
          return t5;
        };
        e4.prototype.getPublicKey = function() {
          var t5 = "-----BEGIN PUBLIC KEY-----\n";
          t5 += e4.wordwrap(this.getPublicBaseKeyB64()) + "\n";
          t5 += "-----END PUBLIC KEY-----";
          return t5;
        };
        e4.hasPublicKeyProperty = function(t5) {
          t5 = t5 || {};
          return t5.hasOwnProperty("n") && t5.hasOwnProperty("e");
        };
        e4.hasPrivateKeyProperty = function(t5) {
          t5 = t5 || {};
          return t5.hasOwnProperty("n") && t5.hasOwnProperty("e") && t5.hasOwnProperty("d") && t5.hasOwnProperty("p") && t5.hasOwnProperty("q") && t5.hasOwnProperty("dmp1") && t5.hasOwnProperty("dmq1") && t5.hasOwnProperty("coeff");
        };
        e4.prototype.parsePropertiesFrom = function(t5) {
          this.n = t5.n;
          this.e = t5.e;
          if (t5.hasOwnProperty("d")) {
            this.d = t5.d;
            this.p = t5.p;
            this.q = t5.q;
            this.dmp1 = t5.dmp1;
            this.dmq1 = t5.dmq1;
            this.coeff = t5.coeff;
          }
        };
        return e4;
      }(ut2);
      const mt2 = { i: "3.2.1" };
      var wt2 = function() {
        function t4(t5) {
          if (void 0 === t5)
            t5 = {};
          t5 = t5 || {};
          this.default_key_size = t5.default_key_size ? parseInt(t5.default_key_size, 10) : 1024;
          this.default_public_exponent = t5.default_public_exponent || "010001";
          this.log = t5.log || false;
          this.key = null;
        }
        t4.prototype.setKey = function(t5) {
          if (this.log && this.key)
            console.warn("A key was already set, overriding existing.");
          this.key = new yt2(t5);
        };
        t4.prototype.setPrivateKey = function(t5) {
          this.setKey(t5);
        };
        t4.prototype.setPublicKey = function(t5) {
          this.setKey(t5);
        };
        t4.prototype.decrypt = function(t5) {
          try {
            return this.getKey().decrypt(t5);
          } catch (t6) {
            return false;
          }
        };
        t4.prototype.encrypt = function(t5) {
          try {
            return this.getKey().encrypt(t5);
          } catch (t6) {
            return false;
          }
        };
        t4.prototype.encryptLong = function(t5) {
          try {
            return d2(this.getKey().encryptLong(t5));
          } catch (t6) {
            return false;
          }
        };
        t4.prototype.decryptLong = function(t5) {
          try {
            return this.getKey().decryptLong(t5);
          } catch (t6) {
            return false;
          }
        };
        t4.prototype.sign = function(t5, e4, r4) {
          try {
            return d2(this.getKey().sign(t5, e4, r4));
          } catch (t6) {
            return false;
          }
        };
        t4.prototype.verify = function(t5, e4, r4) {
          try {
            return this.getKey().verify(t5, v2(e4), r4);
          } catch (t6) {
            return false;
          }
        };
        t4.prototype.getKey = function(t5) {
          if (!this.key) {
            this.key = new yt2();
            if (t5 && "[object Function]" === {}.toString.call(t5)) {
              this.key.generateAsync(this.default_key_size, this.default_public_exponent, t5);
              return;
            }
            this.key.generate(this.default_key_size, this.default_public_exponent);
          }
          return this.key;
        };
        t4.prototype.getPrivateKey = function() {
          return this.getKey().getPrivateKey();
        };
        t4.prototype.getPrivateKeyB64 = function() {
          return this.getKey().getPrivateBaseKeyB64();
        };
        t4.prototype.getPublicKey = function() {
          return this.getKey().getPublicKey();
        };
        t4.prototype.getPublicKeyB64 = function() {
          return this.getKey().getPublicBaseKeyB64();
        };
        t4.version = mt2.i;
        return t4;
      }();
      const _t2 = wt2;
    }, 2480: () => {
    } };
    var e2 = {};
    function r2(i3) {
      var n2 = e2[i3];
      if (void 0 !== n2)
        return n2.exports;
      var s2 = e2[i3] = { id: i3, loaded: false, exports: {} };
      t2[i3].call(s2.exports, s2, s2.exports, r2);
      s2.loaded = true;
      return s2.exports;
    }
    (() => {
      r2.d = (t3, e3) => {
        for (var i3 in e3)
          if (r2.o(e3, i3) && !r2.o(t3, i3))
            Object.defineProperty(t3, i3, { enumerable: true, get: e3[i3] });
      };
    })();
    (() => {
      r2.g = function() {
        if ("object" === typeof globalThis)
          return globalThis;
        try {
          return this || new Function("return this")();
        } catch (t3) {
          if ("object" === typeof window)
            return window;
        }
      }();
    })();
    (() => {
      r2.o = (t3, e3) => Object.prototype.hasOwnProperty.call(t3, e3);
    })();
    (() => {
      r2.r = (t3) => {
        if ("undefined" !== typeof Symbol && Symbol.toStringTag)
          Object.defineProperty(t3, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(t3, "__esModule", { value: true });
      };
    })();
    (() => {
      r2.nmd = (t3) => {
        t3.paths = [];
        if (!t3.children)
          t3.children = [];
        return t3;
      };
    })();
    var i2 = r2(9021);
    return i2;
  })());
})(gtpushMin);
var GtPush = /* @__PURE__ */ getDefaultExportFromCjs(gtpushMinExports);
index.invokePushCallback({
  type: "enabled"
});
const appid = "__UNI__5DFC08B";
{
  if (typeof index.onAppShow === "function") {
    index.onAppShow(() => {
      GtPush.enableSocket(true);
    });
  }
  GtPush.init({
    appid,
    onError: (res) => {
      console.error(res.error);
      const data = {
        type: "clientId",
        cid: "",
        errMsg: res.error
      };
      index.invokePushCallback(data);
    },
    onClientId: (res) => {
      const data = {
        type: "clientId",
        cid: res.cid
      };
      index.invokePushCallback(data);
    },
    onlineState: (res) => {
      const data = {
        type: "lineState",
        online: res.online
      };
      index.invokePushCallback(data);
    },
    onPushMsg: (res) => {
      const data = {
        type: "pushMsg",
        message: res.message
      };
      index.invokePushCallback(data);
    }
  });
}
const pages = [
  {
    path: "pages/activities/activities",
    style: {
      enablePullDownRefresh: true,
      navigationBarTextStyle: "black",
      navigationBarTitleText: "活动列表",
      navigationBarBackgroundColor: "#F8F8F8",
      backgroundColor: "#F8F8F8",
      "app-plus": {
        background: "#efeff4"
      }
    }
  },
  {
    path: "pages/profile/index",
    style: {
      navigationBarTitleText: "我的"
    }
  },
  {
    path: "pages/profile/myActivity",
    style: {
      navigationBarTitleText: "我的活动"
    }
  },
  {
    path: "pages/profile/editingView",
    style: {
      navigationBarTitleText: "",
      enablePullDownRefresh: false
    }
  },
  {
    path: "pages/formPage/formPage",
    style: {
      navigationBarTextStyle: "black",
      navigationBarTitleText: "这是报名表单页面",
      navigationBarBackgroundColor: "#ffffff",
      backgroundColor: "#ffffff",
      "app-plus": {
        background: "#efeff4"
      }
    }
  },
  {
    path: "pages/activeDetail/activeDetail",
    style: {
      navigationBarTextStyle: "black",
      navigationBarTitleText: "这是活动详情页面",
      navigationBarBackgroundColor: "#ffffff",
      backgroundColor: "#ffffff",
      "app-plus": {
        background: "#efeff4"
      }
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/deactivate/deactivate",
    style: {
      navigationBarTitleText: "注销账号"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/userinfo",
    style: {
      navigationBarTitleText: "个人资料"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/bind-mobile/bind-mobile",
    style: {
      navigationBarTitleText: "绑定手机号码"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/cropImage/cropImage",
    style: {
      navigationBarTitleText: ""
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/login/login-withoutpwd",
    style: {
      navigationBarTitleText: ""
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/login/login-withpwd",
    style: {
      navigationBarTitleText: ""
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/login/login-smscode",
    style: {
      navigationBarTitleText: "手机验证码登录"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/register/register",
    style: {
      navigationBarTitleText: "注册"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/register/register-by-email",
    style: {
      navigationBarTitleText: "邮箱验证码注册"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/retrieve/retrieve",
    style: {
      navigationBarTitleText: "重置密码"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/retrieve/retrieve-by-email",
    style: {
      navigationBarTitleText: "通过邮箱重置密码"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/common/webview/webview",
    style: {
      enablePullDownRefresh: false,
      navigationBarTitleText: ""
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/change_pwd/change_pwd",
    style: {
      enablePullDownRefresh: false,
      navigationBarTitleText: "修改密码"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/register/register-admin",
    style: {
      enablePullDownRefresh: false,
      navigationBarTitleText: "注册管理员账号"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/set-pwd/set-pwd",
    style: {
      enablePullDownRefresh: false,
      navigationBarTitleText: "设置密码"
    }
  },
  {
    path: "uni_modules/uni-id-pages/pages/userinfo/realname-verify/realname-verify",
    style: {
      enablePullDownRefresh: false,
      navigationBarTitleText: "实名认证"
    }
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8",
  "app-plus": {
    background: "#efeff4"
  }
};
const tabBar = {
  color: "#000000",
  selectedColor: "#FCA464",
  borderStyle: "black",
  backgroundColor: "#F8F8F8",
  list: [
    {
      pagePath: "pages/activities/activities",
      iconPath: "static/activity.png",
      selectedIconPath: "static/activity_active.png",
      text: "首页"
    },
    {
      pagePath: "pages/profile/index",
      iconPath: "static/profile.png",
      selectedIconPath: "static/profile_active.png",
      text: "我的"
    }
  ]
};
const pagesJson = {
  pages,
  globalStyle,
  tabBar
};
function n(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function s(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var r = s(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, l2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, h2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = l2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var l3 = 0; l3 < c3; l3 += i3)
          this._doProcessBlock(s3, l3);
        var h3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(h3, u3);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = h2.extend({ cfg: i2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      h2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), i = r, o = (s(function(e2, t2) {
  var n2;
  e2.exports = (n2 = i, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], S2 = e4[t4 + 10], b2 = e4[t4 + 11], k2 = e4[t4 + 12], I2 = e4[t4 + 13], T = e4[t4 + 14], C2 = e4[t4 + 15], A2 = i3[0], P2 = i3[1], E2 = i3[2], O = i3[3];
      A2 = u2(A2, P2, E2, O, o3, 7, a2[0]), O = u2(O, A2, P2, E2, c3, 12, a2[1]), E2 = u2(E2, O, A2, P2, p2, 17, a2[2]), P2 = u2(P2, E2, O, A2, f2, 22, a2[3]), A2 = u2(A2, P2, E2, O, g2, 7, a2[4]), O = u2(O, A2, P2, E2, m2, 12, a2[5]), E2 = u2(E2, O, A2, P2, y2, 17, a2[6]), P2 = u2(P2, E2, O, A2, _2, 22, a2[7]), A2 = u2(A2, P2, E2, O, w2, 7, a2[8]), O = u2(O, A2, P2, E2, v2, 12, a2[9]), E2 = u2(E2, O, A2, P2, S2, 17, a2[10]), P2 = u2(P2, E2, O, A2, b2, 22, a2[11]), A2 = u2(A2, P2, E2, O, k2, 7, a2[12]), O = u2(O, A2, P2, E2, I2, 12, a2[13]), E2 = u2(E2, O, A2, P2, T, 17, a2[14]), A2 = l2(A2, P2 = u2(P2, E2, O, A2, C2, 22, a2[15]), E2, O, c3, 5, a2[16]), O = l2(O, A2, P2, E2, y2, 9, a2[17]), E2 = l2(E2, O, A2, P2, b2, 14, a2[18]), P2 = l2(P2, E2, O, A2, o3, 20, a2[19]), A2 = l2(A2, P2, E2, O, m2, 5, a2[20]), O = l2(O, A2, P2, E2, S2, 9, a2[21]), E2 = l2(E2, O, A2, P2, C2, 14, a2[22]), P2 = l2(P2, E2, O, A2, g2, 20, a2[23]), A2 = l2(A2, P2, E2, O, v2, 5, a2[24]), O = l2(O, A2, P2, E2, T, 9, a2[25]), E2 = l2(E2, O, A2, P2, f2, 14, a2[26]), P2 = l2(P2, E2, O, A2, w2, 20, a2[27]), A2 = l2(A2, P2, E2, O, I2, 5, a2[28]), O = l2(O, A2, P2, E2, p2, 9, a2[29]), E2 = l2(E2, O, A2, P2, _2, 14, a2[30]), A2 = h2(A2, P2 = l2(P2, E2, O, A2, k2, 20, a2[31]), E2, O, m2, 4, a2[32]), O = h2(O, A2, P2, E2, w2, 11, a2[33]), E2 = h2(E2, O, A2, P2, b2, 16, a2[34]), P2 = h2(P2, E2, O, A2, T, 23, a2[35]), A2 = h2(A2, P2, E2, O, c3, 4, a2[36]), O = h2(O, A2, P2, E2, g2, 11, a2[37]), E2 = h2(E2, O, A2, P2, _2, 16, a2[38]), P2 = h2(P2, E2, O, A2, S2, 23, a2[39]), A2 = h2(A2, P2, E2, O, I2, 4, a2[40]), O = h2(O, A2, P2, E2, o3, 11, a2[41]), E2 = h2(E2, O, A2, P2, f2, 16, a2[42]), P2 = h2(P2, E2, O, A2, y2, 23, a2[43]), A2 = h2(A2, P2, E2, O, v2, 4, a2[44]), O = h2(O, A2, P2, E2, k2, 11, a2[45]), E2 = h2(E2, O, A2, P2, C2, 16, a2[46]), A2 = d2(A2, P2 = h2(P2, E2, O, A2, p2, 23, a2[47]), E2, O, o3, 6, a2[48]), O = d2(O, A2, P2, E2, _2, 10, a2[49]), E2 = d2(E2, O, A2, P2, T, 15, a2[50]), P2 = d2(P2, E2, O, A2, m2, 21, a2[51]), A2 = d2(A2, P2, E2, O, k2, 6, a2[52]), O = d2(O, A2, P2, E2, f2, 10, a2[53]), E2 = d2(E2, O, A2, P2, S2, 15, a2[54]), P2 = d2(P2, E2, O, A2, c3, 21, a2[55]), A2 = d2(A2, P2, E2, O, w2, 6, a2[56]), O = d2(O, A2, P2, E2, C2, 10, a2[57]), E2 = d2(E2, O, A2, P2, y2, 15, a2[58]), P2 = d2(P2, E2, O, A2, I2, 21, a2[59]), A2 = d2(A2, P2, E2, O, g2, 6, a2[60]), O = d2(O, A2, P2, E2, b2, 10, a2[61]), E2 = d2(E2, O, A2, P2, p2, 15, a2[62]), P2 = d2(P2, E2, O, A2, v2, 21, a2[63]), i3[0] = i3[0] + A2 | 0, i3[1] = i3[1] + P2 | 0, i3[2] = i3[2] + E2 | 0, i3[3] = i3[3] + O | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var l3 = c3[u3];
        c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), s(function(e2, t2) {
  var n2;
  e2.exports = (n2 = i, void function() {
    var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), s(function(e2, t2) {
  e2.exports = i.HmacMD5;
})), a = s(function(e2, t2) {
  e2.exports = i.enc.Utf8;
}), c = s(function(e2, t2) {
  var n2;
  e2.exports = (n2 = i, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s2(e4, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
      e4.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e4.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const u = "FUNCTION", l = "OBJECT", h = "CLIENT_DB", d = "pending", p = "fullfilled", f = "rejected";
function g(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function m(e2) {
  return "object" === g(e2);
}
function y(e2) {
  return "function" == typeof e2;
}
function _(e2) {
  return function() {
    try {
      return e2.apply(e2, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const w = "REJECTED", v = "NOT_PENDING";
class S {
  constructor({ createPromise: e2, retryRule: t2 = w } = {}) {
    this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case w:
        return this.status === f;
      case v:
        return this.status !== d;
    }
  }
  exec() {
    return this.needRetry ? (this.status = d, this.promise = this.createPromise().then((e2) => (this.status = p, Promise.resolve(e2)), (e2) => (this.status = f, Promise.reject(e2))), this.promise) : this.promise;
  }
}
function b(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const k = true, I = "mp-weixin", C = b([]), A = I, P = b('{\n    "address": [\n        "127.0.0.1",\n        "10.133.222.237"\n    ],\n    "debugPort": 9000,\n    "initialLaunchType": "remote",\n    "servePort": 7000,\n    "skipFiles": [\n        "<node_internals>/**",\n        "C:/Users/SundayV/Desktop/HBuilderX/plugins/unicloud/**/*.js"\n    ]\n}\n'), E = b('[{"provider":"aliyun","spaceName":"domain","spaceId":"mp-fb54f15e-7cae-4c63-8d69-2685c29ab4f7","clientSecret":"vL27o/od+gJt9xa8fLtdeg==","endpoint":"https://api.next.bspapp.com"}]') || [];
let x = "";
try {
  x = "__UNI__5DFC08B";
} catch (e2) {
}
let R = {};
function U(e2, t2 = {}) {
  var n2, s2;
  return n2 = R, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (R[e2] = t2), R[e2];
}
const L = ["invoke", "success", "fail", "complete"], N = U("_globalUniCloudInterceptor");
function D(e2, t2) {
  N[e2] || (N[e2] = {}), m(t2) && Object.keys(t2).forEach((n2) => {
    L.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = N[e3][t3];
      s2 || (s2 = N[e3][t3] = []), -1 === s2.indexOf(n3) && y(n3) && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function F(e2, t2) {
  N[e2] || (N[e2] = {}), m(t2) ? Object.keys(t2).forEach((n2) => {
    L.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = N[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete N[e2];
}
function q(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function K(e2, t2) {
  return N[e2] && N[e2][t2] || [];
}
function M(e2) {
  D("callObject", e2);
}
const j = U("_globalUniCloudListener"), B = "response", $ = "needLogin", W = "refreshToken", z = "clientdb", J = "cloudfunction", H = "cloudobject";
function G(e2) {
  return j[e2] || (j[e2] = []), j[e2];
}
function V(e2, t2) {
  const n2 = G(e2);
  n2.includes(t2) || n2.push(t2);
}
function Y(e2, t2) {
  const n2 = G(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function Q(e2, t2) {
  const n2 = G(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
let X, Z = false;
function ee() {
  return X || (X = new Promise((e2) => {
    Z && e2(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (Z = true, e2());
      }
      Z || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), X);
}
function te(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const s2 = e2[n2];
    y(s2) && (t2[n2] = _(s2));
  }
  return t2;
}
class ne extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
  }
  toJson(e2 = 0) {
    if (!(e2 >= 10))
      return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
  }
}
var se = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync() };
function re(e2) {
  return e2 && re(e2.__v_raw) || e2;
}
function ie() {
  return { token: se.getStorageSync("uni_id_token") || se.getStorageSync("uniIdToken"), tokenExpired: se.getStorageSync("uni_id_token_expired") };
}
function oe({ token: e2, tokenExpired: t2 } = {}) {
  e2 && se.setStorageSync("uni_id_token", e2), t2 && se.setStorageSync("uni_id_token_expired", t2);
}
let ae, ce;
function ue() {
  return ae || (ae = index.getSystemInfoSync()), ae;
}
function le() {
  let e2, t2;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = index.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
function he() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (ce)
    return { ...ce, locale: e2, LOCALE: e2 };
  const t2 = ue(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
  for (let e3 = 0; e3 < o2.length; e3++) {
    delete t2[o2[e3]];
  }
  return ce = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...le(), ...t2 }, { ...ce, locale: e2, LOCALE: e2 };
}
var de = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), o(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400)
        return s2(new ne({ code: "SYS_ERR", message: e3.errMsg || "request:fail", requestId: t3 }));
      const r2 = e3.data;
      if (r2.error)
        return s2(new ne({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e2) {
  return c.stringify(a.parse(e2));
} }, pe = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
const { t: fe } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, "zh-Hant": { "uniCloud.init.paramRequired": "缺少参数：{param}", "uniCloud.uploadFile.fileError": "filePath应为File对象" }, en: pe, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: pe }, "zh-Hans");
var ge = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(fe("uniCloud.init.paramRequired", { param: t2 }));
    }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = se, this._getAccessTokenPromiseHub = new S({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new ne({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: v });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return de.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new ne({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
    if ("string" !== g(t2))
      throw new ne({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new ne({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new ne({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const i2 = r2 && r2.envType || this.config.envType, o2 = (await this.getOSSUploadOptionsFromPath({ env: i2, filename: t2 })).result, a2 = "https://" + o2.cdnDomain + "/" + o2.ossPath, { securityToken: c2, accessKeyId: u2, signature: l2, host: h2, ossPath: d2, id: p2, policy: f2, ossCallbackUrl: m2 } = o2, y2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: u2, Signature: l2, host: h2, id: p2, key: d2, policy: f2, success_action_status: 200 };
    if (c2 && (y2["x-oss-security-token"] = c2), m2) {
      const e3 = JSON.stringify({ callbackUrl: m2, callbackBody: JSON.stringify({ fileId: p2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      y2.callback = de.toBase64(e3);
    }
    const _2 = { url: "https://" + o2.host, formData: y2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, _2, { onUploadProgress: s2 })), m2)
      return { success: true, filePath: e2, fileID: a2 };
    if ((await this.reportOSSUpload({ id: p2 })).success)
      return { success: true, filePath: e2, fileID: a2 };
    throw new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var me = { init(e2) {
  const t2 = new ge(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const ye = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var _e;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(_e || (_e = {}));
var we = function() {
};
const ve = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new ne({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function Se(e2) {
  return void 0 === e2;
}
function be(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
var ke;
function Ie(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(ke || (ke = {}));
const Te = { adapter: null, runtime: void 0 }, Ce = ["anonymousUuidKey"];
class Ae extends we {
  constructor() {
    super(), Te.adapter.root.tcbObject || (Te.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    Te.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return Te.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete Te.adapter.root.tcbObject[e2];
  }
  clear() {
    delete Te.adapter.root.tcbObject;
  }
}
function Pe(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new Ae();
    case "none":
      return new Ae();
    default:
      return t2.sessionStorage || new Ae();
  }
}
class Ee {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = Te.adapter.primaryStorage || e2.persistence, this._storage = Pe(this._persistence, Te.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: o2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = Pe(e2, Te.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && Ce.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      Se(r2) || be(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const Oe = {}, xe = {};
function Re(e2) {
  return Oe[e2];
}
class Ue {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Le extends Ue {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const Ne = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Le)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new Ue(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function De(e2, t2) {
  Ne.on(e2, t2);
}
function Fe(e2, t2 = {}) {
  Ne.fire(e2, t2);
}
function qe(e2, t2) {
  Ne.off(e2, t2);
}
const Ke = "loginStateChanged", Me = "loginStateExpire", je = "loginTypeChanged", Be = "anonymousConverted", $e = "refreshAccessToken";
var We;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(We || (We = {}));
const ze = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Je = { "X-SDK-Version": "1.3.5" };
function He(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
  };
}
function Ge() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...Je, "x-seqid": e2 } };
}
class Ve {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new Te.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Re(this.config.env), this._localCache = (t2 = this.config.env, xe[t2]), He(this._reqClass, "post", [Ge]), He(this._reqClass, "upload", [Ge]), He(this._reqClass, "download", [Ge]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new ne({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === We.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        Fe(Me), this._cache.removeStore(n2);
      }
      throw new ne({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return Fe($e), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new ne({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    if (-1 === ze.indexOf(e2)) {
      const { refreshTokenKey: e3 } = this._cache.keys;
      this._cache.getStore(e3) && (i2.access_token = (await this.getAccessToken()).accessToken);
    }
    let o2;
    if ("storage.uploadFile" === e2) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i2)
        void 0 !== i2[e3] && (o2[e3] = i2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: l2, search: h2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
    let p2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(ye, "//tcb-api.tencentcloudapi.com/web", d2);
    h2 && (p2 += h2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new ne({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e2, t2 = {}) {
    const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
    if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === ze.indexOf(e2)) {
      await this.refreshAccessToken();
      const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new ne({ code: n3.data.code, message: n3.data.message });
      return n3.data;
    }
    if (n2.data.code)
      throw new ne({ code: n2.data.code, message: n2.data.message });
    return n2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const Ye = {};
function Qe(e2) {
  return Ye[e2];
}
class Xe {
  constructor(e2) {
    this.config = e2, this._cache = Re(e2.env), this._request = Qe(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class Ze {
  constructor(e2) {
    if (!e2)
      throw new ne({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = Re(this._envId), this._request = Qe(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new ne({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class et {
  constructor(e2) {
    if (!e2)
      throw new ne({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Re(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new Ze(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === We.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === We.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === We.WECHAT || this.loginType === We.WECHAT_OPEN || this.loginType === We.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
let tt$1 = class tt2 extends Xe {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (r2.uuid && r2.refresh_token) {
      this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Fe(Ke), Fe(je, { env: this.config.env, loginType: We.ANONYMOUS, persistence: "local" });
      const e3 = new et(this.config.env);
      return await e3.user.refresh(), e3;
    }
    throw new ne({ message: "匿名登录失败" });
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Fe(Be, { env: this.config.env }), Fe(je, { loginType: We.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new ne({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, We.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
};
class nt extends Xe {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new ne({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Fe(Ke), Fe(je, { env: this.config.env, loginType: We.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new et(this.config.env);
    throw new ne({ message: "自定义登录失败" });
  }
}
class st extends Xe {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new ne({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Fe(Ke), Fe(je, { env: this.config.env, loginType: We.EMAIL, persistence: this.config.persistence }), new et(this.config.env);
    throw s2.code ? new ne({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new ne({ message: "邮箱登录失败" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class rt extends Xe {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: We.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Fe(Ke), Fe(je, { env: this.config.env, loginType: We.USERNAME, persistence: this.config.persistence }), new et(this.config.env);
    throw s2.code ? new ne({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new ne({ message: "用户名密码登录失败" });
  }
}
class it {
  constructor(e2) {
    this.config = e2, this._cache = Re(e2.env), this._request = Qe(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), De(je, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new tt$1(this.config);
  }
  customAuthProvider() {
    return new nt(this.config);
  }
  emailAuthProvider() {
    return new st(this.config);
  }
  usernameAuthProvider() {
    return new rt(this.config);
  }
  async signInAnonymously() {
    return new tt$1(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new st(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new rt(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new tt$1(this.config)), De(Be, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === We.ANONYMOUS)
      throw new ne({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Fe(Ke), Fe(je, { env: this.config.env, loginType: We.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    De(Ke, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    De(Me, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    De($e, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    De(Be, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    De(je, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e2 } = this._cache.keys;
    return this._cache.getStore(e2) ? new et(this.config.env) : null;
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new ne({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new nt(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const ot = function(e2, t2) {
  t2 = t2 || ve();
  const n2 = Qe(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new ne({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, at = function(e2, t2) {
  t2 = t2 || ve();
  const n2 = Qe(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ct = function({ fileList: e2 }, t2) {
  if (t2 = t2 || ve(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e2 };
  return Qe(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ut = function({ fileList: e2 }, t2) {
  t2 = t2 || ve(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return Qe(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, lt = async function({ fileID: e2 }, t2) {
  const n2 = (await ut.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = Qe(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, ht = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, i2) {
  const o2 = i2 || ve();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new ne({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
  return Qe(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
    if (e3.code)
      o2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        o2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), o2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          o2(new ne({ message: "response data must be json" }));
        }
    }
    return o2.promise;
  }).catch((e3) => {
    o2(e3);
  }), o2.promise;
}, dt = { timeout: 15e3, persistence: "session" }, pt = {};
class ft {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (Te.adapter || (this.requestClient = new Te.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...dt, ...e2 }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new ft(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || Te.adapter.primaryStorage || dt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      Oe[t3] = new Ee(e3), xe[t3] = new Ee({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, Ye[n2.env] = new Ve(n2), this.authObj = new it(this.config), this.authObj;
  }
  on(e2, t2) {
    return De.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return qe.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return ht.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return ct.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return ut.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return lt.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return ot.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return at.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    pt[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = pt[e2];
    if (!n2)
      throw new ne({ message: `扩展${e2} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = Ie(e2) || {};
    t2 && (Te.adapter = t2), n2 && (Te.runtime = n2);
  }
}
var gt = new ft();
function mt(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class yt {
  post(e2) {
    const { url: t2, data: n2, headers: s2 } = e2;
    return new Promise((e3, r2) => {
      se.request({ url: mt("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e3(t3);
      }, fail(e4) {
        r2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = se.uploadFile({ url: mt("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const _t = { setItem(e2, t2) {
  se.setStorageSync(e2, t2);
}, getItem: (e2) => se.getStorageSync(e2), removeItem(e2) {
  se.removeStorageSync(e2);
}, clear() {
  se.clearStorageSync();
} };
var wt = { genAdapter: function() {
  return { root: {}, reqClass: yt, localStorage: _t, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
gt.useAdapters(wt);
const vt = gt, St = vt.init;
vt.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = St.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s2, complete: r2 } = te(e5);
        if (!(t4 || s2 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s2 && s2(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var bt = vt;
var kt = class extends ge {
  getAccessToken() {
    return new Promise((e2, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e2(n2);
    });
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret);
    const r2 = he();
    s2["x-client-info"] = encodeURIComponent(JSON.stringify(r2));
    const { token: i2 } = ie();
    return s2["x-client-token"] = i2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new ne({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new ne({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      r2 = t3.result.fileUrl;
      const c2 = { url: i2, formData: o2, name: a2, filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new ne({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2)).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new ne({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new ne({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2)).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new ne({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var It = { init(e2) {
  const t2 = new kt(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
function Tt({ data: e2 }) {
  let t2;
  t2 = he();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = ie();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
async function Ct({ name: e2, data: t2 } = {}) {
  await this.__dev__.initLocalNetwork();
  const { localAddress: n2, localPort: s2 } = this.__dev__, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], i2 = this.config.spaceId, o2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
  return new Promise((t3, n3) => {
    se.request({ method: "POST", url: o2, data: { name: e2, platform: A, provider: r2, spaceId: i2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下，自动切换为已部署的云函数。" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: n3, message: s3 }) => {
    if (0 !== n3) {
      switch (n3) {
        case "MODULE_ENCRYPTED":
          console.error(`此云函数（${e2}）依赖加密公共模块不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`此云函数（${e2}）已加密不可本地调试，自动切换为云端已部署的云函数`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(s3 || "需要访问加密的uni-clientDB-action，自动切换为云端环境");
          break;
        case "NETWORK_ERROR": {
          const e3 = "连接本地调试服务失败，请检查客户端是否和主机在同一局域网下";
          throw console.error(e3), new Error(e3);
        }
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `检测本地调试服务出现错误：${s3}，请检查网络环境或重启客户端再试`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._callCloudFunction({ name: e2, data: t2 });
    }
    return new Promise((e3, n4) => {
      const s4 = Tt.call(this, { data: t2 });
      se.request({ method: "POST", url: a2, data: { provider: r2, platform: A, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new ne({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
        n4(new ne({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
      } });
    });
  });
}
const At = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var Pt = /[\\^$.*+?()[\]{}|]/g, Et = RegExp(Pt.source);
function Ot(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Et.test(s2) ? s2.replace(Pt, "\\$&") : s2, "g"), n2);
  var s2;
}
const Rt = "request", Ut = "response", Lt = "both";
const yn = { code: 2e4, message: "System error" }, _n = { code: 20101, message: "Invalid client" };
function Sn(e2) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
  return new ne({ subject: t2 || n2 || "uni-secure-network", code: s2 || i2 || yn.code, message: r2 || o2, cause: a2 });
}
let kn;
function Pn({ secretType: e2 } = {}) {
  return e2 === Rt || e2 === Ut || e2 === Lt;
}
function En({ name: e2, data: t2 = {} } = {}) {
  return "app" === A;
}
function On({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = ue();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = C;
    if (!n3)
      return {};
    e3 = function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e2, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const l2 = function(e3, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!l2)
    return false;
  if ((c2[l2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), Sn(_n);
}
function xn({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.__dev__.debugLog && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Rn(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Tt.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider], i2 = Pn(n3), o2 = En(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && xn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && xn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e5 = 1; e5 < a3.length; e5++)
          c2 = Ot(c2, `{$${e5}}`, a3[e5]);
        for (const e5 in t3)
          c2 = Ot(c2, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: At, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, e2.__dev__.debugInfo && !e2.__dev__.debugInfo.forceRemote && E ? (e2._callCloudFunction || (e2._callCloudFunction = n2, e2._callLocalFunction = Ct), o2 = Ct) : o2 = n2, o2 = o2.bind(e2), En(t3))
      ;
    else if (function({ name: e3, data: t4 = {} }) {
      return "uni-id-co" === e3 && "secureNetworkHandshakeByWeixin" === t4.method;
    }(t3))
      a2 = o2.call(e2, t3);
    else if (Pn(t3)) {
      a2 = new kn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
    } else if (On({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new kn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2;
  };
}
kn = class {
  constructor() {
    throw Sn({ message: `Platform ${A} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Un = Symbol("CLIENT_DB_INTERNAL");
function Ln(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Un, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function Nn(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const Dn = ["db.Geo", "db.command", "command.aggregate"];
function Fn(e2, t2) {
  return Dn.indexOf(`${e2}.${t2}`) > -1;
}
function qn(e2) {
  switch (g(e2 = re(e2))) {
    case "array":
      return e2.map((e3) => qn(e3));
    case "object":
      return e2._internalType === Un || Object.keys(e2).forEach((t2) => {
        e2[t2] = qn(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function Kn(e2) {
  return e2 && e2.content && e2.content.$method;
}
class Mn {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: qn(e3.$param) })) };
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Kn(e2), n2 = Kn(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === Kn(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Kn(e2), n2 = Kn(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  getNextStageFn(e2) {
    const t2 = this;
    return function() {
      return jn({ $method: e2, $param: qn(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: qn(t2) }), k) {
      const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("检测到使用JQL语法联表查询时，未使用getTemp先过滤主表数据，在主表数据量大的情况下可能会查询缓慢。\n- 如何优化请参考此文档：https://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- 如果主表数据量很小请忽略此信息，项目发行时不会出现此提示。");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function jn(e2, t2, n2) {
  return Ln(new Mn(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), Fn(s2, t3) ? jn({ $method: t3 }, e3, n2) : function() {
      return jn({ $method: t3, $param: qn(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function Bn({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
  };
}
function $n(e2, t2 = {}) {
  return Ln(new e2(t2), { get: (e3, t3) => Fn("db", t3) ? jn({ $method: t3 }, null, e3) : function() {
    return jn({ $method: t3, $param: qn(Array.from(arguments)) }, null, e3);
  } });
}
class Wn extends class {
  constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Nn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Nn(this._dbCallBacks)), this.env = Ln({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Ln({}, { get: (e3, t3) => Bn({ path: ["Geo"], method: t3 }) }), this.serverDate = Bn({ path: [], method: "serverDate" }), this.RegExp = Bn({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _parseResult(e2) {
    return this._isJQL ? e2.result : e2;
  }
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e3) {
      return i2._callback("error", [e3]), q(K(o2, "fail"), e3).then(() => q(K(o2, "complete"), e3)).then(() => (r2(null, e3), Q(B, { type: z, content: e3 }), Promise.reject(e3)));
    }
    const c2 = q(K(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: h, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4], r3 = console[t4] || console.log;
          let i3 = "[System Info]" + n4;
          s4 && (i3 = `${i3}
详细信息：${s4}`), r3(i3);
        }
      if (t3) {
        return a2(new ne({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (oe({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Q(W, { token: s3, tokenExpired: c3 }));
      const l2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < l2.length; t4++) {
        const { prop: n4, tips: s4 } = l2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return q(K(o2, "success"), e4).then(() => q(K(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i2._parseResult(e4);
          return Q(B, { type: z, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new ne({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const zn = "token无效，跳转登录页面", Jn = "token过期，跳转登录页面", Hn = { TOKEN_INVALID_TOKEN_EXPIRED: Jn, TOKEN_INVALID_INVALID_CLIENTID: zn, TOKEN_INVALID: zn, TOKEN_INVALID_WRONG_TOKEN: zn, TOKEN_INVALID_ANONYMOUS_USER: zn }, Gn = { "uni-id-token-expired": Jn, "uni-id-check-token-failed": zn, "uni-id-token-not-exist": zn, "uni-id-check-device-feature-failed": zn };
function Vn(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function Yn(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(Vn(t2, e3.path)) : false === e3.needLogin && s2.push(Vn(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function Qn(e2) {
  return e2.split("?")[0].replace(/^\//, "");
}
function Xn() {
  return function(e2) {
    let t2 = e2 && e2.$page && e2.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e2 = getCurrentPages();
    return e2[e2.length - 1];
  }());
}
function Zn() {
  return Qn(Xn());
}
function es(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = Qn(e2);
  return n2.some((e3) => e3.pagePath === s2);
}
const ts = !!pagesJson.uniIdRouter;
const { loginPage: ns, routerNeedLogin: ss, resToLogin: rs, needLoginPage: is, notNeedLoginPage: os, loginPageInTabBar: as } = function({ pages: e2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = pagesJson) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Yn(e2), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e3 = []) {
    const t2 = [], n3 = [];
    return e3.forEach((e4) => {
      const { root: s3, pages: r3 = [] } = e4, { needLoginPage: i3, notNeedLoginPage: o3 } = Yn(r3, s3);
      t2.push(...i3), n3.push(...o3);
    }), { needLoginPage: t2, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: es(i2, r2) };
}();
if (is.indexOf(ns) > -1)
  throw new Error(`Login page [${ns}] should not be "needLogin", please check your pages.json`);
function cs(e2) {
  const t2 = Zn();
  if ("/" === e2.charAt(0))
    return e2;
  const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function us(e2) {
  const t2 = Qn(cs(e2));
  return !(os.indexOf(t2) > -1) && (is.indexOf(t2) > -1 || ss.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function ls({ redirect: e2 }) {
  const t2 = Qn(e2), n2 = Qn(ns);
  return Zn() !== n2 && t2 !== n2;
}
function hs({ api: e2, redirect: t2 } = {}) {
  if (!t2 || !ls({ redirect: t2 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(ns, t2);
  as ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
  const s2 = { navigateTo: index.navigateTo, redirectTo: index.redirectTo, switchTab: index.switchTab, reLaunch: index.reLaunch };
  setTimeout(() => {
    s2[e2]({ url: n2 });
  });
}
function ds({ url: e2 } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = ie();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: Gn[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: Gn[e4] };
    }
    return n3;
  }();
  if (us(e2) && n2) {
    n2.uniIdRedirectUrl = e2;
    if (G($).length > 0)
      return setTimeout(() => {
        Q($, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function ps() {
  !function() {
    const e3 = Xn(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = ds({ url: e3 });
    t2 || n2 && hs({ api: "redirectTo", redirect: e3 });
  }();
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    index.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = ds({ url: e3.url });
      return t3 ? e3 : s2 ? (hs({ api: n2, redirect: cs(e3.url) }), false) : e3;
    } });
  }
}
function fs() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in Gn;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in Hn;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = G($);
      ee().then(() => {
        const n3 = Xn();
        if (n3 && ls({ redirect: n3 }))
          return t3.length > 0 ? Q($, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (ns && hs({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function gs(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      V(B, e4);
    }, e3.offResponse = function(e4) {
      Y(B, e4);
    };
  }(e2), function(e3) {
    e3.onNeedLogin = function(e4) {
      V($, e4);
    }, e3.offNeedLogin = function(e4) {
      Y($, e4);
    }, ts && (U("_globalUniCloudStatus").needLoginInit || (U("_globalUniCloudStatus").needLoginInit = true, ee().then(() => {
      ps.call(e3);
    }), rs && fs.call(e3)));
  }(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      V(W, e4);
    }, e3.offRefreshToken = function(e4) {
      Y(W, e4);
    };
  }(e2);
}
let ms;
const ys = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", _s = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function ws() {
  const e2 = ie().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ms(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
ms = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !_s.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
    t2 = ys.indexOf(e2.charAt(i2++)) << 18 | ys.indexOf(e2.charAt(i2++)) << 12 | (n2 = ys.indexOf(e2.charAt(i2++))) << 6 | (s2 = ys.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var vs = s(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = i3[s5];
          e4.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < o2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = index.chooseFile;
          if ("undefined" != typeof wx$1 && "function" == typeof wx$1.chooseMessageFile && (o2 = wx$1.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), Ss = n(vs);
const bs = "manual";
function ks(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === bs)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2 = e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const l2 = t2.orderby || this.orderby;
    l2 && (n2 = n2.orderBy(l2));
    const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function Is(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get: (s3, c2) => function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
      return async function(...s4) {
        const r3 = n3 ? n3({ params: s4 }) : {};
        let i3, o3;
        try {
          return await q(K(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await q(K(t3, "success"), { ...r3, result: i3 }), i3;
        } catch (e4) {
          throw o3 = e4, await q(K(t3, "fail"), { ...r3, error: o3 }), o3;
        } finally {
          await q(K(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
        }
      };
    }({ fn: async function s4(...u2) {
      let h2;
      a2 && index.showLoading({ title: r2.title, mask: r2.mask });
      const d2 = { name: t2, type: l, data: { method: c2, params: u2 } };
      "object" == typeof n2.secretMethods && function(e3, t3) {
        const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
        r3 && (t3.secretType = r3);
      }(n2, d2);
      let p2 = false;
      try {
        h2 = await e2.callFunction(d2);
      } catch (e3) {
        p2 = true, h2 = { result: new ne(e3) };
      }
      const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
      if (a2 && index.hideLoading(), y2 && y2.token && y2.tokenExpired && (oe(y2), Q(W, { ...y2 })), g2) {
        let e3 = m2;
        if (p2 && o2) {
          e3 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
        }
        if (a2)
          if ("toast" === i2.type)
            index.showToast({ title: e3, icon: "none" });
          else {
            if ("modal" !== i2.type)
              throw new Error(`Invalid errorOptions.type: ${i2.type}`);
            {
              const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                return new Promise((i3, o3) => {
                  index.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                    i3(e5);
                  }, fail() {
                    i3({ confirm: false, cancel: true });
                  } });
                });
              }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
              if (i2.retry && t3)
                return s4(...u2);
            }
          }
        const n3 = new ne({ subject: f2, code: g2, message: m2, requestId: h2.requestId });
        throw n3.detail = h2.result, Q(B, { type: H, content: n3 }), n3;
      }
      return Q(B, { type: H, content: h2.result }), h2.result;
    }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
      return { objectName: t2, methodName: c2, params: e3 };
    } }) });
  };
}
function Ts(e2) {
  return U("_globalUniCloudSecureNetworkCache__{spaceId}".replace("{spaceId}", e2.config.spaceId));
}
async function Cs({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
  const n2 = Ts(this);
  if (e2 && t2)
    throw new Error("[SecureNetwork] openid and callLoginByWeixin cannot be passed at the same time");
  if (e2)
    return n2.mpWeixinOpenid = e2, {};
  const s2 = await new Promise((e3, t3) => {
    index.login({ success(t4) {
      e3(t4.code);
    }, fail(e4) {
      t3(new Error(e4.errMsg));
    } });
  }), r2 = this.importObject("uni-id-co", { customUI: true });
  return await r2.secureNetworkHandshakeByWeixin({ code: s2, callLoginByWeixin: t2 }), n2.mpWeixinCode = s2, { code: s2 };
}
async function As(e2) {
  const t2 = Ts(this);
  return t2.initPromise || (t2.initPromise = Cs.call(this, e2)), t2.initPromise;
}
function Ps(e2) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return As.call(e2, { openid: t2, callLoginByWeixin: n2 });
  };
}
async function Es(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      se.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
async function Os(e2) {
  const t2 = e2.__dev__;
  if (!t2.debugInfo)
    return;
  const { address: n2, servePort: s2 } = t2.debugInfo, { address: r2 } = await async function(e3, t3) {
    let n3;
    for (let s3 = 0; s3 < e3.length; s3++) {
      const r3 = e3[s3];
      if (await Es(r3, t3)) {
        n3 = r3;
        break;
      }
    }
    return { address: n3, port: t3 };
  }(n2, s2);
  if (r2)
    return t2.localAddress = r2, void (t2.localPort = s2);
  const i2 = console["warn"];
  let o2 = "";
  if ("remote" === t2.debugInfo.initialLaunchType ? (t2.debugInfo.forceRemote = true, o2 = "当前客户端和HBuilderX不在同一局域网下（或其他网络原因无法连接HBuilderX），uniCloud本地调试服务不对当前客户端生效。\n- 如果不使用uniCloud本地调试服务，请直接忽略此信息。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。") : o2 = "无法连接uniCloud本地调试服务，请检查当前客户端是否与主机在同一局域网下。\n- 如需使用uniCloud本地调试服务，请将客户端与主机连接到同一局域网下并重新运行到客户端。", o2 += "\n- 如果在HBuilderX开启的状态下切换过网络环境，请重启HBuilderX后再试\n- 检查系统防火墙是否拦截了HBuilderX自带的nodejs\n- 检查是否错误的使用拦截器修改uni.request方法的参数", 0 === A.indexOf("mp-") && (o2 += "\n- 小程序中如何使用uniCloud，请参考：https://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), !t2.debugInfo.forceRemote)
    throw new Error(o2);
  i2(o2);
}
function xs(e2) {
  e2._initPromiseHub || (e2._initPromiseHub = new S({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s2 = e2.auth();
    return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const Rs = { tcb: bt, tencent: bt, aliyun: me, private: It };
let Us = new class {
  init(e2) {
    let t2 = {};
    const n2 = Rs[e2.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e2), function(e3) {
      const t3 = {};
      e3.__dev__ = t3, t3.debugLog = "app" === A;
      const n3 = P;
      n3 && !n3.code && (t3.debugInfo = n3);
      const s2 = new S({ createPromise: function() {
        return Os(e3);
      } });
      t3.initLocalNetwork = function() {
        return s2.exec();
      };
    }(t2), xs(t2), Rn(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = $n(Wn, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = $n(Wn, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e3) {
      e3.getCurrentUserInfo = ws, e3.chooseAndUploadFile = Ss.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return ks(e3);
      } }), e3.importObject = Is(e3), e3.initSecureNetworkByWeixin = Ps(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e3] = function(e4, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || u;
            s2 = e5 !== u;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: c2 } = te(n4), l2 = i2.then(() => s2 ? Promise.resolve() : q(K(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : q(K(t3, "success"), e5).then(() => q(K(t3, "complete"), e5)).then(() => (r2 && Q(B, { type: J, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : q(K(t3, "fail"), e5).then(() => q(K(t3, "complete"), e5)).then(() => (Q(B, { type: J, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a2 || c2))
            return l2;
          l2.then((e5) => {
            o2 && o2(e5), c2 && c2(e5), r2 && Q(B, { type: J, content: e5 });
          }, (e5) => {
            a2 && a2(e5), c2 && c2(e5), r2 && Q(B, { type: J, content: e5 });
          });
        };
      }(t2[e3], e3).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e2 = E;
  let t2 = {};
  if (e2 && 1 === e2.length)
    t2 = e2[0], Us = Us.init(t2), Us._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      Us[e3] = function() {
        return console.error(n2), Promise.reject(new ne({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  Object.assign(Us, { get mixinDatacom() {
    return ks(Us);
  } }), gs(Us), Us.addInterceptor = D, Us.removeInterceptor = F, Us.interceptObject = M;
})();
var Ls = Us;
exports.Ls = Ls;
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f$1;
exports.index = index;
exports.initVueI18n = initVueI18n;
exports.n = n$1;
exports.o = o$1;
exports.p = p$1;
exports.pagesJson = pagesJson;
exports.reactive = reactive;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.sr = sr;
exports.t = t;
exports.wx$1 = wx$1;
