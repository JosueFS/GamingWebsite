import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Main from './pages/Main';
import Detail from './pages/Detail';
import Header from './components/Header';

const Routes = () => {
    const location = useLocation();

    return (
    <BrowserRouter>
        <Header />
        <AnimatePresence exitBeforeEnter>
            <Switch key={location.pathname} >
                <Route exact path='/' component={Main}/>
                <Route path='/details/:id' component={Detail} />
            </Switch>
        </AnimatePresence>
    </BrowserRouter>   
    )};

export default Routes;
