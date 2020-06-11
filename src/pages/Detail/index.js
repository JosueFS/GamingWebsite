import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import api from '../../services/api';

import './styles.css';

export default function Detail(){


    async function loadGameDetail(gameId){
        await api.get(`https://api.rawg.io/api/games/3498`)
            .then(res => {
                // setSelectedGame(res.data);
                console.log(res.data);
            });
    }

    loadGameDetail();

    return (
        <section id="game-detail">
            <figure className="game-title">
                <img
                    src="https://media.rawg.io/media/resize/640/-/games/e9c/e9cbc91e2090638ddab6ae0b3d334f90.jpg"
                    alt=""
                />
                <figcaption>
                    <h1>The Elder Scrolls V: Skyrim</h1>
                    <span>Bethesda Softworks</span>
                </figcaption>
            </figure>
            
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Achievements</Tab>
                    <Tab>Screenshots</Tab>
                    <Tab>Stores</Tab>
                </TabList>

                <TabPanel>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, minus. Officiis consectetur voluptatibus quas ut nam, accusantium harum iusto fuga, tenetur eligendi nesciunt magni ullam non reiciendis repellendus voluptatum doloribus.</TabPanel>
                <TabPanel>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, minus. Officiis consectetur voluptatibus quas ut nam, accusantium harum iusto fuga, tenetur eligendi nesciunt magni ullam non reiciendis repellendus voluptatum doloribus.</TabPanel>
                <TabPanel>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, minus. Officiis consectetur voluptatibus quas ut nam, accusantium harum iusto fuga, tenetur eligendi nesciunt magni ullam non reiciendis repellendus voluptatum doloribus.</TabPanel>
                
            </Tabs>
        </section>
    );
}
