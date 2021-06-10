const CryptoJS = require("crypto-js");

const d = new Date();
const time = d.getTime();

const env = {
    app_key: '101736',
    path: '/auth/token/create',
    timest: time
}

// var concatString = string.app_key.concat(string.timest, string.sign_method);

exports.encryptMessage = (path) =>
    new Promise((resolve, reject) => {
    const encryptMessage = CryptoJS.HmacSHA256(path, env.app_key).toString(
        CryptoJS.enc.Hex,
    );

    let sign = encryptMessage.toUpperCase();

    return resolve(sign);
});

let signature = this.encryptMessage(env.path);

console.log(signature);

module.exports = { env, signature };