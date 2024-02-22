export const checkEmpty = (value) => value.trim().length !== 0;

export const validateEmail = (email) => {
  if (!checkEmpty(email)) {
    return false;
  }

  if (!email.includes("@")) {
    return false;
  }
  return true;
};

export const validatePhone = (number) => {
  if (!checkEmpty(number)) {
    return false;
  }

  const regex = /^\d{10}$/;

  if (!regex.test(number)) {
    return false;
  }

  return true;
};

export const validatePostalCode = (postalCode) => {
  if (!checkEmpty(postalCode)) {
    return false;
  }

  const regex = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;

  if (!regex.test(postalCode)) {
    return false;
  }

  return true;
};

export const validateCardNum = (cardNum) => {
  if (!checkEmpty(cardNum)) {
    return false;
  }

  const regex = /^\d{16}$/;

  if (!regex.test(cardNum)) {
    return false;
  }

  return true;
};

export const validateCardExpMonth = (month) => {
  if (!checkEmpty(month)) {
    return false;
  }

  const regex = /^(0[1-9]|1[0-2])$/;

  if (!regex.test(month)) {
    return false;
  }

  return true;
};

export const validateCardExpYear = (year) => {
  if (!checkEmpty(year)) {
    return false;
  }

  const regex = /^(2[4-9]|3[0-9])$/;
  if (!regex.test(year)) {
    return false;
  }

  const today = new Date();
  const todayYear = +today.getFullYear().toString().slice(-2);
  if (+year - +todayYear < 0) {
    return false;
  }

  return true;
};

export const validateCVV = (cvv) => {
  if (!checkEmpty(cvv)) {
    return false;
  }

  const regex = /^\d{3}$/;
  if (!regex.test(cvv)) {
    return false;
  }

  return true;
};
