import React from 'react';
import ReactDom from 'react-dom';
import Repo from './Repo';

document.addEventListener('DOMContentLoaded', function () {
   ReactDom.render(
       React.createElement(Repo),
       document.getElementById('app')
   );
});

