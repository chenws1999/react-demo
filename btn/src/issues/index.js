import rasterizehtml from 'rasterizehtml';
import React, { Component } from 'react';
import _ from 'lodash';

let x = 0, y = 0,
    lastX = -1, lastY = -1,
    canvas, ctx,
    inner = false,
    position,
    keydown = false, 
    flag = false,
    lineWidth = 5
function registerListener () {
    flag = true;    
    console.log('flag to true')
}
function removeListener () {
    flag = false;
    lastX  = -1;
    lastY =  -1;
    console.log('flag to false')
}
function handleClick() {


    ctx = canvas.getContext('2d');
    let container = document.getElementById('container');
    console.log(canvas);
    var html = document.getElementById('test').innerHTML;

    position = getAbsolutePosistion(canvas);
    console.log(position, 'postion');
    container.onmousemove = _.throttle(function (e) {
        // console.log(e.clientX, e.clientY)
        x = e.clientX - position.left;
        y = e.clientY + document.body.scrollTop - position.top;
    }, 14);
    rasterizehtml.drawDocument(document, canvas, {
        executeJs: true,
        executeJsTimeout: 1000
    }).then(res => {
        console.log(res);
    })
    function test() {
        if (lastX !== -1 ) {
            draw(x, y);
        }
        lastX = x;
        lastY = y;
        // if (x >= 700 || y >= 500)
        //     return;
        // x += 5;
        // y += 5;
        window.requestAnimationFrame(test);
    }
    test();
    // window.requestAnimationFrame(_ => {
    // console.log('render');

    // })
}
window.requestAnimationFrame(_ => {
})
function draw(x, y) {

    if (!flag)
        return;
    // ctx.fillStyle='#000';
    ctx.fillStyle = "rgb(200,0,0)";
    ctx.beginPath()
    ctx.moveTo(lastX, lastY) 
    ctx.lineTo(x, y)
    if(Math.abs(lastY - y) < lineWidth) {
        ctx.lineTo(x, y + lineWidth)
        ctx.lineTo(lastX, lastY + lineWidth)
    } else {
    ctx.lineTo(x + lineWidth, y)
    ctx.lineTo(lastX + lineWidth, lastY)
    }
    ctx.lineTo(lastX, lastY)
    ctx.fill()
    ctx.closePath()
    //console.log(x, y, 'draOw');
    // if (flag)
    // ctx.fillRect(x, y, 5, 5);
}
export default class Issues extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
            <div onClick={handleClick}>
                test
            </div>
            <div onClick={this.upload}>
                upload
            </div>
            </div>
        )
    }
    componentDidMount() {
        canvas = document.getElementById('canvas');
        canvas.width = 700;
        canvas.height = 500;
        canvas.onmouseover = _ => {
            console.log('enter')
            flag && (flag = false)
            inner = true;
            if (keydown === false) {

            }
            else {
            }
        }
        canvas.onmouseout = _ => {
            inner = false;
        }
        canvas.onmousedown = _ => {
            console.log('keydown')
            if (keydown === true ){

            }
            else {
                keydown = true;
                registerListener()
            }
        }
        canvas.onmouseup = _ => {
            console.log('keyup')
            if (keydown === false) {

            }
            else {
                keydown = false;
                removeListener()
            }
        }
    }
    upload () {
        let data = canvas.toDataURL();
        console.log(data);
    }

}

function getAbsolutePosistion(ele) {
    let left = ele.offsetLeft,
        top = ele.offsetTop,
        current = ele.offsetParent;
    while (current) {
        console.log(left, top);
        left += (current.clientLeft + current.offsetLeft);
        top += (current.clientTop + current.offsetTop);
        current = current.offsetParent;
    }
    return {
        left,
        top
    }
}