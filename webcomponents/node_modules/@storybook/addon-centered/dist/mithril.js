"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _mithril = _interopRequireDefault(require("mithril"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** @jsx m */
function _default(storyFn) {
  return {
    view: function view() {
      return (0, _mithril["default"])("div", {
        style: _styles["default"].style
      }, (0, _mithril["default"])("div", {
        style: _styles["default"].innerStyle
      }, (0, _mithril["default"])(storyFn())));
    }
  };
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}