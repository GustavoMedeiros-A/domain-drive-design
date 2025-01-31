
import Order from "../../../../domain/entity/order";
import OrderItem from "../../../../domain/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";


export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                orderId: entity.id,
            }))
            },
            {
                include: [{ model: OrderItemModel }],
            }
        )
    }
    async update(entity: Order): Promise<void> {
        let orderModel;
        const order = await OrderModel.findOne({ where: {id: entity.id}, include: [{ model: OrderItemModel }] },)

        await order.update({
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId,
                orderId: entity.id,
            }))
        })
    
    
    }
    async find(id: string): Promise<Order> {
        let orderModel;
        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id,
                },
                include: [{ model: OrderItemModel }],
                rejectOnEmpty: true,
            })
        } catch(error) {
            throw new Error("Order not found");
        }

        const order = new Order(id, orderModel.customerId,            
            orderModel.items.map(item => new OrderItem(
            item.id,
            item.name,
            item.price,
            item.productId,
            item.quantity
        ))
            
        )

        return order;
    }
    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel }],
        })

        return orderModels.map(orderModel => new Order(
            orderModel.id,
            orderModel.customerId,
            orderModel.items.map(item => new OrderItem(
                item.id,
                item.name,
                item.price,
                item.productId,
                item.quantity
            ))
        ))
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}