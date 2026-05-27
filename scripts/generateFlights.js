const { MongoClient } =
  require("mongodb");

require("dotenv").config({
  path: ".env.local",
});


const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function generateFlights() {
  await client.connect();

  const db = client.db("airline");

  const flights = [];

  for (let week = 0; week < 4; week++) {

    // =========================
    // Sydney
    // Friday outbound
    // Sunday return
    // =========================

    const sydneyFriday =
      new Date(2026, 5, 5 + week * 7);

    flights.push({
      flightNumber: `SJ${101 + week * 2}`,
      from: "NZNE",
      to: "YSSY",
      departureTime: new Date(
        sydneyFriday.setHours(10, 0, 0)
      ),
      arrivalTime: new Date(
        sydneyFriday.setHours(13, 0, 0)
      ),
      price: 899,
      capacity: 8,
      seatsBooked: 0,
    });

    const sydneySunday =
      new Date(2026, 5, 7 + week * 7);

    flights.push({
      flightNumber: `SJ${102 + week * 2}`,
      from: "YSSY",
      to: "NZNE",
      departureTime: new Date(
        sydneySunday.setHours(15, 0, 0)
      ),
      arrivalTime: new Date(
        sydneySunday.setHours(20, 0, 0)
      ),
      price: 899,
      capacity: 8,
      seatsBooked: 0,
    });

    // =========================
    // Rotorua
    // Mon-Fri twice daily
    // =========================

    for (let day = 0; day < 5; day++) {

      const rotoruaDay =
        new Date(
          2026,
          5,
          1 + week * 7 + day
        );

      // Morning outbound
      flights.push({
        flightNumber: `CR${201 + week * 20 + day * 4}`,
        from: "NZNE",
        to: "NZRO",
        departureTime: new Date(
          rotoruaDay.setHours(7, 0, 0)
        ),
        arrivalTime: new Date(
          rotoruaDay.setHours(8, 0, 0)
        ),
        price: 199,
        capacity: 6,
        seatsBooked: 0,
      });

      // Morning return
      flights.push({
        flightNumber: `CR${202 + week * 20 + day * 4}`,
        from: "NZRO",
        to: "NZNE",
        departureTime: new Date(
          rotoruaDay.setHours(9, 0, 0)
        ),
        arrivalTime: new Date(
          rotoruaDay.setHours(10, 0, 0)
        ),
        price: 199,
        capacity: 6,
        seatsBooked: 0,
      });

      // Afternoon outbound
      flights.push({
        flightNumber: `CR${203 + week * 20 + day * 4}`,
        from: "NZNE",
        to: "NZRO",
        departureTime: new Date(
          rotoruaDay.setHours(16, 0, 0)
        ),
        arrivalTime: new Date(
          rotoruaDay.setHours(17, 0, 0)
        ),
        price: 199,
        capacity: 6,
        seatsBooked: 0,
      });

      // Evening return
      flights.push({
        flightNumber: `CR${204 + week * 20 + day * 4}`,
        from: "NZRO",
        to: "NZNE",
        departureTime: new Date(
          rotoruaDay.setHours(18, 0, 0)
        ),
        arrivalTime: new Date(
          rotoruaDay.setHours(19, 0, 0)
        ),
        price: 199,
        capacity: 6,
        seatsBooked: 0,
      });
    }

    // =========================
    // Great Barrier
    // Mon Wed Fri outbound
    // Tue Thu Sat return
    // =========================

    const gbOutboundDays = [1, 3, 5];
    const gbReturnDays = [2, 4, 6];

    gbOutboundDays.forEach((d, i) => {
      const date =
        new Date(2026, 5, d + week * 7);

      flights.push({
        flightNumber: `GB${301 + week * 6 + i}`,
        from: "NZNE",
        to: "NZGB",
        departureTime: new Date(
          date.setHours(9, 0, 0)
        ),
        arrivalTime: new Date(
          date.setHours(10, 0, 0)
        ),
        price: 249,
        capacity: 6,
        seatsBooked: 0,
      });
    });

    gbReturnDays.forEach((d, i) => {
      const date =
        new Date(2026, 5, d + week * 7);

      flights.push({
        flightNumber: `GB${304 + week * 6 + i}`,
        from: "NZGB",
        to: "NZNE",
        departureTime: new Date(
          date.setHours(9, 0, 0)
        ),
        arrivalTime: new Date(
          date.setHours(10, 0, 0)
        ),
        price: 249,
        capacity: 6,
        seatsBooked: 0,
      });
    });

    // =========================
    // Chatham
    // Tue Fri outbound
    // Wed Sat return
    // =========================

    const chathamOut = [2, 5];
    const chathamReturn = [3, 6];

    chathamOut.forEach((d, i) => {
      const date =
        new Date(2026, 5, d + week * 7);

      flights.push({
        flightNumber: `HJ${401 + week * 4 + i}`,
        from: "NZNE",
        to: "NZCI",
        departureTime: new Date(
          date.setHours(8, 0, 0)
        ),
        arrivalTime: new Date(
          date.setHours(10, 45, 0)
        ),
        price: 499,
        capacity: 5,
        seatsBooked: 0,
      });
    });

    chathamReturn.forEach((d, i) => {
      const date =
        new Date(2026, 5, d + week * 4);

      flights.push({
        flightNumber: `HJ${403 + week * 4 + i}`,
        from: "NZCI",
        to: "NZNE",
        departureTime: new Date(
          date.setHours(10, 0, 0)
        ),
        arrivalTime: new Date(
          date.setHours(12, 15, 0)
        ),
        price: 499,
        capacity: 5,
        seatsBooked: 0,
      });
    });

    // =========================
    // Lake Tekapo
    // Monday outbound
    // Tuesday return
    // =========================

    const tekapoMonday =
      new Date(2026, 5, 1 + week * 7);

    flights.push({
      flightNumber: `TK${501 + week * 2}`,
      from: "NZNE",
      to: "NZTL",
      departureTime: new Date(
        tekapoMonday.setHours(11, 0, 0)
      ),
      arrivalTime: new Date(
        tekapoMonday.setHours(13, 0, 0)
      ),
      price: 399,
      capacity: 5,
      seatsBooked: 0,
    });

    const tekapoTuesday =
      new Date(2026, 5, 2 + week * 7);

    flights.push({
      flightNumber: `TK${502 + week * 2}`,
      from: "NZTL",
      to: "NZNE",
      departureTime: new Date(
        tekapoTuesday.setHours(14, 0, 0)
      ),
      arrivalTime: new Date(
        tekapoTuesday.setHours(16, 0, 0)
      ),
      price: 399,
      capacity: 5,
      seatsBooked: 0,
    });
  }

  await db.collection("flights").insertMany(flights);

  console.log(
    `${flights.length} flights inserted successfully!`
  );

  await client.close();
}

generateFlights();