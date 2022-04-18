import { Person } from "../classes/Person.js";
import { Store } from "../classes/Store.js";
import { ProfitReceipt, StoreReceipt } from '../classes/others/Receipt.js';
import { Profit } from "../classes/Profit.js";
import { Profile } from "../classes/others/Profile.js";
import { Transaction } from "../classes/others/Transaction.js";
import { Funding } from "../classes/others/Funding.js";

class Ledger {
    constructor(name) {
        this.name = name;
        this.members = new Map;
        this.pendent = new Map;
        this.history = [];  
    };

    add(...members) {
        members.forEach(member => this.members.set(member.name, member))
    };

    is(name, instance) { 
        if (!this.members.has(name))
        throw new Error(`${name} is not a ledger member`); 

        if (instance)

        if (!(this.members.get(name) instanceof instance))
        throw new Error(`${name} is not a instance of ${instance.name}`);
    };

    transaction() {

        const ledger = this;

        const { members } = this;
        const { history } = this;
        const { pendent } = this;

        Transaction.init = transaction => {
            ledger.pendent.set(transaction.properties.id, transaction);
        };

        Transaction.done = transaction => {

            ledger.is(transaction.subject);
            ledger.is(transaction.target);

            members.get(transaction.subject).send(transaction.amount);
            members.get(transaction.target).receive(transaction.amount);

            pendent.delete(transaction.id);
            history.push(transaction); 

            return ledger;
        };

        return new Transaction;
    };

    funding() {

        let ledger = this;

        Funding.done = instance => {
            instance.subjects.forEach(subject => {
                ledger
                .transaction()
                    .subject(subject)
                    .target(instance.target)
                    .donate(instance.amount)
                    .note(instance.note)
                .build();
            })
        };

        return new Funding;
    };

    stores() {

        let ledger = this;

        StoreReceipt.done = instance => {

            ledger.is(instance.seller, Store);
            ledger.is(instance.buyer, Person);

            ledger.members.get(instance.seller).receipt(instance);
            ledger
            
            .transaction()
            
            .store(instance)

            .subject(instance.buyer)

            .target(instance.seller)

            .pay(instance.total)

            .note(instance.note)

            .build();
        };

        return new StoreReceipt;
    };

    profits() {

        let ledger = this;

        ProfitReceipt.done = instance => {

            ledger.is(instance.seller, Person);
            ledger.is(instance.provider, Profit);

            ledger.members.get(instance.provider).receipt(instance);
            ledger
            
            .transaction()
            
            .profit(instance)

            .subject(instance.provider)

            .target(instance.seller)

            .pay(instance.total)

            .note(instance.note)

            .build();
        };

        return new ProfitReceipt;
    };

    treasures() {

    };

    fetch() {
        return Ledger.fetch(this.history);
    };

    static fetch(entries) {

        const some  = props => entries.filter(entry => Object.entries(props).some (([key, filter]) => filter(entry[key], key, entry)));
        const every = props => entries.filter(entry => Object.entries(props).every(([key, filter]) => filter(entry[key], key, entry)));

        return {
            some,
            every
        }
    };
};

ledger.
treasures().
    name().
    profits().
        info('Enzo').

    build()
    physical().
        money().
            weight(5).
            value(105)
        .build().
        .money().
            weight(20).

    build().
build();


/*

*/





export { Ledger }