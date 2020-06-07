import React from 'react';

// import { Link } from 'react-router-dom';
import { FaInfoCircle, FaTrophy, FaUserFriends, FaPlaystation, FaPlus } from "react-icons/fa";
import { IoIosWifi } from "react-icons/io";


import './style.css';

export default function Header (){
        return (
                <header id='main-header'>
                    <div id="left-header" className="subcontainer">
                        <img 
                            id="user-img"
                            src="https://store.playstation.com/store/api/chihiro/00_09_000/container/BR/pt/999/UP3493-CUSA07861_00-AV00000000000113/1580205066000/image?w=240&h=240&bg_color=000000&opacity=100&_version=00_09_000"
                            alt="user"
                        />
                        <div id="user-info">
                            <span className="username">Josue18Rj</span>
                            <div className="user-icons">
                                <FaPlus />
                                <div className="triangle">
                                    <FaPlaystation />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="mid-header" className="subcontainer">
                        <FaInfoCircle />
                        <FaUserFriends />
                        <FaTrophy />
                    </div>

                    <div id="right-header" className="subcontainer">
                        <IoIosWifi />
                        <span>10:36 AM</span>
                    </div>
                </header>
        );
}