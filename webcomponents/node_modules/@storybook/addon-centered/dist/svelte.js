"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _Centered = _interopRequireDefault(require("./components/Centered.svelte"));

var _styles = _interopRequireDefault(require("./styles"));

var _json2CSS = _interopRequireDefault(require("./helpers/json2CSS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var centeredStyles = {
  /** @type {string} */
  style: (0, _json2CSS["default"])(_styles["default"].style),

  /** @type {string} */
  innerStyle: (0, _json2CSS["default"])(_styles["default"].innerStyle)
};
/**
 * This functionality works by passing the svelte story component into another
 * svelte component that has the single purpose of centering the story component
 * using a wrapper and container.
 *
 * We use the special element <svelte:component /> to achieve this.
 *
 * @see https://svelte.technology/guide#svelte-component
 */

function _default(storyFn) {
  var _storyFn = storyFn(),
      OriginalComponent = _storyFn.Component,
      props = _storyFn.props,
      on = _storyFn.on;

  return {
    Component: OriginalComponent,
    props: props,
    on: on,
    Wrapper: _Centered["default"],
    WrapperData: centeredStyles
  };
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}