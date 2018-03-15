const Asave = require('asave')

let asave = new Asave({
  path: './logs/',
  format: 'csv'
})

module.exports = asave
