/**
 * Created by csh on 2017/6/6.
 *
 *按钮有preCheck属性，父组件提供检查函数并返回结果给子组件，子组件通过检查后调用父组件的方法进入loading状态，显示加载动画，父组件返回promise，子组件根据promise状态结束loading
 * 如果传入disableLoading = true,则没有loading状态，直接执行父组件的onClick方法，disableLoading默认为真
 */
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.css'

export default class RaisedBtn extends React.Component {
    static defaultProps = {
        backgroundColor: '#2780F7',
        borderBottom: 'initial',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 0,
        color: '#fff',
        label: '',
        style: {},
        onClick() {
        },
        disabled: false,
        once: false,
        preCheck() {
            return true
        },
        width: 288,
        height: 40,
        disableLoading: false
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            disabled: props.disabled,
            successCount: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({disabled: nextProps.disabled})
    }


    handleClick(e) {
        console.log('click')
        if (!this.state.disabled) {
            let checkResult = this.props.preCheck()
            console.log('precheck: ' + checkResult)

            if (checkResult) {
                if (this.props.disableLoading) {
                    this.props.onClick(e)
                } else {
                    this.loading()
                    const ret = this.props.onClick(e)
                    this.handlePromise(ret)
                }
            }
        } else {
            console.log('disabled')
            e.preventDefault()
        }
    }

    handlePromise(promise) {
        if (promise && promise.catch && promise.then) {
            promise
                .then(() => {
                    this.success()
                })
        }
    }

    loading() {
        console.log('loading')
        this.setState({loading: true})
        this.setState({disabled: true})
    }

    enable() {
        console.log('enable')
        this.setState({loading: false})
        this.setState({disabled: false})
    }

    waiting() {
        console.log('waiting')
        this.setState({loading: false})
        this.setState({disabled: true})
    }

    success(callback) {
        let nc = ++this.state.successCount
        if (this.refs.isMount) {
            this.setState({successCount: nc})
        }
        if (this.state.successCount === 1 && this.props.once) {
            this.waiting()
        } else {
            this.enable()
            if (typeof callback === 'function') {
                callback()
            }
        }
    }


    render() {
        let btnContent = !this.state.loading ? <span>{this.props.label}</span> : <div className={style.spinner}>
            <div className={style.bounce1}/>
            <div className={style.bounce2}/>
            <div className={style.bounce3}/>
        </div>
        return (
            <div ref="isMount" style={this.props.style} id={this.props.id}>
                <div className={style.submitBtn} onClick={this.handleClick}
                     style={{
                         color: this.props.color,
                         cursor: this.props.cursor,
                         border: this.props.border,
                         width: this.props.width + 'px',
                         height: this.props.height + 'px',
                         lineHeight: this.props.height + 'px',
                         borderRadius: this.props.borderRadius + 'px',
                         backgroundColor: this.state.disabled ? '#b5b5b5' : this.props.backgroundColor,
                         borderBottom: this.props.borderBottom === 'initial' ? this.props.border : 'none'
                     }}
                >
                    {btnContent}
                </div>
            </div>
        )
    }
}

RaisedBtn.propTypes = {
    backgroundColor: function (props, propName, componentName) {
        if (!/#[0-9a-fA-F]{6}/.test(props[propName])) {
            // console.log('props backgroundColor need RGB type')
        }
    },
    label: PropTypes.string,
    style: PropTypes.object,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    once: PropTypes.bool,
    preCheck: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number,
    cursor: PropTypes.string,
    borderRadius: PropTypes.number,
    disableLoading: PropTypes.bool
}