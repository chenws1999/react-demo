import React from 'react';
import style from './styles.css';
import marked from 'marked';
/*
 useness:
    state:
        1). editMode: true/false
                    如果只是编辑, 新建的情境下使用, editMode可以给true固定值
                    如果是更新信息, 有原来的信息, 则可以预览或编辑, 选择编辑或完成查看模式
        2). txt: 需要预览的内容
        3). detail: 编辑内容存储z变量
    func:
        1). open_side_pic = () => this.setState({ side_pic: true });
        2). inputDetail = (txt) => this.setState({detail: txt});
    view:
        <Editor
            openPicBox={this.open_side_pic.bind(this)}
            editMode={true}
            inputDetail={this.inputDetail.bind(this)}
            detail={this.state.detail}
            txt={this.state.txt}
        />
 */

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            preview: false,     // 是否预览
        }
    }

    static defaultProps = {
        addPicFlag: false
    }

    componentWillMount = () => {
        let js_mathjax   = 'https://cdn.bootcss.com/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML';
        let css_markdown = '/static/css/markdown.css';
        this.loadJS(js_mathjax).then(function(msg){});
    };

    loadJS = (url) => {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.type = "text/javascript";
            if (script.readyState){
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" ||
                        script.readyState == "complete") {
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

    inputDetail = (e) => {
        this.props.inputDetail(e);
    };

    openPicBox = () => {
        this.props.openPicBox();
    };

    // preview btn action
    preview = () => {
        this.setState({
            preview: this.state.preview ? false : true
        });
        return;
    };

    // 判断是否加载好, 如果没有加载好, 继续等待
    showMathjax = () => {
        if(window.MathJax){
            window.MathJax.Hub.Queue(["Typeset",MathJax.Hub,"output"]);
        }else{
            setTimeout(this.runningMath.bind(this), 1000);
        }
    };

    runningMath = () => {
        this.showMathjax();
    };

    render() {
        const editorHeight = this.props.height ? this.props.height - 50 : 150;
        const height = this.props.height ? this.props.height : 200;
        // 左边布局
        const LeftPart = {
            float: 'left',
            position: 'relative',
            width: '100%',
        };
        const leftEditNav = {
            borderBottom: 'solid 1px #C6C6C6',
            backgroundColor: '#F7F7F7',
            paddingTop: 5,
            float: 'left',
            position: 'relative',
            width: '100%',
            height: '40px',
        };
        // 左边编辑区域
        const leftEditArea = {
            float: 'left',
            position: 'relative',
            width: '100%',
        };
        // 右边预览
        const rightPreviewArea = {
            overflowX: 'hidden',
            overflowY: 'auto',
            float: 'left',
            position: 'relative',
            width: '100%',
            minHeight: height
        };
        // 编辑区提示文字
        const editNotiFont = {
            fontSize: 15,
            color: '#666666',
        };
        // 预览提示文字
        const previewNotiFont = {
            float: 'left',
            fontSize: 15,
            color: '#666666',
        };
        // textarea style
        const textArea = {
            fontSize: '1.2rem',
            outline: 'none',
            margin: '0px',
            resize: 'none',
            width: '98%',
            height: editorHeight,
            border: 0,
            color: '#666464'
        };
        return (
            <div style={{width:'100%'}}>
                {
                    (() => {
                        if(this.props.editMode){
                            return(
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    boxSizing:'border-box'
                                }} className={style.row}>
                                    <div style={LeftPart}>
                                        <div style={leftEditNav}>
                                            <div
                                                style={{
                                                    backgroundColor: this.state.preview ? '#F7F7F7' : '#fff'
                                                }}
                                                onClick={this.state.preview ? this.preview.bind(this) : ()=>{return;}}
                                                className={style.previewBtnStyle}>
                                                {'编辑'}
                                            </div>
                                            <div
                                                style={{
                                                    marginLeft:-1,
                                                    backgroundColor: this.state.preview ? '#fff' : '#F7F7F7'
                                                }}
                                                onClick={this.state.preview ? ()=>{return;} : this.preview.bind(this)}
                                                className={style.previewBtnStyle}>
                                                {'预览'}
                                            </div>
                                            {
                                                this.props.addPicFlag ?
                                                    (
                                                        <a
                                                            color='#333'
                                                            onClick={this.openPicBox.bind(this)}
                                                            className={style.photoBtnStyle}>
                                                            插图
                                                        </a>
                                                    ): false
                                            }
                                        </div>
                                        {
                                            (()=>{
                                                if(this.state.preview){
                                                    return (
                                                        <div style={rightPreviewArea}>
                                                            <div
                                                                style={{color: '#5588ee'}}
                                                                className={style.opimg}
                                                                dangerouslySetInnerHTML={{__html:marked(this.props.detail)}}>
                                                            </div>
                                                            {
                                                                (()=>{
                                                                    setTimeout(this.showMathjax.bind(this), 500);
                                                                })()
                                                            }
                                                        </div>
                                                    )
                                                }else{
                                                    return (
                                                        <div style={leftEditArea}>
                                                            <textarea
                                                                placeholder="请输入内容"
                                                                id={this.props.id}
                                                                onChange={this.inputDetail}
                                                                value={this.props.detail}
                                                                style={textArea}
                                                                rows="3"
                                                                cols="20">
                                                            </textarea>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }

                                    </div>
                                </div>
                            )
                        }else{
                            return (
                                <div>
                                    <div
                                        style={{color: '#5588ee'}}
                                        className={style.opimg}
                                        dangerouslySetInnerHTML={{__html:marked(this.props.txt)}}>
                                    </div>
                                    {
                                        (()=>{
                                            setTimeout(this.showMathjax.bind(this), 500);
                                        })()
                                    }
                                </div>
                            )
                        }
                    })()
                }
            </div>
        )
    }
}

export default Editor;