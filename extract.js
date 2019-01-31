const fs = require('fs')
const unzip = require('unzip')
const path = `${__dirname}/zip/output`

function extractFile () {
    return fs.createReadStream('./zip/extract-me.zip')
            .pipe(unzip.Extract({ path })
            .on('error', err => console.log(err))
            .on('close', () => console.log('extracted'))
        )
}

module.exports = extractFile