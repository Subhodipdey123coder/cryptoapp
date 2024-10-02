import React, { useState, useEffect, useRef } from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';


function Header() {

  // Sign In Button component
  const SignInButton = () => {
    const handleSignIn = () => {
      console.log('Sign In button clicked');
    };

    return (
      <button onClick={handleSignIn} className="sign-in-btn">

        <Link to="/SignIn">Sign In</Link>
      </button>
    );
  };

  return (
    <div className="full-header">
      <div className="header-left">
        <Link to="/">
          <h1>Crypto-Hunter</h1>
        </Link>
      </div>

      <div className='menu'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/coin">Coin-Page</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>

      <div className="header-right">
        {/* Sign In Button */}
        <SignInButton />
        {/* Other header elements (like Sign In button) can be added here */}
      </div>

    </div>
  );
}

export default Header;
