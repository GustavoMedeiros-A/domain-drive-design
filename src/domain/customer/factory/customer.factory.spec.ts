import { Address } from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("customer factory unit test", () => {

    it("should create a new customer", () => {
        const customer = CustomerFactory.create("Gustavo");

        expect(customer.name).toBe("Gustavo");
        expect(customer.Address).toBeUndefined();
        expect(customer.id).toBeDefined()
    });

    it("should create a new customer with address", () => {
        const address = new Address("Rua 1", 1, "12345-678", "Cidade");
        const customer = CustomerFactory.createCustomerWithAddress("Gustavo", address);

        expect(customer.name).toBe("Gustavo");
        expect(customer.Address).toBeDefined();
        expect(customer.Address).toBeInstanceOf(Address);
        expect(customer.Address!.street).toBe("Rua 1");
        expect(customer.Address!.number).toBe(1);
        expect(customer.Address!.zip).toBe("12345-678");
        expect(customer.Address!.city).toBe("Cidade");
        expect(customer.id).toBeDefined()
    })
})