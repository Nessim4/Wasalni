import './header.css';
import Wasalnilogo from './assets/images/Wasalnilogo.png';
import React, { useState } from 'react';
import LoginModal from './LoginModal.jsx';
import SignupModal from './SignupModal.jsx';
import Main from './Main.jsx';

function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };

  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };

  const handleCloseLoginModal = (user) => {
    setShowLoginModal(false);
    if (user) {
      setLoggedInUser(user);
    }
  };

  const handleCloseSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleUserMenuClick = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    await fetch('http://localhost:8081/users/logout', {
      method: 'POST',
      credentials: 'include',
    });

    setLoggedInUser(null);
    setShowUserMenu(false);
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
          {loggedInUser ? (
            <div className="user-menu">
              <button className="login-user" onClick={handleUserMenuClick}>{loggedInUser.name}</button>
              {showUserMenu && (
                <ul className="user-menu-list">
                  <li>{loggedInUser.email}</li>
                  <li><p className="logout" onClick={handleLogout}>Déconnecter</p></li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <button className="login" onClick={handleLoginClick}>Se connecter</button>
              <button className="signup" onClick={handleSignupClick}>S'inscrire</button>
            </>
          )}
        </div>
      </header>
      <LoginModal show={showLoginModal} onClose={handleCloseLoginModal} onSignupClick={handleSignupClick} />
      <SignupModal show={showSignupModal} onClose={handleCloseSignupModal} onLoginClick={handleLoginClick} />
      <Main loggedInUser={loggedInUser} setShowLoginModal={setShowLoginModal} />
    </>
  );
}

export default Header;