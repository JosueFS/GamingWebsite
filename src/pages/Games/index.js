import React, { useState, useEffect, prop } from 'react';
import api from '../../services/api';

import './style.css';

export default function Game({ show, fnShow }){
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [pageInfo, setPageInfo] = useState();
    // const [page, setPage] = useState(1);

    const imgString = {
        check: 'https://i.dlpng.com/static/png/6658638_preview.png',
        uncheck: 'https://library.kissclipart.com/20180831/eiq/kissclipart-red-x-icon-clipart-computer-icons-clip-art-b00485d1873817e9.jpg',
        fav: 'https://image.flaticon.com/icons/svg/541/541415.svg',
        nofav: 'https://image.flaticon.com/icons/svg/462/462092.svg',
        defaultBG: 'http://oiguassu.com.br/wp-content/themes/fox/images/placeholder.jpg'
    }

    console.log(show)

    function handleOpenInfo(gameId){
        fnShow(!show);
    }

    function translateEffect(li, article){

        let elementsHeight = 107;
        let elementsWidth = 180;

        let gameList = document.querySelector('#game-list');
        let gameIndex = Array.from(gameList.children).indexOf(li)

        gameList.style.transform = `translateX(-${gameIndex * elementsWidth}px)`;

        let infoList = document.querySelector('#info-preview');
        let infoIndex = Array.from(infoList.children).indexOf(article);
        
        infoList.style.transform = `translateY(-${infoIndex * elementsHeight}px)`;
    }
    
    useEffect(() => {
        api.get(`/games?page=${1}`)
        .then( res => {
            const { results, ...info } = res.data;
            setGames(results)
            setPageInfo(info);
            setSelectedGame(res.data.results[0].id);
        });

    }, []);
    
    useEffect(() => {
        if(selectedGame){
            let [t] = games.filter( (g) => (g.id === Number(selectedGame)));
            document.body.style.backgroundImage = `url(${t.short_screenshots[1].image})`

            const [gameLi, article] = document.querySelectorAll('.selected');
            translateEffect(gameLi, article);
        }
    }, [selectedGame])
        
    return(
        <section id="all-games">
            <ul id="game-list">
                {games.map((game) => {
                    //Image Null correction
                    let icon = '';
                    if(game.background_image == null){
                        icon = imgString.defaultBG;
                    }else {
                        icon = game.background_image.replace(".io/media", ".io/media/resize/640/-");
                    }

                    return(
                    <li 
                        key={game.id}
                        className={
                                    selectedGame === game.id ?
                                    "game-item selected" :
                                    "game-item"
                                }
                        onClick={selectedGame === game.id ?
                            () => handleOpenInfo(game.id) :
                            () => setSelectedGame(game.id)
                        }
                    >
                        <img src={icon} alt='card' />
                    </li>                         
                )})}
            </ul>

            <div id="box-limit">
                <section id="info-preview">
                {games.map((game) => {
                    //Metacritic Null Correction
                    let metacrit = game.metacritic === null ? '-' : game.metacritic;
                    let genres = []; 
                    game.genres.map(genre => genres.push(genre.name));

                    return(
                    <article
                        key={game.id}
                        className={ game.id === selectedGame ?
                                    "game-info-preview selected":
                                    "game-info-preview hidden"
                                }
                    >
                        <h1>{game.name}</h1>
                        <div className="subinfo r-date">
                            <p>Release Date:</p>
                            <p>{game.released}</p>
                        </div>
                        <div className="subinfo g-meta">
                            <p>Metacritic:</p>
                            <p>{metacrit}</p>
                        </div>
                        <div className="subinfo g-genre">
                            <p>Genre:</p>
                            <p>{genres.join(', ')}</p>
                        </div>
                    </article>
                )})}

                </section>
            </div>
        </section>
    );
}
