import React from 'react';
import styles from './styles.css';
import dateformat from 'dateformat';

const roleText = [
    '姓名: ',
    '角色: ',
    '性别: ',
    '学校: ',
    '手机: ',
    '加入时间: '
];
const genderText = ['男', '女'];
const roleName = ['学生', '研究者'];

class Info extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.userinfo == 'loading') {
            return (
                <div className={styles.loading}>
                    加载中...
                </div>
            )
        } else {
            const roleInfo = [
                this.props.userinfo.user.name,
                roleName[parseInt(this.props.userinfo.user.role)],
                genderText[parseInt(this.props.userinfo.user.gender)],
                this.props.userinfo.user.orgName,
                this.props.userinfo.user.mobile,
                dateformat(this.props.userinfo.user.createAt, 'yyyy-mm-dd HH:MM')
            ];
            return (
                <div>
                    <div className={styles.listViewPanel}>
                        <img className={styles.head}
                             src={this.props.userinfo.user.headimg}/>
                    </div>
                    {
                        this.props.userinfo.user.stuNum ?
                        <div
                            key={'user-info-count-N'}
                            className={styles.listViewPanel}>
                            <div>学号:</div>
                            <div>{this.props.userinfo.user.stuNum}</div>
                        </div> : null
                    }
                    {
                        roleInfo.map((item, index) => {
                            return (
                                <div
                                    key={'user-info-count-' + index}
                                    className={styles.listViewPanel}>
                                    <div>{roleText[index]}</div>
                                    <div>{item}</div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
    }

}

export default Info;