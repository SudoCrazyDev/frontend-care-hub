import React from "react";

function calculateAgeWithMonths(birthday) {
  const birthdayDate = new Date(birthday);
  const age = new Date().getFullYear() - birthdayDate.getFullYear();
  const months = new Date().getMonth() - birthdayDate.getMonth();
  return { age, months };
}

export { calculateAgeWithMonths }