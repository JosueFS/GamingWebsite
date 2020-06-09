/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

import './style.css';
import Detail from '../Detail';
import Games from '../Games';

export default function Main(){
    const [showGameDetail, setShowGameDetail] = useState(false);
    
    useEffect(() => {
        console.log('Mudou');
        console.log(showGameDetail);
    }, [showGameDetail]);

    return (
        <main id="main-page">
            <nav id="navtop">
                <a href="#!" >L1</a>
                <a href="#!" >Store</a>
                <a href="#!" >My games</a>
                <a href="#!" >Media</a>
                <a href="#!" >Library</a>
                <a href="#!" >Settings</a>
                <a href="#!" >R1</a>
            </nav>
        
        {
            showGameDetail ?
            <Detail show={showGameDetail} fnShow={setShowGameDetail} /> :
            <Games show={showGameDetail} fnShow={setShowGameDetail} />
        }

        </main>
    );
}