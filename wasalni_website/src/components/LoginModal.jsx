import React from 'react';
import './LoginModal.css';

function LoginModal({ show, onClose, onSignupClick }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Se connecter</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" required />
          </div>
          <button className="loginbutton" type="submit">Se connecter</button>
          <button className="closebutton" type="button" onClick={onClose}>Fermer</button>
        </form>
        <div className="notmember">
          <p>Vous n'avez pas de compte ? <a href="#" onClick={onSignupClick}>S'inscrire</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;