import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Main from './pages/Main';
import Detail from './pages/Detail';
import Header from './components/Header';

const Routes = () => {
    const location = useLocation();

    return (
    <BrowserRouter>
        <Header />

        <TransitionGroup>
            <CSSTransition key={location.key} classNames="transition" timeout={500}>
                <Switch location={location} >
                    <Route exact path='/' component={Main} />
                    <Route path='/detail/:id' component={Detail} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </BrowserRouter>   
    )};

export default Routes;
