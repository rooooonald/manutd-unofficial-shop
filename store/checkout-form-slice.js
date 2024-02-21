import { createSlice } from "@reduxjs/toolkit";

const checkoutFormSlice = createSlice({
  name: "checkout-form",
  initialState: {
    email: "",
    phone: "",
    fName: "",
    lName: "",
    address: "",
    postalCode: "",
    city: "",
    province: "ON",
    delivery: { method: "", deliverDate: "" },
    creditCardNum: "",
    creditCardName: "",
    creditCardExpMonth: "",
    creditCardExpYear: "",
    creditCardCVV: "",
    isContactFilled: false,
    isDeliveryFilled: false,
    isPaymentFilled: false,
  },
  reducers: {
    changeValue: (state, action) => {
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
      } = action.payload;
      state.email = email || state.email;
      state.phone = phone || state.phone;
      state.fName = fName || state.fName;
      state.lName = lName || state.lName;
      state.address = address || state.address;
      state.postalCode = postalCode || state.postalCode;
      state.city = city || state.city;
      state.province = province || state.province;
      state.delivery.method = delivery?.method || state.delivery.method;
      state.delivery.deliverDate =
        delivery?.deliverDate || state.delivery.deliverDate;
      state.creditCardNum = creditCardNum || state.creditCardNum;
      state.creditCardName = creditCardName || state.creditCardName;
      state.creditCardExpMonth = creditCardExpMonth || state.creditCardExpMonth;
      state.creditCardExpYear = creditCardExpYear || state.creditCardExpYear;
      state.creditCardCVV = creditCardCVV || state.creditCardCVV;

      if (
        state.email.trim().length !== 0 &&
        state.phone.trim().length !== 0 &&
        state.fName.trim().length !== 0 &&
        state.lName.trim().length !== 0 &&
        state.address.trim().length !== 0 &&
        state.postalCode.trim().length !== 0 &&
        state.city.trim().length !== 0 &&
        state.province.trim().length !== 0
      ) {
        state.isContactFilled = true;
      } else {
        state.isContactFilled = false;
      }

      if (
        (state.delivery.method === "express" ||
          state.delivery.method === "standard") &&
        state.delivery.deliverDate
      ) {
        state.isDeliveryFilled = true;
      } else {
        state.isDeliveryFilled = false;
      }

      if (
        state.creditCardNum.trim().length !== 0 &&
        state.creditCardName.trim().length !== 0 &&
        state.creditCardExpMonth.trim().length !== 0 &&
        state.creditCardExpYear.trim().length !== 0 &&
        state.creditCardCVV.trim().length !== 0
      ) {
        state.isPaymentFilled = true;
      } else {
        state.isPaymentFilled = false;
      }
    },

    resetForm: (state) => {
      state.email = "";
      state.phone = "";
      state.fName = "";
      state.lName = "";
      state.address = "";
      state.postalCode = "";
      state.city = "";
      state.province = "";
      state.delivery.method = "";
      state.delivery.deliverDate = "";
      state.creditCardNum = "";
      state.creditCardName = "";
      state.creditCardExpMonth = "";
      state.creditCardExpYear = "";
      state.creditCardCVV = "";
      state.isContactFilled = false;
      state.isDeliveryFilled = false;
      state.isPaymentFilled = false;
    },
  },
});

export const checkoutFormActions = checkoutFormSlice.actions;

export default checkoutFormSlice.reducer;
