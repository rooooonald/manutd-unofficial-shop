"use server";

import { v4 as uuidv4 } from "uuid";
import connectToDB from "./db";
const mailchimp = require("@mailchimp/mailchimp_marketing");

export const submitOrder = async (prevState, formData) => {
  const client = await connectToDB();
  const db = client.db("football-kit");

  const id = uuidv4();

  try {
    const result = await db.collection("order").insertOne({
      id,
      ...formData,
      orderDate: Date.now(),
      status: "processing",
    });

    client.close();
    console.log(result);
    return { status: "success", orderId: id };
  } catch (err) {
    client.close();
    return { status: "error" };
  }
};

export const emailSubscribe = async (prevState, formData) => {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_APIKEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });

  const listId = process.env.MAILCHIMP_LISTID;
  const subscriberEmail = formData.get("email");

  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscriberEmail,
      status: "subscribed",
    });
    return { status: "success" };
  } catch (err) {
    console.log(err.message);
    return { status: "error" };
  }
};
