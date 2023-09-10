import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/models/product.model";
import Product from "../../domain/entity/product";
import ProductRepository from "./product.repository";

describe("Product Repository Unit Test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async() => {
        await sequelize.close();
    });

    it("should create a product", async () => {

        const productRepository = new ProductRepository();
        const product = new Product("1", "Apple", 100);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id: "1"}});

        expect(productModel.toJSON()).toEqual({
            id: "1",
            name: "Apple",
            price: 100,
        });
        
    });

    it("should update a product", async () => {
            
            const productRepository = new ProductRepository();
            const product = new Product("1", "Apple", 100);
            await productRepository.create(product);
    
            product.changeName("Orange");
            product.changePrice(200);
    
            await productRepository.update(product);
    
            const productModel = await ProductModel.findOne({where: {id: "1"}});
    
            expect(productModel.toJSON()).toEqual({
                id: "1",
                name: "Orange",
                price: 200,
            });
            
    });

    it("should find a product", async () => {
                
            const productRepository = new ProductRepository();
            const product = new Product("1", "Apple", 100);
            await productRepository.create(product);
    
            const productFound = await productRepository.find("1");
            const productModel = await ProductModel.findOne({where: {id: "1"}});

    
            expect(productModel.toJSON()).toEqual({
                id: productFound.id,
                name: productFound.name,
                price: productFound.price,
            });
            
    });

    it("Should find all", async () => {
        
        const productRepository = new ProductRepository();
        const product = new Product("1", "Apple", 100);
        await productRepository.create(product);

        const product2 = new Product("2", "Orange", 200);
        await productRepository.create(product2);

        const productsFound = await productRepository.findAll();
        const products = [product, product2];

        expect(productsFound).toEqual(products);


    
    });


});