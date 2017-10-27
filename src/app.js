import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import styles from './css/normalize.css';
import Fetch from './fetch';
import Header from './header';

document.addEventListener('DOMContentLoaded', function () {
   ReactDom.render(
       React.createElement(Header),
       document.getElementById('header')
   );

   ReactDom.render(
       React.createElement(Fetch),
       document.getElementById('app')
   );
});

