// module.exports = () => {
//     // ...
//   };
const main = require('./main');
const pc = require('picocolors');
//obtenemos el path
const argv = process.argv[2];


if(main.validarPath(argv)){//validamos la ruta 
    const rutaValida = (main.validarRuta(argv))? argv : main.transAbsoluta(argv);
    const extArchivo = main.tipoExt(rutaValida);
    //console.log(extArchivo)
    if(extArchivo){
        main.leerArchivo(rutaValida).then((result)=>
                    { 
                        console.log(result)
                    }).catch(err=>
                        {
                            console.log(err)
                        })
    }else{
        try{
            const data = main.buscarArchivo(rutaValida);
            const resultArray = data.filter(word => main.archivoMD(word));
            if (resultArray.length === 0) { console.log(pc.red("MSG: No exiten archivos compatibles.")) }else{
                resultArray.forEach(element => 
                    console.log(element)
                    // main.leerArchivo(rutaValida+'\\'+ element).then((result)=>
                    // {
                    //     console.log(result)
                    // }
                    // ).catch(err=>
                    //     {
                    //         console.log((err))
                    //     })
                );
            }
          
          } catch (err) {
            console.error(err);
          }
        
    }


   
}else{
    console.log(pc.red('MSG: Ruta Inválida'));
};


// leerArchivo('README.md').then((result)=> {
//     console.log(result)
// })
// .catch(err=>{console.log(err)});


