import React from "react";
import { Link } from 'react-router-dom';
import '../styles/components.css';

export const LandingPage = () => {
    return (
        <div className="landingPage">
            <h1>WELCOME TO BUBBLE DUCK!</h1>
            <img className='landingPageDuck' src='duck-landing-page.png' alt='Cute Duck Welcomes You'></img>
            <Link to={"/photo-upload"}><button className="beginButton" style={{ textDecoration: 'none' }}>Begin</button></Link>
        </div>
    );
}