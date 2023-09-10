import Product from "./product";

describe("Product Unit Test", () => {

    it ("Should thow an error when no Product ID", () => {
        expect(() => {
            let product = new Product("", "Bananas", 10);
        }).toThrowError("Invalid product id");
    });

    it ("Should thow an error when no Product Name", () => {
        expect(() => {
            let product = new Product("123", "", 10);
        }).toThrowError("Invalid product name");
    });

    it ("Price should not be less than 0", () => {
        expect(() => {
            let product = new Product("123", "Bananas", -1);
        }).toThrowError("Price should not be less than 0");
    });

    it("Should be able to change Name", () => {
        const product = new Product("123", "Bananas", 10);
        product.changeName("Laranjas");
        expect(product.name).toBe("Laranjas");
    });

    it("Should be able to change Price", () => {
        const product = new Product("123", "Bananas", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });
});
