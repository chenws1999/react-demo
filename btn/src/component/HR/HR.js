/*
 通用组件: 
    type:
        分割线
        ----------横版 type = 0
        | 竖版 type = 1
    theme:
        0: 默认样式
 */

import React from 'react';
export default class HR extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const type = this.props.type ? parseInt(this.props.type) : 0;
        const theme = this.props.theme ? parseInt(this.props.theme) : 0;
        switch(theme) {
            case 0:
                switch(type) {
                    case 0:
                        return (
                            <hr
                                style={{
                                    margin: '-1px 0px 0px',
                                    height: '1px',
                                    border: 'none',
                                    backgroundColor: 'rgb(224, 224, 224)',
                                }}
                            />
                        )
                    default:
                        return (
                            <div>
                                {(()=> alert('err: type err'))()}
                            </div>
                        )
                }
                break;
            default:
                return (
                    <div>
                        {(()=> alert('err: theme err'))()}
                    </div>
                )
        }
    }
}