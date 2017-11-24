import React, {Component} from "react";
import PropTypes from "prop-types";
import style from "./style.scss";

/**
 * CountInut version v8.0
 * 这是一个包含正则的数字输入组件
 * desc     来告诉用户输入何种参数
 * regex    来限定输入规则，指定输入范围
 * onText   来直接获取用户输入结果，值为最终值，
 * step     来规定每次加减的差值
 * disabled 来禁止用户编辑
 * 一般的，默认stap为 0.1, 传入 onText、desc、value即可
 */

export default class CountBtnInput extends Component {
    static defaultProps = {
        value: 0,
        style: {},
        desc: '',
        step: 0.1,
        disabled: false,
        regex: /^(\d+)?([.]?\d?)?$/,
    }

    constructor(props) {
        super(props)
    }

    dec = () => {
        if (this.props.disabled || isNaN(this.props.value)) {
            return false
        }
        return parseFloat(this.props.value) - this.props.step <= 0 ?
            this.props.onText('0') :
            this.props.onText((parseFloat(this.props.value) - this.props.step).toString())
    }

    add = () => {
        console.log('hi~~');
        console.log(this.props.disabled);
        console.log(isNaN(this.props.value));
        if (this.props.disabled || isNaN(this.props.value)) {
            console.log('run false?');
            return false
        }
        console.log(this.props.value);
        console.log(this.props.step);
        return isNaN(this.props.value) || this.props.value === '' ?
            this.props.onText('0') :
            this.props.onText((parseFloat(this.props.value) + this.props.step).toString())
    }

    change = (e) => {
        if (e.target.value === '') {
            return this.props.onText('0');
        }
        if (isNaN(parseFloat(e.target.value))) {
            return false
        }
        if (e.target.value.match(this.props.regex)) {
            return this.props.onText(e.target.value)
        }
        this.props.onText('0')
    }

    render() {
        let {disabled, value, desc} = this.props;
        return (
            <div className={style.RightInput}>
                <div className={style.LeftBtn} onClick={this.dec}>-</div>
                <input className={style.V8input}
                       value={value}
                       onChange={this.change}
                       disabled={disabled}
                />
                <div className={style.RightBtn} onClick={this.add}>+</div>
            </div>
        )
    }
}

CountBtnInput.PropTypes = {
    desc: PropTypes.string,
    step: PropTypes.number,
    disabled: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}