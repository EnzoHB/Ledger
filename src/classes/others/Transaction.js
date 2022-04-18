import { Staged } from "../syntax/Staged.js";
import { nanoid } from "nanoid";

class Transaction extends Staged {
    constructor() {
        super(Transaction);

        // --------- Properties --------- //

        this.static('id', nanoid());

        // --------- Setters ------------ //
    
        this.setter('note', '');
        this.setter('amount', 0);
        this.setter('type', 'simple');
        this.setter('receipt', null);
        this.setter('subject', 'Someone');
        this.setter('target', 'Somebody');
        this.setter('operation', 'payment');

        // --------- Control Flow --------- //

        this.init(this);
    };

    donate(amount) {
        return this.operation('donation').amount(amount);
    };

    lent(amount) {
        return this.operation('lent').amount(amount);
    };

    pay(amount) {
        return this.operation('payment').amount(amount);
    };

    store(receipt) {
        return this.type('store').receipt(receipt);
    };

    profit(receipt) {
        return this.type('profit').receipt(receipt);
    };
};

export { Transaction };