const {weatherModel} = require(`../model/weatherModel`)

const mainContorller = async function(res){
    const [areaInformation,weatherInformation] = await weatherModel();

    if(areaInformation === 1 || weatherInformation === 1){
        res.send(`데이터베이스 오류`);
    }
    else{
        res.send(`${areaInformation},${weatherInformation}`)
    }
}

module.exports = {
    mainContorller: mainContorller
};