/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Slider from 'rc-slider';
// import '../../assets/index.less';
import TooltipSlider, { handleRender } from '../src/components/TooltipSlider'

const wrapperStyle = { width: 400, margin: 50 };
const  App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <a>React app</a>
          <div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Reversed Slider with custom handle</p>
      <Slider min={0} max={20} reverse defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Slider with fixed values</p>
      <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
    </div>
    <div style={wrapperStyle}>
      <p>Range with custom tooltip</p>
      <TooltipSlider
                range
                min={0}
                max={20}
                defaultValue={[3, 10]}
                tipFormatter={(value) => `${value}!`} tipProps={undefined}      />
    </div>
    <div style={wrapperStyle}>
      <p>Keyboard events disabled</p>
      <Slider defaultValue={3} keyboard={false} />
    </div>
  </div>
        </>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}

export default App;
