export default class OrderItem {

    _id: string;
    _product_id: string;
    _quantity: number;
    _price: number;

    constructor(id: string, price: number, product_id: string, quantity: number) {
        this._id = id;
        this._price = price;
        this._quantity = quantity;
        this._product_id = product_id;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get product_id(): string {
        return this._product_id;
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): number {
        return this._price;
    }

    validate(): boolean {
        if (this._quantity <= 0) {
            throw new Error("Quantity should be greater than 0");
        } 

        return true;
    }

    total(): number {
        return this._price * this._quantity;
    }
}