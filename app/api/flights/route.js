import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const to = searchParams.get("to");
    const date = searchParams.get("date");

    const client = await clientPromise;
    const db = client.db("airline");

    let query = {};

    if (to) {
      query.to = to;
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