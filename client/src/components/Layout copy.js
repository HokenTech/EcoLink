// src/components/Layout.js

import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles.css";
import { generateText } from "./WatsonChatbot";
import logo from '../img/logo.png'; 
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; 
import 'leaflet-defaulticon-compatibility';

const Layout = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);

  const [input, setInput] = useState("");
  const [responseText, setResponseText] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const chatboxRef = useRef(null);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isStats = location.pathname === "/stats"; // Verifica se siamo nella pagina delle statistiche

  useEffect(() => {
    if (isHome && !map && mapRef.current) {
      const mapInstance = L.map(mapRef.current).setView([47.70, 13.35], 7);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(mapInstance);

     L.marker([47.70, 13.35]).addTo(mapInstance)
    .bindPopup('Temperatura: 25°<br> Riempimento: 55%')
    .openPopup();
    L.marker([41.8933203, 12.4829321]).addTo(mapInstance)
    .bindPopup('Temperatura: 25°<br> Riempimento: 55%')
    .openPopup();
      setMap(mapInstance);
    }

    // Pulisci la mappa quando non si è più su Home
    if (!isHome && map) {
      map.remove();
      setMap(null);
    }
  }, [isHome, map]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [responseText]);

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (isSending || !input.trim()) return;

    setIsSending(true);
    setResponseText((prev) => [...prev, { user: input, bot: <LoadingDots /> }]);

    const chatbotResponse = await generateText(input);
    setResponseText((prev) => {
      const updated = [...prev];
      updated[updated.length - 1] = { user: input, bot: chatbotResponse };
      return updated;
    });

    setInput("");
    setIsSending(false);
  };

  const LoadingDots = () => (
    <div className="loading-dots">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </div>
  );

  return (
    <div className="app-container2">
      {/* Barra superiore (navbar) a tutta larghezza */}
      <div className="top-nav">
      {/* Sezione dei link a sinistra */}
      <nav className="nav-left">
        <Link to="/">Home</Link>
        <Link to="/ticket">Buy Ticket</Link>
        <Link to="/stats">Stats</Link>
      </nav>

      {/* Sezione del logo al centro */}
      <div className="nav-center">
        <img src={logo} alt="Ecolink" width="200px" height="150px" />
      </div>
    </div>

      {/* Contenuto principale */}
      <div className="main-content">
        {/* Colonna sinistra (Chat) */}
        <div className="left-column">
          <div className="chatbox" ref={chatboxRef}>
            {responseText.length === 0 && (
              <div className="chat-placeholder">
                Scrivi qualcosa per iniziare...
              </div>
            )}
            {responseText.map((entry, index) => (
              <div key={index} className="chat-entry">
                <div className="chat-bubble user-bubble">{entry.user}</div>
                <div className="chat-bubble bot-bubble">{entry.bot}</div>
              </div>
            ))}
          </div>
          <form className="input-container" onSubmit={handleInputSubmit}>
            <input
              type="text"
              placeholder="Ask me something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSending}
            />
            <button type="submit" disabled={isSending} className={isSending ? "disabled-button" : ""}>
              Send
            </button>
          </form>
        </div>

        {/* Colonna destra (Mappa + Route Content) */}
        <div className="right-column">
          {isHome ? (
            <div id="map" ref={mapRef}></div>
          ) : (
            <div className={`route-content ${isStats ? "stats-page" : ""}`}>
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
