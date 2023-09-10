import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "John");
customer.address = new Address("123", "Seattle", "WA", "12345");
customer.activate();

const item1 = new OrderItem("1", 1, "Apple", 1);
const item2 = new OrderItem("2", 2, "Orange", 2);

const order = new Order("1", "123", [item1, item2]);