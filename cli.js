const { program } = require('commander');
const mdLinks = require('./mdLinks');
const main = require('./main');
// const pc = require('picocolors');

const route = process.argv[2];

program
  .name('Md Links CLI')
  .description('Md Links lee un archivo .md y muestra en un array los links encontrados.')
  .version('0.1');

program
  .option('-vl, --validate', 'muestra la validacion HTTP de cada link encontrado.')
  .option('-s, --stats', 'muestra el conteo total y los links unicos.')
  .option('-vl -s, --validate --stats', 'muestra el conteo del total, los links unicos y los links invalidos.')
  .option('-s -vl, --stats --validate', 'muestra el conteo del total, los links unicos y los links invalidos.')
program.parse(process.argv);

const options = program.opts();

/*
|--------------------------------------------------------------------------
    solo recibe PATH 
|--------------------------------------------------------------------------
*/
if (!options.validate && !options.stats) {
  mdLinks(route, { validate: false })
  .then(links => {
      links.forEach((element, i) => {
        console.log(element.file+ " " +element.href + " " + element.text)
      });
    })
    .catch(err => { console.log(err) });
}

/*
|--------------------------------------------------------------------------
    recibe PATH y --validate
|--------------------------------------------------------------------------
*/
if (!!options.validate && !options.stats) {
  mdLinks(route, { validate: true })
  .then(links => {
    links.forEach((element) => {
      console.log(element.file+ " " +element.href + " " + element.ok + " " + element.status + " " + element.text)
    });
    })
    .catch(err => { console.log(err) });
}

/*
|--------------------------------------------------------------------------
    recibe PATH y --stats
|--------------------------------------------------------------------------
*/
if (!options.validate && !!options.stats) {
  mdLinks(route, { validate: false })
  .then(links => {
      const conteo = main.obtieneStats(links);
      console.log(conteo);
      // => [{ href, text, file }, ...]
    })
    .catch(err => { console.log(err) });
}

/*
|--------------------------------------------------------------------------
     recibe PATH, --validate y --stats
|--------------------------------------------------------------------------
*/
if (!!options.validate && !!options.stats) {
  mdLinks(route, { validate: true })
  .then(links => {
      const conteo = main.obtieneValidateStats(links);
      console.log(conteo);
      // => [{ href, text, file }, ...]
    })
    .catch(err => { console.log(err) });
}




