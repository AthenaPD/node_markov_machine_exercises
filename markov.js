/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chain = this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let mChains = {};
    const nWords = this.words.length;
    this.words.forEach((word, idx) => {
      if (!mChains.hasOwnProperty(word)) {
        mChains[word] = [];
      }
      let word2Add = null;
      if (idx !== nWords - 1) word2Add = this.words[idx+1];
      mChains[word].push(word2Add);
    });
    return mChains;
  }


  /** return random text from chains */

  makeText(numWords = 1000) {

    let output = '';
    let currNumWords = 0;

    while (currNumWords <= numWords) {
      let [nWords, newSentence] = this._getNextSentence();
      currNumWords += nWords;
      // if (currNumWords > numWords) break;
      output += newSentence;
    }

    return output
  }

  _getNextSentence() {
    const idxStart = Math.floor(Math.random() * this.words.length);
    let currWord = this.words[idxStart];
    let sentence = currWord;
    let nWords = 1;

    while (true) {
      const nextWords = this.chain[currWord];
      const idxNext = Math.floor(Math.random() * nextWords.length);
      const nextWord = nextWords[idxNext];
      if (nextWord === null) {
        sentence += '.';
        break;
      }
      sentence += ` ${nextWord}`;
      currWord = nextWord;
      nWords++;
    }
    return [nWords, sentence];
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// const output = mm.makeText();
// console.log(output);
// mm.makeText(numWords=10);

module.exports = MarkovMachine;
