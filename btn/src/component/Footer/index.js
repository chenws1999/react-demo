import React,{Component} from 'react'
import style from './style.scss'
import {setVersion} from '../../App/store/actions/center'
import {MultiVersion, setLangInLocal} from "../../App/public/MultiVersion/index"

export default class Footer extends Component {
    constructor(props) {
        super(props)
    }

    setVersion = () => {
        const newLang = this.props.center.multiVersion === 0 ? 1 : 0;
        this.props.dispatch(setVersion(setLangInLocal(newLang)))
    }

    render () {
        const version = this.props.center.multiVersion === 0 ? 'English Version' : '中文'
        return <div className={style.app_footer}>
            <div className={style.links}>
                <a href="https://mp.weixin.qq.com/s?__biz=MzIwNDE1NTM5MA==&amp;mid=2247483699&amp;idx=1&amp;sn=44cad4de8d97d6ca29fc8d45e69b1b59" className={style.linkItem}>
                    {MultiVersion().Footer_ABOUT}
                </a>
                <a href="https://www.lagou.com/gongsi/52301.html" className={style.linkItem}>
                    {MultiVersion().Footer_JOIN}
                </a>
                <a className={style.linkItem}>
                    {MultiVersion().Footer_TERM}
                </a>
                <a className={style.linkItem}>
                    {MultiVersion().Footer_FIREND}
                </a>
                <a className={style.linkItem}
                   style={{color: '#5588ee'}}
                   onClick={this.setVersion}>{version}</a>
            </div>
            <div className={style.copyright}>Copyright © 2017
                {MultiVersion().Footer_LOGO}
            </div>
        </div>
    }
}