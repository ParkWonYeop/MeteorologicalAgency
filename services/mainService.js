const {mainDTO,getAreainformation,getWeatherinformation} = require(`../DTOs/mainDTO`)

const mainService = async function(res){
    await mainDTO();
    const areaInformation = await getAreainformation();
    const weatherInformation = await getWeatherinformation();

    if(areaInformation === 1 || weatherInformation === 1){
        res.send(`데이터베이스 오류`);
    }
    else{
        res.json(areaInformation,weatherInformation);
    }
}

module.exports = {
    mainService:mainService
}