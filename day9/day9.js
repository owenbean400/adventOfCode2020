const fs = require("fs");

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if(err)
        return err;
    var info = data.split("\n");

    var numberFound;
    for(let i = 25; i < info.length; i++){
        possibleAdditions = numberAgo25Added(info, i);
        if(!possibleAdditions.includes(parseInt(info[i])) && parseInt(info[i]) > 9){
            console.log(info[i]);
            numberFound = [info[i], i];
            break;
        }
    }
    console.log(contigousRangeCheck(info, numberFound[0], numberFound[1] - 1));
    console.log(biggestSubtractSmallestArray(contigousRangeCheck(info, numberFound[0], numberFound[1] - 1)));
})

function numberAgo25Added(info, index){
    starting25 = numberAgo25(info, index - 25);
    var possibleAdditions = [];
    for(let i = 0; i < starting25.length; i++){
        for(let j = 0; j < starting25.length; j++){
            if(i != j){
                var addNum = parseInt(starting25[i]) + parseInt(starting25[j])
                if(!possibleAdditions.includes(addNum))
                    possibleAdditions.push(parseInt(starting25[i]) + parseInt(starting25[j]));
            }
        }
    }
    return possibleAdditions;
}

function numberAgo25(info, index){
    var starting25 = [];
    while(starting25.length < 25){
        starting25.push(parseInt(info[starting25.length + index]));
    }
    return starting25;
}

function contigousRangeCheck(numbers, answer, startingIndex){
    for(let i = startingIndex; i >= 0; i--){
        var sum = 0;
        count = i;
        numbersInRow = [];
        while(sum < answer && count != 0){
            sum += parseInt(numbers[count]);
            numbersInRow.push(parseInt(numbers[count]));
            if(sum == answer){
                return numbersInRow;
            }
            count--;
        }
    }
    return 0;
}

function biggestSubtractSmallestArray(array){
    min = array[0];
    max = array[0];
    for(var x of array){
        if(x > max)
            max = x;
        else if(x < min)
            min = x;
    }
    console.log("max: " + max + "  min: " + min);
    return (max + min);
}