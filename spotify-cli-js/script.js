// curl --request GET
//   --url https://api.spotify.com/v1/me/top/artists \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
// const clientId = "YOUR_CLIENT_ID";
// const redirectUri = "http://127.0.0.1:8080";

// const scope = "user-read-private user-read-email";
// const authUrl = new URL("https://accounts.spotify.com/authorize");

// // generated in the previous step
// window.localStorage.setItem("code_verifier", codeVerifier);

// const params = {
//   response_type: "code",
//   client_id: clientId,
//   scope,
//   code_challenge_method: "S256",
//   code_challenge: codeChallenge,
//   redirect_uri: redirectUri,
// };

// authUrl.search = new URLSearchParams(params).toString();
// window.location.href = authUrl.toString();

const express = require("express");
const request = require("request");
// const cry = require("crypto");
const crypto = require("crypto");
const querystring = require("node:querystring");
const cors = require("cors");
// var querystring = require('querystring');
const cookieParser = require("cookie-parser");
const { URLSearchParams } = require("node:url");
const https = require("node:https");
const glob = require("require-glob");
const requireGlob = require("require-glob");
const { parse } = require("node:path");
const { error } = require("node:console");
const { search } = require("spotify");
const { emitWarning } = require("node:process");
const { userInfo } = require("node:os");
const { url } = require("node:inspector");
// import * as crypto from "crypto";
// curl --request GET \
//     'https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V' \
//      --header "Authorization: Bearer NgCXRK...MzYjw"

// var client_id = "0f113d0afdd94c0c97b4d22aafb0b91b";

var app = express();
// var redirect_uri = "https://127.0.0.1:8888";

let sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return await crypto.subtle.digest("SHA-256", data);
};

const generateRandomString = (length) => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

