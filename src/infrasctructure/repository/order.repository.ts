import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/models/order.model";
import OrderItemModel from "../db/sequelize/models/order-item.model";

export default class OrderRepository implements OrderRepositoryInterface {
    

    async create(entity: Order) {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customer_id,
            total: entity.total(),
            items: entity.items.map((item) => {
                return {
                    id: item.id,
                    price: item.price,
                    product_id: item.product_id,
                    quantity: item.quantity,
                };
            }),
            
        }, { include: [{model: OrderItemModel}] });
    }

    async update(entity: Order) {
        await OrderModel.update({
            
        }, { 
            where: { id: entity.id }
        });
    }
    
    async find(id: string): Promise<Order>{
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({where: {id: id}, rejectOnEmpty: true});
            
        } catch (error) {
            throw new Error("Customer not found");
        }

        let order;

        return order;
    }
    async findAll(): Promise<Order[]> {
        const customerModels = await OrderModel.findAll();
        return customerModels.map((OrderModel) => {

            
            let order;

            return order;
        });
    }
}