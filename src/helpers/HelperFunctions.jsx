import React from "react";
import CircularProgress from '@mui/joy/CircularProgress';

function calculateAgeWithMonths(birthday) {
  if(birthday === null || birthday === ''){
    return 'NO AGE';
  }
  const birthdayDate = new Date(birthday);
  const months = new Date().getMonth() - birthdayDate.getMonth();
  let age = new Date().getFullYear() - birthdayDate.getFullYear();
  if(months <= 0){
    age -= 1;
  }
  return { age, months };
}

function submittingLoading(formik){
  if(formik.isSubmitting){
    return <CircularProgress variant="plain" size="sm" color="neutral" className="ms-1" />
  }
};

function CapitalizeFirstLetter(string){
  return String(string).charAt(0).toUpperCase() + String(string).slice(1);
};

function GetStatusBadge(status){
  switch (status) {
    case 'cancelled':
      return <span className="badge bg-danger">Cancelled</span>;
    case 'confirmed':
      return <span className="badge bg-success">{String(status).charAt(0).toUpperCase() + String(status).slice(1)}</span>;
    case 'completed':
      return <span className="badge bg-success">{String(status).charAt(0).toUpperCase() + String(status).slice(1)}</span>;
    case 'complete':
        return <span className="badge bg-success">{String(status).charAt(0).toUpperCase() + String(status).slice(1)}</span>;
    case 'pending':
      return <span className="badge bg-secondary">Pending</span>;
    default:
      return <span className="badge bg-secondary">{status}</span>;
  }
};
export { calculateAgeWithMonths, submittingLoading, GetStatusBadge, CapitalizeFirstLetter }