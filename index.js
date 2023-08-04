//aqui debo de importar las funciones q tengo en main.js
const main = require('./main');
const pc = require('picocolors');

const mdLinks = (path,option) =>{
    return new Promise((resolve,reject)=>{
        
        if(main.validarPath(path)){//validamos la ruta 
            const rutaValida = (main.validarRuta(path))? argv : main.transAbsoluta(path);
            const extArchivo = main.tipoExt(rutaValida);
            if(extArchivo){
                resolve({
                    error: false,
                    value:  console.log(main.leerArchivo(rutaValida)),
                  });    
            }else{
                try{
                    const data = main.buscarArchivo(rutaValida);
                    const resultArray = data.filter(word => main.archivoMD(word));
                    if (resultArray.length === 0) { 
                        console.log(pc.red("MSG: No exiten archivos compatibles.")) 
                        reject(new Error('Something is not right!'));
                    }else{
                        recorreArray(rutaValida,resultArray, resultArray.length-1);
                    }
                  
                  } catch (err) {
                    console.error(err);
                  }      
            } 
        }else{
            console.log(pc.red('MSG: Ruta Inválida'));
            reject(new Error('Something is not right!')); 
        };
    })
}
module.exports = () => {
    mdLinks;
  };

  mdLinks('..\\DEV008-social-network\\README.md')
    .then(links => {
        // => [{ href, text, file }, ...]
      })
      .catch(console.error);