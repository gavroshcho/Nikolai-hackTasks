'use strict';

var table = [
  ["p", "r", "r", "p", "a", "p"],
  ["e", "a", "e", "p", "a", "p"],
  ["o", "n", "p", "v", "d", "v"],
  ["m", "v", "a", "e", "l", "x"],
  ["p", "a", "p", "e", "r", "a"],
  ["q", "r", "e", "p", "a", "p"]
];

var currentCheck = [];

var row = 0;
var char = 0;

var found = "";
var occ = 0;

function findInDirection(word) {
  var xD = currentCheck[1][0] - currentCheck[0][0];
  var yD = currentCheck[1][1] - currentCheck[0][1];
  var rest = word.length - 2;
  var found = word.slice(0, 2);

  for (var i = 0; i < rest; i++) {
    var last = currentCheck[currentCheck.length - 1];
    if (!table[last[0] + xD]) continue;
    var res = table[last[0] + xD][last[1] + yD];

    if (word[currentCheck.length] === res) {
      found += res;
      if (found === word) {
        occ += 1;
        break;
      }
      currentCheck.push([last[0] + xD, last[1] + yD]);
    }
  }

  return true;
}

function findInAllDirections(row, char, word) {
  var startingRow = row - 1;
  var startingChar = char - 1;
  var finishRow = row + 1;
  var finishChar = char + 1;

  for (var i = startingRow; i <= finishRow; i++) {
  	console.log("This is i: " + i);
    for (var c = startingChar; c <= finishChar; c++) {
    	  	console.log("This is c: " + c);
      if (table[i] && table [i][c]) {
        if (table[i][c] === word.slice(1, 2)) {
          currentCheck = currentCheck.slice(0, 1);
          currentCheck.push([i, c]);

          findInDirection(word);
        }
      }
    }
  }
}

function countOccurances(word) {
  var initialChar = word.slice(0, 1);
  var occurances = [];

  table.forEach(function(row, indexRow) {
    row.forEach(function(char, indexChar) {
      if (char === initialChar) {
        currentCheck = [];
        currentCheck.push([indexRow, indexChar]);
        findInAllDirections(indexRow, indexChar, word);
      }
    });
  });

  console.log(occ);
}

countOccurances("paper");
