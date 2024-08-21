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

const parse = str => {
    const parserContext = new ParserContext(str);
    parserContext.addRule(ArrayParser);
    parserContext.addRule(ObjectParser);
    parserContext.addRule(IdentifierParser);
    parserContext.addRule(BooleanParser);
    parserContext.addRule(NullParser);
    parserContext.addRule(StringParser);
    parserContext.addRule(NumberParser)
    return parserContext.descend();
}

module.exports = parse;
