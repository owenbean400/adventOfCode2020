const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if (err)
        return err;
    var info;
    info = data.split("\n\n");
    for(let i = 0; i < info.length; i++){
        info[i] = info[i].split("\n");
    }
    console.log(answerCheck1(info));
    console.log(answerCheck2(info));
})

function answerCheck2(info){
    var count = 0
    for(let i = 0; i < info.length; i++){
        var char = [];
        for(let j = 0; j < info[i].length; j++){
            for(let k = 0; k < info[i][j].length; k++){
                charThis = info[i][j].charAt(k);
                if(j == 0){
                    char.push([charThis, 0]);
                }
                else{
                    for(let l = 0; l < char.length; l++){
                        if(charThis == char[l][0]){
                            char[l][1]++;
                        }
                    }
                }
            }
        }
        var countYes = 0;
        for(let j = 0; j < char.length; j++){
            if(char[j][1] == info[i].length - 1){
                countYes++;
            }
        }
        count += countYes;
    }
    return count;
}

function answerCheck1(info) {
    var count = 0
    for(let i = 0; i < info.length; i++){
        var char = [];
        for(let j = 0; j < info[i].length; j++){
            for(let k = 0; k < info[i][j].length; k++){
                charThis = info[i][j].charAt(k);
                if(!char.includes(charThis)) {
                    char.push(charThis);
                }
            }
        }
        count += char.length;
    }
    return count;
}