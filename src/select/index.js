/*
 * @Author: geping.chen
 * @Date: 2020-05-21 22:50:21
 * @Description: index.js
 * @LastEditors: geping.chen
 * @LastEditTime: 2020-05-22 14:37:02
 */ 

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { contains, scrollIntoView, setPanelPosition } from '../utils.js';

export default class Select extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            top: 32,
            shown: false
        };

        this.rootDOM = React.createRef();
        this.areaRect = null;
    }

    static propTypes = {
        value: PropTypes.any.isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        disabled: PropTypes.bool,
        placeholder: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        onChange: PropTypes.func
    }

    static defaultProps = {
        disabled: false,
        placeholder: '请选择',
        size: 'medium',
        label: ''
    }

    static displayName = 'Select'

    handleTriggerClick = (e) => {
        e.stopPropagation();
        if (this.props.disabled) {
            return;
        }
        
        this.setState({
            shown: !this.state.shown,
            top: this.setPosition(false)
        }, this.scrollToSelectedOption);
    }

    setPosition = (isUpdate = true) => {
        const panelHeight = parseInt(window.getComputedStyle(this.listWrap, null).getPropertyValue('height'));
        if (isUpdate) {
            this.setState({
                top: setPanelPosition(panelHeight, this.areaRect)
            });
        } else {
            return setPanelPosition(panelHeight, this.areaRect);
        }
    }

    handleDocClick = (e) => {
        const target = e.target;
        if (!contains(this.rootDOM.current, target) && this.state.shown) {
            this.setState({
                shown: false
            });
        }
    }

    handleDocResize = () => {
        this.areaRect = this.rootDOM.current.getBoundingClientRect();
        this.setPosition();
    }

    handleOptionClick = (option) => {
        const { value, label } = option.props;
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value, label);
        }

        this.setState({
            shown: false
        });
    }

    scrollToSelectedOption = () => {
        const target = this.listWrap.querySelector('.selected');
        target && scrollIntoView(this.listWrap, target);
    }

    setWrapRef = (node) => {
        this.listWrap = node;
    }

    render () {
        const { placeholder, value, disabled, size, children, label } = this.props;
        const { shown, top } = this.state;
        
        const classes = classNames('area-select', {
            'medium': size === 'medium',
            'small': size === 'small',
            'large': size === 'large',
            'is-disabled': disabled
        });

        return (
            <div className={classes} ref={this.rootDOM}>
                <span className='area-selected-trigger' onClick={this.handleTriggerClick}>{label ? label : placeholder}</span>
                <i className={classNames('area-select-icon', { 'active': shown })} onClick={this.handleTriggerClick}></i>
                <div className={classNames('area-selectable-list-wrap area-zoom-in-top-enter', {
                    'area-zoom-in-top-enter-active': shown
                })} style={{ top: top }} ref={this.setWrapRef}>
                    <ul className='area-selectable-list'>
                        {
                            React.Children.map(children, el => {
                                return React.cloneElement(el, Object.assign({}, el.props, {
                                    className: classNames(el.props.className, {
                                        'selected': el.props.value === value
                                    }),
                                    onClick: this.handleOptionClick.bind(this, el)
                                }));
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
    
    componentDidMount () {
        this.areaRect = this.rootDOM.current.getBoundingClientRect();
        window.document.addEventListener('scroll', this.handleDocResize, false);
        window.document.addEventListener('click', this.handleDocClick, false);
        window.addEventListener('resize', this.handleDocResize, false);
    }

    componentWillUnmount() {
        window.document.removeEventListener('scroll', this.handleDocResize, false);
        window.document.removeEventListener('click', this.handleDocClick, false);
        window.removeEventListener('resize', this.handleDocResize, false);
        this.rootDOM = null;
        this.areaRect = null;
    }
}