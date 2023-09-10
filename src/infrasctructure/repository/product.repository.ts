import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";
import ProductModel from "../db/sequelize/models/product.model";
import Product from "../../domain/entity/product";

export default class ProductRepository implements ProductRepositoryInterface {
    

    async create(entity: Product) {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });
    }

    async update(entity: Product) {
        await ProductModel.update({
            name: entity.name,
            price: entity.price,
        }, { 
            where: { id: entity.id }
        });
    }
    async find(id: string): Promise<Product>{
        const productModel = await ProductModel.findOne({where: {id: id}});
        if (!productModel) {
            throw new Error("Product not found");
        }
        return new Product(productModel.id, productModel.name, productModel.price);
    }
    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map((productModel) => {
            return new Product(productModel.id, productModel.name, productModel.price);
        });
    }
}