/*
 通用组件: 没有数据的时候显示的视图,以方便切换视图
   ' 暂无数据 ',
   样式已封装,
   直接调用组件
   给出参数 item={0} 0,1,2,3....
   选择显示文字样式
 */

import React from 'react';
export default class NoDataView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // 字体以及布局样式
        const noneDataFontStyle = {
            marginTop: 40,
            paddingBottom: 100,
            fontSize: 18,
            color: 'grey',
            textAlign: 'center'
        };
        const strings = [              // item = :
            '暂无数据可查看╮(╯_╰)╭',    // 0
            '还没有数据 ╮(╯_╰)╭',      // 1
            '暂无问卷~',               // 2
            '暂无课程~',               // 3
            '暂无研究~',               // 4
            '即将开启,暂未上线~',       // 5
            '还没有发放过奖励~',        // 6
            '加载中...',               // 7
            '正在开发中，coming soon~', // 8
        ];
        return (
            <div id="none_data_coms" className={style.flex-row-center} style={{width: '100%'}}>
                <div style={noneDataFontStyle}>
                    {this.props.item ? strings[parseInt(this.props.item)] : strings[0]}
                </div>
            </div>
        )
    }
}