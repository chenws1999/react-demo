import React, {Component} from 'react';
import bind from 'classnames';
import './style.css';
let childs
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
        this.handleRef = this.handleRef.bind(this);
        this.handleLabelRef = this.handleLabelRef.bind(this);
        this.handleParentRef = this.handleParentRef.bind(this);
    }
    componentDidMount () {
        // console.log(this.refs[]);
    }
    componentDidUpdate () {
    }
    componentWillReceiveProps (nextProps) {
        if (this.state.value !== nextProps.value);
            this.setState({
                value: nextProps.value
            })
    }
    handleOnchange (e) {
        if (e.target.value !== this.state.value) {
            this.props.onChange(e, e.target.value);
        }
    }
    handleParentRef (e) {
        console.log('parent ref', e)
        // if (e && !this.state.isFirstRender && e.clientWidth !== this.clientWidth) {
        //     this.clientWidth = e.clientWidth;
        //     this.setState({
        //         isFirstRender: true
        //     })
        //     return;
        // }
        if (!this.state.isFirstRender) {
            if (e && e.clientWidth !== this.clientWidth) {
                isFirstRender: true
            }
            this.clientWidth = e.clientWidth;
            return;
        }
        console.log(e.clientWidth, this.childWidth)
        this.clientWidth = e.clientWidth;
        this.parentNode = e;
        this.setState({
            isFirstRender: false,
            eleWidth: e.clientWidth > this.childWidth ? this.childWidth : e.clientWidth,
            labelWidth: e.clientWidth > this.childWidth ? this.childLabelWidth : Math.floor(this.childLabelWidth - this.childWidth + e.clientWidth)
        })
    }
    handleRef (element) {
        console.log('child ref', element)
        if (!this.state.isFirstRender)
            return;
            console.log('child', element.scrollWidth, element.clientWidth)
        this.childWidth = element.scrollWidth + 1;
    }
    handleLabelRef (ele) {
        console.log('label ref', ele)
        if (!this.state.isFirstRender)
            return;
        console.log('label ref', ele);
        this.childLabelWidth = ele.scrollWidth;
    }
    firstRender () {
        let maxLengthChild = '',
            label = ''
        React.Children.forEach(this.props.children, item => {
            if (item.props.label.length >= label.length) {
                maxLengthChild = item
                label = item.props.label;
            }
            console.log(item)
        })
        console.log(maxLengthChild, 'max-child')
        return React.cloneElement(maxLengthChild, {
            childRef: this.handleRef,
            labelRef: this.handleLabelRef,
            key: maxLengthChild.props.key || maxLengthChild.props.value
        });
    }
    render () {
       let childs;
        if (this.state.isFirstRender)
            childs = this.firstRender();
        else
            childs = React.Children.map(this.props.children, item => {
                let replaceProps = {name: this.props.name};
                    replaceProps.onClick = this.handleOnchange;
                    replaceProps.key = item.props.key || item.props.value;
                    replaceProps.style = Object.assign({}, item.props.style, {
                        width: this.state.eleWidth
                    })
                    replaceProps.labelStyle = Object.assign({}, item.props.labelStyle, {
                        width: this.state.labelWidth 
                    })
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
            <div ref={this.handleParentRef} style={this.props.style} className={bind('RadioGroup', this.props.layout === 'vertical' ? 'RadioGroup-vertical' : 'RadioGroup-level')}>
                {childs}
            </div>
        )
    }
}



export default class Radio extends Component {
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
            checked: this.props.defaultChecked
        };
        this.handleonClick = this.handleonClick.bind(this);
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            checked: nextProps.checked
        });
    }
    handleonClick (e) {
        if (this.state.disabled)
            return;
        this.props.onClick(e);
    }
    render () {
        let classname = bind('Radio', this.state.checked && 'Radio-checked',  this.props.disabled && 'Radio-disabled'),
            randomId = Math.random().toString(36).substr(2);
        return (
            <span className="Radio-container" ref={this.props.childRef} style={this.props.style}>
                <label className={classname}>
                    <input id={randomId} type="radio" value={this.props.value} onClick={this.handleonClick} name={this.props.name}/>
                </label>
                    <label className="label" ref={this.props.labelRef} style={this.props.labelStyle}  htmlFor={randomId}>{this.props.label}</label>
            </span>
        )
    }
}