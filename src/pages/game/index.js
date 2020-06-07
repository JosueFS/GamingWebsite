import React, { Component } from 'react';
import api from '../../services/api';

import './style.css';

export default class Game extends Component {
    state = {
        game: {
            parent_platforms: [],
            developers: [],
        }
    }

    componentDidMount(){
        this.loadContent();
    }

    loadContent = async () => {
        const { id } = this.props.match.params;

        const res = await api.get(`/games/${id}`);

        this.setState({ game: res.data });

        console.log(this.state.game.parent_platforms[0].platform.name);
    }
        
    render(){
        const { game } = this.state;
        console.log(this.state);
            return (<div className='body' style={{backgroundImage: `url(${game.background_image})`}}>
                {this.state === null || this.state.game.name === null ?
                    <div>Loading..</div>
                    :
                    <div className='container'>
                        <header className='title'>
                            <h1 >{game.name}</h1>
                            <p>Release: <span>{game.released}</span></p>
                            <p>Platforms: {game.parent_platforms
                                .map( plat => <span key={plat.platform.id}>
                                                {plat.platform.name}</span>)
                                .reduce((accu, elem) => {
                                    return accu === null ? [elem] : [...accu, ', ', elem]
                                }, null)
                            }
                            </p>
                        <p>Developer: {game.developers
                                .map(dev => <span key={dev.id}>
                                    {dev.name}</span>)
                                .reduce((accu, elem) => {
                                    return accu === null ? [elem] : [...accu, ', ', elem]
                                }, null)
                            }</p>
                            </header>
                        <section className='desc'>
                        <p dangerouslySetInnerHTML={{__html: game.description }} ></p>
                        </section>
                    </div>
                }
            </div> 
        )
    }
}