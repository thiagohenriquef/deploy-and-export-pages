const extract = require('./extract')
const deploy = require('./deploy')

console.log('hello')
console.log(...process.argv)

if (!process.argv[2]) {
    console.log('do some task node extract or deploy')
    process.exit(1)
}

if (process.argv[2] == 'extract') {
    extract()
}

if (process.argv[2] == 'deploy') {
    deploy()
}