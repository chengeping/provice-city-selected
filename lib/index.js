"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = _interopRequireDefault(require("./select/index"));

var _option = _interopRequireDefault(require("./select/option"));

require("./index.less");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var AreaSelect = /*#__PURE__*/function (_React$Component) {
  _inherits(AreaSelect, _React$Component);

  var _super = _createSuper(AreaSelect);

  function AreaSelect(props) {
    var _this;

    _classCallCheck(this, AreaSelect);

    _this = _super.call(this, props);
    _this.state = {
      // 区域数据
      provinces: _this.props.data,
      citys: {},
      // state
      curProvince: '',
      // text
      curCity: '',
      curArea: '',
      // 设置默认值的判断
      defaults: [],
      isSetDefault: false
    };
    return _this;
  }

  _createClass(AreaSelect, [{
    key: "beforeSetDefault",
    value: function beforeSetDefault() {
      var _this2 = this;

      var defaultArea = this.props.defaultArea; // 映射默认值，避免直接更改props

      this.setState({
        defaults: defaultArea,
        isSetDefault: true
      }, function () {
        _this2.setDefVal();
      });
    }
  }, {
    key: "setDefVal",
    value: function setDefVal() {
      var defaults = this.state.defaults; // 还原默认值，避免用户选择出错

      this.setState({
        curProvince: defaults[0],
        curCity: defaults[1],
        defaults: []
      });
    }
  }, {
    key: "getAreaText",
    value: function getAreaText() {
      var level = this.props.level;
      var _this$state = this.state,
          curProvince = _this$state.curProvince,
          curCity = _this$state.curCity,
          curArea = _this$state.curArea;
      var texts = [];

      switch (level) {
        case 0:
          texts = [curProvince];
          break;

        case 2:
          texts = [curProvince, curCity, curArea];
          break;

        default:
          texts = [curProvince, curCity];
      }

      return texts;
    }
  }, {
    key: "provinceChange",
    value: function provinceChange(value) {
      var _this$props = this.props,
          level = _this$props.level,
          data = _this$props.data;
      var SeleceTemArr = data.filter(function (item) {
        return item.name === value;
      });

      if (level === 0) {
        this.setState({
          curProvince: value
        }, this.selectChange);
        return;
      }

      if (level === 1) {
        this.setState({
          curProvince: value,
          curCity: SeleceTemArr[0] && SeleceTemArr[0]['city'] && SeleceTemArr[0]['city'][0] && SeleceTemArr[0]['city'][0]['area'][0] || '',
          citys: SeleceTemArr[0] && SeleceTemArr[0]['city'] && SeleceTemArr[0]['city'][0]['area'] || []
        }, this.selectChange);
      }
    }
  }, {
    key: "cityChange",
    value: function cityChange(code, text) {
      this.setState({
        curCity: text,
        curCityCode: code
      }, this.selectChange);
    }
  }, {
    key: "areaChange",
    value: function areaChange(code, text) {
      this.setState({
        curArea: text,
        curAreaCode: code
      }, this.selectChange);
    }
  }, {
    key: "selectChange",
    value: function selectChange() {
      var onChange = this.props.onChange;
      onChange(this.getAreaText());
    }
  }, {
    key: "renderSelectComponent",
    value: function renderSelectComponent(level, cb, data) {
      var _this$props2 = this.props,
          size = _this$props2.size,
          placeholders = _this$props2.placeholders,
          rest = _objectWithoutProperties(_this$props2, ["size", "placeholders"]);

      var _this$state2 = this.state,
          curProvince = _this$state2.curProvince,
          curCity = _this$state2.curCity;
      var label = level === 0 ? curProvince : curCity;
      return /*#__PURE__*/_react["default"].createElement(_index["default"], _extends({}, rest, {
        value: label,
        label: label,
        placeholder: placeholders[level] ? placeholders[level] : '请选择',
        size: size,
        onChange: cb
      }), data.length ? data.map(function (item, index) {
        return item.name ? /*#__PURE__*/_react["default"].createElement(_option["default"], {
          key: index,
          value: item.name,
          label: item.name
        }) : /*#__PURE__*/_react["default"].createElement(_option["default"], {
          key: index,
          value: item,
          label: item
        });
      }) : /*#__PURE__*/_react["default"].createElement("p", {
        className: "area-select-empty"
      }, "\u6682\u65E0\u6570\u636E"));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state3 = this.state,
          provinces = _this$state3.provinces,
          citys = _this$state3.citys;
      var _this$props3 = this.props,
          size = _this$props3.size,
          type = _this$props3.type,
          placeholders = _this$props3.placeholders,
          level = _this$props3.level;

      if (!['large', 'medium', 'small'].includes(size)) {
        size = 'medium';
      }

      if (!['all', 'code', 'text'].includes(type)) {
        type = 'code';
      }

      if (![0, 1, 2].includes(level)) {
        level = 1;
      }

      if (!Array.isArray(placeholders)) {
        placeholders = [];
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "area-select-wrap"
      }, this.renderSelectComponent(0, this.provinceChange.bind(this), provinces), level >= 1 ? this.renderSelectComponent(1, this.cityChange.bind(this), citys) : null);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props4 = this.props,
          defaultArea = _this$props4.defaultArea,
          level = _this$props4.level;

      if (Array.isArray(defaultArea) && defaultArea.length === level + 1) {
        this.beforeSetDefault();
      }

      if (Array.isArray(defaultArea) && defaultArea.length && defaultArea.length !== level + 1) {
        throw new Error('出错了');
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this$props5 = this.props,
          defaultArea = _this$props5.defaultArea,
          level = _this$props5.level;
      var isSetDefault = this.state.isSetDefault;

      if (!isSetDefault && Array.isArray(defaultArea) && defaultArea.length === level + 1) {
        this.beforeSetDefault();
      }

      if (!isSetDefault && Array.isArray(defaultArea) && defaultArea.length && defaultArea.length !== level + 1) {
        throw new Error('出错了');
      }
    }
  }]);

  return AreaSelect;
}(_react["default"].Component);

exports["default"] = AreaSelect;

_defineProperty(AreaSelect, "propTypes", {
  type: _propTypes["default"].oneOf(['code', 'text', 'all']),
  // 返回类型
  placeholders: _propTypes["default"].array,
  level: _propTypes["default"].oneOf([0, 1, 2]),
  // 0-->一联 1->二联 2->三联
  size: _propTypes["default"].oneOf(['small', 'medium', 'large']),
  // 大小
  defaultArea: _propTypes["default"].array,
  // 默认值
  onChange: _propTypes["default"].func,
  disabled: _propTypes["default"].bool,
  data: _propTypes["default"].array.isRequired
});

_defineProperty(AreaSelect, "defaultProps", {
  type: 'text',
  placeholders: [],
  level: 1,
  size: 'medium',
  defaultArea: [],
  disabled: false
});