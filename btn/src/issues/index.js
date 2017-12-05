import rasterizehtml from 'rasterizehtml';
import React, { Component } from 'react';
import _ from 'lodash';

let x = 0, y = 0,
    canvas, ctx,
    inner = false,
    position,
    keydown = false, 
    flag = false
function registerListener () {
    flag = true;    

}
function removeListener () {
    flag = false;
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
        y = e.clientY;
    }, 14);
    rasterizehtml.drawDocument(document, canvas, {
        executeJs: true,
        executeJsTimeout: 1000
    }).then(res => {
        console.log(res);
    })
    function test() {
        draw(x, y);
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

    // ctx.fillStyle='#000';
    ctx.fillStyle = "rgb(200,0,0)";
    //console.log(x, y, 'draw');
    if (flag)
    ctx.fillRect(x, y, 5, 5);
}
export default class Issues extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div onClick={handleClick}>
                test
            </div>
        )
    }
    componentDidMount() {
        canvas = document.getElementById('canvas');
        canvas.width = 700;
        canvas.height = 500;
        canvas.onmouseover = _ => {
            console.log('enter')
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
                removeListener()
            }
        }
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