import Styles from './game.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { GameOfWarPage } from './Components/GameOfWarPage.jsx';

export default function Render(domId) {
    ReactDOM.render(<GameOfWarPage />, document.getElementById(domId));
}

//Render('body');