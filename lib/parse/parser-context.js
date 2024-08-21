class ParserContext {
    constructor(str){
        this.rules = {};
        this.rulesList = [];
        this.currentIndex = -1;
        this.str = str;
        this.currentChar = this.peek();
    }

    getCurrentChar(){
        return this.currentChar;
    }

    assert(ch){
        if(ch !== this.getCurrentChar()){
            throw new Error("Parse Error");
        }
    }

    hasRule(name){
        if(!Object.hasOwn(this.rules, name)){
            return true;
        }

        return false;
    }

    addRule(parserClass){
        if(this.hasRule(parserClass.TYPE)){
            const instance = new parserClass(this);
            this.rules[parserClass.TYPE] = instance;
            this.rulesList.push(instance);
        }
    }

    peek(){
        this.currentIndex = this.currentIndex + 1;

        this.currentChar = this.str.charAt(this.currentIndex);

        return this.currentChar;
    }

    descend(){
        const index = this.rulesList.findIndex(element => element.test());

        if(index !== -1){
            return this.rulesList[index].execute();
        }

        throw new Error(`Invalid Character ${this.getCurrentChar()} Found at ${this.currentIndex}`)
    }
}

module.exports = ParserContext;