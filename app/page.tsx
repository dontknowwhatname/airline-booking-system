"use client";

import { useState } from "react";

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);


  const searchFlights = async () => {
    setLoading(true);
    setSearched(true);

    const res = await fetch(
      `/api/flights?from=${from}&to=${to}&date=${date}`
    );

    const data = await res.json();

    if (Array.isArray(data)) {
      setFlights(data);
    } else {
      setFlights([]);
      console.log(data);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "#003366",
          color: "white",
          padding: "15px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
           SkyLine Airways
        </h2>

        <div>
          <a
            href="/"
            style={{
              color: "white",
              marginRight: "20px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Home
          </a>

          <a
            href="/bookings"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            My Bookings
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            color: "#003366",
            marginBottom: "10px",
          }}
        >
          Find Your Perfect Flight
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
          }}
        >
          Book flights worldwide with SkyLine Airways
        </p>
      </div>

      {/* Search Box */}
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          display: "flex",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="From (e.g. NZNE)"
          value={from}
          onChange={(e) => setFrom(e.target.value.toUpperCase())}
          style={{
            padding: "12px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <input
          placeholder="To (e.g. YSSY)"
          value={to}
          onChange={(e) => setTo(e.target.value.toUpperCase())}
          style={{
            padding: "12px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={searchFlights}
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </div>

      {/* Flight Results */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
        }}
      >

      {searched && flights.length === 0 && (
      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "#666",
          fontSize: "18px",
        }}
      >
        No flights found.
      </div>
    )}


        {flights.map((f: any) => (
          <div
            key={f._id}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#003366",
                  marginBottom: "10px",
                }}
              >
                {f.from} → {f.to}
              </h2>

              <p>
                <strong>Departure:</strong>{" "}
                {new Date(f.departureTime).toLocaleString()}
              </p>

              <p>
                <strong>Price:</strong> ${f.price}
              </p>

              <p>
                <strong>Seats:</strong>{" "}
                {f.capacity - f.seatsBooked} left
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
             >
            <button
              onClick={() => bookFlight(f._id)}
              disabled={f.capacity - f.seatsBooked === 0}
              style={{
                backgroundColor:
                  f.capacity - f.seatsBooked === 0
                    ? "#999"
                    : "#28a745",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "8px",
                cursor:
                  f.capacity - f.seatsBooked === 0
                    ? "not-allowed"
                    : "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {f.capacity - f.seatsBooked === 0
                ? "Sold Out"
                : "Book Now"}
            </button>
            </div>
          </div>
        ))}
      </div>
      <footer
        style={{
          marginTop: "auto",
          backgroundColor: "#003366",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p>
          © 2026 SkyLine Airways. All rights reserved.
        </p>
      </footer>
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

  window.location.href =
  `/invoice/${data.bookingRef}`;
}