import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

window.$ = $
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
