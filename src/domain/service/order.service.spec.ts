import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service Unit Test", () => {
    it("Should get total of all orders", () => {
        // TODO

        const item1 = new OrderItem("123", 10, "P1", 2);
        const item2 = new OrderItem("abc", 30, "P2", 10);
        const item3 = new OrderItem("234", 100, "P3", 1);

        const order1 = new Order("o1", "Customer1", [item1, item2]);
        const order2 = new Order("o2", "Customer2", [item3]);

        const total = OrderService.total([order1, order2]);
        expect(total).toBe(420);
    });

    it("should place an order", () => {

        const customer = new Customer("123", "Customer1");
        const item1 = new OrderItem("123", 10, "P1", 2);
        const item2 = new OrderItem("abc", 30, "P2", 10);

        const order = OrderService.placeOrder(customer, [item1, item2]);

        expect(customer.rewardPoints).toBe(160);
        expect(order.total()).toBe(320);

    });

});