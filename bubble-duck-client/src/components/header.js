import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <nav className='headerNav'>
        {/* Navigation items here */}
        <div className='logoContainer'>
            <Link to='/'>
                <img src='text-logo-1k.png' alt='Bubble Duck Logo' />
            </Link>
        </div>
      </nav>
    </header>
  );
};
