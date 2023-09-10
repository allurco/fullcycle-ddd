export default class Address {

    _street: string;
    _city: string;
    _state: string;
    _zip: string;

    constructor (street: string, city: string, state: string, zip: string) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip = zip;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zip(): string {
        return this._zip;
    }

    validate(): boolean {
        
        if (this._street.length === 0) {
            throw new Error("Invalid street");
        }

        if (this._city.length === 0) {
            throw new Error("Invalid city");
        }

        if (this._state.length === 0) {
            throw new Error("Invalid state");
        }

        if (this._zip.length === 0) {
            throw new Error("Invalid zip");
        }

        return true;
    }


}