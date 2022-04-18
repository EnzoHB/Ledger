import { Staged } from '../syntax/Staged.js';
import { nanoid } from 'nanoid';

class Item extends Staged {
    constructor() {
        super(Item);

        this.static('id', nanoid());

        this.setter('name', 'Product');
        this.setter('price', 0);
        this.setter('amount', 1);
    }
};

class StoreReceipt extends Staged {
    constructor() {
        super(StoreReceipt);

        this.static('id', nanoid());
        this.static('items', []);

        this.setter('info', 'Some purchase');
        this.setter('seller', 'Someone');
        this.setter('buyer', 'Somebody');
        this.setter('note', '');
        this.setter('tax', 0);
    };

    item() {
        Item.done = instance => (
            this?.properties.items.push(instance),
            this
        );

        return new Item;
    };

    get total() {
        return this?.items.reduce((accumulator, { price, amount }) => accumulator += price * amount, this.tax);
    };
};

class Cuff extends Staged {
    constructor() {
        super(Cuff);

        this.static('id', nanoid());

        this.setter('buyer',' Someone');
        this.setter('item',' Some Item');
        this.setter('amount',0);
        this.setter('payed', false);
    };
}; 

class ProfitReceipt extends Staged {
    constructor() {
        super(ProfitReceipt);

        this.static('id', nanoid());
        this.static('items', new Map);
        this.static('cuffs', new Map);

        this.setter('info', 'Some profit');
        this.setter('seller', 'Someone');
        this.setter('provider', 'Somebody');
        this.setter('note', '');
        this.setter('gross', null)
    };

    cuff() {

        const { cuffs } = this.properties;
        const { items } = this.properties;

        Cuff.done = instance => {
            if (!items.has(instance.item))
                throw new Error(`${instance.item} not previously defined as an available item`);

                cuffs.set(instance.id, instance);

                return this;
        };

        return new Cuff;
    };

    item() {

        Item.done = instance => (
            this?.properties.items.set(instance.name, instance),
            this
        );

        return new Item;
    };

    get sales() {
        if (!this.building)
        return this.total - this.pendent;
    };

    get pendent() {

        var { building } = this;
        var { cuffs } = this;
        var { items } = this;

        if (building) return;

        var total = 0;
        var cuffs = cuffs.forEach(({ amount, item }) => total += items.get(item).price * amount);

        return total;
    };

    get total() {
        if (this.building) return;

        if (this.gross) 
            return this.gross;
            return this.expected;
    };

    get expected() {

        var { building } = this;
        var { items } = this;

        if (building) return;

        var total = 0;
        var items = items.forEach(({ price, amount }) => total += price * amount);

        return total;
    };

    get deviation() {
        if (!this.building) 
        return this.total - this.expected;
    };
};

export { StoreReceipt, ProfitReceipt };