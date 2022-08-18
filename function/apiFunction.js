const {createConnection} = require('mysql');
const request = require('request');

//데이터베이스 연결//
const userDatabase = async function () {
  const connection = createConnection({
    host: process.env.DB_HOST, // 호스트 주소
    user: process.env.DB_USER, // mysql user
    password: process.env.DB_PASS, // mysql password
    database: process.env.DB_NAME, // mysql 데이터베이스
  });
  connection.connect();
  return connection;
};

//오류를 확인하고 시간이 달라지면 API에 다시 데이터를 요청//
const checkApi = async function (connection, baseTime) {
  let compareDate = setDate();
  let compareTime = setTime();
  console.log(compareTime);
  await checkError(connection);
  if (compareTime != baseTime) {
    baseTime = compareTime;
    requestApi(connection, compareDate, compareTime);
  }
  return baseTime;
};

//지역코드를 받아와 API에 데이터를 요청함//
const requestApi = async function (connection, baseDate, baseTime) {
  let areaCode = [];
  await connection.query(`SELECT area_code FROM local_information`, async function (err, result) {
    if (err) {
      console.log('데이터베이스 오류');
      return 0;
    }
    for (let data of result) {
      areaCode.push(data.area_code);
    }
    for (let num in areaCode) {
      await requestBody(connection, areaCode[num], baseDate, baseTime);
    }
  });
  return 0;
};

//오류가 난 데이터를 다시 API에 요청함//
const checkError = async function (connection) {
  await connection.query(
    'SELECT area_code,date,time FROM weather_information where PTY = -100 OR PTY = -101',
    async function (err, result) {
      if (err) {
        console.log('데이터베이스 오류');
        return 0;
      }
      for (let data of result) {
        await deleteError(connection);
        if (data.time != undefined) {
          await requestBody(connection, data.area_code, data.date, data.time);
        }
      }
    },
  );
  return 0;
};

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

//에러가 난 데이터를 다시 받아오기전에 데이터베이스에서 삭제함//
const deleteError = async function (connection) {
  await connection.query(
    'DELETE FROM weather_information where PTY = -100 OR PTY = -101',
    async function (err, result) {
      if (err) {
        console.log('데이터베이스 오류');
      }
      return 0;
    },
  );
  return 0;
};

//API에 데이터를 요청함//
const requestBody = async function (connection, areaCode, baseDate, baseTime) {
  await connection.query(
    `SELECT grid_x,grid_y FROM local_information where area_code = ${areaCode}`,
    async function (err, result) {
      if (err) {
        console.log('잘못된 지역코드 입니다.');
        return 0;
      }
      /* API에 데이터 요청하기 위해 필요한 정보들 */
      const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
      let queryParams = '?' + encodeURIComponent('serviceKey') + '=' + process.env.API_KEY; /* Service Key*/
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000');
      queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* 데이터 형식 */
      queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(baseDate); /* 날짜 */
      queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(baseTime); /* 시간 */
      queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(result[0].grid_x); /* 지역 X 좌표 */
      queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(result[0].grid_y); /* 지역 Y 좌표 */

      request(
        {
          url: url + queryParams,
          method: 'GET',
        },
        async function (err, response, body) {
          await sendData(body, connection, areaCode, baseDate, baseTime);
        },
      );

      return 0;
    },
  );
  return 0;
};

//데이터를 정제하고 에러를 확인하여 따로 기록함//
const sendData = async function (body, connection, areaCode, baseDate, baseTime) {
  if (body != undefined) {
    let errorCode = await checkApierror(body);
    if (errorCode != 0) {
      await errorInsert(connection, errorCode, baseDate, baseTime, areaCode);
      return 0;
    }
    await saveData(body, areaCode, connection, baseDate, baseTime, insertData);
  }
  return 0;
};

//에러가 난 데이터를 후처리를 할 수 있게 데이터베이스에 따로 기록함//
const errorInsert = async function (connection, error, baseDate, baseTime, areaCode) {
  let errorCode;

  if (error == 1) {
    errorCode = -100;
  } else if (error == 2) {
    errorCode = -101;
  }

  await connection.query(
    `INSERT INTO weather_information (date,time,PTY,area_code) VALUES (${baseDate},${baseTime},${errorCode},${areaCode})`,
    function (err, rows) {
      if (err) {
        console.log('에러');
        return 0;
      }
      console.log('Complete');
    },
  );

  return 0;
};

//API에서 받아온 데이터가 정상적인지를 체크함//
const checkApierror = function (body) {
  if (body.search('APPLICATION_ERROR') != -1) {
    console.log('어플리케이션 에러');
    return 1;
  } else if (body.search('SERVICE ERROR') != -1) {
    console.log('서비스에러');
    return 2;
  } else if (body.search('인증서비스 내부 오류') != -1) {
    console.log('인증서비스 오류');
    return 2;
  } else {
    return 0;
  }
};

//데이터베이스에 정제된 데이터를 추가함//
const insertData = async function (
  connection,
  baseDate,
  baseTime,
  pty,
  reh,
  rn1,
  t1h,
  uuu,
  vec,
  vvv,
  wsd,
  areaCode,
) {
  await connection.query(
    `INSERT INTO weather_information (date,time,PTY,REH,RN1,T1H,UUU,VEC,VVV,WSD,area_code) VALUES (${baseDate},${baseTime},${pty},${reh},${rn1},${t1h},${uuu},${vec},${vvv},${wsd},${areaCode})`,
    function (err, rows) {
      if (err) {
        console.log('에러');
        return 0;
      }
      console.log('Complete');
    },
  );
  return 0;
};

//받아온 데이터를 정제함//
const saveData = async function (body, areaCode, connection, baseDate, baseTime, insertData) {
  let parser = []; /* Parsing 한 데이터를 저장할 배열 */
  /* JSON으로 받은 데이터를 Parsing함 */
  for (let idx = 0; idx < 8; idx++) {
    let start = body.search('baseDate');
    let end = body.search('obsrValue');
    start = body.indexOf('{', start - 5);
    end = body.indexOf('}', end);
    let data = body.substring(start, end + 1);
    body = body.replace(data, '');
    parser[idx] = JSON.parse(data);
  }
  let pty; /* 강수상태 */
  let reh; /* 습도 */
  let rn1; /* 1시간 강수량 */
  let t1h; /* 기온 */
  let uuu; /* 동서바람성분 */
  let vec; /* 풍향 */
  let vvv; /* 남북바람성분 */
  let wsd; /* 풍속 */

  /* 파싱한 JSON에서 데이터별로 뽑아서 정리 */
  for (let idx = 0; idx < 8; idx++) {
    switch (parser[idx].category) {
      case 'PTY':
        pty = parser[idx].obsrValue;
        break;
      case 'REH':
        reh = parser[idx].obsrValue;
        break;
      case 'RN1':
        rn1 = parser[idx].obsrValue;
        break;
      case 'T1H':
        t1h = parser[idx].obsrValue;
        break;
      case 'UUU':
        uuu = parser[idx].obsrValue;
        break;
      case 'VEC':
        vec = parser[idx].obsrValue;
        break;
      case 'VVV':
        vvv = parser[idx].obsrValue;
        break;
      case 'WSD':
        wsd = parser[idx].obsrValue;
        break;
    }
  }
  insertData(connection, baseDate, baseTime, pty, reh, rn1, t1h, uuu, vec, vvv, wsd, areaCode);
};

module.exports = {
  userDatabase: userDatabase,
  checkApi: checkApi,
  requestApi: requestApi,
  checkError: checkError,
  setDate: setDate,
  setTime: setTime,
};
