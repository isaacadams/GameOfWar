import { getRandomInt, randomlyRemoveItemsFromArray } from '../app/scripts/Logic/Common';

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
        const pass = received >= floor && received <= ceiling;
        if (pass) {
            return {
                message: () =>
                `expected ${received} not to be within range ${floor} - ${ceiling}`,
                pass: true,
            };
        } else {
            return {
                message: () =>
                `expected ${received} to be within range ${floor} - ${ceiling}`,
                pass: false,
            };
        }
    }
});

test('some random integer should fall in the range of 5 to 32', () => {
    expect(getRandomInt(5, 32)).toBeWithinRange(5, 32);
});

test('some random integer should NOT fall in the range of 101 to 100', () => {
    expect(getRandomInt(-5, 100)).not.toBeWithinRange(101, 1000);    
});

test('removes 4 items from an array of 6 items and the result should have a length of 4', () => {
    let result = randomlyRemoveItemsFromArray([ 1, 2, 3, 4, 5, 6 ], 4);
    expect(result.length).toBe(4);
});