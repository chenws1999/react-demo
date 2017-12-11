import React, {Component} from 'react';

import bind from 'classnames';
import PropTypes from 'prop-types';
// import './style.css';
import Style from './style.scss';
import _ from 'lodash';


let operateContainerArr = (function () {
    let containerArr = [],
        resizeListener =  _.debounce(_ => {
        console.log('resize');
        requestAnimationFrame(_ => {
            for (let x of containerArr)
                x.setState({
                    eleWidth: null,
                    labelWidth: null
                });
            setTimeout(_ => {
                for (let x of containerArr)
                    x.setState({
                        isFirstRender: true
                    })
            }, 0);
        })
    })
    return {
        push: that => {
            if (containerArr.length === 0) {
                window.addEventListener('resize', resizeListener);
            }
            containerArr.push(that);
        },
        remove: that => {
            containerArr = containerArr.filter(item => {
                if (item === that)
                    return false
            })
            if (!containerArr.length) 
                window.removeEventListener('resize', resizeListener);
        }
    }
})()



class CheckContainer extends Component { //将一些逻辑处理包裹在 多选、单选按钮组 外面的容器代理组件
    static defaultProps = _ => {
        return {
            genre: 'radio'
        }
    }
    constructor (props) {
        super(props);
        this.handleParentRef = this.handleParentRef.bind(this);
        this.state = {
            isFirstRender: true,
            eleWidth: null,
            labelWidth: null,
        }
    }
    render () {
        console.log('render');
        let childs
        childs = React.Children.map(this.props.children, item => {
                let replaceProps = {};
                    replaceProps.style = Object.assign({}, item.props.style, {
                        width: this.state.eleWidth
                    })
                    replaceProps.labelStyle = Object.assign({}, item.props.labelStyle,{
                        width: this.state.labelWidth
                    })
                    replaceProps.isFirstRender = this.state.isFirstRender;
                return React.cloneElement(item, replaceProps)
            });
        let props = {
            handleParentRef: this.state.isFirstRender && this.handleParentRef,
            ...Object.assign({}, this.props, {
                children: childs
            })
        }
        return   this.props.genre && this.props.genre === 'checkbox' ?
                <CheckBoxGroup {...props} /> :
                <RadioGroup {...props}/>
        
    }
    componentDidMount () {
        console.log('did mount');
        operateContainerArr.push(this);
        // this.listener = window.addEventListener('resize', _.debounce(_ => {
        //     console.log('resize');
        //     requestAnimationFrame(_ => {
        //         this.setState({
        //             isFirstRender: true,
        //             eleWidth: null,
        //             labelWidth: null
        //         });
        //     })
        // }, 500))
    }
    componentDidUnMount () {
        operateContainerArr.remove(this);
    }
    handleParentRef (e) {
        console.log('parent ref', e)
        if (!this.state.isFirstRender) {
            return;
        }
        let childs = document.querySelectorAll(`.${Style.checked_item_container}`),
            labels = document.querySelectorAll(`.${Style.checked_item_label}`),
            maxChildLength = 0,
            maxLabelLength = 0,
            childLabel = null,
            maxWidthChild = null,
            childMargin = 0
        childs.forEach((item, index) => {
            if (item.clientWidth >  maxChildLength) {
                maxChildLength = item.clientWidth;
                maxWidthChild = item;
            }
        })
        childLabel = maxWidthChild.getElementsByClassName(Style.checked_item_label)[0];
        maxLabelLength = childLabel && childLabel.offsetWidth;
        maxLabelLength +=1;
        maxChildLength += 1;
        childLabel && (maxLabelLength += (childLabel.clientLeft * 2)); // 加上border的宽度
        childMargin = e.scrollWidth - maxChildLength; //左右侧 margin + border的宽度
        console.log(maxChildLength, maxLabelLength, e.scrollWidth, e.clientWidth, 'max', childMargin, childLabel.clientLeft, maxWidthChild)
        this.setState({
            isFirstRender: false,
            eleWidth: (e.scrollWidth === e.clientWidth || maxChildLength <= e.clientWidth) ? maxChildLength : (e.clientWidth - childMargin),
            labelWidth: (e.scrollWidth === e.clientWidth || maxChildLength <= e.clientWidth) ? maxLabelLength : maxLabelLength  - (maxChildLength - (e.clientWidth - childMargin) )
        })
    }
}
 class RadioGroup extends Component {
    static defaultProps = _ => ({
        defaultValue: '',
        name: '',
        value: '',
        onChange: _ => {},
        style: {}
    })
    constructor (props) {
        super(props);
        console.log('constructor', props);
        this.state = {
            value: this.props.defaultValue || this.props.value
        };
        this.handleOnchange = this.handleOnchange.bind(this);
    }

    componentWillReceiveProps () {
    }
    componentWillReceiveProps (nextProps) {
        // console.log('next props', nextProps)
        if (this.state.value !== nextProps.value);
            this.setState({
                value: nextProps.value
            })
    }
    handleOnchange (value, e) {
        if (value && value !== this.state.value) {
            this.props.onChange(e, value);
        }
    }

    render () {
        let   childs = React.Children.map(this.props.children, item => {
                let  replaceProps = {name: this.props.name}
                    replaceProps.onClick = this.handleOnchange
                    replaceProps.key = item.props.key || item.props.value
                if (item.props.value !== this.state.value) {
                    replaceProps.defaultChecked = false;
                    replaceProps.checked = false;
                } else {
                    replaceProps.defaultChecked = true;
                    replaceProps.checked = true;
                }
                return React.cloneElement(item, replaceProps)
            });
        return (
            <div ref={this.props.handleParentRef} style={this.props.style} className={Style.checked_item_group}>
                {childs}
            </div>
        )
    }
}



 class CheckItem extends Component {
    staticProps = _ => ({
        label: "", 
        value: "",
        name: "",
        checked: false, 
        defaultChecked:  false,
        disabled: false,
        onClick: _ => {},
        style: {},
        labelStyle: {}
    })
    constructor (props) {
        super(props);
        this.state = {
            checked: this.props.defaultChecked || this.props.checked
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    }
    handleOnClick (e) {
        if (this.state.disabled)
            return;
        this.props.onClick(this.props.value, e);
    }
    render () {
        let radioClass = bind(Style.checked_item_container, this.state.checked && Style.checked_item_container_checked),
            headerClass = bind(this.state.checked ? Style.checked_item_header_checked : Style.checked_item_header),
            labelClass = bind(Style.checked_item_label)
        return (
            <div className={radioClass}  style={this.props.style} onClick={this.handleOnClick}>
                    <div className={headerClass}>
                        <input  type="radio" value={this.props.value} name={this.props.name}/>
                    </div>
                    <div className={labelClass} style={this.props.labelStyle}  >
                    {this.props.label}

                    </div>
                      {      
                        !this.props.isFirstRender &&
                          <div className={Style.checked_item_label_show} style={this.props.labelStyle}>
                            {this.props.label}
                            </div>
                      }
                        {this.state.checked ?
                            <div className={Style.checked_item_checked}>
                                <div className={Style.mask}>
                                </div>
                            </div> :
                            <div className={Style.checked_item_char}>
                                {this.props.char || '----'}
                            </div>
                        }
            </div>
        )
    }
}


// CheckBoxGroup  
 class CheckBoxGroup extends Component {
    static propTypes = {
        onChange: PropTypes.func
    }
    static defaultProps = {
        onChange: _ => {}
    }
    constructor (props) {
        super(props);
        this.state= {
        }
        this.checked = new Map();
        React.Children.forEach(this.props.children, (item, index) => {
            if (item.props.checked) {
                this.checked.set(index, item.props.value);
            }
        });
        this.handleChange = this.handleChange.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }
    handleChange (index, value, e) {
        this.checked.has(index) ? this.checked.delete(index) : this.checked.set(index, value);
        let [...checkedValues] = this.checked.values();
        this.props.onChange(checkedValues, this.checked);
        this.forceUpdate();
    }
    clearAll () {
        if (this.checked.size === 0)
            return;
        this.checked.clear();
        this.forceUpdate();
    }
    checkAll () {
        if (this.checked.size === [].concat(this.props.children).length)
            return;
        React.Children.forEach(this.props.children, (item, index) => {
            !this.checked.has(index) && this.checked.set(index, item.props.value);
        })
        this.forceUpdate();
    }
    render () {
        let childs = React.Children.map(this.props.children, (item, index) => {
            let propsReplaced = {
                    checked: this.checked.has(index),
                    onClick: this.handleChange.bind(null, index),
                }
            return React.cloneElement(item, propsReplaced);
        })
        let childrenSize = [].concat(this.props.children).length 
        return (
            <div ref={this.props.handleParentRef} style={this.props.style} className={Style.checked_item_group}>                                                  
                {childs}
                {/* <CheckBox label="选中所有" disabled={this.checked.size === childrenSize} checked={this.checked.size === childrenSize} onChange={this.checkAll}/>
                <CheckBox label="取消所有选择" disabled={this.checked.size === 0} checked={this.checked.size === 0} onChange={this.clearAll}/> */}
            </div>
        )
    }
}

export {
    CheckContainer,
    CheckItem as default
}