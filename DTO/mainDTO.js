const {getAreamodel,getWeathermodel} = require(`../models/weatherModel`);

const mainInformation = {
    weatherInformation : ``,
    areaInformation : ``
};

const mainDTO = async function(){
    mainInformation.weatherInformation = getWeathermodel();
    mainInformation.areaInformation = getAreamodel();
}

const setAreaInformation= async function(){
    mainInformation.weatherInformation = getWeathermodel();
}

const setWeatherInformation = async function(){
    mainInformation.weatherInformation = getWeathermodel();
}

const getWeatherinformation = async function(){
    return mainInformation.weatherInformation;
}

const getAreainformation = async function(){
    return mainInformation.areaInformation;
}

module.exports ={
    mainDTO,
    setAreaInformation,
    setWeatherInformation,
    getWeatherinformation,
    getAreainformation
}