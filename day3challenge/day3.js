const fs = require('fs');

fs.readFile('./day3.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return err;
    }
    trail = data.split("\n");
    var amountOfTrees = [];
    amountOfTrees.push(slopeTreeCount(1, 1, trail));
    amountOfTrees.push(slopeTreeCount(3, 1, trail));
    amountOfTrees.push(slopeTreeCount(5, 1, trail));
    amountOfTrees.push(slopeTreeCount(7, 1, trail));
    amountOfTrees.push(slopeTreeCount(1, 2, trail));
    console.log(amountOfTrees);
    var multiplyTrees = 1;
    for(trees of amountOfTrees){
        multiplyTrees *= trees;
    }
    console.log(multiplyTrees);
})

function slopeTreeCount(right, down, trail){
    var treeCount = 0;
    for(let y = 0; y < trail.length - 1; y++){
        if(y % down == 0){
            let answer = (right / down) * y + 1;
            let x = answer - (Math.floor((answer - 1) / trail[0].length) * trail[0].length);
            if(trail[y].charAt(x - 1) == "#"){
                treeCount++;
            }
        }
    }
    return treeCount;
}