import { Sequelize } from "sequelize"
import ProductRepositoryInterface from "../../domain/repository/product-repository.interface";


describe("product repository test", () => {
    let sequelize: Sequelize;
    let productRepository: ProductRepositoryInterface;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true}
        });

        afterEach(async () => {
            await sequelize.close();
        })
    })
})