class Staged {
    constructor({ init, mod, done }) {
        /** @protected */
        this.properties = {};

        /** @protected */
        this.staged = {};

        /** @protected */
        this.init = init || this.init;

        /** @protected */
        this.done = done || this.done;

        /** @protected */
        this.mod =  mod  || this.mod;

        /** @protected */
        this.building = true;
    };

    /** @protected */
    static(name, value) {
        this.properties[name] = value; 
    };

    /** @protected */
    setter(name, value) {
        this.staged[name] = value;
        this[name] = arg => (this.staged[name] = arg, this.mod(this), this); 
    };

    /** @protected */
    build(done = this.done) { 

        Object
        .entries(this.properties)
        .forEach(([key, value]) => this[key] = value);

        Object
        .entries(this.staged)
        .forEach(([key, value]) => this[key] = value);

        delete this.add;
        delete this.build;
        delete this.staged;
        delete this.properties;
        delete this.building;

        delete this.init;
        delete this.mod;
        delete this.done;

        return done(this, this.done) || this;
    };

    // --------- Control Pattern --------- //

    /** @protected */
    static init() {};

    /** @protected */
    static mod() {};

    /** @protected */
    static done() {};
};

export { Staged };