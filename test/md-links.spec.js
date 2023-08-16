const path = require('path');
const fs = require('fs');
const main = require('../main');

/*
|--------------------------------------------------------------------------
    valida que la ruta exista
|--------------------------------------------------------------------------
*/
describe('validar que exista Path', () => {

  it('deberia de retornar verdadero cuando la ruta existe.', () => {
    const Path = '..\\DEV008-data-lovers\\README.md';
        const result = main.validarPath(Path);
        expect(result).toBe(true);
  });
  it('deberia de retornar falso cuando la ruta no existe.', () => {
    const Path = '..\\DEV008-data-lovs\\README.md';
    const result = main.validarPath(Path);
    expect(result).toBe(false);
  });
});
/*
|--------------------------------------------------------------------------
    valida que la ruta sea absoluta
|--------------------------------------------------------------------------
*/
describe('validar si la es ruta es absoluta', () => {
  it('deberia de retornar verdadero si la ruta es absoluta.', () => {
    const Path = 'C:\\Users\\GILBERTO BULNES\\Documents\\LABORATORIA\\proyectos\\DEV008-social-network\\README.md';
    const result = main.validarRutaAbsoluta(Path);
    expect(result).toBe(true);
  });
  it('deberia de retornar falso si la ruta no es absoluta.', () => {
    const Path = '..\\DEV008-data-lovs\\README.md';
    const result = main.validarRutaAbsoluta(Path);
    expect(result).toBe(false);
  });
});
/*
|--------------------------------------------------------------------------
     traduce la ruta a absoluta
|--------------------------------------------------------------------------
*/
describe(' traduce la ruta a absoluta', () => {
  it('deberia de traducir una ruta relativa a ruta absoluta.', () => {
    const Path = '..\\DEV008-data-lovers\\README.md';
    const result = main.transAbsoluta(Path);
    expect(result).toBe('C:\\Users\\GILBERTO BULNES\\Documents\\LABORATORIA\\proyectos\\DEV008-data-lovers\\README.md');
  });
});
/*
|--------------------------------------------------------------------------
      buscar un archivo .MD
|--------------------------------------------------------------------------
*/
describe('archivoMD', () => {
  it('deberia de retornar verdadero si existe archivo .md.', () => {
    const Path = '..\\DEV008-data-lovers\\README.md';
    const result = main.archivoMD(Path);
    expect(result).toBe(true);
  });
  it('deberia de retornar falso si existe archivo .md.', () => {
    const Path = '..\\DEV008-data-lovers\\package.json';
    const result = main.archivoMD(Path);
    expect(result).toBe(false);
  });
});
/*
|--------------------------------------------------------------------------
    recorrer directorio 
|--------------------------------------------------------------------------
*/
describe('buscarArchivo', () => {
  it('deberia retornar un array de archivos dentro del directorio.', () => {
    const Path = '..\\DEV008-data-loves\\';
    const files = ['eslintignore', 'EXTRA.md', 'img', 'package.json'];
 
    jest.spyOn(fs, 'readdirSync').mockReturnValue(files);
    const result = main.buscarArchivo(Path);

    expect(result).toStrictEqual(files);
    fs.readdirSync.mockRestore();
  });
});
/*
|--------------------------------------------------------------------------
      leer archivo
|--------------------------------------------------------------------------
*/
describe('leerArchivo', () => {
  it('deberia de leer el contenido del archivo.', () => {
    const Path = '..\\DEV008-data-loves\\read-1.md';
    const FileContent = '###Contendio del archivo .md';
    jest.spyOn(fs, 'readFileSync').mockReturnValue(
      FileContent
    );
    const result = main.leerArchivo(Path);
    expect(result).toEqual(FileContent);
  });
});
/*
|--------------------------------------------------------------------------
    busca links y crea un array de objetos
|--------------------------------------------------------------------------
*/
// describe('validarPath', () => {
//   it('deberia de validar que la ruta exista.', () => {
//   });
// });
/*
|--------------------------------------------------------------------------
    traduce la ruta en absoluta
|--------------------------------------------------------------------------
*/
// describe('validarPath', () => {
//   it('deberia de validar que la ruta exista.', () => {
//   });
// });