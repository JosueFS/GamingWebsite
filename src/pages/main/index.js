/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import './style.css';
import Games from '../Games';

export default function Main(){
    
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

            <Games />

            <section id="game-detail">
                    
            </section>
        </main>
    );
}