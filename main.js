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
function buscarArchivo (dirname){
    return (fs.readdirSync(dirname));
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
function axiosProm(element){
    return axios
    .get(element.href)
    .then((response) => {
      element.status = response.status;
      element.ok = response.statusText;
      return element;
    })
    .catch((error) => {
      element.status = error.response;
      element.ok = "error";
      return element;
    })
}
/*
|--------------------------------------------------------------------------
    recorre directorio de manera recursiva
|--------------------------------------------------------------------------
*/
  function recorreArray(rutaValida,arrayArchivos,n,resultado){
    //console.trace(array[n]);
    if (n===0){
        resultado.push(resultado+(leerArchivo(rutaValida+'\\'+ arrayArchivos[n])))  
        return resultado;
    } else {
        resultado.push(resultado+(leerArchivo(rutaValida+'\\'+ arrayArchivos[n])))  
        return recorreArray(rutaValida,arrayArchivos,n-1,resultado);
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
    Total: ${pc.green(totalLinks)} 
    Uniques: ${pc.blue(uniqueLinks.length)}`;

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
    Total: ${pc.green(totalLinks)} 
    Uniques: ${pc.blue(uniqueLinks.length)}
    Broken: ${pc.red(oks.length)}`;

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