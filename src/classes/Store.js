import { Person } from "./Person.js";

class Store extends Person {
    constructor(name) { 
        super(name);

        this.balance = Infinity;
        this.sending = false;
        this.address = null;
        this.catalog = new Map;
        this.receipts = new Map;
    };

    receipt(receipt) {

        const { catalog } = this;
        const { receipts } = this;

        receipt.items.forEach(({ name, price, id }) => {
            catalog.set(name, { name, price, id });
        });

        receipts.set(receipt.id, receipt);

        return this;
    };
};

export { Store }