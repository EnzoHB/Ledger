class Weighted {
    constructor(amount, weight) {
        this.weight = weight;
        this.amount = amount;
    };

    get value() {
        return this.weight * this.amount;
    };
};

class Money {
    constructor() {
        this.physical = [];
    };

    add(weight, amount) {
        this.physical.push( new Weighted(amount, weight) )
    };

    get total() {
        return this.physical.reduce((acc, weighted) => acc += weighted.value, 0);
    };
}

const enzo = new Money;

enzo.add(20, 2);
enzo.add(5, 109);
enzo.add(2, 113);
enzo.add(1, 67);
enzo.add(0.5, 83)
enzo.add(0.25, 48);
enzo.add(0.10, 25)/

console.log(enzo.total)
console.log(enzo)