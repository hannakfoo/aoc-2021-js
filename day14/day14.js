var fs = require("fs");

var input = fs.readFileSync("testinput.txt").toString().split("\n");

var polymerTemplate = input[0];

var rules = [];
for (var i = 2; i < input.length; i++) {
  var pairInsertionRule = {
    matchPair: input[i].split("->")[0].replace(" ", ""),
    insertChar: input[i].split("->")[1].replace(" ", ""),
  };
  rules.push(pairInsertionRule);
}

var polymerInstruction = {
  polymerTemplate: polymerTemplate,
  rules: rules,
};

console.log(JSON.stringify(polymerInstruction, null, 2));

function MatchRules(polymerInstruction) {
  for (var i = 0; i < polymerInstruction.rules.length; i++) {
    var rule = `${polymerInstruction.rules[i].matchPair}`
    var match = polymerInstruction.polymerTemplate.match(rule);
    if (match) {
      var matchIndex = match.index;
      polymerInstruction.polymerTemplate =
      polymerInstruction.polymerTemplate.substring(0, matchIndex + 1) +
        rules[i].insertChar +
        polymerInstruction.polymerTemplate.substring(matchIndex + 1);

      return polymerInstruction;
    }
  }
  return polymerInstruction;
}
polymerInstruction = MatchRules(polymerInstruction);
console.log(polymerInstruction.polymerTemplate);

// for (var i = 0; i < rules.length; i++) {
//   var rule = `${rules[i].matchPair}`.replace(' ',"");
//   var match = polymerTemplate.match(rule);
//   if(match) {
//     var matchIndex = match.index;
//     polymerTemplate = polymerTemplate.substring(0,matchIndex+1) + rules[i].insertChar + polymerTemplate.substring(matchIndex+1);
//     console.log(`polymerTemplate: ${polymerTemplate}`);
//     break;
//   }// console.log(`rule ${i}: ${rules[i].matchPair} -> ${rules[i].insertChar}`);
// }

// function matchPolymerTemplate(polymer, rule){
//   var match = polymer.match(rule);
//   if(match) {
//     polymer = polymer.substring(0,matchIndex+1) + rules[i].insertChar + polymer.substring(matchIndex+1);
//   }
//   return polymer;
// }
