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

function _default(storyFn) {
  var _storyFn = storyFn(),
      template = _storyFn.template,
      context = _storyFn.context;

  var element = _global.document.createElement('div');

  Object.assign(element.style, _styles["default"].style);

  var innerElement = _global.document.createElement('div');

  Object.assign(innerElement.style, _styles["default"].innerStyle);
  element.appendChild(innerElement); // the inner element should append the parent

  innerElement.appendTo = function appendTo(el) {
    el.appendChild(element);
  };

  return {
    template: template,
    context: context,
    element: innerElement
  };
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}