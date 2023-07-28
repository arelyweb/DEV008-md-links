const main = require('./lib/main');
import msg from 'chalk';

//obtenemos el path
const argv = process.argv[2];


if(main.validarPath(argv)){//validamos la ruta 
   console.log(msg.green('Ruta Válida'));
}else{
    console.log(msg.red('Ruta Inválida'));
};





