import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import './style.css';

export default function Game(){
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState('');
    const [pageInfo, setPageInfo] = useState();
    const [page, setPage] = useState(1);


    const imgString = {
        check: 'https://i.dlpng.com/static/png/6658638_preview.png',
        uncheck: 'https://library.kissclipart.com/20180831/eiq/kissclipart-red-x-icon-clipart-computer-icons-clip-art-b00485d1873817e9.jpg',
        fav: 'https://image.flaticon.com/icons/svg/541/541415.svg',
        nofav: 'https://image.flaticon.com/icons/svg/462/462092.svg',
        defaultBG: 'http://oiguassu.com.br/wp-content/themes/fox/images/placeholder.jpg'
    }

    function translateEffect(game){
        let elementsWidth = 180;

        let list = document.querySelector('#game-list');
        let itemIndex = Array.from(list.children).indexOf(game)

        list.style.transform = `translateX(-${itemIndex * elementsWidth}px)`;
    }

    function setBg(gameId){
        let [t] = games.filter( (g) => (g.id === Number(gameId)));
        document.body.style.backgroundImage = `url(${t.short_screenshots[1].image})`;
    }
    
    function handleSelectGame(gameId){
        let elementsHeight = 107;
        
        setSelectedGame(gameId);

        if (gameId === selectedGame){
            translateEffect(gameId);
            setBg(gameId);
            console.log(gameId);

            //Hiding all game info
            // let oldSelected = document.querySelector('article.selected');
            // let oldLiSelected = document.querySelector('li.selected');
            // if (oldSelected && oldLiSelected){
            //     removeClass(oldSelected, 'selected');
            //     addClass(oldSelected, 'hidden');
            //     removeClass(oldLiSelected, 'selected');
            //     // game.removeEventListener('click', () => loadGameDetail(game.id), false)
            // }
            
            // //Showing selected game info
            // let newSelected = document.querySelector(`#detail${gameLi.id}`);
            // removeClass(newSelected, 'hidden');
            // addClass(newSelected, 'selected');
            // addClass(gameLi, 'selected');
            // game.addEventListener('click', () => loadGameDetail(game.id), false);
        
            let list = document.querySelector('#info-preview');
            
            // let itemIndex = Array.from(list.children).indexOf(newSelected);
            // console.log(itemIndex);
            
            // list.style.transform = `translateY(-${itemIndex * elementsHeight}px)`;
        }
    }

    useEffect(async () => {
        api.get(`/games?page=${page}`)
            .then(res => {
                const { results, ...info } = res.data;
                setGames(results);
                setPageInfo(info);

                setSelectedGame(res.data.results[0]);
                // console.log(firstGame);
                // if(firstGame != undefined){
                //     handleSelectGame(document.getElementById(firstGame.id))
                // }
                console.log()
            });
    }, [page]);

    // useEffect(() => {
    //     let firstGame = games[0];
    //     console.log(firstGame);

    //     if(firstGame){
    //         let el = document.getElementById(firstGame.id).firstChild;
    //         console.log(el);
    //         handleSelectGame(el);
    //     }
        
    // }, [games]);

    
    return(
        <section id="all-games">
                <ul id="game-list">
                    {games.map((game) => {
                        //Image Null correction
                        let icon = '';
                        if(game.background_image == null){
                            icon = imgString.defaultBG;
                        }else {
                            game.background_image = game.background_image.replace(".io/media", ".io/media/resize/640/-");    
                            icon = game.background_image;
                        }

                        return(
                        <li 
                            key={`${game.id}`}
                            className={
                                        selectedGame === game.id ?
                                        "game-item selected" :
                                        "game-item"
                                    }
                        >
                            <img src={icon} alt='card' onClick={() => handleSelectGame(game.id)}/>
                        </li>                         
                    )})}
                </ul>
                <div id="box-limit">
                <section id="info-preview">
                {games.map((game, index) => {
                    //Metacritic Null Correction
                    let metacrit = game.metacritic === null ? '-' : game.metacritic;
                    let genres = []; 
                    game.genres.map(genre => genres.push(genre.name));

                    return(
                    <article key={game.id+'g'} id={'detail' + game.id} className={index === 0 ? "game-info-preview selected":"game-info-preview hidden"}>
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
