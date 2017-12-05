import bind from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
/*
props: 
  size: 控制大小，可选值有 'large'(默认),'small', 'medium'
*/
const loadingSize = [
    {
        large: {
            width: '200px',
            height: '20px'
        },
        medium: {
            width: '120px',
            height: '12px'
        },
        small: {
            width: '80px',
            height: '8px'
        }
    }
]
export default function EffectLoad({size = 'large'}) {
        return (
            <div className="loading loading1" style={loadingSize[0][size] || loadingSize[0]['large']}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
}

EffectLoad.proptypes = {
    size: PropTypes.string
}