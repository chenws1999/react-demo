import React from 'react';
import {Component} from 'react'
import PropTypes from 'prop-types'
import style from './maskLoadingView.css';

const strings = [ //TODO need refactor
    {id: 0, text: '暂无数据~'},
    {id: 1, text: '没有数据~'},
    {id: 2, text: '暂无问卷~'},
    {id: 3, text: '暂无课程~'},
    {id: 4, text: '暂无研究~'},
    {id: 5, text: '即将开启,暂未上线~'},
    {id: 6, text: '还没有发放过奖励~'},
    {id: 7, text: '加载中...'},
    {id: 8, text: '正在开发中，coming soon~'},
    {id: 9, text: '等待学生加入..'},
    {id: 10, text: '等待其他玩家输入..'},
    {id: 11, text: '等待其他玩家加入..'},
    {id: 12, text: '本轮结束，等待下一轮..'}
];

export default class MaskLoadingView extends Component {

    static defaultProps = {
        maskBottom: 0,
        item: 0
    };

    static propTypes = {
        maskBottom: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        item: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className={style.maskLoadingTransition} style={{bottom: this.props.maskBottom}}>
                <div className={style.maskSpinner}>
                    <div className={style.doubleBounce1}></div>
                    <div className={style.doubleBounce2}></div>
                </div>
                <div style={{color: 'rgb(104, 104, 104)',fontSize: 24,marginTop: 24}}>
                    {strings[this.props.item].text}
                </div>
            </div>
        )
    }
}