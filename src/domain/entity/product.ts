export default class Product {

    _id: string;
    _name: string;
    _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Invalid product id");
        }

        if (this._name.length === 0) {
            throw new Error("Invalid product name");
        }

        if (this._price < 0) {
            throw new Error("Price should not be less than 0");
        }

        return true;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }
}