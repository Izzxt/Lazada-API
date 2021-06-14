const LazadaRequest = require('lazada-open-platform-sdk/lib/LazadaRequest/signature');
const crypto = require('crypto');

const d = new Date();
const time = d.getTime();

const env = {
    app_key: '101736',
    app_secret: '2bSZFKTfwmIaZd56dbrnqVLB1JnEBr1n',
    path: '/auth/token/create',
    timest: time
}

var params = {
    app_key: `${env.app_key}`,
    timestamp: `${env.timest}`,
    sign_method: 'sha256',
    code: '0_101736_0NowvOW8BTW6bQzKu1hnVqNT25402'
}

LazadaRequest.signRequest("101736", "/auth/token/create", params)

const keysortParams = LazadaRequest.keysort(params);

const concatString = LazadaRequest.concatDictionaryKeyValue(keysortParams);

const preSignString = env.path + concatString

const hash = crypto.createHmac('sha256', env.app_secret).update(preSignString).digest('hex')

const signature = hash.toUpperCase();

console.log(signature)
console.log(env.timest)

module.exports = { env, signature }
