import Address from "./address";
import Customer from "./customer";

describe("Customer Unit Test", () => {

    it ("Should thow an error when no Customer ID", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrowError("Invalid customer id");
    });

    it("should create a customer", () => {
        let customer = new Customer("123", "John");
        expect(customer).toBeDefined();
    });

    it("should throw an error when no customer name", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Invalid customer name");
    });

    it("should throw an error when customer name is less than 3 characters", () => {
        expect(() => {
            let customer = new Customer("123", "Jo");
        }).toThrowError("Invalid customer name");
    });

    it("should activate a customer", () => {
        const customer = new Customer("123", "John");
        const address = new Address("123", "Seattle", "WA", "12345");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive()).toBeTruthy();
    });

    it("should deactivate a customer", () => {
        const customer = new Customer("123", "John");
        customer.deactivate();
        expect(customer.isActive()).toBeFalsy();
    });

    it('Should trow and error when address is undefined', () => {
        expect(() => {
            const customer = new Customer("123", "John");
            customer.activate();
        }).toThrowError("Invalid address");
    });

    it('Should change customer name', () => {
        const customer = new Customer("123", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it('Should test reward points', () => {
        const customer = new Customer("123", "John");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(200);
        expect(customer.rewardPoints).toBe(300);
    });

});