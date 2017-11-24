/**
 * Created by liujunchi on 10/8/16.
 */

import React from 'react';
import styles from './styles.css';


export default class Option extends React.Component {
    choose = () => {
        let value = this.props.value;
        let text = this.props.primaryText;
        let index = this.props.index;
        this.props.onClick(value, text, index);
    };

    render() {
        let textAlign = this.props.textAlign ? this.props.textAlign : 'left';
        return (
            <li className={styles.Option} style={{textAlign: textAlign}} onClick={this.choose}>
                {this.props.primaryText}
            </li>
        )
    }
}