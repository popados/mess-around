//async (data) => {};

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
let URL_SUMMONER = CONFIG[0].URL_SUMMONER;
let URL_MATCH = CONFIG[0].URL_MATCH;
let URL_MATCH_NUM = CONFIG[0].URL_MATCH_NUM;
let URL_MATCH_ID = CONFIG[0].URL_MATCH_ID;

let URL_ID = CONFIG[0].URL_ID;

// console.log(player_name);

function dataRes(data) {
  console.log(data);
}

console.log("hello");

for (let index = 0; index < league_data.length; index++) {
  const element = league_data[index];
  idArr.push(element.summonerId);
}

for (let index_two = 0; index_two < idArr.length; index_two++) {
  const element = idArr[index_two];

  summURL.push(URI + URL_SUMMONER + element + "?" + API);
}

await summonerIdconcat();

async function request(url) {
  console.log("fetched");
  return (await fetch(url)).json();
}

let data_two = await request(
  URI_AMERICAS + URL_MATCH + summArr[0].puuid + URL_MATCH_NUM + API
);

let data_three = await request(
  URI_AMERICAS + URL_MATCH_ID + data_two[0] + "?" + API
);

async function summonerIdconcat() {
  for (let i = 0; i < 1; i++) {
    const sumID = await request(summURL[i]);
    summArr.push(sumID);

    playerID.push(summArr[i].puuid);
  }
}

console.log(summArr[0].puuid);

console.log(URI_AMERICAS + URL_MATCH + summArr[0].puuid + URL_MATCH_NUM + API);

data_two.forEach((match) => {
  // console.log(match);
  match_id.push(match);
});

console.log(URI + URL_RANK + API);
console.log(URI_AMERICAS + URL_MATCH_ID + data_two[3] + "?" + API);

console.log(data_two[3]);
let participantArr = data_three.info.participants;
partArrTwo = Object.entries(participantArr);

let mappedArr = partArrTwo.map((key) => {
  key.map((value) => {
    let name = value.riotIdGameName;
    return (key[0] = name);
  });
});

let player_match = document.getElementById("match-card");
let team_two_card = document.createElement("div");
let team_one_card = document.createElement("div");
// let team_hundred = player_match.append(team_one_card);

team_one_card.setAttribute("class", "team-one");
team_two_card.setAttribute("class", "team-two");
// console.log(team_hundred);
console.log(partArrTwo);
partArrTwo[0][1];

// let item_card = document.createElement("div");

// let team_names_plate = document.createElement("p");

// let summoner_names_plate = document.createElement("p");
// let KDA_plate = document.createElement("p");
// let item_card = document.createElement("div");

// let img_tag = document.createElement("img");

// printText(data_three);
//
player_match.append(team_one_card);
player_match.append(team_two_card);
// partArrTwo
profileText(data_three);

console.log("done requesting");

// for (let inum = 0; inum < data_three.info.participants.length; inum++) {
//   // riotName.push(data_three.info.participants[inum].riotIdGameName);
//   let statArr = data_three.info.participants[inum];

// item_card.setAttribute("class", "items");

//   img_tag.src =
//     "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
//     statArr.championName +
//     "_0.jpg";

//   item_zero_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item0 +
//     ".png";

//   item_one_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item1 +
//     ".png";

//   item_two_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item2 +
//     ".png";

//   item_three_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item3 +
//     ".png";

//   item_four_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item4 +
//     ".png";

//   item_five_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item5 +
//     ".png";

//   item_six_img.src =
//     "https://ddragon.leagueoflegends.com/cdn/15.2.1/img/item/" +
//     statArr.item6 +
//     ".png";

//   console.log();
//   img_tag.width = 300;

//   item_card.append(item_zero_img);
//   item_card.append(item_one_img);
//   item_card.append(item_two_img);
//   item_card.append(item_three_img);
//   item_card.append(item_four_img);
//   item_card.append(item_five_img);
//   item_card.append(item_six_img);

//   console.log(statArr.item1);
//   console.log(statArr.item2);
//   console.log(statArr.item3);
//   console.log(statArr.item4);
//   console.log(statArr.item5);
//   console.log(statArr.item6);
//   for (let i = 0; i < partArrTwo.length; i++) {}
// }

function kdaAvg(k, d, a) {
  let sum = k + d + a;
  let avg = sum / 3.0;
  console.log("avg: " + avg.toFixed(3));
  return avg.toFixed(3);
}

function renderProfile() {}

function profileText(data_obj) {
  for (let inum = 0; inum < data_obj.info.participants.length; inum++) {
    let statArr = data_obj.info.participants[inum];

    printText(statArr);
    let item_card = document.createElement("div");
    player_card.append(item_card);
    let item_zero_img = document.createElement("img");
    let item_one_img = document.createElement("img");
    let item_two_img = document.createElement("img");
    let item_three_img = document.createElement("img");
    let item_four_img = document.createElement("img");
    let item_five_img = document.createElement("img");
    let item_six_img = document.createElement("img");

    item_card.setAttribute("class", "items");
    // player_card.append(item_card);
    // console.log(statArr);
    let img_tag = document.createElement("img");

    // player_card.setAttribute("class", "team-" + statArr.teamId);

    item_card.setAttribute("class", "items");

    img_tag.src =
      "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
      statArr.championName +
      "_0.jpg";

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

    console.log();
    img_tag.width = 300;

    item_card.append(item_zero_img);
    item_card.append(item_one_img);
    item_card.append(item_two_img);
    item_card.append(item_three_img);
    item_card.append(item_four_img);
    item_card.append(item_five_img);
    item_card.append(item_six_img);
  }
}

function printText(data_obj) {
  let player_card = document.createElement("div");
  let team_names_plate = document.createElement("p");
  let summoner_names_plate = document.createElement("p");
  let KDA_plate = document.createElement("p");

  console.log(data_obj.teamId);
  player_card.setAttribute("id", "player");

  if (data_obj.teamId == 100) {
    summoner_names_plate.append(
      data_obj.riotIdGameName + " | " + data_obj.championName
    );
    team_names_plate.append(data_obj.teamId);
    team_one_card.append(player_card);
    player_card.append(summoner_names_plate);
    player_card.append(team_names_plate);
    player_card.append(KDA_plate);
  } else if (data_obj.teamId == 200) {
    summoner_names_plate.append(
      data_obj.riotIdGameName + " | " + data_obj.championName
    );
    team_names_plate.append(data_obj.teamId);
    player_card.append(summoner_names_plate);
    player_card.append(team_names_plate);
    player_card.append(KDA_plate);
    team_two_card.append(player_card);
  }
  // player_card.setAttribute("id", "player");
}

function images(data_obj) {
  let item_card = document.createElement("div");
  let item_zero_img = document.createElement("img");
  let item_one_img = document.createElement("img");
  let item_two_img = document.createElement("img");
  let item_three_img = document.createElement("img");
  let item_four_img = document.createElement("img");
  let item_five_img = document.createElement("img");
  let item_six_img = document.createElement("img");
}
