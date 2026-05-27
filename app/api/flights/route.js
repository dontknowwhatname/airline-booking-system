import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const client = await clientPromise;
    const db = client.db("airline");

    const query = {};

    if (from) {
      query.from = from.toUpperCase();
    }

    if (to) {
      query.to = to.toUpperCase();
    }

    // date filter
    if (date) {
      query.departureTime = {
        $regex: date,
      };
    }

    const flights = await db
      .collection("flights")
      .find(query)
      .toArray();

    return Response.json(flights);

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}