import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TicketPurchase = ({ addVisitor }) => {
  const [transportation, setTransportation] = useState('');
  const [distance, setDistance] = useState('');
  const [ticketPrice, setTicketPrice] = useState(0);

  const calculatePrice = () => {
    let price = 0;
    let distanceBonus = 0;
    let transportationMalus = 0;

    if (distance) {
        distanceBonus = parseFloat(distance) * 0.1;
    }

    switch (transportation) {
      case 'car': {
        transportationMalus = 20;
        break;
      }
      case 'motorcycle': {
        transportationMalus = 10;
        break;
      }
      case 'bus': {
        transportationMalus = 5;
        break;
      }
      case 'train': {
        transportationMalus = 0;
        break;
      }
      case 'bicycle': {
        transportationMalus = -5;
        break;
      }
      case 'walk': {
          transportationMalus = -10;
          break;
      }
      default: {
        transportationMalus = 0;
      }
    }

    price = distanceBonus + transportationMalus;
    price = Math.min(price, 50);
    setTicketPrice(price);
  };

  const handlePurchase = () => {
    if (ticketPrice > 0) {
        const newVisitor = {
            id: uuidv4(),
            transportation: transportation,
            distance: parseFloat(distance),
            price: ticketPrice,
        };
        addVisitor(newVisitor);
        alert(`Ticket purchased for €${ticketPrice}!`);
    } else {
        alert('Please calculate the ticket price first.');
    }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ color: '#333', marginBottom: '20px' }}>Buy Ticket</h2>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Transportation:</label>
        <select value={transportation} onChange={(e) => setTransportation(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', marginBottom: '10px' }}>
          <option value="">Select</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="bus">Bus</option>
          <option value="train">Train</option>
          <option value="bicycle">Bicycle</option>
          <option value="walk">Walk</option>
        </select>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Distance (km):</label>
        <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', marginBottom: '10px' }} />
      </div>
      <button onClick={calculatePrice} style={{
                backgroundColor: '#007bff',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
            }}>Calculate Price</button>
      <p style={{ margin: '10px 0', color: '#555' }}>Ticket Price: €{ticketPrice}</p>
      <button onClick={handlePurchase} style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}>Buy Ticket</button>
    </div>
  );
};

export default TicketPurchase;
