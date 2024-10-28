import { Address } from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Gustavo");
const address = new Address("Rua 1", 2, "12342-321", "Juiz de fora");
customer.Address = address;
customer.activate();

// Uma relação de ID (Com customer) e uma relação de Objeto (Order e OrderItem - Pois estão no mesmo agregado)
const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);

const order = new Order("123", customer._id, [item1, item2]);
