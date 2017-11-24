import React from 'react';
export default class LoadingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
    	setTimeout(this.toBefore.bind(this), 1000);
    }

    toBefore(){
    	history.back();
    }

    render() {
    	// 字体以及布局样式
    	const noneDataFontStyle = {
    	    marginTop: 40,
    	    paddingBottom: 100,
    	    fontSize: 18,
    	    color: 'grey',
    	};
        return (
            <div id="none_data_coms" className={style.flex-row-center}>
                <div style={noneDataFontStyle}>
                   	加载中...
                </div>
            </div>
        )
    }
}