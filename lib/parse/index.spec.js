const typeChecker = require('js-type-checker');

const jsonParser = require('./');

describe('JSON Parser', () => {
    test('A true boolean value should be valid json', () => {
        expect(jsonParser('true')).toEqual(true);
    });

    test('A false boolean value should be valid json', () => {
        expect(jsonParser('false')).toEqual(false);
    });

    test('null is valid json', () => {
        expect(jsonParser('null')).toEqual(null);
    });

    test('A string is valid json', () => {
        expect(jsonParser(JSON.stringify('test'))).toEqual('test');
    });

    test('an empty array should be valid json', () => {
        expect(jsonParser(JSON.stringify([]))).toEqual([]);
    });

    test('A positive integer should be a valid number', () => {
        expect(jsonParser('1')).toEqual(1);
    });

    test('A negative integer should be a valid number', () => {
        expect(jsonParser('-1')).toEqual(-1);
    });

    test('A positive decimal should be a valid number', () => {
        expect(jsonParser('1.3')).toEqual(1.3);
    });

    test('A negative decimal should be a valid number', () => {
        expect(jsonParser('-1.3')).toEqual(-1.3);
    });

    test('Object with one or more properties should be valid', () => {
        expect(jsonParser(JSON.stringify({name: "Test"}))).toEqual({name: "Test"});
    })

    test('Just - should throw an error', () => {
        expect(() => jsonParser('-')).toThrow('NaN is not a valid number');
    });

    test('Arrays Must have closing brackets', () => {
        expect(() => jsonParser('[')).toThrow('Array Missing Closing Bracket');
    });

    test('Objects Must have closing brackets', () => {
        expect(() => jsonParser('{')).toThrow('Object Missing Closing Bracket');
    });
    
    
    test('Two or more leading zeros should throw an error', () => {
        expect(() => jsonParser('00')).toThrow('Error: Multiple Leading Zeros');
    });

    test('A negative symbol followed by 2 or more zeros should throw an', () => {
        expect(() => jsonParser('-00')).toThrow('Error: Multiple Leading Zeros');
    });

    test('A decimal must be followed by 1 or more valid numbers', () => {
        expect(() => jsonParser('1.')).toThrow('A decimal must be followed by a number');
    });

    test('Can Parse Nested Objects', () => {
        let myObject = {
            name: "test",
            arr: [["one", "Three"]],
            temp: {
                nestedProperty: 2,
            }
        }
        expect(jsonParser(JSON.stringify(myObject, 2))).toEqual(myObject);
    });

    test('Will Use the reviver', () => {
        let temp = {
            a: 2,
            b: 3,
            c: 4,
        }

        let parsedJson = jsonParser(JSON.stringify(temp), (key, value) => {
            if(typeChecker.isNumber(value)){
                return value * 2;
            }

            return value;
        });

        expect(parsedJson).toEqual({
            a: 4,
            b: 6,
            c: 8,
        });
    })
});