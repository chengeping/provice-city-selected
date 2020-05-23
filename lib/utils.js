"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contains = contains;
exports.assert = assert;
exports.isArray = isArray;
exports.scrollIntoView = scrollIntoView;
exports.setPanelPosition = setPanelPosition;

/*
 * @Author: geping.chen
 * @Date: 2020-05-21 22:36:58
 * @Description: utils工具方法
 * @LastEditors: geping.chen
 * @LastEditTime: 2020-05-21 22:37:48
 */
function contains(root, target) {
  // root 节点是否包含 target 节点
  var isElement = Object.prototype.toString.call(root).includes('Element') && Object.prototype.toString.call(target).includes('Element');

  if (!isElement) {
    return false;
  }

  var node = target;

  while (node) {
    if (node === root) {
      return true;
    }

    node = node.parentNode;
  }

  return false;
}

function assert(condition) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (!condition) {
    console.error("[react-area-linkage]: ".concat(msg));
  }
}

function isArray(param) {
  return Object.prototype.toString.call(param) === '[object Array]';
}

function scrollIntoView(container, target) {
  if (!target) {
    container.scrollTop = 0;
    return;
  } // refrence: https://github.com/ElemeFE/element/blob/dev/src/utils/scroll-into-view.js


  var top = target.offsetTop;
  var bottom = target.offsetTop + target.offsetHeight;
  var viewRectTop = container.scrollTop;
  var viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}

function setPanelPosition(panelHeight, wrapRect) {
  var wrapHeight = wrapRect.height;
  var wrapTop = wrapRect.top;
  var docHeight = document.documentElement.clientHeight;
  var panelDefTop = wrapTop + wrapHeight;
  var diff = docHeight - panelDefTop;

  if (diff < panelHeight) {
    if (wrapTop > panelHeight) {
      return -(panelHeight + 10);
    } else {
      return diff - panelHeight;
    }
  } else {
    return wrapHeight;
  }
}