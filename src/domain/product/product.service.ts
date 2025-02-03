import { Product } from "../product/entity/products";



export default class ProductService {
    increasePrice(products: Product[], percentage: number): Product[] {
        for (let product of products) {
            product.changePrice(product.price + (product.price * percentage / 100));
        }

        return products;
    }

}