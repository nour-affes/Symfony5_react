/*
 * Welcome to your app.css's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './components/Home';
console.log('hello');
ReactDOM.render(<Router><Home /></Router>, document.getElementById('root'));

//createRoot(document.getElementById('root')).render(<Router><Home /></Router>)