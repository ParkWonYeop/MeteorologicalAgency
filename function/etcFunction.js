//현재 날짜를 받아옴//
const setDate = async function () {
  let today = new Date();
  let year = today.getFullYear().toString(); // 년도
  let month = (today.getMonth() + 1).toString(); // 월
  let date = today.getDate().toString(); // 날짜

  if (today.getMonth() < 9) {
    month = '0' + month;
  }
  if (today.getDate() < 10) {
    date = '0' + date;
  }

  let baseDate = year + month + date; /* 날짜 */

  return baseDate;
};

//현재시간을 받아옴//
const setTime = async function () {
  let today = new Date();
  let hours = today.getHours().toString();

  if (today.getHours() < 10) {
    hours = '0' + hours;
  }

  let base_time = hours + '00';

  return base_time;
};

module.exports = {
  setDate,
  setTime
}