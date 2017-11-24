/**
 * Created by linzx on 2017/5/27.
 */
import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './rangeInputStyles.css'

export default class RangeInput extends Component {

    static defaultProps = {
        min: 0,
        max: 100,
        value: 0,
        step: 1,
    };

    static propTypes = {
        step: PropTypes.number,
        min: PropTypes.number,
        max: PropTypes.number,
        onChange: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div className={styles.CPIInputRange} style={this.props.style}>
                <text className={styles.PIColorRedFont}>{this.props.value}</text>
                <div className={styles.CPIInputRangeWrap}>
                    <div className={styles.CPIblueWidth}>{this.props.min}</div>
                    <input
                        type="range"
                        className={this.props.className ? this.props.className : ''}
                        max={this.props.max}
                        min={this.props.min}
                        step={this.props.step}
                        value={this.props.value}
                        onChange={this.props.onChange.bind(this)}
                    />
                    <div className={styles.CPIblueWidth}>{this.props.max}</div>
                </div>
            </div>
        );
    }
}