import React from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import styles from './css/default.css';
import Repo from './repo';
import Header from './header';

document.addEventListener('DOMContentLoaded', function () {
   ReactDom.render(
       React.createElement(Header),
       document.getElementById('header')
   );

   ReactDom.render(
       React.createElement(Repo),
       document.getElementById('app')
   );
});

