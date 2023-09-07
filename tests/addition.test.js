// Fonction simple pour l'addition
function add(a, b) {
    return a + b;
}

// Test Jest pour vérifier l'addition
describe('add', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('adds 5 + 7 to equal 12', () => {
        expect(add(5, 8)).toBe(12);
    });
});
