import { Ledger } from "../src/core/Ledger.js";
import { Treasure } from "../src/classes/Treasure.js";
import { Person } from "../src/classes/Person.js";
import { Store } from "../src/classes/Store.js";

const ledger = new Ledger('Geografia');
const treasure = new Treasure('Banco');

const members = [
    new Person('Enzo'),
    new Person('Luísa'),
    new Person('Miguel'),
    new Person('Brandão'),
    new Person('Eduardo'),
    new Person('João Lucas'),
];

const stores = [
    new Store('Elétrica Brioto'),
    new Store('Floricultura'),
    new Store('Loja de Festa'),
    new Store('Farmácia'),
    new Store('Tema Print')
];

ledger.add(treasure);
ledger.add(...stores);
ledger.add(...members);

ledger
.funding()
    .subjects(members.map(person => person.name))
    .target('Banco')
    .amount(30)
.build();

ledger
.stores()
    .seller('Elétrica Brioto')
    .buyer('Banco')
    .item()
        .name('Lâmpada')
        .price(8)
        .amount(1)
    .build()
    .item()
        .name('Suporte Redondo')
        .price(10)
        .amount(1)
    .build()
    .item()
        .name('Suporte Direcionado')
        .price(12)
        .amount(1)
    .build()
.build()

ledger
.stores()
    .seller('Floricultura')
    .buyer('Banco')
    .item()
        .name('Terrário')
        .price(58)
        .amount(1)
    .build()
.build();

ledger
.stores()
    .seller('Loja de Festa')
    .buyer('Banco')
    .item()
        .name('Bexigas')
        .price(0.50)
        .amount(10)
    .build()
.build();

ledger
.stores()
    .seller('Farmácia')
    .buyer('Banco')
    .item()
        .name('Água oxigenada 10V')
        .price(3)
        .amount(1)
    .build()
    .item()
        .name('Água Oxigenada 40V')
        .price(3)
        .amount(1)
    .build()
    .item()
        .name('Seringa')
        .price(4)
        .amount(1)
    .build()
.build();

ledger
.stores()
    .seller('Tema Print')
    .buyer('Banco')
    .item()
        .name('Cartaz')
        .price(11)
        .amount(1)
    .build()
.build();








console.dir(ledger, { depth: 4 })