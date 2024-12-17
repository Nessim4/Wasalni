import React from 'react';
import './SignupModal.css';
function SignupModal({ show, onClose, onLoginClick }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>S'inscrire</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" required />
          </div>
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input type="password" required />
          </div>
          <button className="signupbutton" type="submit">S'inscrire</button>
          <button className="closebutton" type="button" onClick={onClose}>Fermer</button>
        </form>
        <div className="already-member">
          <p>Vous avez déjà un compte ? <a onClick={onLoginClick}>Se connecter</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignupModal;