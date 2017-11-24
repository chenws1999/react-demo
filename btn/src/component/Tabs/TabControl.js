/**
 * Created by csh on 2017/6/27.
 */
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
export default class TabControl extends React.Component {
    static defaultProps = {
        active: 0
    }

    constructor(props) {
        super(props)
        this.state = {
            currentIndex: props.active
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({currentIndex: nextProps.active});
    }
    getTitleItemCssClasses(index) {
        return index === this.state.currentIndex ? "tab_title title_active" : "tab_title";
    }

    getContentItemCssClasses(index) {
        return index === this.state.currentIndex ? "item_active" : "tab_item";
    }

    render() {
        return (
            <div>
                <div className={style.tab_title_container}>
                    {React.Children.map(this.props.children, (element, index) => {
                        return (<div onClick={() => {
                            this.props.synchronize(index)
                            this.setState({currentIndex: index})
                        }} className={this.getTitleItemCssClasses(index)}>
                            <span className={style.title}>
                                 {element.props.label}
                            </span>
                           </div>)
                    })}
                </div>
                <div className={style.tab_content_items}>
                    {React.Children.map(this.props.children, (element, index) => {
                        return (<div className={this.getContentItemCssClasses(index)}>{element}</div>)
                    })}
                </div>
            </div>
        )
    }
}

TabControl.proptypes = {
    active: PropTypes.num
}