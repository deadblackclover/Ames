const asave = require('asave');

let Asave = new asave({
  path: './logs/',
  format: 'csv'
});

module.exports = Asave;
