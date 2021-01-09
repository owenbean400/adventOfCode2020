const { count, Console } = require('console');
const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if(err)
        return err
    var info = data.split("\n");
    for(var i in info){
        info[i] = parseInt(info[i]);
    }
    info = info.sort((a, b) => {return a - b});
    console.log("Test: " + info)
    counts = AmountOfOneAndThreeSteps(info);
    console.log("Part 1 answer: " + (counts[0] * counts[1]));
    info.push(info[info.length - 1] + 3);
    info.unshift(0);
    console.log("Part 2 answer: " + aboutOfRemoval(info));
})

/**
 * Calculate the amount of different sequences the adapters can be in
 * 
 * @param {*} numbers The numbers of the adapter sequence
 * @return the amount of different sequences
 */
function aboutOfRemoval(numbers){
    answer = 1;
    amountRow = 1;
    for(let i = 0; i < numbers.length; i++){
        if(numbers[i] - numbers[i - 1] == 3){
            answer *= removalChuckAmounts(amountRow);
            amountRow = 1;
        }
        else if(numbers[i] - numbers[i - 1] == 1){
            amountRow++;
        }
    }
    return answer;
}

/**
 * Calculate the amount of adapter replacement when next to each other 1 by 1
 * 
 * @param {*} num How many adapters in a row 1 by 1 
 * @return the amount of adapters sequence in a 1 by 1
 */
function removalChuckAmounts(num){
    numberMulitplied = [1];
    var amountAdded = 0;
    var counter = 1;
    while(counter < num){
        if(numberMulitplied.length >= 3){
            amountAdded = 0;
            for(let i = numberMulitplied.length - 3; i < numberMulitplied.length; i++)
                amountAdded += numberMulitplied[i];
            numberMulitplied.push(amountAdded);
        }
        else{
            amountAdded = 0;
            for(i in numberMulitplied)
                amountAdded += numberMulitplied[i];
            numberMulitplied.push(amountAdded);
        }
        counter++;
    }
    return numberMulitplied[numberMulitplied.length - 1];
}

/**
 * count how many times it jumps 1 and jumps 3
 * 
 * @param {*} info the number squence
 * @return an array of the amount of jumps of 1 and jumps of 3
 */
function AmountOfOneAndThreeSteps(info){
    countOne = 0;
    countThree = 1;
    if(info[0] == 1)
        countOne++;
    else if(info[0] == 3)
        countThree++;
    for(var i in info){
        if(i > 0){
            if(info[i] - info[i - 1] == 1)
                countOne++;
            else if(info[i] - info[i - 1] == 3)
                countThree++;
            else
                console.log("Error");
        }
    }
    return [countOne, countThree];
}