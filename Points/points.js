'use strict';

function findCoordinates(x, y, word) {
	for (var i = 0, len = word.length; i < len; i++) {
		if (word[i]=='>') {
			x++;
		}
		else if(word[i]=='<') {
			x--;
		}
		else if(word[i]=='^') {
			y++;
		}
		else if(word[i]=='v') {
			y--;
		}
		if (word[i]=='~') {
			var pos = word.indexOf('~') + 1;
			var res = word.substring(pos);
			
			for (var j = 0, len2 = res.length; j < len2; j++) {
					if (res[j]=='>') {
						x--;
					}
					else if(res[j]=='<') {
						x++;
					}
					else if(res[j]=='^') {
						y--;
					}
					else if(res[j]=='v') {
						y++;
					}
				}
				break;
			}
		}
		return [x, y];
}
console.log(findCoordinates(0, 0, "~>>><<<^^^vvv"));
