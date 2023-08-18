const { program } = require('commander');
// const mdLinks = require('./mdLinks');
// const main = require('./main');
// const pc = require('picocolors');

const route = process.argv[2];
program
  .version('0.0.1')
  .option('-v, --validate', 'valida http.')
  .option('-s, --stats', 'estadisticas de los links: total y unique.')
  .option('-v -s , --validate --stats', 'estadisticas de los links: total, unique y broken.')
  .option('-s -v , --stats --validate', 'estadisticas de los links: total, unique y broken.')
  .parse(process.argv);

const options = program.opts();

if (options.stats) {console.log(route) }



