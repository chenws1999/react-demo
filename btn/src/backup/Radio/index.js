import React, {Component} from 'react';
import bind from 'classnames';
// import './style.css';
import Style from './style.scss';
import _ from 'lodash';
import Checkbox, {CheckBoxGroup} from '../CheckBox/';

export class CheckContainer extends Component { //将一些逻辑处理包裹在 多选、单选按钮组 外面的容器代理组件
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
        let childs,
            labelStyle = {
                width: this.state.labelWidth
            }
        childs = React.Children.map(this.props.children, item => {
                let replaceProps = {};
                    replaceProps.style = Object.assign({}, item.props.style, {
                        width: this.state.eleWidth
                    })
                    replaceProps.labelStyle = Object.assign({}, item.props.labelStyle,{
                        width: this.state.labelWidth
                    })
                return React.cloneElement(item, replaceProps)
            });
        let props = {
            type: this.props.type,
            handleParentRef: this.state.isFirstRender && this.handleParentRef,
            ...Object.assign({}, this.props, {
                children: childs
            })
        }
        return   this.props.type && this.props.type === 'checkbox' ?
                <CheckBoxGroup {...props} /> :
                <RadioGroup {...props}/>
        
    }
    componentDidMount () {
        window.onresize = _.debounce(_ => {
            console.log('resize');
            requestAnimationFrame(_ => {
                this.setState({
                    isFirstRender: true,
                    eleWidth: null,
                    labelWidth: null
                });
            })
        }, 500);
    }
    handleParentRef (e) {
        console.log('parent ref', e)
        if (!this.state.isFirstRender) {
            return;
        }
        console.log(Style.checked_item_group)
        let childs = document.querySelectorAll(`.${Style.checked_item_container}`),
            labels = document.querySelectorAll(`.${Style.checked_item_label}`),
            maxChildLength = 0,
            maxLabelLength = 0
        childs.forEach((item, index) => {
            if (item.clientWidth >  maxChildLength)
                maxChildLength = item.clientWidth;
        })
        labels.forEach((item, index) => {
            if (item.clientWidth > maxLabelLength)
                maxLabelLength = item.clientWidth;
        })
        console.log('allwidth',childs, labels, maxChildLength, maxLabelLength)
        maxLabelLength += 4;
        maxChildLength += 4;
        this.setState({
            isFirstRender: false,
            eleWidth: e.clientWidth > maxChildLength ? maxChildLength : e.clientWidth,
            labelWidth: e.clientWidth > maxChildLength ? maxLabelLength : maxLabelLength - maxChildLength + e.clientWidth
        })
    }
}
export class RadioGroup extends Component {
    static defaultProps = {
        defaultValue: '',
        layout: 'level', //布局 默认为水平'level'的 还可以为'vertical'
        name: '',
        value: '',
        onChange: _ => {},
        style: {}
    }
    constructor (props) {
        super(props);
        this.state = {
            value: this.props.defaultValue,
            isFirstRender: true,
            eleWidth: 0,
            labelWidth: 0
        };
        this.handleOnchange = this.handleOnchange.bind(this);
    }

    componentWillReceiveProps () {
    }
    componentWillReceiveProps (nextProps) {
        if (this.state.value !== nextProps.value);
            this.setState({
                value: nextProps.value
            })
    }
    handleOnchange (value, e) {
        if (value !== this.state.value) {
            this.props.onChange(e, value);
        }
    }

    render () {
        let   childs = React.Children.map(this.props.children, item => {
                let  replaceProps = {name: this.props.name}
                    replaceProps.onClick = this.handleOnchange
                    replaceProps.key = item.props.key || item.props.value
                if (item.props.value !== this.props.value) {
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



export default class CheckItem extends Component {
    static defaultProps = {
        label: "", 
        value: "",
        name: "",
        checked: false, 
        defaultChecked:  false,
        disabled: false,
        onClick: _ => {},
        style: {},
        labelStyle: {}
    }
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
            <div className={radioClass} ref={this.props.childRef} style={this.props.style} onClick={this.handleOnClick}>
                    <div className={headerClass}>
                        <input  type="radio" value={this.props.value} name={this.props.name}/>
                    </div>
                    <div className={labelClass} ref={this.props.labelRef} style={this.props.labelStyle}  >
                    {this.props.label}

                    </div>
                    {
                        !this.props.childRef && 
                            <div className={Style.checked_item_label_show} style={this.props.labelStyle}>
                            {this.props.label}
                            </div>
                    }
                    {this.state.checked && 
                            <div className={Style.checked_item_checked}>
                            <div className={Style.mask}>
                            </div>
                    </div>}
            </div>
        )
    }
}