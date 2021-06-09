const crypto = require("crypto");

const d = new Date();
const time = Math.floor(d.getTime() / 1000.0);

const env = {
    host: "https://auth.lazada.com/rest",
    redirect: "https://zapier.com/dashboard/auth/oauth/return/App138396CLIAPI/",
    timest: time,
    app_key: 101736,
    app_secret:
        "2bSZFKTfwmIaZd56dbrnqVLB1JnEBr1n",
};

const url = {
    token: "/auth/token/create",
    params: `app_key101736timestamp${env.timest}sign_methodsha256sign`
};

// const authString = `${env.partner_id}${url.auth}${env.timest}`;
const tokenString = `${url.token}${url.params}`;
// const r_tokenString = `${env.partner_id}${url.r_token}${env.timest}`;

// const authSign = crypto
//     .createHmac("sha256", env.partner_key)
//     .update(authString)
//     .digest()
//     .toString("hex");

const tokenSign = crypto
    .createHmac("sha256", env.app_key)
    .update(tokenString)
    .digest()
    .toString("hex");

// const r_tokenSign = crypto
//     .createHmac("sha256", env.partner_key)
//     .update(r_tokenString, "utf-8")
//     .digest()
//     .toString("hex");

// console.log(
//     "\n" +
//     env.host +
//     url.auth +
//     "?partner_id=" +
//     env.partner_id +
//     "&timestamp=" +
//     env.timest +
//     "&sign=" +
//     authSign +
//     "&redirect=" +
//     env.redirect
// );

console.log(
    "\n" +
    env.host +
    url.token +
    "?partner_id=" +
    env.partner_id +
    "&timestamp=" +
    env.timest +
    "&sign=" +
    tokenSign +
    "&redirect=" +
    env.redirect +
    "\n"
);

// console.log(
//     env.host +
//     url.r_token +
//     "?partner_id=" +
//     env.partner_id +
//     "&timestamp=" +
//     env.timest +
//     "&sign=" +
//     r_tokenSign +
//     "&redirect=" +
//     env.redirect +
//     "\n"
// );

module.exports = { authSign, tokenSign, r_tokenSign, env };