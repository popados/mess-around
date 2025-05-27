import { DATA } from "./07-harry-potter/07-harry-potter.js";

const word = ["the", "an", "a", "of", "than", "harry", "potter", "voldemort"];

class WordCounter {
  constructor(text) {
    this.text = text;
    this.wordCounts = {};
    this.processText();
  }

  processText() {
    const words = this.text.toLowerCase().match(/\b\w+\b/g);
    if (words) {
      word.forEach((article) => {
        for (const article of word) {
          this.wordCounts[article] = (this.wordCounts[article] || 0) + 1;
        }
      });
    }
  }

  count(article) {
    let wordArr = [];
    for (let i = 0; i < article.length; i++) {
      let wordCount = this.wordCounts[article[i].toLowerCase()] || 0;
      // for (let j = 0; j < article.length; i++) {
      //   wordArr.push(wordCount[j]);
      // }
    }
    return wordArr;
  }
}

const counter = new WordCounter(DATA);
// Example usage:

console.log(`The word "${word}" appears ${counter.count(word)} times.`);
