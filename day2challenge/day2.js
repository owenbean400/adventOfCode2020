const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');
var password = [];
letterRegex = /[a-zA-Z]/g;
number = /[0-9]*-[0-9]*/g;

fs.readFile('./input.txt', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    password = data.split("\n");
    //console.log(password);

    var countTrue = 0;
    var countFalse = 0;
    for(let i = 0; i < password.length - 1; i++){
        var character = password[i].charAt(password[i].search(letterRegex));
        var charCount = 0;
        for(let j = password[i].search(":"); j < password[i].length; j++){
            if(password[i].charAt(j) === character){
                charCount++;
            }
        }
        //console.log(charCount);
        let numbers = numberRange(password[i]);
        if (charCount >= parseInt(numbers[0]) && charCount <= parseInt(numbers[1])) {
            countTrue++
        }
        else{
            countFalse++;
        }
    }
    //console.log(password.length);
    console.log("part one amount of true: " + countTrue);
    //console.log(countFalse);
    countTrue = 0;
    console.log("reset: " + countTrue);
    for(let i = 0; i < password.length - 1; i++){
        var character = password[i].charAt(password[i].search(letterRegex));
        let countChar = 0;
        let numbers = numberRange(password[i]);
        let word = password[i].substring(password[i].search(":") + 2, password[i].length);
        if(word.charAt(parseInt(numbers[0]) - 1) == character){
            countChar++
        }
        if(word.charAt(parseInt(numbers[1]) - 1) == character){
            countChar++
        }
        if(countChar === 1){
            countTrue++;
        }
        /*
        console.log(
            "string: " + 
            password[i] + 
            "  char: " + 
            character +
            "  numbers: " +
            numbers[0] +
            ":" +
            word.charAt(parseInt(numbers[0]) - 1) +
            " " +
            numbers[1] +
            ":" +
            word.charAt(parseInt(numbers[1]) - 1)
        );
        */
    }
    console.log("amount part 2 true: " + countTrue);
})

function numberRange(word){
    numberRegex = /[0-9]*-[0-9]*/g;
    var numbers = word.match(numberRegex);
    numbers = numbers[0].split('-');
    return numbers;
}