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
/*
|--------------------------------------------------------------------------
    valida que la ruta sea absoluta
|--------------------------------------------------------------------------
*/
exports.validarRuta =function validarRuta (dirname){
    return (path.isAbsolute(dirname));
}
/*
|--------------------------------------------------------------------------
    traduce la ruta a absoluta
|--------------------------------------------------------------------------
*/
exports.transAbsoluta =function transAbsoluta (dirname){
    return (path.resolve(dirname));
}
/*
|--------------------------------------------------------------------------
    obtiene la extesion del archivo 
|--------------------------------------------------------------------------
*/
exports.tipoExt =function tipoExt (dirname){
    return (path.extname(dirname));
}
/*
|--------------------------------------------------------------------------
    recorrer directorio 
|--------------------------------------------------------------------------
*/
exports.buscarArchivo =function buscarArchivo (dirname){
    return (fs.readdirSync(dirname));
}
/*
|--------------------------------------------------------------------------
  buscar un archivo .MD
|--------------------------------------------------------------------------
*/
exports.archivoMD =function archivoMD (dirname){
    return (path.extname(dirname) === ".md");
}
/*
|--------------------------------------------------------------------------
  leer archivo
|--------------------------------------------------------------------------
*/
exports.leerArchivo =function leerArchivo (file){
    return fs.readFile(file, 'utf8', function(err, data){
    });
}
