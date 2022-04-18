import { nanoid } from 'nanoid';

class Person {
    constructor(name) {
        this.id = nanoid()
        this.name = name;
        // this.phone = null;
        // this.email = null;
        // this.photo = null;
        this.balance = 0;
        this.receiving = true;
        this.sending = true;
    };

    send(amount) {
        if (this.sending) 
            return this.balance -= amount;
            throw new Error('Operation not allowed');
    };

    receive(amount) {
        if (this.receiving) 
            return this.balance += amount;
            throw new Error('Operation not allowed');
    };
};

export { Person };
