// shinepans@live.com 17-06-05

import React,{ Component } from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind';
import style from './countBtnInputStyles.scss';

let cx = classNames.bind(style);

export default class CountBtnInput extends Component {
    static defaultProps = {
        value: 0,
        style: {},
        desc: '',
        disabled: false,
        step: 1,
        vertical: false
    }

    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    dec = () => {
        if (this.props.disabled) {
            return false;
        }
        if (!this.props.click || isNaN(this.props.value)) {
            return false;
        }
        this.props.click(...this.props.decParam);
    };

    add = () => {
        if (this.props.disabled) {
            return false;
        }
        if (!this.props.click || isNaN(this.props.value)) {
            return false;
        }
        this.props.click(...this.props.addParam);
    };

    change = (e) => {
        if (this.props.textParam) {
            this.props.onText(...this.props.textParam, e.target.value);
        } else {
            this.props.onText(e.target.value);
        }
    }

    componentWillMount() {
        this.setState({
            count: this.props.value
        })
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            count: nextProps.value
        })
    }

    render () {
        return <div className={ this.props.vertical ? style.count_btn_inputV : style.count_btn_input}>
                <div className={this.props.vertical ? style.titleV : style.title}>{this.props.desc}</div>
                <div className={this.props.vertical ? style.counterV : style.counter}>
                    <div disabled={this.props.disabled}
                        className={this.props.vertical ? style.leftIconV : style.leftIcon}
                        onClick={this.dec}
                    >
                        _
                    </div>
                    <input
                        className={this.props.vertical ? style.inputV : style.input}
                           value={this.state.count}
                           onChange={this.change}
                           disabled={this.props.disabled}
                    />
                    <div disabled={this.props.disabled}
                        className={this.props.vertical ? style.rightIconV : style.rightIcon}
                        onClick={this.add}
                    >
                        +
                    </div>
                </div>
            </div>
    }
}

CountBtnInput.PropTypes = {
    desc: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
    ]),
    disabled: PropTypes.bool,
    step: PropTypes.number
}