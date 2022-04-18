import { Person } from './Person.js';

class Treasure extends Person {
    constructor(name) {
        super(name);

        this.physical = 0;
        this.digital = 0;

        delete this.balance;
    };

    get balance() {
        return this.digital + this.physical;
    };

    set balance(amount) {
        this.digital = amount;
    };
};

export { Treasure }

// dançarino nato slk
// e foi so pra da o gostinho
// no niver da domi é q eu vou revelar minhas verdadeiras habilidades 