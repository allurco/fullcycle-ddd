import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class SendEmailWhenCustomerAddressIsChangedHandler implements EventHandlerInterface {
    handle(event: CustomerAddressChangedEvent) {
        const customer = event.eventData;
        const endereco = `${customer.address.street}, ${customer.address.city}, ${customer.address.state}, ${customer.address.zip}`;
        console.log(`Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${endereco}`);
    }
}