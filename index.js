const main = require('./lib/main');

//obtenemos el path
const argv = process.argv[2];


if(main.validarPath(argv)){//validamos la ruta 
    const rutaValida = (main.validarRuta(argv))? argv : main.transAbsoluta(argv);
    const extArchivo = main.tipoExt(rutaValida);
    //console.log(extArchivo)
    if(extArchivo){
        console.log("MSG: Ruta con archivo.")
    }else{
        try {
            const data = main.buscarArchivo(rutaValida);
            const resultArray = data.filter(word => main.archivoMD(word));
            if (resultArray.length === 0) { console.log("MSG: No exiten archivos compatibles.") }else{
                resultArray.forEach(element =>  console.log(main.leerArchivo(element)));
               ;
            }
          
          } catch (err) {
            console.error(err);
          }
        
    }


   
}else{
    console.log('Ruta Inválida');
};





