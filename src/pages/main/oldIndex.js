import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './style.css';

export default class Main extends Component {
    state = {
        games: [],
        resultInfo: {},
        page: 1,
    }

    imgString = {
        check: 'https://i.dlpng.com/static/png/6658638_preview.png',
        uncheck: 'https://library.kissclipart.com/20180831/eiq/kissclipart-red-x-icon-clipart-computer-icons-clip-art-b00485d1873817e9.jpg',
        fav: 'https://image.flaticon.com/icons/svg/541/541415.svg',
        nofav: 'https://image.flaticon.com/icons/svg/462/462092.svg',
        defaultBG: 'http://oiguassu.com.br/wp-content/themes/fox/images/placeholder.jpg',
    }
    
    componentDidMount(){
        this.loadContent();
    }

    loadContent = async (page = 1) => {
        const res = await api.get(`/games?page=${page}`);

        const { results, ...resultInfo } = res.data;

        this.setState({ games: results, resultInfo, page});

        console.log(results);
        console.log( resultInfo.filters);
    }

    prevPage = () => {
        const { page, resultInfo } = this.state;

        if (resultInfo.previous === null) return;

        const pageNumber = page - 1;

        this.loadContent(pageNumber);
    }

    nextPage = () => {
        const { page, resultInfo } = this.state;

        if (resultInfo.next === null) return;

        const pageNumber = page + 1;

        this.loadContent(pageNumber);
    }

    render(){
        const { games } = this.state;
        
        return (
            <div>
                <section className='game-list'>
                    {games.map(game => {
                        //Metacritic Null Correction
                        let metacrit = game.metacritic === null ? '-' : game.metacritic;

                        //Image Null correction
                        let icon = '';
                        if(game.background_image == null){
                            icon = this.imgString.defaultBG;
                        }else {
                            // game.background_image = game.background_image.replace(".io/media", ".io/media/resize/640/-");    
                            icon = game.background_image;
                        }

                        return(
                        <article key={game.id}>
                            <img src={icon} alt='logo' />
                            <Link to={'games/' + game.id} >
                            <strong>{game.name}</strong>
                            </Link>
                            <p>Release: <span>{game.released}</span></p>
                            <p>Metacritic: <span>{metacrit}</span></p>
                            <p>Rating: <span>{game.rating}</span></p>
                        </article>

                        
                    )})}

                    <section className='actions'>
                        <button onClick={this.prevPage}>Previous</button>
                        <button onClick={this.nextPage}>Next</button>
                    </section>
                </section>
                
                
            </div>
        );
    }
}