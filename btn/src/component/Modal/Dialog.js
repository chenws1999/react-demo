import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default class SuiModal extends Component {
    static get defaultProps () {
        return {
            open: false,
            centerVertically: false,
            closeOnOutsideClick: false,
            fitWindow: false,
            disableWindowScroll: true,
            textClose: '关闭',
            textCloseHidden: true,
            slider: false,
            onClose: () => {return}
        }
    }

    static get propTypes () {
        return {
            slider: PropTypes.bool,
            open: PropTypes.bool,
            centerVertically: PropTypes.bool,
            closeOnOutsideClick: PropTypes.bool,
            fitWindow: PropTypes.bool,
            disableWindowScroll: PropTypes.bool,
            iconClose: PropTypes.element,
            textClose: PropTypes.string,
            textCloseHidden: PropTypes.bool,
            header: PropTypes.element,
            content: PropTypes.element.isRequired,
            footer: PropTypes.element,
            onClose: PropTypes.func
        };
    }

    constructor (...args) {
        super(...args);

        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);

        const {
                  open,
                  centerVertically,
                  closeOnOutsideClick,
                  fitWindow,
                  mid,
                  disableWindowScroll,
                  iconClose,
                  textClose,
                  textCloseHidden
              } = this.props;

        this.state = {
            open,
            centerVertically,
            closeOnOutsideClick,
            fitWindow,
            mid,
            disableWindowScroll,
            iconClose,
            textClose,
            textCloseHidden,
            scrollTop:0
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.open !== this.state.open) {
            this.setState({
                open: nextProps.open
            });
        }
    }

    closeModal () {
        this.setState({
            open: false
        }, () => {
            this.props.onClose();
        });
    }


    handleCloseClick () {
        this.closeModal();
    }

    handleOutsideClick (event) {
        if (this.state.closeOnOutsideClick && event.target === this.refs.modalWrapper) {
            this.closeModal();
        }
    }

    render () {
        const { header, iconClose, textCloseHidden, textClose, content, footer, slider} = this.props;
        const wrapperClassName = cx('sui-Modal', {
            'sui-Modal--open': this.state.open,
            'sui-Modal--verticallyCentered': this.state.centerVertically
        });
        const dialogClassName = cx('sui-Slider-dialog', {
            'sui-Slider-dialog': slider,
            'sui-Slider-dialog--full': slider,
            'sui-Modal-dialog': !slider,
            'sui-Modal-dialog--full': (!slider && this.state.fitWindow && !this.state.mid),
            'sui-Modal-dialog--mid': this.state.mid
        });

        const suiModalHeader  = cx('sui-Modal-header');
        const suiModalContent = cx('sui-Modal-content');
        const suiModalFooter = cx('sui-Modal-footer');

        return (
            <div
                id="suimodal"
                className={wrapperClassName}
                ref='modalWrapper'
                onClick={this.handleOutsideClick}
            >
                <div className={dialogClassName} style={{maxHeight:this.props.maxHeight}}>
                    <div style={{
                                fontSize: '30px !important',
                                cursor: 'pointer',
                                paddingRight:14,
                                borderBottom: '1px solid #ccc',
                                height:50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end'
                                 }}
                         onClick={this.handleCloseClick}
                    >
                        {textClose}
                    </div>
                    <div className={this.props.header ? suiModalHeader : ''}>
                        {this.props.header ? header : ''}
                    </div>
                    <div className={suiModalContent}>
                        {content}
                    </div>
                    {footer &&
                    <div className={suiModalFooter}>
                        {footer}
                    </div>
                    }
                </div>
            </div>
        );
    }
}