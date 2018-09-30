import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './reset.less'
import App from './App'
import Sniffer from './Sniffer'

// Init sniffer
const sniffer = new Sniffer()
sniffer.run()

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.querySelector('#root'))
