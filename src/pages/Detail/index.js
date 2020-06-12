import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import api from '../../services/api';

import './styles.css';

export default function Detail(){
    const { id } = useParams();
    console.log(id);

    const [game, setGame] = useState({});
    
    // async function loadGameDetail(gameId){
    //     await api.get(`https://api.rawg.io/api/games/3498`)
    //         .then(res => {
    //             // setSelectedGame(res.data);
    //             console.log(res.data);
    //         });
    // }

    // loadGameDetail();

    useEffect(() => {
        api.get(`https://api.rawg.io/api/games/${id}`)
        .then(res => {
            setGame(res.data);
            console.log(res.data);
            console.log(res.data.publishers[0].name)
        });
    }, []);

    return (
        <section id="game-detail">
            <figure className="game-title">
                <img
                    src="https://media.rawg.io/media/resize/640/-/games/e9c/e9cbc91e2090638ddab6ae0b3d334f90.jpg"
                    alt=""
                />
                <figcaption>
                    <h1>{game.name}</h1>
                    {/* <span>{game.publishers.map(first => first.name)}</span> */}
                </figcaption>
            </figure>
            
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Achievements</Tab>
                    <Tab>Screenshots</Tab>
                    <Tab>Stores</Tab>
                </TabList>

                <TabPanel dangerouslySetInnerHTML={{__html: game.description}}></TabPanel>
                <TabPanel>2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum maiores unde nobis aliquam distinctio ad, reprehenderit ipsum exercitationem, laborum, quisquam libero officia? Suscipit nostrum, provident consequatur deleniti nam adipisci id?</TabPanel>
                <TabPanel>3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis nam fugit porro id consequuntur tenetur libero quas veniam, impedit odio culpa, provident consectetur vero pariatur! Voluptatum repudiandae nam atque nesciunt?</TabPanel>
                <TabPanel>4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis nam fugit porro id consequuntur tenetur libero quas veniam, impedit odio culpa, provident consectetur vero pariatur! Voluptatum repudiandae nam atque nesciunt?</TabPanel>
                
            </Tabs>
        </section>
    );
}
