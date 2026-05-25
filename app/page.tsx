"use client";

import { useState } from "react";

export default function Home() {
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  
  const [flights, setFlights] = useState<any[]>([]);

  const searchFlights = async () => {
    const res = await fetch(
      `/api/flights?to=${to}&date=${date}`
    );
    const data = await res.json();

    if (Array.isArray(data)) {
      setFlights(data);
    } else {
      setFlights([]);
      console.log(data);
    }
  };

  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "auto", 
      padding: "20px",
      fontFamily: "Arial"
    }}>
    
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>
        Airline Booking System
      </h1>

      <div style={{ 
        display: "flex", 
        gap: "10px", 
        marginBottom: "20px",
        justifyContent: "center"
      }}>
        <input
          placeholder="Destination (e.g. YSSY)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />

        <button 
          onClick={searchFlights}
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

    
      {flights.map((f: any) => (
        <div
          key={f._id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "15px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          }}
        >
          <h3>{f.from} → {f.to}</h3>
          <p>Departure: {f.departureTime}</p>
          <p>Price: ${f.price}</p>

          <button
            onClick={() => bookFlight(f._id)}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
}

async function bookFlight(flightId: string) {
  const name = prompt("Enter your name:");

  if (!name) {
    alert("Name is required");
    return;
  }

  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      flightId,
      passengerName: name,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  alert("Booking success! Ref: " + data.bookingRef);
}