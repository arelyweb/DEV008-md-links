// module.exports = () => {
//     // ...
//   };
const main = require('./main');
const pc = require('picocolors');
//obtenemos el path
const argv = process.argv[2];


// if(main.validarPath(argv)){//validamos la ruta 
//     const rutaValida = (main.validarRuta(argv))? argv : main.transAbsoluta(argv);
//     const extArchivo = main.tipoExt(rutaValida);
//     if(extArchivo){
//         console.log(main.leerArchivo(rutaValida));
//     }else{
//         try{
//             const data = main.buscarArchivo(rutaValida);
//             const resultArray = data.filter(word => main.archivoMD(word));
//             if (resultArray.length === 0) { console.log(pc.red("MSG: No exiten archivos compatibles.")) }else{
//                 recorreArray(rutaValida,resultArray, resultArray.length-1);
//             }
          
//           } catch (err) {
//             console.error(err);
//           }
        
//     }


   
// }else{
//     console.log(pc.red('MSG: Ruta Inválida'));
// };

// function recorreArray(rutaValida,array,n){
//     console.trace(array[n]);
//     if (n===0){
//         console.log(main.leerArchivo(rutaValida+'\\'+ array[n]));
//         return (array[n]);
//     } else {
//         console.log(main.leerArchivo(rutaValida+'\\'+ array[n]));
//         return recorreArray(rutaValida,array,n-1);
//     }
// }

// leerArchivo('README.md').then((result)=> {
//     console.log(result)
// })
// .catch(err=>{console.log(err)});


