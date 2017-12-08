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
import Style from '../Radio/style.scss';


function CheckBox ({label, checked, disabled = false, value="", onClick = () => null}, style={}) {
    let randomId = Math.random().toString(36).substr(2);
    function handleChange (e) {
        if (disabled)
            return;
        onClick(value, e);
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
        // console.log(index, value, e, 'checkbox')
        this.checked.has(index) ? this.checked.delete(index) : this.checked.set(index, value);
        let [...checkedValues] = this.checked.values();
        this.props.onChange(checkedValues, this.checked);
        // console.log('checkbox', this.checked, checkedValues);
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
            // console.log('checkbox foreach', this.checked, this.checked.has(index));
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
export { CheckBoxGroup };