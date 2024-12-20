import React, { useState } from 'react';
import './LoginModal.css';

function LoginModal({ show, onClose, onSignupClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!show) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch('http://localhost:8081/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });


      if (response.ok) {
        const responseData = await response.json();
        console.log("Login successful:", responseData);

        // Fetch the user's name
        const nameResponse = await fetch(`http://localhost:8081/users/${responseData.email}`);
        if (nameResponse.ok) {
          const nameData = await nameResponse.json();
          onClose({ ...responseData, name: nameData.name });
        } else {
          alert("Failed to fetch user name");
        }
      } else {
        const errorData = await response.text();
        alert(`Login failed: ${errorData}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while logging in");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Se Connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="loginbutton" type="submit">Se connecter</button>
          <button className="closebutton" type="button" onClick={() => onClose(null)}>Fermer</button>
        </form>
        <div className="notmember">
          <p>Vous n'avez pas de compte ? <a href="#" onClick={onSignupClick}>S'inscrire</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;