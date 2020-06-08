import React from 'react';

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
        <h1>Titulo</h1>
    );
}
