import OrderItem from "./order_item";

export default class Order {

    _id: string;
    _customer_id: string;
    _items: OrderItem[];
    _total: number;

    constructor(id: string, customer_id: string, items: OrderItem[]) {
        this._id = id;
        this._customer_id = customer_id;
        this._items = items;
        this._total = this.total();

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customer_id(): string {
        return this._customer_id;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("Invalid order id");
        }

        if (this._customer_id.length === 0) {
            throw new Error("Customer Id is required");
        }

        if (this._items.length === 0) {
            throw new Error("Order must have at least one item");
        }

        return true;
    }

    addItems(items: OrderItem[]) {
        this._items = this._items.concat(items);
        this._total = this.total();
    }

    total(): number {

        return this._items.reduce((total, item) => {
            return total + item.total();
        }, 0);
        
    }
}