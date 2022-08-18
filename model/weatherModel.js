const {userDatabase} = require(`../function/apiFunction`);
const connection = userDatabase();

// 날씨 정보 모델을 반환
const weatherModel = async function(){
    const [areaError, areaInformation] = await getAreainformation();
    const [weatherError, weatherInformation] = await getWeatherinformation();
    (await connection).end();

    if(areaError === 1 || weatherError === 1){
        return [1,1];
    }
    return [areaInformation,weatherInformation];
}

// 지역 정보 요청
const getAreainformation = async function(){
    connection.query(`SELECT area_code,County,City,longitude,latitude FROM local_information`, function (err, result) {
        const areaInformation = []
        for(data of result){
            areaInformation.push({
                "area_code" : data.area_code,
                "county_name" :data.County,
                "city_name" :data.City,
                "longitude" : data.longitude,
                "latitude" : data.latitude
            });
        }
        return [err, areaInformation]
    });
}

// 날씨 정보 요청
const getWeatherinformation = async function(){
    connection.query('SELECT * FROM weather_information', function (err, results) {
        const weatherInformation = [];
        for(data of result){
            weatherInformation.push({
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
        return [err, weatherInformation]
    });
}

module.exports = {
    weatherModel: weatherModel
};