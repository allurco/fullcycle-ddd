import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product Service Unit Test", () => {

    it("Should change prices", () => {

        const product1 = new Product("123", "Bananas", 10);
        const product2 = new Product("345", "Laranjas", 20);

        ProductService.changePrices([product1, product2], 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);

    });

});