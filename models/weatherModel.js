const {userDatabase,getWeatherinformation,getAreainformation} = require(`../DAOs/mainDAO`);
const connection = userDatabase();

// 날씨 정보 모델을 반환
const getWeathermodel = async function(){
    const [weatherError, weatherInformation] = await getWeatherinformation();
    (await connection).end();

    if(weatherError === 1){
        return 1;
    }
    return weatherInformation;
}

const getAreamodel = async function(){
    const [areaError, areaInformation] = await getAreainformation();
    (await connection).end();

    if(areaError === 1){
        return 1;
    }
    return areaInformation;
}

module.exports = {
    getWeathermodel,
    getAreamodel
};