"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _addons = require("@storybook/addons");

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var withViewport = (0, _addons.makeDecorator)({
  name: 'withViewport',
  parameterName: 'viewport',
  wrapper: (0, _utilDeprecate["default"])(function (getStory, context) {
    return getStory(context);
  }, 'withViewport is no longer supported, use .addParameters({ viewport }) instead')
});
var _default = withViewport;
exports["default"] = _default;