const {mainService} = require(`../services/mainService`)

const getMain = async function(res,req){
    mainService(res);
}

module.exports = {
    getMain: getMain
};