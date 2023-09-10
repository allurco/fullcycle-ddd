import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/models/customer.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    

    async create(entity: Customer) {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zip: entity.address.zip,
            activated: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        });
    }

    async update(entity: Customer) {
        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            city: entity.address.city,
            state: entity.address.state,
            zip: entity.address.zip,
            activated: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        }, { 
            where: { id: entity.id }
        });
    }
    async find(id: string): Promise<Customer>{
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({where: {id: id}, rejectOnEmpty: true});
            
        } catch (error) {
            throw new Error("Customer not found");
        }

        const address = new Address(
            customerModel.street,
            customerModel.city,
            customerModel.state,
            customerModel.zip,
        );

        const customer = new Customer(
            customerModel.id,
            customerModel.name,
        );

        customer.changeAddress(address);

        customer.addRewardPoints(customerModel.rewardPoints);

        if (customerModel.activated) {
            customer.activate();
        }

        return customer;
    }
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
        return customerModels.map((customerModel) => {

            const address = new Address(
                customerModel.street,
                customerModel.city,
                customerModel.state,
                customerModel.zip,
            );
    
            const customer = new Customer(
                customerModel.id,
                customerModel.name,
            );
    
            customer.changeAddress(address);
    
            if (customerModel.activated) {
                customer.activate();
            }

            customer.addRewardPoints(customerModel.rewardPoints);
    
            return customer;
        });
    }
}