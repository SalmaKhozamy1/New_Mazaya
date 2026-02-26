document.addEventListener("DOMContentLoaded", function () {
  initFlatpickr();
});

function initFlatpickr() {
  flatpickr(".input_flat_picker", {
    dateFormat: "d / M / Y",
    allowInput: true,
    disableMobile: true
  });

  flatpickr(".timePicker", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    allowInput: true,
    time_24hr: true,
    minuteIncrement: 15,
    disableMobile: true
  });
}
