//******** Calendar Widget Code *************/

const dt = new Date();

function renderDate(val) {
  dt.setDate(1);
  let day = dt.getDay();
  let today = new Date();
  let endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
  let prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  const selectMonth = document.getElementById("month");
  months.forEach((month, i) => {
    const monthOptions = selectMonth.appendChild(
      document.createElement("option")
    );
    monthOptions.value = `${month}`;
    monthOptions.textContent = `${month}`;
    if (i === dt.getMonth()) {
      monthOptions.selected = true;
    }
    if (!val && month === monthOptions.value) {
      monthOptions.selected = true;
    }
  });

  const selectYear = document.getElementById("year");
  years.forEach((year) => {
    const yearOptions = selectYear.appendChild(
      document.createElement("option")
    );
    yearOptions.value = year;
    yearOptions.textContent = year;
  });

  const yearOptions = document.querySelectorAll("#year option");
  selectYear.addEventListener("change", renderYear.bind(this, yearOptions));
  const monthDays = document.getElementById("days");

  for (let i = day; i > 0; i--) {
    const dayEl = monthDays.appendChild(document.createElement("div"));
    dayEl.classList.add(`prev-day`);
    dayEl.textContent = `${prevDate - i + 1}`;
  }

  for (let i = 1; i <= endDate; i++) {
    const daysWrapper = monthDays.appendChild(document.createElement("div"));
    daysWrapper.classList.add("day-wrapper");
    const dayEl = daysWrapper.appendChild(document.createElement("input"));
    const labelEl = daysWrapper.appendChild(document.createElement("label"));
    dayEl.setAttribute("type", "radio");
    dayEl.setAttribute("name", "day");
    dayEl.setAttribute("id", `day-${i}`);
    labelEl.setAttribute("for", `day-${i}`);
    if (i == today.getDate() && dt.getMonth() == today.getMonth()) {
      labelEl.classList.add(`day`);
      labelEl.textContent = `${i}`;
      dayEl.value = `${i}`;
      dayEl.checked = true;
    } else {
      labelEl.classList.add(`day`);
      labelEl.textContent = `${i}`;
      dayEl.value = `${i}`;
    }
  }
  const monthOptions = document.querySelectorAll("#month option");
  selectMonth.addEventListener("change", pickMonth.bind(this, monthOptions));
  const radioDays = document.querySelectorAll('input[type="radio"]');

  radioDays.forEach((radio) => {
    if (radio.value === new Date().getDate) {
      radio.setAttribute("selected", true);
    }
    radio.addEventListener("change", updateDate.bind());
  });
}

renderDate();

function renderYear(options, e) {
  e.preventDefault();
  options.forEach((option) => {
    if (option.selected) {
      const selectedYear = Number(option.value);
      dt.setFullYear(selectedYear);
      handleChange();
      return;
    }
  });
}

function pickMonth(options, e) {
  options.forEach((option, i = 0) => {
    if (option.selected) {
      dt.setMonth(i);
      console.log(option, dt);
      handleChange(option);
      return;
    }
  });

  console.log(options, e);
}

function handleChange() {
  let day = dt.getDay();
  let today = new Date();
  let endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
  let nextDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 1).getDate();
  let nextDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 1).getDay();
  let endDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDay();
  let prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
  console.log(day, endDay, today, nextDate, nextDay, endDate, prevDate);
  const daysWrapper = document.getElementById("days");
  const selectMonth = document.getElementById("month");

  const allDays = document.querySelectorAll(
    "#days input[type='radio'], #days label, #days div, .days-wrapper"
  );
  const val = 7 - nextDay;
  console.log(val);
  if (allDays.length > 0) {
    allDays.forEach((day) => {
      day.remove();
    });
  }

  for (let i = day; i > 0; i--) {
    const dayEl = daysWrapper.appendChild(document.createElement("div"));
    dayEl.classList.add(`prev-day`);
    dayEl.textContent = `${prevDate - i + 1}`;
  }

  for (let i = 1; i <= endDate; i++) {
    const dayWrap = daysWrapper.appendChild(document.createElement("div"));
    dayWrap.classList.add("day-wrapper");
    const dayEl = dayWrap.appendChild(document.createElement("input"));
    const labelEl = dayWrap.appendChild(document.createElement("label"));
    dayEl.setAttribute("type", "radio");
    dayEl.setAttribute("name", "day");
    dayEl.setAttribute("id", `day-${i}`);
    labelEl.setAttribute("for", `day-${i}`);
    if (i == today.getDate() && dt.getMonth() == today.getMonth()) {
      labelEl.classList.add(`day`);
      labelEl.selected = true;
      labelEl.textContent = `${i}`;
      dayEl.value = `${i}`;
    } else {
      labelEl.classList.add(`day`);
      labelEl.textContent = `${i}`;
      dayEl.value = `${i}`;
    }
  }

  for (let i = 1; i <= val; i++) {
    const dayEl = daysWrapper.appendChild(document.createElement("div"));
    dayEl.classList.add(`prev-day`);
    dayEl.textContent = `${i}`;
  }
  const options = document.querySelectorAll("option");
  selectMonth.addEventListener("change", pickMonth.bind(this, options));
  const radioDays = document.querySelectorAll('input[type="radio"]');

  radioDays.forEach((radio) => {
    radio.addEventListener("change", updateDate.bind(this));
  });
}

function updateDate(e) {
  const monthOptions = document.querySelectorAll("#month option");
  const yearOptions = document.querySelectorAll("#year option");
  let string;
  let yearVal;

  yearOptions.forEach((option) => {
    if (option.selected) {
      yearVal = option.value;
    }
  });
  if (!e) {
    monthOptions.forEach((option, i) => {
      if (option.selected) {
        string =
          `${option.value}` +
          " " +
          `${new Date().getDate()}` +
          ", " +
          `${yearVal}`;
      }
    });
  } else {
    monthOptions.forEach((option, i) => {
      if (option.selected) {
        string =
          `${option.value}` + " " + `${e.target.value}` + ", " + `${yearVal}`;
      }
    });
  }

  const selectedDate = document.querySelector(
    ".calendar-container_content-select-days h2 span"
  );
  selectedDate.textContent = "";
  selectedDate.textContent = string;
}

updateDate();
