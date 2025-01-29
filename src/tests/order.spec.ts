import Order from "../domain/entity/order"
import OrderItem from "../domain/entity/order_item"


describe('order unit test', () => {
    it('should throw when id is empty', () => {
        expect(() => {
            let order = new Order("", "123", [])
        }).toThrow("Id is required")
    })

    it('should throw when customer_id is empty', () => {
        expect(() => {
            let order = new Order("1", "", [])
        }).toThrow("Customer ID is required")
    })

    it('should throw when order_items is empty', () => {
        expect(() => {
            let order = new Order("1", "1", [])
        }).toThrow("Order must contain at least one item")
    })

    it('should calculate total correctly', () => {
        const item = new OrderItem("1", "Item 1", 100, 'p1', 2);
        const item2 = new OrderItem("2", "Item 2", 200, 'p1', 1);
        const order = new Order("1", "Item 1", [item, item2]);
        expect(order.total()).toBe(400);

        const order2 = new Order("2", 'order2', [item])
        expect(order2.total()).toBe(200);
    })
})   