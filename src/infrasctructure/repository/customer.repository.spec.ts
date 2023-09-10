import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/models/customer.model";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer Repository Unit Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a customer", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Roberto Almeida");
        const address = new Address("Rua 1", "São Paulo", "SP", "12345");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "customer1"}});

        expect(customerModel.toJSON()).toEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zip: customer.address.zip,
            activated: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
        
    });

    it("should throw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();
        await expect(customerRepository.find("customer1")).rejects.toThrowError("Customer not found");
    });

    it("should update a customer", async () => {
            
        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Roberto Almeida");
        const address = new Address("Rua 1", "São Paulo", "SP", "12345");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
    
        customer.changeName("Marcel Gonçalves");

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({where: {id: "customer1"}});

        expect(customerModel.toJSON()).toEqual({
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zip: customer.address.zip,
            activated: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        });
            
    });

    it("should find a customer", async () => {
                
        const customerRepository = new CustomerRepository();
        const customer = new Customer("customer1", "Roberto Almeida");
        const address = new Address("Rua 1", "São Paulo", "SP", "12345");
        customer.changeAddress(address);
        customer.activate();
        await customerRepository.create(customer);
    
        const customerFound = await customerRepository.find("customer1");
        const customerModel = await CustomerModel.findOne({where: {id: "customer1"}});


        expect(customerModel.toJSON()).toEqual({
            id: customerFound.id,
            name: customerFound.name,
            street: customerFound.address.street,
            city: customerFound.address.city,
            state: customerFound.address.state,
            zip: customerFound.address.zip,
            activated: customerFound.isActive(),
            rewardPoints: customerFound.rewardPoints,
        });
            
    });

    it("Should find all", async () => {
        
        const customerRepository = new CustomerRepository();
        const customerOne = new Customer("customer1", "Roberto Almeida");
        const addressOne = new Address("Rua 1", "São Paulo", "SP", "12345");
        customerOne.changeAddress(addressOne);
        customerOne.activate();
        await customerRepository.create(customerOne);

        const customerTwo = new Customer("customer2", "Roberto Almeida");
        const addressTwo = new Address("Rua 1", "São Paulo", "SP", "12345");
        customerTwo.changeAddress(addressTwo);
        customerTwo.activate();
        await customerRepository.create(customerTwo);

        const customersFound = await customerRepository.findAll();
        const customers = [customerOne, customerTwo];

        expect(customersFound).toEqual(customers);


    
    });


});