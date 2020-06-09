import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Detail from './pages/Detail';
import Header from './components/Header';

const Routes = () => (
    <BrowserRouter>
        <Header>
            <Route exact path='/' Component={Main} />
        </Header>
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/detail' component={Detail} />
        </Switch>
    </BrowserRouter>   
);

export default Routes;
