import React from "react";
import { Link } from 'react-router-dom';
import '../styles/components.css';

export const LandingPage = () => {
    return (
        <div className="landingPage">
            <img className="bigSpeechBubble" src="big-speech-bubble.png" alt="Welcome to Bubble Duck!"/>
            <img className='landingPageDuck' src='duck-logo-1k.png' alt='Cute Duck Welcomes You'></img>
            <Link to={"/skincare-quiz"}><button className="beginButton" style={{ textDecoration: 'none' }}>START QUIZ</button></Link>
        </div>
    );
}