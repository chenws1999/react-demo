

/**
  * Created by liujunchi on 10/11/16.
  */


import React from 'react';
import Notification from 'rc-notification';
import styles from './styles.css';
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);
let defaultDuration = 1;
let defaultTop;
let messageInstance;
let key = 1;


function getMessageInstance() {
        let cxname = cx({toastMessage:true});
        messageInstance = messageInstance || Notification.newInstance({
                    prefixCls: cxname,
                    transitionName: 'move-up',
                    style: { top: defaultTop }, // 覆盖原来的样式
            });
        return messageInstance;
    }

function notice(content, duration, type, onClose) {
        let instance = getMessageInstance();
        let cxname;
        switch(type){
            case 'info':
                cxname = cx({toastMessageInfo:true});
                break;
            case 'success':
                cxname = cx({toastMessageSuccess:true});
                break;
            case 'error':
                cxname = cx({toastMessageError:true});
                break;
            case 'warning':
                cxname = cx({toastMessageWarning:true});
                break;
            case 'loading':
                cxname = cx({toastMessageLoading:true});
                break;
            default:
                cxname = ' ';
                return;
        };
        instance.notice({
                key: key,
                duration: (duration? duration : defaultDuration),
                style: {},
                content: (
                             <div className={cxname}>
                                 <span>{content}</span>
                             </div>
                         ),
                onClose: onClose
        });
        return (function () {
                let target = key++;
                return function () {
                        instance.removeNotice(target);
                    };
            }());
    }


    export default {
        info(content, duration, onClose) {
                return notice(content, duration, 'info', onClose);
        },
        success(content, duration, onClose) {
                return notice(content, duration, 'success', onClose);
        },
        error(content, duration, onClose) {
                return notice(content, duration, 'error', onClose);
        },
        warning(content, duration, onClose) {
                return notice(content, duration, 'warning', onClose);
        },
        loading(content, duration, onClose) {
                return notice(content, duration, 'loading', onClose);
        },

        destroy() {
            if (messageInstance) {
                    messageInstance.destroy();
                    messageInstance = null;
               }
        }
};
