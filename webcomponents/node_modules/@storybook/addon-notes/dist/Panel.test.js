"use strict";

require("core-js/modules/es.array.find");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _router = require("@reach/router");

var _components = require("@storybook/components");

var _Panel = require("./Panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('NotesPanel', function () {
  describe('SyntaxHighlighter component', function () {
    it('should return code if className is undefined', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Panel.SyntaxHighlighter, null, "some text"));
      var code = wrapper.find('code');
      expect(code.exists()).toBeTruthy();
      expect(code.text()).toBe('some text');
    });
    it('should return SyntaxHighlighterBase if there is a className prop', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Panel.SyntaxHighlighter, {
        className: "lang-jsx"
      }, "some text"));
      var syntaxHighlighterBase = wrapper.find(_components.SyntaxHighlighter);
      expect(syntaxHighlighterBase.exists()).toBeTruthy();
      expect(syntaxHighlighterBase.prop('language')).toBe('jsx');
    });
  });
  describe('NotesLink component', function () {
    it('should render storybook links with @storybook/router Link', function () {
      var component = (0, _enzyme.mount)(_react["default"].createElement(_Panel.NotesLink, {
        href: "/story/addon-notes",
        title: "title"
      }, "Storybook Link"));
      expect(component.find(_router.Link).prop('to')).toBe('/?path=/story/addon-notes');
      expect(component.find(_router.Link).prop('title')).toBe('title');
    });
    it('should render absolute links as <a>', function () {
      var component = (0, _enzyme.mount)(_react["default"].createElement(_Panel.NotesLink, {
        href: "https://example.com",
        title: "title"
      }, "Storybook Link"));
      expect(component.find('a').prop('href')).toBe('https://example.com');
      expect(component.find('a').prop('title')).toBe('title');
    });
  });
});