/**
 * Created by liujunchi on 7/26/17.
 */

import React from 'react';
import PropTypes from 'prop-types'
import style from './table.css';
import classNames from 'classnames/bind';
import styles from './table.css';

let cx = classNames.bind(styles);

export default class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {};

    static propTypes = {
        cols: PropTypes.array.isRequired,
        items: PropTypes.array.isRequired,
    };



    render() {
        return (
           <div className={cx('tableContainer')}>
               <div className={cx('tableHeader')}>
                   {
                       this.props.cols.map(col=>{
                           return <div key={col.head} className={cx('tableHeadItem')}>{col.head}</div>
                       })
                   }
               </div>
               {
                   this.props.items.map(item=>{
                       return  (
                           <div className={cx('tableRow')}>
                               {
                                   // item.map(attr=>{
                                   //     return <div className={cx('tableRowItem')}>{attr}</div>
                                   // })
                                   this.props.cols.map(col=>{
                                       return <div key={item._id.toString()} className={cx('tableRowItem')}>{item[col.attr]}</div>
                                   })
                               }
                           </div>
                       )
                   })
               }
           </div>
        )
    }

}