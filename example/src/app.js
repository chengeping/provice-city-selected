/*
 * @Author: your name
 * @Date: 2020-05-23 16:10:04
 * @LastEditTime: 2020-05-23 17:06:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \provice-city-selected\example\src\app.js
 */ 
import React from 'react'
import { render } from 'react-dom'
import ReactDemo from '../../src/index.js'
import {data} from '../../src/data'

const App = () => {
    function handleSelectedChange (e) {
        console.log(e, '选中的省市')
    }
    return (
        <ReactDemo type='text' data={data['data']} onChange={handleSelectedChange} />
    )}
render(<App />, document.getElementById('root'))
