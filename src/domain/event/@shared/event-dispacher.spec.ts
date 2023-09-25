import Address from "../../entity/address";
import Customer from "../../entity/customer";
import Product from "../../entity/product";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import NotifyAdminWhenCustomerIsCreatedHandler from "../customer/handler/notify-admin-when-customer-is-created.handler";
import SendEmailWhenCustomerAddressIsChangedHandler from "../customer/handler/send-email-when-customer-address-is-changed.handler";
import SendEmailWhenCustomerIsCreatedHandler from "../customer/handler/send-email-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispacher from "./event-dispacher";
describe('Event Dispatcher Unit Test', () => {

    it('Should register event', () => {
        
        const dispatcher = new EventDispacher();
        const handler = new SendEmailWhenProductIsCreatedHandler();

        dispatcher.register('ProductCreatedEvent', handler);

        expect(dispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(dispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(dispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(handler);   

    });

    it ('Should unregister event', () => {

        const dispatcher = new EventDispacher();
        const handler = new SendEmailWhenProductIsCreatedHandler();

        dispatcher.register('ProductCreatedEvent', handler);

        expect(dispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

        dispatcher.unregister('ProductCreatedEvent', handler);

        expect(dispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
        
    });

    it ('Should unregister all events', () => {
            
        const dispatcher = new EventDispacher();
        const handler = new SendEmailWhenProductIsCreatedHandler();

        dispatcher.register('ProductCreatedEvent', handler);

        expect(dispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

        dispatcher.unregisterAll();

        expect(dispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
            
    });

    it ('Should notify event', () => {
                
            const dispatcher = new EventDispacher();
            const handler = new SendEmailWhenProductIsCreatedHandler();
            const spyHandler = jest.spyOn(handler, 'handle');
    
            dispatcher.register('ProductCreatedEvent', handler);
    
            expect(dispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

            const productCreatedEvent = new ProductCreatedEvent({
                name: 'P1',
                description: 'P1 description',
                price: 10
            })
    
            dispatcher.notify(productCreatedEvent);
    
            expect(spyHandler).toHaveBeenCalled();
    });

    it ('Should notify event with multiple handlers', () => {
        
        const dispatcher = new EventDispacher();
        const handler1 = new NotifyAdminWhenCustomerIsCreatedHandler();
        const handler2 = new SendEmailWhenCustomerIsCreatedHandler();
        const spyHandler1 = jest.spyOn(handler1, 'handle');
        const spyHandler2 = jest.spyOn(handler2, 'handle');

        dispatcher.register('CustomerCreatedEvent', handler1);
        dispatcher.register('CustomerCreatedEvent', handler2);

        expect(dispatcher.getEventHandlers['CustomerCreatedEvent']).toBeDefined();

        const customer = new Customer('1', 'Customer One')

        const productCreatedEvent = new CustomerCreatedEvent(customer);

        dispatcher.notify(productCreatedEvent);

        expect(spyHandler1).toHaveBeenCalled();
        expect(spyHandler2).toHaveBeenCalled();

    });

    it ('Should notify when customer address is changed', () => {
        const dispatcher = new EventDispacher();
        const handler = new SendEmailWhenCustomerAddressIsChangedHandler();
        const spyHandler = jest.spyOn(handler, 'handle');

        dispatcher.register('CustomerAddressChangedEvent', handler);

        expect(dispatcher.getEventHandlers['CustomerAddressChangedEvent']).toBeDefined();

        const customer = new Customer('1', 'Customer One');
        const address = new Address('Street 1', 'City 1', 'State 1', '60755-000');
        customer.changeAddress(address);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

        dispatcher.notify(customerAddressChangedEvent);

        expect(spyHandler).toHaveBeenCalled();


    });

});