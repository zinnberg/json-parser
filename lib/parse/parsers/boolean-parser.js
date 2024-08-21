class BooleanParser {
    static TYPE = 'BooleanParser';

    constructor(context){
        this.context = context;
    }

    test(){
        if(this.context.getCurrentChar() === 'f' || this.context.getCurrentChar() === 't'){
            return true;
        }

        return false;
    }

    execute(){
        switch(this.context.getCurrentChar()){
            case 't':
                this.context.assert('t');
                this.context.peek();
                this.context.assert('r');
                this.context.peek();
                this.context.assert('u');
                this.context.peek();
                this.context.assert('e');
                this.context.peek();
                return true;
            case 'f':
                this.context.assert('f');
                this.context.peek();
                this.context.assert('a');
                this.context.peek();
                this.context.assert('l');
                this.context.peek();
                this.context.assert('s');
                this.context.peek();
                this.context.assert('e');
                this.context.peek();
                return false;
        }
    }
    
}

module.exports = BooleanParser;