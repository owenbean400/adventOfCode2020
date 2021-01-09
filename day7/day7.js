const fs = require("fs");


fs.readFile('./input.txt', 'utf-8', (err, data) => {
    var info = data.split("\n");
    var amountOfNoContain = 0;
    bagsDirect = findDirectBags(info);
    var found = findIndirectBags(info, bagsDirect);
    var isSameSize = false;
    var previousSize = 0;
    while(!isSameSize){
        found = findIndirectBags(info, found);
        if(found.length == previousSize)
            isSameSize = true;
        previousSize = found.length;
    }
    console.log("Part 1 answer: " + found.length);
    var goldBag = info.find(element => element.search("shiny gold bag") == 0);
    class bagTreeName {
        constructor(num, name, count, contains){
            this.name = name;
            this.amount = num;
            this.count = count;
            this.contains = contains;
            this.children = [];
        }
        addChildren(){
            if(this.contains != undefined){
                var numberRegex = /[0-9]/g;
                var string = this.contains.substring(this.contains.search("contain") + 8, this.contains.length - 1);
                string = string.replace(".","");
                string = this.removeDumbThingInString(string, ",", "");
                string = this.removeDumbThingInString(string, "bags", "bag");
                const bagsInfo = this.creatChildrenArrayString(string);
                if(!bagsInfo.includes("no other bag"));{
                    bagsInfo.forEach(
                        x => {
                            var testString = x.substring(x.search(numberRegex) + 1, x.search("bag") + 4).trim();
                            var nxtStr = info.find(element => element.search(testString) == 0);
                            var amountBag = parseInt(x.substring(x.search(numberRegex), x.search(numberRegex) + 1)) * this.count;
                            var addBag = new bagTreeName(parseInt(x.substring(x.search(numberRegex), x.search(numberRegex) + 1)), x.substring(x.search(numberRegex) + 2, x.length).trim(), amountBag, nxtStr);
                            if(x != undefined){
                                this.children.push(addBag);
                            }
                        }
                    )
                }
            }
            else{
                var nxtStr = info.find(element => element.search(this.name) == 0);
                this.contains = ""
            }
        }
        getAmount(){
            return this.amount;
        }
        getName(){
            return this.name;
        }
        removeDumbThingInString(string, word, replace){
            while(string.search(word) >= 0){
                string = string.replace(word,replace);
            }
            return string;
        }
        creatChildrenArrayString(string){
            var numberRegex = /[0-9]/g;
            var bagsInfo = [];
            while(string.search(numberRegex) != -1){
                bagsInfo.push( string.substring(string.search(numberRegex), string.search("bag") + 4).trim() );
                string = string.substring(string.search("bag") + 4, string.length).trim();
                if(string.search(new RegExp(/[a-zA-Z]/g)) == -1){
                    break;
                }
            }
            if(string.search("contain no other bag") >= 0){
                bagsInfo.push("no other bag");
            }
            return bagsInfo;
        }
    }
    console.log("test1");
    goldBagTree = new bagTreeName(1, "shiny gold bag", 1, goldBag);
    console.log("Part 2 answer: " + add(createIndirectBagTree(goldBagTree), []));
    console.log("done");
    function createTree(){

    }

    function add(bagInfo, numbers){
        if(bagInfo.children != undefined && bagInfo.children.length > 0){
            bagInfo.children.forEach(
                x => {
                    numbers.push(x.count);
                    if(x.contains.search("no other bag") >= 0){
                        amountOfNoContain++;
                    }
                    return add(x, numbers);
                }
            )
        }
        answer = numbers.reduce((a, b) => a + b, 0);
        return answer;
    }
})

function createIndirectBagTree(startBagTree){
    var isDoneTree = false;
    theBags = [startBagTree];
    theBagsHolder = [];
    while(!isDoneTree){
        for(var bag of theBags){
            bag.addChildren();
            for(var bags of bag.children){
                theBagsHolder.push(bags);
            }
        }
        theBags = theBagsHolder;
        if(theBags.length == 0){
            isDoneTree = true;
        }
        theBagsHolder = [];
    }
    return startBagTree;
}

function findDirectBags(information){
    var regex = /[0-9] shiny gold/g;
    var bagsTrue = [];
    for(var string of information){
        if(string.search(regex) >= 0) {
            bagsTrue.push(string.substring(0, string.search("bags") + 3));
        }
    }
    return bagsTrue;
}

function findIndirectBags(information, bagsTrue){
    var numberRegex = /[0-9]/g;
    newBagsTrue = []
    for(var bagsRight of bagsTrue)
        newBagsTrue.push(bagsRight);
    for(var string of information){
        let amountOfBags = 0;
        var bagString = string;
        while(bagString.search(numberRegex) != -1){
            bagString = bagString.substring(bagString.search(numberRegex) + 1, bagString.length);
            amountOfBags++
        }
        var bagTrueGold = 0;
        for(var bagTest of bagsTrue){
            if(string.includes(bagTest)){
                bagTrueGold++;
            }
        }
        if(bagTrueGold > 0 && amountOfBags != 0 && !newBagsTrue.includes(string.substring(0 ,string.search("bag") + 3))){
            newBagsTrue.push(string.substring(0 ,string.search("bag") + 3));
        }
    }
    return newBagsTrue;
}