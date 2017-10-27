import React from 'react';
import ReactDom from 'react-dom';
import Fetch from './fetch';

document.addEventListener('DOMContentLoaded', function () {
   ReactDom.render(
       React.createElement(Fetch),
       document.getElementById('app')
   );
});

