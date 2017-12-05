/**
 * Created by csh on 2017/6/8.
 * 没有做完
 */
import React from 'react'
import PropTypes from 'prop-types'
import bind from 'classnames';
import Button from '../component/Btn2/Button';
/**
 *  edit by chenws on 2017/11/23
 *  label: PropTypes.string,  加载按钮文字
    more: PropTypes.bool,       是否还能加载
    loadMore: PropTypes.func, 按钮点击后触发的回调函数,该函数应该返回一个promise以保证在异步操作结束后（不管成功与否）通知Button按钮
    size: PropTypes.string 大小，可以为'small','medium', 'large', 默认为large
 */
const loadmoreStyle = {
    'large': {
            width: '500px',
            height: '50px',
            fontSize: '16px',
            borderRadius: '5px'
    },
    'medium': {
            width: '300px',
            height: '40px',
            fontSize: '14px',
            borderRadius: '4px'
    },
    small: {
            width: '120px',
            height: '30px',
            fontSize: '12px',
            borderRadius: '3px'
    }
}
export default class LoadMore extends React.Component {
    static defaultProps = {
        label: '加载更多',
        more: true,
        loadMore () {},
        size: 'large'
    }
    constructor(props) {
        super(props)
        this.handleLoad = this.handleLoad.bind(this)
    }

    handleLoad() {
        return this.props.loadMore() //返回一个promise, 触发loading效果
    }

    render() {
        let content;
        if (this.props.more) {  // 如果处于可继续加载状态
            content = 
               <Button type={1} label={this.props.label} style={loadmoreStyle[this.props.size]} className="testt" onClick={this.handleLoad}/>
        }
        else       // 否则
            content = 
                <Button type={1} label="没有更多了～"/>
        return content;
    }
}

LoadMore.proptypes = {
    label: PropTypes.string,
    more: PropTypes.bool,
    loadMore: PropTypes.func,
    size: PropTypes.string
}