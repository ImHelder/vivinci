import {describe, expect, test} from '@jest/globals';

const sum = (a, b) => {
    return a + b;
}

describe('premier ensemble de test', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3);
    });

    test('shoudl fail', () => {
      expect(sum(1, 2)).toBe(5);
    });
});