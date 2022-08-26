const {mainService} = require(`../services/mainService`)

const getMain = async function(request, response){
    mainService(response);
}

module.exports = {
    getMain: getMain
};