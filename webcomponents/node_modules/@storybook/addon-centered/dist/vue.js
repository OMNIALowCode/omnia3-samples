"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  return {
    template: "\n      <div :style=\"style\">\n        <div :style=\"innerStyle\">\n          <story/>\n        </div>\n      </div>\n    ",
    data: function data() {
      return _styles["default"];
    }
  };
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}