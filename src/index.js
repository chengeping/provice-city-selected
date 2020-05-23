/*
 * @Author: geping.chen
 * @Date: 2020-05-21 22:33:55
 * @Description: index.js
 * @LastEditors: geping.chen
 * @LastEditTime: 2020-05-23 15:28:47
 */ 
import React from 'react';
import PropTypes from 'prop-types';
import Select from './select/index';
import Option from './select/option';
import './index.less'

export default class AreaSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // 区域数据
            provinces: this.props.data,
            citys: {},

            // state
            curProvince: '', // text
            curCity: '',
            curArea: '',
            // 设置默认值的判断
            defaults: [],
            isSetDefault: false
        };
    }
    
    static propTypes = {
        type: PropTypes.oneOf(['code', 'text', 'all']),  // 返回类型
        placeholders: PropTypes.array, 
        level: PropTypes.oneOf([0, 1, 2]),  // 0-->一联 1->二联 2->三联
        size: PropTypes.oneOf(['small', 'medium', 'large']), // 大小
        defaultArea: PropTypes.array, // 默认值
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        data: PropTypes.array.isRequired
    }

    static defaultProps = {
        type: 'text',
        placeholders: [],
        level: 1,
        size: 'medium',
        defaultArea: [],
        disabled: false
    }

    beforeSetDefault () {
        const { defaultArea } = this.props;
        // 映射默认值，避免直接更改props
        this.setState({
            defaults: defaultArea,
            isSetDefault: true
        }, () => {
            this.setDefVal();
        });
    }

    setDefVal () {
        const { defaults } = this.state;
        // 还原默认值，避免用户选择出错
        this.setState({
            curProvince: defaults[0],
            curCity: defaults[1],
            defaults: []
        });
    }


    getAreaText () {
        const { level } = this.props;
        const { curProvince, curCity, curArea } = this.state;
        
        let texts = [];
        
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

    provinceChange (value) {
        const { level, data } = this.props;
        let SeleceTemArr = data.filter((item) => {
            return item.name === value
        })
        
        if (level ===  0) {
            this.setState({
                curProvince: value,
            }, this.selectChange);
            return;
        }
        if (level === 1) {
            this.setState({
                curProvince: value,
                curCity: (SeleceTemArr[0] && SeleceTemArr[0]['city'] && SeleceTemArr[0]['city'][0] && SeleceTemArr[0]['city'][0]['area'][0]) || '',
                citys: (SeleceTemArr[0] && SeleceTemArr[0]['city'] && SeleceTemArr[0]['city'][0]['area']) || []
            }, this.selectChange)
        } 
    }

    cityChange (code, text) {
        this.setState({
            curCity: text,
            curCityCode: code
        }, this.selectChange);
    }

    areaChange (code, text) {
        this.setState({
            curArea: text,
            curAreaCode: code,
        }, this.selectChange);
    }

    selectChange () {
        const { onChange } = this.props;
        onChange(this.getAreaText());
    }

    renderSelectComponent ( level, cb, data) {
        const { size, placeholders, ...rest } = this.props;
        const { curProvince, curCity } = this.state;
        const label = level === 0 ? curProvince : curCity;

        return (
            <Select 
                {...rest}
                value={label} 
                label={label}
                placeholder={placeholders[level] ? placeholders[level] : '请选择'} 
                size={size}
                onChange={cb}
            >
                {
                    
                       data.length ? data.map((item, index) => {

                            return item.name ? <Option key={index} value={item.name} label={item.name}></Option> :
                            <Option key={index} value={item} label={item}></Option>
                        }) : 
                        <p  className='area-select-empty'>暂无数据</p> 
                }
            </Select>
        );
    }

    render () {
        const { provinces, citys } = this.state;
        let { size, type, placeholders, level } = this.props;

        if(!['large', 'medium', 'small'].includes(size)) {
            size = 'medium';
        }

        if(!['all', 'code', 'text'].includes(type)) {
            type = 'code';
        }

        if(![0,1,2].includes(level)) {
            level = 1;
        }

        if(!Array.isArray(placeholders)) {
            placeholders = [];
        }

        return (
            <div className='area-select-wrap'>
                { this.renderSelectComponent( 0, this.provinceChange.bind(this), provinces) }
                {
                    level >= 1 ? this.renderSelectComponent( 1, this.cityChange.bind(this), citys) : null
                }
            </div>
        );
    }

    componentDidMount () {
        const { defaultArea, level } = this.props;
        if (Array.isArray(defaultArea) && defaultArea.length === level + 1) {
            this.beforeSetDefault();
        }

        if (Array.isArray(defaultArea) && defaultArea.length && defaultArea.length !== level + 1) {
            throw new Error('出错了')
        }
    }

    componentDidUpdate () {
        const { defaultArea, level } = this.props;
        const { isSetDefault } = this.state;
        
        if (!isSetDefault && Array.isArray(defaultArea) && defaultArea.length === level + 1) {
            this.beforeSetDefault();
        }

        if (!isSetDefault && Array.isArray(defaultArea) && defaultArea.length && defaultArea.length !== level + 1) {
            throw new Error('出错了')
        }
    }
}