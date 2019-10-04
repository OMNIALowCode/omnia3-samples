"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _react = _interopRequireDefault(require("react"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default(storyFn) {
  return _react["default"].createElement("div", {
    style: _styles["default"].style
  }, _react["default"].createElement("div", {
    style: _styles["default"].innerStyle
  }, storyFn()));
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}