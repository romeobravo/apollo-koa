const fs = require('fs')
const path = require('path')

const fileName = 'up.json'
fs.unlink(path.resolve(process.cwd(), fileName), () => {
  console.log(`REMOVED ${fileName}`)
})
