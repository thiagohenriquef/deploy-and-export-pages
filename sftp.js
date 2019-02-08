let Client = require('ssh2-sftp-client');
let sftp = new Client();
const fs = require('fs');

const key = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQCfh1M0pGlIgozQ/+Pb6DB9GJHETBfJa6QYN9jn87+FXZn3UsmS
RPEjNNKg7pT6xPz0TJMIDP42i8A4d8By8vW/hfZRrhB0Ht/xvpLdJaCpxr/7dH3l
DXwhQwdICgASEG6Qqh+JRpAWmWoEpv2qcS/UcwUNvEdpXDSlcxuWvLdMJQIDAQAB
AoGAdqJrZS2TQiIb2F1DtUjxrkX0OPehhN+ws3Xsr2ocFnDqS/vb/ROaA+WHcbib
P/X4azD68rS+5A9/jj639oPp7iwRFhLYfU2PbqWhNAJpSmMmFBhMUxuSC0Slena1
vTntmjeJzW3iFytr3Jl5ulIkbmXJgPmP+f1v56KLKaWpnOECQQDVIa4b+jNo4Xi1
wcY7krgJz+SU6YrBTeAVpNSLQxkBbs2Z4/MupKYDgnBDjZLREHp2u7fz6FiSCA4e
w8MdeKR9AkEAv52VuD1M6aJx19t3J+ybSCWya0hsTehz2f6LZ3/OREh+vwwUyjAQ
2PR24Ii2cj8wwDOYcbPMiMIA2Sco162eyQJAF6OtsRK2QwrHHbnJZ/AlE4mIe+/P
YRNnKF9o561gh6UnjssWvPSsKTV9iDCauS+Ptb2qcJYzxLa6AjWKXal07QJAX0zu
EQMUBMNRYa16lvW7yWdOVMNhcmIhdJOAHArZuOZhe31zvZeoWW9EzKnSLAI3qfA/
apWlLYNnzpkGXDay2QJAPP4LjvpKuqqRyMnMumoTr5SuMV+SpyW4jG/WqHsX1yPj
AifgSdSverwmQw4YA66oJX/Noktmzkp47fxO8rHWcQ==
-----END RSA PRIVATE KEY-----`

function publish () {
    const readdirAsync = (path) => {
        return new Promise(function (resolve, reject) {
          fs.readdir(path, function (error, result) {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });
      }

    const config = {
        host: '127.0.0.1',
        port: '22',
        username: 'sftpuser',
        password: 'sftp',
        privateKey: key
    }

    sftp.connect(config)
    .then(async () => await readdirAsync('/home/thiago/Downloads'))
    .then((data) => {
        const files = data.map(async file => {
            console.log(`uploading file -> ${file}`)
            const stream = await sftp.put(`/home/thiago/Downloads/${file}`, `/thiago/testeftp/${file}`);
            return stream
        });
    return files
    })
    .then((files) => Promise.all(files))
    .then(results => {
        console.log('results', results)
        console.log('all files have been uploaded');
        sftp.end()
    })
    .catch((err) => {
        console.log(err, 'catch error');
        sftp.end()
    })
}

publish()