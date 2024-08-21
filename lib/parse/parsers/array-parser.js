class ArrayParser {
    static TYPE = 'ArrayParser';

    constructor(context){
        this.context = context;
    }

    test(){
        if(this.context.getCurrentChar() === '['){
            return true;
        }

        return false;
    }

    execute(){
        const temp = [];
        if(this.context.getCurrentChar() === '['){
            this.context.peek();

            if(this.context.getCurrentChar() === ']'){
                this.context.peek();

                return temp;
            }

            while(this.context.getCurrentChar()) {
                temp.push(this.context.descend());

                if(this.context.getCurrentChar() === ']'){
                    this.context.peek();;

                    return temp;
                }

                this.context.assert(',');

                this.context.peek();
            }

            throw new Error('Array Missing Closing Bracket');
        }

    }
}

module.exports = ArrayParser;