const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');
var numbers = [];

fs.readFile('./day1input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return
    }
    numbers = data.split("\n");

    console.log("2 number equaling 2020");
    check: 
    for(let i = 0; i < numbers.length; i++){
        for(let j = 0; j < numbers.length; j++){
            if(!equalSameNumber(i, j)){
                if(equal2020(parseInt(numbers[i]), parseInt(numbers[j]))){
                    console.log("Numbers are: " + numbers[i] + " " + numbers[j]);
                    console.log("Multiplied together: " + (numbers[i] * numbers[j]))
                    break check;
                }
            }
        }
    }

    console.log("3 number equaling 2020");
    check: 
    for(let i = 0; i < numbers.length; i++){
        for(let j = 0; j < numbers.length; j++){
            for(let k = 0; k < numbers.length; k++){
                if(!equalSameNumber(i, j, k)){
                    if(equal2020(parseInt(numbers[i]), parseInt(numbers[j]), parseInt(numbers[k]))){
                        console.log("Numbers are: " + numbers[i] + " " + numbers[j] + " " + numbers[k]);
                        console.log("Multiplied together: " + (numbers[i] * numbers[j] * numbers[k]))
                        break check;
                    }
                }
            }
        }
    }
})

function equal2020(...num){
    if(arguments.length === 2){
        if(num[0] + num[1] == 2020){
            return true;
        }
    }
    else if (arguments.length === 3){
        if(num[0] + num[1] + num[2] == 2020){
            return true;
        }
    }
    return false;
}

function equalSameNumber(i, j, k){
    if(i == j){
        return true;
    }
    if(i == k){
        return true;
    }
    if(j == k){
        return true;
    }
    return false;
}

function equalSameNumber(i, j){
    if(i == j){
        return true;
    }
    return false;
}