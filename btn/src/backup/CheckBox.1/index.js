/**
 * Author : GuoKan
 * Date : 2017-10-12 14:51
 * Description :
 */

/**
 * edit by chenws
 * Date: 2017-11-24
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import bind from 'classnames';
import './style.css'


function CheckBox ({label, checked, disabled = false, value="", onChange = () => null}, style={}) {
    let randomId = Math.random().toString(36).substr(2);
    function handleChange (e) {
        if (disabled)
            return;
        onChange(e);
    }
    return (
    <span className="checkbox-container">
        <label  className={bind('checkbox', {'checked': checked, 'checkbox-disabled': disabled})}>
            <input id={randomId} name="checkbox" type='checkbox'  checked = {checked} onChange={handleChange}/>
        </label>
        <label style={style} className={bind('label', {'label-disabled': disabled})} for={randomId}>{label}</label>
    </span>
    )
}
CheckBox.propTypes = {
    checked:PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object
}
export default CheckBox

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
        this.checked = [];  // init 
        this.checkedValue = []
        this.children = React.Children.map(this.props.children, (item, index) => {
            if (item.props.checked) {
                this.checked[index] = true;
                this.checkedValue.push(item.props.value);
            }
            return item.props.value;
        });
        this.handleChange = this.handleChange.bind(this);
        this.checkAll = this.checkAll.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }
    handleChange (index, e) {
        if (this.checked[index]) // 如果原本为选中，现在将要变为非选中
            this.checkedValue.forEach((item, index2) => {
                if (item === this.children[index])
                    this.checkedValue.splice(index2, 1);
            })
        else
            this.checkedValue.push(this.children[index]);
        this.checked[index] = !this.checked[index];
        console.log(this.checkedValue);
        this.props.onChange(this.checkedValue); //返回的参数为变被选中的所有值
        this.forceUpdate();
    }
    clearAll () {
        console.log('clear all')
        if (this.checkedValue.length === 0)
            return;
        this.children.forEach((item, index) => {
            this.checked[index] = false;
        })
        this.checkedValue = [];
        this.forceUpdate();
    }
    checkAll () {
        if (this.checkedValue.length === this.children.length)
            return;
        this.checkedValue = [];
        this.children.forEach((item, index) => {
            this.checked[index] = true;
            this.checkedValue.push(item);
        })
        this.forceUpdate();
    }
    render () {
        let childs = React.Children.map(this.props.children, (item, index) => {
            let propsReplaced = {}
            if (this.state.isAllChecked) {
                propsReplaced = {
                    checked: !item.props.disabled && true
                }
            } else if (this.state.isAllClear) {
                propsReplaced = {
                    checked: !item.props.disabled && false
                }
            } else {
                propsReplaced = {
                    checked: this.checked[index] === true,
                    onChange: _ => this.handleChange(index),
                }
            }
            return React.cloneElement(item, propsReplaced);
        })
        return (
            <div>                                                  
                {childs}
                <CheckBox label="选中所有" disabled={this.checkedValue.length === this.children.length} checked={this.checkedValue.length === this.children.length} onChange={this.checkAll}/>
                <CheckBox label="取消所有选择" disabled={this.checkedValue.length === 0} checked={this.checkedValue.length === 0} onChange={this.clearAll}/>
            </div>
        )
    }
}
export { CheckBoxGroup };