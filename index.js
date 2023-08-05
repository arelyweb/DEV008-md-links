//aqui debo de importar las funciones q tengo en main.js
const main = require('./main');
const pc = require('picocolors');

const mdLinks = (path,option) =>{
    return new Promise((resolve,reject)=>{
        
        if(main.validarPath(path)){//validamos la ruta 
            const rutaValida = (main.validarRuta(path))? argv : main.transAbsoluta(path);
            const extArchivo = main.tipoExt(rutaValida);
            if(extArchivo){
                const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
                const contenidoArchivo = main.leerArchivo(rutaValida);
                const arrayLinks = contenidoArchivo.match(regex);   
                
                if(arrayLinks){
                    resolve(arrayLinks);    
                }else{
                    reject(pc.red("MSG: La ruta no contiene Links."));
                }
                
              
            }else{
                try{
                    const data = main.buscarArchivo(rutaValida);
                    const resultArray = data.filter(word => main.archivoMD(word));
                    if (resultArray.length === 0) { 
                        reject(pc.red("MSG: No exiten archivos compatibles."));
                    }else{
                        recorreArray(rutaValida,resultArray, resultArray.length-1);
                    }
                  
                  } catch (err) {
                    reject(pc.red(err)); 
                  }      
            } 
        }else{
            reject(pc.red('MSG: Ruta Inválida')); 
        };
    })
}
module.exports = () => {
    mdLinks;
  };

  mdLinks('..\\DEV008-card-validation\\README.md')
    .then(links => {
        console.log(links);
        // => [{ href, text, file }, ...]
      })
      .catch(err => { console.log(err) });

      //DEV008-card-validation
      //DEV008-data-lovers