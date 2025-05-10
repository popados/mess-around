import data from "./leagueData.js";
import CONFIG from "./config.js";

let idArr = [];
let summArr = [];
let playerID = [];
let summURL = [];
let match_id = [];
let riotName = [];
let partArrTwo = [];

const league_data = data;

let API = CONFIG[0].keyAPI;
let URI = CONFIG[0].URI;
let URI_AMERICAS = CONFIG[0].URI_AMERICAS;

let URL_RANK = CONFIG[0].URL_RANK;
let URL_ACCOUNT = CONFIG[0].ACCOUNT;
let URL_SUMMONER = CONFIG[0].URL_SUMMONER;
let URL_MATCH = CONFIG[0].URL_MATCH;
let URL_MATCH_NUM = CONFIG[0].URL_MATCH_NUM;
let URL_MATCH_ID = CONFIG[0].URL_MATCH_ID;
let PUUID = CONFIG[0].PUUID;
let URL_ID = CONFIG[0].URL_ID;
// let PUUID =

// let item_card = document.createElement("div");
// let item_zero_img = document.createElement("img");
// let item_one_img = document.createElement("img");
// let item_two_img = document.createElement("img");
// let item_three_img = document.createElement("img");
// let item_four_img = document.createElement("img");
// let item_five_img = document.createElement("img");
// let item_six_img = document.createElement("img");

// let summArr = await request;
// summonerIdconcat();
async function request(url) {
  console.log("fetched");
  return (await fetch(url)).json();
}

for (let index = 0; index < league_data.length; index++) {
  const element = league_data[index];
  idArr.push(element.summonerId);
  //   console.log(element);
}

console.log(league_data);

let data_two = [];
let data_three = [];

let puuid_url = await request(
  URI +
    URL_SUMMONER +
    "my_tPSbfUsA-qG58girocNJUwu2bFBZU5ubsenAZjfGNGdqQ/" +
    "?" +
    API
);

console.log(puuid_url);
console.log(
  await request(
    URI +
      URL_SUMMONER +
      "my_tPSbfUsA-qG58girocNJUwu2bFBZU5ubsenAZjfGNGdqQ/" +
      "?" +
      API
  )
);

//https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/my_tPSbfUsA-qG58girocNJUwu2bFBZU5ubsenAZjfGNGdqQ?api_key=RGAPI-6659ad7b-32ee-46a2-81d6-a7ca8a6000a8

// https://na1.api.riotgames.com/lol/summoner/v4/summoners/my_tPSbfUsA-qG58girocNJUwu2bFBZU5ubsenAZjfGNGdqQ?api_key=RGAPI-6659ad7b-32ee-46a2-81d6-a7ca8a6000a8
let url =
  URI +
  URL_SUMMONER +
  "my_tPSbfUsA-qG58girocNJUwu2bFBZU5ubsenAZjfGNGdqQ/" +
  "?" +
  API;
// let puuid_obj = summoner_url(puuid_url.puuid);
// console.log(puuid_obj);

//https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/Y8kwBfveZbbnJdUNVW6vOlO843Xg3iHKI5wV5zzwFUv0gOqSEnqA8w28ZwAwbvrmvNcpZMHiGepCNA?api_key=RGAPI-6659ad7b-32ee-46a2-81d6-a7ca8a6000a8

//https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5212857128?api_key=RGAPI-632917ad-0d6a-4fba-b7a4-4a73d1ee10aa

// https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/NA1_5212857128?api_key=RGAPI-44fb9d98-1e45-4fee-9460-2d7d02470a02

//https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/Y8kwBfveZbbnJdUNVW6vOlO843Xg3iHKI5wV5zzwFUv0gOqSEnqA8w28ZwAwbvrmvNcpZMHiGepCNA/ids?start=0&count=20&api_key=RGAPI-6659ad7b-32ee-46a2-81d6-a7ca8a6000a8

let match_url =
  URI_AMERICAS +
  URL_MATCH +
  PUUID +
  puuid_url.puuid +
  URL_MATCH_NUM +
  "&" +
  API;
let match_obj = summoner_url(match_url);
console.log(match_obj);
let dtmatches = await request(url);
async function summoner_url(data_arr) {
  let data_a = await request(data_arr);
  for (let index_two = 0; index_two < 1; index_two++) {
    const element = data_a[index_two];
    // console.log(data);
    console.log(element + ` ${index_two}`);
    // data_two.push(await request(summURL[index_two]));
  }
  return data_a;
  //   return data_two;
}
// for (let i = 0; i < 1; i++) {
//   const sumID = await request(summURL[i]);
//   summArr.push(sumID);
//   console.log(summArr);

