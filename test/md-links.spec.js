const path = require('path');
const fs = require('fs');
const main = require('../main');
const axios = require('axios').default;
const mockaxios = require('./mockAxios')

const mock = {
  get: jest.fn(),
};
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
    const Path = '..\\DEV008-md-links\\test\\test-links2';
    const archivos = ['..\\DEV008-md-links\\test\\test-links2/MK2.md', '..\\DEV008-md-links\\test\\test-links2/MK3.md'];
    
    const result = main.buscarArchivo(Path,[]);

    expect(result).toStrictEqual(archivos);

  });
});
/*
|--------------------------------------------------------------------------
      leer archivo
|--------------------------------------------------------------------------
*/
describe('leerArchivo', () => {
  it('deberia de leer el contenido del archivo.', () => {
    const Path = '..\\DEV008-md-links\\test\\MK1.md';
    const archivoContenido =` ## 1. Preámbulo
    Dentro de una comunidad de código abi`;
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
    axios
|--------------------------------------------------------------------------
*/
describe('axiosProm', () => {
  it('deberia de validar via http los liks.', () => {
    mock.get.mockImplementationOnce(() => Promise.resolve({ status: 200, ok: 'OK' }));
    main.axiosProm(mockaxios.arrMock).then((updatedLinks) => {
        expect(updatedLinks).toEqual(mockaxios.arrMockVal);
      });
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
    const archivos = ['..\\DEV008-md-links\\test\\test-links2/MK2.md', '..\\DEV008-md-links\\test\\test-links2/MK3.md'];
    
    const result = main.recorreArray(archivos, archivos.length-1,[]);

    expect(result).toEqual(mockaxios.arrMockRecorre);

  });

});
/*
|--------------------------------------------------------------------------
   conteo de links totales y unicos
|--------------------------------------------------------------------------
*/
describe('obtieneStats', () => {
  it('deberia realizar conteo del total de links y unicos.', () => {
    const result = main.obtieneStats(mockaxios.arrMock);
    expect(result).toStrictEqual(mockaxios.conteo);
  });
});
/*
|--------------------------------------------------------------------------
   conteo de links totales,unicos y rotos
|--------------------------------------------------------------------------
*/
describe('obtieneValidateStats', () => {
  it('deberia realizar conteo del total de links, unicos y rotos', () => {
    const result = main.obtieneValidateStats(mockaxios.arrMock);
    expect(result).toStrictEqual(mockaxios.conteoB);
  });
});