import { v4 as uuid } from "uuid"
import OrderFactory, { OrderFactoryProps } from "./order.factory"

describe("Order factory unit tests", () => {

    it("should create a new order", () => {
        const orderProps: OrderFactoryProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    name: "product1",
                    productId: uuid(),
                    price: 10,
                    quantity: 2
                }
            ]
        }

        const order = OrderFactory.create(orderProps)
        expect(order.id).toBe(orderProps.id)
        expect(order.customerId).toBe(orderProps.customerId)
        expect(order.items.length).toBe(1)
    })
})