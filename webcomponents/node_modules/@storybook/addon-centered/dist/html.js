"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _global = require("global");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var INNER_ID = 'sb-addon-centered-inner';
var WRAPPER_ID = 'sb-addon-centered-wrapper';

function getOrCreate(id, style) {
  var elementOnDom = _global.document.getElementById(id);

  if (elementOnDom) {
    return elementOnDom;
  }

  var element = _global.document.createElement('div');

  element.setAttribute('id', id);
  Object.assign(element.style, style);
  return element;
}

function getInnerDiv() {
  return getOrCreate(INNER_ID, _styles["default"].innerStyle);
}

function getWrapperDiv() {
  return getOrCreate(WRAPPER_ID, _styles["default"].style);
}

function _default(storyFn) {
  var inner = getInnerDiv();
  var wrapper = getWrapperDiv();
  wrapper.appendChild(inner);
  var element = storyFn();

  if (typeof element === 'string') {
    inner.innerHTML = element;
  } else if (element instanceof _global.Node) {
    inner.innerHTML = '';
    inner.appendChild(element);
  } else {
    return element;
  }

  return wrapper;
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}