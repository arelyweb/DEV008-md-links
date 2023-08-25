
const arrMock =[
  {
    href: 'https://nodejs.org/',
    text: 'Node.js',
    file: 'C:\\Users\\GILBERTO BULNES\\Documents\\LABORATORIA\\proyectos\\DEV008-md-links\\test\\test-links1\\MK1.md',
  }
]

const arrMockVal =[
    {
      href: 'https://nodejs.org/',
      text: 'Node.js',
      file: 'C:\\Users\\GILBERTO BULNES\\Documents\\LABORATORIA\\proyectos\\DEV008-md-links\\test\\test-links1\\MK1.md',
      status: 200,
      ok: 'OK'
    }
  ]

  const conteo =`
  Total: 1
  Uniques: 1`;

    const conteoB =`
  Total: 1
  Uniques: 1
  Broken: 1`;

  const arrMockRecorre =[
    '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript\r\n' +
      'construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).\r\n',
    '[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript\r\n' +
      'construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).\r\n' +
      '\r\n' +
      'algunas estadísticas.\r\n' +
      '\r\n' +
      '![md-links](https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)'
  ];

module.exports = {
    arrMock,
    arrMockVal,
    conteo,
    conteoB,
    arrMockRecorre,
}