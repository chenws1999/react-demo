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
            eleWidth: 0
        };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleRef = this.handleRef.bind(this);
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
        if (!this.state.isFirstRender)
            return;
        console.log(e.clientWidth, this.childWidth)
        this.setState({
            isFirstRender: false,
            eleWidth: e.clientWidth > this.childWidth ? this.childWidth : e.clientWidth
        })
    }
    handleRef (element) {
        if (!this.state.isFirstRender)
            return;
            console.log('child')
        this.childWidth = element.scrollWidth;
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
                    item.props.style && (replaceProps.style = Object.assign({}, item.props.style, {
                        width: this.state.eleWidth
                    }))
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
            <div ref={this.handleParentRef.bind(this)} style={this.props.style} className={bind('RadioGroup', this.props.layout === 'vertical' ? 'RadioGroup-vertical' : 'RadioGroup-level')}>
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
        style: {}
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
                <label className="label" htmlFor={randomId}>{this.props.label}</label>
            </span>
        )
    }
}