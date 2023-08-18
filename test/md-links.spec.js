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
    const Path = 'test\\test-links1\\MK1.md';
        const result = main.validarPath(Path);
        expect(result).toBe(true);
  });
  it('deberia de retornar falso cuando la ruta no existe.', () => {
    const Path = '\\test-linxks1\\MK1.md';
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
    const Path = 'C:\\Users\\GILBERTO BULNES\\Documents\\LABORATORIA\\proyectos\\DEV008-md-links\\test\\test-links1\\MK1.md';
    const result = main.validarRutaAbsoluta(Path);
    expect(result).toBe(true);
  });
  it('deberia de retornar falso si la ruta no es absoluta.', () => {
    const Path = 'test\\test-links1\\MK1.md';
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
    const Path = 'test\\test-links1\\MK1.md';
    const result = main.transAbsoluta(Path);
    expect(result).toBe('C:\\Users\\GILBERTO BULNES\\Documents\\LABORATORIA\\proyectos\\DEV008-md-links\\test\\test-links1\\MK1.md');
  });
});
/*
|--------------------------------------------------------------------------
      buscar un archivo .MD
|--------------------------------------------------------------------------
*/
describe('archivoMD', () => {
  it('deberia de retornar verdadero si existe archivo .md.', () => {
    const Path = 'test\\test-links1\\MK1.md';
    const result = main.archivoMD(Path);
    expect(result).toBe(true);
  });
  it('deberia de retornar falso sino existe archivo .md.', () => {
    const Path = 'test\\test-links1\\packagse.json';
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
    const Path = 'test\\test-links2';
    const archivos = ['MK2.md', 'MK3.md'];
 
    jest.spyOn(fs, 'readdirSync').mockReturnValue(archivos);
    const result = main.buscarArchivo(Path);

    expect(result).toStrictEqual(archivos);
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
    const Path = 'test\\test-links1\\MK1.md';
    const archivoContenido = '###Contendio del archivo .md';
    jest.spyOn(fs, 'readFileSync').mockReturnValue(
      archivoContenido
    );
    const result = main.leerArchivo(Path);

    expect(result).toEqual(archivoContenido);
  });
});
/*
|--------------------------------------------------------------------------
    busca links y crea un array de objetos
|--------------------------------------------------------------------------
*/
 describe('arrayLinks', () => {
  it('deberia realizar el conteo de links.', () => {
    jest.resetAllMocks();

  const Path = 'test\\test-links1\\MK1.md';
  
  const mdText = fs.readFileSync(Path, {encoding:'utf-8'});
  const result = main.arrayLinks(mdText,Path);
  expect(result.length).toEqual(1);
  });
});
/*
|--------------------------------------------------------------------------
    recorre directorio de manera recursiva
|--------------------------------------------------------------------------
*/
describe('recorreArray', () => {
  it('deberia recorrer el array de archivos .md del dorectorio de forma recursiva.', () => {
    jest.resetAllMocks();

    const Path = 'test\\test-links2\\';
    const archivos = ['MK2.md', 'MK3.md'];
    
    jest.spyOn(fs, 'readdirSync').mockReturnValue(archivos);

    const result = main.recorreArray(Path,archivos, archivos.length-1,[])
    console.log(result)
    //expect(result).toEqual(archivos);

  });

});