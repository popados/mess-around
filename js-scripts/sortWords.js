let words = ["word", "worth", "wise", "win", "womp"];
let regEx = /wo\B/;
function sortWords(words) {
  console.log(words);
  let newWords = [];

  for (i = 0; i < words.length; i++) {
    console.log(i + " " + words[i]);
    if (words[i].match(regEx)) {
      console.log("^--Yes--^");
      if (words[i].match(regEx) !== null) {
        newWords.push(words[i]);
      }
    } else {
      console.log("^--No--^");
    }
  }
  console.log(newWords);
  return newWords;
}

sortWords(words);
