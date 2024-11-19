const MarkovMachine = require('./markov');

let mm;

beforeEach(function() {
    mm = new MarkovMachine("the cat in the hat");
})

describe("make markov chain", function() {
    it("takes in an input string and make a Markov chain", function() {
        expect(mm.words.length).toBe(5);
        expect(mm.chain).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});
    });
});

describe("generate Markov text", function() {
    it("generate the output text from a Markov Machine object created using an input string", function() {
        const output = mm.makeText(numWords=10);
        console.log(output);
        expect(typeof output).toBe("string");
        outArr = output.split(/[ \r\n]+/);
        outArr = outArr.filter(c => c !== "");
        expect(outArr).toHaveLength(10);
        expect(output).toEqual(expect.stringContaining('hat'));
        expect(output).toEqual(expect.not.stringContaining('bat'));
    });
});