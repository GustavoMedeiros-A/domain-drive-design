import { Address } from "../../domain/customer/entity/address";
import Customer from "../../domain/customer/entity/customer";


describe("Customer unit tests", () => {
    const customer = new Customer("123", "Gustavo");
    
    it("should create a new customer", () => {
        expect(customer.id).toBe("123");
        expect(customer.name).toBe("Gustavo");
        expect(customer.isActive()).toBe(false);
    });

    it("should activate a customer", () => {
        customer.Address = new Address("Rua 1", 2, "12342-321", "Juiz de Fora");
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should throw an error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    

    it("should deactivate a customer", () => {
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    })

    it("should throw an error when creating a customer with an empty ID", () => {
        expect(() => new Customer("", "Gustavo")).toThrow("ID cannot be null");
    });

    it("should change customer name", () => {
        customer.changeName("Gustavo Moura");
        expect(customer.name).toBe("Gustavo Moura");
    })

    it("should throw an error when creating a customer with an empty name", () => {
        expect(() => new Customer("123", "")).toThrow("name cannot be null");
    });

    it("should get 1 as result", () => {
        const result  = 1;
        expect(result).toBe(1);
    })
})