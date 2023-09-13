import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/models/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";
import OrderModel from "../db/sequelize/models/order.model";
import ProductModel from "../db/sequelize/models/product.model";
import OrderItemModel from "../db/sequelize/models/order-item.model";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import { or } from "sequelize";

describe("Order Repository Unit Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel, OrderModel, ProductModel, OrderItemModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });


    it("should create an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Roberto Almeida");
        const address = new Address("Rua 1", "São Paulo", "SP", "12345");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Apple", 100);
        const product2 = new Product("2", "Orange", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("1", product1.price, product1.id, 1);
        const orderItem2 = new OrderItem("2", product2.price, product2.id, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("order1", customer.id, [orderItem1, orderItem2]);
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({where: {id: "order1"}, include: ["items"]});
        console.log(orderModel.toJSON());
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customer_id,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    price: orderItem1.price,
                    product_id: orderItem1.product_id,
                    quantity: orderItem1.quantity,
                    order_id: order.id,

                },
                {
                    id: orderItem2.id,
                    price: orderItem2.price,
                    product_id: orderItem2.product_id,
                    order_id: order.id,
                    quantity: orderItem2.quantity,
                },
            ],
        })


    });

    it("should update an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Roberto Almeida");
        const address = new Address("Rua 1", "São Paulo", "SP", "12345");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Apple", 100);
        const product2 = new Product("2", "Orange", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("1", product1.price, product1.id, 1);
        const orderItem2 = new OrderItem("2", product2.price, product2.id, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("order1", customer.id, [orderItem1]);
        await orderRepository.create(order);

        order.addItems([orderItem2]);
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({where: {id: "order1"}, include: ["items"]});
        console.log(orderModel.toJSON());
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customer_id,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    price: orderItem1.price,
                    product_id: orderItem1.product_id,
                    quantity: orderItem1.quantity,
                    order_id: order.id,

                },
                {
                    id: orderItem2.id,
                    price: orderItem2.price,
                    product_id: orderItem2.product_id,
                    order_id: order.id,
                    quantity: orderItem2.quantity,
                },
            ],
        });

    });


    it("should find an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Roberto Almeida");
        const address = new Address("Rua 1", "São Paulo", "SP", "12345");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Apple", 100);
        const product2 = new Product("2", "Orange", 200);
        await productRepository.create(product1);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem("1", product1.price, product1.id, 1);
        const orderItem2 = new OrderItem("2", product2.price, product2.id, 2);

        const orderRepository = new OrderRepository();
        const order = new Order("order1", customer.id, [orderItem1]);
        await orderRepository.create(order);

        const orderModel = await orderRepository.find("order1");
        expect(orderModel).toStrictEqual(order);


    });

    it("should find all orders", async () => {
            
            const customerRepository = new CustomerRepository();
            const customer = new Customer("customer1", "Roberto Almeida");
            const address = new Address("Rua 1", "São Paulo", "SP", "12345");
            customer.changeAddress(address);
            customer.activate();
            await customerRepository.create(customer);
    
            const productRepository = new ProductRepository();
            const product1 = new Product("1", "Apple", 100);
            const product2 = new Product("2", "Orange", 200);
            await productRepository.create(product1);
            await productRepository.create(product2);
    
            const orderItem1 = new OrderItem("1", product1.price, product1.id, 1);
            const orderItem2 = new OrderItem("2", product2.price, product2.id, 2);
            const orderItem3 = new OrderItem("3", product1.price, product1.id, 1);
            const orderItem4 = new OrderItem("4", product2.price, product2.id, 2);

            const orderRepository = new OrderRepository();
            const order = new Order("order1", customer.id, [orderItem1, orderItem2]);
            await orderRepository.create(order);

            const order2 = new Order("order2", customer.id, [orderItem3, orderItem4]);
            console.log(order2);
            await orderRepository.create(order2); 

            const orderModel = await orderRepository.findAll();
            expect(orderModel).toStrictEqual([order, order2]);
            
    
            
    });
    


});