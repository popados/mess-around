// import { DATA } from "./07-harry-potter/07-harry-potter.js";

// let regEx = /the/g;

// function splitWords(words) {
//   let split = DATA.split(" ");
//   //   console.log(split);
// }

// function sortWords(words) {
//   let sortList = ["the", "an", "a", "of", "than"];
//   splitWords(words);
//   const arr = [...DATA.matchAll(regEx)];
//   //   console.log(arr);
//   if (sortList.find("the") === true) {
//     let articleCount = 0;
//     articleCount++;
//     console.log(articleCount + ": Count");
//   } else {
//     console.log("not an article");
//   }
//   //   console.log(arr);
// }

// sortWords(DATA);

import { DATA } from "./07-harry-potter/07-harry-potter.js";

class Count {
  constructor(article, count) {
    this.article = article;
    this.count = count;
  }
}

let regEx = /the/gi;
const sortList = ["the", "an", "a", "of", "than"];

function splitWords(text) {
  return text.split(/\s+/); // Splits on any whitespace
}

function sortWords(text) {
  const words = splitWords(DATA);
}

function articleArr(data, articles) {
  const words = splitWords(data);
  let articleCount = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].toLowerCase()) {
      articleCount++;
    }
  }
  for (let i = 0; i < sortList.length; i++) {
    //   sortList;
    console.log(`${articles[i]}: Count ${articleCount}`);
  }
}

articleArr(DATA, sortList);
