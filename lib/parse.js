const validIdentifier = require('./validate-obj-prop');

function whatHaveYouDone(){
    return new Error("Parse Error");
}

function parse(str){
    let stringToParse;

    let current;

    let currentChar;

    const peek = () => {
        current = current + 1;

        currentChar = stringToParse.charAt(current);

        return currentChar;
    };

    const assert = (ch) => {
        if(ch !== currentChar){
            whatHaveYouDone();
        }
    };

    const parseArray = () => {
        let temp = [];

        if(currentChar === '['){
            peek();

            if(currentChar === ']'){
                peek();

                return temp;
            }

            while(currentChar) {
                temp.push(descend());

                if(currentChar === ']'){
                    peek();

                    return temp;
                }

                assert(',');

                peek();
            }

        }

    };

    const parseObject = () => {
        const temp = {};

        if(currentChar === '{'){
            peek();

            if(currentChar === '}'){
                peek();

                return temp;
            }

            while(currentChar) {
                let identifier = parseIdentifier();

                assert(':');

                peek();

                temp[identifier] = descend();

                if(currentChar === '}'){
                    return temp;
                }

                assert(',');

                peek();
            }
        }
    };

    const parseIdentifier = () => {
        let workArr = [];

        if (currentChar === "\"") {
            peek();

            if (currentChar === "\"") {
                peek();

                return "";
            }

            while (currentChar) {
                workArr.push(currentChar);

                peek();

                if (currentChar === "\"") {
                    const testString = workArr.join("");

                    if(validIdentifier.test(testString)){
                        peek();

                        return workArr.join("");
                    } else {
                        whatHaveYouDone();
                    }
                }


            }
        }
    };

    const parseBoolean = () => {
        switch(currentChar){
            case 't':
                assert('t');
                nextChar();
                assert('r');
                nextChar();
                assert('u');
                nextChar();
                assert('e');
                nextChar();
                return true;
            case 'f':
                assert('f');
                nextChar();
                assert('a');
                nextChar();
                assert('l');
                nextChar();
                assert('s');
                nextChar();
                assert('e');
                nextChar();
                return false;
        }
    };

    const parseNull = () => {
        assert('n');
        nextChar();
        assert('u');
        nextChar();
        assert('l');
        nextChar();
        assert('l');
        return null;
    };

    const parseString = () => {
        let workArray = [];

        if(currentChar === "\"") {
            peek();

            if(currentChar === "\""){
                peek();

                return "";
            }

            while(currentChar){
                workArray.push(currentChar);

                peek();

                if(currentChar === "\""){
                    peek();

                    return workArray.join("");
                }
            }
        }
    };

    const parseNumber = () => {
        let workArr = [];

        function runTheJewels(){
            while(currentChar && (currentChar >= 0 && currentChar <= 9)) {
                workArr.push(currentChar);

                peek();
            }
        }

        if(currentChar === '-'){
            workArr.push(currentChar);

            peek();
        }

        runTheJewels();

        if(currentChar === '.'){
            workArr.push(currentChar);

            peek();
        }

        runTheJewels();

        let value = Number(workArr.join(""));

        if(!isNaN(value)){
            return value;
        } else {
            whatHaveYouDone();
        }
    };

    function descend(){
        switch(currentChar){
            case '[':
                return parseArray();
            case '{':
                return parseObject();
            case 't':
                return parseBoolean();
            case 'f':
                return parseBoolean();
            case "\"":
                return parseString();
            default:
                if(currentChar && (currentChar === '-' || (currentChar >= 0 && currentChar <= 9))){
                    return parseNumber();
                } else {
                    whatHaveYouDone();
                }

        }
    }

    stringToParse = str;

    current = 0;

    currentChar = stringToParse.charAt(current);

    return descend();
}

exports = module.exports = parse;
