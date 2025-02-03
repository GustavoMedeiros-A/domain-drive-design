import { Product } from "../product/entity/products";
import RepositoryInterface from "../@shared/repository/repository-interface";


export default interface ProductRepositoryInterface extends RepositoryInterface<Product> {

}