/**
 * Created by csh on 2017/6/8.
 * 没有做完
 */
import React from 'react'
import PropTypes from 'prop-types'
import bind from 'classnames';
import './style.css';
import Loading from '../EffectLoad/index';

/**
 *  edit by chenws on 2017/11/23
 *  label: PropTypes.string,  加载按钮文字
    more: PropTypes.bool,       是否还能加载
    loadMore: PropTypes.func, 按钮点击后触发的回调函数
    loading: PropTypes.bool  是否处于加载状态
    size: PropTypes.string 大小，可以为'small','medium', 'large', 默认为large
 */
const loadingSize = { //加载图标大小的配置信息
    small: {
        width: '20px',
        height: '20px'
    },
    medium: {
        width: '30px',
        height: '30px'
    },
    large: {
        width: '40px',
        height: '40px'
    }
}
export default class LoadMore extends React.Component {
    static defaultProps = {
        label: '加载',
        more: true,
        loading: false,
        loadMore () {},
        size: 'large'
    }
    constructor(props) {
        super(props)
        this.handleLoad = this.handleLoad.bind(this)
    }

    handleLoad() {
        if (this.props.more){
            this.props.loadMore()
        } else {
            return false
        }
    }

    render() {
        let content;
        let classname = bind('loadmore', // 公用样式
                this.props.size !== 'large' && ('loadmore-' + this.props.size), // size样式
                this.props.loading && 'loadmore-loading') // 加载样式
        if (this.props.loading) {  // 如果处于加载状态
            content = 
                [<Loading type={3} style={loadingSize[this.props.size]}/>, <span>加载中</span>]
        }
        else       // 否则
            content = 
                <span>{ this.props.more ? this.props.label: '没有了~'}</span>
        return (
            <div className={classname}
                onClick={this.handleLoad }
            >
                {content}
            </div>
        );
    }
}

LoadMore.proptypes = {
    label: PropTypes.string,
    more: PropTypes.bool,
    loadMore: PropTypes.func,
    loading: PropTypes.bool,
    size: PropTypes.string
}