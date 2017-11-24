import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types'
import style from './flexTextBoxStyles.css';
import marked from 'marked';

const MIN_H = '50px';
export default class FlexTextBox extends Component {

    static defaultProps = {
        content:'',
        type: 'text',
        rows: '3',
        fontSize: '16px',
    };

    static propTypes = {
        content: PropTypes.string,
        type: PropTypes.string,
        rows: PropTypes.string,
        fontSize: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    };

    constructor(props) {
        super(props);
        this.state = {
            descStretchFlag:false,
            contentHeight:MIN_H
        }
    }

    componentWillReceiveProps = () => {
        // 如果原文包含 mathjax 表达式， 加载 mathjax组件
        if (this.props.content && this.props.content.indexOf('$$') !== -1) {
            let js_mathjax   = 'https://cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML';
            this.loadJS(js_mathjax).then(function(msg){});
        }
    };

    componentWillMount = () => {
        if (this.props.content && this.props.content.indexOf('$$') !== -1) {
            let js_mathjax   = 'https://cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML';
            this.loadJS(js_mathjax).then(function(msg){});
        }
    };

    loadJS = (url) => {
        return new Promise(function(resolve, reject) {
            let script = document.createElement('script');
            script.type = "text/javascript";
            if (script.readyState){
                script.onreadystatechange = function() {
                    if (script.readyState === "loaded" ||
                        script.readyState === "complete") {
                        script.onreadystatechange = null;
                        resolve('success: '+url);
                    }
                };
            } else {
                script.onload = function(){
                    resolve('success: '+url);
                };
            }
            script.onerror = function() {
                reject(Error(url + 'load error!'));
            };
            script.src = url;
            document.body.appendChild(script);
        });
    };

    toggleDescStretch() {
        if (this.state.descStretchFlag) {
            this.setState({
                contentHeight: MIN_H,
                descStretchFlag: !this.state.descStretchFlag
            })
        } else {
            this.setState({
                contentHeight: 'auto',
                descStretchFlag: !this.state.descStretchFlag
            })
        }
    }

    showMathjax = () => {
        if (this.props.content && this.props.content.indexOf('$$') !== -1) {
            if(window.MathJax){
                window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output"]);
            }else{
                setTimeout(this.runningMath.bind(this), 1000);
            }
        } else {
            return null;
        }
    };

    runningMath = () => this.showMathjax();

    render() {
        let boxBtn = this.state.descStretchFlag ?
            (
                <div  className={style.descStretch}
                      onClick={this.toggleDescStretch.bind(this)}>
                    <div  className={style.flexBtn}>
                        <div className={style.arrowUp}>
                        </div>
                        <div className={style.text}>
                            收起
                        </div>
                    </div>
                </div>
            ):
            (
                <div className={style.descStretch}
                 onClick={this.toggleDescStretch.bind(this)}>
                    <div className={style.fakeDot}>
                        ......
                    </div>
                    <div  className={style.flexBtn}>
                        <div className={style.arrowDown}>
                        </div>
                        <div className={style.text}>
                            展开
                        </div>
                    </div>
                </div>
            );
        return (
                <div
                    className={style.descbox}
                    style={{fontSize:this.props.fontSize}}
                >
                    <div id='desc'
                        className={style.gameDesc}
                        style={{height: this.state.contentHeight,minHeight: this.state.descStretchFlag?'100px':MIN_H}}>
                        <div dangerouslySetInnerHTML={{__html: marked(this.props.content)}}></div>
                    </div>
                    {boxBtn}
                    {this.showMathJax}
                </div>
        );

    }
}