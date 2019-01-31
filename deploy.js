const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()

const config = {
	user: 'dlpuser@dlptest.com',                  
    password: 'puTeT3Yei1IJ4UYT7q0r',          
	host: 'ftp.dlptest.com',
	port: 21,
	localRoot: __dirname + '/deploy/',
	remoteRoot: '/test/',
	include: ['*', '**/*'],     
    // exclude: [''],    
    deleteRemote: false,             
    forcePasv: true                
}

const showData = data => console.log(data)
ftpDeploy.on('uploading', function(data) {
    data.totalFilesCount      
    data.transferredFileCount
    data.filename            
})
ftpDeploy.on('uploaded', showData)
ftpDeploy.on('log', showData)
ftpDeploy.on('upload-error', data => console.log(data.err))

function deploy () {
    return ftpDeploy.deploy(config)
	    .then(res => console.log('Deploy finished:', res))
        .catch(err => console.log(err))
}

module.exports = deploy
