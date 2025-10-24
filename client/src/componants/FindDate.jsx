import React from "react";

const FindDate = ({ arr2, arr4 }) => {
  let showdate = new Date();

  var today = new Date();
  var year = today.getFullYear();
  var mes = today.getMonth() + 1;
  var dia = today.getDate();
  var fecha = year + "-" + mes + "-" + dia;

  var hour = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var fecha1 = hour + ":" + minutes + ":" + seconds;

  // let displayTodaysDate=showdate.getDate()+'-'+(showdate.getMonth()+1)+'-'+showdate.getFullYear();
  // let dt=showdate.toDateString()
  // let displayTime=showdate.getHours()+':'+showdate.getMinutes()+':'+showdate.getSeconds();
  // const [currentDate,currentMonth,currentYear] =displayTodaysDate.split('-');
  // const [currentHours,currentMinutes,currentsec]=displayTime.split(':');

  let arr1 = [Number(dia), Number(mes), Number(year)];
  let arr3 = [Number(hour), Number(minutes)];
  let date;
  // console.log("DB :arr1 arr3:",arr1,arr3);

  // console.log("NOW :arr2 arr4 :",(arr2),(arr4));
  if (arr1[2] - arr2[2] !== 0) {
    date = arr1[2] - arr2[2] + " Years ago";
  } else if (arr1[1] - arr2[1] !== 0) {
    date = arr1[1] - arr2[1] + " Months ago";
  } else if (arr1[0] - arr2[0] !== 0) {
    date = arr1[0] - arr2[0] + " days ago";
  } else if (arr3[0] - arr4[0] !== 0) {
    date = arr3[0] - arr4[0] + " Hours ago";
  } else if (arr3[1] - arr4[1] !== 0) {
    date = arr3[1] - arr4[1] + " Minutes ago";
  } else {
    date = "Just Now";
  }

  return date;
};

export default FindDate;