//   playerID.push(summArr[i].puuid);
// }

summURL.push(URI + URL_SUMMONER + PUUID + dtmatches.puuid + "?" + API);
let dtdata = await request(summURL);
let matches = await request(match_url);
console.log(matches);
let gameDataURL = URI_AMERICAS + URL_MATCH + matches[0] + "?" + API;
//https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5212857128?api_key=RGAPI-6659ad7b-32ee-46a2-81d6-a7ca8a6000a8

// console.log(matches.matches[0]);
// let data_two = await request(summURL);

console.log(data_three);

// player_match.append(team_one_card);
// player_match.append(team_two_card);
// team_one_card.append(player_card);
// team_two_card.append(player_card);

// let img_tag = document.createElement("img");
let gameData = await request(gameDataURL);

console.log(gameData);
printText(gameData);
// profileText(gameData);
// console.log(profileText(gameDataURL));
// player_match.append(player_card);

function printText(data_obj) {
  let player_match = document.getElementById("match-card");
  let player_card = document.createElement("div");
  let team_two_card = document.createElement("div");
  let team_one_card = document.createElement("div");

  player_match.append(team_one_card);
  // player_match.append(team_one_card);
  player_match.append(team_two_card);
  // let team_names_plate = document.createElement("p");
  // let KDA_plate = document.createElement("p");
  // player_card.append(team_one_card);
  // player_card.append(team_two_card);

  // team_one_card.append(player_card);
  // team_two_card.append(player_card);
  // player_card.append(item_card);

  // console.log(data_obj[0]);
  // player_match.append(player_card);
  // player_card.setAttribute("id", "player");
  //   team_one_card.append(player_card);

  //   player_match.appendChild(player_card);
  for (let u = 0; u < data_obj.info.participants.length; u++) {
    let data = data_obj.info.participants[u];
    console.log(data_obj.info.participants[u].riotIdGameName);
    let item_card = document.createElement("div");
    let img_tag = document.createElement("img");

    let item_zero_img = document.createElement("img");
    let item_one_img = document.createElement("img");
    let item_two_img = document.createElement("img");
    let item_three_img = document.createElement("img");
    let item_four_img = document.createElement("img");
    let item_five_img = document.createElement("img");
    let item_six_img = document.createElement("img");
    item_card.setAttribute("class", "items-wrapper");

    // team_one_card.append(player_card);
    // player_card
    // player_card.append(summoner_names_plate);
    // player_card.append(team_one_card);
    // player_card.appendChild(team_one_card);
    // player_card.append
    // player_card.append(summoner_names_plate);
    if (data.teamId == 100) {
      let team_one_names = document.createElement("p");
      let team_one_div = document.createElement("div");
      let champ_splash = document.createElement("div");
      let items = document.createElement("div");
      // let items;

      console.log(data.teamId);
      //   console.log(summoner_names_plate);
      team_one_card.append(team_one_div);
      team_one_div.append(team_one_names);
      team_one_div.setAttribute("class", "player");
      // player_card.append(team_one_card); // team_one_card.append(summoner_names_plate);
      // player_card.append(team_one_card);
      team_one_names.append(data.riotIdGameName + " | " + data.championName);
      team_one_div.append(item_card);
      item_card.append(champ_splash);
      item_card.append(items);
      champ_splash.append(img_tag);

      img_tag.src =
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
        data.championName +
        "_0.jpg";

      img_tag.width = 300;
      img_tag.src =
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
        data.championName +
        "_0.jpg";

      item_zero_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item0 +
        ".png";

      item_one_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item1 +
        ".png";

      item_two_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item2 +
        ".png";

      item_three_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item3 +
        ".png";

      item_four_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item4 +
        ".png";

      item_five_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item5 +
        ".png";

      item_six_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item6 +
        ".png";

      items.append(item_zero_img);
      items.append(item_one_img);
      items.append(item_two_img);
      items.append(item_three_img);
      items.append(item_four_img);
      items.append(item_five_img);
      items.append(item_six_img);

      // player_card.append("p");

      // player_card.appendChild(team_one_card);
      //   player_card.append(summoner_names_plate);
      //   player_card.append(team_names_plate);
      //   player_card.append(KDA_plate);
      // team_names_plate.append(obj.info.participants[u].teamId);
    } else if (data.teamId == 200) {
      let team_two_names = document.createElement("p");
      let team_two_div = document.createElement("div");
      let champ_splash_two = document.createElement("div");
      let items = document.createElement("div");
      // player_card.appendChild(team_two_card);
      team_two_card.append(team_two_div);
      // team_two_names.append(team_two_card);
      team_two_div.append(team_two_names);
      team_two_names.append(data.riotIdGameName + " | " + data.championName);
      team_two_div.append(item_card);
      item_card.append(champ_splash_two);
      item_card.append(items);
      team_two_div.setAttribute("class", "player");

      champ_splash_two.append(img_tag);

      img_tag.src =
        "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
        data.championName +
        "_0.jpg";

      item_zero_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item0 +
        ".png";

      item_one_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item1 +
        ".png";

      item_two_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item2 +
        ".png";

      item_three_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item3 +
        ".png";

      item_four_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item4 +
        ".png";

      item_five_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item5 +
        ".png";

      item_six_img.src =
        "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
        data.item6 +
        ".png";

      items.append(item_zero_img);
      items.append(item_one_img);
      items.append(item_two_img);
      items.append(item_three_img);
      items.append(item_four_img);
      items.append(item_five_img);
      items.append(item_six_img);

      img_tag.width = 300;
      //   player_card.append(summoner_names_plate);
      //   player_card.append(team_names_plate);
      //   player_card.append(KDA_plate);
      //   team_two_card.append(player_card);
      // team_names_plate.append(data_obj.info.participants[u].teamId);
    }
    // player_match(item_card);
    player_card.setAttribute("class", "player");
    team_two_card.setAttribute("class", "team-one");
    team_one_card.setAttribute("class", "team-two");
  }
}

