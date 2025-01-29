import Customer from "../domain/entity/customer";
import Order from "../domain/entity/order";
import OrderItem from "../domain/entity/order_item";
import OrderService from "../domain/services/order.service";

describe("Order service unit test", () => {

    it("Should place an order", () => {
        const customer = new Customer("c1", "customer");
        const item1 = new OrderItem("i1", "item 1", 100, 'p1', 1);
        
        const order = OrderService.placeOrder(customer, [item1])

        expect(customer.rewardPoints).toBe(50);
        expect(order.total()).toBe(100);


    })

   it("should get total of all orders", () => {
    const item1 = new OrderItem("i1", "item 1", 100, 'p1', 1);
    const item2 = new OrderItem("i2", "item 2", 200, 'p2', 2);


    const order1 = new Order("o1", 'c1', [item1])
    const order2 = new Order("o2", 'c1', [item2])

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(500);

   }) 

   it('should add rewards points', () => {
    const customer = new Customer("c1", "customer");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

   })
})