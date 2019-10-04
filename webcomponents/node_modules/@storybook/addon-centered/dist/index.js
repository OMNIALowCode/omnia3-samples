"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _global = require("global");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _react = _interopRequireDefault(require("./react"));

var _vue = _interopRequireDefault(require("./vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// TODO: REMOVE this entire file in V6.0.0
var Centered = (0, _utilDeprecate["default"])(function () {
  return _global.window.STORYBOOK_ENV === 'vue' ? _vue["default"] : _react["default"];
}, "\n  Using \"import centered from '@storybook/addon-centered'\" is deprecated.\n  Please use either:\n  \"import centered from '@storybook/addon-centered/react'\"\n  or\n  \"import centered from '@storybook/addon-centered/vue'\"\n")();
var _default = Centered;
exports["default"] = _default;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}