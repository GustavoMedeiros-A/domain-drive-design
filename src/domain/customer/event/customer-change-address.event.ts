import Customer from "../../customer/entity/customer";
import EventInterface from "../../@shared/event/event.interface";



export default class CustomerChangeAddress implements EventInterface {

    dataTimeOccured: Date;
    eventData: Customer;

    constructor(eventData: Customer) {
        this.dataTimeOccured = new Date();
        this.eventData = eventData;
    }
}