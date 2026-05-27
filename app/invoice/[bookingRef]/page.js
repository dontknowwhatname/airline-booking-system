import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function InvoicePage({
  params,
}) {
  const { bookingRef } = await params;

  const client = await clientPromise;

  const db = client.db("airline");

  const booking = await db
    .collection("bookings")
    .findOne({
      bookingRef,
    });

  if (!booking) {
    return (
      <div style={{ padding: "40px" }}>
        Booking not found.
      </div>
    );
  }

  const flight = await db
    .collection("flights")
    .findOne({
      _id: new ObjectId(booking.flightId),
    });

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

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "700px",
            margin: "auto",
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "30px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              color: "#003366",
              marginBottom: "20px",
            }}
          >
            Booking Confirmation
          </h1>

          <p>
            <strong>Booking Ref:</strong>{" "}
            {booking.bookingRef}
          </p>

          <p>
            <strong>Passenger:</strong>{" "}
            {booking.passengerName}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {booking.status}
          </p>

          {flight && (
            <>
              <hr
                style={{
                  margin: "20px 0",
                }}
              />

              <p>
                <strong>Route:</strong>{" "}
                {flight.from} → {flight.to}
              </p>

              <p>
                <strong>Departure:</strong>{" "}
                {new Date(
                  flight.departureTime
                ).toLocaleString()}
              </p>

              <p>
                <strong>Arrival:</strong>{" "}
                {new Date(
                  flight.arrivalTime
                ).toLocaleString()}
              </p>

              <p>
                <strong>Price:</strong> $
                {flight.price}
              </p>
            </>
          )}

          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "30px",
              backgroundColor: "#0070f3",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#003366",
          color: "white",
          textAlign: "center",
          padding: "20px",
        }}
      >
        <p>
          © 2026 SkyLine Airways.
          All rights reserved.
        </p>
      </footer>
    </div>
  );
}