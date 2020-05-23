"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = /*#__PURE__*/function (_React$Component) {
  _inherits(Select, _React$Component);

  var _super = _createSuper(Select);

  function Select(props) {
    var _this;

    _classCallCheck(this, Select);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleTriggerClick", function (e) {
      e.stopPropagation();

      if (_this.props.disabled) {
        return;
      }

      _this.setState({
        shown: !_this.state.shown,
        top: _this.setPosition(false)
      }, _this.scrollToSelectedOption);
    });

    _defineProperty(_assertThisInitialized(_this), "setPosition", function () {
      var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var panelHeight = parseInt(window.getComputedStyle(_this.listWrap, null).getPropertyValue('height'));

      if (isUpdate) {
        _this.setState({
          top: (0, _utils.setPanelPosition)(panelHeight, _this.areaRect)
        });
      } else {
        return (0, _utils.setPanelPosition)(panelHeight, _this.areaRect);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDocClick", function (e) {
      var target = e.target;

      if (!(0, _utils.contains)(_this.rootDOM.current, target) && _this.state.shown) {
        _this.setState({
          shown: false
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleDocResize", function () {
      _this.areaRect = _this.rootDOM.current.getBoundingClientRect();

      _this.setPosition();
    });

    _defineProperty(_assertThisInitialized(_this), "handleOptionClick", function (option) {
      var _option$props = option.props,
          value = _option$props.value,
          label = _option$props.label;

      if (typeof _this.props.onChange === 'function') {
        _this.props.onChange(value, label);
      }

      _this.setState({
        shown: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollToSelectedOption", function () {
      var target = _this.listWrap.querySelector('.selected');

      target && (0, _utils.scrollIntoView)(_this.listWrap, target);
    });

    _defineProperty(_assertThisInitialized(_this), "setWrapRef", function (node) {
      _this.listWrap = node;
    });

    _this.state = {
      top: 32,
      shown: false
    };
    _this.rootDOM = _react["default"].createRef();
    _this.areaRect = null;
    return _this;
  }

  _createClass(Select, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          placeholder = _this$props.placeholder,
          value = _this$props.value,
          disabled = _this$props.disabled,
          size = _this$props.size,
          children = _this$props.children,
          label = _this$props.label;
      var _this$state = this.state,
          shown = _this$state.shown,
          top = _this$state.top;
      var classes = (0, _classnames["default"])('area-select', {
        'medium': size === 'medium',
        'small': size === 'small',
        'large': size === 'large',
        'is-disabled': disabled
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes,
        ref: this.rootDOM
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "area-selected-trigger",
        onClick: this.handleTriggerClick
      }, label ? label : placeholder), /*#__PURE__*/_react["default"].createElement("i", {
        className: (0, _classnames["default"])('area-select-icon', {
          'active': shown
        }),
        onClick: this.handleTriggerClick
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])('area-selectable-list-wrap area-zoom-in-top-enter', {
          'area-zoom-in-top-enter-active': shown
        }),
        style: {
          top: top
        },
        ref: this.setWrapRef
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "area-selectable-list"
      }, _react["default"].Children.map(children, function (el) {
        return _react["default"].cloneElement(el, Object.assign({}, el.props, {
          className: (0, _classnames["default"])(el.props.className, {
            'selected': el.props.value === value
          }),
          onClick: _this2.handleOptionClick.bind(_this2, el)
        }));
      }))));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.areaRect = this.rootDOM.current.getBoundingClientRect();
      window.document.addEventListener('scroll', this.handleDocResize, false);
      window.document.addEventListener('click', this.handleDocClick, false);
      window.addEventListener('resize', this.handleDocResize, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.document.removeEventListener('scroll', this.handleDocResize, false);
      window.document.removeEventListener('click', this.handleDocClick, false);
      window.removeEventListener('resize', this.handleDocResize, false);
      this.rootDOM = null;
      this.areaRect = null;
    }
  }]);

  return Select;
}(_react["default"].Component);

exports["default"] = Select;

_defineProperty(Select, "propTypes", {
  value: _propTypes["default"].any.isRequired,
  label: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  disabled: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
  onChange: _propTypes["default"].func
});

_defineProperty(Select, "defaultProps", {
  disabled: false,
  placeholder: '请选择',
  size: 'medium',
  label: ''
});

_defineProperty(Select, "displayName", 'Select');