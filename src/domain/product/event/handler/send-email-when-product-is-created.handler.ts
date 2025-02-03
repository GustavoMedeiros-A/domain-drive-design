import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../../../product/event/product-created.event";


export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        // should send email...
        console.log("send email to...", event.eventData); 
        console.log("Para o rabbitMQ"); 
        
    }
    
}