import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class NotifyAdminWhenCustomerIsCreatedHandler implements EventHandlerInterface {
    handle(event: CustomerCreatedEvent) {
        console.log('Esse é o primeiro console.log do evento: CustomerCreated');
    }
}