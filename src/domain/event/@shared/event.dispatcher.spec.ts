import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
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
})