//https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5212857128?api_key=RGAPI-6659ad7b-32ee-46a2-81d6-a7ca8a6000a8
function profileText(gameobj) {
  let gameData = gameobj;
  // let gameData = request(gameobj);
  // player_match.append(item_card);
  // let obj = await request(data_obj);
  console.log(gameData + " data");
  //   printText(data_obj);
  //   player_card.append(img_tag);
  //   team_one_card.append(player_card);
  //   team_two_card.append(player_card);

  for (let inum = 0; inum < gameData[0].info.participants.length; inum++) {
    // let item_card = document.createElement("div");
    let item_card = document.createElement("div");
    let item_zero_img = document.createElement("img");
    let item_one_img = document.createElement("img");
    let item_two_img = document.createElement("img");
    let item_three_img = document.createElement("img");
    let item_four_img = document.createElement("img");
    let item_five_img = document.createElement("img");
    let item_six_img = document.createElement("img");
    this.document.append(item_card);

    // printText(gameData);
    // console.log(data_obj);
    let statArr = gameData.info.participants[inum];
    // console.log(statArr);

    // player_card.append(item_card);
    console.log(gameData.info.participants[inum].championName);

    // player_card.append(item_card);
    item_card.setAttribute("class", "items");
    // player_card.append(item_card);
    // console.log(statArr);

    // player_card.setAttribute("class", "team-" + statArr.teamId);

    // item_card.setAttribute("class", "items");

    img_tag.src =
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
      gameData.info.participants[inum].championName +
      "_0.jpg";

    console.log(img_tag.src);
    player_card.append(img_tag);
    // for (let index = 0; index < data_obj.info.participants.length; index++) {
    //   // const element = array[index];
    // }
    // img_tag.append(player_card);

    item_zero_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item0 +
      ".png";

    item_one_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item1 +
      ".png";

    item_two_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item2 +
      ".png";

    item_three_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item3 +
      ".png";

    item_four_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item4 +
      ".png";

    item_five_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item5 +
      ".png";

    item_six_img.src =
      "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
      statArr.item6 +
      ".png";

    item_card.append(item_zero_img);
    item_card.append(item_one_img);
    item_card.append(item_two_img);
    item_card.append(item_three_img);
    item_card.append(item_four_img);
    item_card.append(item_five_img);
    item_card.append(item_six_img);
  }
}

// player_card.setAttribute("id", "player");

async function summonerIdconcat() {
  return summArr;
}
