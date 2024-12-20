import React, { useState } from 'react';
import './SignupModal.css';

function SignupModal({ show, onClose, onLoginClick }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = { name, email, password };

    try {
      const response = await fetch('http://localhost:8081/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.ok) {
        alert("User registered successfully");
        onClose();
      } else {
        alert(`Failed to register user: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error registering user");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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