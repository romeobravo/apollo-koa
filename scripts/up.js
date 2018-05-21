const fs = require('fs')
const path = require('path')
const config = require('../up.config')
const environment = require('dotenv').config().parsed

const up = JSON.stringify(Object.assign({}, config, { environment }))
const fileName = 'up.json'
fs.writeFile(path.resolve(process.cwd(), fileName), up, 'utf8', () => {
  console.log(`GENERATED ${fileName}`)
})
