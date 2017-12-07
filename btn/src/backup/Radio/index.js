import React, {Component} from 'react';
import bind from 'classnames';
// import './style.css';
import Style from './style.scss';
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
        this.handleChildRef = this.handleChildRef.bind(this);
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
    handleOnchange (e, value) {
        if (value !== this.state.value) {
            this.props.onChange(e, value);
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
            // if (e && e.clientWidth !== this.clientWidth) {
            //     isFirstRender: true
            // }
            // this.clientWidth = e.clientWidth;
            return;
        }
        console.log('allwidth', e.clientWidth, this.childWidth, this.childLabelWidth)
        this.parentWidth = e.clientWidth;
        this.parentNode = e;
        this.setState({
            isFirstRender: false,
            eleWidth: e.clientWidth > this.childWidth ? this.childWidth : e.clientWidth,
            labelWidth: e.clientWidth > this.childWidth ? this.childLabelWidth : Math.floor(this.childLabelWidth - this.childWidth + e.clientWidth)
        })
    }
    handleChildRef (element) {
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
        console.log('label ref', ele, ele.scrollWidth);
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
            childRef: this.handleChildRef,
            labelRef: this.handleLabelRef,
            key: maxLengthChild.props.key || maxLengthChild.props.value
        });
    }
    render () {
       let childs;
        if (this.state.isFirstRender)
            childs = this.firstRender();
        else {
            let labelStyle = {
                width: this.state.labelWidth
            }
            // if (this.parentWidth >= this.childWidth ) {
            //     labelStyle.verticalAlign = 'top',
            //     labelStyle.lineHeight = '50px'
            // }
            childs = React.Children.map(this.props.children, item => {
                let replaceProps = {name: this.props.name};
                    replaceProps.onClick = this.handleOnchange;
                    replaceProps.key = item.props.key || item.props.value;
                    replaceProps.style = Object.assign({}, item.props.style, {
                        width: this.state.eleWidth
                    })
                    replaceProps.labelStyle = Object.assign({}, item.props.labelStyle, labelStyle)
                if (item.props.value !== this.state.value) {
                    replaceProps.defaultChecked = false;
                    replaceProps.checked = false;
                } else {
                    replaceProps.defaultChecked = true;
                    replaceProps.checked = true;
                }
                return React.cloneElement(item, replaceProps)
            });
        }
        return (
            <div ref={this.state.isFirstRender && this.handleParentRef} style={this.props.style} className={bind('RadioGroup', this.props.layout === 'vertical' ? 'RadioGroup-vertical' : 'RadioGroup-level')}>
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
        this.props.onClick(e, this.props.value);
    }
    render () {
        let classname = bind(Style.radio_container, this.state.checked && Style.radio_container_checked),
            headerClass = bind(this.state.checked ? Style.radio_header_checked : Style.radio_header),
            randomId = Math.random().toString(36).substr(2);
        return (
            <div className={classname} ref={this.props.childRef} style={this.props.style} onClick={this.handleonClick}>
                    <div className={headerClass}>

                        <input id={randomId} type="radio" value={this.props.value} name={this.props.name}/>
                    </div>
                    <div className={Style.radio_label} ref={this.props.labelRef} style={this.props.labelStyle}  htmlFor={randomId}>
                    {this.props.label}

                    </div>
                    <div className={Style.radio_label_show} style={this.props.labelStyle}>
                    {this.props.label}
                    </div>
                    {this.state.checked && <div className={Style.radio_checked}>
                            <div className={Style.mask}>
                            </div>
                    </div>}
            </div>
        )
    }
}