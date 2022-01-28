import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Snowfall from 'react-snowfall'
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
      <Snowfall />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(console.log);