function generateCodeVerifier(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

let client_secret = "421f04fdde744394b075ecfd77ff2ef7";
let client_id = "0f113d0afdd94c0c97b4d22aafb0b91b";
function state(num) {
  return generateRandomString(num);
}

let state_s = state(64);

var scope = "user-read-private user-read-email";
var redirect_uri = "http://127.0.0.1:8888/callback";
let authUrl = "https://accounts.spotify.com/authorize?";
const codeVerifier = generateRandomString(64);

const verifier = generateCodeVerifier(128);

async function verifierStore(verifier) {
  return verifier;
}

async function codeChal(code_verifier) {
  const hashed = await sha256(code_verifier);
  const codeChallenge = base64encode(hashed);
  return codeChallenge;
}
async function verifierChallenge(verify_code) {
  let challenge = await generateCodeChallenge(verify_code);
  return challenge;
}
const verify_store = verifierStore(codeVerifier);
// console.log(verify_store);
const challenge_code = verifierChallenge(verify_store);
const codeChallenge = codeChal(verify_store);

const params = {
  response_type: "code",
  client_id: client_id,
  scope: scope,
  code_challenge_method: "S256",
  code_challenge: challenge_code,
  redirect_uri: encodeURI(redirect_uri),
  state: state_s,
};

// show_dialog: false,
const options = {
  response_type: "code",
  state,
};

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
// let bsfe = base64encode();
async function callback_method(code, state) {
  // console.log(code);
  // var code = req.query.code || null;

  // var state = req.query.state || null;
  console.log(state);
  if (state === null) {
    res.redirect(
      "/" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    let response = await tokenFetch(code);
    // res.redirect(response);
    console.log(response.access_token);
    let profile = getProfile(code, response.access_token);
    // console.log(profile.json());
    // res.redirect(profile);
  }
  return code;
}
// console.log(response);
// let profile = getProfile(response);
//   fetch("https://accounts.spotify.com/api/token", {
//     form: {
//       code: code,
//       redirect_uri: redirect_uri,
//       grant_type: "authorization_code",
//     },
//     method: "POST",
//     headers: {
//       "content-type": "application/x-www-form-urlencoded",
//       "Access-Control-Allow-Headers":
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization",

//       Authorization:
//         "Basic " +
//         new Buffer.from(client_id + ":" + client_secret).toString("base64"),
//     },
//     json: true,
//   });
//   let data = await response.json();
//   console.log(data);
// }

// let finalURL = createURL();
// console.log(finalURL);
// localStorage.setItem(stateKey, state);
// let accessToken = "";
// var url = "https://accounts.spotify.com/authorize";
// url += "?response_type=token";
// url += "&client_id=" + encodeURIComponent(client_id);
// url += "&scope=" + encodeURIComponent(scope);
// url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
// url += "&state=" + encodeURIComponent(state);

// app.get("/*", (req, res, err, next) => {
//   console.log(res.status);
// });

app.get("/token", async (req, res, err) => {
  res.send("token");
  let token_t = await token_token(codeChallenge, state);
});

// app.all("/callback*", async (req, res, next) => {
//   res.send("callback");
//   console.log(req.query);
//   // console.log(res);
//   // res.setHeaders("")
//   // console.log(req);
//   console.log("code : " + req.query.code);
//   console.log("state : " + req.query.state);

//   // console.log("verify : " + codeVerifier);
//   // console.log("challenge : " + codeChallenge);
//   // console.log(res);
//   // console.log(req.url);
//   // console.log(req.headers.host + req.url);
//   // console.
//   let code = req.query.code;
//   let state = req.query.state;
//   let token_t = await token_token(code, state);
//   let token_tt = await tokenFetch(code, state);
//   console.log(token_t);
//   console.log(token_tt);
//   // res.redirect("/auth");
//   // let token = await token_token(code, state);
//   // let token = await token_token(code, state);
//   // next();
//   // req.redirect("/auth");
// });

app.all("/callback*", async (req, res) => {
  res.send("callback");
  var code = req.query.code || null;
  var state = req.query.state || null;

  let url = "https://accounts.spotify.com/api/token";
  var authOptions = {
    body: {
      client_id: client_id,
      code: code,
      redirect_uri: redirect_uri,
      code_verifier: verify_store,
      grant_type: "authorization_code",
    },
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };

  let t_token = await fetch(url, authOptions);
  console.log(await t_token.json());

  let at = await tokentoken(code, state);
  console.log(at);

  let p = await myProfile(at);
  console.log(p);
  // let token_t = await token_token(code, state);
  // console.log(token_t);

  // console.log(await tt.json());
  // let rf = await refreshToken(at.access_token, code);

  // Request.post(authOptions, (req, res, err) => {
  //   console.log(req);
  // });
  // request.get(authOptions, (err, res, body) => {
  //   console.log(body);
  // });
});

// console.log(res.json());
// let token_req = await fetch(
//   "https://accounts.spotify.com/api/token",
//   authOptions
// );
// console.log(await token_req.json());

// app.post("/callback*", async (req, res, next) => {
//   // console.log("")
//   res.send("hi");
//   console.log(req);
// });

async function myProfile(access_token) {
  let headers = {
    header: { Authorization: "Bearer " + access_token },
    method: "GET",
    scope: "user-read-private user-read-email",
    json: true,
  };
  let profile = await fetch("https://api.spotify.com/v1/me", headers);
  console.log(await profile.json());
}

async function tokentoken(code, state) {
  if (state === null) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch",
        })
    );
  } else {
    var authOptions = {
      // url: "https://accounts.spotify.com/api/token",
      method: "POST",
      body: new URLSearchParams({
        client_id: client_id,
        code_verifier: verify_store,
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "client_credentials",
      }),
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };
  }
  let token_t = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );
  let at = await token_t.json();
  console.log(at.access_token);
  return at.access_token;
  // let tt = await token_token(code, state);
  // console.log(tt);
  // console.log(await tt);
}

