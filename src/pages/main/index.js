import React from 'react';
import { motion } from "framer-motion";

import './style.css';
import Games from '../Games';

export default function Main(){

    const pageTransition = {
        in: {
            translateY: 0,
            y: 0
        },
        out: {
            translateY: '-100px',
            y: '100vh'
        }
    }

    return (
        <motion.main
            id="main-page"
            initial="out"
            animate="in"
            exit="out"
            variants={pageTransition}
        >
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

        </motion.main>
    );
}