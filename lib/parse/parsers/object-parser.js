const IdentifierParser = require('./identifier-parser');

class ObjectParser {
    static TYPE = 'ObjectParser';

    constructor(context){
        this.context = context;
    }

    test(){
        if(this.context.getCurrentChar() === '{'){
            return true;
        }

        return false;
    }

    execute(){
        const temp = {};

        if(this.context.getCurrentChar() === '{'){
            this.context.peek();

            if(this.context.getCurrentChar() === '}'){
                this.context.peek();

                return temp;
            }

            while(this.context.getCurrentChar()) {
                let identifier = this.context.rules[IdentifierParser.TYPE].execute();

                this.context.assert(':');

                this.context.peek();

                temp[identifier] = this.context.descend();

                if(this.context.getCurrentChar() === '}'){
                    return temp;
                }

                this.context.assert(',');

                this.context.peek();
            }

            throw new Error('Object Missing Closing Bracket');
        }
    }
}

module.exports = ObjectParser;