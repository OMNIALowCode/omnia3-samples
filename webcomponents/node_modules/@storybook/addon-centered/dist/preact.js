"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _preact = require("preact");

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** @jsx h */
function _default(storyFn) {
  return (0, _preact.h)("div", {
    style: _styles["default"].style
  }, (0, _preact.h)("div", {
    style: _styles["default"].innerStyle
  }, storyFn()));
}