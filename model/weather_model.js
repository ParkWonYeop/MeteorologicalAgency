const {user_database} = require(`../function/api_function`);
const connection = user_database();

// 날씨 정보 모델을 반환
const weather_model = async function(){
    const [area_error, area_information] = await get_area_information();
    const [weather_error, weather_information] = await get_weather_information();
    (await connection).end();

    if(area_error === 1 || weather_error === 1){
        return [1,1];
    }
    return [area_information,weather_information];
}

// 지역 정보 요청
const get_area_information = async function(){
    connection.query(`SELECT area_code,County,City,longitude,latitude FROM local_information`, function (err, result) {
        const area_information = []
        for(data of result){
            area_information.push({
                "area_code" : data.area_code,
                "county_name" :data.County,
                "city_name" :data.City,
                "longitude" : data.longitude,
                "latitude" : data.latitude
            });
        }
        return [err, area_information]
    });
}

// 날씨 정보 요청
const get_weather_information = async function(){
    connection.query('SELECT * FROM weather_information', function (err, results) {
        const weather_information = [];
        for(data of result){
            weather_information.push({
                "area_code" : data.area_code, 
                "date" :data.date,
                "time" :data.time,
                "pty" : data.PTY,
                "reh" : data.REH,
                "rn1" : data.RN1,
                "t1h" : data.T1H,
                "uuu" : data.UUU,
                "vvv" : data.VVV,
                "vec" : data.VEC,
                "wsd" : data.WSD,
            });
        }
        return [err, weather_information]
    });
}

module.exports = {
    weather_model: weather_model
};