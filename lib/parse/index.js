const typeChecker = require('js-type-checker');

const ParserContext = require('./parser-context');

const {
    ArrayParser,
    BooleanParser,
    ObjectParser,
    IdentifierParser,
    NullParser,
    StringParser,
    NumberParser,
} = require('./parsers');

const parse = (str, reviver) => {
    const walker = (obj, key) => {
        const value = obj[key];
        if(typeChecker.isObject(value)){
            for (const property of Object.keys(value)){
                let temp = walker(value, property);
                if(!typeChecker.isUndefined(temp)){
                    value[property] = temp;
                } else {
                    delete value[property];
                }
            }
        }

        return reviver.call(obj, key, value);
    };

    const parserContext = new ParserContext(str);

    parserContext.addRule(ArrayParser);
    parserContext.addRule(ObjectParser);
    parserContext.addRule(IdentifierParser);
    parserContext.addRule(BooleanParser);
    parserContext.addRule(NullParser);
    parserContext.addRule(StringParser);
    parserContext.addRule(NumberParser);

    const result = parserContext.descend();

    return typeChecker.isFunction(reviver) ? walker({"": result}, "") : result;
}

module.exports = parse;
