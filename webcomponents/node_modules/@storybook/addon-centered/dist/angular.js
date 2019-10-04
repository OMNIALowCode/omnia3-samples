"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getComponentSelector(component) {
  // eslint-disable-next-line no-underscore-dangle
  return component.__annotations__[0].selector;
}

function getTemplate(metadata) {
  var tpl = '';

  if (metadata.component) {
    var selector = getComponentSelector(metadata.component);
    tpl = "<".concat(selector, "></").concat(selector, ">");
  }

  if (metadata.template) {
    tpl = metadata.template;
  }

  return "      \n      <div [ngStyle]=\"styles.style\">\n        <div [ngStyle]=\"styles.innerStyle\">\n          ".concat(tpl, "\n        </div>\n      </div>");
}

function getModuleMetadata(metadata) {
  var moduleMetadata = metadata.moduleMetadata,
      component = metadata.component;

  if (component && !moduleMetadata) {
    return {
      declarations: [metadata.component]
    };
  }

  if (component && moduleMetadata) {
    return Object.assign({}, moduleMetadata, {
      declarations: [].concat(_toConsumableArray(moduleMetadata.declarations), [metadata.component])
    });
  }

  return moduleMetadata;
}

function _default(metadataFn) {
  var metadata = metadataFn();
  return Object.assign({}, metadata, {
    template: getTemplate(metadata),
    moduleMetadata: getModuleMetadata(metadata),
    props: Object.assign({}, metadata.props, {
      styles: _styles["default"]
    })
  });
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}