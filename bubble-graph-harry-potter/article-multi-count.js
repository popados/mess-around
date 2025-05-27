import { DATA } from "./07-harry-potter/07-harry-potter.js";

class WordCounter {
  constructor(text) {
    this.text = text;
    this.wordCounts = {};
    this.processText();
  }

  processText() {
    const words = this.text.toLowerCase().match(/\b\w+\b/g);
    if (words) {
      for (const word of words) {
        this.wordCounts[word] = (this.wordCounts[word] || 0) + 1;
      }
    }
  }

  count(word) {
    return this.wordCounts[word.toLowerCase()] || 0;
  }

  countMultiple(wordsArray) {
    const results = {};
    for (const word of wordsArray) {
      results[word] = this.count(word);
    }
    return results;
  }
}

// Example usage:
const counter = new WordCounter(DATA);
const articles = ["the", "an", "a", "of", "than"];
const counts = counter.countMultiple(articles);

for (const [word, count] of Object.entries(counts)) {
  console.log(`The word "${word}" appears ${count} times.`);
}

