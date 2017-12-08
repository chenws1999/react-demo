import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import RaisedBtn from './RaisedBtn/RaisedBtn.js';
// import Button from './component/Btn2/Button';
// import './test.css';
// import BtnTabs from './component/BtnTabs/BtnTabs';
// import Input from './component/Input/Input';
// import LoadMore from './LoadMore/LoadMore';
// import CountBtnInput from './component/CountBtnInput/CountBtnInput'
// import EffectLoad from './component/EffectLoad/index';
// import Table from './component/Table/Table';
// import Box from './component/Select/Box';
// import Menu from './component/Select/Menu';
// import Select from './component/Select/Select';
// import Options from './component/Select/Option'
// import Checkbox, { CheckBoxGroup } from './backup/CheckBox/index';

// import CheckItem, { RadioGroup, CheckContainer } from './backup/Radio/index';
// import Button from './backup/Btn2/Button';
// import AcceptBtn, { AcceptBtnItem } from './acceptBtn/index';

// import IssuesUpload from './issues';
import CheckItem, {CheckContainer} from './backup/check-radio/checkContainer'
function res() {
  return new Promise(res => {
    setTimeout(_ => {
      res(true);
    }, 11000);
  });
}
function validateBorder (e) {
  console.log(e.target.scrollWidth);
}
function click() {
  console.log('click');
}

let labels = [
  // '123456789 123456789 123456789 123456789 ',
  'llllllllllllllllllllllllllllllllllllllllllllllllllllllllllll',
  '汉子汉子汉字汉字汉子汉子汉字汉字汉子汉子汉字汉字e',
  'sssssssssssssss',
  'teswss',
  'llllllllllllllllllllllllllllll',
  'sds',
  'sdfsadfsdf'
];

let radios = [],
    checks = []
