import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';
import _ from 'lodash';

import App from './components/app/App';

window.React = React;

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

const style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css';
document.head.insertBefore(style, document.head.childNodes[0]);

const proxyStore =  new Store({
  state: {},
  portName: 'RSC'
});

render(
  <Provider store={proxyStore}>
    <App/>
  </Provider>
  , document.getElementById('rcr-anchor'));
