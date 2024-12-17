import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Wasalnicorp from "./assets/images/Wasalnicorp.png";
import Covoiturage from "./assets/images/Covoiturage.png";
import location from "./assets/images/location.png";
import calendar from "./assets/images/calendar.png";
import time from "./assets/images/time.png";
import passengerIcon from "./assets/images/passengerIcon.png";
import securite from "./assets/images/securite.jpg";
import "./Main.css";
import { format } from "date-fns"; // To format the date

function Main() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
   // Affichage du calendrier
  const [showTimeModal, setShowTimeModal] = useState(false); // Affichage de l'heure
  const [selectedPassengers, setSelectedPassengers] = useState();
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  
  const hours = [
     "6:00 AM", "7:00 AM",
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
    "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
  ];
  
  return (
    <div>
      <div className="container">
        {/* Form Section */}
        <div className="form">
          <h1 className="title">Conduisez moins, vivez plus ensemble</h1>

          <div className="input-wrapper">
            <div className="input">
              <input
                type="text"
                placeholder="Point de départ"
                className="text-input"
              />
                <img className="location_icon" src={location}></img>
           </div>
          </div>

          <div className="input-wrapper">
            <div className="input">
              <input
                type="text"
                placeholder="Point d'arrivée"
                className="text-input"
              />
              <div className="icon"></div>
            </div>
          </div>

          {/* Date-Time Section */}
          <div className="date-time">
  {/* Date Button */}
  <div className="date" onClick={() => setShowDateModal(!showDateModal)}>
    
    {formattedDate || "Date"}
    {showDateModal && (
      <div className="date-picker-modal">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => { 
            setSelectedDate(date);  // Update the selected date
            setFormattedDate(date.toLocaleDateString()); // Update the formatted date
            setShowDateModal(false); // Close the date picker after selection
          }}
          inline
          className="custom-calendar"
        />
      </div>
    )}
    <img className='icon' src={calendar}></img>
            </div>

            {/* Time Button */}
            <div className="time" onClick={() => setShowTimeModal(!showTimeModal)}>
              {selectedTime || "Heure "}
              {showTimeModal && (
                <div className="time-picker-modal">
                  <ul>
                    {hours.map((hour, index) => (
                      <li key={index} onClick={() => { setSelectedTime(hour); setShowTimeModal(false); }}>
                        {hour}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <img className="icon" src={time}></img>
            </div>
          <div className="passengers" onClick={() => setShowPassengerModal(!showPassengerModal)}>
              
              {selectedPassengers || "Nombre de passagers"}
              {showPassengerModal && (
                <div className="passenger-picker-modal">
                  <ul>
                    {[1, 2, 3, 4, 5].map((number, index) => (
                      <li key={index} onClick={() => { setSelectedPassengers(number); setShowPassengerModal(false); }}>
                        {number}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
               <img className="icon" src={passengerIcon} alt="Passenger Icon" />
              </div>
             
            </div>
            <div className="button-wrapper">
          <button className="button">Rechercher un Covoiturage</button>
          <button className="button">Publier une Annonce</button>
          </div>
        </div>

        {/* Map Section */}
        <div className="map">
          <iframe
            title="Google Maps"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.gomaps.pro/maps/embed/v1/place?q=place_id:ChIJN1t_tDeuEmsRUsoyG83frY4&key=AlzaSyb2SGS8CNQ87jMIpbd2pb9ZZ_sbpz-gVMP"
          ></iframe>
        </div>
      </div>

      {/* About Section */}
      <div className="container-about">
        <div className="wasalni-corp">
          <img className="aboutimg" src={Wasalnicorp} alt="Wasalni Corp" />
        </div>
        <div className="about">
          <h2>A propos de Nous</h2>
          <p>
            Waslani est une startup tunisienne de covoiturage, connectant conducteurs et passagers pour des trajets économiques, pratiques et écologiques.
          </p>
          <button className="button-about">En savoir plus</button>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container-mission">
        <div className="mission">
          <h1>Notre mission</h1>
          <p>
            La mission de Waslani est de rendre le covoiturage accessible à tous
            en proposant des trajets économiques, pratiques, écologiques et
            sécurisés, le tout à un prix abordable.
          </p>
        </div>
        <div className="mission-img">
          <img className="missionimg" src={Covoiturage} alt="Covoiturage" />
        </div>
      </div>
      <div className="container-securite">
      <div className="securite-img">
            <img className="securiteimg" src={securite} alt="Sécurité" />
      </div>
        <div className="securite">
            <h1>Votre sécurité est notre priorité</h1>
            <p>Waslani garantit des trajets sécurisés et confortables pour tous vos déplacements.</p>
        </div>
        
      </div>
    </div>
  );
}

export default Main;
