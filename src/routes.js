import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main/index';
import Game from './pages/game';
import Header from './components/Header';

const Routes = () => (
    <BrowserRouter>
        <Header>
            <Route exact path='/' Component={Main} />
        </Header>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/games/:id' component={Game} />
        </Switch>
    </BrowserRouter>   
);

export default Routes;
