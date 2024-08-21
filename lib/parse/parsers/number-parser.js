class NumberParser {
    static TYPE = 'NumberParser';

    constructor(context){
        this.context = context;
    }

    test(){
        const currentChar = this.context.getCurrentChar();
        if(currentChar === '-' || (currentChar >= 0 && currentChar <= 9)){
            return true;
        }

        return false;
    }

    execute(){
        const workArr = [];

        const getNextNumberSequence = _ => {
            while(this.context.getCurrentChar()
                && (this.context.getCurrentChar() >= 0 && this.context.getCurrentChar() <= 9)
            ) {
                workArr.push(this.context.getCurrentChar());

                this.context.peek();
            }
        }


        if(this.context.getCurrentChar() === '-'){
            workArr.push(this.context.getCurrentChar());

            this.context.peek();
        }

        if(this.context.getCurrentChar() === '0'){
            workArr.push(this.context.getCurrentChar());
            this.context.peek();
            if(this.context.getCurrentChar() === '0'){
                throw new Error('Error: Multiple Leading Zeros');
            }
            
            workArr.push(this.context.getCurrentChar());
        }

        getNextNumberSequence();

        if(this.context.getCurrentChar() === '.'){
            workArr.push(this.context.getCurrentChar());

            this.context.peek();

            if(!this.context.getCurrentChar() || !(this.context.getCurrentChar() >= 0 && this.context.getCurrentChar() <= 9)){
                throw new Error('A decimal must be followed by a number')
            }
        }

        getNextNumberSequence();

        let value = Number(workArr.join(""));

        if(!isNaN(value)){
            return value;
        } else {
            throw new Error(`${value} is not a valid number`)
        }
    }
    
}

module.exports = NumberParser;