/**
 * created by chenws on 2017.11.30
 */
import Style from './style.scss'
 import React, {Component} from 'react';
import Button from '../backup/Btn2/Button';
import PropTypes from 'prop-types';
import bindClass from 'classnames';
/**
 * AcceptBtn有两种使用方式： 
 * 1. 通过props的childs属性传一个数组进来，数组的元素为obj，obj中定义了AcceptBtnItem的相关信息。
 *          例如：let obj = [{label, labelStyle, style, hasButton}]; <AcceptBtn childs={[obj]}/>
 * 2. 直接以jsx字面量的形式定义，如：
 * 先引入Btn2中的button组件：
 * import Button from './Btn2/Button.js'
 * <AcceptBtn label="test">
 *      <Button label="test"/>
 *       <Button label="test2"/>
 * <AcceptBtn/>
 */
const buttonStyle = {
    green: {
    backgroundColor: '#009688',
    },
    pink: {
        backgroundColor: '#ff888e',
    }
};
const baseStyle = {
    color: 'white',
    display: 'inline-block',
    width: '70px',
    padding: '0 20px',
}
const getButtonStyle = function (type = 'green') {
    return Object.assign({},buttonStyle[type] || buttonStyle['green'] , baseStyle)
}

 export default class AcceptBtn extends Component {

    static propTypes = {
        buttons: PropTypes.array,
        label: PropTypes.string,
        style: PropTypes.object
    }

    static getDefaultProps = function () {
        return {
            buttons: [],
            label: '',
            style: {}
        }
    }

    constructor (props) {
        super(props); 
    }

    render () {
        let {style, buttons, children} = this.props,
            firstButton, lastButton;
        children = [].concat(children);
        firstButton = buttons && typeof buttons[0] === 'object' ? <AcceptBtnItem {...buttons[0] }/> : children[0],
        lastButton = buttons && typeof buttons[1] === 'object' ? <AcceptBtnItem {...buttons[1] }/> : children[1];
        lastButton = (!lastButton || lastButton.props.genre) ? 
                        lastButton :
                        React.cloneElement(lastButton, {
                            genre: 'pink'
                        });
        return (
            <div style={style} className={Style.acceptBtn}>
                {this.props.label && <span className={Style.label}>{this.props.label}</span>}
                <div className={bindClass(Style.buttonItems, !this.props.label && Style.no_label)}>
                    {firstButton}
                    {lastButton}
                </div>
            </div>
        ) 
    }


 }

/** 
 * genre: proptypes.string
*/

export function AcceptBtnItem ({genre = 'green', style, ...args}) {
    console.log(genre);
    style = Object.assign({}, getButtonStyle(genre), style);
    return (
        <Button style={style} {...args}/>
    )
}
