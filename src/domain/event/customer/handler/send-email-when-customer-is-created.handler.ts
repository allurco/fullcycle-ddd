import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerIsCreatedHandler implements EventHandlerInterface {
    handle(event: CustomerCreatedEvent) {
        console.log('Esse é o segundo console.log do evento: CustomerCreated');
    }
}