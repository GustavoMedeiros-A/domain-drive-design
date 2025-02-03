import { Product } from "../../domain/product/entity/products"

describe('product unit test', () => {


    it('should throw when id is empty', () => {
        expect(() => {
            new Product("", "Product 1", 10)
        }).toThrow("ID is required")
    })

    it('should throw when name is empty', () => {
        expect(() => {
            new Product("123", "", 10)
        }).toThrow("Name is required")
    })

    it('should throw when price is negative', () => {
        expect(() => {
            new Product("123", "Product 1", -10)
        }).toThrow("Price must be a positive number")
    })

    it('should change name', () => {
        let product = new Product("123", "Product 1", 10)
        product.changeName("New Product 1")
        expect(product.name).toBe("New Product 1")
    })

    it('should change price', () => {
        let product = new Product("123", "Product 1", 10)
        product.changePrice(10)
        expect(product.price).toBe(10)
    })
})