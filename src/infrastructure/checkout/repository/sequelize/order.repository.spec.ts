import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderItemModel from "./order-item.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import { Product } from "../../../../domain/product/entity/products";
import OrderRepository from "./order.repository";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";

describe("order repository test", () => {
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync();


        const customerRepository = new CustomerRepository();
        const customer = new Customer("3", "customer3");
        const address = new Address("Street1", 1, "zipcode1", "city1");

        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product1 = new Product("3", "product3", 100);
        await productRepository.create(product1);

        const orderItem = new OrderItem("3", product1.name, product1.price, product1.id, 2);

        const order = new Order("2", customer.id, [orderItem])
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

    })
    afterEach(async () => {
        await sequelize.close();
    })

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "customer1");
        const address = new Address("Street1", 1, "zipcode1", "city1");

        customer.changeAddress(address);
        await customerRepository.create(customer);
    
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "product1", 100);
        await productRepository.create(product1);

        const orderItem = new OrderItem("1", product1.name, product1.price, product1.id, 2);

        const order = new Order("1", customer.id, [orderItem])
        
        const orderRepository = new OrderRepository();
        await orderRepository.create(order)
    
        const orderModel = await OrderModel.findOne({ where: { id: order.id, }, include: ["items"]});
        expect(orderModel).toBeDefined()
        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customerId: customer.id,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    productId: orderItem.productId,
                    orderId: "1",
                }
            ]
        })
    })

    it("should return a order", async () => {
        const orderRepository = new OrderRepository();

        const orderModel = await orderRepository.find("2");
        expect(orderModel).toBeDefined()
    })

    it("should return all orders", async () => {
        const orderRepository = new OrderRepository();

        const ordersModel = await orderRepository.findAll();
        expect(ordersModel).toBeDefined()
        expect(ordersModel.length).toBe(1)
    })

    it("should throw a error when not found order", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("456");
        }).rejects.toThrow("Order not found")
    })

    it("should update a order", async () => {
        const orderRepository = new OrderRepository();
        const order = await orderRepository.find("2");
        order.items.map(item => item.price === 200)

        await orderRepository.update(order)

        expect(order.total()).toEqual(200);

       
    })
})