labels.forEach(item => {
  radios.push((
        <CheckItem label={item} style={{ color: '#5588ee' }} defaultChecked value={item} />
  ))
  checks.push(
    <CheckItem value={item}  label={item} checked={false}/>
  )
})
class App extends Component {
  constructor() {
    super(arguments);
    this.state = {
      checked: true,
      value: "",
      disabled: false,
      once: false,
      width: '100%'
    }
    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.test = this.test.bind(this);
  }
  handleCheck() {
    this.setState({
      checked: !this.state.checked
    });
  }
  test() {
    this.setState({
      value: 'xusong',
      disabled: false,
      once: true
    }, _ => {
      console.log('setState out')
    })
  }
  handleChange(e, value) {
    // console.log('outter', value);
    this.setState({
      value: value,
      
    });
  }
  render() {
    let childs = [{
      label: 'test1',
      hasButton: true
    }, {
      label: 'test2',
      hasButton: true
    }]
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   {/*<Table cols={3} items={[1, 2, 3]}/>*/}
      //   <div className="flex">
      //     <div className="div-item">
      //         sssssssssssssssssssssssssssssssssssssssss
      //       </div>
      //     <span className="span-item">sss</span>
      //   </div>
      //   <Button disabled={false} style={{ backgroundColor: 'blue' }} label={this.state.value} type="raised" once={this.state.once} onClick={this.test} />
      //   ssss
      //   <Box />
      //   {/*<Menu options={[]}/>*/}
      //   <EffectLoad type={10} size="small" />
      //   <LoadMore size="small" loadMore={res} />
      //   <RadioGroup value={this.state.value} onChange={this.handleChange} defaultValue="test2" layout="">
      //     <Radio label="test" style={{ color: '#5588ee' }} defaultChecked value="test" />
      //     <Radio label="test" defaultChecked value="test2" />
      //     <Radio label="test" defaultChecked value="test3" />
      //   </RadioGroup>
      //   <Select />
      //   <Options primaryText="test" />
      //   <CountBtnInput />
      //   <CountBtnInput
      //     keyName={'groups'}
      //     desc='组数(G)'
      //     click={this.test}
      //     value={this.state.value}
      //     decParam={['groups', 'minus']}
      //     addParam={['groups', 'plus']}
      //     onText={this.test}
      //   />
      //   <Input />
      //   <Checkbox value="test" onChange={this.handleCheck} checked={this.state.checked} disabled label="test" />
      //   <Checkbox value="sss" onChange={this.handleCheck} checked={this.state.checked} />
      //   <CheckBoxGroup>
      //     <Checkbox value="sss" onChange={this.handleCheck} label="ttest" checked={true} />
      //     <Checkbox value="test2" onChange={this.handleCheck} label="success" checked={false} />
      //   </CheckBoxGroup>
      //   grou
      //   <Checkbox value="sss" onChange={this.handleCheck} disabled checked={this.state.checked} />
      //   <Checkbox value="sss" onChange={this.handleCheck} label="success" checked={this.state.checked} />
      //   <RaisedBtn onClick={res} />
      //   <BtnTabs labels={[1, 3]} />
      //   {/*<Button label="test" classNahttp://localhost:3000/me=""  onClick={res} type={2} once/>*/}
      //   1p
      //   <AcceptBtn childs={childs} />
      //   <div style={{width: "400px"}}>
      //   <AcceptBtn label="te">
      //     <AcceptBtnItem label="testsssssssssssssssssssss"  style={{width: '200px'}} onClick={click} />
      //     {/* <AcceptBtnItem label="test2"/> */}
      //   </AcceptBtn>
      //   </div>
      //   {/* <AcceptBtnItem label="test" hasButton={true}/>

      //   <AcceptBtnItem label="test" hasButton={true}/>

      //   <AcceptBtnItem label="test" hasButton={true}/>
      //   <AcceptBtnItem label="test" hasButton={true}/> */}
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <div className="App">
              {/* <CheckContainer style={{width: this.state.width}} value={this.state.value} onChange={this.handleChange} defaultValue="test2" layout="">
              {radios}
         </CheckContainer> */}
          <CheckContainer type="checkbox" onChange={this.handleCheck} style={{width: this.state.width}}>
            <CheckItem value="ttest"  label="ttest" checked={true}/>
            <CheckItem value="success" label="success" checked={false} />
            {checks}
         </CheckContainer>
         {/* <CheckBoxGroup type="checkbox" onChange={this.handleCheck}>
            <Checkbox value="ttest"  label="ttest" checked={true}/>
            <Checkbox value="success" label="success" checked={false} />
         </CheckBoxGroup> */}
          <div id="test" onClick={validateBorder}>
          </div>
           <div id="wrap">
              <div id="left">
              <p>style="height:50px"</p>
              <p>style="height:50px"</p>
                  {/* <p style={{height:'50px'}}>style="height:50px"</p> */}
              </div>
              <div id="center">
              <p>style="height:50px"</p>
                  {/* <p style={{height:'100px'}}>style="height:100px"</p> */}
              </div>
              <div id="right">
              <p>style="height:50px"</p>
                  {/* <p style={{height:'200px'}}>style="height:200px"</p> */}
              </div>
          </div>
          <div className="flext">
              <span>sdfasdfasdfasfasdffasdfas</span>
           </div>
      </div>
      // <div className="App">
      //   <div style={{height: '40px'}}></div>
      //   <div id="container" style={{marginTop: '20px'}}>
      //   <canvas id="canvas" style={{
      //     width: '700px',
      //     height: '500px'
      //   }}>
      //   </canvas>
      //   </div>
        
      //   <div id="test">
      //      <CheckBoxGroup>
      //      <Checkbox value="sss" onChange={this.handleCheck} label="ttest" checked={true} />
      //      <Checkbox value="test2" onChange={this.handleCheck} label="success" checked={false} />
      //    </CheckBoxGroup>
      //      <AcceptBtn label="te">
      //      <AcceptBtnItem label="testsssssssssssssssssssss"  style={{width: '200px'}} onClick={click} />
      //      {/* <AcceptBtnItem label="test2"/> */}
      //    </AcceptBtn>
      //   </div>
      //   <IssuesUpload/>
      //  </div>
    );
  }
}

export default App;
