"use client";

import { useState } from "react";

export default function BookingsPage() {
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState([]);

  const searchBookings = async () => {
    const res = await fetch(`/api/bookings?name=${name}`);
    const data = await res.json();
    setBookings(data);
  };

  const cancelBooking = async (bookingRef) => {
    await fetch("/api/bookings", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingRef }),
    });

    alert("Cancelled!");
    searchBookings(); 
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>📋 My Bookings</h1>

      <input
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={searchBookings}>Search</button>

      <div style={{ marginTop: 20 }}>
        {bookings.map((b) => (
          <div
            key={b._id}
            style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
          >
            <p>Booking Ref: {b.bookingRef}</p>
            <p>Passenger: {b.passengerName}</p>

            <button onClick={() => cancelBooking(b.bookingRef)}>
              Cancel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}