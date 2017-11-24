/**
 * Author : GuoKan
 * Date : 2017-10-12 14:51
 * Description :
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import bind from 'classnames';
import './style.css'


function CheckBox ({label, checked, disabled = false, value="", onChange = () => null}) {
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
        <label className={bind('label', {'label-disabled': disabled})} for={randomId}>{label}</label>
    </span>
    )
}
CheckBox.propTypes = {
    checked:PropTypes.bool,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func
}
export default CheckBox

// CheckBoxGroup  需求不明，待完成
class CheckBoxGroup extends Component {
    constructor (props) {
        super(props);
        this.state= {
        }
    }
    render ({children, defaultValue, allChecked = false, onChange = e => {}}) {
        let childs = React.Children.map(children, item => {
            let flag = false;
            if (allChecked) {
                flag = true;
            } else if (item.props.value === defaultValue)
                flag = true;
            return React.cloneElement(item, {
                checked: flag
            });
        })
        return (
            <div>
                {childs}
            </div>
        )
    }
}
export { CheckBoxGroup };