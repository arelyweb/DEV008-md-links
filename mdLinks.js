//aqui debo de importar las funciones q tengo en main.js
const main = require('./main');
const pc = require('picocolors');

let arrayFinalArchivo;

const mdLinks =  (path,option) =>{
    return new Promise((resolve,reject)=>{
        if(main.validarPath(path)){//validamos la ruta 
            const rutaValida = (main.validarRutaAbsoluta(path))? path : main.transAbsoluta(path);
            const extArchivo = main.archivoMD(rutaValida);
            if(extArchivo){
              const contenidoArchivo = main.leerArchivo(rutaValida);
              const  arrayLinks = main.arrayLinks(contenidoArchivo,rutaValida)
                if(option && option.validate === true){
                    main.axiosProm(arrayLinks).then((updatedLinks) => {
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
                    const data = main.buscarArchivo(rutaValida,[]);
                    if (data.length === 0) { 
                        reject(pc.red("MSG: No exiten archivos compatibles."));
                    }else{
                         const linksArchivo = main.recorreArray(data, data.length-1,[]).map((element,i) =>main.arrayLinks(element,data[i]) );
                        if(option && option.validate === true){

                            arrayFinalArchivo = linksArchivo.map(element =>{
                              return main.axiosProm(element).then((updatedLinks) => {
                                resolve(updatedLinks);
                              }).catch(err =>{
                                    reject(pc.red("MSG: "+err));
                                  });
                            });
                        
                        }else {
                          resolve(linksArchivo);
                        }
                    }                 
                  } catch (err) {
                    reject(pc.red('MSG:' + err)); 
                  }      
            } 
        }else{
            reject(pc.red('MSG: Ruta Inválida')); 
        };
    })
}
module.exports =mdLinks;