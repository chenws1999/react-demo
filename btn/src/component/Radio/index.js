import React, {Component} from 'react';
import Proptypes from 'prop-types';
import bind from 'classnames';
import './style.css';

export class RadioGroup extends Component {
    static propTypes = {
        defaultValue: Proptypes.any,
        layout: Proptypes.string,
        name: Proptypes.string,
        value: Proptypes.any,
        onChange: Proptypes.func,
        style: Proptypes.object
    }
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
            value: this.props.defaultValue
        };
        this.handleOnchange = this.handleOnchange.bind(this);
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
    render () {
        let childs = React.Children.map(this.props.children, item => {
            let replaceProps = {name: this.props.name};
                replaceProps.onClick = this.handleOnchange;
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
            <div style={this.props.style} className={bind('RadioGroup', this.props.layout === 'vertical' ? 'RadioGroup-vertical' : 'RadioGroup-level')}>
                {childs}
            </div>
        )
    }
}

export default class Radio extends Component {
    static propTypes = {
        label: Proptypes.string,
        value: Proptypes.any,
        name: Proptypes.string,
        checked: Proptypes.bool,
        defaultChecked: Proptypes.bool,
        disabled: Proptypes.bool,
        onClick: Proptypes.func,
        style: Proptypes.object
    }
    static defaultProps = {
        label: "", 
        value: "",
        name: "",
        checked: false, 
        defaultChecked:  false,
        disabled: false,
        onClick: _ => {},
        style: {} // 该prop用来定义radio中label的样式，而不是整个radio组件的样式
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
            <span className="Radio-container">
                <label className={classname}>
                    <input id={randomId} type="radio" value={this.props.value} onClick={this.handleonClick} name={this.props.name}/>
                </label>
                <label style={this.props.style}htmlFor={randomId}>{this.props.label}</label>
            </span>
        )
    }
}