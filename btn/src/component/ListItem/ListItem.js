/**
 * Created by csh on 2017/6/7.
 */
import "../Theme/app.css";
import React from "react";
import style from "./style.scss";

const ListItem = ({title, describeText, itemClick, keys, width, additionalText, subDesc, extra, subExtra}) => {
    let iClick = itemClick ? itemClick : () => {
    }

    function click() {
        iClick(keys)
    }

    return (
        <div onClick={click} className={style.list_item_container} style={width ? {width: width} : {}}>
            <div className={style.line1}>
                <span className={style.title}>{title || 'No Title'}</span>
                <span className={style.additional}>{additionalText || ''}</span>
            </div>
            <div className={style.line2}>
                <span className={style.Desc}>{describeText || ''}</span>
                <span className={style.subDesc}>{subDesc || ''}</span>
            </div>
            <div className={style.line3}>
                <span className={style.extra}>{extra || ''}</span>
                <span className={style.subExtra}>{subExtra || ''}</span>
            </div>
        </div>
    )
}
export default ListItem

