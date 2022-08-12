const mysql_function = require(`../function/api_function.js`);
const connection = mysql_function.user_database();

const main_model = async function(){
    const area_information = [];
    const weather_information = [];
    const area_error = await get_area_information(area_information);
    const weather_error = await get_weather_information(weather_information);
    (await connection).end();

    if(area_error === 1 || weather_error === 1){
        return [1,1];
    }
    return [area_information,weather_information];
}

const get_area_information = async function(area_information){
    connection.query(`SELECT area_code,County,City,longitude,latitude FROM local_information`, function (err, result) {
        if(err){
            return 1;
        }
        for(data of result){
            area_information.push({
                "area_code" : data.area_code, 
                "county_name" :data.County,
                "city_name" :data.City,
                "longitude" : data.longitude,
                "latitude" : data.latitude
            });
        }
        return 0;
    });
}

const get_weather_information = async function(weather_information){
    connection.query('SELECT * FROM weather_information', function (err, results) {
        if(err){
            return 1;
        }
        for(data of result){
            area_information.push({
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
        return 0;
    });
}

module.exports = {
    main_model: main_model
};