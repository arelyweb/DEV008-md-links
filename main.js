const path = require('path');
const fs = require('fs');
const axios = require('axios').default;
const pc = require('picocolors');


const regex = /(?=\[(!\[.+?\]\(.+?\)|.+?)]\(((?:https?|ftp|file):\/\/[^\)]+)\))/gi;
/*
|--------------------------------------------------------------------------
    valida que la ruta exista
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
function validarRutaAbsoluta (dirname){
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
// function tipoExt (dirname){
//     return (path.extname(dirname));
// }
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
    recorrer directorio 
|--------------------------------------------------------------------------
*/
function buscarArchivo (dirname,filesInDir){
    let stats = fs.statSync(dirname);
    if (stats.isFile()) {
        if (archivoMD(dirname)) {
          filesInDir.push(dirname)
        }
        return 
      }
        let filenames = fs.readdirSync(dirname);
        filenames.forEach((file) => {
            buscarArchivo(dirname + '\\' + file,filesInDir)
        })
    return filesInDir 
}
     

/*
|--------------------------------------------------------------------------
  leer archivo
|--------------------------------------------------------------------------
*/
function leerArchivo (file){
    return  fs.readFileSync(file,{encoding:'utf-8'})      
}
/*
|--------------------------------------------------------------------------
    busca links y crea un array de objetos
|--------------------------------------------------------------------------
*/
function arrayLinks (stringArchivo,rutaValida){
 return [...stringArchivo.matchAll(regex)].map((m) => ({ href: m[2],text: m[1], file: rutaValida}))
}
  /*
|--------------------------------------------------------------------------
    axios
|--------------------------------------------------------------------------
*/
function axiosProm(arrayLin){

    const arrayFinal = arrayLin.map((elem) =>
   axios
   .get(elem.href)
   .then((response) => {
       elem.status = response.status;
       elem.ok = response.statusText;
     return elem;
   })
   .catch((error) => {
       elem.status = 404;
       elem.ok = "error";
     return elem;
   })
    );

   return Promise.all(arrayFinal)
}

/*
|--------------------------------------------------------------------------
    recorre directorio de manera recursiva
|--------------------------------------------------------------------------
*/

  function recorreArray(arrayArchivos,n,resultado){
    //console.trace(arrayArchivos[n]);
    var link = {ruta: "", contenido: ""};
    if(n===0){
        link.ruta = arrayArchivos[n];
        link.contenido = leerArchivo(arrayArchivos[n]);
        resultado.push(link);
        return resultado
    }else{
        link.ruta = arrayArchivos[n];
        link.contenido = leerArchivo(arrayArchivos[n]);
        resultado.push(link);
        return recorreArray(arrayArchivos,n-1,resultado);
    }
}

/*
|--------------------------------------------------------------------------
   conteo de links totales y unicos
|--------------------------------------------------------------------------
*/
function obtieneStats (arrayLinks){
    const totalLinks = arrayLinks.length;
    // Set permite almacenar valores únicos de cualquier tipo
    const uniqueLinks = [...new Set(arrayLinks.map((link) => link.href))];
    const statsLinks = `
  Total: ${totalLinks}
  Uniques: ${uniqueLinks.length}`;

    return statsLinks;
}

/*
|--------------------------------------------------------------------------
   conteo de links totales,unicos y rotos
|--------------------------------------------------------------------------
*/
function obtieneValidateStats (arrayLinks){
    const totalLinks = arrayLinks.length;
    const uniqueLinks = [...new Set(arrayLinks.map((link) => link.href))];
    const oks = arrayLinks.filter((word) => word.ok !== 'OK');
    const statsLinks = `
  Total: ${totalLinks}
  Uniques: ${uniqueLinks.length}
  Broken: ${oks.length}`;

    return statsLinks;
}



module.exports = { validarPath,
    validarRutaAbsoluta,
    transAbsoluta,
    buscarArchivo,
    archivoMD,
    leerArchivo,
    arrayLinks,
    axiosProm,
    recorreArray,
    obtieneStats,
    obtieneValidateStats,
};