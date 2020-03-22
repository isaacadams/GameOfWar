import { getRandomInt } from '@isaacadams/extensions';
import { Card } from '../app/scripts/Logic/Card';

// https://jestjs.io/docs/en/api


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

test('new card has a value of 0', () => {
    expect(new Card().value).toEqual(undefined);
});