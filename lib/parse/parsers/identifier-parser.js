const validIdentifier = require('./../../validate-obj-prop');


class IdentifierParser {
    static TYPE = 'IdentifierParser';

    constructor(context){
        this.context = context;
    }

    test(){
        return false;
    }

    execute(){
        const workArr = [];

        if (this.context.getCurrentChar() === "\"") {
            this.context.peek();

            if (this.context.getCurrentChar() === "\"") {
                this.context.peek();

                return "";
            }

            while (this.context.getCurrentChar()) {
                workArr.push(this.context.getCurrentChar());

                this.context.peek();

                if (this.context.getCurrentChar() === "\"") {
                    const testString = workArr.join("");

                    if(validIdentifier.test(testString)){
                        this.context.peek();

                        return workArr.join("");
                    } else {
                        whatHaveYouDone();
                    }
                }


            }
        }
    }
}

module.exports = IdentifierParser;