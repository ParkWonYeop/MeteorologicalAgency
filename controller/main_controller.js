const {main_model} = require(`../model/main_model`)

const main_contorller = async function(res){
    const [area_information,weather_information] = await main_model();

    if(area_information === 1 || weather_information === 1){
        res.send(`데이터베이스 오류`);
    }
    else{
        res.send(`${area_information},${weather_information}`)
    }
}

module.exports = {
    main_contorller: main_contorller
};