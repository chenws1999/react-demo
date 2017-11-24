import React from 'react';
import styles from './relect.css'
const BoxContent = props => {
    const { chosen, options, disabled } = props;
    if (typeof chosen === 'number' && options[chosen] !== void 0) {
        const clear = disabled ? null : <span className={styles.relectclear} onClick={props.onClear} />;
        return <span>{options[chosen].text || options[chosen]}{clear}</span>;
    } else {
        return <span className={styles.relectplaceholder}>{props.placeholder}</span>
    }
}

const Box = props => {
    const className = styles.relectbox;
    return (
        <div className={className} onClick={props.onClick} >
            {BoxContent(props)}
            <span className={styles.relectarrow} />
        </div>
    )
}

export default Box;
