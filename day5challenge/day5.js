const fs = require('fs');

fs.readFile('./input.txt', 'utf-8', (err, data) => {
    if(err){
        return console.log(err);
    }

    content = data.split("\n");
    var max = 0;
    var ids = [];
    for(let i = 0; i < content.length; i++){
        var number = [0, 127];
        var count = 64;
        for(let j = 0; j < 8; j++){
            if(content[i].charAt(j) == 'F'){
                number = [number[0], number[1] - count];
            }
            else if(content[i].charAt(j) == 'B'){
                number = [number[0] + count, number[1]];
            }
            count = count / 2;
        }
        var row = number[0];
        var number = [0, 7];
        var count = 4;
        for(let j = 7; j < 10; j++){
            if(content[i].charAt(j) == 'L'){
                number = [number[0], number[1] - count];
            }
            else if(content[i].charAt(j) == 'R'){
                number = [number[0] + count, number[1]];
            }
            count = count / 2;
        }
        var column = number[0];
        var id = row * 8 + column;
        ids.push(id);
        //console.log(id);
        max = Math.max(max, id);
    }
    console.log(max);
    var missing = [];
    for(let i = 0; i <= 1000; i++){
        if(!ids.includes(i)){
            missing.push(i);
        }
    }
    console.log(missing);
})