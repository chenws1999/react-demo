/**
 * Created by csh on 2017/6/27.
 */
import React from 'react'
import PropTypes from 'prop-types'

export default class Tab extends  React.Component {
    static defaultProps = {
        label: '未命名标签'
    }
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

Tab.proptypes = {
    label: PropTypes.string
}