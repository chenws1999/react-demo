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
style: PropTypes.object,    自定义组件根元素样式
labelStyle: Proptypes.object
once: PropTypes.bool    只能执行一次
type: PropTypes.string  按钮类型 默认为flat  提供了flat和flat2，raised三种类型
*/
const typeTransformStyle = {
    flat: 'button-style0',
    flat2: 'button-style2',
    raised: 'button-style1'
    
}
class Button extends React.Component {
    constructor (props) {
        super(props);
        this.propsInit();
        this.state = {
            loading: false,
            disabled: this.allProps.disabled
        }
        this.close = false;
        this.handleClick = this.handleClick.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.propsInit = this.propsInit.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        this.propsInit(nextProps);
        if (!this.close)
            this.setState({
                disabled: this.allProps.disabled
            })
    }
    render () {
        let className = bind('button',typeTransformStyle[this.allProps.type],
            {'btn-disabled': this.state.disabled,
              'btn-loading': this.state.loading
            }
        );
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
                    <span style={this.allProps.labelStyle}>{this.allProps.label}</span>
                    </div>
                }
                {this.state.loading && loadingContent}
            </button>
        )
    }
    propsInit (props = this.props) {
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
            style: null,
            labelStyle: null,
            once: false,
            type: 'flat' //初始化风格
        }, props);
         // 判断type参数是否在有效范围内
        typeTransformStyle[this.allProps.type] || (this.allProps.type = 'flat');

    }
    handleCheck (e) {
        if (this.state.loading || this.state.disabled) {
            e.preventDefault();
            return;            
        }
        let checkResult = this.allProps.preCheck();
        if (checkResult) {
            this.handleClick(e);
        } else {
            console.log('check error！！');
        }
    }
    handleClick (e) {
        let res = this.allProps.onClick(e);
        if (res instanceof Promise) {
            this.setState({
                loading: true
            });
            res.then(res => {
                this.setState({
                    loading: false
                })
                if (this.allProps.once) {
                    this.setState({
                        disabled: true
                    })
                    this.close = true;
                }
            }).catch(e => {
                this.setState({
                    loading: false
                })
                console.log('error: ', e);
            });
        } else {
            if (this.allProps.once) {
                this.setState({
                    disabled: true
                })
                this.close = true;
            }
        }
    }
}
Button.propTypes = {
    preCheck: PropTypes.func,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    icon: PropTypes.string, // 图标
    label: PropTypes.string, 
    style: PropTypes.object,
    labelStyle: PropTypes.object,
    once: PropTypes.bool,
    type: PropTypes.string
}

export default Button;