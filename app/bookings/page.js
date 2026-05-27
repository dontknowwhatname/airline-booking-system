"use client";

import { useState } from "react";

export default function BookingsPage() {
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchBookings = async () => {
    setLoading(true);

    setSearched(true);

    const res = await fetch(
      `/api/bookings?name=${name}`
    );

    const data = await res.json();

    if (Array.isArray(data)) {
      setBookings(data);
    } else {
      setBookings([]);
    }

    setLoading(false);
  };

  const cancelBooking = async (bookingRef) => {
    await fetch("/api/bookings", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingRef }),
    });

    alert("Booking Cancelled!");

    searchBookings();
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

      {/* Hero */}
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px 30px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            color: "#003366",
            marginBottom: "10px",
          }}
        >
          Manage Your Bookings
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
          }}
        >
          Search and manage your flight reservations
        </p>
      </div>

      {/* Search Box */}
      <div
        style={{
          maxWidth: "700px",
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
          placeholder="Enter Passenger Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            padding: "12px",
            width: "280px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={searchBookings}
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
          Search Bookings
        </button>
      </div>
      {loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            color: "#666",
            fontSize: "18px",
          }}
        >
          Searching bookings...
        </div>
      )}

      {/* Booking Results */}
      <div
        style={{
          maxWidth: "900px",
          margin: "40px auto",
        }}
      >

        {searched && !loading && bookings.length === 0 && (
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              color: "#666",
              fontSize: "18px",
            }}
          >
            No bookings found.
          </div>
        )}

        {bookings.map((b) => (
          <div
            key={b._id}
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              display: "flex",
              justifyContent: "space-between",
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
                Booking Reference
              </h2>

              <p>
                <strong>Ref:</strong> {b.bookingRef}
              </p>

              <p>
                <strong>Passenger:</strong>{" "}
                {b.passengerName}
              </p>

              {b.flight && (
                <>
                  <p>
                    Flight: {b.flight.from} →{" "}
                    {b.flight.to}
                  </p>

                  <p>
                    Departure:{" "}
                    {new Date(
                      b.flight.departureTime
                    ).toLocaleString()}
                  </p>

                  <p>
                    Price: ${b.flight.price}
                  </p>
                </>
              )}

              <p>
                <strong>Status:</strong> {b.status}
              </p>
            </div>

            <button
              onClick={() =>
                cancelBooking(b.bookingRef)
              }
              style={{
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                padding: "14px 28px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Cancel Booking
            </button>
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