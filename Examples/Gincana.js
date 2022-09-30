import { Ledger } from "../src/core/Ledger.js";
import { Treasure } from "../src/classes/Treasure.js";
import { Person } from "../src/classes/Person.js";
import { Store } from "../src/classes/Store.js";

const ledger = new Ledger('Gincana');
const treasure = new Treasure('Caixa');

const members = [
    'Enzo 1°',
    'Brandão 1°',
    'Guilherme 9°',
    'Giovanna 9°',
    'Eduardo 9°',
    'Danitchele 9°',
    'Angelina 9°',
    'Theo 8°',
    'Matheus 8°',
    'Mariana 8°',
    'Maria Fernanda 8°',
    'Maria Clara 8°',
    'Luísa 8°',
    'Felipe 8°',
    'Lucas 8°',
    'Warley 7°',
    'João Mateus 7°',
    'Gabriella 7°',
    'Felipe 7°',
    'Enzo 7°',
    'Bethina 7°', 
    'Agatha 7°',
    'Isabelle 6°',
    'Valentina 6°',
    'Rafael 6°',
    'Miguel 6°',
    'Matheus 6°',
    'Maria Nívea 6°'
];

const stores = [
    'Requetelo',
    'Serviço de Reciclagem'
];

ledger.add(treasure);
ledger.add(...stores.map(n => new Store(n)));
ledger.add(...members.map(n => new Person(n)));

ledger
.funding()
    .subjects(members)
    .target('Caixa')
    .amount(20)
.build();

ledger
.stores()
    .seller('Requetelo')
    .buyer('Caixa')
    .item()
        .name('Bandeira')
        .price(100)
        .amount(1)
    .build()
.build();

ledger
.stores()
    .seller('Serviço de Reciclagem')
    .buyer('Caixa')
    .item()
        .name('Garrafas PET')
        .price(0.30)
        .amount(80)
    .build()
.build();

console.log(ledger)