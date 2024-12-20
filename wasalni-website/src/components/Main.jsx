import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
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

const defaultPosition = [36.8065, 10.1815];

const fetchSuggestions = async (query, setSuggestions) => {
  if (!query) {
    setSuggestions([]);
    return;
  }

  try {
    const response = await axios.get("https://nominatim.openstreetmap.org/search", {
      params: {
        q: query,
        format: "json",
        addressdetails: 1,
        limit: 5,
      },
    });
    setSuggestions(response.data);
  } catch (error) {
    console.error("Error fetching location suggestions:", error);
  }
};

function Main({ loggedInUser, setShowLoginModal }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showDateModal, setShowDateModal] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [selectedPassengers, setSelectedPassengers] = useState();
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const [startPoint, setStartPoint] = useState("");
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endPoint, setEndPoint] = useState("");
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultPosition);
  const [markerPosition, setMarkerPosition] = useState(defaultPosition);
  const [showAnnouncements, setShowAnnouncements] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const hours = [
    "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"
  ];

  useEffect(() => {
    if (!loggedInUser) {
      setShowAnnouncements(false);
    }
  }, [loggedInUser]);

  const handleEndPointSelect = (location) => {
    setEndPoint(location.display_name);
    setEndSuggestions([]);
    setActiveInput(null);
    const { lat, lon } = location;
    const newCenter = [lat, lon];
    setMapCenter(newCenter);
    setMarkerPosition(newCenter);
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat: latitude,
          lon: longitude,
          format: "json",
          addressdetails: 1,
        },
      });
      setStartPoint(response.data.display_name);
    } catch (error) {
      console.error("Error reverse geocoding location:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get("http://localhost:8081/announcements");
      setAnnouncements(response.data);
      setShowAnnouncements(true);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSearchClick = () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
    } else {
      fetchAnnouncements();
    }
  };

  const handlePublishClick = async () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
    } else {
      const newAnnouncement = {
        startPoint,
        endPoint,
        selectedDate,
        selectedTime,
        selectedPassengers
      };
      try {
        await axios.post("http://localhost:8081/announcements", newAnnouncement);
        fetchAnnouncements();
      } catch (error) {
        console.error("Error publishing announcement:", error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form">
          <h1 className="title">Conduisez moins, vivez plus ensemble</h1>

          <div className="input-wrapper">
            <div className="input">
              <input
                type="text"
                placeholder="Point de départ"
                className="text-input"
                value={startPoint}
                onFocus={() => setActiveInput("start")}
                onChange={(e) => {
                  setStartPoint(e.target.value);
                  fetchSuggestions(e.target.value, setStartSuggestions);
                }}
              />
              <img
                className="location_icon"
                src={location}
                alt="Location Icon"
                onClick={getUserLocation}
              />
            </div>
            {activeInput === "start" && startSuggestions.length > 0 && (
              <div className="modal">
                <ul>
                  {startSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setStartPoint(suggestion.display_name);
                        setStartSuggestions([]);
                        setActiveInput(null);
                      }}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="input-wrapper">
            <div className="input">
              <input
                type="text"
                placeholder="Point d'arrivée"
                className="text-input"
                value={endPoint}
                onFocus={() => setActiveInput("end")}
                onChange={(e) => {
                  setEndPoint(e.target.value);
                  fetchSuggestions(e.target.value, setEndSuggestions);
                }}
              />
              <div className="icon"></div>
            </div>
            {activeInput === "end" && endSuggestions.length > 0 && (
              <div className="modal">
                <ul>
                  {endSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setEndPoint(suggestion.display_name);
                        setEndSuggestions([]);
                        setActiveInput(null);
                      }}
                    >
                      {suggestion.display_name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="date-time">
            <div className="date" onClick={() => setShowDateModal(!showDateModal)}>
              {formattedDate || "Date"}
              {showDateModal && (
                <div className="date-picker-modal">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setFormattedDate(date.toLocaleDateString());
                      setShowDateModal(false);
                    }}
                    inline
                    className="custom-calendar"
                  />
                </div>
              )}
              <img className='icon' src={calendar}></img>
            </div>

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
            <button className="button" onClick={handleSearchClick}>Rechercher un Covoiturage</button>
            <button className="button" onClick={handlePublishClick}>Publier une Annonce</button>
          </div>
        </div>

        <div className="map" style={{ width: "500px", height: "500px", borderRadius: "20px" }}>
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ width: "100%", height: "100%", borderRadius: "20px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={markerPosition}>
              <Popup>{endPoint}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {showAnnouncements && (
        <>
          <div className="announcements-title">
            <h2 className="announcements">Annonces</h2>
          </div>

          <div className="announcements-container">
            {announcements.map((announcement, index) => (
              <div key={index} className="announcement-container">
                <p>Départ: {announcement.startPoint}</p>
                <p>Arrivée: {announcement.endPoint}</p>
                <p>Date: {announcement.selectedDate ? new Date(announcement.selectedDate).toLocaleDateString() : ""}</p>
                <p>Heure: {announcement.selectedTime}</p>
                <p>Passagers: {announcement.selectedPassengers}</p>
              </div>
            ))}
          </div>
        </>
      )}

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