/**
 * Created by liujunchi on 10/8/16.
 */
import React from 'react';
import style from './styles.css';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none',
            listHeight: 0
        }
    }   

    static defaultProps = {
        fontSize: '16px'
    };

    static propTypes = {
        hintText: PropTypes.string,
        outerStyle: PropTypes.object,
        border: PropTypes.string,
        tran:   PropTypes.string,
        fontSize: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    toggleExpand = () => {
        if (this.state.display == 'none') {
            this.setState({display: 'block'})
        } else {
            this.setState({display: 'none'})
        }
    };


    render() {
        let titleBottomLeft = this.state.display == 'none' ? 0 : 0;
        let titleBottomRight = this.state.display == 'none' ? 0 : 0;
        if (this.props.borderRadius === 0 || this.props.borderRadius) {
            titleBottomLeft = 0;
            titleBottomRight = 0;
        }
        let urlP = Object.assign({}, {
            listStyle: 'none',
            paddingLeft: 0,
            fontSize: 16
        }, this.props.outerStyle);

        let border = this.props.border ? this.props.border : '1px solid #5588ee';
        let tran   = this.props.tran   ? this.props.tran   : '6px solid #5588ee';
        let color  = this.props.color;
        let textAlign = this.props.textAlign ? this.props.textAlign : 'left';
        let height = this.props.height ? this.props.height : 24;
        let lineHeight = this.props.lineHeight ? this.props.lineHeight : '24px';
        let borderRadius = this.props.borderRadius ? this.props.borderRadius : 0;
        return(
            <div className={style.Select} style={{color:color}}>
                <ul style={urlP}
                    onClick={this.toggleExpand}
                >
                    <li style={{position:'relative'}}>
                        <div style={{
                                borderTop: border,
                                borderLeft: border,
                                borderRight: border,
                                borderBottom: border,
                                paddingLeft:9,
                                borderTopLeftRadius: borderRadius,
                                borderTopRightRadius: borderRadius,
                                borderBottomRightRadius: titleBottomRight,
                                borderBottomLeftRadius: titleBottomLeft,
                                textAlign: textAlign,
                                height: height,
                                lineHeight: lineHeight
                             }}
                        >
                            <div style={{display:'inline-block',fontSize: this.props.fontSize}}>
                                {this.props.title ? this.props.title : this.props.hintText}
                            </div>
                            <div style={{
                                     marginTop: this.props.marginTR || 7,
                                     marginRight: this.props.marginTR || 7,
                                     float: 'right',
                                     width: 0,
                                     height: 0,
                                     borderLeft: '6px solid transparent',
                                     borderRight: '6px solid transparent',
                                     borderTop: tran
                            }}>
                            </div>
                        </div>
                        <ul style={{
                            backgroundColor: '#fff',
                            height: 100,
                            fontSize: this.props.fontSize,
                            overflow:'auto',
                            position:'absolute',
                            zIndex: 9999,
                            boxSizing: 'border-box',
                            width: '100%',
                            display: this.state.display,
                            listStyle: 'none',
                            paddingLeft: 0,
                            borderLeft: border,
                            borderRight: border,
                            borderBottom: border,
                            borderBottomRightRadius: borderRadius,
                            borderBottomLeftRadius: borderRadius
                        }}>
                            {this.props.children}
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
