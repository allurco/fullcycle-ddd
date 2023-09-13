import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/models/order.model";
import OrderItemModel from "../db/sequelize/models/order-item.model";
import OrderItem from "../../domain/entity/order_item";

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
            customer_id: entity.customer_id,
            total: entity.total(),
        }, { 
            where: { id: entity.id },
        });

        const orderModel = await OrderModel.findOne({where: {id: entity.id}});

        const items = await OrderItemModel.findAll({where: {order_id: orderModel.id}});
        const new_items = entity.items.filter((item) => {
            return !items.find((i) => i.id === item.id);
        });

        await OrderItemModel.bulkCreate(new_items.map((item) => {
            return {
                id: item.id,
                price: item.price,
                product_id: item.product_id,
                quantity: item.quantity,
                order_id: orderModel.id,
            };
        }));


    }
    
    async find(id: string): Promise<Order>{
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({where: {id: id}, rejectOnEmpty: true, include: ["items", "customer"]});
            
        } catch (error) {
            throw new Error("Order not found");
        }

        const items = orderModel.items.map((item) => {
            const itemFinal = new OrderItem(item.id, item.price, item.product_id, item.quantity);
            return itemFinal;
        });

        let order = new Order(orderModel.id, orderModel.customer.id, items);

        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({include: ["items", "customer"]});
        return orderModels.map((orderModel) => {

            const items = orderModel.items.map((item) => {
                const itemFinal = new OrderItem(item.id, item.price, item.product_id, item.quantity);
                return itemFinal;
            });
            
            let order = new Order(orderModel.id, orderModel.customer.id, items);
            return order;
        });
    }
}