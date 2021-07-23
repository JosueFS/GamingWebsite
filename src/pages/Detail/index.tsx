import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import api from '../../services/api';
import { Game, AchievementsList, Screenshot } from '../../types/types';

import './styles.css';

type URLParams = {
    id: string;
}

export default function Detail(){
    
    const { id } = useParams<URLParams>();
    
    const [game, setGame] = useState<Game>({} as Game);
    const [achiev, setAchiev] = useState<AchievementsList>({} as AchievementsList);
    const [screenshots, setScreenshots] = useState<Screenshot[]>([]);

    useEffect(() => {

        api.get(`/games/${id}?key=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            setGame(res.data);
            console.log(res.data);
        });

        api.get(`/games/${id}/achievements?key=${process.env.REACT_APP_API_KEY}`)
        .then(res => {
            setAchiev(res.data);
            console.log(res.data);
        });
        
        api.get(`/games/${id}/screenshots?key=${process.env.REACT_APP_API_KEY}`)
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

    return ( (achiev.results && screenshots) ? (
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
                    {/* {game.publishers.map((publs, index) => {
                        return index === 0 ? <span key={index}>{publs.name}</span> :''
                    })} */}
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
                    { screenshots.map((ss, index) => (
                        <img key={`${game.name}-${index}`} src={ss.image} alt="screenshots" className="ss"/>
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
