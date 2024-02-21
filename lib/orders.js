"use server";

import connectToDB from "./db";

export const getOrder = async (orderId) => {
  const client = await connectToDB();

  const db = client.db("football-kit");

  try {
    const result = await db.collection("order").findOne({ id: orderId });
    client.close();
    return JSON.stringify(result);
  } catch (err) {
    client.close();
    throw new Error("Cannot Fetch Order");
  }
};
