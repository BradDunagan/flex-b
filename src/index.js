import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/*
import App from './App';
import Size1 from './flex/size-1/size-1'
import SplitOpenClose1 from './flex/split-open-close-1/split-open-close-1'
import SplitOpenClose2 from './flex/split-open-close-2/split-open-close-2'
*/
import App from './flex/hierarchy/app'
import * as serviceWorker from './serviceWorker';

/*
ReactDOM.render(<App />, document.getElementById('root'));
*/
/*
ReactDOM.render(<Size1 />, document.getElementById('root'));
*/
/*
ReactDOM.render(<SplitOpenClose1 />, document.getElementById('root'));
*/
/*
ReactDOM.render(<SplitOpenClose2 />, document.getElementById('root'));
*/
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
