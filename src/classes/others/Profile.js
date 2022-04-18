import { StoreReceipt, ProfitReceipt } from "./Receipt.js";

class Profile {
    constructor(member, ledger) {
        this.member = member;
        this.ledger = ledger;
        this.entries = ledger.fetch().some({
            subject: name => name === member.name,
            target: name => name === member.name,
        })
    };

    *snapshots() {
        
        let profile = this;
        let entries = this.entries;
        let balance = 0;

        for (let index = 0, entry = null, amount = 0; index < entries.length; index++) {

            entry = entries[index];
            amount = entry.amount;
            balance += entry.target == profile.member.name? amount : -amount;

            yield { balance, entry, index, profile };
        };
    };

    fetch() {
        return this.ledger.fetch(this.entries)
    };

    get income() {
        return this.fetch().every({ target: name => name === this.member.name })
    };

    get outcome() {
        return this.fetch().every({ subject: name => name === this.member.name })
    };

    get lents() {
        return this.fetch().every({ operation: name => name === 'lent' })
    };

    get donations() {
        return this.fetch().every({ operation: name => name === 'donation' })
    };

    get payments() {
        return this.fetch().every({ operation: name => name === 'payment' })
    };

    get stores() {
        return this.fetch().every({ note: note => note instanceof StoreReceipt })
    };

    get profits() {
        return this.fetch().every({ note: note => note instanceof ProfitReceipt })
    };
};

export { Profile };