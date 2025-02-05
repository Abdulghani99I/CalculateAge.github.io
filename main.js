

let days = document.getElementById('day');
let Months = document.getElementById('month');
let Years = document.getElementById('year');




for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i; 
    option.text = i;
    days.appendChild(option);
  }


for (let i = 1; i <= 12; i++) {
    const option = document.createElement('option');
    option.value = i; 
    option.text = i;
    Months.appendChild(option);
  }

  
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();


for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement('option');
    option.value = i; 
    option.text = i;
    Years.appendChild(option);
  }

let btnCalc = document.getElementById('btn-calc');

btnCalc.onclick = function()
{
  let dayNum = document.getElementById('day');
  let monthNum = document.getElementById('month');
  let yearNum = document.getElementById('year');

  let resultAgeCalc = document.getElementById('result');
  let resultTextAgeCalc = document.querySelector('#result p');

  if (isNaN(dayNum.value) || isNaN(monthNum.value) || isNaN(yearNum.value)) {
    resultAgeCalc.classList.remove('hide');
    resultTextAgeCalc.textContent = "يرجى إختيار اليوم والشهر والسنة.";
    return;
  }

  if (new Date(yearNum.value, monthNum.value - 1, dayNum.value) > new Date())
  {
    resultTextAgeCalc.textContent = 'يرجى عدم تحديد تاريخ مستقبلي';
    return;
  }


  resultAgeCalc.classList.remove('hide');

  let ageCalcResult = calculateAge(dayNum.value, monthNum.value, yearNum.value);

  
  let nextBirthDay = nextBirthday(new Date(yearNum.value, monthNum.value - 1, dayNum.value));

  
  resultTextAgeCalc.innerHTML = `
  <div>تاريخ الميلاد: ${dayNum.value}-${monthNum.value}-${yearNum.value}</div>
  <div>عمرك هو: ${ageCalcResult.years} سنة و ${ageCalcResult.months} أشهر و ${ageCalcResult.days} يوم</div>
  <div>عيد ميلادك القادم في ${nextBirthDay.getDate()}-${nextBirthDay.getUTCMonth() + 1}-${nextBirthDay.getUTCFullYear()}
  المصادف يوم ${convertDayNumberInWeekToString(nextBirthDay.getDay())}
  </div>`; 
}


function calculateAge(day, month, year) {
  // Create a Date object for the given date
  let birthDate = new Date(year, month - 1, day); // Month is zero-based in JS

  // Get the current date
  let currentDate = new Date();

  // Calculate the difference in milliseconds
  let diff = currentDate - birthDate;

  // Convert milliseconds to years, months, and days
  let ageDate = new Date(diff);
  let years = ageDate.getUTCFullYear() - 1970; // Since 1970 is the base
  let months = ageDate.getUTCMonth();
  let days = ageDate.getUTCDate() - 1; // Subtract 1 because it starts from 1

  return { years, months, days};
}


   function nextBirthday(birthday) {
   const today = new Date();
   const currentYear = today.getFullYear();
  
   // Create a new Date object for the next birthday
   let nextBirthday = new Date(birthday);
   nextBirthday.setFullYear(currentYear);

   // If the birthday has passed this year, set the year to the next one
   if (today > nextBirthday) {
       nextBirthday.setFullYear(currentYear + 1);
   }

   return nextBirthday;
}


function convertDayNumberInWeekToString(Daynumber)
{
/*
0: الأحد
1: الإثنين
2: الثلاثاء
3: الأربعاء
4: الخميس
5: الجمعة
6: السبت
*/
  switch(Daynumber)
  {
    case 0:
      return 'الاحد'
    case 1:
      return 'الاثنين'
    case 2:
      return 'الثلاثاء'
    case 3:
      return 'الاربعاء'
    case 4:
      return 'الخميس'
    case 5:
      return 'السبت'
    case 6:
      return 'الاحد'
  }
}