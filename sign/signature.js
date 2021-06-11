const CryptoJS = require("crypto-js");

const d = new Date();
const time = d.getTime();

const env = {
    app_key: '101736',
    app_secret: '2bSZFKTfwmIaZd56dbrnqVLB1JnEBr1n',
    path: '/auth/token/create',
    timest: time
}

const string = [
    `app_key${env.app_key}`,
    `timestamp${env.timest}`,
    'sign_methodsha256'
]

var concatString = string[0].concat(string[1], string[2]);

exports.encryptMessage = (path) =>
    new Promise((resolve, reject) => {
        const encryptMessage = CryptoJS.HmacSHA256(path, env.app_key).toString(
            CryptoJS.enc.Hex,
        );

        let sign = encryptMessage.toUpperCase();

        return resolve(sign);
    });

let signature = this.encryptMessage(`${env.path}${concatString}`);

console.log(signature);

module.exports = { env, signature };