/*

 Props:
 type: 按钮样式类型 0, 1, 2 .... default: 0
 status: 按钮状态  0, 1  ... default: 0
 label: 按钮文案
 img: img={'path or url'} 图标按钮
 */

import React from 'react';
import styles from './styles.css';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);

export default class Btn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color1: '#fff',
            color2: this.props.fontColor ? this.props.fontColor : '#5588ee',
        }
    }

    componentWillReceiveProps = () => {
        if(this.props.fontColor){
            this.setState({color2: this.props.fontColor})
        }
    };

    handle = () => {
        if(this.props.onClick){
            this.props.onClick();
        }
    };

    render() {
        const label  = this.props.label ? this.props.label : 'undefined';
        const type   = this.props.type ? this.props.type : 0;
        const status = this.props.status ? this.props.status : 0;
        const divId = this.props.id ? this.props.id : ('btn-' + Math.random());
        let styleTemp = {};
        let styleTemp2 = {};
        if(this.props.style) {
            const tempJson = { backgroundColor: this.state.color1 };
            const tempJson2 = {
                padding: '0 14px',
                cursor: 'pointer',
                boxSizing: 'border-box',
                height: '2em',
                display: 'inline-block',
            };
            styleTemp = Object.assign(this.props.style, ...tempJson);
            styleTemp2 = Object.assign(this.props.style, ...tempJson2);
        }
        let style    = this.props.style ? styleTemp : 
            { backgroundColor: this.props.checked == true ? '#E0F7FA' :this.state.color1 };
        let style2 = this.props.style ? styleTemp2 : {};
        let outerStyle = style != {};
        let cxname = cx({
            btn1: true,
            basic: outerStyle
        });
        let flatBtn = cx({
            flatBtn: true
        });

        if (this.props.img && this.props.backgroundColor !== undefined) {
            return (
                <div
                    onClick={this.handle}
                    className={styles.handleBtn}
                    style={{backgroundColor: this.props.backgroundColor === false ? 'transparent' : this.props.backgroundColor}}>
                    <img src={this.props.img}/>
                    <a style={{
                        marginTop: -4,
                        fontSize: this.props.fontSize || 16,
                        color: this.props.color || '#3791f6'
                    }}>
                        {this.props.label}
                    </a>
                </div>
            )
        }

        switch (status) {
            case 0:
            case 1:
            {
                switch (type) {
                    case 0:
                        return (
                            <div
                                id={divId}
                                onClick={this.handle}
                                onMouseEnter={this.chColor1}
                                onMouseLeave={this.chColor1}
                                className={cxname}
                                style={style}>
                                    <a
                                        style={{
                                            color: '#5588ee',
                                            fontSize:13,
                                            display:'inline-block',
                                            height: '2.7em',
                                            lineHeight: '3em',
                                            overflow: 'hidden',
                                            cursor:'pointer'
                                        }}>
                                        {label}
                                    </a>
                            </div>
                        );
                    case 1:
                        return (
                            <div
                                id={divId}
                                style={style2}
                                onClick={this.handle}
                                onMouseEnter={this.chColor2}
                                onMouseLeave={this.chColor2}>
                                    <a
                                        style={{
                                            borderBottom: 'solid 1px #FF9A9A',
                                            color: this.state.color2,
                                            fontSize:'1em',
                                            lineHeight:'2em',
                                            display:'inline-block',
                                            overflow: 'hidden',
                                            cursor:'pointer'
                                        }}>
                                        {label}
                                    </a>
                            </div>
                        );
                    case 2:
                        return (
                            <div className={flatBtn}
                                 id={divId}
                                 style={{
                                     display: 'inline-block',
                                     height: 20,
                                     width: '100%',
                                     color: '#5588ee'
                                 }}
                                 onClick={this.handle}
                            >
                                <a>{label}</a>
                            </div>
                        );
                    default:
                        return (
                            <div>
                                Err: type val err
                            </div>
                        )
                }
            }
            case 9:
                return (
                    <div className={flatBtn}
                         id={divId}
                         style={{
                            display: 'inline-block',
                            height: 20,
                            width: '100%',
                            color: '#5588ee'
                         }}
                         onClick={this.handle}
                    >
                        <a>{label}</a>
                    </div>
                );
            default:
                return (
                    <div>
                        Err: status val err
                    </div>
                )
        }
    }

    // 主题1 默认值
    chColor1 = () => {
        this.setState({color1: this.state.color1 == '#fff' ? '#E0F7FA' : '#fff'});
    };

    // 主题2
    chColor2 = () => {
        if(this.props.fontColor){
            this.setState({color2: this.state.color2 == this.props.fontColor ? '#FF9A9A' : this.props.fontColor});
            return;
        }
        this.setState({color2: this.state.color2 == '#5588ee' ? '#FF9A9A' : '#5588ee'});
    };
}