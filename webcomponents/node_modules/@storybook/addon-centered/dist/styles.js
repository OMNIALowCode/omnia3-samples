"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var styles = {
  style: {
    position: 'fixed',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center',
    overflow: 'auto'
  },
  innerStyle: {
    margin: 'auto',
    maxHeight: '100%' // Hack for centering correctly in IE11

  }
};
var _default = styles;
exports["default"] = _default;