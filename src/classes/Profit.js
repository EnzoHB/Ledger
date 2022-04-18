import { Person } from "./Person.js";

class Profit extends Person {
    constructor(type) {
        super(type);

        this.balance = Infinity;
        this.receiving = false;
        this.products = new Map;
        this.receipts = new Map;
    };

    receipt(receipt) {

        const { receipts } = this;
        const { products } = this;

        receipt.items.forEach(({ name, price, id }) => {
            products.set(name, { name, price, id });
        });

        receipts.set(receipt.id, receipt);

        return this;
    };
};

export { Profit };