async function refreshToken(access_token, code) {
  var authOptions = {
    // url: "https://accounts.spotify.com/api/token",
    method: "POST",
    body: new URLSearchParams({
      grant_type: "authorization_code",
      // client_id: client_id,
      // code_verifier: verify_store,
      code: code,
      redirect_uri: redirect_uri,
      // grant_type: "refresh_token",
      // refresh_token: access_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    json: true,
  };
  let refreshT = await fetch(
    "https://accounts.spotify.com/api/token",
    authOptions
  );
  console.log(await refreshT.json());
}

async function token_token(code, state) {
  let token_url = "https://accounts.spotify.com/api/token";
  // console.log(token);
  let authCode = code;
  let client_id = "0f113d0afdd94c0c97b4d22aafb0b91b";
  let client_secret = "421f04fdde744394b075ecfd77ff2ef7";

  let tokenReq = {
    method: "POST",
    headers: {
      "content-type":
        "application/x-www-form-urlencoded; application/json; charset=UTF-8",
      // "content-type": "application/json",

      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: {
      // client_id: client_id,
      grant_type: "client_credentials",
      code: code,
      redirect_uri: redirect_uri,
      code_verifier: verify_store,
      // state: state,
      // scope: scope,
    },
    json: true,
  };
  let token_access = await fetch(token_url, tokenReq);
  return token_access;
  // let token_token = await token_access.json();
  console.log();
  // console.log(token_token);
}
// form: {
// client_id: client_id,
// form: {
//   code: code,
//   redirect_uri: redirect_uri,
//   grant_type: "client_credentials",
// },
// json: true,

// },
// res.redirect(tokenReq);
// res.setHeader("Method", "GET");
// res.setHeader("content-type", "applications/json");
// res.redirect("/auth");
// tokenReq.redirect();
// console.log(tokenReq.json());
// console.log(tokenReq.json());
// let profile = await getProfile(code, token.access_token);
// console.log(profile);
// res.redirect(req.headers.host + req.url);
// let call = await callback_method(code, state);
// res.redirect(call);
// res.send("hi");
// let accessToken = await tokenFetch(req.query.code);
// let profile = await getProfile(req.query.code);
// console.log(accessToken);

// req.redirect("/auth");
// res.header("Access-Control-Allow-Methods", "GET, POST");
// console.log(this.window.location);
// res.redirect(profile);
// res.redirect("/login");
// app.post("/callback*", async (req, res, next) => {
// res.redirect(accessToken);
// });
// next();

app.get("/auth", async (req, res) => {
  res.send("auth page");
});

// console.log(accessToken);
// console.log(
//   "AQB7fTJDUa5D0-kuagN146NujZD12trPRm3wxJeqlGZkR6XeO1oTczj36jRXhMiESlU4OD17OrhMPn7ZzgS8tLWHrj-1cUwbCGJB8mO0_G9wevIxfA90mYzFmBoPfC1K7k3J_nBqzZmhbB16pk2CIi70SmWPlLqzrahqaCSOinTpYqwFw6RUgRG_1KPHxRJG-597CLNKSetRSS59PFR2gRaUgQZIH1JfpNr-dKD3PlCiNH_BbNPV11OLyvpxn6"
// );

// app.get("/callback", (res, req, next, err) => {
//   res.send("hi");
// });

app.get("/login", (res, req, next) => {
  // res.send("Hi");

  let redirectURL = authUrl + new URLSearchParams(params).toString();
  console.log("hi - login page : " + redirectURL);
  // console.log(redirectURL);
  let loginReq = new Response(redirectURL);

  req.redirect(redirectURL);
  // req.redirect(302, finalURL);
  console.log("Login Response : ");
  console.log(loginReq);
});
// req.header("Access-Control-Allow-Methods", "GET, POST");
// req.redirect("/profile");
// res.redirect_uri(req.redirect(finalURL));
// console.log("redirect");
// console.log(this.window);1
// console.log(req.href);
// console.log(req.url);

app.post("/login", (res, req, next) => {
  // res.send("hi123");
  Console.LOG("POST");

  // res.header("Access-Control-Allow-Methods", "GET, POST");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // );
  // res.header(
  //   "Authorization",
  //   "Bearer BQDWodnMMpuLeHll8t7M_ihqvrsQinwgUkiGk33_iyq96BEvFe9ia2ePVYxrvV1pcHV5HM3rf2aFARmO5tAliCtg8bDqBi017DlcTkTxK4vxnI27TsUf_0lwSIKpIgvo4KAEVB6BrSg"
  // );
});

// console.log("hi");
// app.all(finalURL, (res, req, next, err) => {
//   // res.redirect(304, finalURL);
//   console.log(window.href);
// });
// // app
//   .use(express.static(__dirname + "/public"))
//   .use(cors())
//   .use(cookieParser());
// app.use("/callback?", (req, res, next) => {
//   // res.send("hi"
//   // next();
// });

// app.get("/login", async function (req, res, next) {
//   // res.send("GET");
//   // res.send("GET");
//   // console.log(req.url);
// res.header("Access-Control-Allow-Methods", "GET, POST");
// res.header(
//   "Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
// );
// res.setHeader(
//   "Authorization",
//   "Bearer BQAxuHXiQBdVxNm8leOE4s3fhCIMxiludf3x7KCyTDATQB-hTjtOvjuU02lQwTeQioC0WvioseXTQHvU4s7y-i-pG4GmpRT1gGI9FkjD5tvTq4Be2oT1-DuaatLmvzptoxpBYq8isvc"
// );
//   // await redirect();
//   // res.redirect(req.url);
//   // const urlParams = new URLSearchParams(finalURL);
//   // console.log(urlParams);
// });

// + querystring.stringify({ code: urlParams.get("code")

// })
// next();
// console.log(req.params(finalURL));
// next("app");
// app.get("/callback*", (req, res, err) => {
//   res.send("yo");
// });
// let myReq = new Request(finalURL);
// console.log(myReq.redirect);
// console.log(myReq);
// // myReq;
// console.log(urlParams.get("code"));
// console.log(req.query.redir);
// req.protocol = "https";
// console.log(req.protocol + "//:" + req.hostname);
// let code = urlParams.get("code");
// console.log(code);
// console.log(req.baseUrl);
// console.log(urlParams);
// console.log(res.window.location);
// console.log(urlParams + " " + req.url);
// next();

// app.use((req, res, next) => {
//   // console.log(code);
//   // console.log(urlParams.get("code"));
//   // console.log(req.query.redir);
//   // res.send("app use");
// });

// app.get(/\/callback*/, async function (req, res, next, err) {
//   res.send("hi callback");
// });

// app.post(/\/callback*/, async function (req, res, next, err) {
//   res.send("hi callback");
// });

// app.get(/.\callback#*/, (res, req, next) => {
//   res.send("hi");
//   console.log("hi");
// });

// res.cookie(
//   "Authorization",
//   "Bearer BQCxvpkyISR3ZVUY4In-k8M8by8zb7CP3RZFsIQ4_NuYjN4VQKN2T5BrjNvu67YSzUyL31NwCCY5sg6hO23OC49PQlavyRaSwhExQSGAXBB_kQ5F4H_A62Ac5kt1Xx2XNLfm7GqeuZ0"
// );
// console.log(finalURL);
// res.redirect(
//   300,
//   "https://accounts.spotify.com/authorize" +
//     querystring.stringify({
//       response_type: "code",
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       state: state,
//     })
// );
// const scope = "user-read-private user-read-email";

// res.header("Access-Control-Allow-Origin", "*");

// next();
// next("got here");
// console.log(req.path);

app.get("/reload", async function (err, req, res, next) {
  res.send("hi");
});

// window.location.href = authUrl.toString();
// const parsedUrl = new URL(res.window.location.href);
// console.log(parsedUrl);
// let authCode = authUrl.toString();
// console.log(authCode);
// const urlParams = new URLSearchParams(req.window.location.search);

// let code = urlParams.get("code");

// getProfile(access_token);
// let data = res.json();
// console.log(data);
// res.json();
//   var scope = "user-read-private user-read-email";
//   var params =
//     "https://accounts.spotify.com/authorize?" +
//     querystring.stringify({
//       response_type: "code",
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri,
//       // port: 8888,
//       state: state,
//     });
//   let data = res.json();
//   console.log(data);
// });
// express.Router.get("/callback*", async function (req, res) {});

// express.Router.get("/callback*", (req, res) => {});

// app.get(this.document.location, async function (req, res) {});
// express.response.write

// var state = req.query.state || null;
// var storedState = req.cookies ? req.cookies[stateKey] : null;
// console.log(URL === require("node:url").URL); // Prints 'true'.
// let params = window.location.pathname;
// res.redirect("https://127.0.0.1:8888");
// let query = req.query;
// console.log(query);
// var code = req.query.code || null;
// const nextParams = { code: "code" };
// console.log(err.code);
// console.log(nextParams);
// res.send("hi");
// var code = res.window.location.hash.substring(1);
// let urls = https.IncomingMessage.url();
// res.send("nice");
// console.log(res.headersSent);
// let redirect = new URL(res.window.location);
// let redirect = console.log(res.window.location.href);
// console.log(redirect);
// let code = location;
// let code = new URLSearchParams();
// console.log(urls);
// console.log(code);
// next();

// let urlParams = new URLSearchParams(res.location);
// // res.send(req.);
// // res.location(urlParams);
// let code = urlParams.params["code"];
// console.log(code);
// const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get("code");
// // let code = req.get("code");
// console.log(code);
// const urlParams = new URLSearchParams(window.location.search);
// let code = urlParams.get("code");
// console.log(code);
// let client_id = "0f113d0afdd94c0c97b4d22aafb0b91b";
// var state = generateRandomString(16);
// // getProfile();
// var scope = "user-read-private user-read-email";
// // res.cookie(
// //   "Authorization",
// //   "Bearer BQCxvpkyISR3ZVUY4In-k8M8by8zb7CP3RZFsIQ4_NuYjN4VQKN2T5BrjNvu67YSzUyL31NwCCY5sg6hO23OC49PQlavyRaSwhExQSGAXBB_kQ5F4H_A62Ac5kt1Xx2XNLfm7GqeuZ0"
// // );
// // res.redirect(
// //   300,
// //   "https://accounts.spotify.com/authorize" +
// //     querystring.stringify({
// //       response_type: "code",
// //       client_id: client_id,
// //       scope: scope,
// //       redirect_uri: redirect_uri,
// //       state: state,
// //     })
// // );
// // const scope = "user-read-private user-read-email";
// const authUrl = new URL("https://accounts.spotify.com/authorize");
// // // generated in the previous step
// const hashed = await sha256(codeVerifier);
// const codeChallenge = base64encode(hashed);
// // // window.localStorage.setItem("code_verifier", codeVerifier);
// const params = {
//   response_type: "code",
//   client_id: client_id,
//   scope,
//   code_challenge_method: "S256",
//   code_challenge: codeChallenge,
//   redirect_uri: "https://127.0.0.1:8888/callback",
//   state,
// };
// res.header("Access-Control-Allow-Orxigin", "*");
// res.header("Access-Control-Allow-Methods", "GET, POST");
// res.header(
//   "Access-Control-Allow-Headers",
//   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
// );
// res.setHeader(
//   "Authorization",
//   "Bearer BQDJ7qCPpymwcIFMSnPYa1C1bltrFbDvWnU3Kotz_trhdb9DjAUjyx78ZdLnAXnmQ_c-s1aWs7gQsJr76k571iDz-XlVRhCFU4rVlxk0IlVaIOdGxh7thKns2fTqgckRthr7Dftamyg"
// );
// res.redirect(
//   authUrl + (authUrl.search = new URLSearchParams(params).toString())
// );

app.use("/profile", async function (req, res) {
  res.send("hello profile");
  let profile = await getProfile(
    callback_method(),
    "BQBSLSV_1YnBwqY84QcbwMbVpD8cbFGsyQX1xsMGx85snxvbI7IzPlvlMWFNV4sjaJ9o0E-QXwEoCjTz3WFshqGq7JGN7oNFlse0k3Zsvq6PTAK5eBvgUjK6N0y6uLIlvP3mZYdY8GE"
  );
  // res.redirect(finalURL);
  console.log(profile);
});

app.get("/callback/profile", async (res, req, err) => {
  res.send("profileback");
});

// app.get("/callback", function (req, res) {
//   var code = req.query.code || null;
//   var state = req.query.state || null;

//   if (state === null) {
//     res.redirect(
//       "/" +
//         querystring.stringify({
//           error: "state_mismatch",
//         })
//     );
//   } else {
//     var authOptions = {
//       url: "https://accounts.spotify.com/api/token",
//       form: {
//         code: code,
//         redirect_uri: redirect_uri,
//         grant_type: "authorization_code",
//       },

//       json: true,
//     };
//   }
// });

// let verifier = generateCodeVerifier(128);
// let challenge = await generateCodeChallenge(verifier);

// let stateAuth = state;

// console.log(code);
// let code =
//   "AQCWOkS6QNzh1IXKOcv0H6kcjX0rb5jGJs59HOzCLb5fhWxmLlf8xVwj6yAzQWxFuQlSyj5SVpKWyDd2ngCZY9HyZcPcRR-f2ZgpTt_4xPLiFZvmd5AqJ8aDOt-zn4Pbqx40gg2bEk5ybGl2xFVjlMAdid5Zd2DjBLw9rThCvYCNHjWQW_qFVYwr8emLCRVPZUvbNg__1mW5Ymb8cGLq_HuFzNoVDvMTyLYzrc1A_AtM2VeUrV0xL_zIIv9ziw"
async function getProfile(auth_code, access_token) {
  var state = generateRandomString(16);
  let code = auth_code;

  var scope = "user-read-private user-read-email";
  // access_token = access_token;
  // let access_token =
  //   "BQCk5GdWTeen6PysbCvY1z1dHdjk10MF15XHrjc7TiwGFXWJi_FZM22WG9r3NG4jgood_GOQ6KnbbL-LBXyIxcDohyqrgmxOXv8bsMSQYwqBYnLzGBGLARAVeS6pxCJLMbTN0SZWQnc";
  let client_id = "0f113d0afdd94c0c97b4d22aafb0b91b";
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + access_token,
      // "WWW-Authenticate": codeChallenge,
    },
    // client_id: client_id,
    // client_id: client_id,
    grant_type: "authentication_code",
    token_type: "Bearer",
    scope,
    code: code,
    // state: state,
    // code: code,
    json: true,
    // redirect_uri: redirect_uri + "/profile",
  });

  // const request = new Request();
  let data = await response.json();
  console.log(response);
  console.log(data);
  // console.log(data);
  return data;
}

