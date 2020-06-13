import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import api from '../../services/api';

import './styles.css';

export default function Detail(ZAQ){
    
    const { id } = useParams();
    
    const [game, setGame] = useState({});
    const [achiev, setAchiev] = useState({});
    const [screenshots, setScreenshots] = useState([]);

    useEffect(() => {

        api.get(`/games/${id}`)
        .then(res => {
            setGame(res.data);
            console.log(res.data);
        });

        api.get(`/games/${id}/achievements`)
        .then(res => {
            setAchiev(res.data);
            console.log(res.data);
        });
        
        api.get(`/games/${id}/screenshots`)
        .then(res => {
            setScreenshots(res.data.results);
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        if(id){
            let imgBG = game.background_image_additional || game.background_image
            document.body.style.backgroundImage = `url(${imgBG})`
        }
    }, [game])

    return ( (game.publishers && achiev.results && screenshots) ? (
        <section id="game-detail">
            <figure className="game-title">
                <div>
                    <img
                        src={game.background_image}
                        alt=""
                    />
                </div>
                <figcaption>
                    <h1>{game.name}</h1>
                    {game.publishers.map((publs, index) => {
                        return index === 0 ? <span key={index}>{publs.name}</span> :''
                    })}
                </figcaption>
            </figure>
            
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Achievements</Tab>
                    <Tab>Screenshots</Tab>
                    <Tab>Stores</Tab>
                </TabList>

                <TabPanel
                    dangerouslySetInnerHTML={{__html: game.description}}
                >
                </TabPanel>

                <TabPanel>
                    { achiev.results.map((achv) => (
                        <figure key={achv.id} className="achievements">
                            <img src={achv.image} alt=""/>
                            <figcaption>
                                <h4>{achv.name}</h4>
                                <span>{achv.description}</span>
                                <span>{achv.percent}%</span>
                            </figcaption>
                        </figure>
                    ))}
                </TabPanel>

                <TabPanel>
                    { screenshots.map((ss) => (
                        <img key={ss.id} src={ss.image} alt="screenshots" className="ss"/>
                    ))}
                </TabPanel>

                <TabPanel>

                </TabPanel>
                
            </Tabs>
        </section>
    ) : null //(
        // <section id="game-detail">
        //     <figure className="game-title">
        //         <div>
        //             <img src="http://oiguassu.com.br/wp-content/themes/fox/images/placeholder.jpg" alt="defaultbg"/>
        //         </div>
        //         <figcaption>
        //             <h1>...</h1>
        //             <span>...</span>
        //         </figcaption>
        //     </figure>
            
        //     <Tabs>
        //         <TabList>
        //             <Tab>Description</Tab>
        //             <Tab>Achievements</Tab>
        //             <Tab>Screenshots</Tab>
        //             <Tab>Stores</Tab>
        //         </TabList>

        //         <TabPanel></TabPanel>

        //         <TabPanel>
        //             <figure className="achievements">
        //                 <img src="" alt=""/>
        //                 <figcaption>
        //                     <h4>...</h4>
        //                     <span></span>
        //                     <span></span>
        //                 </figcaption>
        //             </figure>
        //         </TabPanel>

        //         <TabPanel>
        //             <img src="" alt="screenshots" className="ss"/>
        //         </TabPanel>

        //         <TabPanel></TabPanel>
                
        //     </Tabs>
        // </section>
    ) //);
}
