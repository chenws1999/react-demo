import React from 'react';
import './style.css';
import bind from 'classnames';
import PropTypes from 'prop-types';
/*
props:
preCheck: PropTypes.func,  //预检查函数
onClick: PropTypes.func,  // click事件相应函数
disabled: PropTypes.bool,  // 是否禁用button组件
icon: PropTypes.string,     // 图标
label: PropTypes.string,    文本内容
className: PropTypes.string,  组件根元素css类名（在非禁用状态和禁用状态都会生效）
style: PropTypes.object,     组件根元素样式（在非禁用状态和禁用状态都会生效）
disabledClass: PropTypes.string   在button处于禁用状态下的样式
once: PropTypes.bool    只能执行一次
type: PropTypes.number  按钮类型 默认为0  提供了0和1，2 三种类型
*/
class Button extends React.Component {
    constructor (props) {
        super(props);
        this.allProps = Object.assign({}, {
            preCheck () {
                console.log('check');
                return true;
            },
            onClick () {
                console.log('button click');
            },
            disabled: false,
            icon: null, // 图标
            label: '', 
            className: null,
            style: null,
            disabledClass: null,
            once: false,
            type: 0 //初始化风格
        }, props);
        let flag= [0, 1, 2].some(item => { // 判断类型参数是否在有效范围内
            if (this.allProps.type === item)
                return true;
        });
        !flag && (this.allProps.type = 0); //如果不在 则赋默认值0
        this.state = {
            loading: false,
            disabled: this.allProps.disabled
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }
    render () {
        let className = bind('button',('button-style' +this.allProps.type),
            {'btn-disabled': this.state.disabled && !this.allProps.disabledClass,
                 'btn-loading': this.state.loading}, 
            this.allProps.className, this.allProps.disabledClass)
        let loadingContent = 
            <div className="spinner">
                <div className="bounce1" />
                <div className="bounce2" />
                <div className="bounce3" />
            </div>
        return (
            <button type="button" className={className} style={this.allProps.style} onClick={this.handleCheck}>
                {
                    !this.state.loading && this.allProps.icon &&
                        <div className="item">
                        <img src={this.allProps.icon}/>
                        </div>
                }
                {
                    !this.state.loading && this.allProps.label &&
                    <div className="item">
                    <span>{this.allProps.label}</span>
                    </div>
                }
                {this.state.loading && loadingContent}
            </button>
        )
    }
    handleCheck (e) {
        console.log('click');
        if (this.state.loading || this.state.disabled) {
            e.preventDefault();
            return;            
        }
        let checkResult = this.allProps.preCheck();
        console.log(checkResult);
        if (checkResult) {
            this.handleClick(e);
        } else {
            console.log('check error！！');
        }
    }
    handleClick (e) {
        let res = this.allProps.onClick(e);
        console.log(res);
        if (res instanceof Promise) {
            this.setState({
                loading: true
            });
            res.then(res => {
                this.setState({
                    loading: false
                })
                if (this.allProps.once)
                    this.setState({
                        disabled: true
                    })
            }).catch(e => {
                this.setState({
                    loading: false
                })
                console.log('error: ', e);
            });
        } else {
            if (this.allProps.once)
                this.setState({
                    disabled: true
                })
        }
    }
}
Button.prototypes = {
    preCheck: PropTypes.func,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.string, // 图标
    label: PropTypes.string, 
    className: PropTypes.string,
    style: PropTypes.object,
    disabledClass: PropTypes.string,
    once: PropTypes.bool,
    type: PropTypes.number
}

export default Button;