import Product from "../entity/product";

export default class ProductService {

    static changePrices(products: Product[], porcentage: number): Product[] {
        products.forEach(product => {
            product.changePrice((product.price * porcentage / 100) + product.price);
        });

        return products;
    }

}