
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("domain event testes", () => {

    it("should register a new event", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();


        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);


        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").length).toBe(2);
        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
    })

    it("should unregister a event", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
    })

    it("should unregister all events", () => {
        const eventDispatcher = new EventDispatcher();
        
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent")).toBeUndefined();
    })

    it("should register a event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle")

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent")[0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent(
            {
                name: "Teste",
                description: "Descrição do produto",
                price: 10.0,
            }
        );

        // Quando o notify for executado, o sendEmailWhenProductIsCreatedHandler.handle() deve ser chamado...
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
        expect(spyEventHandler).toHaveBeenCalledTimes(1);
    })
})