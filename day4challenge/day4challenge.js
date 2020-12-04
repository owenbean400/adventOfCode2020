const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if (err){
        console.log(err);
        return;
    }
    var regex = /[\s\n]/g;
    var content = data.split("\n\n");
    for(let i = 0; i < content.length; i++){
        content[i] = content[i].split(regex);
    }
    var count = 0;
    var valid = [];
    for(let i = 0; i < content.length; i++){
        if(vaildCheck(content[i])){
            count++;
            valid.push(content[i]);
        }
    }
    console.log("amount valid passports are " + count);
    var count = 0;
    for(let i = 0; i < valid.length; i++){
        var amountCorrect = 0;
        for(let j = 0; j < valid[i].length; j++){
            var data = valid[i][j].split(":");
            if(dataCheck(data[0], data[1])){
                amountCorrect++;
            }
        }
        if(amountCorrect === 7){
            count++;
        }
    }
    console.log("amount correct data passports are " +count);
})

function vaildCheck(arrayCheck){
    var isRight = false;
    let regexMatch = /cid/g;
    if(arrayCheck.length === 8){
        isRight = true;
    }
    else if(arrayCheck.length === 7){
        isRight = true;
        for(let j = 0; j < arrayCheck.length; j++){
            if(arrayCheck[j].search(regexMatch) >= 0){
                isRight = false;
            }
        }
    }
    return isRight;
}

function dataCheck(field, info) {
    let eyesMatch = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    let regexDigit = /\d+/g;
    let regexColor = /#[0-9a-f]{6,6}/g;

    if(field == "byr"){
        if(parseInt(info) >= 1920 && parseInt(info) <= 2002){
            return true;
        }
    }
    else if(field == "iyr"){
        if(parseInt(info) >= 2010 && parseInt(info) <= 2020){
            return true;
        }
    }
    else if(field == "eyr"){
        if(parseInt(info) >= 2020 && parseInt(info) <= 2030){
            return true;
        }
    }
    else if(field == "hgt"){
        if(info.search("in") > 0){
            number = info.match(regexDigit);
            if(parseInt(number) >= 59 && parseInt(number) <= 76){
                return true;
            }
        }
        else if(info.search("cm") > 0){
            number = info.match(regexDigit);
            if(parseInt(number) >= 150 && parseInt(number) <= 193){
                return true;
            }
        }
    }
    else if(field == "hcl"){
        if(info.length === 7 && info.search(regexColor) >= 0){
            return true;
        }
    }
    else if(field == "ecl"){
        for(let k = 0; k < eyesMatch.length; k++){
            if(info.search(eyesMatch[k]) != -1){
                return true;
            }
        }
    }
    else if(field == "pid"){
        var id = info.match(/\d+/g);
        if(id[0].length === 9){
            return true;
        }
    }
    return false;
}