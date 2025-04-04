import flatpickr from 'flatpickr';

const TIME_FORMAT = 'H:i';
const DATE_FORMAT_EVENT = 'M d';
const DATE_TIME_FORMAT = 'Y-m-dTH:i';
const DATE_YEAR_FORMAT = 'Y-m-d';
const DATE_TIME_FORMAT_EDIT = 'y/m/d H:i';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function humanizePointTime(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), TIME_FORMAT) : '';
}

function humanizePointDate(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_FORMAT_EVENT) : '';
}

function humanizeDateTime(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_TIME_FORMAT) : '';
}

function humanizeDateYear(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_YEAR_FORMAT) : '';
}

function humanizeDateTimeEdit(dueDate) {
  return dueDate ? flatpickr.formatDate(new Date(dueDate), DATE_TIME_FORMAT_EDIT) : '';
}

function msToTime(duration) {
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);

  days = (days < 10) ? `0${ days }` : days;
  hours = (hours < 10) ? `0${ hours }` : hours;
  minutes = (minutes < 10) ? `0${ minutes }M` : `${ minutes }M`;

  days = (days > 0) ? `${ days }D ` : '';
  hours = (hours > 0) ? `${ hours }H ` : '';

  return `${ days }${ hours }${ minutes }`;
}

export { getRandomArrayElement, humanizePointTime, humanizePointDate, humanizeDateTime, humanizeDateYear,humanizeDateTimeEdit, msToTime };
