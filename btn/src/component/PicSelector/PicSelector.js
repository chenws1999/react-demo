import React from 'react';
import Toast from '../Toast/Toast';
import Btn from '../Btn/Btn';
import settings from '../../../config/qiniu.conf';
/*
 useness:
    state: 
        1).side_pic: flase  //控制侧边栏开关
    <PicBox 
        selectPic={this.choose_pic}/>
 */

class PicBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: 'hi',
            count:   0,
            inWx:    false,
            pics:    [],
            waiting: false,
            prepared: false,
            loaded: false
        }
    }
    // update
    handleTouchTap = () => {
        Toast.warning('已达到最大图片数,无法上传,请申请更多空间')
    };
    // select pics
    handleCheck = (idx) => {
        this.state.pics[idx].checked = !this.state.pics[idx].checked;
        this.setState({pics: this.state.pics});
    };
    /**
     * runtimes: 上传模式 html5,html4,...
     * browse_button: 上传的按钮
     * uptoken_url: 请求的url,在服务器端提供
     * unique_names: 是否将文件名设置为唯一key
     * save_key: sdk是否对key进行处理
     * domain: bucket域名,下载资源是使用
     * container: 上传图片按钮父元素的id
     * max_retries: 上传失败最大的重试次数
     * dragdrop: 是否开启可拖拽的上传
     * drop_element: 拖拽上传的区域块所属id (此功能可考虑在电脑端实现)
     * chunk_size: 如果分块上传, 每块的体积
     * auto_start: 选择文件后自动上传
     * max_file_size: 最大的文件体积
     */
    initqn = () => {
        let that = this;
        let uploader = Qiniu.uploader({
            runtimes:      'html5',
            browse_button: 'pickfiles',
            uptoken_url:   '/apiv1/qiniu/uptoken',
            unique_names:  false,
            save_key:      false,
            domain:        settings.QN_PIC_Domain,
            container:     'qncontainer',
            max_retries:   3,
            dragdrop:      true,
            drop_element:  'container',
            chunk_size:    '300kb',
            auto_start:    true,
            max_file_size : '300kb',
            filters : {
                mime_types: [
                    {title : "Image files", extensions : "jpg,gif,png,jpeg"}
                ]
            },
            init:          {
                'FilesAdded':     function (up, files) {
                    plupload.each(files, function (file) {
                    });
                },
                'BeforeUpload':   function (up, file) {
                    $('#pickfiles').addClass('btnPrevent');
                },
                'UploadProgress': function (up, file) {
                },
                'FileUploaded':   function (up, file, info) {
                    let domain     = up.getOption('domain');
                    let fileinfo   = $.parseJSON(info);
                    let sourceLink = domain + fileinfo.key;  //获取上传成功后的文件的Url
                    let csrf       = document.getElementById('csrf').value;
                    $.ajax({
                        type:    'POST',
                        url:     '/apiv1/pic/new',
                        data:    {
                            _csrf: csrf,
                            qiniu: sourceLink,
                            hashId: fileinfo.key
                        },
                        error:   function () {
                            Toast.info("异常");
                        },
                        success: function (obj) {
                            if (obj.err != 0) {
                                Toast.info(obj.msg);
                            }
                            else {
                                that.state.pics.unshift(obj.data);
                                that.state.count += 1 ;
                                that.setState({count: that.state.count, pics: that.state.pics});
                            }
                        }
                    })
                },
                'Error':          function (up, err, errTip) {
                    Toast.info(errTip);
                },
                'UploadComplete': function () {
                    $('#pickfiles').removeClass('btnPrevent');
                },
                'Key': function(up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数// 该配置必须要在 unique_names: false , save_key: false 时才生效
                    let name = file.type.split('/')[1];
                    let key = "an/img/" + file.id.toString() + '.' + name;
                    // do something with key here
                    return key;
                }
            }
        });
    };
    // init wxsdk
    initjwx = () => {
        $.ajax({
            type:    'GET',
            url:     "/wechat/jssdk?url=" + encodeURIComponent(window.location.href),
            success: function (result) {
                if (result.err == 0) {
                    let data = result.msg;
                    wx.config({
                        debug:     false,
                        appId:     data.appId,
                        timestamp: data.timestamp,
                        nonceStr:  data.nonceStr,
                        signature: data.signature,
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage']
                    });
                } else {
                    alert('微信SDK异常1');
                }
            },
            error:   function () {
                alert('微信请求异常');
            }
        });
    };
    // pic choosed
    selectPic = (url) => this.props.selectPic(url);

    /**
     * 逻辑:
     * 在初始化qiniu之前, 必须先引入 plupload
     */
    componentDidMount() {
        let ctx = this;
        ctx.getData(); // load img before load js files
        let urlArray = [
            [
                'https://cdn.bootcss.com/qiniu-js/1.0.14-beta/qiniu.min.js',
                'https://staticfile.qnssl.com/Plupload/2.1.1/plupload.full.min.js',
                'https://staticfile.qnssl.com/Plupload/2.1.1/i18n/zh_CN.js'
            ],
            ['https://cdn.bootcss.com/qiniu-js/1.0.14-beta/qiniu.min.js']
        ];
        async function sdkLoadAndInit(type) {
            try {
                for(let item of urlArray[type]) {
                    await $.getScript(item)
                }
                if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
                    await ctx.initjwx();
                } else {
                    await ctx.initqn();
                }
            } catch(err) {
                alert('SDK加载失败')
            }
        }
        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
            $.getScript("https://res.wx.qq.com/open/js/jweixin-1.1.0.js")
                .done(function(script, textStatus) {
                    sdkLoadAndInit(1);
                    ctx.setState({loaded:true}, ()=>{});
                })
                .fail(function(jqxhr, settings, exception) {
                    alert('jweixin加载失败');
                });
        } else {
            sdkLoadAndInit(0);
            ctx.setState({loaded:true}, ()=>{});
        }
    }

    handleToWxQn = () => {
        if (this.state.waiting) {
            Toast.info('loading...');
        }
        else {
            let that = this;
            wx.chooseImage({
                beforeSend: function () {
                    that.setState({waiting: true});
                },
                success: function (res) {
                    let localIds = res.localIds;
                    wx.uploadImage({
                        localId:            localIds[0],
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success:            function (res) {
                            let serverId = res.serverId; // 返回图片的服务器端ID
                            that.imgwxtoqn(serverId);
                        }
                    });
                }
            });
        }
    };

    // update pic to qiniu from wx
    imgwxtoqn = (serverId) => {
        let csrf = document.getElementById('csrf').value;
        $.ajax({
            type:    "POST",
            url:     '/wechat/imgwxtoqn',
            data:    {
                _csrf: csrf,
                mediaid: serverId
            },
            success: (res) => {
                if (res.err == 0) {
                    this.getData(); // Only show uploaded pics in server
                    this.setState({waiting: false});
                    /*another way also can did
                    this.setState({
                        count: this.state.count + 1,
                        pics: this.state.pics.unshift(res.msg),
                        waiting:false
                    });*/
                } else {
                    Toast.info('加载失败');
                }
            },
            error: () => {
                this.setState({
                    waiting: false
                });
                Toast.info('err');
            }
        });
    };

    handleInsert = () => {
        this.setState({waiting: true});
        let list = [];

        this.state.pics.map( (pic) => {
            if (pic.checked) {
                list.push(pic.url);
            }
        });

        if (list.length != 0) {
            let str = '';
            list.map( (item) => {
                str += "![](" + item + ")" + '\n';
            });
            this.props.selectPic(str);
        } else {
            this.setState({
                waiting: false,
            });
            Toast.error('请先勾选图片');
        }
    };
    // delete pics
    removePic = () => {
        this.setState({waiting: true});
        let list = [];

        this.state.pics.map( (pic) => {
            if (pic.checked) {
                list.push(pic.id);
            }
        });


        let csrf = document.getElementById('csrf').value;


        if (list.length != 0) {
            $.ajax({
                type:    'POST',
                url:     '/apiv1/pic/discard',
                data:    {
                    _csrf: csrf,
                    list: list
                },
                error:   () => {
                    Toast.info("前端异常");
                },
                success: (obj) => {
                    if (obj.err != 0) {
                        Toast.info("后端异常");
                    }
                    else {
                        this.setState({pics: obj.data, count: obj.count, waiting: false});
                    }
                }
            })
        } else {
            this.setState({
                waiting: false,
            });
            Toast.error('请先勾选图片');
        }
    };
    // get intial datas
    getData = () => {
        $.ajax({
            type:    'GET',
            url:     '/apiv1/pic',
            error:   () => {
                Toast.info("前端异常");
            },
            success: (obj) => {
                if (obj.err != 0) {
                    Toast.error("后端异常");
                } else {
                    this.setState({count: obj.count, pics: obj.data})
                }
            }
        });
    };

    render() {
        let discard = (<Btn
                        label="删除"
                        onClick={this.removePic.bind(this)}
                        id='discard'/>);
        let insert = (
            <Btn
                label="插入"
                onClick={this.handleInsert}
            />
        );

        let button = (<div id='qncontainer'>
            <Btn
                label="上传图片"
                id='pickfiles'/>
        </div>);
        if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
            button = (<Btn label="上传图片" onClick={this.handleToWxQn.bind(this)}/>);
        }
        let content = <p>素材库为空</p>;
        if (this.state.count > 0) {
            content = this.state.pics.map((pic, idx) => {
                if (pic.url) {
                    return (
                        <div
                            style={{
                                paddingLeft: 8,
                                paddingRight: 8,
                            }}
                            className='col s12 m4' 
                            key={idx}>
                            <div 
                                style={{
                                    backgroundColor: '#CBD7D8'
                                }}
                                className={style.card}>
                                <div className={style.flex-row-center}> 图{idx+1} </div>
                                <div   
                                    style={{
                                        paddingBottom: 0,
                                        paddingTop: 10,
                                        paddingLeft: 0,
                                        paddingRight: 0,
                                    }}
                                    className={style.cardContent}>
                                    <div style={{
                                            backgroundImage:  'url(' + pic.url + ')',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize:   'cover',
                                            backgroundPosition: 'center',
                                            height: 150
                                         }}>
                                    </div>
                                </div>
                                <div className={style.clotbox}>
                                    <input  type="checkbox"
                                            id={idx}
                                            checked={pic.checked}
                                            onClick={this.handleCheck.bind(this, idx)}
                                    />
                                    <label  htmlFor={idx}>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )
                }
            });
        }

        if (this.state.count > 30) {
            button = (
                <Btn 
                    label="上传图片"
                    onClick={this.handleTouchTap}/>
            );
        }

        let main = false;
        if (this.state.loaded) {
            main = (
                <div>
                    <div style={{
                             paddingLeft: 8,
                             height:50, width:'100%',
                             zIndex:999,
                             backgroundColor:'#fff',
                             paddingTop:10
                     }}
                    >
                        {button}
                        <div style={{width:20, display:'inline-block'}}></div>
                        {insert}
                        <div style={{width:20, display:'inline-block'}}></div>
                        {discard}
                    </div>
                    <div className={style.row} style={{textAlign:'center'}}>
                        {content}
                    </div>
                </div>
            )
        } else {
            main = (<div>加载中......</div>)
        }

        return (
            <div>
                {main}
            </div>
        )
    }
}

export default PicBox;
