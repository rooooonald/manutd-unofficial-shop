"use server";

import { v4 as uuidv4 } from "uuid";
import connectToDB from "./db";
import {
  checkEmpty,
  validateCVV,
  validateCardExpMonth,
  validateCardExpYear,
  validateCardNum,
  validateEmail,
  validatePhone,
  validatePostalCode,
} from "./validations";
const mailchimp = require("@mailchimp/mailchimp_marketing");

export const submitOrder = async (prevState, formData) => {
  const client = await connectToDB();
  const db = client.db("football-kit");

  const {
    email,
    phone,
    fName,
    lName,
    address,
    postalCode,
    city,
    province,
    delivery,
    creditCardNum,
    creditCardName,
    creditCardExpMonth,
    creditCardExpYear,
    creditCardCVV,
    items,
  } = formData;

  if (
    !validateEmail(email) ||
    !validatePhone(phone) ||
    !checkEmpty(fName) ||
    !checkEmpty(lName) ||
    !checkEmpty(address) ||
    !validatePostalCode(postalCode) ||
    !checkEmpty(city) ||
    !checkEmpty(province) ||
    !delivery.method ||
    !delivery.deliverDate ||
    !validateCardNum(creditCardNum) ||
    !checkEmpty(creditCardName) ||
    !validateCardExpMonth(creditCardExpMonth) ||
    !validateCardExpYear(creditCardExpYear) ||
    !validateCVV(creditCardCVV) ||
    items.length === 0
  ) {
    return { status: "error" };
  }

  const id = uuidv4();

  try {
    const result = await db.collection("order").insertOne({
      id,
      email,
      phone,
      fName,
      lName,
      address,
      postalCode,
      city,
      province,
      delivery,
      creditCardNum,
      creditCardName,
      creditCardExpMonth,
      creditCardExpYear,
      creditCardCVV,
      items,
      orderDate: Date.now(),
      status: "processing",
    });

    client.close();
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
