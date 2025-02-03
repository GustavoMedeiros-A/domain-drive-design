import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangeAddress from "../customer-change-address.event";


export default class EnviaConsoleLogHandler implements EventHandlerInterface<CustomerChangeAddress> {
    handle(event: CustomerChangeAddress): void {
        event.eventData.id;        
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address.street}`); 
    }
}