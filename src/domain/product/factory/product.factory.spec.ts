import { ProductB } from "../entity/product-b";
import { Product } from "../entity/products";
import ProductFactory from "./product.factory";

describe("Product factory unit tests", () => {

    it("should create a product type A", () => {
        const productA = ProductFactory.create("a", "Product A", 10);


        expect(productA.id).toBeDefined();
        expect(productA.name).toBe("Product A");
        expect(productA.price).toBe(10);
        expect(productA.constructor.name).toBe("Product");
        expect(productA).toBeInstanceOf(Product);
    });

    it("should create a product type B", () => {
        const productB = ProductFactory.create("b", "Product B", 10);
        expect(productB.name).toBe("Product B");
        expect(productB.price).toBe(20);
        expect(productB.constructor.name).toBe("ProductB");
        expect(productB).toBeInstanceOf(ProductB);
    });

    it("should throw a error when try to create product type C", () => {
        expect(() => ProductFactory.create("c", "Product C", 1)).toThrow(
            "Invalid product type: c"
        )

    });

});