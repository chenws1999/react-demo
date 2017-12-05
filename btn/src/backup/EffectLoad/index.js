import bind from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
/*
   type: PropTypes.number, //总共有四种类型可选 分别为0,1,2,3
    style: PropTypes.object //可以传入 width height之类来控制组件的大小
*/
export default function EffectLoad({type = 0, style = {}}) {

    switch (type) {
        case 1: 
            return (
                <div className="loading" style={style}>
                    <div class="loading1">
                        <span></span>
                    </div>
                </div>
            )
        case 2:
            return (
                <div className="loading" style={style}>
                    <div class="loading2">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            )
        case 3: 
            return (
                <div className="loading" style={style}>
                    <div className="loading3">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                    </div>
                </div>
            )
        default : 
            return (
                <div className="loading loading0" style={style}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            )
    }
}

EffectLoad.proptypes = {
    type: PropTypes.number,
    style: PropTypes.object
}