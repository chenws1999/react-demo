import React from 'react';
import './style.css';

class Button extends React.Component {
    constructor (props) {
        super(props);
        this.props = Object.assign({
            preCheck () {
                return true;
            },
            onClick () {
                console.log('button click');
            },
            disabled: false,
            type: 0,
            label: '',
            size: 'medium',
        }, props);
        this.state = {
            loading: true
        }
        this.handleClick = this.handleClick.bind(this);
    }
    render () {
        // if ()
        return (
            <button type="button" className="button">
                <div className="item">
                    {this.state.loading && <LoadEffect/>}
                </div>
                <div className="item">
                </div>
            </button>
        )
    }
    handleClick () {
        if (this.state.loading)
            return;
        let res = this.props.onClick();
        if (res instanceof Promise) {
            this.setState({
                loading: true
            });
            res.then(res => {
                this.setState({
                    loading: false
                })
            }).catch(e => {
                this.setState({
                    loading: false
                })
                console.log('error: ', e);
            });
            return;
        }
    }
}

function LoadEffect () {
    return (
        <div className="loadEffect">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

export default Button;