/**
 * Created by csh on 2017/6/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import style from './style.css'

export default class BtnTabs extends React.Component {
    static defaultProps = {
        labels: [],
        switchTabs (){
        },
        hasDownload: false
    }

    constructor(props) {
        super(props)
        this.handleSwitch = this.handleSwitch.bind(this)
    }

    handleSwitch(e) {
        //  console.log(e.target.innerHTML)
        this.props.switchTabs(e.target.innerHTML)
    }


    render() {
        let download
        if (this.props.hasDownload) {
            download = (
                <div style={{display: 'none'}} id="exportcsv">
                    <a />
                </div>
            )
        }


        return (
            <div className={style.expDetailBtns}>
                {  this.props.labels.map((label, index) => {
                    return (
                        <div className={style.expDetailBtn} key={index}>
                            <a onClick={this.handleSwitch}>
                                {label}
                            </a>
                        </div>
                    )
                })}
                {
                    download
                }
            </div>
        )

    }
}

BtnTabs.proptypes = {
    labels: PropTypes.array,
    switchTabs: PropTypes.func,
    hasDownload: PropTypes.bool
}
