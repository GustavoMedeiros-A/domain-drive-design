import { Address } from "./address";

export default class Customer {
  _id: string;
  _name: string;
  _address!: Address; // "The _address! -> ! means that can inicialize empty (blank)"
  _active: boolean = false;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this.validate(); // A entidade se AUTO valida
  }

  validate() {
    if (this._id.length == 0) {
      throw new Error("ID cannot be null");
    }
    if (this._name.length == 0) {
      throw new Error("name cannot be null");
    }
  }

  // Mudança de regra de negócio...
  changeName(name: string): void {
    this._name = name;
    this.validate(); // A entidade se AUTO validando
  }

  activate() {
    if (this._name.length === 0) {
      throw new Error("Name is mandaroty to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
    this.validate();
  }
}
