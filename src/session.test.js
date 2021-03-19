import { session } from './session';

const aDecimal = 3.14;
const aFalse = false;
const aFalseString = 'false';
const anEmptyArray = [];
const anEmptyObject = {};
const anEmptyString = '';
const anInteger = 42;
const aNull = null;
const aPopulatedArray = ['one', 2, 3.14, {four: 4}];
const aPopulatedObject = {one: 'uno', two: 2, pi: 3.14, numbers: [1, 3, 3]};
const aString = 'foo dawg';
const aTrue = true;
const aTrueString = 'true';

// clear()

test('clear() should leave no values in sessionStorage', () => {
   session.setItem('aPopulatedObject', aPopulatedObject);
   session.setItem('aNull', aNull);
   session.setItem('aString', aString);
   session.clear();
   expect(JSON.stringify(sessionStorage)).toEqual('{}');
});

// getItem()

test(`getItem() should return a NULL if the itemName doesn't exist`, () => {
   expect(session.getItem('foo')).toEqual(null);
});

test(`getItem() should use defaultValue if the itemName doesn't exist`, () => {
   session.getItem('foo', 'bar');
   expect(session.getItem('foo')).toEqual('bar');
   session.clear();
});

// getItem() & setItem()

test('getItem() should return the proper data type for stored items', () => {
   session.setItem('aDecimal', aDecimal);
   session.setItem('aFalse', aFalse);
   session.setItem('aFalseString', aFalseString);
   session.setItem('anEmptyArray', anEmptyArray);
   session.setItem('anEmptyObject', anEmptyObject);
   session.setItem('anEmptyString', anEmptyString);
   session.setItem('anInteger', anInteger);
   session.setItem('aNull', aNull);
   session.setItem('aPopulatedArray', aPopulatedArray);
   session.setItem('aPopulatedObject', aPopulatedObject);
   session.setItem('aString', aString);
   session.setItem('aTrue', aTrue);
   session.setItem('aTrueString', aTrueString);
   expect(session.getItem('aDecimal')).toEqual(aDecimal);
   expect(session.getItem('aFalse')).toEqual(aFalse);
   expect(session.getItem('aFalseString')).toEqual(aFalseString);
   expect(session.getItem('anEmptyArray')).toEqual(anEmptyArray);
   expect(session.getItem('anEmptyObject')).toEqual(anEmptyObject);
   expect(session.getItem('anEmptyString')).toEqual(anEmptyString);
   expect(session.getItem('anInteger')).toEqual(anInteger);
   expect(session.getItem('aNull')).toEqual(aNull);
   expect(session.getItem('aPopulatedArray')).toEqual(aPopulatedArray);
   expect(session.getItem('aPopulatedObject')).toEqual(aPopulatedObject);
   expect(session.getItem('aString')).toEqual(aString);
   expect(session.getItem('aTrue')).toEqual(aTrue);
   expect(session.getItem('aTrueString')).toEqual(aTrueString);
   session.clear();
});

// removeItem()

test('removeItem() should remove the item', () => {
   session.setItem('aDecimal', aDecimal);
   session.removeItem('aDecimal');
   expect(session.getItem('aDecimal')).toEqual(null);
   session.clear();
});
