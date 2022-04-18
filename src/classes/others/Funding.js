import { ledger } from "../../init.js.js";
import { Staged } from "../syntax/Staged.js";

class Funding extends Staged {
    constructor() {
        super(Funding);

        this.setter('subjects', []);
        this.setter('target', 'Somebody');
        this.setter('amount', 0);
        this.setter('note', '');
    };
}

export { Funding };