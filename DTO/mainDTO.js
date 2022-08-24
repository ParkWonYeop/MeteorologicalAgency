const {getAreamodel,getWeathermodel} = require(`../models/weatherModel`);

class MainInformation {
    constructor() {
        this.weatherInformation = getWeathermodel();
        this.areaInformation = getAreamodel();
    }
    async setAreaInformation() {
        this.weatherInformation = getWeathermodel();
    }
    async setWeatherInformation() {
        this.weatherInformation = getWeathermodel();
    }
    async getWeatherinformation() {
        return this.weatherInformation;
    }
    async getAreainformation() {
        return this.areaInformation;
    }
}

module.exports ={
    MainInformation
}