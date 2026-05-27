import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { randomUUID } from "crypto";

export async function POST(request) {
  try {
    const body = await request.json();
    const { flightId, passengerName } = body;

    const client = await clientPromise;
    const db = client.db("airline");

    const flight = await db.collection("flights").findOne({
      _id: new ObjectId(flightId),
    });

    if (!flight) {
      return Response.json({ error: "Flight not found" }, { status: 404 });
    }

    if (flight.seatsBooked >= flight.capacity) {
      return Response.json({ error: "Flight full" }, { status: 400 });
    }

    const bookingRef = randomUUID();

    await db.collection("bookings").insertOne({
      bookingRef,
      passengerName,
      flightId,
      status: "CONFIRMED",
    });

    await db.collection("flights").updateOne(
      { _id: flight._id },
      { $inc: { seatsBooked: 1 } }
    );

    return Response.json({
      message: "Booking successful",
      bookingRef,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const name = searchParams.get("name");

    const client = await clientPromise;
    const db = client.db("airline");

    const bookings = await db
      .collection("bookings")
      .find({
        passengerName: {
          $regex: `^${name}$`,
          $options: "i",
        },
      })
      .toArray();

    const bookingsWithFlights =
      await Promise.all(
        bookings.map(async (booking) => {
          const flight = await db
            .collection("flights")
            .findOne({
              _id: new ObjectId(
                booking.flightId
              ),
            });

          return {
            ...booking,
            flight,
          };
        })
      );

return Response.json(bookingsWithFlights);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();

    const { bookingRef } = body;

    const client = await clientPromise;
    const db = client.db("airline");

    const booking = await db.collection("bookings").findOne({
      bookingRef: bookingRef,
    });

    if (!booking) {
      return Response.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // delete booking
    await db.collection("bookings").deleteOne({
      bookingRef: bookingRef,
    });

    // update seatsBooked
    await db.collection("flights").updateOne(
      { _id: new ObjectId(booking.flightId) },
      { $inc: { seatsBooked: -1 } }
    );

    return Response.json({
      message: "Cancelled",
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}