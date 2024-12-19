// src/App.js

import React, { useState, useEffect } from "react"; // Importa useEffect
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./styles.css";
import TicketPurchase from "./components/TicketPurchase";
import StatsPage from "./components/StatsPage";
import Layout from "./components/Layout"; // Importa il componente Layout

// Componente Home semplificato, senza chatbox
const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    let images = [];
    if (keyword === "mappa") {
      images = ["/mappa.png"];
    } else if (keyword === "parcheggio") {
      images = ["/infotrasporto.jpg", "/infoparcheggio.jpg"];
    }
    setDisplayedImages(images);
  }, [keyword]);

  return (
    <div style={{ color: '#fff', padding: '20px' }}>
      <h2>Benvenuto alla Home!</h2>
      <p>Seleziona una delle opzioni in alto per visualizzare i contenuti.</p>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {displayedImages.map((image, index) => (
          <img
            key={index}
            src={image} // Usa il percorso assoluto corretto
            alt={`Image ${index + 1}`}
            style={{ maxWidth: '300px', margin: '0 10px' }}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  const [visitors, setVisitors] = useState([]);

  const addVisitor = (visitor) => {
    setVisitors([...visitors, visitor]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Rotta Home */}
          <Route index element={<Home />} />
          {/* Rotta Ticket */}
          <Route path="ticket" element={<TicketPurchase addVisitor={addVisitor} />} />
          {/* Rotta Stats */}
          <Route path="stats" element={<StatsPage visitors={visitors} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
