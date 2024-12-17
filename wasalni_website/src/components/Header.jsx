import './header.css';
import Wasalnilogo from './assets/images/Wasalnilogo.png';
import React, { useState } from 'react';
import LoginModal from './LoginModal.jsx';
import SignupModal from './SignupModal.jsx';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowSignupModal(false); // Close the signup modal when opening the login modal
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false); // Close the login modal when opening the signup modal
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  return (
    <>
      <header className="app-header">
        <div className="logo">
          <a href="/"><img src={Wasalnilogo} alt="Logo" /></a>
        </div>
        <nav className="navigation">
          <ul>
            <li><a href="/trips">Trajets</a></li>
            <li><a href="/add-trip">Proposer un trajet</a></li>
            <li><a href="/about">À propos</a></li>
          </ul>
        </nav>
        <div className="user-actions">
          <button className="login" onClick={handleLoginClick}>Se connecter</button>
          <button className="signup" onClick={handleSignupClick}>S'inscrire</button>
        </div>
      </header>
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} onSignupClick={handleSignupClick} />
      <SignupModal show={showSignupModal} onClose={handleCloseSignupModal} onLoginClick={handleLoginClick} />
    </>
  );
}

export default Header;