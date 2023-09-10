import Address from "./address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";

describe("Order Unit Test", () => {

    it ("Should Throw an error when order id is empty", () => {
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Invalid order id");
    });

    it("Should Throw an error when customer id is empty", () => {
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("Customer Id is required");
    });

    it("Should Throw an error when order has no items", () => {
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Order must have at least one item");
    });

    it ("Should calculate the total of the order", () => {
        const item1 = new OrderItem("123", 10, 'Bananas', 2);
        const item2 = new OrderItem("345", 20, "Laranjas", 1);

        const order = new Order("123", "123", [item1, item2]);

        expect(order.total()).toBe(40);
    });

    it ("Should not create an order with an item with zero quantity", () => {
        expect(() => {
            const item1 = new OrderItem("123", 10, 'Bananas', 0);
            const order = new Order("123", "123", [item1]);
        }).toThrowError("Quantity should be greater than 0");

        
    });

});