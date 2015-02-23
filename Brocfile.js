var distes6 = require('broccoli-dist-es6-module');

module.exports = distes6('lib', {
  global: 'ec-calendar',
  packageName: 'ec-calendar',
  main: 'index'
});