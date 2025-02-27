import { Product } from "../domain/product/entity/products";
import ProductService from "../domain/product/product.service";

describe("Product service unit tests", () => {
    it("Should change the price of all products", () => {
        const product1 = new Product("1", "product1", 10);
        const product2 = new Product("2", "product2", 20);
        const products = [product1, product2];
        
        const productService = new ProductService();

        productService.increasePrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
    
    })
})