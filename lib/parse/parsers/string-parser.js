class StringParser {
    static TYPE = 'StringParser';

    constructor(context){
        this.context = context;
    }

    test(){
        if(this.context.getCurrentChar() === "\""){
            return true;
        }

        return false;
    }

    execute(){
        const workArray = [];

        if(this.context.getCurrentChar() === "\"") {
            this.context.peek();

            if(this.context.getCurrentChar() === "\""){
                this.context.peek();

                return "";
            }

            while(this.context.getCurrentChar()){
                workArray.push(this.context.getCurrentChar());

                this.context.peek();

                if(this.context.getCurrentChar() === "\""){
                    this.context.peek();

                    return workArray.join("");
                }
            }
        }
    }
    
}

module.exports = StringParser;