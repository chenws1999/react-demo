/**
 * Created by liujunchi on 10/10/16.
 */

import React from 'react';

import { Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import styles from './styles.css';

let cx = classNames.bind(styles);

export default class Input extends Component {

    static defaultProps = {
        disabled: false,
        type: 'text',
        rows: '3',
        style: {display:'inline-block', paddingBottom:3},
    };

    static propTypes = {
        type: PropTypes.string,
        rows: PropTypes.string,
        disabled: PropTypes.bool,
        style: PropTypes.object,
        onChange: PropTypes.func,
    };

    handleChange = (e) => {
        this.props.onChange(e);
    };

    onFocus = () => {
        if(this.props.onFocus) {
            this.props.onFocus();
        }else{
            return;
        }
    };

    render() {
        if (this.props.kind === 'noline') {
            return (
                <input autoFocus
                    id={this.props.id}
                    type={this.props.type}
                    value={this.props.value}
                    disabled={this.props.disabled}
                    style={this.props.style}
                    placeholder={this.props.placeholder}
                    onChange={this.handleChange}
                    onFocus={this.onFocus}
                    className={cx({textNoLine:true})}
                />
            );
        }
        switch (this.props.type) {
            case 'textarea':
                return (
                    <textarea autoFocus
                        id={this.props.id}
                        rows={this.props.rows}
                        value={this.props.value}
                        disabled={this.props.disabled}
                        style={this.props.style}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}
                        onClick={this.onClick}
                        className={cx({textArea:true})}
                    >
                    </textarea>
                );
            default:
                return (
                    <input
                        {...this.props}
                        onChange={this.handleChange}
                        className={cx({textInput:true})}
                    />
                );
        }
    }
}

