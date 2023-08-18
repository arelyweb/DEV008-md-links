//aqui debo de importar las funciones q tengo en main.js
const main = require('./main');
const pc = require('picocolors');

let arrayFinal, arrayFinalArchivo;

const mdLinks =  (path,option) =>{
    return new Promise((resolve,reject)=>{
        if(main.validarPath(path)){//validamos la ruta 
            const rutaValida = (main.validarRutaAbsoluta(path))? path : main.transAbsoluta(path);
            const extArchivo = main.archivoMD(rutaValida);
            if(extArchivo){
              const contenidoArchivo = main.leerArchivo(rutaValida);
              const  arrayLinks = main.arrayLinks(contenidoArchivo,rutaValida)
                if(option && option.validate === true){
                    arrayFinal = arrayLinks.map((element) =>main.axiosProm(element));
                  Promise.all(arrayFinal)
                    .then((updatedLinks) => {
                      resolve(updatedLinks);
                    })
                    .catch(err =>{
                      reject(pc.red("MSG: La ruta no contiene Links, "+ err.response));
                    })

                }else {
                  resolve(arrayLinks);
                }

            }else{
                try{
                    const data = main.buscarArchivo(rutaValida);
                    const arrayArchivos = data.filter(word => main.archivoMD(word));
                    if (arrayArchivos.length === 0) { 
                        reject(pc.red("MSG: No exiten archivos compatibles."));
                    }else{
                        const linksArchivo = main.recorreArray(rutaValida,arrayArchivos, arrayArchivos.length-1,[]).map((element) =>main.arrayLinks(element,rutaValida) );
                      
                        if(option && option.validate === true){
                          arrayFinalArchivo = linksArchivo.map(element =>{
                            return element.map(item =>main.axiosProm(item));
                          });
                          arrayFinalArchivo.forEach(element => {
                            Promise.all(element)
                            .then((updatedLinks) => {
                              resolve(updatedLinks);
                            })
                            .catch(err =>{
                              reject(pc.red("MSG: "+err));
                            })
                          });
                        
                      }else {
                        resolve(linksArchivo);
                      }
                      
                    }                 
                  } catch  {
                    reject(pc.red('MSG: No corresponde a un archivo válido')); 
                  }      
            } 
        }else{
            reject(pc.red('MSG: Ruta Inválida')); 
        };
    })
}
module.exports =mdLinks;



      //DEV008-card-validation
      //DEV008-data-lovers
      //DEV008-md-links
      //, { validate: true }
