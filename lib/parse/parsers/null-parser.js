class NullParser {
    static TYPE = 'NullParser';

    constructor(context){
        this.context = context;
    }

    test(){
        if(this.context.getCurrentChar() === 'n'){
            return true;
        }

        return false;
    }

    execute(){
        this.context.assert('n');
        this.context.peek()
        this.context.assert('u');
        this.context.peek();
        this.context.assert('l');
        this.context.peek();
        this.context.assert('l');
        return null;
    }
    
}

module.exports = NullParser;