// getProfile();
// var scope = "user-read-private user-read-email";

// var state = generateRandomString(16);

// // generated in the previous step

// // window.localStorage.setItem("code_verifier", codeVerifier);

function createURL() {
  authUrl = authUrl + new URLSearchParams(params).toString();
  return authUrl;
}

// const parsedUrl = new URL(window.location.href);
// console.log(parsedUrl);
// console.log(authUrl);
// let access_token = "";
// let urlParams = new URLSearchParams(res.location(authUrl));
// res.send(req.);
// res.location(urlParams);
// let code = urlParams.params("code");
// console.log(code);
// async function getProfile(accessToken) {
// let accessToken = localStorage.getItem('access_token');

// const response = await fetch('https://api.spotify.com/v1/me', {
//   headers: {
//     Authorization: 'Bearer ' + accessToken
//   }
// });

// const data = await response.json();

async function tokenFetch(code, state) {
  // var response = await fetch("https://accounts.spotify.com/api/token", {
  //   headers: {
  //     Authorization: "Basic: " + client_id + ":" + client_secret,
  //   },

  //   json: true,
  // });
  // let accessToken = authProfile();

  // var client_id = "CLIENT_ID";
  // var redirect_uri = "http://127.0.0.1:8888/auth";

  // var state = generateRandomString(16);

  // localStorage.setItem(stateKey, state);
  let client_id = "0f113d0afdd94c0c97b4d22aafb0b91b";
  let client_secret = "421f04fdde744394b075ecfd77ff2ef7";
  let scope = "user-read-private user-read-email";
  // let code = auth_code;
  let stateAuth = state;
  // var url = "https://accounts.spotify.com/api/token";
  // url += "?response_type=token";
  // url += "&client_id=" + encodeURIComponent(client_id);
  // url += "&scope=" + encodeURIComponent(scope);
  // url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  // url += "&state=" + encodeURIComponent(state);
  // url: "https://accounts.spotify.com/api/token",

  let url = "https://accounts.spotify.com/api/token";
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    // form: {
    // client_id: client_id,
    body: new URLSearchParams({
      code: code,
      grant_type: "authorization_code",
      redirect_uri: encodeURI(redirect_uri),
      code_verifier: verifier,
      // state: state,
    }),
    // state: state,
    // scope: scope,

    json: true,
  });

  let access_token = await response.json();
  console.log("token fetch : " + access_token);
  return access_token;
}
// accessToken = access_token.access_token;
// return access_token;
// state: stateAuth,
// json: true,
// console.log(response);
// console.log(access_token.access_token);

// form: {
//   // code,
//   // client_id: client_id,
//   // refresh_token: refreshToken,
//   // redirect_uri: redirect_uri,
// },1
// params: {
//   grant_type: "refresh_token",
//   response_type: "token",
//   redirecturi: redirect_uri,
// },
// code: code,
//   // port: 8888,
//   state: state,
// };

// const body = await fetch(url, response);

// let response = await body.json();

// const data = authOptions.json();
// console.log(data);
app.listen(8888, () => console.log("hello"));
