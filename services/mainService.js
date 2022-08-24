const {MainInformation} = require(`../DTOs/mainDTO`)

const mainService = async function(res){
    const areaWeatherInformation = new MainInformation();
    const areaInformation = areaWeatherInformation.getareainformation();
    const weatherInformation= areaWeatherInformation.getweatherinformation();

    if(areaInformation === 1 || weatherInformation === 1){
        res.send(`데이터베이스 오류`);
    }
    else{
        res.json(weatherInformation,areaInformation);
    }
}

module.exports = {
    mainService:mainService
}