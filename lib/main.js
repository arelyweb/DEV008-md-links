const path = require('path');
const fs = require('fs');
/*
|--------------------------------------------------------------------------
    valida que la ruta sea valida
|--------------------------------------------------------------------------
*/
exports.validarPath =function validarPath (dirname){
    return (fs.existsSync(dirname)) ? true : false;
}
