import React from 'react'
import {Link} from 'react-router-dom'
import style from './style.scss'
import {NavLink} from 'react-router-dom'
/**
 * 使用React Router中的NavLink API 再次封装一层为导航式Tab
 * 文档地址：https://reacttraining.com/react-router/web/api/NavLink
 * 传入标签和标签所对应的地址即可
 */

const NavTab = ({tabs,underline}) => <div className={style.nav_link_container}>
    {tabs.map((item, index) => <NavLink key={"nav"+index} to={item.link} activeClassName={underline?'active_underline': 'active'}>
        {item.icon ? <img src={item.icon} className={style.icon_left} />:''}
        {item.label}</NavLink>
    )}
</div>

export default NavTab