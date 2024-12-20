import React from 'react';
import './Footer.css';
import Wasalniblack from './assets/images/Wasalniblack.png';
import facebook from './assets/icons/facebook.png';
import x from './assets/icons/x.png';
import instagram from './assets/icons/instagram.png';
import linkedin from './assets/icons/linkedin (2).png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
          <div className="footerlogo">
           <img src={Wasalniblack} alt="Logo" />
          </div>

        <div className="footer-section links">
          <h2>Liens rapides</h2>
          <ul>
            <li><a href="#">Entreprise</a></li>
            <li><a href="#">À propos de nous</a></li>
            <li><a href="#">Nos offres</a></li>
            <li><a href="#">Salle de presse</a></li>
            <li><a href="#">Investisseurs</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#"> Carrières</a></li>
          </ul>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-links">
            <a href="#"><i className="facebook"><img className="icon" src={facebook}/></i></a>
            <a href="#"><i className="x"><img className="icon" src={x}/></i></a>
            <a href="#"><i className="instagram"><img className="icon" src={instagram}/></i></a>
            <a href="#"><i className="linkedin"><img  className="icon" src={linkedin}/></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Wasalni. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
