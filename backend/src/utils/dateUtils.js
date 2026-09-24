/**
 * Date utility helpers for MahaDarbar Attendance
 */

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime12Hour = (dateInput) => {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // hour 0 is 12
  return `${hours}:${minutes} ${ampm}`;
};

const formatDisplayDate = (dateStringOrObj) => {
  if (!dateStringOrObj) return '';
  const d = new Date(dateStringOrObj);
  const day = d.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = monthNames[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
};

module.exports = {
  getTodayDateString,
  formatTime12Hour,
  formatDisplayDate
};
