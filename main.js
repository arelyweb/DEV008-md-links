const path = require('path');
const fs = require('fs');
/*
|--------------------------------------------------------------------------
    valida que la ruta sea valida
|--------------------------------------------------------------------------
*/
function validarPath (dirname){
    return (fs.existsSync(dirname)) ? true : false;
}
/*
|--------------------------------------------------------------------------
    valida que la ruta sea absoluta
|--------------------------------------------------------------------------
*/
function validarRuta (dirname){
    return (path.isAbsolute(dirname));
}
/*
|--------------------------------------------------------------------------
    traduce la ruta a absoluta
|--------------------------------------------------------------------------
*/
function transAbsoluta (dirname){
    return (path.resolve(dirname));
}
/*
|--------------------------------------------------------------------------
    obtiene la extesion del archivo 
|--------------------------------------------------------------------------
*/
function tipoExt (dirname){
    return (path.extname(dirname));
}
/*
|--------------------------------------------------------------------------
    recorrer directorio 
|--------------------------------------------------------------------------
*/
function buscarArchivo (dirname){
    return (fs.readdirSync(dirname));
}
/*
|--------------------------------------------------------------------------
  buscar un archivo .MD
|--------------------------------------------------------------------------
*/
function archivoMD (dirname){
    return (path.extname(dirname) === ".md");
}
/*
|--------------------------------------------------------------------------
  leer archivo
|--------------------------------------------------------------------------
*/
// function leerArchivo (file){
//     return new Promise ((reject, resolve)=>{
//         fs.readFile(file,'utf-8', function(error, path){ 
//             if (error) throw error;
//                 fs.readFile(file,'utf-8', function(err, data){ 
//                     console.log(data);
//                 });
//         })
//     })
// }

function leerArchivo (file){
    return  fs.readFileSync(file,'utf8')
        
}


module.exports = { validarPath,
    validarRuta,
    transAbsoluta,
    tipoExt,
    buscarArchivo,
    archivoMD,
    leerArchivo,
};