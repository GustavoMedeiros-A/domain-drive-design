import EventDispatcher from "../../@shared/event/event-dispatcher";
import { Address } from "../../customer/entity/address";
import Customer from "../../customer/entity/customer";
import CustomerChangeAddress from "./customer-change-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";
import { EnviaConsoleLog1Handler } from "./handler/envia-console-log1.handler";
import { EnviaConsoleLog2Handler } from "./handler/envia-console-log2.handler";

describe("Test all customer events", () => {

    it("Should call both handlers when a CustomerCreatedEvent is notified", () => {
        const eventDispatcher = new EventDispatcher();
    
        const console1 = new EnviaConsoleLog1Handler();
        const console2 = new EnviaConsoleLog2Handler();
    
        eventDispatcher.register("CustomerCreatedEvent", console1);
        eventDispatcher.register("CustomerCreatedEvent", console2);
    
        const spy1 = jest.spyOn(console1, "handle");
        const spy2 = jest.spyOn(console2, "handle");
    
        const event = new CustomerCreatedEvent({ 
          id: "123", 
          name: "Fulano" 
        });
    
        eventDispatcher.notify(event);
    
        expect(spy1).toHaveBeenCalledWith(event);
        expect(spy2).toHaveBeenCalledWith(event);
      });

      it("should call change address handler", () => {
        const customer = new Customer("1", "Joaquim");
        const address = new Address("Avenida Brasil", 10, "123123", "RJ")
        customer.Address = address;
        const newAddress = new Address("Avenida Rio Branco", 1000, "323123", "JF");

        customer.changeAddress(newAddress)


        const eventDispatcher = new EventDispatcher();
        const handleChangeAddress = new EnviaConsoleLogHandler();
        eventDispatcher.register("CustomerChangeAddress", handleChangeAddress);
        const spyChangeAddress = jest.spyOn(handleChangeAddress, "handle");
        const event = new CustomerChangeAddress(customer);
        eventDispatcher.notify(event);
        expect(spyChangeAddress).toHaveBeenCalledWith(event);



      })
})